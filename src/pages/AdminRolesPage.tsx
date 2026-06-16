import * as React from "react"
import {
  Card,
  Button,
  Input,
  Badge,
} from "@/components/ui/core"
import { Shield, Plus, Edit2, Trash2, Key, Users, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminFormDialog,
  AdminField,
} from "@/components/admin"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"

type Role = {
  id: string
  name: string
  code: string
  desc: string
  users: number
  scopes: string[]
}

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
  const [roles, setRoles] = React.useState<Role[]>([
    { id: "1", name: "Super Admin", code: "SUPER_ADMIN", desc: "Toàn quyền cấu hình hệ thống, quản lý cơ sở dữ liệu, sửa đổi tướng, tộc hệ và tài khoản người dùng.", users: 2, scopes: ["all"] },
    { id: "2", name: "Editor", code: "EDITOR", desc: "Được quyền biên tập bài viết, đăng tin tức, quản lý Banners và tạo các cẩm nang đội hình mới.", users: 4, scopes: ["write:posts", "write:comps", "read:heroes"] },
    { id: "3", name: "Moderator", code: "MODERATOR", desc: "Duyệt bình luận của cộng đồng, kiểm duyệt nội dung bài đăng thành viên và báo cáo vi phạm.", users: 3, scopes: ["read:users", "write:comments", "flag_moderate"] },
    { id: "4", name: "Vip Member", code: "VIP_MEMBER", desc: "Người dùng đặc biệt, hưởng đặc quyền bình luận nâng cao và ưu tiên duyệt bài đăng chiến thuật nhanh.", users: 84, scopes: ["priority_posting"] },
  ])

  const [newName, setNewName] = React.useState("")
  const [newCode, setNewCode] = React.useState("")
  const [newDesc, setNewDesc] = React.useState("")
  const [newScopes, setNewScopes] = React.useState<string[]>(["read:all"])
  const [successMsg, setSuccessMsg] = React.useState("")

  const [editingRole, setEditingRole] = React.useState<Role | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; name: string } | null>(null)

  const handleCreateRole = () => {
    if (!newName.trim() || !newCode.trim()) return
    const id = (roles.length + 1).toString()
    const newRole: Role = {
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
    setSuccessMsg(`Đã tạo vai trò ${newName} thành công!`)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleUpdateRole = () => {
    if (!editingRole || !editingRole.name.trim() || !editingRole.code.trim()) return
    setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? editingRole : r)))
    setEditingRole(null)
    setIsEditOpen(false)
    setSuccessMsg(`Đã cập nhật vai trò ${editingRole.name}.`)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleDeleteRole = (id: string) => {
    setRoles((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        icon={Shield}
        title="Phân quyền & vai trò"
        description="Quản lý định nghĩa phân quyền (Scopes) và vai trò (Roles) trong ban quản trị."
      />

      <AdminSuccessBanner message={successMsg} />

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
                      <Button
                        onClick={() => {
                          setEditingRole({ ...role, scopes: [...role.scopes] })
                          setIsEditOpen(true)
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-brand-gold"
                        title="Sửa vai trò"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setDeleteTarget({ id: role.id, name: role.name })}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-brand-red rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Sửa vai trò"
        description="Cập nhật tên, mô tả và phạm vi quyền của vai trò."
        size="md"
        onSubmit={handleUpdateRole}
        submitLabel="Lưu thay đổi"
      >
        {editingRole && (
          <div className="space-y-4">
            <AdminField label="Tên hiển thị">
              <Input
                value={editingRole.name}
                onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
                className="bg-brand-card-2 border-brand-border rounded-xl"
              />
            </AdminField>
            <AdminField label="Mã vai trò">
              <Input
                value={editingRole.code}
                onChange={(e) => setEditingRole({ ...editingRole, code: e.target.value.toUpperCase().replace(/\s+/g, "_") })}
                className="bg-brand-card-2 border-brand-border rounded-xl font-mono"
              />
            </AdminField>
            <AdminField label="Mô tả">
              <textarea
                value={editingRole.desc}
                onChange={(e) => setEditingRole({ ...editingRole, desc: e.target.value })}
                className="w-full h-24 bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[13px] text-brand-text-main"
              />
            </AdminField>
            <AdminField label="Scopes">
              <ScopeChecklist
                selected={editingRole.scopes}
                onChange={(scopes) => setEditingRole({ ...editingRole, scopes })}
              />
            </AdminField>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa vai trò"
        description={
          deleteTarget
            ? `Bạn muốn xóa vai trò "${deleteTarget.name}" ra khỏi hệ thống?`
            : ""
        }
        onConfirm={() => {
          if (deleteTarget) handleDeleteRole(deleteTarget.id)
          setDeleteTarget(null)
        }}
      />
    </div>
  )
}
