import * as React from "react";
import { cn } from "./cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "w-full rounded-2xl border border-[color:var(--theme-outline)] bg-transparent px-4 py-3 text-sm text-[color:var(--theme-text)] placeholder:text-[color:var(--theme-text-muted)] transition-colors",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--theme-primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

