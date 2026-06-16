import { Input } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import { AdminStatusSelect } from "@/components/admin/AdminStatusSelect"
import type { Banner } from "@/types/domain"

export type BannerFormValue = Pick<Banner, "title" | "subtitle" | "primaryButtonText" | "status">

type AdminBannerFormProps = {
  value: BannerFormValue
  onChange: (value: BannerFormValue) => void
}

export function AdminBannerForm({ value, onChange }: AdminBannerFormProps) {
  const patch = (partial: Partial<BannerFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid columns={1}>
      <AdminField label="Tiêu đề Banner">
        <Input
          value={value.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Ví dụ: Đại Tiệc Thượng Cổ"
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Mô tả phụ thu hút">
        <Input
          value={value.subtitle}
          onChange={(e) => patch({ subtitle: e.target.value })}
          placeholder="Sở hữu mảnh tướng dũng mãnh và hòm dị vật hoàn toàn miễn phí..."
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <div className="grid grid-cols-2 gap-4">
        <AdminField label="Tên nút hành động">
          <Input
            value={value.primaryButtonText}
            onChange={(e) => patch({ primaryButtonText: e.target.value })}
            placeholder="Ví dụ: Tham Chiến"
            className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
          />
        </AdminField>
        <AdminField label="Trạng thái phát hành">
          <AdminStatusSelect value={value.status} onChange={(status) => patch({ status })} />
        </AdminField>
      </div>
    </AdminFormGrid>
  )
}

export const EMPTY_BANNER_FORM: BannerFormValue = {
  title: "",
  subtitle: "",
  primaryButtonText: "Khám phá",
  status: "Hiện",
}

const DEFAULT_BANNER_IMAGE =
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800"

export function bannerFormFromBanner(banner: Banner): BannerFormValue {
  return {
    title: banner.title,
    subtitle: banner.subtitle,
    primaryButtonText: banner.primaryButtonText,
    status: banner.status,
  }
}

export function bannerFromFormValue(value: BannerFormValue, id: string, existing?: Banner): Banner {
  return {
    id,
    title: value.title.trim(),
    subtitle: value.subtitle.trim() || "Nhận cập nhật mới nhất từ mùa giải mới.",
    description: value.subtitle.trim() || "Banner quảng bá nội dung trên trang chủ.",
    primaryButtonText: value.primaryButtonText.trim() || "Xem ngay",
    primaryButtonLink: existing?.primaryButtonLink ?? "#",
    secondaryButtonText: existing?.secondaryButtonText ?? "",
    secondaryButtonLink: existing?.secondaryButtonLink ?? "",
    status: value.status,
    image: existing?.image ?? DEFAULT_BANNER_IMAGE,
  }
}
