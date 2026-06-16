import { Button, Badge } from "@/components/ui/core"
import type { Banner } from "@/types/domain"
import { AdminDetailDialog } from "./AdminFormDialog"

type AdminBannerDetailDialogProps = {
  banner: Banner | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminBannerDetailDialog({
  banner,
  open,
  onOpenChange,
}: AdminBannerDetailDialogProps) {
  return (
    <AdminDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      title={banner?.title ?? "Chi tiết banner"}
      size="md"
      footer={
        <Button
          onClick={() => onOpenChange(false)}
          className="w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
        >
          Đóng cửa sổ
        </Button>
      }
    >
      {banner && (
        <div className="space-y-4">
          <div className="w-full h-36 rounded-xl overflow-hidden border border-brand-border relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge variant={banner.status === "Hiện" ? "success" : "secondary"}>
              TRẠNG THÁI: {banner.status.toUpperCase()}
            </Badge>
            <Badge variant="outline">SỰ KIỆN CHỦ</Badge>
          </div>

          <div className="space-y-1.5">
            <span className="admin-form-label">Mô tả đặc quyền sự kiện</span>
            <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
              {banner.subtitle}
            </div>
          </div>

          <div className="flex justify-between items-center text-brand-text-sub font-mono admin-meta bg-brand-card-2/50 p-3 border border-brand-border rounded-xl">
            <span>HÀNH ĐỘNG CLICK:</span>
            <strong className="text-brand-text-main">{banner.primaryButtonText}</strong>
          </div>
        </div>
      )}
    </AdminDetailDialog>
  )
}
