import { cn } from "@/lib/utils"
import type { ParsedStatBonus } from "@/lib/item-utils"
import { useTranslation } from "react-i18next"

type ItemStatGridProps = {
  stats: ParsedStatBonus[]
}

const toneClass: Record<NonNullable<ParsedStatBonus["tone"]>, string> = {
  gold: "text-brand-gold",
  red: "text-brand-red",
  green: "text-brand-green",
  default: "text-brand-text-main",
}

export function ItemStatGrid({ stats }: ItemStatGridProps) {
  const { t } = useTranslation("pages")

  if (stats.length === 0) return null

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
        {t("itemDetail.statBonusesTitle")}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={`${stat.label}-${stat.value}`}
            className="bg-brand-bg p-5 rounded-xl border border-brand-border text-center space-y-1"
          >
            <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-widest">
              {stat.label}
            </div>
            <div className={cn("text-2xl font-bold", toneClass[stat.tone ?? "default"])}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
