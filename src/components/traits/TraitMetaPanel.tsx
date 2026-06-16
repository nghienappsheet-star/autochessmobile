import { Card, Badge } from "@/components/ui/core"
import { BarChart3 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { TraitPopularity, TraitPhaseStrength, TraitTier } from "@/lib/trait-meta"

type TraitMetaPanelProps = {
  tier: TraitTier
  popularity: TraitPopularity
  phase: TraitPhaseStrength
}

const TIER_VARIANT: Record<TraitTier, "tier-s" | "tier-a" | "tier-b" | "tier-c"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
}

function PhaseBar({
  label,
  value,
  colorClass,
}: {
  label: string
  value: number
  colorClass: string
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-brand-text-sub">{label}</span>
        <span className="font-bold text-brand-text-main">{value}%</span>
      </div>
      <div className="h-2 rounded-md bg-brand-card-2 overflow-hidden border border-brand-border">
        <div
          className={cn("h-full rounded-md transition-all", colorClass)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export function TraitMetaPanel({ tier, popularity, phase }: TraitMetaPanelProps) {
  const { t } = useTranslation("pages")

  return (
    <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-5">
      <div className="flex items-center gap-3">
        <BarChart3 className="w-5 h-5 text-brand-gold shrink-0" />
        <h3 className="text-sm font-bold tracking-tight text-brand-text-main">
          {t("traitDetail.metaTitle")}
        </h3>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
          {t("traitDetail.tierLabel")}
        </span>
        <Badge variant={TIER_VARIANT[tier]} className="text-[10px] font-bold">
          {tier} {t("traitDetail.tierSuffix")}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-brand-text-sub">{t("traitDetail.pickRate")}</span>
          <span className="font-bold text-brand-gold">{popularity.pickRatePct}%</span>
        </div>
        <div className="h-2.5 rounded-md bg-brand-card-2 overflow-hidden border border-brand-border">
          <div
            className="h-full rounded-md bg-gold-gradient"
            style={{ width: `${popularity.pickRatePct}%` }}
          />
        </div>
        <p className="text-[10px] text-brand-text-sub">
          {t("traitDetail.compUsage", { count: popularity.compCount })}
        </p>
      </div>

      <div className="space-y-3 pt-1 border-t border-brand-border">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
          {t("traitDetail.phaseTitle")}
        </p>
        <PhaseBar
          label={t("traitDetail.phaseEarly")}
          value={phase.early}
          colorClass="bg-brand-green"
        />
        <PhaseBar
          label={t("traitDetail.phaseMid")}
          value={phase.mid}
          colorClass="bg-tier-b"
        />
        <PhaseBar
          label={t("traitDetail.phaseLate")}
          value={phase.late}
          colorClass="bg-brand-gold"
        />
      </div>

      <p className="text-[10px] text-brand-text-sub leading-relaxed border-t border-brand-border pt-3">
        {t("traitDetail.heuristicNote")}
      </p>
    </Card>
  )
}
