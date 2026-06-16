import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

type BreadcrumbItem = {
  label: string
  href?: string
}

type DetailBreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function DetailBreadcrumb({ items, className }: DetailBreadcrumbProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && <span className="w-1 h-1 bg-brand-border rounded-full" aria-hidden />}
            {item.href && !isLast ? (
              <Link to={item.href} className="hover:text-brand-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "text-brand-gold" : undefined}>{item.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
