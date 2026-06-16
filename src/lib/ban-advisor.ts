import type { Comp, Hero } from "@/types/domain"
import {
  heroHasTrait,
  POOL_COPIES_BY_COST,
  traitBanCost,
  traitPoolCopyCount,
  traitPoolHeroes,
} from "@/lib/ban-cost"

export type BanPriority = "survival" | "contest" | "top1"

export type BanRecommendation = {
  id: number
  trait: string
  cost: number
  reason: string
  removed: string[]
  efficiency: number
  affectedComps: number
}

export type WinRateProjection = {
  trait: string
  label: string
  current: number
  projected: number
}

export type ContestAnalysis = {
  coreHeroName: string
  contestPlayers: number
  poolHeroCount: number
  contestReduction: number
  banDifficulty: number
  suggestedBanTrait: string
}

export type MetaScenario = {
  banTrait: string
  topTraits: { trait: string; metaPercent: number }[]
}

import { parseWinRate } from "@/lib/comp-stats"

const COUNTER_CLASSES = ["Assassin", "Warlock", "Demon", "Wizard"]
const OFFENSE_CLASSES = ["Assassin", "Hunter", "Mage", "Warlock", "Wizard"]

function compsUsingTrait(trait: string, comps: Comp[], heroes: Hero[]): Comp[] {
  return comps.filter((c) =>
    c.heroes.some((hId) => {
      const h = heroes.find((hero) => hero.id === hId)
      return h && heroHasTrait(h, trait)
    })
  )
}

function buildReason(
  trait: string,
  affectedComps: Comp[],
  priority: BanPriority,
  mainHero: Hero | undefined,
  heroes: Hero[]
): string {
  const sTier = affectedComps.filter((c) => c.tier === "S").length
  if (priority === "survival" && COUNTER_CLASSES.includes(trait)) {
    return `${trait} khắc chế trực tiếp core ${mainHero?.name ?? ""} — loại bỏ ${affectedComps.length} đội hình meta liên quan.`
  }
  if (priority === "contest") {
    return `Giảm tranh chấp pool ${trait}: ${traitPoolCopyCount(trait, heroes)} quân bị loại khỏi bàn cờ chung.`
  }
  if (priority === "top1" && sTier > 0) {
    return `Loại bỏ ${sTier} đội S-tier dùng ${trait}, tối ưu vị trí top 1.`
  }
  return `Ban ${trait} ảnh hưởng ${affectedComps.length} đội hình meta, giảm cạnh tranh đáng kể.`
}

function scoreBanTrait(
  trait: string,
  heroes: Hero[],
  comps: Comp[],
  selectedTraits: string[],
  selectedHeroes: string[],
  mainCoreId: string,
  priority: BanPriority
): number {
  const affected = compsUsingTrait(trait, comps, heroes)
  const mainHero = heroes.find((h) => h.id === mainCoreId)
  let score = affected.length * 10

  affected.forEach((c) => {
    if (c.tier === "S") score += 15
    else if (c.tier === "A") score += 8
    score += parseWinRate(c.winRate) * 0.3
  })

  if (priority === "survival") {
    if (COUNTER_CLASSES.includes(trait)) score += 25
    if (mainHero && !heroHasTrait(mainHero, trait)) {
      const counterComps = affected.filter(
        (c) => !c.heroes.some((id) => selectedHeroes.includes(id))
      )
      score += counterComps.length * 6
    }
    OFFENSE_CLASSES.forEach((cls) => {
      if (mainHero?.class.includes(cls) && trait !== cls) score += 5
    })
  } else if (priority === "contest") {
    const pool = traitPoolHeroes(trait, heroes)
    const overlap = pool.filter((h) =>
      selectedHeroes.some((id) => {
        const picked = heroes.find((hero) => hero.id === id)
        return (
          picked &&
          id !== mainCoreId &&
          (picked.race.some((r) => h.race.includes(r)) ||
            picked.class.some((c) => h.class.includes(c)))
        )
      })
    ).length
    score += overlap * 15
    score += traitPoolCopyCount(trait, heroes) * 0.5
  } else if (priority === "top1") {
    score += affected.filter((c) => c.tier === "S").length * 22
  }

  // Prefer banning traits not in user's own comp
  if (!selectedTraits.includes(trait)) score += 10

  return Math.min(100, Math.round(score))
}

export function getBanCandidates(
  heroes: Hero[],
  selectedTraits: string[]
): string[] {
  const all = new Set<string>()
  heroes.forEach((h) => {
    h.race.forEach((r) => all.add(r))
    h.class.forEach((c) => all.add(c))
  })
  return [...all]
    .filter((t) => !selectedTraits.includes(t))
    .sort()
}

export function computeBanRecommendations(
  heroes: Hero[],
  comps: Comp[],
  selectedTraits: string[],
  selectedHeroes: string[],
  mainCoreId: string,
  priority: BanPriority
): BanRecommendation[] {
  const candidates = getBanCandidates(heroes, selectedTraits)
  const mainHero = heroes.find((h) => h.id === mainCoreId)

  const scored = candidates.map((trait, index) => {
    const pool = traitPoolHeroes(trait, heroes)
    const affected = compsUsingTrait(trait, comps, heroes)
    const efficiency = scoreBanTrait(
      trait,
      heroes,
      comps,
      selectedTraits,
      selectedHeroes,
      mainCoreId,
      priority
    )

    return {
      id: index + 1,
      trait,
      cost: traitBanCost(trait, heroes),
      removed: pool.map((h) => h.name),
      efficiency,
      affectedComps: affected.length,
      reason: buildReason(trait, affected, priority, mainHero, heroes),
    }
  })

  return scored.sort((a, b) => b.efficiency - a.efficiency).slice(0, 3)
}

export function computeBaseWinRate(
  comps: Comp[],
  selectedHeroes: string[]
): number {
  const matching = comps.filter((c) =>
    selectedHeroes.some((id) => c.heroes.includes(id))
  )
  if (matching.length === 0) return 55
  return (
    matching.reduce((s, c) => s + parseWinRate(c.winRate), 0) / matching.length
  )
}

export function computeWinRateProjections(
  recommendations: BanRecommendation[],
  comps: Comp[],
  selectedHeroes: string[],
  heroes: Hero[]
): WinRateProjection[] {
  const current = computeBaseWinRate(comps, selectedHeroes)

  return recommendations.map((rec) => {
    const weakened = compsUsingTrait(rec.trait, comps, heroes)
    const metaReduction = comps.length > 0 ? weakened.length / comps.length : 0
    const projected = Math.min(
      88,
      current + metaReduction * 18 + rec.efficiency * 0.06
    )
    return {
      trait: rec.trait,
      label: `Sau khi BAN ${rec.trait}`,
      current: Math.round(current),
      projected: Math.round(projected),
    }
  })
}

export function computeContestAnalysis(
  mainCoreId: string,
  heroes: Hero[],
  comps: Comp[],
  topRecommendation: BanRecommendation | undefined
): ContestAnalysis | null {
  const mainHero = heroes.find((h) => h.id === mainCoreId)
  if (!mainHero) return null

  const contestingComps = comps.filter((c) => c.heroes.includes(mainCoreId))
  const sharedTraits = [...mainHero.race, ...mainHero.class]
  const poolHeroCount = heroes
    .filter(
      (h) =>
        h.id !== mainCoreId &&
        (h.race.some((r) => sharedTraits.includes(r)) ||
          h.class.some((c) => sharedTraits.includes(c)))
    )
    .reduce((sum, h) => sum + (POOL_COPIES_BY_COST[h.cost] ?? 0), 0)

  const suggestedBanTrait =
    topRecommendation?.trait ??
    sharedTraits.find((t) => traitPoolCopyCount(t, heroes) > 5) ??
    sharedTraits[0] ??
    ""

  return {
    coreHeroName: mainHero.name,
    contestPlayers: Math.min(7, Math.max(1, contestingComps.length + 1)),
    poolHeroCount,
    contestReduction: Math.min(50, contestingComps.length * 10 + (topRecommendation?.efficiency ?? 0) * 0.2),
    banDifficulty: Math.min(7, Math.max(1, Math.ceil(poolHeroCount / 12))),
    suggestedBanTrait,
  }
}

export function computeMetaScenarios(
  recommendations: BanRecommendation[],
  comps: Comp[],
  heroes: Hero[]
): MetaScenario[] {
  return recommendations.slice(0, 2).map((rec) => {
    const remaining = comps.filter(
      (c) =>
        !c.heroes.some((hId) => {
          const h = heroes.find((hero) => hero.id === hId)
          return h && heroHasTrait(h, rec.trait)
        })
    )

    const traitCounts: Record<string, number> = {}
    remaining.forEach((c) => {
      c.heroes.forEach((hId) => {
        const h = heroes.find((hero) => hero.id === hId)
        if (!h) return
        ;[...h.race, ...h.class].forEach((t) => {
          if (t !== rec.trait) traitCounts[t] = (traitCounts[t] || 0) + 1
        })
      })
    })

    const total = Object.values(traitCounts).reduce((a, b) => a + b, 0) || 1
    const topTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait, count]) => ({
        trait,
        metaPercent: Math.round((count / total) * 100),
      }))

    return { banTrait: rec.trait, topTraits }
  })
}

export function computeMetaForecastDelta(
  recommendations: BanRecommendation[],
  comps: Comp[],
  selectedHeroes: string[],
  heroes: Hero[]
): number {
  if (recommendations.length === 0) return 0
  const current = computeBaseWinRate(comps, selectedHeroes)
  const top = recommendations[0]
  const weakened = compsUsingTrait(top.trait, comps, heroes)
  const metaReduction = comps.length > 0 ? weakened.length / comps.length : 0
  const projected = Math.min(88, current + metaReduction * 18 + top.efficiency * 0.06)
  return Math.round(projected - current)
}
