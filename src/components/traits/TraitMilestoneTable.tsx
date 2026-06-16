import { Card } from "@/components/ui/core"
import { ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { TraitMilestone } from "@/lib/traits"

type TraitMilestoneTableProps = {
  milestones: TraitMilestone[]
  recommendedCount?: number | null
}

export function TraitMilestoneTable({
  milestones,
  recommendedCount,
}: TraitMilestoneTableProps) {
  const { t } = useTranslation("pages")

  if (milestones.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
        <h3 className="text-lg font-bold tracking-tight text-brand-text-main">
          {t("traitDetail.synergiesTitle")}
        </h3>
      </div>

      <Card className="bg-brand-card border-brand-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border bg-brand-card-2/50">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub w-28">
                  {t("traitDetail.milestoneCountColumn")}
                </th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("traitDetail.milestoneEffectColumn")}
                </th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m, i) => {
                const isRecommended = recommendedCount === m.count
                return (
                  <tr
                    key={`${m.count}-${i}`}
                    className={cn(
                      "border-b border-brand-border last:border-0 transition-colors",
                      isRecommended && "bg-brand-gold/5"
                    )}
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center min-w-9 h-9 px-2 rounded-lg text-sm font-bold border",
                            isRecommended
                              ? "bg-brand-gold/15 text-brand-gold border-brand-gold/30"
                              : "bg-brand-card-2 text-brand-gold border-brand-gold/20"
                          )}
                        >
                          {m.count}
                        </span>
                        {isRecommended && (
                          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-gold">
                            {t("traitDetail.recommendedBadge")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-brand-text-sub leading-relaxed align-top">
                      {m.effect}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
