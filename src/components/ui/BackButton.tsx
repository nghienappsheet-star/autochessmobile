import { Link, useNavigate } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

type BackButtonProps = {
  to?: string
  label?: string
  className?: string
}

export function BackButton({ to, label, className }: BackButtonProps) {
  const { t } = useTranslation("common")
  const navigate = useNavigate()
  const text = label ?? t("back")

  const classNames = cn(
    "inline-flex items-center gap-2 text-brand-text-sub hover:text-brand-text-main font-bold text-[10px] uppercase tracking-widest transition-colors",
    className
  )

  if (to) {
    return (
      <Link to={to} className={classNames}>
        <ChevronLeft className="w-4 h-4" aria-hidden />
        {text}
      </Link>
    )
  }

  return (
    <button type="button" onClick={() => navigate(-1)} className={classNames}>
      <ChevronLeft className="w-4 h-4" aria-hidden />
      {text}
    </button>
  )
}
