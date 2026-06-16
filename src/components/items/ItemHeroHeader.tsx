import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { itemTierBorderClass, itemTierGradientClass, inferItemCategory } from "@/lib/item-utils"
import type { Item } from "@/types/domain"
import { Swords } from "lucide-react"
import { useTranslation } from "react-i18next"

type ItemHeroHeaderProps = {
  item: Item
}

export function ItemHeroHeader({ item }: ItemHeroHeaderProps) {
  const { t } = useTranslation("pages")
  const category = item.category ?? inferItemCategory(item.stats)

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
      <div
        className={cn(
          "w-32 h-32 rounded-xl border-4 flex items-center justify-center p-6 shadow-2xl relative overflow-hidden shrink-0",
          itemTierBorderClass(item.tier)
        )}
      >
        {item.imageUrl ? (
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain" />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div
              className={cn(
                "w-16 h-16 rounded-lg bg-gradient-to-br",
                itemTierGradientClass(item.tier)
              )}
            />
          </>
        )}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-inherit" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-inherit" />
      </div>

      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
          <Badge
            variant={item.tier >= 4 ? "danger-solid" : "warning-solid"}
            className="px-3 py-1 text-xs font-bold rounded-md"
          >
            {t("common:tierBadge", { tier: item.tier })}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-brand-card-2 text-brand-text-sub border-none px-3 font-bold uppercase rounded-md"
          >
            {t(`itemDetail.category.${category}`)}
          </Badge>
          {item.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-brand-border text-brand-gold text-[10px] font-bold uppercase rounded-md"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-text-main tracking-tight leading-none">
          {item.name}
        </h1>
        <p className="text-lg text-brand-text-sub font-medium leading-relaxed max-w-xl">
          {item.description ?? item.stats}
        </p>
      </div>

      <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none hidden md:block">
        <Swords className="w-64 h-64 rotate-12" />
      </div>
    </div>
  )
}
