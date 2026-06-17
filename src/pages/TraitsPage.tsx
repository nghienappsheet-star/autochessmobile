import * as React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/core"
import { useAppStore } from "@/contexts/DataContext"
import { AnimatePresence } from "@/components/motion/MotionProvider"
import { PageHeader } from "@/components/layout/PageHeader"
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
import { TraitCard } from "@/components/traits/TraitCard"
import {
  buildTraitItems,
  filterTraits,
  type TraitFilterTab,
  type TraitSort,
} from "@/lib/traits"

const FILTER_KEYS = ["q", "sort", "tab"] as const

function parseTab(value: string | null): TraitFilterTab {
  if (value === "race" || value === "class") return value
  return "all"
}

function parseSort(value: string): TraitSort {
  return value === "heroCount" ? "heroCount" : "name"
}

export function TraitsPage() {
  const { t } = useTranslation("pages")
  const { races, classes, heroes } = useAppStore()
  const { getParam, setParams, clearParams, hasActiveFilters, searchParams } = useFilterParams()

  const activeTab = parseTab(searchParams.get("tab"))
  const search = getParam("q")
  const sort = parseSort(getParam("sort") || "name")

  const allTraits = React.useMemo(() => buildTraitItems(races, classes), [races, classes])

  const filteredTraits = filterTraits(allTraits, {
    search,
    tab: activeTab,
    sort,
    heroes,
  })

  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  const tabOptions = React.useMemo(
    () => [
      { value: "all", label: t("traits.tabsShort.all") },
      { value: "race", label: t("traits.tabsShort.race") },
      { value: "class", label: t("traits.tabsShort.class") },
    ],
    [t]
  )

  const sortOptions = React.useMemo(
    () => [
      { value: "name", label: t("traits.sortName") },
      { value: "heroCount", label: t("traits.sortHeroCount") },
    ],
    [t]
  )

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("traits.title")}
        description={t("traits.description")}
        icon={getPageIcon("traits")}
      />

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={search}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("traits.searchPlaceholder")}
              aria-label={t("traits.searchPlaceholder")}
            />

            <FilterSelect
              value={activeTab}
              onValueChange={(v) => setParams({ tab: v === "all" ? null : v })}
              options={tabOptions}
              aria-label={t("traits.filterByTab")}
            />

            <FilterSelect
              value={sort}
              onValueChange={(v) => setParams({ sort: v === "name" ? null : v })}
              options={sortOptions}
              aria-label={t("traits.sortLabel")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />
          </FilterToolbarRow>
        </FilterToolbar>
        <FilterResultMeta shown={filteredTraits.length} total={allTraits.length} className="px-1" />
      </div>

      {filteredTraits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <p className="text-brand-text-sub">{t("traits.empty")}</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTraits.map((trait, index) => (
              <React.Fragment key={`${trait.kind}-${trait.id}`}>
              <TraitCard trait={trait} heroes={heroes} index={index} />
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
