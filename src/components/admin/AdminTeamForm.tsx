import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import type { TeamMember } from "@/types/domain"

export type TeamFormValue = {
  name: string
  role: string
  avatar: string
  bio: string
  socialUrl: string
  order: string
  status: TeamMember["status"]
}

type AdminTeamFormProps = {
  value: TeamFormValue
  onChange: (value: TeamFormValue) => void
}

export function AdminTeamForm({ value, onChange }: AdminTeamFormProps) {
  const patch = (partial: Partial<TeamFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid columns={1}>
      <AdminField label="Họ tên">
        <Input value={value.name} onChange={(e) => patch({ name: e.target.value })} />
      </AdminField>
      <AdminField label="Vai trò">
        <Input value={value.role} onChange={(e) => patch({ role: e.target.value })} />
      </AdminField>
      <AdminField label="Avatar class (Tailwind)">
        <Input
          value={value.avatar}
          onChange={(e) => patch({ avatar: e.target.value })}
          placeholder="bg-brand-gold"
        />
      </AdminField>
      <AdminField label="Giới thiệu">
        <Input value={value.bio} onChange={(e) => patch({ bio: e.target.value })} />
      </AdminField>
      <AdminField label="Link mạng xã hội">
        <Input value={value.socialUrl} onChange={(e) => patch({ socialUrl: e.target.value })} />
      </AdminField>
      <div className="grid grid-cols-2 gap-4">
        <AdminField label="Thứ tự">
          <Input
            type="number"
            value={value.order}
            onChange={(e) => patch({ order: e.target.value })}
          />
        </AdminField>
        <AdminField label="Trạng thái">
          <Select value={value.status} onValueChange={(status) => patch({ status: status as TeamMember["status"] })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hiện">Hiện</SelectItem>
              <SelectItem value="Ẩn">Ẩn</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
      </div>
    </AdminFormGrid>
  )
}

export const EMPTY_TEAM_FORM: TeamFormValue = {
  name: "",
  role: "",
  avatar: "bg-brand-gold",
  bio: "",
  socialUrl: "",
  order: "1",
  status: "Hiện",
}

export function teamFormFromMember(member: TeamMember): TeamFormValue {
  return {
    name: member.name,
    role: member.role,
    avatar: member.avatar,
    bio: member.bio,
    socialUrl: member.socialUrl ?? "",
    order: String(member.order),
    status: member.status,
  }
}

export function teamFromFormValue(value: TeamFormValue, id: string): TeamMember {
  return {
    id,
    name: value.name.trim(),
    role: value.role.trim(),
    avatar: value.avatar.trim() || "bg-brand-gold",
    bio: value.bio.trim(),
    socialUrl: value.socialUrl.trim(),
    order: Number(value.order) || 0,
    status: value.status,
  }
}

export function teamPatchFromFormValue(value: TeamFormValue): Omit<TeamMember, "id"> {
  const member = teamFromFormValue(value, "")
  const { id: _id, ...patch } = member
  return patch
}
