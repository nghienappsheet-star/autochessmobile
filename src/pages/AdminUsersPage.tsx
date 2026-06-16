import * as React from "react"
import { Button, Input, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Plus, User, Shield, Ban, Mail, Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { nextNumericIdNumber } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableFooterText,
  AdminFormDialog,
  AdminField,
} from "@/components/admin"

const INITIAL_USERS = [
  { id: 1, name: 'Admin_Master', email: 'admin@5fedu.com', role: 'Admin', status: 'Hoạt động', date: '20/05/2024' },
  { id: 2, name: 'Moderator_Zen', email: 'zen.mod@autochess.io', role: 'Moderator', status: 'Hoạt động', date: '20/05/2024' },
  { id: 3, name: 'PlayerOne', email: 'player1@gmail.com', role: 'Thành viên', status: 'Hoạt động', date: '20/05/2024' },
  { id: 4, name: 'StrategyKing', email: 'king@meta.com', role: 'Thành viên', status: 'Hoạt động', date: '19/05/2024' },
  { id: 5, name: 'TrollBot_99', email: 'troll@trash.com', role: 'Thành viên', status: 'Bị khóa', date: '18/05/2024' },
]

export function AdminUsersPage() {
  const [users, setUsers] = React.useState(INITIAL_USERS)
  const [search, setSearch] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState("Mọi vai trò")
  const [selectedStatus, setSelectedStatus] = React.useState("Mọi trạng thái")

  const [newUsername, setNewUsername] = React.useState("")
  const [newEmail, setNewEmail] = React.useState("")
  const [newRole, setNewRole] = React.useState("Thành viên")
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  const [editingUser, setEditingUser] = React.useState<any>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: number; name: string } | null>(null)

  const handleCreateUser = () => {
    if (!newUsername.trim() || !newEmail.trim()) return
    const id = nextNumericIdNumber(users)
    const newUser = {
      id,
      name: newUsername,
      email: newEmail,
      role: newRole,
      status: "Hoạt động",
      date: new Date().toLocaleDateString("vi-VN")
    }
    setUsers([newUser, ...users])
    setNewUsername("")
    setNewEmail("")
    setNewRole("Thành viên")
    setIsAddOpen(false)
  }

  const handleUpdateUser = () => {
    if (!editingUser || !editingUser.name.trim() || !editingUser.email.trim()) return
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
    setEditingUser(null)
    setIsEditOpen(false)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const toggleUserStatus = (id: number) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return {
          ...u,
          status: u.status === "Hoạt động" ? "Bị khóa" : "Hoạt động"
        }
      }
      return u
    }))
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
                          user.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = selectedRole === "Mọi vai trò" || user.role === selectedRole
    const matchesStatus = selectedStatus === "Mọi trạng thái" || user.status === selectedStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedRole, selectedStatus])

  return (
    <AdminListShell
      header={
        <AdminPageHeader
          icon={User}
          title="Quản lý người dùng"
          description="Quản lý danh sách thành viên, phân quyền truy cập và kiểm soát cộng đồng."
        >
          <Button
            onClick={() => setIsAddOpen(true)}
            className="gap-2 bg-gold-gradient text-black font-semibold text-[14px] h-11 px-6 rounded-xl transition-all"
          >
            <Plus className="h-5 w-5 stroke-[2px]" /> Thêm người dùng
          </Button>
        </AdminPageHeader>
      }
    >
      <AdminDataTable
        fillHeight
        isEmpty={filteredUsers.length === 0}
        emptyTitle="Không tìm thấy thành viên nào trùng khớp."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        footer={
          <AdminTableFooterText
            start={filteredUsers.length > 0 ? startIndex + 1 : 0}
            end={Math.min(startIndex + pageSize, filteredUsers.length)}
            total={filteredUsers.length}
            label="thành viên"
          />
        }
        toolbar={
          <AdminToolbar
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder="Tìm kiếm theo tên hoặc email..."
          >
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mọi vai trò">Mọi vai trò</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
                <SelectItem value="Thành viên">Thành viên</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mọi trạng thái">Mọi trạng thái</SelectItem>
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Bị khóa">Bị khóa</SelectItem>
              </SelectContent>
            </Select>
          </AdminToolbar>
        }
      >
        <AdminTable minWidth="900px">
          <AdminThead>
            <AdminTr className="hover:bg-transparent border-0">
              <AdminTh className="w-16">#</AdminTh>
              <AdminTh>Định danh người dùng</AdminTh>
              <AdminTh>Email liên hệ</AdminTh>
              <AdminTh className="text-center w-32">Vai trò</AdminTh>
              <AdminTh className="text-center w-32">Trạng thái</AdminTh>
              <AdminTh className="text-center">Gia nhập</AdminTh>
              <AdminTh className="text-right w-36">Hành động</AdminTh>
            </AdminTr>
          </AdminThead>
          <tbody>
            {paginatedUsers.map((row) => (
              <AdminTr key={row.id} className="group">
                <AdminTd className="text-brand-text-sub font-mono text-[12px]">{row.id}</AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-brand-border group-hover:scale-105 transition-transform relative",
                      row.role === 'Admin' ? "bg-brand-gold/10 border-brand-gold/20" : "bg-brand-card-2"
                    )}>
                      {row.role === 'Admin' ? <Shield className="h-5 w-5 text-brand-gold" /> : <User className="h-5 w-5 text-brand-text-sub" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-brand-text-main text-[15px] group-hover:text-brand-gold transition-colors">{row.name}</span>
                      <span className="text-[11px] text-brand-text-sub font-mono font-medium opacity-60 mt-0.5">USER_ID: {1000 + row.id}</span>
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-2 text-brand-text-sub text-[13px] font-medium font-sans">
                    <Mail className="h-3.5 w-3.5 opacity-40" />
                    {row.email}
                  </div>
                </AdminTd>
                <AdminTd className="text-center">
                  <Badge variant="secondary" className={cn(
                    "font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wide",
                    row.role === 'Admin' ? "bg-brand-gold text-black border-transparent" : row.role === 'Moderator' ? "bg-blue-600/20 text-blue-400 border-blue-500/20" : "bg-brand-card-2 text-brand-text-sub border-transparent"
                  )}>
                    {row.role}
                  </Badge>
                </AdminTd>
                <AdminTd className="text-center">
                  <div className="flex justify-center">
                    {row.status === 'Hoạt động' ? (
                      <button
                        onClick={() => toggleUserStatus(row.id)}
                        title="Click để khoá tài khoản"
                        className="flex items-center gap-1.5 text-brand-green text-[11px] font-bold uppercase bg-brand-green/10 px-2.5 py-1 rounded border border-brand-green/20 hover:bg-brand-green/20 transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                        Hoạt động
                      </button>
                    ) : (
                      <button
                        onClick={() => toggleUserStatus(row.id)}
                        title="Click để mở khoá tài khoản"
                        className="flex items-center gap-1.5 text-brand-red text-[11px] font-bold uppercase bg-brand-red/10 px-2.5 py-1 rounded border border-brand-red/20 hover:bg-brand-red/20 transition-all"
                      >
                        <Ban className="h-3 w-3" />
                        Bị Khóa
                      </button>
                    )}
                  </div>
                </AdminTd>
                <AdminTd className="text-center text-brand-text-sub text-[13px] font-semibold font-mono">{row.date}</AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      onClick={() => { setEditingUser(row); setIsEditOpen(true); }}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-all"
                      title="Sửa thành viên"
                    >
                      <Edit2 className="h-4 w-4 text-blue-400" />
                    </Button>
                    <Button
                      onClick={() => setDeleteTarget({ id: row.id, name: row.name })}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-red transition-all"
                      title="Xóa thành viên"
                    >
                      <Trash2 className="h-4 w-4 text-brand-red/70 hover:text-brand-red" />
                    </Button>
                  </div>
                </AdminTd>
              </AdminTr>
            ))}
          </tbody>
        </AdminTable>
      </AdminDataTable>

      <AdminFormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Tạo tài khoản mới"
        description="Cấp quyền truy cập hệ thống cho game thủ hoặc quản trị viên mới."
        size="sm"
        onSubmit={handleCreateUser}
        submitLabel="Tạo tài khoản"
        cancelLabel="Hủy bỏ"
      >
        <div className="space-y-4">
          <AdminField label="Tên người dùng">
            <Input
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="Ví dụ: PlayerZero"
              className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
            />
          </AdminField>
          <AdminField label="Địa chỉ Email">
            <Input
              type="email"
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
              placeholder="email@example.com"
              className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
            />
          </AdminField>
          <AdminField label="Vai trò hệ thống">
            <Select value={newRole} onValueChange={setNewRole}>
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
        </div>
      </AdminFormDialog>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) setEditingUser(null)
        }}
        title="Cập nhật tài khoản"
        description="Sửa đổi thông tin và phân quyền của thành viên."
        size="sm"
        onSubmit={handleUpdateUser}
        submitLabel="Cập nhật"
        cancelLabel="Hủy bỏ"
      >
        {editingUser && (
          <div className="space-y-4">
            <AdminField label="Tên người dùng">
              <Input
                value={editingUser.name}
                onChange={e => setEditingUser({ ...editingUser, name: e.target.value })}
                placeholder="Tên hiển thị"
                className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
              />
            </AdminField>
            <AdminField label="Địa chỉ Email">
              <Input
                type="email"
                value={editingUser.email}
                onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                placeholder="email@example.com"
                className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
              />
            </AdminField>
            <AdminField label="Vai trò hệ thống">
              <Select
                value={editingUser.role}
                onValueChange={(role) => setEditingUser({ ...editingUser, role })}
              >
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
            <AdminField label="Trạng thái tài khoản">
              <Select
                value={editingUser.status}
                onValueChange={(status) => setEditingUser({ ...editingUser, status })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                  <SelectItem value="Bị khóa">Bị khóa</SelectItem>
                </SelectContent>
              </Select>
            </AdminField>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa người dùng"
        description={
          deleteTarget
            ? `Bạn có chắc chắn muốn xóa "${deleteTarget.name}"? Thao tác này không thể hoàn tác.`
            : ""
        }
        onConfirm={() => {
          if (deleteTarget) handleDeleteUser(deleteTarget.id)
          setDeleteTarget(null)
        }}
      />
    </AdminListShell>
  )
}
