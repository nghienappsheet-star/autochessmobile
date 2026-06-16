import * as React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Card, Button, Badge } from "@/components/ui/core"
import { MessageSquare, Heart, Share2, ArrowUp, MoreHorizontal, ArrowLeft } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { CommunityCommentSection } from "@/components/community/CommunityCommentSection"
import { CommunityPostImageGallery } from "@/components/community/ImageAttachmentManager"
import { getRelatedCommunityPosts, TRENDING_TOPICS } from "@/lib/community-utils"
import { cn } from "@/lib/utils"

export function CommunityDetailPage() {
  const { t } = useTranslation(["community", "common", "nav"])
  const { id } = useParams()
  const navigate = useNavigate()
  const { communityPosts } = useAppStore()
  const [upvoted, setUpvoted] = React.useState(false)

  const post = communityPosts.find((p) => p.id === id)

  const relatedPosts = React.useMemo(() => {
    if (!post) return []
    return getRelatedCommunityPosts(communityPosts, post.id, 3)
  }, [communityPosts, post])

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-brand-text-sub mb-6">{t("community:notFound")}</p>
        <Button onClick={() => navigate("/thao-luan")}>{t("community:backToList")}</Button>
      </div>
    )
  }

  const displayLikes = post.likes + (upvoted ? 1 : 0)

  return (
    <div className="space-y-6 pb-10">
      <Button
        variant="ghost"
        onClick={() => navigate("/thao-luan")}
        className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        {t("community:backToList")}
      </Button>

      <DetailBreadcrumb
        items={[
          { label: t("nav:discussion"), href: "/thao-luan" },
          { label: post.title },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border p-6 rounded-xl hover:border-brand-gold/20 transition-colors">
            <div className="flex gap-6">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setUpvoted((v) => !v)}
                  className={cn(
                    "text-brand-text-sub hover:text-brand-gold transition-colors p-1",
                    upvoted && "text-brand-gold"
                  )}
                  aria-label={t("community:like")}
                >
                  <ArrowUp className="w-8 h-8" />
                </button>
                <span className="font-bold text-lg">{displayLikes}</span>
              </div>

              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-sm border border-brand-border",
                        post.avatar
                      )}
                    >
                      {post.author.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-brand-text-main text-sm">{post.author}</span>
                      <span className="text-[11px] text-brand-text-sub">{post.time}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-brand-text-sub">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-brand-card-2 text-brand-text-sub text-[11px]"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-2xl font-bold text-brand-text-main tracking-tight">{post.title}</h1>
                <p className="text-[15px] text-brand-text-sub leading-relaxed">{post.content}</p>

                {post.images && post.images.length > 0 && (
                  <CommunityPostImageGallery images={post.images} className="pt-2" />
                )}

                <div className="flex gap-4 text-brand-text-sub text-[12px] font-semibold pt-2">
                  <span className="flex items-center gap-1.5 hover:text-brand-gold transition-colors cursor-pointer">
                    <Heart className="w-4 h-4" /> {t("community:like")}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-brand-gold transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />{" "}
                    {t("community:commentCount", { count: post.comments })}
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-brand-text-main transition-colors cursor-pointer">
                    <Share2 className="w-4 h-4" /> {t("common:share")}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <CommunityCommentSection post={post} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="bg-brand-card border-brand-border p-5 space-y-4 rounded-xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              {t("community:aboutAuthor")}
            </h4>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold",
                  post.avatar
                )}
              >
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-brand-text-main text-sm">{post.author}</div>
                <div className="text-[11px] text-brand-text-sub">{t("community:veteranMember")}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-brand-card-2 rounded-xl p-3 border border-brand-border">
                <div className="text-lg font-bold text-brand-gold">2.4K</div>
                <div className="text-[10px] text-brand-text-sub uppercase tracking-widest">
                  {t("community:authorStats.reputation")}
                </div>
              </div>
              <div className="bg-brand-card-2 rounded-xl p-3 border border-brand-border">
                <div className="text-lg font-bold text-brand-text-main">
                  {communityPosts.filter((p) => p.author === post.author).length}
                </div>
                <div className="text-[10px] text-brand-text-sub uppercase tracking-widest">
                  {t("community:authorStats.posts")}
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full h-11 rounded-xl border-brand-border">
              {t("community:follow")}
            </Button>
          </Card>

          {relatedPosts.length > 0 && (
            <Card className="bg-brand-card border-brand-border p-5 space-y-4 rounded-xl">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                {t("community:relatedPosts")}
              </h4>
              <ul className="space-y-3">
                {relatedPosts.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/thao-luan/${r.id}`}
                      className="block space-y-1 group"
                    >
                      <p className="text-[13px] font-semibold text-brand-text-main group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                        {r.title}
                      </p>
                      <p className="text-[11px] text-brand-text-sub line-clamp-1">{r.content}</p>
                      <div className="flex gap-1 flex-wrap">
                        {r.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-brand-card-2 text-brand-text-sub text-[10px]"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="bg-brand-card border-brand-border p-5 space-y-3 rounded-xl">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
              {t("community:trendingTopics")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {TRENDING_TOPICS.map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="bg-brand-card-2 text-brand-text-sub cursor-pointer hover:border-brand-gold/30"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  )
}
