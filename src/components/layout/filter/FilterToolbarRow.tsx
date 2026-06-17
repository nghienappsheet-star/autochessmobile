import * as React from "react"
import { cn } from "@/lib/utils"

type FilterToolbarRowProps = {
  children: React.ReactNode
  className?: string
}

export function FilterToolbarRow({ children, className }: FilterToolbarRowProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 w-full",
        className
      )}
    >
      {children}
    </div>
  )
}
