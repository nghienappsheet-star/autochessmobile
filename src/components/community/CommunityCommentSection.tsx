import * as React from "react"
import { Card, Button, Badge, Separator, Input } from "@/components/ui/core"
import { Send } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useTranslation } from "react-i18next"
import { useAppStore } from "@/contexts/DataContext"
import type { Comment, CommunityPost } from "@/types/domain"
import { buildCommentTree, type CommentNode } from "@/lib/community-utils"
import { cn } from "@/lib/utils"

const GUEST_AUTHOR = "Khách"
const GUEST_AVATAR = "K"

function formatCommentDate(): string {
  const now = new Date()
  return `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`
}

function nextCommentId(): string {
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

type CommunityCommentSectionProps = {
  post: CommunityPost
}

function CommentItem({
  comment,
  depth = 0,
  onReply,
  replyingToId,
  replyText,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply,
}: {
  comment: CommentNode
  depth?: number
  onReply: (id: string) => void
  replyingToId: string | null
  replyText: string
  onReplyTextChange: (value: string) => void
  onSubmitReply: (parentId: string) => void
  onCancelReply: () => void
}) {
  const { t } = useTranslation(["community"])
  const isPending = comment.status === "Chờ duyệt"

  return (
    <div className={cn(depth > 0 && "ml-6 pl-4 border-l border-brand-border")}>
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-brand-card-2 border border-brand-border shrink-0 flex items-center justify-center text-brand-gold font-bold text-xs">
          {comment.avatar || comment.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-brand-text-main text-sm">{comment.author}</span>
            <span className="text-[11px] text-brand-text-sub">{comment.date}</span>
            {isPending && (
              <Badge variant="tier-a" className="rounded-md text-[10px] font-semibold">
                {t("community:pendingApproval")}
              </Badge>
            )}
          </div>
          <p className="text-[13px] text-brand-text-sub leading-relaxed mb-2">{comment.content}</p>
          <div className="flex gap-4 text-[11px] font-semibold text-brand-text-sub">
            <button type="button" className="hover:text-brand-gold transition-colors">
              {t("community:like")}
            </button>
            {depth === 0 && (
              <button
                type="button"
                className="hover:text-brand-gold transition-colors"
                onClick={() => onReply(comment.id)}
              >
                {t("community:reply")}
              </button>
            )}
          </div>

          {replyingToId === comment.id && (
            <div className="flex gap-2 mt-3">
              <Input
                placeholder={t("community:replyPlaceholder")}
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
                className="h-10 rounded-xl bg-brand-bg border-brand-border text-sm"
                autoFocus
              />
              <Button
                className="h-10 px-4 rounded-xl shrink-0"
                onClick={() => onSubmitReply(comment.id)}
                disabled={!replyText.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="h-10 px-3 rounded-xl shrink-0 text-brand-text-sub"
                onClick={onCancelReply}
              >
                {t("community:cancelReply")}
              </Button>
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={{ ...reply, replies: [] }}
              depth={depth + 1}
              onReply={onReply}
              replyingToId={replyingToId}
              replyText={replyText}
              onReplyTextChange={onReplyTextChange}
              onSubmitReply={onSubmitReply}
              onCancelReply={onCancelReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function CommunityCommentSection({ post }: CommunityCommentSectionProps) {
  const { t } = useTranslation(["community"])
  const { comments, addComment } = useAppStore()
  const [comment, setComment] = React.useState("")
  const [replyingToId, setReplyingToId] = React.useState<string | null>(null)
  const [replyText, setReplyText] = React.useState("")
  const [submittedMsg, setSubmittedMsg] = React.useState(false)

  const threadComments = React.useMemo(() => {
    return comments.filter((c) => c.threadId === post.id)
  }, [comments, post.id])

  const visibleComments = React.useMemo(() => {
    return threadComments.filter(
      (c) => c.status === "Đã duyệt" || c.status === "Chờ duyệt"
    )
  }, [threadComments])

  const commentTree = React.useMemo(
    () => buildCommentTree(visibleComments),
    [visibleComments]
  )

  const submitComment = (content: string, parentId?: string) => {
    if (!content.trim()) return

    const newComment: Comment = {
      id: nextCommentId(),
      threadId: post.id,
      parentId,
      author: GUEST_AUTHOR,
      avatar: GUEST_AVATAR,
      target: post.title,
      content: content.trim(),
      date: formatCommentDate(),
      status: "Chờ duyệt",
    }

    addComment(newComment)
    setSubmittedMsg(true)
    setTimeout(() => setSubmittedMsg(false), 3000)
  }

  const handleSubmitComment = () => {
    submitComment(comment)
    setComment("")
  }

  const handleSubmitReply = (parentId: string) => {
    submitComment(replyText, parentId)
    setReplyText("")
    setReplyingToId(null)
  }

  return (
    <Card className="bg-brand-card border-brand-border p-6 space-y-6 rounded-xl">
      <h3 className="text-sm font-bold text-brand-text-main tracking-tight">{t("community:commentsTitle")}</h3>

      <div className="flex gap-3">
        <Input
          placeholder={t("community:commentPlaceholder")}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSubmitComment()
            }
          }}
          className="h-11 rounded-xl bg-brand-bg border-brand-border"
        />
        <Button
          className="h-11 px-4 rounded-xl shrink-0"
          onClick={handleSubmitComment}
          disabled={!comment.trim()}
          aria-label={t("community:submitComment")}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {submittedMsg && (
        <p className="text-[12px] text-brand-green font-semibold">{t("community:commentSubmitted")}</p>
      )}

      <Separator className="bg-brand-border" />

      <AnimatePresence>
        {commentTree.length === 0 ? (
          <p className="text-[13px] text-brand-text-sub py-4">{t("community:noComments")}</p>
        ) : (
          <div className="space-y-6">
            {commentTree.map((c, idx) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <CommentItem
                  comment={c}
                  onReply={setReplyingToId}
                  replyingToId={replyingToId}
                  replyText={replyText}
                  onReplyTextChange={setReplyText}
                  onSubmitReply={handleSubmitReply}
                  onCancelReply={() => {
                    setReplyingToId(null)
                    setReplyText("")
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </Card>
  )
}
