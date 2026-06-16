import type { Comp, Hero, CompRadarStats } from "@/types/domain"

const OFFENSE_CLASSES = ["Assassin", "Hunter", "Mage", "Warlock", "Wizard"]
const DEFENSE_CLASSES = ["Warrior", "Knight", "Mech"]
const CONTROL_CLASSES = ["Shaman", "Warlock", "Witcher", "Priest"]

export function parseWinRate(winRate: string): number {
  return parseFloat(winRate.replace("%", "")) || 0
}

function compHeroes(comp: Comp, heroes: Hero[]): Hero[] {
  return comp.heroes
    .map((id) => heroes.find((h) => h.id === id))
    .filter((h): h is Hero => Boolean(h))
}


function computeHeuristicRadarStats(comp: Comp, heroes: Hero[]): CompRadarStats {
  const roster = compHeroes(comp, heroes)
  const n = roster.length || 1

  const offense = roster.filter((h) =>
    h.class.some((c) => OFFENSE_CLASSES.includes(c))
  ).length
  const defense = roster.filter((h) =>
    h.class.some((c) => DEFENSE_CLASSES.includes(c))
  ).length
  const control = roster.filter((h) =>
    h.class.some((c) => CONTROL_CLASSES.includes(c))
  ).length

  const avgCost = roster.reduce((s, h) => s + h.cost, 0) / n
  const winRate = parseWinRate(comp.winRate)
  const difficulty =
    comp.difficulty ?? (comp.tier === "S" ? 85 : comp.tier === "A" ? 65 : 50)

  return {
    attack: Math.min(100, Math.round(offense * 11 + winRate * 0.35)),
    defense: Math.min(100, Math.round(defense * 11 + (comp.tier === "S" ? 12 : 0))),
    control: Math.min(100, Math.round(control * 14)),
    difficulty: Math.min(100, difficulty),
    economy: Math.min(100, Math.round(100 - avgCost * 9)),
    lateGame: Math.min(100, Math.round(winRate * (comp.tier === "S" ? 3.2 : 2.4))),
  }
}

export type { CompRadarStats } from "@/types/domain"

export function computeCompRadarStats(comp: Comp, heroes: Hero[]): CompRadarStats {
  if (comp.radarStats) return comp.radarStats
  return computeHeuristicRadarStats(comp, heroes)
}

export function getCompDifficulty(comp: Comp): number {
  return comp.difficulty ?? (comp.tier === "S" ? 8 : comp.tier === "A" ? 6 : 5)
}

export function getCompTop4(comp: Comp): number {
  const winRate = parseWinRate(comp.winRate)
  return comp.tier === "S" ? Math.min(95, Math.round(winRate * 3.2)) : Math.round(winRate * 2.8)
}

export function getCompLateGame(comp: Comp): number {
  const winRate = parseWinRate(comp.winRate)
  return comp.tier === "S" ? Math.min(98, Math.round(winRate * 3.5)) : Math.round(winRate * 2.6)
}

/** Star multiplier: 1★=1, 2★=3, 3★=9 copies worth of gold. */
export function heroStarCost(baseCost: number, stars: number): number {
  const mult = stars === 3 ? 9 : stars === 2 ? 3 : 1
  return baseCost * mult
}

import { resolveHeroStats } from "@/lib/hero-utils"

export function getHeroComparisonStats(hero: Hero) {
  const stats = resolveHeroStats(hero, 2)
  return {
    hp: stats.hp,
    armor: stats.armor,
    mr: stats.mr,
    dps: Math.round(stats.atk * stats.atkSpeed),
    atkSpeed: stats.atkSpeed,
    range: stats.range,
  }
}
