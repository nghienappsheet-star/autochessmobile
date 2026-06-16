import * as React from "react"
import { Link } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Badge,
  Button,
} from "@/components/ui/core"
import { Check, ExternalLink, Trash2 } from "lucide-react"
import type { Comment } from "@/types/domain"
import { cn } from "@/lib/utils"

type AdminCommentDetailDrawerProps = {
  comment: Comment | null
  threadComments: Comment[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onApprove: (id: string, author: string) => void
  onDelete: (id: string, author: string) => void
}

/** Slide-over panel: full thread context + link to public target. */
export function AdminCommentDetailDrawer({
  comment,
  threadComments,
  open,
  onOpenChange,
  onApprove,
  onDelete,
}: AdminCommentDetailDrawerProps) {
  if (!comment) return null

  const publicPath = `/thao-luan/${comment.threadId}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "fixed right-0 top-0 flex h-full w-full max-w-md translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none rounded-l-xl border-l border-brand-border p-0",
          "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        )}
      >
        <DialogHeader className="shrink-0 border-b border-brand-border px-6 py-5 text-left">
          <DialogTitle className="admin-dialog-title">Chi tiết bình luận</DialogTitle>
          <p className="admin-meta pt-1">
            Thread #{comment.threadId} · {comment.target}
          </p>
        </DialogHeader>

        <div className="flex-1 min-h-0 space-y-4 overflow-y-auto custom-scrollbar px-6 py-4">
          <div className="rounded-xl border border-brand-border bg-brand-card-2/50 p-4 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="admin-table-cell font-semibold">{comment.author}</span>
              <span className="admin-meta">{comment.date}</span>
              <Badge
                variant={
                  comment.status === "Báo cáo"
                    ? "danger"
                    : comment.status === "Chờ duyệt"
                      ? "warning"
                      : "success"
                }
                className="rounded-md"
              >
                {comment.status}
              </Badge>
            </div>
            <p className="admin-table-cell leading-relaxed">{comment.content}</p>
            <Link
              to={publicPath}
              className="inline-flex items-center gap-1.5 admin-meta font-medium text-brand-gold hover:underline"
            >
              Xem trên trang cộng đồng
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {threadComments.length > 1 && (
            <div className="space-y-2">
              <p className="admin-eyebrow">
                Cùng thread ({threadComments.length})
              </p>
              <div className="space-y-2">
                {threadComments.map((c) => (
                  <div
                    key={c.id}
                    className={cn(
                      "rounded-lg border border-brand-border p-3 admin-table-cell",
                      c.id === comment.id && "border-brand-gold/30 bg-brand-gold/5"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-medium text-brand-text-main">{c.author}</span>
                      <Badge variant="secondary" className="rounded-md">
                        {c.status}
                      </Badge>
                    </div>
                    <p className="admin-body line-clamp-2">{c.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex shrink-0 gap-2 border-t border-brand-border px-6 py-4">
          {comment.status !== "Đã duyệt" && (
            <Button
              variant="ghost"
              className="flex-1 bg-brand-green/10 text-brand-green border border-brand-green/10 rounded-xl"
              onClick={() => onApprove(comment.id, comment.author)}
            >
              <Check className="h-4 w-4 mr-1.5" />
              Duyệt
            </Button>
          )}
          <Button
            variant="ghost"
            className="flex-1 bg-brand-red/10 text-brand-red border border-brand-red/10 rounded-xl"
            onClick={() => onDelete(comment.id, comment.author)}
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Xóa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
