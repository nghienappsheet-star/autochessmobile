import { Link } from "react-router-dom"
import { Button, Badge } from "@/components/ui/core"
import { Package } from "lucide-react"
import type { Item } from "@/types/domain"
import { AdminDetailDialog } from "./AdminFormDialog"

type AdminItemDetailDialogProps = {
  item: Item | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminItemDetailDialog({ item, open, onOpenChange }: AdminItemDetailDialogProps) {
  return (
    <AdminDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      title={item?.name ?? "Chi tiết trang bị"}
      size="md"
      footer={
        item ? (
          <>
            <Button
              asChild
              className="w-full sm:flex-1 h-11 bg-gold-gradient text-black rounded-xl font-bold uppercase admin-meta"
            >
              <Link to={`/trang-bi/${item.id}`} target="_blank" rel="noreferrer">
                Xem trên web
              </Link>
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full sm:flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
            >
              Đóng
            </Button>
          </>
        ) : undefined
      }
    >
      {item && (
        <div className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-orange-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(245,180,60,0.1)]">
              <Package className="h-8 w-8 text-brand-gold" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant={item.tier >= 4 ? "danger-solid" : "warning"}>BẬC {item.tier}</Badge>
              <Badge variant="success">TRANG BỊ MÙA MỚI</Badge>
            </div>
          </div>

          {item.description && (
            <div className="space-y-1.5">
              <span className="admin-form-label">Mô tả</span>
              <div className="p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed">
                {item.description}
              </div>
            </div>
          )}
          <div className="space-y-1.5">
            <span className="admin-form-label">Chỉ số tăng dồn</span>
            <div className="p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
              {item.stats}
            </div>
          </div>
          {item.effect && (
            <div className="space-y-1.5">
              <span className="admin-form-label">Hiệu ứng đặc biệt</span>
              <div className="p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border text-brand-text-sub">
                {item.effect}
              </div>
            </div>
          )}
          {item.tacticalNotes && item.tacticalNotes.length > 0 && (
            <div className="space-y-1.5">
              <span className="admin-form-label">Chiến thuật</span>
              <ul className="p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border space-y-1 text-brand-text-sub list-disc pl-5">
                {item.tacticalNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </AdminDetailDialog>
  )
}
