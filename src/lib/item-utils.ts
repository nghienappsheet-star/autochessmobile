import type { Comp, Hero, Item, ItemCategory } from "@/types/domain"

export type ParsedStatBonus = {
  label: string
  value: string
  tone?: "gold" | "red" | "green" | "default"
}

const ATTACK_CLASSES = ["Assassin", "Hunter"]
const DEFENSE_CLASSES = ["Warrior", "Knight"]
const MAGIC_CLASSES = ["Mage", "Warlock", "Shaman", "Witcher", "Priest"]

const STAT_LABEL_MAP: Record<string, string> = {
  "sát thương vật lý": "Sát thương",
  "sát thương": "Sát thương",
  "tốc độ đánh": "Tỷ lệ tốc độ đánh",
  "tốc đánh": "Tỷ lệ tốc độ đánh",
  "chí mạng": "Tỷ lệ chí mạng",
  "hút máu": "Hút máu",
  "giáp": "Giáp",
  "máu": "Máu",
  "hồi máu": "Hồi máu",
  "năng lượng": "Năng lượng",
  "kháng phép": "Kháng phép",
}

function toneForLabel(label: string): ParsedStatBonus["tone"] {
  const l = label.toLowerCase()
  if (l.includes("sát thương") || l.includes("chí mạng")) return "red"
  if (l.includes("tốc") || l.includes("hút máu")) return "gold"
  if (l.includes("giáp") || l.includes("máu") || l.includes("hồi") || l.includes("kháng")) return "green"
  return "default"
}

export function inferItemCategory(stats: string): ItemCategory {
  const s = stats.toLowerCase()
  if (/giáp|máu|hồi máu|kháng|armor|hp|heal|resist/.test(s)) return "defense"
  if (/năng lượng|sấm|phép|energy|magic|spell/.test(s)) return "magic"
  if (/hồi sinh|utility|orb/.test(s)) return "utility"
  return "attack"
}

export function parseStatBonuses(stats: string): ParsedStatBonus[] {
  const results: ParsedStatBonus[] = []
  const segments = stats.split(/[,;.]/).map((s) => s.trim()).filter(Boolean)

  for (const segment of segments) {
    const match = segment.match(/^([+−-]?\d+(?:\.\d+)?%?)\s*(.+)$/i)
    if (!match) continue

    const rawLabel = match[2].trim().toLowerCase()
    let label = match[2].trim()
    for (const [key, mapped] of Object.entries(STAT_LABEL_MAP)) {
      if (rawLabel.includes(key)) {
        label = mapped
        break
      }
    }

    results.push({
      label,
      value: match[1],
      tone: toneForLabel(label),
    })
  }

  return results
}

export function getRelatedItems(item: Item, items: Item[], limit = 4): Item[] {
  const category = item.category ?? inferItemCategory(item.stats)
  return items
    .filter(
      (i) =>
        i.id !== item.id &&
        (i.category ?? inferItemCategory(i.stats)) === category &&
        Math.abs(i.tier - item.tier) <= 1
    )
    .sort((a, b) => Math.abs(a.tier - item.tier) - Math.abs(b.tier - item.tier))
    .slice(0, limit)
}

export function getRecommendedHeroes(item: Item, heroes: Hero[], limit = 5): Hero[] {
  if (item.recommendedHeroIds?.length) {
    const mapped = item.recommendedHeroIds
      .map((id) => heroes.find((h) => h.id === id))
      .filter((h): h is Hero => Boolean(h))
    if (mapped.length > 0) return mapped.slice(0, limit)
  }

  const category = item.category ?? inferItemCategory(item.stats)
  return heroes
    .filter((h) => {
      const primaryClass = h.class[0]
      if (category === "attack") return ATTACK_CLASSES.includes(primaryClass)
      if (category === "defense") return DEFENSE_CLASSES.includes(primaryClass)
      if (category === "magic" || category === "utility") return MAGIC_CLASSES.includes(primaryClass)
      return h.cost >= 4
    })
    .slice(0, limit)
}

export function getCompsForItem(
  item: Item,
  comps: Comp[],
  heroes: Hero[],
  limit = 3
): Comp[] {
  const heroIds = item.recommendedHeroIds ?? getRecommendedHeroes(item, heroes).map((h) => h.id)
  if (heroIds.length === 0) return []

  return comps
    .filter((comp) => {
      const overlap = comp.heroes.filter((id) => heroIds.includes(id)).length
      return overlap >= 2
    })
    .slice(0, limit)
}

export function itemTierBorderClass(tier: number): string {
  if (tier >= 4) return "border-brand-red bg-brand-red/10"
  if (tier === 3) return "border-tier-a bg-tier-a/10"
  if (tier === 2) return "border-tier-b bg-tier-b/10"
  return "border-brand-border bg-brand-card-2"
}

export function itemTierGradientClass(tier: number): string {
  if (tier >= 4) return "from-brand-red to-brand-gold-deep shadow-[0_0_10px_rgba(242,92,84,0.4)]"
  if (tier === 3) return "from-tier-a to-orange-600 shadow-[0_0_10px_rgba(245,166,35,0.4)]"
  if (tier === 2) return "from-tier-b to-blue-600 shadow-[0_0_10px_rgba(77,150,240,0.4)]"
  return "from-brand-card-2 to-brand-bg"
}
