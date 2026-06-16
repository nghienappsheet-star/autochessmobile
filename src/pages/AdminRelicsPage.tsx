import * as React from "react"
import {
  Button,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Gem } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminDeleteDialog,
  AdminListShell,
  AdminDataTable,
  AdminToolbar,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableFooterText,
  AdminFormDialog,
  AdminRelicDetailDialog,
  AdminRowActions,
} from "@/components/admin"
import { EMPTY_RELIC_FORM } from "@/components/admin/AdminRelicForm"
import { useAdminListPage } from "@/hooks/useAdminListPage"
import type { Relic } from "@/types/domain"

const AdminRelicForm = React.lazy(() =>
  import("@/components/admin/AdminRelicForm").then((m) => ({ default: m.AdminRelicForm }))
)

function RelicFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu dị vật...</div>
  )
}

export function AdminRelicsPage() {
  const { relics, addRelic, updateRelic, deleteRelic } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedType, setSelectedType] = React.useState("Tất cả loại")
  const [newRelic, setNewRelic] = React.useState(EMPTY_RELIC_FORM)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailRelic, setDetailRelic] = React.useState<Relic | null>(null)

  const matchRelic = React.useCallback(
    (relic: Relic, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        relic.name.toLowerCase().includes(query) ||
        relic.effect.toLowerCase().includes(query)
      const matchesType = selectedType === "Tất cả loại" || relic.type === selectedType
      return matchesSearch && matchesType
    },
    [selectedType]
  )

  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredRelics,
    paginatedItems: paginatedRelics,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    pageSize,
  } = useAdminListPage({
    items: relics,
    searchTerm,
    match: matchRelic,
    resetDeps: [selectedType],
  })

  const handleCreateRelic = () => {
    if (!newRelic.name.trim()) return
    const id = nextNumericId(relics)
    addRelic({
      id,
      name: newRelic.name,
      rating: newRelic.rating,
      type: newRelic.type,
      effect: newRelic.effect || "Nhận thêm sức mạnh gia tăng.",
      tier: 1,
      status: "Hiện",
    })
    setNewRelic(EMPTY_RELIC_FORM)
    showSuccess(`Đã thêm dị vật "${newRelic.name.trim()}".`)
    dialogs.closeAdd()
  }

  const handleUpdateRelic = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return
    updateRelic(dialogs.editingItem.id, dialogs.editingItem)
    showSuccess(`Đã cập nhật dị vật "${dialogs.editingItem.name}".`)
    dialogs.closeEdit()
  }

  const confirmDeleteRelic = () => {
    if (dialogs.deleteTarget) {
      deleteRelic(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa dị vật "${dialogs.deleteTarget.name}".`)
      dialogs.closeDelete()
    }
  }

  return (
    <>
      <AdminListShell
        header={
          <>
            <AdminPageHeader
              icon={Gem}
              title="Quản lý dị vật"
              description="Bảng tinh chỉnh kĩ năng bổ trợ đặc biệt, hiệu ứng chúc phúc dị vật bổ huyết hỗ trợ tổ đội."
            >
              <Button
                size="default"
                onClick={dialogs.openAdd}
                className="gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Thêm dị vật mới
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
              searchPlaceholder="Tìm kiếm dị vật bằng tên, hiệu ứng phong thuỷ..."
            >
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="min-w-[170px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả loại">Tất cả loại dị vật</SelectItem>
                  <SelectItem value="Tấn công">Loại Tấn công</SelectItem>
                  <SelectItem value="Phòng thủ">Loại Phòng thủ</SelectItem>
                  <SelectItem value="Đa dụng">Loại Đa dụng</SelectItem>
                  <SelectItem value="Phép thuật">Loại Phép thuật</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredRelics.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredRelics.length)}
              total={filteredRelics.length}
              label="loại dị biệt vật phẩm"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedRelics.length === 0}
          emptyTitle="Không tìm thấy cổ dị vật nào trùng khớp."
          emptyDescription="Hãy thử gõ từ khóa tìm kiếm khác của bạn."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh className="w-16 text-center">STT</AdminTh>
                <AdminTh>Tên dị vật cổ</AdminTh>
                <AdminTh className="text-center w-36">Phẩm chất (Rating)</AdminTh>
                <AdminTh>Phân loại dị bản</AdminTh>
                <AdminTh>Mô tả đặc tính & hiệu ứng</AdminTh>
                <AdminTh className="text-right w-44">Thao tác dữ liệu</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedRelics.map((row, idx) => {
                const actualIndex = startIndex + idx + 1
                return (
                  <AdminTr key={row.id} className="group">
                    <AdminTd className="text-center text-brand-text-sub font-mono admin-meta">{actualIndex}</AdminTd>
                    <AdminTd>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/5 border border-brand-border flex items-center justify-center overflow-hidden group-hover:scale-[1.05] transition-transform relative">
                          <Gem className="h-5 w-5 text-brand-gold/80" />
                        </div>
                        <div className="flex flex-col">
                          <button
                            onClick={() => {
                              setDetailRelic(row)
                              setIsDetailOpen(true)
                            }}
                            className="text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight"
                          >
                            {row.name}
                          </button>
                          <span className="admin-meta text-brand-text-sub font-mono tracking-wider opacity-90 mt-0.5">
                            RELIC_ID: {row.id.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-widest font-mono",
                          row.rating === "S"
                            ? "text-brand-gold border-brand-gold/30 bg-brand-gold/5"
                            : row.rating === "A"
                              ? "text-purple-400 border-purple-500/30 bg-purple-500/5"
                              : "text-blue-400 border-blue-500/30 bg-blue-500/5"
                        )}
                      >
                        Phẩm {row.rating}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <Badge
                        variant="secondary"
                        className="px-2.5 py-0.5 admin-meta font-bold uppercase bg-brand-card border-brand-border text-brand-text-sub"
                      >
                        {row.type}
                      </Badge>
                    </AdminTd>
                    <AdminTd>
                      <div className="text-brand-text-sub admin-body font-normal leading-relaxed line-clamp-1 max-w-[280px]">
                        {row.effect}
                      </div>
                    </AdminTd>
                    <AdminTd className="text-right">
                      <AdminRowActions
                        onView={() => {
                          setDetailRelic(row)
                          setIsDetailOpen(true)
                        }}
                        onEdit={() => dialogs.openEdit({ ...row })}
                        onDelete={() => dialogs.openDelete(row)}
                      />
                    </AdminTd>
                  </AdminTr>
                )
              })}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog
        open={dialogs.isAddOpen}
        onOpenChange={dialogs.setIsAddOpen}
        title="Thêm dị vật mới"
        description="Nhập thông số kịch hoạt và phân loại để thêm dị vật cổ vào bộ sưu tập bản cập nhật."
        size="lg"
        onSubmit={handleCreateRelic}
        submitLabel="Khai hoang dị vật"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<RelicFormFallback />}>
          <AdminRelicForm value={newRelic} onChange={setNewRelic} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title="Sửa thuộc tính Dị vật"
        description="Chỉnh sửa thông số hiệu quả tăng dồn kịch hoạt của di tích cổ vật."
        size="lg"
        onSubmit={handleUpdateRelic}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<RelicFormFallback />}>
            <AdminRelicForm
              value={{
                name: dialogs.editingItem.name,
                rating: dialogs.editingItem.rating,
                type: dialogs.editingItem.type,
                effect: dialogs.editingItem.effect,
              }}
              onChange={(value) =>
                dialogs.setEditingItem({ ...dialogs.editingItem!, ...value })
              }
            />
          </React.Suspense>
        )}
      </AdminFormDialog>

      <AdminRelicDetailDialog
        relic={detailRelic}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xác nhận xóa dị vật"
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc muốn xóa vĩnh viễn dị vật "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDeleteRelic}
        confirmLabel="Xóa dị vật"
      />
    </>
  )
}
