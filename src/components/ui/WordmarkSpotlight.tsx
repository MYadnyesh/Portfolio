"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer's giant background name. An outlined "ghost" layer sits underneath;
 * a solid layer masked to a small circle sits on top and only shows through
 * near the cursor. When idle it auto-sweeps left to right; on hover/touch it
 * locks to the pointer. Tracking only runs while the element is on screen.
 */
export function WordmarkSpotlight({ text }: { text: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    let raf = 0;
    const handleMove = (clientX: number, clientY: number) => {
      const rect = wrap.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        fill.style.maskPosition = `${x}% ${y}%`;
        fill.style.setProperty("-webkit-mask-position", `${x}% ${y}%`);
      });
    };

    const onPointerMove = (e: PointerEvent) => {
      fill.classList.remove("is-animating");
      handleMove(e.clientX, e.clientY);
    };
    const onPointerLeave = () => {
      fill.classList.add("is-animating");
      fill.style.removeProperty("mask-position");
      fill.style.removeProperty("-webkit-mask-position");
    };

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);
    return () => {
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(raf);
    };
  }, [inView]);

  return (
    <div ref={wrapRef} className="wordmark-spotlight-wrap" aria-hidden="true">
      <span className="wordmark-ghost text-[22vw] leading-none">{text}</span>
      <span
        ref={fillRef}
        className="wordmark-spotlight-fill wordmark-fill is-animating text-[22vw] leading-none"
      >
        {text}
      </span>
    </div>
  );
}
