"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { socialLinks } from "@/data/portfolio";

// Hash hrefs scroll to a section on the homepage; hrefs starting with "/" are
// real routes and navigate normally. Index numbers are derived from position.
const baseNavItems = [
  { href: "#hero", label: "Home" },
  { href: "#projects", label: "Work" },
  { href: "#t-shaped", label: "Systems" },
  { href: "#testimonials", label: "Words" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const isRoute = (href: string) => href.startsWith("/");

export function Navigation({ showContent = false }: { showContent?: boolean }) {
  const navItems = useMemo(() => {
    const items = [...baseNavItems];
    // "Content" appears only once there is something to show (see src/content/posts.ts).
    if (showContent) {
      items.splice(items.findIndex((item) => item.href === "#contact"), 0, { href: "/content", label: "Content" });
    }
    return items.map((item, i) => ({ ...item, index: String(i).padStart(2, "0") }));
  }, [showContent]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // IntersectionObserver to track active section
  useEffect(() => {
    const sections = navItems
      .filter((item) => !isRoute(item.href))
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id ? `#${entry.target.id}` : "#hero");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    return () => observerRef.current?.disconnect();
  }, [navItems]);

  const scrollTo = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const isActive = (href: string) => activeSection === href;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-bg",
          isScrolled ? "border-b border-border" : "border-b border-transparent"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 md:px-8 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / index mark */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="flex items-center opacity-90 hover:opacity-100 transition-opacity"
              aria-label="Yadnyesh Mulay - Home"
            >
              <Image src="/images/ym-mark.png" alt="" width={52} height={52} className="h-11 w-auto sm:h-12" priority />
            </a>

            {/* Desktop Navigation, editorial index list */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems
                .filter((item) => item.href !== "#hero")
                .map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      if (isRoute(item.href)) return;
                      e.preventDefault();
                      scrollTo(item.href);
                    }}
                    className={cn(
                      "font-mono text-xs tracking-meta uppercase transition-colors relative py-2",
                      isActive(item.href)
                        ? "text-accent"
                        : "text-fg-muted hover:text-fg"
                    )}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <span className="text-fg-subtle mr-1.5">{item.index} /</span>
                    {item.label}
                  </a>
                ))}
              <a
                href={socialLinks.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono uppercase tracking-meta text-fg border-b border-accent pb-0.5 hover:text-accent transition-colors ml-2"
              >
                Book a call &rarr;
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden font-mono text-xs tracking-meta uppercase text-fg-muted hover:text-fg transition-colors min-h-11 min-w-11 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg md:hidden flex flex-col justify-center px-6"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    if (isRoute(item.href)) {
                      setIsMobileMenuOpen(false);
                      return;
                    }
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i }}
                  className="flex items-baseline gap-4 py-4 border-b border-border min-h-11"
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  <span className="index-num text-lg">{item.index}</span>
                  <span
                    className={cn(
                      "font-display text-3xl",
                      isActive(item.href) ? "text-accent" : "text-fg"
                    )}
                  >
                    {item.label}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href={socialLinks.calendly}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * navItems.length }}
                className="btn-accent w-full text-center mt-8 min-h-11 flex items-center justify-center"
              >
                Book a call
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator, thin hairline, single accent, no gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px z-50 pointer-events-none origin-left"
        style={{ background: "var(--color-accent)", scaleX }}
      />
    </>
  );
}
