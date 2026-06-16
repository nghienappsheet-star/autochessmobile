import * as React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, Badge, Button } from "@/components/ui/core"
import { Star, Scale, Check } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { useAppStore } from "@/contexts/DataContext"
import { PageHeader } from "@/components/layout/PageHeader"
import { CompareTray } from "@/components/layout/CompareTray"
import { useCompareSelection } from "@/hooks/useCompareSelection"
import { getPageIcon } from "@/config/icons"
import {
  FilterToolbar,
  FilterToolbarRow,
  FilterSearchInput,
  FilterSelect,
  FilterClearButton,
  FilterResultMeta,
} from "@/components/layout/FilterToolbar"
import { useFilterParams } from "@/hooks/useFilterParams"
import { cn } from "@/lib/utils"
import { filterHeroes, getHeroIconUrl, isHeroNew } from "@/lib/hero-utils"
import { heroCostBarClass, heroCostBadgeOverlayClass } from "@/lib/cost-colors"
import { HeroNewBadge } from "@/components/heroes/HeroNewBadge"

const FILTER_KEYS = ["cost", "race", "class", "q", "new"] as const

function parseCost(value: string): number | null {
  if (!value) return null
  const n = Number(value)
  return n >= 1 && n <= 5 ? n : null
}

export function HeroesPage() {
  const { t } = useTranslation(["pages", "tools"])
  const { heroes, races, classes } = useAppStore()
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams()
  const { isFavorite, toggleFavorite } = useFavorites("heroes")
  const [toast, setToast] = React.useState<string | null>(null)

  const {
    compareMode,
    selectedIds,
    toggleCompareMode,
    toggleSelect,
    removeItem,
    clearSelection,
    hasSelection,
  } = useCompareSelection({
    onMaxReached: () => setToast(t("tools:compare.maxReached")),
  })

  React.useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const selectedCost = parseCost(getParam("cost"))
  const selectedRace = getParam("race") || null
  const selectedClass = getParam("class") || null
  const searchTerm = getParam("q")
  const newFilter = getParam("new") === "new"

  const filteredHeroes = filterHeroes(heroes, {
    cost: selectedCost,
    race: selectedRace,
    class: selectedClass,
    q: searchTerm,
    isNew: newFilter ? true : null,
  })

  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  const raceSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allRaces") },
      ...races.map((race) => ({ value: race.name, label: race.name })),
    ],
    [races, t]
  )

  const classSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allClasses") },
      ...classes.map((cls) => ({ value: cls.name, label: cls.name })),
    ],
    [classes, t]
  )

  const costSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allCosts") },
      ...([1, 2, 3, 4, 5] as const).map((cost) => ({
        value: String(cost),
        label: `$${cost}`,
      })),
    ],
    [t]
  )

  const newSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("heroes.allHeroes") },
      { value: "new", label: t("heroes.onlyNew") },
    ],
    [t]
  )

  const selectedHeroItems = React.useMemo(
    () =>
      selectedIds
        .map((id) => heroes.find((h) => h.id === id))
        .filter((h): h is NonNullable<typeof h> => Boolean(h))
        .map((hero) => ({ id: hero.id, name: hero.name, hero })),
    [selectedIds, heroes]
  )

  return (
    <div className={cn("space-y-6", hasSelection && "pb-28 xl:pb-24")}>
      <PageHeader
        title={t("heroes.title")}
        description={t("heroes.description")}
        icon={getPageIcon("heroes")}
      />

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={searchTerm}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("heroes.searchPlaceholder")}
              aria-label={t("heroes.searchPlaceholder")}
            />

            <FilterSelect
              value={selectedCost != null ? String(selectedCost) : "all"}
              onValueChange={(v) => setParams({ cost: v === "all" ? null : v })}
              options={costSelectOptions}
              aria-label={t("heroes.filterByCost")}
            />

            <FilterSelect
              value={selectedRace ?? "all"}
              onValueChange={(v) => setParams({ race: v === "all" ? null : v })}
              options={raceSelectOptions}
              aria-label={t("heroes.filterByRace")}
            />

            <FilterSelect
              value={selectedClass ?? "all"}
              onValueChange={(v) => setParams({ class: v === "all" ? null : v })}
              options={classSelectOptions}
              aria-label={t("heroes.filterByClass")}
            />

            <FilterSelect
              value={newFilter ? "new" : "all"}
              onValueChange={(v) => setParams({ new: v === "all" ? null : v })}
              options={newSelectOptions}
              aria-label={t("heroes.filterNew")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />

            <Button
              type="button"
              variant={compareMode ? "default" : "outline"}
              onClick={toggleCompareMode}
              className={cn(
                "h-11 px-4 gap-2 shrink-0 rounded-xl font-semibold text-sm",
                compareMode
                  ? "bg-gold-gradient text-black border-0"
                  : "border-brand-border text-brand-text-sub hover:text-white"
              )}
            >
              <Scale className="w-4 h-4" />
              {compareMode ? t("pages:heroes.compareModeOn") : t("pages:heroes.compareMode")}
            </Button>
          </FilterToolbarRow>
        </FilterToolbar>
        {compareMode && (
          <p className="text-[12px] text-brand-text-sub px-1">{t("pages:heroes.compareHint")}</p>
        )}
        <FilterResultMeta shown={filteredHeroes.length} total={heroes.length} className="px-1" />
      </div>

      {filteredHeroes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <p className="text-brand-text-sub font-medium">{t("heroes.empty")}</p>
          {activeFilters && (
            <Button
              variant="outline"
              onClick={() => clearParams([...FILTER_KEYS])}
              className="rounded-xl border-brand-border"
            >
              {t("common:clearFilters")}
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredHeroes.map((hero) => {
            const isFav = isFavorite(hero.id)
            const iconUrl = getHeroIconUrl(hero)
            const isSelected = selectedIds.includes(hero.id)

            const cardContent = (
              <Card
                className={cn(
                  "p-3 bg-brand-card hover:border-brand-gold/30 transition-all flex flex-col relative h-full cursor-pointer",
                  compareMode && isSelected && "border-brand-gold ring-1 ring-brand-gold/40"
                )}
              >
                {compareMode && (
                  <div
                    className={cn(
                      "absolute top-3 right-3 z-20 w-6 h-6 flex items-center justify-center rounded-md border transition-all",
                      isSelected
                        ? "bg-brand-gold border-brand-gold text-black"
                        : "bg-black/60 border-brand-border text-transparent"
                    )}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                {!compareMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(hero.id)
                    }}
                    className={cn(
                      "absolute top-4 left-4 z-10 w-6 h-6 flex items-center justify-center rounded-full border transition-all hover:scale-110",
                      isFav
                        ? "bg-brand-gold/20 border-brand-gold opacity-100"
                        : "bg-black/60 border-brand-border opacity-0 group-hover:opacity-100"
                    )}
                  >
                    <Star className={cn("w-3.5 h-3.5", isFav ? "text-brand-gold fill-brand-gold" : "text-white")} />
                  </button>
                )}
                <div className="aspect-square rounded-lg bg-brand-card-2 mb-3 border border-brand-border flex items-center justify-center relative overflow-hidden">
                  {iconUrl ? (
                    <img
                      src={iconUrl}
                      alt={hero.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-brand-text-sub group-hover:scale-110 transition-transform">
                      {hero.name.charAt(0)}
                    </span>
                  )}
                  <div className={cn("absolute bottom-0 left-0 right-0 h-1", heroCostBarClass(hero.cost))} />
                  {isHeroNew(hero) && (
                    <div className="absolute top-1 left-1 z-10">
                      <HeroNewBadge size="sm" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "absolute top-1 right-1 px-1.5 py-0.5 text-[10px] font-bold flex items-center z-10",
                      heroCostBadgeOverlayClass(hero.cost),
                      compareMode && "top-10"
                    )}
                  >
                    <span className="mr-0.5">$</span>
                    {hero.cost}
                  </div>
                </div>
                <div className="text-[16px] font-semibold text-white mb-2 leading-tight truncate group-hover:text-brand-gold transition-colors">
                  {hero.name}
                </div>
                <div className="mt-auto space-y-1.5">
                  <div className="flex flex-wrap gap-1">
                    {hero.race.map((r) => (
                      <Badge key={r} variant="secondary" className="text-[10px] bg-brand-card-2 text-brand-text-sub">
                        {r}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {hero.class.map((c) => (
                      <Badge
                        key={c}
                        variant="secondary"
                        className="text-[10px] bg-brand-gold/10 text-brand-gold/80 border-brand-gold/20 border"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            )

            if (compareMode) {
              return (
                <div
                  key={hero.id}
                  role="button"
                  tabIndex={0}
                  className="block group"
                  onClick={() => toggleSelect(hero.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      toggleSelect(hero.id)
                    }
                  }}
                >
                  {cardContent}
                </div>
              )
            }

            return (
              <Link key={hero.id} to={`/tuong/${hero.id}`} className="block group">
                {cardContent}
              </Link>
            )
          })}
        </div>
      )}

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl bg-brand-card border border-brand-gold/30 text-brand-gold text-sm font-semibold shadow-xl">
          {toast}
        </div>
      )}

      <CompareTray
        type="hero"
        selectedIds={selectedIds}
        items={selectedHeroItems}
        comparePath="/cong-cu/so-sanh-tuong"
        onRemove={removeItem}
        onClear={clearSelection}
      />
    </div>
  )
}
