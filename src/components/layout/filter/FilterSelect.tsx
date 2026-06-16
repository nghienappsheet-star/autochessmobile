import * as React from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { cn } from "@/lib/utils"

export type FilterSelectOption = {
  value: string
  label: string
}

type FilterSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: FilterSelectOption[]
  placeholder?: string
  "aria-label": string
  className?: string
  size?: "default" | "sm"
}

export function FilterSelect({
  value,
  onValueChange,
  options,
  placeholder,
  "aria-label": ariaLabel,
  className,
  size = "sm",
}: FilterSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        size={size}
        className={cn("h-9 min-w-[108px] max-w-[148px] shrink-0 rounded-xl", className)}
        aria-label={ariaLabel}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
