import * as React from "react"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Card } from "@/components/ui/core"
import type { Comp, CompRadarStats } from "@/types/domain"

const RADAR_AXIS_KEYS: (keyof CompRadarStats)[] = [
  "attack",
  "defense",
  "control",
  "difficulty",
  "economy",
  "lateGame",
]

const RADAR_LABEL_KEYS: Record<keyof CompRadarStats, string> = {
  attack: "attack",
  defense: "defense",
  control: "control",
  difficulty: "difficulty",
  economy: "econ",
  lateGame: "lateGame",
}

export type CompCompareRadarColumn = {
  comp: Comp
  radar: CompRadarStats
  accent: string
}

type CompCompareRadarChartProps = {
  columns: CompCompareRadarColumn[]
  title: string
  t: (key: string) => string
}

export function CompCompareRadarChart({ columns, title, t }: CompCompareRadarChartProps) {
  const radarData = React.useMemo(() => {
    return RADAR_AXIS_KEYS.map((axisKey) => {
      const labelKey = RADAR_LABEL_KEYS[axisKey]
      const row: Record<string, string | number> = {
        subject: t(`pages:compDetail.radar.${labelKey}`),
      }
      columns.forEach(({ comp, radar }) => {
        row[comp.id] = radar[axisKey]
      })
      return row
    })
  }, [columns, t])

  return (
    <Card className="bg-brand-card border-brand-border p-4 md:p-6 rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h4 className="text-sm font-bold text-brand-text-main">{title}</h4>
        <div className="flex flex-wrap gap-3">
          {columns.map(({ comp, accent }) => (
            <div key={comp.id} className="flex items-center gap-2 text-[11px] font-semibold text-brand-text-sub">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accent }} />
              <span className="truncate max-w-[120px]">{comp.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full min-h-[280px] md:min-h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#8A8F98", fontSize: 10, fontWeight: 600 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            {columns.map(({ comp, accent }) => (
              <Radar
                key={comp.id}
                name={comp.name}
                dataKey={comp.id}
                stroke={accent}
                fill={accent}
                fillOpacity={0.12}
                strokeWidth={2}
              />
            ))}
            <Legend wrapperStyle={{ display: "none" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
