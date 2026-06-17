import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/not-found", "Không tìm thấy"))
}

export { AdminNotFoundPage as default } from "@/pages/AdminNotFoundPage"
