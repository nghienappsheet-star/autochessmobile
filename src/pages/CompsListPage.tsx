import * as React from "react"
import { Badge, Input, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Search, Filter, Scale } from "lucide-react"
import { useFavorites } from "@/hooks/useFavorites"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "motion/react"
import { PageHeader } from "@/components/layout/PageHeader"
import { CompareTray } from "@/components/layout/CompareTray"
import { useCompareSelection } from "@/hooks/useCompareSelection"
import { getPageIcon } from "@/config/icons"
import { FilterToolbar } from "@/components/layout/FilterToolbar"
import { UnderlineTabs } from "@/components/layout/UnderlineTabs"
import { useTranslation } from "react-i18next"
import { CompListCard } from "@/components/comps/CompListCard"
import { cn } from "@/lib/utils"

const COMPS_TAB_KEYS = ['all', 'hot', 'new', 'following'] as const
type CompsTabKey = (typeof COMPS_TAB_KEYS)[number]

const TIER_FILTER_KEYS = ['all', 's', 'a', 'b'] as const
type TierFilterKey = (typeof TIER_FILTER_KEYS)[number]

export function CompsListPage() {
  const { t } = useTranslation(['pages', 'common', 'tools'])
  const { comps, heroes } = useAppStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState<CompsTabKey>('all');
  const [selectedTier, setSelectedTier] = React.useState<TierFilterKey>('all');
  const { isFavorite, toggleFavorite } = useFavorites('comps');
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
    onMaxReached: () => setToast(t('tools:compare.maxReached')),
  })

  React.useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2500)
    return () => clearTimeout(timer)
  }, [toast])

  const filteredComps = React.useMemo(() => {
    let result = [...comps];

    if (activeTab === 'hot') {
      result = result.sort((a, b) => parseInt(b.likes) - parseInt(a.likes)).slice(0, 10);
    } else if (activeTab === 'new') {
      result = result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (activeTab === 'following') {
      result = result.filter(c => isFavorite(c.id));
    }

    if (selectedTier !== 'all') {
      result = result.filter(c => c.tier === selectedTier.toUpperCase());
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.author.toLowerCase().includes(lowerSearch) ||
        c.synergies.some((s) => s.name.toLowerCase().includes(lowerSearch))
      );
    }

    return result;
  }, [comps, activeTab, selectedTier, searchTerm, isFavorite]);

  const selectedCompItems = React.useMemo(
    () =>
      selectedIds
        .map((id) => comps.find((c) => c.id === id))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
        .map((comp) => ({ id: comp.id, name: comp.name, tier: comp.tier })),
    [selectedIds, comps]
  )

  return (
    <div className={cn("space-y-6", hasSelection && "pb-28 xl:pb-24")}>
      <PageHeader
        title={t('pages:comps.title')}
        description={t('pages:comps.description')}
        icon={getPageIcon("comps")}
      >
        <Button className="font-semibold h-11 px-6 rounded-xl transition-all">
          {t('pages:comps.createNew')}
        </Button>
      </PageHeader>

      <FilterToolbar>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub" />
          <Input
            placeholder={t('pages:comps.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-11 text-sm rounded-xl focus:ring-1 focus:ring-brand-gold/30"
          />
        </div>

        <div className="flex gap-2 items-center overflow-x-auto pb-1 lg:pb-0 hide-scrollbar">
          <Select value={selectedTier} onValueChange={(v) => setSelectedTier(v as TierFilterKey)}>
            <SelectTrigger className="min-w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIER_FILTER_KEYS.map((key) => (
                <SelectItem key={key} value={key}>
                  {t(`pages:comps.tierFilter.${key}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="h-11 px-4 gap-2 shrink-0 border-brand-border rounded-xl font-semibold text-sm text-brand-text-sub hover:text-white transition-colors">
            <Filter className="w-4 h-4" /> {t('pages:comps.advancedFilter')}
          </Button>

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
            {compareMode ? t('pages:comps.compareModeOn') : t('pages:comps.compareMode')}
          </Button>
        </div>
      </FilterToolbar>
      {compareMode && (
        <p className="text-[12px] text-brand-text-sub px-1">{t('pages:comps.compareHint')}</p>
      )}

      <UnderlineTabs
        tabs={COMPS_TAB_KEYS.map((key) => ({
          id: key,
          label: t(`pages:comps.tabs.${key}`),
        }))}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as CompsTabKey)}
        layoutId="activeTabPost"
      />

      <div className="grid grid-cols-1 gap-4 pb-10">
        {filteredComps.length > 0 ? filteredComps.map((comp, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={comp.id}
          >
            <CompListCard
              comp={comp}
              rank={idx + 1}
              heroes={heroes}
              isFavorite={isFavorite(comp.id)}
              onToggleFavorite={() => toggleFavorite(comp.id)}
              selectable={compareMode}
              selected={selectedIds.includes(comp.id)}
              onSelect={() => toggleSelect(comp.id)}
            />
          </motion.div>
        )) : (
          <div className="text-center py-20 border-2 border-dashed border-brand-border rounded-xl bg-brand-card/50 font-normal">
            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-card-2 text-brand-text-sub">
              <Filter className="w-6 h-6" />
            </div>
            <p className="text-brand-text-sub font-semibold text-sm">{t('pages:comps.empty')}</p>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setActiveTab('all');
                setSelectedTier('all');
              }}
              className="mt-4 text-brand-gold hover:bg-brand-gold/10 font-semibold text-[13px]"
            >{t('pages:comps.clearFilters')}</Button>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-xl bg-brand-card border border-brand-gold/30 text-brand-gold text-sm font-semibold shadow-xl">
          {toast}
        </div>
      )}

      <CompareTray
        type="comp"
        selectedIds={selectedIds}
        items={selectedCompItems}
        comparePath="/cong-cu/so-sanh-doi-hinh"
        onRemove={removeItem}
        onClear={clearSelection}
      />
    </div>
  )
}
