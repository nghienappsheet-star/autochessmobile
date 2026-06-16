import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

type HeroNewBadgeProps = {
  size?: "sm" | "md"
  className?: string
}

export function HeroNewBadge({ size = "md", className }: HeroNewBadgeProps) {
  const { t } = useTranslation("pages")
  const compact = size === "sm"

  return (
    <Badge
      variant="success"
      className={cn(
        "font-bold uppercase tracking-wider rounded-md border-brand-green/20",
        compact ? "text-[9px] px-1.5 py-0 leading-tight" : "text-[10px] px-2 py-0.5",
        className
      )}
    >
      {t("heroes.newBadge")}
    </Badge>
  )
}
