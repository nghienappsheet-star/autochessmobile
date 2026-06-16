export const DEFAULT_LOCALE = "vi" as const
export const SUPPORTED_LOCALES = ["vi", "en"] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
export const LOCALE_STORAGE_KEY = "autochessmobile-locale"

export const NAMESPACES = [
  "common",
  "nav",
  "auth",
  "footer",
  "home",
  "pages",
  "tools",
  "community",
  "news",
  "communityHub",
] as const

export type AppNamespace = (typeof NAMESPACES)[number]

export function resolveHtmlLang(locale: string): string {
  return locale.startsWith("en") ? "en" : "vi"
}
