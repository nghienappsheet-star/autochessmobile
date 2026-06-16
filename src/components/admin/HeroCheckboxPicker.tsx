import * as React from "react"
import { cn } from "@/lib/utils"
import type { Hero } from "@/types/domain"

type HeroCheckboxPickerProps = {
  heroes: Hero[]
  selectedIds: string[]
  onChange: (ids: string[]) => void
  className?: string
}

export function HeroCheckboxPicker({
  heroes,
  selectedIds,
  onChange,
  className,
}: HeroCheckboxPickerProps) {
  const toggle = (heroId: string) => {
    if (selectedIds.includes(heroId)) {
      onChange(selectedIds.filter((id) => id !== heroId))
      return
    }
    onChange([...selectedIds, heroId])
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto", className)}>
      {heroes.map((hero) => {
        const checked = selectedIds.includes(hero.id)
        return (
          <label
            key={hero.id}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer text-sm transition-colors",
              checked
                ? "border-brand-gold/40 bg-brand-gold/10 text-brand-text-main"
                : "border-brand-border bg-brand-card text-brand-text-sub hover:bg-brand-card-2"
            )}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(hero.id)}
              className="accent-brand-gold"
            />
            <span className="truncate">{hero.name}</span>
          </label>
        )
      })}
    </div>
  )
}
