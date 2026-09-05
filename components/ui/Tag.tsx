import React from "react";
import { cn } from "@/lib/utils";

export type TagVariant = "cream" | "surface" | "blue";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
  children: React.ReactNode;
}

export function Tag({
  variant = "cream",
  className,
  children,
  ...props
}: TagProps) {
  const variantStyles: Record<TagVariant, string> = {
    cream: "bg-cream text-ink",
    surface: "bg-surface text-ink",
    blue: "bg-blue text-ink",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 font-mono text-xs font-medium",
        "border-ink shadow-sketchSm border-2 select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Also export Badge as alias
export const Badge = Tag;
export type BadgeProps = TagProps;
