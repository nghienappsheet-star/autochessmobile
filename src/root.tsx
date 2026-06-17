import * as React from "react"
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router"
import type { Route } from "./+types/root"
import { DataProvider } from "@/contexts/DataContext"
import { AuthProvider } from "@/contexts/AuthContext"
import { MotionProvider } from "@/components/motion/MotionProvider"
import { AuthModal } from "@/components/AuthModal"
import { LogoutConfirmModal } from "@/components/LogoutConfirmModal"
import { getDefaultJsonLd } from "@/lib/seo/jsonld"
import indexCss from "./index.css?url"

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: indexCss },
  { rel: "icon", href: "/icons/auto-chess-icon.jpg", type: "image/jpeg" },
  { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "dns-prefetch", href: "https://res.cloudinary.com" },
]

export const meta: Route.MetaFunction = () => [
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
  { name: "theme-color", content: "#0D0E12" },
  { name: "apple-mobile-web-app-capable", content: "yes" },
  { name: "apple-mobile-web-app-title", content: "Auto Chess VN" },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const gaId = import.meta.env.VITE_GA_ID as string | undefined
  const jsonLd = getDefaultJsonLd()

  return (
    <html lang="vi">
      <head>
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        ) : null}
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-black focus:font-semibold"
        >
          Bỏ qua nội dung
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <MotionProvider>
          <AuthModal />
          <LogoutConfirmModal />
          <Outlet />
        </MotionProvider>
      </AuthProvider>
    </DataProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Đã xảy ra lỗi."
  let details = "Vui lòng thử tải lại trang."
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Lỗi"
    details =
      error.status === 404
        ? "Trang bạn tìm không tồn tại."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="min-h-screen bg-brand-bg text-brand-text-main flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-brand-card border border-brand-border rounded-xl p-6 space-y-3">
        <h1 className="text-2xl font-bold">{message}</h1>
        <p className="text-brand-text-sub">{details}</p>
        {stack ? (
          <pre className="text-xs overflow-auto p-3 bg-brand-card-2 rounded-lg border border-brand-border">
            <code>{stack}</code>
          </pre>
        ) : null}
      </div>
    </main>
  )
}
