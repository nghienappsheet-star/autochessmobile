import { useNavigate } from "react-router-dom"
import { X, Scale } from "lucide-react"
import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "motion/react"
import { Button, Badge } from "@/components/ui/core"
import { HeroIcon } from "@/components/heroes/HeroIcon"
import { cn } from "@/lib/utils"
import type { Hero } from "@/types/domain"
import { getTierBadgeVariant } from "@/lib/tier-utils"

export const MAX_COMPARE_ITEMS = 3

type CompareTrayHeroItem = {
  id: string
  name: string
  hero?: Hero
  tier?: string
}

type CompareTrayProps = {
  type: "hero" | "comp"
  selectedIds: string[]
  items: CompareTrayHeroItem[]
  comparePath: string
  onRemove: (id: string) => void
  onClear: () => void
}

export function CompareTray({
  type,
  selectedIds,
  items,
  comparePath,
  onRemove,
  onClear,
}: CompareTrayProps) {
  const { t } = useTranslation(["common", "tools"])
  const navigate = useNavigate()

  if (selectedIds.length === 0) return null

  const canCompare = selectedIds.length >= 2

  const handleCompare = () => {
    if (!canCompare) return
    navigate(`${comparePath}?ids=${selectedIds.join(",")}`)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
        className={cn(
          "fixed left-0 right-0 z-50 border-t border-brand-border bg-brand-card/95 backdrop-blur-xl shadow-2xl",
          "bottom-14 xl:bottom-0 safe-area-pb"
        )}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1 overflow-x-auto hide-scrollbar">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative shrink-0 flex items-center gap-2 bg-brand-card-2 border border-brand-border rounded-xl pl-1 pr-2 py-1"
              >
                {type === "hero" && item.hero ? (
                  <HeroIcon hero={item.hero} size="sm" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center shrink-0">
                    {item.tier && (
                      <Badge
                        variant={getTierBadgeVariant(item.tier)}
                        className="text-[9px] px-1 py-0"
                      >
                        {item.tier}
                      </Badge>
                    )}
                  </div>
                )}
                <span className="text-[12px] font-semibold text-brand-text-main max-w-[88px] truncate">
                  {item.name}
                </span>
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="w-5 h-5 flex items-center justify-center rounded-md text-brand-text-sub hover:text-white hover:bg-brand-card transition-colors"
                  aria-label={t("common:removeItem", { name: item.name })}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {selectedIds.length < MAX_COMPARE_ITEMS && (
              <span className="text-[11px] text-brand-text-sub shrink-0 px-1">
                {t("tools:compare.trayHint", { count: selectedIds.length, max: MAX_COMPARE_ITEMS })}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-brand-text-sub hover:text-white text-[12px] font-semibold hidden sm:inline-flex"
            >
              {t("tools:compare.clearAll")}
            </Button>
            <Button
              onClick={handleCompare}
              disabled={!canCompare}
              className="h-10 px-4 rounded-xl font-semibold text-sm gap-2 bg-gold-gradient text-black disabled:opacity-40"
            >
              <Scale className="w-4 h-4" />
              {t("tools:compare.compareButton", {
                count: selectedIds.length,
                max: MAX_COMPARE_ITEMS,
              })}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
