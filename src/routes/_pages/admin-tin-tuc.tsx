import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/tin-tuc", "Tin tức"))
}

export { AdminNewsPage as default } from "@/pages/AdminNewsPage"
