import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/bai-viet/sua", "Sửa bài viết"))
}

export { PostEditorPage as default } from "@/pages/PostEditorPage"
