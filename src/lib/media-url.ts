/** Rejects inline base64 image data URLs — never persist these. */
export function isDataImageUrl(value: string | undefined): boolean {
  if (!value) return false
  return value.trim().toLowerCase().startsWith("data:image/")
}

/** URLs safe to store in localStorage / Supabase columns. */
export function isPersistableImageUrl(value: string | undefined): boolean {
  if (!value?.trim()) return false
  const url = value.trim()
  const lower = url.toLowerCase()
  if (lower.startsWith("data:") || lower.startsWith("blob:")) return false
  return (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    url.startsWith("/")
  )
}

/** URL vs Tailwind class token for legacy post `image` field */
export function isPostImageUrl(value: string | undefined): boolean {
  return isPersistableImageUrl(value)
}

/** Avatar may be a Tailwind bg class or a persistable image URL. */
export function isPersistableAvatarValue(value: string | undefined): boolean {
  if (!value?.trim()) return false
  const v = value.trim()
  if (v.startsWith("bg-")) return true
  return isPersistableImageUrl(v)
}

export function sanitizeCommunityImageUrls<T extends { url: string }>(images: T[] | undefined): T[] | undefined {
  if (!images?.length) return images
  const filtered = images.filter((img) => isPersistableImageUrl(img.url))
  return filtered.length ? filtered : undefined
}
