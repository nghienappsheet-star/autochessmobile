import * as React from "react"
import { Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Plus, User, Shield, Ban, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { nextNumericIdNumber } from "@/lib/admin-utils"
import { DEFAULT_ADMIN_USERS, useAdminUsersState } from "@/lib/admin-store"
import { ADMIN_USERS_SYNC_EVENT } from "@/lib/auth-bridge"
import { loadJson } from "@/lib/storage"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import {
  AdminPageHeader,
  AdminSuccessBanner,
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
  AdminTableActionButton,
  type AdminUserRecord,
} from "@/components/admin"
import { EMPTY_USER_FORM, userFormFromRecord } from "@/components/admin/AdminUserForm"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminUserForm = React.lazy(() =>
  import("@/components/admin/AdminUserForm").then((m) => ({ default: m.AdminUserForm }))
)

function UserFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu người dùng...</div>
  )
}

export function AdminUsersPage() {
  const [users, setUsers] = useAdminUsersState()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState("Mọi vai trò")
  const [selectedStatus, setSelectedStatus] = React.useState("Mọi trạng thái")
  const [newForm, setNewForm] = React.useState(EMPTY_USER_FORM)
  const [editForm, setEditForm] = React.useState(EMPTY_USER_FORM)

  const matchUser = React.useCallback(
    (user: AdminUserRecord, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
      const matchesRole = selectedRole === "Mọi vai trò" || user.role === selectedRole
      const matchesStatus = selectedStatus === "Mọi trạng thái" || user.status === selectedStatus
      return matchesSearch && matchesRole && matchesStatus
    },
    [selectedRole, selectedStatus]
  )

  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize,
  } = useAdminListPage<AdminUserRecord>({
    items: users,
    searchTerm,
    match: matchUser,
    resetDeps: [selectedRole, selectedStatus],
  })

  React.useEffect(() => {
    const onSync = () => {
      setUsers(loadJson(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS))
    }
    window.addEventListener(ADMIN_USERS_SYNC_EVENT, onSync)
    return () => window.removeEventListener(ADMIN_USERS_SYNC_EVENT, onSync)
  }, [setUsers])

  const handleCreateUser = () => {
    if (!newForm.name.trim() || !newForm.email.trim()) return
    const created: AdminUserRecord = {
      id: nextNumericIdNumber(users),
      name: newForm.name.trim(),
      email: newForm.email.trim(),
      role: newForm.role,
      status: "Hoạt động",
      date: new Date().toLocaleDateString("vi-VN"),
    }
    setUsers([created, ...users])
    setNewForm(EMPTY_USER_FORM)
    dialogs.closeAdd()
    showSuccess(`Đã tạo tài khoản ${created.name}.`)
  }

  const handleUpdateUser = () => {
    if (!dialogs.editingItem || !editForm.name.trim() || !editForm.email.trim()) return
    setUsers((prev) =>
      prev.map((u) =>
        u.id === dialogs.editingItem!.id
          ? {
              ...u,
              name: editForm.name.trim(),
              email: editForm.email.trim(),
              role: editForm.role,
              status: editForm.status,
            }
          : u
      )
    )
    dialogs.closeEdit()
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`)
  }

  const handleDeleteUser = () => {
    if (!dialogs.deleteTarget) return
    setUsers((prev) => prev.filter((u) => u.id !== dialogs.deleteTarget!.id))
    dialogs.closeDelete()
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`)
  }

  const toggleUserStatus = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Hoạt động" ? "Bị khóa" : "Hoạt động" }
          : u
      )
    )
  }

  const openEdit = (user: AdminUserRecord) => {
    setEditForm(userFormFromRecord(user))
    dialogs.openEdit(user)
  }

  return (
    <AdminListShell
      header={
        <>
          <AdminPageHeader
            icon={User}
            title="Quản lý người dùng"
            description="Quản lý danh sách thành viên, phân quyền truy cập và kiểm soát cộng đồng."
          >
            <Button
              onClick={() => {
                setNewForm(EMPTY_USER_FORM)
                dialogs.openAdd()
              }}
              className="gap-2 bg-gold-gradient text-black font-semibold text-[14px] h-11 px-6 rounded-xl transition-all"
            >
              <Plus className="h-5 w-5 stroke-[2px]" /> Thêm người dùng
            </Button>
          </AdminPageHeader>
          <AdminSuccessBanner message={successMessage ?? ""} />
        </>
      }
    >
      <AdminDataTable
        fillHeight
        isEmpty={filteredItems.length === 0}
        emptyTitle="Không tìm thấy thành viên nào trùng khớp."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        footer={
          <AdminTableFooterText
            start={filteredItems.length > 0 ? startIndex + 1 : 0}
            end={Math.min(startIndex + pageSize, filteredItems.length)}
            total={filteredItems.length}
            label="thành viên"
          />
        }
        toolbar={
          <AdminToolbar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
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
            {paginatedItems.map((row) => (
              <AdminTr key={row.id} className="group">
                <AdminTd className="text-brand-text-sub font-mono text-[12px]">{row.id}</AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-brand-border group-hover:scale-105 transition-transform relative",
                        row.role === "Admin" ? "bg-brand-gold/10 border-brand-gold/20" : "bg-brand-card-2"
                      )}
                    >
                      {row.role === "Admin" ? (
                        <Shield className="h-5 w-5 text-brand-gold" />
                      ) : (
                        <User className="h-5 w-5 text-brand-text-sub" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-brand-text-main text-[15px] group-hover:text-brand-gold transition-colors">
                        {row.name}
                      </span>
                      <span className="text-[11px] text-brand-text-sub font-mono font-medium opacity-60 mt-0.5">
                        USER_ID: {1000 + row.id}
                      </span>
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
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-bold text-[10px] px-2.5 py-0.5 rounded uppercase tracking-wide",
                      row.role === "Admin"
                        ? "bg-brand-gold text-black border-transparent"
                        : row.role === "Moderator"
                          ? "bg-blue-600/20 text-blue-400 border-blue-500/20"
                          : "bg-brand-card-2 text-brand-text-sub border-transparent"
                    )}
                  >
                    {row.role}
                  </Badge>
                </AdminTd>
                <AdminTd className="text-center">
                  <div className="flex justify-center">
                    {row.status === "Hoạt động" ? (
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
                <AdminTd className="text-center text-brand-text-sub text-[13px] font-semibold font-mono">
                  {row.date}
                </AdminTd>
                <AdminTd className="text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <AdminTableActionButton
                      variant="edit"
                      onClick={() => openEdit(row)}
                      label="Sửa thành viên"
                    />
                    <AdminTableActionButton
                      variant="delete"
                      onClick={() => dialogs.openDelete(row)}
                      label="Xóa thành viên"
                    />
                  </div>
                </AdminTd>
              </AdminTr>
            ))}
          </tbody>
        </AdminTable>
      </AdminDataTable>

      <AdminFormDialog
        open={dialogs.isAddOpen}
        onOpenChange={dialogs.setIsAddOpen}
        title="Tạo tài khoản mới"
        description="Cấp quyền truy cập hệ thống cho game thủ hoặc quản trị viên mới."
        size="sm"
        onSubmit={handleCreateUser}
        submitLabel="Tạo tài khoản"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<UserFormFallback />}>
          <AdminUserForm value={newForm} onChange={setNewForm} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.closeEdit()
        }}
        title="Cập nhật tài khoản"
        description="Sửa đổi thông tin và phân quyền của thành viên."
        size="sm"
        onSubmit={handleUpdateUser}
        submitLabel="Cập nhật"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<UserFormFallback />}>
          <AdminUserForm value={editForm} onChange={setEditForm} showStatus />
        </React.Suspense>
      </AdminFormDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.closeDelete()
        }}
        title="Xóa người dùng"
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc chắn muốn xóa "${dialogs.deleteTarget.name}"? Thao tác này không thể hoàn tác.`
            : ""
        }
        onConfirm={handleDeleteUser}
      />
    </AdminListShell>
  )
}
