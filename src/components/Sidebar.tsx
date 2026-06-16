import * as React from "react"
import { NavLink, Link } from "react-router-dom"
import { ShieldAlert, Search, BookOpen, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./ui/core"
import { useAuth } from "@/contexts/AuthContext"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, isNavChildActive } from "@/config/nav"
import { useNavItems, useSidebarSections, type ResolvedNavItem } from "@/hooks/useNavItems"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { useTranslation } from "react-i18next"

function DrawerSubmenu({
  item,
  isChildActive,
  onNavigate,
}: {
  item: ResolvedNavItem
  isChildActive: boolean
  onNavigate?: () => void
}) {
  const [isOpen, setIsOpen] = React.useState(isChildActive)

  React.useEffect(() => {
    if (isChildActive) setIsOpen(true)
  }, [isChildActive])

  if (!item.children) return null

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
          isChildActive ? "text-brand-gold" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
        )}
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4" />
          {item.name}
        </div>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4 space-y-0.5"
          >
            {item.children.map((child) => (
              <li key={child.path}>
                <NavLink
                  to={child.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                      isActive ? "text-brand-gold bg-brand-gold/5" : "text-brand-text-sub hover:text-white hover:bg-white/5"
                    )
                  }
                >
                  <child.icon className="h-3.5 w-3.5" />
                  {child.name}
                </NavLink>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavListItem({
  item,
  onClose,
}: {
  item: ResolvedNavItem
  onClose?: () => void
}) {
  const location = useLocation()
  const isChildActive = item.children?.some((c) => isNavChildActive(location.pathname, c.path)) ?? false

  if (item.children) {
    return <DrawerSubmenu item={item} isChildActive={isChildActive} onNavigate={onClose} />
  }

  return (
    <NavLink
      to={item.path!}
      end={item.path === "/"}
      onClick={onClose}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
          isActive ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
        )
      }
    >
      <item.icon className="h-4 w-4" />
      {item.name}
    </NavLink>
  )
}

/** Mobile/tablet drawer — desktop nav lives in Header */
export function Sidebar({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenInfo,
}: {
  isOpen?: boolean
  onClose?: () => void
  onOpenSearch?: () => void
  onOpenInfo?: () => void
}) {
  const { user, openLogin, openRegister } = useAuth()
  const { t } = useTranslation(["common", "nav", "auth"])
  const navItems = useNavItems()
  const sidebarSections = useSidebarSections()
  const strategyTips = t("common:strategyTipsSidebar", { returnObjects: true }) as string[]
  const tipIndex = React.useMemo(
    () => Math.floor(Math.random() * strategyTips.length),
    [isOpen, strategyTips.length]
  )

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[45] xl:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-[min(100vw-3rem,280px)] border-r border-brand-border bg-brand-bg flex flex-col z-50 transition-transform duration-300 xl:hidden safe-area-pt",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col justify-center h-14 sm:h-16 px-6 border-b border-brand-border">
          <Link to="/" onClick={onClose} className="font-bold text-lg tracking-tight leading-none">
            <span className="text-white">Auto</span>
            <span className="text-brand-gold">Chess</span>
            <span className="text-white text-[12px] ml-1">Mobile</span>
            <span className="text-brand-gold text-[12px]">.vn</span>
          </Link>
        </div>

        <div className="px-3 pt-3">
          <button
            type="button"
            onClick={() => {
              onClose?.()
              onOpenSearch?.()
            }}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-brand-card border border-brand-border text-brand-text-sub hover:text-white hover:border-white/10 transition-all text-left"
          >
            <Search className="h-4 w-4 shrink-0 text-brand-gold" />
            <span className="text-[13px] font-medium">{t("common:quickLookupPlaceholder")}</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar space-y-4">
          {sidebarSections.map((section) => {
            const sectionItems = navItems.filter((item) =>
              section.itemLabelKeys.includes(item.labelKey)
            )
            return (
              <div key={section.labelKey}>
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-text-sub">
                  {section.label}
                </p>
                <ul className="space-y-1">
                  {sectionItems.map((item) => (
                    <li key={item.labelKey}>
                      <NavListItem item={item} onClose={onClose} />
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div className="pt-2 border-t border-brand-border">
            <NavLink
              to="/admin"
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition-all",
                  isActive ? "bg-white/10 text-white" : "text-brand-text-sub hover:bg-white/5 hover:text-white"
                )
              }
            >
              <ShieldAlert className="h-4 w-4" />
              {t("nav:adminShort")}
            </NavLink>
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-card/50 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                {t("common:strategyTipsTitle")}
              </span>
              <Link
                to="/tuong"
                onClick={onClose}
                className="text-[10px] font-semibold text-brand-text-sub hover:text-brand-gold transition-colors"
              >
                {t("nav:libraryLink")}
              </Link>
            </div>
            <p className="text-[12px] text-brand-text-sub leading-relaxed">
              {strategyTips[tipIndex]}
            </p>
            <button
              type="button"
              onClick={() => {
                onClose?.()
                onOpenInfo?.()
              }}
              className="flex items-center gap-2 text-[12px] font-semibold text-brand-text-sub hover:text-white transition-colors"
            >
              <Info className="h-3.5 w-3.5 text-brand-gold" />
              {t("common:infoSupportShort")}
            </button>
            <Link
              to="/tuong"
              onClick={onClose}
              className="flex items-center gap-2 text-[12px] font-semibold text-brand-text-sub hover:text-white transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-brand-gold" />
              {t("nav:wikiGuide")}
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-brand-border space-y-3 safe-area-pb">
          <LanguageSwitcher size="md" className="w-full" />
          {!user && (
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={openLogin}
                className="w-full justify-center bg-brand-card-2 border-transparent text-brand-text-sub hover:text-white"
              >
                {t("auth:login")}
              </Button>
              <Button variant="default" onClick={openRegister} className="w-full justify-center">
                {t("auth:register")}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
