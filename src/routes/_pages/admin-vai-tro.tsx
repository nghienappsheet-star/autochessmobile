import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/vai-tro", "Vai trò & Phân quyền"))
}

export { AdminRolesPage as default } from "@/pages/AdminRolesPage"
