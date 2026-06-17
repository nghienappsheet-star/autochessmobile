---
name: deploy-vercel
description: Deploy React Router v7 SSR to Vercel with Supabase, env vars, and production smoke tests. Use when setting up hosting, env vars, edge functions, or checking deployment status.
---

# Deploy to Vercel + Supabase (SSR)

## Prerequisites

- Git repo pushed to GitHub/GitLab/Bitbucket
- [Supabase](https://supabase.com) project (free tier OK for dev)
- [Vercel](https://vercel.com) account linked to repo

## Step 1 — Supabase project

1. Create project at supabase.com → note **Project URL** and **anon public** key (Settings → API).
2. Enable **Row Level Security** on every public table before going live.
3. Copy keys to local `.env` (from [`.env.example`](../../.env.example)):

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

4. For Edge Functions needing admin access, add **only on Vercel** (not in `.env` committed):

```env
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Never prefix service role with `VITE_`.

## Step 2 — Vercel project (SSR)

1. Import repo in Vercel dashboard → **New Project**.
2. Framework: **React Router** (or Vite — `@vercel/react-router` preset in [`react-router.config.ts`](../../react-router.config.ts) handles SSR).
3. Build settings (also in [`vercel.json`](../../vercel.json)):
   - Build command: `npm run build`
   - Output directory: `build/client` (not `dist/`)
4. Environment variables (Production + Preview):

| Variable | Where |
|----------|-------|
| `VITE_GA_ID` | Vercel + local `.env` (GA4 measurement ID) |
| `VITE_SUPABASE_URL` | Vercel + local `.env` |
| `VITE_SUPABASE_ANON_KEY` | Vercel + local `.env` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Vercel + local `.env` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Vercel + local `.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel only (Edge Functions) |

5. Deploy.

## Step 3 — Verify deployment

### SSR smoke script

```bash
chmod +x scripts/smoke-ssr.sh
./scripts/smoke-ssr.sh https://YOUR_DOMAIN
```

Checks: robots.txt, sitemap.xml, canonical + og:title on hero detail, home meta.

### Health endpoint

```bash
curl -s https://YOUR_DOMAIN/api/health | jq
```

Expected:

```json
{
  "status": "ok",
  "version": "0.0.0",
  "commit": "abc1234...",
  "env": "production",
  "timestamp": "..."
}
```

### SSR deep links

View source (not DevTools Elements) on `/tuong/hawk` — should contain `<title>`, `rel="canonical"`, `property="og:title"` in initial HTML.

### PWA

After deploy, confirm `sw.js` returns `Cache-Control: no-store` and app updates on refresh.

### Vercel CLI (optional)

```bash
npx vercel ls
npx vercel inspect YOUR_DEPLOYMENT_URL
```

Check **Deployment** tab in Vercel dashboard for commit SHA matching git.

## Step 4 — Google Search Console

Follow [`docs/gsc-checklist.md`](../../docs/gsc-checklist.md): submit sitemap, request indexing for priority URLs, validate Facebook/Zalo share previews.

## Step 5 — Local pre-deploy check

Run before pushing:

```bash
npm run lint
npm run build
npm run test:e2e -- e2e/seo-ssr.spec.ts
```

See `ship-check` skill for full checklist.

## Egress tips (when migrating data)

- Use [`src/lib/supabase-query.ts`](../../src/lib/supabase-query.ts) helpers.
- Follow [`.cursor/rules/supabase-vercel.mdc`](../../.cursor/rules/supabase-vercel.mdc).
- Monitor Supabase dashboard → **Usage** → Egress after launch.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on routes | Confirm `@vercel/react-router` preset; output is `build/client` not `dist/` |
| Missing OG tags in share preview | Check route has `meta` export; view page source (SSR HTML) |
| Supabase "Invalid API key" | Check env vars in Vercel; redeploy after adding vars |
| `/api/health` 404 | Ensure `api/health.ts` is committed; Vercel builds `/api` automatically |
| Stale PWA after deploy | Hard refresh; check `sw.js` no-cache headers in `vercel.json` |
| High egress | Narrow `.select()` columns; add pagination; enable caching |
