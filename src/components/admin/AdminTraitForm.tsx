import { Input } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import type { TraitFormValue } from "./AdminTraitForm.helpers"

type AdminTraitFormProps = {
  value: TraitFormValue
  onChange: (value: TraitFormValue) => void
  nameLabel: string
  namePlaceholder: string
  defaultIcon: string
  showIconUrl?: boolean
}

export function AdminTraitForm({
  value,
  onChange,
  nameLabel,
  namePlaceholder,
  defaultIcon,
  showIconUrl = false,
}: AdminTraitFormProps) {
  const patch = (partial: Partial<TraitFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid columns={1}>
      <div className="grid grid-cols-4 gap-4">
        <AdminField label="Biểu tượng" className="col-span-1">
          <Input
            value={value.icon}
            onChange={(e) => patch({ icon: e.target.value })}
            placeholder={defaultIcon}
            className="text-center text-xl bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
          />
        </AdminField>
        <AdminField label={nameLabel} className="col-span-3">
          <Input
            value={value.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder={namePlaceholder}
            className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
          />
        </AdminField>
      </div>
      <AdminField label={showIconUrl ? "Mô tả" : "Hiệu ứng kích hoạt"}>
        <textarea
          value={value.description}
          onChange={(e) => patch({ description: e.target.value })}
          className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50 transition-all"
          placeholder="Mô tả hiệu ứng mốc kích hoạt..."
        />
      </AdminField>
      {showIconUrl && (
        <AdminField label="Logo URL (iconUrl)">
          <Input
            value={value.iconUrl ?? ""}
            onChange={(e) => patch({ iconUrl: e.target.value || undefined })}
            placeholder="/traits/example.png"
            className="bg-brand-card border-brand-border rounded-xl h-11 font-mono text-sm"
          />
        </AdminField>
      )}
    </AdminFormGrid>
  )
}
