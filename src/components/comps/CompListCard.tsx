import { Link } from "react-router-dom"
import { Star, Check } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Card, Badge } from "@/components/ui/core"
import { CompHeroStrip } from "@/components/comps/CompHeroStrip"
import { CompSynergyPills } from "@/components/comps/CompSynergyPills"
import { CompStatsInline } from "@/components/comps/CompStatsInline"
import { getOrderedCompHeroes } from "@/lib/comp-formation"
import { formatDate } from "@/lib/format"
import { difficultyLabelKey } from "@/lib/comp-detail"
import { cn } from "@/lib/utils"
import type { Comp, Hero } from "@/types/domain"

import { getTierBadgeVariant } from "@/lib/tier-utils"

type CompListCardProps = {
  comp: Comp
  rank: number
  heroes: Hero[]
  isFavorite: boolean
  onToggleFavorite: () => void
  selectable?: boolean
  selected?: boolean
  onSelect?: () => void
}

export function CompListCard({
  comp,
  rank,
  heroes,
  isFavorite,
  onToggleFavorite,
  selectable = false,
  selected = false,
  onSelect,
}: CompListCardProps) {
  const { t } = useTranslation(["pages", "common"])
  const tierVariant = getTierBadgeVariant(comp.tier)
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes)
  const showTrending = parseInt(comp.likes) > 200
  const diffKey = comp.difficulty != null ? difficultyLabelKey(comp.difficulty) : null

  const cardBody = (
    <Card
      className={cn(
        "p-0 hover:border-brand-gold/30 transition-all group overflow-hidden shadow-lg hover:shadow-brand-gold/5",
        selectable && "cursor-pointer",
        selectable && selected && "border-brand-gold ring-1 ring-brand-gold/40"
      )}
    >
      <div className="flex flex-row items-stretch">
        <div
          className={cn(
            "w-10 shrink-0 flex items-center justify-center font-bold text-base border-r relative",
            rank <= 3
              ? "bg-tier-s/10 text-tier-s border-tier-s/20"
              : "bg-brand-card-2 text-brand-text-sub border-brand-border"
          )}
        >
          {selectable ? (
            <div
              className={cn(
                "w-5 h-5 flex items-center justify-center rounded-md border transition-all",
                selected
                  ? "bg-brand-gold border-brand-gold text-black"
                  : "bg-brand-card border-brand-border text-transparent"
              )}
            >
              <Check className="w-3 h-3" />
            </div>
          ) : (
            rank
          )}
        </div>

          <div className="flex-1 min-w-0 py-2.5 pl-4 pr-3 flex flex-col justify-center gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 flex-1 min-w-0">
                <h3 className="text-base font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-none tracking-tight truncate max-w-[120px] sm:max-w-none">
                  {comp.name}
                </h3>
                <Badge variant={tierVariant} className="px-1.5 py-0 rounded-md text-[9px] font-bold shrink-0">
                  {comp.tier} Tier
                </Badge>
                {diffKey && (
                  <Badge
                    variant="secondary"
                    className="text-[9px] px-1.5 py-0 rounded-md font-semibold text-brand-text-sub shrink-0"
                  >
                    {t(`pages:compDetail.${diffKey}`)}
                  </Badge>
                )}
                {showTrending && (
                  <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[9px] font-bold tracking-wider px-1.5 shrink-0">
                    {t("pages:comps.trending")}
                  </Badge>
                )}
                <CompSynergyPills synergies={comp.synergies} max={2} size="sm" className="shrink-0" />
                <span className="hidden md:inline text-brand-border">·</span>
                <span className="hidden md:inline text-[11px] text-brand-text-sub truncate">
                  {t("common:byAuthor")}{" "}
                  <span className="text-brand-text-main font-medium">{comp.author}</span>
                  <span className="text-brand-border mx-1.5">·</span>
                  {t("pages:comps.updatedAt", { date: formatDate(comp.date) })}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pl-2">
                <CompStatsInline
                  layout="inline"
                  likes={comp.likes}
                  winRate={comp.winRate}
                  votesLabel={t("pages:comps.votes")}
                  top1Label="Top 1"
                />
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
            </div>

            <CompHeroStrip heroIds={orderedHeroIds} heroes={heroes} />
          </div>
        </div>
      </Card>
  )

  if (selectable) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.()
          }
        }}
      >
        {cardBody}
      </div>
    )
  }

  return <Link to={`/doi-hinh/${comp.id}`}>{cardBody}</Link>
}
