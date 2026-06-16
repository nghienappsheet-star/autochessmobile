import * as React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { motion } from "@/components/motion/MotionProvider"
import { ArrowLeft, Eye, MessageSquare, Send, X } from "lucide-react"
import { Card, Button, Input, Badge } from "@/components/ui/core"
import { PageContainer } from "@/components/layout/PageContainer"
import { ImageAttachmentManager } from "@/components/community/ImageAttachmentManager"
import { CommunityPostCard } from "@/components/community/CommunityPostCard"
import { useAppStore } from "@/contexts/DataContext"
import { useAuth } from "@/contexts/AuthContext"
import { TRENDING_TOPICS } from "@/lib/community-utils"
import type { CommunityPost } from "@/types/domain"
import { cn } from "@/lib/utils"

const AVATAR_CLASSES = ["bg-brand-gold", "bg-brand-green", "bg-tier-b", "bg-brand-red"]

function resolveAvatar(userAvatar?: string): string {
  if (userAvatar?.startsWith("bg-")) return userAvatar
  return AVATAR_CLASSES[Math.floor(Math.random() * AVATAR_CLASSES.length)]
}

function nextPostId(posts: CommunityPost[]): string {
  const maxId = posts.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0)
  return String(maxId + 1)
}

export function CommunityComposerPage() {
  const { t } = useTranslation(["community", "nav"])
  const navigate = useNavigate()
  const { user } = useAuth()
  const { communityPosts, addCommunityPost } = useAppStore()

  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])
  const [tagInput, setTagInput] = React.useState("")
  const [images, setImages] = React.useState<CommunityPost["images"]>([])
  const [showPreview, setShowPreview] = React.useState(false)
  const [validationError, setValidationError] = React.useState<string | null>(null)

  const avatarClass = React.useMemo(() => resolveAvatar(user?.avatar), [user?.avatar])

  const addTag = (raw: string) => {
    const tag = raw.trim().replace(/^#/, "")
    if (!tag || tags.includes(tag)) return
    setTags((prev) => [...prev, tag])
    setTagInput("")
  }

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  const buildPost = (): CommunityPost | null => {
    if (!title.trim() || !content.trim()) {
      setValidationError(t("community:composer.needTitleContent"))
      return null
    }

    setValidationError(null)

    return {
      id: nextPostId(communityPosts),
      author: user?.name ?? "Khách",
      avatar: avatarClass,
      title: title.trim(),
      content: content.trim(),
      time: t("community:composer.justNow"),
      likes: 0,
      comments: 0,
      tags,
      images: images?.length ? images : undefined,
    }
  }

  const handlePublish = () => {
    const post = buildPost()
    if (!post) return
    addCommunityPost(post)
    navigate(`/thao-luan/${post.id}`)
  }

  const previewPost: CommunityPost | null = showPreview
    ? {
        id: "preview",
        author: user?.name ?? "Khách",
        avatar: avatarClass,
        title: title.trim() || t("community:composer.titlePlaceholder"),
        content: content.trim() || t("community:composer.contentPlaceholder"),
        time: t("community:composer.justNow"),
        likes: 0,
        comments: 0,
        tags,
        images,
      }
    : null

  return (
    <PageContainer width="reading" className="space-y-6 pb-32 pt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 p-0 h-auto font-medium w-fit"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("community:backToList")}
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview((v) => !v)}
            className="h-11 rounded-xl border-brand-border"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? t("community:composer.edit") : t("community:composer.preview")}
          </Button>
          <Button
            type="button"
            onClick={handlePublish}
            className="bg-gold-gradient hover-gold-gradient text-black font-bold h-11 px-8 rounded-xl"
          >
            <Send className="w-4 h-4 mr-2" />
            {t("community:composer.publish")}
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        {showPreview && previewPost ? (
          <CommunityPostCard
            post={previewPost}
            onNavigate={() => {}}
            className="pointer-events-none"
          />
        ) : (
          <Card className="bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl">
            <div className="p-6 md:p-10 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gold-gradient flex items-center justify-center shrink-0">
                  <MessageSquare className="h-7 w-7 text-black stroke-[2.5px]" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-[24px] font-bold text-brand-text-main tracking-tight leading-none">
                    {t("community:composer.title")}
                  </h1>
                  <p className="text-[14px] text-brand-text-sub font-normal">
                    {t("community:composer.subtitle")}
                  </p>
                </div>
              </div>

              {validationError && (
                <p className="text-[13px] text-brand-red font-semibold">{validationError}</p>
              )}

              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("community:composer.titleLabel")}
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("community:composer.titlePlaceholder")}
                  className="bg-brand-card-2 border-brand-border h-14 text-xl font-bold rounded-xl focus-visible:ring-brand-gold/20"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("community:composer.contentLabel")}
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t("community:composer.contentPlaceholder")}
                  className="w-full bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[15px] text-brand-text-main resize-none h-48 focus:outline-none focus:border-brand-gold/30 leading-relaxed"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("community:composer.tagsLabel")}
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-brand-card-2 border-brand-border text-brand-text-main text-[11px] pr-1 gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="p-0.5 rounded hover:text-brand-red"
                        aria-label={t("community:composer.removeTag")}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder={t("community:composer.addTag")}
                    className="h-11 rounded-xl bg-brand-card-2 border-brand-border flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag(tagInput)
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addTag(tagInput)}
                    disabled={!tagInput.trim()}
                    className="h-11 rounded-xl border-brand-border shrink-0"
                  >
                    {t("community:composer.addTagButton")}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {TRENDING_TOPICS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => addTag(topic.replace(/^#/, ""))}
                      className={cn(
                        "px-3 py-1.5 rounded-lg border text-[11px] font-semibold transition-colors",
                        tags.includes(topic.replace(/^#/, ""))
                          ? "bg-gold-gradient text-black border-transparent"
                          : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:text-brand-text-main"
                      )}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {t("community:composer.imagesLabel")}
                </label>
                <ImageAttachmentManager images={images ?? []} onChange={setImages} />
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </PageContainer>
  )
}
