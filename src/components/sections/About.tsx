"use client";

import { motion } from "framer-motion";
import { siteConfig, experience, community } from "@/data/portfolio";

const timeline = [
  {
    period: "2020–2022",
    label: "Full-stack foundations",
    detail: "Shipped web applications end-to-end, React, Node.js, databases, deployment.",
  },
  {
    period: "2021–2023",
    label: "MSc Computer Science, University of Greenwich",
    detail: "Distinction. Capstone: Track-Master, a MERN train-ticket booking system with TfL API integration, PDF ticket generation, and payment processing.",
  },
  {
    period: "2023–2024",
    label: "Cloud & platform certification",
    detail: "AWS Solutions Architect – Associate, Azure Fundamentals (AZ-900), Azure Developer Associate (AZ-204), Google AI Essentials.",
  },
  {
    period: "2024–Present",
    label: "AI-native software",
    detail: "OutSkill AI Generalist Accelerator. Built Prism, the Microsoft 365 Sentiment Analyzer, and the Gmail/Chat Sentiment Analyzer, putting LLM APIs, RAG, and hybrid NLP into working products.",
  },
];

export function About() {
  return (
    <section id="about" className="section bg-[var(--color-bg-elevated)]">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5"
          >
            <span className="eyebrow">About</span>
            <h2 className="font-display text-h1 mt-3 mb-6 text-balance">
              {siteConfig.description}
            </h2>
            <p className="text-lg md:text-xl text-[var(--color-fg-muted)] leading-relaxed max-w-md">
              {siteConfig.title}, comfortable moving between product decisions, system
              architecture, and the model layer itself. This is the record of how that came together.
            </p>
          </motion.div>

          <div className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-[var(--color-border)]">
            {timeline.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={index !== 0 ? "rule pt-6 mt-6" : ""}
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
                  <span className="font-mono text-xs tracking-wide text-[var(--color-fg-subtle)] sm:w-24 sm:flex-shrink-0">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="font-display text-lg mb-1">{item.label}</h3>
                    <p className="text-[var(--color-fg-muted)] text-base md:text-lg leading-relaxed max-w-xl">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credentials strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rule mt-16 pt-10"
        >
          <span className="eyebrow block mb-6">Credentials</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {experience
              .filter((e) => e.org !== "University of Greenwich")
              .map((cred) => (
                <div key={cred.role}>
                  <p className="font-display text-base leading-snug mb-1">{cred.role}</p>
                  <p className="text-xs text-[var(--color-fg-subtle)] font-mono">
                    {cred.org} · {cred.period}
                  </p>
                </div>
              ))}
          </div>
        </motion.div>

        {/* Community & volunteering strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="rule mt-16 pt-10"
        >
          <span className="eyebrow block mb-6">Community &amp; volunteering</span>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {community.map((c) => (
              <div key={c.role + c.org}>
                <p className="font-display text-base leading-snug mb-1">{c.role}</p>
                <p className="text-xs text-[var(--color-fg-subtle)] font-mono mb-1">
                  {c.org} · {c.period}
                </p>
                <p className="text-sm text-[var(--color-fg-muted)] leading-relaxed">{c.details}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
