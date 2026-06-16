import * as React from "react"
import { Button, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { Plus, Share2 } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { CommunityChannel } from "@/types/domain"
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
  CHANNEL_PLATFORMS,
  EMPTY_CHANNEL_FORM,
  channelFormFromRecord,
  channelFromFormValue,
  channelPatchFromFormValue,
} from "@/components/admin/AdminChannelForm"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminChannelForm = React.lazy(() =>
  import("@/components/admin/AdminChannelForm").then((m) => ({ default: m.AdminChannelForm }))
)

function ChannelFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu kênh...</div>
  )
}

export function AdminChannelsPage() {
  const { communityChannels, addCommunityChannel, updateCommunityChannel, deleteCommunityChannel } =
    useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedPlatform, setSelectedPlatform] = React.useState("Tất cả nền tảng")
  const [newForm, setNewForm] = React.useState(EMPTY_CHANNEL_FORM)
  const [editForm, setEditForm] = React.useState(EMPTY_CHANNEL_FORM)
  const [detail, setDetail] = React.useState<CommunityChannel | null>(null)

  const matchChannel = React.useCallback(
    (c: CommunityChannel, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        (c.highlight ?? "").toLowerCase().includes(query)
      const matchesPlatform = selectedPlatform === "Tất cả nền tảng" || c.platform === selectedPlatform
      return matchesSearch && matchesPlatform
    },
    [selectedPlatform]
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
    items: communityChannels,
    searchTerm,
    match: matchChannel,
    resetDeps: [selectedPlatform],
  })

  const handleCreate = () => {
    if (!newForm.name.trim() || !newForm.url.trim()) return
    const created = channelFromFormValue(newForm, nextNumericId(communityChannels))
    addCommunityChannel(created)
    setNewForm(EMPTY_CHANNEL_FORM)
    dialogs.closeAdd()
    showSuccess(`Đã thêm kênh ${created.name}.`)
  }

  const handleUpdate = () => {
    if (!dialogs.editingItem || !editForm.name.trim()) return
    updateCommunityChannel(dialogs.editingItem.id, channelPatchFromFormValue(editForm))
    dialogs.closeEdit()
    showSuccess(`Đã cập nhật ${editForm.name.trim()}.`)
  }

  const handleDelete = () => {
    if (!dialogs.deleteTarget) return
    deleteCommunityChannel(dialogs.deleteTarget.id)
    dialogs.closeDelete()
    showSuccess(`Đã xóa ${dialogs.deleteTarget.name}.`)
  }

  const openEdit = (channel: CommunityChannel) => {
    setEditForm(channelFormFromRecord(channel))
    dialogs.openEdit(channel)
  }

  return (
    <>
      <AdminListShell
        header={
          <>
            <AdminPageHeader
              icon={Share2}
              title="Kênh cộng đồng"
              description="Quản lý YouTube, TikTok, Facebook, Discord và các kênh liên quan trên trang Cộng đồng."
            >
              <Button
                onClick={() => {
                  setNewForm(EMPTY_CHANNEL_FORM)
                  dialogs.openAdd()
                }}
                className="gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl"
              >
                <Plus className="h-4 w-4" /> Thêm kênh
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
              searchPlaceholder="Tìm theo tên, mô tả..."
            >
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="min-w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả nền tảng">Mọi nền tảng</SelectItem>
                  {CHANNEL_PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredItems.length ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredItems.length)}
              total={filteredItems.length}
              label="kênh"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedItems.length === 0}
          emptyTitle="Chưa có kênh nào."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh>Kênh</AdminTh>
                <AdminTh>Nền tảng</AdminTh>
                <AdminTh>Highlight</AdminTh>
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
                    <div className="text-[11px] text-brand-text-sub line-clamp-1 max-w-xs">{row.description}</div>
                  </AdminTd>
                  <AdminTd className="uppercase text-[11px]">{row.platform}</AdminTd>
                  <AdminTd>{row.highlight || "—"}</AdminTd>
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
        title="Thêm kênh"
        onSubmit={handleCreate}
        submitLabel="Thêm"
      >
        <React.Suspense fallback={<ChannelFormFallback />}>
          <AdminChannelForm value={newForm} onChange={setNewForm} />
        </React.Suspense>
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.closeEdit()
        }}
        title="Sửa kênh"
        onSubmit={handleUpdate}
        submitLabel="Cập nhật"
      >
        <React.Suspense fallback={<ChannelFormFallback />}>
          <AdminChannelForm value={editForm} onChange={setEditForm} />
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
              <strong>Nền tảng:</strong> {detail.platform}
            </p>
            <p>
              <strong>URL:</strong> {detail.url}
            </p>
            {detail.highlight && (
              <p>
                <strong>Highlight:</strong> {detail.highlight}
              </p>
            )}
            <p>
              <strong>Mô tả:</strong> {detail.description}
            </p>
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.closeDelete()
        }}
        title="Xóa kênh"
        description={dialogs.deleteTarget ? `Xóa "${dialogs.deleteTarget.name}"?` : ""}
        onConfirm={handleDelete}
        confirmLabel="Xóa"
      />
    </>
  )
}
