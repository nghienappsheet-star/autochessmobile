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
import { Plus, FileText, Calendar, Eye } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { parseViews } from "@/lib/parse-metrics"
import type { Post } from "@/types/domain"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminStatCards,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableFooterText,
  AdminDetailDialog,
  AdminRowActions,
} from "@/components/admin"
import { useAdminListPage } from "@/hooks/useAdminListPage"

export function AdminPostsPage() {
  const { posts, deletePost } = useAppStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Tất cả danh mục")
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái")
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailPost, setDetailPost] = React.useState<Post | null>(null)

  const matchPost = React.useCallback(
    (post: Post, q: string) => {
      if (q && !post.title.toLowerCase().includes(q.toLowerCase())) return false
      if (selectedCategory !== "Tất cả danh mục" && post.category !== selectedCategory) return false
      if (selectedStatus !== "Tất cả trạng thái" && post.status !== selectedStatus) return false
      return true
    },
    [selectedCategory, selectedStatus]
  )

  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredPosts,
    paginatedItems: paginatedPosts,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
  } = useAdminListPage<Post>({
    items: posts,
    searchTerm,
    match: matchPost,
    resetDeps: [selectedCategory, selectedStatus],
  })

  const confirmDeletePost = () => {
    if (dialogs.deleteTarget) {
      deletePost(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa bài viết "${dialogs.deleteTarget.title}".`)
      dialogs.closeDelete()
    }
  }

  const totalPosts = posts.length
  const publishedCount = posts.filter((p) => p.status === "Xuất bản").length
  const draftCount = posts.filter((p) => p.status === "Bản nháp" || p.status === "Chờ duyệt").length
  const totalViewsAccum = posts.reduce((sum, p) => sum + parseViews(p.views), 0)

  return (
    <AdminListShell
      header={
        <>
          <AdminPageHeader
            icon={FileText}
            title="Quản lý bài viết"
            description="Hệ thống biên soạn cẩm nang dũng sỹ, cẩm nang tướng quân, chiến thuật xếp bài và tin điện quan trọng."
          >
            <Button
              size="default"
              onClick={() => navigate("/admin/bai-viet/them")}
              className="gap-2 bg-gold-gradient text-black font-bold text-[12px] h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Soạn bài mới
            </Button>
          </AdminPageHeader>
          <AdminSuccessBanner message={successMessage ?? ""} />
        </>
      }
      beforeList={
        <AdminStatCards
          stats={[
            { label: "Tổng bài viết", value: totalPosts },
            { label: "Đã xuất bản", value: publishedCount },
            { label: "Bản nháp / chờ duyệt", value: draftCount },
            { label: "Lượt xem (tích lũy)", value: totalViewsAccum.toLocaleString("vi-VN") },
          ]}
        />
      }
    >
      <AdminDataTable
        fillHeight
        isEmpty={filteredPosts.length === 0}
        emptyTitle="Không tìm thấy bài viết nào tương ứng."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        footer={
          <AdminTableFooterText
            start={filteredPosts.length > 0 ? startIndex + 1 : 0}
            end={Math.min(startIndex + 10, filteredPosts.length)}
            total={filteredPosts.length}
            label="bài viết"
          />
        }
        toolbar={
          <AdminToolbar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Tìm kiếm tiêu đề bản chỉ dẫn dũng sĩ..."
          >
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả danh mục">Mọi danh mục</SelectItem>
                <SelectItem value="Hướng dẫn">Hướng dẫn</SelectItem>
                <SelectItem value="Chiến thuật">Chiến thuật</SelectItem>
                <SelectItem value="Mẹo chơi">Mẹo chơi</SelectItem>
                <SelectItem value="Tin tức">Tin tức</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="min-w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả trạng thái">Mọi trạng thái</SelectItem>
                <SelectItem value="Xuất bản">Xuất bản</SelectItem>
                <SelectItem value="Bản nháp">Bản nháp</SelectItem>
                <SelectItem value="Chờ duyệt">Chờ duyệt</SelectItem>
              </SelectContent>
            </Select>
          </AdminToolbar>
        }
      >
        <AdminTable minWidth="1000px">
          <AdminThead>
            <AdminTr className="hover:bg-transparent border-0">
              <AdminTh className="w-16 text-center">STT</AdminTh>
              <AdminTh>Tiêu đề nội dung</AdminTh>
              <AdminTh>Người viết</AdminTh>
              <AdminTh>Danh mục</AdminTh>
              <AdminTh className="text-center">Lượt đọc</AdminTh>
              <AdminTh className="text-center">Trạng thái</AdminTh>
              <AdminTh className="text-right w-44">Thao tác dữ liệu</AdminTh>
            </AdminTr>
          </AdminThead>
          <tbody>
            {paginatedPosts.map((row, idx) => (
              <AdminTr key={row.id} className="group">
                <AdminTd className="text-center text-brand-text-sub font-mono text-[11px]">
                  {startIndex + idx + 1}
                </AdminTd>
                <AdminTd>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-card-2 flex items-center justify-center flex-shrink-0 border border-brand-border">
                      <FileText className="h-5 w-5 text-brand-text-sub group-hover:text-brand-gold transition-colors" />
                    </div>
                    <div className="flex flex-col min-w-0 max-w-[400px]">
                      <button
                        onClick={() => {
                          setDetailPost(row)
                          setIsDetailOpen(true)
                        }}
                        className="text-left font-bold text-brand-text-main text-[14.5px] hover:text-brand-gold transition-colors truncate mb-1 leading-snug tracking-tight"
                      >
                        {row.title}
                      </button>
                      <div className="flex items-center gap-3 text-[10px] text-brand-text-sub font-mono tracking-wider uppercase">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 opacity-60" /> {row.date}
                        </span>
                        <span className="w-1.5 h-1.5 bg-brand-border rounded-full"></span>
                        <span>POST_ID: {row.id}</span>
                      </div>
                    </div>
                  </div>
                </AdminTd>
                <AdminTd>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-gold/15 flex items-center justify-center text-[9px] font-bold text-brand-gold border border-brand-gold/10">
                      {row.author.substring(0, 1)}
                    </div>
                    <span className="text-brand-text-sub font-medium text-[13px]">{row.author}</span>
                  </div>
                </AdminTd>
                <AdminTd>
                  <Badge
                    variant="secondary"
                    className="bg-brand-card border-brand-border text-brand-text-sub text-[10px] font-bold uppercase tracking-wider"
                  >
                    {row.category}
                  </Badge>
                </AdminTd>
                <AdminTd className="text-center">
                  <div className="inline-flex items-center gap-1 font-bold text-[13px] font-mono text-brand-text-sub">
                    <Eye className="h-3.5 w-3.5 opacity-60 text-brand-text-sub" />
                    {row.views}
                  </div>
                </AdminTd>
                <AdminTd className="text-center">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-md leading-none",
                      row.status === "Xuất bản"
                        ? "text-brand-green border-brand-green/15 bg-brand-green/5"
                        : row.status === "Chờ duyệt"
                          ? "text-amber-400 border-amber-500/15 bg-amber-500/5"
                          : "text-brand-text-sub border-brand-border bg-brand-card-2"
                    )}
                  >
                    {row.status}
                  </span>
                </AdminTd>
                <AdminTd className="text-right">
                  <AdminRowActions
                    onView={() => {
                      setDetailPost(row)
                      setIsDetailOpen(true)
                    }}
                    onEdit={() => navigate(`/admin/bai-viet/${row.id}/sua`)}
                    onDelete={() => dialogs.openDelete(row)}
                    viewLabel="Xem chi tiết"
                    editLabel="Sửa bài viết"
                    deleteLabel="Xóa bài viết"
                  />
                </AdminTd>
              </AdminTr>
            ))}
          </tbody>
        </AdminTable>
      </AdminDataTable>

      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        size="sm"
        title={detailPost?.title ?? ""}
        footer={
          detailPost && (
            <>
              <Button
                onClick={() => {
                  setIsDetailOpen(false)
                  navigate(`/admin/bai-viet/${detailPost.id}/sua`)
                }}
                className="flex-1 h-11 bg-gold-gradient text-black font-bold uppercase text-[12px] rounded-xl"
              >
                Mở trình biên tập
              </Button>
              <Button
                onClick={() => setIsDetailOpen(false)}
                variant="outline"
                className="flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase text-[12px]"
              >
                Đóng
              </Button>
            </>
          )
        }
      >
        {detailPost && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant={detailPost.status === "Xuất bản" ? "success" : "warning-solid"}>
                TRẠNG THÁI: {detailPost.status.toUpperCase()}
              </Badge>
              <Badge variant="outline">{detailPost.category.toUpperCase()}</Badge>
            </div>

            <div className="space-y-4 text-left border-t border-brand-border pt-5 text-[13px]">
              <div className="flex justify-between items-center text-brand-text-sub font-mono text-[11.5px] border-b border-brand-border pb-2.5">
                <span>
                  TÁC GIẢ: <strong className="text-brand-text-sub font-bold">{detailPost.author}</strong>
                </span>
                <span>
                  NGÀY ĐĂNG: <strong className="text-brand-text-sub font-bold">{detailPost.date}</strong>
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">Tóm tắt</span>
                <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal text-[13px]">
                  {detailPost.excerpt || "Chưa có tóm tắt — mở trình biên tập để thêm nội dung."}
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xác nhận xóa bài viết"
        description={
          dialogs.deleteTarget
            ? `Hành động này không thể thu hồi. Bạn có chắc muốn xóa vĩnh viễn bài viết "${dialogs.deleteTarget.title}"?`
            : ""
        }
        onConfirm={confirmDeletePost}
        confirmLabel="Xóa bài viết"
      />
    </AdminListShell>
  )
}
