import React from "react";
import { cn } from "@/lib/utils";

export interface CornerBracketCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bracketSize?: number; // size in px, default 16
}

export function CornerBracketCard({
  children,
  bracketSize = 16,
  className,
  ...props
}: CornerBracketCardProps) {
  const sizeStyle = { width: `${bracketSize}px`, height: `${bracketSize}px` };

  return (
    <div
      className={cn("bg-surface shadow-sketch relative p-6", className)}
      {...props}
    >
      {/* Top Left Bracket */}
      <span
        style={sizeStyle}
        className="border-t-sketch border-l-sketch border-ink pointer-events-none absolute -top-[1.5px] -left-[1.5px]"
      />
      {/* Top Right Bracket */}
      <span
        style={sizeStyle}
        className="border-t-sketch border-r-sketch border-ink pointer-events-none absolute -top-[1.5px] -right-[1.5px]"
      />
      {/* Bottom Left Bracket */}
      <span
        style={sizeStyle}
        className="border-b-sketch border-l-sketch border-ink pointer-events-none absolute -bottom-[1.5px] -left-[1.5px]"
      />
      {/* Bottom Right Bracket */}
      <span
        style={sizeStyle}
        className="border-b-sketch border-r-sketch border-ink pointer-events-none absolute -right-[1.5px] -bottom-[1.5px]"
      />

      {children}
    </div>
  );
}
