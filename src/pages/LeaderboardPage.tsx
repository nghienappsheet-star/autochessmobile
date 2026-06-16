import * as React from "react"
import { Link } from "react-router-dom"
import { useAppStore } from "@/contexts/DataContext"
import { Card, Badge, Button } from "@/components/ui/core"
import { Medal, ChevronRight, LayoutGrid, PenLine } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { getPageIcon } from "@/config/icons"
import { motion } from "@/components/motion/MotionProvider"

const parseLikes = (likes: string) => {
  if (likes.endsWith("K")) return parseFloat(likes.replace("K", "")) * 1000
  return parseInt(likes) || 0
}

type ContributorStat = {
  name: string
  comps: number
  posts: number
  totalLikes: number
  score: number
}

function getContributorTier(totalLikes: number, t: (key: string) => string) {
  if (totalLikes >= 5000) return { label: t("pages:leaderboard.tiers.legend"), variant: "tier-s" as const }
  if (totalLikes >= 2000) return { label: t("pages:leaderboard.tiers.master"), variant: "tier-a" as const }
  if (totalLikes >= 500) return { label: t("pages:leaderboard.tiers.expert"), variant: "tier-b" as const }
  return { label: t("pages:leaderboard.tiers.member"), variant: "tier-c" as const }
}

function PodiumCard({
  contributor,
  rank,
  t,
}: {
  contributor: ContributorStat
  rank: 1 | 2 | 3
  t: (key: string, opts?: Record<string, unknown>) => string
}) {
  const tier = getContributorTier(contributor.totalLikes, t)
  const heights = { 1: "h-32", 2: "h-24", 3: "h-20" }
  const medals = {
    1: "text-brand-gold",
    2: "text-brand-text-sub",
    3: "text-tier-a",
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Medal className={cn("w-8 h-8 mb-2", medals[rank])} />
      <div
        className={cn(
          "w-full rounded-t-xl bg-brand-card border border-brand-border border-b-0 flex flex-col items-center justify-end p-4",
          heights[rank],
          rank === 1 && "border-brand-gold/30 bg-brand-gold/5"
        )}
      >
        <span className="font-bold text-white text-sm truncate max-w-full">{contributor.name}</span>
      </div>
      <div className="w-full bg-brand-card-2 border border-brand-border rounded-b-xl p-4 space-y-2">
        <Badge variant={tier.variant} className="rounded-md text-[10px] font-semibold">
          {tier.label}
        </Badge>
        <div className="text-[11px] text-brand-text-sub space-y-0.5">
          <p>{t("pages:leaderboard.cols.contributors.comps")}: {contributor.comps}</p>
          <p>{t("pages:leaderboard.cols.contributors.posts")}: {contributor.posts}</p>
          <p className="text-brand-gold font-semibold">
            {(contributor.totalLikes / 1000).toFixed(1)}K {t("pages:leaderboard.cols.contributors.reputation")}
          </p>
        </div>
      </div>
    </div>
  )
}

export function LeaderboardPage() {
  const { t } = useTranslation(["pages", "nav"])
  const { comps, posts } = useAppStore()

  const contributors = React.useMemo(() => {
    const stats: Record<string, ContributorStat> = {}
    comps.forEach((c) => {
      if (!stats[c.author]) {
        stats[c.author] = { name: c.author, comps: 0, posts: 0, totalLikes: 0, score: 0 }
      }
      stats[c.author].comps += 1
      stats[c.author].totalLikes += parseLikes(c.likes)
    })
    posts
      .filter((p) => p.status === "Xuất bản")
      .forEach((p) => {
        if (!stats[p.author]) {
          stats[p.author] = { name: p.author, comps: 0, posts: 0, totalLikes: 0, score: 0 }
        }
        stats[p.author].posts += 1
      })
    return Object.values(stats)
      .map((s) => ({ ...s, score: s.totalLikes + s.comps * 100 + s.posts * 50 }))
      .sort((a, b) => b.score - a.score)
  }, [comps, posts])

  const top3 = contributors.slice(0, 3)
  const rest = contributors.slice(3)
  const totalComps = comps.length
  const totalPosts = posts.filter((p) => p.status === "Xuất bản").length

  return (
    <div className="space-y-10 pb-20">
      <section className="text-center space-y-3 pt-6">
        {(() => {
          const Icon = getPageIcon("leaderboard") ?? Medal
          return <Icon className="w-12 h-12 text-brand-gold mx-auto mb-4" />
        })()}
        <h1 className="text-3xl font-bold text-white tracking-tight">
          {t("pages:leaderboard.title")}
        </h1>
        <p className="text-brand-text-sub text-sm max-w-2xl mx-auto">
          {t("pages:leaderboard.description")}
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card className="bg-brand-card border-brand-border p-5 rounded-xl text-center">
          <div className="text-2xl font-bold text-brand-gold">{contributors.length}</div>
          <div className="text-[11px] text-brand-text-sub uppercase tracking-widest mt-1">
            {t("pages:leaderboard.stats.contributors")}
          </div>
        </Card>
        <Card className="bg-brand-card border-brand-border p-5 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{totalComps}</div>
          <div className="text-[11px] text-brand-text-sub uppercase tracking-widest mt-1">
            {t("pages:leaderboard.stats.totalComps")}
          </div>
        </Card>
        <Card className="bg-brand-card border-brand-border p-5 rounded-xl text-center">
          <div className="text-2xl font-bold text-white">{totalPosts}</div>
          <div className="text-[11px] text-brand-text-sub uppercase tracking-widest mt-1">
            {t("pages:leaderboard.stats.totalPosts")}
          </div>
        </Card>
      </section>

      {top3.length >= 3 && (
        <section className="max-w-3xl mx-auto">
          <h2 className="text-sm font-bold uppercase tracking-widest text-brand-gold text-center mb-6">
            {t("pages:leaderboard.podiumTitle")}
          </h2>
          <div className="grid grid-cols-3 gap-3 items-end">
            <PodiumCard contributor={top3[1]} rank={2} t={t} />
            <PodiumCard contributor={top3[0]} rank={1} t={t} />
            <PodiumCard contributor={top3[2]} rank={3} t={t} />
          </div>
        </section>
      )}

      <Card className="bg-brand-card-2 border-brand-border overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-brand-card text-brand-text-sub text-[10px] uppercase font-semibold tracking-widest border-b border-brand-border">
              <tr>
                <th className="px-6 py-4 w-20 text-center">{t("pages:leaderboard.cols.contributors.rank")}</th>
                <th className="px-6 py-4">{t("pages:leaderboard.cols.contributors.contributor")}</th>
                <th className="px-6 py-4 text-center">{t("pages:leaderboard.cols.contributors.comps")}</th>
                <th className="px-6 py-4 text-center">{t("pages:leaderboard.cols.contributors.posts")}</th>
                <th className="px-6 py-4 text-center">{t("pages:leaderboard.cols.contributors.badge")}</th>
                <th className="px-6 py-4 text-right">{t("pages:leaderboard.cols.contributors.reputation")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {(top3.length < 3 ? contributors : rest).map((user, idx) => {
                const rank = top3.length < 3 ? idx : idx + 3
                const tier = getContributorTier(user.totalLikes, t)
                return (
                  <motion.tr
                    key={user.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-brand-card transition-colors"
                  >
                    <td className="px-6 py-5 text-center font-bold text-brand-text-sub">
                      #{rank + 1}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-[11px] text-brand-text-sub mt-0.5">
                        {t("pages:leaderboard.authorRole")}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center font-semibold text-white">{user.comps}</td>
                    <td className="px-6 py-5 text-center font-semibold text-white">{user.posts}</td>
                    <td className="px-6 py-5 text-center">
                      <Badge variant={tier.variant} className="rounded-md text-[10px] font-semibold">
                        {tier.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-5 text-right font-semibold text-brand-gold">
                      {(user.totalLikes / 1000).toFixed(1)}K
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="max-w-4xl mx-auto">
        <Card className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white">{t("pages:leaderboard.ctaTitle")}</h2>
            <p className="text-sm text-brand-text-sub">{t("pages:leaderboard.ctaDesc")}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild className="h-11 px-6 rounded-xl font-semibold">
              <Link to="/cong-cu/tao-doi-hinh" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> {t("pages:leaderboard.ctaComp")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 rounded-xl border-brand-border font-semibold">
              <Link to="/dang-bai" className="flex items-center gap-2">
                <PenLine className="w-4 h-4" /> {t("pages:leaderboard.ctaPost")}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  )
}
