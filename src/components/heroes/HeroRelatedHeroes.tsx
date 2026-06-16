import { Link } from "react-router-dom"
import { Card } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { heroCostBadgeClass } from "@/lib/cost-colors"
import type { Hero } from "@/types/domain"
import { useTranslation } from "react-i18next"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { HeroNewBadge } from "@/components/heroes/HeroNewBadge"
import { isHeroNew } from "@/lib/hero-utils"

type HeroRelatedHeroesProps = {
  title: string
  heroes: Hero[]
  filterHref: string
}

export function HeroRelatedHeroes({ title, heroes, filterHref }: HeroRelatedHeroesProps) {
  const { t } = useTranslation("pages")

  if (heroes.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">{title}</h4>
        <Link to={filterHref} className="text-[10px] font-bold text-brand-gold hover:underline">
          {t("common:viewAll")}
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {heroes.map((hero) => (
          <Link key={hero.id} to={`/tuong/${hero.id}`}>
            <Card className="bg-brand-bg border-brand-border p-2 rounded-xl hover:border-brand-gold/30 transition-all text-center group">
              <div className="relative mx-auto mb-1.5 w-10">
                <HeroIcon hero={hero} size="sm" className="mx-auto" />
                {isHeroNew(hero) && (
                  <div className="absolute -top-1 -right-1 z-10">
                    <HeroNewBadge size="sm" />
                  </div>
                )}
              </div>
              <p className="text-[10px] font-bold text-brand-text-main truncate group-hover:text-brand-gold">
                {hero.name}
              </p>
              <p className={cn("text-[9px] font-bold", heroCostBadgeClass(hero.cost))}>${hero.cost}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
