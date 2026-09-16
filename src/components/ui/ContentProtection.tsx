"use client";

import { useEffect } from "react";

/**
 * Basic content-protection layer: blocks the right-click context menu,
 * copy/cut, and image/text drag-out across the site. Form fields
 * (inputs, textareas, contenteditable) are exempt so the contact form
 * stays fully usable (copy/paste, right-click spellcheck, etc.).
 *
 * This is a deterrent, not real DRM — anyone using devtools or a
 * browser reader mode can still get at the markup. It just removes the
 * casual "select all, copy" path.
 */
const EXEMPT_TAGS = new Set(["INPUT", "TEXTAREA"]);

function isExempt(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (EXEMPT_TAGS.has(target.tagName)) return true;
  if (target.isContentEditable) return true;
  if (target.closest('input, textarea, [contenteditable="true"]')) return true;
  return false;
}

export function ContentProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      if (isExempt(e.target)) return;
      e.preventDefault();
    };
    const blockClipboard = (e: ClipboardEvent) => {
      if (isExempt(e.target)) return;
      e.preventDefault();
    };
    const blockDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "IMG") e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("copy", blockClipboard);
    document.addEventListener("cut", blockClipboard);
    document.addEventListener("dragstart", blockDragStart);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("copy", blockClipboard);
      document.removeEventListener("cut", blockClipboard);
      document.removeEventListener("dragstart", blockDragStart);
    };
  }, []);

  return null;
}
