import { ITEMS, COMPS, RACES, CLASSES } from "@/data"
import {
  usePersistedHeroes,
  usePersistedMergedList,
  usePersistedTraits,
} from "@/lib/persistence-hooks"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import type { Hero, Item, Comp, Race, ClassSynergy } from "@/types/domain"

export function useGamePersistedState() {
  const [heroes, setHeroes] = usePersistedHeroes()
  const [items, setItems] = usePersistedMergedList<Item>(STORAGE_KEYS.items, ITEMS as Item[])
  const [comps, setComps] = usePersistedMergedList<Comp>(STORAGE_KEYS.comps, COMPS as Comp[])
  const [races, setRaces] = usePersistedTraits<Race>(STORAGE_KEYS.races, RACES as Race[])
  const [classes, setClasses] = usePersistedTraits<ClassSynergy>(
    STORAGE_KEYS.classes,
    CLASSES as ClassSynergy[]
  )

  return {
    heroes,
    setHeroes,
    items,
    setItems,
    comps,
    setComps,
    races,
    setRaces,
    classes,
    setClasses,
  }
}
