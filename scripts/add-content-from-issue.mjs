#!/usr/bin/env node
/**
 * Turns an "Add content" issue (.github/ISSUE_TEMPLATE/add-content.yml) into an
 * entry in src/content/posts.json. Run by .github/workflows/add-content.yml.
 *
 * Input:  ISSUE_BODY env var (the issue form body GitHub renders as markdown).
 * Output: writes posts.json; prints the new id to GITHUB_OUTPUT as `id`.
 * Errors: exits 1 and writes a human-readable message to ADD_CONTENT_ERROR_FILE
 *         (default /tmp/add-content-error.txt) for the workflow to post back.
 *
 * The rules here mirror the validation in src/content/posts.ts. The site build
 * validates again, so a mismatch fails the deploy rather than shipping bad data.
 *
 * Local test: ISSUE_BODY="$(cat sample.md)" POSTS_FILE=/tmp/posts.json node scripts/add-content-from-issue.mjs
 */
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";

const POSTS_FILE = process.env.POSTS_FILE ?? "src/content/posts.json";
const ERROR_FILE = process.env.ADD_CONTENT_ERROR_FILE ?? "/tmp/add-content-error.txt";

const PLATFORM_BY_LABEL = {
  linkedin: "linkedin", x: "x", medium: "medium", substack: "substack",
  youtube: "youtube", github: "github", other: "other",
};
const FORMAT_BY_LABEL = {
  post: "post", article: "article", carousel: "carousel", video: "video",
  newsletter: "newsletter", talk: "talk",
};
const PLATFORM_BY_HOST = [
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)(x|twitter)\.com$/, "x"],
  [/(^|\.)medium\.com$/, "medium"],
  [/\.substack\.com$/, "substack"],
  [/(^|\.)(youtube\.com|youtu\.be)$/, "youtube"],
  [/(^|\.)github\.com$/, "github"],
  [/(^|\.)yadnyesh\.dev$/, "yadnyesh.dev"],
];
// Query parameters that are always tracking noise and never identify content.
const TRACKING_PARAMS = /^(utm_.+|rcm|trk|trackingId|lipi|si|ref_src|s)$/i;

function die(message) {
  writeFileSync(ERROR_FILE, message);
  console.error(message);
  process.exit(1);
}

/** GitHub renders issue forms as "### Label\n\nvalue" blocks. */
function parseIssueForm(body) {
  const fields = {};
  const parts = body.replace(/\r\n/g, "\n").split(/^### /m).slice(1);
  for (const part of parts) {
    const newline = part.indexOf("\n");
    const label = part.slice(0, newline).trim().toLowerCase();
    const value = part.slice(newline + 1).trim();
    fields[label] = value === "_No response_" ? "" : value;
  }
  return fields;
}

function cleanUrl(raw) {
  let url;
  try {
    url = new URL(raw.trim());
  } catch {
    die(`The link "${raw}" is not a valid URL. Paste the full address starting with https://`);
  }
  if (url.protocol !== "https:") die("The link must start with https://");
  for (const key of [...url.searchParams.keys()]) {
    if (TRACKING_PARAMS.test(key)) url.searchParams.delete(key);
  }
  // LinkedIn post and article URLs are fully identified by their path.
  if (/(^|\.)linkedin\.com$/.test(url.hostname)) url.search = "";
  url.hash = "";
  return url.toString();
}

function detectPlatform(url) {
  const host = new URL(url).hostname;
  for (const [pattern, platform] of PLATFORM_BY_HOST) if (pattern.test(host)) return platform;
  return "other";
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 6)
    .join("-");
}

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

const body = process.env.ISSUE_BODY;
if (!body) die("The issue body is empty. Use the \"Add content\" issue form.");
const fields = parseIssueForm(body);

if (!fields.link) die("The Link field is required.");
if (!fields.text || fields.text.trim().length < 10) die("The Text field needs the post text or a short summary (at least 10 characters).");

const url = cleanUrl(fields.link);

const formatKey = (fields.format || "post").trim().toLowerCase();
const format = FORMAT_BY_LABEL[formatKey];
if (!format) die(`Unknown format "${fields.format}".`);

const platformLabel = (fields.platform || "detect from link").trim().toLowerCase();
const platform = platformLabel === "detect from link" ? detectPlatform(url) : PLATFORM_BY_LABEL[platformLabel];
if (!platform) die(`Unknown platform "${fields.platform}".`);

const publishedOn = (fields["published on"] || "").trim() || todayUtc();
if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedOn) || Number.isNaN(Date.parse(publishedOn))) {
  die(`"Published on" must be a date like 2026-10-06, or empty for today. Got "${publishedOn}".`);
}
if (publishedOn > todayUtc()) die(`"Published on" (${publishedOn}) is in the future.`);

const title = (fields.title || "").trim();
const text = fields.text.replace(/\r\n/g, "\n").trim();
const tags = (fields.tags || "")
  .split(",")
  .map((tag) => tag.trim().replace(/^#/, "").toLowerCase())
  .filter(Boolean);
const featured = /- \[x\]/i.test(fields.homepage || "");

let posts;
try {
  posts = JSON.parse(readFileSync(POSTS_FILE, "utf8"));
} catch (error) {
  die(`Could not read ${POSTS_FILE}: ${error.message}`);
}
if (!Array.isArray(posts)) die(`${POSTS_FILE} is not a JSON array.`);

const duplicate = posts.find((post) => post.url === url);
if (duplicate) die(`This link is already on the site as "${duplicate.id}". Nothing was changed.`);

const firstLine = text.split("\n").find((line) => line.trim() !== "") ?? text;
const base = `${publishedOn}-${slugify(title || firstLine) || format}`;
let id = base;
for (let n = 2; posts.some((post) => post.id === id); n++) id = `${base}-${n}`;

const entry = {
  id,
  platform,
  format,
  url,
  publishedOn,
  ...(title ? { title } : {}),
  body: text,
  ...(tags.length ? { tags } : {}),
  ...(featured ? { featured: true } : {}),
};

posts.push(entry);
posts.sort((a, b) => b.publishedOn.localeCompare(a.publishedOn) || a.id.localeCompare(b.id));
writeFileSync(POSTS_FILE, `${JSON.stringify(posts, null, 2)}\n`);

// The site deliberately does not name the owner's current employer (see
// docs/roadmap/ROADMAP.md rule 3.2). His own post may, which is his call, so
// this only adds a heads-up to the confirmation comment instead of blocking.
const EMPLOYER_TERMS = /geeta wisdom|dbrief|dqic|decision intelligence system/i;
const warning = EMPLOYER_TERMS.test(`${title}\n${text}`)
  ? "Heads-up: this entry mentions your current employer, which the site otherwise leaves out. It has been added anyway; delete it from src/content/posts.json if that was not intended."
  : "";

if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `id=${id}\nwarning=${warning}\n`);
console.log(`Added ${id} (${platform} ${format}) ${url}`);
