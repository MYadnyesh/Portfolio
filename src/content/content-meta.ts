/**
 * Labels, types and pure helpers for content items. Kept separate from
 * posts.ts so client components can use them without pulling the JSON data
 * and its validation into the browser bundle.
 */

export const PLATFORMS = {
  linkedin: "LinkedIn",
  x: "X",
  medium: "Medium",
  substack: "Substack",
  youtube: "YouTube",
  github: "GitHub",
  "yadnyesh.dev": "yadnyesh.dev",
  other: "Elsewhere",
} as const;

export const FORMATS = {
  post: "Post",
  article: "Article",
  carousel: "Carousel",
  video: "Video",
  newsletter: "Newsletter",
  talk: "Talk",
} as const;

export type Platform = keyof typeof PLATFORMS;
export type Format = keyof typeof FORMATS;

export type ContentItem = {
  /** Stable id, also the anchor on /content (e.g. "2026-10-06-shipping-evals"). */
  id: string;
  platform: Platform;
  format: Format;
  /** Canonical URL of the original. */
  url: string;
  /** YYYY-MM-DD */
  publishedOn: string;
  /** Optional. LinkedIn posts usually have none; articles and videos do. */
  title?: string;
  /** Full text for posts; the owner's own summary for articles and videos. */
  body: string;
  tags?: string[];
  /** Pin to the homepage "Latest" section ahead of newer items. */
  featured?: boolean;
};

/** Longest first line used as-is for a post's headline. */
export const TITLE_MAX = 110;

export function firstLineOf(text: string): string {
  return text.split(/\r?\n/).find((line) => line.trim() !== "")?.trim() ?? text.trim();
}

/** Posts have no title; use the first line of the body, trimmed to a readable length. */
export function displayTitle(item: ContentItem, max = TITLE_MAX): string {
  if (item.title) return item.title;
  const firstLine = firstLineOf(item.body);
  return firstLine.length > max ? `${firstLine.slice(0, max - 1).trimEnd()}…` : firstLine;
}

export function formatDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

// Video and talk stay CreativeWork: Google's VideoObject requires a thumbnail
// and upload metadata we do not store, and an incomplete VideoObject is flagged.
export function schemaTypeFor(item: ContentItem): "SocialMediaPosting" | "Article" | "CreativeWork" {
  if (item.format === "article" || item.format === "newsletter") return "Article";
  if (item.format === "post" || item.format === "carousel") return "SocialMediaPosting";
  return "CreativeWork";
}
