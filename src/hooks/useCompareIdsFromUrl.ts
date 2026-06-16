import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { MAX_COMPARE_ITEMS } from "@/components/layout/CompareTray"

type Identifiable = { id: string }

type UseCompareIdsFromUrlOptions = {
  paramKey?: string
  /** Chỉ ghi URL khi số lượng id đạt ngưỡng này (mặc định 1). So sánh hero/comp dùng 2. */
  minSyncCount?: number
  /** Id mặc định khi URL trống hoặc không đủ minSyncCount. */
  fallbackIds?: string[]
}

export function useCompareIdsFromUrl<T extends Identifiable>(
  items: T[],
  options: UseCompareIdsFromUrlOptions = {}
) {
  const { paramKey = "ids", minSyncCount = 1, fallbackIds = [] } = options
  const [searchParams, setSearchParams] = useSearchParams()

  const parseIds = React.useCallback(
    (raw: string | null): string[] => {
      if (!raw) return []
      const ids = raw.split(",").map((s) => s.trim()).filter(Boolean)
      const valid = ids.filter((id) => items.some((item) => item.id === id))
      return valid.slice(0, MAX_COMPARE_ITEMS)
    },
    [items]
  )

  const urlIds = React.useMemo(
    () => parseIds(searchParams.get(paramKey)),
    [searchParams, paramKey, parseIds]
  )

  const resolveInitialIds = React.useCallback(() => {
    if (urlIds.length >= minSyncCount) return urlIds
    const validFallback = fallbackIds
      .filter((id) => items.some((item) => item.id === id))
      .slice(0, MAX_COMPARE_ITEMS)
    return validFallback
  }, [urlIds, minSyncCount, fallbackIds, items])

  const [selectedIds, setSelectedIds] = React.useState<string[]>(resolveInitialIds)

  React.useEffect(() => {
    if (urlIds.length >= minSyncCount) {
      setSelectedIds(urlIds)
    }
  }, [urlIds.join(","), minSyncCount])

  const syncUrl = React.useCallback(
    (ids: string[]) => {
      const next = new URLSearchParams(searchParams)
      if (ids.length < minSyncCount) {
        next.delete(paramKey)
      } else {
        next.set(paramKey, ids.join(","))
      }
      setSearchParams(next, { replace: true })
    },
    [paramKey, minSyncCount, searchParams, setSearchParams]
  )

  const addId = React.useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev
        if (prev.length >= MAX_COMPARE_ITEMS) return prev
        const next = [...prev, id]
        syncUrl(next)
        return next
      })
    },
    [syncUrl]
  )

  const removeId = React.useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const next = prev.filter((x) => x !== id)
        syncUrl(next)
        return next
      })
    },
    [syncUrl]
  )

  const clearIds = React.useCallback(() => {
    setSelectedIds([])
    syncUrl([])
  }, [syncUrl])

  const selectedItems = React.useMemo(
    () => selectedIds.map((id) => items.find((item) => item.id === id)).filter(Boolean) as T[],
    [items, selectedIds]
  )

  return {
    selectedIds,
    setSelectedIds,
    selectedItems,
    addId,
    removeId,
    clearIds,
    syncUrl,
  }
}
