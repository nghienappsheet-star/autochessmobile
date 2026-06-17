import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/doi-ngu", "Đội ngũ"))
}

export { AdminTeamPage as default } from "@/pages/AdminTeamPage"
