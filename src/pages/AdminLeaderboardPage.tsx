import * as React from "react"
import {
  Card,
  Button,
  Input,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Trophy, Plus, Trash2, Edit2, RefreshCw } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { LeaderboardPlayer } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminField,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableScroll,
} from "@/components/admin"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"

export function AdminLeaderboardPage() {
  const { players, addPlayer, updatePlayer, deletePlayer, rerankPlayers } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [successMsg, setSuccessMsg] = React.useState("")

  const [newName, setNewName] = React.useState("")
  const [newMmr, setNewMmr] = React.useState("")
  const [newTier, setNewTier] = React.useState("Queen")

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingPlayer, setEditingPlayer] = React.useState<LeaderboardPlayer | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<LeaderboardPlayer | null>(null)

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleCreatePlayer = () => {
    if (!newName.trim() || !newMmr.trim()) return
    const mmrVal = parseInt(newMmr) || 1200
    const id = nextNumericId(players)
    addPlayer({
      id,
      rank: players.length + 1,
      name: newName,
      server: "VN-1",
      mmr: mmrVal,
      tier: newTier,
      winRate: "25.0%",
      matches: 10,
    })
    setNewName("")
    setNewMmr("")
    showSuccess(`Đã thêm đấu sĩ ${newName} vào bảng xếp hạng!`)
  }

  const handleUpdateMmr = () => {
    if (!editingPlayer || !editingPlayer.name.trim()) return
    updatePlayer(editingPlayer.id, {
      mmr: editingPlayer.mmr,
      tier: editingPlayer.tier,
      name: editingPlayer.name,
      server: editingPlayer.server,
      winRate: editingPlayer.winRate,
      matches: editingPlayer.matches,
    })
    setEditingPlayer(null)
    setIsEditOpen(false)
    showSuccess(`Đã cập nhật MMR cho ${editingPlayer.name}!`)
  }

  const handleDeletePlayer = () => {
    if (!deleteTarget) return
    deletePlayer(deleteTarget.id)
    setDeleteTarget(null)
    showSuccess(`Đã loại ${deleteTarget.name} khỏi bảng xếp hạng.`)
  }

  const handleSyncMMR = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      rerankPlayers()
      setIsRefreshing(false)
      showSuccess("Thao tác đồng bộ dữ liệu MMR trực tiếp từ API Tencent/Dragonest hoàn tất!")
    }, 1500)
  }

  const filteredList = players.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        icon={Trophy}
        title="Bảng xếp hạng kị thủ"
        description="Quản lý thứ hạng thi đấu, điểm số Elo xếp hạng Queen/King mùa thi đấu S20."
      >
        <Button
          onClick={handleSyncMMR}
          disabled={isRefreshing}
          className="gap-2 bg-brand-card border border-brand-border hover:bg-brand-card-2 text-brand-text-main font-bold text-[13px] rounded-xl h-11 px-6 shadow-none"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /> Đồng bộ API Game
        </Button>
      </AdminPageHeader>

      <AdminSuccessBanner message={successMsg} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden flex flex-col">
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Tra cứu tên đấu thủ..."
              className="border-b border-brand-border bg-brand-card-2/30"
            />

            <AdminTableScroll>
              <AdminTable minWidth="800px">
                <AdminThead sticky={false}>
                  <AdminTr className="hover:bg-transparent">
                    <AdminTh className="w-16 text-center">Rank</AdminTh>
                    <AdminTh>Tên tuyển thủ</AdminTh>
                    <AdminTh className="text-center">Bậc hạng</AdminTh>
                    <AdminTh className="text-right">Mmr (Elo)</AdminTh>
                    <AdminTh className="text-right">Tỷ lệ Thắng</AdminTh>
                    <AdminTh className="text-center">Số Trận</AdminTh>
                    <AdminTh className="text-right w-24">Thao tác</AdminTh>
                  </AdminTr>
                </AdminThead>
                <tbody>
                  {filteredList.map((player) => (
                    <AdminTr key={player.id} className="group">
                      <AdminTd className="text-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] font-mono mx-auto ${
                            player.rank === 1
                              ? "bg-brand-gold text-black"
                              : player.rank === 2
                                ? "bg-brand-text-sub text-black"
                                : player.rank === 3
                                  ? "bg-brand-gold-deep text-white"
                                  : "bg-brand-card-2 text-brand-text-sub"
                          }`}
                        >
                          {player.rank}
                        </div>
                      </AdminTd>
                      <AdminTd>
                        <span className="font-bold text-brand-text-main group-hover:text-brand-gold transition-colors">
                          {player.name}
                        </span>
                        <div className="admin-meta font-mono">{player.server}</div>
                      </AdminTd>
                      <AdminTd className="text-center">
                        <Badge
                          variant={player.tier === "Queen" ? "danger" : "warning"}
                          className="text-[9px] px-1 py-0.5 rounded-md"
                        >
                          {player.tier}
                        </Badge>
                      </AdminTd>
                      <AdminTd className="text-right font-mono font-bold text-brand-gold">{player.mmr}</AdminTd>
                      <AdminTd className="text-right font-mono text-brand-text-sub">{player.winRate}</AdminTd>
                      <AdminTd className="text-center font-mono text-brand-text-sub">{player.matches}</AdminTd>
                      <AdminTd className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            onClick={() => {
                              setEditingPlayer({ ...player })
                              setIsEditOpen(true)
                            }}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-brand-gold rounded-lg"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            onClick={() => setDeleteTarget(player)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-brand-red rounded-lg"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </AdminTd>
                    </AdminTr>
                  ))}
                </tbody>
              </AdminTable>
            </AdminTableScroll>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5">
            <h3 className="admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3">
              <Plus className="h-4 w-4 text-brand-gold" /> Thêm tuyển thủ
            </h3>
            <div className="space-y-4">
              <AdminField label="Mã Tên (IGN)">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ví dụ: T_Rex_Auto"
                />
              </AdminField>
              <AdminField label="Điểm số MMR">
                <Input
                  value={newMmr}
                  onChange={(e) => setNewMmr(e.target.value)}
                  placeholder="Ví dụ: 3200"
                  type="number"
                />
              </AdminField>
              <AdminField label="Phân hạng">
                <Select value={newTier} onValueChange={setNewTier}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Queen">Bậc Queen (Nữ Hoàng)</SelectItem>
                    <SelectItem value="King">Bậc King (Vua)</SelectItem>
                    <SelectItem value="Rook">Bậc Rook (Xe)</SelectItem>
                    <SelectItem value="Bishop">Bậc Bishop (Tượng)</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>

              <Button
                onClick={handleCreatePlayer}
                className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
              >
                Cập nhật lên bảng xếp hạng
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Chỉnh sửa MMR"
        description="Cập nhật điểm MMR và phân hạng của tuyển thủ. Thứ hạng sẽ tự động sắp xếp lại."
        size="sm"
        onSubmit={handleUpdateMmr}
        submitLabel="Lưu MMR"
      >
        {editingPlayer && (
          <div className="space-y-4">
            <AdminField label="Tên tuyển thủ">
              <Input
                value={editingPlayer.name}
                onChange={(e) => setEditingPlayer({ ...editingPlayer, name: e.target.value })}
              />
            </AdminField>
            <AdminField label="MMR">
              <Input
                type="number"
                value={editingPlayer.mmr}
                onChange={(e) =>
                  setEditingPlayer({ ...editingPlayer, mmr: parseInt(e.target.value) || 0 })
                }
              />
            </AdminField>
            <AdminField label="Phân hạng">
              <Select
                value={editingPlayer.tier}
                onValueChange={(tier) => setEditingPlayer({ ...editingPlayer, tier })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Queen">Queen</SelectItem>
                  <SelectItem value="King">King</SelectItem>
                  <SelectItem value="Rook">Rook</SelectItem>
                  <SelectItem value="Bishop">Bishop</SelectItem>
                </SelectContent>
              </Select>
            </AdminField>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Loại khỏi bảng xếp hạng"
        description={
          deleteTarget
            ? `Bạn chắc chắn muốn loại "${deleteTarget.name}" ra khỏi danh sách bảng xếp hạng?`
            : ""
        }
        onConfirm={handleDeletePlayer}
        confirmLabel="Loại tuyển thủ"
      />
    </div>
  )
}
