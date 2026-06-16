import * as React from "react"
import { MAX_COMPARE_ITEMS } from "@/components/layout/CompareTray"

type UseCompareSelectionOptions = {
  onMaxReached?: () => void
}

export function useCompareSelection(options: UseCompareSelectionOptions = {}) {
  const [compareMode, setCompareMode] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<string[]>([])

  const toggleCompareMode = React.useCallback(() => {
    setCompareMode((prev) => {
      if (prev) setSelectedIds([])
      return !prev
    })
  }, [])

  const toggleSelect = React.useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id)
        if (prev.length >= MAX_COMPARE_ITEMS) {
          options.onMaxReached?.()
          return prev
        }
        return [...prev, id]
      })
    },
    [options]
  )

  const removeItem = React.useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const clearSelection = React.useCallback(() => {
    setSelectedIds([])
  }, [])

  return {
    compareMode,
    selectedIds,
    toggleCompareMode,
    toggleSelect,
    removeItem,
    clearSelection,
    hasSelection: selectedIds.length > 0,
  }
}
