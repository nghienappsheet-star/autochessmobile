import * as React from "react"
import {
  Button,
  Input,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"
import { Plus, Edit2, Trash2, Eye, Share2 } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { CommunityChannel, CommunityChannelPlatform } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminDeleteDialog,
  AdminDataTable,
  AdminListShell,
  AdminToolbar,
  AdminTableFooterText,
  AdminFormDialog,
  AdminDetailDialog,
  AdminField,
  AdminFormGrid,
  AdminTable,
  AdminThead,
  AdminTh,
  AdminTr,
  AdminTd,
} from "@/components/admin"

const PAGE_SIZE = 10
const PLATFORMS: CommunityChannelPlatform[] = ["youtube", "tiktok", "facebook", "discord", "other"]

const emptyChannel = (): CommunityChannel => ({
  id: "",
  platform: "youtube",
  name: "",
  url: "",
  description: "",
  highlight: "",
  order: 1,
  status: "Hiện",
})

export function AdminChannelsPage() {
  const { communityChannels, addCommunityChannel, updateCommunityChannel, deleteCommunityChannel } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedPlatform, setSelectedPlatform] = React.useState("Tất cả nền tảng")
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [form, setForm] = React.useState<CommunityChannel>(emptyChannel())
  const [editing, setEditing] = React.useState<CommunityChannel | null>(null)
  const [detail, setDetail] = React.useState<CommunityChannel | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<CommunityChannel | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  const filtered = communityChannels.filter((c) => {
    const q = searchTerm.toLowerCase()
    const matchesSearch =
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      (c.highlight ?? "").toLowerCase().includes(q)
    const matchesPlatform = selectedPlatform === "Tất cả nền tảng" || c.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE)

  const nextId = () =>
    nextNumericId(communityChannels)

  const handleCreate = () => {
    if (!form.name.trim() || !form.url.trim()) return
    addCommunityChannel({ ...form, id: nextId() })
    setForm(emptyChannel())
    setIsAddOpen(false)
  }

  const handleUpdate = () => {
    if (!editing || !editing.name.trim()) return
    updateCommunityChannel(editing.id, editing)
    setEditing(null)
  }

  const handleDelete = () => {
    if (!deleteTarget) return
    deleteCommunityChannel(deleteTarget.id)
    setDeleteTarget(null)
  }

  const formFields = (value: CommunityChannel, onChange: (v: CommunityChannel) => void) => (
    <AdminFormGrid columns={1}>
      <AdminField label="Nền tảng">
        <Select value={value.platform} onValueChange={(platform) => onChange({ ...value, platform: platform as CommunityChannelPlatform })}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
      <AdminField label="Tên kênh / group">
        <Input value={value.name} onChange={(e) => onChange({ ...value, name: e.target.value })} />
      </AdminField>
      <AdminField label="URL">
        <Input value={value.url} onChange={(e) => onChange({ ...value, url: e.target.value })} />
      </AdminField>
      <AdminField label="Highlight (vd: Cao thủ)">
        <Input value={value.highlight ?? ""} onChange={(e) => onChange({ ...value, highlight: e.target.value })} />
      </AdminField>
      <AdminField label="Mô tả giá trị">
        <Input value={value.description} onChange={(e) => onChange({ ...value, description: e.target.value })} />
      </AdminField>
      <div className="grid grid-cols-2 gap-4">
        <AdminField label="Thứ tự">
          <Input type="number" value={value.order} onChange={(e) => onChange({ ...value, order: Number(e.target.value) || 0 })} />
        </AdminField>
        <AdminField label="Trạng thái">
          <Select value={value.status} onValueChange={(status) => onChange({ ...value, status })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Hiện">Hiện</SelectItem>
              <SelectItem value="Ẩn">Ẩn</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
      </div>
    </AdminFormGrid>
  )

  return (
    <>
      <AdminListShell
        header={
          <AdminPageHeader
            icon={Share2}
            title="Kênh cộng đồng"
            description="Quản lý YouTube, TikTok, Facebook, Discord và các kênh liên quan trên trang Cộng đồng."
          >
            <Button onClick={() => { setForm(emptyChannel()); setIsAddOpen(true) }} className="gap-2 bg-gold-gradient text-black font-bold h-11 px-6 rounded-xl">
              <Plus className="h-4 w-4" /> Thêm kênh
            </Button>
          </AdminPageHeader>
        }
      >
        <AdminDataTable
          fillHeight
          toolbar={
            <AdminToolbar searchValue={searchTerm} onSearchChange={setSearchTerm} searchPlaceholder="Tìm theo tên, mô tả...">
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="min-w-[160px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tất cả nền tảng">Mọi nền tảng</SelectItem>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AdminToolbar>
          }
          footer={<AdminTableFooterText start={filtered.length ? startIndex + 1 : 0} end={Math.min(startIndex + PAGE_SIZE, filtered.length)} total={filtered.length} label="kênh" />}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isEmpty={paginated.length === 0}
          emptyTitle="Chưa có kênh nào."
        >
          <AdminTable>
            <AdminThead>
              <AdminTr>
                <AdminTh>Kênh</AdminTh>
                <AdminTh>Nền tảng</AdminTh>
                <AdminTh>Highlight</AdminTh>
                <AdminTh className="text-center">Thứ tự</AdminTh>
                <AdminTh className="text-center">Trạng thái</AdminTh>
                <AdminTh className="text-right">Thao tác</AdminTh>
              </AdminTr>
            </AdminThead>
            <tbody>
              {paginated.map((row) => (
                <AdminTr key={row.id}>
                  <AdminTd>
                    <div className="font-bold text-brand-text-main">{row.name}</div>
                    <div className="text-[11px] text-brand-text-sub line-clamp-1 max-w-xs">{row.description}</div>
                  </AdminTd>
                  <AdminTd className="uppercase text-[11px]">{row.platform}</AdminTd>
                  <AdminTd>{row.highlight || "—"}</AdminTd>
                  <AdminTd className="text-center">{row.order}</AdminTd>
                  <AdminTd className="text-center">
                    <Badge variant={row.status === "Hiện" ? "success" : "secondary"}>{row.status}</Badge>
                  </AdminTd>
                  <AdminTd className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setDetail(row)}><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setEditing({ ...row })}><Edit2 className="h-4 w-4 text-tier-b" /></Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setDeleteTarget(row)}><Trash2 className="h-4 w-4 text-brand-red/70" /></Button>
                    </div>
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTable>
        </AdminDataTable>
      </AdminListShell>

      <AdminFormDialog open={isAddOpen} onOpenChange={setIsAddOpen} title="Thêm kênh" onSubmit={handleCreate} submitLabel="Thêm">
        {formFields(form, setForm)}
      </AdminFormDialog>

      <AdminFormDialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)} title="Sửa kênh" onSubmit={handleUpdate} submitLabel="Cập nhật">
        {editing && formFields(editing, setEditing)}
      </AdminFormDialog>

      <AdminDetailDialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)} title={detail?.name ?? ""} footer={<Button onClick={() => setDetail(null)} variant="outline" className="w-full">Đóng</Button>}>
        {detail && (
          <div className="space-y-3 text-sm">
            <p><strong>Nền tảng:</strong> {detail.platform}</p>
            <p><strong>URL:</strong> {detail.url}</p>
            {detail.highlight && <p><strong>Highlight:</strong> {detail.highlight}</p>}
            <p><strong>Mô tả:</strong> {detail.description}</p>
          </div>
        )}
      </AdminDetailDialog>

      <AdminDeleteDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)} title="Xóa kênh" description={deleteTarget ? `Xóa "${deleteTarget.name}"?` : ""} onConfirm={handleDelete} confirmLabel="Xóa" />
    </>
  )
}
