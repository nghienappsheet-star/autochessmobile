import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/toc-he", "Tộc / Hệ"))
}

export { AdminTraitsPage as default } from "@/pages/AdminTraitsPage"
