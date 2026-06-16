import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { AdminField, AdminFormGrid, AdminFormGridFull, HeroCheckboxPicker } from "@/components/admin"
import type { Hero, Item, ItemCategory } from "@/types/domain"

const ITEM_CATEGORIES: ItemCategory[] = ["attack", "defense", "magic", "utility"]

export type ItemFormValue = {
  name: string
  tier: number
  category: ItemCategory
  tags: string
  statsDesc: string
  description: string
  effect: string
  tacticalNotes: string
  recommendedHeroIds: string[]
}

type AdminItemFormProps = {
  value: ItemFormValue
  onChange: (value: ItemFormValue) => void
  heroes: Hero[]
}

export function AdminItemForm({ value, onChange, heroes }: AdminItemFormProps) {
  const patch = (partial: Partial<ItemFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid>
      <AdminField label="Tên trang bị">
        <Input
          value={value.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Ví dụ: Búa Lôi Đình"
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Cấp bậc (Tier)">
        <Input
          type="number"
          value={value.tier}
          onChange={(e) => patch({ tier: Number(e.target.value) })}
          min={1}
          max={6}
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Loại trang bị">
        <Select value={value.category} onValueChange={(v) => patch({ category: v as ItemCategory })}>
          <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ITEM_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
      <AdminField label="Tags (phân cách bằng dấu phẩy)">
        <Input
          value={value.tags}
          onChange={(e) => patch({ tags: e.target.value })}
          placeholder="Carry, Late game"
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Chỉ số (tóm tắt)">
        <textarea
          value={value.statsDesc}
          onChange={(e) => patch({ statsDesc: e.target.value })}
          className="w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Mô tả ngắn">
        <textarea
          value={value.description}
          onChange={(e) => patch({ description: e.target.value })}
          className="w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
        />
      </AdminField>
      <AdminField label="Hiệu ứng đặc biệt">
        <textarea
          value={value.effect}
          onChange={(e) => patch({ effect: e.target.value })}
          className="w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
        />
      </AdminField>
      <AdminFormGridFull>
        <AdminField label="Ghi chú chiến thuật (mỗi dòng một ý)">
          <textarea
            value={value.tacticalNotes}
            onChange={(e) => patch({ tacticalNotes: e.target.value })}
            className="w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
          />
        </AdminField>
      </AdminFormGridFull>
      <AdminFormGridFull>
        <AdminField label="Tướng khuyên dùng">
          <HeroCheckboxPicker
            heroes={heroes}
            selectedIds={value.recommendedHeroIds}
            onChange={(recommendedHeroIds) => patch({ recommendedHeroIds })}
          />
        </AdminField>
      </AdminFormGridFull>
    </AdminFormGrid>
  )
}

export const EMPTY_ITEM_FORM: ItemFormValue = {
  name: "",
  tier: 1,
  category: "attack",
  tags: "",
  statsDesc: "",
  description: "",
  effect: "",
  tacticalNotes: "",
  recommendedHeroIds: [],
}

export function itemFormFromItem(item: Item, heroes: Hero[]): ItemFormValue {
  return {
    name: item.name,
    tier: item.tier,
    category: item.category ?? "attack",
    tags: (item.tags ?? []).join(", "),
    statsDesc: item.stats ?? "",
    description: item.description ?? "",
    effect: item.effect ?? "",
    tacticalNotes: (item.tacticalNotes ?? []).join("\n"),
    recommendedHeroIds: item.recommendedHeroIds ?? [],
  }
}

export function itemFromFormValue(value: ItemFormValue, id: string): Item {
  const tags = value.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
  const tacticalNotes = value.tacticalNotes
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  return {
    id,
    name: value.name.trim(),
    tier: value.tier,
    category: value.category,
    stats: value.statsDesc.trim() || "Tăng chỉ số cơ bản.",
    ...(value.description.trim() ? { description: value.description.trim() } : {}),
    ...(value.effect.trim() ? { effect: value.effect.trim() } : {}),
    ...(tacticalNotes.length ? { tacticalNotes } : {}),
    ...(value.recommendedHeroIds.length ? { recommendedHeroIds: value.recommendedHeroIds } : {}),
    ...(tags.length ? { tags } : {}),
  }
}
