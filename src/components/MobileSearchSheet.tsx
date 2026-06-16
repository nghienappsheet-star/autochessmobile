import * as React from "react"
import { Link } from "react-router-dom"
import { Search, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
} from "./ui/core"
import { getQuickSearchLinks } from "@/config/nav"
import { cn } from "@/lib/utils"
import { useTranslation } from "react-i18next"

type MobileSearchSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileSearchSheet({ open, onOpenChange }: MobileSearchSheetProps) {
  const [query, setQuery] = React.useState("")
  const { t, i18n } = useTranslation(["common", "nav"])
  const links = React.useMemo(
    () =>
      getQuickSearchLinks().map((link) => ({
        ...link,
        name: t(`nav:${link.labelKey}`),
      })),
    [t, i18n.language]
  )

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return links
    return links.filter(
      (link) =>
        link.name.toLowerCase().includes(q) ||
        link.path.toLowerCase().includes(q)
    )
  }, [links, query])

  React.useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-md border border-brand-border bg-brand-card p-5 sm:p-6 rounded-xl gap-4">
        <DialogHeader className="space-y-3 text-left">
          <DialogTitle className="text-lg font-bold tracking-tight text-white">
            {t("common:quickLookupTitle")}
          </DialogTitle>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("common:searchPlaceholderExtended")}
              className="w-full bg-brand-card-2 border-brand-border pl-9 h-10 text-[13px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30"
              autoFocus
            />
          </div>
        </DialogHeader>
        <ul className="max-h-[50vh] overflow-y-auto custom-scrollbar -mx-1 space-y-0.5">
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-[13px] text-brand-text-sub">
              {t("common:noResults")}
            </li>
          ) : (
            filtered.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all",
                    "text-brand-text-sub hover:text-white hover:bg-white/5"
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <link.icon className="h-4 w-4 shrink-0 text-brand-gold/80" />
                    <span className="truncate">{link.name}</span>
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50" />
                </Link>
              </li>
            ))
          )}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
