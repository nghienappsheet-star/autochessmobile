import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/doi-hinh", "Đội hình"))
}

export { AdminCompsPage as default } from "@/pages/AdminCompsPage"
