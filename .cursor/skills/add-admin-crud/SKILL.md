---
name: add-admin-crud
description: Scaffolds an admin list/CRUD page using AdminListShell, AdminDataTable, and DataContext setters. Use when adding admin management pages, CRUD screens, or new entries under /admin.
---

# Add Admin CRUD Page

## Checklist

```
- [ ] Create AdminXxxPage.tsx in src/pages/
- [ ] Wire useAppStore() data + CRUD setters
- [ ] Add lazy route under /admin in App.tsx
- [ ] Add ADMIN_NAV item in AdminSidebar.tsx
- [ ] Add ADMIN_ROUTE_TITLES entry
- [ ] Run npm run lint
```

## Step 1 — Page structure

Use admin shared components from `@/components/admin`:

| Need | Component |
|------|-----------|
| Page shell | `AdminListShell` |
| Header | `AdminPageHeader` |
| Toolbar/search | `AdminToolbar` |
| Table | `AdminDataTable`, `AdminTable`, `AdminThead`, `AdminTh`, `AdminTr`, `AdminTd` |
| Create/edit | `AdminFormDialog`, `AdminField`, `AdminFormGrid` |
| Delete confirm | `AdminDeleteDialog` |

Reference: [AdminHeroesPage.tsx](../../src/pages/AdminHeroesPage.tsx)

```tsx
import * as React from "react"
import { useAppStore } from "@/contexts/DataContext"
import {
  AdminListShell,
  AdminPageHeader,
  AdminDataTable,
  AdminFormDialog,
  AdminDeleteDialog,
} from "@/components/admin"

export function AdminMyEntityPage() {
  const { myEntities, addMyEntity, updateMyEntity, deleteMyEntity } = useAppStore()
  // search/filter state, dialog open state, form handlers
  return (
    <AdminListShell>
      <AdminPageHeader title="My Entity" description="Manage my entities" />
      {/* toolbar + table + dialogs */}
    </AdminListShell>
  )
}
```

## Step 2 — Route

```tsx
const AdminMyEntityPage = React.lazy(() =>
  import("./pages/AdminMyEntityPage").then((m) => ({ default: m.AdminMyEntityPage }))
)

<Route path="my-entity" element={<AdminMyEntityPage />} />
```

## Step 3 — Sidebar + title

1. Add item to `ADMIN_NAV` in `src/components/AdminSidebar.tsx` (pick correct group)
2. Add to `ADMIN_ROUTE_TITLES` in `src/hooks/useDocumentTitle.ts`:

```tsx
"/admin/my-entity": adminPageTitle("My Entity"),
```

## Notes

- Admin labels in `AdminSidebar` are Vietnamese hardcoded (existing convention)
- Use `Button`, `Input`, `Select` from `@/components/ui/core` — no inline card styles
- Type entity props with domain types from `@/types/domain`, not `any`
