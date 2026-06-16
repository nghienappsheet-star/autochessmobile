import * as React from "react"
import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { heroCostBarClass } from "@/lib/cost-colors"
import { getHeroIconUrl } from "@/lib/hero-utils"
import type { Hero } from "@/types/domain"

type CompHeroChipProps = {
  hero: Hero | undefined
  size?: "xs" | "sm" | "md"
  isCore?: boolean
  isMainCore?: boolean
  showStars?: boolean
  showName?: boolean
  coreLabel?: string
  mainCoreLabel?: string
  costLabel?: string
  className?: string
  linkable?: boolean
}

const SIZE_CLASSES = {
  xs: {
    box: "w-[30px] h-[30px] rounded-lg",
    text: "text-[9px]",
    bar: "h-0.5",
    star: "w-[6px] h-[6px]",
  },
  sm: {
    box: "w-[36px] h-[36px] rounded-lg",
    text: "text-[9px]",
    bar: "h-1",
    star: "w-[7px] h-[7px]",
  },
  md: {
    box: "w-full aspect-square rounded-xl",
    text: "text-lg",
    bar: "h-1.5",
    star: "w-[8px] h-[8px]",
  },
} as const

function HeroChipAvatar({
  hero,
  size,
  initials,
}: {
  hero: Hero | undefined
  size: keyof typeof SIZE_CLASSES
  initials: string
}) {
  const [failed, setFailed] = React.useState(false)
  const src = hero ? getHeroIconUrl(hero) : undefined

  React.useEffect(() => {
    setFailed(false)
  }, [src, hero?.id])

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={hero?.name ?? ""}
        className="w-full h-full object-cover"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span
      className={cn(
        SIZE_CLASSES[size].text,
        "font-bold text-brand-text-sub uppercase select-none",
        size !== "md" && "opacity-80"
      )}
    >
      {initials}
    </span>
  )
}

export function CompHeroChip({
  hero,
  size = "sm",
  isCore = false,
  isMainCore = false,
  showStars = false,
  showName = false,
  coreLabel = "CORE",
  mainCoreLabel = "MAIN",
  costLabel,
  className,
  linkable = true,
}: CompHeroChipProps) {
  const s = SIZE_CLASSES[size]
  const initials = hero?.name.substring(0, size === "md" ? 2 : size === "xs" ? 1 : 2) ?? "?"

  const chip = (
    <div className={cn("relative flex-shrink-0", showName && "w-full", className)}>
      {isMainCore && (
        <div className="absolute -top-1 -left-1 z-20 bg-brand-gold text-black text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase leading-none shadow-[0_0_5px_rgba(245,180,60,0.5)]">
          {mainCoreLabel}
        </div>
      )}
      {!isMainCore && isCore && (
        <div className="absolute -top-1 -left-1 z-20 bg-brand-card-2 text-brand-gold border border-brand-gold/40 text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase leading-none">
          {coreLabel}
        </div>
      )}
      <div
        title={hero?.name}
        className={cn(
          s.box,
          "bg-brand-bg border overflow-hidden flex items-center justify-center relative shadow-inner",
          isMainCore || isCore ? "border-brand-gold/30" : "border-brand-border",
          size === "md" && "border-2 group-hover:border-brand-gold/50 transition-all"
        )}
      >
        <HeroChipAvatar hero={hero} size={size} initials={initials} />
        {hero && (
          <div className={cn("absolute bottom-0 left-0 right-0", s.bar, heroCostBarClass(hero.cost))} />
        )}
        {showStars && (
          <div className="absolute top-1 right-1 flex flex-col gap-0.5">
            <Star className={cn(s.star, "text-brand-gold fill-brand-gold")} />
            <Star className={cn(s.star, "text-brand-gold fill-brand-gold")} />
          </div>
        )}
      </div>
      {showName && hero && (
        <>
          <div className="text-[10px] font-bold text-white truncate w-full uppercase leading-tight tracking-tighter mt-2">
            {hero.name}
          </div>
          <div className="text-[9px] font-bold text-brand-text-sub uppercase">
            {costLabel ?? `${hero.cost} Vàng`}
          </div>
        </>
      )}
    </div>
  )

  if (linkable && hero?.id) {
    return (
      <Link to={`/tuong/${hero.id}`} className="block" title={hero.name}>
        {chip}
      </Link>
    )
  }

  return chip
}
