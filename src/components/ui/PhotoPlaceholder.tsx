"use client";

import { cn } from "@/lib/utils";

interface PhotoPlaceholderProps {
  /** Optional image path once the user drops a real photo into /public/images/photos */
  src?: string | null;
  alt?: string;
  label?: string;
  className?: string;
  /** aspect ratio, e.g. "3/4", "4/5", "1/1", "16/9" */
  ratio?: string;
}

/**
 * A framed slot the user fills with a real photo later.
 * If `src` is provided it renders the image; otherwise a labelled placeholder.
 */
export function PhotoPlaceholder({
  src,
  alt = "",
  label = "Add photo",
  className,
  ratio = "3/4",
}: PhotoPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-bg-elevated border border-border",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        // Plain img rather than next/image because these include animated
        // GIFs, which next/image can't optimise. Lazy + async decode at least
        // keeps them off the critical path — every use of this is below the fold.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-4">
          <div className="w-10 h-10 rounded-full border border-border-strong-solid flex items-center justify-center">
            <span className="text-fg-subtle text-lg leading-none">+</span>
          </div>
          <span className="eyebrow">{label}</span>
          <span className="font-mono text-[0.65rem] text-fg-subtle">
            {alt || "photo slot"}
          </span>
        </div>
      )}
    </div>
  );
}
