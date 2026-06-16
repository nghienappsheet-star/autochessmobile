import * as React from "react"
import { useAuth } from "@/contexts/AuthContext"
import type { PublicUserRole } from "@/contexts/AuthContext"
import { stableUuidFromEmail } from "@/lib/auth-bridge"
import { Button, Input } from "@/components/ui/core"
import { X, Mail, Lock, User as UserIcon } from "lucide-react"
import { useTranslation } from "react-i18next"

export function AuthModal() {
  const { showAuthModal, setShowAuthModal, authMode, setAuthMode, login } = useAuth()
  const { t } = useTranslation("auth")

  if (!showAuthModal) return null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim()
    const displayName =
      authMode === "register"
        ? (form.elements.namedItem("name") as HTMLInputElement).value.trim()
        : ""
    const name = displayName || email.split("@")[0] || "Player"
    const role: PublicUserRole = authMode === "register" ? "Thành viên" : "Thành viên"

    login({
      id: stableUuidFromEmail(email),
      name,
      email,
      avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(email)}`,
      role,
      metadata: { source: "local-mock", authMode },
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-brand-card border border-brand-border rounded-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-brand-border">
          <h2 className="text-lg font-bold">
            {authMode === "login" ? t("loginTitle") : t("registerTitle")}
          </h2>
          <button onClick={() => setShowAuthModal(false)} className="text-brand-text-sub hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {authMode === "register" && (
            <div className="space-y-1">
              <label className="text-[13px] text-brand-text-sub font-medium">{t("displayNameLabel")}</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" />
                <Input required name="name" placeholder={t("displayNamePlaceholder")} className="pl-9 bg-brand-card-2 border-brand-border" />
              </div>
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[13px] text-brand-text-sub font-medium">{t("emailLabel")}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" />
              <Input type="email" name="email" required placeholder="name@example.com" className="pl-9 bg-brand-card-2 border-brand-border" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[13px] text-brand-text-sub font-medium">{t("passwordLabel")}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-brand-text-sub" />
              <Input type="password" name="password" required placeholder="••••••••" className="pl-9 bg-brand-card-2 border-brand-border" />
            </div>
          </div>

          <Button type="submit" className="w-full mt-2">
            {authMode === "login" ? t("login") : t("createAccount")}
          </Button>

          <div className="text-center text-[13px] text-brand-text-sub mt-4">
            {authMode === "login" ? t("noAccount") + " " : t("hasAccount") + " "}
            <button
              type="button"
              onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
              className="text-brand-gold hover:underline font-medium"
            >
              {authMode === "login" ? t("registerNow") : t("login")}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
