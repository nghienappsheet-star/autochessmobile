import * as React from "react"
import { motion } from "@/components/motion/MotionProvider"
import {
  Shield,
  Sparkles,
  Target,
  AlertTriangle,
  TrendingUp,
  Users,
  RotateCcw,
  Crown,
  X,
  Search,
  ChevronDown,
} from "lucide-react"
import { useTranslation, Trans } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import { Card, Button, Badge, Input } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { heroCostBarClass } from "@/lib/cost-colors"
import { TraitIcon } from "@/components/traits/TraitIcon"
import { BackButton } from "@/components/ui/BackButton"
import { traitBanCost } from "@/lib/ban-cost"
import type { Hero } from "@/types/domain"
import {
  computeBanRecommendations,
  computeContestAnalysis,
  computeMetaForecastDelta,
  computeMetaScenarios,
  computeWinRateProjections,
  type BanPriority,
} from "@/lib/ban-advisor"

const TRAIT_ICONS: Record<string, typeof Shield> = {
  Warrior: Shield,
  Mage: Sparkles,
  Assassin: Target,
  Knight: Shield,
  Hunter: Target,
}

function getTraitIcon(trait: string) {
  return TRAIT_ICONS[trait] ?? Target
}

const PRIORITY_OPTIONS: { id: BanPriority; labelKey: string }[] = [
  { id: "survival", labelKey: "banAdvisor.prioritySurviveShort" },
  { id: "contest", labelKey: "banAdvisor.priorityContestShort" },
  { id: "top1", labelKey: "banAdvisor.priorityTop1Short" },
]

export function BanAdvisorTool() {
  const { t } = useTranslation("tools")
  const { heroes, comps, races, classes } = useAppStore()

  const [selectedTraits, setSelectedTraits] = React.useState<string[]>([])
  const [selectedHeroes, setSelectedHeroes] = React.useState<string[]>([])
  const [mainCore, setMainCore] = React.useState<{ id: string; stars: number }>({
    id: "",
    stars: 3,
  })
  const [priority, setPriority] = React.useState<BanPriority>("survival")
  const [heroSearchTerm, setHeroSearchTerm] = React.useState("")
  const [selectedCost, setSelectedCost] = React.useState<number | null>(null)
  const [raceDropdownOpen, setRaceDropdownOpen] = React.useState(false)
  const [classDropdownOpen, setClassDropdownOpen] = React.useState(false)

  const raceNames = React.useMemo(() => new Set(races.map((r) => r.name)), [races])
  const classNames = React.useMemo(() => new Set(classes.map((c) => c.name)), [classes])

  const activeRaces = React.useMemo(() => {
    const heroRaceNames = new Set<string>()
    heroes.forEach((h) => h.race.forEach((r) => heroRaceNames.add(r)))
    return races.filter((r) => heroRaceNames.has(r.name))
  }, [heroes, races])

  const activeClasses = React.useMemo(() => {
    const heroClassNames = new Set<string>()
    heroes.forEach((h) => h.class.forEach((c) => heroClassNames.add(c)))
    return classes.filter((c) => heroClassNames.has(c.name))
  }, [heroes, classes])

  const selectedRaceTraits = React.useMemo(
    () => selectedTraits.filter((tr) => raceNames.has(tr)),
    [selectedTraits, raceNames]
  )
  const selectedClassTraits = React.useMemo(
    () => selectedTraits.filter((tr) => classNames.has(tr)),
    [selectedTraits, classNames]
  )

  const filteredHeroesByTraits = React.useMemo(() => {
    if (selectedTraits.length === 0) return []
    return heroes.filter(
      (h) =>
        h.race.some((r) => selectedTraits.includes(r)) ||
        h.class.some((c) => selectedTraits.includes(c))
    )
  }, [heroes, selectedTraits])

  const filteredHeroesForPicker = React.useMemo(() => {
    const q = heroSearchTerm.trim().toLowerCase()
    return filteredHeroesByTraits.filter((h) => {
      const matchSearch = !q || h.name.toLowerCase().includes(q)
      const matchCost = selectedCost === null || h.cost === selectedCost
      return matchSearch && matchCost
    })
  }, [filteredHeroesByTraits, heroSearchTerm, selectedCost])

  const toggleTrait = (trait: string) => {
    const next = selectedTraits.includes(trait)
      ? selectedTraits.filter((tr) => tr !== trait)
      : [...selectedTraits, trait]

    setSelectedTraits(next)

    const prunedHeroes = selectedHeroes.filter((id) => {
      const h = heroes.find((hero) => hero.id === id)
      if (!h) return false
      return (
        h.race.some((r) => next.includes(r)) || h.class.some((c) => next.includes(c))
      )
    })
    setSelectedHeroes(prunedHeroes)

    if (!prunedHeroes.includes(mainCore.id)) {
      setMainCore({ id: "", stars: 3 })
    }
  }

  const toggleHero = (heroId: string) => {
    setSelectedHeroes((prev) => {
      const next = prev.includes(heroId)
        ? prev.filter((id) => id !== heroId)
        : [...prev, heroId]
      if (!next.includes(mainCore.id)) {
        setMainCore({ id: "", stars: 3 })
      }
      return next
    })
  }

  const setAsMainCore = (heroId: string) => {
    setMainCore((prev) => ({ id: heroId, stars: prev.id === heroId ? prev.stars : 3 }))
    if (!selectedHeroes.includes(heroId)) {
      setSelectedHeroes((prev) => [...prev, heroId])
    }
  }

  const reset = () => {
    setSelectedTraits([])
    setSelectedHeroes([])
    setMainCore({ id: "", stars: 3 })
    setPriority("survival")
    setHeroSearchTerm("")
    setSelectedCost(null)
    setRaceDropdownOpen(false)
    setClassDropdownOpen(false)
  }

  const isReady = selectedTraits.length > 0 && mainCore.id !== ""

  const results = React.useMemo(() => {
    if (!isReady) return []
    return computeBanRecommendations(
      heroes,
      comps,
      selectedTraits,
      selectedHeroes,
      mainCore.id,
      priority
    )
  }, [heroes, comps, selectedTraits, selectedHeroes, mainCore.id, priority, isReady])

  const winRateData = React.useMemo(
    () => computeWinRateProjections(results, comps, selectedHeroes, heroes),
    [results, comps, selectedHeroes, heroes]
  )

  const contestData = React.useMemo(
    () => computeContestAnalysis(mainCore.id, heroes, comps, results[0]),
    [mainCore.id, heroes, comps, results]
  )

  const metaScenarios = React.useMemo(
    () => computeMetaScenarios(results, comps, heroes),
    [results, comps, heroes]
  )

  const metaDelta = React.useMemo(
    () => computeMetaForecastDelta(results, comps, selectedHeroes, heroes),
    [results, comps, selectedHeroes, heroes]
  )

  const mainHero = heroes.find((h) => h.id === mainCore.id)

  const priorityLabel =
    priority === "survival"
      ? t("banAdvisor.prioritySurviveShort")
      : priority === "contest"
        ? t("banAdvisor.priorityContestShort")
        : t("banAdvisor.priorityTop1Short")

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-4">
      <BackButton to="/cong-cu" />
      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 items-start">
        {/* ── Config panel ── */}
        <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-5 lg:sticky lg:top-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white">{t("banAdvisor.configTitle")}</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="h-9 px-3 rounded-xl text-[11px] font-semibold gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {t("banAdvisor.reban")}
            </Button>
          </div>

          {/* Race / class dropdowns */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-brand-text-sub uppercase tracking-widest">
              {t("banAdvisor.stepRaceClass")}
            </label>

            <TraitMultiSelectDropdown
              label={t("banAdvisor.raceCollection")}
              placeholder={t("banAdvisor.selectRacePlaceholder")}
              searchPlaceholder={t("banAdvisor.searchRacePlaceholder")}
              emptyLabel={t("banAdvisor.noTraitMatch")}
              selectedLabel={t("banAdvisor.racesSelected", { count: selectedRaceTraits.length })}
              traits={activeRaces.map((r) => ({
                id: r.id,
                name: r.name,
                icon: r.icon,
                iconUrl: r.iconUrl,
              }))}
              selected={selectedRaceTraits}
              open={raceDropdownOpen}
              onOpenChange={(open) => {
                setRaceDropdownOpen(open)
                if (open) setClassDropdownOpen(false)
              }}
              onToggle={toggleTrait}
              heroes={heroes}
              heroCountLabel={(count) => t("banAdvisor.banCostShort", { count })}
            />

            <TraitMultiSelectDropdown
              label={t("banAdvisor.classCollection")}
              placeholder={t("banAdvisor.selectClassPlaceholder")}
              searchPlaceholder={t("banAdvisor.searchClassPlaceholder")}
              emptyLabel={t("banAdvisor.noTraitMatch")}
              selectedLabel={t("banAdvisor.classesSelected", { count: selectedClassTraits.length })}
              traits={activeClasses.map((c) => ({
                id: c.id,
                name: c.name,
                icon: c.icon,
                iconUrl: c.iconUrl,
              }))}
              selected={selectedClassTraits}
              open={classDropdownOpen}
              onOpenChange={(open) => {
                setClassDropdownOpen(open)
                if (open) setRaceDropdownOpen(false)
              }}
              onToggle={toggleTrait}
              heroes={heroes}
              heroCountLabel={(count) => t("banAdvisor.banCostShort", { count })}
            />

            {selectedTraits.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {selectedRaceTraits.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedRaceTraits.map((trait) => (
                      <Badge
                        key={trait}
                        variant="yellow-solid"
                        className="rounded-md text-[10px] font-bold cursor-pointer gap-1 pr-1.5"
                        onClick={() => toggleTrait(trait)}
                      >
                        {trait}
                        <X className="w-3 h-3 opacity-70" />
                      </Badge>
                    ))}
                  </div>
                )}
                {selectedClassTraits.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedClassTraits.map((trait) => (
                      <Badge
                        key={trait}
                        variant="secondary"
                        className="rounded-md text-[10px] font-bold cursor-pointer gap-1 pr-1.5"
                        onClick={() => toggleTrait(trait)}
                      >
                        {trait}
                        <X className="w-3 h-3 opacity-70" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hero picker */}
          {selectedTraits.length > 0 && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-brand-text-sub uppercase tracking-widest">
                {t("banAdvisor.stepHeroes")}
                <span className="ml-2 text-brand-gold normal-case tracking-normal font-semibold">
                  {selectedHeroes.length}
                </span>
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" />
                <Input
                  placeholder={t("banAdvisor.searchHeroPlaceholder")}
                  value={heroSearchTerm}
                  onChange={(e) => setHeroSearchTerm(e.target.value)}
                  className="bg-brand-card-2 border-brand-border pl-10 h-10 text-sm rounded-xl"
                  aria-label={t("banAdvisor.searchHeroPlaceholder")}
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
                  {t("banAdvisor.filterCost")}
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((cost) => (
                    <button
                      key={cost}
                      type="button"
                      aria-pressed={selectedCost === cost}
                      onClick={() => setSelectedCost(selectedCost === cost ? null : cost)}
                      className={cn(
                        "flex-1 h-8 rounded-lg border text-[11px] font-bold transition-all",
                        selectedCost === cost
                          ? "bg-gold-gradient text-black border-transparent"
                          : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-white"
                      )}
                    >
                      ${cost}
                    </button>
                  ))}
                </div>
              </div>

              {filteredHeroesForPicker.length === 0 ? (
                <p className="text-[11px] text-brand-text-sub text-center py-4">
                  {t("banAdvisor.noHeroMatch")}
                </p>
              ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {filteredHeroesForPicker.map((h) => {
                  const isSelected = selectedHeroes.includes(h.id)
                  const isCore = mainCore.id === h.id
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => toggleHero(h.id)}
                      onDoubleClick={() => setAsMainCore(h.id)}
                      className={cn(
                        "relative rounded-xl border p-2 flex flex-col items-center gap-1 transition-all text-center",
                        isSelected
                          ? "bg-brand-gold/10 border-brand-gold"
                          : "bg-brand-card-2 border-brand-border hover:border-brand-text-sub"
                      )}
                    >
                      {isCore && (
                        <Crown className="absolute top-1 right-1 w-3 h-3 text-brand-gold" aria-hidden />
                      )}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center text-[9px] font-bold text-white relative overflow-hidden",
                          isSelected ? "ring-1 ring-brand-gold" : ""
                        )}
                      >
                        <div className={cn("absolute inset-0", heroCostBarClass(h.cost))} />
                        <span className="relative z-10">{h.name.substring(0, 2)}</span>
                      </div>
                      <span
                        className={cn(
                          "text-[9px] font-bold leading-tight line-clamp-2",
                          isSelected ? "text-brand-gold" : "text-brand-text-sub"
                        )}
                      >
                        {h.name}
                      </span>
                    </button>
                  )
                })}
              </div>
              )}
              <p className="text-[10px] text-brand-text-sub">{t("banAdvisor.coreDoubleClickHint")}</p>
            </div>
          )}

          {/* Core + stars */}
          {selectedHeroes.length > 0 && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-brand-text-sub uppercase tracking-widest">
                {t("banAdvisor.mainCore")}
              </label>
              <div className="space-y-2">
                {selectedHeroes.map((hId) => {
                  const h = heroes.find((hero) => hero.id === hId)
                  const isMain = mainCore.id === hId
                  return (
                    <div
                      key={hId}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-xl border transition-all",
                        isMain
                          ? "bg-brand-gold/10 border-brand-gold"
                          : "bg-brand-card-2 border-brand-border"
                      )}
                    >
                      <button
                        type="button"
                        aria-label={t("banAdvisor.setMainCore", { name: h?.name ?? "" })}
                        onClick={() => setAsMainCore(hId)}
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                          isMain
                            ? "bg-brand-gold text-black border-brand-gold"
                            : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white"
                        )}
                      >
                        <Crown className="w-3.5 h-3.5" />
                      </button>
                      <span
                        className={cn(
                          "text-[12px] font-bold flex-1 truncate",
                          isMain ? "text-brand-gold" : "text-white"
                        )}
                      >
                        {h?.name}
                      </span>
                      {isMain && (
                        <div className="flex gap-1 shrink-0">
                          {[1, 2, 3].map((s) => (
                            <button
                              key={s}
                              type="button"
                              aria-label={`${s} stars`}
                              onClick={() => setMainCore({ id: hId, stars: s })}
                              className={cn(
                                "w-7 h-7 rounded-lg text-[10px] font-bold border transition-all",
                                mainCore.stars === s
                                  ? "bg-brand-gold text-black border-brand-gold"
                                  : "bg-brand-card text-brand-text-sub border-brand-border"
                              )}
                            >
                              {s}★
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Priority segmented control */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-brand-text-sub uppercase tracking-widest">
              {t("banAdvisor.stepPriority")}
            </label>
            <div className="flex rounded-xl border border-brand-border overflow-hidden">
              {PRIORITY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPriority(opt.id)}
                  className={cn(
                    "flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all",
                    priority === opt.id
                      ? "bg-gold-gradient text-black"
                      : "bg-brand-card-2 text-brand-text-sub hover:text-white"
                  )}
                >
                  {t(opt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Summary footer */}
          <div className="pt-2 border-t border-brand-border text-[11px] text-brand-text-sub font-medium">
            {isReady ? (
              <span className="text-brand-green">
                {t("banAdvisor.readyHint", {
                  heroes: selectedHeroes.length,
                  core: mainHero?.name ?? "",
                })}
              </span>
            ) : selectedTraits.length === 0 ? (
              t("banAdvisor.filterHint")
            ) : (
              t("banAdvisor.traitsSelected", { count: selectedTraits.length })
            )}
          </div>
        </Card>

        {/* ── Live results ── */}
        <div className="space-y-6 min-w-0">
          {!isReady ? (
            <Card className="bg-brand-card border-brand-border rounded-xl p-12 flex flex-col items-center justify-center text-center gap-4">
              <Target className="w-12 h-12 text-brand-text-sub opacity-40" />
              <p className="text-sm text-brand-text-sub max-w-sm">{t("banAdvisor.emptyResultsHint")}</p>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary */}
              <Card className="bg-brand-card border-brand-border p-6 rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <SummaryCell
                    label={t("banAdvisor.optimalLineup")}
                    value={selectedTraits.join(", ")}
                  />
                  <SummaryCell
                    label={t("banAdvisor.mainCore")}
                    value={
                      <>
                        {mainHero?.name}
                        <span className="text-brand-gold/60 text-xs ml-1">
                          {Array.from({ length: mainCore.stars }, (_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </span>
                      </>
                    }
                    highlight
                  />
                  <SummaryCell label={t("banAdvisor.priorityGoal")} value={priorityLabel} />
                  <SummaryCell
                    label={t("banAdvisor.metaForecast")}
                    value={
                      <span className="text-brand-green flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {t("banAdvisor.metaForecastWin", { delta: metaDelta })}
                      </span>
                    }
                  />
                </div>
              </Card>

              {/* Ban recommendations */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Target className="w-5 h-5 text-brand-gold" />
                  <div>
                    <h3 className="text-base font-bold text-white">{t("banAdvisor.suggestedBan")}</h3>
                    <p className="text-[10px] text-brand-text-sub">{t("banAdvisor.basedOnMeta")}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {results.map((res, i) => {
                    const TraitIcon = getTraitIcon(res.trait)
                    return (
                      <Card
                        key={res.id}
                        className={cn(
                          "bg-brand-card border-brand-border p-5 rounded-xl relative overflow-hidden",
                          i === 0 && "border-brand-gold ring-1 ring-brand-gold/20"
                        )}
                      >
                        {i === 0 && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold" />
                        )}
                        <div className="flex justify-between items-start mb-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center",
                              i === 0 ? "bg-brand-gold text-black" : "bg-brand-card-2 text-white"
                            )}
                          >
                            <TraitIcon className="w-5 h-5" />
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] font-bold text-brand-text-sub uppercase tracking-widest">
                              {t("banAdvisor.recommendedLevel")}
                            </div>
                            <div className="text-xl font-bold text-brand-gold">{res.efficiency}%</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-1">
                              {t("banAdvisor.banTrait")}
                            </div>
                            <div className="text-2xl font-bold text-white">{res.trait}</div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Users className="w-3 h-3 text-brand-gold" />
                              <span className="text-[10px] font-bold text-brand-text-sub">
                                {t("banAdvisor.goldCost", { count: res.cost })}
                              </span>
                            </div>
                          </div>
                          <p className="text-[12px] text-brand-text-sub leading-relaxed line-clamp-3">
                            {res.reason}
                          </p>
                          <div>
                            <div className="text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-2">
                              {t("banAdvisor.poolManipulation", { count: res.removed.length })}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {res.removed.slice(0, 6).map((name) => (
                                <Badge
                                  key={name}
                                  variant="secondary"
                                  className="rounded-md text-[8px] font-bold px-2 py-0.5"
                                >
                                  {name}
                                </Badge>
                              ))}
                              {res.removed.length > 6 && (
                                <Badge variant="secondary" className="rounded-md text-[8px] font-bold">
                                  +{res.removed.length - 6}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Win-rate + Contest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-brand-gold" />
                    <h4 className="text-sm font-bold text-white">{t("banAdvisor.winRateAnalysis")}</h4>
                  </div>
                  <div className="space-y-3">
                    {winRateData.map((p) => (
                      <div key={p.trait} className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className="text-brand-text-sub truncate mr-2">{p.label}</span>
                          <span className="text-white shrink-0">
                            {p.projected}% (+{p.projected - p.current}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-brand-card-2 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.projected}%` }}
                            className={cn(
                              "h-full rounded-full",
                              p.trait === results[0]?.trait ? "bg-brand-gold" : "bg-white/20"
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-4 h-4 text-brand-red" />
                    <h4 className="text-sm font-bold text-white">{t("banAdvisor.contestAnalysis")}</h4>
                  </div>
                  {contestData && (
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-brand-card-2 border border-brand-border rounded-xl">
                        <Users className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                        <div className="space-y-1 min-w-0">
                          <div className="text-[12px] font-bold text-white">
                            {t("banAdvisor.contestPlayers", { count: contestData.contestPlayers })}
                          </div>
                          <p className="text-[11px] text-brand-text-sub leading-relaxed">
                            <Trans
                              i18nKey="banAdvisor.contestPoolHint"
                              ns="tools"
                              values={{
                                hero: contestData.coreHeroName,
                                trait: contestData.suggestedBanTrait,
                                poolCount: contestData.poolHeroCount,
                              }}
                              components={{ 1: <span className="text-brand-gold font-bold" /> }}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-xl text-center">
                          <div className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mb-1">
                            {t("banAdvisor.contestReduction")}
                          </div>
                          <div className="text-xl font-bold text-brand-gold">
                            -{Math.round(contestData.contestReduction)}%
                          </div>
                        </div>
                        <div className="p-3 bg-brand-card-2 border border-brand-border rounded-xl text-center">
                          <div className="text-[9px] font-bold text-brand-text-sub uppercase tracking-widest mb-1">
                            {t("banAdvisor.banDifficulty")}
                          </div>
                          <div className="text-xl font-bold text-white">
                            Lv.{contestData.banDifficulty}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>

              {/* Meta simulator */}
              {metaScenarios.length > 0 && (
                <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t("banAdvisor.simulatorTitle")}</h4>
                    <p className="text-[10px] text-brand-text-sub mt-0.5">
                      {t("banAdvisor.simulatorSubtitle")}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {metaScenarios.map((scenario, idx) => (
                      <div
                        key={scenario.banTrait}
                        className={cn(
                          "p-4 bg-brand-card-2 rounded-xl border space-y-3",
                          idx === 0 ? "border-brand-gold/20" : "border-brand-border"
                        )}
                      >
                        <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">
                          {t("banAdvisor.scenarioBan", { trait: scenario.banTrait.toUpperCase() })}
                        </div>
                        {scenario.topTraits.map((row) => (
                          <div key={row.trait} className="flex justify-between text-[11px] font-bold">
                            <span className="text-white">{row.trait}</span>
                            <span className={idx === 0 ? "text-brand-gold" : "text-brand-text-sub"}>
                              {t("banAdvisor.metaShare", { percent: row.metaPercent })}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function TraitMultiSelectDropdown({
  label,
  placeholder,
  searchPlaceholder,
  emptyLabel,
  selectedLabel,
  traits,
  selected,
  open,
  onOpenChange,
  onToggle,
  heroes,
  heroCountLabel,
}: {
  label: string
  placeholder: string
  searchPlaceholder: string
  emptyLabel: string
  selectedLabel: string
  traits: { id: string; name: string; icon: string; iconUrl?: string }[]
  selected: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggle: (trait: string) => void
  heroes: Hero[]
  heroCountLabel: (count: number) => string
}) {
  const [searchTerm, setSearchTerm] = React.useState("")

  React.useEffect(() => {
    if (!open) setSearchTerm("")
  }, [open])

  const filteredTraits = React.useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return traits
    return traits.filter((trait) => trait.name.toLowerCase().includes(q))
  }, [traits, searchTerm])

  return (
    <div className="space-y-1.5">
      <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
        {label}
      </div>
      <div className="relative">
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={label}
          onClick={() => onOpenChange(!open)}
          className="w-full flex items-center justify-between bg-brand-card-2 border border-brand-border rounded-xl px-4 py-3 hover:border-brand-text-sub transition-colors text-left"
        >
          <span className="text-[13px] font-semibold text-white truncate mr-2">
            {selected.length === 0 ? placeholder : selectedLabel}
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-brand-text-sub transition-transform shrink-0",
              open && "rotate-180"
            )}
          />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => onOpenChange(false)}
              aria-hidden
            />
            <div className="absolute top-full left-0 w-full mt-2 bg-brand-card-2 border border-brand-border rounded-xl shadow-2xl z-20 overflow-hidden">
              <div className="p-2 border-b border-brand-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="bg-brand-card border-brand-border pl-9 h-9 text-[12px] rounded-lg"
                    aria-label={searchPlaceholder}
                    autoFocus
                  />
                </div>
              </div>
              <div
                role="listbox"
                aria-label={label}
                className="max-h-44 overflow-y-auto custom-scrollbar p-2 space-y-1"
              >
                {filteredTraits.length === 0 ? (
                  <p className="text-[11px] text-brand-text-sub text-center py-3">{emptyLabel}</p>
                ) : (
                  filteredTraits.map((trait) => {
                    const count = traitBanCost(trait.name, heroes)
                    return (
                      <React.Fragment key={trait.name}>
                      <TraitCheckboxRow
                        trait={trait.name}
                        traitId={trait.id}
                        icon={trait.icon}
                        iconUrl={trait.iconUrl}
                        subLabel={heroCountLabel(count)}
                        checked={selected.includes(trait.name)}
                        onToggle={() => onToggle(trait.name)}
                      />
                      </React.Fragment>
                    )
                  })
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function TraitCheckboxRow({
  trait,
  traitId,
  icon,
  iconUrl: _iconUrl,
  subLabel,
  checked,
  onToggle,
}: {
  trait: string
  traitId: string
  icon?: string
  iconUrl?: string
  subLabel?: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={checked}
      onClick={onToggle}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all text-[12px] font-semibold",
        checked ? "bg-brand-gold/10 text-brand-gold" : "text-white hover:bg-brand-card"
      )}
    >
      <span
        className={cn(
          "w-4 h-4 rounded border flex items-center justify-center shrink-0",
          checked ? "bg-brand-gold border-brand-gold text-black" : "border-brand-border"
        )}
      >
        {checked && <span className="text-[10px] font-bold">✓</span>}
      </span>
      {(traitId || icon) && (
        <TraitIcon
          id={traitId}
          icon={icon ?? "❓"}
          name={trait}
          size="xs"
        />
      )}
      <span className="flex-1 min-w-0 truncate">{trait}</span>
      {subLabel && (
        <span className="text-[10px] font-medium text-brand-text-sub shrink-0">{subLabel}</span>
      )}
    </button>
  )
}

function SummaryCell({
  label,
  value,
  highlight,
}: {
  label: string
  value: React.ReactNode
  highlight?: boolean
}) {
  return (
    <div className="space-y-1 min-w-0">
      <div className="text-[9px] font-bold text-brand-text-sub uppercase tracking-widest">{label}</div>
      <div
        className={cn(
          "text-sm font-bold truncate",
          highlight ? "text-brand-gold" : "text-white"
        )}
      >
        {value}
      </div>
    </div>
  )
}
