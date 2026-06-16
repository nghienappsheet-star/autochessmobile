import * as React from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type PageHeaderProps = {
  title: string
  description?: string
  icon?: LucideIcon
  children?: React.ReactNode
  className?: string
  showAccent?: boolean
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  children,
  className,
  showAccent = true,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white flex items-center gap-3">
          {Icon ? (
            <span className="w-10 h-10 rounded-xl border border-brand-border bg-brand-card flex items-center justify-center shrink-0 text-brand-gold">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
          ) : showAccent ? (
            <div className="w-2 h-8 bg-gold-gradient rounded-sm shrink-0" aria-hidden />
          ) : null}
          {title}
        </h1>
        {description && (
          <p className="text-sm text-brand-text-sub font-normal max-w-2xl">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-3 shrink-0">{children}</div>
      )}
    </div>
  )
}
