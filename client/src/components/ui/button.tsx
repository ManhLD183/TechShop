import * as React from "react";
import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--theme-primary)] text-[#0f172a] hover:brightness-110 focus-visible:ring-[color:var(--theme-primary)]",
  secondary:
    "bg-[color:rgba(255,181,156,0.12)] text-[color:var(--theme-text)] hover:bg-[color:rgba(255,181,156,0.18)] focus-visible:ring-[color:rgba(255,181,156,0.6)] border border-[color:var(--theme-outline)]",
  outline:
    "bg-transparent text-[color:var(--theme-text)] border border-[color:var(--theme-outline)] hover:bg-[color:rgba(177,199,243,0.10)] focus-visible:ring-[color:var(--theme-primary)]",
  ghost:
    "bg-transparent text-[color:var(--theme-text)] hover:bg-[color:rgba(177,199,243,0.08)] focus-visible:ring-[color:var(--theme-primary)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-4 rounded-2xl text-sm",
  md: "h-10 px-5 rounded-2xl text-sm",
  lg: "h-12 px-6 rounded-[1.25rem] text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}

