import type { Comp, Hero } from "@/types/domain"
import type { TraitItem, TraitKind } from "@/lib/traits"
import { buildTraitItems, getTraitHeroes, getTraitRelatedComps } from "@/lib/traits"

export type TraitTier = "S" | "A" | "B" | "C"

export type HeroAvailability = "common" | "uncommon" | "rare"

export type TraitPopularity = {
  score: number
  pickRatePct: number
  compCount: number
}

export type TraitPhaseStrength = {
  early: number
  mid: number
  late: number
}

export type TraitPartner = {
  id: string
  name: string
  kind: TraitKind
  score: number
}

export type TraitMatchupEntry = {
  id: string
  name: string
  kind: TraitKind
  reason?: string
}

export type TraitMatchups = {
  counters: TraitMatchupEntry[]
  counteredBy: TraitMatchupEntry[]
}

type TraitArchetype =
  | "armorTank"
  | "physicalDPS"
  | "magicDPS"
  | "magicResist"
  | "healing"
  | "antiHeal"
  | "trueDmg"
  | "control"
  | "armorShred"

const TIER_WEIGHT: Record<string, number> = {
  S: 3,
  A: 2,
  B: 1,
  C: 0.5,
}

const COUNTER_MATRIX: Record<TraitArchetype, TraitArchetype[]> = {
  armorTank: ["trueDmg", "magicDPS", "armorShred"],
  physicalDPS: ["armorTank", "control"],
  magicDPS: ["magicResist", "control"],
  magicResist: ["armorShred", "physicalDPS"],
  healing: ["antiHeal", "trueDmg"],
  antiHeal: ["healing"],
  trueDmg: ["armorTank", "healing"],
  control: ["physicalDPS", "magicDPS"],
  armorShred: ["armorTank", "magicResist"],
}

const ARCHETYPE_KEYWORDS: Record<TraitArchetype, string[]> = {
  armorTank: ["armor", "giáp", "shield", "max hp", "hp", "máu", "resistance", "kháng"],
  physicalDPS: ["attack damage", "physical", "sát thương vật lý", "atk", "damage"],
  magicDPS: ["magical", "magic", "mage", "phép", "spell", "resistence"],
  magicResist: ["magic resistance", "magical resistence", "kháng phép", "mr"],
  healing: ["heal", "lifesteal", "hồi máu", "hút máu"],
  antiHeal: ["healing", "reduce healing", "giảm hồi"],
  trueDmg: ["pure damage", "sát thương chuẩn", "true"],
  control: ["stun", "stone", "hex", "silence", "petrified", "penguin", "control", "câm lặng", "hóa đá"],
  armorShred: ["pierce", "armor shred", "reduce", "giảm giáp", "xuyên", "resistence"],
}

function compTierWeight(tier: string): number {
  return TIER_WEIGHT[tier] ?? 0.5
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(n)))
}

export function getHeroAvailability(hero: Hero): HeroAvailability {
  if (hero.cost <= 2) return "common"
  if (hero.cost === 3) return "uncommon"
  return "rare"
}

export function getTraitPopularity(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[],
  allTraits?: TraitItem[]
): TraitPopularity {
  const traitHeroIds = new Set(getTraitHeroes(trait, heroes).map((h) => h.id))
  let score = 0
  let compCount = 0

  for (const comp of comps) {
    const hasTraitHero = comp.heroes.some((id) => traitHeroIds.has(id))
    if (!hasTraitHero) continue
    compCount += 1
    score += compTierWeight(comp.tier)
  }

  const traits = allTraits ?? buildTraitItems([], [])
  let maxScore = score
  if (allTraits && allTraits.length > 0) {
    maxScore = Math.max(
      ...allTraits.map((t) => {
        const ids = new Set(getTraitHeroes(t, heroes).map((h) => h.id))
        return comps.reduce((acc, c) => {
          if (!c.heroes.some((id) => ids.has(id))) return acc
          return acc + compTierWeight(c.tier)
        }, 0)
      }),
      1
    )
  } else {
    maxScore = Math.max(score, 1)
  }

  const pickRatePct = clamp((score / maxScore) * 100)

  return { score, pickRatePct, compCount }
}

export function getTraitTier(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[],
  allTraits?: TraitItem[]
): TraitTier {
  const { score, compCount } = getTraitPopularity(trait, heroes, comps, allTraits)
  const related = getTraitRelatedComps(trait, heroes, comps, 50)
  const hasSTier = related.some((c) => c.tier === "S")
  const hasATier = related.some((c) => c.tier === "A")

  if (hasSTier && score >= 2) return "S"
  if (hasSTier || (hasATier && compCount >= 2)) return "A"
  if (compCount >= 1 || score >= 1) return "B"
  return "C"
}

export function getTraitPhase(trait: TraitItem, heroes: Hero[]): TraitPhaseStrength {
  const traitHeroes = getTraitHeroes(trait, heroes)
  if (traitHeroes.length === 0) {
    return { early: 33, mid: 34, late: 33 }
  }

  const avgCost =
    traitHeroes.reduce((sum, h) => sum + h.cost, 0) / traitHeroes.length
  const milestones = trait.milestones.map((m) => m.count)
  const firstMilestone = milestones[0] ?? 2
  const maxMilestone = milestones[milestones.length - 1] ?? firstMilestone

  const earlyBase = clamp(100 - (avgCost - 1) * 22 - (firstMilestone - 1) * 8)
  const lateBase = clamp((avgCost - 2) * 18 + (maxMilestone >= 6 ? 25 : 0) + (maxMilestone >= 9 ? 15 : 0))
  const midBase = clamp(100 - Math.abs(earlyBase - lateBase) * 0.35)

  const total = earlyBase + midBase + lateBase || 1
  return {
    early: clamp((earlyBase / total) * 100),
    mid: clamp((midBase / total) * 100),
    late: clamp((lateBase / total) * 100),
  }
}

function traitKey(kind: TraitKind, name: string): string {
  return `${kind}:${name}`
}

export function getTraitPartners(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[],
  allTraits: TraitItem[],
  limit = 6
): TraitPartner[] {
  const traitHeroes = getTraitHeroes(trait, heroes)
  const traitHeroIds = new Set(traitHeroes.map((h) => h.id))
  const scores = new Map<string, number>()

  const addScore = (kind: TraitKind, name: string, weight: number) => {
    if (kind === trait.kind && name === trait.name) return
    const key = traitKey(kind, name)
    scores.set(key, (scores.get(key) ?? 0) + weight)
  }

  for (const hero of traitHeroes) {
    const otherTraits =
      trait.kind === "race"
        ? hero.class.map((n) => ({ kind: "class" as const, name: n }))
        : hero.race.map((n) => ({ kind: "race" as const, name: n }))
    for (const other of otherTraits) {
      addScore(other.kind, other.name, 1)
    }
  }

  for (const comp of comps) {
    const overlap = comp.heroes.filter((id) => traitHeroIds.has(id)).length
    if (overlap === 0) continue
    const compWeight = compTierWeight(comp.tier) * overlap
    for (const heroId of comp.heroes) {
      const hero = heroes.find((h) => h.id === heroId)
      if (!hero) continue
      const list =
        trait.kind === "race"
          ? hero.class.map((n) => ({ kind: "class" as const, name: n }))
          : hero.race.map((n) => ({ kind: "race" as const, name: n }))
      for (const other of list) {
        addScore(other.kind, other.name, compWeight)
      }
    }
  }

  const partners: TraitPartner[] = []
  for (const [key, score] of scores) {
    const [kind, name] = key.split(":") as [TraitKind, string]
    const match = allTraits.find((t) => t.kind === kind && t.name === name)
    if (!match) continue
    partners.push({ id: match.id, name: match.name, kind: match.kind, score })
  }

  return partners.sort((a, b) => b.score - a.score).slice(0, limit)
}

function detectArchetypes(trait: TraitItem): Set<TraitArchetype> {
  const text = [
    trait.description,
    ...trait.milestones.map((m) => m.effect),
  ]
    .join(" ")
    .toLowerCase()

  const found = new Set<TraitArchetype>()
  for (const [archetype, keywords] of Object.entries(ARCHETYPE_KEYWORDS) as [
    TraitArchetype,
    string[],
  ][]) {
    if (keywords.some((kw) => text.includes(kw))) {
      found.add(archetype)
    }
  }
  if (found.size === 0) {
    if (trait.kind === "class") found.add("physicalDPS")
    else found.add("armorTank")
  }
  return found
}

export function getTraitMatchups(
  trait: TraitItem,
  allTraits: TraitItem[],
  limit = 3
): TraitMatchups {
  const myArchetypes = detectArchetypes(trait)
  const counterArchetypes = new Set<TraitArchetype>()
  const counteredByArchetypes = new Set<TraitArchetype>()

  for (const arch of myArchetypes) {
    for (const target of COUNTER_MATRIX[arch] ?? []) {
      counterArchetypes.add(target)
    }
  }

  for (const other of Object.keys(COUNTER_MATRIX) as TraitArchetype[]) {
    if ((COUNTER_MATRIX[other] ?? []).some((t) => myArchetypes.has(t))) {
      counteredByArchetypes.add(other)
    }
  }

  const toEntries = (
    archetypes: Set<TraitArchetype>,
    excludeId: string
  ): TraitMatchupEntry[] => {
    const entries: { entry: TraitMatchupEntry; weight: number }[] = []
    for (const t of allTraits) {
      if (t.id === excludeId && t.kind === trait.kind) continue
      const theirs = detectArchetypes(t)
      const overlap = [...archetypes].filter((a) => theirs.has(a)).length
      if (overlap === 0) continue
      entries.push({
        entry: { id: t.id, name: t.name, kind: t.kind },
        weight: overlap,
      })
    }
    return entries
      .sort((a, b) => b.weight - a.weight)
      .slice(0, limit)
      .map((e) => e.entry)
  }

  return {
    counters: toEntries(counterArchetypes, trait.id),
    counteredBy: toEntries(counteredByArchetypes, trait.id),
  }
}

export function getRecommendedMilestone(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[]
): number | null {
  const milestones = trait.milestones.map((m) => m.count).sort((a, b) => a - b)
  if (milestones.length === 0) return null

  const traitHeroIds = new Set(getTraitHeroes(trait, heroes).map((h) => h.id))
  const counts: number[] = []

  for (const comp of comps) {
    const n = comp.heroes.filter((id) => traitHeroIds.has(id)).length
    if (n > 0) counts.push(n)
  }

  if (counts.length === 0) {
    return milestones.find((m) => m >= 4) ?? milestones[milestones.length - 1]
  }

  const freq = new Map<number, number>()
  for (const c of counts) {
    const matched =
      milestones.filter((m) => m <= c).sort((a, b) => b - a)[0] ?? milestones[0]
    freq.set(matched, (freq.get(matched) ?? 0) + 1)
  }

  let best = milestones[0]
  let bestCount = 0
  for (const [m, n] of freq) {
    if (n > bestCount) {
      best = m
      bestCount = n
    }
  }
  return best
}

export function getTraitMetaBundle(
  trait: TraitItem,
  heroes: Hero[],
  comps: Comp[],
  allTraits: TraitItem[]
) {
  const popularity = getTraitPopularity(trait, heroes, comps, allTraits)
  const tier = getTraitTier(trait, heroes, comps, allTraits)
  const phase = getTraitPhase(trait, heroes)
  const partners = getTraitPartners(trait, heroes, comps, allTraits)
  const matchups = getTraitMatchups(trait, allTraits)
  const recommendedMilestone = getRecommendedMilestone(trait, heroes, comps)

  return {
    popularity,
    tier,
    phase,
    partners,
    matchups,
    recommendedMilestone,
  }
}
