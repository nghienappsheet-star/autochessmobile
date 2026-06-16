/** Default page size for list queries — keep payloads small to reduce egress. */
export const DEFAULT_PAGE_SIZE = 20

export type PaginatedQueryOptions = {
  page?: number
  pageSize?: number
}

export type PaginatedResult<T> = {
  data: T[]
  page: number
  pageSize: number
  count: number | null
}

type CacheEntry<T> = {
  expiresAt: number
  value: T
}

const queryCache = new Map<string, CacheEntry<unknown>>()

/**
 * In-memory TTL cache for identical Supabase reads within a session.
 * Prefer React Query / SWR for UI-level caching when migrating data layer.
 */
export async function cachedQuery<T>(
  key: string,
  ttlMs: number,
  fn: () => Promise<T>
): Promise<T> {
  const now = Date.now()
  const hit = queryCache.get(key)
  if (hit && hit.expiresAt > now) {
    return hit.value as T
  }

  const value = await fn()
  queryCache.set(key, { value, expiresAt: now + ttlMs })
  return value
}

export function invalidateCachedQuery(key: string): void {
  queryCache.delete(key)
}

export function invalidateCachedQueryPrefix(prefix: string): void {
  for (const key of queryCache.keys()) {
    if (key.startsWith(prefix)) queryCache.delete(key)
  }
}

/** Build an explicit column list — never use select('*') in production queries. */
export function selectColumns<T extends string>(...columns: T[]): string {
  return columns.join(",")
}

/** Recommended options when starting a list query — narrow payload + estimated count. */
export function listQueryDefaults() {
  return {
    count: "estimated" as const,
  }
}

type PaginatedRunResult<T> = {
  data: T[] | null
  error: { message: string } | null
  count: number | null
}

/**
 * Run a paginated Supabase query with offset/limit.
 * Pass a callback that applies `.range(from, to)` to your builder.
 *
 * @example
 * await paginateQuery(async ({ from, to }) =>
 *   getSupabase()
 *     .from("comps")
 *     .select(selectColumns("id", "name", "tier"), listQueryDefaults())
 *     .order("likes", { ascending: false })
 *     .range(from, to)
 * )
 */
export async function paginateQuery<T>(
  run: (range: { from: number; to: number }) => Promise<PaginatedRunResult<T>>,
  options: PaginatedQueryOptions = {}
): Promise<PaginatedResult<T>> {
  const page = Math.max(1, options.page ?? 1)
  const pageSize = Math.max(1, options.pageSize ?? DEFAULT_PAGE_SIZE)
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await run({ from, to })
  if (error) throw new Error(error.message)

  return {
    data: data ?? [],
    page,
    pageSize,
    count: count ?? null,
  }
}
