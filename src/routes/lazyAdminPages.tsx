import { lazy, type ComponentType } from "react"

function lazyNamed<T extends ComponentType<unknown>>(
  factory: () => Promise<{ [key: string]: T }>,
  exportName: string
) {
  return lazy(() => factory().then((module) => ({ default: module[exportName] as T })))
}

export const AdminPage = lazyNamed(() => import("@/pages/AdminPage"), "AdminPage")
export const AdminUsersPage = lazyNamed(() => import("@/pages/AdminUsersPage"), "AdminUsersPage")
export const AdminItemsPage = lazyNamed(() => import("@/pages/AdminItemsPage"), "AdminItemsPage")
export const AdminHeroesPage = lazyNamed(() => import("@/pages/AdminHeroesPage"), "AdminHeroesPage")
export const AdminHeroEditorPage = lazyNamed(
  () => import("@/pages/AdminHeroEditorPage"),
  "AdminHeroEditorPage"
)
export const AdminCompsPage = lazyNamed(() => import("@/pages/AdminCompsPage"), "AdminCompsPage")
export const AdminTraitsPage = lazyNamed(() => import("@/pages/AdminTraitsPage"), "AdminTraitsPage")
export const AdminPostsPage = lazyNamed(() => import("@/pages/AdminPostsPage"), "AdminPostsPage")
export const AdminBannersPage = lazyNamed(() => import("@/pages/AdminBannersPage"), "AdminBannersPage")
export const AdminRelicsPage = lazyNamed(() => import("@/pages/AdminRelicsPage"), "AdminRelicsPage")
export const AdminSettingsPage = lazyNamed(() => import("@/pages/AdminSettingsPage"), "AdminSettingsPage")
export const AdminSEOPage = lazyNamed(() => import("@/pages/AdminSEOPage"), "AdminSEOPage")
export const AdminReportsPage = lazyNamed(() => import("@/pages/AdminReportsPage"), "AdminReportsPage")
export const AdminRolesPage = lazyNamed(() => import("@/pages/AdminRolesPage"), "AdminRolesPage")
export const AdminCommentsPage = lazyNamed(() => import("@/pages/AdminCommentsPage"), "AdminCommentsPage")
export const AdminLeaderboardPage = lazyNamed(
  () => import("@/pages/AdminLeaderboardPage"),
  "AdminLeaderboardPage"
)
export const AdminNewsPage = lazyNamed(() => import("@/pages/AdminNewsPage"), "AdminNewsPage")
export const AdminEventsPage = lazyNamed(() => import("@/pages/AdminEventsPage"), "AdminEventsPage")
export const AdminMediaPage = lazyNamed(() => import("@/pages/AdminMediaPage"), "AdminMediaPage")
export const AdminNotFoundPage = lazyNamed(() => import("@/pages/AdminNotFoundPage"), "AdminNotFoundPage")
export const AdminTeamPage = lazyNamed(() => import("@/pages/AdminTeamPage"), "AdminTeamPage")
export const AdminChannelsPage = lazyNamed(() => import("@/pages/AdminChannelsPage"), "AdminChannelsPage")
export const PostEditorPage = lazyNamed(() => import("@/pages/PostEditorPage"), "PostEditorPage")
