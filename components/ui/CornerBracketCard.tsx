import React from "react";
import { cn } from "@/lib/utils";

export interface CornerBracketCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  bracketSize?: number; // size in px, default 16
  hasTape?: boolean;
  insetBrackets?: boolean;
}

export function CornerBracketCard({
  children,
  bracketSize = 16,
  hasTape = false,
  insetBrackets = false,
  className,
  ...props
}: CornerBracketCardProps) {
  const sizeStyle = { width: `${bracketSize}px`, height: `${bracketSize}px` };

  return (
    <div
      className={cn(
        "bg-surface shadow-sketch relative p-6",
        insetBrackets && "border-2 border-ink",
        className
      )}
      {...props}
    >
      {/* Optional Tape at top center */}
      {hasTape && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-3.5 left-1/2 z-10 h-6 w-32 -translate-x-1/2 rotate-[-1deg] border border-ink/40 bg-cream/90 shadow-sm backdrop-blur-sm"
        />
      )}

      {/* Top Left Bracket */}
      <span
        style={sizeStyle}
        className={cn(
          "border-t-2 border-l-2 border-ink pointer-events-none absolute",
          insetBrackets ? "top-2 left-2" : "-top-[1.5px] -left-[1.5px]"
        )}
      />
      {/* Top Right Bracket */}
      <span
        style={sizeStyle}
        className={cn(
          "border-t-2 border-r-2 border-ink pointer-events-none absolute",
          insetBrackets ? "top-2 right-2" : "-top-[1.5px] -right-[1.5px]"
        )}
      />
      {/* Bottom Left Bracket */}
      <span
        style={sizeStyle}
        className={cn(
          "border-b-2 border-l-2 border-ink pointer-events-none absolute",
          insetBrackets ? "bottom-2 left-2" : "-bottom-[1.5px] -left-[1.5px]"
        )}
      />
      {/* Bottom Right Bracket */}
      <span
        style={sizeStyle}
        className={cn(
          "border-b-2 border-r-2 border-ink pointer-events-none absolute",
          insetBrackets ? "bottom-2 right-2" : "-right-[1.5px] -bottom-[1.5px]"
        )}
      />

      {children}
    </div>
  );
}
