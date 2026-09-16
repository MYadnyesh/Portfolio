"use client";

/**
 * Fixed, full-viewport animated background.
 * Two slowly drifting starfield layers + a faint moving grid.
 * GPU-friendly (transform/opacity only). Motion is disabled under
 * prefers-reduced-motion via the global CSS rule.
 */
export function BackgroundFX() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base tint */}
      <div className="absolute inset-0 bg-(--color-bg)" />

      {/* Drifting star layer 1 */}
      <div className="absolute inset-[-20%] starfield animate-drift-slow" />
      {/* Drifting star layer 2 (offset, faster, sparser) */}
      <div className="absolute inset-[-20%] starfield-sparse animate-drift-fast" />

      {/* Faint moving grid */}
      <div className="absolute inset-0 bg-grid animate-grid-pan opacity-[0.05]" />

      {/* Soft accent glow that breathes */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full animate-glow-pulse"
        style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 60%)", opacity: 0.06 }} />
    </div>
  );
}
