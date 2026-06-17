import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/bao-cao", "Báo cáo"))
}

export { AdminReportsPage as default } from "@/pages/AdminReportsPage"
