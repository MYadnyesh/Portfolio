# Status

Live progress log for `ROADMAP.md`. Update at the end of every work session (Section 0.3 of the roadmap).

Status values: `todo`, `in-progress`, `blocked`, `needs-owner` (PR open, waiting for review), `done`, `wont-do`.

Last updated: 2026-09-29 · Baseline: `d4e2d29` · Roadmap version: 1.1

## Work packages

| WP | Title | Depends on | Status | PR | Date | Owner inputs used (answer / default) | Notes for next agent |
|---|---|---|---|---|---|---|---|
| 00 | Repository hygiene | none | todo | | | | |
| 01 | Continuous integration | 00 | todo | | | O-13 | |
| 02 | Playwright + axe harness | 01 | todo | | | | |
| 03 | Automated dependency updates | 02 | todo | | | O-13 | |
| 10 | Remove content protection | 02 | todo | | | | |
| 11 | Shared site chrome and nav integrity | 02 | todo | | | | |
| 12 | Copy corrections and positioning | 11 | todo | | | O-01, O-02, O-03 | |
| 13 | Contact form hardening | 01 | todo | | | O-16 | |
| 20 | Typed content layer and validator | 12 | todo | | | | |
| 21 | Fact gathering for new projects | 20 | todo | | | O-04 to O-07 | |
| 22 | New project content | 21 | todo | | | O-04 to O-07, O-17 | |
| 23 | Case-study pages and `/work` | 20 | todo | | | | |
| 24 | Principles tied to evidence | 22, 23 | todo | | | | |
| 25 | Explorations cleanup | 20 | todo | | | O-08 | |
| 30 | CV page and PDF | 20, 01 | todo | | | O-03, O-20 | |
| 31 | Testimonials pipeline | 20, 11, 13 | todo | | | O-09 | |
| 32 | Audience routing and `/work-with-me` | 23, 30 | todo | | | O-01, O-21, O-22 | |
| 33 | Analytics events and consent | 11 | todo | | | O-12 | |
| 40 | Notes (MDX) and RSS | 11, 20 | todo | | | O-23 | |
| 41 | Dynamic OG images | 23, 40 | todo | | | | |
| 42 | SEO hardening and `llms.txt` | 23, 40 | todo | | | O-18 | |
| 43 | Off-site checklist | none | todo | | | O-14 | Checklist already written in OWNER_INPUTS O-14 |
| 44 | `/now` page | 20 | todo | | | O-24 | |
| 45 | Content hub (LinkedIn posts etc.) | none | done (uncommitted) | | 2026-09-29 | none | Built directly, not via PR. Verified: tsc, eslint, `next build` (empty and with sample data), JSON-LD parses, empty state hidden and noindex, actionlint on the workflow, parser tested on valid, duplicate, bad-date, future-date and missing-link input. Owner must commit and push. Follow-ups listed in the WP-45 section of the roadmap. |
| 50 | Ask backend | 22, 40 | todo | | | O-10, O-11 | |
| 51 | Ask UI | 50 | todo | | | | |
| 52 | Ask evals | 50 | todo | | | | |
| 60 | Performance budget | 02 | todo | | | | |
| 61 | Accessibility pass | 11, 23 | todo | | | | |
| 62 | Content Security Policy | 33, 51 | todo | | | | |
| 63 | Error pages | 11 | todo | | | | |
| 70 | Weekly maintenance workflow | 02, 60 | todo | | | | |
| 71 | GitHub repo metadata | 23 | todo | | | | |
| 72 | Uptime monitor | 01 | todo | | | | |
| 73 | Runbook | ops WPs | todo | | | | |
| 74 | Ira integration contract (optional) | 40, 44, 70 | todo | | | O-25 | |

## Defects (from ROADMAP Section 2.5)

| ID | Summary | Fixed by | Status |
|---|---|---|---|
| D1 | Copy and right-click blocked | WP-10 | open |
| D2 | "Words" nav link dead | WP-11 | open |
| D3 | "Systems" anchor differs in nav and footer | WP-11 | open |
| D4 | Subpages have no nav or footer | WP-11 | open |
| D5 | No skip link | WP-11 | open |
| D6 | Hero says "Independent" | WP-12 | open |
| D7 | "Vibe coding" in public copy | WP-12 | open |
| D8 | Em dashes in `/about` | WP-12 | open |
| D9 | Mixed British/US spelling | WP-12 | open |
| D10 | Turnstile bypassable via direct Web3Forms POST | WP-13 | open |
| D11 | Web3Forms key committed in `.env.example` | WP-00 | open |
| D12 | Boilerplate README | WP-00 | open |
| D13 | Project cards do not link to case studies | WP-23 | open |
| D14 | Strongest work missing | WP-22 | open |
| D15 | Explorations unlinked, unconfirmed tools | WP-25 | open |
| D16 | Principles without evidence | WP-24 | open |
| D17 | three.js on all devices, GIF media | WP-60 | open |

## Discovered issues

Add anything found during a WP that is outside its scope. Format: date, where, what, suggested WP.

- 2026-09-29 · `.env.example` · Web3Forms key in git history; owner may want to rotate it (see OWNER_INPUTS, section D) · WP-00

## Session log

Newest first. One line per session: date, agent/model, WPs touched, outcome.

- 2026-09-29 · content hub session · WP-45 built and verified; roadmap bumped to v1.1; `docs/CONTENT.md` added. Not yet committed.

- 2026-09-29 · planning session · roadmap, owner inputs and status created; no code changed by the plan itself. Earlier the same day: `/about`, `/projects`, `/projects/[slug]` pages, expanded sitemap and Person schema were added (commits `0c92fec`, `d4e2d29`, pushed to `origin/master` by the owner).
