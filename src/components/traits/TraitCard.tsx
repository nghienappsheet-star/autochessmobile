import { Card, Badge } from "@/components/ui/core"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { getTraitDetailPath, getTraitHeroes, type TraitItem } from "@/lib/traits"
import type { Hero } from "@/types/domain"
import { TraitTypeBadge } from "./TraitTypeBadge"
import { TraitIcon } from "./TraitIcon"

type TraitCardProps = {
  trait: TraitItem
  heroes: Hero[]
  index?: number
}

export function TraitCard({ trait, heroes, index = 0 }: TraitCardProps) {
  const { t } = useTranslation("pages")
  const traitHeroes = getTraitHeroes(trait, heroes)
  const milestoneCounts = trait.milestones?.map((m) => m.count) ?? []
  const detailPath = getTraitDetailPath(trait.kind, trait.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
    >
      <Link to={detailPath} className="block h-full">
        <Card className="p-4 bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all group overflow-hidden relative h-full flex flex-col cursor-pointer">
          <div className="absolute top-0 right-0 p-4 opacity-100 pointer-events-none">
            <TraitIcon
              id={trait.id}
              iconUrl={trait.iconUrl}
              icon={trait.icon}
              name={trait.name}
              size="watermark"
            />
          </div>

          <div className="flex items-start gap-2.5 mb-3 relative z-10">
            <TraitIcon
              id={trait.id}
              iconUrl={trait.iconUrl}
              icon={trait.icon}
              name={trait.name}
              size="md"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <h3 className="text-base font-bold tracking-tight text-brand-text-main group-hover:text-brand-gold transition-colors truncate">
                  {trait.name}
                </h3>
                <TraitTypeBadge kind={trait.kind} />
              </div>
              <Badge
                variant="outline"
                className="border-brand-gold/20 text-brand-gold bg-brand-gold/5 font-bold text-[10px] uppercase tracking-widest"
              >
                {t("traits.heroCount", { count: traitHeroes.length })}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-brand-text-sub line-clamp-1 mb-3 leading-relaxed relative z-10">
            {trait.description || t("traits.descriptionPending")}
          </p>

          {milestoneCounts.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 mb-3 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mr-0.5">
                {t("traits.milestonesPreview")}
              </span>
              {milestoneCounts.map((count, i) => (
                <span
                  key={count}
                  className="inline-flex items-center text-[10px] font-bold text-brand-gold"
                >
                  {i > 0 && <span className="text-brand-text-sub mx-0.5">·</span>}
                  {count}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-3 border-t border-brand-border flex items-center justify-between relative z-10">
            <div className="flex -space-x-2">
              {traitHeroes.slice(0, 5).map((h) => (
                <div
                  key={h.id}
                  className="w-6 h-6 rounded-lg border-2 border-brand-card bg-brand-card-2 overflow-hidden flex items-center justify-center text-[8px] uppercase font-bold text-brand-text-sub"
                >
                  {h.name.charAt(0)}
                </div>
              ))}
              {traitHeroes.length > 5 && (
                <div className="w-6 h-6 rounded-lg border-2 border-brand-card bg-brand-gold/10 flex items-center justify-center text-[8px] font-bold text-brand-gold">
                  +{traitHeroes.length - 5}
                </div>
              )}
            </div>
            <ChevronRight
              className="w-4 h-4 text-brand-text-sub group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all shrink-0"
              aria-hidden
            />
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
