"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg) disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-(--color-fg) text-(--color-bg) hover:bg-(--color-accent) hover:text-(--color-fg) active:scale-[0.98] focus-visible:ring-(--color-accent)",
      secondary: "bg-transparent text-(--color-fg) border border-(--color-border-strong-solid) hover:border-(--color-accent) hover:text-(--color-accent) active:scale-[0.98] focus-visible:ring-(--color-border-strong-solid)",
      ghost: "bg-transparent text-(--color-fg-muted) hover:text-(--color-fg) active:scale-[0.98]",
      accent: "bg-(--color-accent) text-(--color-fg) hover:bg-(--color-accent-hover) active:scale-[0.98] focus-visible:ring-(--color-accent)",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
