---
name: deploy-vercel
description: Connect Supabase, deploy to Vercel, and verify production health/version. Use when setting up hosting, env vars, edge functions, or checking deployment status.
---

# Deploy to Vercel + Supabase

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

## Step 2 — Vercel project

1. Import repo in Vercel dashboard → **New Project**.
2. Framework preset: **Vite** (auto-detected).
3. Build settings (also in [`vercel.json`](../../vercel.json)):
   - Build command: `npm run build`
   - Output directory: `dist`
4. Environment variables (Production + Preview):

| Variable | Where |
|----------|-------|
| `VITE_SUPABASE_URL` | Vercel + local `.env` |
| `VITE_SUPABASE_ANON_KEY` | Vercel + local `.env` |
| `VITE_CLOUDINARY_CLOUD_NAME` | Vercel + local `.env` |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Vercel + local `.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel only (Edge Functions) |

5. Deploy.

## Step 3 — Verify deployment

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

### SPA routing

Open a deep link directly (e.g. `/doi-hinh`, `/tuong`) — should load, not 404.

### PWA

After deploy, confirm `sw.js` returns `Cache-Control: no-store` and app updates on refresh.

### Vercel CLI (optional)

```bash
npx vercel ls
npx vercel inspect YOUR_DEPLOYMENT_URL
```

Check **Deployment** tab in Vercel dashboard for commit SHA matching git.

## Step 4 — Local pre-deploy check

Run before pushing:

```bash
npm run lint
npm run build
```

See `ship-check` skill for full checklist.

## Egress tips (when migrating data)

- Use [`src/lib/supabase-query.ts`](../../src/lib/supabase-query.ts) helpers.
- Follow [`.cursor/rules/supabase-vercel.mdc`](../../.cursor/rules/supabase-vercel.mdc).
- Monitor Supabase dashboard → **Usage** → Egress after launch.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on client routes | Confirm [`vercel.json`](../../vercel.json) SPA rewrite exists |
| Supabase "Invalid API key" | Check env vars in Vercel; redeploy after adding vars |
| `/api/health` 404 | Ensure `api/health.ts` is committed; Vercel builds `/api` automatically |
| Stale PWA after deploy | Hard refresh; check `index.html` / `sw.js` no-cache headers |
| High egress | Narrow `.select()` columns; add pagination; enable caching |
