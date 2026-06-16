import * as React from "react"
import { useTranslation } from "react-i18next"
import { Card, Badge, Button } from "@/components/ui/core"
import { useAppStore } from "@/contexts/DataContext"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { inferItemCategory } from "@/lib/item-utils"
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
import type { ItemCategory } from "@/types/domain"

const FILTER_KEYS = ["q", "tier", "category"] as const
const CATEGORIES: ItemCategory[] = ["attack", "defense", "magic", "utility"]
const TIERS = [1, 2, 3, 4, 5, 6] as const

function parseTier(value: string): number | null {
  if (!value) return null
  const n = Number(value)
  return n >= 1 && n <= 6 ? n : null
}

export function ItemsPage() {
  const { t } = useTranslation("pages")
  const { items } = useAppStore()
  const navigate = useNavigate()
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams()

  const searchTerm = getParam("q")
  const selectedTier = parseTier(getParam("tier"))
  const selectedCategory = getParam("category") as ItemCategory | ""

  const filteredItems = items.filter((item) => {
    const category = item.category ?? inferItemCategory(item.stats)
    if (selectedTier && item.tier !== selectedTier) return false
    if (selectedCategory && category !== selectedCategory) return false
    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  const categoryOptions = React.useMemo(
    () => [
      { value: "all", label: t("items.allCategories") },
      ...CATEGORIES.map((cat) => ({
        value: cat,
        label: t(`itemDetail.category.${cat}`),
      })),
    ],
    [t]
  )

  const tierSelectOptions = React.useMemo(
    () => [
      { value: "all", label: t("common:all") },
      ...TIERS.map((tier) => ({ value: String(tier), label: `B${tier}` })),
    ],
    [t]
  )

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("items.title")}
        description={t("items.description")}
        icon={getPageIcon("items")}
      />

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={searchTerm}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("items.searchPlaceholder")}
              aria-label={t("items.searchPlaceholder")}
            />

            <FilterSelect
              value={selectedCategory || "all"}
              onValueChange={(v) => setParams({ category: v === "all" ? null : v })}
              options={categoryOptions}
              aria-label={t("items.filterByCategory")}
            />

            <FilterSelect
              value={selectedTier != null ? String(selectedTier) : "all"}
              onValueChange={(v) => setParams({ tier: v === "all" ? null : v })}
              options={tierSelectOptions}
              aria-label={t("items.filterByTier")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />
          </FilterToolbarRow>
        </FilterToolbar>
        <FilterResultMeta shown={filteredItems.length} total={items.length} className="px-1" />
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50">
          <p className="text-brand-text-sub font-medium">{t("items.empty")}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                key={item.id}
              >
                <Card
                  onClick={() => navigate(`/trang-bi/${item.id}`)}
                  className="p-5 bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all flex items-center gap-5 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/[0.02] rounded-full group-hover:bg-brand-gold/5 transition-all" />

                  <div className="w-16 h-16 rounded-xl bg-brand-bg border border-brand-border flex-shrink-0 flex items-center justify-center overflow-hidden relative shadow-inner">
                    <div
                      className={`w-10 h-10 rounded-sm bg-gradient-to-br ${
                        item.tier >= 5
                          ? "from-tier-s to-brand-red shadow-[0_0_10px_rgba(242,92,84,0.35)]"
                          : item.tier >= 4
                            ? "from-tier-a to-brand-gold-deep shadow-[0_0_10px_rgba(245,166,35,0.35)]"
                            : item.tier === 3
                              ? "from-tier-b to-brand-green shadow-[0_0_10px_rgba(77,150,240,0.35)]"
                              : "from-brand-card-2 to-brand-bg"
                      }`}
                    />
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="text-[16px] font-semibold text-white leading-tight group-hover:text-brand-gold transition-colors uppercase truncate tracking-tight">
                        {item.name}
                      </div>
                      <Badge variant="outline" className="text-[12px] border-brand-border text-brand-text-sub font-bold px-1.5 h-4">
                        B{item.tier}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] border-none font-bold uppercase px-1.5 h-4 hidden sm:inline-flex">
                        {t(`itemDetail.category.${item.category ?? inferItemCategory(item.stats)}`)}
                      </Badge>
                    </div>
                    <div className="text-[12px] text-brand-text-sub leading-snug font-medium line-clamp-1 group-hover:line-clamp-none transition-all">
                      {item.stats}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
