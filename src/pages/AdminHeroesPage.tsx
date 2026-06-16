import * as React from "react"
import {
  Button,
  Badge,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Swords } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/contexts/DataContext"
import type { Hero } from "@/types/domain"
import { cn } from "@/lib/utils"
import { getHeroIconUrl } from "@/lib/hero-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminDeleteDialog,
  AdminListShell,
  AdminDataTable,
  AdminToolbar,
  AdminInlineFilter,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableFooterText,
  AdminRowActions,
} from "@/components/admin"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const ALL_RACES = "all-races"
const ALL_CLASSES = "all-classes"
const ALL_COSTS = "all-costs"

export function AdminHeroesPage() {
  const navigate = useNavigate()
  const { heroes, races, classes, deleteHero } = useAppStore()
  const [search, setSearch] = React.useState("")
  const [selectedCost, setSelectedCost] = React.useState(ALL_COSTS)
  const [selectedRace, setSelectedRace] = React.useState(ALL_RACES)
  const [selectedClass, setSelectedClass] = React.useState(ALL_CLASSES)

  const matchHero = React.useCallback(
    (hero: Hero, q: string) => {
      const query = q.toLowerCase()
      const matchesSearch =
        hero.name.toLowerCase().includes(query) ||
        hero.race.some((r) => r.toLowerCase().includes(query)) ||
        hero.class.some((c) => c.toLowerCase().includes(query))
      const matchesCost = selectedCost === ALL_COSTS || hero.cost === Number(selectedCost)
      const matchesRace = selectedRace === ALL_RACES || hero.race.includes(selectedRace)
      const matchesClass = selectedClass === ALL_CLASSES || hero.class.includes(selectedClass)
      return matchesSearch && matchesCost && matchesRace && matchesClass
    },
    [selectedCost, selectedRace, selectedClass]
  )

  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems: filteredHeroes,
    paginatedItems: paginatedHeroes,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
  } = useAdminListPage({
    items: heroes,
    searchTerm: search,
    match: matchHero,
    resetDeps: [selectedCost, selectedRace, selectedClass],
  })

  const goToEditor = (heroId: string) => navigate(`/admin/tuong/${heroId}/sua`)

  const confirmDeleteHero = () => {
    if (dialogs.deleteTarget) {
      deleteHero(dialogs.deleteTarget.id)
      showSuccess(`Đã xóa tướng "${dialogs.deleteTarget.name}".`)
      dialogs.closeDelete()
    }
  }

  const getCostColorHex = (cost: number) => {
    switch (cost) {
      case 5:
        return "text-brand-gold border-brand-gold/30 bg-brand-gold/5"
      case 4:
        return "text-tier-b border-tier-b/30 bg-tier-b/5"
      case 3:
        return "text-brand-green border-brand-green/30 bg-brand-green/5"
      case 2:
        return "text-brand-green border-brand-green/30 bg-brand-green/5"
      default:
        return "text-brand-text-sub border-brand-border bg-brand-card-2"
    }
  }

  return (
    <>
      <AdminListShell
        header={
          <>
            <AdminPageHeader
              icon={Swords}
              title="Quản lý tướng"
              description="Cấu hình đầy đủ thông tin hiển thị trên trang /tuong — chỉ số, kỹ năng, ảnh, lore và trang bị gợi ý."
            >
              <Button
                size="default"
                onClick={() => navigate("/admin/tuong/them")}
                className="gap-2 bg-gold-gradient text-black font-bold admin-meta h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
              >
                <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Thêm tướng mới
              </Button>
            </AdminPageHeader>
            <AdminSuccessBanner message={successMessage ?? ""} />
          </>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar
              inline
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Tìm tên, tộc, hệ..."
            >
              <AdminInlineFilter label="Tộc" value={selectedRace} onValueChange={setSelectedRace}>
                <SelectItem value={ALL_RACES}>Tất cả tộc</SelectItem>
                {races.map((race) => (
                  <SelectItem key={race.id} value={race.name}>
                    {race.name}
                  </SelectItem>
                ))}
              </AdminInlineFilter>
              <AdminInlineFilter label="Hệ" value={selectedClass} onValueChange={setSelectedClass}>
                <SelectItem value={ALL_CLASSES}>Tất cả hệ</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.name}>
                    {cls.name}
                  </SelectItem>
                ))}
              </AdminInlineFilter>
              <AdminInlineFilter label="Giá vàng" value={selectedCost} onValueChange={setSelectedCost}>
                <SelectItem value={ALL_COSTS}>Tất cả mức giá</SelectItem>
                <SelectItem value="1">$1 vàng</SelectItem>
                <SelectItem value="2">$2 vàng</SelectItem>
                <SelectItem value="3">$3 vàng</SelectItem>
                <SelectItem value="4">$4 vàng</SelectItem>
                <SelectItem value="5">$5 vàng</SelectItem>
              </AdminInlineFilter>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredHeroes.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + 10, filteredHeroes.length)}
              total={filteredHeroes.length}
              label="đại hiệp"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedHeroes.length === 0}
          emptyTitle="Không tìm thấy anh hùng nào trùng khớp chỉ số."
          emptyDescription="Hãy thử gõ từ khóa tìm kiếm chính xác hơn."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh className="w-16 text-center">STT</AdminTh>
                <AdminTh>Tên nhân vật</AdminTh>
                <AdminTh className="text-center w-28">Giá vàng</AdminTh>
                <AdminTh>Tộc & Hệ cộng kích</AdminTh>
                <AdminTh className="text-center w-36">Cơ sở dữ liệu</AdminTh>
                <AdminTh className="text-right w-44">Thao tác dữ liệu</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedHeroes.map((row, idx) => {
                const actualIndex = startIndex + idx + 1
                const iconUrl = getHeroIconUrl(row)
                return (
                  <AdminTr key={row.id} className="group">
                    <AdminTd className="text-center text-brand-text-sub font-mono admin-meta">{actualIndex}</AdminTd>
                    <AdminTd>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-card-2 flex items-center justify-center border border-brand-border overflow-hidden group-hover:scale-[1.05] transition-transform shadow-inner">
                          {iconUrl ? (
                            <img src={iconUrl} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <span className="admin-body font-bold text-brand-gold uppercase tracking-tight">
                              {row.name.substring(0, 2)}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <button
                            onClick={() => goToEditor(row.id)}
                            className="text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight"
                          >
                            {row.name}
                          </button>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="admin-meta text-brand-text-sub font-mono tracking-wider opacity-90">
                              UID: {row.id.toUpperCase()}
                            </span>
                            {row.isNew && (
                              <Badge variant="success" className="admin-meta px-1.5 py-0 font-bold uppercase">
                                Mới
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-3 py-1 admin-meta font-bold uppercase rounded-lg border leading-none tracking-wider font-mono",
                          getCostColorHex(row.cost)
                        )}
                      >
                        $ {row.cost}
                      </span>
                    </AdminTd>
                    <AdminTd>
                      <div className="flex flex-wrap gap-1.5">
                        {row.race.length === 0 && row.class.length === 0 ? (
                          <Badge
                            variant="secondary"
                            className="bg-brand-card-2 border-brand-border text-brand-text-sub admin-meta px-2 py-0.5 font-bold rounded opacity-60"
                          >
                            Chưa xác định
                          </Badge>
                        ) : (
                          <>
                            {row.race.map((r) => (
                              <Badge
                                key={r}
                                variant="default"
                                className="bg-brand-card-2 border-brand-border text-brand-text-sub admin-meta px-2 py-0.5 font-bold uppercase tracking-wider rounded"
                              >
                                {r}
                              </Badge>
                            ))}
                            {row.class.map((c) => (
                              <Badge
                                key={c}
                                variant="warning"
                                className="bg-brand-gold/5 border-brand-gold/10 text-brand-gold admin-meta px-2 py-0.5 font-bold uppercase tracking-widest rounded"
                              >
                                {c}
                              </Badge>
                            ))}
                          </>
                        )}
                      </div>
                    </AdminTd>
                    <AdminTd className="text-center">
                      <span className="inline-flex items-center gap-1.5 text-brand-green admin-meta font-bold uppercase tracking-widest bg-brand-green/5 border border-brand-green/10 px-2.5 py-1 rounded-md leading-none">
                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
                        Đã Đồng Bộ
                      </span>
                    </AdminTd>
                    <AdminTd className="text-right">
                      <AdminRowActions
                        onView={() => goToEditor(row.id)}
                        onEdit={() => goToEditor(row.id)}
                        onDelete={() => dialogs.openDelete(row)}
                        viewLabel="Xem chi tiết"
                        editLabel="Sửa tướng"
                        deleteLabel="Xóa tướng"
                      />
                    </AdminTd>
                  </AdminTr>
                )
              })}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xác nhận xóa anh hùng"
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc muốn xóa vĩnh viễn tướng "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDeleteHero}
        confirmLabel="Xóa tướng"
      />
    </>
  )
}
