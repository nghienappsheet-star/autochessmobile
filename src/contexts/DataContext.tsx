import * as React from "react"
import { useCmsPersistedState } from "@/lib/cms-store"
import { useGamePersistedState } from "@/lib/game-store"
import { useDataCrudActions } from "@/lib/data-actions"
import type { HeroResetSection } from "@/lib/admin-hero-form"
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

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const game = useGamePersistedState()
  const cms = useCmsPersistedState()
  const actions = useDataCrudActions(game, cms)

  const value = React.useMemo(
    () => ({
      heroes: game.heroes,
      items: game.items,
      comps: game.comps,
      races: game.races,
      classes: game.classes,
      posts: cms.posts,
      banners: cms.banners,
      relics: cms.relics,
      comments: cms.comments,
      communityPosts: cms.communityPosts,
      teamMembers: cms.teamMembers,
      communityChannels: cms.communityChannels,
      events: cms.events,
      media: cms.media,
      players: cms.players,
      ...actions,
    }),
    [game, cms, actions]
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useAppStore = () => React.useContext(DataContext)

export { isPostImageUrl } from "@/lib/media-url"
export { estimateReadingMinutes } from "@/lib/news-utils"
