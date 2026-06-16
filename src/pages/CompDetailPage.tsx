import * as React from "react"
import { Card, Button, Badge } from "@/components/ui/core"
import { ThumbsUp, Bookmark } from "lucide-react"
import { useParams, Link } from "react-router-dom"
import { BackButton } from "@/components/ui/BackButton"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/contexts/DataContext"
import { useFavorites } from "@/hooks/useFavorites"
import { motion, AnimatePresence } from "motion/react"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { CompHeroChip } from "@/components/comps/CompHeroChip"
import { CompBoardMini } from "@/components/comps/CompBoardMini"
import { CompRadarAnalysis } from "@/components/comps/CompRadarAnalysis"
import { resolveCompBoard } from "@/lib/comp-formation"
import { getCompTop4 } from "@/lib/comp-stats"
import {
  difficultyLabelKey,
  roadmapHasContent,
  splitCoreFlexHeroIds,
} from "@/lib/comp-detail"
import { getRecommendedItems } from "@/lib/hero-utils"
import type { Hero } from "@/types/domain"

import { getTierBadgeVariant } from "@/lib/tier-utils"

function HeroLineupGrid({
  heroIds,
  heroes,
  mainCoreId,
  coreHeroIds,
  t,
}: {
  heroIds: string[]
  heroes: Hero[]
  mainCoreId?: string
  coreHeroIds?: string[]
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const coreSet = new Set(coreHeroIds ?? [])

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
      <AnimatePresence>
        {heroIds.map((heroId, i) => {
          const hero = heroes.find((h) => h.id === heroId)
          const isMainCore = mainCoreId === heroId
          const isCore = coreSet.has(heroId)
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={heroId}
              className="text-center group relative"
            >
              <CompHeroChip
                hero={hero}
                size="md"
                isCore={isCore && !isMainCore}
                isMainCore={isMainCore}
                showStars
                showName
                coreLabel={t("compDetail.coreBadge")}
                mainCoreLabel={t("compDetail.mainCore")}
                costLabel={hero ? t("compDetail.goldCost", { cost: hero.cost }) : undefined}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export function CompDetailPage() {
  const { t } = useTranslation(["pages", "nav", "common"])
  const { id } = useParams()
  const { heroes, comps, items } = useAppStore()
  const { isFavorite, toggleFavorite } = useFavorites("comps")

  const comp = comps.find((c) => c.id === id) || comps[0]
  const favorite = isFavorite(comp.id)
  const board = React.useMemo(() => resolveCompBoard(comp, heroes), [comp, heroes])
  const tierVariant = getTierBadgeVariant(comp.tier)
  const top4 = getCompTop4(comp)
  const diffKey = difficultyLabelKey(comp.difficulty)
  const { hasCoreSplit, coreIds, flexIds } = splitCoreFlexHeroIds(comp)

  const strengths = comp.strengths?.filter(Boolean) ?? []
  const weaknesses = comp.weaknesses?.filter(Boolean) ?? []
  const tips = comp.tips?.filter(Boolean) ?? []
  const showQuickReview = strengths.length > 0 || weaknesses.length > 0

  const coreHeroes = coreIds
    .map((hid) => heroes.find((h) => h.id === hid))
    .filter((h): h is Hero => Boolean(h))

  const coreItemGroups = coreHeroes.map((hero) => ({
    hero,
    items: getRecommendedItems(hero, items, 4),
  }))

  const hasItemSuggestions = coreItemGroups.some((g) => g.items.length > 0)

  return (
    <div className="space-y-6 pb-10">
      <BackButton to="/doi-hinh" label={t("compDetail.backToList")} />

      <DetailBreadcrumb
        items={[
          { label: t("nav:comps"), href: "/doi-hinh" },
          { label: comp.name },
        ]}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={tierVariant} className="px-3 py-1 text-sm font-bold rounded-md">
              {comp.tier} Tier
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-text-main leading-none">
              {comp.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-[12px] font-semibold text-brand-text-sub">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand-card-2 border border-brand-border flex items-center justify-center text-[10px] text-brand-gold font-bold">
                {comp.author.charAt(0)}
              </div>
              <span>
                {t("compDetail.byAuthor")}{" "}
                <span className="text-brand-text-main">{comp.author}</span>
              </span>
            </div>
            <span className="text-brand-border">|</span>
            <span>
              {t("compDetail.updatedAt")} {comp.date}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-brand-card border-brand-border hover:bg-brand-card-2 hover:border-brand-gold/30 h-12 px-6 gap-3 rounded-xl transition-all"
          >
            <ThumbsUp className="w-5 h-5 text-brand-gold fill-brand-gold/20" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-lg font-bold text-brand-text-main">{comp.likes}</span>
              <span className="text-[10px] font-semibold text-brand-text-sub">
                {t("compDetail.votes")}
              </span>
            </div>
          </Button>
          <Button
            variant={favorite ? "default" : "outline"}
            className={cn(
              "h-12 w-12 rounded-xl transition-all",
              favorite
                ? "bg-brand-gold text-black hover:opacity-90 shadow-[0_0_15px_rgba(245,180,60,0.3)]"
                : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white"
            )}
            onClick={() => toggleFavorite(comp.id)}
          >
            <Bookmark className="w-5 h-5" fill={favorite ? "currentColor" : "none"} />
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-brand-card border-brand-border p-6 md:p-8 space-y-6 rounded-xl">
          <h3 className="text-[12px] font-bold uppercase tracking-widest text-brand-gold">
            {t("compDetail.overviewTitle")}
          </h3>
          <p className="text-[15px] text-brand-text-sub leading-relaxed font-medium">{comp.desc}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {[
              { label: t("compDetail.stats.top1"), value: comp.winRate, color: "text-brand-gold" },
              { label: t("compDetail.stats.top4"), value: `${top4}%`, color: "text-brand-green" },
              {
                label: t("compDetail.stats.difficulty"),
                value: t(`compDetail.${diffKey}`),
                color: "text-tier-b",
              },
              {
                label: t("compDetail.unitCount"),
                value: String(comp.heroes.length),
                color: "text-brand-text-main",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-brand-bg p-4 rounded-xl border border-brand-border text-center"
              >
                <div className="text-[10px] font-bold text-brand-text-sub uppercase mb-1 tracking-widest">
                  {stat.label}
                </div>
                <div className={cn("text-lg font-bold", stat.color)}>{stat.value}</div>
              </div>
            ))}
          </div>
        </Card>

        {showQuickReview && (
          <Card className="bg-brand-card border-brand-border p-6 md:p-8 space-y-6 h-full rounded-xl">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-brand-gold">
              {t("compDetail.quickReview")}
            </h3>
            <div className="space-y-4">
              {strengths.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase text-brand-green tracking-wider">
                    {t("compDetail.strengthsTitle")}
                  </div>
                  <ul className="text-sm text-brand-text-sub space-y-2">
                    {strengths.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-brand-green font-bold shrink-0">+</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {weaknesses.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase text-brand-red tracking-wider">
                    {t("compDetail.weaknessesTitle")}
                  </div>
                  <ul className="text-sm text-brand-text-sub space-y-2">
                    {weaknesses.map((line) => (
                      <li key={line} className="flex gap-2">
                        <span className="text-brand-red font-bold shrink-0">-</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {hasCoreSplit ? (
            <>
              <section className="space-y-4">
                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
                    {t("compDetail.coreTitle")}
                  </h3>
                  <Badge variant="outline" className="text-[10px] border-brand-border font-semibold">
                    {coreIds.length} {t("compDetail.unitCount").toLowerCase()}
                  </Badge>
                </div>
                <HeroLineupGrid
                  heroIds={coreIds}
                  heroes={heroes}
                  mainCoreId={comp.mainCoreId}
                  coreHeroIds={comp.coreHeroIds}
                  t={t}
                />
              </section>

              {flexIds.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between border-b border-brand-border pb-4">
                    <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
                      {t("compDetail.flexTitle")}
                    </h3>
                  </div>
                  <HeroLineupGrid
                    heroIds={flexIds}
                    heroes={heroes}
                    coreHeroIds={comp.coreHeroIds}
                    t={t}
                  />
                </section>
              )}
            </>
          ) : (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
                  {t("compDetail.requiredLineup", { count: comp.heroes.length })}
                </h3>
              </div>
              <HeroLineupGrid heroIds={comp.heroes} heroes={heroes} t={t} />
            </section>
          )}

          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
                {t("compDetail.positioningTitle")}
              </h3>
            </div>
            <div className="bg-brand-bg border border-brand-border p-3 md:p-6 rounded-xl relative overflow-hidden">
              <CompBoardMini
                board={board}
                heroes={heroes}
                size="full"
                showRowLabels
                className="relative z-10"
              />
            </div>
          </section>

          {roadmapHasContent(comp.roadmap) && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4">
                {t("compDetail.roadmapTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(
                  [
                    { key: "early", label: t("compDetail.roadmapEarly"), value: comp.roadmap?.early },
                    { key: "mid", label: t("compDetail.roadmapMid"), value: comp.roadmap?.mid },
                    { key: "late", label: t("compDetail.roadmapLate"), value: comp.roadmap?.late },
                  ] as const
                )
                  .filter((phase) => phase.value?.trim())
                  .map((phase) => (
                    <Card
                      key={phase.key}
                      className="bg-brand-card border-brand-border p-4 rounded-xl space-y-2"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                        {phase.label}
                      </div>
                      <p className="text-[13px] text-brand-text-sub leading-relaxed">{phase.value}</p>
                    </Card>
                  ))}
              </div>
            </section>
          )}

          {(comp.strongAgainst?.length || comp.weakAgainst?.length) ? (
            <section className="space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4">
                {t("compDetail.countersTitle")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {comp.strongAgainst && comp.strongAgainst.length > 0 && (
                  <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-brand-green">
                      {t("compDetail.strongAgainst")}
                    </div>
                    <ul className="space-y-3">
                      {comp.strongAgainst.map((entry) => (
                        <li key={`${entry.name}-${entry.reason}`} className="space-y-1">
                          <div className="text-sm font-semibold text-brand-text-main">{entry.name}</div>
                          <div className="text-[12px] text-brand-text-sub">{entry.reason}</div>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
                {comp.weakAgainst && comp.weakAgainst.length > 0 && (
                  <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-3">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-brand-red">
                      {t("compDetail.weakAgainst")}
                    </div>
                    <ul className="space-y-3">
                      {comp.weakAgainst.map((entry) => (
                        <li key={`${entry.name}-${entry.reason}`} className="space-y-1">
                          <div className="text-sm font-semibold text-brand-text-main">{entry.name}</div>
                          <div className="text-[12px] text-brand-text-sub">{entry.reason}</div>
                          {entry.tip && (
                            <div className="text-[12px] text-brand-gold/90">
                              {t("compDetail.counterFix")}: {entry.tip}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>
            </section>
          ) : null}

          {tips.length > 0 && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold tracking-tight text-brand-text-main border-b border-brand-border pb-4">
                {t("compDetail.tipsTitle")}
              </h3>
              <Card className="bg-brand-card border-brand-border p-5 rounded-xl">
                <ul className="space-y-2 text-[13px] text-brand-text-sub">
                  {tips.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span className="text-brand-gold shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>
          )}

          <CompRadarAnalysis comp={comp} heroes={heroes} />
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h3 className="text-[12px] font-bold uppercase tracking-widest text-brand-text-main">
              {t("compDetail.synergiesTitle")}
            </h3>
            <div className="space-y-2">
              {comp.synergies.map((syn, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-brand-card border border-brand-border p-3 rounded-xl hover:border-brand-gold/20 transition-all group"
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all",
                      syn.active ? "bg-brand-gold text-black" : "bg-brand-card-2 text-brand-text-sub"
                    )}
                  >
                    {syn.name.split(" ")[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={cn(
                        "text-xs font-bold tracking-wide",
                        syn.active ? "text-brand-text-main" : "text-brand-text-sub"
                      )}
                    >
                      {syn.name}
                    </div>
                    <div className="text-[10px] font-medium text-brand-text-sub leading-tight line-clamp-2">
                      {syn.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {hasItemSuggestions && (
            <section className="space-y-4">
              <h3 className="text-[12px] font-bold uppercase tracking-widest text-brand-text-main">
                {t("compDetail.itemSuggestions")}
              </h3>
              <Card className="bg-brand-card border-brand-border p-6 space-y-6 rounded-xl">
                {coreItemGroups
                  .filter((g) => g.items.length > 0)
                  .map(({ hero, items: heroItems }) => (
                    <div key={hero.id} className="space-y-3">
                      <div className="text-[10px] font-bold uppercase text-brand-gold tracking-widest border-l-2 border-brand-gold pl-2">
                        {hero.name}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {heroItems.map((item) => (
                          <Link
                            key={item.id}
                            to={`/trang-bi/${item.id}`}
                            className="w-[48px] h-[48px] rounded-lg border border-brand-border bg-brand-bg p-1 hover:border-brand-gold transition-all overflow-hidden"
                            title={item.name}
                          >
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <div className="w-full h-full rounded bg-brand-card-2 flex items-center justify-center text-[9px] font-bold text-brand-text-sub">
                                {item.name.charAt(0)}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </Card>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
