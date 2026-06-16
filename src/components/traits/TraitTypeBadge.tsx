import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import type { TraitKind } from "@/lib/traits"
import { useTranslation } from "react-i18next"

type TraitTypeBadgeProps = {
  kind: TraitKind
  className?: string
}

export function TraitTypeBadge({ kind, className }: TraitTypeBadgeProps) {
  const { t } = useTranslation("pages")

  const isRace = kind === "race"

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-bold text-[10px] uppercase tracking-widest",
        isRace
          ? "border-brand-gold/20 text-brand-gold bg-brand-gold/5"
          : "border-tier-b/30 text-tier-b bg-tier-b/10",
        className
      )}
    >
      {isRace ? t("traits.typeRace") : t("traits.typeClass")}
    </Badge>
  )
}
