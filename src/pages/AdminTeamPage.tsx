import * as React from "react"
import {
  Button,
  Input,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Edit2, Trash2, Eye, Users } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { TeamMember } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTableFooterText,
  AdminFormDialog,
  AdminDetailDialog,
  AdminField,
  AdminFormGrid,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
} from "@/components/admin"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 10

const emptyMember = (): TeamMember => ({
  id: "",
  name: "",
  role: "",
  avatar: "bg-brand-gold",
  bio: "",
  socialUrl: "",
  order: 1,
  status: "Hiện",
})

export function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [form, setForm] = React.useState<TeamMember>(emptyMember())
  const [editing, setEditing] = React.useState<TeamMember | null>(null)
  const [detail, setDetail] = React.useState<TeamMember | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<TeamMember | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  const filtered = teamMembers.filter((m) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      m.bio.toLowerCase().includes(q)
    const matchesStatus = selectedStatus === "Tất cả trạng thái" || m.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE)

  const nextId = () =>
    nextNumericId(teamMembers)

  const handleCreate = () => {
    if (!form.name.trim()) return
    addTeamMember({ ...form, id: nextId() })
    setForm(emptyMember())
    setIsAddOpen(false)
  }

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return
    updateTeamMember(editing.id, editing)
    setEditing(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteTeamMember(deleteTarget.id)
    setDeleteTarget(null)
  }

  const formFields = (value: TeamMember, onChange: (v: TeamMember) => void) => (
    <AdminFormGrid columns={1}>
      <AdminField label="Họ tên">
        <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
      </AdminField>
      <AdminField label="Vai trò">
        <Input value={value.role} onChange={(e) => onChange({ ...value, role: e.target.value })} />
      </AdminField>
      <AdminField label="Avatar class (Tailwind)">
        <Input value={value.avatar} onChange={(e) => onChange({ ...value, avatar: e.target.value })} placeholder="bg-brand-gold" />
      </AdminField>
      <AdminField label="Giới thiệu">
        <Input value={value.bio} onChange={(e) => onChange({ ...value, bio: e.target.value })} />
      </AdminField>
      <AdminField label="Link mạng xã hội">
        <Input value={value.socialUrl ?? ""} onChange={(e) => onChange({ ...value, socialUrl: e.target.value })} />
      </AdminField>
      <div className="grid grid-cols-2 gap-4">
        <AdminField label="Thứ tự">
          <Input type="number" value={value.order} onChange={(e) => onChange({ ...value, order: Number(e.target.value) || 0 })} />
        </AdminField>
        <AdminField label="Trạng thái">
          <Select value={value.status} onValueChange={(status) => onChange({ ...value, status })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Hiện">Hiện</SelectItem>
              <SelectItem value="Ẩn">Ẩn</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
      </div>
    </AdminFormGrid>
  )

  return (
    <>
      <AdminListShell
        header={
          <AdminPageHeader
            icon={Users}
            title="Quản lý đội ngũ"
            description="Thành viên sáng lập và đội ngũ vận hành hiển thị trên trang Cộng đồng."
          >
            <Button onClick={() => { setForm(emptyMember()); setIsAddOpen(true) }} className="gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl">
              <Plus className="h-4 w-4" /> Thêm thành viên
            </Button>
          </AdminPageHeader>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Tìm theo tên, vai trò...">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="min-w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả trạng thái">Mọi trạng thái</SelectItem>
                  <SelectItem value="Hiện">Hiện</SelectItem>
                  <SelectItem value="Ẩn">Ẩn</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={<AdminTableFooterText start={filtered.length ? startIndex + 1 : 0} end={Math.min(startIndex + PAGE_SIZE, filtered.length)} total={filtered.length} label="thành viên" />}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginated.length === 0}
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
              {paginated.map((row) => (
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
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setDetail(row)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setEditing({ ...row })}><Edit2 className="h-4 w-4 text-tier-b" /></Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setDeleteTarget(row)}><Trash2 className="h-4 w-4 text-brand-red/70" /></Button>
                    </div>
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog open={isAddOpen} onOpenChange={setIsAddOpen} title="Thêm thành viên" onSubmit={handleCreate} submitLabel="Thêm">
        {formFields(form, setForm)}
      </AdminFormDialog>

      <AdminFormDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} title="Sửa thành viên" onSubmit={handleUpdate} submitLabel="Cập nhật">
        {editing && formFields(editing, setEditing)}
      </AdminFormDialog>

      <AdminDetailDialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)} title={detail?.name ?? ""} footer={<Button onClick={() => setDetail(null)} variant="outline" className="w-full">Đóng</Button>}>
        {detail && (
          <div className="space-y-3 text-sm">
            <p><strong>Vai trò:</strong> {detail.role}</p>
            <p><strong>Giới thiệu:</strong> {detail.bio}</p>
            {detail.socialUrl && <p><strong>Link:</strong> {detail.socialUrl}</p>}
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)} title="Xóa thành viên" description={deleteTarget ? `Xóa "${deleteTarget.name}"?` : ""} onConfirm={handleDelete} confirmLabel="Xóa" />
    </>
  )
}
