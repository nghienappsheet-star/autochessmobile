import * as React from "react"
import { Button } from "@/components/ui/core"
import { Save, Globe, RefreshCw } from "lucide-react"
import { AdminPageHeader, AdminSuccessBanner } from "@/components/admin"
import { buildDefaultSeoDraft, rowsToPagesMeta } from "@/components/admin/AdminSeoForm"
import { saveSeoSettings, useSeoSettings } from "@/hooks/useSiteSettings"
import { useAdminSuccessToast } from "@/hooks/useAdminSuccessToast"

const AdminSeoForm = React.lazy(() =>
  import("@/components/admin/AdminSeoForm").then((m) => ({ default: m.AdminSeoForm }))
)

function SeoFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu SEO...</div>
  )
}

export function AdminSEOPage() {
  const seoSettings = useSeoSettings()
  const [draft, setDraft] = React.useState(() => buildDefaultSeoDraft(seoSettings))
  const [isSaving, setIsSaving] = React.useState(false)
  const { successMessage, showSuccess } = useAdminSuccessToast()

  React.useEffect(() => {
    setDraft(buildDefaultSeoDraft(seoSettings))
  }, [seoSettings])

  const handleSaveSEO = () => {
    setIsSaving(true)

    setTimeout(() => {
      saveSeoSettings({
        gaId: draft.gaId,
        robotsTxt: draft.robots,
        jsonLd: draft.schemaJson,
        keywords: draft.keywords,
        pagesMeta: rowsToPagesMeta(draft.pagesMeta),
      })

      setIsSaving(false)
      showSuccess("Cấu hình SEO & Thẻ Meta đã được nén tối ưu và áp dụng thành công!")
    }, 1500)
  }

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        icon={Globe}
        title="Tối ưu hóa SEO & Index Google"
        description="Quản lý tiêu chuẩn thẻ meta, sơ đồ trang web sitemap, theo dõi cấu trúc JSON-LD và robots.txt."
      >
        <Button
          onClick={handleSaveSEO}
          disabled={isSaving}
          className="gap-2 bg-gold-gradient text-black font-bold text-[14px] h-11 px-6 rounded-xl transition-all shadow-none"
        >
          {isSaving ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? "Đang cập nhật..." : "Lưu tối ưu SEO"}
        </Button>
      </AdminPageHeader>

      <AdminSuccessBanner message={successMessage ?? ""} />

      <React.Suspense fallback={<SeoFormFallback />}>
        <AdminSeoForm value={draft} onChange={setDraft} />
      </React.Suspense>
    </div>
  )
}
