import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/trang-bi", "Trang bị"))
}

export { AdminItemsPage as default } from "@/pages/AdminItemsPage"
