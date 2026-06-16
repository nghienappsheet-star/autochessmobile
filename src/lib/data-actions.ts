import * as React from "react"
import type { Dispatch, SetStateAction } from "react"
import { HEROES } from "@/data"
import { createCrudSetters } from "@/lib/entity-store"
import type { HeroResetSection } from "@/lib/admin-hero-form"
import { resetHeroFieldsFromSeed } from "@/lib/admin-hero-form"
import {
  isPersistableImageUrl,
  sanitizeCommunityImageUrls,
} from "@/lib/media-url"
import type {
  Hero,
  Item,
  Comp,
  Race,
  ClassSynergy,
  Post,
  Banner,
  Relic,
  Comment,
  CommunityPost,
  TeamMember,
  CommunityChannel,
  AdminEvent,
  MediaAsset,
  LeaderboardPlayer,
} from "@/types/domain"

type GameSetters = {
  setHeroes: Dispatch<SetStateAction<Hero[]>>
  setItems: Dispatch<SetStateAction<Item[]>>
  setComps: Dispatch<SetStateAction<Comp[]>>
  setRaces: Dispatch<SetStateAction<Race[]>>
  setClasses: Dispatch<SetStateAction<ClassSynergy[]>>
}

type CmsSetters = {
  setPosts: Dispatch<SetStateAction<Post[]>>
  setBanners: Dispatch<SetStateAction<Banner[]>>
  setRelics: Dispatch<SetStateAction<Relic[]>>
  setComments: Dispatch<SetStateAction<Comment[]>>
  setCommunityPosts: Dispatch<SetStateAction<CommunityPost[]>>
  setTeamMembers: Dispatch<SetStateAction<TeamMember[]>>
  setCommunityChannels: Dispatch<SetStateAction<CommunityChannel[]>>
  setEvents: Dispatch<SetStateAction<AdminEvent[]>>
  setMedia: Dispatch<SetStateAction<MediaAsset[]>>
  setPlayers: Dispatch<SetStateAction<LeaderboardPlayer[]>>
}

export function useDataCrudActions(game: GameSetters, cms: CmsSetters) {
  const {
    setHeroes,
    setItems,
    setComps,
    setRaces,
    setClasses,
  } = game
  const {
    setPosts,
    setBanners,
    setRelics,
    setComments,
    setCommunityPosts,
    setTeamMembers,
    setCommunityChannels,
    setEvents,
    setMedia,
    setPlayers,
  } = cms

  const heroCrud = React.useMemo(() => createCrudSetters<Hero>(setHeroes), [setHeroes])
  const itemCrud = React.useMemo(() => createCrudSetters<Item>(setItems), [setItems])
  const compCrud = React.useMemo(() => createCrudSetters<Comp>(setComps), [setComps])
  const raceCrud = React.useMemo(() => createCrudSetters<Race>(setRaces), [setRaces])
  const classCrud = React.useMemo(() => createCrudSetters<ClassSynergy>(setClasses), [setClasses])
  const postCrud = React.useMemo(
    () =>
      createCrudSetters<Post>(setPosts, {
        beforeAdd: (post) => {
          const cover = post.coverImageUrl?.trim()
          return !(cover && !isPersistableImageUrl(cover))
        },
        beforeUpdate: (_current, patch) => {
          const cover = patch.coverImageUrl?.trim()
          return !(cover && !isPersistableImageUrl(cover))
        },
      }),
    [setPosts]
  )
  const bannerCrud = React.useMemo(() => createCrudSetters<Banner>(setBanners), [setBanners])
  const relicCrud = React.useMemo(() => createCrudSetters<Relic>(setRelics), [setRelics])
  const commentCrud = React.useMemo(() => createCrudSetters<Comment>(setComments), [setComments])
  const teamMemberCrud = React.useMemo(
    () => createCrudSetters<TeamMember>(setTeamMembers),
    [setTeamMembers]
  )
  const channelCrud = React.useMemo(
    () => createCrudSetters<CommunityChannel>(setCommunityChannels),
    [setCommunityChannels]
  )
  const eventCrud = React.useMemo(() => createCrudSetters<AdminEvent>(setEvents), [setEvents])
  const mediaCrud = React.useMemo(
    () =>
      createCrudSetters<MediaAsset>(setMedia, {
        beforeAdd: (asset) => isPersistableImageUrl(asset.url),
        beforeUpdate: (_current, patch) => {
          const url = patch.url?.trim()
          return !(url && !isPersistableImageUrl(url))
        },
      }),
    [setMedia]
  )

  const addHero = React.useCallback((hero: Hero) => heroCrud.add(hero), [heroCrud])
  const addItem = React.useCallback((item: Item) => itemCrud.add(item), [itemCrud])
  const addComp = React.useCallback((comp: Comp) => compCrud.add(comp), [compCrud])
  const addRace = React.useCallback((race: Race) => raceCrud.add(race), [raceCrud])
  const addClass = React.useCallback((cls: ClassSynergy) => classCrud.add(cls), [classCrud])
  const addPost = React.useCallback((post: Post) => postCrud.add(post), [postCrud])
  const addBanner = React.useCallback((banner: Banner) => bannerCrud.add(banner), [bannerCrud])
  const addRelic = React.useCallback((relic: Relic) => relicCrud.add(relic), [relicCrud])
  const addComment = React.useCallback((comment: Comment) => commentCrud.add(comment), [commentCrud])
  const addCommunityPost = React.useCallback(
    (post: CommunityPost) => {
      setCommunityPosts((prev) => [
        ...prev,
        { ...post, images: sanitizeCommunityImageUrls(post.images) },
      ])
    },
    [setCommunityPosts]
  )
  const addTeamMember = React.useCallback(
    (member: TeamMember) => teamMemberCrud.add(member),
    [teamMemberCrud]
  )
  const addCommunityChannel = React.useCallback(
    (channel: CommunityChannel) => channelCrud.add(channel),
    [channelCrud]
  )
  const addEvent = React.useCallback((event: AdminEvent) => eventCrud.add(event), [eventCrud])
  const addMedia = React.useCallback(
    (asset: MediaAsset) => {
      if (!isPersistableImageUrl(asset.url)) return
      setMedia((prev) => [asset, ...prev])
    },
    [setMedia]
  )
  const addPlayer = React.useCallback(
    (player: LeaderboardPlayer) => {
      setPlayers((prev) => {
        const next = [...prev, player].sort((a, b) => b.mmr - a.mmr)
        return next.map((p, idx) => ({ ...p, rank: idx + 1 }))
      })
    },
    [setPlayers]
  )

  const updateHero = React.useCallback(
    (id: string, patch: Partial<Hero>) => heroCrud.update(id, patch),
    [heroCrud]
  )
  const replaceHero = React.useCallback(
    (hero: Hero) => {
      setHeroes((prev) => {
        const idx = prev.findIndex((h) => h.id === hero.id)
        if (idx === -1) return [...prev, hero]
        const next = [...prev]
        next[idx] = hero
        return next
      })
    },
    [setHeroes]
  )
  const resetHeroFields = React.useCallback(
    (id: string, section: HeroResetSection) => {
      setHeroes((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h
          const seed = HEROES.find((s) => s.id === id)
          return resetHeroFieldsFromSeed(h, seed, section)
        })
      )
    },
    [setHeroes]
  )
  const updateItem = React.useCallback(
    (id: string, patch: Partial<Item>) => itemCrud.update(id, patch),
    [itemCrud]
  )
  const updateComp = React.useCallback(
    (id: string, patch: Partial<Comp>) => compCrud.update(id, patch),
    [compCrud]
  )
  const updateRace = React.useCallback(
    (id: string, patch: Partial<Race>) => raceCrud.update(id, patch),
    [raceCrud]
  )
  const updateClass = React.useCallback(
    (id: string, patch: Partial<ClassSynergy>) => classCrud.update(id, patch),
    [classCrud]
  )
  const updatePost = React.useCallback(
    (id: string, patch: Partial<Post>) => postCrud.update(id, patch),
    [postCrud]
  )
  const updateBanner = React.useCallback(
    (id: string, patch: Partial<Banner>) => bannerCrud.update(id, patch),
    [bannerCrud]
  )
  const updateRelic = React.useCallback(
    (id: string, patch: Partial<Relic>) => relicCrud.update(id, patch),
    [relicCrud]
  )
  const updateComment = React.useCallback(
    (id: string, patch: Partial<Comment>) => commentCrud.update(id, patch),
    [commentCrud]
  )
  const updateCommunityPost = React.useCallback(
    (id: string, patch: Partial<CommunityPost>) => {
      setCommunityPosts((prev) =>
        prev.map((p) => {
          if (p.id !== id) return p
          const images =
            patch.images !== undefined ? sanitizeCommunityImageUrls(patch.images) : patch.images
          return { ...p, ...patch, ...(patch.images !== undefined ? { images } : {}) }
        })
      )
    },
    [setCommunityPosts]
  )
  const updateTeamMember = React.useCallback(
    (id: string, patch: Partial<TeamMember>) => teamMemberCrud.update(id, patch),
    [teamMemberCrud]
  )
  const updateCommunityChannel = React.useCallback(
    (id: string, patch: Partial<CommunityChannel>) => channelCrud.update(id, patch),
    [channelCrud]
  )
  const updateEvent = React.useCallback(
    (id: string, patch: Partial<AdminEvent>) => eventCrud.update(id, patch),
    [eventCrud]
  )
  const updateMedia = React.useCallback(
    (id: string, patch: Partial<MediaAsset>) => mediaCrud.update(id, patch),
    [mediaCrud]
  )
  const updatePlayer = React.useCallback(
    (id: string, patch: Partial<LeaderboardPlayer>) => {
      setPlayers((prev) => {
        const next = prev.map((p) => (p.id === id ? { ...p, ...patch } : p)).sort((a, b) => b.mmr - a.mmr)
        return next.map((p, idx) => ({ ...p, rank: idx + 1 }))
      })
    },
    [setPlayers]
  )

  const deleteHero = React.useCallback((id: string) => heroCrud.delete(id), [heroCrud])
  const deleteItem = React.useCallback((id: string) => itemCrud.delete(id), [itemCrud])
  const deleteComp = React.useCallback((id: string) => compCrud.delete(id), [compCrud])
  const deleteRace = React.useCallback((id: string) => raceCrud.delete(id), [raceCrud])
  const deleteClass = React.useCallback((id: string) => classCrud.delete(id), [classCrud])
  const deletePost = React.useCallback((id: string) => postCrud.delete(id), [postCrud])
  const deleteBanner = React.useCallback((id: string) => bannerCrud.delete(id), [bannerCrud])
  const deleteRelic = React.useCallback((id: string) => relicCrud.delete(id), [relicCrud])
  const deleteComment = React.useCallback((id: string) => commentCrud.delete(id), [commentCrud])
  const deleteCommunityPost = React.useCallback(
    (id: string) => setCommunityPosts((prev) => prev.filter((p) => p.id !== id)),
    [setCommunityPosts]
  )
  const deleteTeamMember = React.useCallback(
    (id: string) => teamMemberCrud.delete(id),
    [teamMemberCrud]
  )
  const deleteCommunityChannel = React.useCallback(
    (id: string) => channelCrud.delete(id),
    [channelCrud]
  )
  const deleteEvent = React.useCallback((id: string) => eventCrud.delete(id), [eventCrud])
  const deleteMedia = React.useCallback((id: string) => mediaCrud.delete(id), [mediaCrud])
  const deletePlayer = React.useCallback(
    (id: string) => {
      setPlayers((prev) => {
        const filtered = prev.filter((p) => p.id !== id)
        return filtered.map((p, idx) => ({ ...p, rank: idx + 1 }))
      })
    },
    [setPlayers]
  )

  const rerankPlayers = React.useCallback(() => {
    setPlayers((prev) => {
      const sorted = [...prev].sort((a, b) => b.mmr - a.mmr)
      return sorted.map((p, idx) => ({ ...p, rank: idx + 1 }))
    })
  }, [setPlayers])

  return {
    addHero,
    addItem,
    addComp,
    addRace,
    addClass,
    addPost,
    addBanner,
    addRelic,
    addComment,
    addCommunityPost,
    addTeamMember,
    addCommunityChannel,
    addEvent,
    addMedia,
    addPlayer,
    updateHero,
    replaceHero,
    resetHeroFields,
    updateItem,
    updateComp,
    updateRace,
    updateClass,
    updatePost,
    updateBanner,
    updateRelic,
    updateComment,
    updateCommunityPost,
    updateTeamMember,
    updateCommunityChannel,
    updateEvent,
    updateMedia,
    updatePlayer,
    deleteHero,
    deleteItem,
    deleteComp,
    deleteRace,
    deleteClass,
    deletePost,
    deleteBanner,
    deleteRelic,
    deleteComment,
    deleteCommunityPost,
    deleteTeamMember,
    deleteCommunityChannel,
    deleteEvent,
    deleteMedia,
    deletePlayer,
    rerankPlayers,
  }
}

export type DataCrudActions = ReturnType<typeof useDataCrudActions>
