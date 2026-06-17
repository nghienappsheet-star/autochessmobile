import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/bang-xep-hang", "Bảng xếp hạng"))
}

export { AdminLeaderboardPage as default } from "@/pages/AdminLeaderboardPage"
