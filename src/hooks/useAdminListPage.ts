import * as React from "react"
import { useAdminPagination } from "@/hooks/useAdminPagination"
import { useAdminCrudDialogs } from "@/hooks/useAdminCrudDialogs"
import { useAdminSuccessToast } from "@/hooks/useAdminSuccessToast"

export type UseAdminListPageConfig<T> = {
  items: T[]
  pageSize?: number
  searchTerm: string
  match: (item: T, searchTerm: string) => boolean
  resetDeps?: React.DependencyList
}

export function useAdminListPage<T extends { id: string | number }>({
  items,
  pageSize = 10,
  searchTerm,
  match,
  resetDeps = [],
}: UseAdminListPageConfig<T>) {
  const dialogs = useAdminCrudDialogs<T>()
  const { successMessage, showSuccess } = useAdminSuccessToast()

  const filteredItems = React.useMemo(
    () => items.filter((item) => match(item, searchTerm)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resetDeps supplied by caller for extra filters
    [items, searchTerm, match, ...resetDeps]
  )

  const pagination = useAdminPagination(filteredItems, [searchTerm, ...resetDeps], pageSize)

  return {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    ...pagination,
  }
}
