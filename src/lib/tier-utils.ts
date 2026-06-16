export type TierBadgeVariant = "tier-s" | "tier-a" | "tier-b" | "tier-c"

export const TIER_BADGE_VARIANT: Record<string, TierBadgeVariant> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
}

/** Higher rank = better tier (S best). Used for numeric comp tier comparison. */
export const TIER_RANK: Record<string, number> = {
  S: 4,
  A: 3,
  B: 2,
  C: 1,
}

export function getTierBadgeVariant(tier: string): TierBadgeVariant {
  return TIER_BADGE_VARIANT[tier] ?? "tier-c"
}

export function getTierRank(tier: string): number {
  return TIER_RANK[tier] ?? 0
}

export function isCompTier(value: string): value is "S" | "A" | "B" | "C" {
  return value === "S" || value === "A" || value === "B" || value === "C"
}
