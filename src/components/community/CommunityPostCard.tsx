import * as React from "react"
import { Card, Badge } from "@/components/ui/core"
import { ArrowUp, MessageSquare } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { CommunityPost } from "@/types/domain"
import { cn } from "@/lib/utils"

type CommunityPostCardProps = {
  post: CommunityPost
  onNavigate: () => void
  onUpvote?: (e: React.MouseEvent) => void
  upvoted?: boolean
  className?: string
}

export function CommunityPostCard({
  post,
  onNavigate,
  onUpvote,
  upvoted,
  className,
}: CommunityPostCardProps) {
  const { t } = useTranslation(["community"])
  const coverImage = post.images?.[0]?.url
  const visibleTags = post.tags.slice(0, 2)

  return (
    <Card
      onClick={onNavigate}
      className={cn(
        "bg-brand-card border-brand-border p-3 sm:p-3.5 hover:border-brand-gold/20 transition-colors cursor-pointer group rounded-xl",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="flex flex-col items-center gap-0.5 shrink-0 w-9 pt-0.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onUpvote?.(e)
            }}
            className={cn(
              "text-brand-text-sub hover:text-brand-gold transition-colors p-0.5",
              upvoted && "text-brand-gold"
            )}
            aria-label={t("community:like")}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <span className="font-semibold text-[12px] text-brand-text-main leading-none">
            {post.likes}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex gap-3 items-start">
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-brand-text-sub min-w-0">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full text-black font-bold flex items-center justify-center text-[9px] shrink-0",
                    post.avatar
                  )}
                >
                  {post.author.charAt(0)}
                </div>
                <span className="font-semibold text-brand-text-main truncate">{post.author}</span>
                <span className="shrink-0">• {post.time}</span>
              </div>

              <h3 className="text-[15px] font-semibold text-brand-text-main leading-snug line-clamp-1 group-hover:text-brand-gold transition-colors">
                {post.title}
              </h3>

              <p className="text-[12px] text-brand-text-sub line-clamp-1 leading-snug">
                {post.content}
              </p>
            </div>

            {coverImage && (
              <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-brand-border bg-brand-card-2">
                <img
                  src={coverImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-2 mt-1.5">
            <div className="flex gap-1.5 min-w-0">
              {visibleTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-brand-card-2 text-brand-text-sub text-[10px] px-1.5 py-0 h-5"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 2 && (
                <span className="text-[10px] text-brand-text-sub self-center">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>

            <span className="flex items-center gap-1 text-brand-text-sub text-[11px] font-medium shrink-0">
              <MessageSquare className="w-3.5 h-3.5" />
              {post.comments}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
