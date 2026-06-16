import * as React from "react"
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/site"
import { loadJson, saveJson } from "@/lib/storage"

export type SitePartner = {
  name: string
  logoUrl?: string
  url?: string
}

export type SiteSettings = {
  siteName: string
  siteDesc: string
  maintenance: boolean
  patchVersion: string
  discordUrl: string
  facebookUrl: string
  notifText: string
  donateEnabled: boolean
  donateBankCode: string
  donateBankName: string
  donateAccountNo: string
  donateAccountName: string
  donateMessage: string
  partners: SitePartner[]
}

const DEFAULT_PARTNERS: SitePartner[] = [
  { name: "Auto Chess VN Community", url: "https://facebook.com/groups/autochessmobilevn" },
  { name: "Meta Data Partner", url: "https://autochessmobile.vn" },
  { name: "Esports Vietnam", url: "" },
  { name: "Content Creator Hub", url: "" },
]

const DEFAULTS: SiteSettings = {
  siteName: SITE_NAME,
  siteDesc: SITE_DESCRIPTION,
  maintenance: false,
  patchVersion: "Patch S20.5",
  discordUrl: "https://discord.gg/autochessvn",
  facebookUrl: "https://facebook.com/groups/autochessvietnam",
  notifText: "Giải đấu Auto Chess tranh cúp S20 sẽ diễn ra vào ngày 25/06 này!",
  donateEnabled: true,
  donateBankCode: "ICB",
  donateBankName: "VietinBank",
  donateAccountNo: "109878642716",
  donateAccountName: "LE MINH CONG",
  donateMessage:
    "Auto Chess Mobile VN là dự án phi lợi nhuận do cộng đồng xây dựng. Mọi đóng góp giúp duy trì máy chủ, cập nhật meta và phát triển công cụ miễn phí cho kỳ thủ Việt Nam.",
  partners: DEFAULT_PARTNERS,
}

function readSettings(): SiteSettings {
  const donateEnabledRaw = localStorage.getItem("setting_donate_enabled")
  return {
    siteName: localStorage.getItem("setting_site_name") || DEFAULTS.siteName,
    siteDesc: localStorage.getItem("setting_site_desc") || DEFAULTS.siteDesc,
    maintenance: localStorage.getItem("setting_maintenance") === "true",
    patchVersion: localStorage.getItem("setting_patch_version") || DEFAULTS.patchVersion,
    discordUrl: localStorage.getItem("setting_discord_url") || DEFAULTS.discordUrl,
    facebookUrl: localStorage.getItem("setting_facebook_url") || DEFAULTS.facebookUrl,
    notifText: localStorage.getItem("setting_notif_text") || DEFAULTS.notifText,
    donateEnabled: donateEnabledRaw === null ? DEFAULTS.donateEnabled : donateEnabledRaw === "true",
    donateBankCode: localStorage.getItem("setting_donate_bank_code") || DEFAULTS.donateBankCode,
    donateBankName: localStorage.getItem("setting_donate_bank_name") || DEFAULTS.donateBankName,
    donateAccountNo: localStorage.getItem("setting_donate_account_no") || DEFAULTS.donateAccountNo,
    donateAccountName:
      localStorage.getItem("setting_donate_account_name") || DEFAULTS.donateAccountName,
    donateMessage: localStorage.getItem("setting_donate_message") || DEFAULTS.donateMessage,
    partners: loadJson<SitePartner[]>("setting_partners", DEFAULTS.partners),
  }
}

export function buildVietQrUrl(settings: Pick<
  SiteSettings,
  "donateBankCode" | "donateAccountNo" | "donateAccountName"
>): string {
  const bankCode = settings.donateBankCode.trim()
  const accountNo = settings.donateAccountNo.trim()
  const accountName = encodeURIComponent(settings.donateAccountName.trim())
  return `https://img.vietqr.io/image/${bankCode}-${accountNo}-compact2.png?accountName=${accountName}`
}

export function saveSiteSettings(settings: SiteSettings) {
  localStorage.setItem("setting_site_name", settings.siteName)
  localStorage.setItem("setting_site_desc", settings.siteDesc)
  localStorage.setItem("setting_maintenance", String(settings.maintenance))
  localStorage.setItem("setting_patch_version", settings.patchVersion)
  localStorage.setItem("setting_discord_url", settings.discordUrl)
  localStorage.setItem("setting_facebook_url", settings.facebookUrl)
  localStorage.setItem("setting_notif_text", settings.notifText)
  localStorage.setItem("setting_donate_enabled", String(settings.donateEnabled))
  localStorage.setItem("setting_donate_bank_code", settings.donateBankCode)
  localStorage.setItem("setting_donate_bank_name", settings.donateBankName)
  localStorage.setItem("setting_donate_account_no", settings.donateAccountNo)
  localStorage.setItem("setting_donate_account_name", settings.donateAccountName)
  localStorage.setItem("setting_donate_message", settings.donateMessage)
  saveJson("setting_partners", settings.partners)
  window.dispatchEvent(new Event("site-settings-changed"))
}

export function useSiteSettings(): SiteSettings {
  const [settings, setSettings] = React.useState<SiteSettings>(readSettings)

  React.useEffect(() => {
    const sync = () => setSettings(readSettings())
    window.addEventListener("site-settings-changed", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("site-settings-changed", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return settings
}

export type SeoSettings = {
  gaId: string
  robotsTxt: string
  jsonLd: string
  keywords: string[]
  pagesMeta: Record<string, { title: string; description: string }>
}

const DEFAULT_PAGES_META: SeoSettings["pagesMeta"] = {
  "/": { title: "Trang chủ", description: "Cẩm nang meta Auto Chess Mobile VN" },
  "/doi-hinh": { title: "Đội hình", description: "Danh sách đội hình meta tier S–C" },
  "/toc-he": { title: "Tộc / Hệ", description: "Tra cứu synergy tộc và hệ tướng, mốc kích hoạt" },
  "/tin-tuc": { title: "Tin tức", description: "Tin tức và hướng dẫn Auto Chess" },
}

type PageMetaRow = { path: string; name?: string; title: string; desc?: string; description?: string }

function normalizePagesMeta(raw: unknown): SeoSettings["pagesMeta"] {
  if (Array.isArray(raw)) {
    const record: SeoSettings["pagesMeta"] = { ...DEFAULT_PAGES_META }
    for (const row of raw as PageMetaRow[]) {
      if (!row.path) continue
      record[row.path] = {
        title: row.title,
        description: row.desc ?? row.description ?? "",
      }
    }
    return record
  }
  if (raw && typeof raw === "object") {
    return { ...DEFAULT_PAGES_META, ...(raw as SeoSettings["pagesMeta"]) }
  }
  return DEFAULT_PAGES_META
}

function readSeoSettings(): SeoSettings {
  const robotsLegacy = localStorage.getItem("seo_robots")
  const jsonLegacy = localStorage.getItem("seo_schema_json")

  return {
    gaId: localStorage.getItem("seo_ga_id") || "",
    robotsTxt:
      localStorage.getItem("seo_robots_txt") ||
      robotsLegacy ||
      "User-agent: *\nAllow: /",
    jsonLd: localStorage.getItem("seo_json_ld") || jsonLegacy || "",
    keywords: loadJson<string[]>("seo_keywords", ["auto chess", "autochess mobile", "meta"]),
    pagesMeta: normalizePagesMeta(loadJson("seo_pages_meta", DEFAULT_PAGES_META)),
  }
}

export function saveSeoSettings(settings: SeoSettings) {
  localStorage.setItem("seo_ga_id", settings.gaId)
  localStorage.setItem("seo_robots_txt", settings.robotsTxt)
  localStorage.setItem("seo_robots", settings.robotsTxt)
  localStorage.setItem("seo_json_ld", settings.jsonLd)
  localStorage.setItem("seo_schema_json", settings.jsonLd)
  localStorage.setItem("seo_keywords", JSON.stringify(settings.keywords))
  localStorage.setItem("seo_pages_meta", JSON.stringify(settings.pagesMeta))
  window.dispatchEvent(new Event("seo-settings-changed"))
}

export function useSeoSettings(): SeoSettings {
  const [settings, setSettings] = React.useState<SeoSettings>(readSeoSettings)

  React.useEffect(() => {
    const sync = () => setSettings(readSeoSettings())
    window.addEventListener("seo-settings-changed", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("seo-settings-changed", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return settings
}
