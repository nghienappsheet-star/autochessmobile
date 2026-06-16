import type { Hero } from "@/types/domain"
import dragonestEnrichments from "./heroes-dragonest-enrichments.json"

type HeroBase = Pick<Hero, "id" | "name" | "cost" | "race" | "class">

/** Minimal hero records aligned with ac.dragonest.com/en/charactor */
export const HEROES_BASE: HeroBase[] = [
  // —— 1 cost ——
  { id: "hawk", name: "Hawk", cost: 1, race: ["Watcher"], class: ["Mage"] },
  { id: "unknown_horror", name: "Unknown Horror", cost: 1, race: ["Night Demon"], class: ["Warlock"] },
  { id: "resentful_murk", name: "Resentful Murk", cost: 1, race: ["Egersis"], class: ["Witcher"] },
  { id: "unicorn", name: "Unicorn", cost: 1, race: ["Beast"], class: ["Druid"] },
  { id: "ogre_mage", name: "Ogre Mage", cost: 1, race: ["Kira"], class: ["Mage"] },
  { id: "sky_breaker", name: "Sky Breaker", cost: 1, race: ["Goblin"], class: ["Mech"] },
  { id: "redaxe_chief", name: "Redaxe Chief", cost: 1, race: ["Cave"], class: ["Warrior"] },
  { id: "tusk_champion", name: "Tusk Champion", cost: 1, race: ["Beast"], class: ["Warrior"] },
  { id: "taboo_witcher", name: "Taboo Witcher", cost: 1, race: ["Feathered"], class: ["Witcher"] },
  { id: "defector", name: "Defector", cost: 1, race: ["Glacier"], class: ["Shaman"] },
  { id: "frost_knight", name: "Frost Knight", cost: 1, race: ["Glacier"], class: ["Knight"] },
  { id: "the_source", name: "The Source", cost: 1, race: ["Human"], class: ["Mage"] },
  { id: "egersis_ranger", name: "Egersis Ranger", cost: 1, race: ["Egersis"], class: ["Hunter"] },
  { id: "stone_spirit", name: "Stone Spirit", cost: 1, race: ["Spirits"], class: ["Warrior"] },
  { id: "heaven_bomber", name: "Heaven Bomber", cost: 1, race: ["Dwarf", "Goblin"], class: ["Mech"] },
  { id: "soul_breaker", name: "Soul Breaker", cost: 1, race: ["Goblin"], class: ["Assassin"] },
  { id: "winter_chiropteran", name: "Winter Chiropteran", cost: 1, race: ["Dragon", "Egersis"], class: ["Mage"] },

  // —— 2 cost ——
  { id: "soul_devourer", name: "Soul Devourer", cost: 2, race: ["Demon"], class: ["Wizard"] },
  { id: "goddess_of_light", name: "Goddess of Light", cost: 2, race: ["Divinity"], class: ["Priest"] },
  { id: "light_blade", name: "Light Blade", cost: 2, race: ["Feathered"], class: ["Knight"] },
  { id: "wisper_seer", name: "Wisper Seer", cost: 2, race: ["Feathered"], class: ["Druid"] },
  { id: "dwarf_sniper", name: "Dwarf Sniper", cost: 2, race: ["Dwarf"], class: ["Hunter"] },
  { id: "desperate_doctor", name: "Desperate Doctor", cost: 2, race: ["Glacier"], class: ["Warlock"] },
  { id: "abyssal_guard", name: "Abyssal Guard", cost: 2, race: ["Marine"], class: ["Warrior"] },
  { id: "abyssalcrawler", name: "Abyssalcrawler", cost: 2, race: ["Marine"], class: ["Assassin"] },
  { id: "skull_hunter", name: "Skull Hunter", cost: 2, race: ["Cave"], class: ["Hunter"] },
  { id: "swordman", name: "Swordman", cost: 2, race: ["Cave"], class: ["Warrior"] },
  { id: "hell_knight", name: "Hell Knight", cost: 2, race: ["Demon"], class: ["Knight"] },
  { id: "phantom_queen", name: "Phantom Queen", cost: 2, race: ["Demon"], class: ["Assassin"] },
  { id: "water_spirit", name: "Water Spirit", cost: 2, race: ["Spirits"], class: ["Assassin"] },
  { id: "ripper", name: "Ripper", cost: 2, race: ["Goblin"], class: ["Mech"] },
  { id: "shining_archer", name: "Shining Archer", cost: 2, race: ["Feathered"], class: ["Hunter"] },
  { id: "flame_wizard", name: "Flame Wizard", cost: 2, race: ["Human"], class: ["Mage"] },

  // —— 3 cost ——
  { id: "goddess_of_war", name: "Goddess of War", cost: 3, race: ["Ancestor"], class: ["Knight"] },
  { id: "mist_phantom_king", name: "Mist Phantom King", cost: 3, race: ["Night Demon"], class: ["Assassin"] },
  { id: "venom", name: "Venom", cost: 3, race: ["Dragon"], class: ["Assassin"] },
  { id: "penitent_bishop", name: "Penitent Bishop", cost: 3, race: ["Demon", "Ancestor"], class: ["Priest"] },
  { id: "eclipse_of_darkness", name: "Eclipse of Darkness", cost: 3, race: ["Egersis"], class: ["Priest"] },
  { id: "qin_xuan", name: "Qin Xuan", cost: 3, race: ["Feathered"], class: ["Mech"] },
  { id: "bobo", name: "Bobo", cost: 3, race: ["Beast"], class: ["Hunter"] },
  { id: "gem_artisan", name: "Gem Artisan", cost: 3, race: ["Civet"], class: ["Mech"] },
  { id: "ghost_kid", name: "Ghost Kid", cost: 3, race: ["Egersis"], class: ["Warrior"] },
  { id: "umbra", name: "Umbra", cost: 3, race: ["Dragon", "Egersis"], class: ["Hunter"] },
  { id: "berserker", name: "Berserker", cost: 3, race: ["Glacier"], class: ["Warrior"] },
  { id: "evil_knight", name: "Evil Knight", cost: 3, race: ["Egersis"], class: ["Knight"] },
  { id: "warpwood_sage", name: "Warpwood Sage", cost: 3, race: ["Feathered"], class: ["Druid"] },
  { id: "wind_ranger", name: "Wind Ranger", cost: 3, race: ["Feathered"], class: ["Hunter"] },
  { id: "shadowcrawler", name: "Shadowcrawler", cost: 3, race: ["Feathered"], class: ["Assassin"] },
  { id: "werewolf", name: "Werewolf", cost: 3, race: ["Human", "Beast"], class: ["Warrior"] },
  { id: "argali_knight", name: "Argali Knight", cost: 3, race: ["Human"], class: ["Knight"] },
  { id: "poisonous_worm", name: "Poisonous Worm", cost: 3, race: ["Insectoid", "Beast"], class: ["Warlock"] },
  { id: "fallen_witcher", name: "Fallen Witcher", cost: 3, race: ["Demon"], class: ["Witcher"] },
  { id: "shadow_devil", name: "Shadow Devil", cost: 3, race: ["Demon"], class: ["Warlock"] },
  { id: "lord_of_sand", name: "Lord of Sand", cost: 3, race: ["Beast", "Insectoid"], class: ["Assassin"] },
  { id: "thunder_spirit", name: "Thunder Spirit", cost: 3, race: ["Spirits"], class: ["Mage"] },
  { id: "fortune_teller", name: "Fortune Teller", cost: 3, race: ["Glacier"], class: ["Priest"] },
  { id: "grand_herald", name: "Grand Herald", cost: 3, race: ["Divinity"], class: ["Wizard"] },
  { id: "god_of_war", name: "God of War", cost: 3, race: ["Divinity"], class: ["Warrior"] },

  // —— 4 cost ——
  { id: "cave_prodigy", name: "Cave Prodigy", cost: 4, race: ["Cave"], class: ["Priest"] },
  { id: "thorn_predator", name: "Thorn Predator", cost: 4, race: ["Insectoid"], class: ["Assassin"] },
  { id: "spider_queen", name: "Spider Queen", cost: 4, race: ["Insectoid"], class: ["Hunter"] },
  { id: "shining_assassin", name: "Shining Assassin", cost: 4, race: ["Feathered"], class: ["Assassin"] },
  { id: "razorclaw", name: "Razorclaw", cost: 4, race: ["Beast"], class: ["Druid"] },
  { id: "dragon_knight", name: "Dragon Knight", cost: 4, race: ["Human", "Dragon"], class: ["Knight"] },
  { id: "siren", name: "Siren", cost: 4, race: ["Marine"], class: ["Hunter"] },
  { id: "storm_shaman", name: "Storm Shaman", cost: 4, race: ["Cave"], class: ["Shaman"] },
  { id: "venomancer", name: "Venomancer", cost: 4, race: ["Goblin", "Kira"], class: ["Warlock"] },
  { id: "pirate_captain", name: "Pirate Captain", cost: 4, race: ["Human"], class: ["Warrior"] },
  { id: "tortola_elder", name: "Tortola Elder", cost: 4, race: ["Human"], class: ["Mage"] },
  { id: "soul_reaper", name: "Soul Reaper", cost: 4, race: ["Egersis"], class: ["Warlock"] },
  { id: "doom_arbiter", name: "Doom Arbiter", cost: 4, race: ["Demon"], class: ["Warrior"] },
  { id: "grimtouch", name: "Grimtouch", cost: 4, race: ["Demon"], class: ["Wizard"] },

  // —— 5 cost ——
  { id: "sacred_lancer", name: "Sacred Lancer", cost: 5, race: ["Glacier"], class: ["Warrior"] },
  { id: "the_scryer", name: "The Scryer", cost: 5, race: ["Feathered"], class: ["Shaman"] },
  { id: "frostblaze_dragon", name: "Frostblaze Dragon", cost: 5, race: ["Dragon"], class: ["Mage"] },
  { id: "strange_egg", name: "Strange Egg", cost: 5, race: ["Feathered"], class: [] },
  { id: "helicopter", name: "Helicopter", cost: 5, race: ["Dwarf"], class: ["Mech"] },
  { id: "devastator", name: "Devastator", cost: 5, race: ["Goblin"], class: ["Mech"] },
  { id: "dark_spirit", name: "Dark Spirit", cost: 5, race: ["Spirits"], class: ["Warlock"] },
  { id: "tsunami_stalker", name: "Tsunami Stalker", cost: 5, race: ["Marine"], class: ["Hunter"] },
  { id: "god_of_thunder", name: "God of Thunder", cost: 5, race: ["Divinity"], class: ["Mage"] },
  { id: "rogue_guard", name: "Rogue Guard", cost: 5, race: ["Demon"], class: ["Warrior"] },
  { id: "khan", name: "Khan", cost: 5, race: ["Divinity", "Horn"], class: ["Druid"] },
]

export const HERO_MANUAL_ENRICHMENTS: Record<string, Partial<Hero>> = {
  devastator: {
    description: "Carry Mech 5 vàng — sát thương diện rộng mạnh khi kích hoạt đủ Goblin.",
    skill: {
      name: "Annihilation Wave",
      type: "Chủ động",
      desc: "Phóng sóng năng lượng gây sát thương phép lên tất cả kẻ địch trong phạm vi.",
    },
    stats: { hp: [900, 1620, 3240], atk: [70, 126, 252], armor: 35, mr: 25 },
    tacticalNotes: [
      "Cần ít nhất 4 Goblin trước khi roll tìm 2 sao.",
      "Ưu tiên item tấn công và hút máu để duy trì sau khi cast.",
    ],
    recommendedItemIds: ["devil_blade", "divine_sword", "shadow_edge"],
  },
  god_of_thunder: {
    description: "Mage carry Divinity — burst phép và giảm cooldown toàn đội.",
    skill: {
      name: "Thunder Wrath",
      type: "Chủ động",
      desc: "Triệu hồi sấm sét lên khu vực mục tiêu, gây sát thương phép lớn.",
    },
    stats: { hp: [850, 1530, 3060], atk: [65, 117, 234], armor: 25, mr: 40 },
    tacticalNotes: [
      "Giữ Divinity thuần hoặc 2 Divinity để tận dụng giảm cooldown.",
      "Crystal Sword và Magicka Crystal tăng tốc cast đáng kể.",
    ],
    recommendedItemIds: ["crystal_sword", "magicka_crystal", "mjollnir"],
  },
  dark_spirit: {
    description: "Warlock 5 vàng — sát thương theo % máu, counter frontline dày.",
    skill: {
      name: "Soul Rend",
      type: "Chủ động",
      desc: "Hút linh hồn kẻ địch, gây sát thương chuẩn dựa trên máu tối đa.",
    },
    stats: { hp: [800, 1440, 2880], atk: [60, 108, 216], armor: 20, mr: 35 },
    tacticalNotes: [
      "Đặt góc an toàn — cần thời gian cast.",
      "Kết hợp Spirits synergy để tăng sát thương skill.",
    ],
    recommendedItemIds: ["crystal_sword", "magicka_crystal", "devil_blade"],
  },
  dragon_knight: {
    description: "Knight carry lai Human/Dragon — frontline vừa tank vừa damage.",
    skill: {
      name: "Dragon Breath",
      type: "Chủ động",
      desc: "Phun lửa theo hình nón, gây sát thương phép và làm chậm.",
    },
    stats: { hp: [950, 1710, 3420], atk: [62, 112, 224], armor: 45, mr: 30 },
    tacticalNotes: [
      "Linh hoạt build tank hoặc carry tùy item.",
      "Phù hợp đội hình Human Knight hoặc Dragon.",
    ],
    recommendedItemIds: ["cattlehide_armor", "devil_blade", "divine_sword"],
  },
  doom_arbiter: {
    description: "Demon Warrior 4 vàng — sát thương chuẩn khi là Demon duy nhất.",
    skill: {
      name: "Doom Strike",
      type: "Chủ động",
      desc: "Tấn công mục tiêu gây sát thương lớn và cường hóa đòn đánh tiếp theo.",
    },
    stats: { hp: [880, 1584, 3168], atk: [68, 122, 244], armor: 40, mr: 20 },
    tacticalNotes: [
      "Cân nhắc Fallen Witcher để giữ Demon synergy.",
      "Item hút máu giúp sustain sau khi lao vào backline.",
    ],
    recommendedItemIds: ["divine_sword", "devil_blade", "claw_wand"],
  },
  shadowcrawler: {
    description: "Assassin Feathered 3 vàng — nhảy backline, burst carry địch.",
    skill: {
      name: "Shadow Step",
      type: "Chủ động",
      desc: "Nhảy tới kẻ địch có máu thấp nhất, gây sát thương vật lý lớn.",
    },
    stats: { hp: [650, 1170, 2340], atk: [72, 130, 260], armor: 25, mr: 15 },
    tacticalNotes: [
      "Đặt góc để nhảy đúng carry địch.",
      "Crystal Sword và Devil Blade tối ưu burst.",
    ],
    recommendedItemIds: ["crystal_sword", "devil_blade", "broken_sword"],
  },
  flame_wizard: {
    description: "Mage Human 2 vàng — AOE phép cho đội hình Mage.",
    skill: {
      name: "Flame Burst",
      type: "Chủ động",
      desc: "Gây sát thương phép lên khu vực và thiêu đốt theo thời gian.",
    },
    stats: { hp: [620, 1116, 2232], atk: [58, 104, 208], armor: 18, mr: 30 },
    tacticalNotes: [
      "Giữ 6 Mage nếu có thể để tăng sát thương phép.",
      "Magicka Crystal ưu tiên để cast liên tục.",
    ],
    recommendedItemIds: ["magicka_crystal", "crystal_sword", "shadow_edge"],
  },
  helicopter: {
    description: "Mech Dwarf 5 vàng — sát thương vật lý từ xa, core đội Dwarf Mech.",
    skill: {
      name: "Rocket Barrage",
      type: "Chủ động",
      desc: "Bắn loạt tên lửa lên khu vực, gây sát thương vật lý diện rộng.",
    },
    stats: { hp: [820, 1476, 2952], atk: [75, 135, 270], armor: 30, mr: 20 },
    tacticalNotes: [
      "Đặt backline an toàn — range xa nhưng dễ bị Assassin dive.",
      "Mjollnir hoặc Devil Blade cho damage scale.",
    ],
    recommendedItemIds: ["mjollnir", "devil_blade", "crystal_sword"],
  },
  tsunami_stalker: {
    description: "Hunter Marine 5 vàng — sustained DPS và counter Assassin.",
    skill: {
      name: "Tsunami Shot",
      type: "Chủ động",
      desc: "Bắn sóng nước xuyên thấu, gây sát thương và làm chậm.",
    },
    stats: { hp: [780, 1404, 2808], atk: [78, 140, 280], armor: 22, mr: 25 },
    tacticalNotes: [
      "Kết hợp 6 Hunter để tăng tốc đánh toàn đội.",
      "Item attack speed và crit tối ưu output.",
    ],
    recommendedItemIds: ["mjollnir", "devil_blade", "crystal_sword"],
  },
  god_of_war: {
    description: "Warrior Divinity 3 vàng — frontline trung tầm cho đội hình Divinity.",
    skill: {
      name: "War Cry",
      type: "Chủ động",
      desc: "Tăng giáp và gây sát thương vật lý lên kẻ địch gần.",
    },
    stats: { hp: [720, 1296, 2592], atk: [52, 94, 188], armor: 35, mr: 15 },
    tacticalNotes: [
      "Giữ 2 Divinity để tận dụng giảm cooldown.",
      "Claw Wand hoặc regen item giúp trụ lane.",
    ],
    recommendedItemIds: ["claw_wand", "ring_of_regen", "broken_sword"],
  },
  werewolf: {
    description: "Warrior lai Human/Beast — carry Warrior phổ biến trong comp 9 Warrior.",
    skill: { name: "Feral Rage", type: "Chủ động", desc: "Biến hình và tăng sát thương vật lý đáng kể." },
    tacticalNotes: ["Core carry comp 9 Warrior.", "Devil Blade hoặc Divine Sword cho late game."],
    recommendedItemIds: ["devil_blade", "divine_sword", "satanic_mask"],
  },
  berserker: {
    description: "Glacier Warrior 3 vàng — frontline damage cho comp Warrior.",
    skill: { name: "Berserk", type: "Chủ động", desc: "Tăng tốc đánh và sát thương khi máu thấp." },
    tacticalNotes: ["Lấp slot Warrior mid game.", "Kết hợp Glacier synergy nếu có."],
    recommendedItemIds: ["devil_blade", "claw_wand", "ring_of_regen"],
  },
  dwarf_sniper: {
    description: "Hunter Dwarf 2 vàng — carry Hunter range, core comp 6 Hunter.",
    skill: { name: "Piercing Shot", type: "Chủ động", desc: "Bắn xuyên thấu gây sát thương lên nhiều mục tiêu." },
    tacticalNotes: ["Carry chính comp Hunter.", "Maelstrom/Mjollnir tối ưu DPS."],
    recommendedItemIds: ["mjollnir", "ghost_shard", "crystal_sword"],
  },
  wind_ranger: {
    description: "Hunter Feathered 3 vàng — DPS range cho comp Hunter.",
    skill: { name: "Gale Arrow", type: "Chủ động", desc: "Bắn mũi tên gió gây sát thương diện rộng." },
    recommendedItemIds: ["ghost_shard", "crystal_sword", "mjollnir"],
  },
  egersis_ranger: {
    description: "Hunter Egersis 1 vàng — filler Hunter rẻ cho comp 6 Hunter 2 Egersis.",
    skill: { name: "Soul Arrow", type: "Chủ động", desc: "Bắn mũi tên gây sát thương vật lý." },
    recommendedItemIds: ["broken_sword", "ghost_shard"],
  },
  soul_reaper: {
    description: "Warlock Egersis 4 vàng — backline Warlock cho comp Hunter/Egersis.",
    skill: { name: "Soul Harvest", type: "Chủ động", desc: "Hút máu và gây sát thương phép lên mục tiêu." },
    recommendedItemIds: ["crystal_sword", "magicka_crystal"],
  },
  abyssalcrawler: {
    description: "Assassin Marine 2 vàng — Assassin mid game cho comp 6 Assassin.",
    skill: { name: "Abyssal Strike", type: "Chủ động", desc: "Lao tới backline gây sát thương burst." },
    recommendedItemIds: ["crystal_sword", "shadow_edge", "devil_blade"],
  },
  venom: {
    description: "Assassin Dragon 3 vàng — burst Assassin cho comp 6 Assassin.",
    skill: { name: "Venom Strike", type: "Chủ động", desc: "Gây sát thương lớn và poison mục tiêu." },
    recommendedItemIds: ["crystal_sword", "devil_blade", "shadow_edge"],
  },
  shining_assassin: {
    description: "Assassin Feathered 4 vàng — carry Assassin late game.",
    skill: { name: "Shining Blade", type: "Chủ động", desc: "Nhảy và gây sát thương chí mạng lên backline." },
    recommendedItemIds: ["crystal_sword", "devil_blade", "divine_sword"],
  },
  razorclaw: {
    description: "Druid Beast 4 vàng — frontline Druid cho comp Assassin.",
    skill: { name: "Razor Claw", type: "Chủ động", desc: "Quét móng vuốt gây sát thương vật lý diện rộng." },
    recommendedItemIds: ["claw_wand", "devil_blade"],
  },
  thunder_spirit: {
    description: "Mage Spirits 3 vàng — Mage core cho comp 9 Mage.",
    skill: { name: "Thunder Bolt", type: "Chủ động", desc: "Gọi sét gây sát thương phép lên khu vực." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword", "mjollnir"],
  },
  tortola_elder: {
    description: "Mage Human 4 vàng — Mage AOE cho comp 9 Mage.",
    skill: { name: "Arcane Surge", type: "Chủ động", desc: "Gây sát thương phép lên toàn bộ kẻ địch trong phạm vi." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword"],
  },
  grimtouch: {
    description: "Wizard Demon 4 vàng — Wizard burst cho comp Mage/Wizard.",
    skill: { name: "Grim Touch", type: "Chủ động", desc: "Gây sát thương phép và làm suy yếu kẻ địch." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword"],
  },
}

function buildHeroEnrichments(): Record<string, Partial<Hero>> {
  const imported = dragonestEnrichments as unknown as Record<string, Partial<Hero>>
  const result: Record<string, Partial<Hero>> = {}
  for (const hero of HEROES_BASE) {
    const fromDragonest = imported[hero.id] ?? {}
    const manual = HERO_MANUAL_ENRICHMENTS[hero.id] ?? {}
    result[hero.id] = {
      ...manual,
      ...fromDragonest,
      description: manual.description ?? fromDragonest.description,
      tacticalNotes: manual.tacticalNotes ?? fromDragonest.tacticalNotes,
      recommendedItemIds: manual.recommendedItemIds ?? fromDragonest.recommendedItemIds,
    }
  }
  return result
}

export const HERO_ENRICHMENTS = buildHeroEnrichments()

export const HEROES: Hero[] = HEROES_BASE.map((hero) => ({
  ...hero,
  ...(HERO_ENRICHMENTS[hero.id] ?? {}),
}))

/** Legacy hero id → canonical id (localStorage migration) */
export const HERO_ID_ALIASES: Record<string, string> = {
  falling_witcher: "fallen_witcher",
  lightblade_knight: "light_blade",
  shadow_crawler: "shadowcrawler",
}

/** Legacy race display names → canonical */
export const RACE_NAME_ALIASES: Record<string, string> = {
  "Cave Clan": "Cave",
  Spirit: "Spirits",
}

export const CLASS_NAME_ALIASES: Record<string, string> = {}
