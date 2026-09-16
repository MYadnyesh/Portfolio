"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { capabilities } from "@/data/portfolio";

const aiPipeline = [
  {
    stage: "LLM APIs",
    description: "Integration & orchestration",
    items: capabilities.aiLlm.filter((c) => c.proficiency === "Core").map((c) => c.name),
  },
  {
    stage: "Retrieval",
    description: "Grounding & context",
    items: capabilities.aiLlm.filter((c) => c.proficiency === "Used").map((c) => c.name),
  },
  {
    stage: "Agents & Workflows",
    description: "Autonomous reasoning & orchestration",
    items: capabilities.aiLlm.filter((c) => c.proficiency === "Exploring").map((c) => c.name),
  },
  {
    stage: "Infrastructure",
    description: "Local inference & serving",
    items: capabilities.aiEngineering.map((c) => c.name),
  },
];

const aiPrinciples = [
  {
    title: "AI is a capability, not the product",
    description: "LLMs enable better products, they don't replace product thinking. The value is in what the system enables users to do.",
  },
  {
    title: "Evals before vibes",
    description: "Systematic evaluation beats prompt tweaking. Build eval infrastructure first.",
  },
  {
    title: "Ground in reality",
    description: "RAG, citations, and verification aren't optional. Hallucination is a feature of the architecture, not a bug to prompt away.",
  },
  {
    title: "Design for the failure modes",
    description: "Latency, cost, rate limits, degradation. Graceful degradation beats a perfect happy path.",
  },
  {
    title: "Human + AI beats AI alone",
    description: "Best systems keep humans in the loop for judgment, creativity, and accountability.",
  },
  {
    title: "Start simple, scale deliberately",
    description: "Single LLM call → RAG → Agent → Multi-agent. Add complexity only when the simpler layer is proven insufficient.",
  },
];

export function AISystems() {
  return (
    <section id="ai-systems" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-header mb-12"
        >
          <span className="eyebrow">How I think about AI</span>
          <h2 className="section-title mt-3">AI Systems Engineering</h2>
          <p className="section-subtitle">
            AI isn&apos;t a bolt-on feature, it&apos;s an integrated engineering layer, from API call to
            production workflow.
          </p>
        </motion.div>

        {/* Pipeline */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)] mb-16">
          {aiPipeline.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[var(--color-bg)] p-5"
            >
              <span className="index-num text-xl">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-base mt-2">{stage.stage}</h3>
              <p className="text-[var(--color-fg-subtle)] text-xs font-mono mt-1 mb-4">{stage.description}</p>
              <ul className="space-y-1.5" role="list">
                {stage.items.length > 0 ? (
                  stage.items.map((item) => (
                    <li key={item} className="text-base md:text-lg text-[var(--color-fg-muted)]">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-[var(--color-fg-subtle)] italic">&middot;</li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="eyebrow block mb-6">Engineering Principles</span>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
              >
                <Card padding="md" className="h-full">
                  <h4 className="font-display text-base mb-2">{principle.title}</h4>
                  <p className="text-[var(--color-fg-muted)] text-base md:text-lg leading-relaxed">{principle.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
