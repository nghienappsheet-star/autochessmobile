import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export type TabDef = string | { id: string; label: string }

function normalizeTab(tab: TabDef): { id: string; label: string } {
  return typeof tab === "string" ? { id: tab, label: tab } : tab
}

type UnderlineTabsProps = {
  tabs: TabDef[]
  activeTab: string
  onTabChange: (tab: string) => void
  layoutId?: string
  className?: string
}

export function UnderlineTabs({
  tabs,
  activeTab,
  onTabChange,
  layoutId = "activeTab",
  className,
}: UnderlineTabsProps) {
  return (
    <div className={cn("border-b border-brand-border pt-2 flex overflow-x-auto hide-scrollbar", className)}>
      <div className="flex gap-8 -mb-px px-2">
        {tabs.map((tab) => {
          const { id, label } = normalizeTab(tab)
          return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            className={cn(
              "py-4 text-[13px] font-semibold tracking-wide border-b-2 transition-all relative whitespace-nowrap",
              activeTab === id
                ? "border-brand-gold text-brand-gold"
                : "border-transparent text-brand-text-sub hover:text-white"
            )}
          >
            {label}
            {activeTab === id && (
              <motion.div
                layoutId={layoutId}
                className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-brand-gold"
              />
            )}
          </button>
          )
        })}
      </div>
    </div>
  )
}
