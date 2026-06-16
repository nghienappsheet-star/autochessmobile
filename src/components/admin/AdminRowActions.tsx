import { Eye, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type AdminRowActionsProps = {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  viewLabel?: string
  editLabel?: string
  deleteLabel?: string
  className?: string
}

export function AdminRowActions({
  onView,
  onEdit,
  onDelete,
  viewLabel = "Xem",
  editLabel = "Sửa",
  deleteLabel = "Xóa",
  className,
}: AdminRowActionsProps) {
  return (
    <div className={cn("flex items-center justify-end gap-1", className)}>
      {onView && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-brand-text-sub hover:text-brand-gold"
          onClick={onView}
          aria-label={viewLabel}
        >
          <Eye className="w-4 h-4" />
        </Button>
      )}
      {onEdit && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-brand-text-sub hover:text-brand-gold"
          onClick={onEdit}
          aria-label={editLabel}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-brand-text-sub hover:text-brand-red"
          onClick={onDelete}
          aria-label={deleteLabel}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </div>
  )
}
