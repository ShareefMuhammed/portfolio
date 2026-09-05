"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSnake } from "./SnakeProvider";
import {
  Point,
  Direction,
  calculatePatrolPath,
  getNextPosition,
} from "@/lib/snake";

interface HistoryPoint {
  x: number;
  y: number;
  accumulatedDistance: number;
}

const SEGMENT_SIZE = 18;
const SEGMENT_SPACING = 20;
// CHANGE 1: Increased speed by ~50% (from 55 to 82 px/sec) for lively, purposeful motion
const MOVEMENT_SPEED = 82;

export function Snake() {
  const pathname = usePathname();
  const { length, activeTargetRef, checkAndEatTarget } = useSnake();
  const [direction, setDirection] = useState<Direction>("right");

  // DOM refs for each segment (0 is head, 1..9 are body segments)
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Movement state (persisted across frames without React re-renders)
  const posRef = useRef<Point>({ x: 70, y: 140 });
  const waypointIndexRef = useRef<number>(0);
  const waypointsRef = useRef<Point[]>([]);
  const lastTimeRef = useRef<number>(0);
  const historyRef = useRef<HistoryPoint[]>([
    { x: 70, y: 140, accumulatedDistance: 0 },
  ]);
  const totalDistanceTraveledRef = useRef<number>(0);

  // CHANGE 3: Reset snake position and trail when landing on a new page
  useEffect(() => {
    posRef.current = { x: 70, y: 140 };
    historyRef.current = [{ x: 70, y: 140, accumulatedDistance: 0 }];
    totalDistanceTraveledRef.current = 0;
    waypointIndexRef.current = 0;
    lastTimeRef.current = 0;
  }, [pathname]);

  // Recalculate waypoints on mount and resize
  useEffect(() => {
    const updateWaypoints = () => {
      const width = window.innerWidth;
      const height = Math.max(
        window.innerHeight,
        document.documentElement.scrollHeight
      );
      waypointsRef.current = calculatePatrolPath(width, height);
    };

    updateWaypoints();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateWaypoints, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Main animation loop
  useEffect(() => {
    // Respect accessibility: prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let animationFrameId: number;

    const animate = (now: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = now;
      }

      const deltaTime = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      // CHANGE 2: Targeted movement toward active food point if present;
      // fallback to idle wander patrol if sequence is completed/absent
      const activeTarget = activeTargetRef.current;
      const waypoints = waypointsRef.current;

      let targetPos: Point | null = activeTarget;
      if (!targetPos && waypoints.length > 0) {
        targetPos = waypoints[waypointIndexRef.current % waypoints.length];
      }

      if (targetPos) {
        const {
          nextPos,
          arrived,
          direction: newDir,
        } = getNextPosition(
          posRef.current,
          targetPos,
          MOVEMENT_SPEED,
          deltaTime
        );

        if (newDir !== direction) {
          setDirection(newDir);
        }

        const dx = nextPos.x - posRef.current.x;
        const dy = nextPos.y - posRef.current.y;
        const stepDist = Math.sqrt(dx * dx + dy * dy);

        posRef.current = nextPos;
        totalDistanceTraveledRef.current += stepDist;

        // Record history
        historyRef.current.unshift({
          x: nextPos.x,
          y: nextPos.y,
          accumulatedDistance: totalDistanceTraveledRef.current,
        });

        // Cap history buffer
        const maxNeededDistance = 10 * SEGMENT_SPACING + 30;
        while (
          historyRef.current.length > 2 &&
          totalDistanceTraveledRef.current -
            historyRef.current[historyRef.current.length - 1]
              .accumulatedDistance >
            maxNeededDistance
        ) {
          historyRef.current.pop();
        }

        // If patrolling and arrived at waypoint, advance to next
        if (!activeTarget && arrived && waypoints.length > 0) {
          waypointIndexRef.current =
            (waypointIndexRef.current + 1) % waypoints.length;
        }

        // Collision check with active target
        checkAndEatTarget(nextPos);

        // Update head DOM position via transform3d
        const headEl = segmentRefs.current[0];
        if (headEl) {
          headEl.style.transform = `translate3d(${nextPos.x - SEGMENT_SIZE / 2}px, ${
            nextPos.y - SEGMENT_SIZE / 2
          }px, 0)`;
        }

        // Update trailing body segment positions based on historical path
        for (let i = 1; i < length; i++) {
          const bodyEl = segmentRefs.current[i];
          if (!bodyEl) continue;

          const targetDistance = i * SEGMENT_SPACING;
          const targetAccum = totalDistanceTraveledRef.current - targetDistance;

          let segPos = posRef.current;
          const history = historyRef.current;

          for (let j = 0; j < history.length - 1; j++) {
            const curr = history[j];
            const prev = history[j + 1];

            if (
              curr.accumulatedDistance >= targetAccum &&
              prev.accumulatedDistance <= targetAccum
            ) {
              const segDelta =
                curr.accumulatedDistance - prev.accumulatedDistance;
              const ratio =
                segDelta > 0
                  ? (targetAccum - prev.accumulatedDistance) / segDelta
                  : 0;

              segPos = {
                x: prev.x + (curr.x - prev.x) * ratio,
                y: prev.y + (curr.y - prev.y) * ratio,
              };
              break;
            }
          }

          bodyEl.style.transform = `translate3d(${segPos.x - SEGMENT_SIZE / 2}px, ${
            segPos.y - SEGMENT_SIZE / 2
          }px, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [length, checkAndEatTarget, activeTargetRef, direction]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {/* Snake Head (Index 0) */}
      <div
        ref={(el) => {
          segmentRefs.current[0] = el;
        }}
        className="bg-snake border-ink/40 absolute top-0 left-0 flex h-[18px] w-[18px] items-center justify-center rounded-[3px] border shadow-[1px_1px_0_0_#2A2A2A] will-change-transform"
      >
        {/* Eyes facing the direction of movement */}
        <div
          className={`absolute flex h-full w-full p-[2px] ${
            direction === "right"
              ? "flex-col items-end justify-between"
              : direction === "left"
                ? "flex-col items-start justify-between"
                : direction === "down"
                  ? "flex-row items-end justify-between"
                  : "flex-row items-start justify-between"
          }`}
        >
          {/* Eye 1 */}
          <span className="border-ink/70 flex h-[3.5px] w-[3.5px] items-center justify-center rounded-[0.5px] border bg-white">
            <span className="bg-ink block h-[1.2px] w-[1.2px]" />
          </span>
          {/* Eye 2 */}
          <span className="border-ink/70 flex h-[3.5px] w-[3.5px] items-center justify-center rounded-[0.5px] border bg-white">
            <span className="bg-ink block h-[1.2px] w-[1.2px]" />
          </span>
        </div>
      </div>

      {/* Trailing Body Segments (Index 1 to length - 1) */}
      {Array.from({ length: length - 1 }).map((_, index) => {
        const segIndex = index + 1;
        return (
          <div
            key={`snake-seg-${segIndex}`}
            ref={(el) => {
              segmentRefs.current[segIndex] = el;
            }}
            className="bg-snake border-ink/40 absolute top-0 left-0 h-[16px] w-[16px] rounded-[3px] border shadow-[1px_1px_0_0_#2A2A2A] will-change-transform"
          />
        );
      })}
    </div>
  );
}
