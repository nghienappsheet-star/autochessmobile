import { Search } from "lucide-react"
import { Input } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type FilterSearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  "aria-label"?: string
  className?: string
}

export function FilterSearchInput({
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  className,
}: FilterSearchInputProps) {
  return (
    <div className={cn("relative w-full sm:flex-1 sm:min-w-[140px] sm:max-w-[240px] group", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors"
        aria-hidden
      />
      <Input
        type="search"
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 h-9 rounded-xl bg-brand-bg border-brand-border text-sm focus:ring-1 focus:ring-brand-gold/30"
      />
    </div>
  )
}
