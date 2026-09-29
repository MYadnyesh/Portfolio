import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contentItems, getLatestContent, hasContent } from "@/content/posts";
import { ContentEntry } from "@/components/content/ContentEntry";

/**
 * Homepage teaser for /content. Renders nothing until the first item exists,
 * so the homepage never shows an empty "Latest" block.
 */
export function LatestContent() {
  if (!hasContent) return null;
  const items = getLatestContent(3);

  return (
    <section id="latest" className="section" aria-labelledby="latest-title">
      <div className="container">
        <div className="section-header mb-12">
          <span className="eyebrow">Content</span>
          <h2 id="latest-title" className="section-title mt-3 font-bold uppercase">
            Latest <span className="text-serif-italic lowercase text-accent-readable">writing</span>
          </h2>
          <p className="section-subtitle">What I have been writing and posting lately.</p>
        </div>

        <div>
          {items.map((item, index) => (
            <div key={item.id} className={index !== 0 ? "rule pt-8 mt-8" : ""}>
              <ContentEntry item={item} compact />
            </div>
          ))}
        </div>

        <div className="rule mt-12 pt-8">
          <Link
            href="/content"
            className="inline-flex items-center gap-2 min-h-11 font-mono text-xs uppercase tracking-meta text-fg border-b border-fg-subtle pb-1 hover:border-accent hover:text-accent transition-colors"
          >
            All writing and posts ({contentItems.length})
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
