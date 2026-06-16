import * as React from "react"
import { cn } from "@/lib/utils"

type AdminListShellProps = {
  header?: React.ReactNode
  children: React.ReactNode
  className?: string
  /** Extra content above the list table (stat cards, banners, etc.) */
  beforeList?: React.ReactNode
}

/**
 * Full-height admin list page shell.
 * Header stays fixed; list area fills remaining viewport and scrolls internally.
 */
export function AdminListShell({
  header,
  beforeList,
  children,
  className,
}: AdminListShellProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 h-[calc(100vh-7rem)] sm:h-[calc(100vh-6.5rem)] min-h-[480px]",
        className
      )}
    >
      {header}
      {beforeList}
      <div className="flex flex-col flex-1 min-h-0">{children}</div>
    </div>
  )
}
