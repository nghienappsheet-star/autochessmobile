import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/binh-luan", "Bình luận"))
}

export { AdminCommentsPage as default } from "@/pages/AdminCommentsPage"
