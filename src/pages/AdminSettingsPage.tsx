import * as React from "react"
import { Card, Button, Badge } from "@/components/ui/core"
import { Settings, Save, Shield, Database, RefreshCw, Sliders } from "lucide-react"
import { saveSiteSettings, loadSiteSettings, type SiteSettings } from "@/hooks/useSiteSettings"
import { AdminPageHeader, AdminSuccessBanner } from "@/components/admin"
import { useAdminSuccessToast } from "@/hooks/useAdminSuccessToast"

const AdminSettingsForm = React.lazy(() =>
  import("@/components/admin/AdminSettingsForm").then((m) => ({ default: m.AdminSettingsForm }))
)

function SettingsFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu cài đặt...</div>
  )
}

export function AdminSettingsPage() {
  const [settings, setSettings] = React.useState<SiteSettings>(loadSiteSettings)
  const [isSaving, setIsSaving] = React.useState(false)
  const { successMessage, showSuccess } = useAdminSuccessToast()

  const handleSaveSettings = () => {
    setIsSaving(true)

    setTimeout(() => {
      saveSiteSettings(settings)
      setIsSaving(false)
      showSuccess("Cấu hình cài đặt hệ thống đã được lưu thành công!")
    }, 600)
  }

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        icon={Settings}
        title="Cài đặt hệ thống"
        description="Tinh chỉnh và quản lý cấu hình vận hành tổng thể dự án Website Auto Chess."
      />

      <AdminSuccessBanner message={successMessage ?? ""} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <React.Suspense fallback={<SettingsFormFallback />}>
            <AdminSettingsForm value={settings} onChange={setSettings} />
          </React.Suspense>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="admin-card-title uppercase mb-4 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-brand-gold" /> Lưu Cấu Hình
              </h3>
              <p className="admin-meta mb-6">
                Mọi thiết lập thay đổi sẽ ảnh hưởng ngay lập tức đến cơ sở dữ liệu hiển thị, bài viết, meta, cách
                hoạt động của hệ thống tướng.
              </p>
            </div>
            <Button
              onClick={handleSaveSettings}
              disabled={isSaving}
              className="w-full gap-2 bg-gold-gradient font-bold text-[13px] text-black h-11 rounded-xl shadow-none"
            >
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> ĐANG LƯU...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" /> LƯU THAY ĐỔI
                </>
              )}
            </Button>
          </Card>

          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="admin-card-title uppercase flex items-center gap-2">
              <Shield className="h-4 w-4 text-brand-gold" /> Trực quan hệ thống
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center admin-table-cell">
                <span className="text-brand-text-sub font-medium">Bảo trì website</span>
                <Badge variant={settings.maintenance ? "danger" : "success"}>
                  {settings.maintenance ? "Bật" : "Tắt"}
                </Badge>
              </div>
              <div className="flex justify-between items-center admin-table-cell">
                <span className="text-brand-text-sub font-medium">Auto-Optimize DB</span>
                <Badge variant="success">Hoạt động</Badge>
              </div>
              <div className="flex justify-between items-center admin-table-cell">
                <span className="text-brand-text-sub font-medium">SSL/Cloudflare TLS</span>
                <Badge variant="success">Kích hoạt</Badge>
              </div>
              <div className="flex justify-between items-center admin-table-cell">
                <span className="text-brand-text-sub font-medium">Môi trường</span>
                <span className="text-brand-text-main font-mono text-[11px] bg-brand-card-2 px-2 py-0.5 rounded border border-brand-border">
                  Production
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="admin-card-title uppercase flex items-center gap-2">
              <Database className="h-4 w-4 text-brand-gold" /> Database Status
            </h3>
            <div className="space-y-2 admin-meta">
              <div className="flex justify-between">
                <span>Dung lượng RAM:</span>
                <span className="text-brand-text-main font-mono font-medium">256MB / 512MB</span>
              </div>
              <div className="flex justify-between">
                <span>Bộ nhớ tệp cache:</span>
                <span className="text-brand-text-main font-mono font-medium">12.4 MB</span>
              </div>
              <div className="flex justify-between">
                <span>CPU hiện tại:</span>
                <span className="text-brand-text-main font-mono font-medium">2.4%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
