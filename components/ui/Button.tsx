import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "solid" | "outline" | "cta" | "highlight";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export function Button({
  variant = "solid",
  className,
  children,
  ...props
}: ButtonProps) {
  const variantStyles: Record<ButtonVariant, string> = {
    solid: "bg-ink text-cream hover:opacity-90",
    outline: "bg-surface text-ink hover:bg-[#F9F6F0]",
    cta: "bg-olive text-cream hover:brightness-110",
    highlight: "bg-yellow text-ink hover:brightness-105",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm font-bold",
        "border-sketch border-ink shadow-sketch",
        "cursor-pointer transition-all duration-75 select-none",
        "active:translate-x-[6px] active:translate-y-[6px] active:shadow-none",
        "disabled:active:shadow-sketch disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-x-0 disabled:active:translate-y-0",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
