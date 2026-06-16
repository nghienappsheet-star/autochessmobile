import * as React from "react"
import { Card } from "@/components/ui/core"
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts"
import { useTranslation } from "react-i18next"
import type { Comp, Hero } from "@/types/domain"
import { computeCompRadarStats } from "@/lib/comp-stats"

type CompRadarAnalysisProps = {
  comp: Comp
  heroes: Hero[]
}

export function CompRadarAnalysis({ comp, heroes }: CompRadarAnalysisProps) {
  const { t } = useTranslation("pages")

  const stats = React.useMemo(
    () => computeCompRadarStats(comp, heroes),
    [comp, heroes]
  )

  const evaluationData = React.useMemo(
    () => [
      { subject: t("compDetail.radar.attack"), A: stats.attack, fullMark: 100 },
      { subject: t("compDetail.radar.defense"), A: stats.defense, fullMark: 100 },
      { subject: t("compDetail.radar.control"), A: stats.control, fullMark: 100 },
      { subject: t("compDetail.radar.difficulty"), A: stats.difficulty, fullMark: 100 },
      { subject: t("compDetail.radar.econ"), A: stats.economy, fullMark: 100 },
      { subject: t("compDetail.radar.lateGame"), A: stats.lateGame, fullMark: 100 },
    ],
    [stats, t]
  )

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-brand-border pb-4">
        <h3 className="text-lg font-bold uppercase tracking-tight text-white">
          {t("compDetail.multiAnalysis")}
        </h3>
      </div>

      <Card className="bg-brand-card border-brand-border p-6 md:p-10 flex flex-col relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none text-9xl font-bold">
          ANALYTIC
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-full min-h-[320px] md:min-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={evaluationData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#8A8F98", fontSize: 11, fontWeight: 600 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name={t("compDetail.radar.stats")}
                  dataKey="A"
                  stroke="#F5B43C"
                  fill="#F5B43C"
                  fillOpacity={0.15}
                  strokeWidth={2}
                  animationBegin={300}
                  animationDuration={1000}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full mt-8">
            {evaluationData.map((item) => (
              <div
                key={item.subject}
                className="bg-brand-bg border border-brand-border p-4 md:p-5 rounded-xl text-center shadow-inner group hover:border-brand-gold/30 transition-all"
              >
                <div className="text-[10px] font-bold text-brand-text-sub mb-2 uppercase tracking-widest">
                  {item.subject}
                </div>
                <div className="text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                  {item.A}
                  <span className="text-xs font-bold text-brand-text-sub ml-1">/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  )
}
