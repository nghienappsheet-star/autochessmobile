import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/di-vat", "Dị vật"))
}

export { AdminRelicsPage as default } from "@/pages/AdminRelicsPage"
