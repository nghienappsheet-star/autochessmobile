import { cn } from "./utils"

/** Tailwind classes for hero gold-cost bar colors (1–5) */
export const HERO_COST_BAR: Record<number, string> = {
  1: "bg-cost-1",
  2: "bg-cost-2",
  3: "bg-cost-3",
  4: "bg-cost-4",
  5: "bg-cost-5",
}

export function heroCostBarClass(cost: number | undefined): string {
  if (!cost || cost < 1 || cost > 5) return "bg-brand-text-sub"
  return HERO_COST_BAR[cost]
}

export function heroCostBadgeClass(cost: number | undefined): string {
  return cn(
    "border",
    cost === 5 && "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
    cost === 4 && "bg-cost-4/15 text-cost-4 border-cost-4/30",
    cost === 3 && "bg-cost-3/15 text-cost-3 border-cost-3/30",
    cost === 2 && "bg-cost-2/15 text-cost-2 border-cost-2/30",
    (cost === 1 || !cost) && "bg-cost-1/15 text-cost-1 border-cost-1/30"
  )
}

/** Solid backdrop for cost badge overlaid on hero icon thumbnails */
export function heroCostBadgeOverlayClass(cost: number | undefined): string {
  return cn(
    "border bg-brand-bg/95 backdrop-blur-sm shadow-sm rounded-md",
    cost === 5 && "text-brand-gold border-brand-gold/40",
    cost === 4 && "text-cost-4 border-cost-4/40",
    cost === 3 && "text-cost-3 border-cost-3/40",
    cost === 2 && "text-cost-2 border-cost-2/40",
    (cost === 1 || !cost) && "text-cost-1 border-cost-1/40"
  )
}
