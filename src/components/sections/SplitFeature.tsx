"use client";

import { motion } from "framer-motion";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

/**
 * Two split feature blocks: "IN PUBLIC" / "IN THE LAB", styled after the
 * source's ON RECORD / IN THE ROOM blocks: mixed bold + serif-italic type,
 * photo slots, alternating dark/light.
 */
export function SplitFeature() {
  return (
    <section id="layers" className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* IN PUBLIC */}
        <div className="relative min-h-130 flex flex-col justify-between p-8 md:p-12 bg-bg border-b lg:border-b-0 lg:border-r border-border">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="eyebrow">04 / In Public</span>
            </div>
            <h3 className="font-display leading-[0.9] mb-6">
              <span className="font-bold uppercase text-fg block text-5xl md:text-6xl">
                In
              </span>
              <span className="text-serif-italic text-accent-readable text-5xl md:text-7xl">
                public
              </span>
            </h3>
            <p className="max-w-md text-lg md:text-xl font-medium text-fg-muted leading-relaxed">
              The visible layer: shipped projects, open-source repositories, community work, and
              teaching. Everything you can check before we ever talk.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["PROJECTS", "GITHUB", "MENTORSHIP", "COMMUNITY"].map((t) => (
                <span key={t} className="tag-used">{t}</span>
              ))}
            </div>
          </div>
          <div className="mt-10 w-full max-w-60">
            <PhotoPlaceholder ratio="4/3" alt="Public / teaching photo" src="/images/photos/in-public.gif" />
          </div>
        </div>

        {/* IN THE LAB */}
        <div className="relative min-h-130 flex flex-col justify-between p-8 md:p-12 section-light">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs tracking-label uppercase text-bg/60">
                05 / In the Lab
              </span>
            </div>
            <h3 className="font-display leading-[0.9] mb-6">
              <span className="font-bold uppercase text-bg block text-5xl md:text-6xl">
                In the
              </span>
              <span className="text-serif-italic text-accent text-5xl md:text-7xl">
                lab
              </span>
            </h3>
            <p className="max-w-md text-lg md:text-xl font-medium text-bg/75 leading-relaxed">
              The experimental layer: local LLMs, agentic workflows, MCP, multi-agent systems, and
              inference. Exploration that feeds the next thing I build.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["LOCAL LLMs", "AGENTS", "MCP", "RAG", "AUTOMATION"].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2.5 py-1 rounded-sm font-mono text-[0.7rem] tracking-meta border border-bg/25 text-bg/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 w-full max-w-60 ml-auto">
            <PhotoPlaceholder
              ratio="4/3"
              alt="Lab / experiments photo"
              src="/images/photos/in-the-lab.gif"
              className="border-bg/20 bg-bg/5"
            />
          </div>
        </div>
      </div>

      {/* Motion wrapper for reveal */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="block h-px bg-accent origin-left"
        aria-hidden
      />
    </section>
  );
}
