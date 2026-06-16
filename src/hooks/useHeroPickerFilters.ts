import * as React from "react"
import { filterHeroes, type HeroFilterParams } from "@/lib/hero-utils"
import type { Hero } from "@/types/domain"

export type HeroPickerFilterState = {
  searchTerm: string
  selectedCost: number | null
  selectedRace: string | null
  selectedClass: string | null
}

type UseHeroPickerFiltersOptions = {
  excludeIds?: string[]
  searchTraits?: boolean
}

export function useHeroPickerFilters(
  heroes: Hero[],
  options: UseHeroPickerFiltersOptions = {}
) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCost, setSelectedCost] = React.useState<number | null>(null)
  const [selectedRace, setSelectedRace] = React.useState<string | null>(null)
  const [selectedClass, setSelectedClass] = React.useState<string | null>(null)

  const filteredHeroes = React.useMemo(() => {
    const params: HeroFilterParams = {
      q: searchTerm || null,
      cost: selectedCost,
      race: selectedRace,
      class: selectedClass,
    }

    let result = filterHeroes(heroes, params)

    if (options.searchTraits && searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase()
      result = heroes.filter((hero) => {
        const matchSearch =
          hero.name.toLowerCase().includes(q) ||
          hero.race.some((r) => r.toLowerCase().includes(q)) ||
          hero.class.some((c) => c.toLowerCase().includes(q))
        const matchCost = selectedCost === null || hero.cost === selectedCost
        const matchRace = !selectedRace || hero.race.includes(selectedRace)
        const matchClass = !selectedClass || hero.class.includes(selectedClass)
        return matchSearch && matchCost && matchRace && matchClass
      })
    }

    if (options.excludeIds?.length) {
      const excluded = new Set(options.excludeIds)
      result = result.filter((hero) => !excluded.has(hero.id))
    }

    return result
  }, [
    heroes,
    searchTerm,
    selectedCost,
    selectedRace,
    selectedClass,
    options.excludeIds,
    options.searchTraits,
  ])

  const costSelectOptions = React.useMemo(() => {
    const costs = Array.from(new Set(heroes.map((h) => h.cost))).sort((a, b) => a - b)
    return costs
  }, [heroes])

  const clearFilters = React.useCallback(() => {
    setSearchTerm("")
    setSelectedCost(null)
    setSelectedRace(null)
    setSelectedClass(null)
  }, [])

  const hasActiveFilters =
    Boolean(searchTerm.trim()) ||
    selectedCost !== null ||
    selectedRace !== null ||
    selectedClass !== null

  return {
    searchTerm,
    setSearchTerm,
    selectedCost,
    setSelectedCost,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    filteredHeroes,
    costSelectOptions,
    clearFilters,
    hasActiveFilters,
  }
}
