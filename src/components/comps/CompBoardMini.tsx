import * as React from "react"
import { cn } from "@/lib/utils"
import { heroCostBarClass } from "@/lib/cost-colors"
import { getHeroIconUrl } from "@/lib/hero-utils"
import { BOARD_COLS, BOARD_ROWS, BOARD_ROW_LABELS } from "@/lib/comp-formation"
import { CompHeroChip } from "@/components/comps/CompHeroChip"
import type { Hero } from "@/types/domain"

type CompBoardMiniProps = {
  board: (string | null)[]
  heroes: Hero[]
  size?: "compact" | "full"
  showRowLabels?: boolean
  className?: string
}

const CELL_SIZE = {
  compact: "w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]",
  full: "w-full aspect-square min-w-[28px]",
} as const

function BoardCellHero({
  hero,
  compact,
}: {
  hero: Hero
  compact: boolean
}) {
  const [failed, setFailed] = React.useState(false)
  const src = getHeroIconUrl(hero)

  React.useEffect(() => {
    setFailed(false)
  }, [src, hero.id])

  if (compact) {
    return (
      <div className="absolute inset-px sm:inset-0.5 rounded bg-brand-bg border border-brand-border overflow-hidden flex items-center justify-center">
        {src && !failed ? (
          <img
            src={src}
            alt={hero.name}
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span className="text-[7px] sm:text-[8px] font-bold text-brand-text-sub uppercase leading-none">
            {hero.name.substring(0, 2)}
          </span>
        )}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 h-0.5",
            heroCostBarClass(hero.cost)
          )}
        />
      </div>
    )
  }

  return (
    <div className="absolute inset-1 flex items-center justify-center">
      <CompHeroChip hero={hero} size="sm" className="w-full h-full" linkable={false} />
    </div>
  )
}

export function CompBoardMini({
  board,
  heroes,
  size = "compact",
  showRowLabels = false,
  className,
}: CompBoardMiniProps) {
  const heroMap = new Map(heroes.map((h) => [h.id, h]))
  const gap = size === "compact" ? "gap-0.5 sm:gap-1" : "gap-1 md:gap-2"
  const labelWidth = showRowLabels ? "w-16 sm:w-20 shrink-0" : ""

  return (
    <div className={cn("flex flex-col", gap, className)}>
      {Array.from({ length: BOARD_ROWS }).map((_, row) => (
        <div key={row} className="flex items-center gap-2">
          {showRowLabels && (
            <div
              className={cn(
                labelWidth,
                "text-[9px] sm:text-[10px] font-semibold text-brand-text-sub leading-tight"
              )}
            >
              {BOARD_ROW_LABELS[row]}
            </div>
          )}
          <div className={cn("grid grid-cols-8 flex-1", gap)}>
            {Array.from({ length: BOARD_COLS }).map((_, col) => {
              const index = row * BOARD_COLS + col
              const heroId = board[index]
              const hero = heroId ? heroMap.get(heroId) : undefined
              const isLight = (row + col) % 2 === 0

              return (
                <div
                  key={index}
                  className={cn(
                    CELL_SIZE[size],
                    "rounded-md relative flex items-center justify-center border border-transparent",
                    isLight ? "bg-brand-card-2" : "bg-brand-card",
                    size === "full" && "rounded-lg hover:border-white/10",
                    !hero && size === "compact" && "opacity-60"
                  )}
                >
                  {hero ? <BoardCellHero hero={hero} compact={size === "compact"} /> : null}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
