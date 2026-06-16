import { Link } from "react-router-dom"
import { PageContainer } from "./layout/PageContainer"
import { Github, MessageCircle, Globe } from "lucide-react"
import { Separator } from "@/components/ui/core"
import {
  FOOTER_LIBRARY_LINKS,
  FOOTER_TOOL_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_MOBILE_QUICK_LINKS,
} from "@/config/nav"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation(["footer", "nav"])
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-border bg-brand-card/50 mt-auto">
      {/* Mobile compact */}
      <PageContainer className="py-8 pb-20 xl:hidden">
        <div className="space-y-4">
          <Link to="/" className="block">
            <div className="font-bold text-lg tracking-tight leading-none">
              <span className="text-white">Auto</span>
              <span className="text-brand-gold">Chess</span>
            </div>
            <div className="text-[10px] text-brand-text-sub font-medium mt-1">Mobile.vn</div>
          </Link>
          <p className="text-[13px] text-brand-text-sub leading-relaxed">
            {t("footer:taglineMobile")}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
            {FOOTER_MOBILE_QUICK_LINKS.map((link, i) => (
              <span key={link.path} className="flex items-center gap-3">
                {i > 0 && <span className="text-brand-border">·</span>}
                <Link
                  to={link.path!}
                  className="text-brand-text-sub hover:text-brand-gold transition-colors"
                >
                  {t(`nav:${link.labelKey}`)}
                </Link>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://fb.com/groups/autochessmobilevn"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
              aria-label={t("footer:ariaFacebook")}
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <a
              href="https://autochessmobile.vn"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
              aria-label={t("footer:ariaOfficialSite")}
            >
              <Globe className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
              aria-label={t("footer:ariaGithub")}
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
          <p className="text-[11px] text-brand-text-sub">
            {t("footer:copyrightMobile", { year })}
          </p>
        </div>
      </PageContainer>

      {/* Desktop full */}
      <PageContainer className="hidden xl:block py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div className="space-y-4">
            <Link to="/" className="block">
              <div className="font-bold text-lg tracking-tight leading-none">
                <span className="text-white">Auto</span>
                <span className="text-brand-gold">Chess</span>
              </div>
              <div className="text-[10px] text-brand-text-sub font-medium mt-1">Mobile.vn</div>
            </Link>
            <p className="text-[13px] text-brand-text-sub leading-relaxed max-w-xs">
              {t("footer:taglineDesktop")}
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://fb.com/groups/autochessmobilevn"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
                aria-label={t("footer:ariaFacebook")}
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://autochessmobile.vn"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
                aria-label={t("footer:ariaOfficialSite")}
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-brand-border bg-brand-card flex items-center justify-center text-brand-text-sub hover:text-brand-gold hover:border-brand-gold/30 transition-colors"
                aria-label={t("footer:ariaGithub")}
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4">
              {t("footer:sectionLibrary")}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LIBRARY_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[13px] text-brand-text-sub hover:text-white transition-colors"
                  >
                    {t(`nav:${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4">
              {t("footer:sectionTools")}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_TOOL_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[13px] text-brand-text-sub hover:text-white transition-colors"
                  >
                    {t(`nav:${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-gold mb-4">
              {t("footer:sectionExplore")}
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_EXPLORE_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path!}
                    className="text-[13px] text-brand-text-sub hover:text-white transition-colors"
                  >
                    {t(`nav:${link.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-brand-border" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[12px] text-brand-text-sub">
          <p>
            {t("footer:webVersion")}{" "}
            <span className="text-white font-semibold">v1.4.2</span>
            <span className="mx-2 text-brand-border">·</span>
            {t("footer:disclaimer")}
          </p>
          <p className="text-[11px]">
            {t("footer:copyright", { year })} {t("footer:dataPartner")}
          </p>
        </div>
      </PageContainer>
    </footer>
  )
}
