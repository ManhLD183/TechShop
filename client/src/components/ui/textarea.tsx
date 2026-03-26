import * as React from "react";
import { cn } from "./cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-[120px] w-full resize-y rounded-2xl border border-[color:var(--theme-outline)] bg-transparent px-4 py-3 text-sm text-[color:var(--theme-text)] placeholder:text-[color:var(--theme-text-muted)] transition-colors",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--theme-primary)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

