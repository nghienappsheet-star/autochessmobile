import type { CommunityPost, Comment } from "@/types/domain"

export type CommunitySortKey = "latest" | "hot" | "engagement"

export const COMMUNITY_SORT_KEYS: CommunitySortKey[] = ["latest", "hot", "engagement"]

export function parseCommunitySort(value: string | null): CommunitySortKey {
  if (value === "hot" || value === "engagement") return value
  return "latest"
}

export function sortCommunityPosts(
  posts: CommunityPost[],
  sortKey: CommunitySortKey
): CommunityPost[] {
  const sorted = [...posts]
  switch (sortKey) {
    case "hot":
      return sorted.sort((a, b) => b.likes - a.likes)
    case "engagement":
      return sorted.sort((a, b) => b.likes + b.comments - (a.likes + a.comments))
    case "latest":
    default:
      return sorted
  }
}

export function filterCommunityPosts(
  posts: CommunityPost[],
  searchTerm: string
): CommunityPost[] {
  if (!searchTerm.trim()) return posts
  const q = searchTerm.toLowerCase()
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}

export function getRelatedCommunityPosts(
  posts: CommunityPost[],
  currentId: string,
  limit = 3
): CommunityPost[] {
  const current = posts.find((p) => p.id === currentId)
  if (!current) return posts.filter((p) => p.id !== currentId).slice(0, limit)

  const scored = posts
    .filter((p) => p.id !== currentId)
    .map((p) => {
      const sharedTags = p.tags.filter((tag) => current.tags.includes(tag)).length
      return { post: p, score: sharedTags * 10 + p.likes }
    })
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, limit).map((s) => s.post)
}

export type CommentNode = Comment & { replies: Comment[] }

export function buildCommentTree(comments: Comment[]): CommentNode[] {
  const roots = comments.filter((c) => !c.parentId)
  const repliesByParent = new Map<string, Comment[]>()

  for (const c of comments) {
    if (!c.parentId) continue
    const list = repliesByParent.get(c.parentId) ?? []
    list.push(c)
    repliesByParent.set(c.parentId, list)
  }

  return roots.map((root) => ({
    ...root,
    replies: repliesByParent.get(root.id) ?? [],
  }))
}

export const TRENDING_TOPICS = ["#9Warrior", "#MarineMeta", "#LateGame", "#Positioning"]
