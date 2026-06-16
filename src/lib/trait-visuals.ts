import type { LucideIcon } from "lucide-react"
import {
  Bug,
  Cat,
  CircleDot,
  Cog,
  Crosshair,
  Crown,
  Eye,
  Flame,
  Ghost,
  Heart,
  Landmark,
  Leaf,
  Maximize2,
  Moon,
  Mountain,
  PawPrint,
  Pickaxe,
  Shield,
  Skull,
  Snowflake,
  Sparkles,
  Sword,
  Swords,
  Users,
  Waves,
  Wind,
  WandSparkles,
  Zap,
} from "lucide-react"

export type TraitVisual = {
  Icon: LucideIcon
  accentClass: string
  glowClass: string
}

/** Premium Lucide badge mapping — official PNGs are 50×50 and too low-res for UI */
const TRAIT_VISUALS: Record<string, TraitVisual> = {
  // Races
  ancestor: {
    Icon: Landmark,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/25 via-brand-gold/5 to-transparent",
  },
  beast: {
    Icon: PawPrint,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/25 via-tier-a/5 to-transparent",
  },
  cave_clan: {
    Icon: Mountain,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/10 via-white/5 to-transparent",
  },
  civet: {
    Icon: Cat,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/20 via-tier-a/5 to-transparent",
  },
  demon: {
    Icon: Flame,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/30 via-brand-red/5 to-transparent",
  },
  divinity: {
    Icon: Sparkles,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/35 via-brand-gold/10 to-transparent",
  },
  dragon: {
    Icon: Crown,
    accentClass: "text-tier-s",
    glowClass: "from-tier-s/25 via-tier-s/5 to-transparent",
  },
  dwarf: {
    Icon: Pickaxe,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent",
  },
  egersis: {
    Icon: Skull,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/12 via-white/4 to-transparent",
  },
  feathered: {
    Icon: Wind,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent",
  },
  glacier: {
    Icon: Snowflake,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/5 to-transparent",
  },
  goblin: {
    Icon: Users,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/20 via-brand-green/5 to-transparent",
  },
  greater: {
    Icon: Maximize2,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/20 via-brand-gold/5 to-transparent",
  },
  horn: {
    Icon: CircleDot,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/25 via-tier-a/5 to-transparent",
  },
  human: {
    Icon: Users,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/15 via-white/5 to-transparent",
  },
  insectoid: {
    Icon: Bug,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent",
  },
  kira: {
    Icon: Heart,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/25 via-brand-red/5 to-transparent",
  },
  marine: {
    Icon: Waves,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/8 to-transparent",
  },
  night_demon: {
    Icon: Moon,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/20 via-brand-red/5 to-transparent",
  },
  pandaman: {
    Icon: PawPrint,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/12 via-white/4 to-transparent",
  },
  spirit: {
    Icon: Ghost,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent",
  },
  watcher: {
    Icon: Eye,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/25 via-brand-gold/5 to-transparent",
  },
  // Classes
  assassin: {
    Icon: Swords,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/30 via-brand-red/5 to-transparent",
  },
  druid: {
    Icon: Leaf,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/30 via-brand-green/5 to-transparent",
  },
  hunter: {
    Icon: Crosshair,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent",
  },
  knight: {
    Icon: Shield,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/30 via-brand-gold/8 to-transparent",
  },
  mage: {
    Icon: WandSparkles,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/8 to-transparent",
  },
  mech: {
    Icon: Cog,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/12 via-white/4 to-transparent",
  },
  priest: {
    Icon: Heart,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent",
  },
  shaman: {
    Icon: Zap,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/35 via-brand-gold/10 to-transparent",
  },
  warlock: {
    Icon: Flame,
    accentClass: "text-tier-s",
    glowClass: "from-tier-s/25 via-tier-s/5 to-transparent",
  },
  warrior: {
    Icon: Sword,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/15 via-white/5 to-transparent",
  },
  witcher: {
    Icon: Eye,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/20 via-brand-red/5 to-transparent",
  },
  wizard: {
    Icon: Sparkles,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/30 via-tier-a/8 to-transparent",
  },
}

const DEFAULT_VISUAL: TraitVisual = {
  Icon: Sparkles,
  accentClass: "text-brand-gold",
  glowClass: "from-brand-gold/20 via-brand-gold/5 to-transparent",
}

export function getTraitVisual(id?: string): TraitVisual {
  if (!id) return DEFAULT_VISUAL
  return TRAIT_VISUALS[id] ?? DEFAULT_VISUAL
}

export type TraitRecord = {
  id: string
  name: string
  icon: string
  iconUrl?: string
  skillName?: string
  description: string
  milestones: { count: number; effect: string }[]
}

export function mergeTraitsWithSeed<T extends TraitRecord>(stored: T[], seed: T[]): T[] {
  const seedById = new Map(seed.map((item) => [item.id, item]))
  const storedById = new Map(stored.map((item) => [item.id, item]))
  const allIds = new Set([...seed.map((s) => s.id), ...stored.map((s) => s.id)])

  return [...allIds].map((id) => {
    const fromSeed = seedById.get(id)
    const fromStored = storedById.get(id)
    if (!fromStored) return fromSeed!
    if (!fromSeed) return fromStored

    return {
      ...fromSeed,
      ...fromStored,
      iconUrl: fromStored.iconUrl ?? fromSeed.iconUrl,
      skillName: fromStored.skillName ?? fromSeed.skillName,
      milestones:
        fromStored.milestones?.length && fromStored.milestones.some((m) => m.effect)
          ? fromStored.milestones
          : fromSeed.milestones,
      description: fromStored.description || fromSeed.description,
      icon: fromStored.icon || fromSeed.icon,
    }
  }) as T[]
}
