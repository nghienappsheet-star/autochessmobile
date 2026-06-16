import * as React from "react"
import { Button, Badge } from "@/components/ui/core"
import { Plus, Zap } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import {
  AdminDeleteDialog,
  AdminSuccessBanner,
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
  AdminRowActions,
  type TraitRecord,
} from "@/components/admin"
import {
  traitFormFromRecord,
  traitFromFormValue,
  type TraitFormValue,
} from "@/components/admin/AdminTraitForm.helpers"
import type { Hero } from "@/types/domain"
import type { TraitKind } from "@/lib/traits"
import { TraitIcon } from "@/components/traits/TraitIcon"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminTraitForm = React.lazy(() =>
  import("@/components/admin/AdminTraitForm").then((m) => ({ default: m.AdminTraitForm }))
)

function TraitFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu tộc/hệ...</div>
  )
}

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

function emptyTraitForm(defaultIcon: string): TraitFormValue {
  return { icon: defaultIcon, name: "", description: "" }
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
  const [newTraitForm, setNewTraitForm] = React.useState(() => emptyTraitForm(config.defaultIcon))
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailItem, setDetailItem] = React.useState<TraitRecord | null>(null)

  const matchTrait = React.useCallback(
    (item: TraitRecord, q: string) => item.name.toLowerCase().includes(q.toLowerCase()),
    []
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
  } = useAdminListPage({
    items,
    searchTerm,
    match: matchTrait,
    resetDeps: [kind],
  })

  const openAddDialog = () => {
    setNewTraitForm(emptyTraitForm(config.defaultIcon))
    dialogs.openAdd()
  }

  const handleCreate = () => {
    if (!newTraitForm.name.trim()) return
    const id = newTraitForm.name.toLowerCase().replace(/\s+/g, "-")
    addItem(
      traitFromFormValue(newTraitForm, id, [...config.defaultMilestones], config.defaultDesc)
    )
    setNewTraitForm(emptyTraitForm(config.defaultIcon))
    showSuccess(`Đã thêm ${config.idLabel.toLowerCase()} "${newTraitForm.name.trim()}".`)
    dialogs.closeAdd()
  }

  const handleUpdate = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return
    updateItem(dialogs.editingItem.id, dialogs.editingItem)
    showSuccess(`Đã cập nhật "${dialogs.editingItem.name}".`)
    dialogs.closeEdit()
  }

  const confirmDelete = () => {
    if (dialogs.deleteTarget) {
      deleteItem(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa "${dialogs.deleteTarget.name}".`)
      dialogs.closeDelete()
    }
  }

  return (
    <>
      <AdminSuccessBanner message={successMessage ?? ""} />

      <div className="flex flex-col flex-1 min-h-0 gap-4">
        <div className="flex justify-end shrink-0">
          <Button
            size="default"
            onClick={openAddDialog}
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
              end={Math.min(startIndex + 10, filteredItems.length)}
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
      </div>

      <AdminFormDialog
        open={dialogs.isAddOpen}
        onOpenChange={dialogs.setIsAddOpen}
        title={config.addTitle}
        description={config.addDesc}
        size="md"
        onSubmit={handleCreate}
        submitLabel="Lưu dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        <React.Suspense fallback={<TraitFormFallback />}>
          <AdminTraitForm
            value={newTraitForm}
            onChange={setNewTraitForm}
            nameLabel={config.nameLabel}
            namePlaceholder={config.namePlaceholder}
            defaultIcon={config.defaultIcon}
          />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title={config.editTitle}
        description={config.editDesc}
        size="md"
        onSubmit={handleUpdate}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<TraitFormFallback />}>
            <AdminTraitForm
              showIconUrl
              value={traitFormFromRecord(dialogs.editingItem)}
              onChange={(value) =>
                dialogs.setEditingItem(
                  traitFromFormValue(value, dialogs.editingItem!.id, dialogs.editingItem!.milestones)
                )
              }
              nameLabel={config.nameLabel}
              namePlaceholder={config.namePlaceholder}
              defaultIcon={config.defaultIcon}
            />
          </React.Suspense>
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
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title={config.deleteTitle}
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc muốn xóa vĩnh viễn "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDelete}
        confirmLabel={config.deleteConfirm}
      />
    </>
  )
}
