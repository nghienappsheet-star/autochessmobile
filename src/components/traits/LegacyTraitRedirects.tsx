import { Navigate, useParams } from "react-router-dom"

export function LegacyTraitListRedirect({ tab }: { tab?: "race" | "class" }) {
  const target = tab ? `/toc-he?tab=${tab}` : "/toc-he"
  return <Navigate to={target} replace />
}

export function LegacyTraitDetailRedirect({ routeKind }: { routeKind: "toc" | "he" }) {
  const { id } = useParams<{ id: string }>()
  if (!id) return <Navigate to="/toc-he" replace />
  return <Navigate to={`/toc-he/${routeKind}/${id}`} replace />
}

export function LegacyAdminTraitsRedirect({ tab }: { tab: "race" | "class" }) {
  return <Navigate to={`/admin/toc-he?tab=${tab}`} replace />
}
