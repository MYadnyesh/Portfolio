# Brand collateral

Print- and screen-ready materials built from the same ink/bone/wine palette,
Archivo/IBM Plex Mono/Instrument Serif type, and YM monogram as
[yadnyesh.dev](https://yadnyesh.dev). Lives outside `src/` and `public/` on
purpose — nothing here is part of the Next.js app or gets deployed with it.

```
brand/
  src/          editable HTML/CSS source for every piece
  assets/       logo variants, QR codes shared across pieces
  output/       generated PDFs and PNGs — the actual deliverables
  scripts/render.sh   regenerates everything in output/ from src/
```

## What's here, and why

| Piece | Format | Purpose |
|---|---|---|
| **Business card** | PDF (print) + PNG (preview) | The essential — front is logo-led, back is contact + a QR straight to the booking page, because a card that makes someone open a browser and type a URL loses them. |
| **Email signature** | HTML (paste into your client) | Every email becomes a touchpoint with a one-click "Book a call." Highest reach-to-effort ratio of anything here. |
| **One-pager** | PDF | A leave-behind for after a discovery call — services, three proof points with real metrics, credentials, one more CTA. Point at which most freelance conversations actually convert or stall. |
| **LinkedIn banner** | PNG, 1584×396 | Reinforces the same identity at the top of the profile that link-in-bio traffic and cold search actually land on. |
| **Letterhead** | PDF (template) | For proposals, quotes, and invoices — a blank canvas with the brand masthead, not a filled document. |

Business card, one-pager, and letterhead pull real content only — services,
project metrics, and credentials are copied verbatim from
`src/data/portfolio.ts`. Nothing here is invented copy.

## Business card

US size, 3.5×2in trim with 0.125in bleed (3.75×2.25in PDF page — most print
shops, including Vistaprint/Moo/GotPrint uploaders, expect the bleed size
directly and auto-detect the trim from it).

- `output/business-card-front.pdf` / `business-card-back.pdf` — send these to
  the printer.
- `output/business-card-front-proof.png` / `business-card-back-proof.png` —
  same design with a dashed trim/safe-area guide overlaid, for your own
  reference only (the guide is never in the PDF).
- The back's QR code points at the Calendly booking link, not the homepage —
  the highest-conversion action a card can trigger is a direct scan-to-book.
  A second QR to the homepage is pre-generated at
  `assets/qr-portfolio.png` if you'd rather swap it on any piece.

## Email signature

`src/email-signature/signature.html` is the thing to actually use:

1. Open it in a browser.
2. Click into the card, `Ctrl+A`, `Ctrl+C`.
3. Paste into Gmail (Settings → General → Signature) or Outlook (File →
   Options → Mail → Signatures).

It's plain inline-styled HTML in a `<table>`, not a linked stylesheet —
Outlook desktop renders signatures with Word's engine, which drops `<style>`
blocks and most modern CSS, so table + inline styles is what actually
survives across clients. It's also a **light** variant, not the site's dark
theme: a dark block dropped into an inbox reads as an ad and fights a
recipient's own (often white) email theme.

## Regenerating everything

```bash
bash brand/scripts/render.sh
```

Requires Microsoft Edge (or point `EDGE` in the script at any Chromium
browser). Re-run it after editing any file in `src/`, or after changing
contact details, then re-check `output/` before sending anything to a print
shop — nothing in `output/` is hand-maintained, it's all generated.

## Two things worth knowing

**The monogram had a defect.** `public/images/ym-mark.png` — the file the
live site itself uses in the navbar, hero, and footer — carries a faint
backing panel baked into its alpha channel, invisible at the small sizes the
site uses it at, but visible once blown up on a business card. `assets/`
has two corrected variants derived from the already-cleaned
`ym-watermark.png` mask: `ym-mark-clean.png` (bone, for dark backgrounds)
and `ym-mark-ink.png` (ink, for light ones) — both used everywhere in this
folder. The email signature is the one exception: it has to reference a
publicly-hosted URL, so it still points at the live (flawed) file, since
brand/assets/ isn't deployed anywhere. At 40px the panel isn't visible, so
this is a non-issue in practice — but if you ever want the site's own logo
fixed too, `ym-mark-clean.png` is a drop-in replacement for
`public/images/ym-mark.png`, I just didn't make that change here since it
touches the live app, not this folder.

**`mask-image` silently renders nothing in headless Chromium on `file://`
pages** — no error, just a blank layer. `background-image` and plain
`<img>` both work fine. The letterhead's watermark uses a low-opacity
`<img>` for exactly this reason; if you add a new piece that needs a masked
logo, do the same rather than reaching for `mask-image` like the live site's
CSS does.
