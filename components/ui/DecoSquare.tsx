import React from "react";
import { cn } from "@/lib/utils";

export type DecoColor = "coral" | "sage" | "blue" | "yellow" | "olive";

export interface DecoSquareProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: DecoColor;
  size?: number; // size in px, defaults to 14
}

const colorMap: Record<DecoColor, string> = {
  coral: "bg-coral",
  sage: "bg-sage",
  blue: "bg-blue",
  yellow: "bg-yellow",
  olive: "bg-olive",
};

export function DecoSquare({
  color = "coral",
  size = 14,
  className,
  style,
  ...props
}: DecoSquareProps) {
  return (
    <span
      aria-hidden="true"
      style={{ width: `${size}px`, height: `${size}px`, ...style }}
      className={cn(
        "border-ink pointer-events-none inline-block border shadow-sketch-xs select-none",
        colorMap[color] || "bg-coral",
        className
      )}
      {...props}
    />
  );
}
