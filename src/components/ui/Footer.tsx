"use client";

import Image from "next/image";
import { GitBranch, Link2, AtSign, Mail, ArrowRight, ArrowUp } from "lucide-react";
import { socialLinks, siteConfig } from "@/data/portfolio";
import { WordmarkSpotlight } from "@/components/ui/WordmarkSpotlight";

const pageLinks = [
  { label: "Home", href: "#hero" },
  { label: "Work", href: "#projects" },
  { label: "Systems", href: "#capabilities" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { label: "GitHub", href: socialLinks.github, Icon: GitBranch, external: true },
  { label: "LinkedIn", href: socialLinks.linkedin, Icon: Link2, external: true },
  { label: "Twitter / X", href: socialLinks.twitter, Icon: AtSign, external: true },
  { label: "Email", href: socialLinks.email, Icon: Mail, external: false },
];

const emailAddress = socialLinks.email.replace(/^mailto:/, "");

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-(--color-bg) text-(--color-fg) border-t border-(--color-border) overflow-hidden"
      role="contentinfo"
    >
      <div className="container section">
        {/* Mark */}
        <Image src="/images/ym-mark.png" alt="Yadnyesh Mulay" width={60} height={60} className="h-12 w-auto sm:h-14 mb-10" />

        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <a href={socialLinks.calendly} target="_blank" rel="noopener noreferrer" className="btn-secondary self-start">
            Book a call <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={socialLinks.email}
            className="font-display font-bold text-2xl md:text-4xl tracking-tight underline decoration-transparent underline-offset-8 transition-colors hover:text-(--color-accent-readable) hover:decoration-(--color-accent-readable)"
          >
            {emailAddress}
          </a>
        </div>

        {/* Middle: pages + socials */}
        <div className="mt-16 flex flex-col gap-12 md:flex-row md:justify-between">
          <nav aria-label="Footer pages">
            <p className="eyebrow mb-5">Pages</p>
            <ul className="flex flex-col gap-3">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.12em] text-(--color-fg-muted) transition-colors hover:text-(--color-fg)"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5">Elsewhere</p>
            <div className="flex items-center gap-3">
              {socials.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="w-10 h-10 rounded-full bg-(--color-accent) text-(--color-fg) flex items-center justify-center transition-colors hover:bg-(--color-accent-hover)"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Giant ghost wordmark, spotlight-reveals on hover/idle-sweep */}
        <div className="mt-20 -mx-[10vw] flex justify-center">
          <WordmarkSpotlight text="YADNYESH" />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 rule pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-widest text-(--color-fg-subtle)">
            © 2026 {siteConfig.name}
          </p>
          <a
            href={socialLinks.email}
            className="font-mono text-xs uppercase tracking-widest text-(--color-fg-muted) transition-colors hover:text-(--color-fg)"
          >
            {emailAddress}
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="font-mono text-xs uppercase tracking-widest text-(--color-fg-muted) transition-colors hover:text-(--color-fg) inline-flex items-center gap-1.5 self-start sm:self-auto"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
