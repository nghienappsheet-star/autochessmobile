import * as React from "react"
import { AdminToolbar } from "./AdminToolbar"
import { cn } from "@/lib/utils"

type AdminFilterBarProps = {
  children: React.ReactNode
  className?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
}

/** @deprecated Prefer AdminToolbar — kept for backward compatibility. */
export function AdminFilterBar({
  children,
  className,
  searchValue,
  onSearchChange,
  searchPlaceholder,
}: AdminFilterBarProps) {
  return (
    <AdminToolbar
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      searchPlaceholder={searchPlaceholder}
      className={cn("border-0 rounded-none bg-transparent shadow-none p-4", className)}
    >
      {children}
    </AdminToolbar>
  )
}
