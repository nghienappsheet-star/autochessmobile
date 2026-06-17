import * as React from "react"
import { cn } from "@/lib/utils"

type FilterToolbarSecondaryProps = {
  children: React.ReactNode
  className?: string
  bordered?: boolean
}

export function FilterToolbarSecondary({
  children,
  className,
  bordered = true,
}: FilterToolbarSecondaryProps) {
  return (
    <div
      className={cn(
        bordered && "border-t border-brand-border pt-3",
        className
      )}
    >
      {children}
    </div>
  )
}
