import { Link, useNavigate } from "react-router-dom"
import { Card, Button, Badge, Separator } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { heroCostBadgeClass } from "@/lib/cost-colors"
import { itemTierGradientClass } from "@/lib/item-utils"
import type { Comp, Hero, Item } from "@/types/domain"
import { Info, Zap } from "lucide-react"
import { useTranslation } from "react-i18next"

const COMP_TIER_VARIANT = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
} as const

type ItemRelatedSidebarProps = {
  item: Item
  recommendedHeroes: Hero[]
  relatedComps: Comp[]
  relatedItems: Item[]
}

export function ItemRelatedSidebar({
  item,
  recommendedHeroes,
  relatedComps,
  relatedItems,
}: ItemRelatedSidebarProps) {
  const { t } = useTranslation("pages")
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <Card className="bg-brand-card border-brand-border p-6 space-y-6">
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
          {t("itemDetail.recommendedHeroes")}
        </h3>
        <div className="space-y-3">
          {recommendedHeroes.map((h) => (
            <Link
              key={h.id}
              to={`/tuong/${h.id}`}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-brand-card-2 border border-transparent hover:border-brand-border transition-all group"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg bg-brand-bg border flex items-center justify-center text-xs font-bold transition-all group-hover:shadow-[0_0_10px_rgba(245,180,60,0.2)]",
                  heroCostBadgeClass(h.cost)
                )}
              >
                {h.name.substring(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-brand-text-main group-hover:text-brand-gold transition-colors truncate">
                  {h.name}
                </div>
                <div className="text-[10px] font-bold text-brand-text-sub uppercase tracking-wider">
                  {h.class.length > 0 ? h.class.join(" · ") : t("heroDetail.traitUndefined")} •{" "}
                  {t("itemDetail.goldCost", { cost: h.cost })}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full border-brand-border h-12 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-black"
          onClick={() => navigate("/tuong")}
        >
          {t("itemDetail.viewAllHeroes")}
        </Button>
      </Card>

      {relatedComps.length > 0 && (
        <Card className="bg-brand-card border-brand-border p-6 space-y-4">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            {t("itemDetail.relatedComps")}
          </h3>
          <div className="space-y-3">
            {relatedComps.map((comp) => (
              <Link
                key={comp.id}
                to={`/doi-hinh/${comp.id}`}
                className="block p-3 rounded-xl border border-brand-border hover:border-brand-gold/30 bg-brand-bg transition-all group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-sm font-bold text-brand-text-main group-hover:text-brand-gold truncate">
                    {comp.name}
                  </span>
                  <Badge
                    variant={COMP_TIER_VARIANT[comp.tier as keyof typeof COMP_TIER_VARIANT] ?? "tier-c"}
                    className="shrink-0 rounded-md"
                  >
                    {comp.tier}
                  </Badge>
                </div>
                <div className="text-[11px] text-brand-text-sub">{comp.winRate} win rate</div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      {relatedItems.length > 0 && (
        <Card className="bg-brand-card border-brand-border p-6 space-y-4">
          <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            {t("itemDetail.relatedItems")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedItems.map((related) => (
              <Link
                key={related.id}
                to={`/trang-bi/${related.id}`}
                className="flex items-center gap-3 p-3 rounded-xl border border-brand-border bg-brand-bg hover:border-brand-gold/30 transition-all group"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg bg-gradient-to-br shrink-0",
                    itemTierGradientClass(related.tier)
                  )}
                />
                <div className="min-w-0">
                  <div className="text-[12px] font-bold text-brand-text-main group-hover:text-brand-gold truncate">
                    {related.name}
                  </div>
                  <div className="text-[10px] text-brand-text-sub">B{related.tier}</div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      )}

      <Card className="bg-brand-card border-brand-border p-6 space-y-4 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Info className="w-24 h-24 text-brand-text-main" />
        </div>
        <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
          <Zap className="w-4 h-4 fill-brand-gold" />
          {t("itemDetail.metaAnalysisTitle")}
        </h3>
        <p className="text-[13px] text-brand-text-sub leading-relaxed font-medium">
          {item.tier >= 4 ? t("itemDetail.metaAnalysisHighTier") : t("itemDetail.metaAnalysisSituational")}
        </p>
        {item.tags && item.tags.length > 0 && (
          <>
            <Separator className="bg-brand-card-2" />
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-brand-border text-brand-text-sub text-[10px] rounded-md">
                  {tag}
                </Badge>
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
