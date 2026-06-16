import type { Comp, CompSynergy, Hero } from "@/types/domain"
import { CLASSES, RACES } from "@/data"

export const BOARD_ROWS = 4
export const BOARD_COLS = 8
export const BOARD_SIZE = BOARD_ROWS * BOARD_COLS

const FRONT_CLASSES = new Set(["Warrior", "Knight", "Mech"])
const BACK_CLASSES = new Set(["Hunter", "Mage", "Assassin", "Warlock"])
const ROW_CAPACITIES = [3, 3, 2, BOARD_COLS] as const

export const BOARD_ROW_LABELS = [
  "Tuyến trước",
  "Giữa",
  "Giữa sau",
  "Tuyến sau",
] as const

function getRowPriority(hero: Hero): number {
  const primaryClass = hero.class[0]
  if (FRONT_CLASSES.has(primaryClass)) return 0
  if (BACK_CLASSES.has(primaryClass)) return 2
  return 1
}

function placeInRow(board: (string | null)[], row: number, heroIds: string[]) {
  const startCol = Math.floor((BOARD_COLS - heroIds.length) / 2)
  heroIds.forEach((heroId, i) => {
    const index = row * BOARD_COLS + startCol + i
    if (index >= 0 && index < BOARD_SIZE) {
      board[index] = heroId
    }
  })
}

export function buildCompBoard(heroIds: string[], heroes: Hero[]): (string | null)[] {
  const board: (string | null)[] = Array(BOARD_SIZE).fill(null)
  const heroMap = new Map(heroes.map((h) => [h.id, h]))

  const sorted = [...heroIds].sort((a, b) => {
    const heroA = heroMap.get(a)
    const heroB = heroMap.get(b)
    const priorityA = heroA ? getRowPriority(heroA) : 1
    const priorityB = heroB ? getRowPriority(heroB) : 1
    if (priorityA !== priorityB) return priorityA - priorityB
    return (heroB?.cost ?? 0) - (heroA?.cost ?? 0)
  })

  const buckets: string[][] = [[], [], []]
  for (const id of sorted) {
    const hero = heroMap.get(id)
    const bucket = hero ? getRowPriority(hero) : 1
    buckets[bucket].push(id)
  }

  let row = 0
  for (const bucket of buckets) {
    while (bucket.length > 0 && row < BOARD_ROWS) {
      const capacity = ROW_CAPACITIES[row] ?? BOARD_COLS
      const slice = bucket.splice(0, capacity)
      placeInRow(board, row, slice)
      row += 1
    }
  }

  return board
}

export function boardFromRecord(
  record: Record<number, string>,
  heroIds: string[]
): (string | null)[] {
  const board: (string | null)[] = Array(BOARD_SIZE).fill(null)
  const validIds = new Set(heroIds)

  for (const [indexStr, heroId] of Object.entries(record)) {
    const index = Number(indexStr)
    if (index >= 0 && index < BOARD_SIZE && validIds.has(heroId)) {
      board[index] = heroId
    }
  }

  return board
}

export function resolveCompBoard(comp: Comp, heroes: Hero[]): (string | null)[] {
  const boardRecord = "board" in comp ? comp.board : undefined
  if (boardRecord && Object.keys(boardRecord).length > 0) {
    return boardFromRecord(boardRecord, comp.heroes)
  }
  return buildCompBoard(comp.heroes, heroes)
}

export function getOrderedCompHeroes(comp: Comp, heroes: Hero[]): string[] {
  const board = resolveCompBoard(comp, heroes)
  const ordered: string[] = []
  const seen = new Set<string>()

  for (let i = 0; i < BOARD_SIZE; i++) {
    const heroId = board[i]
    if (heroId && !seen.has(heroId)) {
      seen.add(heroId)
      ordered.push(heroId)
    }
  }

  if (ordered.length > 0) {
    return ordered
  }

  return [...comp.heroes]
}

export const BOARD_PICKER_COLS = 2

export type BoardSlots = (string | null)[][]

export function emptyBoardSlots(): BoardSlots {
  return Array.from({ length: BOARD_ROWS }, () => Array(BOARD_PICKER_COLS).fill(null))
}

export function boardSlotsFromRecord(
  record: Record<number, string> | undefined,
  heroIds: string[]
): BoardSlots {
  const slots = emptyBoardSlots()
  const validIds = new Set(heroIds)
  if (!record) return slots

  for (const [indexStr, heroId] of Object.entries(record)) {
    const index = Number(indexStr)
    if (!validIds.has(heroId) || index < 0 || index >= BOARD_SIZE) continue
    const row = Math.floor(index / BOARD_COLS)
    const col = index % BOARD_COLS
    if (col >= BOARD_PICKER_COLS || row >= BOARD_ROWS) continue
    slots[row][col] = heroId
  }
  return slots
}

export function recordFromBoardSlots(slots: BoardSlots): Record<number, string> {
  const record: Record<number, string> = {}
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_PICKER_COLS; col++) {
      const heroId = slots[row]?.[col]
      if (heroId) {
        record[row * BOARD_COLS + col] = heroId
      }
    }
  }
  return record
}

type Milestone = { count: number; effect: string }

function resolveSynergyEntry(name: string, count: number, milestones: Milestone[]): CompSynergy | null {
  if (count <= 0) return null
  const sorted = [...milestones].sort((a, b) => a.count - b.count)
  const reached = sorted.filter((m) => count >= m.count).pop()
  const threshold = sorted[0]?.count ?? 2
  return {
    name: `${count} ${name}`,
    desc: reached?.effect ?? `Kích hoạt ${name} x${count}`,
    active: count >= threshold,
  }
}

export function calcSynergiesFromHeroes(heroIds: string[], heroes: Hero[]): CompSynergy[] {
  const counts: Record<string, number> = {}

  for (const heroId of heroIds) {
    const hero = heroes.find((h) => h.id === heroId)
    if (!hero) continue
    hero.race.forEach((race) => {
      counts[race] = (counts[race] || 0) + 1
    })
    hero.class.forEach((cls) => {
      counts[cls] = (counts[cls] || 0) + 1
    })
  }

  const entries: CompSynergy[] = []

  for (const race of RACES) {
    const count = counts[race.name] ?? 0
    const entry = resolveSynergyEntry(race.name, count, race.milestones)
    if (entry) entries.push(entry)
  }

  for (const cls of CLASSES) {
    const count = counts[cls.name] ?? 0
    const entry = resolveSynergyEntry(cls.name, count, cls.milestones)
    if (entry) entries.push(entry)
  }

  return entries.sort((a, b) => Number(b.active) - Number(a.active))
}
