import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type FilterClearButtonProps = {
  visible: boolean
  onClick: () => void
  className?: string
}

export function FilterClearButton({ visible, onClick, className }: FilterClearButtonProps) {
  const { t } = useTranslation("common")

  if (!visible) return null

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "h-9 px-3 rounded-xl border-brand-border text-xs font-semibold shrink-0 hover:bg-brand-card-2",
        className
      )}
    >
      {t("clearFilters")}
    </Button>
  )
}
