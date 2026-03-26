import * as React from "react";
import { cn } from "./cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("theme-surface p-6", className)}
      {...props}
    />
  );
}

