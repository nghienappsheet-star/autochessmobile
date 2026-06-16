import * as React from "react"
import { Card, Button } from "@/components/ui/core"
import { ImageIcon, Copy, Check, Trash2, Plus, CloudLightning } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { MediaAsset } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminTableActionButton,
} from "@/components/admin"
import {
  EMPTY_MEDIA_FORM,
  mediaFormFromAsset,
  mediaFromFormValue,
} from "@/components/admin/AdminMediaForm"
import { isPersistableImageUrl } from "@/lib/media-url"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"
import { cn } from "@/lib/utils"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminMediaForm = React.lazy(() =>
  import("@/components/admin/AdminMediaForm").then((m) => ({ default: m.AdminMediaForm }))
)

function MediaFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu media...</div>
  )
}

const MEDIA_CATEGORIES = ["Tất cả", "Tướng", "Trang bị", "Banners", "Khác"]

export function AdminMediaPage() {
  const { media, addMedia, updateMedia, deleteMedia } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)
  const [newMediaForm, setNewMediaForm] = React.useState(EMPTY_MEDIA_FORM)
  const [urlError, setUrlError] = React.useState<string | null>(null)

  const matchMedia = React.useCallback(
    (m: MediaAsset, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch = m.name.toLowerCase().includes(query)
      const matchesCat = selectedCategory === "Tất cả" || m.category === selectedCategory
      return matchesSearch && matchesCat
    },
    [selectedCategory]
  )

  const { dialogs, successMessage, showSuccess, filteredItems: filteredMedia } = useAdminListPage({
    items: media,
    searchTerm,
    match: matchMedia,
    resetDeps: [selectedCategory],
  })

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    showSuccess("Đã sao chép đường dẫn hình ảnh đại diện vào bộ nhớ tạm!")
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleCreateMedia = () => {
    if (!newMediaForm.title.trim() || !newMediaForm.url.trim()) return
    if (!isPersistableImageUrl(newMediaForm.url)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.")
      return
    }
    setUrlError(null)
    const id = nextNumericId(media)
    const created = mediaFromFormValue(newMediaForm, id, "create")
    addMedia(created)
    setNewMediaForm(EMPTY_MEDIA_FORM)
    showSuccess(`Đã tải lên tệp tin đồ họa ${created.alt}!`)
  }

  const handleUpdateMedia = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim() || !dialogs.editingItem.url.trim()) return
    if (!isPersistableImageUrl(dialogs.editingItem.url)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.")
      return
    }
    setUrlError(null)
    updateMedia(dialogs.editingItem.id, dialogs.editingItem)
    dialogs.closeEdit()
    showSuccess("Đã cập nhật thông tin media!")
  }

  const handleDeleteMedia = () => {
    if (!dialogs.deleteTarget) return
    deleteMedia(dialogs.deleteTarget.id)
    dialogs.closeDelete()
    showSuccess("Đã xóa tệp đồ họa khỏi thư viện.")
  }

  return (
    <div className="space-y-8 pb-8 font-sans">
      <AdminPageHeader
        icon={ImageIcon}
        title="Thư viện tệp tin Media"
        description="Tải lên, sao chép URL trực tiếp và quản lý toàn bộ hình ảnh dùng cho hệ thống giải đấu, trang bị và tướng."
      />

      <AdminSuccessBanner message={successMessage ?? ""} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden">
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Tìm tên tệp ảnh..."
              className="border-b border-brand-border"
            >
              <div className="flex gap-1 overflow-x-auto w-full sm:w-auto shrink-0 custom-scrollbar pb-1 sm:pb-0">
                {MEDIA_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase transition-all tracking-wide border shrink-0",
                      selectedCategory === cat
                        ? "bg-gold-gradient text-black border-brand-gold shadow-sm"
                        : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:text-brand-text-main hover:bg-brand-card"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </AdminToolbar>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-gold/20 transition-all flex flex-col justify-between"
                >
                  <div className="h-32 bg-brand-bg flex items-center justify-center p-4 relative overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 z-20">
                      <Button
                        onClick={() => handleCopyLink(item.id, item.url)}
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 grid place-items-center bg-brand-card text-brand-text-main hover:bg-brand-card-2 border border-brand-border"
                        title="Sao chép liên kết"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-4 w-4 text-brand-green animate-bounce" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <AdminTableActionButton
                        variant="edit"
                        onClick={() => dialogs.openEdit({ ...item })}
                        label="Chỉnh sửa"
                      />
                      <Button
                        onClick={() => dialogs.openDelete(item)}
                        variant="danger"
                        size="sm"
                        className="h-8 w-8 p-0 grid place-items-center bg-brand-red/80 hover:bg-brand-red text-white border-transparent"
                        title="Xóa tệp"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-3 border-t border-brand-border space-y-1 bg-brand-card-2/30">
                    <h3 className="admin-meta font-bold text-brand-text-main truncate" title={item.name}>
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between admin-meta font-mono">
                      <span>{item.category}</span>
                      <span>{item.size}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5">
            <h3 className="admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3">
              <CloudLightning className="h-4 w-4 text-brand-gold" /> Tải lên tài nguyên
            </h3>
            <React.Suspense fallback={<MediaFormFallback />}>
              <AdminMediaForm
                mode="create"
                value={newMediaForm}
                onChange={setNewMediaForm}
                urlError={urlError}
                onUrlError={setUrlError}
              />
            </React.Suspense>
            <Button
              onClick={handleCreateMedia}
              className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
            >
              Nhập tài nguyên mới
            </Button>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title="Chỉnh sửa media"
        description="Cập nhật tên, alt text, URL và phân loại tệp."
        size="md"
        onSubmit={handleUpdateMedia}
        submitLabel="Lưu thay đổi"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<MediaFormFallback />}>
            <AdminMediaForm
              mode="edit"
              value={mediaFormFromAsset(dialogs.editingItem)}
              onChange={(value) =>
                dialogs.setEditingItem(
                  mediaFromFormValue(value, dialogs.editingItem!.id, "edit", dialogs.editingItem!)
                )
              }
              urlError={urlError}
              onUrlError={setUrlError}
            />
          </React.Suspense>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xóa tệp media"
        description={
          dialogs.deleteTarget
            ? `Chắc chắn muốn xóa tệp "${dialogs.deleteTarget.name}"? Liên kết bài viết dùng hình ảnh này có thể bị lỗi.`
            : ""
        }
        onConfirm={handleDeleteMedia}
        confirmLabel="Xóa tệp"
      />
    </div>
  )
}
