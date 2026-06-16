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
import { Bell, Calendar, Plus, Trash2, Edit2 } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { AdminEvent } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminField,
  AdminFormGrid,
} from "@/components/admin"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"

export function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [successMsg, setSuccessMsg] = React.useState("")

  const [newTitle, setNewTitle] = React.useState("")
  const [newPrize, setNewPrize] = React.useState("")
  const [newDate, setNewDate] = React.useState("")
  const [newParticipants, setNewParticipants] = React.useState("64 Kì thủ")

  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingEvent, setEditingEvent] = React.useState<AdminEvent | null>(null)
  const [deleteTarget, setDeleteTarget] = React.useState<AdminEvent | null>(null)

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(""), 3000)
  }

  const handleCreateEvent = () => {
    if (!newTitle.trim()) return
    const id = nextNumericId(events)
    addEvent({
      id,
      title: newTitle,
      prize: newPrize || "Quà lưu niệm",
      date: newDate || "Chưa ấn định",
      participants: newParticipants,
      status: "Sắp diễn ra",
    })
    setNewTitle("")
    setNewPrize("")
    setNewDate("")
    showSuccess(`Giải đấu ${newTitle} đã được chuẩn bị tổ chức!`)
  }

  const handleUpdateEvent = () => {
    if (!editingEvent || !editingEvent.title.trim()) return
    updateEvent(editingEvent.id, editingEvent)
    setEditingEvent(null)
    setIsEditOpen(false)
    showSuccess("Đã cập nhật thông tin sự kiện!")
  }

  const handleDeleteEvent = () => {
    if (!deleteTarget) return
    deleteEvent(deleteTarget.id)
    setDeleteTarget(null)
    showSuccess("Đã hủy sự kiện khỏi hệ thống.")
  }

  const filteredEvents = events.filter((e) => e.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-8 pb-8 font-sans">
      <AdminPageHeader
        icon={Bell}
        title="Quản lý giải đấu & Sự kiện"
        description="Điều hành thông tin đăng ký, giải thưởng, quy mô cho các sân chơi cộng đồng Auto Chess Mobile."
      />

      <AdminSuccessBanner message={successMsg} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden">
            <AdminToolbar
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Tìm tên sự kiện..."
              className="border-b border-brand-border"
            />

            <div className="space-y-3 p-6 pt-4">
              {filteredEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-brand-card-2/30 border border-brand-border hover:border-brand-gold/20 p-5 rounded-xl gap-4 transition-all"
                >
                  <div className="space-y-1.5 max-w-[70%]">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={
                          ev.status === "Cho đăng ký"
                            ? "success"
                            : ev.status === "Sắp diễn ra"
                              ? "warning"
                              : "secondary"
                        }
                        className="text-[9px] px-2 py-0.5 rounded-md"
                      >
                        {ev.status}
                      </Badge>
                      <span className="admin-meta flex items-center gap-1 font-mono font-bold">
                        <Calendar className="h-3 w-3" /> {ev.date}
                      </span>
                    </div>
                    <h3 className="admin-table-cell font-bold tracking-tight">{ev.title}</h3>
                    <div className="flex items-center gap-3 admin-meta">
                      <span>
                        Phần thưởng: <strong className="text-brand-gold">{ev.prize}</strong>
                      </span>
                      <span className="text-brand-text-sub">|</span>
                      <span>
                        Quy mô: <strong>{ev.participants}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => {
                        setEditingEvent({ ...ev })
                        setIsEditOpen(true)
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => setDeleteTarget(ev)}
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-brand-red hover:bg-brand-red/10 rounded-lg transition-all"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-brand-card border-brand-border rounded-xl p-6 sm:p-8 space-y-5">
            <h3 className="admin-card-title uppercase flex items-center gap-2 border-b border-brand-border pb-3">
              <Plus className="h-4 w-4 text-brand-gold" /> Chuẩn bị giải đấu
            </h3>
            <div className="space-y-4">
              <AdminField label="Tên giải đấu / Sự kiện">
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Đại chiến Vương Giả S20"
                />
              </AdminField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <AdminField label="Giải thưởng">
                  <Input
                    value={newPrize}
                    onChange={(e) => setNewPrize(e.target.value)}
                    placeholder="20,000,000 VND"
                  />
                </AdminField>
                <AdminField label="Khởi tranh">
                  <Input
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="25/06/2026"
                  />
                </AdminField>
              </div>
              <AdminField label="Quy mô kì thủ">
                <Select value={newParticipants} onValueChange={setNewParticipants}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="16 Kì thủ">16 Kì thủ</SelectItem>
                    <SelectItem value="32 Kì thủ">32 Kì thủ</SelectItem>
                    <SelectItem value="64 Kì thủ">64 Kì thủ</SelectItem>
                    <SelectItem value="128 Kì thủ">128 Kì thủ</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>

              <Button
                onClick={handleCreateEvent}
                className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
              >
                Cấp phép giải đấu mới
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <AdminFormDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Chỉnh sửa sự kiện"
        description="Cập nhật thông tin giải đấu hoặc sự kiện cộng đồng."
        size="md"
        onSubmit={handleUpdateEvent}
        submitLabel="Lưu thay đổi"
      >
        {editingEvent && (
          <div className="space-y-4">
            <AdminField label="Tên sự kiện">
              <Input
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              />
            </AdminField>
            <AdminFormGrid>
              <AdminField label="Giải thưởng">
                <Input
                  value={editingEvent.prize}
                  onChange={(e) => setEditingEvent({ ...editingEvent, prize: e.target.value })}
                />
              </AdminField>
              <AdminField label="Ngày">
                <Input
                  value={editingEvent.date}
                  onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                />
              </AdminField>
              <AdminField label="Quy mô">
                <Input
                  value={editingEvent.participants}
                  onChange={(e) => setEditingEvent({ ...editingEvent, participants: e.target.value })}
                />
              </AdminField>
              <AdminField label="Trạng thái">
                <Select
                  value={editingEvent.status}
                  onValueChange={(status) => setEditingEvent({ ...editingEvent, status })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cho đăng ký">Cho đăng ký</SelectItem>
                    <SelectItem value="Sắp diễn ra">Sắp diễn ra</SelectItem>
                    <SelectItem value="Kết thúc">Kết thúc</SelectItem>
                  </SelectContent>
                </Select>
              </AdminField>
            </AdminFormGrid>
          </div>
        )}
      </AdminFormDialog>

      <AdminDeleteDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Hủy sự kiện"
        description={
          deleteTarget
            ? `Chắc chắn muốn hủy bỏ sự kiện "${deleteTarget.title}"? Thao tác này không thể hoàn tác.`
            : ""
        }
        onConfirm={handleDeleteEvent}
        confirmLabel="Hủy sự kiện"
      />
    </div>
  )
}
