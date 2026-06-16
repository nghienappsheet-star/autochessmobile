import { Link } from "react-router-dom"
import { Star, ThumbsUp } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, Badge } from "@/components/ui/core"
import { CompHeroChip } from "@/components/comps/CompHeroChip"
import { CompSynergyPills } from "@/components/comps/CompSynergyPills"
import { getOrderedCompHeroes } from "@/lib/comp-formation"
import { getTierBadgeVariant } from "@/lib/tier-utils"
import { cn } from "@/lib/utils"
import type { Comp, Hero } from "@/types/domain"

const MAX_VISIBLE_HEROES = 8

type CompTrendingCardProps = {
  comp: Comp
  heroes: Hero[]
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function CompTrendingCard({
  comp,
  heroes,
  isFavorite,
  onToggleFavorite,
}: CompTrendingCardProps) {
  const { t } = useTranslation(["pages", "common"])
  const tierVariant = getTierBadgeVariant(comp.tier)
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes)
  const visibleHeroIds = orderedHeroIds.slice(0, MAX_VISIBLE_HEROES)
  const overflowCount = orderedHeroIds.length - visibleHeroIds.length
  const heroMap = new Map(heroes.map((h) => [h.id, h]))

  return (
    <Link to={`/doi-hinh/${comp.id}`} className="block h-full">
      <Card
        className={cn(
          "h-full flex flex-col p-4 gap-3",
          "hover:border-brand-gold/30 transition-all group overflow-hidden",
          "shadow-lg hover:shadow-brand-gold/5"
        )}
      >
        <div className="flex items-start justify-between gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-base font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-tight tracking-tight truncate">
              {comp.name}
            </h3>
            <Badge variant={tierVariant} className="px-1.5 py-0 rounded-md text-[9px] font-bold shrink-0">
              {comp.tier} Tier
            </Badge>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleFavorite()
            }}
            className="w-7 h-7 flex items-center justify-center rounded-xl transition-all hover:scale-110 active:scale-95 group/fav shrink-0"
            aria-label={isFavorite ? "Bỏ theo dõi" : "Theo dõi"}
          >
            <Star
              className={cn(
                "w-3.5 h-3.5 transition-all",
                isFavorite
                  ? "text-brand-gold fill-brand-gold drop-shadow-[0_0_5px_rgba(245,180,60,0.5)]"
                  : "text-brand-border group-hover/fav:text-brand-text-main"
              )}
            />
          </button>
        </div>

        <CompSynergyPills synergies={comp.synergies} max={2} size="sm" />

        <div className="flex flex-wrap gap-1 min-h-[30px]">
          {visibleHeroIds.map((heroId) => {
            const hero = heroMap.get(heroId)
            return (
              <CompHeroChip
                key={heroId}
                hero={hero}
                size="xs"
                isMainCore={comp.mainCoreId === heroId}
                linkable={false}
              />
            )
          })}
          {overflowCount > 0 && (
            <div
              className="w-[30px] h-[30px] rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center shrink-0"
              title={`+${overflowCount}`}
            >
              <span className="text-[10px] font-bold text-brand-text-sub">+{overflowCount}</span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-3 border-t border-brand-border">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5 fill-brand-gold text-brand-gold shrink-0" />
            <span className="text-brand-gold font-bold text-[13px] leading-none">{comp.likes}</span>
            <span className="text-[11px] text-brand-text-sub font-normal">{t("pages:comps.votes")}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
