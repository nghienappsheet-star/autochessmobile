import { Card, Badge } from "@/components/ui/core"
import { TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import type { Comp, Hero } from "@/types/domain"
import type { TraitItem } from "@/lib/traits"
import { getTraitHeroes } from "@/lib/traits"

type TraitRecommendedCompsProps = {
  comps: Comp[]
  heroes: Hero[]
  trait: TraitItem
  recommendedMilestone?: number | null
}

const TIER_VARIANT: Record<string, "tier-s" | "tier-a" | "tier-b" | "tier-c"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
}

export function TraitRecommendedComps({
  comps,
  heroes,
  trait,
  recommendedMilestone,
}: TraitRecommendedCompsProps) {
  const { t } = useTranslation("pages")

  if (comps.length === 0) return null

  const traitHeroIds = new Set(getTraitHeroes(trait, heroes).map((h) => h.id))

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-brand-gold shrink-0" />
          <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
            {t("traitDetail.recommendedComps")}
          </h3>
        </div>
        {recommendedMilestone != null && (
          <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[10px] font-bold">
            {t("traitDetail.recommendedMilestone", { count: recommendedMilestone })}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {comps.map((comp) => {
          const traitCount = comp.heroes.filter((id) => traitHeroIds.has(id)).length
          const tierVariant = TIER_VARIANT[comp.tier] ?? "tier-c"

          return (
            <Link key={comp.id} to={`/doi-hinh/${comp.id}`}>
              <Card className="bg-brand-card border-brand-border p-5 rounded-xl group hover:border-brand-gold/30 transition-all h-full">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h4 className="text-sm font-bold text-brand-text-main tracking-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                    {comp.name}
                  </h4>
                  <Badge variant={tierVariant} className="text-[9px] shrink-0">
                    {comp.tier}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {comp.winRate && (
                    <Badge variant="outline" className="text-[10px] border-brand-border">
                      WR {comp.winRate}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-[10px]">
                    {t("traitDetail.compTraitCount", { count: traitCount })}
                  </Badge>
                </div>

                <div className="flex items-center gap-1.5">
                  {comp.heroes.slice(0, 6).map((hId) => {
                    const hero = heroes.find((h) => h.id === hId)
                    return (
                      <div
                        key={hId}
                        className="w-8 h-8 rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center text-[10px] font-bold uppercase text-brand-text-sub"
                        title={hero?.name}
                      >
                        {hero?.name.charAt(0) ?? "?"}
                      </div>
                    )
                  })}
                  {comp.heroes.length > 6 && (
                    <span className="text-[10px] font-bold text-brand-text-sub">
                      +{comp.heroes.length - 6}
                    </span>
                  )}
                </div>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
