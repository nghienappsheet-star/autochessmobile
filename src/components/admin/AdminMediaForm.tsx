import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField } from "@/components/admin/AdminField"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import type { MediaAsset } from "@/types/domain"

export type MediaFormValue = {
  title: string
  name: string
  alt: string
  url: string
  category: string
}

type AdminMediaFormProps = {
  value: MediaFormValue
  onChange: (value: MediaFormValue) => void
  mode: "create" | "edit"
  urlError?: string | null
  onUrlError?: (message: string | null) => void
}

const MEDIA_CATEGORY_OPTIONS = [
  { value: "Tướng", label: "Tướng (Sprite)" },
  { value: "Trang bị", label: "Trang bị (Combat Item)" },
  { value: "Banners", label: "Ảnh Banners chính" },
  { value: "Khác", label: "Ảnh khác/Avatar" },
] as const

export function AdminMediaForm({
  value,
  onChange,
  mode,
  urlError,
  onUrlError,
}: AdminMediaFormProps) {
  const patch = (partial: Partial<MediaFormValue>) => onChange({ ...value, ...partial })

  const handleUrlChange = (next: string) => {
    const lower = next.trim().toLowerCase()
    if (lower.startsWith("data:") || lower.startsWith("blob:")) {
      onUrlError?.("Không lưu URL base64 hoặc blob.")
      return
    }
    onUrlError?.(null)
    patch({ url: next })
  }

  return (
    <div className="space-y-4">
      {mode === "create" ? (
        <AdminField label="Tên định danh tệp">
          <Input
            value={value.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="Ví dụ: sprite_queen_crown"
            className="bg-brand-card border-brand-border rounded-xl h-11"
          />
        </AdminField>
      ) : (
        <AdminField label="Tên tệp">
          <Input
            value={value.name}
            onChange={(e) => patch({ name: e.target.value })}
            className="bg-brand-card border-brand-border rounded-xl h-11"
          />
        </AdminField>
      )}
      <AdminField label="Văn bản thay thế (Alt)">
        <Input
          value={value.alt}
          onChange={(e) => patch({ alt: e.target.value })}
          placeholder="Mô tả ngắn cho SEO"
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Đường dẫn tệp CDN/Ảnh (URL)">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Input
              value={value.url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://..."
              className="flex-1 min-w-[200px] bg-brand-card border-brand-border rounded-xl h-11"
            />
            <CloudinaryFileUpload
              onUploaded={(urls) => {
                if (urls[0]) {
                  onUrlError?.(null)
                  patch({ url: urls[0] })
                }
              }}
              onError={(message) => onUrlError?.(message)}
              label="Tải file"
              uploadingLabel="Đang tải..."
            />
          </div>
          {urlError && <p className="text-[12px] text-brand-red font-medium">{urlError}</p>}
        </div>
      </AdminField>
      <AdminField label="Phân nhóm Media">
        <Select value={value.category} onValueChange={(category) => patch({ category })}>
          <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MEDIA_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
    </div>
  )
}

export const EMPTY_MEDIA_FORM: MediaFormValue = {
  title: "",
  name: "",
  alt: "",
  url: "",
  category: "Trang bị",
}

export function mediaFormFromAsset(asset: MediaAsset): MediaFormValue {
  return {
    title: asset.name,
    name: asset.name,
    alt: asset.alt,
    url: asset.url,
    category: asset.category,
  }
}

export function mediaFromFormValue(
  value: MediaFormValue,
  id: string,
  mode: "create" | "edit",
  existing?: MediaAsset
): MediaAsset {
  const displayName = mode === "create" ? value.title.trim() : value.name.trim()
  const name =
    mode === "create"
      ? displayName.toLowerCase().replace(/\s+/g, "_") + (value.url.endsWith(".png") ? "" : ".png")
      : value.name.trim()

  return {
    id,
    name,
    alt: value.alt.trim() || displayName,
    category: value.category,
    size: existing?.size ?? "120 KB",
    url: value.url.trim(),
    uploadedAt: existing?.uploadedAt ?? new Date().toLocaleDateString("vi-VN"),
  }
}
