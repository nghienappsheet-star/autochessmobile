import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import type { CompSynergy } from "@/types/domain"

type CompSynergyPillsProps = {
  synergies: CompSynergy[]
  max?: number
  className?: string
  size?: "sm" | "md"
}

export function CompSynergyPills({
  synergies,
  max = 2,
  className,
  size = "md",
}: CompSynergyPillsProps) {
  const active = synergies.filter((s) => s.active).slice(0, max)

  if (active.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {active.map((syn) => (
        <Badge
          key={syn.name}
          className={cn(
            "bg-brand-gold/10 text-brand-gold border-brand-gold/20 font-bold truncate max-w-[140px]",
            size === "sm" ? "text-[8px] px-1.5 py-0" : "text-[9px] px-2 py-0.5"
          )}
        >
          {syn.name}
        </Badge>
      ))}
    </div>
  )
}
