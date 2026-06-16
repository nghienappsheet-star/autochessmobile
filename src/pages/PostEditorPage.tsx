import * as React from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import {
  Card,
  Button,
  Input,
  Badge,
  Separator,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import {
  ArrowLeft,
  Save,
  Send,
  Image as ImageIcon,
  Type,
  List,
  Bold,
  FileText,
  Shield,
  Eye,
} from "lucide-react"
import { motion } from "motion/react"
import { useAppStore, type Post, type PostStatus } from "@/contexts/DataContext"
import { useAuth } from "@/contexts/AuthContext"
import { ArticleProse } from "@/components/ArticleProse"
import { PageContainer } from "@/components/layout/PageContainer"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import { isPersistableImageUrl } from "@/lib/media-url"
import { nextNumericId } from "@/lib/admin-utils"

const CATEGORIES = ["Tin tức", "Chiến thuật", "Hướng dẫn", "Mẹo chơi", "Thảo luận", "Review"]

type EditorTab = "write" | "preview"

export function PostEditorPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")
  const { user } = useAuth()
  const { posts, addPost, updatePost, media } = useAppStore()

  const existing = id ? posts.find((p) => p.id === id) : undefined

  const [title, setTitle] = React.useState(existing?.title ?? "")
  const [content, setContent] = React.useState(existing?.content ?? "")
  const [excerpt, setExcerpt] = React.useState(existing?.excerpt ?? "")
  const [category, setCategory] = React.useState(existing?.category ?? "Tin tức")
  const [coverImageUrl, setCoverImageUrl] = React.useState(existing?.coverImageUrl ?? "")
  const [status, setStatus] = React.useState<PostStatus>(existing?.status ?? "Bản nháp")
  const [tab, setTab] = React.useState<EditorTab>("write")
  const [isMediaOpen, setIsMediaOpen] = React.useState(false)
  const [coverError, setCoverError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (existing) {
      setTitle(existing.title)
      setContent(existing.content ?? "")
      setExcerpt(existing.excerpt ?? "")
      setCategory(existing.category)
      setCoverImageUrl(existing.coverImageUrl ?? "")
      setStatus(existing.status)
    }
  }, [existing])

  const backPath = isAdminRoute ? "/admin/bai-viet" : -1
  const breadcrumb = existing ? "Bài viết / Sửa" : "Bài viết / Thêm mới"

  const buildPost = (publishStatus: PostStatus): Post | null => {
    const cover = coverImageUrl.trim()
    if (cover && !isPersistableImageUrl(cover)) {
      setCoverError("Ảnh cover phải là URL HTTPS hoặc đường dẫn tĩnh — không dùng base64.")
      return null
    }
    setCoverError(null)
    const postId =
      existing?.id ??
      nextNumericId(posts)

    return {
      id: postId,
      title: title.trim(),
      author: existing?.author ?? (isAdminRoute ? "Admin" : user?.name ?? "Khách"),
      category,
      views: existing?.views ?? "0",
      status: publishStatus,
      date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
      image: existing?.image ?? "bg-brand-card",
      excerpt: excerpt.trim() || title.trim(),
      content,
      coverImageUrl: coverImageUrl.trim() || undefined,
    }
  }

  const saveDraft = () => {
    if (!title.trim()) return
    const post = buildPost("Bản nháp")
    if (!post) return
    if (existing) updatePost(existing.id, post)
    else addPost(post)
    navigate(isAdminRoute ? "/admin/bai-viet" : "/tin-tuc")
  }

  const publish = () => {
    if (!title.trim()) return
    const post = buildPost("Xuất bản")
    if (!post) return
    if (existing) updatePost(existing.id, post)
    else addPost(post)
    navigate(isAdminRoute ? "/admin/bai-viet" : `/tin-tuc/${post.id}`)
  }

  const editorBody = (
    <>
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isAdminRoute ? "" : ""}`}>
        {!isAdminRoute && (
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Trở lại trang trước
          </Button>
        )}
        <div className={`flex flex-wrap items-center gap-2 sm:gap-3 w-full ${isAdminRoute ? "sm:ml-auto sm:justify-end" : "sm:w-auto"}`}>
          {isAdminRoute && (
            <Button
              variant="ghost"
              onClick={() => navigate(backPath as string)}
              className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Quay lại
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={saveDraft}
            className="text-brand-text-sub hover:text-brand-text-main text-[12px] font-semibold h-11 px-5 rounded-xl flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" /> Lưu bản nháp
          </Button>
          <Button
            onClick={publish}
            className="bg-gold-gradient hover-gold-gradient text-black text-[14px] font-bold h-11 px-8 rounded-xl flex-1 sm:flex-none"
          >
            <Send className="w-4 h-4 mr-2" /> Xuất bản
          </Button>
        </div>
      </div>

      {isAdminRoute && (
        <AdminPageHeader
          title={existing ? "Sửa bài viết" : "Thêm bài viết mới"}
          description="Markdown, ảnh cover và trạng thái xuất bản — đồng bộ với trang Tin tức."
          breadcrumb={breadcrumb}
        />
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl">
          <div className="p-6 md:p-10 space-y-8">
            {!isAdminRoute && (
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center">
                  <FileText className="h-7 w-7 text-black stroke-[2.5px]" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-[24px] font-bold text-brand-text-main tracking-tight leading-none">
                    {existing ? "Sửa bài viết" : "Biên tập nội dung"}
                  </h1>
                  <p className="text-[14px] text-brand-text-sub font-normal">
                    Markdown, ảnh cover và trạng thái xuất bản — đồng bộ với trang Tin tức.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                Tiêu đề bài viết
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nhập tiêu đề thu hút người xem..."
                className="bg-brand-card-2 border-brand-border h-14 text-xl font-bold rounded-xl focus-visible:ring-brand-gold/20"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                Tóm tắt (excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Mô tả ngắn hiển thị trên thẻ bài viết..."
                className="w-full bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main resize-none h-24 focus:outline-none focus:border-brand-gold/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  Phân loại
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border ${
                        category === cat
                          ? "bg-gold-gradient text-black border-transparent"
                          : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:bg-brand-card"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  Trạng thái
                </label>
                <Select value={status} onValueChange={(v) => setStatus(v as PostStatus)}>
                  <SelectTrigger className="bg-brand-card-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Xuất bản">Xuất bản</SelectItem>
                    <SelectItem value="Bản nháp">Bản nháp</SelectItem>
                    <SelectItem value="Chờ duyệt">Chờ duyệt</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="admin-form-label flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" /> Ảnh cover
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={coverImageUrl}
                  onChange={(e) => {
                    const next = e.target.value
                    const lower = next.trim().toLowerCase()
                    if (lower.startsWith("data:") || lower.startsWith("blob:")) {
                      setCoverError("Không dùng URL base64 hoặc blob cho ảnh cover.")
                      return
                    }
                    setCoverError(null)
                    setCoverImageUrl(next)
                  }}
                  placeholder="https://..."
                  className="bg-brand-card-2 border-brand-border h-11 rounded-xl flex-1"
                />
                <CloudinaryFileUpload
                  onUploaded={(urls) => {
                    if (urls[0]) {
                      setCoverImageUrl(urls[0])
                      setCoverError(null)
                    }
                  }}
                  onError={(message) => setCoverError(message)}
                  label="Tải ảnh"
                  uploadingLabel="Đang tải..."
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsMediaOpen(true)}
                  className="h-11 rounded-xl border-brand-border shrink-0"
                >
                  <ImageIcon className="w-4 h-4 mr-2" /> Chọn ảnh
                </Button>
              </div>
              {coverError && <p className="text-[12px] text-brand-red font-medium">{coverError}</p>}
            </div>

            <Dialog open={isMediaOpen} onOpenChange={setIsMediaOpen}>
              <DialogContent className="max-w-lg bg-brand-card border-brand-border rounded-xl">
                <DialogHeader>
                  <DialogTitle className="admin-dialog-title">Chọn ảnh từ thư viện</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto custom-scrollbar py-2">
                  {media.length === 0 ? (
                    <p className="col-span-full text-[13px] text-brand-text-sub py-6 text-center">
                      Chưa có media. Thêm tại mục Media trong admin.
                    </p>
                  ) : (
                    media.map((asset) => (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => {
                          setCoverImageUrl(asset.url)
                          setIsMediaOpen(false)
                        }}
                        className="group rounded-xl border border-brand-border overflow-hidden bg-brand-card-2 hover:border-brand-gold/40 transition-all text-left"
                      >
                        <div className="aspect-video bg-brand-card flex items-center justify-center overflow-hidden">
                          <img
                            src={asset.url}
                            alt={asset.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <p className="text-[10px] text-brand-text-sub p-2 truncate">{asset.name}</p>
                      </button>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4">
                <label className="admin-form-label">
                  Nội dung (Markdown)
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={tab === "write" ? "default" : "ghost"}
                    onClick={() => setTab("write")}
                    className="rounded-lg h-8 text-[11px] font-semibold"
                  >
                    Viết
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={tab === "preview" ? "default" : "ghost"}
                    onClick={() => setTab("preview")}
                    className="rounded-lg h-8 text-[11px] font-semibold"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Xem trước
                  </Button>
                </div>
              </div>

              {tab === "write" ? (
                <>
                  <div className="flex items-center gap-1.5 p-3 bg-brand-card-2 border border-brand-border border-b-0 rounded-t-xl overflow-x-auto">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-brand-text-sub" type="button">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-5 bg-brand-border mx-1" />
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-brand-text-sub" type="button">
                      <Type className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-brand-text-sub" type="button">
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Viết nội dung bài viết ở đây (hỗ trợ Markdown)..."
                    className="w-full bg-brand-card-2 border border-brand-border rounded-b-xl p-6 text-[15px] text-brand-text-main resize-none h-[420px] focus:outline-none focus:border-brand-gold/30 leading-relaxed"
                  />
                </>
              ) : (
                <div className="border border-brand-border rounded-xl p-6 md:p-8 bg-brand-card-2 min-h-[420px]">
                  {content.trim() ? (
                    <ArticleProse content={content} />
                  ) : (
                    <p className="text-brand-text-sub text-sm">Chưa có nội dung để xem trước.</p>
                  )}
                </div>
              )}
            </div>

            <Card className="bg-brand-card-2 border-brand-border p-6 rounded-xl relative overflow-hidden">
              <h4 className="text-brand-gold font-bold text-[13px] mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4" /> Tiêu chuẩn nội dung
              </h4>
              <ul className="text-[13px] text-brand-text-sub space-y-2">
                <li>Nội dung chính xác, có giá trị cho cộng đồng Auto Chess VN.</li>
                <li>Không ngôn từ thô tục hoặc công kích cá nhân.</li>
                <li>Ảnh cover rõ nét, phù hợp chủ đề game.</li>
              </ul>
            </Card>
          </div>
        </Card>
      </motion.div>
    </>
  )

  if (isAdminRoute) {
    return <div className="space-y-8 pb-8">{editorBody}</div>
  }

  return (
    <PageContainer width="reading" className="space-y-8 pb-32 pt-4">
      {editorBody}
    </PageContainer>
  )
}
