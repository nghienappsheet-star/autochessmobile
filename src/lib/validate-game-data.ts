import { CLASSES, COMPS, DATA_VERSION, HEROES, ITEMS, RACES } from "@/data"
import type { Hero } from "@/types/domain"

export type ValidationIssue = {
  level: "error" | "warn"
  message: string
}

export function validateGameData(): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const raceNames = new Set(RACES.map((r) => r.name))
  const classNames = new Set(CLASSES.map((c) => c.name))
  const heroIds = new Set(HEROES.map((h) => h.id))
  const itemIds = new Set(ITEMS.map((i) => i.id))

  const heroIdList = HEROES.map((h) => h.id)
  const dupIds = heroIdList.filter((id, i) => heroIdList.indexOf(id) !== i)
  if (dupIds.length) {
    issues.push({ level: "error", message: `Duplicate hero ids: ${[...new Set(dupIds)].join(", ")}` })
  }

  for (const hero of HEROES) {
    if (hero.cost < 1 || hero.cost > 5) {
      issues.push({ level: "error", message: `Hero ${hero.id} has invalid cost ${hero.cost}` })
    }
    for (const race of hero.race) {
      if (!raceNames.has(race)) {
        issues.push({ level: "error", message: `Hero ${hero.id} references unknown race "${race}"` })
      }
    }
    for (const cls of hero.class) {
      if (!classNames.has(cls)) {
        issues.push({ level: "error", message: `Hero ${hero.id} references unknown class "${cls}"` })
      }
    }
    for (const itemId of hero.recommendedItemIds ?? []) {
      if (!itemIds.has(itemId)) {
        issues.push({ level: "error", message: `Hero ${hero.id} references unknown item "${itemId}"` })
      }
    }
  }

  for (const item of ITEMS) {
    for (const heroId of item.recommendedHeroIds ?? []) {
      if (!heroIds.has(heroId)) {
        issues.push({ level: "error", message: `Item ${item.id} references unknown hero "${heroId}"` })
      }
    }
  }

  for (const comp of COMPS) {
    for (const heroId of comp.heroes) {
      if (!heroIds.has(heroId)) {
        issues.push({ level: "error", message: `Comp ${comp.id} references unknown hero "${heroId}"` })
      }
    }
    for (const heroId of Object.values(comp.board)) {
      if (!heroIds.has(heroId)) {
        issues.push({ level: "error", message: `Comp ${comp.id} board references unknown hero "${heroId}"` })
      }
    }
  }

  if (HEROES.length < 80) {
    issues.push({
      level: "warn",
      message: `Hero catalog has ${HEROES.length} entries (expected ~83 from official site)`,
    })
  }

  if (RACES.length < 22) {
    issues.push({ level: "warn", message: `Race catalog has ${RACES.length} entries (expected 22)` })
  }

  if (CLASSES.length < 12) {
    issues.push({ level: "warn", message: `Class catalog has ${CLASSES.length} entries (expected 12)` })
  }

  return issues
}

export function assertGameDataValid(): void {
  const issues = validateGameData().filter((i) => i.level === "error")
  if (issues.length > 0) {
    const msg = issues.map((i) => i.message).join("\n")
    throw new Error(`Game data validation failed:\n${msg}`)
  }
}

/** Run validation from CLI: npm run validate:data */
const isValidationCli = typeof process !== "undefined" && process.argv[1]?.includes("validate-game-data")

if (isValidationCli) {
  const issues = validateGameData()
  for (const issue of issues) {
    console.log(`[${issue.level}] ${issue.message}`)
  }
  const errors = issues.filter((i) => i.level === "error")
  process.exit(errors.length > 0 ? 1 : 0)
}

export { DATA_VERSION }
export type { Hero }
