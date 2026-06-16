import { Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/core"
import { AdminField, AdminFormGrid } from "@/components/admin/AdminField"
import type { CommunityChannel, CommunityChannelPlatform } from "@/types/domain"

export const CHANNEL_PLATFORMS: CommunityChannelPlatform[] = [
  "youtube",
  "tiktok",
  "facebook",
  "discord",
  "other",
]

export type ChannelFormValue = {
  platform: CommunityChannelPlatform
  name: string
  url: string
  description: string
  highlight: string
  order: string
  status: CommunityChannel["status"]
}

type AdminChannelFormProps = {
  value: ChannelFormValue
  onChange: (value: ChannelFormValue) => void
}

export function AdminChannelForm({ value, onChange }: AdminChannelFormProps) {
  const patch = (partial: Partial<ChannelFormValue>) => onChange({ ...value, ...partial })

  return (
    <AdminFormGrid columns={1}>
      <AdminField label="Nền tảng">
        <Select
          value={value.platform}
          onValueChange={(platform) => patch({ platform: platform as CommunityChannelPlatform })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CHANNEL_PLATFORMS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </AdminField>
      <AdminField label="Tên kênh / group">
        <Input value={value.name} onChange={(e) => patch({ name: e.target.value })} />
      </AdminField>
      <AdminField label="URL">
        <Input value={value.url} onChange={(e) => patch({ url: e.target.value })} />
      </AdminField>
      <AdminField label="Highlight (vd: Cao thủ)">
        <Input value={value.highlight} onChange={(e) => patch({ highlight: e.target.value })} />
      </AdminField>
      <AdminField label="Mô tả giá trị">
        <Input value={value.description} onChange={(e) => patch({ description: e.target.value })} />
      </AdminField>
      <div className="grid grid-cols-2 gap-4">
        <AdminField label="Thứ tự">
          <Input
            type="number"
            value={value.order}
            onChange={(e) => patch({ order: e.target.value })}
          />
        </AdminField>
        <AdminField label="Trạng thái">
          <Select
            value={value.status}
            onValueChange={(status) => patch({ status: status as CommunityChannel["status"] })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hiện">Hiện</SelectItem>
              <SelectItem value="Ẩn">Ẩn</SelectItem>
            </SelectContent>
          </Select>
        </AdminField>
      </div>
    </AdminFormGrid>
  )
}

export const EMPTY_CHANNEL_FORM: ChannelFormValue = {
  platform: "youtube",
  name: "",
  url: "",
  description: "",
  highlight: "",
  order: "1",
  status: "Hiện",
}

export function channelFormFromRecord(channel: CommunityChannel): ChannelFormValue {
  return {
    platform: channel.platform,
    name: channel.name,
    url: channel.url,
    description: channel.description,
    highlight: channel.highlight ?? "",
    order: String(channel.order),
    status: channel.status,
  }
}

export function channelFromFormValue(value: ChannelFormValue, id: string): CommunityChannel {
  return {
    id,
    platform: value.platform,
    name: value.name.trim(),
    url: value.url.trim(),
    description: value.description.trim(),
    highlight: value.highlight.trim(),
    order: Number(value.order) || 0,
    status: value.status,
  }
}

export function channelPatchFromFormValue(value: ChannelFormValue): Omit<CommunityChannel, "id"> {
  const channel = channelFromFormValue(value, "")
  const { id: _id, ...patch } = channel
  return patch
}
