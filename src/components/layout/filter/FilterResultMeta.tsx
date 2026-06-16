import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

type FilterResultMetaProps = {
  shown: number
  total: number
  className?: string
}

export function FilterResultMeta({ shown, total, className }: FilterResultMetaProps) {
  const { t } = useTranslation("common")

  return (
    <p className={cn("text-[12px] text-brand-text-sub font-medium", className)}>
      {t("resultsCount", { shown, total })}
    </p>
  )
}
