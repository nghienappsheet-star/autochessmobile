import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  NAMESPACES,
  resolveHtmlLang,
  SUPPORTED_LOCALES,
} from "./config"

import viCommon from "@/locales/vi/common.json"
import viNav from "@/locales/vi/nav.json"
import viAuth from "@/locales/vi/auth.json"
import viFooter from "@/locales/vi/footer.json"
import viHome from "@/locales/vi/home.json"
import viPages from "@/locales/vi/pages.json"
import viTools from "@/locales/vi/tools.json"
import viCommunity from "@/locales/vi/community.json"
import viNews from "@/locales/vi/news.json"
import viCommunityHub from "@/locales/vi/communityHub.json"

import enCommon from "@/locales/en/common.json"
import enNav from "@/locales/en/nav.json"
import enAuth from "@/locales/en/auth.json"
import enFooter from "@/locales/en/footer.json"
import enHome from "@/locales/en/home.json"
import enPages from "@/locales/en/pages.json"
import enTools from "@/locales/en/tools.json"
import enCommunity from "@/locales/en/community.json"
import enNews from "@/locales/en/news.json"
import enCommunityHub from "@/locales/en/communityHub.json"

const resources = {
  vi: {
    common: viCommon,
    nav: viNav,
    auth: viAuth,
    footer: viFooter,
    home: viHome,
    pages: viPages,
    tools: viTools,
    community: viCommunity,
    news: viNews,
    communityHub: viCommunityHub,
  },
  en: {
    common: enCommon,
    nav: enNav,
    auth: enAuth,
    footer: enFooter,
    home: enHome,
    pages: enPages,
    tools: enTools,
    community: enCommunity,
    news: enNews,
    communityHub: enCommunityHub,
  },
} as const

const isBrowser = typeof window !== "undefined"

if (isBrowser) {
  i18n.use(LanguageDetector)
}

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: [...SUPPORTED_LOCALES],
  lng: isBrowser ? undefined : DEFAULT_LOCALE,
  ns: [...NAMESPACES],
  defaultNS: "common",
  interpolation: { escapeValue: false },
  detection: isBrowser
    ? {
        order: ["localStorage", "navigator"],
        lookupLocalStorage: LOCALE_STORAGE_KEY,
        caches: ["localStorage"],
      }
    : undefined,
})

function syncDocumentLang(locale: string) {
  if (typeof document === "undefined") return
  document.documentElement.lang = resolveHtmlLang(locale)
}

if (isBrowser) {
  syncDocumentLang(i18n.language)
  i18n.on("languageChanged", syncDocumentLang)
}

export default i18n
