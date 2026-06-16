import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/core"
import { useTranslation } from "react-i18next"
import type { ClassSynergy, Hero, Race } from "@/types/domain"
import { getClassTraitPath, getRaceTraitPath } from "@/lib/hero-utils"
import { TraitIcon } from "@/components/traits/TraitIcon"

type HeroSynergyCardsProps = {
  hero: Hero
  races: Race[]
  classes: ClassSynergy[]
  variant?: "default" | "compact"
}

export function HeroSynergyCards({ hero, races, classes, variant = "default" }: HeroSynergyCardsProps) {
  const { t } = useTranslation("pages")

  const raceCards = hero.race.map((raceName) => {
    const race = races.find((r) => r.name === raceName)
    const path = getRaceTraitPath(raceName, races)
    return { type: "race" as const, name: raceName, race, path }
  })

  const classCards = hero.class.map((className) => {
    const cls = classes.find((c) => c.name === className)
    const path = getClassTraitPath(className, classes)
    return { type: "class" as const, name: className, cls, path }
  })

  const cards = [...raceCards, ...classCards]
  if (cards.length === 0) return null

  if (variant === "compact") {
    return (
      <section className="space-y-2">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          {t("heroDetail.synergiesTitle")}
        </h3>
        <div className="space-y-2">
          {cards.map((card) => {
            const milestones = card.type === "race" ? card.race?.milestones : card.cls?.milestones
            const preview = milestones?.slice(0, 2) ?? []
            const inner = (
              <div className="rounded-xl border border-brand-border bg-brand-bg px-3 py-2 space-y-1 hover:border-brand-gold/30 transition-colors">
                <div className="flex items-center gap-2">
                  <TraitIcon
                    id={card.type === "race" ? card.race?.id : card.cls?.id}
                    iconUrl={card.type === "race" ? card.race?.iconUrl : card.cls?.iconUrl}
                    icon={card.type === "race" ? card.race?.icon ?? "❓" : card.cls?.icon ?? "❓"}
                    name={card.name}
                    size="xs"
                  />
                  <Badge
                    variant={card.type === "race" ? "secondary" : "outline"}
                    className={
                      card.type === "race"
                        ? "bg-brand-card-2 text-brand-text-sub border-brand-border rounded-md text-[10px] font-bold"
                        : "border-brand-gold/30 text-brand-gold rounded-md text-[10px] font-bold"
                    }
                  >
                    {card.name}
                  </Badge>
                </div>
                {preview.map((m) => (
                  <p key={m.count} className="text-[10px] text-brand-text-sub leading-snug">
                    <span className="text-brand-gold font-semibold">({m.count})</span> {m.effect}
                  </p>
                ))}
              </div>
            )
            return card.path ? (
              <Link key={`${card.type}-${card.name}`} to={card.path}>
                {inner}
              </Link>
            ) : (
              <div key={`${card.type}-${card.name}`}>{inner}</div>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
        {t("heroDetail.synergiesTitle")}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => {
          const milestones =
            card.type === "race" ? card.race?.milestones : card.cls?.milestones
          const preview = milestones?.slice(0, 2) ?? []
          const inner = (
            <div className="bg-brand-bg p-4 rounded-xl border border-brand-border space-y-2 h-full hover:border-brand-gold/30 transition-colors">
              <div className="flex items-center gap-2">
                <TraitIcon
                  id={card.type === "race" ? card.race?.id : card.cls?.id}
                  iconUrl={card.type === "race" ? card.race?.iconUrl : card.cls?.iconUrl}
                  icon={card.type === "race" ? card.race?.icon ?? "❓" : card.cls?.icon ?? "❓"}
                  name={card.name}
                  size="sm"
                />
                <Badge
                  variant={card.type === "race" ? "secondary" : "outline"}
                  className={
                    card.type === "race"
                      ? "bg-brand-card-2 text-brand-text-sub border-brand-border rounded-md text-[10px] font-bold uppercase"
                      : "border-brand-gold/30 text-brand-gold rounded-md text-[10px] font-bold uppercase"
                  }
                >
                  {card.name}
                </Badge>
              </div>
              {preview.map((m) => (
                <p key={m.count} className="text-[11px] text-brand-text-sub leading-relaxed line-clamp-2">
                  <span className="text-brand-gold font-semibold">({m.count})</span> {m.effect}
                </p>
              ))}
            </div>
          )
          return card.path ? (
            <Link key={`${card.type}-${card.name}`} to={card.path}>
              {inner}
            </Link>
          ) : (
            <div key={`${card.type}-${card.name}`}>{inner}</div>
          )
        })}
      </div>
    </section>
  )
}
