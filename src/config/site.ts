export const SITE_NAME = "Auto Chess Mobile VN"
export const SITE_SHORT_NAME = "Auto Chess VN"
export const SITE_TAGLINE = "Cẩm nang Meta & Đội hình"
export const SITE_DESCRIPTION =
  "Cẩm nang chiến thuật Auto Chess Mobile VN — dữ liệu meta, đội hình và công cụ cho kỳ thủ Việt Nam."
export const SITE_URL = "https://autochessmobile.vn"

export function pageTitle(page?: string) {
  if (!page) return `${SITE_NAME} | ${SITE_TAGLINE}`
  return `${page} | ${SITE_NAME}`
}

export function adminPageTitle(page: string) {
  return `${page} | Admin — ${SITE_NAME}`
}
