---
name: add-public-page
description: Scaffolds a new public page with React Router v7 route wrapper, i18n keys, nav entry, SSR meta, and layout wrappers. Use when adding a new public-facing page, route, or section to the website.
---

# Add Public Page

## Checklist

```
- [ ] Create page component in src/pages/
- [ ] Create route wrapper in src/routes/_pages/
- [ ] Register route in src/routes.ts
- [ ] Add SSR meta (static or loader+meta for detail pages)
- [ ] Add NAV_ITEMS entry + i18n keys (vi/en)
- [ ] Wrap with PageContainer + PageHeader
- [ ] Run node scripts/i18n-check.mjs
```

## Step 1 — Page component

Create `src/pages/MyFeaturePage.tsx`:

```tsx
import * as React from "react"
import { useTranslation } from "react-i18next"
import { PageHeader } from "@/components/layout/PageHeader"
import { PageContainer } from "@/components/layout/PageContainer"
import { getPageIcon } from "@/config/icons"

export function MyFeaturePage() {
  const { t } = useTranslation("pages")

  return (
    <PageContainer>
      <div className="space-y-6 pb-10">
        <PageHeader
          title={t("myFeature.title")}
          description={t("myFeature.description")}
          icon={getPageIcon("myFeature")}
        />
        {/* page content */}
      </div>
    </PageContainer>
  )
}
```

Reference: [HeroesPage.tsx](../../src/pages/HeroesPage.tsx)

## Step 2 — Route wrapper

Create `src/routes/_pages/my-slug.tsx`:

```tsx
import { staticPageMeta } from "@/lib/seo/meta"

export const meta = staticPageMeta("/my-slug", "Page Name")
export { MyFeaturePage as default } from "@/pages/MyFeaturePage"
```

Register in [`src/routes.ts`](../../src/routes.ts) under the public layout:

```tsx
route("my-slug", "routes/_pages/my-slug.tsx"),
```

Use Vietnamese slug. RR7 auto-splits code — no manual `React.lazy()`.

## Step 3 — Navigation + i18n

1. Add to `NAV_ITEMS` in `src/config/nav.ts` with `labelKey`
2. Add keys to `src/locales/vi/nav.json` and `src/locales/en/nav.json`
3. Add page copy to `src/locales/vi/pages.json` and `src/locales/en/pages.json`

## Step 4 — SSR meta

**List/static page:** use `staticPageMeta()` or add entry to `STATIC_ROUTE_META` in `src/lib/seo/meta.ts`.

**Detail page:** add loader + meta helpers in `src/lib/seo/loaders.ts` and export from route wrapper (see `tin-tuc.$id.tsx`).

## Step 5 — Verify

```bash
node scripts/i18n-check.mjs
npm run lint
npm run test:e2e -- e2e/seo-ssr.spec.ts
```
