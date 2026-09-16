"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectImageProps {
  src: string | null | undefined;
  alt: string;
  priority?: boolean;
  className?: string;
  /** Data shown in the typographic fallback panel when no screenshot exists (or fails to load). */
  index: number;
  category: string;
  stack: string[];
}

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

/**
 * Editorial visual for a project. Renders the real screenshot when one exists
 * and loads successfully; otherwise falls back to a designed typographic
 * panel built from real project data (category + stack), never a fabricated
 * placeholder photo.
 */
export function ProjectImage({
  src,
  alt,
  priority = false,
  className,
  index,
  category,
  stack,
}: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  if (!showImage) {
    return (
      <div
        className={cn(
          "relative aspect-[4/3] md:aspect-[16/11] overflow-hidden border border-(--color-border) bg-(--color-bg-card)",
          className
        )}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
          <div className="flex items-start justify-between">
            <span className="eyebrow">{category}</span>
            <span
              className="font-display leading-none select-none"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--color-border-strong-solid)" }}
            >
              {String(index).padStart(2, "0")}
            </span>
          </div>

          <ul className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs tracking-wide text-(--color-fg-subtle)">
            {stack.map((tech) => (
              <li key={tech} className="whitespace-nowrap">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent, transparent 38px, var(--color-border) 38px, var(--color-border) 39px)",
            opacity: 0.35,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[4/3] md:aspect-[16/11] overflow-hidden border border-(--color-border) bg-(--color-bg-card)",
        className
      )}
    >
      <Image
        src={src as string}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
        className="object-cover"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
