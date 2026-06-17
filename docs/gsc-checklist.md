# Google Search Console — Post-Deploy Checklist

Run after production SSR deploy is live at `https://autochessmobile.vn`.

## 1. Verify property

- [ ] Open [Google Search Console](https://search.google.com/search-console)
- [ ] Add or confirm property `autochessmobile.vn` (DNS or HTML tag verification)

## 2. Submit sitemap

- [ ] Sitemaps → Add new sitemap: `https://autochessmobile.vn/sitemap.xml`
- [ ] Wait 24–48h; check **Discovered** vs **Submitted** URL counts

## 3. Request indexing (priority URLs)

Use URL Inspection → **Request indexing** for:

- [ ] `https://autochessmobile.vn/`
- [ ] `https://autochessmobile.vn/tuong`
- [ ] `https://autochessmobile.vn/doi-hinh`
- [ ] `https://autochessmobile.vn/trang-bi`
- [ ] 2–3 hero detail URLs (e.g. `/tuong/hawk`)

## 4. Share preview validation

- [ ] [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) — test `/tuong/hawk` and `/thao-luan/1`
- [ ] Zalo share preview — paste same URLs in Zalo chat and confirm title + description

## 5. Monitor (48–72h)

- [ ] GSC → Pages: indexed vs not indexed
- [ ] GSC → Sitemaps: success status, no critical errors
- [ ] GA4 Realtime (after `VITE_GA_ID` set in Vercel) — confirm page views

## Local verification before GSC

```bash
chmod +x scripts/smoke-ssr.sh
./scripts/smoke-ssr.sh https://autochessmobile.vn
```

Or run Playwright SSR meta tests locally:

```bash
npm run test:e2e -- e2e/seo-ssr.spec.ts
```
