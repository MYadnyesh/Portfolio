"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE = 'a[href], button, [role="tab"], [role="button"], summary, label[for]';
const TEXT_FIELD = "input, textarea, select";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !still.matches);
    sync();
    fine.addEventListener("change", sync);
    still.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      still.removeEventListener("change", sync);
    };
  }, []);

  if (!enabled) return null;
  return <CursorLayer />;
}

function CursorLayer() {
  const layerRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const cross = crossRef.current;
    const ring = ringRef.current;
    if (!layer || !cross || !ring) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let crossX = pointerX;
    let crossY = pointerY;
    let ringX = pointerX;
    let ringY = pointerY;

    function tick() {
      crossX += (pointerX - crossX) * 0.4;
      crossY += (pointerY - crossY) * 0.4;
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      cross!.style.transform = `translate3d(${crossX}px, ${crossY}px, 0) translate(-50%, -50%)`;
      ring!.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    }

    let frame = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      layer.classList.add("is-visible");
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      const hit = target.closest(`${INTERACTIVE}, ${TEXT_FIELD}`);
      const isText = !!hit && hit.matches(TEXT_FIELD);
      layer.classList.toggle("is-interactive", !!hit && !isText);
      layer.classList.toggle("is-text", isText);
    };

    const onDown = () => layer.classList.add("is-pressed");
    const onUp = () => layer.classList.remove("is-pressed");
    const hide = () => layer.classList.remove("is-visible");
    const onDocLeave = (e: PointerEvent) => {
      if (e.relatedTarget === null) hide();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onDocLeave);
    window.addEventListener("blur", hide);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onDocLeave);
      window.removeEventListener("blur", hide);
    };
  }, []);

  return (
    <div ref={layerRef} className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={crossRef} className="cursor-cross" />
    </div>
  );
}
