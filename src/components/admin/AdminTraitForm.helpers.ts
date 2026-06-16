import type { ClassSynergy, Race } from "@/types/domain"

export type TraitRecord = Race | ClassSynergy

export type TraitFormValue = {
  icon: string
  name: string
  description: string
  iconUrl?: string
}

export const EMPTY_TRAIT_FORM: TraitFormValue = {
  icon: "",
  name: "",
  description: "",
}

export function traitFormFromRecord(record: TraitRecord): TraitFormValue {
  return {
    icon: record.icon,
    name: record.name,
    description: record.description,
    iconUrl: record.iconUrl,
  }
}

export function traitFromFormValue(
  value: TraitFormValue,
  id: string,
  milestones: TraitRecord["milestones"],
  defaultDesc = "Hiệu ứng kích hoạt đặc trưng."
): TraitRecord {
  return {
    id,
    name: value.name.trim(),
    icon: value.icon.trim() || "🛡️",
    description: value.description.trim() || defaultDesc,
    ...(value.iconUrl ? { iconUrl: value.iconUrl.trim() } : {}),
    milestones,
  }
}
