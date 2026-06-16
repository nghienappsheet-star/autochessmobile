import { Eye, SquarePen, Trash2, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type ActionVariant = "view" | "edit" | "delete"

const VARIANT_CONFIG: Record<
  ActionVariant,
  { icon: LucideIcon; buttonClass: string }
> = {
  view: {
    icon: Eye,
    buttonClass: "hover:bg-brand-gold/10 hover:border-brand-gold/25 hover:text-brand-gold",
  },
  edit: {
    icon: SquarePen,
    buttonClass: "hover:bg-brand-gold/10 hover:border-brand-gold/25 hover:text-brand-gold",
  },
  delete: {
    icon: Trash2,
    buttonClass: "hover:bg-brand-red/10 hover:border-brand-red/25 hover:text-brand-red",
  },
}

type AdminTableActionButtonProps = {
  variant: ActionVariant
  onClick: () => void
  label: string
  className?: string
}

/** Premium bordered icon action for admin data tables. */
export function AdminTableActionButton({
  variant,
  onClick,
  label,
  className,
}: AdminTableActionButtonProps) {
  const { icon: Icon, buttonClass } = VARIANT_CONFIG[variant]

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-lg border border-brand-border bg-brand-card-2/50 text-brand-text-sub shadow-sm transition-all duration-200",
        buttonClass,
        className
      )}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
    </Button>
  )
}
