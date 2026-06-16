import type { ClassSynergy, Comp, Hero, Race } from "@/types/domain"

export type TraitKind = "race" | "class"

export type TraitMilestone = { count: number; effect: string }

export type TraitItem = {
  kind: TraitKind
  id: string
  name: string
  icon: string
  iconUrl?: string
  description: string
  milestones: TraitMilestone[]
}

export type TraitFilterTab = "all" | "race" | "class"

export type TraitSort = "name" | "heroCount"

export function routeKindToTraitKind(routeKind: string): TraitKind | null {
  if (routeKind === "toc") return "race"
  if (routeKind === "he") return "class"
  return null
}

export function traitKindToRouteKind(kind: TraitKind): "toc" | "he" {
  return kind === "race" ? "toc" : "he"
}

export function getTraitDetailPath(kind: TraitKind, id: string): string {
  return `/toc-he/${traitKindToRouteKind(kind)}/${id}`
}

export function getTraitsListPath(tab?: TraitFilterTab): string {
  if (!tab || tab === "all") return "/toc-he"
  return `/toc-he?tab=${tab}`
}

export function raceToTraitItem(race: Race): TraitItem {
  return {
    kind: "race",
    id: race.id,
    name: race.name,
    icon: race.icon,
    iconUrl: race.iconUrl,
    description: race.description,
    milestones: race.milestones ?? [],
  }
}

export function classToTraitItem(cls: ClassSynergy): TraitItem {
  return {
    kind: "class",
    id: cls.id,
    name: cls.name,
    icon: cls.icon,
    iconUrl: cls.iconUrl,
    description: cls.description,
    milestones: cls.milestones ?? [],
  }
}

export function buildTraitItems(races: Race[], classes: ClassSynergy[]): TraitItem[] {
  return [...races.map(raceToTraitItem), ...classes.map(classToTraitItem)]
}

export function getTraitHeroes(trait: TraitItem, heroes: Hero[]): Hero[] {
  if (trait.kind === "race") {
    return heroes.filter((h) => h.race.includes(trait.name))
  }
  return heroes.filter((h) => h.class.includes(trait.name))
}

export function getTraitRelatedComps(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[],
  limit = 4
): Comp[] {
  const traitHeroes = getTraitHeroes(trait, heroes)
  const traitHeroIds = new Set(traitHeroes.map((h) => h.id))

  return comps
    .filter((c) => c.heroes.some((hId) => traitHeroIds.has(hId)))
    .slice(0, limit)
}

export type TraitCount = { name: string; count: number }

/** Count race + class trait occurrences across a hero roster (deduped by hero id). */
export function countActiveTraits(heroIds: string[], heroes: Hero[]): TraitCount[] {
  const uniqueIds = Array.from(new Set(heroIds))
  const counts: Record<string, number> = {}

  uniqueIds.forEach((id) => {
    const hero = heroes.find((h) => h.id === id)
    if (!hero) return
    hero.race.forEach((r) => {
      counts[r] = (counts[r] || 0) + 1
    })
    hero.class.forEach((c) => {
      counts[c] = (counts[c] || 0) + 1
    })
  })

  return Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function filterTraits(
  traits: TraitItem[],
  options: {
    search?: string
    tab?: TraitFilterTab
    sort?: TraitSort
    heroes?: Hero[]
  }
): TraitItem[] {
  const { search = "", tab = "all", sort = "name", heroes = [] } = options
  const query = search.trim().toLowerCase()

  let result = traits.filter((trait) => {
    if (tab !== "all" && trait.kind !== tab) return false
    if (!query) return true
    return (
      trait.name.toLowerCase().includes(query) ||
      trait.description.toLowerCase().includes(query)
    )
  })

  result = [...result].sort((a, b) => {
    if (sort === "heroCount") {
      const countA = getTraitHeroes(a, heroes).length
      const countB = getTraitHeroes(b, heroes).length
      if (countB !== countA) return countB - countA
    }
    return a.name.localeCompare(b.name)
  })

  return result
}
