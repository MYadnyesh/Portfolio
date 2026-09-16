"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

interface TestimonialCard {
  name: string;
  handle: string;
  timestamp: string;
  body: string;
}

const testimonials: TestimonialCard[] = [
  {
    name: "Name, role",
    handle: "@handle",
    timestamp: "recently",
    body: "[ Paste a real message from a student, mentee, or peer here, LinkedIn note, feedback, or testimonial. ]",
  },
  {
    name: "Name, role",
    handle: "@handle",
    timestamp: "recently",
    body: "[ Paste a real message from a student, mentee, or peer here, LinkedIn note, feedback, or testimonial. ]",
  },
  {
    name: "Name, role",
    handle: "@handle",
    timestamp: "recently",
    body: "[ Paste a real message from a student, mentee, or peer here, LinkedIn note, feedback, or testimonial. ]",
  },
  {
    name: "Name, role",
    handle: "@handle",
    timestamp: "recently",
    body: "[ Paste a real message from a student, mentee, or peer here, LinkedIn note, feedback, or testimonial. ]",
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;
    const firstCard = container.querySelector<HTMLElement>("[data-card]");
    const amount = firstCard ? firstCard.offsetWidth + 20 : container.clientWidth * 0.85;
    container.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="section section-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">What learners and peers say</p>
              <h2 className="font-display font-bold uppercase tracking-tight text-3xl md:text-5xl mt-3 leading-[0.95]">
                Words from the <span className="text-serif-italic lowercase">room</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Previous testimonials"
                className="w-11 h-11 flex items-center justify-center border border-current/30 rounded-[var(--radius-md)] transition-colors hover:bg-(--color-bg) hover:text-(--color-fg)"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Next testimonials"
                className="w-11 h-11 flex items-center justify-center border border-current/30 rounded-[var(--radius-md)] transition-colors hover:bg-(--color-bg) hover:text-(--color-fg)"
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.14em] mt-4 opacity-60">
            Real messages, I&apos;ll add these in.
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          className="mt-10 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-1 px-1 scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {testimonials.map((t, i) => (
            <motion.article
              key={i}
              data-card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="snap-start shrink-0 w-[85%] sm:w-[380px] bg-(--color-bg) text-(--color-fg) border border-(--color-border) rounded-[var(--radius-lg)] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                  <PhotoPlaceholder ratio="1/1" alt="" label="Add avatar" className="rounded-full" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display font-bold text-sm truncate">{t.name}</p>
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-(--color-fg-subtle) border border-(--color-border-strong-solid) rounded-[var(--radius-sm)] px-1.5 py-0.5">
                      {t.handle}
                    </span>
                  </div>
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-(--color-fg-subtle) mt-1">
                    {t.timestamp}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-(--color-fg-muted) mt-4 whitespace-pre-line">
                {t.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
