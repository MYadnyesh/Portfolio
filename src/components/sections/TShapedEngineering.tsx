"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { tShapedData } from "@/data/portfolio";
import { Card } from "@/components/ui/Card";

type TabId = "vertical" | "cloud" | "fullstack" | "product" | "foundation";

const tabs: { id: TabId; label: string }[] = [
  { id: "vertical", label: "AI / LLMs, Depth" },
  { id: "cloud", label: "Cloud" },
  { id: "fullstack", label: "Full Stack" },
  { id: "product", label: "Product / UX" },
  { id: "foundation", label: "Foundation" },
];

export function TShapedEngineering() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabId>("vertical");

  const tabData: Record<TabId, { title: string; description?: string; items: string[] }> = {
    vertical: tShapedData.vertical,
    cloud: tShapedData.horizontal[0],
    fullstack: tShapedData.horizontal[1],
    product: tShapedData.horizontal[2],
    foundation: tShapedData.foundation,
  };

  const currentData = tabData[activeTab];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const ids = tabs.map((t) => t.id);
    const currentIndex = ids.indexOf(activeTab);
    let newIndex = currentIndex;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newIndex = (currentIndex + 1) % ids.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        newIndex = (currentIndex - 1 + ids.length) % ids.length;
        break;
      case "Home":
        e.preventDefault();
        newIndex = 0;
        break;
      case "End":
        e.preventDefault();
        newIndex = ids.length - 1;
        break;
      default:
        return;
    }
    setActiveTab(ids[newIndex]);
  };

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
            Vertical depth in AI/LLMs. Horizontal breadth across Cloud, Full Stack, and Product/UX,
            resting on software engineering fundamentals.
          </p>
        </motion.div>

        {/* Diagram: a literal T, drawn in hairlines */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div
            role="tablist"
            aria-label="Engineering breadth areas"
            className="flex items-stretch justify-center gap-px bg-(--color-border) max-w-3xl mx-auto"
          >
            {(["cloud", "fullstack", "product"] as TabId[]).map((id) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                tabIndex={activeTab === id ? 0 : -1}
                onClick={() => setActiveTab(id)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "flex-1 bg-(--color-bg-elevated) px-4 py-5 text-center transition-colors",
                  activeTab === id ? "bg-(--color-bg-card)" : "hover:bg-(--color-bg-card)/60"
                )}
              >
                <span
                  className={cn(
                    "font-display text-sm",
                    activeTab === id ? "text-(--color-accent)" : "text-(--color-fg-muted)"
                  )}
                >
                  {tabData[id].title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <div className="w-px h-8 bg-(--color-border)" />
          </div>

          <div className="max-w-xs mx-auto">
            <button
              role="tab"
              aria-selected={activeTab === "vertical"}
              tabIndex={activeTab === "vertical" ? 0 : -1}
              onClick={() => setActiveTab("vertical")}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full border px-4 py-6 text-center transition-colors",
                activeTab === "vertical"
                  ? "border-(--color-accent) bg-(--color-bg-card)"
                  : "border-(--color-border) hover:border-(--color-border-strong-solid)"
              )}
            >
              <span className="eyebrow block mb-1">Primary Focus</span>
              <span className="font-display text-lg">{tShapedData.vertical.title}</span>
            </button>
          </div>

          <div className="flex justify-center">
            <div className="w-px h-8 bg-(--color-border)" />
          </div>

          <div className="max-w-2xl mx-auto">
            <button
              role="tab"
              aria-selected={activeTab === "foundation"}
              tabIndex={activeTab === "foundation" ? 0 : -1}
              onClick={() => setActiveTab("foundation")}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full border px-4 py-4 text-center transition-colors",
                activeTab === "foundation"
                  ? "border-(--color-accent) bg-(--color-bg-card)"
                  : "border-(--color-border) hover:border-(--color-border-strong-solid)"
              )}
            >
              <span className="font-display text-base">{tShapedData.foundation.title}</span>
              <span className="block text-(--color-fg-subtle) text-xs mt-1">
                The bedrock everything builds on
              </span>
            </button>
          </div>
        </motion.div>

        {/* Detail panel */}
        <Card padding="lg">
          <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
            <div>
              <h3 className="font-display text-xl">{currentData.title}</h3>
              {"description" in currentData && currentData.description && (
                <p className="text-(--color-fg-muted) text-lg md:text-xl mt-1 max-w-lg">{currentData.description}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-2.5 py-1 font-mono text-xs tracking-wide uppercase transition-colors",
                    activeTab === tab.id
                      ? "text-(--color-accent)"
                      : "text-(--color-fg-subtle) hover:text-(--color-fg-muted)"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1"
            ref={containerRef}
          >
            {currentData.items.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="flex items-baseline gap-2 py-1.5 border-b border-(--color-border)"
              >
                <span className="index-num text-xs">{String(index + 1).padStart(2, "0")}</span>
                <span className="text-sm text-(--color-fg)">{item}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
