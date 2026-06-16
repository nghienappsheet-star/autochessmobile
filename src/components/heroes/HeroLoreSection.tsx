import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

type HeroLoreSectionProps = {
  lore: string
}

export function HeroLoreSection({ lore }: HeroLoreSectionProps) {
  const { t } = useTranslation("pages")
  const [expanded, setExpanded] = React.useState(false)
  const isLong = lore.length > 280

  if (!lore.trim() || lore === "Stay Tuned.") return null

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
        {t("heroDetail.lore")}
      </h3>
      <div className="bg-brand-bg p-5 rounded-xl border border-brand-border">
        <p
          className={cn(
            "text-sm text-brand-text-sub leading-relaxed",
            !expanded && isLong && "line-clamp-4"
          )}
        >
          {lore}
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-3 flex items-center gap-1 text-xs font-bold text-brand-gold hover:underline"
          >
            {expanded ? t("heroDetail.loreCollapse") : t("heroDetail.loreExpand")}
            <ChevronDown className={cn("w-4 h-4 transition-transform", expanded && "rotate-180")} />
          </button>
        )}
      </div>
    </section>
  )
}
