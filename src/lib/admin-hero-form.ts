import type { Hero, HeroRarity, HeroSkin, HeroStats } from "@/types/domain"
import { mergeOneHeroWithSeed } from "@/lib/hero-utils"

export const HERO_RARITIES: HeroRarity[] = ["Common", "Rare", "Epic", "Legendary"]

export const SKILL_TYPE_OPTIONS = ["Chủ động", "Bị động", "Kích hoạt"] as const

export type HeroSeedResetField =
  | "description"
  | "lore"
  | "tacticalNotes"
  | "recommendedItemIds"
  | "iconUrl"
  | "portraitUrl"
  | "imageUrl"
  | "image"
  | "rarity"
  | "chessTitle"
  | "skill"
  | "stats"
  | "skins"
  | "isNew"
  | "race"
  | "class"

export type HeroResetSection = "basic" | "statsSkill" | "images" | "content"

export const HERO_RESET_FIELDS: Record<HeroResetSection, HeroSeedResetField[]> = {
  basic: ["description", "chessTitle", "rarity", "isNew", "race", "class"],
  statsSkill: ["stats", "skill"],
  images: ["iconUrl", "portraitUrl", "imageUrl", "image", "skins"],
  content: ["lore", "tacticalNotes", "recommendedItemIds"],
}

export function createDefaultHeroDraft(partial?: Partial<Hero>): Hero {
  return {
    id: "",
    name: "",
    cost: 1,
    race: [],
    class: [],
    skill: {
      name: "Kỹ năng đặc biệt",
      desc: "Gây sát thương lên đối thủ.",
      type: "Chủ động",
    },
    stats: {
      hp: [700, 1260, 2520],
      atk: [55, 99, 198],
      armor: 30,
      mr: 20,
    },
    image: "",
    isNew: false,
    ...partial,
  }
}

export { slugifyHeroId, parseLines } from "@/lib/admin-utils"

export function parseStarTuple(value: string): [number, number, number] | undefined {
  const parts = value.split(",").map((p) => Number(p.trim()))
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0], parts[1], parts[2]]
  }
  return undefined
}

export function formatStarTuple(value: [number, number, number] | undefined): string {
  if (!value) return ""
  return value.join(", ")
}

export function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isNaN(n) ? undefined : n
}

export function stripHeroOverrides(hero: Hero, fields: HeroSeedResetField[]): Hero {
  const next = { ...hero } as Record<string, unknown>
  for (const field of fields) {
    delete next[field]
  }
  return next as Hero
}

export function createEmptySkin(index: number): HeroSkin {
  return {
    id: `skin_${index}`,
    name: `Skin ${index}`,
    imageUrl: "",
    isDefault: index === 0,
  }
}

export function normalizeHeroDraft(hero: Hero): Hero {
  return {
    ...hero,
    race: hero.race ?? [],
    class: hero.class ?? [],
    tacticalNotes: hero.tacticalNotes?.filter(Boolean),
    recommendedItemIds: hero.recommendedItemIds?.filter(Boolean),
    skins: hero.skins?.filter((s) => s.name.trim() || s.imageUrl.trim()),
  }
}

export function ensureHeroStats(stats?: HeroStats): HeroStats {
  return {
    hp: stats?.hp ?? [700, 1260, 2520],
    atk: stats?.atk ?? [55, 99, 198],
    armor: stats?.armor ?? 30,
    mr: stats?.mr ?? 20,
    atkSpeed: stats?.atkSpeed,
    range: stats?.range,
  }
}

export function resetHeroFieldsFromSeed(
  hero: Hero,
  seed: Hero | undefined,
  section: HeroResetSection
): Hero {
  const stripped = stripHeroOverrides(hero, HERO_RESET_FIELDS[section])
  return mergeOneHeroWithSeed(stripped, seed)
}
