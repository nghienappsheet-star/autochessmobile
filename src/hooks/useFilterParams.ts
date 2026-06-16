import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"

export function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParam = useCallback(
    (key: string) => {
      const value = searchParams.get(key)
      return value === null ? "" : value
    },
    [searchParams]
  )

  const setParams = useCallback(
    (patch: Record<string, string | null | undefined>) => {
      const next = new URLSearchParams(searchParams)
      for (const [key, value] of Object.entries(patch)) {
        if (value == null || value === "") {
          next.delete(key)
        } else {
          next.set(key, value)
        }
      }
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const clearParams = useCallback(
    (keys?: string[]) => {
      if (!keys || keys.length === 0) {
        setSearchParams({}, { replace: true })
        return
      }
      const next = new URLSearchParams(searchParams)
      for (const key of keys) {
        next.delete(key)
      }
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams]
  )

  const hasActiveFilters = useCallback(
    (keys: string[]) =>
      keys.some((key) => {
        const value = searchParams.get(key)
        return value != null && value !== ""
      }),
    [searchParams]
  )

  const filterKeys = useMemo(() => Array.from(searchParams.keys()), [searchParams])

  return { getParam, setParams, clearParams, hasActiveFilters, searchParams, filterKeys }
}
