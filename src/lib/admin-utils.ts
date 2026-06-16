/** Generate the next numeric string id from a collection with string ids. */
export function nextNumericId<T extends { id: string | number }>(items: T[]): string {
  if (items.length === 0) return "1"
  const max = Math.max(...items.map((item) => Number(item.id) || 0))
  return String(max + 1)
}

export function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

type SlugifyOptions = {
  separator?: string
  fallbackPrefix?: string
}

/** Slugify a display name into a unique entity id. */
export function slugifyEntityId(
  name: string,
  existingIds: string[],
  options: SlugifyOptions = {}
): string {
  const { separator = "-", fallbackPrefix = "entity" } = options
  const pattern = separator === "-" ? /[^a-z0-9-]+/g : /[^a-z0-9]+/g
  const base =
    name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, separator)
      .replace(pattern, "")
      .replace(new RegExp(`^${separator}|${separator}$`, "g"), "") ||
    `${fallbackPrefix}_${Date.now()}`

  let id = base
  let n = 1
  while (existingIds.includes(id)) {
    id = `${base}${separator}${n++}`
  }
  return id
}

export function slugifyHeroId(name: string, existingIds: string[]): string {
  return slugifyEntityId(name, existingIds, { separator: "-", fallbackPrefix: "hero" })
}

export function slugifyItemId(name: string, existingIds: string[]): string {
  return slugifyEntityId(name, existingIds, { separator: "_", fallbackPrefix: "item" })
}

export function nextNumericIdNumber<T extends { id: string | number }>(items: T[]): number {
  return Number(nextNumericId(items))
}
