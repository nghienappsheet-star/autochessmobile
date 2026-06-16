import * as React from "react"
import { DATA_VERSION, HEROES, RACES, CLASSES } from "@/data"
import { loadJson, saveJson } from "@/lib/storage"
import { mergeHeroesWithSeed } from "@/lib/hero-utils"
import { mergeTraitsWithSeed, type TraitRecord } from "@/lib/trait-visuals"
import { mergeByIdWithSeed } from "@/lib/seed-merge"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import type { Hero } from "@/types/domain"

export function usePersistedEntity<T>(key: string, fallback: T) {
  const [state, setState] = React.useState<T>(() => loadJson(key, fallback))
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}

export function usePersistedMergedList<T extends { id: string }>(key: string, seed: T[]) {
  const [state, setState] = React.useState<T[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, seed)
    const merged = mergeByIdWithSeed(stored, seed)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}

export function usePersistedHeroes() {
  const [state, setState] = React.useState<Hero[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<Hero[]>(STORAGE_KEYS.heroes, HEROES)
    const merged = mergeHeroesWithSeed(stored, HEROES)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(STORAGE_KEYS.heroes, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(STORAGE_KEYS.heroes, state)
  }, [state])
  return [state, setState] as const
}

export function usePersistedTraits<T extends TraitRecord>(key: string, fallback: T[]) {
  const [state, setState] = React.useState<T[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, fallback)
    const merged = mergeTraitsWithSeed(stored, fallback)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}
