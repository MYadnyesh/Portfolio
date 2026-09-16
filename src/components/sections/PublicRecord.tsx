"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/data/portfolio";

/**
 * "Public record" - where I've worked. Real roles, dates, and locations,
 * on the inverted bone canvas. No fabricated metrics.
 */
export function PublicRecord() {
  return (
    <section id="record" className="section-light">
      <div className="section">
        <div className="mx-auto w-full max-w-360">
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-(--color-bg)/60">
              02 / Experience
            </span>
            <span className="flex-1 h-px bg-(--color-bg)/15" />
          </div>

          <h2 className="font-display font-bold uppercase text-(--color-bg) leading-[0.95] mb-16 max-w-3xl tracking-[-0.02em]">
            Where I&apos;ve <span className="text-serif-italic normal-case text-(--color-accent)">worked</span>.
          </h2>

          <div className="border-t border-(--color-bg)/15">
            {work.map((job, i) => {
              const Row = (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 md:py-10 items-baseline">
                  {/* Index + dates */}
                  <div className="lg:col-span-3">
                    <span className="font-display font-bold text-2xl text-(--color-bg)/25 mr-3 align-baseline tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[0.7rem] tracking-[0.06em] uppercase text-(--color-bg)/55">
                      {job.period}
                    </span>
                  </div>

                  {/* Company + role */}
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold text-3xl md:text-4xl text-(--color-bg) leading-none group-hover:text-(--color-accent) transition-colors">
                        {job.company}
                      </h3>
                      {job.link && (
                        <ArrowUpRight
                          className="w-5 h-5 text-(--color-bg)/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-(--color-accent)"
                          aria-hidden
                        />
                      )}
                    </div>
                    <p className="mt-3 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-(--color-bg)/55">
                      {job.role} · {job.type} · {job.location}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="lg:col-span-4">
                    <p className="text-base md:text-lg text-(--color-bg)/70 leading-relaxed max-w-md">
                      {job.summary}
                    </p>
                  </div>
                </div>
              );

              return (
                <motion.div
                  key={job.company + job.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                  className="group border-b border-(--color-bg)/15"
                >
                  {job.link ? (
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={`${job.company}, ${job.role} (opens in a new tab)`}
                    >
                      {Row}
                    </a>
                  ) : (
                    Row
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
