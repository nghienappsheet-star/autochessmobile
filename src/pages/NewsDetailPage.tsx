import * as React from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Card, Button, Badge, Separator } from "@/components/ui/core"
import {
  Calendar,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  ChevronRight,
  Clock,
  Wrench,
} from "lucide-react"
import {
  useAppStore,
  isPostImageUrl,
  estimateReadingMinutes,
} from "@/contexts/DataContext"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { ArticleProse } from "@/components/ArticleProse"
import { PostCardThumb } from "@/components/news/PostCardThumb"
import { BackButton } from "@/components/ui/BackButton"
import { cn } from "@/lib/utils"

function PostHero({ category, coverImageUrl, imageToken }: {
  category: string
  coverImageUrl?: string
  imageToken?: string
}) {
  if (coverImageUrl) {
    return (
      <div className="h-[220px] sm:h-[280px] w-full relative overflow-hidden">
        <img src={coverImageUrl} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent" />
      </div>
    )
  }

  const tokenClass =
    imageToken && !isPostImageUrl(imageToken) ? imageToken : "bg-brand-card-2"

  return (
    <div
      className={cn(
        "h-[220px] sm:h-[280px] w-full relative flex items-center justify-center",
        tokenClass
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent opacity-80" />
      <span className="relative z-10 text-brand-text-sub/40 font-bold text-2xl sm:text-3xl tracking-tight select-none">
        {category}
      </span>
    </div>
  )
}

export function NewsDetailPage() {
  const { t } = useTranslation(['news', 'nav'])
  const { id } = useParams()
  const { posts } = useAppStore()
  const navigate = useNavigate()
  const [copied, setCopied] = React.useState(false)

  const post = posts.find((p) => p.id === id)

  const relatedPosts = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return []
    const published = posts.filter((p) => p.id !== post.id && p.status === "Xuất bản")
    const sameCategory = published.filter((p) => p.category === post.category)
    const others = published.filter((p) => p.category !== post.category)
    return [...sameCategory, ...others].slice(0, 3)
  }, [posts, post])

  const related = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return []
    return posts
      .filter((p) => p.id !== post.id && p.status === "Xuất bản" && p.category === post.category)
      .slice(0, 3)
  }, [posts, post])

  const recent = React.useMemo(() => {
    if (!post || post.status !== "Xuất bản") return []
    return posts.filter((p) => p.id !== post.id && p.status === "Xuất bản").slice(0, 4)
  }, [posts, post])

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-bold mb-2 text-white">{t('notFoundTitle')}</h2>
        <p className="text-brand-text-sub text-sm mb-6">{t('notFoundDesc')}</p>
        <Button onClick={() => navigate("/tin-tuc")}>{t('backToList')}</Button>
      </div>
    )
  }

  if (post.status !== "Xuất bản") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Badge variant="secondary" className="mb-4">{post.status}</Badge>
        <h2 className="text-xl font-bold mb-2 text-white">{t('unpublishedTitle')}</h2>
        <p className="text-brand-text-sub text-sm mb-6">{t('unpublishedDesc')}</p>
        <Button onClick={() => navigate("/tin-tuc")}>{t('backToList')}</Button>
      </div>
    )
  }

  const bodyText = post.content || post.excerpt || ""
  const readingMin = estimateReadingMinutes(bodyText)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <BackButton to="/tin-tuc" label={t("backToList")} />
      <nav className="flex flex-wrap items-center gap-1.5 text-[12px] text-brand-text-sub">
        <Link to="/tin-tuc" className="hover:text-brand-gold transition-colors">{t('nav:news')}</Link>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-brand-text-sub">{post.category}</span>
        <ChevronRight className="w-3.5 h-3.5 opacity-50" />
        <span className="text-white line-clamp-1 max-w-[200px] sm:max-w-md">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl">
            <PostHero
              category={post.category}
              coverImageUrl={post.coverImageUrl}
              imageToken={post.image}
            />

            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="bg-brand-gold/10 text-brand-gold border-none px-3 py-1 font-semibold text-[11px]"
                >
                  {post.category}
                </Badge>
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-[12px] text-brand-text-sub">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-card-2 flex items-center justify-center text-brand-gold font-bold border border-brand-border text-sm">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{post.author}</div>
                      <div className="flex flex-wrap items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {t('readingMinutes', { n: readingMin })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-brand-border" />

              {post.excerpt && (
                <p className="text-[16px] text-brand-text-main font-medium border-l-4 border-brand-gold pl-4 py-2 bg-brand-card-2/50 rounded-r-xl leading-relaxed">
                  {post.excerpt}
                </p>
              )}

              {post.content ? (
                <ArticleProse content={post.content} />
              ) : (
                <p className="text-brand-text-sub leading-relaxed">
                  {post.excerpt || t('contentPending')}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-brand-border">
                <div className="flex items-center gap-2 text-sm text-brand-text-sub font-semibold">
                  <Share2 className="w-4 h-4 text-brand-gold" />
                  {t('shareTitle')}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    aria-label={t('shareFacebook')}
                  >
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border"
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                    aria-label={t('shareTwitter')}
                  >
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl bg-brand-card-2 hover:bg-brand-gold/10 hover:text-brand-gold border border-brand-border"
                    onClick={copyLink}
                    aria-label={t('copyLinkAria')}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                  {copied && (
                    <span className="text-[11px] text-brand-green font-semibold">{t('copied')}</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <aside className="space-y-6 lg:sticky lg:top-24">
          {related.length > 0 && (
            <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-4">
              <h3 className="text-[13px] font-bold text-white tracking-tight">{t('relatedSameCategory')}</h3>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/tin-tuc/${r.id}`}
                      className="text-[13px] text-brand-text-sub hover:text-brand-gold transition-colors line-clamp-2 leading-snug block"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-4">
            <h3 className="text-[13px] font-bold text-white tracking-tight">{t('recentPosts')}</h3>
            <ul className="space-y-3">
              {recent.map((r) => (
                <li key={r.id} className="flex gap-3">
                  <span className="text-[10px] font-mono text-brand-text-sub shrink-0">{r.date}</span>
                  <Link
                    to={`/tin-tuc/${r.id}`}
                    className="text-[13px] text-brand-text-sub hover:text-brand-gold transition-colors line-clamp-2 leading-snug"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="bg-brand-card border-brand-border p-5 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-brand-gold">
              <Wrench className="w-4 h-4" />
              <h3 className="text-[13px] font-bold text-white tracking-tight">{t('metaToolsTitle')}</h3>
            </div>
            <p className="text-[12px] text-brand-text-sub leading-relaxed">
              {t('metaToolsDesc')}
            </p>
            <Link
              to="/cong-cu/tim-doi-hinh"
              className="inline-flex w-full items-center justify-center h-10 px-4 rounded-xl border border-brand-border bg-transparent text-[12px] font-semibold text-brand-text-main hover:bg-brand-card-2 transition-colors"
            >
              {t('metaToolsCta')}
            </Link>
          </Card>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-lg font-bold text-white tracking-tight">{t("relatedPosts")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((r) => (
              <Link key={r.id} to={`/tin-tuc/${r.id}`} className="group">
                <Card className="bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl hover:border-brand-gold/20 transition-colors h-full">
                  <PostCardThumb
                    coverImageUrl={r.coverImageUrl}
                    imageToken={r.image}
                    category={r.category}
                  />
                  <div className="p-4 space-y-2">
                    <Badge
                      variant="secondary"
                      className="bg-brand-card-2 border-brand-border font-semibold text-[10px]"
                    >
                      {r.category}
                    </Badge>
                    <h3 className="text-[15px] font-semibold text-white group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                      {r.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
