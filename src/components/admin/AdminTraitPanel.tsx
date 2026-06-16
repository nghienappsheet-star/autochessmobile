import * as React from "react"
import { Button, Input, Badge } from "@/components/ui/core"
import { Plus, Edit2, Trash2, Zap, Eye, Workflow } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import {
  AdminDeleteDialog,
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
  AdminField,
  AdminFormGrid,
} from "@/components/admin"
import type { ClassSynergy, Hero, Race } from "@/types/domain"
import type { TraitKind } from "@/lib/traits"
import { TraitIcon } from "@/components/traits/TraitIcon"

type TraitRecord = Race | ClassSynergy

type AdminTraitPanelProps = {
  kind: TraitKind
}

const PANEL_CONFIG = {
  race: {
    emptyMessage: "Không tìm thấy chủng tộc nào phù hợp.",
    idLabel: "TỘC",
    addButton: "Thêm Tộc mới",
    addTitle: "Khởi tạo Tộc hệ",
    addDesc: "Cài đặt biểu tượng và hiệu ứng mốc kích hoạt cho chủng tộc mới.",
    nameLabel: "Tên Tộc",
    namePlaceholder: "Ví dụ: Ác Ma",
    defaultIcon: "🛡️",
    defaultDesc: "Hiệu ứng kích hoạt đặc trưng.",
    defaultMilestones: [
      { count: 2, effect: "Tăng 10% chỉ số." },
      { count: 4, effect: "Tăng 25% chỉ số." },
    ],
    detailBadge: "SYNERGY CHỦNG TỘC",
    editTitle: "Sửa Tộc hệ",
    editDesc: "Cập nhật biểu tượng và mô tả thuộc tính của chủng tộc.",
    deleteTitle: "Xác nhận xóa chủng tộc",
    deleteConfirm: "Xóa tộc",
    paginationUnit: "chủng tộc hệ",
    searchPlaceholder: "Tìm kiếm danh mục tộc hệ...",
  },
  class: {
    emptyMessage: "Không tìm thấy hệ nào phù hợp.",
    idLabel: "HỆ",
    addButton: "Thêm Hệ mới",
    addTitle: "Khởi tạo Hệ tướng",
    addDesc: "Cài đặt biểu tượng và hiệu ứng mốc kích hoạt cho nghề nghiệp mới.",
    nameLabel: "Tên Hệ",
    namePlaceholder: "Ví dụ: Chiến Binh",
    defaultIcon: "⚔️",
    defaultDesc: "Hiệu ứng hỗ trợ chỉ số mốc kích hoạt.",
    defaultMilestones: [
      { count: 3, effect: "Kích hoạt hiệu ứng nhẹ." },
      { count: 6, effect: "Kích hoạt hiệu ứng tối đa." },
    ],
    detailBadge: "SYNERGY NGHỀ NGHIỆP",
    editTitle: "Sửa Hệ tướng",
    editDesc: "Cập nhật biểu tượng và mô tả thuộc tính của hệ.",
    deleteTitle: "Xác nhận xóa hệ tướng",
    deleteConfirm: "Xóa hệ",
    paginationUnit: "hệ tướng",
    searchPlaceholder: "Tìm kiếm danh mục hệ tướng...",
  },
} as const

function countHeroesForTrait(row: TraitRecord, heroes: Hero[], kind: TraitKind): number {
  if (kind === "race") {
    return heroes.filter((h) => h.race.includes(row.name)).length
  }
  return heroes.filter((h) => h.class.includes(row.name)).length
}

export function AdminTraitPanel({ kind }: AdminTraitPanelProps) {
  const config = PANEL_CONFIG[kind]
  const store = useAppStore()
  const items: TraitRecord[] = kind === "race" ? store.races : store.classes
  const addItem = kind === "race" ? store.addRace : store.addClass
  const updateItem = kind === "race" ? store.updateRace : store.updateClass
  const deleteItem = kind === "race" ? store.deleteRace : store.deleteClass
  const { heroes } = store

  const [searchTerm, setSearchTerm] = React.useState("")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [newIcon, setNewIcon] = React.useState<string>(config.defaultIcon)
  const [newName, setNewName] = React.useState("")
  const [newDesc, setNewDesc] = React.useState("")
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<TraitRecord | null>(null)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailItem, setDetailItem] = React.useState<TraitRecord | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [itemToDelete, setItemToDelete] = React.useState<TraitRecord | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, kind])

  const totalPages = Math.ceil(filteredItems.length / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginatedItems = filteredItems.slice(startIndex, startIndex + pageSize)

  const handleCreate = () => {
    if (!newName.trim()) return
    const id = newName.toLowerCase().replace(/\s+/g, "-")
    addItem({
      id,
      name: newName,
      icon: newIcon,
      description: newDesc || config.defaultDesc,
      milestones: [...config.defaultMilestones],
    })
    setNewName("")
    setNewIcon(config.defaultIcon)
    setNewDesc("")
    setIsAddOpen(false)
  }

  const handleUpdate = () => {
    if (!editingItem || !editingItem.name.trim()) return
    updateItem(editingItem.id, editingItem)
    setEditingItem(null)
    setIsEditOpen(false)
  }

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id)
      setIsDeleteOpen(false)
      setItemToDelete(null)
    }
  }

  return (
    <>
      <div className="flex flex-col flex-1 min-h-0 gap-4">
        <div className="flex justify-end shrink-0">
          <Button
            size="default"
            onClick={() => setIsAddOpen(true)}
            className="gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
          >
            <Plus className="h-4.5 w-4.5 stroke-[3px]" /> {config.addButton}
          </Button>
        </div>

        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder={config.searchPlaceholder}
            />
          }
          footer={
            <AdminTableFooterText
              start={filteredItems.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredItems.length)}
              total={filteredItems.length}
              label={config.paginationUnit}
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedItems.length === 0}
          emptyTitle={config.emptyMessage}
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh className="w-24 text-center">BIỂU TƯỢNG</AdminTh>
                <AdminTh>Tên</AdminTh>
                <AdminTh>Mô tả</AdminTh>
                <AdminTh className="text-center w-36">Tổng tướng</AdminTh>
                <AdminTh className="text-center w-40">Mốc kích hoạt</AdminTh>
                <AdminTh className="text-right w-44">Thao tác</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedItems.map((row) => {
                const heroCount = countHeroesForTrait(row, heroes, kind)
                return (
                  <AdminTr key={row.id} className="group">
                    <AdminTd className="text-center">
                      <div className="mx-auto">
                        <TraitIcon
                          id={row.id}
                          iconUrl={row.iconUrl}
                          icon={row.icon}
                          name={row.name}
                          size="md"
                          className="group-hover:scale-110 transition-transform"
                        />
                      </div>
                    </AdminTd>
                    <AdminTd>
                      <div className="flex flex-col">
                        <span className="font-bold text-brand-text-main admin-body group-hover:text-brand-gold transition-colors leading-snug tracking-tight">
                          {row.name}
                        </span>
                        <span className="admin-meta text-brand-text-sub font-mono mt-0.5 tracking-wider uppercase">
                          {config.idLabel}: {row.id}
                        </span>
                      </div>
                    </AdminTd>
                    <AdminTd className="text-brand-text-sub admin-body leading-relaxed max-w-[280px] truncate">
                      {row.description}
                    </AdminTd>
                    <AdminTd className="text-center">
                      <div className="inline-flex items-center gap-1 px-3 py-1 bg-brand-card-2 rounded-md text-brand-text-main font-bold admin-meta border border-brand-border font-mono">
                        <Zap className="h-3 w-3 text-brand-gold" />
                        {heroCount} nhân sĩ
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <div className="flex justify-center gap-1.5">
                        {row.milestones?.map((m, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="h-7 w-7 p-0 flex items-center justify-center rounded-lg border-brand-gold/20 text-brand-gold font-bold admin-meta bg-brand-gold/5"
                          >
                            {m.count}
                          </Badge>
                        ))}
                      </div>
                    </AdminTd>
                    <AdminTd className="text-right">
                      <div className="flex justify-end gap-1.5">
                        <Button
                          onClick={() => {
                            setDetailItem(row)
                            setIsDetailOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-all border border-transparent hover:border-brand-border"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingItem({ ...row })
                            setIsEditOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-all border border-transparent hover:border-brand-border"
                          title="Sửa"
                        >
                          <Edit2 className="h-4 w-4 text-tier-b" />
                        </Button>
                        <Button
                          onClick={() => {
                            setItemToDelete(row)
                            setIsDeleteOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-red transition-all border border-transparent hover:border-brand-border"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4 text-brand-red/70 hover:text-brand-red" />
                        </Button>
                      </div>
                    </AdminTd>
                  </AdminTr>
                )
              })}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </div>

      <AdminFormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title={config.addTitle}
        description={config.addDesc}
        size="md"
        onSubmit={handleCreate}
        submitLabel="Lưu dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        <AdminFormGrid columns={1}>
          <div className="grid grid-cols-4 gap-4">
            <AdminField label="Biểu tượng" className="col-span-1">
              <Input
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder={config.defaultIcon}
                className="text-center text-xl bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
              />
            </AdminField>
            <AdminField label={config.nameLabel} className="col-span-3">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={config.namePlaceholder}
                className="bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
              />
            </AdminField>
          </div>
          <AdminField label="Hiệu ứng kích hoạt">
            <textarea
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50 transition-all"
              placeholder="Mô tả hiệu ứng mốc kích hoạt..."
            />
          </AdminField>
        </AdminFormGrid>
      </AdminFormDialog>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) setEditingItem(null)
        }}
        title={config.editTitle}
        description={config.editDesc}
        size="md"
        onSubmit={handleUpdate}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        {editingItem && (
          <AdminFormGrid columns={1}>
            <div className="grid grid-cols-4 gap-4">
              <AdminField label="Biểu tượng" className="col-span-1">
                <Input
                  value={editingItem.icon}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  className="text-center text-xl bg-brand-card border-brand-border rounded-xl h-11 text-brand-text-main"
                />
              </AdminField>
              <AdminField label={config.nameLabel} className="col-span-3">
                <Input
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="bg-brand-card border-brand-border rounded-xl h-11"
                />
              </AdminField>
            </div>
            <AdminField label="Mô tả">
              <textarea
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full h-24 bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
              />
            </AdminField>
            <AdminField label="Logo URL (iconUrl)">
              <Input
                value={editingItem.iconUrl ?? ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, iconUrl: e.target.value || undefined })
                }
                placeholder="/traits/example.png"
                className="bg-brand-card border-brand-border rounded-xl h-11 font-mono text-sm"
              />
            </AdminField>
          </AdminFormGrid>
        )}
      </AdminFormDialog>

      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title={detailItem?.name ?? "Chi tiết"}
        size="md"
        footer={
          <Button
            onClick={() => setIsDetailOpen(false)}
            className="w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
          >
            Đóng
          </Button>
        }
      >
        {detailItem && (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
              <TraitIcon
                id={detailItem.id}
                iconUrl={detailItem.iconUrl}
                icon={detailItem.icon}
                name={detailItem.name}
                size="lg"
              />
              <Badge variant="warning-solid">{config.detailBadge}</Badge>
            </div>

            <div className="space-y-1.5">
              <span className="admin-form-label">Mô tả</span>
              <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
                {detailItem.description}
              </div>
            </div>

            {detailItem.milestones && detailItem.milestones.length > 0 && (
              <div className="space-y-3">
                <span className="admin-form-label">Mốc kích hoạt</span>
                <div className="space-y-2">
                  {detailItem.milestones.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-brand-card border border-brand-border p-2.5 rounded-lg"
                    >
                      <span className="h-6 w-6 font-mono font-bold text-xs text-brand-gold bg-brand-gold/10 border border-brand-gold/20 rounded-md flex items-center justify-center">
                        {m.count}
                      </span>
                      <span className="text-brand-text-sub admin-body font-medium leading-none">
                        {m.effect}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open)
          if (!open) setItemToDelete(null)
        }}
        title={config.deleteTitle}
        description={
          itemToDelete
            ? `Bạn có chắc muốn xóa vĩnh viễn "${itemToDelete.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDelete}
        confirmLabel={config.deleteConfirm}
      />
    </>
  )
}
