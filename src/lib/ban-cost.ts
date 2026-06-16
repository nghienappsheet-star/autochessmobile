import type { Hero } from "@/types/domain"

/** Pool copies per hero cost tier (standard Auto Chess rules). */
export const POOL_COPIES_BY_COST: Record<number, number> = {
  1: 39,
  2: 26,
  3: 21,
  4: 13,
  5: 10,
}

export function heroHasTrait(hero: Hero, trait: string): boolean {
  return hero.race.includes(trait) || hero.class.includes(trait)
}

export function traitPoolHeroes(trait: string, heroes: Hero[]): Hero[] {
  return heroes.filter((h) => heroHasTrait(h, trait))
}

/** Number of distinct heroes belonging to this trait (ban cost = hero count). */
export function traitBanCost(trait: string, heroes: Hero[]): number {
  return traitPoolHeroes(trait, heroes).length
}

export function traitPoolCopyCount(trait: string, heroes: Hero[]): number {
  return traitPoolHeroes(trait, heroes).reduce(
    (sum, h) => sum + (POOL_COPIES_BY_COST[h.cost] ?? 0),
    0
  )
}
