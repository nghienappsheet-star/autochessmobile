import { staticRouteMeta } from "@/lib/seo/meta"

export function meta() {
  return staticRouteMeta("/")
}

export { HomePage as default } from "@/pages/HomePage"
