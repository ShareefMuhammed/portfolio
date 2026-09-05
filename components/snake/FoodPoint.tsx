"use client";

import React, { useEffect, useRef } from "react";
import { useSnake } from "./SnakeProvider";
import { cn } from "@/lib/utils";

export interface FoodPointProps extends React.HTMLAttributes<HTMLSpanElement> {
  id: string;
  order?: number; // 1-based order in the page's food sequence
  color?: "coral" | "sage";
  size?: number; // size in px, default 16
}

const colorMap = {
  coral: "bg-coral",
  sage: "bg-sage",
};

export function FoodPoint({
  id,
  order = 1,
  color = "coral",
  size = 16,
  className,
  style,
  ...props
}: FoodPointProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { currentOrder, registerTarget, unregisterTarget } = useSnake();
  const isCurrentTarget = currentOrder === order;

  useEffect(() => {
    if (!isCurrentTarget) return;

    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        registerTarget(order, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    // Register after layout paint
    const timer = setTimeout(updatePosition, 20);

    let resizeTimer: NodeJS.Timeout;
    const handleResizeOrScroll = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updatePosition, 100);
    };

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
      unregisterTarget(order);
    };
  }, [order, isCurrentTarget, registerTarget, unregisterTarget]);

  // Only the CURRENT target food is rendered; remaining foods stay completely hidden
  if (!isCurrentTarget) {
    return null;
  }

  return (
    <span
      ref={ref}
      data-food-id={id}
      data-food-order={order}
      aria-hidden="true"
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      className={cn(
        "border-ink animate-in fade-in zoom-in-75 pointer-events-none inline-block border shadow-[1px_1px_0_0_#2A2A2A] duration-200 select-none",
        colorMap[color] || "bg-coral",
        className
      )}
      {...props}
    />
  );
}
