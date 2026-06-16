import * as React from "react"
import {
  Card,
  Button,
  Input,
  Badge,
} from "@/components/ui/core"
import { Shield, Plus, Key, Users, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminFormDialog,
  AdminField,
  AdminDeleteDialog,
  AdminTableActionButton,
} from "@/components/admin"
import { useAdminCrudDialogs } from "@/hooks/useAdminCrudDialogs"
import { useAdminSuccessToast } from "@/hooks/useAdminSuccessToast"
import { useAdminRolesState, type AdminRoleRecord } from "@/lib/admin-store"

const AVAILABLE_SCOPES = [
  "all",
  "read:all",
  "read:heroes",
  "read:users",
  "write:posts",
  "write:comps",
  "write:comments",
  "flag_moderate",
  "priority_posting",
]

function ScopeChecklist({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (scopes: string[]) => void
}) {
  const toggle = (scope: string) => {
    if (selected.includes(scope)) {
      onChange(selected.filter((s) => s !== scope))
    } else {
      onChange([...selected, scope])
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto custom-scrollbar">
      {AVAILABLE_SCOPES.map((scope) => (
        <label
          key={scope}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer text-[12px] font-medium transition-all",
            selected.includes(scope)
              ? "bg-brand-gold/10 border-brand-gold/30 text-brand-gold"
              : "bg-brand-card-2 border-brand-border text-brand-text-sub hover:border-brand-gold/20"
          )}
        >
          <input
            type="checkbox"
            checked={selected.includes(scope)}
            onChange={() => toggle(scope)}
            className="rounded border-brand-border accent-brand-gold"
          />
          {scope}
        </label>
      ))}
    </div>
  )
}

export function AdminRolesPage() {
  const [roles, setRoles] = useAdminRolesState()

  const [newName, setNewName] = React.useState("")
  const [newCode, setNewCode] = React.useState("")
  const [newDesc, setNewDesc] = React.useState("")
  const [newScopes, setNewScopes] = React.useState<string[]>(["read:all"])
  const { successMessage, showSuccess } = useAdminSuccessToast()
  const dialogs = useAdminCrudDialogs<AdminRoleRecord>()

  const handleCreateRole = () => {
    if (!newName.trim() || !newCode.trim()) return
    const id = (roles.length + 1).toString()
    const newRole: AdminRoleRecord = {
      id,
      name: newName,
      code: newCode.toUpperCase().replace(/\s+/g, "_"),
      desc: newDesc || "Không có mô tả chi tiết.",
      users: 0,
      scopes: newScopes.length > 0 ? newScopes : ["read:all"],
    }
    setRoles((prev) => [...prev, newRole])
    setNewName("")
    setNewCode("")
    setNewDesc("")
    setNewScopes(["read:all"])
    showSuccess(`Đã tạo vai trò ${newName} thành công!`)
  }

  const handleUpdateRole = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim() || !dialogs.editingItem.code.trim()) return
    setRoles((prev) => prev.map((r) => (r.id === dialogs.editingItem!.id ? dialogs.editingItem! : r)))
    showSuccess(`Đã cập nhật vai trò ${dialogs.editingItem.name}.`)
    dialogs.closeEdit()
  }

  const handleDeleteRole = () => {
    if (!dialogs.deleteTarget) return
    setRoles((prev) => prev.filter((r) => r.id !== dialogs.deleteTarget!.id))
    showSuccess(`Đã xóa vai trò ${dialogs.deleteTarget.name}.`)
    dialogs.closeDelete()
  }

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        icon={Shield}
        title="Phân quyền & vai trò"
        description="Quản lý định nghĩa phân quyền (Scopes) và vai trò (Roles) trong ban quản trị."
      />

      <AdminSuccessBanner message={successMessage ?? ""} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {roles.map((role) => (
            <Card key={role.id} className="bg-brand-card border-brand-border rounded-xl p-6 hover:border-brand-gold/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/10">
                    <Key className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="admin-card-title">{role.name}</h3>
                    <span className="text-[10px] font-mono font-bold text-brand-gold bg-brand-gold/10 border border-brand-gold/10 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{role.code}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="admin-meta font-medium flex items-center gap-1 bg-brand-card-2 px-2.5 py-1 rounded-lg border border-brand-border">
                    <Users className="h-3.5 w-3.5" /> {role.users} tài khoản
                  </span>
                  {role.code !== "SUPER_ADMIN" && (
                    <>
                      <AdminTableActionButton
                        variant="edit"
                        onClick={() => dialogs.openEdit({ ...role, scopes: [...role.scopes] })}
                        label="Sửa vai trò"
                      />
                      <AdminTableActionButton
                        variant="delete"
                        onClick={() => dialogs.openDelete(role)}
                        label="Xóa vai trò"
                      />
                    </>
                  )}
                </div>
              </div>
              <p className="admin-body leading-relaxed mb-4">{role.desc}</p>

              <div className="flex flex-wrap gap-1">
                {role.scopes.map((sc) => (
                  <Badge key={sc} variant="secondary" className="bg-brand-card-2 border-transparent text-brand-text-sub text-[10px] font-bold">
                    {sc}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5">
            <h3 className="admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3">
              <Lock className="h-4 w-4 text-brand-gold" /> Tạo vai trò mới
            </h3>
            <div className="space-y-4">
              <AdminField label="Tên vai trò hiển thị">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: Kiểm thử viên"
                  className="bg-brand-card-2 border-brand-border rounded-xl"
                />
              </AdminField>
              <AdminField label="Mã định danh (Role Code)">
                <Input
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="Ví dụ: TESTER"
                  className="bg-brand-card-2 border-brand-border rounded-xl"
                />
              </AdminField>
              <AdminField label="Mô tả nhiệm vụ">
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full h-24 bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[13px] font-medium text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                  placeholder="Tóm tắt phân quyền..."
                />
              </AdminField>
              <AdminField label="Phạm vi quyền (Scopes)">
                <ScopeChecklist selected={newScopes} onChange={setNewScopes} />
              </AdminField>
              <Button
                onClick={handleCreateRole}
                className="w-full gap-2 bg-gold-gradient text-black font-bold text-[13px] uppercase h-11 rounded-xl shadow-none"
              >
                <Plus className="h-4 w-4 stroke-[2.5px]" /> Kích hoạt vai trò
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.closeEdit()
        }}
        title="Sửa vai trò"
        description="Cập nhật tên, mô tả và phạm vi quyền của vai trò."
        size="md"
        onSubmit={handleUpdateRole}
        submitLabel="Lưu thay đổi"
      >
        {dialogs.editingItem && (
          <div className="space-y-4">
            <AdminField label="Tên hiển thị">
              <Input
                value={dialogs.editingItem.name}
                onChange={(e) =>
                  dialogs.setEditingItem({ ...dialogs.editingItem!, name: e.target.value })
                }
                className="bg-brand-card-2 border-brand-border rounded-xl"
              />
            </AdminField>
            <AdminField label="Mã vai trò">
              <Input
                value={dialogs.editingItem.code}
                onChange={(e) =>
                  dialogs.setEditingItem({
                    ...dialogs.editingItem!,
                    code: e.target.value.toUpperCase().replace(/\s+/g, "_"),
                  })
                }
                className="bg-brand-card-2 border-brand-border rounded-xl font-mono"
              />
            </AdminField>
            <AdminField label="Mô tả">
              <textarea
                value={dialogs.editingItem.desc}
                onChange={(e) =>
                  dialogs.setEditingItem({ ...dialogs.editingItem!, desc: e.target.value })
                }
                className="w-full h-24 bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[13px] text-brand-text-main"
              />
            </AdminField>
            <AdminField label="Scopes">
              <ScopeChecklist
                selected={dialogs.editingItem.scopes}
                onChange={(scopes) =>
                  dialogs.setEditingItem({ ...dialogs.editingItem!, scopes })
                }
              />
            </AdminField>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.closeDelete()
        }}
        title="Xóa vai trò"
        description={
          dialogs.deleteTarget
            ? `Bạn muốn xóa vai trò "${dialogs.deleteTarget.name}" ra khỏi hệ thống?`
            : ""
        }
        onConfirm={handleDeleteRole}
      />
    </div>
  )
}
