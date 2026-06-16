import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { itemTierGradientClass } from "@/lib/item-utils"
import type { Item } from "@/types/domain"
import { useTranslation } from "react-i18next"

type HeroRecommendedItemsProps = {
  items: Item[]
  variant?: "default" | "compact"
}

export function HeroRecommendedItems({ items, variant = "default" }: HeroRecommendedItemsProps) {
  const { t } = useTranslation("pages")
  const compact = variant === "compact"

  return (
    <section className={cn("space-y-3", compact && "space-y-2")}>
      <h3
        className={cn(
          "font-bold uppercase tracking-[0.2em] text-brand-gold",
          compact ? "text-[10px]" : "text-[12px]"
        )}
      >
        {t("heroDetail.recommendedItems")}
      </h3>

      {items.length > 0 ? (
        <div
          className={cn(
            "flex gap-2",
            compact ? "overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory" : "flex-col space-y-3"
          )}
        >
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/trang-bi/${item.id}`}
              className={cn(
                "flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-gold/30 transition-all group shrink-0",
                compact ? "p-2 min-w-[140px] snap-start" : "p-3 gap-3"
              )}
            >
              <div
                className={cn(
                  "rounded-lg bg-gradient-to-br shrink-0",
                  itemTierGradientClass(item.tier),
                  compact ? "w-8 h-8" : "w-10 h-10"
                )}
              />
              <div className="min-w-0 flex-1">
                <div
                  className={cn(
                    "font-bold text-brand-text-main group-hover:text-brand-gold truncate",
                    compact ? "text-[11px]" : "text-[12px]"
                  )}
                >
                  {item.name}
                </div>
                {!compact && (
                  <div className="text-[10px] text-brand-text-sub truncate">{item.stats}</div>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-[11px] text-brand-text-sub leading-relaxed">
          {t("heroDetail.noRecommendedItems")}
        </p>
      )}
    </section>
  )
}
