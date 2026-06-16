import { isPostImageUrl } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"

type PostCardThumbProps = {
  coverImageUrl?: string
  imageToken?: string
  category: string
  className?: string
}

export function PostCardThumb({
  coverImageUrl,
  imageToken,
  category,
  className,
}: PostCardThumbProps) {
  if (coverImageUrl) {
    return (
      <div className={cn("h-40 w-full overflow-hidden bg-brand-card-2", className)}>
        <img
          src={coverImageUrl}
          alt=""
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </div>
    )
  }

  const tokenClass =
    imageToken && !isPostImageUrl(imageToken) ? imageToken : "bg-brand-card-2"

  return (
    <div
      className={cn(
        "h-40 w-full flex items-center justify-center relative overflow-hidden",
        tokenClass,
        className
      )}
    >
      <span className="text-brand-text-sub/30 font-bold text-lg tracking-tight">{category}</span>
    </div>
  )
}
