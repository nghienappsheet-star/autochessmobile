import * as React from "react"
import {
  Card,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { ImageIcon, Copy, Check, Trash2, Plus, Edit2, CloudLightning } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { MediaAsset } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminField,
} from "@/components/admin"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import { isPersistableImageUrl } from "@/lib/media-url"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"
import { cn } from "@/lib/utils"

const MEDIA_CATEGORIES = ["Tất cả", "Tướng", "Trang bị", "Banners", "Khác"]

export function AdminMediaPage() {
  const { media, addMedia, updateMedia, deleteMedia } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả")
  const [successMsg, setSuccessMsg] = React.useState("")
  const [copiedId, setCopiedId] = React.useState<string | null>(null)

  const [newTitle, setNewTitle] = React.useState("")
  const [newAlt, setNewAlt] = React.useState("")
  const [newUrl, setNewUrl] = React.useState("")
  const [newCategory, setNewCategory] = React.useState("Trang bị")
  const [urlError, setUrlError] = React.useState<string | null>(null)

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingMedia, setEditingMedia] = React.useState<MediaAsset | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<MediaAsset | null>(null)

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    showSuccess("Đã sao chép đường dẫn hình ảnh đại diện vào bộ nhớ tạm!")
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleCreateMedia = () => {
    if (!newTitle.trim() || !newUrl.trim()) return
    if (!isPersistableImageUrl(newUrl)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.")
      return
    }
    setUrlError(null)
    const id = nextNumericId(media)
    const name = newTitle.toLowerCase().replace(/\s+/g, "_") + (newUrl.endsWith(".png") ? "" : ".png")
    addMedia({
      id,
      name,
      alt: newAlt || newTitle,
      category: newCategory,
      size: "120 KB",
      url: newUrl,
      uploadedAt: new Date().toLocaleDateString("vi-VN"),
    })
    setNewTitle("")
    setNewAlt("")
    setNewUrl("")
    showSuccess(`Đã tải lên tệp tin đồ họa ${newTitle}!`)
  }

  const handleUpdateMedia = () => {
    if (!editingMedia || !editingMedia.name.trim() || !editingMedia.url.trim()) return
    if (!isPersistableImageUrl(editingMedia.url)) {
      setUrlError("URL ảnh phải là HTTPS, đường dẫn tĩnh (/...) hoặc tải lên qua Cloudinary.")
      return
    }
    setUrlError(null)
    updateMedia(editingMedia.id, editingMedia)
    setEditingMedia(null)
    setIsEditOpen(false)
    showSuccess("Đã cập nhật thông tin media!")
  }

  const handleDeleteMedia = () => {
    if (!deleteTarget) return
    deleteMedia(deleteTarget.id)
    setDeleteTarget(null)
    showSuccess("Đã xóa tệp đồ họa khỏi thư viện.")
  }

  const filteredMedia = media.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === "Tất cả" || m.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="space-y-8 pb-8 font-sans">
      <AdminPageHeader
        icon={ImageIcon}
        title="Thư viện tệp tin Media"
        description="Tải lên, sao chép URL trực tiếp và quản lý toàn bộ hình ảnh dùng cho hệ thống giải đấu, trang bị và tướng."
      />

      <AdminSuccessBanner message={successMsg} />

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
                      <Button
                        onClick={() => {
                          setEditingMedia({ ...item })
                          setIsEditOpen(true)
                        }}
                        variant="secondary"
                        size="sm"
                        className="h-8 w-8 p-0 grid place-items-center bg-brand-card text-brand-gold hover:bg-brand-card-2 border border-brand-border"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => setDeleteTarget(item)}
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
            <div className="space-y-4">
              <AdminField label="Tên định danh tệp">
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: sprite_queen_crown"
                />
              </AdminField>
              <AdminField label="Văn bản thay thế (Alt)">
                <Input
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Mô tả ngắn cho SEO"
                />
              </AdminField>
              <AdminField label="Đường dẫn tệp CDN/Ảnh (URL)">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Input
                      value={newUrl}
                      onChange={(e) => {
                        const next = e.target.value
                        const lower = next.trim().toLowerCase()
                        if (lower.startsWith("data:") || lower.startsWith("blob:")) {
                          setUrlError("Không lưu URL base64 hoặc blob.")
                          return
                        }
                        setUrlError(null)
                        setNewUrl(next)
                      }}
                      placeholder="https://..."
                      className="flex-1 min-w-[200px]"
                    />
                    <CloudinaryFileUpload
                      onUploaded={(urls) => {
                        if (urls[0]) {
                          setNewUrl(urls[0])
                          setUrlError(null)
                        }
                      }}
                      onError={(message) => setUrlError(message)}
                      label="Tải file"
                      uploadingLabel="Đang tải..."
                    />
                  </div>
                  {urlError && <p className="text-[12px] text-brand-red font-medium">{urlError}</p>}
                </div>
              </AdminField>
              <AdminField label="Phân nhóm Media">
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tướng">Tướng (Sprite)</SelectItem>
                    <SelectItem value="Trang bị">Trang bị (Combat Item)</SelectItem>
                    <SelectItem value="Banners">Ảnh Banners chính</SelectItem>
                    <SelectItem value="Khác">Ảnh khác/Avatar</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>

              <Button
                onClick={handleCreateMedia}
                className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
              >
                Nhập tài nguyên mới
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Chỉnh sửa media"
        description="Cập nhật tên, alt text, URL và phân loại tệp."
        size="md"
        onSubmit={handleUpdateMedia}
        submitLabel="Lưu thay đổi"
      >
        {editingMedia && (
          <div className="space-y-4">
            <AdminField label="Tên tệp">
              <Input
                value={editingMedia.name}
                onChange={(e) => setEditingMedia({ ...editingMedia, name: e.target.value })}
              />
            </AdminField>
            <AdminField label="Alt text">
              <Input
                value={editingMedia.alt}
                onChange={(e) => setEditingMedia({ ...editingMedia, alt: e.target.value })}
              />
            </AdminField>
            <AdminField label="URL">
              <Input
                value={editingMedia.url}
                onChange={(e) => setEditingMedia({ ...editingMedia, url: e.target.value })}
              />
            </AdminField>
            <AdminField label="Phân loại">
              <Select
                value={editingMedia.category}
                onValueChange={(category) => setEditingMedia({ ...editingMedia, category })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tướng">Tướng</SelectItem>
                  <SelectItem value="Trang bị">Trang bị</SelectItem>
                  <SelectItem value="Banners">Banners</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </AdminField>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa tệp media"
        description={
          deleteTarget
            ? `Chắc chắn muốn xóa tệp "${deleteTarget.name}"? Liên kết bài viết dùng hình ảnh này có thể bị lỗi.`
            : ""
        }
        onConfirm={handleDeleteMedia}
        confirmLabel="Xóa tệp"
      />
    </div>
  )
}
