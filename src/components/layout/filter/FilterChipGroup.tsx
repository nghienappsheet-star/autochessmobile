import { cn } from "@/lib/utils"

export type FilterChipOption = {
  value: string
  label: string
}

type FilterChipGroupProps = {
  options: FilterChipOption[]
  selected: string | null
  onSelect: (value: string | null) => void
  label?: string
  "aria-label"?: string
  className?: string
}

export function FilterChipGroup({
  options,
  selected,
  onSelect,
  label,
  "aria-label": ariaLabel,
  className,
}: FilterChipGroupProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1.5 shrink-0", className)}
      role="group"
      aria-label={ariaLabel ?? label}
    >
      {label && (
        <span className="text-[11px] text-brand-text-sub font-medium shrink-0">{label}</span>
      )}
      {options.map((option) => {
        const isActive = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(isActive ? null : option.value)}
            className={cn(
              "h-8 min-w-[2rem] px-2 rounded-lg border flex items-center justify-center font-bold text-xs transition-colors shrink-0",
              isActive
                ? "bg-gold-gradient text-black border-transparent"
                : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:text-brand-text-main"
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
