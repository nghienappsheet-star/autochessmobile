import { pageTitle, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site"

export type PageMetaInput = {
  path: string
  title: string
  description: string
  image?: string
  type?: "website" | "article"
}

export function resolveOgImage(image?: string): string {
  if (!image?.trim()) return `${SITE_URL}/icons/pwa-512x512.png`
  const value = image.trim()
  if (value.startsWith("http://") || value.startsWith("https://")) return value
  if (value.startsWith("/")) return `${SITE_URL}${value}`
  return `${SITE_URL}/icons/pwa-512x512.png`
}

export function buildPageMeta({
  path,
  title,
  description,
  image,
  type = "website",
}: PageMetaInput) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
  const ogImage = resolveOgImage(image)

  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: type },
    { property: "og:locale", content: "vi_VN" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: ogImage },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "vi" },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "en" },
    { tagName: "link", rel: "alternate", href: url, hrefLang: "x-default" },
  ]
}

export function staticRouteMeta(path: string) {
  const config = STATIC_ROUTE_META[path]
  if (!config) {
    return buildPageMeta({
      path,
      title: pageTitle(),
      description: SITE_DESCRIPTION,
    })
  }
  return buildPageMeta(config)
}

export const STATIC_ROUTE_META: Record<string, PageMetaInput> = {
  "/": {
    path: "/",
    title: pageTitle(),
    description: SITE_DESCRIPTION,
  },
  "/doi-hinh": {
    path: "/doi-hinh",
    title: pageTitle("Đội hình"),
    description: "Danh sách đội hình meta tier S–C cho Auto Chess Mobile VN.",
  },
  "/toc-he": {
    path: "/toc-he",
    title: pageTitle("Tộc / Hệ"),
    description: "Tra cứu synergy tộc và hệ tướng, mốc kích hoạt Auto Chess Mobile VN.",
  },
  "/tuong": {
    path: "/tuong",
    title: pageTitle("Tướng"),
    description: "Cơ sở dữ liệu tướng Auto Chess Mobile VN — chỉ số, kỹ năng và meta.",
  },
  "/trang-bi": {
    path: "/trang-bi",
    title: pageTitle("Trang bị"),
    description: "Thư viện trang bị Auto Chess Mobile VN — hiệu ứng và gợi ý carry.",
  },
  "/di-vat": {
    path: "/di-vat",
    title: pageTitle("Dị vật"),
    description: "Tra cứu dị vật và hiệu ứng đặc biệt trong Auto Chess Mobile VN.",
  },
  "/cong-cu": {
    path: "/cong-cu",
    title: pageTitle("Công cụ"),
    description: "Bộ công cụ chiến thuật: tạo đội hình, so sánh tướng, ban tộc hệ.",
  },
  "/cong-cu/tao-doi-hinh": {
    path: "/cong-cu/tao-doi-hinh",
    title: pageTitle("Tạo đội hình"),
    description: "Công cụ tạo và chia sẻ đội hình Auto Chess Mobile VN.",
  },
  "/cong-cu/tim-doi-hinh": {
    path: "/cong-cu/tim-doi-hinh",
    title: pageTitle("Tìm đội hình"),
    description: "Gợi ý đội hình phù hợp meta hiện tại.",
  },
  "/cong-cu/ban-advisor": {
    path: "/cong-cu/ban-advisor",
    title: pageTitle("Ban tộc hệ"),
    description: "Tư vấn ban tộc/hệ theo lobby và meta.",
  },
  "/cong-cu/so-sanh-tuong": {
    path: "/cong-cu/so-sanh-tuong",
    title: pageTitle("So sánh tướng"),
    description: "So sánh chỉ số và kỹ năng giữa các tướng.",
  },
  "/cong-cu/so-sanh-doi-hinh": {
    path: "/cong-cu/so-sanh-doi-hinh",
    title: pageTitle("So sánh đội hình"),
    description: "So sánh sức mạnh và synergy giữa các đội hình.",
  },
  "/tin-tuc": {
    path: "/tin-tuc",
    title: pageTitle("Tin tức"),
    description: "Tin tức, hướng dẫn và cập nhật meta Auto Chess Mobile VN.",
  },
  "/thao-luan": {
    path: "/thao-luan",
    title: pageTitle("Thảo luận"),
    description: "Thảo luận chiến thuật và chia sẻ kinh nghiệm với cộng đồng.",
  },
  "/bang-xep-hang": {
    path: "/bang-xep-hang",
    title: pageTitle("Vinh danh"),
    description: "Bảng xếp hạng và vinh danh kỳ thủ Auto Chess Mobile VN.",
  },
  "/cong-dong": {
    path: "/cong-dong",
    title: pageTitle("Cộng đồng"),
    description: "Kênh cộng đồng và liên kết chính thức Auto Chess Mobile VN.",
  },
  "/dang-bai": {
    path: "/dang-bai",
    title: pageTitle("Đăng bài"),
    description: "Đăng bài thảo luận lên cộng đồng Auto Chess Mobile VN.",
  },
  "/ho-so": {
    path: "/ho-so",
    title: pageTitle("Hồ sơ"),
    description: "Quản lý hồ sơ và cài đặt cá nhân.",
  },
}

export const ADMIN_ROUTE_META: Record<string, PageMetaInput> = {
  "/admin": {
    path: "/admin",
    title: `${SITE_NAME} | Admin — Tổng quan`,
    description: "Bảng điều khiển quản trị Auto Chess Mobile VN.",
  },
}
