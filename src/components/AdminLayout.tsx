import * as React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AdminSidebar } from "./AdminSidebar"
import { AdminHeader } from "./AdminHeader"
import { MobileNav } from "./MobileNav"
import { AnimatePresence, motion } from "@/components/motion/MotionProvider"
import { useAdminDocumentTitle } from "@/hooks/useDocumentTitle"

export function AdminLayout() {
  const location = useLocation();
  useAdminDocumentTitle(location.pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text-main flex flex-col overflow-hidden">
      <AdminSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden pt-16 pb-16 lg:pb-0">
          <AdminHeader onMenuClick={() => setIsMobileMenuOpen(true)} />
          <main className="flex-1 flex flex-col min-h-0 py-4 sm:py-6 overflow-y-auto custom-scrollbar">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col min-h-0 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
          <MobileNav hideAt="lg" />
      </div>
    </div>
  )
}
