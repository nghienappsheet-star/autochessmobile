import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import type { Relic } from "@/types/domain"

type RelicFormValue = Pick<Relic, "name" | "rating" | "type" | "effect">

type AdminRelicFormProps = {
  value: RelicFormValue
  onChange: (value: RelicFormValue) => void
}

export function AdminRelicForm({ value, onChange }: AdminRelicFormProps) {
  const patch = (partial: Partial<RelicFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid>
      <AdminField label="Tên dị vật">
        <Input
          value={value.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Ví dụ: Tà Thần Kiếm"
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Độ hiếm phẩm chất (Rating)">
        <Select value={value.rating} onValueChange={(rating) => patch({ rating })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S">Phẩm S (Huyền thoại)</SelectItem>
            <SelectItem value="A">Phẩm A (Quý hiếm)</SelectItem>
            <SelectItem value="B">Phẩm B (Kho báu)</SelectItem>
            <SelectItem value="C">Phẩm C (Phổ thông)</SelectItem>
          </SelectContent>
        </Select>
      </AdminField>
      <AdminField label="Phân loại định hướng">
        <Select value={value.type} onValueChange={(type) => patch({ type })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tấn công">Tấn công vũ lực</SelectItem>
            <SelectItem value="Phòng thủ">Phòng thủ kiên cố</SelectItem>
            <SelectItem value="Đa dụng">Đa dụng cơ động</SelectItem>
            <SelectItem value="Phép thuật">Phép thuật huyền bí</SelectItem>
          </SelectContent>
        </Select>
      </AdminField>
      <AdminField label="Mô tả chi tiết hiệu ứng cổ vật">
        <textarea
          value={value.effect}
          onChange={(e) => patch({ effect: e.target.value })}
          className="w-full h-[155px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50 transition-all"
          placeholder="Hào quang tăng sát thương diện rộng và hồi máu cho chiến hữu xung quanh..."
        />
      </AdminField>
    </AdminFormGrid>
  )
}

export const EMPTY_RELIC_FORM: RelicFormValue = {
  name: "",
  rating: "S",
  type: "Tấn công",
  effect: "",
}
