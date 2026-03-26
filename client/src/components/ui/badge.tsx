import * as React from "react";
import { cn } from "./cn";

type BadgeVariant = "default" | "primary" | "secondary" | "outline";

export type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "bg-[color:rgba(177,199,243,0.12)] text-[color:var(--theme-text)] border border-[color:var(--theme-outline)]",
  primary:
    "bg-[color:rgba(177,199,243,0.20)] text-[color:var(--theme-text)] border border-[color:rgba(177,199,243,0.25)]",
  secondary:
    "bg-[color:rgba(255,181,156,0.18)] text-[color:var(--theme-text)] border border-[color:rgba(255,181,156,0.25)]",
  outline: "bg-transparent border border-[color:var(--theme-outline)] text-[color:var(--theme-text)]",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

