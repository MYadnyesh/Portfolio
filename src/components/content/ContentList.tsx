"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { FORMATS, type ContentItem, type Format } from "@/content/content-meta";
import { ContentEntry } from "./ContentEntry";

/**
 * Filterable list for /content. Rendered on the server with every item
 * visible (initial filter "all"), so crawlers and no-JS visitors get the full
 * list; the filter only narrows it in the browser.
 */
export function ContentList({ items }: { items: ContentItem[] }) {
  const [filter, setFilter] = useState<Format | "all">("all");

  // Offer only the formats that actually exist, in the canonical order.
  const formats = useMemo(
    () => (Object.keys(FORMATS) as Format[]).filter((f) => items.some((item) => item.format === f)),
    [items]
  );
  const visible = filter === "all" ? items : items.filter((item) => item.format === filter);

  // Year dividers make a long list scannable.
  const byYear = useMemo(() => {
    const groups = new Map<string, ContentItem[]>();
    for (const item of visible) {
      const year = item.publishedOn.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), item]);
    }
    return [...groups.entries()];
  }, [visible]);

  const filterLabel = (f: Format) => {
    const label = FORMATS[f];
    return label.endsWith("s") ? label : `${label}s`;
  };

  return (
    <>
      {formats.length > 1 && (
        <div role="group" aria-label="Filter by format" className="flex flex-wrap gap-2 mb-12">
          {(["all", ...formats] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "min-h-11 px-4 font-mono text-xs uppercase tracking-meta border transition-colors",
                filter === f
                  ? "border-accent text-accent-readable"
                  : "border-border text-fg-muted hover:text-fg hover:border-fg-subtle"
              )}
            >
              {f === "all" ? `All (${items.length})` : filterLabel(f)}
            </button>
          ))}
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {items.length} items
      </p>

      {byYear.map(([year, group]) => (
        <section key={year} aria-labelledby={`year-${year}`} className="mb-16">
          <h2 id={`year-${year}`} className="index-num text-xl mb-6">
            {year}
          </h2>
          <div>
            {group.map((item, index) => (
              <div key={item.id} className={index !== 0 ? "rule pt-8 mt-8" : ""}>
                <ContentEntry item={item} headingLevel="h3" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
