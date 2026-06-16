import * as React from "react"
import { useTranslation } from "react-i18next"
import { Card, Badge, Button } from "@/components/ui/core"
import { Info, ArrowRight } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { motion, AnimatePresence } from "@/components/motion/MotionProvider"
import { useNavigate } from "react-router-dom"
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

const FILTER_KEYS = ["q", "type"] as const

export function RelicsPage() {
  const { t } = useTranslation("pages")
  const { relics } = useAppStore()
  const navigate = useNavigate()
  const { getParam, setParams, clearParams, hasActiveFilters } = useFilterParams()

  const searchTerm = getParam("q")
  const selectedType = getParam("type")

  const activeRelics = React.useMemo(
    () => relics.filter((relic) => relic.status === "Hiện"),
    [relics]
  )

  const typeOptions = React.useMemo(() => {
    const types = Array.from(new Set(activeRelics.map((r) => r.type as string)))
    return [
      { value: "all", label: t("common:all") },
      ...types.map((type) => ({ value: type, label: type })),
    ]
  }, [activeRelics, t])

  const filteredRelics = activeRelics.filter((relic) => {
    if (searchTerm && !relic.name.toLowerCase().includes(searchTerm.toLowerCase())) return false
    if (selectedType && relic.type !== selectedType) return false
    return true
  })

  const activeFilters = hasActiveFilters([...FILTER_KEYS])

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("relics.title")}
        description={t("relics.description")}
        icon={getPageIcon("relics")}
      />

      <div className="space-y-2">
        <FilterToolbar>
          <FilterToolbarRow>
            <FilterSearchInput
              value={searchTerm}
              onChange={(value) => setParams({ q: value || null })}
              placeholder={t("relics.searchPlaceholder")}
              aria-label={t("relics.searchPlaceholder")}
            />

            <FilterSelect
              value={selectedType || "all"}
              onValueChange={(v) => setParams({ type: v === "all" ? null : v })}
              options={typeOptions}
              aria-label={t("relics.filterByType")}
            />

            <FilterClearButton
              visible={activeFilters}
              onClick={() => clearParams([...FILTER_KEYS])}
            />
          </FilterToolbarRow>
        </FilterToolbar>
        <FilterResultMeta shown={filteredRelics.length} total={activeRelics.length} className="px-1" />
      </div>

      {filteredRelics.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50">
          <p className="text-brand-text-sub font-medium">{t("relics.empty")}</p>
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
            {filteredRelics.map((relic, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                key={relic.id}
              >
                <Card
                  onClick={() => navigate(`/di-vat/${relic.id}`)}
                  className="bg-brand-card border-brand-border hover:border-brand-gold/30 transition-all group relative overflow-hidden h-full flex flex-col p-5 cursor-pointer"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Info className="w-16 h-16 text-white" />
                  </div>

                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <Badge
                      variant={relic.rating === "S" ? "danger-solid" : "warning-solid"}
                      className="rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-lg uppercase tracking-widest"
                    >
                      Tier {relic.rating}
                    </Badge>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub bg-brand-card-2 px-2 py-1 rounded">
                      {relic.type}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-brand-gold transition-colors relative z-10 uppercase tracking-tight">
                    {relic.name}
                  </h3>

                  <div className="flex-1 text-[13px] text-brand-text-sub leading-relaxed relative z-10 bg-brand-bg p-3 rounded-xl border border-brand-border font-medium">
                    &ldquo;{relic.effect}&rdquo;
                  </div>

                  <div className="mt-4 pt-4 border-t border-brand-border flex items-center justify-between relative z-10">
                    <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
                      {t("relics.priority", { tier: relic.tier })}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 group-hover:bg-brand-gold group-hover:text-black transition-all rounded-lg text-[10px] font-bold uppercase tracking-widest"
                    >
                      {t("common:details").toUpperCase()} <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>

                  <div
                    className={`absolute -bottom-10 -right-10 w-24 h-24 blur-[50px] transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                      relic.rating === "S" ? "bg-brand-red/20" : "bg-brand-gold/20"
                    }`}
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
