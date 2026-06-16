import * as React from "react"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"
import { Card, Button } from "@/components/ui/core"
import { ArrowLeft, ExternalLink, Save } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { HEROES } from "@/data"
import type { Hero } from "@/types/domain"
import { AdminPageHeader } from "@/components/admin/AdminPageHeader"
import {
  createDefaultHeroDraft,
  normalizeHeroDraft,
  resetHeroFieldsFromSeed,
  slugifyHeroId,
  type HeroResetSection,
} from "@/lib/admin-hero-form"

const AdminHeroForm = React.lazy(() =>
  import("@/components/admin/AdminHeroForm").then((m) => ({ default: m.AdminHeroForm }))
)

function HeroFormFallback() {
  return (
    <div className="py-12 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu tướng...</div>
  )
}

function getSeedHero(id: string): Hero | undefined {
  return HEROES.find((h) => h.id === id)
}

export function AdminHeroEditorPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()
  const isCreate = location.pathname.endsWith("/them")

  const {
    heroes,
    races,
    classes,
    items,
    media,
    addHero,
    replaceHero,
    resetHeroFields,
  } = useAppStore()

  const existing = !isCreate && id ? heroes.find((h) => h.id === id) : undefined

  const [draft, setDraft] = React.useState<Hero>(() =>
    existing ? { ...existing } : createDefaultHeroDraft()
  )

  React.useEffect(() => {
    if (isCreate) {
      setDraft(createDefaultHeroDraft())
    } else if (existing) {
      setDraft({ ...existing })
    }
  }, [isCreate, existing])

  if (!isCreate && id && !existing) {
    return (
      <div className="space-y-6 pb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/tuong")}
          className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </Button>
        <p className="text-brand-text-sub admin-body">Không tìm thấy tướng với ID &quot;{id}&quot;.</p>
      </div>
    )
  }

  const handleResetSection = (section: HeroResetSection) => {
    if (!existing) return
    resetHeroFields(existing.id, section)
    const seed = getSeedHero(existing.id)
    setDraft(resetHeroFieldsFromSeed(draft, seed, section))
  }

  const handleSave = () => {
    if (!draft.name.trim()) return

    if (isCreate) {
      const newId = slugifyHeroId(draft.name, heroes.map((h) => h.id))
      addHero(normalizeHeroDraft({ ...draft, id: newId }))
    } else if (existing) {
      replaceHero(normalizeHeroDraft(draft))
    }

    navigate("/admin/tuong")
  }

  const breadcrumb = isCreate ? "Tướng / Thêm mới" : "Tướng / Sửa"
  const heroIdForLink = isCreate ? slugifyHeroId(draft.name, heroes.map((h) => h.id)) : draft.id

  return (
    <div className="space-y-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/tuong")}
          className="text-brand-text-sub hover:text-brand-text-main group flex items-center gap-2 h-11 px-4 rounded-xl font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Quay lại
        </Button>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto sm:justify-end">
          {!isCreate && draft.id && (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-brand-border admin-meta flex-1 sm:flex-none"
            >
              <Link to={`/tuong/${draft.id}`} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Xem trên web
              </Link>
            </Button>
          )}
          {isCreate && draft.name.trim() && (
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-xl border-brand-border admin-meta flex-1 sm:flex-none"
            >
              <Link to={`/tuong/${heroIdForLink}`} target="_blank" rel="noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Xem trên web
              </Link>
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={!draft.name.trim()}
            className="bg-gold-gradient hover-gold-gradient text-black text-[14px] font-bold h-11 px-8 rounded-xl flex-1 sm:flex-none"
          >
            <Save className="w-4 h-4 mr-2" />
            {isCreate ? "Thêm tướng" : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      <AdminPageHeader
        title={isCreate ? "Thêm tướng mới" : `Sửa: ${existing?.name ?? draft.name}`}
        description="Cấu hình đầy đủ thông tin hiển thị trên trang /tuong — chỉ số, kỹ năng, ảnh, lore và trang bị gợi ý."
        breadcrumb={breadcrumb}
      />

      <Card className="bg-brand-card border-brand-border p-0 overflow-hidden rounded-xl">
        <div className="p-6 md:p-8">
          <React.Suspense fallback={<HeroFormFallback />}>
            <AdminHeroForm
              mode={isCreate ? "create" : "edit"}
              value={draft}
              onChange={setDraft}
              races={races}
              classes={classes}
              items={items}
              media={media}
              seedHero={!isCreate && existing ? getSeedHero(existing.id) ?? null : null}
              onResetSection={!isCreate ? handleResetSection : undefined}
            />
          </React.Suspense>
        </div>
      </Card>
    </div>
  )
}
