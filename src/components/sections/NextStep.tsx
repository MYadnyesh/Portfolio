"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

export function NextStep() {
  return (
    <section id="next-step" className="section bg-(--color-bg) text-(--color-fg)">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="eyebrow">Next step</p>
          <h2 className="font-display font-bold uppercase tracking-tight text-4xl md:text-6xl lg:text-7xl mt-4 leading-[0.92]">
            Start with the{" "}
            <span className="text-serif-italic lowercase">real</span> idea.
          </h2>
          <p className="text-lg md:text-xl text-(--color-fg-muted) mt-6 max-w-2xl leading-relaxed">
            Tell me what you&apos;re building or trying to learn. I&apos;ll tell you if I can help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href={socialLinks.calendly} target="_blank" rel="noopener noreferrer" className="btn-accent">
              Book a call <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a href={socialLinks.email} className="btn-secondary">
              Send a brief <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
