"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding = "md", children, ...props }, ref) => {
    const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-bg-card border border-border rounded-lg transition-all duration-300 hover:border-border-strong-solid",
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
