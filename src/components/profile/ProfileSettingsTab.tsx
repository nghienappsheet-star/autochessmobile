import * as React from "react"
import { useTranslation } from "react-i18next"
import { Card, Button, Input } from "@/components/ui/core"
import { LogOut } from "lucide-react"
import { CloudinaryFileUpload } from "@/components/shared/CloudinaryFileUpload"
import { isPersistableAvatarValue } from "@/lib/media-url"
import type { User } from "@/contexts/AuthContext"

type ProfileSettingsTabProps = {
  user: User
  onSave: (patch: Partial<User>) => void
  onLogout: () => void
}

export function ProfileSettingsTab({ user, onSave, onLogout }: ProfileSettingsTabProps) {
  const { t } = useTranslation(["pages", "auth"])
  const [name, setName] = React.useState(user.name)
  const [avatar, setAvatar] = React.useState(user.avatar)
  const [savedMessage, setSavedMessage] = React.useState(false)
  const [avatarError, setAvatarError] = React.useState<string | null>(null)

  React.useEffect(() => {
    setName(user.name)
    setAvatar(user.avatar)
  }, [user.name, user.avatar])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const nextAvatar = avatar.trim() || user.avatar
    if (!isPersistableAvatarValue(nextAvatar)) {
      setAvatarError(t("pages:profile.settings.invalidAvatarUrl"))
      return
    }
    setAvatarError(null)
    onSave({ name: name.trim() || user.name, avatar: nextAvatar })
    setSavedMessage(true)
    window.setTimeout(() => setSavedMessage(false), 2500)
  }

  return (
    <Card className="bg-brand-card border-brand-border p-6">
      <h3 className="text-sm font-bold tracking-wider mb-6 uppercase">
        {t("pages:profile.settings.title")}
      </h3>

      <form onSubmit={handleSave} className="space-y-5 max-w-lg">
        <div className="flex items-center gap-4 pb-2">
          <img
            src={avatar || user.avatar}
            alt={name}
            className="w-16 h-16 rounded-full border-4 border-brand-border shrink-0 object-cover"
            onError={(e) => {
              e.currentTarget.src = user.avatar
            }}
          />
          <p className="text-[13px] text-brand-text-sub">{t("pages:profile.settings.avatarUrl")}</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="profile-name" className="text-[13px] font-semibold text-brand-text-sub">
            {t("pages:profile.settings.displayName")}
          </label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="profile-avatar" className="text-[13px] font-semibold text-brand-text-sub">
            {t("pages:profile.settings.avatarUrl")}
          </label>
          <div className="flex flex-wrap gap-2">
            <Input
              id="profile-avatar"
              value={avatar}
              onChange={(e) => {
                const next = e.target.value
                const lower = next.trim().toLowerCase()
                if (lower.startsWith("data:") || lower.startsWith("blob:")) {
                  setAvatarError(t("pages:profile.settings.invalidAvatarUrl"))
                  return
                }
                setAvatarError(null)
                setAvatar(next)
              }}
              placeholder="https://"
              className="h-11 rounded-xl flex-1 min-w-[200px]"
            />
            <CloudinaryFileUpload
              onUploaded={(urls) => {
                if (urls[0]) {
                  setAvatar(urls[0])
                  setAvatarError(null)
                }
              }}
              onError={(message) => setAvatarError(message)}
              label={t("pages:profile.settings.uploadAvatar")}
              uploadingLabel={t("pages:profile.settings.uploadingAvatar")}
            />
          </div>
          {avatarError && <p className="text-[12px] text-brand-red font-medium">{avatarError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="profile-email" className="text-[13px] font-semibold text-brand-text-sub">
            {t("pages:profile.settings.email")}
          </label>
          <Input
            id="profile-email"
            value={user.email}
            readOnly
            disabled
            className="h-11 rounded-xl opacity-70"
          />
          <p className="text-[12px] text-brand-text-sub">{t("pages:profile.settings.emailReadonly")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button type="submit" className="bg-gold-gradient font-semibold h-11 rounded-xl">
            {t("pages:profile.settings.save")}
          </Button>
          {savedMessage && (
            <span className="text-[13px] text-brand-green font-semibold">
              {t("pages:profile.settings.saved")}
            </span>
          )}
        </div>
      </form>

      <div className="mt-8 pt-6 border-t border-brand-border">
        <Button
          variant="outline"
          onClick={onLogout}
          className="h-11 rounded-xl border-brand-border hover:bg-brand-red/10 hover:text-brand-red hover:border-brand-red/50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t("auth:logout")}
        </Button>
      </div>
    </Card>
  )
}
