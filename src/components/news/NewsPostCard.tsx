import { Badge, Card } from "@/components/ui/core"
import { Calendar, Clock, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { estimateReadingMinutes } from "@/contexts/DataContext"
import { PostCardThumb } from "@/components/news/PostCardThumb"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/domain"

type NewsPostCardProps = {
  post: Post
  onClick: () => void
}

export function NewsPostCard({ post, onClick }: NewsPostCardProps) {
  const { t } = useTranslation(["news", "common"])
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title)

  return (
    <Card
      className="bg-brand-card border-brand-border p-0 overflow-hidden flex flex-col group cursor-pointer h-full rounded-xl hover:border-brand-gold/20 transition-colors"
      onClick={onClick}
    >
      <PostCardThumb
        coverImageUrl={post.coverImageUrl}
        imageToken={post.image}
        category={post.category}
      />
      <div className="p-5 flex-1 flex flex-col gap-3">
        <Badge
          variant="secondary"
          className="w-fit bg-brand-card-2 border-brand-border font-semibold text-[10px]"
        >
          {post.category}
        </Badge>
        <h3 className="font-semibold text-[17px] leading-snug text-brand-text-main group-hover:text-brand-gold transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-[13px] text-brand-text-sub line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-[12px] text-brand-text-sub pt-2 gap-2 flex-wrap">
          <span>
            <span className="text-brand-text-sub">{t("news:writtenBy")} </span>
            <span className="text-brand-text-main font-medium">{post.author}</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <Eye className="w-3.5 h-3.5" aria-hidden />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden />
              {t("news:readingMinutes", { n: readingMin })}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden />
              {post.date ? formatDate(post.date) : t("common:today")}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
