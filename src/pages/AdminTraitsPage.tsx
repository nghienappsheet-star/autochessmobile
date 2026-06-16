import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { Activity } from "lucide-react"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import { AdminTraitPanel } from "@/components/admin/AdminTraitPanel"
import { TraitFilterTabs } from "@/components/traits/TraitFilterTabs"
import { useAppStore } from "@/contexts/DataContext"
import type { TraitFilterTab } from "@/lib/traits"

function parseAdminTab(value: string | null): TraitFilterTab {
  if (value === "race" || value === "class") return value
  return "race"
}

export function AdminTraitsPage() {
  const { races, classes } = useAppStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = parseAdminTab(searchParams.get("tab"))

  const handleTabChange = (tab: TraitFilterTab) => {
    if (tab === "all") return
    setSearchParams({ tab }, { replace: true })
  }

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        icon={Activity}
        title="Quản lý Tộc / Hệ"
        description="Cấu hình mốc kích hoạt synergy cho chủng tộc và nghề nghiệp hệ tướng."
      />

      <TraitFilterTabs
        activeTab={activeTab}
        raceCount={races.length}
        classCount={classes.length}
        onTabChange={handleTabChange}
        hideAllTab
      />

      {activeTab === "race" ? <AdminTraitPanel kind="race" /> : <AdminTraitPanel kind="class" />}
    </div>
  )
}
