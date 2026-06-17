import { Navigate, useParams } from "react-router"

export default function LegacyTocDetailRedirect() {
  const { id } = useParams()
  if (!id) return <Navigate to="/toc-he" replace />
  return <Navigate to={`/toc-he/toc/${id}`} replace />
}
