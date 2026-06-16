import { Link } from "react-router-dom"
import { Card } from "@/components/ui/core"
import { FileText, ArrowRight, Newspaper } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"

export function AdminNewsPage() {
  return (
    <div className="space-y-8 pb-8 max-w-2xl">
      <AdminPageHeader
        icon={FileText}
        title="Quản lý bản tin nhanh"
        description="Tin tức site public đồng bộ với CMS bài viết đầy đủ — markdown, cover và trạng thái xuất bản."
      />

      <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center shrink-0">
            <Newspaper className="h-6 w-6 text-brand-gold" />
          </div>
          <div className="space-y-2">
            <h2 className="admin-card-title">
              Dùng Quản lý bài viết để biên tập tin tức
            </h2>
            <p className="admin-body leading-relaxed">
              Trang này không lưu dữ liệu riêng. Mọi bài tin trên{" "}
              <span className="text-brand-text-main font-medium">/tin-tuc</span> được quản lý tại{" "}
              <span className="text-brand-text-main font-medium">Quản lý bài viết</span> với trình biên tập Markdown.
            </p>
          </div>
        </div>

        <Link
          to="/admin/bai-viet"
          className="inline-flex items-center justify-center gap-2 bg-gold-gradient hover-gold-gradient text-black font-bold h-11 px-6 rounded-xl text-[13px] transition-colors"
        >
          Mở quản lý bài viết
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    </div>
  )
}
