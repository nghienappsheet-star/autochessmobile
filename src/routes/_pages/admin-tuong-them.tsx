import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/tuong/them", "Thêm tướng"))
}

export { AdminHeroEditorPage as default } from "@/pages/AdminHeroEditorPage"
