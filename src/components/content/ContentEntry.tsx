import { ArrowUpRight } from "lucide-react";
import {
  FORMATS,
  PLATFORMS,
  TITLE_MAX,
  displayTitle,
  firstLineOf,
  formatDate,
  type ContentItem,
} from "@/content/content-meta";

/**
 * One piece of content, rendered as an editorial row that links out to the
 * original. `compact` clamps the body for the homepage teaser; the /content
 * page shows the full text so the words live on this domain too.
 */
export function ContentEntry({
  item,
  compact = false,
  headingLevel = "h3",
}: {
  item: ContentItem;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const platform = PLATFORMS[item.platform];
  const format = FORMATS[item.format];
  // A post's first line doubles as its headline, so it is skipped in the body
  // to avoid printing it twice. If the headline had to be shortened, the body
  // keeps the full text so no words are lost.
  const headlineIsFirstLine = !item.title && firstLineOf(item.body).length <= TITLE_MAX;
  const body = headlineIsFirstLine
    ? item.body.split(/\r?\n/).slice(item.body.split(/\r?\n/).findIndex((l) => l.trim() !== "") + 1).join("\n").trim()
    : item.body;

  return (
    <article id={item.id} className="grid lg:grid-cols-12 gap-3 lg:gap-8 scroll-mt-28">
      <div className="lg:col-span-3 flex lg:flex-col gap-x-3 gap-y-1 flex-wrap">
        <time dateTime={item.publishedOn} className="font-mono text-xs uppercase tracking-meta text-fg-muted">
          {formatDate(item.publishedOn)}
        </time>
        <span className="font-mono text-xs uppercase tracking-meta text-fg-subtle">
          {format} · {platform}
        </span>
      </div>

      <div className="lg:col-span-7">
        <Heading className="font-display text-xl md:text-2xl font-bold leading-snug text-balance">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-accent-readable"
          >
            {displayTitle(item)}
          </a>
        </Heading>
        {body && (
          <p
            className={
              "mt-3 text-fg-muted text-base md:text-lg leading-relaxed whitespace-pre-line" +
              (compact ? " line-clamp-3" : "")
            }
          >
            {body}
          </p>
        )}
        {item.tags && item.tags.length > 0 && !compact && (
          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label="Topics">
            {item.tags.map((tag) => (
              <li key={tag} className="font-mono text-xs text-fg-subtle">
                #{tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="lg:col-span-2 lg:text-right">
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.platform === "yadnyesh.dev" ? "Read" : `Open on ${platform}`} (opens in a new tab)`}
          className="inline-flex items-center gap-1.5 min-h-11 whitespace-nowrap font-mono text-xs uppercase tracking-meta text-fg border-b border-fg-subtle pb-1 hover:border-accent hover:text-accent transition-colors"
        >
          {item.platform === "yadnyesh.dev" ? "Read" : platform}
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
