---
name: add-public-page
description: Scaffolds a new public page with route, lazy loading, i18n keys, nav entry, and layout wrappers. Use when adding a new public-facing page, route, or section to the website.
---

# Add Public Page

## Checklist

```
- [ ] Create page component in src/pages/
- [ ] Add React.lazy route in App.tsx
- [ ] Add NAV_ITEMS entry + i18n keys (vi/en)
- [ ] Add document title in useDocumentTitle.ts
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

## Step 2 — Lazy route

In `src/App.tsx`, under the `Layout` route group:

```tsx
const MyFeaturePage = React.lazy(() =>
  import("./pages/MyFeaturePage").then((m) => ({ default: m.MyFeaturePage }))
)

// Inside Routes, wrapped in Suspense:
<Route path="my-slug" element={<MyFeaturePage />} />
```

Use Vietnamese slug. Do not add eager imports.

## Step 3 — Navigation + i18n

1. Add to `NAV_ITEMS` in `src/config/nav.ts` with `labelKey`
2. Add keys to `src/locales/vi/nav.json` and `src/locales/en/nav.json`
3. Add page copy to `src/locales/vi/pages.json` and `src/locales/en/pages.json`

## Step 4 — Document title

Add to `PUBLIC_ROUTE_TITLES` in `src/hooks/useDocumentTitle.ts`:

```tsx
"/my-slug": pageTitle("Page Name"),
```

## Step 5 — Verify

Run `node scripts/i18n-check.mjs` and `npm run lint`.
