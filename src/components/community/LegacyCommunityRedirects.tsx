import { Navigate, useParams } from "react-router-dom"

/** Redirect legacy /cong-dong/:id discussion URLs to /thao-luan/:id */
export function LegacyCommunityDetailRedirect() {
  const { id } = useParams()
  if (!id) return <Navigate to="/thao-luan" replace />
  return <Navigate to={`/thao-luan/${id}`} replace />
}
