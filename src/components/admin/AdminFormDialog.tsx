import * as React from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/core"
import { cn } from "@/lib/utils"

export type AdminDialogSize = "sm" | "md" | "lg" | "xl"

const SIZE_CLASSES: Record<AdminDialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

type AdminFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  size?: AdminDialogSize
  children: React.ReactNode
  onSubmit?: () => void
  submitLabel?: string
  cancelLabel?: string
  isSubmitting?: boolean
  submitDisabled?: boolean
  footer?: React.ReactNode
  className?: string
}

/** Standardized admin form dialog with size variants and consistent footer. */
export function AdminFormDialog({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  onSubmit,
  submitLabel = "Lưu",
  cancelLabel = "Hủy",
  isSubmitting = false,
  submitDisabled = false,
  footer,
  className,
}: AdminFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 max-h-[90vh] overflow-hidden bg-brand-card border-brand-border rounded-xl",
          SIZE_CLASSES[size],
          className
        )}
      >
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b border-brand-border text-left space-y-1">
          <DialogTitle className="admin-dialog-title">{title}</DialogTitle>
          {description && (
            <DialogDescription className="admin-body mt-1">{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 py-4">
          {children}
        </div>

        <DialogFooter className="shrink-0 px-6 py-4 border-t border-brand-border bg-brand-card-2/20 gap-2 sm:gap-3 sm:space-x-0">
          {footer ?? (
            <>
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {cancelLabel}
              </Button>
              {onSubmit && (
                <Button
                  type="button"
                  className="rounded-xl bg-gold-gradient text-black font-semibold hover-gold-gradient"
                  onClick={onSubmit}
                  disabled={submitDisabled || isSubmitting}
                >
                  {submitLabel}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

type AdminDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  size?: AdminDialogSize
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

/** Standardized admin read-only detail dialog. */
export function AdminDetailDialog({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  footer,
  className,
}: AdminDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex flex-col gap-0 p-0 max-h-[90vh] overflow-hidden bg-brand-card border-brand-border rounded-xl",
          SIZE_CLASSES[size],
          className
        )}
      >
        <DialogHeader className="shrink-0 px-6 pt-6 pb-4 border-b border-brand-border text-left space-y-1">
          <DialogTitle className="admin-dialog-title">{title}</DialogTitle>
          {description && (
            <DialogDescription className="admin-body mt-1">{description}</DialogDescription>
          )}
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 py-4">
          {children}
        </div>

        {footer && (
          <DialogFooter className="shrink-0 px-6 py-4 border-t border-brand-border bg-brand-card-2/20 gap-2 sm:gap-3 sm:space-x-0">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
