import * as React from "react"
import { Card } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type AdminStatCardsProps = {
  stats: Array<{
    label: string
    value: string | number
    sub?: string
  }>
  className?: string
}

export function AdminStatCards({ stats, className }: AdminStatCardsProps) {
  return (
    <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="bg-brand-card border-brand-border rounded-xl p-4 sm:p-5"
        >
          <p className="admin-eyebrow mb-2">
            {stat.label}
          </p>
          <p className="admin-stat-value">{stat.value}</p>
          {stat.sub && (
            <p className="admin-meta mt-1">{stat.sub}</p>
          )}
        </Card>
      ))}
    </div>
  )
}
