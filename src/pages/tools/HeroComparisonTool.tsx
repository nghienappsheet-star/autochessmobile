import * as React from "react"
import { Link } from "react-router-dom"
import { Card, Input, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "@/components/ui/core"
import { Search, Plus, X, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "motion/react"
import { getHeroComparisonStats } from "@/lib/comp-stats"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import { MAX_COMPARE_ITEMS } from "@/components/layout/CompareTray"
import { formatHeroTraitsLabel } from "@/lib/hero-utils"
import { useCompareIdsFromUrl } from "@/hooks/useCompareIdsFromUrl"
import type { Hero } from "@/types/domain"

type StatKey = "hp" | "armor" | "mr" | "dps" | "atkSpeed" | "range"

const STAT_CONFIG: { key: StatKey; labelKey: string; max: number; unit?: string; reverse?: boolean }[] = [
  { key: "hp", labelKey: "hp", max: 3000 },
  { key: "armor", labelKey: "armor", max: 50 },
  { key: "mr", labelKey: "mr", max: 50, unit: "%" },
  { key: "dps", labelKey: "dps", max: 300 },
  { key: "atkSpeed", labelKey: "attackSpeed", max: 2, unit: "/s" },
  { key: "range", labelKey: "range", max: 5, unit: " Ô" },
]

function MultiStatRow({
  label,
  values,
  max,
  unit = "",
  reverse = false,
}: {
  label: string
  values: { id: string; value: number }[]
  max: number
  unit?: string
  reverse?: boolean
}) {
  const numeric = values.map((v) => v.value)
  const best = reverse ? Math.min(...numeric) : Math.max(...numeric)
  const winners = values.filter((v) => v.value === best)
  const hasSingleWinner = winners.length === 1 && values.length > 1

  return (
    <div className="space-y-3 py-4 border-b border-brand-border last:border-0">
      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub text-center">
        {label}
      </div>
      <div
        className={cn(
          "grid gap-4",
          values.length === 2 && "grid-cols-2",
          values.length === 3 && "grid-cols-3"
        )}
      >
        {values.map((entry) => {
          const isWinner = hasSingleWinner && entry.value === best
          return (
            <div key={entry.id} className="space-y-2">
              <div
                className={cn(
                  "text-[13px] font-bold text-center transition-colors",
                  isWinner ? "text-brand-gold" : "text-brand-text-sub"
                )}
              >
                {entry.value}
                {unit}
              </div>
              <div className="h-1.5 bg-brand-card-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (entry.value / max) * 100)}%` }}
                  className={cn(
                    "h-full rounded-full transition-colors",
                    isWinner ? "bg-brand-gold shadow-[0_0_10px_rgba(245,180,60,0.3)]" : "bg-brand-card-2"
                  )}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HeroComparisonTool() {
  const { t } = useTranslation(["tools", "pages"])
  const { heroes } = useAppStore()

  const defaultIds = React.useMemo(
    () => [heroes[0]?.id, heroes[1]?.id].filter(Boolean) as string[],
    [heroes]
  )

  const { selectedIds, selectedItems: selectedHeroes, setSelectedIds, syncUrl } = useCompareIdsFromUrl(
    heroes,
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

  const [showSelect, setShowSelect] = React.useState<number | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")

  const statsByHero = selectedHeroes.map((hero) => ({
    hero,
    stats: getHeroComparisonStats(hero),
  }))

  const insights = React.useMemo(() => {
    if (statsByHero.length < 2) return []
    const lines: string[] = []

    const pickBest = (key: StatKey, label: string, reverse = false) => {
      const sorted = [...statsByHero].sort((a, b) =>
        reverse ? a.stats[key] - b.stats[key] : b.stats[key] - a.stats[key]
      )
      const best = sorted[0]
      if (best) {
        lines.push(t("heroCompare.insightHighest", { stat: label, name: best.hero.name }))
      }
    }

    pickBest("hp", t("heroCompare.hp"))
    pickBest("dps", t("heroCompare.dps"))
    pickBest("range", t("heroCompare.range"))

    const cheapest = [...statsByHero].sort((a, b) => a.hero.cost - b.hero.cost)[0]
    if (cheapest) {
      lines.push(t("heroCompare.insightCheapest", { name: cheapest.hero.name, cost: cheapest.hero.cost }))
    }

    return lines.slice(0, 4)
  }, [statsByHero, t])

  const handlePickHero = (heroId: string) => {
    if (showSelect === null) return
    const next = [...selectedIds]
    if (showSelect < next.length) {
      next[showSelect] = heroId
    } else if (next.length < MAX_COMPARE_ITEMS && !next.includes(heroId)) {
      next.push(heroId)
    } else if (!next.includes(heroId)) {
      next[next.length - 1] = heroId
    }
    const unique = next.filter((id, idx, arr) => arr.indexOf(id) === idx)
    updateSelection(unique)
    setShowSelect(null)
    setSearchTerm("")
  }

  const removeHero = (index: number) => {
    const next = selectedIds.filter((_, i) => i !== index)
    updateSelection(next)
  }

  const filteredPickerHeroes = heroes.filter((h) =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="pb-20 max-w-5xl mx-auto space-y-6">
      <Link
        to="/tuong"
        className="inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        {t("pages:heroDetail.backToList")}
      </Link>

      <Dialog open={showSelect !== null} onOpenChange={(open) => !open && setShowSelect(null)}>
        <DialogContent className="bg-brand-card-2 border-brand-border w-full max-w-md h-[600px] flex flex-col overflow-hidden p-0">
          <DialogHeader className="p-6 border-b border-brand-border bg-brand-card">
            <DialogTitle className="font-bold text-brand-text-main text-left">
              {t("heroCompare.pickHeroes")}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 bg-brand-card border-b border-brand-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" />
              <Input
                placeholder={t("heroCompare.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-brand-bg border-brand-border pl-10 h-11 rounded-xl"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar bg-brand-card">
            {filteredPickerHeroes.map((hero) => (
              <button
                key={hero.id}
                type="button"
                onClick={() => handlePickHero(hero.id)}
                className="w-full flex items-center gap-4 p-3 bg-brand-card border border-transparent hover:border-brand-gold/30 rounded-xl cursor-pointer transition-all group text-left"
              >
                <HeroIcon hero={hero} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors truncate">
                    {hero.name}
                  </div>
                  <div className="text-[10px] font-medium text-brand-text-sub truncate">
                    {formatHeroTraitsLabel(hero, { emptyLabel: t("pages:heroDetail.traitUndefined") })}
                  </div>
                </div>
                <div className={cn("text-[12px] font-bold px-1.5 py-0.5 rounded-md", heroCostBadgeOverlayClass(hero.cost))}>
                  ${hero.cost}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <div
        className={cn(
          "grid gap-4 items-start",
          selectedHeroes.length === 2 && "grid-cols-1 md:grid-cols-2",
          selectedHeroes.length === 3 && "grid-cols-1 md:grid-cols-3"
        )}
      >
        {selectedHeroes.map((hero, index) => (
          <Card
            key={hero.id}
            className="bg-brand-card border-brand-border p-6 flex flex-col items-center shadow-lg relative group overflow-hidden"
          >
            <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest mb-6 w-full text-center">
              {t("heroCompare.slotLabel", { index: index + 1 })}
            </div>
            <div className="relative mb-6">
              <HeroIcon hero={hero} size="lg" className="w-24 h-24" />
              <button
                type="button"
                onClick={() => setShowSelect(index)}
                className="absolute -bottom-2 -right-2 bg-brand-card-2 text-brand-text-main border border-brand-border p-2 rounded-xl shadow-xl hover:border-brand-gold/40 transition-all"
                aria-label={t("heroCompare.changeHero")}
              >
                <Plus className="w-4 h-4" />
              </button>
              {selectedHeroes.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeHero(index)}
                  className="absolute -top-2 -left-2 bg-brand-card-2 text-brand-text-sub border border-brand-border p-1.5 rounded-lg hover:text-brand-red transition-all"
                  aria-label={t("heroCompare.removeHero")}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <h3 className="text-xl font-bold text-brand-text-main mb-2 tracking-tight text-center">{hero.name}</h3>
            <div className={cn("text-[12px] font-bold mb-3 px-2 py-0.5 rounded-md", heroCostBadgeOverlayClass(hero.cost))}>
              ${hero.cost}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {hero.race.map((r) => (
                <Badge key={r} variant="secondary" className="bg-brand-card-2 border-brand-border font-semibold">
                  {r}
                </Badge>
              ))}
              {hero.class.map((c) => (
                <Badge key={c} variant="secondary" className="bg-brand-gold/10 border-brand-gold/20 text-brand-gold font-semibold">
                  {c}
                </Badge>
              ))}
            </div>
          </Card>
        ))}

        {selectedHeroes.length < MAX_COMPARE_ITEMS && (
          <button
            type="button"
            onClick={() => setShowSelect(selectedHeroes.length)}
            className="min-h-[220px] rounded-xl border-2 border-dashed border-brand-border bg-brand-card/50 hover:border-brand-gold/40 hover:bg-brand-card transition-all flex flex-col items-center justify-center gap-3 text-brand-text-sub hover:text-brand-gold"
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm font-semibold">{t("heroCompare.addHero")}</span>
          </button>
        )}
      </div>

      {selectedHeroes.length >= 2 && (
        <Card className="mt-8 bg-brand-card border-brand-border p-6 md:p-10 shadow-lg">
          <div className="space-y-2 mb-8">
            <h4 className="text-lg font-bold text-brand-text-main tracking-tight flex items-center gap-3">
              <div className="w-1.5 h-6 bg-brand-gold rounded-full" />
              {t("heroCompare.statsTitle")}
            </h4>
            <p className="text-[11px] text-brand-text-sub font-medium">{t("heroCompare.statsSubtitle")}</p>
          </div>

          <div className="space-y-2">
            {STAT_CONFIG.map(({ key, labelKey, max, unit, reverse }) => (
              <MultiStatRow
                key={key}
                label={t(`heroCompare.${labelKey}`)}
                max={max}
                unit={unit}
                reverse={reverse}
                values={statsByHero.map(({ hero, stats }) => ({
                  id: hero.id,
                  value: stats[key],
                }))}
              />
            ))}
          </div>

          {insights.length > 0 && (
            <div className="mt-10 p-5 bg-brand-card-2 rounded-xl border border-brand-border space-y-3">
              <div className="text-[11px] font-bold text-brand-gold uppercase tracking-widest">
                {t("heroCompare.insightsTitle")}
              </div>
              <ul className="space-y-2">
                {insights.map((line) => (
                  <li key={line} className="text-[13px] text-brand-text-sub leading-relaxed">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}

      {selectedHeroes.length < 2 && (
        <Card className="mt-8 p-8 bg-brand-card border-brand-border text-center">
          <p className="text-brand-text-sub text-sm">{t("heroCompare.needTwo")}</p>
          <Button
            className="mt-4 bg-gold-gradient text-black rounded-xl font-semibold"
            onClick={() => setShowSelect(selectedHeroes.length)}
          >
            {t("heroCompare.addHero")}
          </Button>
        </Card>
      )}
    </div>
  )
}
