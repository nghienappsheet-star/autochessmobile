import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/cai-dat", "Cài đặt"))
}

export { AdminSettingsPage as default } from "@/pages/AdminSettingsPage"
