import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/core"

type AdminStatusSelectProps = {
  value: string
  onChange: (value: string) => void
  id?: string
}

export function AdminStatusSelect({ value, onChange, id }: AdminStatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="Trạng thái" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Hiện">Hiện</SelectItem>
        <SelectItem value="Ẩn">Ẩn</SelectItem>
      </SelectContent>
    </Select>
  )
}
