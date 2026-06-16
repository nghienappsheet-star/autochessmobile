import { Card, Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Globe, Bell, Heart, Plus, Trash2 } from "lucide-react"
import type { SiteSettings } from "@/hooks/useSiteSettings"

type AdminSettingsFormProps = {
  value: SiteSettings
  onChange: (value: SiteSettings) => void
}

export function AdminSettingsForm({ value, onChange }: AdminSettingsFormProps) {
  const patch = (partial: Partial<SiteSettings>) => onChange({ ...value, ...partial })

  return (
    <div className="space-y-6">
      <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8">
        <h3 className="admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4">
          <Globe className="h-4 w-4 text-brand-gold" /> Cấu hình Website chung
        </h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="admin-form-label uppercase tracking-wider">Tên Website</label>
            <Input
              value={value.siteName}
              onChange={(e) => patch({ siteName: e.target.value })}
              placeholder="Ví dụ: Auto Chess Mobile VN"
            />
          </div>
          <div className="space-y-2">
            <label className="admin-form-label uppercase tracking-wider">Mô tả tóm tắt ứng dụng</label>
            <textarea
              value={value.siteDesc}
              onChange={(e) => patch({ siteDesc: e.target.value })}
              className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 font-medium"
              placeholder="Website meta và database game..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Phiên bản Patch Meta hiện tại</label>
              <Input
                value={value.patchVersion}
                onChange={(e) => patch({ patchVersion: e.target.value })}
                placeholder="Patch S20.5"
              />
            </div>
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Trạng thái hệ thống</label>
              <Select
                value={String(value.maintenance)}
                onValueChange={(v) => patch({ maintenance: v === "true" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Hoạt động bình thường (Online)</SelectItem>
                  <SelectItem value="true">Chế độ bảo trì (Maintenance)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8">
        <h3 className="admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4">
          <Bell className="h-4 w-4 text-brand-gold" /> Báo cáo & Thông báo chung
        </h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="admin-form-label uppercase tracking-wider">Nội dung thông báo (Chạy ngang Panel chính)</label>
            <Input
              value={value.notifText}
              onChange={(e) => patch({ notifText: e.target.value })}
              placeholder="Thông báo nhanh hiển thị cho người chơi..."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Liên kết Mạng Discord</label>
              <Input
                value={value.discordUrl}
                onChange={(e) => patch({ discordUrl: e.target.value })}
                placeholder="https://discord.gg/..."
              />
            </div>
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Liên kết Facebook Group</label>
              <Input
                value={value.facebookUrl}
                onChange={(e) => patch({ facebookUrl: e.target.value })}
                placeholder="https://facebook.com/..."
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8">
        <h3 className="admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4">
          <Heart className="h-4 w-4 text-brand-gold" /> Ủng hộ & Đối tác
        </h3>
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="admin-form-label uppercase tracking-wider">Hiển thị phần ủng hộ trên trang chủ</label>
            <Select
              value={String(value.donateEnabled)}
              onValueChange={(v) => patch({ donateEnabled: v === "true" })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Bật</SelectItem>
                <SelectItem value="false">Tắt</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Tên ngân hàng</label>
              <Input
                value={value.donateBankName}
                onChange={(e) => patch({ donateBankName: e.target.value })}
                placeholder="VietinBank"
              />
            </div>
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Mã ngân hàng (VietQR)</label>
              <Input
                value={value.donateBankCode}
                onChange={(e) => patch({ donateBankCode: e.target.value })}
                placeholder="ICB hoặc 970415"
              />
              <p className="text-[12px] text-brand-text-sub">
                Mã Napas dùng cho ảnh VietQR compact (ví dụ ICB, VCB) hoặc BIN 6 số.
              </p>
            </div>
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Số tài khoản</label>
              <Input
                value={value.donateAccountNo}
                onChange={(e) => patch({ donateAccountNo: e.target.value })}
                placeholder="109878642716"
              />
            </div>
            <div className="space-y-2">
              <label className="admin-form-label uppercase tracking-wider">Chủ tài khoản</label>
              <Input
                value={value.donateAccountName}
                onChange={(e) => patch({ donateAccountName: e.target.value })}
                placeholder="LE MINH CONG"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="admin-form-label uppercase tracking-wider">Câu kêu gọi ủng hộ</label>
            <textarea
              value={value.donateMessage}
              onChange={(e) => patch({ donateMessage: e.target.value })}
              className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 font-medium"
              placeholder="Nội dung kêu gọi donate hiển thị trên trang chủ..."
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label className="admin-form-label uppercase tracking-wider">Danh sách đối tác / nhà tài trợ</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1.5 h-9 text-[12px]"
                onClick={() => patch({ partners: [...value.partners, { name: "", logoUrl: "", url: "" }] })}
              >
                <Plus className="h-3.5 w-3.5" />
                Thêm đối tác
              </Button>
            </div>

            <div className="space-y-3">
              {value.partners.map((partner, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 p-4 rounded-xl border border-brand-border bg-brand-card-2/50"
                >
                  <Input
                    value={partner.name}
                    onChange={(e) =>
                      patch({
                        partners: value.partners.map((p, i) =>
                          i === index ? { ...p, name: e.target.value } : p
                        ),
                      })
                    }
                    placeholder="Tên đối tác"
                  />
                  <Input
                    value={partner.logoUrl ?? ""}
                    onChange={(e) =>
                      patch({
                        partners: value.partners.map((p, i) =>
                          i === index ? { ...p, logoUrl: e.target.value } : p
                        ),
                      })
                    }
                    placeholder="URL logo (tuỳ chọn)"
                  />
                  <Input
                    value={partner.url ?? ""}
                    onChange={(e) =>
                      patch({
                        partners: value.partners.map((p, i) =>
                          i === index ? { ...p, url: e.target.value } : p
                        ),
                      })
                    }
                    placeholder="Link website (tuỳ chọn)"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-10 text-brand-red hover:text-brand-red hover:bg-brand-red/10"
                    onClick={() =>
                      patch({ partners: value.partners.filter((_, i) => i !== index) })
                    }
                    aria-label={`Xóa đối tác ${partner.name || index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
