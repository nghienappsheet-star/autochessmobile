import * as React from "react"
import { Outlet, useLocation } from "react-router"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { PageContainer } from "./layout/PageContainer"
import { MobileNav } from "./MobileNav"
import { MobileSearchSheet } from "./MobileSearchSheet"
import { MobileHubSheet } from "./MobileHubSheet"
import { AnimatePresence, motion } from "@/components/motion/MotionProvider"
import type { HubKey } from "@/config/nav"
import { useSiteSettings } from "@/hooks/useSiteSettings"

function useIsDesktopNav() {
  const [isDesktop, setIsDesktop] = React.useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1280px)").matches
  )

  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)")
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}

export function Layout() {
  const location = useLocation()
  const settings = useSiteSettings()
  const isDesktopNav = useIsDesktopNav()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [infoOpen, setInfoOpen] = React.useState(false)
  const [openHubKey, setOpenHubKey] = React.useState<HubKey | null>(null)

  React.useEffect(() => {
    setIsMobileMenuOpen(false)
    setOpenHubKey(null)
  }, [location.pathname])

  const handleHubOpen = (hubKey: HubKey) => {
    setIsMobileMenuOpen(false)
    setOpenHubKey((prev) => (prev === hubKey ? null : hubKey))
  }

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-main flex flex-col relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500 rounded-full blur-[100px]" />
      </div>

      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenInfo={() => setInfoOpen(true)}
      />

      <MobileSearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <MobileHubSheet hubKey={openHubKey} onClose={() => setOpenHubKey(null)} />

      <div className="flex-1 flex flex-col relative z-10 min-h-screen overflow-y-auto custom-scrollbar pt-14 sm:pt-16 pb-14 xl:pb-0">
        {settings.notifText && !settings.maintenance && (
          <div className="bg-brand-card border-b border-brand-border px-4 py-2 text-center text-[12px] text-brand-text-sub">
            <span className="text-brand-gold font-semibold">{settings.patchVersion}</span>
            <span className="mx-2 opacity-40">·</span>
            {settings.notifText}
          </div>
        )}
        {settings.maintenance && (
          <div className="bg-brand-red/10 border-b border-brand-border px-4 py-3 text-center text-[13px] text-brand-red font-semibold">
            Website đang bảo trì — một số tính năng có thể tạm ngưng.
          </div>
        )}
        <Header
          onOpenSearch={() => setIsSearchOpen(true)}
          infoOpen={infoOpen}
          onInfoOpenChange={setInfoOpen}
        />
        <main id="main-content" className="flex-1 py-4 sm:py-6 lg:py-8">
          <PageContainer>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={isDesktopNav ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={isDesktopNav ? { opacity: 0, scale: 0.98 } : undefined}
                transition={
                  isDesktopNav
                    ? { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
                    : { duration: 0.15 }
                }
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </PageContainer>
        </main>
        <Footer />
        <MobileNav
          onMenuOpen={() => {
            setOpenHubKey(null)
            setIsMobileMenuOpen(true)
          }}
          isMenuOpen={isMobileMenuOpen}
          onHubOpen={handleHubOpen}
          openHubKey={openHubKey}
        />
      </div>
    </div>
  )
}
