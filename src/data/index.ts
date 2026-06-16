export { RACES } from "./races"
export { CLASSES } from "./classes"
export {
  HEROES,
  HEROES_BASE,
  HERO_ENRICHMENTS,
  HERO_ID_ALIASES,
  RACE_NAME_ALIASES,
  CLASS_NAME_ALIASES,
} from "./heroes"
export { ITEMS } from "./items"
export { COMPS } from "./comps"
export {
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
} from "./cms-seeds"

/** Bump when seed data changes materially — triggers localStorage hero migration */
export const DATA_VERSION = 4
