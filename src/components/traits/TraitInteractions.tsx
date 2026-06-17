import * as React from "react"
import { Card, Badge } from "@/components/ui/core"
import { GitBranch, Swords, ShieldAlert } from "lucide-react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import type { TraitMatchups, TraitPartner } from "@/lib/trait-meta"
import { getTraitDetailPath } from "@/lib/traits"
import { TraitIcon } from "./TraitIcon"
import { TraitTypeBadge } from "./TraitTypeBadge"

type TraitInteractionsProps = {
  partners: TraitPartner[]
  matchups: TraitMatchups
}

function TraitLinkBadge({
  id,
  name,
  kind,
}: {
  id: string
  name: string
  kind: TraitPartner["kind"]
}) {
  return (
    <Link
      to={getTraitDetailPath(kind, id)}
      className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-card-2 px-2 py-1.5 hover:border-brand-gold/30 transition-colors group"
    >
      <TraitIcon id={id} icon="❓" name={name} size="xs" />
      <span className="text-[11px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors">
        {name}
      </span>
      <TraitTypeBadge kind={kind} className="scale-90 origin-left" />
    </Link>
  )
}

export function TraitInteractions({ partners, matchups }: TraitInteractionsProps) {
  const { t } = useTranslation("pages")

  return (
    <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-5">
      <div className="flex items-center gap-3">
        <GitBranch className="w-5 h-5 text-brand-gold shrink-0" />
        <h3 className="text-sm font-bold tracking-tight text-brand-text-main">
          {t("traitDetail.interactionsTitle")}
        </h3>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
          {t("traitDetail.synergyPartners")}
        </p>
        {partners.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {partners.map((p) => (
              <React.Fragment key={`${p.kind}-${p.id}`}>
              <TraitLinkBadge id={p.id} name={p.name} kind={p.kind} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p className="text-xs text-brand-text-sub">{t("traitDetail.noPartners")}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 pt-1 border-t border-brand-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-brand-green" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
              {t("traitDetail.counters")}
            </p>
          </div>
          {matchups.counters.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchups.counters.map((m) => (
                <React.Fragment key={`c-${m.kind}-${m.id}`}>
                <TraitLinkBadge id={m.id} name={m.name} kind={m.kind} />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <Badge variant="outline" className="text-[10px]">
              {t("traitDetail.noMatchups")}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-red" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
              {t("traitDetail.counteredBy")}
            </p>
          </div>
          {matchups.counteredBy.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {matchups.counteredBy.map((m) => (
                <React.Fragment key={`cb-${m.kind}-${m.id}`}>
                <TraitLinkBadge id={m.id} name={m.name} kind={m.kind} />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <Badge variant="outline" className="text-[10px]">
              {t("traitDetail.noMatchups")}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
