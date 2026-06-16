import * as React from "react"
import { Card, Badge, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { BarChart2, TrendingUp, ArrowUpRight, ArrowDownRight, RefreshCw, Download } from "lucide-react"
import {
  AdminPageHeader,
  AdminDemoBadge,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableScroll,
} from "@/components/admin"

const RANGE_SUBTITLES: Record<string, string> = {
  "Hôm nay": "Số liệu tổng hợp trong ngày hôm nay.",
  "7 ngày": "Số liệu 7 ngày gần nhất — xu hướng tuần.",
  "30 ngày": "Số liệu 30 ngày — phân tích tháng.",
  "Tất cả thời gian": "Tổng hợp toàn bộ lịch sử hoạt động website.",
}

const MOCK_CSV_ROWS = [
  ["metric", "value", "change"],
  ["page_views", "245830", "+12.4%"],
  ["active_users", "18490", "+8.2%"],
  ["meta_clicks", "4912", "+4.1%"],
]

export function AdminReportsPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [reportRange, setReportRange] = React.useState("Tất cả thời gian")

  const handleRefreshData = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 800)
  }

  const handleExportCsv = () => {
    const csv = MOCK_CSV_ROWS.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `bao-cao-${reportRange.replace(/\s+/g, "-").toLowerCase()}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const stats = [
    { label: "Tổng lượt xem", value: "245,830", change: "+12.4%", trend: "up", sub: "So với tuần trước" },
    { label: "Người dung hoạt động", value: "18,490", change: "+8.2%", trend: "up", sub: "Lượng user hằng tuần" },
    { label: "Đội hình đã tạo", value: "4,912", change: "+4.1%", trend: "up", sub: "Bằng Meta Builder" },
    { label: "Tỷ lệ thoát trang", value: "24.5%", change: "-2.3%", trend: "down", sub: "Thời gian đọc trung bình 4.5p" }
  ]

  const popularMetaComps = [
    { name: "Sát Thủ Bóng Đêm", rating: "S", clicks: "42,100", winRate: "58.4%" },
    { name: "Chiến Sĩ Hoang Dã", rating: "S", clicks: "38,400", winRate: "56.2%" },
    { name: "Ma Pháp Sư Long Tộc", rating: "A", clicks: "29,500", winRate: "52.3%" },
    { name: "Thợ Săn Cơ Giới", rating: "A", clicks: "22,100", winRate: "51.8%" }
  ]

  const deviceData = [
    { name: "Thiết bị Di động (Mobile)", percent: "72%", count: "13,312" },
    { name: "Máy tính để bàn (PC)", percent: "24%", count: "4,437" },
    { name: "Máy tính bảng (Tablet)", percent: "4%", count: "740" }
  ]

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        icon={BarChart2}
        title="Báo cáo thống kê số liệu"
        description={
          RANGE_SUBTITLES[reportRange] ?? "Tổng hợp các chỉ số hoạt động, click meta, tăng trưởng người dùng của website."
        }
      >
        <AdminDemoBadge />
        <Select value={reportRange} onValueChange={setReportRange}>
          <SelectTrigger className="min-w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Hôm nay">Báo cáo hôm nay</SelectItem>
            <SelectItem value="7 ngày">7 ngày qua</SelectItem>
            <SelectItem value="30 ngày">30 ngày qua</SelectItem>
            <SelectItem value="Tất cả thời gian">Tất cả thời gian</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={handleRefreshData}
          variant="ghost"
          size="icon"
          className="h-11 w-11 rounded-xl bg-brand-card border border-brand-border text-brand-text-main"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </Button>

        <Button
          onClick={handleExportCsv}
          className="h-11 gap-2 bg-gold-gradient text-black font-bold text-[13px] rounded-xl shadow-none"
        >
          <Download className="h-4 w-4" /> Tải CSV
        </Button>
      </AdminPageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="bg-brand-card border-brand-border rounded-xl p-6 relative overflow-hidden flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <span className="admin-eyebrow">{stat.label}</span>
              <div className={`p-1.5 rounded-lg text-[11px] font-bold flex items-center gap-0.5 ${
                stat.trend === "up" ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="admin-stat-value font-mono mb-1">{stat.value}</div>
              <span className="admin-meta">{stat.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-6 sm:p-8 bg-brand-card border-brand-border rounded-xl shadow-none flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="admin-card-title uppercase flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-brand-gold" /> Biểu đồ truy cập tuần này
              </h3>
              <Badge variant="warning">S20 META PHASE</Badge>
            </div>

            <div className="h-64 w-full relative border-b border-l border-brand-border mt-6 flex items-end">
              <div className="absolute inset-0 grid grid-rows-4 pointer-events-none">
                <div className="border-t border-brand-border/30 w-full h-full"></div>
                <div className="border-t border-brand-border/30 w-full h-full"></div>
                <div className="border-t border-brand-border/30 w-full h-full"></div>
                <div className="border-t border-brand-border/30 w-full h-full"></div>
              </div>

              <div className="w-full h-full flex justify-around items-end px-4 z-10 relative">
                {[
                  { day: "Thứ 2", val: "40%", height: "h-[40%]" },
                  { day: "Thứ 3", val: "55%", height: "h-[55%]" },
                  { day: "Thứ 4", val: "48%", height: "h-[48%]" },
                  { day: "Thứ 5", val: "68%", height: "h-[68%]" },
                  { day: "Thứ 6", val: "85%", height: "h-[85%]" },
                  { day: "Thứ 7", val: "95%", height: "h-[95%]" },
                  { day: "Chủ nhật", val: "100%", height: "h-[100%]" }
                ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-12 group">
                    <div className="text-[10px] text-brand-gold opacity-0 group-hover:opacity-100 transition-all font-bold tracking-wider mb-1 font-mono">{bar.val}</div>
                    <div className={`w-3.5 ${bar.height} bg-gradient-to-t from-brand-gold/10 to-brand-gold rounded-t-full transition-all duration-500 group-hover:scale-x-125 group-hover:shadow-[0_0_15px_rgba(245,180,60,0.3)]`}></div>
                    <span className="admin-meta font-semibold mt-1">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 bg-brand-card border-brand-border rounded-xl shadow-none flex flex-col justify-between">
          <div>
            <h3 className="admin-card-title uppercase mb-6">Phần trăm thiết bị</h3>
            <div className="space-y-6">
              {deviceData.map((dev, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between admin-table-cell font-semibold">
                    <span className="text-brand-text-sub">{dev.name}</span>
                    <span>{dev.percent}</span>
                  </div>
                  <div className="w-full bg-brand-card-2 h-2 rounded-full overflow-hidden border border-brand-border">
                    <div
                      className="bg-brand-gold h-full rounded-full"
                      style={{ width: dev.percent }}
                    />
                  </div>
                  <span className="admin-meta block font-mono">{dev.count} lượt truy cập</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden">
        <div className="p-6 border-b border-brand-border flex items-center justify-between">
          <h3 className="admin-card-title uppercase">Tương tác chiến thuật thịnh hành (Meta Clicks)</h3>
          <Badge variant="outline" className="border-brand-gold/20 text-brand-gold bg-brand-gold/5">SỐ LIỆU ĐỘI HÌNH</Badge>
        </div>
        <AdminTableScroll>
          <AdminTable minWidth="700px">
            <AdminThead sticky={false}>
              <AdminTr className="hover:bg-transparent">
                <AdminTh>Hạng</AdminTh>
                <AdminTh>Tên đội hình</AdminTh>
                <AdminTh className="text-center">Bậc đề xuất</AdminTh>
                <AdminTh className="text-right">Lượt tìm kiếm / click</AdminTh>
                <AdminTh className="text-right">Tỷ lệ thắng (Winrate)</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {popularMetaComps.map((comp, idx) => (
                <AdminTr key={idx}>
                  <AdminTd className="font-mono font-bold text-brand-gold">{idx + 1}</AdminTd>
                  <AdminTd className="font-bold">{comp.name}</AdminTd>
                  <AdminTd className="text-center">
                    <span className="w-7 h-7 inline-flex items-center justify-center font-bold text-xs bg-brand-red text-white rounded">
                      {comp.rating}
                    </span>
                  </AdminTd>
                  <AdminTd className="text-right font-mono font-medium">{comp.clicks}</AdminTd>
                  <AdminTd className="text-right font-mono font-bold text-brand-green">{comp.winRate}</AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </AdminTableScroll>
      </Card>
    </div>
  )
}
