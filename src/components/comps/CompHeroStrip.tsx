import { CompHeroChip } from "@/components/comps/CompHeroChip"
import { cn } from "@/lib/utils"
import type { Hero } from "@/types/domain"

type CompHeroStripProps = {
  heroIds: string[]
  heroes: Hero[]
  coreIds?: string[]
  className?: string
}

export function CompHeroStrip({ heroIds, heroes, coreIds = [], className }: CompHeroStripProps) {
  const heroMap = new Map(heroes.map((h) => [h.id, h]))
  const coreSet = new Set(coreIds)

  return (
    <div className={cn("flex items-center gap-1 overflow-x-auto hide-scrollbar min-w-0", className)}>
      {heroIds.map((heroId) => {
        const hero = heroMap.get(heroId)
        return (
          <CompHeroChip
            key={heroId}
            hero={hero}
            size="xs"
            isCore={coreSet.has(heroId)}
          />
        )
      })}
    </div>
  )
}
