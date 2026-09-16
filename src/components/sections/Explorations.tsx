"use client";

import { motion } from "framer-motion";
import { explorations } from "@/data/portfolio";

export function Explorations() {
  return (
    <section id="explorations" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-header mb-12"
        >
          <span className="eyebrow">The Lab</span>
          <h2 className="section-title mt-3 font-bold uppercase">In the <span className="text-serif-italic lowercase text-[var(--color-accent-readable)]">lab</span></h2>
          <p className="section-subtitle">
            Technical directions I&apos;m investing time to understand deeply, ahead of production
            use. Deliberate exploration, not unfinished work.
          </p>
        </motion.div>

        <div>
          {explorations.map((exploration, index) => (
            <motion.div
              key={exploration.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={index !== 0 ? "rule pt-6 mt-6" : ""}
            >
              <div className="grid lg:grid-cols-12 gap-3 lg:gap-8">
                <div className="lg:col-span-1">
                  <span className="index-num text-xl">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="lg:col-span-4">
                  <h3 className="font-display text-xl md:text-2xl font-bold">{exploration.title}</h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[var(--color-fg-muted)] text-base md:text-lg leading-relaxed">
                    {exploration.description}
                  </p>
                </div>
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-1.5 lg:justify-end">
                    {exploration.stack.map((tech) => (
                      <span key={tech} className="font-mono text-xs text-[var(--color-fg-subtle)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Philosophy note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rule mt-16 pt-10 max-w-2xl"
        >
          <p className="text-[var(--color-fg-muted)] leading-relaxed">
            <span className="text-[var(--color-fg)] font-display">Exploration is not distraction.</span>{" "}
            These areas are chosen deliberately, based on where AI-native software is heading.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
