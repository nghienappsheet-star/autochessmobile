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
import { Plus, Package } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"
import { slugifyItemId } from "@/lib/admin-utils"
import type { Item } from "@/types/domain"
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
  AdminItemDetailDialog,
  AdminRowActions,
} from "@/components/admin"
import {
  EMPTY_ITEM_FORM,
  itemFormFromItem,
  itemFromFormValue,
} from "@/components/admin/AdminItemForm"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminItemForm = React.lazy(() =>
  import("@/components/admin/AdminItemForm").then((m) => ({ default: m.AdminItemForm }))
)

function ItemFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu trang bị...</div>
  )
}

export function AdminItemsPage() {
  const { items, heroes, addItem, updateItem, deleteItem } = useAppStore()
  const [search, setSearch] = React.useState("")
  const [selectedTier, setSelectedTier] = React.useState("Tất cả Bậc")
  const [newItem, setNewItem] = React.useState(EMPTY_ITEM_FORM)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailItem, setDetailItem] = React.useState<Item | null>(null)

  const matchItem = React.useCallback(
    (item: Item, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        item.name.toLowerCase().includes(query) ||
        item.stats.toLowerCase().includes(query)
      const matchesTier = selectedTier === "Tất cả Bậc" || item.tier === Number(selectedTier)
      return matchesSearch && matchesTier
    },
    [selectedTier]
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
    items,
    searchTerm: search,
    match: matchItem,
    resetDeps: [selectedTier],
  })

  const handleCreateItem = () => {
    if (!newItem.name.trim()) return
    const id = slugifyItemId(
      newItem.name,
      items.map((i) => i.id)
    )
    addItem(itemFromFormValue(newItem, id))
    setNewItem(EMPTY_ITEM_FORM)
    showSuccess(`Đã thêm trang bị "${newItem.name.trim()}".`)
    dialogs.closeAdd()
  }

  const handleUpdateItem = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return
    updateItem(dialogs.editingItem.id, dialogs.editingItem)
    showSuccess(`Đã cập nhật trang bị "${dialogs.editingItem.name}".`)
    dialogs.closeEdit()
  }

  const confirmDeleteItem = () => {
    if (dialogs.deleteTarget) {
      deleteItem(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa trang bị "${dialogs.deleteTarget.name}".`)
      dialogs.closeDelete()
    }
  }

  return (
    <>
      <AdminListShell
        header={
          <>
            <AdminPageHeader
              icon={Package}
              title="Quản lý trang bị"
              description="Cập nhật kho tàng vật phẩm tranh đoạt chiến thuật, chỉ số cộng thêm và thuộc tính trang bị nâng cấp."
            >
              <Button
                size="default"
                onClick={dialogs.openAdd}
                className="gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Thêm trang bị mới
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
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Tìm kiếm vật phẩm dũng sĩ..."
            >
              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="min-w-[170px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả Bậc">Tất cả Bậc đồ</SelectItem>
                  <SelectItem value="1">Bậc 1 (Sơ cấp)</SelectItem>
                  <SelectItem value="2">Bậc 2 (Trung cấp)</SelectItem>
                  <SelectItem value="3">Bậc 3 (Cao cấp)</SelectItem>
                  <SelectItem value="4">Bậc 4 (Siêu phẩm)</SelectItem>
                  <SelectItem value="5">Bậc 5 (Huyền thoại)</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredItems.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredItems.length)}
              total={filteredItems.length}
              label="đại trang bị"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedItems.length === 0}
          emptyTitle="Không tìm thấy vật phẩm nào trùng khớp chỉ số."
          emptyDescription="Hãy thử gõ từ khóa tìm kiếm chính xác hơn."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh className="w-16 text-center">STT</AdminTh>
                <AdminTh>Tên vật phẩm</AdminTh>
                <AdminTh className="text-center w-36">Cấp bậc (Tier)</AdminTh>
                <AdminTh>Thuộc tính cộng thêm</AdminTh>
                <AdminTh className="text-center w-36">Đồng bộ đám mây</AdminTh>
                <AdminTh className="text-right w-44">Thao tác dữ liệu</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedItems.map((row, idx) => {
                const actualIndex = startIndex + idx + 1
                return (
                  <AdminTr key={row.id} className="group">
                    <AdminTd className="text-center text-brand-text-sub font-mono admin-meta">{actualIndex}</AdminTd>
                    <AdminTd>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center overflow-hidden group-hover:scale-[1.05] transition-transform relative">
                          <div
                            className={cn(
                              "absolute inset-0 opacity-20 bg-gradient-to-br",
                              row.tier >= 4
                                ? "from-brand-red to-orange-600"
                                : row.tier === 3
                                  ? "from-purple-500 to-indigo-600"
                                  : "from-blue-400 to-blue-600"
                            )}
                          />
                          <Package className="h-5 w-5 text-brand-text-sub/60 z-10" />
                        </div>
                        <div className="flex flex-col">
                          <button
                            onClick={() => {
                              setDetailItem(row)
                              setIsDetailOpen(true)
                            }}
                            className="text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight"
                          >
                            {row.name}
                          </button>
                          <span className="admin-meta text-brand-text-sub font-mono tracking-wider opacity-90 mt-0.5">
                            ID: {row.id.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-wider font-mono",
                          row.tier >= 4
                            ? "text-brand-red border-brand-red/30 bg-brand-red/5"
                            : row.tier === 3
                              ? "text-purple-400 border-purple-500/30 bg-purple-500/5"
                              : "text-blue-400 border-blue-500/30 bg-blue-500/5"
                        )}
                      >
                        Bậc {row.tier}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <div className="text-brand-text-sub admin-body font-normal leading-relaxed line-clamp-1 max-w-[320px]">
                        {row.stats}
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <span className="inline-flex items-center gap-1.5 text-brand-green admin-meta font-bold uppercase tracking-widest bg-brand-green/5 border border-brand-green/10 px-2.5 py-1 rounded-md leading-none">
                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                        Đã Đồng Bộ
                      </span>
                    </AdminTd>
                    <AdminTd className="text-right">
                      <AdminRowActions
                        onView={() => {
                          setDetailItem(row)
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
        title="Thêm trang bị mới"
        description="Nhập thông số, hiệu ứng và gợi ý chiến thuật cho trang bị mới."
        size="lg"
        onSubmit={handleCreateItem}
        submitLabel="Lưu trang bị"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<ItemFormFallback />}>
          <AdminItemForm value={newItem} onChange={setNewItem} heroes={heroes} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title="Chỉnh sửa trang bị"
        description="Cập nhật thông số, hiệu ứng và gợi ý chiến thuật của trang bị."
        size="lg"
        onSubmit={handleUpdateItem}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<ItemFormFallback />}>
            <AdminItemForm
              value={itemFormFromItem(dialogs.editingItem, heroes)}
              onChange={(value) =>
                dialogs.setEditingItem(itemFromFormValue(value, dialogs.editingItem!.id))
              }
              heroes={heroes}
            />
          </React.Suspense>
        )}
      </AdminFormDialog>

      <AdminItemDetailDialog item={detailItem} open={isDetailOpen} onOpenChange={setIsDetailOpen} />

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xác nhận xóa trang bị"
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc muốn xóa vĩnh viễn trang bị "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDeleteItem}
        confirmLabel="Xóa trang bị"
      />
    </>
  )
}
