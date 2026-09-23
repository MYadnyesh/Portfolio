#!/usr/bin/env bash
# Regenerates every file in brand/output/ from the HTML sources in brand/src/.
# Requires Microsoft Edge (or any Chromium browser — change EDGE below).
#
# Run this again any time you edit an HTML source or update contact details,
# then re-check the output before sending anything to a print shop.
set -euo pipefail

EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_URL="$(cygpath -w "$ROOT/src" | sed 's/\\/\//g')"
OUT_POSIX="$ROOT/output"
OUT_WIN="$(cygpath -w "$OUT_POSIX")"
mkdir -p "$OUT_POSIX"

pdf() { # pdf <src.html[?query]> <out.pdf>
  "$EDGE" --headless --disable-gpu --no-sandbox \
    --print-to-pdf="$OUT_WIN\\$2" --no-pdf-header-footer \
    "file:///$SRC_URL/$1" >/dev/null 2>&1
  echo "  pdf   $2"
}

png() { # png <src.html[?query]> <out.png> <w> <h> <scale>
  "$EDGE" --headless --disable-gpu --no-sandbox \
    --screenshot="$OUT_WIN\\$2" --window-size="$3,$4" --force-device-scale-factor="$5" \
    "file:///$SRC_URL/$1" >/dev/null 2>&1
  echo "  png   $2"
}

echo "Business card"
pdf "business-card/front.html" "business-card-front.pdf"
pdf "business-card/back.html"  "business-card-back.pdf"
png "business-card/front.html?proof=1" "business-card-front-proof.png" 360 216 4
png "business-card/back.html?proof=1"  "business-card-back-proof.png"  360 216 4

echo "One-pager"
pdf "one-pager/one-pager.html" "one-pager.pdf"
png "one-pager/one-pager.html" "one-pager-preview.png" 816 1056 2

echo "Letterhead"
pdf "letterhead/letterhead.html" "letterhead.pdf"
png "letterhead/letterhead.html" "letterhead-preview.png" 816 1056 2

echo "LinkedIn banner"
png "linkedin-banner/banner.html" "linkedin-banner.png" 1584 396 1

echo "Email signature"
png "email-signature/signature.html" "email-signature-preview.png" 608 220 2

echo "Done -> $OUT_POSIX"
