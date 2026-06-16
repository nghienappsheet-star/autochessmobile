import type { Comp, CompCounter, CompRoadmap } from "@/types/domain"

export function linesToArray(text: string): string[] {
  return text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
}

export function arrayToLines(arr?: string[]): string {
  return arr?.join("\n") ?? ""
}

export function parseCounterLines(text: string, withTip = false): CompCounter[] {
  return linesToArray(text)
    .map((line) => {
      const parts = line.split("|").map((s) => s.trim())
      if (withTip) {
        return {
          name: parts[0] ?? "",
          reason: parts[1] ?? "",
          tip: parts[2] || undefined,
        }
      }
      return { name: parts[0] ?? "", reason: parts[1] ?? "" }
    })
    .filter((c) => c.name)
}

export function countersToLines(counters?: CompCounter[], withTip = false): string {
  if (!counters?.length) return ""
  return counters
    .map((c) =>
      withTip && c.tip ? `${c.name} | ${c.reason} | ${c.tip}` : `${c.name} | ${c.reason}`
    )
    .join("\n")
}

export type DifficultyLabelKey = "difficultyEasy" | "difficultyMedium" | "difficultyHard"

export function difficultyLabelKey(difficulty?: number): DifficultyLabelKey {
  if (!difficulty || difficulty <= 2) return "difficultyEasy"
  if (difficulty === 3) return "difficultyMedium"
  return "difficultyHard"
}

export function splitCoreFlexHeroIds(comp: Comp): {
  hasCoreSplit: boolean
  coreIds: string[]
  flexIds: string[]
} {
  if (!comp.coreHeroIds?.length) {
    return { hasCoreSplit: false, coreIds: [], flexIds: [...comp.heroes] }
  }
  const coreSet = new Set(comp.coreHeroIds)
  const coreIds = comp.heroes.filter((id) => coreSet.has(id))
  const flexIds = comp.heroes.filter((id) => !coreSet.has(id))
  return { hasCoreSplit: true, coreIds, flexIds }
}

export function emptyRoadmap(): CompRoadmap {
  return { early: "", mid: "", late: "" }
}

export function roadmapHasContent(roadmap?: CompRoadmap): boolean {
  if (!roadmap) return false
  return Boolean(roadmap.early?.trim() || roadmap.mid?.trim() || roadmap.late?.trim())
}
