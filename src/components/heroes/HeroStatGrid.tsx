import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { ResolvedHeroStats } from "@/lib/hero-utils"
import type { HeroStar } from "@/lib/hero-utils"

type HeroStatGridProps = {
  stats: ResolvedHeroStats
  star: HeroStar
  variant?: "default" | "compact"
}

export function HeroStatGrid({ stats, star, variant = "default" }: HeroStatGridProps) {
  const { t } = useTranslation("pages")
  const compact = variant === "compact"

  const cells = [
    { label: t("heroDetail.stats.hp"), value: stats.hp, key: "hp" },
    { label: t("heroDetail.stats.atk"), value: stats.atk, key: "atk" },
    { label: t("heroDetail.stats.armor"), value: stats.armor, key: "armor" },
    { label: t("heroDetail.stats.mr"), value: `${stats.mr}%`, key: "mr" },
    { label: t("heroDetail.stats.atkSpeed"), value: stats.atkSpeed.toFixed(1), key: "atkSpeed" },
    { label: t("heroDetail.stats.range"), value: stats.range, key: "range" },
  ]

  return (
    <section className={cn("space-y-4", compact && "space-y-2")}>
      <h3
        className={cn(
          "font-bold uppercase tracking-[0.2em] text-brand-gold",
          compact ? "text-[10px]" : "text-[12px]"
        )}
      >
        {t("heroDetail.statsTitle")}
      </h3>

      <div className={cn("grid gap-2", compact ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 gap-3")}>
        {cells.map((cell) => (
          <div
            key={cell.label}
            className={cn(
              "bg-brand-bg rounded-xl border border-brand-border text-center space-y-0.5",
              compact ? "p-2" : "p-4 space-y-1"
            )}
          >
            <div
              className={cn(
                "font-bold text-brand-text-sub uppercase tracking-widest",
                compact ? "text-[9px]" : "text-[10px]"
              )}
            >
              {cell.label}
            </div>
            <div
              key={`${cell.key}-${star}`}
              className={cn(
                "font-bold text-brand-text-main",
                compact ? "text-sm" : "text-xl",
                (cell.key === "hp" || cell.key === "atk") && "text-brand-gold"
              )}
            >
              {cell.value}
            </div>
          </div>
        ))}
      </div>

      <p className={cn("text-brand-text-sub", compact ? "text-[10px]" : "text-[11px]")}>
        {t("heroDetail.stats.star", { star })}
      </p>
    </section>
  )
}
