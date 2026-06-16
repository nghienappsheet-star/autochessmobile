import { Zap } from "lucide-react"
import { useTranslation } from "react-i18next"

type ItemEffectBlockProps = {
  effect: string
}

export function ItemEffectBlock({ effect }: ItemEffectBlockProps) {
  const { t } = useTranslation("pages")

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
        <Zap className="w-4 h-4 fill-brand-gold" />
        {t("itemDetail.specialEffect")}
      </h3>
      <div className="bg-brand-bg p-6 rounded-xl border border-brand-border relative group">
        <div className="absolute -right-2 -top-2 w-12 h-12 bg-brand-gold/5 rounded-full blur-xl group-hover:bg-brand-gold/10 transition-all" />
        <p className="text-lg text-brand-text-main font-semibold leading-relaxed relative z-10">
          {effect}
        </p>
      </div>
    </section>
  )
}
