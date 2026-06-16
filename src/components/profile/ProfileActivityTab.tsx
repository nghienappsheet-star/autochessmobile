import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { MessageSquare, Eye, Pencil, LayoutGrid, Hammer, Users, Trophy } from "lucide-react"
import { motion } from "motion/react"
import { Card, Button, Badge } from "@/components/ui/core"
import type { Post, PostStatus } from "@/types/domain"

type ProfileActivityTabProps = {
  userPosts: Post[]
}

function postStatusLabel(status: PostStatus, t: (key: string) => string) {
  switch (status) {
    case "Xuất bản":
      return t("pages:profile.postStatus.published")
    case "Chờ duyệt":
      return t("pages:profile.postStatus.pending")
    case "Bản nháp":
      return t("pages:profile.postStatus.draft")
    default:
      return status
  }
}

function postStatusVariant(status: PostStatus): "default" | "tier-a" | "tier-c" {
  switch (status) {
    case "Xuất bản":
      return "default"
    case "Chờ duyệt":
      return "tier-a"
    default:
      return "tier-c"
  }
}

const QUICK_LINKS = [
  { key: "linkComps", path: "/doi-hinh", icon: LayoutGrid },
  { key: "linkTeamBuilder", path: "/cong-cu/tao-doi-hinh", icon: Hammer },
  { key: "linkCommunity", path: "/cong-dong", icon: Users },
  { key: "linkLeaderboard", path: "/bang-xep-hang", icon: Trophy },
] as const

export function ProfileActivityTab({ userPosts }: ProfileActivityTabProps) {
  const { t } = useTranslation(["pages", "common"])

  return (
    <div className="space-y-6">
      <Card className="bg-brand-card border-brand-border p-6">
        <h3 className="text-sm font-bold tracking-wider mb-4 flex items-center gap-2 uppercase">
          <MessageSquare className="w-4 h-4 text-brand-gold" />
          {t("pages:profile.myPosts")}
        </h3>
        {userPosts.length > 0 ? (
          <div className="space-y-3">
            {userPosts.map((post, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={post.id}
                className="bg-brand-card-2 p-4 rounded-xl border border-brand-border flex flex-col sm:flex-row sm:items-center gap-3 justify-between"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-bold text-brand-text-main mb-2 truncate">
                    {post.title}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={postStatusVariant(post.status)} className="rounded-md text-[10px] font-bold">
                      {postStatusLabel(post.status, t)}
                    </Badge>
                    <span className="text-[11px] text-brand-text-sub">{post.date}</span>
                    <span className="text-[11px] text-brand-text-sub">
                      {t("pages:profile.activity.views", { count: post.views })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {post.status === "Xuất bản" && (
                    <Button asChild variant="outline" size="sm" className="h-8 rounded-xl">
                      <Link to={`/tin-tuc/${post.id}`}>
                        <Eye className="w-3.5 h-3.5 mr-1.5" />
                        {t("common:details")}
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="sm" className="h-8 rounded-xl">
                    <Link to={`/bai-viet/${post.id}/sua`}>
                      <Pencil className="w-3.5 h-3.5 mr-1.5" />
                      {t("common:edit")}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-brand-card-2 rounded-lg border border-dashed border-brand-border">
            <p className="text-[13px] text-brand-text-sub mb-4">{t("pages:profile.activity.noPosts")}</p>
            <Button asChild className="bg-gold-gradient font-semibold h-10 rounded-xl">
              <Link to="/dang-bai">{t("pages:profile.activity.createPost")}</Link>
            </Button>
          </div>
        )}
      </Card>

      <Card className="bg-brand-card border-brand-border p-6">
        <h3 className="text-sm font-bold tracking-wider mb-4 uppercase">
          {t("pages:profile.activity.quickLinks")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUICK_LINKS.map(({ key, path, icon: Icon }) => (
            <Link
              key={key}
              to={path}
              className="bg-brand-card-2 border border-brand-border rounded-xl p-4 flex items-center gap-3 hover:border-brand-gold/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-brand-gold" />
              </div>
              <span className="text-[14px] font-semibold text-brand-text-main">
                {t(`pages:profile.activity.${key}`)}
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
