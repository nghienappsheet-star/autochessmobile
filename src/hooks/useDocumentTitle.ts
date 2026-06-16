import * as React from "react"
import { pageTitle, adminPageTitle, SITE_DESCRIPTION } from "@/config/site"
import { useSeoSettings, useSiteSettings } from "@/hooks/useSiteSettings"

export function useDocumentTitle(title: string) {
  React.useEffect(() => {
    document.title = title
  }, [title])
}

const PUBLIC_ROUTE_TITLES: Record<string, string> = {
  "/": pageTitle(),
  "/doi-hinh": pageTitle("Đội hình"),
  "/toc-he": pageTitle("Tộc / Hệ"),
  "/tuong": pageTitle("Tướng"),
  "/trang-bi": pageTitle("Trang bị"),
  "/di-vat": pageTitle("Dị vật"),
  "/cong-cu": pageTitle("Công cụ"),
  "/cong-cu/tao-doi-hinh": pageTitle("Tạo đội hình"),
  "/cong-cu/tim-doi-hinh": pageTitle("Tìm đội hình"),
  "/cong-cu/ban-advisor": pageTitle("Ban tộc hệ"),
  "/cong-cu/so-sanh-tuong": pageTitle("So sánh tướng"),
  "/cong-cu/so-sanh-doi-hinh": pageTitle("So sánh đội hình"),
  "/tin-tuc": pageTitle("Tin tức"),
  "/thao-luan": pageTitle("Thảo luận"),
  "/bang-xep-hang": pageTitle("Vinh danh"),
  "/cong-dong": pageTitle("Cộng đồng"),
  "/dang-bai": pageTitle("Đăng bài"),
  "/ho-so": pageTitle("Hồ sơ"),
}

const ADMIN_ROUTE_TITLES: Record<string, string> = {
  "/admin": adminPageTitle("Tổng quan"),
  "/admin/nguoi-dung": adminPageTitle("Người dùng"),
  "/admin/vai-tro": adminPageTitle("Vai trò & Phân quyền"),
  "/admin/tuong": adminPageTitle("Tướng"),
  "/admin/toc-he": adminPageTitle("Tộc / Hệ"),
  "/admin/trang-bi": adminPageTitle("Trang bị"),
  "/admin/di-vat": adminPageTitle("Dị vật"),
  "/admin/doi-hinh": adminPageTitle("Đội hình"),
  "/admin/banners": adminPageTitle("Banners"),
  "/admin/bai-viet": adminPageTitle("Bài viết"),
  "/admin/binh-luan": adminPageTitle("Bình luận"),
  "/admin/bang-xep-hang": adminPageTitle("Bảng xếp hạng"),
  "/admin/tin-tuc": adminPageTitle("Tin tức"),
  "/admin/su-kien": adminPageTitle("Sự kiện"),
  "/admin/media": adminPageTitle("Media"),
  "/admin/bao-cao": adminPageTitle("Báo cáo"),
  "/admin/seo": adminPageTitle("SEO"),
  "/admin/cai-dat": adminPageTitle("Cài đặt"),
  "/admin/doi-ngu": adminPageTitle("Đội ngũ"),
  "/admin/kenh-cong-dong": adminPageTitle("Kênh cộng đồng"),
}

function resolveTitle(pathname: string, routeMap: Record<string, string>, fallback: string) {
  if (routeMap[pathname]) return routeMap[pathname]

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length >= 2) {
    const basePath = `/${segments.slice(0, segments.length - 1).join("/")}`
    if (routeMap[basePath]) return routeMap[basePath]
  }

  return fallback
}

function resolvePublicPath(pathname: string): string {
  if (pathname.startsWith("/toc-he/")) return "/toc-he"
  if (pathname.startsWith("/thao-luan/")) return "/thao-luan"
  if (pathname.startsWith("/tin-tuc/")) return "/tin-tuc"

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length >= 2) {
    const basePath = `/${segments.slice(0, segments.length - 1).join("/")}`
    if (PUBLIC_ROUTE_TITLES[basePath]) return basePath
  }
  return pathname
}

function setMetaDescription(content: string) {
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement("meta")
    meta.setAttribute("name", "description")
    document.head.appendChild(meta)
  }
  meta.setAttribute("content", content)
}

export function usePublicDocumentTitle(pathname: string) {
  const seo = useSeoSettings()
  const site = useSiteSettings()

  React.useEffect(() => {
    const lookupPath = resolvePublicPath(pathname)
    const pageMeta = seo.pagesMeta[lookupPath] ?? seo.pagesMeta["/"]
    const fallbackTitle = resolveTitle(pathname, PUBLIC_ROUTE_TITLES, pageTitle())
    const rawTitle = pageMeta?.title?.trim()
    const documentTitle =
      rawTitle && rawTitle.length > 0
        ? rawTitle.includes("|")
          ? rawTitle
          : pageTitle(rawTitle)
        : fallbackTitle

    document.title = documentTitle
    setMetaDescription(pageMeta?.description?.trim() || site.siteDesc || SITE_DESCRIPTION)
  }, [pathname, seo, site.siteDesc])
}

export function useAdminDocumentTitle(pathname: string) {
  useDocumentTitle(resolveTitle(pathname, ADMIN_ROUTE_TITLES, adminPageTitle("Tổng quan")))
}
