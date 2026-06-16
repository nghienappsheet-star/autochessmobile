import { Link, useNavigate } from "react-router-dom"
import { Card, Button, Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import type { Comp, Hero } from "@/types/domain"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import { getRelatedHeroes } from "@/lib/hero-utils"
import { HeroRelatedHeroes } from "@/components/heroes/HeroRelatedHeroes"
import { RACE_NAME_ALIASES } from "@/data/heroes"

const COMP_TIER_VARIANT = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
} as const

type HeroRelatedSidebarProps = {
  hero: Hero
  relatedComps: Comp[]
}

export function HeroRelatedSidebar({ hero, relatedComps }: HeroRelatedSidebarProps) {
  const { t } = useTranslation("pages")
  const navigate = useNavigate()
  const { heroes } = useAppStore()

  const relatedByRace = hero.race.flatMap((race) =>
    getRelatedHeroes(hero, heroes, { by: "race", value: race, limit: 6 })
  )
  const uniqueByRace = [...new Map(relatedByRace.map((h) => [h.id, h])).values()].slice(0, 6)

  const relatedByClass = hero.class.flatMap((cls) =>
    getRelatedHeroes(hero, heroes, { by: "class", value: cls, limit: 6 })
  )
  const uniqueByClass = [...new Map(relatedByClass.map((h) => [h.id, h])).values()].slice(0, 6)

  const relatedByCost = getRelatedHeroes(hero, heroes, { by: "cost", limit: 6 })

  return (
    <div className="space-y-6">
      {relatedComps.length > 0 && (
        <Card className="bg-brand-card border-brand-border p-6 space-y-4">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            {t("heroDetail.relatedComps")}
          </h3>
          <div className="space-y-3">
            {relatedComps.map((comp) => (
              <Link
                key={comp.id}
                to={`/doi-hinh/${comp.id}`}
                className="block p-3 rounded-xl border border-brand-border hover:border-brand-gold/30 bg-brand-bg transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-bold text-brand-text-main group-hover:text-brand-gold truncate">
                    {comp.name}
                  </span>
                  <Badge
                    variant={COMP_TIER_VARIANT[comp.tier as keyof typeof COMP_TIER_VARIANT] ?? "tier-c"}
                    className="shrink-0 rounded-md"
                  >
                    {comp.tier}
                  </Badge>
                </div>
                <div className="text-[11px] text-brand-text-sub">{comp.winRate} win rate</div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card className="bg-brand-card border-brand-border p-6 space-y-5">
        {hero.race[0] && (
          <HeroRelatedHeroes
            title={t("heroDetail.relatedByRace")}
            heroes={uniqueByRace}
            filterHref={`/tuong?race=${encodeURIComponent(RACE_NAME_ALIASES[hero.race[0]] ?? hero.race[0])}`}
          />
        )}
        {hero.class[0] && (
          <HeroRelatedHeroes
            title={t("heroDetail.relatedByClass")}
            heroes={uniqueByClass}
            filterHref={`/tuong?class=${encodeURIComponent(hero.class[0])}`}
          />
        )}
        <HeroRelatedHeroes
          title={t("heroDetail.relatedByCost", { cost: hero.cost })}
          heroes={relatedByCost}
          filterHref={`/tuong?cost=${hero.cost}`}
        />
      </Card>

      <Card className="bg-brand-card border-brand-border p-6 space-y-3">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          {t("heroDetail.quickFilter")}
        </h3>
        <Button
          variant="outline"
          className="w-full border-brand-border h-11 rounded-xl text-xs font-bold"
          onClick={() => navigate(`/tuong?cost=${hero.cost}`)}
        >
          {t("heroDetail.viewSameCost", { cost: hero.cost })}
        </Button>
        {hero.race.map((race) => (
          <Button
            key={race}
            variant="outline"
            className="w-full border-brand-border h-11 rounded-xl text-xs font-bold"
            onClick={() =>
              navigate(`/tuong?race=${encodeURIComponent(RACE_NAME_ALIASES[race] ?? race)}`)
            }
          >
            {t("heroDetail.viewSameRace", { race })}
          </Button>
        ))}
        {hero.class[0] && (
          <Button
            variant="outline"
            className="w-full border-brand-border h-11 rounded-xl text-xs font-bold"
            onClick={() => navigate(`/tuong?class=${encodeURIComponent(hero.class[0])}`)}
          >
            {t("heroDetail.viewSameClass", { class: hero.class[0] })}
          </Button>
        )}
      </Card>
    </div>
  )
}
