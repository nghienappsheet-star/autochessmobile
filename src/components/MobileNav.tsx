import { NavLink, useLocation } from "react-router-dom"
import { LayoutDashboard, Settings, Home, Swords, FileText, MessageSquare } from "lucide-react"
import { cn } from "../lib/utils"
import { isMobileTabActive, type HubKey } from "@/config/nav"
import { useMobileTabItems } from "@/hooks/useNavItems"
import { useTranslation } from "react-i18next"

const ADMIN_ITEM_KEYS = [
  { labelKey: "adminOverview", path: "/admin", icon: LayoutDashboard },
  { labelKey: "heroes", path: "/admin/tuong", icon: Swords },
  { labelKey: "adminPosts", path: "/admin/bai-viet", icon: FileText },
  { labelKey: "adminComments", path: "/admin/binh-luan", icon: MessageSquare },
  { labelKey: "adminSettings", path: "/admin/cai-dat", icon: Settings },
  { labelKey: "backToHome", path: "/", icon: Home },
] as const

type MobileNavProps = {
  hideAt?: "lg" | "xl"
  onMenuOpen?: () => void
  isMenuOpen?: boolean
  onHubOpen?: (hubKey: HubKey) => void
  openHubKey?: HubKey | null
}

export function MobileNav({
  hideAt = "xl",
  onMenuOpen,
  isMenuOpen = false,
  onHubOpen,
  openHubKey = null,
}: MobileNavProps) {
  const location = useLocation()
  const { t } = useTranslation("nav")
  const mobileTabItems = useMobileTabItems()
  const isAdmin = location.pathname.startsWith("/admin")
  const hideClass = hideAt === "lg" ? "lg:hidden" : "xl:hidden"

  if (isAdmin) {
    return (
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 h-14 bg-brand-bg/90 backdrop-blur-xl border-t border-brand-border z-40 flex items-center justify-around px-1 safe-area-pb",
          hideClass
        )}
      >
        {ADMIN_ITEM_KEYS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/admin" || item.path === "/"}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
                isActive
                  ? "text-brand-gold bg-brand-gold/10"
                  : "text-brand-text-sub hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5 stroke-[2px] shrink-0" />
            <span className="text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1">
              {t(item.labelKey)}
            </span>
          </NavLink>
        ))}
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 h-14 bg-brand-bg/90 backdrop-blur-xl border-t border-brand-border z-40 flex items-center justify-around px-1 safe-area-pb",
        hideClass
      )}
    >
      {mobileTabItems.map((item) => {
        const active = isMobileTabActive(
          item,
          location.pathname,
          isMenuOpen,
          openHubKey
        )

        if (item.action === "menu") {
          return (
            <button
              key="menu"
              type="button"
              onClick={onMenuOpen}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
                active
                  ? "text-brand-gold bg-brand-gold/10"
                  : "text-brand-text-sub hover:text-white"
              )}
              aria-label={t("openMenuAria")}
              aria-expanded={isMenuOpen}
            >
              <item.icon className="h-5 w-5 stroke-[2px] shrink-0" />
              <span className="text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1">
                {item.name}
              </span>
            </button>
          )
        }

        if (item.action === "hub" && item.hubKey) {
          return (
            <button
              key={item.hubKey}
              type="button"
              onClick={() => onHubOpen?.(item.hubKey!)}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
                active
                  ? "text-brand-gold bg-brand-gold/10"
                  : "text-brand-text-sub hover:text-white"
              )}
              aria-label={item.name}
              aria-expanded={openHubKey === item.hubKey}
            >
              <item.icon className="h-5 w-5 stroke-[2px] shrink-0" />
              <span className="text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1">
                {item.name}
              </span>
            </button>
          )
        }

        return (
          <NavLink
            key={item.path}
            to={item.path!}
            end={item.exact}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 min-w-0 flex-1 h-full py-1 rounded-lg transition-all duration-200",
              active
                ? "text-brand-gold bg-brand-gold/10"
                : "text-brand-text-sub hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5 stroke-[2px] shrink-0" />
            <span className="text-[10px] font-medium tracking-tight text-center line-clamp-1 px-1">
              {item.name}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}
