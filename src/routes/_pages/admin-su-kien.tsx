import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/su-kien", "Sự kiện"))
}

export { AdminEventsPage as default } from "@/pages/AdminEventsPage"
