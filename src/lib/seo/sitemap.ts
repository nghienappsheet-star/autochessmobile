import { CLASSES, COMPS, DEFAULT_POSTS, HEROES, ITEMS, RACES, DEFAULT_RELICS } from "@/data"
import { SITE_URL } from "@/config/site"

export type SitemapEntry = {
  loc: string
  changefreq?: "daily" | "weekly" | "monthly"
  priority?: string
}

const STATIC_PUBLIC_ROUTES: SitemapEntry[] = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/doi-hinh", changefreq: "daily", priority: "0.9" },
  { loc: "/toc-he", changefreq: "weekly", priority: "0.8" },
  { loc: "/tuong", changefreq: "weekly", priority: "0.9" },
  { loc: "/trang-bi", changefreq: "weekly", priority: "0.8" },
  { loc: "/di-vat", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/tao-doi-hinh", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/tim-doi-hinh", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/ban-advisor", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-cu/so-sanh-tuong", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-cu/so-sanh-doi-hinh", changefreq: "weekly", priority: "0.6" },
  { loc: "/tin-tuc", changefreq: "daily", priority: "0.8" },
  { loc: "/thao-luan", changefreq: "daily", priority: "0.7" },
  { loc: "/bang-xep-hang", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-dong", changefreq: "weekly", priority: "0.5" },
]

export function buildSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [...STATIC_PUBLIC_ROUTES]

  for (const comp of COMPS) {
    entries.push({
      loc: `/doi-hinh/${comp.id}`,
      changefreq: "weekly",
      priority: "0.8",
    })
  }

  for (const hero of HEROES) {
    entries.push({
      loc: `/tuong/${hero.id}`,
      changefreq: "monthly",
      priority: "0.7",
    })
  }

  for (const item of ITEMS) {
    entries.push({
      loc: `/trang-bi/${item.id}`,
      changefreq: "monthly",
      priority: "0.6",
    })
  }

  for (const relic of DEFAULT_RELICS) {
    entries.push({
      loc: `/di-vat/${relic.id}`,
      changefreq: "monthly",
      priority: "0.6",
    })
  }

  for (const race of RACES) {
    entries.push({
      loc: `/toc-he/toc/${race.id}`,
      changefreq: "monthly",
      priority: "0.6",
    })
  }

  for (const cls of CLASSES) {
    entries.push({
      loc: `/toc-he/he/${cls.id}`,
      changefreq: "monthly",
      priority: "0.6",
    })
  }

  for (const post of DEFAULT_POSTS.filter((p) => p.status === "Xuất bản")) {
    entries.push({
      loc: `/tin-tuc/${post.id}`,
      changefreq: "weekly",
      priority: "0.7",
    })
  }

  return entries
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((entry) => {
      const loc = `${SITE_URL}${entry.loc}`
      const changefreq = entry.changefreq ? `\n    <changefreq>${entry.changefreq}</changefreq>` : ""
      const priority = entry.priority ? `\n    <priority>${entry.priority}</priority>` : ""
      return `  <url>\n    <loc>${loc}</loc>${changefreq}${priority}\n  </url>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export function getSitemapUrlCount(): number {
  return buildSitemapEntries().length
}
