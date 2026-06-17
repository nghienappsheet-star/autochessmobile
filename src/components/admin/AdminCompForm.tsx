import * as React from "react"
import {
  Input,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SELECT_EMPTY_VALUE,
} from "@/components/ui/core"
import { cn } from "@/lib/utils"
import type { Comp, CompRoadmap, Hero } from "@/types/domain"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import {
  BOARD_ROW_LABELS,
  BOARD_ROWS,
  type BoardSlots,
  boardSlotsFromRecord,
  calcSynergiesFromHeroes,
  emptyBoardSlots,
  recordFromBoardSlots,
} from "@/lib/comp-formation"
import { computeCompRadarStats, type CompRadarStats } from "@/lib/comp-stats"
import {
  arrayToLines,
  countersToLines,
  emptyRoadmap,
  linesToArray,
  parseCounterLines,
  roadmapHasContent,
} from "@/lib/comp-detail"

const MAX_HEROES = 10

export const DEFAULT_RADAR_STATS: CompRadarStats = {
  attack: 50,
  defense: 50,
  control: 50,
  difficulty: 50,
  economy: 50,
  lateGame: 50,
}

export type CompFormValue = {
  name: string
  tier: string
  difficulty: number
  desc: string
  heroes: string[]
  boardSlots: BoardSlots
  radarStats: CompRadarStats
  mainCoreId: string
  coreHeroIds: string[]
  strengthsText: string
  weaknessesText: string
  tipsText: string
  roadmap: CompRoadmap
  strongAgainstText: string
  weakAgainstText: string
}

export const EMPTY_COMP_FORM: CompFormValue = {
  name: "",
  tier: "S",
  difficulty: 3,
  desc: "",
  heroes: [],
  boardSlots: emptyBoardSlots(),
  radarStats: DEFAULT_RADAR_STATS,
  mainCoreId: "",
  coreHeroIds: [],
  strengthsText: "",
  weaknessesText: "",
  tipsText: "",
  roadmap: emptyRoadmap(),
  strongAgainstText: "",
  weakAgainstText: "",
}

export function compFormFromComp(comp: Comp): CompFormValue {
  const heroIds = [...(comp.heroes ?? [])]
  return {
    name: comp.name,
    tier: comp.tier,
    difficulty: comp.difficulty ?? 3,
    desc: comp.desc,
    heroes: heroIds,
    boardSlots: boardSlotsFromRecord(comp.board, heroIds),
    radarStats: comp.radarStats ?? DEFAULT_RADAR_STATS,
    mainCoreId: comp.mainCoreId ?? "",
    coreHeroIds: comp.coreHeroIds ?? [],
    strengthsText: arrayToLines(comp.strengths),
    weaknessesText: arrayToLines(comp.weaknesses),
    tipsText: arrayToLines(comp.tips),
    roadmap: comp.roadmap ?? emptyRoadmap(),
    strongAgainstText: countersToLines(comp.strongAgainst, false),
    weakAgainstText: countersToLines(comp.weakAgainst, true),
  }
}

export function compFromFormValue(
  value: CompFormValue,
  id: string,
  heroes: Hero[],
  existing?: Comp
): Comp {
  const board = recordFromBoardSlots(value.boardSlots)
  const synergies = calcSynergiesFromHeroes(value.heroes, heroes)

  return {
    id,
    name: value.name.trim(),
    tier: value.tier,
    winRate: existing?.winRate ?? "0%",
    desc: value.desc.trim() || "Mô tả chiến thuật đội hình.",
    author: existing?.author ?? "Admin",
    likes: existing?.likes ?? "0",
    heroes: value.heroes,
    board,
    synergies,
    date: existing?.date ?? new Date().toLocaleDateString("vi-VN"),
    difficulty: value.difficulty,
    radarStats: value.radarStats,
    mainCoreId: value.mainCoreId || undefined,
    coreHeroIds: value.coreHeroIds.length ? value.coreHeroIds : undefined,
    strengths: (() => {
      const v = linesToArray(value.strengthsText)
      return v.length ? v : undefined
    })(),
    weaknesses: (() => {
      const v = linesToArray(value.weaknessesText)
      return v.length ? v : undefined
    })(),
    tips: (() => {
      const v = linesToArray(value.tipsText)
      return v.length ? v : undefined
    })(),
    roadmap: roadmapHasContent(value.roadmap) ? value.roadmap : undefined,
    strongAgainst: (() => {
      const v = parseCounterLines(value.strongAgainstText, false)
      return v.length ? v : undefined
    })(),
    weakAgainst: (() => {
      const v = parseCounterLines(value.weakAgainstText, true)
      return v.length ? v : undefined
    })(),
  }
}

const RADAR_STAT_FIELDS: { key: keyof CompRadarStats; label: string }[] = [
  { key: "attack", label: "Tấn Công" },
  { key: "defense", label: "Phòng Thủ" },
  { key: "control", label: "Khống chế" },
  { key: "difficulty", label: "Độ Khó" },
  { key: "economy", label: "Kinh Tế" },
  { key: "lateGame", label: "Late Game" },
]

function clampRadarValue(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

function toggleHeroId(list: string[], heroId: string): string[] {
  if (list.includes(heroId)) return list.filter((id) => id !== heroId)
  if (list.length >= MAX_HEROES) return list
  return [...list, heroId]
}

function pruneBoardSlots(slots: BoardSlots, allowed: Set<string>): BoardSlots {
  return slots.map((row) => row.map((id) => (id && allowed.has(id) ? id : null)))
}

function draftCompFromForm(value: CompFormValue, heroes: Hero[]): Comp {
  return {
    id: "draft",
    name: value.name || "Draft",
    author: "Admin",
    tier: value.tier,
    winRate: "0%",
    likes: "0",
    desc: value.desc,
    heroes: value.heroes,
    board: recordFromBoardSlots(value.boardSlots),
    synergies: calcSynergiesFromHeroes(value.heroes, heroes),
    date: new Date().toLocaleDateString("vi-VN"),
    difficulty: value.difficulty,
  }
}

type AdminCompFormProps = {
  value: CompFormValue
  onChange: (value: CompFormValue) => void
  heroes: Hero[]
  autoRadar?: boolean
}

export function AdminCompForm({ value, onChange, heroes, autoRadar = false }: AdminCompFormProps) {
  const patch = (partial: Partial<CompFormValue>) => onChange({ ...value, ...partial })

  const synergies = calcSynergiesFromHeroes(value.heroes, heroes)

  const handleHeroesChange = (next: string[]) => {
    const allowed = new Set(next)
    let updated: CompFormValue = {
      ...value,
      heroes: next,
      boardSlots: pruneBoardSlots(value.boardSlots, allowed),
      coreHeroIds: value.coreHeroIds.filter((id) => next.includes(id)),
      mainCoreId: next.includes(value.mainCoreId) ? value.mainCoreId : "",
    }
    if (autoRadar && next.length > 0) {
      updated = {
        ...updated,
        radarStats: computeCompRadarStats(draftCompFromForm(updated, heroes), heroes),
      }
    }
    onChange(updated)
  }

  return (
    <AdminFormGrid>
      <div className="space-y-4">
        <AdminField label="Tên đội hình">
          <Input
            value={value.name}
            onChange={(e) => patch({ name: e.target.value })}
            placeholder="Ví dụ: Exodia 5 Vàng"
            className="bg-brand-card-2 border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
          />
        </AdminField>
        <AdminField label="Độ ưu tiên (Tier)">
          <Select value={value.tier} onValueChange={(tier) => patch({ tier })}>
            <SelectTrigger className="bg-brand-card-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="S">S Tier (Cực mạnh)</SelectItem>
              <SelectItem value="A">A Tier (Mạnh)</SelectItem>
              <SelectItem value="B">B Tier (Ổn định)</SelectItem>
              <SelectItem value="C">C Tier (Tình huống)</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
        <AdminField label="Độ khó vận hành (1-5)">
          <Input
            type="number"
            min={1}
            max={5}
            value={value.difficulty}
            onChange={(e) => patch({ difficulty: Number(e.target.value) })}
            placeholder="1-5 sao"
            className="bg-brand-card-2 border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
          />
        </AdminField>
      </div>
      <div className="space-y-4">
        <AdminField label="Mô tả lối chơi">
          <textarea
            value={value.desc}
            onChange={(e) => patch({ desc: e.target.value })}
            className="w-full h-[120px] bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50"
            placeholder="Hướng dẫn cách lên cấp và Slowroll..."
          />
        </AdminField>
        <HeroChipPicker heroes={heroes} selected={value.heroes} onChange={handleHeroesChange} />
        {value.heroes.length > 0 && (
          <CoreHeroFields
            heroes={heroes}
            selectedHeroIds={value.heroes}
            mainCoreId={value.mainCoreId}
            coreHeroIds={value.coreHeroIds}
            onMainCoreChange={(mainCoreId) => {
              const coreHeroIds =
                mainCoreId && !value.coreHeroIds.includes(mainCoreId)
                  ? [...value.coreHeroIds, mainCoreId]
                  : value.coreHeroIds
              patch({ mainCoreId, coreHeroIds })
            }}
            onCoreHeroIdsChange={(coreHeroIds) =>
              patch({
                coreHeroIds,
                mainCoreId:
                  value.mainCoreId && coreHeroIds.includes(value.mainCoreId)
                    ? value.mainCoreId
                    : "",
              })
            }
          />
        )}
        <BoardSlotPicker
          heroes={heroes}
          selectedHeroIds={value.heroes}
          slots={value.boardSlots}
          onChange={(boardSlots) => patch({ boardSlots })}
        />
        <AdminField label="Tộc/hệ tự tính">
          <SynergyPreview synergies={synergies} />
        </AdminField>
        <RadarStatsFields
          value={value.radarStats}
          onChange={(radarStats) => patch({ radarStats })}
        />
        <CompGuideFields
          strengths={value.strengthsText}
          weaknesses={value.weaknessesText}
          tips={value.tipsText}
          roadmap={value.roadmap}
          strongAgainstText={value.strongAgainstText}
          weakAgainstText={value.weakAgainstText}
          onStrengthsChange={(strengthsText) => patch({ strengthsText })}
          onWeaknessesChange={(weaknessesText) => patch({ weaknessesText })}
          onTipsChange={(tipsText) => patch({ tipsText })}
          onRoadmapChange={(roadmap) => patch({ roadmap })}
          onStrongAgainstChange={(strongAgainstText) => patch({ strongAgainstText })}
          onWeakAgainstChange={(weakAgainstText) => patch({ weakAgainstText })}
        />
      </div>
    </AdminFormGrid>
  )
}

function RadarStatsFields({
  value,
  onChange,
}: {
  value: CompRadarStats
  onChange: (next: CompRadarStats) => void
}) {
  return (
    <div className="space-y-2">
      <label className="text-[12px] font-semibold text-brand-text-sub">Chỉ số phân tích (0–100)</label>
      <div className="grid grid-cols-2 gap-3">
        {RADAR_STAT_FIELDS.map(({ key, label }) => (
          <React.Fragment key={key}>
            <AdminField label={label}>
            <Input
              type="number"
              min={0}
              max={100}
              value={value[key]}
              onChange={(e) =>
                onChange({ ...value, [key]: clampRadarValue(Number(e.target.value)) })
              }
              className="bg-brand-card-2 border-brand-border rounded-xl h-11"
            />
          </AdminField>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

function HeroChipPicker({
  heroes,
  selected,
  onChange,
}: {
  heroes: { id: string; name: string }[]
  selected: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-semibold text-brand-text-sub">Tướng chủ lực (tối đa 10)</label>
        <span className="text-[11px] text-brand-text-sub font-mono">
          {selected.length}/{MAX_HEROES}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 max-h-[140px] overflow-y-auto custom-scrollbar p-1">
        {heroes.map((hero) => {
          const active = selected.includes(hero.id)
          return (
            <button
              key={hero.id}
              type="button"
              onClick={() => onChange(toggleHeroId(selected, hero.id))}
              className={cn(
                "px-3 py-1.5 rounded-md text-[11px] font-semibold border transition-all",
                active
                  ? "bg-gold-gradient text-black border-transparent"
                  : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:border-brand-gold/30 hover:text-brand-text-main"
              )}
            >
              {hero.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function BoardSlotPicker({
  heroes,
  selectedHeroIds,
  slots,
  onChange,
}: {
  heroes: { id: string; name: string }[]
  selectedHeroIds: string[]
  slots: BoardSlots
  onChange: (next: BoardSlots) => void
}) {
  const heroMap = new Map(heroes.map((h) => [h.id, h.name]))
  const pickable = selectedHeroIds
    .map((id) => ({ id, name: heroMap.get(id) ?? id }))
    .filter((h) => h.name)

  const updateSlot = (row: number, col: number, heroId: string) => {
    const next = slots.map((r) => [...r])
    next[row][col] = heroId || null
    onChange(next)
  }

  return (
    <div className="space-y-2">
      <label className="text-[12px] font-semibold text-brand-text-sub">Sắp xếp bàn cờ (4×2)</label>
      <div className="space-y-2 rounded-xl border border-brand-border bg-brand-card-2/50 p-3">
        {Array.from({ length: BOARD_ROWS }, (_, row) => (
          <div key={row} className="flex items-center gap-2">
            <span className="w-20 shrink-0 text-[10px] font-semibold text-brand-text-sub">
              {BOARD_ROW_LABELS[row]}
            </span>
            <div className="grid flex-1 grid-cols-2 gap-2">
              {[0, 1].map((col) => (
                <Select
                  key={col}
                  value={slots[row]?.[col] ? slots[row]![col]! : SELECT_EMPTY_VALUE}
                  onValueChange={(v) => updateSlot(row, col, v === SELECT_EMPTY_VALUE ? "" : v)}
                >
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={SELECT_EMPTY_VALUE}>— Trống —</SelectItem>
                    {pickable.map((hero) => (
                      <SelectItem key={hero.id} value={hero.id}>
                        {hero.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function toggleCoreHeroId(list: string[], heroId: string): string[] {
  if (list.includes(heroId)) return list.filter((id) => id !== heroId)
  return [...list, heroId]
}

function CoreHeroFields({
  heroes,
  selectedHeroIds,
  mainCoreId,
  coreHeroIds,
  onMainCoreChange,
  onCoreHeroIdsChange,
}: {
  heroes: { id: string; name: string }[]
  selectedHeroIds: string[]
  mainCoreId: string
  coreHeroIds: string[]
  onMainCoreChange: (id: string) => void
  onCoreHeroIdsChange: (ids: string[]) => void
}) {
  const roster = heroes.filter((h) => selectedHeroIds.includes(h.id))

  return (
    <div className="space-y-3">
      <AdminField label="Core chính">
        <Select
          value={mainCoreId || SELECT_EMPTY_VALUE}
          onValueChange={(v) => onMainCoreChange(v === SELECT_EMPTY_VALUE ? "" : v)}
        >
          <SelectTrigger className="bg-brand-card-2">
            <SelectValue placeholder="Chọn core chính" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SELECT_EMPTY_VALUE}>— Chưa chọn —</SelectItem>
            {roster.map((hero) => (
              <SelectItem key={hero.id} value={hero.id}>
                {hero.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
      <div className="space-y-2">
        <label className="text-[12px] font-semibold text-brand-text-sub">
          Core phụ (trong danh sách tướng đã chọn)
        </label>
        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto custom-scrollbar p-1">
          {roster.map((hero) => {
            const active = coreHeroIds.includes(hero.id)
            return (
              <button
                key={hero.id}
                type="button"
                onClick={() => onCoreHeroIdsChange(toggleCoreHeroId(coreHeroIds, hero.id))}
                className={cn(
                  "px-3 py-1.5 rounded-md text-[11px] font-semibold border transition-all",
                  active
                    ? "bg-gold-gradient text-black border-transparent"
                    : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:border-brand-gold/30"
                )}
              >
                {hero.name}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CompGuideFields({
  strengths,
  weaknesses,
  tips,
  roadmap,
  strongAgainstText,
  weakAgainstText,
  onStrengthsChange,
  onWeaknessesChange,
  onTipsChange,
  onRoadmapChange,
  onStrongAgainstChange,
  onWeakAgainstChange,
}: {
  strengths: string
  weaknesses: string
  tips: string
  roadmap: CompRoadmap
  strongAgainstText: string
  weakAgainstText: string
  onStrengthsChange: (v: string) => void
  onWeaknessesChange: (v: string) => void
  onTipsChange: (v: string) => void
  onRoadmapChange: (r: CompRoadmap) => void
  onStrongAgainstChange: (v: string) => void
  onWeakAgainstChange: (v: string) => void
}) {
  const textareaClass =
    "w-full min-h-[80px] bg-brand-card-2 border border-brand-border rounded-xl p-3 text-[13px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50"

  return (
    <div className="space-y-4">
      <AdminField label="Điểm mạnh (mỗi dòng 1 mục)">
        <textarea
          value={strengths}
          onChange={(e) => onStrengthsChange(e.target.value)}
          className={textareaClass}
          placeholder="Sát thương late game mạnh&#10;Khống chế diện rộng"
        />
      </AdminField>
      <AdminField label="Điểm yếu (mỗi dòng 1 mục)">
        <textarea value={weaknesses} onChange={(e) => onWeaknessesChange(e.target.value)} className={textareaClass} />
      </AdminField>
      <AdminField label="Lộ trình — Đầu game (1–10)">
        <Input
          value={roadmap.early ?? ""}
          onChange={(e) => onRoadmapChange({ ...roadmap, early: e.target.value })}
          className="bg-brand-card-2 border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Lộ trình — Giữa game (11–20)">
        <Input
          value={roadmap.mid ?? ""}
          onChange={(e) => onRoadmapChange({ ...roadmap, mid: e.target.value })}
          className="bg-brand-card-2 border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Lộ trình — Cuối game (21+)">
        <Input
          value={roadmap.late ?? ""}
          onChange={(e) => onRoadmapChange({ ...roadmap, late: e.target.value })}
          className="bg-brand-card-2 border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Có lợi trước (Tên | Lý do — mỗi dòng)">
        <textarea
          value={strongAgainstText}
          onChange={(e) => onStrongAgainstChange(e.target.value)}
          className={textareaClass}
          placeholder="Warrior-Beast | Thiếu kháng phép"
        />
      </AdminField>
      <AdminField label="Bất lợi trước (Tên | Lý do | Cách xử lý)">
        <textarea
          value={weakAgainstText}
          onChange={(e) => onWeakAgainstChange(e.target.value)}
          className={textareaClass}
          placeholder="Void Assassin | Nhảy vào carry | Đặt carry góc"
        />
      </AdminField>
      <AdminField label="Tips nâng cao (mỗi dòng 1 tip)">
        <textarea value={tips} onChange={(e) => onTipsChange(e.target.value)} className={textareaClass} />
      </AdminField>
    </div>
  )
}

function SynergyPreview({ synergies }: { synergies: Comp["synergies"] }) {
  if (synergies.length === 0) {
    return <p className="text-[11px] text-brand-text-sub">Chọn tướng để tự tính tộc/hệ.</p>
  }

  return (
    <div className="flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto custom-scrollbar">
      {synergies.slice(0, 8).map((syn) => (
        <Badge
          key={syn.name}
          variant="secondary"
          className={cn(
            "text-[10px] font-semibold rounded-md",
            syn.active
              ? "bg-brand-green/10 text-brand-green border-brand-green/20"
              : "bg-brand-card-2 text-brand-text-sub border-brand-border"
          )}
        >
          {syn.name}
        </Badge>
      ))}
    </div>
  )
}
