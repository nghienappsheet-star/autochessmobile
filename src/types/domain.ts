import type { ITEMS, COMPS, RACES, CLASSES } from "@/data"

export type HeroSkin = {
  id: string
  name: string
  imageUrl: string
  isDefault?: boolean
}

export type HeroSkill = {
  name: string
  type?: string
  desc: string
  iconUrl?: string
  descByStar?: [string, string, string]
}

export type HeroStats = {
  hp?: [number, number, number]
  atk?: [number, number, number]
  armor?: number | [number, number, number]
  mr?: number | [number, number, number]
  atkSpeed?: number | [number, number, number]
  range?: number | [number, number, number]
}

export type HeroRarity = "Common" | "Rare" | "Epic" | "Legendary"

export type Hero = {
  id: string
  name: string
  cost: number
  race: string[]
  class: string[]
  skill?: HeroSkill
  stats?: HeroStats
  description?: string
  tacticalNotes?: string[]
  recommendedItemIds?: string[]
  imageUrl?: string
  image?: string
  dragonestId?: string
  rarity?: HeroRarity
  lore?: string
  skins?: HeroSkin[]
  portraitUrl?: string
  iconUrl?: string
  chessTitle?: string
  isNew?: boolean
}

export type ItemCategory = "attack" | "defense" | "magic" | "utility"

export type TraitMilestone = {
  count: number
  effect: string
}

export type Race = {
  id: string
  name: string
  icon: string
  iconUrl?: string
  skillName?: string
  description: string
  milestones: TraitMilestone[]
}

export type ClassSynergy = Race

export type CompSynergy = {
  name: string
  desc: string
  active: boolean
}

export type CompRadarStats = {
  attack: number
  defense: number
  control: number
  difficulty: number
  economy: number
  lateGame: number
}

export type CompCounter = {
  name: string
  reason: string
  tip?: string
}

export type CompRoadmap = {
  early?: string
  mid?: string
  late?: string
}

export type CompTier = "S" | "A" | "B" | "C"

export type BoardPlacement = Record<number, string>

export type Comp = {
  id: string
  name: string
  author: string
  tier: CompTier | string
  winRate: string
  likes: string
  desc: string
  heroes: string[]
  board: BoardPlacement
  synergies: CompSynergy[]
  date: string
  difficulty?: number
  radarStats?: CompRadarStats
  mainCoreId?: string
  coreHeroIds?: string[]
  strengths?: string[]
  weaknesses?: string[]
  roadmap?: CompRoadmap
  strongAgainst?: CompCounter[]
  weakAgainst?: CompCounter[]
  tips?: string[]
}

export type Item = {
  id: string
  name: string
  tier: number
  category: ItemCategory
  stats: string
  description?: string
  effect?: string
  tacticalNotes?: string[]
  recommendedHeroIds?: string[]
  tags?: string[]
  imageUrl?: string
}

/** Seed array element types (for strict seed validation) */
export type SeedItem = (typeof ITEMS)[number]
export type SeedComp = (typeof COMPS)[number]
export type SeedRace = (typeof RACES)[number]
export type SeedClass = (typeof CLASSES)[number]

export type PostStatus = "Xuất bản" | "Bản nháp" | "Chờ duyệt"

export type Post = {
  id: string
  title: string
  author: string
  category: string
  views: string
  status: PostStatus
  date: string
  image: string
  excerpt?: string
  content?: string
  coverImageUrl?: string
}

export type Banner = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  status: string
}

export type Relic = {
  id: string
  name: string
  effect: string
  rating: string
  tier: number
  type: string
  status: string
}

export type CommentStatus = "Chờ duyệt" | "Đã duyệt" | "Báo cáo"

export type Comment = {
  id: string
  threadId: string
  parentId?: string
  author: string
  avatar: string
  target: string
  content: string
  date: string
  status: CommentStatus
}

export type CommunityPostImage = {
  url: string
  caption?: string
}

export type CommunityPost = {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  time: string
  likes: number
  comments: number
  tags: string[]
  images?: CommunityPostImage[]
}

export type TeamMember = {
  id: string
  name: string
  role: string
  avatar: string
  bio: string
  socialUrl?: string
  order: number
  status: string
}

export type CommunityChannelPlatform =
  | "youtube"
  | "tiktok"
  | "facebook"
  | "discord"
  | "other"

export type CommunityChannel = {
  id: string
  platform: CommunityChannelPlatform
  name: string
  url: string
  description: string
  highlight?: string
  avatar?: string
  order: number
  status: string
}

export type AdminEvent = {
  id: string
  title: string
  prize: string
  date: string
  participants: string
  status: string
}

export type MediaAsset = {
  id: string
  name: string
  url: string
  alt: string
  category: string
  size: string
  uploadedAt: string
}

export type LeaderboardPlayer = {
  id: string
  rank: number
  name: string
  server: string
  mmr: number
  tier: string
  winRate: string
  matches: number
}
