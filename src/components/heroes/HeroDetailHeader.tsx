import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"
import { heroCostBadgeClass } from "@/lib/cost-colors"
import type { Hero } from "@/types/domain"
import { useTranslation } from "react-i18next"
import { HeroNewBadge } from "@/components/heroes/HeroNewBadge"
import { isHeroNew } from "@/lib/hero-utils"

type HeroDetailHeaderProps = {
  hero: Hero
  description: string
}

const RARITY_VARIANT: Record<string, string> = {
  Common: "bg-brand-card-2 text-brand-text-sub border-brand-border",
  Rare: "bg-tier-b/15 text-tier-b border-tier-b/30",
  Epic: "bg-tier-a/15 text-tier-a border-tier-a/30",
  Legendary: "bg-brand-gold/15 text-brand-gold border-brand-gold/30",
}

export function HeroDetailHeader({ hero, description }: HeroDetailHeaderProps) {
  const { t } = useTranslation("pages")

  return (
    <div className="space-y-4 text-center lg:text-left">
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
        <Badge
          className={cn(
            "px-3 py-1 text-xs font-bold rounded-md border-none",
            heroCostBadgeClass(hero.cost)
          )}
        >
          {t("heroDetail.goldCost", { cost: hero.cost })}
        </Badge>
        {isHeroNew(hero) && <HeroNewBadge />}
        {hero.rarity && (
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase rounded-md",
              RARITY_VARIANT[hero.rarity] ?? RARITY_VARIANT.Common
            )}
          >
            {t("heroDetail.rarity")}: {hero.rarity}
          </Badge>
        )}
        {hero.class.map((className) => (
          <Badge
            key={className}
            className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 border px-3 font-bold rounded-md text-[10px]"
          >
            {className}
          </Badge>
        ))}
      </div>
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-main tracking-tight leading-none">
          {hero.name}
        </h1>
        {hero.chessTitle && (
          <p className="mt-2 text-sm text-brand-gold font-semibold">{hero.chessTitle}</p>
        )}
      </div>
      <p className="text-sm text-brand-text-sub font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
        {description}
      </p>
    </div>
  )
}
