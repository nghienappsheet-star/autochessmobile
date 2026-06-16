import * as React from "react"
import { Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Plus, Users } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { TeamMember } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTableFooterText,
  AdminFormDialog,
  AdminDetailDialog,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminRowActions,
} from "@/components/admin"
import {
  EMPTY_TEAM_FORM,
  teamFormFromMember,
  teamFromFormValue,
  teamPatchFromFormValue,
} from "@/components/admin/AdminTeamForm"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminTeamForm = React.lazy(() =>
  import("@/components/admin/AdminTeamForm").then((m) => ({ default: m.AdminTeamForm }))
)

function TeamFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu thành viên...</div>
  )
}

export function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái")
  const [newForm, setNewForm] = React.useState(EMPTY_TEAM_FORM)
  const [editForm, setEditForm] = React.useState(EMPTY_TEAM_FORM)
  const [detail, setDetail] = React.useState<TeamMember | null>(null)

  const matchMember = React.useCallback(
    (m: TeamMember, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        m.name.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query) ||
        m.bio.toLowerCase().includes(query)
      const matchesStatus = selectedStatus === "Tất cả trạng thái" || m.status === selectedStatus
      return matchesSearch && matchesStatus
    },
    [selectedStatus]
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
  } = useAdminListPage({
    items: teamMembers,
    searchTerm,
    match: matchMember,
    resetDeps: [selectedStatus],
  })

  const handleCreate = () => {
    if (!newForm.name.trim()) return
    const created = teamFromFormValue(newForm, nextNumericId(teamMembers))
    addTeamMember(created)
    setNewForm(EMPTY_TEAM_FORM)
    dialogs.closeAdd()
    showSuccess(`Đã thêm thành viên ${created.name}.`)
  }

  const handleUpdate = () => {
    if (!dialogs.editingItem || !editForm.name.trim()) return
    updateTeamMember(dialogs.editingItem.id, teamPatchFromFormValue(editForm))
    dialogs.closeEdit()
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`)
  }

  const handleDelete = () => {
    if (!dialogs.deleteTarget) return
    deleteTeamMember(dialogs.deleteTarget.id)
    dialogs.closeDelete()
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`)
  }

  const openEdit = (member: TeamMember) => {
    setEditForm(teamFormFromMember(member))
    dialogs.openEdit(member)
  }

  return (
    <>
      <AdminListShell
        header={
          <>
            <AdminPageHeader
              icon={Users}
              title="Quản lý đội ngũ"
              description="Thành viên sáng lập và đội ngũ vận hành hiển thị trên trang Cộng đồng."
            >
              <Button
                onClick={() => {
                  setNewForm(EMPTY_TEAM_FORM)
                  dialogs.openAdd()
                }}
                className="gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl"
              >
                <Plus className="h-4 w-4" /> Thêm thành viên
              </Button>
            </AdminPageHeader>
            <AdminSuccessBanner message={successMessage ?? ""} />
          </>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Tìm theo tên, vai trò..."
            >
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="min-w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả trạng thái">Mọi trạng thái</SelectItem>
                  <SelectItem value="Hiện">Hiện</SelectItem>
                  <SelectItem value="Ẩn">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredItems.length ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredItems.length)}
              total={filteredItems.length}
              label="thành viên"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedItems.length === 0}
          emptyTitle="Chưa có thành viên nào."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh>Thành viên</AdminTh>
                <AdminTh>Vai trò</AdminTh>
                <AdminTh className="text-center">Thứ tự</AdminTh>
                <AdminTh className="text-center">Trạng thái</AdminTh>
                <AdminTh className="text-right">Thao tác</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedItems.map((row) => (
                <AdminTr key={row.id}>
                  <AdminTd>
                    <div className="font-bold text-brand-text-main">{row.name}</div>
                    <div className="text-[11px] text-brand-text-sub line-clamp-1 max-w-xs">{row.bio}</div>
                  </AdminTd>
                  <AdminTd>{row.role}</AdminTd>
                  <AdminTd className="text-center">{row.order}</AdminTd>
                  <AdminTd className="text-center">
                    <Badge variant={row.status === "Hiện" ? "success" : "secondary"}>{row.status}</Badge>
                  </AdminTd>
                  <AdminTd className="text-right">
                    <AdminRowActions
                      onView={() => setDetail(row)}
                      onEdit={() => openEdit(row)}
                      onDelete={() => dialogs.openDelete(row)}
                    />
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog
        open={dialogs.isAddOpen}
        onOpenChange={dialogs.setIsAddOpen}
        title="Thêm thành viên"
        onSubmit={handleCreate}
        submitLabel="Thêm"
      >
        <React.Suspense fallback={<TeamFormFallback />}>
          <AdminTeamForm value={newForm} onChange={setNewForm} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.closeEdit()
        }}
        title="Sửa thành viên"
        onSubmit={handleUpdate}
        submitLabel="Cập nhật"
      >
        <React.Suspense fallback={<TeamFormFallback />}>
          <AdminTeamForm value={editForm} onChange={setEditForm} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminDetailDialog
        open={!!detail}
        onOpenChange={(open) => !open && setDetail(null)}
        title={detail?.name ?? ""}
        footer={
          <Button onClick={() => setDetail(null)} variant="outline" className="w-full">
            Đóng
          </Button>
        }
      >
        {detail && (
          <div className="space-y-3 text-sm">
            <p>
              <strong>Vai trò:</strong> {detail.role}
            </p>
            <p>
              <strong>Giới thiệu:</strong> {detail.bio}
            </p>
            {detail.socialUrl && (
              <p>
                <strong>Link:</strong> {detail.socialUrl}
              </p>
            )}
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.closeDelete()
        }}
        title="Xóa thành viên"
        description={dialogs.deleteTarget ? `Xóa "${dialogs.deleteTarget.name}"?` : ""}
        onConfirm={handleDelete}
        confirmLabel="Xóa"
      />
    </>
  )
}
