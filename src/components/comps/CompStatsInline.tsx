import { ThumbsUp } from "lucide-react"
import { Badge } from "@/components/ui/core"
import { cn } from "@/lib/utils"

type CompStatsInlineProps = {
  likes: string
  winRate: string
  top4Rate?: string
  votesLabel?: string
  top1Label?: string
  top4Label?: string
  tier?: string
  tierLabel?: string
  layout?: "stacked" | "row" | "grid" | "sidebar" | "inline"
  className?: string
}

export function CompStatsInline({
  likes,
  winRate,
  top4Rate = "62.7%",
  votesLabel = "Bình chọn",
  top1Label = "Top 1",
  top4Label = "Top 4",
  tier,
  tierLabel,
  layout = "stacked",
  className,
}: CompStatsInlineProps) {
  if (layout === "grid") {
    return (
      <div className={cn("grid grid-cols-3 gap-2 pt-4 border-t border-brand-border", className)}>
        <div className="col-span-1 text-left flex flex-col justify-center">
          <div className="flex items-center text-brand-gold font-semibold text-[13px] mb-1">
            <ThumbsUp className="w-3.5 h-3.5 mr-1.5" /> {likes}
          </div>
          {tier ? (
            <Badge
              variant={
                tier === "S"
                  ? "tier-s"
                  : tier === "A"
                    ? "tier-a"
                    : tier === "B"
                      ? "tier-b"
                      : "tier-c"
              }
              className="w-fit font-bold"
            >
              {tier} {tierLabel}
            </Badge>
          ) : (
            <span className="text-[10px] text-brand-text-sub font-normal">{votesLabel}</span>
          )}
        </div>
        <div className="col-span-1 text-center border-l flex flex-col justify-center border-brand-border">
          <span className="block text-[15px] font-bold text-white leading-none mb-1">{winRate}</span>
          <span className="block text-[11px] text-brand-text-sub font-normal">{top1Label}</span>
        </div>
        <div className="col-span-1 text-center border-l flex flex-col justify-center border-brand-border">
          <span className="block text-[15px] font-bold text-white leading-none mb-1">{top4Rate}</span>
          <span className="block text-[11px] text-brand-text-sub font-normal">{top4Label}</span>
        </div>
      </div>
    )
  }

  if (layout === "inline") {
    return (
      <div className={cn("flex items-center gap-2 shrink-0", className)}>
        <span
          title={votesLabel}
          className="flex items-center gap-1 text-brand-gold font-bold text-[12px] leading-none"
        >
          <ThumbsUp className="w-3 h-3 fill-brand-gold shrink-0" />
          {likes}
        </span>
        <span className="text-brand-border text-[12px] leading-none">·</span>
        <span title={top1Label} className="text-brand-text-main font-bold text-[12px] leading-none">
          {winRate}
        </span>
      </div>
    )
  }

  if (layout === "sidebar") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-2.5 w-full", className)}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 text-brand-gold font-bold text-[13px] leading-none mb-0.5">
            <ThumbsUp className="w-3.5 h-3.5 fill-brand-gold shrink-0" />
            {likes}
          </div>
          <div className="text-[9px] text-brand-text-sub uppercase font-bold tracking-wider">{votesLabel}</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-bold text-white leading-none mb-0.5">{winRate}</div>
          <div className="text-[9px] text-brand-text-sub uppercase font-bold tracking-wider">{top1Label}</div>
        </div>
      </div>
    )
  }

  if (layout === "row") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-6 md:flex-col md:justify-center md:gap-4",
          className
        )}
      >
        <StatBlock value={likes} label={votesLabel} icon />
        <StatBlock value={winRate} label={top1Label} />
        <StatBlock value={top4Rate} label={top4Label} />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 md:pl-6 md:border-l border-brand-border",
        className
      )}
    >
      <StatBlock value={likes} label={votesLabel} icon centered />
      <StatBlock value={winRate} label={top1Label} centered />
    </div>
  )
}

function StatBlock({
  value,
  label,
  icon,
  centered,
}: {
  value: string
  label: string
  icon?: boolean
  centered?: boolean
}) {
  return (
    <div className={cn("text-center", centered && "w-full")}>
      <div
        className={cn(
          "mb-1 font-bold leading-none",
          icon ? "flex justify-center items-center gap-2 text-brand-gold text-lg" : "text-xl text-white"
        )}
      >
        {icon && <ThumbsUp className="w-4 h-4 fill-brand-gold" />}
        {value}
      </div>
      <div className="text-[10px] text-brand-text-sub uppercase font-bold tracking-widest">{label}</div>
    </div>
  )
}
