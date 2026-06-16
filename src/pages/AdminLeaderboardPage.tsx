import * as React from "react"
import { Card, Button, Badge } from "@/components/ui/core"
import { Trophy, Plus, RefreshCw } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { LeaderboardPlayer } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminRowActions,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableScroll,
} from "@/components/admin"
import {
  EMPTY_PLAYER_FORM,
  playerFormFromPlayer,
  playerFromFormValue,
  playerPatchFromFormValue,
} from "@/components/admin/AdminPlayerForm"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminPlayerForm = React.lazy(() =>
  import("@/components/admin/AdminPlayerForm").then((m) => ({ default: m.AdminPlayerForm }))
)

function PlayerFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu tuyển thủ...</div>
  )
}

export function AdminLeaderboardPage() {
  const { players, addPlayer, updatePlayer, deletePlayer, rerankPlayers } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isRefreshing, setIsRefreshing] = React.useState(false)
  const [newPlayerForm, setNewPlayerForm] = React.useState(EMPTY_PLAYER_FORM)

  const matchPlayer = React.useCallback(
    (player: LeaderboardPlayer, q: string) => player.name.toLowerCase().includes(q.toLowerCase()),
    []
  )

  const { dialogs, successMessage, showSuccess, filteredItems: filteredList } = useAdminListPage({
    items: players,
    searchTerm,
    match: matchPlayer,
  })

  const handleCreatePlayer = () => {
    if (!newPlayerForm.name.trim() || !newPlayerForm.mmr.trim()) return
    const id = nextNumericId(players)
    const created = playerFromFormValue(newPlayerForm, id, players.length + 1)
    addPlayer(created)
    setNewPlayerForm(EMPTY_PLAYER_FORM)
    showSuccess(`Đã thêm đấu sĩ ${created.name} vào bảng xếp hạng!`)
  }

  const handleUpdateMmr = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return
    updatePlayer(dialogs.editingItem.id, {
      ...playerPatchFromFormValue(playerFormFromPlayer(dialogs.editingItem)),
      server: dialogs.editingItem.server,
      winRate: dialogs.editingItem.winRate,
      matches: dialogs.editingItem.matches,
    })
    dialogs.closeEdit()
    showSuccess(`Đã cập nhật MMR cho ${dialogs.editingItem.name}!`)
  }

  const handleDeletePlayer = () => {
    if (!dialogs.deleteTarget) return
    deletePlayer(dialogs.deleteTarget.id)
    dialogs.closeDelete()
    showSuccess(`Đã loại ${dialogs.deleteTarget.name} khỏi bảng xếp hạng.`)
  }

  const handleSyncMMR = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      rerankPlayers()
      setIsRefreshing(false)
      showSuccess("Thao tác đồng bộ dữ liệu MMR trực tiếp từ API Tencent/Dragonest hoàn tất!")
    }, 1500)
  }

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

      <AdminSuccessBanner message={successMessage ?? ""} />

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
                        <AdminRowActions
                          onEdit={() => dialogs.openEdit({ ...player })}
                          onDelete={() => dialogs.openDelete(player)}
                          editLabel="Sửa MMR"
                          deleteLabel="Loại khỏi bảng"
                        />
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
            <React.Suspense fallback={<PlayerFormFallback />}>
              <AdminPlayerForm value={newPlayerForm} onChange={setNewPlayerForm} />
            </React.Suspense>
            <Button
              onClick={handleCreatePlayer}
              className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
            >
              Cập nhật lên bảng xếp hạng
            </Button>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title="Chỉnh sửa MMR"
        description="Cập nhật điểm MMR và phân hạng của tuyển thủ. Thứ hạng sẽ tự động sắp xếp lại."
        size="sm"
        onSubmit={handleUpdateMmr}
        submitLabel="Lưu MMR"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<PlayerFormFallback />}>
            <AdminPlayerForm
              value={playerFormFromPlayer(dialogs.editingItem)}
              onChange={(value) =>
                dialogs.setEditingItem({
                  ...dialogs.editingItem!,
                  ...playerPatchFromFormValue(value),
                })
              }
              namePlaceholder="Tên tuyển thủ"
            />
          </React.Suspense>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Loại khỏi bảng xếp hạng"
        description={
          dialogs.deleteTarget
            ? `Bạn chắc chắn muốn loại "${dialogs.deleteTarget.name}" ra khỏi danh sách bảng xếp hạng?`
            : ""
        }
        onConfirm={handleDeletePlayer}
        confirmLabel="Loại tuyển thủ"
      />
    </div>
  )
}
