import * as React from "react"
import { cn } from "@/lib/utils"

export * from "./filter"

type FilterToolbarProps = {
  children: React.ReactNode
  className?: string
}

export function FilterToolbar({ children, className }: FilterToolbarProps) {
  return (
    <div
      className={cn(
        "bg-brand-card p-3 rounded-xl border border-brand-border",
        className
      )}
    >
      {children}
    </div>
  )
}
