import { Badge, Card } from "@/components/ui/core"
import { Calendar, Clock, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { estimateReadingMinutes, isPostImageUrl } from "@/contexts/DataContext"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Post } from "@/types/domain"

type NewsPostListItemProps = {
  post: Post
  onClick: () => void
}

export function NewsPostListItem({ post, onClick }: NewsPostListItemProps) {
  const { t } = useTranslation(["news", "common"])
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title)

  return (
    <Card
      className="bg-brand-card border-brand-border p-0 overflow-hidden cursor-pointer group rounded-xl hover:border-brand-gold/20 transition-colors"
      onClick={onClick}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        <div className="shrink-0 w-[88px] h-[66px] sm:w-[112px] sm:h-[84px] rounded-lg overflow-hidden border border-brand-border bg-brand-card-2">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div
              className={cn(
                "w-full h-full flex items-center justify-center text-[9px] font-bold text-brand-text-sub/50 px-1 text-center",
                post.image && !isPostImageUrl(post.image) ? post.image : "bg-brand-card-2"
              )}
            >
              {post.category}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              variant="secondary"
              className="bg-brand-card-2 border-brand-border font-semibold text-[10px]"
            >
              {post.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-[15px] sm:text-[16px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed hidden sm:block">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-text-sub">
            <span className="text-brand-text-main font-medium">{post.author}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" aria-hidden />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden />
              {t("news:readingMinutes", { n: readingMin })}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" aria-hidden />
              {post.date ? formatDate(post.date) : t("common:today")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
