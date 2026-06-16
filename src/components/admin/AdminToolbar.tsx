import * as React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type AdminToolbarProps = {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  children?: React.ReactNode
  className?: string
  /** Single-row layout: search + filters without wrapping. */
  inline?: boolean
}

/** Shared admin list toolbar: search + optional filter slots. */
export function AdminToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  children,
  className,
  inline = false,
}: AdminToolbarProps) {
  return (
    <div
      className={cn(
        inline
          ? "flex flex-row items-center gap-2 p-3 overflow-x-auto"
          : "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4",
        className
      )}
    >
      {onSearchChange !== undefined && (
        <div
          className={cn(
            "relative group shrink-0",
            inline ? "flex-1 min-w-[140px] max-w-xs" : "w-full sm:max-w-sm lg:flex-1"
          )}
        >
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors pointer-events-none"
            aria-hidden
          />
          <Input
            value={searchValue ?? ""}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="pl-10 h-10 text-[13px] bg-brand-card border-brand-border rounded-xl"
          />
        </div>
      )}
      {children && (
        <div
          className={cn(
            "flex items-center gap-2 shrink-0",
            inline ? "flex-nowrap" : "flex-wrap sm:gap-3 w-full sm:w-auto sm:ml-auto"
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
