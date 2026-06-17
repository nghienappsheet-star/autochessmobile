import * as React from "react"
import { Card, Badge, Button } from "@/components/ui/core"
import { ArrowRight, X, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import { motion, AnimatePresence } from "@/components/motion/MotionProvider"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { heroCostBarClass, heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import { getOrderedCompHeroes } from "@/lib/comp-formation"
import { CompSynergyPills } from "@/components/comps/CompSynergyPills"
import { BackButton } from "@/components/ui/BackButton"
import {
  FilterToolbar,
  FilterToolbarRow,
  FilterSearchInput,
  FilterSelect,
  FilterClearButton,
  FilterResultMeta,
  TraitSearchDropdown,
} from "@/components/layout/FilterToolbar"
import type { Comp, Hero } from "@/types/domain"
import { useHeroPickerFilters } from "@/hooks/useHeroPickerFilters"
import { getTierBadgeVariant } from "@/lib/tier-utils"
import { parseWinRate } from "@/lib/comp-stats"

const MAX_SELECTED = 10

export function CompRecommenderTool() {
  const { t } = useTranslation("tools")
  const { heroes, races, classes, comps } = useAppStore()

  const [selectedHeroes, setSelectedHeroes] = React.useState<string[]>([])
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false)
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false)

  const {
    searchTerm,
    setSearchTerm,
    selectedCost,
    setSelectedCost,
    selectedRace,
    setSelectedRace,
    selectedClass,
    setSelectedClass,
    filteredHeroes: baseFilteredHeroes,
    clearFilters: clearHeroFilters,
    hasActiveFilters: hasFilters,
  } = useHeroPickerFilters(heroes, {
    excludeIds: selectedHeroes,
    searchTraits: true,
  })

  const filteredHeroes = baseFilteredHeroes

  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("compFinder.allCosts") },
      ...([1, 2, 3, 4, 5] as const).map((cost) => ({
        value: String(cost),
        label: `$${cost}`,
      })),
    ],
    [t]
  )

  const matchedComps = React.useMemo(() => {
    if (selectedHeroes.length === 0) return []
    return comps
      .map((comp) => {
        const matchCount = comp.heroes.filter((h) => selectedHeroes.includes(h)).length
        const matchPercent =
          comp.heroes.length > 0 ? Math.round((matchCount / comp.heroes.length) * 100) : 0
        return { ...comp, matchCount, matchPercent }
      })
      .filter((c) => c.matchCount > 0)
      .sort((a, b) => {
        if (b.matchPercent !== a.matchPercent) return b.matchPercent - a.matchPercent
        if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount
        return parseWinRate(b.winRate) - parseWinRate(a.winRate)
      })
  }, [comps, selectedHeroes])

  const toggleHero = (id: string) => {
    if (selectedHeroes.includes(id)) {
      setSelectedHeroes(selectedHeroes.filter((hId) => hId !== id))
    } else if (selectedHeroes.length < MAX_SELECTED) {
      setSelectedHeroes([...selectedHeroes, id])
    }
  }

  const clearSelection = () => setSelectedHeroes([])

  const clearFilters = () => {
    clearHeroFilters()
    setRaceDropdownOpen(false)
    setClassDropdownOpen(false)
  }

  return (
    <div className="space-y-4 pb-10">
      <BackButton to="/cong-cu" />
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card className="bg-brand-card border-brand-border p-4 lg:col-span-2 flex flex-col max-h-[800px] shadow-2xl relative overflow-hidden">
        <div className="space-y-3 flex-1 flex flex-col min-h-0 relative z-10">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-0.5 min-w-0">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub">
                {t("compFinder.ownedHeroes")}
              </h3>
              <p className="text-[10px] text-brand-text-sub font-medium">
                {t("compFinder.ownedHeroesHint")}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-brand-gold bg-brand-gold/5 px-2 py-1 rounded border border-brand-gold/20">
                {selectedHeroes.length}/{MAX_SELECTED}
              </span>
              {selectedHeroes.length > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearSelection}
                  className="h-7 px-2 text-[10px] font-semibold text-brand-gold hover:text-brand-gold-deep"
                >
                  {t("compFinder.clearSelection")}
                </Button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 min-h-[72px] p-3 bg-brand-bg rounded-xl border border-brand-border items-center content-center">
            {selectedHeroes.length === 0 && (
              <span className="text-[11px] font-medium text-brand-text-sub w-full text-center">
                {t("compFinder.noSelection")}
              </span>
            )}
            <AnimatePresence>
              {selectedHeroes.map((hId) => {
                const hero = heroes.find((h) => h.id === hId)
                if (!hero) return null
                return (
                  <motion.button
                    key={hId}
                    type="button"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => toggleHero(hId)}
                    className="relative shrink-0 group/chip"
                    aria-label={hero.name}
                  >
                    <HeroIcon hero={hero} size="sm" className="ring-2 ring-brand-gold/40" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-text-sub group-hover/chip:text-brand-red group-hover/chip:border-brand-red/40">
                      <X className="w-2.5 h-2.5" />
                    </span>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>

          <FilterToolbar className="space-y-2.5">
            <FilterToolbarRow>
              <FilterSearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={t("compFinder.searchHeroes")}
                aria-label={t("compFinder.searchHeroes")}
                className="sm:max-w-none sm:flex-1"
              />
              <FilterSelect
                value={selectedCost != null ? String(selectedCost) : "all"}
                onValueChange={(v) => setSelectedCost(v === "all" ? null : Number(v))}
                options={costSelectOptions}
                aria-label={t("compFinder.filterByCost")}
              />
              <FilterClearButton visible={hasFilters} onClick={clearFilters} />
            </FilterToolbarRow>

            <div className="grid grid-cols-2 gap-2">
              <TraitSearchDropdown
                label={t("compFinder.filterRace")}
                placeholder={t("compFinder.allRaces")}
                searchPlaceholder={t("compFinder.searchRacePlaceholder")}
                emptyLabel={t("compFinder.noTraitMatch")}
                traits={races.map((r) => r.name)}
                selected={selectedRace}
                open={raceDropdownOpen}
                onOpenChange={(open) => {
                  setRaceDropdownOpen(open)
                  if (open) setClassDropdownOpen(false)
                }}
                onSelect={setSelectedRace}
              />
              <TraitSearchDropdown
                label={t("compFinder.filterClass")}
                placeholder={t("compFinder.allClasses")}
                searchPlaceholder={t("compFinder.searchClassPlaceholder")}
                emptyLabel={t("compFinder.noTraitMatch")}
                traits={classes.map((c) => c.name)}
                selected={selectedClass}
                open={classDropdownOpen}
                onOpenChange={(open) => {
                  setClassDropdownOpen(open)
                  if (open) setRaceDropdownOpen(false)
                }}
                onSelect={setSelectedClass}
              />
            </div>
          </FilterToolbar>

          <FilterResultMeta
            shown={filteredHeroes.length}
            total={heroes.length - selectedHeroes.length}
            className="px-0.5"
          />

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar pb-4 min-h-0">
            <AnimatePresence mode="popLayout">
              {filteredHeroes.map((hero) => (
                <React.Fragment key={hero.id}>
                <HeroPickerRow
                  hero={hero}
                  disabled={selectedHeroes.length >= MAX_SELECTED}
                  onClick={() => toggleHero(hero.id)}
                />
                </React.Fragment>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </Card>

      <Card className="bg-brand-card border-brand-border p-4 lg:col-span-3 flex flex-col max-h-[800px] shadow-2xl rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold -rotate-12">
          MATCHING
        </div>

        <div className="flex items-center justify-between mb-4 relative z-10 shrink-0">
          <div className="space-y-0.5">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-text-sub">
              {t("compFinder.suggestedComps")}
            </h3>
            <p className="text-[10px] text-brand-text-sub font-medium">
              {t("compFinder.suggestedCompsHint")}
            </p>
          </div>
          <div className="w-10 h-10 bg-brand-gold/5 rounded-xl flex items-center justify-center text-brand-gold border border-brand-gold/10 shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar relative z-10 min-h-0">
          <AnimatePresence mode="popLayout">
            {matchedComps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 bg-brand-bg rounded-xl border border-dashed border-brand-border space-y-3">
                <div className="w-14 h-14 bg-brand-card rounded-full flex items-center justify-center text-brand-text-sub">
                  <Search className="w-7 h-7" />
                </div>
                <p className="text-[11px] font-medium text-brand-text-sub text-center max-w-xs px-4 leading-relaxed">
                  {t("compFinder.emptyAnalysisHint")}
                </p>
              </div>
            ) : (
              matchedComps.map((comp) => (
                <React.Fragment key={comp.id}>
                <MatchedCompCard
                  comp={comp}
                  heroes={heroes}
                  selectedHeroes={selectedHeroes}
                  matchCount={comp.matchCount}
                  matchPercent={comp.matchPercent}
                  t={t}
                />
                </React.Fragment>
              ))
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
    </div>
  )
}

function HeroPickerRow({
  hero,
  disabled,
  onClick,
}: {
  hero: Hero
  disabled: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-xl transition-all border text-left group",
        disabled
          ? "opacity-50 cursor-not-allowed border-transparent bg-brand-card"
          : "border-transparent hover:border-brand-gold/30 bg-brand-card cursor-pointer"
      )}
    >
      <div className="relative shrink-0">
        <HeroIcon hero={hero} size="sm" />
        <div
          className={cn(
            "absolute -top-1 -right-1 px-1 py-0 text-[8px] font-bold z-10",
            heroCostBadgeOverlayClass(hero.cost)
          )}
        >
          ${hero.cost}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-white truncate group-hover:text-brand-gold transition-colors">
          {hero.name}
        </div>
        <div className="text-[10px] font-medium text-brand-text-sub truncate">
          {hero.race.join(", ")} · {hero.class.join(", ")}
        </div>
      </div>
    </motion.button>
  )
}

function MatchedCompCard({
  comp,
  heroes,
  selectedHeroes,
  matchCount,
  matchPercent,
  t,
}: {
  comp: Comp & { matchCount: number; matchPercent: number }
  heroes: Hero[]
  selectedHeroes: string[]
  matchCount: number
  matchPercent: number
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const tierVariant = getTierBadgeVariant(comp.tier)
  const orderedHeroIds = getOrderedCompHeroes(comp, heroes)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-brand-card border border-brand-border rounded-xl p-4 transition-all hover:border-brand-gold/30 shadow-lg group"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-bold text-white tracking-tight group-hover:text-brand-gold transition-colors truncate">
            {comp.name}
          </h4>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            <Badge variant={tierVariant} className="text-[9px] font-bold px-2 py-0 rounded-md">
              {comp.tier} Tier
            </Badge>
            <span className="text-[11px] font-semibold text-brand-gold">{comp.winRate} WIN</span>
            <CompSynergyPills synergies={comp.synergies} max={2} size="sm" />
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[11px] font-bold text-brand-text-sub uppercase tracking-wide">
            {t("compFinder.matchLabel")}
          </div>
          <div className="text-sm font-bold text-brand-gold">
            {matchCount}{" "}
            <span className="text-brand-text-sub font-semibold">/ {comp.heroes.length}</span>
          </div>
          <div className="text-[10px] font-semibold text-brand-text-sub">
            {t("compFinder.matchPercent", { percent: matchPercent })}
          </div>
        </div>
      </div>

      <div className="h-1.5 w-full bg-brand-bg rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gold-gradient rounded-full transition-all"
          style={{ width: `${matchPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mb-4">
        {orderedHeroIds.map((heroId) => {
          const hero = heroes.find((h) => h.id === heroId)
          const isMatched = selectedHeroes.includes(heroId)
          if (!hero) return null
          return (
            <div
              key={heroId}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border shrink-0",
                isMatched
                  ? "ring-2 ring-brand-gold/50 border-brand-gold/40"
                  : "border-brand-border opacity-75"
              )}
              title={hero.name}
            >
              <HeroIcon hero={hero} size="sm" className="w-full h-full rounded-xl" />
              <div className={cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost))} />
              {isMatched && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full z-10" />
              )}
            </div>
          )
        })}
      </div>

      <Link
        to={`/doi-hinh/${comp.id}`}
        className="group/link inline-flex items-center gap-2 text-[11px] font-bold text-white hover:text-brand-gold transition-all uppercase tracking-widest"
      >
        {t("compFinder.exploreDetail")}
        <span className="w-7 h-7 rounded-full bg-brand-card-2 border border-brand-border flex items-center justify-center group-hover/link:bg-gold-gradient group-hover/link:text-black transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </motion.div>
  )
}
