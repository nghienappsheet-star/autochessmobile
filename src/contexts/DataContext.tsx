import * as React from "react"
import {
  HEROES,
  ITEMS,
  COMPS,
  RACES,
  CLASSES,
  DATA_VERSION,
  DEFAULT_POSTS,
  DEFAULT_BANNERS,
  DEFAULT_RELICS,
  DEFAULT_COMMENTS,
  DEFAULT_COMMUNITY_POSTS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_COMMUNITY_CHANNELS,
  DEFAULT_EVENTS,
  DEFAULT_MEDIA,
  DEFAULT_PLAYERS,
} from "@/data"
import { loadJson, saveJson } from "@/lib/storage"
import { mergeHeroesWithSeed } from "@/lib/hero-utils"
import { mergeTraitsWithSeed, type TraitRecord } from "@/lib/trait-visuals"
import { mergeByIdWithSeed } from "@/lib/seed-merge"
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

export type {
  Post,
  PostStatus,
  Comment,
  CommunityPost,
  TeamMember,
  CommunityChannel,
  CommunityChannelPlatform,
  AdminEvent,
  MediaAsset,
  LeaderboardPlayer,
} from "@/types/domain"

const STORAGE_KEYS = {
  heroes: "autochess_heroes",
  dataVersion: "autochess_data_version",
  items: "autochess_items",
  comps: "autochess_comps",
  races: "autochess_races",
  classes: "autochess_classes",
  posts: "autochess_posts",
  banners: "autochess_banners",
  relics: "autochess_relics",
  comments: "autochess_comments",
  communityPosts: "autochess_community_posts",
  teamMembers: "autochess_team_members",
  communityChannels: "autochess_community_channels",
  events: "autochess_events",
  media: "autochess_media",
  players: "autochess_players",
} as const

type DataContextType = {
  heroes: Hero[]
  items: Item[]
  comps: Comp[]
  races: Race[]
  classes: ClassSynergy[]
  posts: Post[]
  banners: Banner[]
  relics: Relic[]
  comments: Comment[]
  communityPosts: CommunityPost[]
  teamMembers: TeamMember[]
  communityChannels: CommunityChannel[]
  events: AdminEvent[]
  media: MediaAsset[]
  players: LeaderboardPlayer[]
  addHero: (hero: Hero) => void
  addItem: (item: Item) => void
  addComp: (comp: Comp) => void
  addRace: (race: Race) => void
  addClass: (cls: ClassSynergy) => void
  addPost: (post: Post) => void
  addBanner: (banner: Banner) => void
  addRelic: (relic: Relic) => void
  addComment: (comment: Comment) => void
  addCommunityPost: (post: CommunityPost) => void
  addTeamMember: (member: TeamMember) => void
  addCommunityChannel: (channel: CommunityChannel) => void
  addEvent: (event: AdminEvent) => void
  addMedia: (asset: MediaAsset) => void
  addPlayer: (player: LeaderboardPlayer) => void
  updateHero: (id: string, patch: Partial<Hero>) => void
  replaceHero: (hero: Hero) => void
  resetHeroFields: (id: string, section: HeroResetSection) => void
  updateItem: (id: string, patch: Partial<Item>) => void
  updateComp: (id: string, patch: Partial<Comp>) => void
  updateRace: (id: string, patch: Partial<Race>) => void
  updateClass: (id: string, patch: Partial<ClassSynergy>) => void
  updatePost: (id: string, patch: Partial<Post>) => void
  updateBanner: (id: string, patch: Partial<Banner>) => void
  updateRelic: (id: string, patch: Partial<Relic>) => void
  updateComment: (id: string, patch: Partial<Comment>) => void
  updateCommunityPost: (id: string, patch: Partial<CommunityPost>) => void
  updateTeamMember: (id: string, patch: Partial<TeamMember>) => void
  updateCommunityChannel: (id: string, patch: Partial<CommunityChannel>) => void
  updateEvent: (id: string, patch: Partial<AdminEvent>) => void
  updateMedia: (id: string, patch: Partial<MediaAsset>) => void
  updatePlayer: (id: string, patch: Partial<LeaderboardPlayer>) => void
  deleteHero: (id: string) => void
  deleteItem: (id: string) => void
  deleteComp: (id: string) => void
  deleteRace: (id: string) => void
  deleteClass: (id: string) => void
  deletePost: (id: string) => void
  deleteBanner: (id: string) => void
  deleteRelic: (id: string) => void
  deleteComment: (id: string) => void
  deleteCommunityPost: (id: string) => void
  deleteTeamMember: (id: string) => void
  deleteCommunityChannel: (id: string) => void
  deleteEvent: (id: string) => void
  deleteMedia: (id: string) => void
  deletePlayer: (id: string) => void
  rerankPlayers: () => void
}

const noop = () => {}

const DataContext = React.createContext<DataContextType>({
  heroes: [],
  items: [],
  comps: [],
  races: [],
  classes: [],
  posts: [],
  banners: [],
  relics: [],
  comments: [],
  communityPosts: [],
  teamMembers: [],
  communityChannels: [],
  events: [],
  media: [],
  players: [],
  addHero: noop,
  addItem: noop,
  addComp: noop,
  addRace: noop,
  addClass: noop,
  addPost: noop,
  addBanner: noop,
  addRelic: noop,
  addComment: noop,
  addCommunityPost: noop,
  addTeamMember: noop,
  addCommunityChannel: noop,
  addEvent: noop,
  addMedia: noop,
  addPlayer: noop,
  updateHero: noop,
  replaceHero: noop,
  resetHeroFields: noop,
  updateItem: noop,
  updateComp: noop,
  updateRace: noop,
  updateClass: noop,
  updatePost: noop,
  updateBanner: noop,
  updateRelic: noop,
  updateComment: noop,
  updateCommunityPost: noop,
  updateTeamMember: noop,
  updateCommunityChannel: noop,
  updateEvent: noop,
  updateMedia: noop,
  updatePlayer: noop,
  deleteHero: noop,
  deleteItem: noop,
  deleteComp: noop,
  deleteRace: noop,
  deleteClass: noop,
  deletePost: noop,
  deleteBanner: noop,
  deleteRelic: noop,
  deleteComment: noop,
  deleteCommunityPost: noop,
  deleteTeamMember: noop,
  deleteCommunityChannel: noop,
  deleteEvent: noop,
  deleteMedia: noop,
  deletePlayer: noop,
  rerankPlayers: noop,
})

function usePersistedEntity<T>(key: string, fallback: T) {
  const [state, setState] = React.useState<T>(() => loadJson(key, fallback))
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}

function usePersistedHeroes() {
  const [state, setState] = React.useState<Hero[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<Hero[]>(STORAGE_KEYS.heroes, HEROES)
    const merged = mergeHeroesWithSeed(stored, HEROES)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(STORAGE_KEYS.heroes, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(STORAGE_KEYS.heroes, state)
  }, [state])
  return [state, setState] as const
}

function usePersistedTraits<T extends TraitRecord>(key: string, fallback: T[]) {
  const [state, setState] = React.useState<T[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, fallback)
    const merged = mergeTraitsWithSeed(stored, fallback)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}

function usePersistedMergedList<T extends { id: string }>(key: string, seed: T[]) {
  const [state, setState] = React.useState<T[]>(() => {
    const storedVersion = loadJson<number>(STORAGE_KEYS.dataVersion, 0)
    const stored = loadJson<T[]>(key, seed)
    const merged = mergeByIdWithSeed(stored, seed)
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION)
      saveJson(key, merged)
    }
    return merged
  })
  React.useEffect(() => {
    saveJson(key, state)
  }, [key, state])
  return [state, setState] as const
}

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [heroes, setHeroes] = usePersistedHeroes()
  const [items, setItems] = usePersistedMergedList<Item>(STORAGE_KEYS.items, ITEMS as Item[])
  const [comps, setComps] = usePersistedMergedList<Comp>(STORAGE_KEYS.comps, COMPS as Comp[])
  const [races, setRaces] = usePersistedTraits<Race>(STORAGE_KEYS.races, RACES as Race[])
  const [classes, setClasses] = usePersistedTraits<ClassSynergy>(
    STORAGE_KEYS.classes,
    CLASSES as ClassSynergy[]
  )
  const [posts, setPosts] = usePersistedEntity(STORAGE_KEYS.posts, DEFAULT_POSTS)
  const [banners, setBanners] = usePersistedMergedList<Banner>(STORAGE_KEYS.banners, DEFAULT_BANNERS)
  const [relics, setRelics] = usePersistedEntity(STORAGE_KEYS.relics, DEFAULT_RELICS)
  const [comments, setComments] = usePersistedEntity(STORAGE_KEYS.comments, DEFAULT_COMMENTS)
  const [communityPosts, setCommunityPosts] = usePersistedEntity(
    STORAGE_KEYS.communityPosts,
    DEFAULT_COMMUNITY_POSTS
  )
  const [teamMembers, setTeamMembers] = usePersistedEntity(
    STORAGE_KEYS.teamMembers,
    DEFAULT_TEAM_MEMBERS
  )
  const [communityChannels, setCommunityChannels] = usePersistedEntity(
    STORAGE_KEYS.communityChannels,
    DEFAULT_COMMUNITY_CHANNELS
  )
  const [events, setEvents] = usePersistedEntity(STORAGE_KEYS.events, DEFAULT_EVENTS)
  const [media, setMedia] = usePersistedEntity(STORAGE_KEYS.media, DEFAULT_MEDIA)
  const [players, setPlayers] = usePersistedEntity(STORAGE_KEYS.players, DEFAULT_PLAYERS)

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

  const addHero = React.useCallback((hero: Hero) => {
    heroCrud.add(hero)
  }, [heroCrud])
  const addItem = React.useCallback((item: Item) => {
    itemCrud.add(item)
  }, [itemCrud])
  const addComp = React.useCallback((comp: Comp) => {
    compCrud.add(comp)
  }, [compCrud])
  const addRace = React.useCallback((race: Race) => {
    raceCrud.add(race)
  }, [raceCrud])
  const addClass = React.useCallback((cls: ClassSynergy) => {
    classCrud.add(cls)
  }, [classCrud])
  const addPost = React.useCallback((post: Post) => {
    postCrud.add(post)
  }, [postCrud])
  const addBanner = React.useCallback((banner: Banner) => {
    bannerCrud.add(banner)
  }, [bannerCrud])
  const addRelic = React.useCallback((relic: Relic) => {
    relicCrud.add(relic)
  }, [relicCrud])
  const addComment = React.useCallback((comment: Comment) => {
    commentCrud.add(comment)
  }, [commentCrud])
  const addCommunityPost = React.useCallback((post: CommunityPost) => {
    setCommunityPosts((prev) => [
      ...prev,
      { ...post, images: sanitizeCommunityImageUrls(post.images) },
    ])
  }, [setCommunityPosts])
  const addTeamMember = React.useCallback((member: TeamMember) => {
    teamMemberCrud.add(member)
  }, [teamMemberCrud])
  const addCommunityChannel = React.useCallback((channel: CommunityChannel) => {
    channelCrud.add(channel)
  }, [channelCrud])
  const addEvent = React.useCallback((event: AdminEvent) => {
    eventCrud.add(event)
  }, [eventCrud])
  const addMedia = React.useCallback((asset: MediaAsset) => {
    if (!isPersistableImageUrl(asset.url)) return
    setMedia((prev) => [asset, ...prev])
  }, [setMedia])
  const addPlayer = React.useCallback((player: LeaderboardPlayer) => {
    setPlayers((prev) => {
      const next = [...prev, player].sort((a, b) => b.mmr - a.mmr)
      return next.map((p, idx) => ({ ...p, rank: idx + 1 }))
    })
  }, [setPlayers])

  const updateHero = React.useCallback(
    (id: string, patch: Partial<Hero>) => heroCrud.update(id, patch),
    [heroCrud]
  )
  const replaceHero = React.useCallback((hero: Hero) => {
    setHeroes((prev) => {
      const idx = prev.findIndex((h) => h.id === hero.id)
      if (idx === -1) return [...prev, hero]
      const next = [...prev]
      next[idx] = hero
      return next
    })
  }, [setHeroes])
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
  const updateCommunityPost = React.useCallback((id: string, patch: Partial<CommunityPost>) => {
    setCommunityPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const images =
          patch.images !== undefined ? sanitizeCommunityImageUrls(patch.images) : patch.images
        return { ...p, ...patch, ...(patch.images !== undefined ? { images } : {}) }
      })
    )
  }, [setCommunityPosts])
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
  const updatePlayer = React.useCallback((id: string, patch: Partial<LeaderboardPlayer>) => {
    setPlayers((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...patch } : p)).sort((a, b) => b.mmr - a.mmr)
      return next.map((p, idx) => ({ ...p, rank: idx + 1 }))
    })
  }, [setPlayers])

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
  const deletePlayer = React.useCallback((id: string) => {
    setPlayers((prev) => {
      const filtered = prev.filter((p) => p.id !== id)
      return filtered.map((p, idx) => ({ ...p, rank: idx + 1 }))
    })
  }, [setPlayers])

  const rerankPlayers = React.useCallback(() => {
    setPlayers((prev) => {
      const sorted = [...prev].sort((a, b) => b.mmr - a.mmr)
      return sorted.map((p, idx) => ({ ...p, rank: idx + 1 }))
    })
  }, [setPlayers])

  const value = React.useMemo(
    () => ({
      heroes,
      items,
      comps,
      races,
      classes,
      posts,
      banners,
      relics,
      comments,
      communityPosts,
      teamMembers,
      communityChannels,
      events,
      media,
      players,
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
    }),
    [
      heroes,
      items,
      comps,
      races,
      classes,
      posts,
      banners,
      relics,
      comments,
      communityPosts,
      teamMembers,
      communityChannels,
      events,
      media,
      players,
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
    ]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useAppStore = () => React.useContext(DataContext)

export { isPostImageUrl } from "@/lib/media-url"
export { estimateReadingMinutes } from "@/lib/news-utils"
