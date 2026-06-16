import { useTranslation } from "react-i18next"
import { Card } from "@/components/ui/core"
import type { User } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

type ProfileTab = "favorites" | "activity" | "settings"

type ProfileIdentityCardProps = {
  user: User
  heroCount: number
  compCount: number
  postCount: number
  onTabChange: (tab: ProfileTab) => void
}

type SummaryStatProps = {
  label: string
  value: number
  onClick: () => void
}

function SummaryStat({ label, value, onClick }: SummaryStatProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-brand-card-2 border border-brand-border rounded-xl p-4 text-left hover:border-brand-gold/30 transition-colors"
    >
      <div className="text-[12px] text-brand-text-sub font-semibold mb-1">{label}</div>
      <div className="text-xl font-bold text-brand-text-main">{value}</div>
    </button>
  )
}

export function ProfileIdentityCard({
  user,
  heroCount,
  compCount,
  postCount,
  onTabChange,
}: ProfileIdentityCardProps) {
  const { t, i18n } = useTranslation(["pages"])

  const memberDate = user.joinedAt
    ? new Intl.DateTimeFormat(i18n.language === "vi" ? "vi-VN" : "en-US", {
        month: "long",
        year: "numeric",
      }).format(new Date(user.joinedAt))
    : null

  return (
    <Card className="bg-brand-card border-brand-border rounded-xl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full border-4 border-brand-border shrink-0 mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left min-w-0">
          <h2 className="text-xl font-bold text-brand-text-main mb-1">{user.name}</h2>
          <p className="text-sm text-brand-text-sub truncate">{user.email}</p>
          {memberDate && (
            <p className="text-[12px] text-brand-text-sub mt-1">
              {t("pages:profile.memberSince", { date: memberDate })}
            </p>
          )}
        </div>
      </div>

      <div className={cn("grid grid-cols-3 gap-3")}>
        <SummaryStat
          label={t("pages:profile.summary.heroes")}
          value={heroCount}
          onClick={() => onTabChange("favorites")}
        />
        <SummaryStat
          label={t("pages:profile.summary.comps")}
          value={compCount}
          onClick={() => onTabChange("favorites")}
        />
        <SummaryStat
          label={t("pages:profile.summary.posts")}
          value={postCount}
          onClick={() => onTabChange("activity")}
        />
      </div>
    </Card>
  )
}
