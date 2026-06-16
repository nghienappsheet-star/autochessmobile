import * as React from "react"

export function useAdminCrudDialogs<T extends { id: string | number }>() {
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<T | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [deleteTarget, setDeleteTarget] = React.useState<T | null>(null)

  const openAdd = React.useCallback(() => setIsAddOpen(true), [])
  const closeAdd = React.useCallback(() => setIsAddOpen(false), [])

  const openEdit = React.useCallback((item: T) => {
    setEditingItem(item)
    setIsEditOpen(true)
  }, [])

  const closeEdit = React.useCallback(() => {
    setEditingItem(null)
    setIsEditOpen(false)
  }, [])

  const openDelete = React.useCallback((item: T) => {
    setDeleteTarget(item)
    setIsDeleteOpen(true)
  }, [])

  const closeDelete = React.useCallback(() => {
    setDeleteTarget(null)
    setIsDeleteOpen(false)
  }, [])

  return {
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    editingItem,
    setEditingItem,
    isDeleteOpen,
    setIsDeleteOpen,
    deleteTarget,
    setDeleteTarget,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
  }
}
