import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/seo", "SEO"))
}

export { AdminSEOPage as default } from "@/pages/AdminSEOPage"
