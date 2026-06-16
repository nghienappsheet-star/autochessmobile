import { cn } from "@/lib/utils"
import { Star } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { HeroStar } from "@/lib/hero-utils"

type HeroStarSelectorProps = {
  star: HeroStar
  onChange: (star: HeroStar) => void
}

const STARS: HeroStar[] = [1, 2, 3]

export function HeroStarSelector({ star, onChange }: HeroStarSelectorProps) {
  const { t } = useTranslation("pages")

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
        {t("heroDetail.selectStar")}
      </span>
      <div className="flex gap-2">
        {STARS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={cn(
              "flex items-center gap-1.5 px-4 h-9 rounded-xl border text-sm font-semibold transition-all",
              star === s
                ? "bg-gold-gradient text-black border-transparent"
                : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-brand-text-main"
            )}
          >
            {Array.from({ length: s }).map((_, i) => (
              <Star key={i} className={cn("w-3.5 h-3.5", star === s ? "fill-black" : "fill-brand-gold text-brand-gold")} />
            ))}
          </button>
        ))}
      </div>
    </div>
  )
}
