import { Navigate } from "react-router"

export default function AdminHeRedirect() {
  return <Navigate to="/admin/toc-he?tab=class" replace />
}
