import * as React from "react"
import { Card, Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/contexts/DataContext"
import { useSiteSettings } from "@/hooks/useSiteSettings"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"

const AdminDashboardCharts = React.lazy(() =>
  import("@/components/admin/AdminDashboardCharts").then((module) => ({
    default: module.AdminDashboardCharts,
  }))
)

export function AdminPage() {
  const [trafficPeriod, setTrafficPeriod] = React.useState<"30" | "90">("30")
  const { heroes, posts, comps, comments } = useAppStore()
  const settings = useSiteSettings()

  const pendingComments = comments.filter((c) => c.status === "Chờ duyệt").length
  const reportComments = comments.filter((c) => c.status === "Báo cáo").length

  const statCards = [
    { label: "Tướng", value: heroes.length.toLocaleString("vi-VN"), change: "+15.3%", positive: true },
    { label: "Bài viết", value: posts.length.toLocaleString("vi-VN"), change: "+12.7%", positive: true },
    { label: "Đội hình", value: comps.length.toLocaleString("vi-VN"), change: "+8.1%", positive: true },
    {
      label: "Bình luận chờ / báo cáo",
      value: `${pendingComments} / ${reportComments}`,
      change: pendingComments > 0 ? `+${pendingComments}` : "0",
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
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="p-6 flex flex-col shadow-none rounded-xl bg-brand-card border-brand-border group hover:border-brand-gold/20 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] text-brand-text-sub font-semibold uppercase tracking-wider">
                {stat.label}
              </span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  stat.positive
                    ? "bg-brand-green shadow-[0_0_8px_rgba(63,185,80,0.5)]"
                    : "bg-brand-red shadow-[0_0_8px_rgba(242,92,84,0.5)]"
                )}
              />
            </div>
            <div className="flex items-end justify-between">
              <span className="admin-stat-value leading-none group-hover:text-brand-gold transition-colors">
                {stat.value}
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold flex items-center px-2 py-0.5 rounded border",
                  stat.positive
                    ? "text-brand-green bg-brand-green/5 border-brand-green/10"
                    : "text-brand-red bg-brand-red/5 border-brand-red/10"
                )}
              >
                {stat.change}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <React.Suspense
        fallback={
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-8 rounded-xl bg-brand-card border-brand-border min-h-[250px] flex items-center justify-center">
              <p className="text-sm text-brand-text-sub">Đang tải biểu đồ...</p>
            </Card>
          </div>
        }
      >
        <AdminDashboardCharts trafficPeriod={trafficPeriod} onTrafficPeriodChange={setTrafficPeriod} />
      </React.Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 shadow-none rounded-xl bg-brand-card border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="admin-card-title">Cập nhật tin tức</h3>
            <button type="button" className="text-[12px] font-semibold text-brand-gold hover:underline">
              Tạo mới
            </button>
          </div>
          <div className="space-y-4">
            {posts.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 group cursor-pointer border-b border-brand-border last:border-0 pb-3 last:pb-0"
              >
                <div className="w-12 h-10 rounded bg-brand-card-2 flex-shrink-0 group-hover:ring-1 group-hover:ring-brand-gold/30 transition-all overflow-hidden flex items-center justify-center">
                  <span className="text-[10px] font-bold opacity-25">IMG</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors truncate leading-tight mb-1">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-brand-text-sub font-medium">{item.date}</span>
                    {item.status === "Xuất bản" && (
                      <Badge className="bg-brand-red border-transparent text-white h-4 px-1.5 text-[8px] font-bold">
                        HOT
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 shadow-none rounded-xl bg-brand-card border-brand-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="admin-card-title">Nhật ký hoạt động</h3>
            <button
              type="button"
              className="text-[12px] font-semibold text-brand-text-sub hover:text-brand-text-main transition-colors"
            >
              Xóa lọc
            </button>
          </div>
          <div className="space-y-5">
            {[
              { user: "Admin", action: "đăng bài mới", time: "5p", icon: "AD", color: "bg-brand-red" },
              { user: "User34", action: "đăng đội hình", time: "12p", icon: "U1" },
              { user: "Player", action: "bình luận", time: "1h", icon: "P" },
              { user: "JustWin", action: "theo dõi", time: "2h", icon: "J" },
            ].map((item, i, arr) => (
              <div key={item.user} className="flex gap-3 text-[14px] relative">
                {i !== arr.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-[-20px] w-[1px] bg-brand-border" />
                )}
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-brand-text-main flex-shrink-0 z-10 border border-brand-border",
                    item.color || "bg-brand-card-2"
                  )}
                >
                  {item.icon}
                </div>
                <div className="pt-0.5">
                  <div className="leading-tight text-[14px]">
                    <span className="font-semibold text-brand-text-main">{item.user}</span>{" "}
                    <span className="text-brand-text-sub">{item.action}</span>
                  </div>
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
