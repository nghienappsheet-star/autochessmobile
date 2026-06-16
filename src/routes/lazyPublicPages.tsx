import { lazy, type ComponentType } from "react"

function lazyNamed<T extends ComponentType<unknown>>(
  factory: () => Promise<{ [key: string]: T }>,
  exportName: string
) {
  return lazy(() => factory().then((module) => ({ default: module[exportName] as T })))
}

export const HomePage = lazyNamed(() => import("@/pages/HomePage"), "HomePage")
export const CompDetailPage = lazyNamed(() => import("@/pages/CompDetailPage"), "CompDetailPage")
export const CompsListPage = lazyNamed(() => import("@/pages/CompsListPage"), "CompsListPage")
export const HeroesPage = lazyNamed(() => import("@/pages/HeroesPage"), "HeroesPage")
export const HeroDetailPage = lazyNamed(() => import("@/pages/HeroDetailPage"), "HeroDetailPage")
export const ItemsPage = lazyNamed(() => import("@/pages/ItemsPage"), "ItemsPage")
export const ItemDetailPage = lazyNamed(() => import("@/pages/ItemDetailPage"), "ItemDetailPage")
export const RelicsPage = lazyNamed(() => import("@/pages/RelicsPage"), "RelicsPage")
export const RelicDetailPage = lazyNamed(() => import("@/pages/RelicDetailPage"), "RelicDetailPage")
export const TraitsPage = lazyNamed(() => import("@/pages/TraitsPage"), "TraitsPage")
export const TraitDetailPage = lazyNamed(() => import("@/pages/TraitDetailPage"), "TraitDetailPage")
export const ToolsPage = lazyNamed(() => import("@/pages/ToolsPage"), "ToolsPage")
export const NewsPage = lazyNamed(() => import("@/pages/NewsPage"), "NewsPage")
export const NewsDetailPage = lazyNamed(() => import("@/pages/NewsDetailPage"), "NewsDetailPage")
export const LeaderboardPage = lazyNamed(() => import("@/pages/LeaderboardPage"), "LeaderboardPage")
export const CommunityPage = lazyNamed(() => import("@/pages/CommunityPage"), "CommunityPage")
export const CommunityDetailPage = lazyNamed(
  () => import("@/pages/CommunityDetailPage"),
  "CommunityDetailPage"
)
export const CommunityHubPage = lazyNamed(() => import("@/pages/CommunityHubPage"), "CommunityHubPage")
export const CommunityComposerPage = lazyNamed(
  () => import("@/pages/CommunityComposerPage"),
  "CommunityComposerPage"
)
export const ProfilePage = lazyNamed(() => import("@/pages/ProfilePage"), "ProfilePage")
