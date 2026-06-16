import * as React from "react"

export function useAdminPagination<T>(
  items: T[],
  deps: React.DependencyList,
  pageSize = 10
) {
  const [currentPage, setCurrentPage] = React.useState(1)

  React.useEffect(() => {
    setCurrentPage(1)
  }, deps)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const paginatedItems = items.slice(startIndex, startIndex + pageSize)

  return {
    currentPage: safePage,
    setCurrentPage,
    pageSize,
    totalPages,
    startIndex,
    paginatedItems,
  }
}
