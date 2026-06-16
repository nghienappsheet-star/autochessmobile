import { Card } from "@/components/ui/core"
import { ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { TraitMilestone } from "@/lib/traits"

type TraitMilestoneListProps = {
  milestones: TraitMilestone[]
}

export function TraitMilestoneList({ milestones }: TraitMilestoneListProps) {
  const { t } = useTranslation("pages")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <ShieldCheck className="w-5 h-5 text-brand-gold" />
        <h3 className="text-xl font-bold uppercase tracking-tight text-brand-text-main">
          {t("traitDetail.synergiesTitle")}
        </h3>
      </div>

      <div className="space-y-4">
        {milestones.map((m, i) => (
          <Card
            key={i}
            className="bg-brand-card border-brand-border p-5 rounded-xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-gold/20 group-hover:bg-brand-gold transition-all" />
            <div className="flex items-center gap-4 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-[12px] font-bold text-brand-gold border border-brand-gold/20">
                {m.count}
              </div>
              <span className="text-[10px] font-bold uppercase text-brand-text-sub tracking-widest">
                {t("traitDetail.milestoneActivate", { count: m.count })}
              </span>
            </div>
            <p className="text-sm text-brand-text-sub leading-relaxed">{m.effect}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
