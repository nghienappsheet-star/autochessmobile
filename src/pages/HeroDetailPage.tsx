import * as React from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom"
import { Card, Button } from "@/components/ui/core"
import { ChevronLeft, Star } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "@/components/motion/MotionProvider"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { HeroPortraitPanel } from "@/components/heroes/HeroPortraitPanel"
import { HeroOverviewPanel } from "@/components/heroes/HeroOverviewPanel"
import { HeroSkillBlock } from "@/components/heroes/HeroSkillBlock"
import { HeroLoreSection } from "@/components/heroes/HeroLoreSection"
import { HeroTacticalSection } from "@/components/heroes/HeroTacticalSection"
import { HeroRelatedSidebar } from "@/components/heroes/HeroRelatedSidebar"
import {
  resolveHeroSkill,
  resolveHeroStats,
  getRecommendedItems,
  getCompsForHero,
  getHeroSkins,
  type HeroStar,
} from "@/lib/hero-utils"
import { useFavorites } from "@/hooks/useFavorites"
import { cn } from "@/lib/utils"

function parseStar(value: string | null): HeroStar {
  const n = Number(value)
  if (n === 2 || n === 3) return n
  return 1
}

export function HeroDetailPage() {
  const { t } = useTranslation("pages")
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { heroes, items, comps, races, classes } = useAppStore()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites("heroes")

  const hero = heroes.find((h) => h.id === id)
  const star = parseStar(searchParams.get("star"))
  const skins = hero ? getHeroSkins(hero) : []
  const [selectedSkinId, setSelectedSkinId] = React.useState("default")

  React.useEffect(() => {
    if (skins.length > 0) {
      setSelectedSkinId(skins.find((s) => s.isDefault)?.id ?? skins[0].id)
    }
  }, [hero?.id, skins.length])

  const skill = hero ? resolveHeroSkill(hero, star) : null
  const stats = hero ? resolveHeroStats(hero, star) : null
  const description =
    hero?.description ??
    skill?.desc ??
    t("heroDetail.descriptionFallback")

  const setStar = (next: HeroStar) => {
    const params = new URLSearchParams(searchParams)
    if (next === 1) params.delete("star")
    else params.set("star", String(next))
    setSearchParams(params, { replace: true })
  }

  if (!hero || !skill || !stats) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold mb-4">{t("heroDetail.notFound")}</h2>
        <Button onClick={() => navigate("/tuong")}>{t("common:backToList")}</Button>
      </div>
    )
  }

  const tacticalNotes = hero.tacticalNotes ?? []
  const recommendedItems = getRecommendedItems(hero, items)
  const relatedComps = getCompsForHero(hero, comps)
  const fav = isFavorite(hero.id)

  return (
    <div className="space-y-6 pb-10">
      <Link
        to="/tuong"
        className="inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("heroDetail.backToList")}
      </Link>

      <DetailBreadcrumb
        items={[
          { label: t("heroDetail.breadcrumb"), href: "/tuong" },
          { label: hero.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-brand-card border-brand-border p-6 md:p-8 relative overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFavorite(hero.id)}
                className={cn(
                  "absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-xl border transition-all",
                  fav
                    ? "bg-brand-gold/20 border-brand-gold text-brand-gold"
                    : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-white"
                )}
                aria-label={t("heroDetail.toggleFavorite")}
              >
                <Star className={cn("w-5 h-5", fav && "fill-brand-gold")} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6 lg:gap-8 items-start">
                <HeroPortraitPanel
                  hero={hero}
                  selectedSkinId={selectedSkinId}
                  onSkinChange={setSelectedSkinId}
                />
                <HeroOverviewPanel
                  hero={hero}
                  description={description}
                  star={star}
                  onStarChange={setStar}
                  stats={stats}
                  races={races}
                  classes={classes}
                  recommendedItems={recommendedItems}
                />
              </div>

              <div className="mt-8 pt-8 border-t border-brand-border space-y-8">
                <HeroSkillBlock skill={skill} />
                {hero.lore && <HeroLoreSection lore={hero.lore} />}
                <HeroTacticalSection notes={tacticalNotes} />
              </div>
            </Card>
          </motion.div>
        </div>

        <HeroRelatedSidebar hero={hero} relatedComps={relatedComps} />
      </div>
    </div>
  )
}
