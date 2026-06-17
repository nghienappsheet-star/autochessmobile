import * as React from "react"
import { DATA_VERSION, HEROES, RACES, CLASSES } from "@/data"
import { loadJson, saveJson } from "@/lib/storage"
import { mergeHeroesWithSeed } from "@/lib/hero-utils"
import { mergeTraitsWithSeed, type TraitRecord } from "@/lib/trait-visuals"
import { mergeByIdWithSeed } from "@/lib/seed-merge"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import type { Hero } from "@/types/domain"

function useHydratedPersistedState<T>(key: string, fallback: T) {
  const [state, setState] = React.useState<T>(fallback)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setState(loadJson(key, fallback))
    setHydrated(true)
  }, [key, fallback])

  React.useEffect(() => {
    if (hydrated) saveJson(key, state)
  }, [key, state, hydrated])

  return [state, setState] as const
}

export function usePersistedEntity<T>(key: string, fallback: T) {
  return useHydratedPersistedState(key, fallback)
}

export function usePersistedMergedList<T extends { id: string }>(key: string, seed: T[]) {
  const mergedSeed = React.useMemo(() => mergeByIdWithSeed(seed, seed), [seed])
  const [state, setState] = React.useState<T[]>(mergedSeed)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, seed)
    const merged = mergeByIdWithSeed(stored, seed)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    setState(merged)
    setHydrated(true)
  }, [key, seed])

  React.useEffect(() => {
    if (hydrated) saveJson(key, state)
  }, [key, state, hydrated])

  return [state, setState] as const
}

export function usePersistedHeroes() {
  const [state, setState] = React.useState<Hero[]>(HEROES)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<Hero[]>(STORAGE_KEYS.heroes, HEROES)
    const merged = mergeHeroesWithSeed(stored, HEROES)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(STORAGE_KEYS.heroes, merged)
    }
    setState(merged)
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (hydrated) saveJson(STORAGE_KEYS.heroes, state)
  }, [state, hydrated])

  return [state, setState] as const
}

export function usePersistedTraits<T extends TraitRecord>(key: string, seed: T[]) {
  const [state, setState] = React.useState<T[]>(seed)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, seed)
    const merged = mergeTraitsWithSeed(stored, seed)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    setState(merged)
    setHydrated(true)
  }, [key, seed])

  React.useEffect(() => {
    if (hydrated) saveJson(key, state)
  }, [key, state, hydrated])

  return [state, setState] as const
}
