import * as React from "react"
import { cn } from "@/lib/utils"

type AdminFieldProps = {
  label: string
  htmlFor?: string
  hint?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

/** Standard form field: label + control + optional hint. */
export function AdminField({
  label,
  htmlFor,
  hint,
  required,
  className,
  children,
}: AdminFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="admin-form-label block">
        {label}
        {required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="admin-meta">{hint}</p>}
    </div>
  )
}

type AdminFormGridProps = {
  columns?: 1 | 2
  className?: string
  children: React.ReactNode
}

/** Standard form grid layout for admin dialogs. */
export function AdminFormGrid({ columns = 2, className, children }: AdminFormGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4 py-1",
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {children}
    </div>
  )
}

/** Full-width field spanning all columns in a 2-col grid. */
export function AdminFormGridFull({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("md:col-span-2", className)}>{children}</div>
}
