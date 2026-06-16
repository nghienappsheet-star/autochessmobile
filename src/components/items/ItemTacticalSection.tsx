import { TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

type ItemTacticalSectionProps = {
  notes: string[]
}

export function ItemTacticalSection({ notes }: ItemTacticalSectionProps) {
  const { t } = useTranslation("pages")

  if (notes.length === 0) return null

  return (
    <section className="space-y-4">
      <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
        <TrendingUp className="w-4 h-4" />
        {t("itemDetail.tacticalReview")}
      </h3>
      <ul className="space-y-3 text-brand-text-sub text-sm leading-relaxed font-medium">
        {notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span className="text-brand-gold font-bold shrink-0">»</span>
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
