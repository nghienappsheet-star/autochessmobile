import * as React from "react"
import { useTranslation } from "react-i18next"
import { useParams, Link } from "react-router-dom"
import { Badge, Button } from "@/components/ui/core"
import { useAppStore } from "@/contexts/DataContext"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { BackButton } from "@/components/ui/BackButton"
import { TraitTypeBadge } from "@/components/traits/TraitTypeBadge"
import { TraitIcon } from "@/components/traits/TraitIcon"
import { TraitMilestoneTable } from "@/components/traits/TraitMilestoneTable"
import { TraitMembersGrid } from "@/components/traits/TraitMembersGrid"
import { TraitRecommendedComps } from "@/components/traits/TraitRecommendedComps"
import { TraitMetaPanel } from "@/components/traits/TraitMetaPanel"
import { TraitInteractions } from "@/components/traits/TraitInteractions"
import {
  buildTraitItems,
  classToTraitItem,
  getTraitsListPath,
  getTraitHeroes,
  getTraitRelatedComps,
  raceToTraitItem,
  routeKindToTraitKind,
} from "@/lib/traits"
import { getTraitMetaBundle } from "@/lib/trait-meta"
import { useDocumentTitle } from "@/hooks/useDocumentTitle"
import { pageTitle } from "@/config/site"

const TIER_VARIANT: Record<string, "tier-s" | "tier-a" | "tier-b" | "tier-c"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
}

export function TraitDetailPage() {
  const { t } = useTranslation("pages")
  const { kind: routeKind, id } = useParams<{ kind: string; id: string }>()
  const { races, classes, heroes, comps } = useAppStore()

  const traitKind = routeKind ? routeKindToTraitKind(routeKind) : null

  const allTraits = React.useMemo(
    () => buildTraitItems(races, classes),
    [races, classes]
  )

  const trait = React.useMemo(() => {
    if (!traitKind || !id) return null
    if (traitKind === "race") {
      const race = races.find((r) => r.id === id)
      return race ? raceToTraitItem(race) : null
    }
    const cls = classes.find((c) => c.id === id)
    return cls ? classToTraitItem(cls) : null
  }, [traitKind, id, races, classes])

  const meta = React.useMemo(() => {
    if (!trait) return null
    return getTraitMetaBundle(trait, heroes, comps, allTraits)
  }, [trait, heroes, comps, allTraits])

  React.useEffect(() => {
    if (!trait) return
    const metaEl = document.querySelector('meta[name="description"]')
    if (metaEl) {
      metaEl.setAttribute("content", trait.description)
    }
  }, [trait])

  useDocumentTitle(trait ? pageTitle(trait.name) : pageTitle(t("traits.title")))

  if (!trait || !meta) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-2xl font-bold text-brand-text-main mb-4">{t("traitDetail.notFound")}</h2>
        <Button asChild variant="outline">
          <Link to="/toc-he">{t("common:backToList")}</Link>
        </Button>
      </div>
    )
  }

  const traitHeroes = getTraitHeroes(trait, heroes)
  const relatedComps = getTraitRelatedComps(trait, heroes, comps, 6)
  const listPath = getTraitsListPath(trait.kind)
  const kindLabel =
    trait.kind === "race" ? t("traitDetail.breadcrumbRace") : t("traitDetail.breadcrumbClass")

  return (
    <div className="space-y-6 pb-10">
      <BackButton to={listPath} label={t("traitDetail.backToList")} />

      <DetailBreadcrumb
        items={[
          { label: t("traitDetail.breadcrumb"), href: "/toc-he" },
          { label: kindLabel, href: listPath },
          { label: trait.name },
        ]}
      />

      {/* Hero header */}
      <section className="relative overflow-hidden rounded-xl bg-brand-card border border-brand-border p-6 md:p-10">
        <div className="absolute top-0 right-0 p-8 md:p-12 pointer-events-none select-none">
          <TraitIcon
            id={trait.id}
            iconUrl={trait.iconUrl}
            icon={trait.icon}
            name={trait.name}
            size="watermark"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <TraitIcon
            id={trait.id}
            iconUrl={trait.iconUrl}
            icon={trait.icon}
            name={trait.name}
            size="xl"
          />

          <div className="flex-1 text-center md:text-left space-y-4 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <TraitTypeBadge kind={trait.kind} />
              <Badge variant={TIER_VARIANT[meta.tier]} className="text-[10px] font-bold">
                {meta.tier} {t("traitDetail.tierSuffix")}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text-main tracking-tight leading-none">
              {trait.name}
            </h1>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-2">
                {t("traitDetail.loreTitle")}
              </p>
              <p className="text-brand-text-sub text-base font-medium leading-relaxed max-w-2xl">
                {trait.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-brand-border bg-brand-card px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1">
            {t("traitDetail.statTier")}
          </p>
          <p className="text-lg font-bold text-brand-gold">{meta.tier}</p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-card px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1">
            {t("traitDetail.statPickRate")}
          </p>
          <p className="text-lg font-bold text-brand-text-main">{meta.popularity.pickRatePct}%</p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-card px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1">
            {t("traitDetail.statHeroCount")}
          </p>
          <p className="text-lg font-bold text-brand-text-main">{traitHeroes.length}</p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-card px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub mb-1">
            {t("traitDetail.statMilestone")}
          </p>
          <p className="text-lg font-bold text-brand-gold">
            {meta.recommendedMilestone ?? "—"}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
        <aside className="space-y-6 lg:sticky lg:top-6">
          <TraitMetaPanel
            tier={meta.tier}
            popularity={meta.popularity}
            phase={meta.phase}
          />
          <TraitInteractions partners={meta.partners} matchups={meta.matchups} />
        </aside>

        <div className="space-y-10 min-w-0">
          <TraitMilestoneTable
            milestones={trait.milestones}
            recommendedCount={meta.recommendedMilestone}
          />
          <TraitMembersGrid heroes={traitHeroes} />
          <TraitRecommendedComps
            comps={relatedComps}
            heroes={heroes}
            trait={trait}
            recommendedMilestone={meta.recommendedMilestone}
          />
        </div>
      </div>
    </div>
  )
}
