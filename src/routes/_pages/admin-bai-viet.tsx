import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/bai-viet", "Bài viết"))
}

export { AdminPostsPage as default } from "@/pages/AdminPostsPage"
