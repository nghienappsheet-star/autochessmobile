import { Link } from "react-router-dom"
import { Card, Button } from "@/components/ui/core"
import { Eye, MessagesSquare } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import type { CategoryCount } from "@/lib/news-utils"
import type { Post } from "@/types/domain"

type NewsSidebarProps = {
  categories: CategoryCount[]
  popularPosts: Post[]
  selectedCategory: string | null
  onCategorySelect: (category: string | null) => void
  onPostClick: (postId: string) => void
}

export function NewsSidebar({
  categories,
  popularPosts,
  selectedCategory,
  onCategorySelect,
  onPostClick,
}: NewsSidebarProps) {
  const { t } = useTranslation(["news", "nav"])

  return (
    <aside className="space-y-4">
      <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-brand-text-main tracking-tight">
          {t("news:categoriesTitle")}
        </h3>
        <ul className="space-y-1">
          <li>
            <button
              type="button"
              onClick={() => onCategorySelect(null)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors",
                !selectedCategory
                  ? "bg-gold-gradient text-black font-semibold"
                  : "text-brand-text-sub hover:text-brand-text-main hover:bg-brand-card-2"
              )}
            >
              <span>{t("news:allCategories")}</span>
            </button>
          </li>
          {categories.map(({ name, count }) => (
            <li key={name}>
              <button
                type="button"
                onClick={() => onCategorySelect(name)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-colors",
                  selectedCategory === name
                    ? "bg-gold-gradient text-black font-semibold"
                    : "text-brand-text-sub hover:text-brand-text-main hover:bg-brand-card-2"
                )}
              >
                <span className="truncate pr-2">{name}</span>
                <span
                  className={cn(
                    "text-[11px] font-mono shrink-0",
                    selectedCategory === name ? "text-black/70" : "text-brand-text-sub"
                  )}
                >
                  {count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Card>

      {popularPosts.length > 0 && (
        <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-brand-text-main tracking-tight">
            {t("news:popularArticles")}
          </h3>
          <ul className="space-y-3">
            {popularPosts.map((post, index) => (
              <li key={post.id}>
                <button
                  type="button"
                  onClick={() => onPostClick(post.id)}
                  className="w-full text-left group flex gap-3 items-start"
                >
                  <span className="text-[11px] font-bold text-brand-gold w-5 shrink-0 pt-0.5">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-brand-text-sub">
                      <Eye className="w-3 h-3" aria-hidden />
                      {post.views}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="bg-brand-card border-brand-border rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-brand-gold">
          <MessagesSquare className="w-4 h-4" aria-hidden />
          <h3 className="text-sm font-bold text-brand-text-main tracking-tight">
            {t("nav:discussion")}
          </h3>
        </div>
        <p className="text-[13px] text-brand-text-sub leading-relaxed">
          {t("news:sidebarDiscussionDesc")}
        </p>
        <Button asChild variant="outline" className="w-full rounded-xl border-brand-border">
          <Link to="/thao-luan">{t("news:sidebarDiscussionCta")}</Link>
        </Button>
      </Card>
    </aside>
  )
}
