import { cn } from "@/lib/utils"
import { getTraitVisual } from "@/lib/trait-visuals"

export type TraitIconSize = "xs" | "sm" | "md" | "lg" | "xl" | "watermark"

type TraitIconProps = {
  id?: string
  iconUrl?: string
  icon: string
  name: string
  size?: TraitIconSize
  className?: string
  /** @deprecated use size="watermark" */
  watermark?: boolean
}

const SIZE: Record<
  TraitIconSize,
  { box: string; icon: string; rounded: string; ring: string; emoji: string }
> = {
  xs: {
    box: "w-5 h-5",
    icon: "w-3 h-3",
    rounded: "rounded-md",
    ring: "border",
    emoji: "text-xs",
  },
  sm: {
    box: "w-7 h-7",
    icon: "w-3.5 h-3.5",
    rounded: "rounded-lg",
    ring: "border",
    emoji: "text-sm",
  },
  md: {
    box: "w-12 h-12",
    icon: "w-6 h-6",
    rounded: "rounded-xl",
    ring: "border",
    emoji: "text-2xl",
  },
  lg: {
    box: "w-16 h-16",
    icon: "w-8 h-8",
    rounded: "rounded-xl",
    ring: "border-2",
    emoji: "text-3xl",
  },
  xl: {
    box: "w-24 h-24 md:w-32 md:h-32",
    icon: "w-10 h-10 md:w-14 md:h-14",
    rounded: "rounded-xl",
    ring: "border-2",
    emoji: "text-5xl md:text-6xl",
  },
  watermark: {
    box: "w-28 h-28 md:w-40 md:h-40",
    icon: "w-20 h-20 md:w-28 md:h-28",
    rounded: "rounded-xl",
    ring: "border-0",
    emoji: "text-7xl md:text-[200px]",
  },
}

export function TraitIcon({
  id,
  iconUrl: _iconUrl,
  icon,
  name,
  size: sizeProp,
  className,
  watermark = false,
}: TraitIconProps) {
  const size = sizeProp ?? (watermark ? "watermark" : "md")
  const spec = SIZE[size]
  const visual = getTraitVisual(id)
  const { Icon, accentClass, glowClass } = visual
  const isWatermark = size === "watermark"

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 overflow-hidden",
        spec.box,
        spec.rounded,
        isWatermark && "opacity-100",
        className
      )}
      title={name}
    >
      {!isWatermark && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-card-2 via-brand-card to-brand-bg" />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-80",
              glowClass
            )}
          />
          <div
            className={cn(
              "absolute inset-0 rounded-[inherit] border-brand-gold/20",
              spec.ring,
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_16px_rgba(0,0,0,0.35)]"
            )}
          />
          <div className="absolute inset-[1px] rounded-[inherit] bg-brand-card/40" />
        </>
      )}

      <Icon
        className={cn(
          "relative z-10 stroke-[2px]",
          spec.icon,
          accentClass,
          isWatermark
            ? "opacity-[0.12] text-brand-gold"
            : "drop-shadow-[0_0_10px_rgba(245,180,60,0.35)]"
        )}
        aria-hidden
      />
    </div>
  )
}
