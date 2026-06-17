import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin", "Tổng quan"))
}

export { AdminPage as default } from "@/pages/AdminPage"
