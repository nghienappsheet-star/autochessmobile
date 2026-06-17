import { Navigate, useParams } from "react-router"

export default function LegacyHeDetailRedirect() {
  const { id } = useParams()
  if (!id) return <Navigate to="/toc-he" replace />
  return <Navigate to={`/toc-he/he/${id}`} replace />
}
