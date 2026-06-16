import { AdminTableActionButton } from "./AdminTableActionButton"
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
    <div className={cn("flex items-center justify-end gap-1.5", className)}>
      {onView && (
        <AdminTableActionButton variant="view" onClick={onView} label={viewLabel} />
      )}
      {onEdit && (
        <AdminTableActionButton variant="edit" onClick={onEdit} label={editLabel} />
      )}
      {onDelete && (
        <AdminTableActionButton variant="delete" onClick={onDelete} label={deleteLabel} />
      )}
    </div>
  )
}
