import type { LucideIcon } from "lucide-react"
import {
  Home,
  LayoutGrid,
  BookOpen,
  Wrench,
  Trophy,
  Newspaper,
  UsersRound,
  Globe2,
  Layers,
  Activity,
  UserRound,
  Sparkles,
  Gem,
  Search,
  Target,
  GitCompareArrows,
  Scale,
  Menu,
  ChevronDown,
  Flame,
  Medal,
  PenSquare,
  MessagesSquare,
} from "lucide-react"

/** Top-level nav & page icons */
export const NAV_ICONS = {
  home: Home,
  comps: LayoutGrid,
  library: BookOpen,
  tools: Wrench,
  leaderboard: Trophy,
  blog: PenSquare,
  news: Newspaper,
  discussion: MessagesSquare,
  community: UsersRound,
  menu: Menu,
} as const satisfies Record<string, LucideIcon>

/** Wiki / library section — one distinct icon per category */
export const LIBRARY_ICONS = {
  comps: LayoutGrid,
  traits: Activity,
  races: Globe2,
  classes: Layers,
  heroes: UserRound,
  items: Sparkles,
  relics: Gem,
} as const satisfies Record<string, LucideIcon>

/** Tools hub — semantic match to each tool's purpose */
export const TOOL_ICONS = {
  toolsTeamBuilder: LayoutGrid,
  toolsCompFinder: Search,
  toolsBanAdvisor: Target,
  toolsHeroCompare: GitCompareArrows,
  toolsCompCompare: Scale,
} as const satisfies Record<string, LucideIcon>

export const LEADERBOARD_TAB_ICONS = {
  comps: LayoutGrid,
  contributors: Medal,
  heroes: Flame,
  players: Trophy,
} as const satisfies Record<string, LucideIcon>

const ICON_BY_LABEL: Record<string, LucideIcon> = {
  ...NAV_ICONS,
  ...LIBRARY_ICONS,
  ...TOOL_ICONS,
}

/** Resolve icon for a nav labelKey (e.g. heroes, toolsTeamBuilder, comps). */
export function getPageIcon(labelKey: string): LucideIcon | undefined {
  return ICON_BY_LABEL[labelKey]
}

/** Library wiki link path → nav labelKey */
export const LIBRARY_PATH_LABELS: Record<string, keyof typeof LIBRARY_ICONS> = {
  "/tuong": "heroes",
  "/trang-bi": "items",
  "/toc-he": "traits",
  "/di-vat": "relics",
}

export function getLibraryIconByPath(path: string): LucideIcon | undefined {
  const labelKey = LIBRARY_PATH_LABELS[path]
  return labelKey ? LIBRARY_ICONS[labelKey] : undefined
}

/** Wiki handbook dropdown (Header) — synced with library nav icons */
export const WIKI_DROPDOWN_LINKS = [
  {
    path: "/tuong",
    labelKey: "heroes" as const,
    titleKey: "wikiHeroes",
    descKey: "wikiHeroesDesc",
    accent: "bg-orange-500/10 border-orange-500/10 text-orange-400 group-hover:bg-orange-500/20",
  },
  {
    path: "/trang-bi",
    labelKey: "items" as const,
    titleKey: "wikiItems",
    descKey: "wikiItemsDesc",
    accent: "bg-brand-gold/10 border-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20",
  },
  {
    path: "/toc-he",
    labelKey: "traits" as const,
    titleKey: "wikiTraits",
    descKey: "wikiTraitsDesc",
    accent: "bg-brand-gold/10 border-brand-gold/10 text-brand-gold group-hover:bg-brand-gold/20",
  },
  {
    path: "/di-vat",
    labelKey: "relics" as const,
    titleKey: "wikiRelics",
    descKey: "wikiRelicsDesc",
    accent: "bg-purple-500/10 border-purple-500/10 text-purple-400 group-hover:bg-purple-500/20",
  },
] as const

/** Tool route slug → tools i18n list key (tools:list.*) */
export const TOOL_SLUG_TO_I18N: Record<string, string> = {
  "tao-doi-hinh": "teamBuilder",
  "tim-doi-hinh": "compFinder",
  "ban-advisor": "banAdvisor",
  "so-sanh-tuong": "heroCompare",
  "so-sanh-doi-hinh": "compCompare",
}

export { ChevronDown }
