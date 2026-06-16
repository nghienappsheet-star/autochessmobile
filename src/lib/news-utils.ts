import type { Post } from "@/types/domain"

export type CategoryCount = { name: string; count: number }

export const NEWS_TIME_RANGES = ["7d", "30d", "90d"] as const
export type NewsTimeRange = (typeof NEWS_TIME_RANGES)[number]

export function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export function parseTimeRange(value: string | null): NewsTimeRange | null {
  if (!value) return null
  return NEWS_TIME_RANGES.includes(value as NewsTimeRange) ? (value as NewsTimeRange) : null
}

export function getPublishedPosts(posts: Post[]): Post[] {
  return posts.filter((post) => post.status === "Xuất bản")
}

function parseViews(views: string): number {
  const normalized = views.trim().toUpperCase()
  if (normalized.endsWith("K")) {
    return parseFloat(normalized.replace("K", "")) * 1000
  }
  return parseFloat(normalized.replace(/[^\d.]/g, "")) || 0
}

function parsePostDate(date: string): Date | null {
  const parts = date.split("/").map(Number)
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null
  const [day, month, year] = parts
  return new Date(year, month - 1, day)
}

function isWithinTimeRange(date: string, range: NewsTimeRange): boolean {
  const parsed = parsePostDate(date)
  if (!parsed) return true
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return parsed >= cutoff
}

export function filterNewsPosts(
  posts: Post[],
  options: {
    q?: string | null
    category?: string | null
    author?: string | null
    time?: NewsTimeRange | null
  }
): Post[] {
  const q = options.q?.trim().toLowerCase()
  return getPublishedPosts(posts).filter((post) => {
    if (options.category && post.category !== options.category) return false
    if (options.author && post.author !== options.author) return false
    if (options.time && !isWithinTimeRange(post.date, options.time)) return false
    if (!q) return true
    return (
      post.title.toLowerCase().includes(q) ||
      (post.excerpt ?? "").toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q)
    )
  })
}

export function getCategoryCounts(posts: Post[]): CategoryCount[] {
  const counts = new Map<string, number>()
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1)
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPopularPosts(posts: Post[], limit = 5): Post[] {
  return [...posts]
    .sort((a, b) => parseViews(b.views) - parseViews(a.views))
    .slice(0, limit)
}

export function getPostAuthors(posts: Post[]): string[] {
  return Array.from(new Set(posts.map((post) => post.author))).sort((a, b) =>
    a.localeCompare(b)
  )
}

export function splitFeaturedPosts(posts: Post[]): {
  featured: Post | null
  secondary: Post[]
  rest: Post[]
} {
  if (posts.length === 0) {
    return { featured: null, secondary: [], rest: [] }
  }
  const [featured, ...remaining] = posts
  return {
    featured,
    secondary: remaining.slice(0, 2),
    rest: remaining.slice(2),
  }
}
