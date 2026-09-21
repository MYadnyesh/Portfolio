"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { tShapedData } from "@/data/portfolio";

type TabId = "vertical" | "cloud" | "fullstack" | "product" | "consulting" | "foundation";

const breadthTabs: TabId[] = ["cloud", "fullstack", "product", "consulting"];
const tabOrder: TabId[] = [...breadthTabs, "vertical", "foundation"];

const PANEL_ID = "t-shaped-panel";

const tileBase =
  "group relative w-full border-2 text-left transition-all duration-300 outline-none " +
  "focus-visible:ring-2 focus-visible:ring-(--color-gold) focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-(--color-bg-elevated)";

const tileIdle =
  "border-(--color-border-strong-solid) bg-(--color-bg-card) " +
  "hover:-translate-y-1 hover:border-(--color-accent-readable) hover:shadow-[var(--shadow-lg)]";

const tileActive =
  "-translate-y-1 border-(--color-accent) bg-(--color-accent) shadow-[var(--shadow-lg)]";

/* Blueprint rules are 3px so they read as structure, not as the site's hairlines. */
const rule = "bg-(--color-border-strong-solid)";

export function TShapedEngineering() {
  const [activeTab, setActiveTab] = useState<TabId>("vertical");

  const tabData: Record<TabId, { title: string; description?: string; items: string[] }> = {
    vertical: tShapedData.vertical,
    cloud: tShapedData.horizontal[0],
    fullstack: tShapedData.horizontal[1],
    product: tShapedData.horizontal[2],
    consulting: tShapedData.horizontal[3],
    foundation: tShapedData.foundation,
  };

  const currentData = tabData[activeTab];
  const kind =
    activeTab === "vertical" ? "Depth" : activeTab === "foundation" ? "Foundation" : "Breadth";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    let newIndex = currentIndex;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabOrder.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = tabOrder.length - 1;
        break;
      default:
        return;
    }
    const next = tabOrder[newIndex];
    setActiveTab(next);
    document.getElementById(`t-tab-${next}`)?.focus();
  };

  const tabProps = (id: TabId) => ({
    id: `t-tab-${id}`,
    role: "tab" as const,
    "aria-selected": activeTab === id,
    "aria-controls": PANEL_ID,
    tabIndex: activeTab === id ? 0 : -1,
    onClick: () => setActiveTab(id),
    onKeyDown: handleKeyDown,
  });

  return (
    <section id="t-shaped" className="section bg-(--color-bg-elevated)">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="section-header mb-12"
        >
          <span className="eyebrow">Shape of the skillset</span>
          <h2 className="section-title mt-3">T-Shaped Engineering</h2>
          <p className="section-subtitle">
            Vertical depth in AI/LLMs. Horizontal breadth across Cloud, Full Stack, Product/UX, and
            Business Consulting, resting on software engineering fundamentals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-14"
        >
          {/* Keyboard affordance */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <span className="eyebrow">The diagram</span>
            <span className="hidden sm:flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-meta text-(--color-fg-subtle)">
              <kbd className="border border-(--color-border-strong-solid) px-1.5 py-0.5 not-italic">
                &larr;
              </kbd>
              <kbd className="border border-(--color-border-strong-solid) px-1.5 py-0.5 not-italic">
                &rarr;
              </kbd>
              to move
            </span>
          </div>

          <div role="tablist" aria-label="Skillset areas" aria-orientation="horizontal">
            {/* Crossbar: the breadth of the T */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {breadthTabs.map((id, i) => {
                const active = activeTab === id;
                return (
                  <button
                    key={id}
                    {...tabProps(id)}
                    className={cn(tileBase, active ? tileActive : tileIdle, "p-4 md:p-5")}
                  >
                    <span
                      className={cn(
                        "index-num block text-sm mb-2 transition-colors",
                        active
                          ? "text-[#f4f0e8]/70"
                          : "text-(--color-fg-subtle) group-hover:text-(--color-accent-readable)"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display font-bold uppercase leading-none tracking-tight text-lg md:text-xl transition-colors",
                        active
                          ? "text-[#f4f0e8]"
                          : "text-(--color-fg-muted) group-hover:text-(--color-fg)"
                      )}
                    >
                      {tabData[id].title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bracket gathering the crossbar, ticks turned up */}
            <div aria-hidden className="relative h-3.5 mt-4">
              <span className={cn("absolute inset-x-0 bottom-0 h-[3px]", rule)} />
              <span className={cn("absolute left-0 bottom-0 h-3.5 w-[3px]", rule)} />
              <span className={cn("absolute right-0 bottom-0 h-3.5 w-[3px]", rule)} />
            </div>

            <div aria-hidden className="flex justify-center">
              <span className={cn("h-10 w-[3px]", rule)} />
            </div>

            {/* Stem: the depth of the T */}
            <div className="max-w-sm mx-auto">
              <button
                {...tabProps("vertical")}
                className={cn(
                  tileBase,
                  activeTab === "vertical" ? tileActive : tileIdle,
                  "px-5 py-6 text-center"
                )}
              >
                <span
                  className={cn(
                    "block font-mono text-[0.7rem] uppercase tracking-label mb-2 transition-colors",
                    activeTab === "vertical"
                      ? "text-[#f4f0e8]/70"
                      : "text-(--color-fg-subtle) group-hover:text-(--color-accent-readable)"
                  )}
                >
                  Primary focus
                </span>
                <span
                  className={cn(
                    "font-display font-bold uppercase leading-none tracking-tight text-2xl md:text-3xl transition-colors",
                    activeTab === "vertical"
                      ? "text-[#f4f0e8]"
                      : "text-(--color-fg) group-hover:text-(--color-fg)"
                  )}
                >
                  {tShapedData.vertical.title}
                </span>
              </button>
            </div>

            <div aria-hidden className="flex justify-center">
              <span className={cn("h-10 w-[3px]", rule)} />
            </div>

            {/* Bracket opening down onto the foundation */}
            <div aria-hidden className="relative h-3.5 max-w-3xl mx-auto">
              <span className={cn("absolute inset-x-0 top-0 h-[3px]", rule)} />
              <span className={cn("absolute left-0 top-0 h-3.5 w-[3px]", rule)} />
              <span className={cn("absolute right-0 top-0 h-3.5 w-[3px]", rule)} />
            </div>

            <div className="max-w-3xl mx-auto mt-4">
              <button
                {...tabProps("foundation")}
                className={cn(
                  tileBase,
                  activeTab === "foundation" ? tileActive : tileIdle,
                  "px-5 py-5 text-center"
                )}
              >
                <span
                  className={cn(
                    "font-display font-bold uppercase leading-none tracking-tight text-lg md:text-2xl transition-colors",
                    activeTab === "foundation"
                      ? "text-[#f4f0e8]"
                      : "text-(--color-fg-muted) group-hover:text-(--color-fg)"
                  )}
                >
                  {tShapedData.foundation.title}
                </span>
                <span
                  className={cn(
                    "block font-mono text-[0.7rem] uppercase tracking-label mt-2 transition-colors",
                    activeTab === "foundation"
                      ? "text-[#f4f0e8]/70"
                      : "text-(--color-fg-subtle) group-hover:text-(--color-accent-readable)"
                  )}
                >
                  The bedrock everything builds on
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Detail panel */}
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={`t-tab-${activeTab}`}
          tabIndex={0}
          className="border-2 border-(--color-border-strong-solid) bg-(--color-bg-card) p-6 md:p-8"
        >
          <div className="mb-8">
            <span className="eyebrow">{kind}</span>
            <h3 className="font-display font-bold uppercase tracking-tight text-2xl md:text-3xl mt-2">
              {currentData.title}
            </h3>
            {currentData.description && (
              <p className="text-(--color-fg-muted) text-lg md:text-xl mt-2 max-w-2xl">
                {currentData.description}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
            {currentData.items.map((item, index) => (
              <motion.div
                key={`${activeTab}-${item}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-baseline gap-3 py-2.5 border-b border-(--color-border)"
              >
                <span className="index-num text-xs">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm md:text-base text-(--color-fg)">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
