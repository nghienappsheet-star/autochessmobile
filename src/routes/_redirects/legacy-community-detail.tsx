import { Navigate, useParams } from "react-router"

export default function LegacyCommunityDetailRedirect() {
  const { id } = useParams()
  if (!id) return <Navigate to="/thao-luan" replace />
  return <Navigate to={`/thao-luan/${id}`} replace />
}
