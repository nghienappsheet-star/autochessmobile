import {
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
import { usePersistedEntity, usePersistedMergedList } from "@/lib/persistence-hooks"
import { STORAGE_KEYS } from "@/lib/storage-keys"
import type {
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

export function useCmsPersistedState() {
  const [posts, setPosts] = usePersistedEntity<Post[]>(STORAGE_KEYS.posts, DEFAULT_POSTS)
  const [banners, setBanners] = usePersistedMergedList<Banner>(STORAGE_KEYS.banners, DEFAULT_BANNERS)
  const [relics, setRelics] = usePersistedEntity<Relic[]>(STORAGE_KEYS.relics, DEFAULT_RELICS)
  const [comments, setComments] = usePersistedEntity<Comment[]>(STORAGE_KEYS.comments, DEFAULT_COMMENTS)
  const [communityPosts, setCommunityPosts] = usePersistedEntity<CommunityPost[]>(
    STORAGE_KEYS.communityPosts,
    DEFAULT_COMMUNITY_POSTS
  )
  const [teamMembers, setTeamMembers] = usePersistedEntity<TeamMember[]>(
    STORAGE_KEYS.teamMembers,
    DEFAULT_TEAM_MEMBERS
  )
  const [communityChannels, setCommunityChannels] = usePersistedEntity<CommunityChannel[]>(
    STORAGE_KEYS.communityChannels,
    DEFAULT_COMMUNITY_CHANNELS
  )
  const [events, setEvents] = usePersistedEntity<AdminEvent[]>(STORAGE_KEYS.events, DEFAULT_EVENTS)
  const [media, setMedia] = usePersistedEntity<MediaAsset[]>(STORAGE_KEYS.media, DEFAULT_MEDIA)
  const [players, setPlayers] = usePersistedEntity<LeaderboardPlayer[]>(
    STORAGE_KEYS.players,
    DEFAULT_PLAYERS
  )

  return {
    posts,
    setPosts,
    banners,
    setBanners,
    relics,
    setRelics,
    comments,
    setComments,
    communityPosts,
    setCommunityPosts,
    teamMembers,
    setTeamMembers,
    communityChannels,
    setCommunityChannels,
    events,
    setEvents,
    media,
    setMedia,
    players,
    setPlayers,
  }
}
