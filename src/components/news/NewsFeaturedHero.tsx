import { Badge, Card } from "@/components/ui/core"
import { Calendar, Clock, Eye } from "lucide-react"
import { useTranslation } from "react-i18next"
import { estimateReadingMinutes, isPostImageUrl } from "@/contexts/DataContext"
import { PostCardThumb } from "@/components/news/PostCardThumb"
import { formatDate } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Post } from "@/types/domain"

type NewsFeaturedHeroProps = {
  post: Post
  onClick: () => void
}

export function NewsFeaturedHero({ post, onClick }: NewsFeaturedHeroProps) {
  const { t } = useTranslation(["news", "common"])
  const readingMin = estimateReadingMinutes(post.content ?? post.excerpt ?? post.title)
  const hasCover = Boolean(post.coverImageUrl)

  return (
    <Card
      className="bg-brand-card border-brand-border p-0 overflow-hidden cursor-pointer group rounded-xl hover:border-brand-gold/20 transition-colors"
      onClick={onClick}
    >
      <div className="relative min-h-[280px] sm:min-h-[360px]">
        {hasCover ? (
          <>
            <img
              src={post.coverImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-brand-bg/20" />
          </>
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0",
                post.image && !isPostImageUrl(post.image) ? post.image : "bg-brand-card-2"
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" />
          </>
        )}

        <div className="relative z-10 flex flex-col justify-end min-h-[280px] sm:min-h-[360px] p-6 sm:p-8 gap-4">
          <Badge
            variant="secondary"
            className="w-fit bg-brand-gold/10 text-brand-gold border-none font-semibold text-[10px]"
          >
            {t("news:featured")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text-main group-hover:text-brand-gold transition-colors leading-tight max-w-3xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-[14px] text-brand-text-sub line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-brand-text-sub">
            <span className="text-brand-text-main font-medium">{post.author}</span>
            <span className="flex items-center gap-1">
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
