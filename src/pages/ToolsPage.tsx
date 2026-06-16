import * as React from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { getToolNavChildren } from "@/config/nav"
import { TOOL_SLUG_TO_I18N } from "@/config/icons"
import { PageHeader } from "@/components/layout/PageHeader"
import { CompRecommenderTool } from "./tools/CompRecommenderTool"
import { HeroComparisonTool } from "./tools/HeroComparisonTool"
import { CompComparisonTool } from "./tools/CompComparisonTool"
import { TeamBuilderTool } from "./tools/TeamBuilderTool"
import { BanAdvisorTool } from "./tools/BanAdvisorTool"
import { useTranslation } from "react-i18next"

export function ToolsPage() {
  const { t } = useTranslation("tools")
  const location = useLocation()
  const navigate = useNavigate()

  const tools = React.useMemo(
    () =>
      getToolNavChildren().map((child) => {
        const id = child.path.replace("/cong-cu/", "")
        const labelKey = TOOL_SLUG_TO_I18N[id] ?? id
        return {
          id,
          icon: child.icon,
          name: t(`list.${labelKey}.name`),
          desc: t(`list.${labelKey}.desc`),
        }
      }),
    [t]
  )

  const currentPath = location.pathname.split("/").pop()
  const currentToolId = tools.find((tool) => tool.id === currentPath)?.id || "tao-doi-hinh"

  React.useEffect(() => {
    if (location.pathname === "/cong-cu" || location.pathname === "/cong-cu/") {
      navigate("/cong-cu/tao-doi-hinh", { replace: true })
    }
  }, [location.pathname, navigate])

  const currentTool = tools.find((tool) => tool.id === currentToolId)

  return (
    <div className="space-y-6">
      <PageHeader
        title={currentTool?.name ?? t("pageTitle")}
        description={currentTool?.desc}
        icon={currentTool?.icon}
      />

      <Routes>
        <Route path="tao-doi-hinh" element={<TeamBuilderTool />} />
        <Route path="tim-doi-hinh" element={<CompRecommenderTool />} />
        <Route path="kich-hoat-toc-he" element={<Navigate to="/cong-cu/tao-doi-hinh" replace />} />
        <Route path="danh-gia-suc-manh" element={<Navigate to="/doi-hinh" replace />} />
        <Route path="de-xuat-trang-bi" element={<Navigate to="/tuong" replace />} />
        <Route path="ban-advisor" element={<BanAdvisorTool />} />
        <Route path="so-sanh-tuong" element={<HeroComparisonTool />} />
        <Route path="so-sanh-doi-hinh" element={<CompComparisonTool />} />
      </Routes>
    </div>
  )
}
