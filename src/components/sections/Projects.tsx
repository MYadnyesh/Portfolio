"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { GitBranch, ExternalLink, FileText, ArrowUpRight } from "lucide-react";

const featuredProjects = projects.filter((p) => p.featured);
const otherProjects = projects.filter((p) => !p.featured);

const proficiencyTagClass: Record<string, string> = {
  Core: "tag-core",
  Used: "tag-used",
  Familiar: "tag-familiar",
  Exploring: "tag-exploring",
};

type Project = (typeof projects)[number];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const linkClass =
  "inline-flex items-center gap-2 font-mono text-xs tracking-wide uppercase text-[var(--color-fg-muted)] hover:text-[var(--color-accent-readable)] transition-colors focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--color-gold)]";

function ProjectLinks({ links, name }: { links: Project["links"]; name: string }) {
  if (!links.github && !links.live && !links.docs) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      {links.live && (
        <a href={links.live} target="_blank" rel="noopener noreferrer" aria-label={`View live demo of ${name}`} className={linkClass}>
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Live
        </a>
      )}
      {links.github && (
        <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label={`View source code for ${name} on GitHub`} className={linkClass}>
          <GitBranch className="w-3.5 h-3.5" aria-hidden="true" /> Source
        </a>
      )}
      {links.docs && (
        <a href={links.docs} target="_blank" rel="noopener noreferrer" aria-label={`Read documentation for ${name}`} className={linkClass}>
          <FileText className="w-3.5 h-3.5" aria-hidden="true" /> Docs
        </a>
      )}
    </div>
  );
}

function IndexRow({ project, index }: { project: Project; index: number }) {
  const tagClass = proficiencyTagClass[project.proficiency] ?? "tag-familiar";
  const roleWord = project.category.split(/[\s/&]+/).filter(Boolean)[0]?.toLowerCase() ?? "";

  return (
    <motion.article
      {...reveal}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border-t border-[var(--color-border)] transition-[padding,background-color] duration-300 hover:bg-[var(--color-bg-card)] px-0 hover:pl-4 md:hover:pl-8 py-10 md:py-12"
    >
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Number */}
        <div className="lg:col-span-1">
          <span className="index-num text-3xl md:text-4xl">{String(index + 1).padStart(2, "0")}</span>
        </div>

        {/* Name + meta */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-none tracking-[-0.02em] text-[var(--color-fg)] group-hover:text-[var(--color-accent-readable)] transition-colors">
              {project.name}
            </h3>
            {roleWord && (
              <span className="text-serif-italic text-2xl md:text-3xl text-[var(--color-accent-readable)]">
                {roleWord}
              </span>
            )}
            <ArrowUpRight
              className="w-6 h-6 text-[var(--color-fg-subtle)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--color-accent-readable)]"
              aria-hidden="true"
            />
          </div>

          <p className="text-lg md:text-xl font-medium text-[var(--color-fg-muted)] leading-relaxed text-pretty max-w-2xl">
            {project.tagline}
          </p>

          <ul className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tech) => (
              <li key={tech} className={tagClass}>{tech}</li>
            ))}
          </ul>
        </div>

        {/* Status / year / links */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end lg:text-right">
          <div className="font-mono text-xs uppercase tracking-wide text-[var(--color-fg-subtle)] flex gap-4 lg:justify-end">
            <span className="text-[var(--color-fg)]">{project.status}</span>
            <span>{project.year}</span>
          </div>
          <ProjectLinks links={project.links} name={project.name} />
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section bg-[var(--color-bg-elevated)]">
      <div className="max-w-[90rem] mx-auto">
        {/* Header */}
        <motion.div
          {...reveal}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6"
        >
          <span className="eyebrow whitespace-nowrap">03 / Selected work</span>
          <span aria-hidden="true" className="flex-1 h-px bg-[var(--color-border)]" />
        </motion.div>

        <motion.h2
          {...reveal}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 font-display font-bold uppercase leading-[0.95] tracking-[-0.02em] text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        >
          The{" "}
          <span className="text-serif-italic normal-case text-[var(--color-accent-readable)]">real</span>{" "}
          index
        </motion.h2>

        <motion.p
          {...reveal}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg text-[var(--color-fg-muted)] leading-relaxed text-pretty"
        >
          Every entry names its own role and tech honestly, no invented metrics, no borrowed logos.
          Repositories verified under{" "}
          <code className="font-mono text-[var(--color-fg)]">github.com/MYadnyesh</code>.
        </motion.p>

        {/* Featured index rows */}
        <div className="mt-16">
          {featuredProjects.map((project, index) => (
            <IndexRow key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Non-featured compact list */}
        {otherProjects.length > 0 && (
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 pt-12 border-t border-[var(--color-border)]"
          >
            <span className="eyebrow">Also on file</span>
            <ul className="mt-6 divide-y divide-[var(--color-border)]">
              {otherProjects.map((project, index) => (
                <li
                  key={project.id}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-5"
                >
                  <div className="flex items-baseline gap-4 min-w-0">
                    <span className="index-num text-base w-10 shrink-0">
                      {String(featuredProjects.length + index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-lg md:text-xl truncate group-hover:text-[var(--color-accent-readable)] transition-colors">
                      {project.name}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-fg-subtle)] hidden sm:inline">
                      {project.year}
                    </span>
                  </div>
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.name} on GitHub`}
                      className={linkClass}
                    >
                      <GitBranch className="w-3.5 h-3.5" aria-hidden="true" /> Source
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </section>
  );
}
