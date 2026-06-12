#!/usr/bin/env bash
# Incremental corpus update: find wheresyoured.at posts not yet in crawl/md/,
# fetch their machine-readable .md (carries real publish date + full text).
# After fetching, extract claims from the new posts (agent work), merge into
# assets/claims-full.js via scripts/assetlib.py, then run: make check verify.
set -euo pipefail
cd "$(dirname "$0")/.."

UA="Mozilla/5.0"
SITEMAP="https://www.wheresyoured.at/sitemap-posts.xml"

mkdir -p crawl/md
echo "fetching sitemap..."
slugs=$(curl -sS -A "$UA" "$SITEMAP" |
  grep -o 'https://www.wheresyoured.at/[^<]*' |
  sed -E 's#https://www.wheresyoured.at/##; s#/$##' |
  grep -v '^$' | sort -u)

new=0
for slug in $slugs; do
  if [ ! -f "crawl/md/${slug}.md" ]; then
    echo "NEW: $slug"
    curl -sS -A "$UA" "https://www.wheresyoured.at/${slug}.md" -o "crawl/md/${slug}.md" || {
      echo "  fetch failed: $slug"; rm -f "crawl/md/${slug}.md"; continue; }
    new=$((new + 1))
    sleep 1
  fi
done

echo "done: $new new post(s) in crawl/md/."
if [ "$new" -gt 0 ]; then
  echo "next: extract claims from the new posts, merge, then 'make check'."
fi
