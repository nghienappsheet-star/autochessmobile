import * as React from "react"
import { Card, Button, Input, Badge } from "@/components/ui/core"
import { X, Server } from "lucide-react"
import { buildPageMeta } from "@/lib/seo/meta"
import { getSitemapUrlCount } from "@/lib/seo/sitemap"
import { pageTitle, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site"
import type { SeoSettings } from "@/hooks/useSiteSettings"

export type SeoPageMetaRow = {
  path: string
  name: string
  title: string
  desc: string
}

const PAGE_META_DEFS: Omit<SeoPageMetaRow, "title" | "desc">[] = [
  { path: "/", name: "Trang chủ" },
  { path: "/doi-hinh", name: "Đội hình" },
  { path: "/tuong", name: "Tướng bóng tối" },
  { path: "/trang-bi", name: "Thư viện trang bị" },
]

const DEFAULT_PAGE_ROWS: SeoPageMetaRow[] = [
  { path: "/", name: "Trang chủ", title: pageTitle(), desc: SITE_DESCRIPTION },
  {
    path: "/doi-hinh",
    name: "Đội hình",
    title: "Đội hình Auto Chess mạnh nhất | Meta đấu trường",
    desc: "Danh sách bento grid các đội hình khuyên dùng được xếp hạng S, A, B từ tuyển thủ chuyên nghiệp.",
  },
  {
    path: "/tuong",
    name: "Tướng bóng tối",
    title: "Cơ sở dữ liệu tướng Auto Chess | Chỉ số & Kỹ năng",
    desc: "Tra cứu bộ chỉ số chi tiết của từng tướng bao gồm máu, sát thương, tầm đánh và mô tả chi tiết kỹ năng kích hoạt.",
  },
  {
    path: "/trang-bi",
    name: "Thư viện trang bị",
    title: "Thư viện trang bị Auto Chess Mobile | Hiệu ứng & Meta",
    desc: "Tra cứu trang bị theo bậc, hiệu ứng đặc biệt, tướng khuyên dùng và gợi ý chiến thuật cho carry.",
  },
]

export function pagesMetaToRows(pagesMeta: SeoSettings["pagesMeta"]): SeoPageMetaRow[] {
  return PAGE_META_DEFS.map((def) => {
    const fallback = DEFAULT_PAGE_ROWS.find((row) => row.path === def.path)
    const stored = pagesMeta[def.path]
    return {
      ...def,
      title: stored?.title ?? fallback?.title ?? pageTitle(def.name),
      desc: stored?.description ?? fallback?.desc ?? SITE_DESCRIPTION,
    }
  })
}

export function rowsToPagesMeta(rows: SeoPageMetaRow[]): SeoSettings["pagesMeta"] {
  return Object.fromEntries(rows.map((row) => [row.path, { title: row.title, description: row.desc }]))
}

export function buildDefaultSeoDraft(settings: SeoSettings) {
  return {
    gaId: settings.gaId || "G-EBP92XXXXX",
    robots:
      settings.robotsTxt || `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml`,
    schemaJson:
      settings.jsonLd ||
      `{\n  "@context": "https://schema.org",\n  "@type": "Game",\n  "name": "${SITE_NAME}",\n  "genre": "Strategy game"\n}`,
    keywords: settings.keywords,
    pagesMeta: pagesMetaToRows(settings.pagesMeta),
  }
}

export type SeoFormDraft = ReturnType<typeof buildDefaultSeoDraft>

type AdminSeoFormProps = {
  value: SeoFormDraft
  onChange: (value: SeoFormDraft) => void
}

export function AdminSeoForm({ value, onChange }: AdminSeoFormProps) {
  const [newKeyword, setNewKeyword] = React.useState("")
  const patch = (partial: Partial<SeoFormDraft>) => onChange({ ...value, ...partial })

  const handleAddKeyword = () => {
    if (!newKeyword.trim() || value.keywords.includes(newKeyword.trim())) return
    patch({ keywords: [...value.keywords, newKeyword.trim()] })
    setNewKeyword("")
  }

  const handleUpdatePageMeta = (index: number, field: "title" | "desc", fieldValue: string) => {
    patch({
      pagesMeta: value.pagesMeta.map((row, i) =>
        i === index ? { ...row, [field]: fieldValue } : row
      ),
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8">
          <h3 className="admin-card-title uppercase mb-6 border-b border-brand-border pb-4">
            Cấu hình Thẻ Meta từng trang con
          </h3>
          <div className="space-y-6">
            {value.pagesMeta.map((page, idx) => (
              <div
                key={page.path}
                className="space-y-3 bg-brand-card-2/30 p-4 rounded-xl border border-brand-border"
              >
                <div className="flex items-center justify-between">
                  <span className="admin-table-cell font-bold text-brand-gold">{page.name}</span>
                  <span className="admin-meta font-mono">{page.path}</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="admin-form-label uppercase tracking-wider">Tiêu đề (Meta Title)</label>
                    <Input
                      value={page.title}
                      onChange={(e) => handleUpdatePageMeta(idx, "title", e.target.value)}
                      className="bg-brand-card border-brand-border rounded-xl text-[13px]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="admin-form-label uppercase tracking-wider">Mô tả (Meta Description)</label>
                    <textarea
                      value={page.desc}
                      onChange={(e) => handleUpdatePageMeta(idx, "desc", e.target.value)}
                      className="w-full text-[13px] font-medium text-brand-text-main bg-brand-card border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 h-16 resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
            <p className="admin-meta leading-relaxed pt-2 border-t border-brand-border">
              Meta tại đây lưu trong trình duyệt (localStorage) và chỉ áp dụng phía client — crawler và
              share preview Facebook/Zalo nhận meta từ SSR (<span className="font-mono text-brand-gold/80">buildPageMeta</span>{" "}
              trong route). Để thay đổi meta production, cập nhật{" "}
              <span className="font-mono text-brand-gold/80">STATIC_ROUTE_META</span> hoặc loader tương ứng.
            </p>
            <p className="admin-meta leading-relaxed pt-2">
              Trang chi tiết động (<span className="font-mono text-brand-gold/80">/tuong/:id</span>,{" "}
              <span className="font-mono text-brand-gold/80">/thao-luan/:id</span>,{" "}
              <span className="font-mono text-brand-gold/80">/trang-bi/:id</span>,{" "}
              <span className="font-mono text-brand-gold/80">/toc-he/toc|he/:id</span>) tự đặt title và mô tả theo
              dữ liệu từng mục khi render server-side.
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6">
            <h4 className="admin-card-title uppercase mb-4 flex items-center justify-between">
              <span>robots.txt</span>
              <Badge variant="secondary">Writable</Badge>
            </h4>
            <textarea
              value={value.robots}
              onChange={(e) => patch({ robots: e.target.value })}
              className="w-full h-[180px] bg-brand-card border border-brand-border rounded-xl p-4 text-[12px] font-mono text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
            />
          </Card>

          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6">
            <h4 className="admin-card-title uppercase mb-4 flex items-center justify-between">
              <span>JSON-LD Structured Data</span>
              <Badge variant="secondary">Schema.org</Badge>
            </h4>
            <textarea
              value={value.schemaJson}
              onChange={(e) => patch({ schemaJson: e.target.value })}
              className="w-full h-[180px] bg-brand-card border border-brand-border rounded-xl p-4 text-[12px] font-mono text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
            />
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4">
          <h3 className="admin-card-title uppercase mb-2">Thẻ Từ Khóa (Keywords)</h3>
          <p className="admin-meta">
            Từ khóa giúp tăng khả năng tìm kiếm chính xác bài viết và bảng số liệu trên các công cụ tìm kiếm.
          </p>

          <div className="flex gap-2">
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Thêm keyword..."
              className="h-10 text-[13px]"
              onKeyDown={(e) => e.key === "Enter" && handleAddKeyword()}
            />
            <Button
              onClick={handleAddKeyword}
              className="h-10 px-4 bg-brand-gold text-black shrink-0 font-bold text-[12px] rounded-xl shadow-none uppercase"
            >
              Thêm
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {value.keywords.map((kw) => (
              <div
                key={kw}
                className="inline-flex items-center gap-1 bg-brand-card-2 border border-brand-border text-brand-text-main pl-2.5 pr-1 py-1 rounded-lg text-[11px] font-bold tracking-wide"
              >
                <span>{kw}</span>
                <button
                  type="button"
                  onClick={() => patch({ keywords: value.keywords.filter((k) => k !== kw) })}
                  className="p-0.5 rounded hover:bg-brand-card text-brand-text-sub hover:text-brand-text-main transition-all"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4">
          <h3 className="admin-card-title uppercase mb-2">Analytics & Trackers</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="admin-form-label uppercase tracking-wider">Google Analytics ID</label>
              <Input
                value={value.gaId}
                onChange={(e) => patch({ gaId: e.target.value })}
                placeholder="G-XXXXXXXXXX"
                className="h-10 text-[13px]"
              />
            </div>
            <div className="space-y-1 pt-2">
              <label className="admin-form-label uppercase tracking-wider">Bing Webmaster ID</label>
              <Input placeholder="Không hoạt động" disabled className="h-10 text-[13px] opacity-40" />
            </div>
          </div>
        </Card>

        <Card className="bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4">
          <h3 className="admin-card-title uppercase mb-2 flex items-center gap-2">
            <Server className="h-4 w-4 text-brand-gold" /> Trạng thái SEO
          </h3>
          <div className="space-y-3 max-w-full">
            <div className="flex justify-between admin-meta">
              <span>Canonical:</span>
              <span className="text-brand-green font-bold">SSR tự động theo route</span>
            </div>
            <div className="flex justify-between admin-meta">
              <span>robots.txt:</span>
              <a
                href={`${SITE_URL}/robots.txt`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold font-bold hover:underline"
              >
                {SITE_URL}/robots.txt
              </a>
            </div>
            <div className="flex justify-between admin-meta">
              <span>Sitemap.xml:</span>
              <a
                href={`${SITE_URL}/sitemap.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold font-bold hover:underline"
              >
                {getSitemapUrlCount()} URL
              </a>
            </div>
            <div className="flex justify-between admin-meta">
              <span>Google Analytics:</span>
              <span className="text-brand-text-sub font-medium">
                {import.meta.env.VITE_GA_ID ? "Đã cấu hình qua env" : "Chưa có VITE_GA_ID"}
              </span>
            </div>
            <p className="admin-meta leading-relaxed pt-2 border-t border-brand-border">
              Meta title/description từng trang con ở trên vẫn lưu localStorage cho client overlay.
              SSR dùng cấu hình route meta mặc định; cập nhật seed/route meta để thay đổi SEO server-side.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
