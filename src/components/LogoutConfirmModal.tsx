import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Button } from "@/components/ui/core"
import { LogOut, AlertTriangle } from "lucide-react"
import { useTranslation } from "react-i18next"

export function LogoutConfirmModal() {
  const { showLogoutConfirm, setShowLogoutConfirm, logout } = useAuth()
  const { t } = useTranslation(["auth", "common"])

  return (
    <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
      <DialogContent className="max-w-[400px] border border-white/10 bg-brand-card p-6 sm:p-8 rounded-xl shadow-2xl">
        <DialogHeader className="flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1.5">
            <DialogTitle className="text-xl font-bold tracking-tight text-white uppercase">
              {t("auth:logoutConfirmTitle")}
            </DialogTitle>
            <DialogDescription className="text-[13.5px] text-brand-text-sub font-normal">
              {t("auth:logoutConfirmDesc")}
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-3 mt-6 sm:space-x-0">
          <Button
            variant="outline"
            onClick={() => setShowLogoutConfirm(false)}
            className="w-full h-11 border-white/5 bg-white/5 hover:bg-white/10 text-brand-text-sub hover:text-white rounded-xl text-[13px] font-bold uppercase"
          >
            {t("common:cancel")}
          </Button>
          <Button
            variant="danger"
            onClick={logout}
            className="w-full h-11 bg-brand-red hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 text-[13px] font-bold uppercase shadow-lg shadow-brand-red/10"
          >
            <LogOut className="h-4 w-4" /> {t("auth:logout")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
