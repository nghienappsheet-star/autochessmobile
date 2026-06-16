import { Card, Badge } from "@/components/ui/core"
import { Users } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import { getHeroIconUrl } from "@/lib/hero-utils"
import { getHeroAvailability } from "@/lib/trait-meta"
import type { Hero } from "@/types/domain"

type TraitMembersGridProps = {
  heroes: Hero[]
}

function availabilityLabelKey(availability: ReturnType<typeof getHeroAvailability>): string {
  if (availability === "common") return "traitDetail.availabilityCommon"
  if (availability === "uncommon") return "traitDetail.availabilityUncommon"
  return "traitDetail.availabilityRare"
}

function availabilityVariant(
  availability: ReturnType<typeof getHeroAvailability>
): "success" | "warning" | "secondary" {
  if (availability === "common") return "success"
  if (availability === "uncommon") return "warning"
  return "secondary"
}

export function TraitMembersGrid({ heroes }: TraitMembersGridProps) {
  const { t } = useTranslation("pages")
  const sorted = [...heroes].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-brand-gold shrink-0" />
          <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
            {t("traitDetail.membersTitle")}
          </h3>
        </div>
        <Badge className="bg-brand-card-2 text-brand-text-sub border-brand-border">
          {t("traitDetail.pieceCount", { count: sorted.length })}
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {sorted.map((hero) => {
          const iconUrl = getHeroIconUrl(hero)
          const availability = getHeroAvailability(hero)

          return (
            <Link key={hero.id} to={`/tuong/${hero.id}`}>
              <Card className="bg-brand-card border-brand-border p-4 rounded-xl hover:border-brand-gold/30 transition-all text-center group h-full">
                <div className="relative w-14 h-14 mx-auto mb-3">
                  <div
                    className={cn(
                      "w-full h-full rounded-xl overflow-hidden border-2 bg-brand-card-2 flex items-center justify-center",
                      hero.cost === 5 ? "border-brand-gold" : "border-brand-border"
                    )}
                  >
                    {iconUrl ? (
                      <img
                        src={iconUrl}
                        alt=""
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-lg font-bold uppercase text-brand-text-sub">
                        {hero.name.substring(0, 2)}
                      </span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-1 -right-1 text-[9px] font-bold px-1.5 py-0.5",
                      heroCostBadgeOverlayClass(hero.cost)
                    )}
                  >
                    ${hero.cost}
                  </span>
                </div>

                <h4 className="text-[12px] font-bold text-brand-text-main truncate mb-2 group-hover:text-brand-gold transition-colors">
                  {hero.name}
                </h4>

                <Badge
                  variant={availabilityVariant(availability)}
                  className="text-[9px] font-bold uppercase tracking-widest"
                >
                  {t(availabilityLabelKey(availability))}
                </Badge>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
