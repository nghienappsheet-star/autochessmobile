import * as React from "react"
import { Card, Button, Input, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Settings, Save, Shield, Database, RefreshCw, Sliders, Globe, Bell, Heart, Plus, Trash2 } from "lucide-react"
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/site"
import { saveSiteSettings, type SitePartner } from "@/hooks/useSiteSettings"
import { AdminPageHeader, AdminSuccessBanner } from "@/components/admin/AdminPageHeader"

export function AdminSettingsPage() {
  const [siteName, setSiteName] = React.useState(() => localStorage.getItem("setting_site_name") || SITE_NAME)
  const [siteDesc, setSiteDesc] = React.useState(() => localStorage.getItem("setting_site_desc") || SITE_DESCRIPTION)
  const [maintenance, setMaintenance] = React.useState(() => localStorage.getItem("setting_maintenance") === "true")
  const [patchVersion, setPatchVersion] = React.useState(() => localStorage.getItem("setting_patch_version") || "Patch S20.5")
  const [discordUrl, setDiscordUrl] = React.useState(() => localStorage.getItem("setting_discord_url") || "https://discord.gg/autochessvn")
  const [facebookUrl, setFacebookUrl] = React.useState(() => localStorage.getItem("setting_facebook_url") || "https://facebook.com/groups/autochessvietnam")
  const [notifText, setNotifText] = React.useState(() => localStorage.getItem("setting_notif_text") || "Giải đấu Auto Chess tranh cúp S20 sẽ diễn ra vào ngày 25/06 này!")
  const [donateEnabled, setDonateEnabled] = React.useState(() => {
    const raw = localStorage.getItem("setting_donate_enabled")
    return raw === null ? true : raw === "true"
  })
  const [donateBankCode, setDonateBankCode] = React.useState(
    () => localStorage.getItem("setting_donate_bank_code") || "ICB"
  )
  const [donateBankName, setDonateBankName] = React.useState(
    () => localStorage.getItem("setting_donate_bank_name") || "VietinBank"
  )
  const [donateAccountNo, setDonateAccountNo] = React.useState(
    () => localStorage.getItem("setting_donate_account_no") || "109878642716"
  )
  const [donateAccountName, setDonateAccountName] = React.useState(
    () => localStorage.getItem("setting_donate_account_name") || "LE MINH CONG"
  )
  const [donateMessage, setDonateMessage] = React.useState(
    () =>
      localStorage.getItem("setting_donate_message") ||
      "Auto Chess Mobile VN là dự án phi lợi nhuận do cộng đồng xây dựng. Mọi đóng góp giúp duy trì máy chủ, cập nhật meta và phát triển công cụ miễn phí cho kỳ thủ Việt Nam."
  )
  const [partners, setPartners] = React.useState<SitePartner[]>(() => {
    try {
      const saved = localStorage.getItem("setting_partners")
      if (saved) return JSON.parse(saved) as SitePartner[]
    } catch {
      /* ignore */
    }
    return [
      { name: "Auto Chess VN Community", url: "https://facebook.com/groups/autochessmobilevn" },
      { name: "Meta Data Partner", url: "https://autochessmobile.vn" },
      { name: "Esports Vietnam", url: "" },
      { name: "Content Creator Hub", url: "" },
    ]
  })

  const [isSaving, setIsSaving] = React.useState(false)
  const [successMsg, setSuccessMsg] = React.useState("")

  const handleSaveSettings = () => {
    setIsSaving(true)
    setSuccessMsg("")

    setTimeout(() => {
      saveSiteSettings({
        siteName,
        siteDesc,
        maintenance,
        patchVersion,
        discordUrl,
        facebookUrl,
        notifText,
        donateEnabled,
        donateBankCode,
        donateBankName,
        donateAccountNo,
        donateAccountName,
        donateMessage,
        partners,
      })

      setIsSaving(false)
      setSuccessMsg("Cấu hình cài đặt hệ thống đã được lưu thành công!")
      setTimeout(() => setSuccessMsg(""), 3000)
    }, 600)
  }

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        icon={Settings}
        title="Cài đặt hệ thống"
        description="Tinh chỉnh và quản lý cấu hình vận hành tổng thể dự án Website Auto Chess."
      />

      <AdminSuccessBanner message={successMsg} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: main config areas */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8">
            <h3 className="admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4">
              <Globe className="h-4 w-4 text-brand-gold" /> Cấu hình Website chung
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="admin-form-label uppercase tracking-wider">Tên Website</label>
                <Input 
                  value={siteName} 
                  onChange={e => setSiteName(e.target.value)} 
                  placeholder="Ví dụ: Auto Chess Mobile VN" 
                />
              </div>
              <div className="space-y-2">
                <label className="admin-form-label uppercase tracking-wider">Mô tả tóm tắt ứng dụng</label>
                <textarea 
                  value={siteDesc} 
                  onChange={e => setSiteDesc(e.target.value)} 
                  className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 font-medium"
                  placeholder="Website meta và database game..."
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Phiên bản Patch Meta hiện tại</label>
                  <Input 
                    value={patchVersion} 
                    onChange={e => setPatchVersion(e.target.value)} 
                    placeholder="Patch S20.5" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Trạng thái hệ thống</label>
                  <Select
                    value={String(maintenance)}
                    onValueChange={(v) => setMaintenance(v === "true")}
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
                  value={notifText} 
                  onChange={e => setNotifText(e.target.value)} 
                  placeholder="Thông báo nhanh hiển thị cho người chơi..." 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Liên kết Mạng Discord</label>
                  <Input 
                    value={discordUrl} 
                    onChange={e => setDiscordUrl(e.target.value)} 
                    placeholder="https://discord.gg/..." 
                  />
                </div>
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Liên kết Facebook Group</label>
                  <Input 
                    value={facebookUrl} 
                    onChange={e => setFacebookUrl(e.target.value)} 
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
                  value={String(donateEnabled)}
                  onValueChange={(v) => setDonateEnabled(v === "true")}
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
                    value={donateBankName}
                    onChange={(e) => setDonateBankName(e.target.value)}
                    placeholder="VietinBank"
                  />
                </div>
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Mã VietQR (bank code)</label>
                  <Input
                    value={donateBankCode}
                    onChange={(e) => setDonateBankCode(e.target.value)}
                    placeholder="ICB"
                  />
                </div>
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Số tài khoản</label>
                  <Input
                    value={donateAccountNo}
                    onChange={(e) => setDonateAccountNo(e.target.value)}
                    placeholder="109878642716"
                  />
                </div>
                <div className="space-y-2">
                  <label className="admin-form-label uppercase tracking-wider">Chủ tài khoản</label>
                  <Input
                    value={donateAccountName}
                    onChange={(e) => setDonateAccountName(e.target.value)}
                    placeholder="LE MINH CONG"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="admin-form-label uppercase tracking-wider">Câu kêu gọi ủng hộ</label>
                <textarea
                  value={donateMessage}
                  onChange={(e) => setDonateMessage(e.target.value)}
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
                    onClick={() =>
                      setPartners((prev) => [...prev, { name: "", logoUrl: "", url: "" }])
                    }
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Thêm đối tác
                  </Button>
                </div>

                <div className="space-y-3">
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 p-4 rounded-xl border border-brand-border bg-brand-card-2/50"
                    >
                      <Input
                        value={partner.name}
                        onChange={(e) =>
                          setPartners((prev) =>
                            prev.map((p, i) => (i === index ? { ...p, name: e.target.value } : p))
                          )
                        }
                        placeholder="Tên đối tác"
                      />
                      <Input
                        value={partner.logoUrl ?? ""}
                        onChange={(e) =>
                          setPartners((prev) =>
                            prev.map((p, i) =>
                              i === index ? { ...p, logoUrl: e.target.value } : p
                            )
                          )
                        }
                        placeholder="URL logo (tuỳ chọn)"
                      />
                      <Input
                        value={partner.url ?? ""}
                        onChange={(e) =>
                          setPartners((prev) =>
                            prev.map((p, i) => (i === index ? { ...p, url: e.target.value } : p))
                          )
                        }
                        placeholder="Link website (tuỳ chọn)"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-10 text-brand-red hover:text-brand-red hover:bg-brand-red/10"
                        onClick={() => setPartners((prev) => prev.filter((_, i) => i !== index))}
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

        {/* Right column: Action & status cards */}
        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="admin-card-title uppercase mb-4 flex items-center gap-2">
                <Sliders className="h-4 w-4 text-brand-gold" /> Lưu Cấu Hình
              </h3>
              <p className="admin-meta mb-6">
                Mọi thiết lập thay đổi sẽ ảnh hưởng ngay lập tức đến cơ sở dữ liệu hiển thị, bài viết, meta, cách hoạt động của hệ thống tướng.
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
                <Badge variant={maintenance ? "danger" : "success"}>
                  {maintenance ? "Bật" : "Tắt"}
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
                <span className="text-brand-text-main font-mono text-[11px] bg-brand-card-2 px-2 py-0.5 rounded border border-brand-border">Production</span>
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
