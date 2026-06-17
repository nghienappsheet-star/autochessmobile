import * as React from "react"
import { useTranslation, Trans } from "react-i18next"
import { 
  Search, BookOpen, Info, LogOut, User as UserIcon, Shield,
  ChevronRight, Monitor, ExternalLink
} from "lucide-react"
import { WIKI_DROPDOWN_LINKS, LIBRARY_ICONS } from "@/config/icons"
import { 
  Input, Button, Dialog, DialogContent, DialogHeader, DialogTitle, 
  DialogDescription, DialogFooter, Badge, Separator 
} from "./ui/core"
import { useAuth } from "@/contexts/AuthContext"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"
import { HeaderNav } from "./HeaderNav"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { PageContainer } from "./layout/PageContainer"

export function Header({
  onOpenSearch,
  infoOpen = false,
  onInfoOpenChange,
}: {
  onOpenSearch?: () => void
  infoOpen?: boolean
  onInfoOpenChange?: (open: boolean) => void
}) {
  const { t } = useTranslation(["common", "nav", "auth"])
  const { user, triggerLogout, openLogin, openRegister } = useAuth()
  const [showDropdown, setShowDropdown] = React.useState(false)
  const [showWikiDropdown, setShowWikiDropdown] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const wikiRef = React.useRef<HTMLDivElement>(null)

  const tips = t("common:strategyTips", { returnObjects: true }) as string[]

  const [activeTab, setActiveTab] = React.useState<"info" | "rates">("info")
  const [currentTipIndex, setCurrentTipIndex] = React.useState(0)
  const setShowInfoModal = onInfoOpenChange ?? (() => {})
  const showInfoModal = infoOpen

  const getNewTip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * tips.length);
    } while (nextIdx === currentTipIndex && tips.length > 1);
    setCurrentTipIndex(nextIdx);
  };

  const rollRates = [
    { lvl: 1, c1: "100%", c2: "0%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 2, c1: "100%", c2: "0%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 3, c1: "90%", c2: "10%", c3: "0%", c4: "0%", c5: "0%" },
    { lvl: 4, c1: "65%", c2: "30%", c3: "5%", c4: "0%", c5: "0%" },
    { lvl: 5, c1: "50%", c2: "35%", c3: "15%", c4: "0%", c5: "0%" },
    { lvl: 6, c1: "40%", c2: "35%", c3: "23%", c4: "2%", r5: "0%" },
    { lvl: 7, c1: "30%", c2: "30%", c3: "30%", c4: "10%", c5: "0%" },
    { lvl: 8, c1: "21%", c2: "25%", c3: "30%", c4: "20%", c5: "4%" },
    { lvl: 9, c1: "12%", c2: "20%", c3: "30%", c4: "30%", c5: "8%" },
    { lvl: 10, c1: "5%", c2: "10%", c3: "25%", c4: "40%", c5: "20%" },
  ];

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
      if (wikiRef.current && !wikiRef.current.contains(event.target as Node)) {
        setShowWikiDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-brand-border bg-brand-bg/90 backdrop-blur-xl safe-area-pt">
      <PageContainer className="h-14 sm:h-16 flex items-center gap-3 sm:gap-4">
        <Link to="/" className="flex-shrink-0 min-w-0">
          <div className="font-bold text-base sm:text-lg tracking-tight leading-none">
            <span className="text-white">Auto</span>
            <span className="text-brand-gold">Chess</span>
          </div>
          <div className="hidden xs:block text-[9px] sm:text-[10px] text-brand-text-sub font-medium">Mobile.vn</div>
        </Link>

        <HeaderNav onDropdownOpen={() => setShowWikiDropdown(false)} />

        <div className="flex-1 min-w-0 hidden md:block max-w-[200px] lg:max-w-xs">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-brand-text-sub group-focus-within:text-brand-gold transition-colors" />
            <Input
              type="search"
              placeholder={t("common:searchPlaceholder")}
              className="w-full bg-brand-card border-transparent pl-9 h-9 text-[12px] focus-visible:ring-1 focus-visible:ring-brand-gold/20 focus-visible:border-brand-gold/30 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 ml-auto">
        <button
          type="button"
          onClick={onOpenSearch}
          className="md:hidden w-9 h-9 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-text-sub hover:text-white hover:border-white/10 transition-all"
          aria-label={t("common:searchAria")}
        >
          <Search className="h-4 w-4" />
        </button>
        <LanguageSwitcher className="hidden lg:flex" />
        <div className="hidden xl:block w-[1px] h-5 bg-white/10" />
        <div className="hidden xl:flex items-center gap-3">
          <div className="relative" ref={wikiRef}>
            <button
              type="button"
              onClick={() => setShowWikiDropdown(!showWikiDropdown)}
              aria-label={t("nav:wikiHandbook")}
              aria-expanded={showWikiDropdown}
              className={cn(
                "w-9 h-9 rounded-lg bg-brand-card border flex items-center justify-center text-brand-text-sub hover:text-white transition-all",
                showWikiDropdown ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-brand-border hover:border-white/10"
              )}
            >
              <BookOpen className="h-4 w-4" />
            </button>

            {showWikiDropdown && (
              <div className="absolute right-0 mt-3.5 w-72 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-white/5 mb-1.5 text-left">
                  <div className="text-[11px] font-bold text-brand-gold uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-brand-gold" />
                    {t("nav:wikiHandbook")}
                  </div>
                  <div className="text-[10px] text-brand-text-sub font-medium opacity-60 mt-1">{t("nav:wikiHandbookDesc")}</div>
                </div>
                <div className="space-y-0.5 text-left font-sans">
                  {WIKI_DROPDOWN_LINKS.map((link) => {
                    const Icon = LIBRARY_ICONS[link.labelKey]
                    return (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    onClick={() => setShowWikiDropdown(false)}
                    className="flex items-center justify-between px-2.5 py-2 rounded-lg text-brand-text-sub hover:text-white hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("w-8 h-8 rounded-lg border flex items-center justify-center transition-all", link.accent)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold">{t(`nav:${link.titleKey}`)}</div>
                        <div className="text-[10px] text-brand-text-sub/60 mt-0.5 font-normal">{t(`nav:${link.descKey}`)}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-3 w-3 text-brand-text-sub group-hover:text-white transition-all transform group-hover:translate-x-0.5" />
                  </Link>
                    )
                  })}

                  <div className="p-3 bg-white/[0.02] border-t border-white/5 mt-1.5 rounded-b-xl flex flex-col gap-1.5">
                    <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest flex items-center justify-between">
                      <span>{t("common:strategyTipsTitle")}</span>
                      <button 
                        onClick={getNewTip}
                        className="text-[9px] lowercase border border-brand-gold/30 px-2 py-0.5 rounded text-brand-gold hover:bg-brand-gold/20 transition-all font-bold tracking-normal leading-none"
                      >
                        {t("common:swapTip")}
                      </button>
                    </div>
                    <p className="text-[11.5px] text-brand-text-sub font-normal leading-relaxed text-balance">
                      "{tips[currentTipIndex]}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowInfoModal(true)}
            aria-label="Thông tin website"
            className={cn(
              "w-9 h-9 rounded-lg bg-brand-card border flex items-center justify-center text-brand-text-sub hover:text-white transition-all",
              showInfoModal ? "border-brand-gold/30 text-brand-gold bg-brand-gold/5" : "border-brand-border hover:border-white/10"
            )}
          >
            <Info className="h-4 w-4" />
          </button>
        </div>
        <div className="hidden xl:block w-[1px] h-5 bg-white/10" />

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label={t("nav:profile")}
              aria-expanded={showDropdown}
              className="flex items-center gap-3 focus:outline-none p-1 rounded-xl hover:bg-white/5 transition-all text-left"
            >
              <img src={user.avatar} alt="Avatar" className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-white/10 object-cover" />
              <div className="hidden md:block">
                <div className="text-[13px] font-semibold text-white leading-none">{user.name}</div>
                <div className="text-[10px] text-brand-text-sub opacity-50 mt-1.5 uppercase tracking-wider font-semibold">{t("auth:member")}</div>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-brand-border bg-brand-card p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-3 border-b border-white/5 mb-1.5">
                  <div className="text-[13px] font-bold text-white truncate">{user.name}</div>
                  <div className="text-[11px] text-brand-text-sub truncate mt-0.5">{user.email}</div>
                </div>
                <Link 
                  to="/ho-so" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <UserIcon className="h-4 w-4" />
                  {t("nav:profile")}
                </Link>
                <Link 
                  to="/admin" 
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-text-sub hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  <Shield className="h-4 w-4" />
                  {t("nav:admin")}
                </Link>
                <div className="my-1.5 h-[1px] bg-white/5" />
                <button 
                  onClick={() => {
                    setShowDropdown(false)
                    triggerLogout()
                  }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-brand-red hover:bg-brand-red/10 transition-colors font-semibold"
                >
                  <LogOut className="h-4 w-4" />
                  {t("auth:logout")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button 
              variant="outline" 
              onClick={openLogin} 
              className="h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-[11px] sm:text-[12px] font-bold capitalize tracking-normal bg-transparent border-white/10 text-brand-text-sub hover:text-white"
            >
              {t("auth:login")}
            </Button>
            <Button 
              variant="default" 
              onClick={openRegister} 
              className="hidden xl:inline-flex h-9 sm:h-10 px-3 sm:px-4 rounded-xl text-[11px] sm:text-[12px] font-bold capitalize tracking-normal"
            >
              {t("auth:register")}
            </Button>
          </div>
        )}
        </div>
      </PageContainer>

      {/* Information Modal */}
      <Dialog open={showInfoModal} onOpenChange={setShowInfoModal}>
        <DialogContent className="max-w-[480px] border border-brand-border bg-brand-card p-6 sm:p-8 rounded-xl shadow-2xl">
          <DialogHeader className="flex flex-col items-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-[0_0_15px_rgba(245,180,60,0.1)]">
              <Info className="h-5 w-5" />
            </div>
            <div className="space-y-1.5 w-full">
              <DialogTitle className="text-xl font-bold tracking-tight text-white">
                {t("common:infoSupportTitle")}
              </DialogTitle>
              
              {/* Dynamic Tabs */}
              <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5 mt-3">
                <button 
                  onClick={() => setActiveTab("info")}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                    activeTab === "info" ? "bg-brand-gold text-black" : "text-brand-text-sub hover:text-white"
                  )}
                >
                  {t("common:infoTabGeneral")}
                </button>
                <button 
                  onClick={() => setActiveTab("rates")}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
                    activeTab === "rates" ? "bg-brand-gold text-black" : "text-brand-text-sub hover:text-white"
                  )}
                >
                  {t("common:infoTabRollRates")}
                </button>
              </div>
            </div>
          </DialogHeader>

          {activeTab === "info" ? (
            <div className="mt-6 space-y-5 text-left animate-in fade-in duration-200">
              <p className="text-[13px] text-brand-text-sub leading-relaxed font-normal text-brand-text-sub">
                <Trans
                  i18nKey="common:infoIntro"
                  components={{ 1: <span className="text-brand-gold font-bold" /> }}
                />
              </p>

              <Separator className="bg-white/5" />

              <div className="space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">{t("common:opsStatusTitle")}</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[12px] p-3.5 rounded-xl bg-brand-card-2 border border-brand-border">
                  <div className="text-brand-text-sub font-medium">{t("common:webVersionLabel")}</div>
                  <div className="text-white font-bold text-right">{t("common:webVersionValue")}</div>

                  <div className="text-brand-text-sub font-medium">{t("common:dataServerLabel")}</div>
                  <div className="text-green-400 font-bold text-right flex items-center justify-end gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {t("common:statusActive")}
                  </div>

                  <div className="text-brand-text-sub font-medium">{t("common:dataPartnerLabel")}</div>
                  <div className="text-white font-bold text-right">{t("common:dataPartnerValue")}</div>

                  <div className="text-brand-text-sub font-medium">{t("common:releaseCountryLabel")}</div>
                  <div className="text-brand-gold font-bold text-right">{t("common:countryVN")}</div>
                </div>
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-2.5">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-brand-text-sub">{t("common:communityLinksTitle")}</h4>
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://autochessmobile.vn" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-brand-text-sub hover:text-white transition-all text-[12.5px] font-medium"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <Monitor className="h-4 w-4 text-brand-gold" />
                      {t("common:linkOfficialSite")}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-55" />
                  </a>
                  <a 
                    href="https://fb.com/groups/autochessmobilevn" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-brand-text-sub hover:text-white transition-all text-[12.5px] font-medium"
                  >
                    <span className="flex items-center gap-2 font-bold">
                      <UserIcon className="h-4 w-4 text-brand-gold" />
                      {t("common:linkCommunityFB")}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-55" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-4 text-left animate-in fade-in duration-200">
              <div className="flex flex-col gap-2">
                <p className="text-[11.5px] text-brand-text-sub">
                  {t("common:rollRatesDesc")}
                </p>
                <div className="w-full overflow-hidden border border-brand-border rounded-xl bg-brand-bg">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/5 font-bold text-brand-text-sub text-[10px]">
                        <th className="p-2 text-center">{t("common:levelShort")}</th>
                        <th className="p-2 text-brand-text-sub text-center">$1</th>
                        <th className="p-2 text-green-400 text-center">$2</th>
                        <th className="p-2 text-blue-400 text-center">$3</th>
                        <th className="p-2 text-purple-400 text-center">$4</th>
                        <th className="p-2 text-brand-gold text-center">$5</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono text-brand-text-sub text-center">
                      {rollRates.map((r, i) => (
                        <tr key={i} className="hover:bg-white/[0.015]">
                          <td className="p-2 font-bold bg-white/[0.005] font-sans text-brand-gold">Lvl {r.lvl}</td>
                          <td className="p-2">{r.c1}</td>
                          <td className="p-2 text-green-500/80">{r.c2}</td>
                          <td className="p-2 text-blue-400/80">{r.c3}</td>
                          <td className="p-2 text-purple-400/80">{r.c4}</td>
                          <td className="p-2 text-brand-gold/80">{r.c5 || r.r5}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="mt-8">
            <Button 
              variant="default" 
              onClick={() => setShowInfoModal(false)}
              className="w-full h-11 rounded-xl font-semibold shadow-lg shadow-brand-gold/10"
            >
              {t("common:gotIt")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
