import * as React from "react"
import { Card, Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from "recharts"
import { useAppStore } from "@/contexts/DataContext"
import { useSiteSettings } from "@/hooks/useSiteSettings"
import { AdminPageHeader, AdminDemoBadge } from "@/components/admin/AdminPageHeader"

const TRAFFIC_DATA = [
  { day: '01', visits: 42000 },
  { day: '05', visits: 58000 },
  { day: '10', visits: 51000 },
  { day: '15', visits: 72000 },
  { day: '20', visits: 65000 },
  { day: '25', visits: 88000 },
  { day: '30', visits: 95000 },
]

const SOURCE_DATA = [
  { name: 'Trực tiếp', value: 50, color: '#F25C54' },
  { name: 'Tìm kiếm', value: 30, color: '#F5B43C' },
  { name: 'Mạng xã hội', value: 20, color: '#4D96F0' },
]

const TRENDING_COMPS = [
  { name: '9 Warrior', percent: 23.1, rank: 1 },
  { name: '6 Hunter', percent: 19.3, rank: 2 },
  { name: '6 Assassin', percent: 17.6, rank: 3 },
  { name: '9 Mage', percent: 16.8, rank: 4 },
]

const RANK_COLORS = ['#F25C54', '#F5A623', '#F5B43C', '#4D96F0']

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    background: '#15171D',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#F5F6F8',
  },
}

export function AdminPage() {
  const [trafficPeriod, setTrafficPeriod] = React.useState<'30' | '90'>('30')
  const { heroes, posts, comps, comments } = useAppStore()
  const settings = useSiteSettings()

  const pendingComments = comments.filter((c) => c.status === "Chờ duyệt").length
  const reportComments = comments.filter((c) => c.status === "Báo cáo").length

  const trafficScale = trafficPeriod === '90' ? 1.3 : 1
  const chartData = TRAFFIC_DATA.map((d) => ({
    ...d,
    visits: Math.round(d.visits * trafficScale),
  }))

  const statCards = [
    { label: 'Tướng', value: heroes.length.toLocaleString('vi-VN'), change: '+15.3%', positive: true },
    { label: 'Bài viết', value: posts.length.toLocaleString('vi-VN'), change: '+12.7%', positive: true },
    { label: 'Đội hình', value: comps.length.toLocaleString('vi-VN'), change: '+8.1%', positive: true },
    {
      label: 'Bình luận chờ / báo cáo',
      value: `${pendingComments} / ${reportComments}`,
      change: pendingComments > 0 ? `+${pendingComments}` : '0',
      positive: reportComments === 0,
    },
  ]

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        title="Tổng quan hệ thống"
        description={`Dữ liệu thời gian thực — ${settings.patchVersion}. Cập nhật liên tục từ kho dữ liệu.`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="p-6 flex flex-col shadow-none rounded-xl bg-brand-card border-brand-border group hover:border-brand-gold/20 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] text-brand-text-sub font-semibold uppercase tracking-wider">{stat.label}</span>
              <div className={cn("w-2 h-2 rounded-full", stat.positive ? "bg-brand-green shadow-[0_0_8px_rgba(63,185,80,0.5)]" : "bg-brand-red shadow-[0_0_8px_rgba(242,92,84,0.5)]")} />
            </div>
            <div className="flex items-end justify-between">
              <span className="admin-stat-value leading-none group-hover:text-brand-gold transition-colors">{stat.value}</span>
              <span className={cn("text-[11px] font-semibold flex items-center px-2 py-0.5 rounded border",
                stat.positive ? "text-brand-green bg-brand-green/5 border-brand-green/10" : "text-brand-red bg-brand-red/5 border-brand-red/10"
              )}>
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8 shadow-none rounded-xl bg-brand-card border-brand-border relative overflow-hidden">
          <div className="absolute top-6 right-6 flex gap-2">
            <button
              onClick={() => setTrafficPeriod('30')}
              className={cn(
                "px-3 py-1 rounded text-[11px] font-bold h-auto border transition-all",
                trafficPeriod === '30' ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-transparent"
              )}
            >
              30 NGÀY
            </button>
            <button
              onClick={() => setTrafficPeriod('90')}
              className={cn(
                "px-3 py-1 rounded text-[11px] font-semibold h-auto border transition-all",
                trafficPeriod === '90' ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-transparent"
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
                <XAxis dataKey="day" tick={{ fill: '#8A8F98', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#8A8F98', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}K`} />
                <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(value) => [`${Number(value).toLocaleString()}`, 'Lượt truy cập']} />
                <Area
                  type="monotone"
                  dataKey="visits"
                  stroke="#F5B43C"
                  strokeWidth={2}
                  fill="url(#goldArea)"
                  dot={{ fill: '#F5B43C', stroke: '#15171D', strokeWidth: 2, r: 4 }}
                  activeDot={{ fill: '#F5B43C', stroke: '#15171D', strokeWidth: 2, r: 6 }}
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
            <button className="text-[12px] font-semibold text-brand-gold hover:underline">Xem tất cả</button>
          </div>
          <div className="h-[180px] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRENDING_COMPS} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tick={{ fill: '#8A8F98', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                <Tooltip {...CHART_TOOLTIP_STYLE} formatter={(value) => [`${value}%`, 'Tỷ lệ']} />
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
              <div key={i} className="flex justify-between items-center bg-brand-card-2/50 p-3 rounded-xl border border-brand-border group hover:border-brand-gold/20 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded flex items-center justify-center font-bold text-[12px] text-brand-text-main shadow-md" style={{ background: RANK_COLORS[i] }}>
                    {item.rank}
                  </span>
                  <span className="font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors text-[14px]">{item.name}</span>
                </div>
                <span className="text-brand-text-sub font-mono font-semibold text-[12px]">{item.percent}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-none rounded-xl bg-brand-card border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="admin-card-title">Cập nhật tin tức</h3>
            <button className="text-[12px] font-semibold text-brand-gold hover:underline">Tạo mới</button>
          </div>
          <div className="space-y-4">
            {posts.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-4 group cursor-pointer border-b border-brand-border last:border-0 pb-3 last:pb-0">
                <div className="w-12 h-10 rounded bg-brand-card-2 flex-shrink-0 group-hover:ring-1 group-hover:ring-brand-gold/30 transition-all overflow-hidden flex items-center justify-center">
                  <span className="text-[10px] font-bold opacity-25">IMG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors truncate leading-tight mb-1">{item.title}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-brand-text-sub font-medium">{item.date}</span>
                    {item.status === 'Xuất bản' && <Badge className="bg-brand-red border-transparent text-white h-4 px-1.5 text-[8px] font-bold">HOT</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-none rounded-xl bg-brand-card border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="admin-card-title">Nhật ký hoạt động</h3>
            <button className="text-[12px] font-semibold text-brand-text-sub hover:text-brand-text-main transition-colors">
              Xóa lọc
            </button>
          </div>
          <div className="space-y-5">
            {[
              { user: 'Admin', action: 'đăng bài mới', time: '5p', icon: 'AD', color: 'bg-brand-red' },
              { user: 'User34', action: 'đăng đội hình', time: '12p', icon: 'U1' },
              { user: 'Player', action: 'bình luận', time: '1h', icon: 'P' },
              { user: 'JustWin', action: 'theo dõi', time: '2h', icon: 'J' },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 text-[14px] relative">
                {i !== 3 && <div className="absolute left-4 top-8 bottom-[-20px] w-[1px] bg-brand-border" />}
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-brand-text-main flex-shrink-0 z-10 border border-brand-border", item.color || "bg-brand-card-2")}>
                  {item.icon}
                </div>
                <div className="pt-0.5">
                  <div className="leading-tight text-[14px]"><span className="font-semibold text-brand-text-main">{item.user}</span> <span className="text-brand-text-sub">{item.action}</span></div>
                  <div className="text-[11px] text-brand-text-sub font-normal mt-1">{item.time} trước</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
