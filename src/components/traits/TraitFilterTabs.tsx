import { cn } from "@/lib/utils"
import type { TraitFilterTab } from "@/lib/traits"
import { useTranslation } from "react-i18next"

type TraitFilterTabsProps = {
  activeTab: TraitFilterTab
  raceCount: number
  classCount: number
  onTabChange: (tab: TraitFilterTab) => void
  hideAllTab?: boolean
}

export function TraitFilterTabs({
  activeTab,
  raceCount,
  classCount,
  onTabChange,
  hideAllTab = false,
}: TraitFilterTabsProps) {
  const { t } = useTranslation("pages")

  const tabs: { id: TraitFilterTab; label: string }[] = [
    ...(hideAllTab
      ? []
      : [{ id: "all" as const, label: t("traits.tabs.all", { count: raceCount + classCount }) }]),
    { id: "race", label: t("traits.tabs.race", { count: raceCount }) },
    { id: "class", label: t("traits.tabs.class", { count: classCount }) },
  ]

  return (
    <div className="overflow-x-auto hide-scrollbar -mx-1 px-1">
      <div className="flex bg-brand-card border border-brand-border p-1.5 rounded-xl w-fit min-w-0 shadow-inner">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-4 sm:px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all shrink-0",
              activeTab === tab.id
                ? "bg-gold-gradient text-black shadow-lg"
                : "text-brand-text-sub hover:text-white"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
