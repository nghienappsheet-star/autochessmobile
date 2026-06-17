import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/media", "Media"))
}

export { AdminMediaPage as default } from "@/pages/AdminMediaPage"
