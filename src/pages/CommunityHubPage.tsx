import * as React from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
  Users,
  Share2,
  ExternalLink,
  ChevronDown,
  PenLine,
  MessageSquare,
  LayoutGrid,
  Newspaper,
} from "lucide-react"
import { motion } from "@/components/motion/MotionProvider"
import { Card, Badge, Button } from "@/components/ui/core"
import { PageHeader } from "@/components/layout/PageHeader"
import { getPageIcon } from "@/config/icons"
import { useAppStore } from "@/contexts/DataContext"
import type { CommunityChannel, CommunityChannelPlatform } from "@/types/domain"
import { cn } from "@/lib/utils"

const PLATFORM_LABELS: Record<CommunityChannelPlatform, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
  discord: "Discord",
  other: "Khác",
}

function platformAccent(platform: CommunityChannelPlatform) {
  switch (platform) {
    case "youtube":
      return "text-brand-red"
    case "tiktok":
      return "text-brand-text-main"
    case "facebook":
      return "text-tier-b"
    case "discord":
      return "text-tier-b"
    default:
      return "text-brand-gold"
  }
}

function ChannelCard({ channel }: { channel: CommunityChannel }) {
  const { t } = useTranslation("communityHub")

  return (
    <Card className="bg-brand-card border-brand-border p-5 rounded-xl hover:border-brand-gold/20 transition-colors h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center shrink-0">
            <Share2 className={cn("w-4 h-4", platformAccent(channel.platform))} />
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-white text-[15px] truncate">{channel.name}</h4>
            <p className="text-[11px] text-brand-text-sub">
              {PLATFORM_LABELS[channel.platform]}
            </p>
          </div>
        </div>
        {channel.highlight && (
          <Badge variant="secondary" className="bg-brand-gold/10 text-brand-gold shrink-0 text-[10px]">
            {channel.highlight}
          </Badge>
        )}
      </div>
      <p className="text-[13px] text-brand-text-sub leading-relaxed flex-1 mb-4">
        {channel.description}
      </p>
      <Button
        asChild
        variant="outline"
        className="w-full h-10 rounded-xl border-brand-border text-[12px] font-semibold"
      >
        <a href={channel.url} target="_blank" rel="noopener noreferrer">
          {t("visitChannel")} <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </a>
      </Button>
    </Card>
  )
}

export function CommunityHubPage() {
  const { t } = useTranslation(["communityHub", "nav"])
  const { teamMembers, communityChannels, comps, posts, communityPosts } = useAppStore()
  const [openFaq, setOpenFaq] = React.useState<number | null>(0)

  const activeTeam = React.useMemo(
    () =>
      teamMembers
        .filter((m) => m.status === "Hiện")
        .sort((a, b) => a.order - b.order),
    [teamMembers]
  )

  const activeChannels = React.useMemo(
    () =>
      communityChannels
        .filter((c) => c.status === "Hiện")
        .sort((a, b) => a.order - b.order),
    [communityChannels]
  )

  const channelsByPlatform = React.useMemo(() => {
    const map = new Map<CommunityChannelPlatform, CommunityChannel[]>()
    for (const ch of activeChannels) {
      const list = map.get(ch.platform) ?? []
      list.push(ch)
      map.set(ch.platform, list)
    }
    return map
  }, [activeChannels])

  const publishedPosts = posts.filter((p) => p.status === "Xuất bản").length
  const faqItems = t("faq.items", { returnObjects: true }) as { q: string; a: string }[]
  const rules = t("rules.items", { returnObjects: true }) as string[]

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title={t("communityHub:title")}
        description={t("communityHub:description")}
        icon={getPageIcon("community")}
      />

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("stats.teamMembers"), value: activeTeam.length, icon: Users },
          { label: t("stats.channels"), value: activeChannels.length, icon: Share2 },
          { label: t("stats.comps"), value: comps.length, icon: LayoutGrid },
          { label: t("stats.posts"), value: publishedPosts + communityPosts.length, icon: Newspaper },
        ].map(({ label, value, icon: Icon }) => (
          <Card
            key={label}
            className="bg-brand-card border-brand-border p-5 rounded-xl text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-card-2 border border-brand-border flex items-center justify-center mx-auto mb-3">
              <Icon className="w-4 h-4 text-brand-gold" />
            </div>
            <div className="text-2xl font-bold text-brand-gold">{value}</div>
            <div className="text-[11px] text-brand-text-sub uppercase tracking-widest mt-1">
              {label}
            </div>
          </Card>
        ))}
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t("team.title")}</h2>
          <p className="text-sm text-brand-text-sub mt-1">{t("team.description")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTeam.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="bg-brand-card border-brand-border p-6 rounded-xl h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center text-black font-bold text-lg border border-brand-border",
                      member.avatar
                    )}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{member.name}</h3>
                    <Badge variant="secondary" className="mt-1 bg-brand-gold/10 text-brand-gold text-[10px]">
                      {member.role}
                    </Badge>
                  </div>
                </div>
                <p className="text-[13px] text-brand-text-sub leading-relaxed">{member.bio}</p>
                {member.socialUrl && (
                  <a
                    href={member.socialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-brand-gold mt-4 hover:underline"
                  >
                    {t("team.viewProfile")} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t("channels.title")}</h2>
          <p className="text-sm text-brand-text-sub mt-1">{t("channels.description")}</p>
        </div>
        {Array.from(channelsByPlatform.entries()).map(([platform, channels]) => (
          <div key={platform} className="space-y-4">
            <h3 className={cn("text-sm font-bold uppercase tracking-widest", platformAccent(platform))}>
              {PLATFORM_LABELS[platform]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {channels.map((ch) => (
                <ChannelCard key={ch.id} channel={ch} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section>
        <Card className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-2">{t("cta.title")}</h2>
          <p className="text-sm text-brand-text-sub mb-6 max-w-2xl">{t("cta.description")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="h-11 px-6 rounded-xl font-semibold">
              <Link to="/dang-bai">
                <PenLine className="w-4 h-4 mr-2" /> {t("cta.writePost")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 rounded-xl border-brand-border font-semibold">
              <Link to="/thao-luan">
                <MessageSquare className="w-4 h-4 mr-2" /> {t("cta.joinDiscussion")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-11 px-6 rounded-xl border-brand-border font-semibold">
              <Link to="/cong-cu/tao-doi-hinh">
                <LayoutGrid className="w-4 h-4 mr-2" /> {t("cta.shareComp")}
              </Link>
            </Button>
          </div>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-brand-card border-brand-border p-6 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">{t("rules.title")}</h2>
          <ul className="space-y-3">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex gap-3 text-[13px] text-brand-text-sub leading-relaxed">
                <span className="text-brand-gold font-bold shrink-0">{idx + 1}.</span>
                {rule}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="bg-brand-card border-brand-border p-6 rounded-xl">
          <h2 className="text-lg font-bold text-white mb-4">{t("faq.title")}</h2>
          <div className="space-y-2">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border border-brand-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-brand-card-2 transition-colors"
                >
                  <span className="text-[13px] font-semibold text-white">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 text-brand-text-sub shrink-0 transition-transform",
                      openFaq === idx && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-[13px] text-brand-text-sub leading-relaxed border-t border-brand-border pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  )
}
