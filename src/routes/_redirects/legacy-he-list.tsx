import { Navigate } from "react-router"

export default function LegacyHeListRedirect() {
  return <Navigate to="/toc-he?tab=class" replace />
}
