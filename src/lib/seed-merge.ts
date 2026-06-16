import type { EntityWithId } from "@/lib/entity-store"

/** Merge stored entities with seed by id — seed order preserved, new seed entries appended. */
export function mergeByIdWithSeed<T extends EntityWithId>(stored: T[], seed: T[]): T[] {
  if (stored.length === 0) return seed
  const byId = new Map(stored.map((item) => [item.id, item]))
  for (const item of seed) {
    if (!byId.has(item.id)) byId.set(item.id, item)
  }
  return seed.map((item) => byId.get(item.id) ?? item)
}

export function mergeStoredWithSeedList<T extends EntityWithId>(
  stored: T[],
  seed: T[],
  storedVersion: number,
  currentVersion: number,
  key: string,
  saveJson: (key: string, value: T[]) => void,
  saveVersion: (version: number) => void
): T[] {
  const merged = mergeByIdWithSeed(stored, seed)
  if (storedVersion < currentVersion) {
    saveVersion(currentVersion)
    saveJson(key, merged)
  }
  return merged
}
