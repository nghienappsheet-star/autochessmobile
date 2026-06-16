import * as React from "react"
import { Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/core"
import { Image as ImageIcon } from "lucide-react"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import { isPersistableImageUrl } from "@/lib/media-url"
import type { MediaAsset } from "@/types/domain"
import { cn } from "@/lib/utils"

type AdminMediaPickerProps = {
  value: string
  onChange: (url: string) => void
  media: MediaAsset[]
  label?: string
  categoryFilter?: string
  placeholder?: string
}

export function AdminMediaPicker({
  value,
  onChange,
  media,
  label = "Chọn từ thư viện",
  categoryFilter = "Tướng",
  placeholder = "https://... hoặc /heroes/...",
}: AdminMediaPickerProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [urlError, setUrlError] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    return media.filter((asset) => {
      const matchesCategory =
        !categoryFilter ||
        categoryFilter === "Tất cả" ||
        asset.category === categoryFilter ||
        asset.category === "Khác"
      if (!matchesCategory) return false
      if (!q) return true
      return (
        asset.name.toLowerCase().includes(q) ||
        asset.url.toLowerCase().includes(q) ||
        asset.alt.toLowerCase().includes(q)
      )
    })
  }, [media, categoryFilter, query])

  const handleUrlChange = (next: string) => {
    const lower = next.trim().toLowerCase()
    if (lower.startsWith("data:") || lower.startsWith("blob:")) {
      setUrlError("Không lưu URL base64 hoặc blob. Dùng Cloudinary hoặc URL HTTPS.")
      return
    }
    setUrlError(null)
    onChange(next)
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        <Input
          value={value}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder}
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30 flex-1 min-w-[200px]"
        />
        <CloudinaryFileUpload
          onUploaded={(urls) => {
            if (urls[0]) {
              setUrlError(null)
              onChange(urls[0])
            }
          }}
          onError={(message) => setUrlError(message)}
          label="Tải ảnh"
          uploadingLabel="Đang tải..."
        />
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl border-brand-border shrink-0"
          onClick={() => setOpen(true)}
        >
          {label}
        </Button>
      </div>

      {urlError && <p className="text-[12px] text-brand-red font-medium">{urlError}</p>}

      {value && isPersistableImageUrl(value) && (
        <div className="flex items-center gap-3 p-2 rounded-xl border border-brand-border bg-brand-card-2">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-card border border-brand-border shrink-0">
            <img src={value} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <span className="admin-meta text-brand-text-sub truncate">{value}</span>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-brand-card border-brand-border rounded-xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 border-b border-brand-border text-left">
            <DialogTitle className="admin-dialog-title">Thư viện ảnh</DialogTitle>
          </DialogHeader>
          <div className="px-6 py-4 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc URL..."
              className="bg-brand-card border-brand-border rounded-xl h-10"
            />
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-brand-text-sub admin-body">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-40" />
                Không có ảnh phù hợp. Thêm tại trang Media hoặc nhập URL trực tiếp.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {filtered.map((asset) => (
                  <button
                    key={asset.id}
                    type="button"
                    onClick={() => {
                      onChange(asset.url)
                      setUrlError(null)
                      setOpen(false)
                    }}
                    className={cn(
                      "text-left rounded-xl border p-2 transition-colors hover:bg-brand-card-2",
                      value === asset.url
                        ? "border-brand-gold/40 bg-brand-gold/5"
                        : "border-brand-border bg-brand-card"
                    )}
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-brand-card-2 mb-2">
                      <img src={asset.url} alt={asset.alt} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="admin-meta font-bold text-brand-text-main truncate">{asset.name}</p>
                    <p className="admin-meta text-brand-text-sub truncate">{asset.category}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
