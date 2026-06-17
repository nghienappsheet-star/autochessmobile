---
name: add-admin-crud
description: Scaffolds an admin list/CRUD page using AdminListShell, AdminDataTable, and DataContext setters. Use when adding admin management pages, CRUD screens, or new entries under /admin.
---

# Add Admin CRUD Page

## Checklist

```
- [ ] Create AdminXxxPage.tsx in src/pages/
- [ ] Wire useAppStore() data + CRUD setters
- [ ] Create route wrapper in src/routes/_pages/
- [ ] Register route in src/routes.ts
- [ ] Add ADMIN_NAV item in AdminSidebar.tsx
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
import { useAdminListPage } from "@/hooks/useAdminListPage"
import type { MyEntity } from "@/types/domain"

export function AdminMyEntityPage() {
  const { myEntities, addMyEntity, updateMyEntity, deleteMyEntity } = useAppStore()
  const { filteredItems, dialogs, ...rest } = useAdminListPage<MyEntity>({
    items: myEntities,
    searchTerm,
    match: (item, term) => item.name.toLowerCase().includes(term.toLowerCase()),
  })
  // ...
}
```

## Step 2 — Route wrapper

Create `src/routes/_pages/admin-my-slug.tsx`:

```tsx
import { adminStaticMeta } from "@/lib/seo/loaders"

export const meta = () => adminStaticMeta("/admin/my-slug", "My Entity")
export { AdminMyEntityPage as default } from "@/pages/AdminMyEntityPage"
```

Register in [`src/routes.ts`](../../src/routes.ts) under the admin layout.

## Step 3 — Sidebar

Add item to `ADMIN_NAV` in `src/components/AdminSidebar.tsx` (pick correct group). Admin labels are Vietnamese hardcoded (existing convention).

## Notes

- Use `Button`, `Input`, `Select` from `@/components/ui/core` — no inline card styles
- Type entity props with domain types from `@/types/domain`, not `any`
- Always pass explicit generic to `useAdminListPage<T>()` for type-safe list rendering
