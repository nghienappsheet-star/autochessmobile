import * as React from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Swords, Trash2, Edit2, Eye } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { HEROES } from "@/data"
import type { Hero } from "@/types/domain"
import { cn } from "@/lib/utils"
import {
  createDefaultHeroDraft,
  normalizeHeroDraft,
  resetHeroFieldsFromSeed,
  slugifyHeroId,
  type HeroResetSection,
} from "@/lib/admin-hero-form"
import { getHeroIconUrl } from "@/lib/hero-utils"
import {
  AdminPageHeader,
  AdminDeleteDialog,
  AdminListShell,
  AdminDataTable,
  AdminToolbar,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
  AdminTableFooterText,
  AdminFormDialog,
  AdminDetailDialog,
  AdminHeroForm,
} from "@/components/admin"

function getSeedHero(id: string): Hero | undefined {
  return HEROES.find((h) => h.id === id)
}

export function AdminHeroesPage() {
  const {
    heroes,
    races,
    classes,
    items,
    media,
    addHero,
    replaceHero,
    deleteHero,
    resetHeroFields,
  } = useAppStore()
  const [search, setSearch] = React.useState("")
  const [selectedCost, setSelectedCost] = React.useState("Tất cả giá")

  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [draftHero, setDraftHero] = React.useState<Hero>(() => createDefaultHeroDraft())

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingHero, setEditingHero] = React.useState<Hero | null>(null)

  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailHero, setDetailHero] = React.useState<Hero | null>(null)

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [heroToDelete, setHeroToDelete] = React.useState<Hero | null>(null)

  const openAddDialog = () => {
    setDraftHero(createDefaultHeroDraft())
    setIsAddOpen(true)
  }

  const handleCreateHero = () => {
    if (!draftHero.name.trim()) return
    const id = slugifyHeroId(
      draftHero.name,
      heroes.map((h) => h.id)
    )
    addHero(
      normalizeHeroDraft({
        ...draftHero,
        id,
      })
    )

    setDraftHero(createDefaultHeroDraft())
    setIsAddOpen(false)
  }

  const handleUpdateHero = () => {
    if (!editingHero || !editingHero.name.trim()) return
    replaceHero(normalizeHeroDraft(editingHero))
    setEditingHero(null)
    setIsEditOpen(false)
  }

  const handleResetSection = (section: HeroResetSection) => {
    if (!editingHero) return
    resetHeroFields(editingHero.id, section)
    const seed = getSeedHero(editingHero.id)
    setEditingHero(resetHeroFieldsFromSeed(editingHero, seed, section))
  }

  const confirmDeleteHero = () => {
    if (heroToDelete) {
      deleteHero(heroToDelete.id)
      setIsDeleteOpen(false)
      setHeroToDelete(null)
    }
  }

  const [currentPage, setCurrentPage] = React.useState(1)
  const pageSize = 10

  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch =
      hero.name.toLowerCase().includes(search.toLowerCase()) ||
      hero.race.some((r) => r.toLowerCase().includes(search.toLowerCase())) ||
      hero.class.some((c) => c.toLowerCase().includes(search.toLowerCase()))

    const matchesCost = selectedCost === "Tất cả giá" || hero.cost === Number(selectedCost)
    return matchesSearch && matchesCost
  })

  React.useEffect(() => {
    setCurrentPage(1)
  }, [search, selectedCost])

  const totalPages = Math.ceil(filteredHeroes.length / pageSize) || 1
  const startIndex = (currentPage - 1) * pageSize
  const paginatedHeroes = filteredHeroes.slice(startIndex, startIndex + pageSize)

  const getCostBadgeVariant = (cost: number) => {
    switch (cost) {
      case 5:
        return "warning-solid"
      case 4:
        return "danger-solid"
      case 3:
        return "success"
      case 2:
        return "warning"
      default:
        return "default"
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
          <AdminPageHeader
            icon={Swords}
            title="Quản lý tướng"
            description="Cấu hình đầy đủ thông tin hiển thị trên trang /tuong — chỉ số, kỹ năng, ảnh, lore và trang bị gợi ý."
          >
            <Button
              size="default"
              onClick={openAddDialog}
              className="gap-2 bg-gold-gradient text-black font-bold admin-meta h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Thêm tướng mới
            </Button>
          </AdminPageHeader>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Tìm tên, tộc, hệ hoặc kỹ năng..."
            >
              <Select value={selectedCost} onValueChange={setSelectedCost}>
                <SelectTrigger className="min-w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả giá">Tất cả giá vàng</SelectItem>
                  <SelectItem value="1">Giá: $1 vàng</SelectItem>
                  <SelectItem value="2">Giá: $2 vàng</SelectItem>
                  <SelectItem value="3">Giá: $3 vàng</SelectItem>
                  <SelectItem value="4">Giá: $4 vàng</SelectItem>
                  <SelectItem value="5">Giá: $5 vàng</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredHeroes.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredHeroes.length)}
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
                            onClick={() => {
                              setDetailHero(row)
                              setIsDetailOpen(true)
                            }}
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
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          onClick={() => {
                            setDetailHero(row)
                            setIsDetailOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-all border border-transparent hover:border-brand-border"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4 text-brand-text-sub" />
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingHero({ ...row })
                            setIsEditOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-text-main transition-all border border-transparent hover:border-brand-border"
                          title="Sửa tướng"
                        >
                          <Edit2 className="h-4 w-4 text-tier-b" />
                        </Button>
                        <Button
                          onClick={() => {
                            setHeroToDelete(row)
                            setIsDeleteOpen(true)
                          }}
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-lg hover:bg-brand-card-2 text-brand-text-sub hover:text-brand-red transition-all border border-transparent hover:border-brand-border"
                          title="Xóa tướng"
                        >
                          <Trash2 className="h-4 w-4 text-brand-red/70 hover:text-brand-red" />
                        </Button>
                      </div>
                    </AdminTd>
                  </AdminTr>
                )
              })}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        title="Thêm tướng mới"
        description="Nhập đầy đủ thông tin hiển thị trên website — tộc, hệ, chỉ số, kỹ năng, ảnh và trang bị."
        size="xl"
        onSubmit={handleCreateHero}
        submitLabel="Kích hoạt Tướng"
        cancelLabel="Hủy bỏ"
        submitDisabled={!draftHero.name.trim()}
      >
        <AdminHeroForm
          mode="create"
          value={draftHero}
          onChange={setDraftHero}
          races={races}
          classes={classes}
          items={items}
          media={media}
        />
      </AdminFormDialog>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={(open) => {
          setIsEditOpen(open)
          if (!open) setEditingHero(null)
        }}
        title="Chỉnh sửa anh hùng"
        description="Cập nhật toàn bộ nội dung hiển thị trên trang chi tiết tướng."
        size="xl"
        onSubmit={handleUpdateHero}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
        submitDisabled={!editingHero?.name.trim()}
      >
        {editingHero && (
          <AdminHeroForm
            mode="edit"
            value={editingHero}
            onChange={setEditingHero}
            races={races}
            classes={classes}
            items={items}
            media={media}
            seedHero={getSeedHero(editingHero.id) ?? null}
            onResetSection={handleResetSection}
          />
        )}
      </AdminFormDialog>

      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title={detailHero?.name ?? "Chi tiết tướng"}
        size="md"
        footer={
          detailHero ? (
            <>
              <Button asChild className="w-full sm:flex-1 h-11 bg-gold-gradient text-black rounded-xl font-bold uppercase admin-meta">
                <Link to={`/tuong/${detailHero.id}`} target="_blank" rel="noreferrer">
                  Xem trên web
                </Link>
              </Button>
              <Button
                onClick={() => setIsDetailOpen(false)}
                variant="outline"
                className="w-full sm:flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
              >
                Đóng cửa sổ
              </Button>
            </>
          ) : undefined
        }
      >
        {detailHero && (
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border">
              {getHeroIconUrl(detailHero) ? (
                <img
                  src={getHeroIconUrl(detailHero)}
                  alt=""
                  className="w-16 h-16 rounded-xl border border-brand-gold/30 object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-orange-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold">
                  <Swords className="h-8 w-8 text-brand-gold" />
                </div>
              )}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Badge variant={getCostBadgeVariant(detailHero.cost)}>$ {detailHero.cost} VÀNG</Badge>
                {detailHero.isNew && <Badge variant="success">TƯỚNG MỚI</Badge>}
                {detailHero.rarity && <Badge variant="outline">{detailHero.rarity}</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="admin-form-label">Tộc hệ kích</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {detailHero.race.length === 0 ? (
                    <span className="bg-brand-card-2 border border-brand-border text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold opacity-60">
                      Chưa xác định
                    </span>
                  ) : (
                    detailHero.race.map((r) => (
                      <span
                        key={r}
                        className="bg-brand-card-2 border border-brand-border text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold"
                      >
                        {r}
                      </span>
                    ))
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <span className="admin-form-label">Hệ nghề nghiệp</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {detailHero.class.length === 0 ? (
                    <span className="bg-brand-gold/10 border border-brand-gold/20 text-brand-text-sub px-2 py-0.5 rounded admin-meta font-bold opacity-60">
                      Chưa xác định
                    </span>
                  ) : (
                    detailHero.class.map((c) => (
                      <span
                        key={c}
                        className="bg-brand-gold/15 border border-brand-gold/20 text-brand-gold px-2 py-0.5 rounded admin-meta font-bold"
                      >
                        {c}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {detailHero.description && (
              <p className="admin-body text-brand-text-sub leading-relaxed">{detailHero.description}</p>
            )}

            <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="admin-form-label text-brand-gold">
                  KỸ NĂNG: {detailHero.skill?.name || "KỸ NĂNG ĐẶC BIỆT"}
                </span>
                <Badge variant="outline" className="admin-meta">
                  {detailHero.skill?.type || "Chủ động"}
                </Badge>
              </div>
              <p className="text-brand-text-sub admin-body leading-relaxed font-normal">
                {detailHero.skill?.desc || "Gây sát thương và tạo lợi thế chiến thuật vật lý trên bàn cờ."}
              </p>
            </div>

            <div className="space-y-3">
              <span className="admin-form-label">Thuộc tính kỹ năng cơ bản</span>
              <div className="grid grid-cols-2 gap-3 font-mono admin-meta text-brand-text-sub">
                <div>
                  HP 1★:{" "}
                  <span className="text-brand-text-main font-bold">{detailHero.stats?.hp?.[0] ?? "—"}</span>
                </div>
                <div>
                  ATK 1★:{" "}
                  <span className="text-brand-text-main font-bold">{detailHero.stats?.atk?.[0] ?? "—"}</span>
                </div>
                <div>
                  Giáp:{" "}
                  <span className="text-brand-text-main font-bold">
                    {typeof detailHero.stats?.armor === "number"
                      ? detailHero.stats.armor
                      : detailHero.stats?.armor?.[0] ?? "—"}
                  </span>
                </div>
                <div>
                  MR:{" "}
                  <span className="text-brand-text-main font-bold">
                    {typeof detailHero.stats?.mr === "number"
                      ? detailHero.stats.mr
                      : detailHero.stats?.mr?.[0] ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          setIsDeleteOpen(open)
          if (!open) setHeroToDelete(null)
        }}
        title="Xác nhận xóa anh hùng"
        description={
          heroToDelete
            ? `Bạn có chắc muốn xóa vĩnh viễn tướng "${heroToDelete.name}" khỏi cẩm nang trò chơi?`
            : ""
        }
        onConfirm={confirmDeleteHero}
        confirmLabel="Xóa tướng"
      />
    </>
  )
}
