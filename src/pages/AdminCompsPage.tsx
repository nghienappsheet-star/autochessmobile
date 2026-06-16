import * as React from "react"
import { Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { nextNumericId } from "@/lib/admin-utils"
import { Plus, Layout, Users, ThumbsUp } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { Comp } from "@/types/domain"
import {
  AdminDeleteDialog,
  AdminPageHeader,
  AdminSuccessBanner,
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
} from "@/components/admin"
import {
  EMPTY_COMP_FORM,
  compFormFromComp,
  compFromFormValue,
} from "@/components/admin/AdminCompForm"
import { calcSynergiesFromHeroes, recordFromBoardSlots } from "@/lib/comp-formation"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminCompForm = React.lazy(() =>
  import("@/components/admin/AdminCompForm").then((m) => ({ default: m.AdminCompForm }))
)

function CompFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu đội hình...</div>
  )
}

export function AdminCompsPage() {
  const { comps, heroes, addComp, updateComp, deleteComp } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedTier, setSelectedTier] = React.useState("Tất cả tier")
  const [newComp, setNewComp] = React.useState(EMPTY_COMP_FORM)
  const [editForm, setEditForm] = React.useState(EMPTY_COMP_FORM)
  const [editingId, setEditingId] = React.useState<string | null>(null)

  const matchComp = React.useCallback(
    (comp: Comp, q: string) => {
      if (q && !comp.name.toLowerCase().includes(q.toLowerCase())) return false
      if (selectedTier !== "Tất cả tier" && comp.tier !== selectedTier.split(" ")[0]) return false
      return true
    },
    [selectedTier]
  )

  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredComps,
    paginatedItems: paginatedComps,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize,
  } = useAdminListPage({
    items: comps,
    searchTerm,
    match: matchComp,
    resetDeps: [selectedTier],
  })

  const handleCreateComp = () => {
    if (!newComp.name.trim()) return
    const id = nextNumericId(comps)
    addComp(compFromFormValue(newComp, id, heroes))
    setNewComp(EMPTY_COMP_FORM)
    showSuccess(`Đã thêm đội hình "${newComp.name.trim()}".`)
    dialogs.closeAdd()
  }

  const handleUpdateComp = () => {
    if (!editingId || !editForm.name.trim()) return
    const existing = comps.find((c) => c.id === editingId)
    if (!existing) return
    const updated = compFromFormValue(editForm, editingId, heroes, existing)
    updateComp(editingId, {
      ...updated,
      board: recordFromBoardSlots(editForm.boardSlots),
      synergies: calcSynergiesFromHeroes(editForm.heroes, heroes),
      radarStats: editForm.radarStats,
    })
    setEditingId(null)
    showSuccess(`Đã cập nhật đội hình "${editForm.name.trim()}".`)
    dialogs.closeEdit()
  }

  const openEdit = (row: Comp) => {
    setEditingId(row.id)
    setEditForm(compFormFromComp(row))
    dialogs.openEdit(row)
  }

  const confirmDelete = () => {
    if (dialogs.deleteTarget) {
      deleteComp(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa đội hình "${dialogs.deleteTarget.name}".`)
      dialogs.closeDelete()
    }
  }

  return (
    <AdminListShell
      header={
        <>
          <AdminPageHeader
            title="Quản lý đội hình"
            description={`Duyệt và điều chỉnh ${comps.length} đội hình gợi ý cho Meta hiện tại.`}
          >
            <Button
              onClick={dialogs.openAdd}
              className="gap-2 bg-gold-gradient text-black font-semibold text-[14px] h-11 px-6 rounded-xl transition-all"
            >
              <Plus className="h-5 w-5 stroke-[2px]" /> Thêm đội hình mới
            </Button>
          </AdminPageHeader>
          <AdminSuccessBanner message={successMessage ?? ""} />
        </>
      }
    >
      <AdminDataTable
        fillHeight
        isEmpty={filteredComps.length === 0}
        emptyTitle="Không tìm thấy đội hình nào trùng khớp."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        footer={
          <AdminTableFooterText
            start={filteredComps.length > 0 ? startIndex + 1 : 0}
            end={Math.min(startIndex + pageSize, filteredComps.length)}
            total={filteredComps.length}
            label="đội hình"
          />
        }
        toolbar={
          <AdminToolbar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Tìm kiếm đội hình..."
          >
            <Select value={selectedTier} onValueChange={setSelectedTier}>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả tier">Tất cả Tier</SelectItem>
                <SelectItem value="S Tier">S Tier (Cực mạnh)</SelectItem>
                <SelectItem value="A Tier">A Tier (Mạnh)</SelectItem>
                <SelectItem value="B Tier">B Tier (Ổn định)</SelectItem>
                <SelectItem value="C Tier">C Tier (Tình huống)</SelectItem>
              </SelectContent>
            </Select>
          </AdminToolbar>
        }
      >
        <AdminTable minWidth="900px">
          <AdminThead>
            <AdminTr className="hover:bg-transparent border-0">
              <AdminTh className="w-16">#</AdminTh>
              <AdminTh>Tên đội hình Meta</AdminTh>
              <AdminTh>Tác giả</AdminTh>
              <AdminTh className="text-center w-24">Tier</AdminTh>
              <AdminTh className="text-center w-32">Thống kê</AdminTh>
              <AdminTh className="text-center w-24">Trạng thái</AdminTh>
              <AdminTh className="text-right w-36">Hành động</AdminTh>
            </AdminTr>
          </AdminThead>
          <tbody>
            {paginatedComps.map((row, idx) => (
              <AdminTr key={row.id} className="group">
                <AdminTd className="text-brand-text-sub font-mono text-[12px]">
                  {startIndex + idx + 1}
                </AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center border border-brand-border group-hover:scale-105 transition-transform",
                        row.tier === "S"
                          ? "bg-brand-red/10 border-brand-red/20"
                          : "bg-brand-card-2"
                      )}
                    >
                      <Layout
                        className={cn(
                          "h-5 w-5",
                          row.tier === "S" ? "text-brand-red" : "text-brand-text-sub"
                        )}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-brand-text-main text-[15px] group-hover:text-brand-gold transition-colors leading-tight">
                        {row.name}
                      </span>
                      <span className="text-[11px] text-brand-text-sub font-mono opacity-60 mt-0.5">
                        ID: COMP_{row.id}
                        {row.difficulty != null ? ` · Độ khó ${row.difficulty}/5` : ""}
                      </span>
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-card-2 flex items-center justify-center text-[10px] font-bold text-brand-gold border border-brand-border">
                      {row.author.substring(0, 1)}
                    </div>
                    <span className="text-brand-text-main font-medium text-[13.5px]">{row.author}</span>
                  </div>
                </AdminTd>
                <AdminTd className="text-center">
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-bold text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wide",
                      row.tier === "S"
                        ? "bg-brand-red text-white"
                        : "bg-brand-card-2 text-brand-gold"
                    )}
                  >
                    {row.tier} Tier
                  </Badge>
                </AdminTd>
                <AdminTd className="text-center">
                  <div className="inline-flex items-center gap-3 text-brand-text-sub font-semibold text-[11px]">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5 opacity-60" /> {row.likes}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Users className="h-3.5 w-3.5 opacity-60" /> {row.heroes?.length ?? 0}
                    </span>
                  </div>
                </AdminTd>
                <AdminTd className="text-center">
                  <span className="inline-flex items-center gap-1 bg-brand-green/10 text-brand-green px-2.5 py-1 text-[11px] font-bold rounded-md">
                    Hiện
                  </span>
                </AdminTd>
                <AdminTd className="text-right">
                  <div className="flex justify-end gap-1.5">
                    <AdminTableActionButton
                      variant="edit"
                      onClick={() => openEdit(row)}
                      label="Sửa đội hình"
                    />
                    <AdminTableActionButton
                      variant="delete"
                      onClick={() => dialogs.openDelete(row)}
                      label="Xóa đội hình"
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
        title="Tạo đội hình Meta"
        description="Thiết lập các tướng chủ chốt và tộc hệ cho đội hình mới."
        size="lg"
        onSubmit={handleCreateComp}
        submitLabel="Công bố Meta"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<CompFormFallback />}>
          <AdminCompForm value={newComp} onChange={setNewComp} heroes={heroes} autoRadar />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) {
            dialogs.setEditingItem(null)
            setEditingId(null)
          }
        }}
        title="Sửa đội hình Meta"
        description="Cập nhật thông tin chi tiết và định hướng cho đội hình."
        size="lg"
        onSubmit={handleUpdateComp}
        submitLabel="Cập nhật"
        cancelLabel="Hủy bỏ"
      >
        {editingId && (
          <React.Suspense fallback={<CompFormFallback />}>
            <AdminCompForm value={editForm} onChange={setEditForm} heroes={heroes} autoRadar />
          </React.Suspense>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xóa đội hình Meta"
        description={
          dialogs.deleteTarget
            ? `Bạn chắc chắn muốn xoá đội hình "${dialogs.deleteTarget.name}"? Thao tác này sẽ xoá cấu trúc khỏi mục hướng dẫn Meta.`
            : ""
        }
        onConfirm={confirmDelete}
      />
    </AdminListShell>
  )
}
