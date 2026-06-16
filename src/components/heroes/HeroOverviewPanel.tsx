import type { ClassSynergy, Hero, Item, Race } from "@/types/domain"
import type { HeroStar, ResolvedHeroStats } from "@/lib/hero-utils"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { HeroDetailHeader } from "@/components/heroes/HeroDetailHeader"
import { HeroStarSelector } from "@/components/heroes/HeroStarSelector"
import { HeroSynergyCards } from "@/components/heroes/HeroSynergyCards"
import { HeroStatGrid } from "@/components/heroes/HeroStatGrid"
import { HeroRecommendedItems } from "@/components/heroes/HeroRecommendedItems"

type HeroOverviewPanelProps = {
  hero: Hero
  description: string
  star: HeroStar
  onStarChange: (star: HeroStar) => void
  stats: ResolvedHeroStats
  races: Race[]
  classes: ClassSynergy[]
  recommendedItems: Item[]
}

export function HeroOverviewPanel({
  hero,
  description,
  star,
  onStarChange,
  stats,
  races,
  classes,
  recommendedItems,
}: HeroOverviewPanelProps) {
  return (
    <div className="space-y-5 min-w-0">
      <div className="flex gap-4 items-start">
        <HeroIcon hero={hero} size="lg" className="hidden sm:flex" />
        <HeroIcon hero={hero} size="md" className="sm:hidden" />
        <div className="flex-1 min-w-0">
          <HeroDetailHeader hero={hero} description={description} />
        </div>
      </div>

      <HeroStarSelector star={star} onChange={onStarChange} />
      <HeroSynergyCards hero={hero} races={races} classes={classes} variant="compact" />
      <HeroStatGrid stats={stats} star={star} variant="compact" />
      <HeroRecommendedItems items={recommendedItems} variant="compact" />
    </div>
  )
}
