import * as React from "react"
import { Button, Card, SectionHeader, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/core"
import { User as UserIcon, Search, TrendingUp, Copy, Check, LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/contexts/DataContext"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { CompListCard } from "@/components/comps/CompListCard"
import { NewsPostListItem } from "@/components/news/NewsPostListItem"
import { useFavorites } from "@/hooks/useFavorites"
import { CommunityPostCard } from "@/components/community/CommunityPostCard"
import { heroCostBarClass } from "@/lib/cost-colors"
import { getHeroIconUrl } from "@/lib/hero-utils"
import { CLASSES } from "@/data"
import { useTranslation } from "react-i18next"
import { formatDate } from "@/lib/format"
import { buildVietQrUrl, useSiteSettings, type SitePartner } from "@/hooks/useSiteSettings"
import type { Hero } from "@/types/domain"

const HERO_CLASS_ALL = "all"

function TitleWithAccent({ title }: { title: string }) {
  const parts = title.trim().split(/\s+/)
  if (parts.length <= 1) {
    return <span className="text-white">{title}</span>
  }
  const accent = parts.pop()!
  const rest = parts.join(" ")
  return (
    <>
      <span className="text-white">{rest} </span>
      <span className="text-brand-gold">{accent}</span>
    </>
  )
}

function HeroSpotlightTile({ hero }: { hero: Hero }) {
  const [failed, setFailed] = React.useState(false)
  const src = getHeroIconUrl(hero)

  React.useEffect(() => {
    setFailed(false)
  }, [src, hero.id])

  return (
    <Link
      to={`/tuong/${hero.id}`}
      className="group flex flex-col items-center gap-2 p-2 rounded-xl border border-brand-border bg-brand-card hover:border-brand-gold/30 transition-colors"
    >
      <div className="relative w-full aspect-square rounded-lg bg-brand-card-2 border border-brand-border overflow-hidden flex items-center justify-center">
        {src && !failed ? (
          <img
            src={src}
            alt={hero.name}
            loading="lazy"
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-2xl font-bold text-brand-text-sub group-hover:text-white transition-colors">
            {hero.name.charAt(0)}
          </span>
        )}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-1",
            heroCostBarClass(hero.cost)
          )}
        />
        <div className="absolute top-1 right-1 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-brand-gold">
          ${hero.cost}
        </div>
      </div>
      <span className="text-[12px] font-semibold text-white truncate w-full text-center group-hover:text-brand-gold transition-colors">
        {hero.name}
      </span>
    </Link>
  )
}

function ToolCtaCard({
  title,
  description,
  ctaLabel,
  icon: Icon,
  onClick,
}: {
  title: string
  description: string
  ctaLabel: string
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
}) {
  return (
    <Card className="p-6 sm:p-8 border-brand-border bg-brand-card overflow-hidden relative shadow-none h-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col justify-between gap-6 h-full">
        <div className="space-y-2">
          <h2 className="text-[20px] sm:text-[22px] font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-[14px] text-brand-text-sub leading-relaxed">
            {description}
          </p>
        </div>
        <Button
          onClick={onClick}
          size="lg"
          className="shrink-0 w-full sm:w-auto px-8 h-12 font-semibold text-[13px] uppercase tracking-wide"
        >
          <Icon className="w-4 h-4 mr-2" />
          {ctaLabel}
        </Button>
      </div>
    </Card>
  )
}

function PartnerMarqueeItem({ partner }: { partner: SitePartner }) {
  const initial = partner.name.trim().charAt(0).toUpperCase() || "?"
  const content = (
    <>
      <div className="w-10 h-10 rounded-lg border border-brand-border bg-brand-card-2 flex items-center justify-center overflow-hidden shrink-0">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt=""
            loading="lazy"
            className="w-full h-full object-contain p-1.5"
          />
        ) : (
          <span className="text-[14px] font-bold text-brand-gold">{initial}</span>
        )}
      </div>
      <span className="text-[13px] font-semibold text-brand-text-sub group-hover:text-white transition-colors whitespace-nowrap">
        {partner.name}
      </span>
    </>
  )

  const className =
    "group inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-brand-border bg-brand-card hover:border-brand-gold/30 transition-colors shrink-0"

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={partner.name}
      >
        {content}
      </a>
    )
  }

  return <div className={className}>{content}</div>
}

function PartnersMarquee({ partners }: { partners: SitePartner[] }) {
  const { t } = useTranslation(["home"])
  const visible = partners.filter((p) => p.name.trim())
  if (visible.length === 0) return null

  const loop = [...visible, ...visible]

  return (
    <section className="space-y-4">
      <SectionHeader
        title={t("home:partnersTitle")}
        subtitle={t("home:partnersSubtitle")}
      />
      <div className="partners-marquee-viewport hide-scrollbar">
        <div className="partners-marquee-track">
          {loop.map((partner, index) => (
            <PartnerMarqueeItem key={`${partner.name}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DonateSection() {
  const { t } = useTranslation(["home"])
  const settings = useSiteSettings()
  const [copied, setCopied] = React.useState(false)
  const [qrOpen, setQrOpen] = React.useState(false)

  if (!settings.donateEnabled) return null

  const qrUrl = buildVietQrUrl(settings)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(settings.donateAccountNo)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <section className="space-y-3">
      <h2 className="text-[14px] font-semibold text-brand-text-sub tracking-tight">
        {t("home:donateTitle")}
      </h2>
      <Card className="p-4 border-brand-border bg-brand-card shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="button"
            onClick={() => setQrOpen(true)}
            className="rounded-lg bg-white p-1.5 border border-brand-border shrink-0 self-start cursor-pointer transition-colors hover:border-brand-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
            aria-label={t("home:donateQrExpand")}
          >
            <img
              src={qrUrl}
              alt=""
              loading="lazy"
              width={72}
              height={72}
              className="w-[72px] h-[72px] object-contain pointer-events-none"
            />
          </button>

          <Dialog open={qrOpen} onOpenChange={setQrOpen}>
            <DialogContent className="max-w-sm sm:max-w-md p-6">
              <DialogHeader className="text-center sm:text-center">
                <DialogTitle>{t("home:donateQrPopupTitle")}</DialogTitle>
                <DialogDescription>{t("home:donateScanHint")}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-2">
                <div className="rounded-xl bg-white p-4 border border-brand-border">
                  <img
                    src={qrUrl}
                    alt={`${settings.donateBankName} ${settings.donateAccountNo}`}
                    width={240}
                    height={240}
                    className="w-[min(240px,70vw)] h-[min(240px,70vw)] object-contain"
                  />
                </div>
                <p className="text-[13px] text-brand-text-sub text-center">
                  <span className="text-white font-medium">{settings.donateBankName}</span>
                  <span className="mx-1.5 text-brand-border">·</span>
                  <span className="font-mono text-brand-gold">{settings.donateAccountNo}</span>
                  <span className="mx-1.5 text-brand-border">·</span>
                  <span>{settings.donateAccountName}</span>
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 h-9 border-brand-border hover:border-brand-gold/40"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-green" />
                      {t("home:donateCopied")}
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      {t("home:donateCopy")}
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-[13px] text-brand-text-main leading-snug line-clamp-2">
              {settings.donateMessage}
            </p>
            <p className="text-[12px] text-brand-text-sub">
              <span className="text-white font-medium">{settings.donateBankName}</span>
              <span className="mx-1.5 text-brand-border">·</span>
              <span className="font-mono text-brand-gold">{settings.donateAccountNo}</span>
              <span className="mx-1.5 text-brand-border">·</span>
              <span>{settings.donateAccountName}</span>
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="shrink-0 gap-1.5 h-9 border-brand-border hover:border-brand-gold/40 self-start sm:self-center"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-brand-green" />
                {t("home:donateCopied")}
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                {t("home:donateCopy")}
              </>
            )}
          </Button>
        </div>
      </Card>
    </section>
  )
}

export function HomePage() {
  const { t } = useTranslation(["home", "common"])
  const { comps, posts, banners, heroes, communityPosts } = useAppStore()
  const siteSettings = useSiteSettings()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites("comps")

  const activeBanners = banners.filter((b) => b.status === "Hiện")
  const [currentBannerIndex, setCurrentBannerIndex] = React.useState(0)
  const [heroClassTab, setHeroClassTab] = React.useState<string>(HERO_CLASS_ALL)

  const heroClassTabs = React.useMemo(() => {
    const classOrder = CLASSES.map((c) => c.name)
    const presentInRoster = new Set(heroes.flatMap((h) => h.class))
    return [HERO_CLASS_ALL, ...classOrder.filter((name) => presentInRoster.has(name))]
  }, [heroes])

  React.useEffect(() => {
    setCurrentBannerIndex((prev) => {
      if (activeBanners.length === 0) return 0
      return prev >= activeBanners.length ? 0 : prev
    })
  }, [activeBanners.length])

  React.useEffect(() => {
    if (activeBanners.length <= 1) return
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % activeBanners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeBanners.length])

  const trendingComps = [...comps]
    .sort((a, b) => (b.tier === "S" && a.tier !== "S" ? 1 : -1))
    .slice(0, 5)
  const latestPosts = posts.filter((p) => p.status === "Xuất bản").slice(0, 4)
  const featuredDiscussions = React.useMemo(
    () => [...communityPosts].sort((a, b) => b.likes - a.likes).slice(0, 4),
    [communityPosts]
  )

  const filteredSpotlightHeroes = heroes
    .filter((h) => {
      if (heroClassTab === HERO_CLASS_ALL) return true
      return h.class.some((c) => c === heroClassTab)
    })
    .slice(0, 10)

  return (
    <div className="space-y-10 pb-12">
      {/* Patch / version strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl border border-brand-border bg-brand-card/80">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-gold shrink-0">
            <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
            {t("home:metaBadge")}
          </span>
          <span className="hidden sm:inline text-[13px] text-brand-text-sub truncate">
            {t("home:patchNote")}
          </span>
        </div>
        <Link
          to="/tin-tuc"
          className="text-[12px] font-semibold text-brand-gold hover:text-brand-gold-deep transition-colors shrink-0"
        >
          {t("home:viewPatchNotes")}
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-brand-bg border border-brand-border group min-h-[260px] xs:min-h-[300px] sm:min-h-[380px] md:min-h-[520px] flex items-center">
        {activeBanners.length > 0 ? (
          activeBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={false}
              animate={{ opacity: currentBannerIndex === index ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={cn(
                "absolute inset-0 w-full h-full flex items-center",
                currentBannerIndex === index ? "z-10 pointer-events-auto" : "z-0 pointer-events-none"
              )}
              aria-hidden={currentBannerIndex !== index}
            >
              <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover object-[center_top] md:object-center grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/45 z-10 md:bg-black/55" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/55 to-transparent z-10 md:from-brand-bg/90 md:via-transparent" />
                <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-brand-bg via-brand-bg/90 to-transparent z-10 w-[85%]" />
              </div>

              <div
                className={cn(
                  "relative z-20 w-full p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start text-left h-full max-w-3xl",
                  activeBanners.length > 1 && "pb-10 md:pb-0"
                )}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: currentBannerIndex === index ? 1 : 0,
                    y: currentBannerIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-3 md:space-y-6 flex flex-col items-start w-full"
                >
                  {banner.subtitle && (
                    <span className="hidden md:inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold border border-brand-gold/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded-md leading-none w-fit">
                      <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-pulse" />
                      {banner.subtitle}
                    </span>
                  )}
                  <h1 className="text-[22px] sm:text-[26px] md:text-[44px] lg:text-[52px] leading-[1.1] font-bold tracking-tight line-clamp-2 md:line-clamp-none sm:uppercase max-w-2xl">
                    <TitleWithAccent title={banner.title} />
                  </h1>
                  <p className="hidden md:block text-brand-text-sub text-[14px] md:text-[15px] max-w-lg font-normal leading-relaxed opacity-90 text-balance">
                    {banner.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-start gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
                    {banner.primaryButtonText && (
                      <Button
                        onClick={() => navigate(banner.primaryButtonLink)}
                        className="h-11 w-full sm:w-auto sm:min-w-[140px] md:h-12 md:px-8 md:min-w-[140px] font-semibold text-[12px] md:text-[13px] uppercase tracking-wide shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/30"
                      >
                        {banner.primaryButtonText}
                      </Button>
                    )}
                    {banner.secondaryButtonText && (
                      <Button
                        onClick={() => navigate(banner.secondaryButtonLink)}
                        variant="outline"
                        className="hidden md:inline-flex min-w-[140px] px-8 h-12 font-semibold text-[13px] uppercase tracking-wide bg-white/10 border-white/25 text-white hover:bg-white/15 hover:border-white/40"
                      >
                        {banner.secondaryButtonText}
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="h-full w-full flex items-center justify-center p-12 text-center text-brand-text-sub">
            <p className="text-brand-text-sub font-semibold uppercase tracking-widest text-xs">
              {t("home:noBanners")}
            </p>
          </div>
        )}

        {activeBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:bottom-10 md:left-16 md:translate-x-0 flex items-center gap-3 z-50">
            {activeBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className="group py-2 md:py-4 px-1 outline-none"
                aria-label={t("home:slideAria", { n: index + 1 })}
              >
                <div
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    currentBannerIndex === index
                      ? "bg-brand-gold w-12 shadow-[0_0_15px_rgba(245,180,60,0.6)]"
                      : "bg-white/15 w-3 group-hover:bg-white/40"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t("home:stats.comps"), value: comps.length.toString(), sub: t("home:stats.compsSub"), trend: "+12%" },
          { label: t("home:stats.votes"), value: "245.6K", sub: t("home:stats.votesSub"), trend: "+8.4%" },
          { label: t("home:stats.users"), value: "85.3K", sub: t("home:stats.usersSub"), trend: "+5.1%" },
          { label: t("home:stats.posts"), value: posts.length.toString(), sub: t("home:stats.postsSub"), trend: "+3.2%" },
        ].map((stat, i) => (
          <Card key={i} className="bg-brand-card border-brand-border py-5 px-4 shadow-none hover:border-brand-gold/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="text-brand-gold text-[11px] font-semibold uppercase tracking-wide">{stat.label}</div>
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-brand-green">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <div className="text-[26px] font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[12px] text-brand-text-sub font-normal">{stat.sub}</div>
          </Card>
        ))}
      </div>

      {/* Trending Comps */}
      <section className="space-y-4">
        <SectionHeader
          title={t("home:trendingCompsTitle")}
          subtitle={t("home:trendingCompsSubtitle")}
          onAction={() => navigate("/doi-hinh")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingComps.map((comp, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={comp.id}
              className="h-full"
            >
              <CompListCard
                comp={comp}
                rank={idx + 1}
                heroes={heroes}
                isFavorite={isFavorite(comp.id)}
                onToggleFavorite={() => toggleFavorite(comp.id)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Heroes */}
      <section className="space-y-4">
        <SectionHeader title={t("home:featuredHeroesTitle")} actionHref="/tuong" />

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {heroClassTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setHeroClassTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-[12px] font-semibold transition-all border shrink-0",
                heroClassTab === tab
                  ? "bg-gold-gradient text-black border-transparent"
                  : "bg-brand-card border-brand-border text-brand-text-sub hover:text-white hover:border-brand-gold/30"
              )}
            >
              {tab === HERO_CLASS_ALL ? t("common:all") : tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
          {filteredSpotlightHeroes.map((hero) => (
            <div key={hero.id}>
              <HeroSpotlightTile hero={hero} />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Discussions */}
      {featuredDiscussions.length > 0 && (
        <section className="space-y-4">
          <SectionHeader
            title={t("home:featuredDiscussionsTitle")}
            actionHref="/thao-luan"
          />
          <div className="space-y-3">
            {featuredDiscussions.map((post) => (
              <CommunityPostCard
                key={post.id}
                post={post}
                onNavigate={() => navigate(`/thao-luan/${post.id}`)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Latest Posts */}
      <section className="space-y-4">
        <SectionHeader title={t("home:latestPostsTitle")} actionHref="/tin-tuc" />
        <Card className="divide-y divide-brand-border shadow-none border-brand-border">
          {latestPosts.map((article, i) => (
            <NewsPostListItem
              key={article.id}
              post={article}
              onClick={() => navigate(`/tin-tuc/${article.id}`)}
            />
          ))}
        </Card>
      </section>

      {/* Tools CTAs */}
      <div className="grid md:grid-cols-2 gap-4">
        <ToolCtaCard
          title={t("home:buildCompTitle")}
          description={t("home:buildCompDesc")}
          ctaLabel={t("home:buildCompCta")}
          icon={LayoutGrid}
          onClick={() => navigate("/cong-cu/tao-doi-hinh")}
        />
        <ToolCtaCard
          title={t("home:findCompTitle")}
          description={t("home:findCompDesc")}
          ctaLabel={t("home:findCompCta")}
          icon={Search}
          onClick={() => navigate("/cong-cu/tim-doi-hinh")}
        />
      </div>

      <PartnersMarquee partners={siteSettings.partners} />

      <DonateSection />
    </div>
  )
}
