import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/tuong", "Tướng"))
}

export { AdminHeroesPage as default } from "@/pages/AdminHeroesPage"
