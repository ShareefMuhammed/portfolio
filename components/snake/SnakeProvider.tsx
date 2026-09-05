"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { Point, checkCollision } from "@/lib/snake";

interface SnakeState {
  length: number;
  currentOrder: number;
}

type SnakeAction = { type: "EAT_TARGET" } | { type: "RESET_FOR_PAGE" };

function snakeReducer(state: SnakeState, action: SnakeAction): SnakeState {
  switch (action.type) {
    case "EAT_TARGET": {
      return {
        length: Math.min(10, state.length + 1),
        currentOrder: state.currentOrder + 1,
      };
    }
    case "RESET_FOR_PAGE": {
      return {
        length: 1,
        currentOrder: 1,
      };
    }
    default:
      return state;
  }
}

interface SnakeContextValue {
  length: number;
  currentOrder: number;
  activeTargetRef: React.MutableRefObject<Point | null>;
  registerTarget: (order: number, pos: Point) => void;
  unregisterTarget: (order: number) => void;
  checkAndEatTarget: (headPos: Point) => boolean;
}

const SnakeContext = createContext<SnakeContextValue | null>(null);

export function SnakeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, dispatch] = useReducer(snakeReducer, {
    length: 1,
    currentOrder: 1,
  });

  // Zero-rerender ref holding the active target's position for the 60fps rAF loop
  const activeTargetRef = useRef<Point | null>(null);
  const currentOrderRef = useRef<number>(1);

  useEffect(() => {
    currentOrderRef.current = state.currentOrder;
  }, [state.currentOrder]);

  // CHANGE 3: Reset snake to length 1 and restart food sequence on every route/page change
  useEffect(() => {
    activeTargetRef.current = null;
    dispatch({ type: "RESET_FOR_PAGE" });
  }, [pathname]);

  const registerTarget = useCallback((order: number, pos: Point) => {
    if (order === currentOrderRef.current) {
      activeTargetRef.current = pos;
    }
  }, []);

  const unregisterTarget = useCallback((order: number) => {
    if (order === currentOrderRef.current) {
      activeTargetRef.current = null;
    }
  }, []);

  const checkAndEatTarget = useCallback((headPos: Point): boolean => {
    const target = activeTargetRef.current;
    if (!target) return false;

    // Check collision with current active target
    if (checkCollision(headPos, target, 22)) {
      activeTargetRef.current = null;
      dispatch({ type: "EAT_TARGET" });
      return true;
    }
    return false;
  }, []);

  return (
    <SnakeContext.Provider
      value={{
        length: state.length,
        currentOrder: state.currentOrder,
        activeTargetRef,
        registerTarget,
        unregisterTarget,
        checkAndEatTarget,
      }}
    >
      {children}
    </SnakeContext.Provider>
  );
}

export function useSnake(): SnakeContextValue {
  const ctx = useContext(SnakeContext);
  if (!ctx) {
    throw new Error("useSnake must be used within a SnakeProvider");
  }
  return ctx;
}
