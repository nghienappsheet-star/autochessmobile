import * as React from "react"
import { loadJson, saveJson } from "@/lib/storage"

const favoritesKey = (type: "heroes" | "items" | "comps") => `auto_chess_favorites_${type}`

export function useFavorites(type: "heroes" | "items" | "comps") {
  const [favorites, setFavorites] = React.useState<string[]>(() =>
    loadJson(favoritesKey(type), [])
  )

  React.useEffect(() => {
    saveJson(favoritesKey(type), favorites)
  }, [favorites, type])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    )
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return { favorites, toggleFavorite, isFavorite }
}
