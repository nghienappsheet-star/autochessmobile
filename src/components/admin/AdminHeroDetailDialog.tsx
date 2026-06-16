import { Link } from "react-router-dom"
import { Button, Badge } from "@/components/ui/core"
import { Swords } from "lucide-react"
import type { Hero } from "@/types/domain"
import { getHeroIconUrl } from "@/lib/hero-utils"
import { AdminDetailDialog } from "./AdminFormDialog"

function getCostBadgeVariant(cost: number) {
  switch (cost) {
    case 5:
      return "warning-solid" as const
    case 4:
      return "danger-solid" as const
    case 3:
      return "success" as const
    case 2:
      return "warning" as const
    default:
      return "default" as const
  }
}

type AdminHeroDetailDialogProps = {
  hero: Hero | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdminHeroDetailDialog({ hero, open, onOpenChange }: AdminHeroDetailDialogProps) {
  return (
    <AdminDetailDialog
      open={open}
      onOpenChange={onOpenChange}
      title={hero?.name ?? "Chi tiết tướng"}
      size="md"
      footer={
        hero ? (
          <>
            <Button
              asChild
              className="w-full sm:flex-1 h-11 bg-gold-gradient text-black rounded-xl font-bold uppercase admin-meta"
            >
              <Link to={`/tuong/${hero.id}`} target="_blank" rel="noreferrer">
                Xem trên web
              </Link>
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="w-full sm:flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
            >
              Đóng cửa sổ
            </Button>
          </>
        ) : undefined
      }
    >
      {hero && (
        <div className="space-y-5">
          <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
            {getHeroIconUrl(hero) ? (
              <img
                src={getHeroIconUrl(hero)}
                alt=""
                className="w-16 h-16 rounded-xl border border-brand-gold/30 object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-orange-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                <Swords className="h-8 w-8 text-brand-gold" />
              </div>
            )}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant={getCostBadgeVariant(hero.cost)}>$ {hero.cost} VÀNG</Badge>
              {hero.isNew && <Badge variant="success">TƯỚNG MỚI</Badge>}
              {hero.rarity && <Badge variant="outline">{hero.rarity}</Badge>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="admin-form-label">Tộc hệ kích</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {hero.race.length === 0 ? (
                  <span className="bg-brand-card-2 border border-brand-border text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold opacity-60">
                    Chưa xác định
                  </span>
                ) : (
                  hero.race.map((r) => (
                    <span
                      key={r}
                      className="bg-brand-card-2 border border-brand-border text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold"
                    >
                      {r}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-1">
              <span className="admin-form-label">Hệ nghề nghiệp</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {hero.class.length === 0 ? (
                  <span className="bg-brand-gold/10 border border-brand-gold/20 text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold opacity-60">
                    Chưa xác định
                  </span>
                ) : (
                  hero.class.map((c) => (
                    <span
                      key={c}
                      className="bg-brand-gold/15 border border-brand-gold/20 text-brand-gold px-2 py-0.5 rounded admin-meta font-bold"
                    >
                      {c}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {hero.description && (
            <p className="admin-body text-brand-text-sub leading-relaxed">{hero.description}</p>
          )}

          <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="admin-form-label text-brand-gold">
                KỸ NĂNG: {hero.skill?.name || "KỸ NĂNG ĐẶC BIỆT"}
              </span>
              <Badge variant="outline" className="admin-meta">
                {hero.skill?.type || "Chủ động"}
              </Badge>
            </div>
            <p className="text-brand-text-sub admin-body leading-relaxed font-normal">
              {hero.skill?.desc || "Gây sát thương và tạo lợi thế chiến thuật vật lý trên bàn cờ."}
            </p>
          </div>

          <div className="space-y-3">
            <span className="admin-form-label">Thuộc tính kỹ năng cơ bản</span>
            <div className="grid grid-cols-2 gap-3 font-mono admin-meta text-brand-text-sub">
              <div>
                HP 1★: <span className="text-brand-text-main font-bold">{hero.stats?.hp?.[0] ?? "—"}</span>
              </div>
              <div>
                ATK 1★: <span className="text-brand-text-main font-bold">{hero.stats?.atk?.[0] ?? "—"}</span>
              </div>
              <div>
                Giáp:{" "}
                <span className="text-brand-text-main font-bold">
                  {typeof hero.stats?.armor === "number"
                    ? hero.stats.armor
                    : hero.stats?.armor?.[0] ?? "—"}
                </span>
              </div>
              <div>
                MR:{" "}
                <span className="text-brand-text-main font-bold">
                  {typeof hero.stats?.mr === "number" ? hero.stats.mr : hero.stats?.mr?.[0] ?? "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminDetailDialog>
  )
}
