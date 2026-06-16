---
name: add-domain-entity
description: Adds a new domain entity end-to-end — type, seed data, DataContext state, persistence, and CRUD setters. Use when introducing new game data types, content entities, or extending the data model.
---

# Add Domain Entity

## Checklist

```
- [ ] Define type in src/types/domain.ts
- [ ] Add seed data in src/data/ + re-export from src/data.ts
- [ ] Add STORAGE_KEYS entry in DataContext.tsx
- [ ] Add persisted state + CRUD setters
- [ ] Export type from DataContext if needed
- [ ] Run npm run validate:data && npm run lint
```

## Step 1 — Type

Add to `src/types/domain.ts`:

```tsx
export type MyEntity = {
  id: string
  name: string
  // domain-specific fields
}
```

## Step 2 — Seed data

Create `src/data/my-entities.ts` with seed array, then re-export from `src/data/index.ts` and `src/data.ts`.

## Step 3 — DataContext wiring

In `src/contexts/DataContext.tsx`:

1. Import type and seed
2. Add key to `STORAGE_KEYS`:
   ```tsx
   myEntities: "autochessmobile-my-entities",
   ```
3. Add state (seed-backed entities use `usePersistedSeedEntity`):
   ```tsx
   const [myEntities, setMyEntities] = usePersistedSeedEntity<MyEntity[]>(
     STORAGE_KEYS.myEntities,
     MY_ENTITIES
   )
   ```
4. Add CRUD setters:
   ```tsx
   const addMyEntity = (entity: MyEntity) =>
     setMyEntities((prev) => [...prev, entity])
   const updateMyEntity = (id: string, patch: Partial<MyEntity>) =>
     setMyEntities((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
   const deleteMyEntity = (id: string) =>
     setMyEntities((prev) => prev.filter((e) => e.id !== id))
   ```
5. Expose on `DataContextType` and provider `value`

## Step 4 — Validation

If entity has cross-references (hero IDs, trait names), add checks to `src/lib/validate-game-data.ts`.

Run:
```bash
npm run validate:data
npm run lint
```

## Reference files

- Types: [domain.ts](../../src/types/domain.ts)
- Context: [DataContext.tsx](../../src/contexts/DataContext.tsx)
- Storage: [storage.ts](../../src/lib/storage.ts)
