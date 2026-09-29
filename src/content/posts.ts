import rawItems from "./posts.json";

/**
 * Everything the owner writes or creates elsewhere (LinkedIn posts, articles,
 * videos, talks), listed on /content and in the homepage "Latest" section.
 *
 * Source of truth: posts.json. New entries normally arrive through the
 * "Add content" GitHub issue form, which a workflow turns into a JSON entry
 * (see docs/CONTENT.md and .github/workflows/add-content.yml).
 * Editing posts.json by hand works too.
 *
 * `body` is the owner's own text, stored verbatim. Do not rewrite it, fix its
 * punctuation, or summarize it: it is a quotation of what he published.
 *
 * Validation runs at import time, so a malformed entry fails the build instead
 * of rendering something broken. (The roadmap's WP-20 later moves this schema
 * to zod in src/content/schema.ts.)
 */

import { FORMATS, PLATFORMS, type ContentItem, type Format, type Platform } from "./content-meta";

export type { ContentItem } from "./content-meta";

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function fail(index: number, message: string): never {
  throw new Error(`src/content/posts.json entry #${index}: ${message}`);
}

function validate(raw: unknown): ContentItem[] {
  if (!Array.isArray(raw)) throw new Error("src/content/posts.json must be a JSON array");
  const seenIds = new Set<string>();
  const seenUrls = new Set<string>();

  return raw.map((entry, index) => {
    if (typeof entry !== "object" || entry === null) fail(index, "must be an object");
    const e = entry as Record<string, unknown>;

    if (typeof e.id !== "string" || !ID_PATTERN.test(e.id)) fail(index, "id must be kebab-case");
    if (seenIds.has(e.id)) fail(index, `duplicate id "${e.id}"`);
    seenIds.add(e.id);

    if (typeof e.platform !== "string" || !(e.platform in PLATFORMS))
      fail(index, `platform must be one of ${Object.keys(PLATFORMS).join(", ")}`);
    if (typeof e.format !== "string" || !(e.format in FORMATS))
      fail(index, `format must be one of ${Object.keys(FORMATS).join(", ")}`);

    if (typeof e.url !== "string") fail(index, "url is required");
    let parsed: URL;
    try {
      parsed = new URL(e.url);
    } catch {
      fail(index, `url "${e.url}" is not a valid URL`);
    }
    if (parsed.protocol !== "https:") fail(index, "url must use https");
    if (seenUrls.has(e.url)) fail(index, `duplicate url "${e.url}"`);
    seenUrls.add(e.url);

    if (typeof e.publishedOn !== "string" || !DATE_PATTERN.test(e.publishedOn) || Number.isNaN(Date.parse(e.publishedOn)))
      fail(index, "publishedOn must be a real date in YYYY-MM-DD format");

    if (e.title !== undefined && (typeof e.title !== "string" || e.title.trim() === ""))
      fail(index, "title, if present, must be a non-empty string");
    if (typeof e.body !== "string" || e.body.trim().length < 10) fail(index, "body must be at least 10 characters");
    if (e.tags !== undefined && (!Array.isArray(e.tags) || e.tags.some((t) => typeof t !== "string")))
      fail(index, "tags must be an array of strings");
    if (e.featured !== undefined && typeof e.featured !== "boolean") fail(index, "featured must be true or false");

    return {
      id: e.id,
      platform: e.platform as Platform,
      format: e.format as Format,
      url: e.url,
      publishedOn: e.publishedOn,
      ...(typeof e.title === "string" ? { title: e.title.trim() } : {}),
      body: e.body.trim(),
      ...(Array.isArray(e.tags) && e.tags.length > 0 ? { tags: e.tags as string[] } : {}),
      ...(e.featured === true ? { featured: true } : {}),
    };
  });
}

/** All items, newest first. */
export const contentItems: ContentItem[] = validate(rawItems).sort((a, b) =>
  b.publishedOn.localeCompare(a.publishedOn)
);

export const hasContent = contentItems.length > 0;

/** Featured items first, then newest. */
export function getLatestContent(limit: number): ContentItem[] {
  const featured = contentItems.filter((item) => item.featured);
  const rest = contentItems.filter((item) => !item.featured);
  return [...featured, ...rest].slice(0, limit);
}
