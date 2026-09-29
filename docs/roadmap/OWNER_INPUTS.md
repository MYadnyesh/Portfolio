# Owner inputs

One-time questionnaire for Yadnyesh. **Nothing in the roadmap waits on these.** Every item has a default that agents use until you answer. Answer in the `Answer` line (a few words is enough), commit, and agents will pick it up on their next run. To change a past answer, edit it and add the date.

Status values: `open` (default in use), `answered`, `n/a`.

Agents: when a work package uses an input, record in `STATUS.md` whether you used the answer or the default. When a fact sheet raises a new question, add it at the bottom with the next free id and a safe default (usually "omit it").

---

## A. Positioning and identity

### O-01 Hero descriptor and availability line · used by WP-12, WP-32 · `open`
The hero currently says "Independent, AI-First Developer", which contradicts your current employment.
- **Default:** eyebrow `AI-First Full-Stack Engineer`; availability line near the CTA: `Open to select freelance and advisory work`.
- **Answer:**

### O-02 Primary positioning title · used by WP-12 · `open`
You previously described your target positioning as "AI-first T-shaped Full Stack Developer / Forward-Deployed Engineer". The site does not use "Forward-Deployed Engineer" anywhere yet.
- **Default:** page title `Yadnyesh Mulay | AI-First Full-Stack & Forward-Deployed Engineer`; "T-shaped" stays as a section concept, not the headline; "Business/AI consultant" moves from the headline to the services and `/work-with-me` pages.
- **Answer:**

### O-03 How to reference your current role · used by WP-12, WP-30, WP-42, WP-50 · `open`
Standing decision (2026-09-23): do not add it to the site.
- **Default:** not mentioned anywhere, including the CV page and Ask. The validator blocks the company names.
- **Options if you change your mind:** (a) anonymized: "Full Stack AI Engineer at a US decision-intelligence startup"; (b) named.
- **Answer:**

### O-18 Extra profiles for `sameAs` · used by WP-42 · `open`
Search results show a Taskade profile `@myadnyesh` ("Yadnyesh Mulay"). Is it yours? Any others (Medium, dev.to, Stack Overflow, Kaggle, Hugging Face)?
- **Default:** only GitHub, LinkedIn and X.
- **Answer:**

### O-19 Is the GitHub repository `MYadnyesh/Portfolio` public? · used by all · `open`
- **Default:** treat as public. Nothing private goes into committed files.
- **Answer:**

### O-20 Phone number on the CV · used by WP-30 · `open`
- **Default:** no phone number; email and links only.
- **Answer:**

### O-22 Time zone line · used by WP-32 · `open`
- **Default:** `Based in India (IST). Overlaps with UK working hours and US mornings.`
- **Answer:**

---

## B. Projects and sources

### O-04 Access to project sources · used by WP-21, WP-22 · `open`
Agents need to read the code to write accurate case studies. For each, say how they can read it: public GitHub repo, a connected folder, or "seed facts only".
- AI Job Copilot (local: `D:\Jobs\ai-job-copilot`; GitHub: `Ai-job-copilot`?) and its live URL, if deployed:
- Track-Master (GitHub repo name and visibility):
- Ira / Harness (private; default: seed facts only, no repo link):
- Any other repo from your list worth showing (Newsletter, Pure Plate, others):
- **Default:** public GitHub repos are read directly; anything else uses the seed facts in ROADMAP Appendix B.
- **Answer:**

### O-05 MedScript Pro · used by WP-22 · `open`
Is this your own work that you can publish, or client work under confidentiality?
- **Default:** do not publish.
- **Answer:**

### O-06 CleanPlate as an architecture case study · used by WP-22 · `open`
It is not built yet. Showing the product and technical design (without business numbers) demonstrates product thinking, but also reveals the idea.
- **Default:** publish as "architecture-only", no budgets or business figures.
- **Answer:**

### O-07 Ira as a public case study · used by WP-22 · `open`
Only product-level architecture and guardrails (ROADMAP Appendix B.2), no personal details, no repo link.
- **Default:** publish with those limits.
- **Answer:**

### O-17 Media for Ira · used by WP-22 · `open`
A 20 to 40 second screen recording of Ira in Telegram or the desktop overlay would make the case study much stronger. Make sure nothing personal is visible.
- **Default:** architecture diagram only.
- **Answer (file path or "none"):**

### O-08 Explorations section · used by WP-25 · `open`
Which of these have you actually built something with? Local LLMs (Ollama, llama.cpp); agentic coding tools (OpenCode, Codex, MCP, OpenClaw); multi-agent frameworks (LangGraph, CrewAI, AutoGen); model serving (vLLM, TGI); voice AI (Whisper, ElevenLabs, MeloTTS, WebRTC); n8n.
- **Default:** show at most three items; drop tools not confirmed here or found in a repo; fold multi-agent and agentic-coding content into the Ira case study.
- **Answer:**

### O-15 Community numbers · used by WP-22 or `/about` · `open`
Real figures only, if you have them: number of events or workshops run for MahaWiki and Cloud Community Group, rough attendance, years active.
- **Default:** no numbers shown.
- **Answer:**

---

## C. Features, services and accounts

### O-09 Testimonials · used by WP-31 · `open`
After WP-31 ships, send this to 5 to 8 people (clients from TechnoCave or Creonextech, students, community members, a professor):

> Hi <name>, I'm refreshing my portfolio at yadnyesh.dev and would really value a short note from you about working with me (two or three sentences is perfect). If you're happy to, you can submit it here: https://yadnyesh.dev/vouch. It asks for your consent before anything is published. Thank you!

- **Default:** the section stays hidden until at least two real testimonials exist.
- **Answer (who you sent it to, optional):**

### O-10 Ask about my work: provider, key, spend cap · used by WP-50 to WP-52 · `open`
- Which provider (Anthropic, OpenAI, Google Gemini, other)? A free or low-cost tier fits your zero-cost preference.
- Monthly spend cap you are comfortable with:
- Store question text for improving content? (default: no)
- **Default:** feature built but switched off until a key is added in Vercel (`ASK_ENABLED=true`, `ASK_PROVIDER`, `ASK_PROVIDER_API_KEY`, `ASK_MODEL`).
- **Answer:**

### O-11 Upstash Redis (free tier) for Ask rate limiting · used by WP-50 · `open`
Create a free Upstash Redis database and add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to Vercel.
- **Default:** Ask stays off without it.
- **Answer (done / not yet):**

### O-12 Analytics and consent · used by WP-33 · `open`
- **Default:** keep GA4, add Consent Mode v2 and a minimal Accept/Decline banner (you target UK clients; UK rules expect consent for analytics cookies).
- **Alternative:** a cookieless analytics tool instead of GA4 (no banner needed; check pricing and custom-event support on your plan).
- **Answer:**

### O-16 Contact delivery · used by WP-13 · `open`
- **Default:** keep Web3Forms (free), add a honeypot, document the trade-off.
- **Alternative:** Resend (server-side, needs DNS records on yadnyesh.dev and an API key).
- **Answer:**

### O-21 Engagement types and pricing on `/work-with-me` · used by WP-32 · `open`
- **Default:** services from the current site, no pricing.
- **Answer:**

### O-23 Publishing notes · used by WP-40 · `open`
Agents may draft technical notes from your repos as drafts. You publish by changing `draft: true` to `draft: false` (or tell an agent "publish <title>").
- **Default:** nothing is published without your say.
- **Answer:**

### O-24 Initial `/now` content · used by WP-44 · `open`
Two or three lines on what you are focused on this season.
- **Default:** availability line from O-01 plus projects marked in development.
- **Answer:**

### O-25 Ira keeps the site fresh · used by WP-74 · `open`
- **Default:** not now; the contract document is written so you can switch it on later.
- **Answer:**

---

## D. One-time settings only you can change

Tick these when done. Agents cannot do them.

### O-13 GitHub repository settings · used by WP-01, WP-03 · `open`
- [ ] Settings → General → Pull Requests: enable "Allow auto-merge".
- [ ] Settings → Branches: protect `master`: require the `ci` status check to pass before merging.
- [ ] Settings → Actions → General: Workflow permissions "Read and write", and allow Actions to create pull requests. **Needed now** for the "Add content" workflow (WP-45), which commits each new post.
- [ ] Settings → Secrets and variables → Actions: add `ASK_*` secrets only if O-10 is answered.

### O-14 Search and profiles (the biggest factor for ranking on your name) · WP-43 · `open`
- [ ] Vercel env: set `GOOGLE_SITE_VERIFICATION`; redeploy.
- [ ] Google Search Console: verify `yadnyesh.dev`, submit `https://yadnyesh.dev/sitemap.xml`, request indexing for `/`, `/about`, `/work`.
- [ ] LinkedIn: add `https://yadnyesh.dev` to the website field and the About section; update the headline to match the site positioning (Google currently shows "Community Manager").
- [ ] GitHub: website field on your profile and a link in your profile README.
- [ ] X bio link; any other profile from O-18.

### Rotate the Web3Forms key (recommended) · `open`
The current key was committed in `.env.example`. It is a public key by design, but anyone can use it to send mail to your inbox. Generate a new one at web3forms.com, set it in Vercel, and leave `.env.example` empty.
- [ ] Done
