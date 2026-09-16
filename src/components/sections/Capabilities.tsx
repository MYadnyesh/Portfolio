"use client";

import { motion } from "framer-motion";
import { capabilities } from "@/data/portfolio";

const rows = [
  { key: "fullStack", label: "Full Stack", dir: "left" },
  { key: "backendData", label: "Backend & Data", dir: "right" },
  { key: "cloudEngineering", label: "Cloud & Eng", dir: "left" },
  { key: "aiLlm", label: "AI / LLM", dir: "right" },
  { key: "aiEngineering", label: "AI Engineering", dir: "left" },
] as const;

export function Capabilities() {
  return (
    <section id="capabilities" className="section overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-header mb-16"
        >
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-title mt-3 font-bold uppercase">
            The full <span className="text-serif-italic lowercase text-[var(--color-accent-readable)]">toolkit</span>
          </h2>
          <p className="section-subtitle max-w-xl">
            A wall of what I build with, grouped by where it sits in the stack. Hover any row to
            slow it down.
          </p>
        </motion.div>
      </div>

      {/* Scrolling technology wall, one row per category, alternating direction */}
      <div className="flex flex-col gap-3 md:gap-4">
        {rows.map((row, i) => {
          const items = capabilities[row.key];
          return (
            <div
              key={row.key}
              className="group relative flex items-center border-y border-[var(--color-border)] py-4 md:py-6"
            >
              {/* Category label pinned left, over a fade */}
              <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pl-4 md:pl-8 pr-8 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)] to-transparent">
                <span className="index-num text-sm mr-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono text-xs tracking-[0.12em] uppercase text-[var(--color-fg-muted)] whitespace-nowrap">
                  {row.label}
                </span>
              </div>

              {/* Marquee track */}
              <div
                className={
                  "flex w-max shrink-0 " +
                  (row.dir === "left" ? "animate-techwall-left" : "animate-techwall-right") +
                  " group-hover:[animation-play-state:paused]"
                }
              >
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
                    {items.map((item) => (
                      <span
                        key={item.name}
                        className="font-display font-bold text-2xl md:text-4xl uppercase tracking-tight text-[var(--color-fg-subtle)] transition-colors hover:text-[var(--color-fg)] mx-5 md:mx-7 flex items-center gap-5 md:gap-7"
                      >
                        {item.name}
                        <span className="text-[var(--color-accent)] text-base md:text-lg" aria-hidden>
                          &#47;&#47;
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
