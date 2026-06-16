import * as React from "react"
import { cn } from "@/lib/utils"

type AdminTableProps = React.HTMLAttributes<HTMLTableElement> & {
  minWidth?: string
}

/** Standard admin table with horizontal scroll wrapper. */
export function AdminTable({
  className,
  minWidth = "850px",
  children,
  ...props
}: AdminTableProps) {
  return (
    <table
      className={cn("w-full text-left border-collapse admin-table-cell", className)}
      style={{ minWidth }}
      {...props}
    >
      {children}
    </table>
  )
}

type AdminTheadProps = React.HTMLAttributes<HTMLTableSectionElement> & {
  sticky?: boolean
}

export function AdminThead({ className, sticky = true, ...props }: AdminTheadProps) {
  return (
    <thead
      className={cn(
        "admin-table-head border-b border-brand-border bg-brand-card-2/80 backdrop-blur-sm",
        sticky && "sticky top-0 z-10",
        className
      )}
      {...props}
    />
  )
}

export function AdminTh({
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn("py-3.5 px-4 first:pl-6 last:pr-6 font-semibold whitespace-nowrap", className)}
      {...props}
    />
  )
}

export function AdminTr({
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-brand-border last:border-0 hover:bg-brand-card-2/30 transition-colors",
        className
      )}
      {...props}
    />
  )
}

export function AdminTd({
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn("py-3.5 px-4 first:pl-6 last:pr-6 align-middle", className)}
      {...props}
    />
  )
}

/** Scrollable table body region inside AdminDataTable. */
export function AdminTableScroll({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full overflow-auto custom-scrollbar flex-1 min-h-0", className)}
      {...props}
    >
      {children}
    </div>
  )
}

/** Standard pagination footer text. */
export function AdminTableFooterText({
  start,
  end,
  total,
  label = "bản ghi",
}: {
  start: number
  end: number
  total: number
  label?: string
}) {
  if (total === 0) {
    return (
      <p className="admin-meta">
        Không có {label}
      </p>
    )
  }
  return (
    <p className="admin-meta">
      Hiển thị {start} đến {end} trên tổng số {total} {label}
    </p>
  )
}
