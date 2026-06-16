import * as React from "react"
import { Link } from "react-router-dom"
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
  AdminDetailDialog,
  AdminItemForm,
  EMPTY_ITEM_FORM,
  itemFormFromItem,
  itemFromFormValue,
  AdminRowActions,
} from "@/components/admin"
import { useAdminPagination } from "@/hooks/useAdminPagination"
import { useAdminCrudDialogs } from "@/hooks/useAdminCrudDialogs"

export function AdminItemsPage() {
  const { items, heroes, addItem, updateItem, deleteItem } = useAppStore()
  const [search, setSearch] = React.useState("")
  const [selectedTier, setSelectedTier] = React.useState("Tất cả Bậc")
  const [newItem, setNewItem] = React.useState(EMPTY_ITEM_FORM)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailItem, setDetailItem] = React.useState<Item | null>(null)

  const dialogs = useAdminCrudDialogs<Item>()

  const handleCreateItem = () => {
    if (!newItem.name.trim()) return
    const id = slugifyItemId(
      newItem.name,
      items.map((i) => i.id)
    )
    addItem(itemFromFormValue(newItem, id))
    setNewItem(EMPTY_ITEM_FORM)
    dialogs.closeAdd()
  }

  const handleUpdateItem = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return
    updateItem(dialogs.editingItem.id, dialogs.editingItem)
    dialogs.closeEdit()
  }

  const confirmDeleteItem = () => {
    if (dialogs.deleteTarget) {
      deleteItem(dialogs.deleteTarget.id)
      dialogs.closeDelete()
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.stats.toLowerCase().includes(search.toLowerCase())
    const matchesTier = selectedTier === "Tất cả Bậc" || item.tier === Number(selectedTier)
    return matchesSearch && matchesTier
  })

  const { currentPage, setCurrentPage, totalPages, startIndex, pageSize, paginatedItems } =
    useAdminPagination(filteredItems, [search, selectedTier])

  return (
    <>
      <AdminListShell
        header={
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
        <AdminItemForm value={newItem} onChange={setNewItem} heroes={heroes} />
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
          <AdminItemForm
            value={itemFormFromItem(dialogs.editingItem, heroes)}
            onChange={(value) =>
              dialogs.setEditingItem(itemFromFormValue(value, dialogs.editingItem!.id))
            }
            heroes={heroes}
          />
        )}
      </AdminFormDialog>

      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title={detailItem?.name ?? "Chi tiết trang bị"}
        size="md"
        footer={
          detailItem ? (
            <>
              <Button asChild className="w-full sm:flex-1 h-11 bg-gold-gradient text-black rounded-xl font-bold uppercase admin-meta">
                <Link to={`/trang-bi/${detailItem.id}`} target="_blank" rel="noreferrer">
                  Xem trên web
                </Link>
              </Button>
              <Button
                onClick={() => setIsDetailOpen(false)}
                variant="outline"
                className="w-full sm:flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
              >
                Đóng
              </Button>
            </>
          ) : undefined
        }
      >
        {detailItem && (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-orange-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(245,180,60,0.1)]">
                <Package className="h-8 w-8 text-brand-gold" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <Badge variant={detailItem.tier >= 4 ? "danger-solid" : "warning"}>
                  BẬC {detailItem.tier}
                </Badge>
                <Badge variant="success">TRANG BỊ MÙA MỚI</Badge>
              </div>
            </div>

            {detailItem.description && (
              <div className="space-y-1.5">
                <span className="admin-form-label">Mô tả</span>
                <div className="p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed">
                  {detailItem.description}
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <span className="admin-form-label">Chỉ số tăng dồn</span>
              <div className="p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
                {detailItem.stats}
              </div>
            </div>
            {detailItem.effect && (
              <div className="space-y-1.5">
                <span className="admin-form-label">Hiệu ứng đặc biệt</span>
                <div className="p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border text-brand-text-sub">
                  {detailItem.effect}
                </div>
              </div>
            )}
            {detailItem.tacticalNotes && detailItem.tacticalNotes.length > 0 && (
              <div className="space-y-1.5">
                <span className="admin-form-label">Chiến thuật</span>
                <ul className="p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border space-y-1 text-brand-text-sub list-disc pl-5">
                  {detailItem.tacticalNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </AdminDetailDialog>

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
