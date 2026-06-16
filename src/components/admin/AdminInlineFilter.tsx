import * as React from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/core"
import { cn } from "@/lib/utils"

type AdminInlineFilterProps = {
  label: string
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  children: React.ReactNode
  className?: string
}

/** Compact labeled select for admin toolbar — prefix label clarifies filter type. */
export function AdminInlineFilter({
  label,
  value,
  onValueChange,
  placeholder = "Tất cả",
  children,
  className,
}: AdminInlineFilterProps) {
  return (
    <div
      className={cn(
        "flex items-center h-10 rounded-xl border border-brand-border bg-brand-card shrink-0 overflow-hidden",
        className
      )}
    >
      <span
        className="px-2.5 admin-meta font-semibold text-brand-text-sub whitespace-nowrap border-r border-brand-border h-full flex items-center bg-brand-card-2"
        aria-hidden
      >
        {label}
      </span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          className="h-10 min-w-[72px] max-w-[132px] border-0 rounded-none bg-transparent shadow-none focus:ring-0 px-2.5 text-[13px]"
          aria-label={label}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  )
}
