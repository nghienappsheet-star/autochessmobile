import * as React from "react"
import { cn } from "@/lib/utils"
import { heroCostBarClass } from "@/lib/cost-colors"
import type { Hero, HeroSkin } from "@/types/domain"
import { getHeroSkins } from "@/lib/hero-utils"
import { useTranslation } from "react-i18next"

type HeroPortraitPanelProps = {
  hero: Hero
  selectedSkinId: string
  onSkinChange: (skinId: string) => void
}

export function HeroPortraitPanel({ hero, selectedSkinId, onSkinChange }: HeroPortraitPanelProps) {
  const { t } = useTranslation("pages")
  const skins = getHeroSkins(hero)
  const activeSkin = skins.find((s) => s.id === selectedSkinId) ?? skins[0]
  const imageSrc = activeSkin?.imageUrl ?? hero.portraitUrl ?? hero.imageUrl ?? hero.image

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative mx-auto w-full max-w-[360px] aspect-[3/4] rounded-xl border overflow-hidden bg-brand-card-2",
          hero.cost === 5 ? "border-brand-gold/40" : "border-brand-border"
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={hero.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl font-bold text-brand-text-sub uppercase">
            {hero.name.substring(0, 2)}
          </div>
        )}
        <div className={cn("absolute bottom-0 left-0 right-0 h-1.5", heroCostBarClass(hero.cost))} />
      </div>

      {skins.length > 1 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
            {t("heroDetail.skins")}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {skins.map((skin) => (
              <SkinThumb
                key={skin.id}
                skin={skin}
                active={skin.id === (activeSkin?.id ?? "default")}
                onSelect={() => onSkinChange(skin.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SkinThumb({
  skin,
  active,
  onSelect,
}: {
  skin: HeroSkin
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-14 h-14 rounded-lg border overflow-hidden transition-all shrink-0",
        active ? "border-brand-gold ring-1 ring-brand-gold/50" : "border-brand-border hover:border-brand-gold/30"
      )}
      title={skin.name}
    >
      <img src={skin.imageUrl} alt={skin.name} className="w-full h-full object-cover" />
    </button>
  )
}
