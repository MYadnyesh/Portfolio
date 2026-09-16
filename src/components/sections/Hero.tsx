"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Volume2 } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import Image from "next/image";

const marqueeWords = [
  "AI PRODUCTS",
  "FULL STACK",
  "LLM APPS",
  "AUTOMATION",
  "MENTORSHIP",
  "PROTOTYPES",
  "TEACHING",
];

function PronunciationEntry() {
  const [speaking, setSpeaking] = useState(false);

  const playPronunciation = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance("Yadnyesh");
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2">
      <button
        type="button"
        onClick={playPronunciation}
        aria-label="Play pronunciation of Yadnyesh"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--color-border)] text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        <Volume2 className={`w-4 h-4 ${speaking ? "animate-pulse" : ""}`} aria-hidden="true" />
      </button>
      <span className="font-mono text-sm text-[var(--color-fg-muted)]">/ˈjəd.nyeʃ/</span>
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-fg-subtle)]">
        proper noun
      </span>
      <span className="w-full text-base md:text-lg font-medium text-[var(--color-fg)] max-w-md">
        ships fast. builds real things. adds AI where it earns its place.
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Starfield atmosphere */}
      <div className="absolute inset-0 -z-10 starfield" aria-hidden />

      <div className="flex-1 flex flex-col justify-center pt-28 pb-8 px-4 md:px-8 lg:px-16">
        <div className="mx-auto w-full max-w-[90rem]">
          {/* Mark */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Image src="/images/ym-mark.png" alt="" width={72} height={72} className="h-14 w-auto sm:h-16" priority />
          </motion.div>

          {/* Eyebrow row, left + right */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center justify-between rule pt-4 mb-10"
          >
            <span className="eyebrow">Independent, AI-First Developer</span>
            <span className="eyebrow hidden sm:block">Full-Stack &amp; AI Engineer</span>
          </motion.div>

          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-bold uppercase leading-[0.92] tracking-tight text-[var(--color-fg)]"
              style={{ fontSize: "clamp(3rem, 7vw, 6.75rem)" }}
            >
              I build useful things
              <br />
              and ship them with{" "}
              <span className="text-serif-italic lowercase text-[var(--color-accent-readable)]">
                ai
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-7 max-w-2xl text-lg md:text-xl text-[var(--color-fg-muted)] leading-relaxed"
            >
              Full-stack product builds, AI integration, and hands-on teaching for students and
              professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a href="#projects" className="btn-accent group">
                Explore the work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={socialLinks.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--color-fg)] border-b border-[var(--color-fg-subtle)] pb-1 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                Book a call &rarr;
              </a>
            </motion.div>
          </div>
        </div>

        {/* Name wordmark, fully legible, no overlap + portrait photo slot alongside */}
        <div className="relative mx-auto w-full max-w-[90rem] mt-12 lg:mt-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-end justify-between gap-6 md:gap-10"
          >
            {/* Full wordmark, never obscured */}
            <div
              className="wordmark-fill select-none flex-1 min-w-0 whitespace-nowrap"
              style={{ fontSize: "clamp(2.5rem, 11vw, 12rem)" }}
              aria-label="Yadnyesh"
            >
              YADNYESH
            </div>
            {/* Portrait photo slot, alongside, never covering the name */}
            <div className="shrink-0 w-[22%] max-w-[220px] min-w-[110px] hidden sm:block">
              <PhotoPlaceholder
                ratio="3/4"
                alt="Portrait of Yadnyesh"
                src="/images/photos/Yadnyesh.png"
                className="rounded-none"
              />
            </div>
          </motion.div>

          {/* Dictionary-style entry: pronunciation + a one-line "definition" */}
          <PronunciationEntry />
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="border-y border-[var(--color-border)] overflow-hidden">
        <div className="marquee-track py-4">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center shrink-0" aria-hidden={dup === 1}>
              {marqueeWords.map((word) => (
                <span
                  key={word}
                  className="font-display font-bold text-lg md:text-2xl uppercase tracking-tight text-[var(--color-fg-muted)] mx-6 flex items-center gap-6"
                >
                  {word}
                  <span className="text-[var(--color-accent)] font-mono text-base">-</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
