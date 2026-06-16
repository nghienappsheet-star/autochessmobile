import * as React from "react"
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom"
import { getToolNavChildren } from "@/config/nav"
import { TOOL_SLUG_TO_I18N } from "@/config/icons"
import { PageHeader } from "@/components/layout/PageHeader"
import { useTranslation } from "react-i18next"

const TeamBuilderTool = React.lazy(() =>
  import("./tools/TeamBuilderTool").then((m) => ({ default: m.TeamBuilderTool }))
)
const CompRecommenderTool = React.lazy(() =>
  import("./tools/CompRecommenderTool").then((m) => ({ default: m.CompRecommenderTool }))
)
const CompComparisonTool = React.lazy(() =>
  import("./tools/CompComparisonTool").then((m) => ({ default: m.CompComparisonTool }))
)
const HeroComparisonTool = React.lazy(() =>
  import("./tools/HeroComparisonTool").then((m) => ({ default: m.HeroComparisonTool }))
)
const BanAdvisorTool = React.lazy(() =>
  import("./tools/BanAdvisorTool").then((m) => ({ default: m.BanAdvisorTool }))
)

function ToolRouteFallback() {
  return (
    <div className="py-16 text-center text-brand-text-sub text-[13px]">
      Đang tải công cụ...
    </div>
  )
}

function LazyTool({ children }: { children: React.ReactNode }) {
  return <React.Suspense fallback={<ToolRouteFallback />}>{children}</React.Suspense>
}

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
        <Route
          path="tao-doi-hinh"
          element={
            <LazyTool>
              <TeamBuilderTool />
            </LazyTool>
          }
        />
        <Route
          path="tim-doi-hinh"
          element={
            <LazyTool>
              <CompRecommenderTool />
            </LazyTool>
          }
        />
        <Route path="kich-hoat-toc-he" element={<Navigate to="/cong-cu/tao-doi-hinh" replace />} />
        <Route path="danh-gia-suc-manh" element={<Navigate to="/doi-hinh" replace />} />
        <Route path="de-xuat-trang-bi" element={<Navigate to="/tuong" replace />} />
        <Route
          path="ban-advisor"
          element={
            <LazyTool>
              <BanAdvisorTool />
            </LazyTool>
          }
        />
        <Route
          path="so-sanh-tuong"
          element={
            <LazyTool>
              <HeroComparisonTool />
            </LazyTool>
          }
        />
        <Route
          path="so-sanh-doi-hinh"
          element={
            <LazyTool>
              <CompComparisonTool />
            </LazyTool>
          }
        />
      </Routes>
    </div>
  )
}
