import { Button, Badge } from "@/components/ui/core"
import { Gem } from "lucide-react"
import type { Relic } from "@/types/domain"
import { AdminDetailDialog } from "./AdminFormDialog"

type AdminRelicDetailDialogProps = {
  relic: Relic | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminRelicDetailDialog({ relic, open, onOpenChange }: AdminRelicDetailDialogProps) {
  return (
    <AdminDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      title={relic?.name ?? "Chi tiết dị vật"}
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
      {relic && (
        <div className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-yellow-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(245,180,60,0.1)]">
              <Gem className="h-8 w-8 text-brand-gold animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={relic.rating === "S" ? "warning-solid" : "default"}>
                PHẨM {relic.rating} PHONG ẤN
              </Badge>
              <Badge variant="outline">{relic.type.toUpperCase()}</Badge>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="admin-form-label">Thuộc tính phong ấn & Hiệu ứng</span>
            <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
              {relic.effect}
            </div>
          </div>

          <div className="space-y-1 bg-brand-card-2/50 p-3.5 border border-brand-border rounded-xl">
            <div className="flex justify-between items-center admin-meta text-brand-text-sub font-mono">
              <span>ĐIỂM CHỈ SỐ:</span>
              <span className="text-brand-gold font-bold">5.0 / 5.0</span>
            </div>
          </div>
        </div>
      )}
    </AdminDetailDialog>
  )
}
