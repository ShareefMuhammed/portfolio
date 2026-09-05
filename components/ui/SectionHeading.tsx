import React from "react";
import { cn } from "@/lib/utils";

export type AccentColor =
  "coral" | "sage" | "blue" | "yellow" | "olive" | (string & {});

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  accentColor?: AccentColor;
  level?: 1 | 2 | 3;
}

const colorMap: Record<string, string> = {
  coral: "bg-coral",
  sage: "bg-sage",
  blue: "bg-blue",
  yellow: "bg-yellow",
  olive: "bg-olive",
};

export function SectionHeading({
  children,
  accentColor,
  level = 2,
  className,
  ...props
}: SectionHeadingProps) {
  const TagName = `h${level}` as "h1" | "h2" | "h3";
  const isNamedColor = accentColor && colorMap[accentColor];

  return (
    <TagName
      className={cn(
        "font-pixel text-ink flex items-center gap-3 text-base uppercase sm:text-lg md:text-xl",
        className
      )}
      {...props}
    >
      {accentColor && (
        <span
          className={cn(
            "border-ink inline-block h-3.5 w-3.5 shrink-0 border shadow-[1px_1px_0_0_#2A2A2A]",
            isNamedColor ? colorMap[accentColor] : ""
          )}
          style={!isNamedColor ? { backgroundColor: accentColor } : undefined}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </TagName>
  );
}
