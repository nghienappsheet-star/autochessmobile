import * as React from "react"
import { Card } from "@/components/ui/core"
import { Pagination } from "@/components/ui/Pagination"
import { cn } from "@/lib/utils"
import { AdminEmptyState } from "@/components/admin/AdminPageHeader"
import { AdminTableScroll } from "@/components/admin/AdminTable"

type AdminDataTableProps = {
  toolbar?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  currentPage?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  emptyTitle?: string
  emptyDescription?: string
  isEmpty?: boolean
  /** When true, table fills parent height and body scrolls internally. */
  fillHeight?: boolean
  className?: string
}

/** Card shell for admin tables: optional toolbar, scrollable body, pagination footer. */
export function AdminDataTable({
  toolbar,
  children,
  footer,
  currentPage,
  totalPages,
  onPageChange,
  emptyTitle,
  emptyDescription,
  isEmpty,
  fillHeight = false,
  className,
}: AdminDataTableProps) {
  const showPagination =
    totalPages !== undefined &&
    currentPage !== undefined &&
    onPageChange !== undefined &&
    totalPages > 1

  return (
    <Card
      className={cn(
        "flex flex-col bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden",
        fillHeight && "flex-1 min-h-0 h-full",
        className
      )}
    >
      {toolbar && (
        <div className="shrink-0 border-b border-brand-border bg-brand-card-2/30">
          {toolbar}
        </div>
      )}

      {isEmpty && emptyTitle ? (
        <AdminEmptyState title={emptyTitle} description={emptyDescription} />
      ) : fillHeight ? (
        <AdminTableScroll>{children}</AdminTableScroll>
      ) : (
        <div className="w-full overflow-auto custom-scrollbar">{children}</div>
      )}

      {(showPagination || footer) && (
        <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-brand-border bg-brand-card-2/20">
          {footer}
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              className="ml-auto"
            />
          )}
        </div>
      )}
    </Card>
  )
}
