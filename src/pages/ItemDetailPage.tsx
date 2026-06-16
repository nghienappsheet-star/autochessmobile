import { useTranslation } from "react-i18next"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Separator } from "@/components/ui/core"
import { useAppStore } from "@/contexts/DataContext"
import { motion } from "@/components/motion/MotionProvider"
import { DetailBreadcrumb } from "@/components/layout/DetailBreadcrumb"
import { BackButton } from "@/components/ui/BackButton"
import { ItemHeroHeader } from "@/components/items/ItemHeroHeader"
import { ItemEffectBlock } from "@/components/items/ItemEffectBlock"
import { ItemStatGrid } from "@/components/items/ItemStatGrid"
import { ItemTacticalSection } from "@/components/items/ItemTacticalSection"
import { ItemRelatedSidebar } from "@/components/items/ItemRelatedSidebar"
import {
  parseStatBonuses,
  getRelatedItems,
  getRecommendedHeroes,
  getCompsForItem,
} from "@/lib/item-utils"
import { useDocumentTitle } from "@/hooks/useDocumentTitle"
import { pageTitle } from "@/config/site"
import * as React from "react"

export function ItemDetailPage() {
  const { t } = useTranslation("pages")
  const { id } = useParams()
  const { items, heroes, comps } = useAppStore()
  const navigate = useNavigate()

  const item = items.find((i) => i.id === id)

  React.useEffect(() => {
    if (!item) return
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute("content", item.description ?? item.stats)
    }
  }, [item])

  useDocumentTitle(item ? pageTitle(item.name) : pageTitle(t("items.title")))

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-bold mb-4">{t("itemDetail.notFound")}</h2>
        <Button onClick={() => navigate("/trang-bi")}>{t("common:backToList")}</Button>
      </div>
    )
  }

  const statBonuses = parseStatBonuses(item.stats)
  const effectText = item.effect ?? item.stats
  const tacticalNotes = item.tacticalNotes ?? []
  const recommendedHeroes = getRecommendedHeroes(item, heroes)
  const relatedComps = getCompsForItem(item, comps, heroes)
  const relatedItems = getRelatedItems(item, items)

  return (
    <div className="space-y-6 pb-10">
      <BackButton to="/trang-bi" label={t("common:backToList")} />
      <DetailBreadcrumb
        items={[
          { label: t("itemDetail.breadcrumbLibrary", { defaultValue: "Trang bị" }), href: "/trang-bi" },
          { label: item.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-brand-card border-brand-border p-8 md:p-10 relative overflow-hidden">
              <ItemHeroHeader item={item} />
              <Separator className="my-10 bg-brand-card-2" />
              <div className="space-y-10">
                <ItemEffectBlock effect={effectText} />
                <ItemStatGrid stats={statBonuses} />
                <ItemTacticalSection notes={tacticalNotes} />
              </div>
            </Card>
          </motion.div>
        </div>

        <ItemRelatedSidebar
          item={item}
          recommendedHeroes={recommendedHeroes}
          relatedComps={relatedComps}
          relatedItems={relatedItems}
        />
      </div>
    </div>
  )
}
