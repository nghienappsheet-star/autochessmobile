import { Badge, Card } from "@/components/ui/core"
import { Calendar, Clock, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { estimateReadingMinutes } from "@/contexts/DataContext"
import { PostCardThumb } from "@/components/news/PostCardThumb"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/domain"

type NewsSecondaryCardProps = {
  post: Post
  onClick: () => void
}

export function NewsSecondaryCard({ post, onClick }: NewsSecondaryCardProps) {
  const { t } = useTranslation(["news", "common"])
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title)

  return (
    <Card
      className="bg-brand-card border-brand-border p-0 overflow-hidden flex flex-col sm:flex-row group cursor-pointer h-full rounded-xl hover:border-brand-gold/20 transition-colors"
      onClick={onClick}
    >
      <PostCardThumb
        coverImageUrl={post.coverImageUrl}
        imageToken={post.image}
        category={post.category}
        className="h-40 sm:h-auto sm:w-[42%] sm:min-h-[180px] shrink-0"
      />
      <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
        <Badge
          variant="secondary"
          className="w-fit bg-brand-card-2 border-brand-border font-semibold text-[10px]"
        >
          {post.category}
        </Badge>
        <h3 className="font-semibold text-[16px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed hidden sm:block">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-text-sub pt-1">
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
    </Card>
  )
}
