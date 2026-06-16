import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField } from "@/components/admin/AdminField"
import type { LeaderboardPlayer } from "@/types/domain"

export type PlayerFormValue = {
  name: string
  mmr: string
  tier: string
}

type AdminPlayerFormProps = {
  value: PlayerFormValue
  onChange: (value: PlayerFormValue) => void
  namePlaceholder?: string
}

const TIER_OPTIONS = [
  { value: "Queen", label: "Bậc Queen (Nữ Hoàng)" },
  { value: "King", label: "Bậc King (Vua)" },
  { value: "Rook", label: "Bậc Rook (Xe)" },
  { value: "Bishop", label: "Bậc Bishop (Tượng)" },
] as const

export function AdminPlayerForm({
  value,
  onChange,
  namePlaceholder = "Ví dụ: T_Rex_Auto",
}: AdminPlayerFormProps) {
  const patch = (partial: Partial<PlayerFormValue>) => onChange({ ...value, ...partial })

  return (
    <div className="space-y-4">
      <AdminField label="Mã Tên (IGN)">
        <Input
          value={value.name}
          onChange={(e) => patch({ name: e.target.value })}
          placeholder={namePlaceholder}
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Điểm số MMR">
        <Input
          value={value.mmr}
          onChange={(e) => patch({ mmr: e.target.value })}
          placeholder="Ví dụ: 3200"
          type="number"
          className="bg-brand-card border-brand-border rounded-xl h-11"
        />
      </AdminField>
      <AdminField label="Phân hạng">
        <Select value={value.tier} onValueChange={(tier) => patch({ tier })}>
          <SelectTrigger className="h-11 rounded-xl bg-brand-card border-brand-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIER_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
    </div>
  )
}

export const EMPTY_PLAYER_FORM: PlayerFormValue = {
  name: "",
  mmr: "",
  tier: "Queen",
}

export function playerFormFromPlayer(player: LeaderboardPlayer): PlayerFormValue {
  return {
    name: player.name,
    mmr: String(player.mmr),
    tier: player.tier,
  }
}

export function playerPatchFromFormValue(value: PlayerFormValue): Pick<
  LeaderboardPlayer,
  "name" | "mmr" | "tier"
> {
  return {
    name: value.name.trim(),
    mmr: parseInt(value.mmr, 10) || 1200,
    tier: value.tier,
  }
}

export function playerFromFormValue(
  value: PlayerFormValue,
  id: string,
  rank: number
): LeaderboardPlayer {
  const patch = playerPatchFromFormValue(value)
  return {
    id,
    rank,
    name: patch.name,
    server: "VN-1",
    mmr: patch.mmr,
    tier: patch.tier,
    winRate: "25.0%",
    matches: 10,
  }
}
