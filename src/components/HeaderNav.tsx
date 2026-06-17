import * as React from "react"
import { NavLink, Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import { ChevronDown, isNavChildActive } from "@/config/nav"
import { useNavItems, type ResolvedNavItem } from "@/hooks/useNavItems"

const CLOSE_DELAY_MS = 150

type NavDropdownProps = {
  item: ResolvedNavItem
  isOpen: boolean
  onOpen: () => void
  onScheduleClose: () => void
  onCloseMenu: () => void
}

function NavDropdown({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCloseMenu,
}: NavDropdownProps) {
  const location = useLocation()
  const ref = React.useRef<HTMLDivElement>(null)
  const isChildActive = item.children?.some((c) => isNavChildActive(location.pathname, c.path)) ?? false

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onCloseMenu()
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onCloseMenu])

  if (!item.children) return null

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        onClick={() => (isOpen ? onCloseMenu() : onOpen())}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-lg transition-all border-b-2 border-transparent",
          isChildActive || isOpen
            ? "text-brand-gold border-brand-gold"
            : "text-brand-text-sub hover:text-white hover:bg-white/5"
        )}
      >
        {item.name}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 pt-1 z-50">
          <div className="min-w-[220px] rounded-xl border border-brand-border bg-brand-card shadow-2xl py-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {item.children.map((child) => (
              <Link
                key={child.path}
                to={child.path}
                prefetch="intent"
                onClick={onCloseMenu}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium transition-colors",
                  isNavChildActive(location.pathname, child.path)
                    ? "text-brand-gold bg-brand-gold/5"
                    : "text-brand-text-sub hover:text-white hover:bg-white/5"
                )}
              >
                <child.icon className="h-4 w-4 shrink-0" />
                {child.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

type HeaderNavProps = {
  onDropdownOpen?: () => void
}

export function HeaderNav({ onDropdownOpen }: HeaderNavProps) {
  const location = useLocation()
  const navItems = useNavItems()
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const handleCloseMenu = React.useCallback((labelKey: string) => {
    setOpenMenu((prev) => (prev === labelKey ? null : prev))
  }, [])

  const scheduleCloseMenu = React.useCallback(
    (labelKey: string) => {
      clearCloseTimer()
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null
        handleCloseMenu(labelKey)
      }, CLOSE_DELAY_MS)
    },
    [clearCloseTimer, handleCloseMenu]
  )

  const handleCloseAll = React.useCallback(() => {
    clearCloseTimer()
    setOpenMenu(null)
  }, [clearCloseTimer])

  React.useEffect(() => {
    clearCloseTimer()
    setOpenMenu(null)
  }, [location.pathname, clearCloseTimer])

  React.useEffect(() => {
    return () => clearCloseTimer()
  }, [clearCloseTimer])

  React.useEffect(() => {
    if (!openMenu) return

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") handleCloseAll()
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [openMenu, handleCloseAll])

  const handleOpen = (labelKey: string) => {
    clearCloseTimer()
    setOpenMenu(labelKey)
    onDropdownOpen?.()
  }

  return (
    <nav className="hidden xl:flex items-center gap-0.5 flex-shrink-0">
      {navItems.map((item) => {
        if (item.children) {
          return (
            <div key={item.labelKey}>
              <NavDropdown
                item={item}
                isOpen={openMenu === item.labelKey}
                onOpen={() => handleOpen(item.labelKey)}
                onScheduleClose={() => scheduleCloseMenu(item.labelKey)}
                onCloseMenu={() => handleCloseMenu(item.labelKey)}
              />
            </div>
          )
        }

        const isActive =
          item.path === "/"
            ? location.pathname === "/"
            : location.pathname === item.path || location.pathname.startsWith(item.path + "/")

        return (
          <NavLink
            key={item.path}
            to={item.path!}
            prefetch="intent"
            end={item.path === "/"}
            onMouseEnter={handleCloseAll}
            className={cn(
              "px-3 py-2 text-[13px] font-medium rounded-lg transition-all border-b-2",
              isActive
                ? "text-brand-gold border-brand-gold"
                : "text-brand-text-sub border-transparent hover:text-white hover:bg-white/5"
            )}
          >
            {item.name}
          </NavLink>
        )
      })}
    </nav>
  )
}
