import { buildSitemapEntries, renderSitemapXml } from "@/lib/seo/sitemap"

export function loader() {
  const xml = renderSitemapXml(buildSitemapEntries())
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
