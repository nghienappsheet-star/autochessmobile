import { buildPageMeta } from "@/lib/seo/meta"
import { adminStaticMeta } from "@/lib/seo/loaders"

export function meta() {
  return buildPageMeta(adminStaticMeta("/admin/kenh-cong-dong", "Kênh cộng đồng"))
}

export { AdminChannelsPage as default } from "@/pages/AdminChannelsPage"
