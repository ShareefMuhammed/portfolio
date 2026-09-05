import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hasTape?: boolean;
}

export function Card({
  children,
  hasTape = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-surface border-sketch border-ink shadow-sketch relative p-6",
        className
      )}
      {...props}
    >
      {hasTape && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rotate-[-2.5deg] border border-[#4A4A4A]/40 bg-[#E8E1D2]/85 shadow-sm"
        />
      )}
      {children}
    </div>
  );
}
