import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/core"
import { useTranslation } from "react-i18next"
import type { ClassSynergy, Hero, Race } from "@/types/domain"
import { getClassTraitPath, getRaceTraitPath } from "@/lib/hero-utils"
import { TraitIcon } from "@/components/traits/TraitIcon"

type HeroTraitsSectionProps = {
  hero: Hero
  races: Race[]
  classes: ClassSynergy[]
}

export function HeroTraitsSection({ hero, races, classes }: HeroTraitsSectionProps) {
  const { t } = useTranslation("pages")

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
        {t("heroDetail.traitsTitle")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {hero.race.length === 0 && hero.class.length === 0 ? (
          <Badge
            variant="secondary"
            className="bg-brand-card-2 text-brand-text-sub border-brand-border px-3 py-1 text-[11px] font-semibold rounded-md opacity-70"
          >
            {t("heroDetail.traitUndefined")}
          </Badge>
        ) : (
          <>
        {hero.race.map((raceName) => {
          const race = races.find((r) => r.name === raceName)
          const path = getRaceTraitPath(raceName, races)
          const badge = (
            <Badge
              key={`race-${raceName}`}
              variant="secondary"
              className="bg-brand-card-2 text-brand-text-sub border-brand-border pl-1 pr-3 py-1 text-[11px] font-semibold rounded-md gap-2 inline-flex items-center"
            >
              <TraitIcon
                id={race?.id}
                iconUrl={race?.iconUrl}
                icon={race?.icon ?? "❓"}
                name={raceName}
                size="xs"
              />
              {raceName}
            </Badge>
          )
          return path ? (
            <Link key={`race-${raceName}`} to={path} className="hover:opacity-80 transition-opacity">
              {badge}
            </Link>
          ) : (
            badge
          )
        })}
        {hero.class.map((className) => {
          const cls = classes.find((c) => c.name === className)
          const path = getClassTraitPath(className, classes)
          const badge = (
            <Badge
              key={`class-${className}`}
              className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 border pl-1 pr-3 py-1 text-[11px] font-semibold rounded-md gap-2 inline-flex items-center"
            >
              <TraitIcon
                id={cls?.id}
                iconUrl={cls?.iconUrl}
                icon={cls?.icon ?? "❓"}
                name={className}
                size="xs"
              />
              {className}
            </Badge>
          )
          return path ? (
            <Link key={`class-${className}`} to={path} className="hover:opacity-80 transition-opacity">
              {badge}
            </Link>
          ) : (
            badge
          )
        })}
          </>
        )}
      </div>
    </section>
  )
}
