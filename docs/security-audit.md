# Security audit

First audit: 2026-10-07. Scope: dependency advisories, secret handling, HTTP
response headers, the contact server action (validation, rate limiting,
Turnstile), HTML and JSON-LD injection surfaces, and outbound link safety.

Re-run with: `npm audit --omit=dev`, plus a re-read of this file's "Open
items" before any release.

## Fixed in this pass

### 1. Critical: remote code execution advisory in Next.js
`next` was pinned to `16.3.5`, inside the affected range of
GHSA-vcvr-r3jv-pc5j (RCE in `next/og` `ImageResponse`). Bumped to `16.4.0`,
a patch-level move within the same major. Two further advisories fixed in the
same pass: `sharp` to `^0.35.5` (GHSA-wq5f-xc86-pv6w, librsvg) and
`source-map-js` to `^1.2.2` via an `overrides` entry (GHSA-68fv-2mgg-jv7q,
event-loop denial of service; transitive through postcss).
`eslint-config-next` moved to `16.4.0` to match. `npm audit --omit=dev` now
reports zero vulnerabilities.

### 2. High: `zod` was an undeclared dependency
`src/app/actions/contact.ts` imports `zod`, but it was absent from
`package.json`. It resolved only by accident, hoisted out of
`eslint-config-next` (a devDependency). Any production install that prunes
dev dependencies would fail to build, and until then the validation library
guarding the only input on the site was running at a version nothing pinned.
Declared as `zod: ^4.6.2`.

### 3. Medium: Turnstile verification failed open
`verifyTurnstile` returned `true` when `TURNSTILE_SECRET_KEY` was unset, so a
missing or mistyped production environment variable silently removed the only
bot defence on the contact form, with no error anywhere. It now fails closed
when `NODE_ENV === "production"` and logs the misconfiguration, while still
skipping the check in local development.

### 4. Medium: live access key in the environment template
`.env.example` carried a real Web3Forms access key as its default value
rather than an empty placeholder. It had not leaked: `.gitignore` matched it
under `.env*`, and `git log -S` confirms the value was never committed. Two
changes: the value is now blank, and `.gitignore` gained `!.env.example` so
the template is tracked, which is what a template is for. No rotation is
needed, because this key is `NEXT_PUBLIC_` and therefore public by design
(see Open items 1).

### 5. Low: JSON-LD built with bare `JSON.stringify`
Five `<script type="application/ld+json">` blocks interpolated
`JSON.stringify(...)` into `dangerouslySetInnerHTML`. A `</script>`
substring anywhere in the serialized content closes the tag early, and the
rest is parsed as HTML. All content is currently owner-authored, so this was
not exploitable, but it makes every future content field an injection point.
Added `src/lib/jsonLd.ts`, which escapes `<`, `>` and `&` as `\u00xx`, and
routed all five call sites through it. The escapes decode on parse, so
consumers such as Google read the original strings unchanged.

### 6. Low: missing `Permissions-Policy`
Added `camera=(), microphone=(), geolocation=(), payment=(), usb=()`, so the
embedded third parties (Calendly, Turnstile, Google Analytics) cannot request
device APIs the site itself never uses.

## Verified clean

- No secrets in tracked files or in git history.
- All 22 `target="_blank"` links carry `rel="noopener noreferrer"`.
- No `eval`, `new Function`, or `innerHTML` assignment anywhere in `src/`.
- The only `dangerouslySetInnerHTML` uses are the five JSON-LD blocks above.
- `.env.local` is correctly ignored.
- Server-side input validation is schema-driven with length caps on every
  field, and the honeypot returns a fake success rather than revealing the
  rejection.
- Existing headers are sound: HSTS with preload, `X-Frame-Options`,
  `nosniff`, `Referrer-Policy`, COOP.

## Open items

These are real but need a decision or a dedicated work package, not a patch.

1. **The contact pipeline is bypassable by design.** Delivery runs in the
   browser with a `NEXT_PUBLIC_` Web3Forms key, because their free tier
   rejects server-to-server calls. Anyone can read that key from the bundle
   and POST to `api.web3forms.com` directly, skipping the server action's
   validation, rate limiting and Turnstile entirely. The server-side checks
   deter casual abuse only. The fix is server-side delivery (roadmap O-16 /
   WP-13, e.g. Resend), which also lets the key stop being public.
2. **No Content-Security-Policy.** Deliberate and documented in
   `next.config.ts`; roadmap WP-62 covers building the allowlist and
   verifying it in a browser before enforcing. Not shipped half-done here,
   since a wrong CSP breaks Calendly, Turnstile and GA.
3. **Rate limiting is per-instance.** The in-memory sliding window resets on
   cold start and is not shared across serverless instances, so the real
   limit is 3 per 10 minutes per instance. Upstash is already noted in
   `.env.example` as the upgrade path. Lower priority than item 1, which
   bypasses this anyway.
4. **`x-forwarded-for` is trusted as given.** Correct behind Vercel, which
   overwrites it, but the rate-limit key is attacker-controlled if the app is
   ever served without a trusted proxy in front.

## Verification performed

`npm audit --omit=dev` (0 vulnerabilities), `tsc --noEmit` (clean), `eslint`
(clean), and `npm run build` on `next@16.4.0` (succeeds, 13 routes
prerendered). The escaping helper was unit-checked against a
`</script><img src=x onerror=...>` payload: no raw `<` survives and the value
round-trips to the original string.
