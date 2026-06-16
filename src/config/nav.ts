import type { LucideIcon } from "lucide-react"
import {
  NAV_ICONS,
  LIBRARY_ICONS,
  TOOL_ICONS,
  ChevronDown,
} from "@/config/icons"

export type NavChild = {
  labelKey: string
  path: string
  icon: LucideIcon
}

export type NavItem = {
  labelKey: string
  path?: string
  icon: LucideIcon
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: "home", path: "/", icon: NAV_ICONS.home },
  {
    labelKey: "library",
    icon: NAV_ICONS.library,
    children: [
      { labelKey: "comps", path: "/doi-hinh", icon: LIBRARY_ICONS.comps },
      { labelKey: "traits", path: "/toc-he", icon: LIBRARY_ICONS.traits },
      { labelKey: "heroes", path: "/tuong", icon: LIBRARY_ICONS.heroes },
      { labelKey: "items", path: "/trang-bi", icon: LIBRARY_ICONS.items },
      { labelKey: "relics", path: "/di-vat", icon: LIBRARY_ICONS.relics },
    ],
  },
  {
    labelKey: "tools",
    icon: NAV_ICONS.tools,
    children: [
      { labelKey: "toolsTeamBuilder", path: "/cong-cu/tao-doi-hinh", icon: TOOL_ICONS.toolsTeamBuilder },
      { labelKey: "toolsBanAdvisor", path: "/cong-cu/ban-advisor", icon: TOOL_ICONS.toolsBanAdvisor },
      { labelKey: "toolsCompFinder", path: "/cong-cu/tim-doi-hinh", icon: TOOL_ICONS.toolsCompFinder },
      { labelKey: "toolsHeroCompare", path: "/cong-cu/so-sanh-tuong", icon: TOOL_ICONS.toolsHeroCompare },
      { labelKey: "toolsCompCompare", path: "/cong-cu/so-sanh-doi-hinh", icon: TOOL_ICONS.toolsCompCompare },
    ],
  },
  { labelKey: "leaderboard", path: "/bang-xep-hang", icon: NAV_ICONS.leaderboard },
  {
    labelKey: "blog",
    icon: NAV_ICONS.blog,
    children: [
      { labelKey: "news", path: "/tin-tuc", icon: NAV_ICONS.news },
      { labelKey: "discussion", path: "/thao-luan", icon: NAV_ICONS.discussion },
    ],
  },
  { labelKey: "community", path: "/cong-dong", icon: NAV_ICONS.community },
]

export const LIBRARY_PATHS = ["/doi-hinh", "/tuong", "/trang-bi", "/toc-he", "/di-vat"]

export const BLOG_PATHS = ["/tin-tuc", "/thao-luan"]

export type HubKey = "tools" | "library" | "blog"

export type MobileTabItem = {
  labelKey: string
  icon: LucideIcon
  path?: string
  action?: "menu" | "hub"
  hubKey?: HubKey
  matchPaths?: string[]
  matchPrefix?: string
  exact?: boolean
}

export const MOBILE_TAB_ITEMS: MobileTabItem[] = [
  { labelKey: "home", path: "/", icon: NAV_ICONS.home, exact: true },
  { labelKey: "library", icon: NAV_ICONS.library, action: "hub", hubKey: "library", matchPaths: LIBRARY_PATHS },
  { labelKey: "tools", icon: NAV_ICONS.tools, action: "hub", hubKey: "tools", matchPrefix: "/cong-cu" },
  { labelKey: "blog", icon: NAV_ICONS.blog, action: "hub", hubKey: "blog", matchPaths: BLOG_PATHS },
  { labelKey: "menu", icon: NAV_ICONS.menu, action: "menu" },
]

const HUB_NAV_KEYS: Record<HubKey, string> = {
  tools: "tools",
  library: "library",
  blog: "blog",
}

export function getHubItems(hubKey: HubKey): NavChild[] {
  const navItem = NAV_ITEMS.find((item) => item.labelKey === HUB_NAV_KEYS[hubKey])
  return navItem?.children ?? []
}

export function getToolNavChildren(): NavChild[] {
  return getHubItems("tools")
}

export function isHubPathActive(hubKey: HubKey, pathname: string): boolean {
  if (hubKey === "tools") {
    return pathname === "/cong-cu" || pathname.startsWith("/cong-cu/")
  }
  if (hubKey === "blog") {
    return BLOG_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
  }
  return LIBRARY_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}

export function isNavChildActive(pathname: string, childPath: string): boolean {
  return pathname === childPath || pathname.startsWith(`${childPath}/`)
}

export type SidebarSection = {
  labelKey: string
  itemLabelKeys: string[]
}

export const SIDEBAR_SECTIONS: SidebarSection[] = [
  { labelKey: "sidebarSectionLookup", itemLabelKeys: ["home", "library"] },
  { labelKey: "sidebarSectionTools", itemLabelKeys: ["tools"] },
  { labelKey: "sidebarSectionNewsCommunity", itemLabelKeys: ["leaderboard", "blog", "community"] },
]

export function isMobileTabActive(
  item: MobileTabItem,
  pathname: string,
  isMenuOpen = false,
  openHubKey: HubKey | null = null
): boolean {
  if (item.action === "menu") return isMenuOpen
  if (item.action === "hub" && item.hubKey) {
    return openHubKey === item.hubKey || isHubPathActive(item.hubKey, pathname)
  }
  if (!item.path) return false
  if (item.exact) return pathname === item.path
  if (item.matchPrefix) {
    return pathname === item.matchPrefix || pathname.startsWith(`${item.matchPrefix}/`)
  }
  if (item.matchPaths) {
    return item.matchPaths.some(
      (p) => pathname === p || pathname.startsWith(`${p}/`)
    )
  }
  return pathname === item.path || pathname.startsWith(`${item.path}/`)
}

export function getQuickSearchLinks(): NavChild[] {
  const links: NavChild[] = []
  for (const item of NAV_ITEMS) {
    if (item.path) {
      links.push({ labelKey: item.labelKey, path: item.path, icon: item.icon })
    }
    if (item.children) {
      links.push(...item.children)
    }
  }
  return links
}

export const FOOTER_LIBRARY_LINKS: Pick<NavChild, "labelKey" | "path">[] = [
  { labelKey: "comps", path: "/doi-hinh" },
  { labelKey: "traits", path: "/toc-he" },
  { labelKey: "heroes", path: "/tuong" },
  { labelKey: "items", path: "/trang-bi" },
  { labelKey: "relics", path: "/di-vat" },
]

export const FOOTER_TOOL_LINKS: Pick<NavChild, "labelKey" | "path">[] = [
  { labelKey: "toolsTeamBuilder", path: "/cong-cu/tao-doi-hinh" },
  { labelKey: "toolsCompFinder", path: "/cong-cu/tim-doi-hinh" },
  { labelKey: "toolsHeroCompare", path: "/cong-cu/so-sanh-tuong" },
]

export const FOOTER_EXPLORE_LINKS: Pick<NavItem, "labelKey" | "path">[] = [
  { labelKey: "leaderboard", path: "/bang-xep-hang" },
  { labelKey: "news", path: "/tin-tuc" },
  { labelKey: "discussion", path: "/thao-luan" },
  { labelKey: "community", path: "/cong-dong" },
]

export const FOOTER_MOBILE_QUICK_LINKS: Pick<NavItem, "labelKey" | "path">[] = [
  { labelKey: "news", path: "/tin-tuc" },
  { labelKey: "leaderboard", path: "/bang-xep-hang" },
  { labelKey: "discussion", path: "/thao-luan" },
  { labelKey: "community", path: "/cong-dong" },
]

export { ChevronDown }
