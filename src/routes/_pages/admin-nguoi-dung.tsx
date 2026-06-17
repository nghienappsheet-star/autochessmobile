import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/nguoi-dung", "Người dùng"))
}

export { AdminUsersPage as default } from "@/pages/AdminUsersPage"
