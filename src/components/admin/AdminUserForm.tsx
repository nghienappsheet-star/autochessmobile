import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField } from "@/components/admin/AdminField"

export type AdminUserRecord = {
  id: number
  name: string
  email: string
  role: string
  status: string
  date: string
}

export type UserFormValue = {
  name: string
  email: string
  role: string
  status: string
}

type AdminUserFormProps = {
  value: UserFormValue
  onChange: (value: UserFormValue) => void
  showStatus?: boolean
}

export function AdminUserForm({ value, onChange, showStatus = false }: AdminUserFormProps) {
  const patch = (partial: Partial<UserFormValue>) => onChange({ ...value, ...partial })

  return (
    <div className="space-y-4">
      <AdminField label="Tên người dùng">
        <Input
          value={value.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder="Ví dụ: PlayerZero"
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Địa chỉ Email">
        <Input
          type="email"
          value={value.email}
          onChange={(e) => patch({ email: e.target.value })}
          placeholder="email@example.com"
          className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        />
      </AdminField>
      <AdminField label="Vai trò hệ thống">
        <Select value={value.role} onValueChange={(role) => patch({ role })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Thành viên">Thành viên (Player)</SelectItem>
            <SelectItem value="Moderator">Moderator (Điều hành viên)</SelectItem>
            <SelectItem value="Admin">Admin (Nhà quản trị)</SelectItem>
          </SelectContent>
        </Select>
      </AdminField>
      {showStatus && (
        <AdminField label="Trạng thái tài khoản">
          <Select value={value.status} onValueChange={(status) => patch({ status })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hoạt động">Hoạt động</SelectItem>
              <SelectItem value="Bị khóa">Bị khóa</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
      )}
    </div>
  )
}

export const EMPTY_USER_FORM: UserFormValue = {
  name: "",
  email: "",
  role: "Thành viên",
  status: "Hoạt động",
}

export function userFormFromRecord(user: AdminUserRecord): UserFormValue {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  }
}
