---
name: ship-check
description: Pre-ship validation checklist — TypeScript, game data, i18n parity, SSR meta e2e, and production build. Use before merging, deploying, or when the user asks to verify the project is ready to ship.
---

# Ship Check

Run all checks in order. Fix failures before proceeding.

## Checklist

```
- [ ] npm run lint
- [ ] node scripts/i18n-check.mjs
- [ ] npm run validate:data
- [ ] npm run build
- [ ] npm run test:e2e
```

## Step 1 — TypeScript

```bash
npm run lint
```

Runs `react-router typegen && tsc --noEmit`. Fix all type errors before continuing.

## Step 2 — i18n parity

```bash
node scripts/i18n-check.mjs
```

Ensures vi/en keys match across all namespaces. See `i18n-sync` skill for fixes.

## Step 3 — Game data validation

```bash
npm run validate:data
```

Validates seed data integrity (cross-references, required fields). Required after changes to `src/data/` or `src/types/domain.ts`.

## Step 4 — Production build

```bash
npm run build
```

Must complete without errors. Output goes to `build/client` (static assets) and `build/server` (SSR handler). Vercel uses `@vercel/react-router` preset from `react-router.config.ts`.

## Step 5 — E2E (SSR meta + admin smoke)

```bash
npm run test:e2e
```

Includes `e2e/seo-ssr.spec.ts` — verifies canonical/og:title in raw HTML responses (no JS required).

## Optional preview

```bash
npm run build && npm run preview
```

Smoke-test critical routes: home, hero detail (`/tuong/hawk`), robots.txt, sitemap.xml, admin dashboard.

Production smoke (after deploy):

```bash
chmod +x scripts/smoke-ssr.sh
./scripts/smoke-ssr.sh https://autochessmobile.vn
```

## If any step fails

1. Read the error output
2. Fix the root cause
3. Re-run from the failed step
4. Do not ship until all steps pass
