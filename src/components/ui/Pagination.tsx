import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./core"
import { cn } from "@/lib/utils"

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | "ellipsis")[] = [1]

  if (current > 3) {
    pages.push("ellipsis")
  }

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (current < total - 2) {
    pages.push("ellipsis")
  }

  if (total > 1) {
    pages.push(total)
  }

  return pages
}

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <div className={cn("flex items-center gap-1.5 overflow-x-auto hide-scrollbar", className)}>
      <Button
        variant="ghost"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 w-9 p-0 hover:bg-white/5 rounded-lg text-brand-text-sub disabled:opacity-40 disabled:cursor-not-allowed text-white shrink-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="h-9 w-9 flex items-center justify-center text-brand-text-sub text-xs shrink-0"
          >
            …
          </span>
        ) : (
          <Button
            key={page}
            variant="ghost"
            onClick={() => onPageChange(page)}
            className={cn(
              "h-9 w-9 p-0 rounded-lg text-xs font-bold transition-all shrink-0",
              page === currentPage
                ? "bg-brand-gold/15 border border-brand-gold/20 text-brand-gold font-bold"
                : "hover:bg-white/5 text-brand-text-sub hover:text-white"
            )}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 w-9 p-0 hover:bg-white/5 rounded-lg text-brand-text-sub disabled:opacity-40 disabled:cursor-not-allowed text-white shrink-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
