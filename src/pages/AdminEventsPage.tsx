import * as React from "react"
import { Card, Button, Badge } from "@/components/ui/core"
import { Bell, Calendar, Plus } from "lucide-react"
import { useAppStore } from "@/contexts/DataContext"
import type { AdminEvent } from "@/types/domain"
import { nextNumericId } from "@/lib/admin-utils"
import {
  AdminPageHeader,
  AdminSuccessBanner,
  AdminToolbar,
  AdminFormDialog,
  AdminRowActions,
} from "@/components/admin"
import {
  EMPTY_EVENT_FORM,
  eventFormFromEvent,
  eventFromFormValue,
} from "@/components/admin/AdminEventForm"
import { AdminDeleteDialog } from "@/components/admin/AdminDeleteDialog"
import { useAdminListPage } from "@/hooks/useAdminListPage"

const AdminEventForm = React.lazy(() =>
  import("@/components/admin/AdminEventForm").then((m) => ({ default: m.AdminEventForm }))
)

function EventFormFallback() {
  return (
    <div className="py-8 text-center admin-meta text-brand-text-sub">Đang tải biểu mẫu sự kiện...</div>
  )
}

export function AdminEventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useAppStore()
  const [searchTerm, setSearchTerm] = React.useState("")
  const [newEventForm, setNewEventForm] = React.useState(EMPTY_EVENT_FORM)

  const matchEvent = React.useCallback(
    (event: AdminEvent, q: string) => event.title.toLowerCase().includes(q.toLowerCase()),
    []
  )

  const { dialogs, successMessage, showSuccess, filteredItems: filteredEvents } = useAdminListPage({
    items: events,
    searchTerm,
    match: matchEvent,
  })

  const handleCreateEvent = () => {
    if (!newEventForm.title.trim()) return
    const id = nextNumericId(events)
    const created = eventFromFormValue(newEventForm, id)
    addEvent(created)
    setNewEventForm(EMPTY_EVENT_FORM)
    showSuccess(`Giải đấu ${created.title} đã được chuẩn bị tổ chức!`)
  }

  const handleUpdateEvent = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.title.trim()) return
    updateEvent(dialogs.editingItem.id, dialogs.editingItem)
    dialogs.closeEdit()
    showSuccess("Đã cập nhật thông tin sự kiện!")
  }

  const handleDeleteEvent = () => {
    if (!dialogs.deleteTarget) return
    deleteEvent(dialogs.deleteTarget.id)
    dialogs.closeDelete()
    showSuccess("Đã hủy sự kiện khỏi hệ thống.")
  }

  return (
    <div className="space-y-8 pb-8 font-sans">
      <AdminPageHeader
        icon={Bell}
        title="Quản lý giải đấu & Sự kiện"
        description="Điều hành thông tin đăng ký, giải thưởng, quy mô cho các sân chơi cộng đồng Auto Chess Mobile."
      />

      <AdminSuccessBanner message={successMessage ?? ""} />

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

                  <AdminRowActions
                    onEdit={() => dialogs.openEdit({ ...ev })}
                    onDelete={() => dialogs.openDelete(ev)}
                    editLabel="Sửa sự kiện"
                    deleteLabel="Hủy sự kiện"
                  />
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
            <React.Suspense fallback={<EventFormFallback />}>
              <AdminEventForm value={newEventForm} onChange={setNewEventForm} />
            </React.Suspense>
            <Button
              onClick={handleCreateEvent}
              className="w-full bg-gold-gradient text-black font-bold text-[13px] h-11 rounded-xl shadow-none uppercase"
            >
              Cấp phép giải đấu mới
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
        title="Chỉnh sửa sự kiện"
        description="Cập nhật thông tin giải đấu hoặc sự kiện cộng đồng."
        size="md"
        onSubmit={handleUpdateEvent}
        submitLabel="Lưu thay đổi"
      >
        {dialogs.editingItem && (
          <React.Suspense fallback={<EventFormFallback />}>
            <AdminEventForm
              showStatus
              value={eventFormFromEvent(dialogs.editingItem)}
              onChange={(value) =>
                dialogs.setEditingItem(eventFromFormValue(value, dialogs.editingItem!.id))
              }
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
        title="Hủy sự kiện"
        description={
          dialogs.deleteTarget
            ? `Chắc chắn muốn hủy bỏ sự kiện "${dialogs.deleteTarget.title}"? Thao tác này không thể hoàn tác.`
            : ""
        }
        onConfirm={handleDeleteEvent}
        confirmLabel="Hủy sự kiện"
      />
    </div>
  )
}
