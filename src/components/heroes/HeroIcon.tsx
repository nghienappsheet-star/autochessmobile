import * as React from "react"
import { cn } from "@/lib/utils"
import { getHeroIconUrl } from "@/lib/hero-utils"
import type { Hero } from "@/types/domain"

type HeroIconProps = {
  hero: Hero
  size?: "sm" | "md" | "lg"
  className?: string
}

const SIZE_CLASS = {
  sm: "w-10 h-10 text-[10px]",
  md: "w-16 h-16 text-sm",
  lg: "w-[72px] h-[72px] text-base",
} as const

export function HeroIcon({ hero, size = "md", className }: HeroIconProps) {
  const [failed, setFailed] = React.useState(false)
  const src = getHeroIconUrl(hero)

  React.useEffect(() => {
    setFailed(false)
  }, [src, hero.id])

  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-brand-card-2 border border-brand-border shrink-0 flex items-center justify-center",
        SIZE_CLASS[size],
        className
      )}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={hero.name}
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-bold text-brand-text-sub">{hero.name.charAt(0)}</span>
      )}
    </div>
  )
}
