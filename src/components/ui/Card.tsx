"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", children, ...props }, ref) => {
    const variants = {
      default: "bg-(--color-bg-card) border border-(--color-border) rounded-[var(--radius-lg)] transition-all duration-300 hover:border-(--color-border-strong-solid)",
      interactive: "bg-(--color-bg-card) border border-(--color-border) rounded-[var(--radius-lg)] cursor-pointer transition-all duration-300 hover:border-(--color-border-strong-solid) hover:shadow-[var(--shadow-lg)] hover:-translate-y-1",
    };

    const paddings = { none: "", sm: "p-4", md: "p-6", lg: "p-8" };

    return (
      <div ref={ref} className={cn(variants[variant], paddings[padding], className)} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mb-4", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn("font-display font-medium text-(--color-fg)", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn("text-(--color-fg-muted) text-sm mt-1", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("", className)} {...props} />
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("mt-4 flex items-center gap-2", className)} {...props} />
);
CardFooter.displayName = "CardFooter";
