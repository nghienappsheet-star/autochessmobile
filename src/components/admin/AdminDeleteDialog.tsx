import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/core"
import { Button } from "@/components/ui/core"
import { AlertTriangle } from "lucide-react"

type AdminDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description: string
  onConfirm: () => void
  confirmLabel?: string
}

export function AdminDeleteDialog({
  open,
  onOpenChange,
  title = "Xác nhận xóa",
  description,
  onConfirm,
  confirmLabel = "Xóa vĩnh viễn",
}: AdminDeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-card border-brand-border rounded-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="admin-dialog-title flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-brand-red shrink-0" />
            {title}
          </DialogTitle>
          <DialogDescription className="admin-body leading-relaxed pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-2 border-t border-brand-border pt-4">
          <Button
            variant="ghost"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </Button>
          <Button
            variant="danger"
            className="rounded-xl"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
