import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type AdminPageHeaderProps = {
  title: string
  description?: string
  icon?: LucideIcon
  breadcrumb?: string
  children?: React.ReactNode
  className?: string
}

export function AdminPageHeader({
  title,
  description,
  icon: Icon,
  breadcrumb,
  children,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
    >
      <div>
        {breadcrumb && (
          <p className="text-[11px] text-brand-text-sub mb-1.5 font-medium">{breadcrumb}</p>
        )}
        <h1 className="admin-h1 mb-1.5 flex items-center gap-2">
          {Icon && <Icon className="h-6 w-6 text-brand-gold shrink-0" aria-hidden />}
          {title}
        </h1>
        {description && (
          <p className="admin-body max-w-2xl">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  )
}

export function AdminSuccessBanner({ message }: { message: string }) {
  if (!message) return null
  return (
    <div className="flex items-center gap-3 bg-brand-green/10 border border-brand-border text-brand-green p-4 rounded-xl text-[13px] font-semibold">
      {message}
    </div>
  )
}

export function AdminDemoBadge({ label = "Dữ liệu demo" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-brand-border bg-brand-card-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-text-sub">
      {label}
    </span>
  )
}

export function AdminEmptyState({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div className="py-16 text-center">
      <p className="admin-table-cell font-semibold mb-1">{title}</p>
      {description && <p className="admin-body">{description}</p>}
    </div>
  )
}
