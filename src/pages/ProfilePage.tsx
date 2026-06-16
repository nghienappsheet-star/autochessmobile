import * as React from "react"
import { Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext"
import { useFavorites } from "@/hooks/useFavorites"
import { useAppStore } from "@/contexts/DataContext"
import { PageHeader } from "@/components/layout/PageHeader"
import { UnderlineTabs } from "@/components/layout/UnderlineTabs"
import { ProfileIdentityCard } from "@/components/profile/ProfileIdentityCard"
import { ProfileFavoritesTab } from "@/components/profile/ProfileFavoritesTab"
import { ProfileActivityTab } from "@/components/profile/ProfileActivityTab"
import { ProfileSettingsTab } from "@/components/profile/ProfileSettingsTab"

type ProfileTab = "favorites" | "activity" | "settings"

export function ProfilePage() {
  const { t } = useTranslation(["pages", "auth"])
  const { user, logout, updateUser } = useAuth()
  const { favorites: favoriteHeroes, toggleFavorite: toggleHeroFavorite } = useFavorites("heroes")
  const { favorites: favoriteComps, toggleFavorite: toggleCompFavorite, isFavorite: isCompFavorite } =
    useFavorites("comps")
  const { heroes, comps, posts } = useAppStore()
  const [activeTab, setActiveTab] = React.useState<ProfileTab>("favorites")

  if (!user) {
    return <Navigate to="/" replace />
  }

  const favHeroesData = heroes.filter((h) => favoriteHeroes.includes(h.id))
  const favCompsData = comps.filter((c) => favoriteComps.includes(c.id))
  const userPosts = posts.filter((p) => p.author === user.name)

  const tabs = [
    { id: "favorites", label: t("pages:profile.tabs.favorites") },
    { id: "activity", label: t("pages:profile.tabs.activity") },
    { id: "settings", label: t("pages:profile.tabs.settings") },
  ]

  return (
    <div className="space-y-6 pb-10">
      <PageHeader
        title={t("pages:profile.title")}
        description={t("pages:profile.description")}
      />

      <ProfileIdentityCard
        user={user}
        heroCount={favHeroesData.length}
        compCount={favCompsData.length}
        postCount={userPosts.length}
        onTabChange={setActiveTab}
      />

      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as ProfileTab)}
        layoutId="profileActiveTab"
      />

      {activeTab === "favorites" && (
        <ProfileFavoritesTab
          favHeroes={favHeroesData}
          favComps={favCompsData}
          allHeroes={heroes}
          isCompFavorite={isCompFavorite}
          onToggleHeroFavorite={toggleHeroFavorite}
          onToggleCompFavorite={toggleCompFavorite}
        />
      )}

      {activeTab === "activity" && <ProfileActivityTab userPosts={userPosts} />}

      {activeTab === "settings" && (
        <ProfileSettingsTab user={user} onSave={updateUser} onLogout={logout} />
      )}
    </div>
  )
}
