import type { ClassSynergy, Comp, Hero, HeroSkill, HeroSkin, HeroStats, Item, Race } from "@/types/domain"
import {
  CLASS_NAME_ALIASES,
  HERO_ID_ALIASES,
  RACE_NAME_ALIASES,
} from "@/data/heroes"
import { getTraitDetailPath } from "@/lib/traits"

const MAGIC_CLASSES = ["Mage", "Warlock", "Shaman", "Witcher", "Priest", "Wizard"]
const TANK_CLASSES = ["Warrior", "Knight"]

function defaultHpForCost(cost: number): [number, number, number] {
  const base = 500 + cost * 120
  return [base, Math.round(base * 1.8), Math.round(base * 3.6)]
}

function defaultAtkForCost(cost: number): [number, number, number] {
  const base = 40 + cost * 8
  return [base, Math.round(base * 1.8), Math.round(base * 3.6)]
}

function normalizeRaceNames(races: string[]): string[] {
  return races.map((r) => RACE_NAME_ALIASES[r] ?? r)
}

function normalizeClassNames(classes: string[]): string[] {
  return classes.map((c) => CLASS_NAME_ALIASES[c] ?? c)
}

function resolveHeroId(id: string): string {
  return HERO_ID_ALIASES[id] ?? id
}

export function migrateStoredHero(hero: Hero): Hero {
  const canonicalId = resolveHeroId(hero.id)
  return {
    ...hero,
    id: canonicalId,
    race: normalizeRaceNames(hero.race ?? []),
    class: normalizeClassNames(hero.class ?? []),
  }
}

export type HeroStar = 1 | 2 | 3

function isStarTuple(value: unknown): value is [number, number, number] {
  return Array.isArray(value) && value.length === 3
}

function preferStarTuple(
  stored: number | [number, number, number] | undefined,
  seed: number | [number, number, number] | undefined
): number | [number, number, number] | undefined {
  if (isStarTuple(stored)) return stored
  if (isStarTuple(seed)) return seed
  return stored ?? seed
}

function preferHpAtkTuple(
  stored: number | [number, number, number] | undefined,
  seed: number | [number, number, number] | undefined
): [number, number, number] | undefined {
  const value = preferStarTuple(stored, seed)
  return Array.isArray(value) ? value : undefined
}

export function mergeHeroStats(stored?: HeroStats, seed?: HeroStats): HeroStats | undefined {
  if (!seed && !stored) return undefined
  if (!seed) return stored
  if (!stored) return seed
  return {
    hp: preferHpAtkTuple(stored.hp, seed.hp),
    atk: preferHpAtkTuple(stored.atk, seed.atk),
    armor: stored.armor ?? seed.armor,
    mr: stored.mr ?? seed.mr,
    atkSpeed: stored.atkSpeed ?? seed.atkSpeed,
    range: stored.range ?? seed.range,
  }
}

export function getHeroIconUrl(hero: Hero): string | undefined {
  return hero.iconUrl ?? hero.imageUrl ?? hero.portraitUrl ?? hero.image
}

/** Resolve the best available portrait/image URL for a hero. */
export function getHeroPortraitUrl(hero: Hero): string | undefined {
  return hero.portraitUrl ?? hero.imageUrl ?? hero.image ?? hero.iconUrl
}

export function isHeroNew(hero: Hero): boolean {
  return hero.isNew === true
}

function statAtStar(
  value: number | [number, number, number] | undefined,
  star: HeroStar,
  fallback: number
): number {
  if (value == null) return fallback
  if (Array.isArray(value)) return value[star - 1] ?? fallback
  return value
}

export function resolveHeroSkill(hero: Hero, star: HeroStar = 1): HeroSkill {
  if (hero.skill?.desc || hero.skill?.descByStar) {
    const desc =
      hero.skill.descByStar?.[star - 1] ?? hero.skill.desc ?? hero.skill.descByStar?.[0] ?? ""
    return {
      name: hero.skill.name || "Kỹ năng đặc biệt",
      type: hero.skill.type || "Chủ động",
      desc,
      iconUrl: hero.skill.iconUrl,
      descByStar: hero.skill.descByStar,
    }
  }

  const primaryClass = hero.class[0] ?? "Warrior"
  const isMagic = MAGIC_CLASSES.includes(primaryClass)

  return {
    name: isMagic ? "Phép thuật chiến trường" : "Đòn tấn công đặc biệt",
    type: "Chủ động",
    desc: isMagic
      ? `${hero.name} gây sát thương phép lên khu vực mục tiêu và tạo lợi thế cho đội hình.`
      : `${hero.name} gây sát thương lên mục tiêu và tạo lợi thế chiến thuật trên bàn cờ.`,
  }
}

export type ResolvedHeroStats = {
  hp: number
  atk: number
  armor: number
  mr: number
  atkSpeed: number
  range: number
}

export function resolveHeroStats(hero: Hero, star: HeroStar = 1): ResolvedHeroStats {
  const defaultHp = defaultHpForCost(hero.cost)
  const defaultAtk = defaultAtkForCost(hero.cost)
  const hpTuple = hero.stats?.hp ?? defaultHp
  const atkTuple = hero.stats?.atk ?? defaultAtk
  const primaryClass = hero.class[0] ?? "Warrior"
  const isTank = TANK_CLASSES.includes(primaryClass)
  const defaultArmor = isTank ? 25 + hero.cost * 5 : 15 + hero.cost * 3
  const defaultMr = MAGIC_CLASSES.includes(primaryClass) ? 15 + hero.cost * 5 : 10 + hero.cost * 2
  const defaultAtkSpeed = primaryClass === "Hunter" ? 1.0 : 1.3
  const defaultRange = primaryClass === "Hunter" || primaryClass === "Mage" ? 4 : 1

  return {
    hp: statAtStar(hpTuple, star, defaultHp[star - 1]),
    atk: statAtStar(atkTuple, star, defaultAtk[star - 1]),
    armor: statAtStar(hero.stats?.armor, star, defaultArmor),
    mr: statAtStar(hero.stats?.mr, star, defaultMr),
    atkSpeed: statAtStar(hero.stats?.atkSpeed, star, defaultAtkSpeed),
    range: statAtStar(hero.stats?.range, star, defaultRange),
  }
}

/** @deprecated Use resolveHeroStats(hero, star) for star-specific values */
export function resolveHeroStatsAllStars(hero: Hero): Required<Pick<HeroStats, "hp" | "atk" | "armor" | "mr">> {
  const hp = hero.stats?.hp ?? defaultHpForCost(hero.cost)
  const atk = hero.stats?.atk ?? defaultAtkForCost(hero.cost)
  const primaryClass = hero.class[0] ?? "Warrior"
  const isTank = TANK_CLASSES.includes(primaryClass)
  const armor = statAtStar(hero.stats?.armor, 1, isTank ? 25 + hero.cost * 5 : 15 + hero.cost * 3)
  const mr = statAtStar(
    hero.stats?.mr,
    1,
    MAGIC_CLASSES.includes(primaryClass) ? 15 + hero.cost * 5 : 10 + hero.cost * 2
  )
  return { hp, atk, armor, mr }
}

export function getHeroSkins(hero: Hero): HeroSkin[] {
  if (hero.skins?.length) return hero.skins
  const portrait = hero.portraitUrl ?? hero.imageUrl ?? hero.image
  if (portrait) {
    return [{ id: "default", name: "Default", imageUrl: portrait, isDefault: true }]
  }
  return []
}

export function getRelatedHeroes(
  hero: Hero,
  heroes: Hero[],
  options: { by: "race" | "class" | "cost"; value?: string; limit?: number } = { by: "race", limit: 8 }
): Hero[] {
  const limit = options.limit ?? 8
  const filtered = heroes.filter((h) => {
    if (h.id === hero.id) return false
    if (options.by === "cost") return h.cost === hero.cost
    if (options.by === "race") {
      const race = options.value ?? hero.race[0]
      if (!race) return false
      const normalized = RACE_NAME_ALIASES[race] ?? race
      return h.race.some((r) => (RACE_NAME_ALIASES[r] ?? r) === normalized)
    }
    const cls = options.value ?? hero.class[0]
    if (!cls) return false
    return h.class.includes(cls)
  })
  return filtered.slice(0, limit)
}

export function getRaceTraitPath(raceName: string, races: Race[]): string | null {
  const race = races.find((r) => r.name === raceName)
  return race ? getTraitDetailPath("race", race.id) : null
}

export function getClassTraitPath(className: string, classes: ClassSynergy[]): string | null {
  const cls = classes.find((c) => c.name === className)
  return cls ? getTraitDetailPath("class", cls.id) : null
}

export function getRecommendedItems(hero: Hero, items: Item[], limit = 5): Item[] {
  if (hero.recommendedItemIds?.length) {
    const mapped = hero.recommendedItemIds
      .map((id) => items.find((i) => i.id === id))
      .filter((i): i is Item => Boolean(i))
    if (mapped.length > 0) return mapped.slice(0, limit)
  }

  return items
    .filter((item) => item.recommendedHeroIds?.includes(hero.id))
    .sort((a, b) => b.tier - a.tier)
    .slice(0, limit)
}

export function getCompsForHero(hero: Hero, comps: Comp[], limit = 4): Comp[] {
  return comps.filter((comp) => comp.heroes.includes(hero.id)).slice(0, limit)
}

export type HeroFilterParams = {
  cost?: number | null
  race?: string | null
  class?: string | null
  q?: string | null
  isNew?: boolean | null
}

/** Short label for race/class badges (e.g. hero picker subtitles). */
export function formatHeroTraitsLabel(
  hero: Hero,
  options?: { separator?: string; emptyLabel?: string }
): string {
  const parts = [...hero.race, ...hero.class].filter(Boolean)
  if (parts.length === 0) return options?.emptyLabel ?? "—"
  return parts.join(options?.separator ?? " · ")
}

export function filterHeroes(heroes: Hero[], params: HeroFilterParams): Hero[] {
  const q = params.q?.trim().toLowerCase()
  const raceFilter = params.race ? (RACE_NAME_ALIASES[params.race] ?? params.race) : null
  return heroes.filter((hero) => {
    if (params.cost != null && hero.cost !== params.cost) return false
    if (raceFilter && !hero.race.some((r) => (RACE_NAME_ALIASES[r] ?? r) === raceFilter)) return false
    if (params.class && !hero.class.includes(params.class)) return false
    if (params.isNew === true && !isHeroNew(hero)) return false
    if (q && !hero.name.toLowerCase().includes(q)) return false
    return true
  })
}

export function mergeOneHeroWithSeed(stored: Hero, fromSeed?: Hero): Hero {
  if (!fromSeed) return stored
  return {
    ...fromSeed,
    ...stored,
    race: stored.race ? normalizeRaceNames(stored.race) : fromSeed.race,
    class: stored.class ? normalizeClassNames(stored.class) : fromSeed.class,
    skill: stored.skill ?? fromSeed.skill,
    stats: mergeHeroStats(stored.stats, fromSeed.stats),
    description: stored.description ?? fromSeed.description,
    tacticalNotes: stored.tacticalNotes ?? fromSeed.tacticalNotes,
    recommendedItemIds: stored.recommendedItemIds ?? fromSeed.recommendedItemIds,
    iconUrl: stored.iconUrl ?? fromSeed.iconUrl,
    imageUrl: stored.imageUrl ?? fromSeed.imageUrl ?? stored.image ?? fromSeed.image,
    portraitUrl: stored.portraitUrl ?? fromSeed.portraitUrl,
    dragonestId: stored.dragonestId ?? fromSeed.dragonestId,
    rarity: stored.rarity ?? fromSeed.rarity,
    lore: stored.lore ?? fromSeed.lore,
    skins: stored.skins ?? fromSeed.skins,
    chessTitle: stored.chessTitle ?? fromSeed.chessTitle,
    isNew: stored.isNew ?? fromSeed.isNew,
  }
}

export function mergeHeroesWithSeed(stored: Hero[], seed: Hero[]): Hero[] {
  const seedById = new Map(seed.map((h) => [h.id, h]))
  const migratedStored = stored.map(migrateStoredHero)
  const storedIds = new Set(migratedStored.map((h) => h.id))

  const merged = migratedStored.map((hero) => mergeOneHeroWithSeed(hero, seedById.get(hero.id)))

  for (const seedHero of seed) {
    if (!storedIds.has(seedHero.id)) {
      merged.push(seedHero)
    }
  }

  return merged
}
