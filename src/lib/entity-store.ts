import type { Dispatch, SetStateAction } from "react"

export type EntityWithId = { id: string }

export type CrudSetters<T extends EntityWithId> = {
  add: (item: T) => boolean
  update: (id: string, patch: Partial<T>) => boolean
  delete: (id: string) => void
}

type CrudGuard<T extends EntityWithId> = {
  beforeAdd?: (item: T) => boolean
  beforeUpdate?: (current: T, patch: Partial<T>) => boolean
}

export function createCrudSetters<T extends EntityWithId>(
  setState: Dispatch<SetStateAction<T[]>>,
  guards: CrudGuard<T> = {}
): CrudSetters<T> {
  const add = (item: T): boolean => {
    if (guards.beforeAdd && !guards.beforeAdd(item)) return false
    setState((prev) => [...prev, item])
    return true
  }

  const update = (id: string, patch: Partial<T>): boolean => {
    let accepted = true
    setState((prev) =>
      prev.map((entity) => {
        if (entity.id !== id) return entity
        if (guards.beforeUpdate && !guards.beforeUpdate(entity, patch)) {
          accepted = false
          return entity
        }
        return { ...entity, ...patch }
      })
    )
    return accepted
  }

  const deleteEntity = (id: string) => {
    setState((prev) => prev.filter((entity) => entity.id !== id))
  }

  return { add, update, delete: deleteEntity }
}
