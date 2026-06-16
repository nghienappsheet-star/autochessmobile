import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Star } from "lucide-react"
import { motion } from "motion/react"
import { Card, Button } from "@/components/ui/core"
import { CompListCard } from "@/components/comps/CompListCard"
import { heroCostBadgeClass } from "@/lib/cost-colors"
import { cn } from "@/lib/utils"
import type { Comp, Hero } from "@/types/domain"

type ProfileFavoritesTabProps = {
  favHeroes: Hero[]
  favComps: Comp[]
  allHeroes: Hero[]
  isCompFavorite: (id: string) => boolean
  onToggleHeroFavorite: (id: string) => void
  onToggleCompFavorite: (id: string) => void
}

export function ProfileFavoritesTab({
  favHeroes,
  favComps,
  allHeroes,
  isCompFavorite,
  onToggleHeroFavorite,
  onToggleCompFavorite,
}: ProfileFavoritesTabProps) {
  const { t } = useTranslation(["pages", "common"])

  return (
    <div className="space-y-6">
      <Card className="bg-brand-card border-brand-border p-6">
        <h3 className="text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase">
          <Star className="w-4 h-4 text-brand-gold" />
          {t("pages:profile.favHeroes", { count: favHeroes.length })}
        </h3>
        {favHeroes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {favHeroes.map((hero, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                key={hero.id}
                className="relative"
              >
                <Link
                  to={`/tuong/${hero.id}`}
                  className="bg-brand-card-2 border border-brand-border rounded-lg p-3 flex flex-col items-center hover:border-brand-gold/30 transition-colors"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded mb-2 flex items-center justify-center font-bold text-sm bg-brand-bg",
                      heroCostBadgeClass(hero.cost)
                    )}
                  >
                    {hero.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span className="text-[12px] font-bold text-center block truncate w-full">
                    {hero.name}
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => onToggleHeroFavorite(hero.id)}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-xl bg-brand-card border border-brand-border hover:border-brand-gold/30 transition-colors"
                  aria-label={t("common:removeFavorite")}
                >
                  <Star className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border">
            <p className="text-[13px] text-brand-text-sub mb-4">{t("pages:profile.noFavHeroes")}</p>
            <Button asChild className="bg-gold-gradient font-semibold h-10 rounded-xl">
              <Link to="/tuong">{t("pages:profile.browseHeroes")}</Link>
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-brand-card border-brand-border p-6">
        <h3 className="text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase">
          <Star className="w-4 h-4 text-brand-gold" />
          {t("pages:profile.savedComps", { count: favComps.length })}
        </h3>
        {favComps.length > 0 ? (
          <div className="space-y-3">
            {favComps.map((comp, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={comp.id}
              >
                <CompListCard
                  comp={comp}
                  rank={idx + 1}
                  heroes={allHeroes}
                  isFavorite={isCompFavorite(comp.id)}
                  onToggleFavorite={() => onToggleCompFavorite(comp.id)}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border">
            <p className="text-[13px] text-brand-text-sub mb-4">{t("pages:profile.noSavedComps")}</p>
            <Button asChild className="bg-gold-gradient font-semibold h-10 rounded-xl">
              <Link to="/doi-hinh">{t("pages:profile.browseComps")}</Link>
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
