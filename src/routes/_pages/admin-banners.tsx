import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/banners", "Banners"))
}

export { AdminBannersPage as default } from "@/pages/AdminBannersPage"
