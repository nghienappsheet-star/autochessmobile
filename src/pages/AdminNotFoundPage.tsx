import { Link } from "react-router-dom"
import { Button, Card } from "@/components/ui/core"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { LayoutDashboard } from "lucide-react"

export function AdminNotFoundPage() {
  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        title="Không tìm thấy trang"
        description="Đường dẫn admin không tồn tại hoặc đã bị gỡ."
        breadcrumb="Admin / 404"
      />
      <Card className="bg-brand-card border-brand-border rounded-xl p-10 text-center max-w-lg mx-auto">
        <p className="text-[48px] font-bold text-brand-gold mb-2">404</p>
        <p className="text-[14px] text-brand-text-sub mb-6">
          Trang quản trị bạn tìm không có trong hệ thống.
        </p>
        <Button asChild className="bg-gold-gradient text-black font-semibold rounded-xl h-11 px-6">
          <Link to="/admin">
            <LayoutDashboard className="h-4 w-4 mr-2 inline" />
            Về tổng quan admin
          </Link>
        </Button>
      </Card>
    </div>
  )
}
