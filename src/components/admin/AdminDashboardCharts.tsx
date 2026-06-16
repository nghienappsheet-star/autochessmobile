import * as React from "react"
import { Card } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { AdminDemoBadge } from "@/components/admin/AdminPageHeader"

const TRAFFIC_DATA = [
  { day: "01", visits: 42000 },
  { day: "05", visits: 58000 },
  { day: "10", visits: 51000 },
  { day: "15", visits: 72000 },
  { day: "20", visits: 65000 },
  { day: "25", visits: 88000 },
  { day: "30", visits: 95000 },
]

const SOURCE_DATA = [
  { name: "Trực tiếp", value: 50, color: "#F25C54" },
  { name: "Tìm kiếm", value: 30, color: "#F5B43C" },
  { name: "Mạng xã hội", value: 20, color: "#4D96F0" },
]

const TRENDING_COMPS = [
  { name: "9 Warrior", percent: 23.1, rank: 1 },
  { name: "6 Hunter", percent: 19.3, rank: 2 },
  { name: "6 Assassin", percent: 17.6, rank: 3 },
  { name: "9 Mage", percent: 16.8, rank: 4 },
]

const RANK_COLORS = ["#F25C54", "#F5A623", "#F5B43C", "#4D96F0"]

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: "#15171D",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "8px",
    fontSize: "12px",
    color: "#F5F6F8",
  },
}

type AdminDashboardChartsProps = {
  trafficPeriod: "30" | "90"
  onTrafficPeriodChange: (period: "30" | "90") => void
}

export function AdminDashboardCharts({
  trafficPeriod,
  onTrafficPeriodChange,
}: AdminDashboardChartsProps) {
  const trafficScale = trafficPeriod === "90" ? 1.3 : 1
  const chartData = TRAFFIC_DATA.map((d) => ({
    ...d,
    visits: Math.round(d.visits * trafficScale),
  }))

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8 shadow-none rounded-xl bg-brand-card border-brand-border relative overflow-hidden">
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              type="button"
              onClick={() => onTrafficPeriodChange("30")}
              className={cn(
                "px-3 py-1 rounded text-[11px] font-bold h-auto border transition-all",
                trafficPeriod === "30"
                  ? "bg-gold-gradient text-black border-transparent"
                  : "bg-brand-card-2 text-brand-text-sub border-transparent"
              )}
            >
              30 NGÀY
            </button>
            <button
              type="button"
              onClick={() => onTrafficPeriodChange("90")}
              className={cn(
                "px-3 py-1 rounded text-[11px] font-semibold h-auto border transition-all",
                trafficPeriod === "90"
                  ? "bg-gold-gradient text-black border-transparent"
                  : "bg-brand-card-2 text-brand-text-sub border-transparent"
              )}
            >
              90 NGÀY
            </button>
          </div>
          <h3 className="admin-card-title mb-6 flex items-center gap-2">
            Lưu lượng truy cập
            <AdminDemoBadge />
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5B43C" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#F5B43C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#8A8F98", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fill: "#8A8F98", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}K`}
                />
                <Tooltip
                  {...CHART_TOOLTIP_STYLE}
                  formatter={(value) => [`${Number(value).toLocaleString()}`, "Lượt truy cập"]}
                />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#F5B43C"
                  strokeWidth={2}
                  fill="url(#goldArea)"
                  dot={{ fill: "#F5B43C", stroke: "#15171D", strokeWidth: 2, r: 4 }}
                  activeDot={{ fill: "#F5B43C", stroke: "#15171D", strokeWidth: 2, r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-1 p-8 shadow-none rounded-xl bg-brand-card border-brand-border flex flex-col relative overflow-hidden">
          <h3 className="admin-card-title mb-6">
            Nguồn <span className="text-brand-gold">Source</span>
          </h3>
          <div className="relative w-44 h-44 mx-auto my-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="admin-stat-value leading-none">100%</span>
              <span className="admin-eyebrow mt-1">Tổng cộng</span>
            </div>
          </div>
          <div className="w-full text-[13px] space-y-3 mt-auto border-t border-brand-border pt-6">
            {SOURCE_DATA.map((item) => (
              <div key={item.name} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full mr-3" style={{ background: item.color }} />
                  {item.name}
                </div>
                <span className="font-semibold font-mono text-brand-text-main">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 shadow-none rounded-xl bg-brand-card border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="admin-card-title">Đội hình thịnh hành</h3>
            <button type="button" className="text-[12px] font-semibold text-brand-gold hover:underline">
              Xem tất cả
            </button>
          </div>
          <div className="h-[180px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRENDING_COMPS} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "#8A8F98", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                <Bar dataKey="percent" radius={[0, 4, 4, 0]} barSize={16}>
                  {TRENDING_COMPS.map((_, index) => (
                    <Cell key={`bar-${index}`} fill={RANK_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {TRENDING_COMPS.map((item, i) => (
              <div
                key={item.rank}
                className="flex justify-between items-center bg-brand-card-2/50 p-3 rounded-xl border border-brand-border group hover:border-brand-gold/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded flex items-center justify-center font-bold text-[12px] text-brand-text-main shadow-md"
                    style={{ background: RANK_COLORS[i] }}
                  >
                    {item.rank}
                  </span>
                  <span className="font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors text-[14px]">
                    {item.name}
                  </span>
                </div>
                <span className="text-brand-text-sub font-mono font-semibold text-[12px]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
