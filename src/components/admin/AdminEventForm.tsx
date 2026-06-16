import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import type { AdminEvent } from "@/types/domain"

export type EventFormValue = Pick<AdminEvent, "title" | "prize" | "date" | "participants" | "status">

type AdminEventFormProps = {
  value: EventFormValue
  onChange: (value: EventFormValue) => void
  showStatus?: boolean
}

const PARTICIPANT_OPTIONS = ["16 Kì thủ", "32 Kì thủ", "64 Kì thủ", "128 Kì thủ"] as const

export function AdminEventForm({ value, onChange, showStatus = false }: AdminEventFormProps) {
  const patch = (partial: Partial<EventFormValue>) => onChange({ ...value, ...partial })

  return (
    <div className="space-y-4">
      <AdminField label="Tên giải đấu / Sự kiện">
        <Input
          value={value.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="Ví dụ: Đại chiến Vương Giả S20"
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminFormGrid>
        <AdminField label="Giải thưởng">
          <Input
            value={value.prize}
            onChange={(e) => patch({ prize: e.target.value })}
            placeholder="20,000,000 VND"
            className="bg-brand-card border-brand-border rounded-xl h-11"
          />
        </AdminField>
        <AdminField label="Khởi tranh">
          <Input
            value={value.date}
            onChange={(e) => patch({ date: e.target.value })}
            placeholder="25/06/2026"
            className="bg-brand-card border-brand-border rounded-xl h-11"
          />
        </AdminField>
        <AdminField label="Quy mô kì thủ">
          <Select value={value.participants} onValueChange={(participants) => patch({ participants })}>
            <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PARTICIPANT_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </AdminField>
        {showStatus && (
          <AdminField label="Trạng thái">
            <Select value={value.status} onValueChange={(status) => patch({ status })}>
              <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cho đăng ký">Cho đăng ký</SelectItem>
                <SelectItem value="Sắp diễn ra">Sắp diễn ra</SelectItem>
                <SelectItem value="Kết thúc">Kết thúc</SelectItem>
              </SelectContent>
            </Select>
          </AdminField>
        )}
      </AdminFormGrid>
    </div>
  )
}

export const EMPTY_EVENT_FORM: EventFormValue = {
  title: "",
  prize: "",
  date: "",
  participants: "64 Kì thủ",
  status: "Sắp diễn ra",
}

export function eventFormFromEvent(event: AdminEvent): EventFormValue {
  return {
    title: event.title,
    prize: event.prize,
    date: event.date,
    participants: event.participants,
    status: event.status,
  }
}

export function eventFromFormValue(value: EventFormValue, id: string): AdminEvent {
  return {
    id,
    title: value.title.trim(),
    prize: value.prize.trim() || "Quà lưu niệm",
    date: value.date.trim() || "Chưa ấn định",
    participants: value.participants,
    status: value.status,
  }
}
