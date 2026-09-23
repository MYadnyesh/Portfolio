"use client";

import { motion } from "framer-motion";
import { Hammer, Sparkles, GraduationCap, Compass } from "lucide-react";

const columns = [
  { word: "Build", caption: "Full-stack apps, MVPs & prototypes", Icon: Hammer },
  { word: "Enhance", caption: "LLM integration, RAG & automation", Icon: Sparkles },
  { word: "Consult", caption: "AI transformation roadmaps & process optimization", Icon: Compass },
  { word: "Teach", caption: "Mentoring students & upskilling professionals", Icon: GraduationCap },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function Approach() {
  return (
    <section id="approach" className="section">
      <div className="max-w-360 mx-auto">
        {/* Numbered eyebrow + hairline */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6"
        >
          <span className="eyebrow whitespace-nowrap">01 / What I help with</span>
          <span aria-hidden="true" className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          {...reveal}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance"
        >
          Your idea.{" "}
          <span className="text-serif-italic normal-case text-accent-readable">
            your users.
          </span>
          <br />
          Your product.
        </motion.h2>

        {/* Supporting line */}
        <motion.p
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-fg-muted leading-relaxed text-pretty"
        >
          I take ideas from a first sketch to a working product, building the full stack,
          weaving in AI where it earns its place, and helping people grow along the way.
        </motion.p>

        {/* Three columns */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col, i) => (
            <motion.div
              key={col.word}
              {...reveal}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-border py-10 md:py-14 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <col.Icon className="w-7 h-7 md:w-8 md:h-8 text-accent-readable" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-5 font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-none">
                {col.word}
              </h3>
              <p className="mt-5 text-lg md:text-xl font-medium text-fg-muted leading-relaxed max-w-xs">{col.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
