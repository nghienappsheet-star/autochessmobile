import * as React from "react"
import {
  Card,
  Button,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Image as ImageIcon, CheckCircle, EyeOff } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import { cn } from "@/lib/utils"
import { nextNumericId } from "@/lib/admin-utils"
import type { Banner } from "@/types/domain"
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
  AdminBannerForm,
  EMPTY_BANNER_FORM,
  bannerFormFromBanner,
  bannerFromFormValue,
  AdminRowActions,
} from "@/components/admin"
import { useAdminPagination } from "@/hooks/useAdminPagination"
import { useAdminCrudDialogs } from "@/hooks/useAdminCrudDialogs"

export function AdminBannersPage() {
  const { banners, addBanner, updateBanner, deleteBanner } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedStatus, setSelectedStatus] = React.useState("Tất cả trạng thái")
  const [newBanner, setNewBanner] = React.useState(EMPTY_BANNER_FORM)
  const [isDetailOpen, setIsDetailOpen] = React.useState(false)
  const [detailBanner, setDetailBanner] = React.useState<Banner | null>(null)

  const dialogs = useAdminCrudDialogs<Banner>()

  const handleCreateBanner = () => {
    if (!newBanner.title.trim()) return
    const id = nextNumericId(banners)
    addBanner(bannerFromFormValue(newBanner, id))
    setNewBanner(EMPTY_BANNER_FORM)
    dialogs.closeAdd()
  }

  const handleUpdateBanner = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.title.trim()) return
    updateBanner(
      dialogs.editingItem.id,
      bannerFromFormValue(bannerFormFromBanner(dialogs.editingItem), dialogs.editingItem.id, dialogs.editingItem)
    )
    dialogs.closeEdit()
  }

  const confirmDeleteBanner = () => {
    if (dialogs.deleteTarget) {
      deleteBanner(dialogs.deleteTarget.id)
      dialogs.closeDelete()
    }
  }

  const filteredBanners = banners.filter((banner) => {
    const matchesSearch =
      banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      banner.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "Tất cả trạng thái" || banner.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const { currentPage, setCurrentPage, totalPages, startIndex, pageSize, paginatedItems: paginatedBanners } =
    useAdminPagination(filteredBanners, [searchTerm, selectedStatus])

  const totalBanners = banners.length
  const activeBannersCount = banners.filter((b) => b.status === "Hiện").length
  const hiddenBannersCount = banners.filter((b) => b.status === "Ẩn").length

  return (
    <>
      <AdminListShell
        header={
          <AdminPageHeader
            icon={ImageIcon}
            title="Quản lý banners"
            description="Cấu hình trang hoàng sảnh chính website, tin tức sự kiện, và chiến dịch quảng cáo trọng tâm mùa giải."
          >
            <Button
              size="default"
              onClick={dialogs.openAdd}
              className="gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]"
            >
              <Plus className="h-4.5 w-4.5 stroke-[3px]" /> Thêm banner mới
            </Button>
          </AdminPageHeader>
        }
        beforeList={
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 shrink-0">
            <Card className="p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all">
              <div className="space-y-1 z-10">
                <span className="admin-eyebrow">Mẫu Banner Khởi tạo</span>
                <div className="admin-stat-value">{totalBanners}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-brand-card-2 flex items-center justify-center text-brand-text-sub group-hover:text-brand-text-main transition-colors">
                <ImageIcon className="h-5 w-5" />
              </div>
            </Card>

            <Card className="p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all">
              <div className="space-y-1 z-10">
                <span className="admin-eyebrow">Đang Trực Quan (Hiện)</span>
                <div className="admin-stat-value text-brand-gold">{activeBannersCount}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-brand-gold/5 flex items-center justify-center text-brand-gold">
                <CheckCircle className="h-5 w-5" />
              </div>
            </Card>

            <Card className="p-4 sm:p-5 flex items-center justify-between bg-brand-card border-brand-border shadow-none rounded-xl relative overflow-hidden group hover:border-brand-gold/20 transition-all">
              <div className="space-y-1 z-10">
                <span className="admin-eyebrow">Lưu nháp trữ kho (Ẩn)</span>
                <div className="admin-stat-value">{hiddenBannersCount}</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-brand-card-2 flex items-center justify-center text-brand-text-sub">
                <EyeOff className="h-5 w-5 text-orange-400" />
              </div>
            </Card>
          </div>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Tìm kiếm thông điệp tiêu đề banner..."
            >
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="min-w-[170px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả trạng thái">Mọi trạng thái banner</SelectItem>
                  <SelectItem value="Hiện">Đang hiển thị</SelectItem>
                  <SelectItem value="Ẩn">Đang lưu nháp</SelectItem>
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={
            <AdminTableFooterText
              start={filteredBanners.length > 0 ? startIndex + 1 : 0}
              end={Math.min(startIndex + pageSize, filteredBanners.length)}
              total={filteredBanners.length}
              label="banner"
            />
          }
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginatedBanners.length === 0}
          emptyTitle="Không có mẫu quảng vệ banner nào phù hợp."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh className="w-24 text-center">ẢNH BANNER</AdminTh>
                <AdminTh>Tiêu đề Banner</AdminTh>
                <AdminTh>Đặc đề thu hút</AdminTh>
                <AdminTh>Tác động nhấp chuột</AdminTh>
                <AdminTh className="text-center w-36">Trạng thái hiển trị</AdminTh>
                <AdminTh className="text-right w-44">Thao tác dữ liệu</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginatedBanners.map((row) => (
                <AdminTr key={row.id} className="group">
                  <AdminTd>
                    <div className="w-20 h-11 rounded-xl bg-brand-card border border-brand-border overflow-hidden flex items-center justify-center relative shadow-inner">
                      <img
                        src={row.image}
                        alt={row.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex flex-col">
                      <button
                        onClick={() => {
                          setDetailBanner(row)
                          setIsDetailOpen(true)
                        }}
                        className="text-left font-bold text-brand-text-main admin-body hover:text-brand-gold transition-colors leading-snug tracking-tight"
                      >
                        {row.title}
                      </button>
                      <span className="admin-meta text-brand-text-sub font-mono mt-0.5 tracking-wider uppercase">
                        BANNER_ID: {row.id}
                      </span>
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <div className="text-brand-text-sub admin-body leading-relaxed max-w-[280px] truncate">
                      {row.subtitle}
                    </div>
                  </AdminTd>
                  <AdminTd>
                    <div className="flex items-center gap-1.5 text-brand-text-sub font-mono admin-meta">
                      <span className="text-brand-text-sub uppercase font-bold admin-meta tracking-wider px-1.5 py-0.5 bg-brand-card rounded">
                        NÚT:
                      </span>
                      <strong className="text-brand-text-main">{row.primaryButtonText}</strong>
                    </div>
                  </AdminTd>
                  <AdminTd className="text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 admin-meta font-bold uppercase tracking-wider border rounded-md leading-none",
                        row.status === "Hiện"
                          ? "text-brand-green border-brand-green/15 bg-brand-green/5"
                          : "text-brand-text-sub border-brand-border bg-brand-card-2"
                      )}
                    >
                      {row.status}
                    </span>
                  </AdminTd>
                  <AdminTd className="text-right">
                    <AdminRowActions
                      onView={() => {
                        setDetailBanner(row)
                        setIsDetailOpen(true)
                      }}
                      onEdit={() => dialogs.openEdit({ ...row })}
                      onDelete={() => dialogs.openDelete(row)}
                    />
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog
        open={dialogs.isAddOpen}
        onOpenChange={dialogs.setIsAddOpen}
        title="Thêm Banner mới"
        description="Thiết lập quảng bá sự kiện trọng thể, cập nhật link liên kết để thu hút dũng sĩ dấn thân."
        size="md"
        onSubmit={handleCreateBanner}
        submitLabel="Kích họa Banner"
        cancelLabel="Hủy bỏ"
      >
        <AdminBannerForm value={newBanner} onChange={setNewBanner} />
      </AdminFormDialog>

      <AdminFormDialog
        open={dialogs.isEditOpen}
        onOpenChange={(open) => {
          dialogs.setIsEditOpen(open)
          if (!open) dialogs.setEditingItem(null)
        }}
        title="Sửa Banner quảng bá"
        description="Cập nhật tiêu đề, mô tả hoặc hành vi của banner sảnh."
        size="md"
        onSubmit={handleUpdateBanner}
        submitLabel="Cập nhật dữ liệu"
        cancelLabel="Hủy bỏ"
      >
        {dialogs.editingItem && (
          <AdminBannerForm
            value={bannerFormFromBanner(dialogs.editingItem)}
            onChange={(value) =>
              dialogs.setEditingItem({
                ...dialogs.editingItem!,
                ...value,
              })
            }
          />
        )}
      </AdminFormDialog>

      <AdminDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        title={detailBanner?.title ?? "Chi tiết banner"}
        size="md"
        footer={
          <Button
            onClick={() => setIsDetailOpen(false)}
            className="w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest"
          >
            Đóng cửa sổ
          </Button>
        }
      >
        {detailBanner && (
          <div className="space-y-4">
            <div className="w-full h-36 rounded-xl overflow-hidden border border-brand-border relative">
              <img
                src={detailBanner.image}
                alt={detailBanner.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="flex items-center justify-center gap-2">
              <Badge variant={detailBanner.status === "Hiện" ? "success" : "secondary"}>
                TRẠNG THÁI: {detailBanner.status.toUpperCase()}
              </Badge>
              <Badge variant="outline">SỰ KIỆN CHỦ</Badge>
            </div>

            <div className="space-y-1.5">
              <span className="admin-form-label">Mô tả đặc quyền sự kiện</span>
              <div className="p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body">
                {detailBanner.subtitle}
              </div>
            </div>

            <div className="flex justify-between items-center text-brand-text-sub font-mono admin-meta bg-brand-card-2/50 p-3 border border-brand-border rounded-xl">
              <span>HÀNH ĐỘNG CLICK:</span>
              <strong className="text-brand-text-main">{detailBanner.primaryButtonText}</strong>
            </div>
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog
        open={dialogs.isDeleteOpen}
        onOpenChange={(open) => {
          dialogs.setIsDeleteOpen(open)
          if (!open) dialogs.setDeleteTarget(null)
        }}
        title="Xác nhận xóa banner"
        description={
          dialogs.deleteTarget
            ? `Bạn có chắc muốn xóa vĩnh viễn banner "${dialogs.deleteTarget.title}" khỏi hệ thống?`
            : ""
        }
        onConfirm={confirmDeleteBanner}
        confirmLabel="Xóa banner"
      />
    </>
  )
}
