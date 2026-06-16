import * as React from "react"
import { Button, Input, Badge, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { MessageSquare, Check, Trash2, Eye } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTableFooterText,
  AdminCommentDetailDrawer,
} from "@/components/admin"
import type { Comment } from "@/types/domain"

const PAGE_SIZE = 10

export function AdminCommentsPage() {
  const { comments, updateComment, deleteComment } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái")
  const [successMsg, setSuccessMsg] = React.useState("")
  const [deleteTarget, setDeleteTarget] = React.useState<{ id: string; author: string } | null>(null)
  const [detailComment, setDetailComment] = React.useState<Comment | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleApprove = (id: string, author: string) => {
    updateComment(id, { status: "Đã duyệt" })
    showSuccess(`Đã duyệt bình luận của ${author}!`)
    if (detailComment?.id === id) {
      setDetailComment((prev) => (prev ? { ...prev, status: "Đã duyệt" } : null))
    }
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteComment(deleteTarget.id)
    showSuccess("Đã ẩn/xoá bình luận vi phạm khỏi cơ sở dữ liệu.")
    if (detailComment?.id === deleteTarget.id) {
      setDetailComment(null)
    }
    setDeleteTarget(null)
  }

  const filteredComments = comments.filter((c) => {
    const matchesSearch =
      c.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "Tất cả trạng thái" || c.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(filteredComments.length / PAGE_SIZE))
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginatedComments = filteredComments.slice(startIndex, startIndex + PAGE_SIZE)

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedStatus])

  const threadComments = detailComment
    ? comments.filter((c) => c.threadId === detailComment.threadId)
    : []

  return (
    <AdminListShell
      header={
        <>
          <AdminPageHeader
            icon={MessageSquare}
            title="Quản lý bình luận"
            description="Duyệt bài bình luận từ người dùng, lọc từ ngữ kích động hoặc nội dung spam."
          />
          <AdminSuccessBanner message={successMsg} />
        </>
      }
    >
      <AdminDataTable
        fillHeight
        isEmpty={filteredComments.length === 0}
        emptyTitle="Không tìm thấy bình luận nào trùng khớp."
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        footer={
          <AdminTableFooterText
            start={filteredComments.length > 0 ? startIndex + 1 : 0}
            end={Math.min(startIndex + PAGE_SIZE, filteredComments.length)}
            total={filteredComments.length}
            label="bình luận"
          />
        }
        toolbar={
          <AdminToolbar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Tìm nội dung, tác giả..."
          >
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả trạng thái">Tất cả trạng thái</SelectItem>
                <SelectItem value="Đã duyệt">Đã duyệt</SelectItem>
                <SelectItem value="Chờ duyệt">Chờ duyệt</SelectItem>
                <SelectItem value="Báo cáo">Báo cáo vi phạm</SelectItem>
              </SelectContent>
            </Select>
          </AdminToolbar>
        }
      >
        <div className="divide-y divide-brand-border font-sans">
          {paginatedComments.map((comment) => (
            <div
              key={comment.id}
              className="p-6 hover:bg-brand-card-2/30 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer"
              onClick={() => setDetailComment(comment)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-bold text-xs flex items-center justify-center shrink-0">
                  {comment.avatar}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-brand-text-main text-[14px]">{comment.author}</span>
                    <span className="text-[11px] text-brand-text-sub font-mono">{comment.date}</span>
                    <Badge
                      variant={
                        comment.status === "Báo cáo"
                          ? "danger"
                          : comment.status === "Chờ duyệt"
                            ? "warning"
                            : "success"
                      }
                      className="text-[9px] px-1.5 py-0.5 rounded-md"
                    >
                      {comment.status}
                    </Badge>
                  </div>
                  <p className="text-[13.5px] text-brand-text-sub leading-relaxed font-normal line-clamp-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-brand-text-sub">
                    <span>Bình luận tại:</span>
                    <span className="text-brand-gold font-medium">{comment.target}</span>
                  </div>
                </div>
              </div>

              <div
                className="flex items-center gap-1.5 shrink-0 self-end md:self-start"
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  variant="ghost"
                  className="h-9 px-3 gap-1 text-[12px] font-semibold rounded-lg"
                  onClick={() => setDetailComment(comment)}
                >
                  <Eye className="h-3.5 w-3.5" /> Chi tiết
                </Button>
                {comment.status !== "Đã duyệt" && (
                  <Button
                    onClick={() => handleApprove(comment.id, comment.author)}
                    variant="ghost"
                    className="h-9 px-3 gap-1 bg-brand-green/10 text-brand-green hover:bg-brand-green/20 text-[12px] font-semibold rounded-lg border border-brand-green/10 shadow-none"
                  >
                    <Check className="h-3.5 w-3.5" /> Duyệt
                  </Button>
                )}
                <Button
                  onClick={() => setDeleteTarget({ id: comment.id, author: comment.author })}
                  variant="ghost"
                  className="h-9 px-3 gap-1 bg-brand-red/10 text-brand-red hover:bg-brand-red/20 text-[12px] font-semibold rounded-lg border border-brand-red/10 shadow-none"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Xóa
                </Button>
              </div>
            </div>
          ))}
        </div>
      </AdminDataTable>

      <AdminCommentDetailDrawer
        comment={detailComment}
        threadComments={threadComments}
        open={!!detailComment}
        onOpenChange={(open) => !open && setDetailComment(null)}
        onApprove={handleApprove}
        onDelete={(id, author) => setDeleteTarget({ id, author })}
      />

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Xóa bình luận"
        description={
          deleteTarget
            ? `Bạn có chắc muốn xóa bình luận của "${deleteTarget.author}"? Hành động này không thể hoàn tác.`
            : ""
        }
        onConfirm={handleDelete}
        confirmLabel="Xóa bình luận"
      />
    </AdminListShell>
  )
}
