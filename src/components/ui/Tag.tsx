"use client";

import { cn } from "@/lib/utils";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "core" | "used" | "familiar" | "exploring" | "default";
  size?: "sm" | "md";
}

export function Tag({ className, variant = "default", size = "md", children, ...props }: TagProps) {
  const baseStyles = "inline-flex items-center font-mono tracking-wide border transition-colors";

  const variants = {
    core: "text-[var(--color-core)] border-[color-mix(in_srgb,_var(--color-core)_40%,_transparent)]",
    used: "text-[var(--color-used)] border-[color-mix(in_srgb,_var(--color-used)_40%,_transparent)]",
    familiar: "text-[var(--color-familiar)] border-[color-mix(in_srgb,_var(--color-familiar)_40%,_transparent)]",
    exploring: "text-[var(--color-exploring)] border-[color-mix(in_srgb,_var(--color-exploring)_40%,_transparent)]",
    default: "text-[var(--color-fg-muted)] border-[var(--color-border-strong-solid)]",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[0.65rem] rounded-[var(--radius-sm)]",
    md: "px-2.5 py-1 text-[0.7rem] rounded-[var(--radius-sm)]",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export interface TagGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: Array<{ label: string; variant?: TagProps["variant"] }>;
  size?: TagProps["size"];
}

export function TagGroup({ tags, size = "md", className, ...props }: TagGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {tags.map((tag, index) => (
        <Tag key={index} variant={tag.variant} size={size}>{tag.label}</Tag>
      ))}
    </div>
  );
}
