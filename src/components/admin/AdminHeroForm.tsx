import * as React from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { ExternalLink, Plus, RotateCcw, Trash2 } from "lucide-react"
import type { ClassSynergy, Hero, HeroSkin, Item, MediaAsset, Race } from "@/types/domain"
import { AdminField, AdminFormGrid, AdminFormGridFull } from "@/components/admin/AdminField"
import { AdminMediaPicker } from "@/components/admin/AdminMediaPicker"
import {
  HERO_RARITIES,
  SKILL_TYPE_OPTIONS,
  createEmptySkin,
  ensureHeroStats,
  formatStarTuple,
  parseLines,
  parseOptionalNumber,
  parseStarTuple,
  type HeroResetSection,
} from "@/lib/admin-hero-form"
import { getHeroIconUrl } from "@/lib/hero-utils"
import { cn } from "@/lib/utils"

type AdminHeroFormTab = "basic" | "statsSkill" | "images" | "content"

const TAB_LABELS: Record<AdminHeroFormTab, string> = {
  basic: "Cơ bản",
  statsSkill: "Chỉ số & Kỹ năng",
  images: "Hình ảnh",
  content: "Nội dung",
}

type AdminHeroFormProps = {
  value: Hero
  onChange: (hero: Hero) => void
  mode: "create" | "edit"
  races: Race[]
  classes: ClassSynergy[]
  items: Item[]
  media: MediaAsset[]
  seedHero?: Hero | null
  onResetSection?: (section: HeroResetSection) => void
}

function toggleInList(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
}

function toggleInListWithMax(list: string[], id: string, max: number): string[] {
  if (list.includes(id)) return list.filter((x) => x !== id)
  if (list.length >= max) return list
  return [...list, id]
}

const MAX_TRAITS_PER_KIND = 2

function SectionResetButton({
  section,
  seedHero,
  onResetSection,
}: {
  section: HeroResetSection
  seedHero?: Hero | null
  onResetSection?: (section: HeroResetSection) => void
}) {
  if (!seedHero || !onResetSection) return null
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="h-8 rounded-lg text-brand-text-sub hover:text-brand-gold admin-meta gap-1.5"
      onClick={() => onResetSection(section)}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      Khôi phục từ seed
    </Button>
  )
}

export function AdminHeroForm({
  value,
  onChange,
  mode,
  races,
  classes,
  items,
  media,
  seedHero,
  onResetSection,
}: AdminHeroFormProps) {
  const [activeTab, setActiveTab] = React.useState<AdminHeroFormTab>("basic")
  const stats = ensureHeroStats(value.stats)
  const skill = value.skill ?? { name: "Kỹ năng đặc biệt", desc: "", type: "Chủ động" }
  const descByStar = skill.descByStar ?? ["", "", ""]

  const patch = (partial: Partial<Hero>) => onChange({ ...value, ...partial })
  const patchSkill = (partial: Partial<typeof skill>) =>
    onChange({ ...value, skill: { ...skill, ...partial } })
  const patchStats = (partial: Partial<typeof stats>) =>
    onChange({ ...value, stats: { ...stats, ...partial } })

  const iconPreview = getHeroIconUrl(value)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-brand-border">
        <div className="overflow-x-auto hide-scrollbar -mx-1 px-1">
          <div className="flex bg-brand-card border border-brand-border p-1 rounded-xl w-fit min-w-0">
            {(Object.keys(TAB_LABELS) as AdminHeroFormTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 sm:px-4 py-2 rounded-lg admin-meta font-bold uppercase tracking-wider transition-all shrink-0",
                  activeTab === tab
                    ? "bg-gold-gradient text-black"
                    : "text-brand-text-sub hover:text-brand-text-main"
                )}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
        </div>
        {mode === "edit" && value.id && (
          <Button asChild variant="outline" size="sm" className="h-9 rounded-xl border-brand-border admin-meta">
            <Link to={`/tuong/${value.id}`} target="_blank" rel="noreferrer">
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              Xem trên web
            </Link>
          </Button>
        )}
      </div>

      {activeTab === "basic" && (
        <AdminFormGrid>
          <div className="md:col-span-2 flex items-center justify-between gap-2">
            <span className="admin-form-label">Thông tin cơ bản</span>
            <SectionResetButton section="basic" seedHero={seedHero} onResetSection={onResetSection} />
          </div>
          <AdminField label="Tên tướng" required>
            <Input
              value={value.name}
              onChange={(e) => patch({ name: e.target.value })}
              placeholder="Ví dụ: Tsunami"
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Giá vàng ($)">
            <Input
              type="number"
              min={1}
              max={5}
              value={value.cost}
              onChange={(e) => patch({ cost: Number(e.target.value) })}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Độ hiếm">
            <Select
              value={value.rarity ?? "none"}
              onValueChange={(v) => patch({ rarity: v === "none" ? undefined : (v as Hero["rarity"]) })}
            >
              <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
                <SelectValue placeholder="Chọn độ hiếm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— Không đặt —</SelectItem>
                {HERO_RARITIES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AdminField>
          <AdminField label="Danh hiệu (chessTitle)">
            <Input
              value={value.chessTitle ?? ""}
              onChange={(e) => patch({ chessTitle: e.target.value || undefined })}
              placeholder="Ví dụ: Grandmaster"
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminFormGridFull>
            <AdminField
              label={`Chủng tộc (Tộc) — ${value.race.length}/${MAX_TRAITS_PER_KIND}`}
              hint="Tối đa 2 tộc. Để trống = Tộc chưa xác định"
            >
              <div className="max-h-32 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {races.map((race) => {
                  const checked = value.race.includes(race.name)
                  const atMax = value.race.length >= MAX_TRAITS_PER_KIND && !checked
                  return (
                    <label
                      key={race.id}
                      className={cn(
                        "flex items-center gap-2 admin-meta text-brand-text-sub",
                        atMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={atMax}
                        onChange={() =>
                          patch({ race: toggleInListWithMax(value.race, race.name, MAX_TRAITS_PER_KIND) })
                        }
                        className="rounded border-brand-border accent-brand-gold"
                      />
                      <span className="truncate">{race.name}</span>
                    </label>
                  )
                })}
              </div>
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField
              label={`Hệ (Class) — ${value.class.length}/${MAX_TRAITS_PER_KIND}`}
              hint="Tối đa 2 hệ. Để trống = Hệ chưa xác định"
            >
              <div className="max-h-32 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {classes.map((cls) => {
                  const checked = value.class.includes(cls.name)
                  const atMax = value.class.length >= MAX_TRAITS_PER_KIND && !checked
                  return (
                    <label
                      key={cls.id}
                      className={cn(
                        "flex items-center gap-2 admin-meta text-brand-text-sub",
                        atMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={atMax}
                        onChange={() =>
                          patch({ class: toggleInListWithMax(value.class, cls.name, MAX_TRAITS_PER_KIND) })
                        }
                        className="rounded border-brand-border accent-brand-gold"
                      />
                      <span className="truncate">{cls.name}</span>
                    </label>
                  )
                })}
              </div>
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Mô tả ngắn">
              <textarea
                value={value.description ?? ""}
                onChange={(e) => patch({ description: e.target.value || undefined })}
                className="w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                placeholder="Mô tả hiển thị trên trang chi tiết..."
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Đánh dấu tướng mới">
              <label className="flex items-center gap-3 h-11 px-4 rounded-xl border border-brand-border bg-brand-card cursor-pointer hover:bg-brand-card-2 transition-colors">
                <input
                  type="checkbox"
                  checked={Boolean(value.isNew)}
                  onChange={(e) => patch({ isNew: e.target.checked })}
                  className="h-4 w-4 rounded border-brand-border accent-brand-gold"
                />
                <span className="admin-body text-brand-text-main">Hiển thị badge &quot;Mới&quot; trên web</span>
              </label>
            </AdminField>
          </AdminFormGridFull>
        </AdminFormGrid>
      )}

      {activeTab === "statsSkill" && (
        <AdminFormGrid>
          <div className="md:col-span-2 flex items-center justify-between gap-2">
            <span className="admin-form-label">Chỉ số & kỹ năng</span>
            <SectionResetButton section="statsSkill" seedHero={seedHero} onResetSection={onResetSection} />
          </div>
          <AdminField label="HP (1★, 2★, 3★)" hint="Định dạng: 700, 1260, 2520">
            <Input
              value={formatStarTuple(stats.hp as [number, number, number] | undefined)}
              onChange={(e) => {
                const tuple = parseStarTuple(e.target.value)
                if (tuple) patchStats({ hp: tuple })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11 font-mono"
            />
          </AdminField>
          <AdminField label="ATK (1★, 2★, 3★)">
            <Input
              value={formatStarTuple(stats.atk as [number, number, number] | undefined)}
              onChange={(e) => {
                const tuple = parseStarTuple(e.target.value)
                if (tuple) patchStats({ atk: tuple })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11 font-mono"
            />
          </AdminField>
          <AdminField label="Giáp (armor)">
            <Input
              value={String(typeof stats.armor === "number" ? stats.armor : stats.armor?.[0] ?? "")}
              onChange={(e) => {
                const n = parseOptionalNumber(e.target.value)
                if (n !== undefined) patchStats({ armor: n })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Kháng phép (MR)">
            <Input
              value={String(typeof stats.mr === "number" ? stats.mr : stats.mr?.[0] ?? "")}
              onChange={(e) => {
                const n = parseOptionalNumber(e.target.value)
                if (n !== undefined) patchStats({ mr: n })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Tốc độ đánh">
            <Input
              value={String(
                typeof stats.atkSpeed === "number" ? stats.atkSpeed : stats.atkSpeed?.[0] ?? ""
              )}
              onChange={(e) => {
                const n = parseOptionalNumber(e.target.value)
                patchStats({ atkSpeed: n })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Tầm đánh">
            <Input
              value={String(typeof stats.range === "number" ? stats.range : stats.range?.[0] ?? "")}
              onChange={(e) => {
                const n = parseOptionalNumber(e.target.value)
                patchStats({ range: n })
              }}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Tên kỹ năng">
            <Input
              value={skill.name}
              onChange={(e) => patchSkill({ name: e.target.value })}
              className="bg-brand-card border-brand-border rounded-xl h-11"
            />
          </AdminField>
          <AdminField label="Loại kỹ năng">
            <Select value={skill.type ?? "Chủ động"} onValueChange={(v) => patchSkill({ type: v })}>
              <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SKILL_TYPE_OPTIONS.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AdminField>
          <AdminFormGridFull>
            <AdminField label="Icon kỹ năng (URL)">
              <AdminMediaPicker
                value={skill.iconUrl ?? ""}
                onChange={(url) => patchSkill({ iconUrl: url || undefined })}
                media={media}
                categoryFilter="Tướng"
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Mô tả kỹ năng (mặc định)">
              <textarea
                value={skill.desc}
                onChange={(e) => patchSkill({ desc: e.target.value })}
                className="w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
              />
            </AdminField>
          </AdminFormGridFull>
          {[1, 2, 3].map((star) => (
            <React.Fragment key={star}>
            <AdminFormGridFull>
              <AdminField label={`Mô tả kỹ năng ${star}★`}>
                <textarea
                  value={descByStar[star - 1] ?? ""}
                  onChange={(e) => {
                    const next: [string, string, string] = [...descByStar] as [string, string, string]
                    next[star - 1] = e.target.value
                    patchSkill({
                      descByStar: next.some(Boolean) ? next : undefined,
                    })
                  }}
                  className="w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                  placeholder={star === 1 ? "Để trống nếu dùng mô tả mặc định" : ""}
                />
              </AdminField>
            </AdminFormGridFull>
            </React.Fragment>
          ))}
        </AdminFormGrid>
      )}

      {activeTab === "images" && (
        <AdminFormGrid>
          <div className="md:col-span-2 flex items-center justify-between gap-2">
            <span className="admin-form-label">Hình ảnh & skin</span>
            <SectionResetButton section="images" seedHero={seedHero} onResetSection={onResetSection} />
          </div>
          {iconPreview && (
            <AdminFormGridFull>
              <div className="flex items-center gap-4 p-3 rounded-xl border border-brand-border bg-brand-card-2">
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-brand-border bg-brand-card shrink-0">
                  <img src={iconPreview} alt="" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="admin-meta font-bold text-brand-text-main">Preview icon</p>
                  <p className="admin-meta text-brand-text-sub truncate max-w-md">{iconPreview}</p>
                </div>
              </div>
            </AdminFormGridFull>
          )}
          <AdminFormGridFull>
            <AdminField label="Icon vuông (iconUrl)">
              <AdminMediaPicker
                value={value.iconUrl ?? ""}
                onChange={(url) => patch({ iconUrl: url || undefined, imageUrl: url || value.imageUrl })}
                media={media}
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Portrait (portraitUrl)">
              <AdminMediaPicker
                value={value.portraitUrl ?? ""}
                onChange={(url) => patch({ portraitUrl: url || undefined })}
                media={media}
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Ảnh fallback (imageUrl)">
              <AdminMediaPicker
                value={value.imageUrl ?? ""}
                onChange={(url) => patch({ imageUrl: url || undefined })}
                media={media}
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <div className="flex items-center justify-between">
              <span className="admin-form-label">Skins</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 rounded-lg border-brand-border admin-meta"
                onClick={() => {
                  const skins = value.skins ?? []
                  patch({ skins: [...skins, createEmptySkin(skins.length + 1)] })
                }}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Thêm skin
              </Button>
            </div>
            <div className="space-y-3 mt-2">
              {(value.skins ?? []).map((skin, index) => (
                <React.Fragment key={skin.id}>
                <SkinRow
                  skin={skin}
                  media={media}
                  radioGroupName={`skin-default-${value.id || "new"}`}
                  onChange={(next) => {
                    const skins = [...(value.skins ?? [])]
                    skins[index] = next
                    patch({ skins })
                  }}
                  onRemove={() => {
                    patch({ skins: (value.skins ?? []).filter((_, i) => i !== index) })
                  }}
                  onSetDefault={() => {
                    const skins = (value.skins ?? []).map((s, i) => ({
                      ...s,
                      isDefault: i === index,
                    }))
                    patch({ skins })
                  }}
                />
                </React.Fragment>
              ))}
              {(value.skins ?? []).length === 0 && (
                <p className="admin-meta text-brand-text-sub py-2">Chưa có skin — dùng portraitUrl mặc định.</p>
              )}
            </div>
          </AdminFormGridFull>
        </AdminFormGrid>
      )}

      {activeTab === "content" && (
        <AdminFormGrid>
          <div className="md:col-span-2 flex items-center justify-between gap-2">
            <span className="admin-form-label">Lore, chiến thuật & trang bị</span>
            <SectionResetButton section="content" seedHero={seedHero} onResetSection={onResetSection} />
          </div>
          <AdminFormGridFull>
            <AdminField label="Lore / Cốt truyện">
              <textarea
                value={value.lore ?? ""}
                onChange={(e) => patch({ lore: e.target.value || undefined })}
                className="w-full h-[120px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Gợi ý chiến thuật (mỗi dòng một ý)">
              <textarea
                value={(value.tacticalNotes ?? []).join("\n")}
                onChange={(e) => patch({ tacticalNotes: parseLines(e.target.value) })}
                className="w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
              />
            </AdminField>
          </AdminFormGridFull>
          <AdminFormGridFull>
            <AdminField label="Trang bị gợi ý">
              <div className="max-h-40 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((item) => (
                  <label key={item.id} className="flex items-center gap-2 admin-meta text-brand-text-sub cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(value.recommendedItemIds ?? []).includes(item.id)}
                      onChange={() =>
                        patch({
                          recommendedItemIds: toggleInList(value.recommendedItemIds ?? [], item.id),
                        })
                      }
                      className="rounded border-brand-border accent-brand-gold"
                    />
                    <span className="truncate">{item.name}</span>
                  </label>
                ))}
              </div>
            </AdminField>
          </AdminFormGridFull>
        </AdminFormGrid>
      )}
    </div>
  )
}

function SkinRow({
  skin,
  media,
  radioGroupName,
  onChange,
  onRemove,
  onSetDefault,
}: {
  skin: HeroSkin
  media: MediaAsset[]
  radioGroupName: string
  onChange: (skin: HeroSkin) => void
  onRemove: () => void
  onSetDefault: () => void
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-card p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Input
          value={skin.name}
          onChange={(e) => onChange({ ...skin, name: e.target.value })}
          placeholder="Tên skin"
          className="h-9 rounded-lg bg-brand-card-2 border-brand-border flex-1"
        />
        <label className="flex items-center gap-1.5 admin-meta text-brand-text-sub shrink-0 cursor-pointer">
          <input
            type="radio"
            name={radioGroupName}
            checked={Boolean(skin.isDefault)}
            onChange={onSetDefault}
            className="accent-brand-gold"
          />
          Mặc định
        </label>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-brand-red shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      <AdminMediaPicker
        value={skin.imageUrl}
        onChange={(url) => onChange({ ...skin, imageUrl: url })}
        media={media}
        label="Chọn ảnh"
      />
    </div>
  )
}
