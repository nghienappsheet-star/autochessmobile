#!/usr/bin/env bash
# Smoke-test SSR meta, robots, and sitemap on a deployed or preview URL.
# Usage: ./scripts/smoke-ssr.sh [BASE_URL]
# Example: ./scripts/smoke-ssr.sh https://autochessmobile.vn

set -euo pipefail

BASE="${1:-https://autochessmobile.vn}"

echo "Smoke testing SSR at ${BASE}"
echo ""

check() {
  local label="$1"
  local url="$2"
  local pattern="$3"
  echo -n "  ${label}... "
  body="$(curl -fsSL "${url}")"
  if echo "${body}" | grep -qE "${pattern}"; then
    echo "OK"
  else
    echo "FAIL (expected pattern: ${pattern})"
    exit 1
  fi
}

echo "robots.txt"
check "Disallow /admin" "${BASE}/robots.txt" "Disallow: /admin"
check "Sitemap URL" "${BASE}/robots.txt" "Sitemap:"

echo ""
echo "sitemap.xml"
check "XML urlset" "${BASE}/sitemap.xml" "<urlset"
check "Has loc entries" "${BASE}/sitemap.xml" "<loc>"

echo ""
echo "SSR meta (hero detail)"
check "canonical" "${BASE}/tuong/hawk" 'rel="canonical"'
check "og:title" "${BASE}/tuong/hawk" 'property="og:title"'

echo ""
echo "SSR meta (home)"
check "title tag" "${BASE}/" "<title>"
check "meta description" "${BASE}/" 'name="description"'

echo ""
echo "SSR meta (community detail)"
check "og:title" "${BASE}/thao-luan/1" 'property="og:title"'

echo ""
echo "All smoke checks passed."
