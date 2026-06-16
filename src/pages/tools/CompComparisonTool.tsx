import * as React from "react"
import { Link } from "react-router-dom"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card, Badge, Input, Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "@/components/ui/core"
import { Search, Plus, X, ChevronLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"
import {
  computeCompRadarStats,
  getCompDifficulty,
  getCompLateGame,
  getCompTop4,
} from "@/lib/comp-stats"
import { CompSynergyPills } from "@/components/comps/CompSynergyPills"
import { getOrderedCompHeroes } from "@/lib/comp-formation"
import { MAX_COMPARE_ITEMS } from "@/components/layout/CompareTray"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import type { Comp, CompRadarStats, Hero } from "@/types/domain"

import { getTierBadgeVariant, getTierRank } from "@/lib/tier-utils"
import { parseWinRate } from "@/lib/comp-stats"
import { useCompareIdsFromUrl } from "@/hooks/useCompareIdsFromUrl"

const COMP_ACCENTS = ["#F5B43C", "#4D96F0", "#3FB950"] as const

const RADAR_AXIS_KEYS: (keyof CompRadarStats)[] = [
  "attack",
  "defense",
  "control",
  "difficulty",
  "economy",
  "lateGame",
]

const RADAR_LABEL_KEYS: Record<keyof CompRadarStats, string> = {
  attack: "attack",
  defense: "defense",
  control: "control",
  difficulty: "difficulty",
  economy: "econ",
  lateGame: "lateGame",
}

type CompareMode = "max" | "min" | "tier" | "none"

type AttrRowConfig = {
  id: string
  labelKey: string
  compare: CompareMode
  getNumeric: (comp: Comp, heroes: Hero[]) => number
  format: (comp: Comp, heroes: Hero[]) => string
}

function getWinRateValue(str: string) {
  return parseWinRate(str)
}

function getCompHeroesByCost(comp: Comp, heroes: Hero[]): Hero[] {
  const heroMap = new Map(heroes.map((h) => [h.id, h]))
  const orderedIds = getOrderedCompHeroes(comp, heroes)
  return orderedIds
    .map((id) => heroMap.get(id))
    .filter((h): h is Hero => Boolean(h))
    .sort((a, b) => b.cost - a.cost)
}

function getAvgHeroCost(comp: Comp, heroes: Hero[]): number {
  const roster = getCompHeroesByCost(comp, heroes)
  if (roster.length === 0) return 0
  const sum = roster.reduce((s, h) => s + h.cost, 0)
  return Math.round((sum / roster.length) * 10) / 10
}

function getBestIndex(values: number[], mode: CompareMode): number | null {
  if (mode === "none" || values.length < 2) return null
  const target =
    mode === "min" ? Math.min(...values) : Math.max(...values)
  const indices = values
    .map((v, i) => (v === target ? i : -1))
    .filter((i) => i >= 0)
  return indices.length === 1 ? indices[0]! : null
}

type CompColumn = {
  comp: Comp
  index: number
  accent: string
  heroesSorted: Hero[]
  radar: CompRadarStats
}

function CompPickerDialog({
  open,
  onOpenChange,
  searchTerm,
  onSearchChange,
  filteredComps,
  onPick,
  title,
  searchPlaceholder,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchTerm: string
  onSearchChange: (v: string) => void
  filteredComps: Comp[]
  onPick: (id: string) => void
  title: string
  searchPlaceholder: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-card-2 border-brand-border w-full max-w-2xl h-auto min-h-[400px] lg:h-[700px] flex flex-col overflow-hidden p-0">
        <DialogHeader className="p-6 border-b border-brand-border bg-brand-card">
          <DialogTitle className="font-bold text-brand-text-main text-left">{title}</DialogTitle>
        </DialogHeader>
        <div className="p-6 bg-brand-card border-b border-brand-border">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-text-sub" />
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-brand-bg border-brand-border pl-12 h-14 rounded-xl text-lg focus:ring-1 focus:ring-brand-gold/30"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-brand-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredComps.map((comp) => {
              const tierVariant = getTierBadgeVariant(comp.tier)
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => onPick(comp.id)}
                  className="flex flex-col gap-2 p-5 bg-brand-card border border-transparent hover:border-brand-gold/40 rounded-xl cursor-pointer transition-all group text-left"
                >
                  <div className="flex justify-between items-start">
                    <Badge variant={tierVariant} className="text-[10px] px-1.5 py-0">
                      {comp.tier} Tier
                    </Badge>
                    <div className="text-[12px] font-bold text-brand-gold">{comp.winRate}</div>
                  </div>
                  <div className="text-[15px] font-bold text-brand-text-main group-hover:text-brand-gold transition-colors">
                    {comp.name}
                  </div>
                  <div className="text-[10px] font-medium text-brand-text-sub truncate">{comp.author}</div>
                </button>
              )
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CompareAttributeTable({
  columns,
  heroes,
  t,
}: {
  columns: CompColumn[]
  heroes: Hero[]
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const attrRows: AttrRowConfig[] = [
    {
      id: "tier",
      labelKey: "tier",
      compare: "tier",
      getNumeric: (comp) => getTierRank(comp.tier),
      format: (comp) => `${comp.tier} Tier`,
    },
    {
      id: "winrate",
      labelKey: "winrate",
      compare: "max",
      getNumeric: (comp) => getWinRateValue(comp.winRate),
      format: (comp) => comp.winRate,
    },
    {
      id: "top4",
      labelKey: "top4",
      compare: "max",
      getNumeric: (comp) => getCompTop4(comp),
      format: (comp) => `${getCompTop4(comp)}%`,
    },
    {
      id: "difficulty",
      labelKey: "difficulty",
      compare: "min",
      getNumeric: (comp) => getCompDifficulty(comp),
      format: (comp) => `${getCompDifficulty(comp)}/10`,
    },
    {
      id: "lateGame",
      labelKey: "lateGame",
      compare: "max",
      getNumeric: (comp) => getCompLateGame(comp),
      format: (comp) => `${getCompLateGame(comp)} pts`,
    },
    {
      id: "unitCount",
      labelKey: "unitCount",
      compare: "none",
      getNumeric: (comp) => comp.heroes.length,
      format: (comp) => String(comp.heroes.length),
    },
    {
      id: "avgCost",
      labelKey: "avgCost",
      compare: "min",
      getNumeric: (comp) => getAvgHeroCost(comp, heroes),
      format: (comp) => `$${getAvgHeroCost(comp, heroes)}`,
    },
  ]

  const colCount = columns.length

  return (
    <Card className="bg-brand-card border-brand-border rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-brand-border">
        <h4 className="text-sm font-bold text-brand-text-main">{t("compCompare.statAnalysis")}</h4>
      </div>
      <div className="overflow-x-auto">
        <div
          className="min-w-[320px]"
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(100px, 120px) repeat(${colCount}, minmax(0, 1fr))`,
          }}
        >
          {attrRows.map((row) => {
            const numerics = columns.map(({ comp }) => row.getNumeric(comp, heroes))
            const bestIdx = getBestIndex(numerics, row.compare)

            return (
              <React.Fragment key={row.id}>
                <div className="px-4 py-3 text-[11px] font-semibold text-brand-text-sub border-b border-brand-border bg-brand-card-2/50 flex items-center">
                  {t(`compCompare.${row.labelKey}`)}
                </div>
                {columns.map(({ comp, accent }, colIdx) => {
                  const isBest = bestIdx === colIdx
                  return (
                    <div
                      key={`${row.id}-${comp.id}`}
                      className={cn(
                        "px-4 py-3 text-[13px] font-bold text-center border-b border-brand-border flex items-center justify-center",
                        isBest
                          ? "text-brand-gold bg-brand-gold/10"
                          : "text-brand-text-sub bg-brand-card"
                      )}
                      style={isBest ? { boxShadow: `inset 0 -2px 0 ${accent}` } : undefined}
                    >
                      {row.format(comp, heroes)}
                    </div>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

function CompareRadarOverlay({
  columns,
  t,
}: {
  columns: CompColumn[]
  t: (key: string) => string
}) {
  const radarData = React.useMemo(() => {
    return RADAR_AXIS_KEYS.map((axisKey) => {
      const labelKey = RADAR_LABEL_KEYS[axisKey]
      const row: Record<string, string | number> = {
        subject: t(`pages:compDetail.radar.${labelKey}`),
      }
      columns.forEach(({ comp, radar }) => {
        row[comp.id] = radar[axisKey]
      })
      return row
    })
  }, [columns, t])

  return (
    <Card className="bg-brand-card border-brand-border p-4 md:p-6 rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="text-sm font-bold text-brand-text-main">{t("compCompare.radarTitle")}</h4>
        <div className="flex flex-wrap gap-3">
          {columns.map(({ comp, accent }) => (
            <div key={comp.id} className="flex items-center gap-2 text-[11px] font-semibold text-brand-text-sub">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <span className="truncate max-w-[120px]">{comp.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-[280px] md:min-h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#8A8F98", fontSize: 10, fontWeight: 600 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            {columns.map(({ comp, accent }) => (
              <Radar
                key={comp.id}
                name={comp.name}
                dataKey={comp.id}
                stroke={accent}
                fill={accent}
                fillOpacity={0.12}
                strokeWidth={2}
              />
            ))}
            <Legend wrapperStyle={{ display: "none" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function ContestedHeroesSection({
  columns,
  heroes,
  t,
}: {
  columns: CompColumn[]
  heroes: Hero[]
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const heroMap = new Map(heroes.map((h) => [h.id, h]))

  const contested = React.useMemo(() => {
    const countByHero = new Map<string, Set<number>>()
    columns.forEach(({ comp, index }) => {
      comp.heroes.forEach((heroId) => {
        if (!countByHero.has(heroId)) countByHero.set(heroId, new Set())
        countByHero.get(heroId)!.add(index)
      })
    })
    return [...countByHero.entries()]
      .filter(([, indices]) => indices.size >= 2)
      .map(([heroId, indices]) => ({
        hero: heroMap.get(heroId),
        compIndices: [...indices],
      }))
      .filter((x): x is { hero: Hero; compIndices: number[] } => Boolean(x.hero))
      .sort((a, b) => b.hero.cost - a.hero.cost)
  }, [columns, heroMap])

  return (
    <Card className="bg-brand-card border-brand-border p-4 md:p-6 rounded-xl">
      <h4 className="text-sm font-bold text-brand-text-main mb-3">{t("compCompare.contestedTitle")}</h4>
      {contested.length === 0 ? (
        <p className="text-[13px] text-brand-text-sub">{t("compCompare.contestedEmpty")}</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {contested.map(({ hero, compIndices }) => (
            <div
              key={hero.id}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-brand-card-2 border border-brand-border"
            >
              <HeroIcon hero={hero} size="sm" />
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-brand-text-main truncate">{hero.name}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {compIndices.map((idx) => (
                    <span
                      key={idx}
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: COMP_ACCENTS[idx] ?? COMP_ACCENTS[0] }}
                      title={columns[idx]?.comp.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

function VerdictSection({
  columns,
  t,
}: {
  columns: CompColumn[]
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const stats = columns.map(({ comp }) => ({
    comp,
    winRate: getWinRateValue(comp.winRate),
    difficulty: getCompDifficulty(comp),
    lateGame: getCompLateGame(comp),
  }))

  const winBest = [...stats].sort((a, b) => b.winRate - a.winRate)[0]
  const easyBest = [...stats].sort((a, b) => a.difficulty - b.difficulty)[0]
  const lateBest = [...stats].sort((a, b) => b.lateGame - a.lateGame)[0]

  const verdicts = [
    winBest && {
      key: "win",
      text: t("compCompare.verdictWinRate", {
        name: winBest.comp.name,
        value: winBest.comp.winRate,
      }),
      compIndex: columns.findIndex((c) => c.comp.id === winBest.comp.id),
    },
    easyBest && {
      key: "easy",
      text: t("compCompare.verdictEasiest", { name: easyBest.comp.name }),
      compIndex: columns.findIndex((c) => c.comp.id === easyBest.comp.id),
    },
    lateBest && {
      key: "late",
      text: t("compCompare.verdictLateGame", { name: lateBest.comp.name }),
      compIndex: columns.findIndex((c) => c.comp.id === lateBest.comp.id),
    },
  ].filter(Boolean) as { key: string; text: string; compIndex: number }[]

  return (
    <Card className="bg-brand-card border-brand-border p-4 md:p-6 rounded-xl">
      <h4 className="text-sm font-bold text-brand-text-main mb-4">{t("compCompare.verdictTitle")}</h4>
      <ul className="space-y-3">
        {verdicts.map(({ key, text, compIndex }) => (
          <li key={key} className="flex items-start gap-3 text-[13px] text-brand-text-sub leading-relaxed">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
              style={{ backgroundColor: COMP_ACCENTS[compIndex] ?? COMP_ACCENTS[0] }}
            />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export function CompComparisonTool() {
  const { t } = useTranslation(["tools", "pages"])
  const { comps, heroes } = useAppStore()

  const defaultIds = React.useMemo(
    () => [comps[0]?.id, comps[1]?.id].filter(Boolean) as string[],
    [comps]
  )

  const { selectedIds, selectedItems: selectedComps, setSelectedIds, syncUrl } = useCompareIdsFromUrl(
    comps,
    { minSyncCount: 2, fallbackIds: defaultIds }
  )

  const updateSelection = React.useCallback(
    (ids: string[]) => {
      const trimmed = ids.slice(0, MAX_COMPARE_ITEMS)
      setSelectedIds(trimmed)
      syncUrl(trimmed)
    },
    [setSelectedIds, syncUrl]
  )

  const columns: CompColumn[] = selectedComps.map((comp, index) => ({
    comp,
    index,
    accent: COMP_ACCENTS[index] ?? COMP_ACCENTS[0],
    heroesSorted: getCompHeroesByCost(comp, heroes),
    radar: computeCompRadarStats(comp, heroes),
  }))

  const [showSelect, setShowSelect] = React.useState<number | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  const handlePickComp = (compId: string) => {
    if (showSelect === null) return
    const next = [...selectedIds]
    if (showSelect < next.length) {
      next[showSelect] = compId
    } else if (next.length < MAX_COMPARE_ITEMS && !next.includes(compId)) {
      next.push(compId)
    } else if (!next.includes(compId)) {
      next[next.length - 1] = compId
    }
    const unique = next.filter((id, idx, arr) => arr.indexOf(id) === idx)
    updateSelection(unique)
    setShowSelect(null)
    setSearchTerm("")
  }

  const removeComp = (index: number) => {
    updateSelection(selectedIds.filter((_, i) => i !== index))
  }

  const filteredComps = comps.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const gridClass = cn(
    "grid gap-3 md:gap-4",
    columns.length === 1 && "grid-cols-1",
    columns.length === 2 && "grid-cols-2",
    columns.length >= 3 && "grid-cols-2 lg:grid-cols-3"
  )

  return (
    <div className="pb-20 max-w-6xl mx-auto px-4 space-y-6">
      <Link
        to="/doi-hinh"
        className="inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("pages:compDetail.backToList")}
      </Link>

      <CompPickerDialog
        open={showSelect !== null}
        onOpenChange={(open) => !open && setShowSelect(null)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filteredComps={filteredComps}
        onPick={handlePickComp}
        title={t("compCompare.pickComps")}
        searchPlaceholder={t("compCompare.searchPlaceholder")}
      />

      {/* Sticky column headers */}
      <div className="sticky top-0 z-20 -mx-4 px-4 py-3 bg-brand-bg/95 backdrop-blur-xl border-b border-brand-border">
        <div className={cn(gridClass, columns.length < MAX_COMPARE_ITEMS && "lg:grid-cols-3")}>
          {columns.map(({ comp, index, accent, heroesSorted }) => {
            const tierVariant = getTierBadgeVariant(comp.tier)
            return (
              <Card
                key={comp.id}
                className="bg-brand-card border-brand-border p-4 rounded-xl relative overflow-hidden"
                style={{ borderTopWidth: 3, borderTopColor: accent }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: accent }}
                    />
                    <Badge variant={tierVariant} className="text-[9px] px-1.5 py-0 shrink-0">
                      {comp.tier}
                    </Badge>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowSelect(index)}
                      className="p-1.5 rounded-lg border border-brand-border bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-colors"
                      aria-label={t("compCompare.changeComp")}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    {columns.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeComp(index)}
                        className="p-1.5 rounded-lg border border-brand-border bg-brand-card-2 text-brand-text-sub hover:text-brand-red transition-colors"
                        aria-label={t("compCompare.removeComp")}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-bold text-brand-text-main tracking-tight leading-tight mb-1 truncate">
                  {comp.name}
                </h3>
                <div className="text-xl md:text-2xl font-bold text-brand-gold mb-1">{comp.winRate}</div>
                <p className="text-[10px] text-brand-text-sub truncate mb-3">
                  {t("compCompare.artisan")}: {comp.author}
                </p>

                <div className="flex flex-wrap gap-1 mb-2">
                  {heroesSorted.map((hero) => (
                    <div key={hero.id} className="relative">
                      <HeroIcon hero={hero} size="sm" className="w-9 h-9" />
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 text-[8px] font-bold px-0.5 rounded",
                          heroCostBadgeOverlayClass(hero.cost)
                        )}
                      >
                        ${hero.cost}
                      </span>
                    </div>
                  ))}
                </div>
                <CompSynergyPills synergies={comp.synergies} max={3} size="sm" />
              </Card>
            )
          })}

          {columns.length < MAX_COMPARE_ITEMS && (
            <button
              type="button"
              onClick={() => setShowSelect(columns.length)}
              className="min-h-[140px] rounded-xl border-2 border-dashed border-brand-border bg-brand-card/30 hover:border-brand-gold/40 hover:bg-brand-card transition-all flex flex-col items-center justify-center gap-2 text-brand-text-sub hover:text-brand-gold col-span-2 lg:col-span-1"
            >
              <Plus className="w-6 h-6" />
              <span className="text-xs font-semibold">{t("compCompare.addComp")}</span>
            </button>
          )}
        </div>
      </div>

      {columns.length >= 2 ? (
        <div className="space-y-4 md:space-y-6">
          <CompareRadarOverlay columns={columns} t={t} />
          <CompareAttributeTable columns={columns} heroes={heroes} t={t} />
          <ContestedHeroesSection columns={columns} heroes={heroes} t={t} />
          <VerdictSection columns={columns} t={t} />
        </div>
      ) : (
        <Card className="p-8 bg-brand-card border-brand-border text-center rounded-xl">
          <p className="text-brand-text-sub text-sm">{t("compCompare.needTwo")}</p>
          <Button
            className="mt-4 bg-gold-gradient text-black rounded-xl font-semibold"
            onClick={() => setShowSelect(columns.length)}
          >
            {t("compCompare.addComp")}
          </Button>
        </Card>
      )}
    </div>
  )
}
