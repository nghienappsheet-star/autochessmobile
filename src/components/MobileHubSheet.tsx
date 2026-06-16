import * as React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "@/components/motion/MotionProvider"
import { ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { HubKey } from "@/config/nav"
import { useNavItems } from "@/hooks/useNavItems"
import { useTranslation } from "react-i18next"

const TOOL_PATH_KEYS: Record<string, string> = {
  "/cong-cu/tao-doi-hinh": "teamBuilder",
  "/cong-cu/tim-doi-hinh": "compFinder",
  "/cong-cu/ban-advisor": "banAdvisor",
  "/cong-cu/so-sanh-tuong": "heroCompare",
  "/cong-cu/so-sanh-doi-hinh": "compCompare",
}

const LIBRARY_PATH_KEYS: Record<string, string> = {
  "/toc-he": "traits",
  "/tuong": "heroes",
  "/trang-bi": "items",
  "/di-vat": "relics",
}

const BLOG_PATH_KEYS: Record<string, string> = {
  "/tin-tuc": "news",
  "/thao-luan": "discussion",
}

type MobileHubSheetProps = {
  hubKey: HubKey | null
  onClose: () => void
}

export function MobileHubSheet({ hubKey, onClose }: MobileHubSheetProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation(["nav", "tools", "common"])
  const navItems = useNavItems()
  const open = hubKey !== null

  const hubNavItem = hubKey
    ? navItems.find((item) => item.labelKey === hubKey)
    : undefined
  const items = hubNavItem?.children ?? []

  const getDescription = (path: string) => {
    if (hubKey === "tools") {
      const key = TOOL_PATH_KEYS[path]
      return key ? t(`tools:hubDesc.${key}`) : undefined
    }
    if (hubKey === "blog") {
      const key = BLOG_PATH_KEYS[path]
      return key ? t(`nav:hubDesc.${key}`) : undefined
    }
    const key = LIBRARY_PATH_KEYS[path]
    return key ? t(`nav:hubDesc.${key}`) : undefined
  }

  const hubTitleKey =
    hubKey === "tools"
      ? "pickTool"
      : hubKey === "blog"
        ? "pickBlogItem"
        : "pickLibraryItem"

  const handleSelect = (path: string) => {
    onClose()
    if (location.pathname !== path) {
      navigate(path)
    }
  }

  return (
    <AnimatePresence>
      {open && hubKey && (
        <>
          <motion.button
            type="button"
            aria-label={t("common:closeAria")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm xl:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed left-0 right-0 bottom-14 z-[50] xl:hidden max-h-[70vh] flex flex-col rounded-t-xl border border-brand-border border-b-0 bg-brand-card shadow-2xl safe-area-pb"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-brand-border shrink-0">
              <h2 className="text-[15px] font-bold text-white tracking-tight">
                {t(`nav:${hubTitleKey}`)}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-brand-card-2 border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white transition-colors"
                aria-label={t("common:closeAria")}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="overflow-y-auto custom-scrollbar p-2 space-y-0.5">
              {items.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  location.pathname.startsWith(`${item.path}/`)
                const desc = getDescription(item.path)

                return (
                  <li key={item.path}>
                    <button
                      type="button"
                      onClick={() => handleSelect(item.path)}
                      className={cn(
                        "w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg text-left transition-all",
                        isActive
                          ? "bg-brand-gold/10 text-brand-gold"
                          : "text-brand-text-sub hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span
                          className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border",
                            isActive
                              ? "bg-brand-gold/15 border-brand-gold/25 text-brand-gold"
                              : "bg-brand-card-2 border-brand-border text-brand-text-sub"
                          )}
                        >
                          <item.icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13px] font-semibold truncate">
                            {item.name}
                          </span>
                          {desc && (
                            <span className="block text-[11px] text-brand-text-sub mt-0.5 line-clamp-1">
                              {desc}
                            </span>
                          )}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-40" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
