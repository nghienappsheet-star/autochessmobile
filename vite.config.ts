import tailwindcss from "@tailwindcss/vite"
import { reactRouter } from "@react-router/dev/vite"
import path from "path"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import { SITE_DESCRIPTION, SITE_NAME, SITE_SHORT_NAME } from "./src/config/site"

export default defineConfig(() => {
  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["icons/auto-chess-icon.jpg", "icons/apple-touch-icon.png"],
        manifest: {
          name: SITE_NAME,
          short_name: SITE_SHORT_NAME,
          description: SITE_DESCRIPTION,
          theme_color: "#0D0E12",
          background_color: "#0D0E12",
          display: "standalone",
          lang: "vi",
          start_url: "/",
          scope: "/",
          icons: [
            {
              src: "icons/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "icons/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,ico,png,jpg,svg,woff2}"],
          globIgnores: ["**/heroes/**"],
          maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
          navigateFallback: "/index.html",
        },
        devOptions: {
          enabled: true,
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, "/")
            if (
              normalized.includes("node_modules/recharts") ||
              normalized.includes("node_modules/d3-")
            ) {
              return "recharts-vendor"
            }
            if (normalized.includes("node_modules/motion")) {
              return "motion-vendor"
            }
            if (normalized.includes("node_modules/@radix-ui")) {
              return "radix-vendor"
            }
            if (normalized.includes("/src/components/admin/AdminDashboardCharts")) {
              return "admin-charts"
            }
            if (normalized.includes("/src/components/admin/")) {
              return "admin-ui"
            }
            if (normalized.includes("/src/hooks/useAdmin")) {
              return "admin-ui"
            }
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  }
})
