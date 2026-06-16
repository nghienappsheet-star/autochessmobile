import i18n from "@/i18n"

const localeMap = { vi: "vi-VN", en: "en-US" } as const

function resolveIntlLocale(locale?: string): string {
  const lang = locale ?? i18n.language
  if (lang.startsWith("en")) return localeMap.en
  return localeMap.vi
}

export function formatDate(date: Date | string, locale?: string): string {
  return new Date(date).toLocaleDateString(resolveIntlLocale(locale))
}

export function formatNumber(value: number, locale?: string): string {
  return value.toLocaleString(resolveIntlLocale(locale))
}

export function formatDateTime(date: Date | string, locale?: string): string {
  return new Date(date).toLocaleString(resolveIntlLocale(locale))
}
