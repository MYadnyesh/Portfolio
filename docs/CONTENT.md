# Content: posts, articles and anything else you publish

Everything you publish elsewhere (LinkedIn posts, articles, videos, talks) is listed at **yadnyesh.dev/content**, and the three most recent (pinned items first) appear in the "Latest writing" section on the homepage.

Until the first entry exists, none of this is visible: the homepage section, the nav and footer links and the sitemap entry all stay hidden, and `/content` is `noindex`. They switch on automatically with the first entry.

## Adding something (the normal way, about 30 seconds)

1. Publish on LinkedIn as usual. Copy the post link (the "..." menu on the post, then "Copy link to post").
2. Open **New issue → Add content** in the GitHub repo:
   https://github.com/MYadnyesh/Portfolio/issues/new?template=add-content.yml
   (Bookmark it. It works in a phone browser.)
3. Paste the link and the post text. Leave everything else as is for a normal post.
4. Submit. Within a minute a workflow adds it to the site, comments with the link, and closes the issue. Vercel deploys it a minute or two later.

If something is wrong (bad link, duplicate, date in the future), the workflow comments explaining what to fix and leaves the issue open. Edit the issue, then close and reopen it to retry.

Only issues opened by the repository owner are processed, so nobody else can add content even though the repo may be public.

### Field notes
- **Text:** paste a post exactly as published. It is stored and shown verbatim; nothing is rewritten or tidied. The first line becomes the headline on the site. For articles and videos, write a two or three sentence summary instead.
- **Format / Platform:** "Post" and "Detect from link" are right for LinkedIn posts.
- **Published on:** leave empty for today (India time).
- **Title:** only for articles, videos and talks.
- **Homepage pin:** keeps an item at the top of the homepage section even when newer items arrive.

### Prefilled link
You can prefill the form from a URL, for example from a phone shortcut:
`https://github.com/MYadnyesh/Portfolio/issues/new?template=add-content.yml&title=%5BContent%5D+&link=<URL-encoded post link>`

**Never add test or sample entries to `posts.json`.** Everything in it is published. To test the page, use a temporary copy outside the repo.

## Editing or removing an entry
Edit `src/content/posts.json` directly (on GitHub: open the file, click the pencil). Each entry is:

```json
{
  "id": "2026-10-06-evals-before-vibes",
  "platform": "linkedin",
  "format": "post",
  "url": "https://www.linkedin.com/posts/...",
  "publishedOn": "2026-10-06",
  "title": "Optional, for articles and videos",
  "body": "Full post text, or a summary for articles",
  "tags": ["ai", "evals"],
  "featured": true
}
```

Allowed `platform`: `linkedin`, `x`, `medium`, `substack`, `youtube`, `github`, `yadnyesh.dev`, `other`. Allowed `format`: `post`, `article`, `carousel`, `video`, `newsletter`, `talk`. The build validates every entry (`src/content/posts.ts`); a malformed entry fails the build, and Vercel keeps serving the previous version.

## How it works
| Piece | File |
|---|---|
| Data | `src/content/posts.json` |
| Validation and helpers | `src/content/posts.ts`, `src/content/content-meta.ts` |
| `/content` page | `src/app/content/page.tsx`, `src/components/content/*` |
| Homepage section | `src/components/sections/LatestContent.tsx` |
| Issue form | `.github/ISSUE_TEMPLATE/add-content.yml` |
| Automation | `.github/workflows/add-content.yml`, `scripts/add-content-from-issue.mjs` |

**Why not pull posts from LinkedIn automatically?** LinkedIn's API does not let a personal profile read its own posts without partner approval, and scraping breaks their terms. Embedding LinkedIn's iframes would be slow and set third-party cookies. Storing your own words as data keeps the page fast, keeps the text on your domain for search, and survives LinkedIn changing anything.

## One-time setup (owner)
- Settings → Actions → General → Workflow permissions: **Read and write**. The workflow pushes one commit per entry.
- If you later protect the `master` branch (roadmap WP-01, O-13), a direct push from the workflow will be rejected. Either add GitHub Actions to the rule's bypass list, or switch the workflow to open a pull request using a fine-grained personal access token (pull requests opened with the default token do not trigger CI).

## For Ira
Ira (or any agent) can add content the same way: open an "Add content" issue as the owner, or open a PR that appends to `posts.json`. Per the owner's rules, nothing is published without his approval: an agent may draft the issue, but he submits it.
