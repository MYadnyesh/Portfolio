"use client";

import { ThreeBackground } from "@/components/ui/ThreeBackground";

/**
 * Fixed, full-viewport animated background.
 * A WebGL depth field sits on top of a CSS starfield + faint moving grid.
 * The CSS layers are the fallback: they fade out only once WebGL actually
 * starts (`.three-active`), so no-JS, no-WebGL and reduced-motion all keep a
 * working background instead of a flat page.
 */
export function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base tint */}
      <div className="absolute inset-0 bg-bg" />

      {/* Drifting star layer 1 */}
      <div className="absolute inset-[-20%] starfield animate-drift-slow" />
      {/* Drifting star layer 2 (offset, faster, sparser) */}
      <div className="absolute inset-[-20%] starfield-sparse animate-drift-fast" />

      {/* Monogram watermark, placed under the mote field so particles drift in
          front of it and it reads as part of the depth rather than an overlay. */}
      <div className="absolute top-1/2 right-[-6vw] -translate-y-1/2 w-[62vw] max-w-220 aspect-square">
        <div className="w-full h-full watermark-mark animate-drift-slow opacity-[0.055]" />
      </div>

      {/* WebGL parallax depth field */}
      <ThreeBackground />

      {/* Faint moving grid */}
      {/* Inset past the edges so the 64px transform pan never exposes a seam. */}
      <div className="absolute inset-[-64px] bg-grid animate-grid-pan opacity-[0.05]" />

      {/* Soft accent glow that breathes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full animate-glow-pulse"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)", opacity: 0.06 }} />
    </div>
  );
}
