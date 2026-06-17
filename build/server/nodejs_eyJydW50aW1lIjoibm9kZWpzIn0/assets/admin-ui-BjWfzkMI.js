import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import { Sparkles, Eye, Sword, Flame, Zap, Heart, Cog, WandSparkles, Shield, Crosshair, Leaf, Swords, Ghost, PawPrint, Moon, Waves, Bug, Users, CircleDot, Maximize2, Snowflake, Wind, Skull, Pickaxe, Crown, Cat, Mountain, Landmark, ChevronDown, Check, X, ChevronRight, Loader2, ImagePlus, ChevronLeft, Search, AlertTriangle, Plus, ExternalLink, Trash2, SquarePen, Package, Gem, Image, Server, RotateCcw, Globe, Bell } from "lucide-react";
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Slot } from "@radix-ui/react-slot";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import * as SelectPrimitive from "@radix-ui/react-select";
const RACES = [
  {
    id: "ancestor",
    name: "Ancestor",
    icon: "🏛️",
    iconUrl: "/traits/ancestor.png",
    skillName: "Shining Combo",
    description: "Tộc Ancestor tăng sức mạnh cho các tướng cổ xưa trên bàn cờ.",
    milestones: [
      { count: 2, effect: "All Ancestor pieces steal (50 + 2% of max HP) HP every 5 seconds from the nearest enemy to heal themselves." },
      { count: 4, effect: "All allies gain the effect: Whenever total healing received exceeds 100, nearby enemies take pure damage equal to the total healing received. Damage dealt has a single-instance cap of 300 and a 5-second CD." }
    ]
  },
  {
    id: "beast",
    name: "Beast",
    icon: "🐾",
    iconUrl: "/traits/beast.png",
    skillName: "Beast",
    description: "Tăng sát thương vật lý cho toàn đội hình hoặc triệu hồi thêm các đơn vị hỗ trợ.",
    milestones: [
      { count: 2, effect: "All allies have +15% attack damage, including summoned units" },
      { count: 4, effect: "All allies have +30% attack damage, including summoned units" },
      { count: 6, effect: "Increases 30% ATK for all allies, including the summoned. The enemy will take 16 extra Physical Damage when attacked by an ally who benefits from the Beast Synergy, this effect can be stacked" }
    ]
  },
  {
    id: "cave_clan",
    name: "Cave",
    icon: "🪨",
    iconUrl: "/traits/cave_clan.png",
    skillName: "Cave",
    description: "Tăng lượng máu tối đa cho các đơn vị tộc Cave dựa trên lượng máu đã mất hoặc cấp độ.",
    milestones: [
      { count: 2, effect: "All allies +100 max HP" },
      { count: 4, effect: "All allies +350 max HP" },
      { count: 6, effect: "All allies +350 HP. Ally HP is boosted equal to 700x the percentage of the chess player’s missing HP" }
    ]
  },
  {
    id: "civet",
    name: "Civet",
    icon: "🐱",
    iconUrl: "/traits/civet.png",
    skillName: "Civet",
    description: "Tộc Civet tăng sức mạnh cho các tướng Mech và carry linh hoạt.",
    milestones: [
      { count: 2, effect: "Creates a duplicate when a Civet piece ranks up to 3 stars. When battle starts each round, if two identical pieces exist on the board, summons a Golem copy with 100% damage ability for each couple of identical pieces." }
    ]
  },
  {
    id: "demon",
    name: "Demon",
    icon: "👿",
    iconUrl: "/traits/demon.png",
    skillName: "Demon",
    description: "Demon gây thêm sát thương chuẩn nếu là Demon duy nhất trên bàn cờ (hoặc có Witcher).",
    milestones: [
      { count: 1, effect: "Attack deals 50% extra pure damage to the target. Active when only one kind of Hunter demon on the chessboard" }
    ]
  },
  {
    id: "divinity",
    name: "Divinity",
    icon: "✨",
    iconUrl: "/traits/divinity.png",
    skillName: "Divinity",
    description: "Giảm thời gian hồi chiêu cho toàn bộ tướng nếu không kích hoạt bất kỳ tộc nào khác.",
    milestones: [
      { count: 2, effect: "Reduces Ability CD by 40% for all allied Divinities and other allies whose Race's synergies are not triggered." },
      { count: 4, effect: "Reduces Ability CD by 60% for all allied Divinities and other allies whose Race's synergies are not triggered." }
    ]
  },
  {
    id: "dragon",
    name: "Dragon",
    icon: "🐉",
    iconUrl: "/traits/dragon.png",
    skillName: "Dragon",
    description: "Tướng tộc Dragon bắt đầu trận đấu với lượng năng lượng nhất định.",
    milestones: [
      { count: 3, effect: "At the start of the battle, 3 allied Dragons have 100 mana. (When there are more than 3 allied Dragons on the Chessboard, those deployed on the relative left will get the effects in priority.)" },
      { count: 5, effect: "At the start of the battle, 5 Allies have 100 mana. (When there are more than 5 allies on the Chessboard, those deployed on the relative left will get the effects in priority.)" }
    ]
  },
  {
    id: "dwarf",
    name: "Dwarf",
    icon: "⛏️",
    iconUrl: "/traits/dwarf.png",
    skillName: "Dwarf",
    description: "Tộc Dwarf tăng sát thương vật lý và khả năng chống chịu cho đội hình Mech/Hunter.",
    milestones: [
      { count: 2, effect: "Increases all ranged allies' attack range by 2 grids and deals extra damage equals to the number of grids between the two sides * 5%, giving priority to the enemy with the lowest HP within the attack range." }
    ]
  },
  {
    id: "egersis",
    name: "Egersis",
    icon: "💀",
    iconUrl: "/traits/egersis.png",
    skillName: "Egersis",
    description: "Giảm giáp của toàn bộ quân địch.",
    milestones: [
      { count: 2, effect: "All enemy -4 armor" },
      { count: 4, effect: "All enemy -8 armor" },
      { count: 6, effect: "All enemy -12 armor,If a unit is killed by these enemies, it will continue to fight for 3.5s seconds. (it won't receive normal attacks, nor can it be chosen by allies' abilities or cast abilities during the period)" }
    ]
  },
  {
    id: "feathered",
    name: "Feathered",
    icon: "🪶",
    iconUrl: "/traits/feathered.png",
    skillName: "Feathered",
    description: "Tăng tỉ lệ né tránh đòn đánh vật lý.",
    milestones: [
      { count: 3, effect: "All allied Feathered have 20% chance of evasion" },
      { count: 6, effect: "All allied Feathered gain a 40% chance to evade attacks, and other Allies gain a 20% chance to evade attacks" },
      { count: 9, effect: "All allied Feathered gain a 60% chance to evade attacks, and other Allies gain a 44% chance to evade attacks.Once successfully evade, the ally creates an illusion for 7s." }
    ]
  },
  {
    id: "glacier",
    name: "Glacier",
    icon: "❄️",
    iconUrl: "/traits/glacier.png",
    skillName: "Glacier",
    description: "Tăng tốc độ đánh cho quân Glacier hoặc toàn đội.",
    milestones: [
      { count: 2, effect: "All allied Glacier attack speed +20%" },
      { count: 4, effect: "Increase all allied pieces ATK Speed by 50%; Each attack grants them an extra stack of 8% ATK Speed bonus, up to 15 stacks" }
    ]
  },
  {
    id: "goblin",
    name: "Goblin",
    icon: "👺",
    iconUrl: "/traits/goblin.png",
    skillName: "Goblin",
    description: "Tăng giáp và khả năng hồi máu.",
    milestones: [
      { count: 3, effect: "Random allied unit armor +15, HP Regeneration +15" },
      { count: 6, effect: "All allied armor +15, HP Regeneration +15" }
    ]
  },
  {
    id: "greater",
    name: "Greater",
    icon: "🦣",
    iconUrl: "/traits/greater.png",
    skillName: "Greater",
    description: "Tộc Greater tăng sức mạnh cho các tướng khổng lồ trên bàn cờ.",
    milestones: [
      { count: 2, effect: "When only the Greater Synergy is in effect, all allied pieces will be immune to all control effects. Normal attacks have a 25% chance to cast 2s Spatial Imprisonment and cause 50 physical damage to enemy units. Spatial Imprisonment: Cannot move, turn, attack, or cast abilities." }
    ]
  },
  {
    id: "horn",
    name: "Horn",
    icon: "🦬",
    iconUrl: "/traits/horn.png",
    skillName: "Horn",
    description: "Tộc Horn tăng khả năng chống chịu và sức mạnh cho Druid.",
    milestones: [
      { count: 2, effect: "Summons a Horn Totem (HP equals to total enemy pieces*3) when battle starts;" },
      { count: 4, effect: "Summons a Horn Totem (HP equals to total enemy pieces*3), a Sunchaser Totem (HP equals to total enemy pieces*1), and a Skydome Totem (HP equals to total enemy pieces*1) when battle starts. Horn Totem: will be targeted first when within enemy attack range. Sunchaser Totem: Causes all enemy units to have a 10% chance of taking 250 physical damage and being disarmed for 2 seconds after each normal attack. Skydome Totem: Causes all enemy units to have a 50% chance to take 500 magical damage and be silenced for 5 seconds after each ability cast. Totem cannot move, attack or restore HP. Receives only 1 melee attack damage or 2 ranged attack damage each time." }
    ]
  },
  {
    id: "human",
    name: "Human",
    icon: "👨",
    iconUrl: "/traits/human.png",
    skillName: "Human",
    description: "Đòn đánh thường có tỉ lệ gây câm lặng mục tiêu.",
    milestones: [
      { count: 3, effect: "After winning a battle against another player, if at least one ally Human survives, gets EXP Book x1" },
      { count: 6, effect: "After winning a battle against another player, if at least one ally Human survives, gets EXP Book x4" }
    ]
  },
  {
    id: "insectoid",
    name: "Insectoid",
    icon: "🐛",
    iconUrl: "/traits/insectoid.png",
    skillName: "Insectoid",
    description: "Tộc Insectoid gây sát thương theo thời gian và debuff lên kẻ địch.",
    milestones: [
      { count: 2, effect: "When there are duplicate non-Insectoid allied pieces on the chessboard and one of them dies, summons a random insectoid piece based on the highest cost among the living duplicates." },
      { count: 4, effect: "When there are duplicate non-Insectoid allied pieces on the chessboard and one of them dies, summons a random insectoid piece based on the highest cost among the living duplicates." }
    ]
  },
  {
    id: "kira",
    name: "Kira",
    icon: "👹",
    iconUrl: "/traits/kira.png",
    skillName: "Kira",
    description: "Tăng máu và sát thương khi có đồng minh hy sinh.",
    milestones: [
      { count: 2, effect: "If any allied melee pieces die, increases current HP by 20%, ATK by 20% for all allied Kiras, can be stacked 6 times" }
    ]
  },
  {
    id: "marine",
    name: "Marine",
    icon: "🌊",
    iconUrl: "/traits/marine.png",
    skillName: "Marine",
    description: "Tăng kháng phép cho toàn đội.",
    milestones: [
      { count: 2, effect: "All allies magical resistence +30%" },
      { count: 4, effect: "All allies magical resistence +60%" }
    ]
  },
  {
    id: "night_demon",
    name: "Night Demon",
    icon: "🌑",
    iconUrl: "/traits/night_demon.png",
    skillName: "Smoke Trick",
    description: "Tộc Night Demon tăng sát thương burst và khả năng áp đảo tuyến sau.",
    milestones: [
      { count: 2, effect: "Ally Night Demon pieces gain the effect: If there are more than 1 enemy nearby, they will lose control due to fear. The effect of fear has a built-in CD of 6 seconds and cannot trigger consecutively." }
    ]
  },
  {
    id: "pandaman",
    name: "Pandaman",
    icon: "🐼",
    iconUrl: "/traits/pandaman.png",
    skillName: "Pandaman",
    description: "Tộc Pandaman mang lại hiệu ứng hỗ trợ và sinh tồn cho đội hình.",
    milestones: [
      { count: 1, effect: "At the beginning of the round, there is a 10% chance to invite a Pandaman." },
      { count: 2, effect: "At the beginning of the round, there is a 20% chance to invite a Pandaman." },
      { count: 3, effect: "At the beginning of the round, there is a 20% chance to invite a Pandaman.There is a 40% chance to invite an extra Pandaman." }
    ]
  },
  {
    id: "spirit",
    name: "Spirits",
    icon: "👻",
    iconUrl: "/traits/spirit.png",
    skillName: "Spirits",
    description: "Tỉ lệ hóa đá kẻ địch khi bị tấn công cận chiến.",
    milestones: [
      { count: 2, effect: "All allied Spirits have 30% chance to turn the melee attacker into stone for 4 seconds Petrified: No Moving, No attacking, can not use skills" },
      { count: 4, effect: "All allies have 50% chance to turn the melee attacker into stone for 4 seconds. Petrified: No Moving, No attacking, can not use skills" }
    ]
  },
  {
    id: "watcher",
    name: "Watcher",
    icon: "🦅",
    iconUrl: "/traits/watcher.png",
    skillName: "Watcher",
    description: "Tộc Watcher tăng tầm nhìn chiến trường và sát thương phép.",
    milestones: [
      { count: 2, effect: "All allies gain the effect: Unit-targeted or Item abilities cast on enemies can affect +1 additional targets." }
    ]
  }
];
const CLASSES = [
  {
    id: "assassin",
    name: "Assassin",
    icon: "🗡️",
    iconUrl: "/traits/assassin.png",
    description: "Nhảy ra tuyến sau kẻ địch khi bắt đầu trận và có tỉ lệ gây sát thương chí mạng.",
    milestones: [
      { count: 3, effect: "All allied Assassins gain a 15% chance to exert 300% damage, and a 40% chance to deal 300% damages with their first Base attack in each round" },
      { count: 6, effect: "All allied Assassins gain a 20% chance to exert 350% damage, and a 60% chance to deal 350% damages with their first Base attack in each round" },
      { count: 9, effect: "All allied Assassins have 30% chance to deal 400% damages, and have 100% chance to deal 400% damages with their first base attack in each round" }
    ]
  },
  {
    id: "druid",
    name: "Druid",
    icon: "🌿",
    iconUrl: "/traits/druid.png",
    description: "Nâng cấp tướng Druid tốn ít quân cờ hơn.",
    milestones: [
      { count: 2, effect: "Every 2 1-star Druid on the board could combined to one 2-star Druid" },
      { count: 4, effect: "Every 2 2-star Druid on the board could combined to one 3-star Druid" }
    ]
  },
  {
    id: "hunter",
    name: "Hunter",
    icon: "🏹",
    iconUrl: "/traits/hunter.png",
    description: "Tăng sát thương vật lý và tỉ lệ đánh chính xác (không bị né).",
    milestones: [
      { count: 3, effect: "All allied Hunters attack +35 and grants 30% chance to pierce through evasion" },
      { count: 6, effect: "All allied Hunters attack +80 and grants 65% chance to pierce through evasion" }
    ]
  },
  {
    id: "knight",
    name: "Knight",
    icon: "🛡️",
    iconUrl: "/traits/knight.png",
    description: "Nhận khiên giảm sát thương vật lý và kháng phép định kỳ.",
    milestones: [
      { count: 2, effect: "All allied Knights gain a 100% chance at the beginning of each round and then a 25% chance in every 3 seconds, to obtain a damage-reducing shield, which grants +75% Magic Resistance, +30 Armor. The shield lasts for 2 seconds." },
      { count: 4, effect: "All allied Knights gain a 100% chance at the beginning of each round and then a 48% chance in every 2 seconds, to obtain a damage-reducing shield, which grants +75% Magic Resistance, +30 Armor. The shield lasts for 2 seconds." },
      { count: 6, effect: "All allied Knights gain a 100% chance at the beginning of each round and then a 65% chance in every 2 seconds, to obtain a damage-reducing shield, which grants +75% Magic Resistance, +30 Armor. The shield lasts for 2 seconds." }
    ]
  },
  {
    id: "mage",
    name: "Mage",
    icon: "🪄",
    iconUrl: "/traits/mage.png",
    description: "Giảm kháng phép của toàn bộ kẻ địch.",
    milestones: [
      { count: 3, effect: "All enemy lose 40% Magical Resistence" },
      { count: 6, effect: "All enemy lose 90% Magical Resistence" },
      { count: 9, effect: "All enemy lose 130% Magical Resistence" }
    ]
  },
  {
    id: "mech",
    name: "Mech",
    icon: "⚙️",
    iconUrl: "/traits/mech.png",
    description: "Nhận thêm vàng sau mỗi trận thắng hoặc nhận Heart of Mech.",
    milestones: [
      { count: 3, effect: "After winning a battle against another player, if at least one ally Mech survives, gets Heart of Mech x1." },
      { count: 6, effect: "After winning a battle against another player, if at least one ally Mech survives, gets Golden Heart of Mech x1." }
    ]
  },
  {
    id: "priest",
    name: "Priest",
    icon: "✝️",
    iconUrl: "/traits/priest.png",
    description: "Giảm sát thương nhận vào linh thú hoặc bảo vệ linh thú.",
    milestones: [
      { count: 1, effect: "When the chess player receives more than 2 damage, it'll block 20% damage for the chess player" },
      { count: 2, effect: "When the chessplayer receives more than 2 damage, blocks {0} damage for the chessplayer; and if the chessplayer receives more than 8 damage, gets Green Essence x1" },
      { count: 3, effect: "When the chess player receives more than 2 damage, blocks 20% of damage for the chess player; when the chess player receives 8 to 14 damage, gets Green Essence x1; when the chess player receives more than 15 damage, gets Red Essence x1." }
    ]
  },
  {
    id: "shaman",
    name: "Shaman",
    icon: "⚡",
    iconUrl: "/traits/shaman.png",
    description: "Biến hình kẻ địch khi bắt đầu trận đấu.",
    milestones: [
      { count: 2, effect: "Change a random enemy unit into a penguin when battle starts for 6s" },
      { count: 4, effect: "At the start of a battle, hexes a random enemy into penguin for 6s. And all Shamans get a buff: when killed by an enemy piece, hexes the enemy into a random chess piece of the same cost and the same star level.Possibility to turn into a random Chess Piece which costs +1 or +2 （+1:40%,+2:60%）" }
    ]
  },
  {
    id: "warlock",
    name: "Warlock",
    icon: "🔮",
    iconUrl: "/traits/warlock.png",
    description: "Cung cấp khả năng hút máu toàn phần từ đòn đánh và kỹ năng.",
    milestones: [
      { count: 2, effect: "Grants 10% lifesteal to all allied units and its skill" },
      { count: 4, effect: "Grants 30% lifesteal to all allied units and its skill" },
      { count: 6, effect: "Grants 60% lifesteal to all allied units and its skill" }
    ]
  },
  {
    id: "warrior",
    name: "Warrior",
    icon: "⚔️",
    iconUrl: "/traits/warrior.png",
    description: "Tăng lượng giáp vật lý cực lớn.",
    milestones: [
      { count: 3, effect: "All allied warrior armor +5" },
      { count: 6, effect: "All allied warrior armor +12" },
      { count: 9, effect: "All allied warrior armor +18. When receiving physical or magical damage, reflects pure damage equals to the value of the recipient's Armor" }
    ]
  },
  {
    id: "witcher",
    name: "Witcher",
    icon: "👁️",
    iconUrl: "/traits/witcher.png",
    description: "Kháng lại hiệu ứng của tộc Demon kẻ địch hoặc kích hoạt Demon phe mình.",
    milestones: [
      { count: 1, effect: "If there's any Demon pieces on the enemy Chessboard, the Demon types will be increased by 1." },
      { count: 2, effect: "All allied demons deem to be one，The enemy demon effect is invalid" }
    ]
  },
  {
    id: "wizard",
    name: "Wizard",
    icon: "🔥",
    iconUrl: "/traits/wizard.png",
    description: "Wizard tăng sát thương phép và khả năng cast liên tục.",
    milestones: [
      { count: 2, effect: "Required Pieces -1 for Synergies of Race/Class that requires 4 and above Pieces" },
      { count: 4, effect: "1 less chess piece is required for activating synergy with at least 4 unique chess pieces; if there's only the synergy of one race/class is activated other than the Wizard synergy, then the highest tier of this synergy will be activated immediately" }
    ]
  }
];
const hawk = { "dragonestId": "101855090d47", "chessTitle": "Falcon", "rarity": "Common", "description": "Hawk — Falcon", "iconUrl": "/heroes/hawk/icon.png", "portraitUrl": "/heroes/hawk/portrait.png", "imageUrl": "/heroes/hawk/icon.png", "skill": { "name": "Eagle Eye", "type": "Active", "desc": "Whenever an ally casts an active ability, Falcon instantly fires Arcane Missiles at enemies, dealing magical damage.  Ability Type: Active  Target: Single  Impact: Enemy  Damage Type: Magical Damage  Magical Damage: 150  CD: 2 ", "descByStar": ["Whenever an ally casts an active ability, Falcon instantly fires Arcane Missiles at enemies, dealing magical damage.  Ability Type: Active  Target: Single  Impact: Enemy  Damage Type: Magical Damage  Magical Damage: 150  CD: 2 ", "Whenever an ally casts an active ability, Falcon instantly fires Arcane Missiles at enemies, dealing magical damage.  Ability Type: Active  Target: Single  Impact: Enemy  Damage Type: Magical Damage  Magical Damage:  250  CD: 2 ", "Whenever an ally casts an active ability, Falcon instantly fires Arcane Missiles at enemies, dealing magical damage.  Ability Type: Active  Target: Single  Impact: Enemy  Damage Type: Magical Damage  Magical Damage: 350  CD: 2 "], "iconUrl": "/heroes/hawk/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [50, 100, 200], "armor": 1, "mr": 10, "atkSpeed": 1.5, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/hawk/portrait.png", "isDefault": true }] };
const unknown_horror = { "dragonestId": "100baa36cabb", "chessTitle": "？？？", "rarity": "Common", "description": "Unknown Horror — ？？？", "iconUrl": "/heroes/unknown_horror/icon.png", "portraitUrl": "/heroes/unknown_horror/portrait.png", "imageUrl": "/heroes/unknown_horror/icon.png", "skill": { "name": "Endless Terror", "type": "Active", "desc": " Grabs a random enemy piece, immobilizing it and dealing continuous pure damage.", "descByStar": [" Grabs a random enemy piece, immobilizing it and dealing continuous pure damage.", " Grabs a random enemy piece, immobilizing it and dealing continuous pure damage.", " Grabs a random enemy piece, immobilizing it and dealing continuous pure damage."], "iconUrl": "/heroes/unknown_horror/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [45, 90, 180], "armor": 3, "mr": 10, "atkSpeed": 1.5, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/unknown_horror/portrait.png", "isDefault": true }] };
const goddess_of_war = { "dragonestId": "1971fc43d24", "chessTitle": "Valkyrie", "rarity": "Rare", "description": "Goddess of War — Valkyrie", "iconUrl": "/heroes/goddess_of_war/icon.png", "portraitUrl": "/heroes/goddess_of_war/portrait.png", "imageUrl": "/heroes/goddess_of_war/icon.png", "skill": { "name": "Shining Combo", "type": "Active", "desc": "Ability: [Shining Combo] Rapidly swings a warhammer, dealing physical damage with base attacks to surrounding enemies. The final strike slams the hammer into the ground, dealing additional damage and stunning enemies. Swing/Slam Extra DMG: 15/30/45 Stun Duration: 0.5/0.5/1 Swing Range: 160 Slam Range: 160/160/234 CD: 10/8/6", "descByStar": ["Ability: [Shining Combo] Rapidly swings a warhammer, dealing physical damage with base attacks to surrounding enemies. The final strike slams the hammer into the ground, dealing additional damage and stunning enemies. Swing/Slam Extra DMG: 15/30/45 Stun Duration: 0.5/0.5/1 Swing Range: 160 Slam Range: 160/160/234 CD: 10/8/6", "Ability: [Shining Combo] Rapidly swings a warhammer, dealing physical damage with base attacks to surrounding enemies. The final strike slams the hammer into the ground, dealing additional damage and stunning enemies. Swing/Slam Extra DMG: 15/30/45 Stun Duration: 0.5/0.5/1 Swing Range: 160 Slam Range: 160/160/234 CD: 10/8/6", "Ability: [Shining Combo] Rapidly swings a warhammer, dealing physical damage with base attacks to surrounding enemies. The final strike slams the hammer into the ground, dealing additional damage and stunning enemies. Swing/Slam Extra DMG: 15/30/45 Stun Duration: 0.5/0.5/1 Swing Range: 160 Slam Range: 160/160/234 CD: 10/8/6"], "iconUrl": "/heroes/goddess_of_war/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [90, 180, 360], "armor": 7, "mr": 0, "atkSpeed": 1.6, "range": 1.6 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/goddess_of_war/portrait.png", "isDefault": true }] };
const mist_phantom_king = { "dragonestId": "fdb57ef3521", "chessTitle": "Wuril", "rarity": "Rare", "description": "Mist Phantom King — Wuril", "iconUrl": "/heroes/mist_phantom_king/icon.png", "portraitUrl": "/heroes/mist_phantom_king/portrait.png", "imageUrl": "/heroes/mist_phantom_king/icon.png", "skill": { "name": "Smoke Trick", "type": "Active", "desc": "Instantly deploys a smoke grenade. If there are enemy pieces nearby, the grenade will be deployed at the location of Wuril; otherwise, it will be deployed at the symmetric point on the board from Wuril's position. Enemies within the smoke grenade will be silenced and blinded (with a chance of missing attacks).", "descByStar": ["Instantly deploys a smoke grenade. If there are enemy pieces nearby, the grenade will be deployed at the location of Wuril; otherwise, it will be deployed at the symmetric point on the board from Wuril's position. Enemies within the smoke grenade will be silenced and blinded (with a chance of missing attacks).", "Instantly deploys a smoke grenade. If there are enemy pieces nearby, the grenade will be deployed at the location of Wuril; otherwise, it will be deployed at the symmetric point on the board from Wuril's position. Enemies within the smoke grenade will be silenced and blinded (with a chance of missing attacks).", "Instantly deploys a smoke grenade. If there are enemy pieces nearby, the grenade will be deployed at the location of Wuril; otherwise, it will be deployed at the symmetric point on the board from Wuril's position. Enemies within the smoke grenade will be silenced and blinded (with a chance of missing attacks)."], "iconUrl": "/heroes/mist_phantom_king/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [70, 140, 280], "armor": 5, "atkSpeed": 0, "range": 1.6 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/mist_phantom_king/portrait.png", "isDefault": true }] };
const resentful_murk = { "dragonestId": "f0fc5fccbac", "chessTitle": "Xiao", "rarity": "Common", "description": "Resentful Murk — Xiao", "lore": "Stay Tuned.", "iconUrl": "/heroes/resentful_murk/icon.png", "portraitUrl": "/heroes/resentful_murk/portrait.png", "imageUrl": "/heroes/resentful_murk/icon.png", "skill": { "name": "Apparition", "type": "Active", "desc": "Take the mirror point symmetrical to the center of the chessboard as a reference, and target the enemy unit closest to that mirror point, swapping positions with the target, dealing 100 magical damage, and stunning it for 2 seconds. Ally normal attacks give priority to the target for 2 seconds. Pierces ability immunity.", "descByStar": ["Take the mirror point symmetrical to the center of the chessboard as a reference, and target the enemy unit closest to that mirror point, swapping positions with the target, dealing 100 magical damage, and stunning it for 2 seconds. Ally normal attacks give priority to the target for 2 seconds. Pierces ability immunity.", "Take the mirror point symmetrical to the center of the chessboard as a reference, and target the enemy unit closest to that mirror point, swapping positions with the target, dealing 200 magical damage, and stunning it for 2.5 seconds. Ally normal attacks give priority to the target for 3 seconds. Pierces ability immunity.", "Take the mirror point symmetrical to the center of the chessboard as a reference, and target the enemy unit closest to that mirror point, swapping positions with the target, dealing 250 magical damage, and stunning it for 3 seconds. Ally normal attacks give priority to the target for 4 seconds. Pierces ability immunity."], "iconUrl": "/heroes/resentful_murk/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [60, 120, 240], "armor": 2, "mr": 0, "atkSpeed": 1.3, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/resentful_murk/portrait.png", "isDefault": true }] };
const unicorn = { "dragonestId": "16eaba5e231", "chessTitle": "Unicorn", "rarity": "Common", "description": "Unicorn — Unicorn", "lore": "Stay tuned", "iconUrl": "/heroes/unicorn/icon.png", "portraitUrl": "/heroes/unicorn/portrait.png", "imageUrl": "/heroes/unicorn/icon.png", "skill": { "name": "Cure", "type": "Active", "desc": "Passive: When Unicorn receives base attacks, reduces the attacker's ATK Speed by 5% for 5 seconds. Active: Heals 25 HP every 1.5 seconds to 3 random allies within 3 grids, lasting for 11 seconds.", "descByStar": ["Passive: When Unicorn receives base attacks, reduces the attacker's ATK Speed by 5% for 5 seconds. Active: Heals 25 HP every 1.5 seconds to 3 random allies within 3 grids, lasting for 11 seconds.", "Passive: When Unicorn receives base attacks, reduces the attacker's ATK Speed by 15% for 5 seconds. Active: Heals 25 HP every 1.5 seconds to 5 random allies within 3 grids, lasting for 11 seconds.", "Passive: When Unicorn receives base attacks, reduces the attacker's ATK Speed by 25% for 5 seconds. Active: Heals 25 HP every 1.5 seconds to 7 random allies within 3 grids, lasting for 11 seconds."], "iconUrl": "/heroes/unicorn/skill.png" }, "stats": { "hp": [400, 800, 1600], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/unicorn/portrait.png", "isDefault": true }, { "id": "winter-sweetie", "name": "Winter Sweetie", "imageUrl": "/heroes/unicorn/skins/winter-sweetie.png", "isDefault": false }] };
const ogre_mage = { "dragonestId": "e52b47ab944", "chessTitle": "Hum&Huh", "rarity": "Common", "description": "Ogre Mage — Hum&Huh", "lore": "Stay tuned", "iconUrl": "/heroes/ogre_mage/icon.png", "portraitUrl": "/heroes/ogre_mage/portrait.png", "imageUrl": "/heroes/ogre_mage/icon.png", "skill": { "name": "Irritate", "type": "Active", "desc": "Buffs a random Ally for 30 seconds, giving the target ally 30% chances to restore 100 Mana and resets their Ability after casting", "descByStar": ["Buffs a random Ally for 30 seconds, giving the target ally 30% chances to restore 100 Mana and resets their Ability after casting", "Buffs a random Ally for 30 seconds, giving the target ally 40% chances to restore 100 Mana and resets their Ability after casting", "Buffs a random Ally for 30 seconds, giving the target ally 50% chances to restore 100 Mana and resets their Ability after casting"], "iconUrl": "/heroes/ogre_mage/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [60, 120, 240], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/ogre_mage/portrait.png", "isDefault": true }, { "id": "xu-chu", "name": "Xu Chu", "imageUrl": "/heroes/ogre_mage/skins/xu-chu.png", "isDefault": false }] };
const sky_breaker = { "dragonestId": "e52b47ac658", "chessTitle": "BT.011", "rarity": "Common", "description": "Sky Breaker — BT.011", "lore": "Stay tuned", "iconUrl": "/heroes/sky_breaker/icon.png", "portraitUrl": "/heroes/sky_breaker/portrait.png", "imageUrl": "/heroes/sky_breaker/icon.png", "skill": { "name": "Battery Assault", "type": "Active", "desc": "Discharges magical damages at random nearby enemy chess pieces within 2 grids, dealing 50 magical damages and stunning for 0.1 seconds every 0.7 seconds up to 5 seconds.", "descByStar": ["Discharges magical damages at random nearby enemy chess pieces within 2 grids, dealing 50 magical damages and stunning for 0.1 seconds every 0.7 seconds up to 5 seconds.", "Discharges magical damages at random nearby enemy chess pieces within 2 grids, dealing 75 damages and stunning for 0.1 seconds every 0.7 seconds up to 5 seconds.", "Discharges magical damages at random nearby enemy chess pieces within 2 grids, dealing 100 magical damages and stunning for 0.1 seconds every 0.7 seconds up to 5 seconds."], "iconUrl": "/heroes/sky_breaker/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [45, 90, 180], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/sky_breaker/portrait.png", "isDefault": true }, { "id": "mega-2049", "name": "Mega 2049", "imageUrl": "/heroes/sky_breaker/skins/mega-2049.png", "isDefault": false }] };
const redaxe_chief = { "dragonestId": "e52b47ac681", "chessTitle": "Axe·Redaxe", "rarity": "Common", "description": "Redaxe Chief — Axe·Redaxe", "lore": "Stay tuned", "iconUrl": "/heroes/redaxe_chief/icon.png", "portraitUrl": "/heroes/redaxe_chief/portrait.png", "imageUrl": "/heroes/redaxe_chief/icon.png", "skill": { "name": "Taunts", "type": "Active", "desc": "Taunts enemies within 1 grids, forcing them to attack himself in 2.5 seconds, while he gains 10 bonus armor", "descByStar": ["Taunts enemies within 1 grids, forcing them to attack himself in 2.5 seconds, while he gains 10 bonus armor", "Taunts enemies within 1 grids, forcing them to attack himself in 3.5 seconds, while he gains 15 bonus armor", "Taunts enemies within 1 grids, forcing them to attack himself in 4.5 seconds, while he gains 20 bonus armor"], "iconUrl": "/heroes/redaxe_chief/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [52.5, 105, 210], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/redaxe_chief/portrait.png", "isDefault": true }, { "id": "long-vacation", "name": "Long Vacation", "imageUrl": "/heroes/redaxe_chief/skins/long-vacation.png", "isDefault": false }] };
const tusk_champion = { "dragonestId": "e52b47ac74b", "chessTitle": "Lord of Tundra", "rarity": "Common", "description": "Tusk Champion — Lord of Tundra", "lore": "Stay tuned", "iconUrl": "/heroes/tusk_champion/icon.png", "portraitUrl": "/heroes/tusk_champion/portrait.png", "imageUrl": "/heroes/tusk_champion/icon.png", "skill": { "name": "Arctic Punch", "type": "Active", "desc": "Next normal attack launches its target into air for 1 seconds and deals 3 times damages", "descByStar": ["Next normal attack launches its target into air for 1 seconds and deals 3 times damages", "Next normal attack launches its target into air for 1 seconds and deals 3.5 times damages", "Next normal attack launches its target into air for 1 seconds and deals 4 times damages"], "iconUrl": "/heroes/tusk_champion/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [52.5, 105, 210], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/tusk_champion/portrait.png", "isDefault": true }, { "id": "cowhand-lord-of-tundra", "name": "Cowhand Lord of Tundra", "imageUrl": "/heroes/tusk_champion/skins/cowhand-lord-of-tundra.png", "isDefault": false }] };
const taboo_witcher = { "dragonestId": "e52b47acaf2", "chessTitle": "Dee", "rarity": "Common", "description": "Taboo Witcher — Dee", "lore": "Stay tuned", "iconUrl": "/heroes/taboo_witcher/icon.png", "portraitUrl": "/heroes/taboo_witcher/portrait.png", "imageUrl": "/heroes/taboo_witcher/icon.png", "skill": { "name": "Soul Break", "type": "Active", "desc": "Burns an opponent's 30 magic on each attack, dealing 60% of magic burnt bonus physical damages to the target", "descByStar": ["Burns an opponent's 30 magic on each attack, dealing 60% of magic burnt bonus physical damages to the target", "Burns an opponent's 60 magic on each attack, dealing 60% of magic burnt bonus physical damages to the target", "Burns an opponent's 90 magic on each attack, dealing 60% of magic burnt bonus physical damages to the target"], "iconUrl": "/heroes/taboo_witcher/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [50, 100, 200], "armor": 5, "mr": 10, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/taboo_witcher/portrait.png", "isDefault": true }] };
const defector = { "dragonestId": "e52b47ad218", "chessTitle": "Shamen'du", "rarity": "Common", "description": "Defector — Shamen'du", "lore": "Stay tuned", "iconUrl": "/heroes/defector/icon.png", "portraitUrl": "/heroes/defector/portrait.png", "imageUrl": "/heroes/defector/icon.png", "skill": { "name": "Hex", "type": "Active", "desc": "Transforms an enemy piece into a harmless penguin, disabling their attacks and abilities in 4 seconds.", "descByStar": ["Transforms an enemy piece into a harmless penguin, disabling their attacks and abilities in 4 seconds.", "Transforms an enemy piece into a harmless penguin, disabling their attacks and abilities in 6 seconds.", "Transforms an enemy piece into a harmless penguin, disabling their attacks and abilities in 8 seconds."], "iconUrl": "/heroes/defector/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [45, 90, 180], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/defector/portrait.png", "isDefault": true }] };
const frost_knight = { "dragonestId": "e52b47ad240", "chessTitle": "Bat'du", "rarity": "Common", "description": "Frost Knight — Bat'du", "lore": "Stay tuned", "iconUrl": "/heroes/frost_knight/icon.png", "portraitUrl": "/heroes/frost_knight/portrait.png", "imageUrl": "/heroes/frost_knight/icon.png", "skill": { "name": "Snowbomb Blast", "type": "Active", "desc": "Slow enemy units of 2-grid radius 1 seconds of their movement and taking bonus 50 magical damagess every time Frost Knight attacks. Get to at most 4 stacks and last 20 seconds", "descByStar": ["Slow enemy units of 2-grid radius 1 seconds of their movement and taking bonus 50 magical damagess every time Frost Knight attacks. Get to at most 4 stacks and last 20 seconds", "Slow enemy units of 2-grid radius 1 seconds of their movement and taking bonus 75 magical damagess every time Frost Knight attacks. Get to at most 6 stacks and last 20 seconds", "Slow enemy units of 2-grid radius 1 seconds of their movement and taking bonus 100 magical damagess every time Frost Knight attacks. Get to at most 10 stacks and last 20 seconds"], "iconUrl": "/heroes/frost_knight/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [47.5, 95, 190], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/frost_knight/portrait.png", "isDefault": true }, { "id": "merchant-bat-du", "name": "Merchant Bat'du", "imageUrl": "/heroes/frost_knight/skins/merchant-bat-du.png", "isDefault": false }] };
const the_source = { "dragonestId": "e52b47ad454", "chessTitle": "Icey Deer", "rarity": "Common", "description": "The Source — Icey Deer", "lore": "Stay tuned", "iconUrl": "/heroes/the_source/icon.png", "portraitUrl": "/heroes/the_source/portrait.png", "imageUrl": "/heroes/the_source/icon.png", "skill": { "name": "Awaken", "type": "Active", "desc": "Grants 10 magic regeneration for all allied chess pieces in every 2 seconds", "descByStar": ["Grants 10 magic regeneration for all allied chess pieces in every 2 seconds", "Grants 15 magic regeneration for all allied chess pieces in every 2 seconds", "Grants 20 magic regeneration for all allied chess pieces in every 2 seconds"], "iconUrl": "/heroes/the_source/skill.png" }, "stats": { "hp": [450, 900, 1800], "atk": [42.5, 85, 170], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/the_source/portrait.png", "isDefault": true }, { "id": "candy-mage", "name": "Candy Mage", "imageUrl": "/heroes/the_source/skins/candy-mage.png", "isDefault": false }] };
const egersis_ranger = { "dragonestId": "e52b47ad599", "chessTitle": "So", "rarity": "Common", "description": "Egersis Ranger — So", "lore": "Stay tuned", "iconUrl": "/heroes/egersis_ranger/icon.png", "portraitUrl": "/heroes/egersis_ranger/portrait.png", "imageUrl": "/heroes/egersis_ranger/icon.png", "skill": { "name": "Marksmanship", "type": "Active", "desc": "Increases 25% attack speed and 25% ATK for itself.", "descByStar": ["Increases 25% attack speed and 25% ATK for itself.", "Increases 35% attack speed and 35% ATK for itself.", "Increases 45% attack speed and 45% ATK for itself."], "iconUrl": "/heroes/egersis_ranger/skill.png" }, "stats": { "hp": [450, 900, 1800], "atk": [45, 90, 180], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/egersis_ranger/portrait.png", "isDefault": true }, { "id": "love-seeker", "name": "Love Seeker", "imageUrl": "/heroes/egersis_ranger/skins/love-seeker.png", "isDefault": false }] };
const stone_spirit = { "dragonestId": "e52b47ad730", "chessTitle": "Stein", "rarity": "Common", "description": "Stone Spirit — Stein", "lore": "Stay tuned", "iconUrl": "/heroes/stone_spirit/icon.png", "portraitUrl": "/heroes/stone_spirit/portrait.png", "imageUrl": "/heroes/stone_spirit/icon.png", "skill": { "name": "Toss", "type": "Active", "desc": "Grab a nearby enemy within 1 grids, and lunches it at the farthest grid, to deal 100 physical damages and stun for 1.5 seconds", "descByStar": ["Grab a nearby enemy within 1 grids, and lunches it at the farthest grid, to deal 100 physical damages and stun for 1.5 seconds", "Grab a nearby enemy within 1 grids, and lunches it at the farthest grid, to deal 200 physical damages and stun for 2 seconds", "Grab a nearby enemy within 1 grids, and lunches it at the farthest grid, to deal 300 physical damages and stun for 2.5 seconds"], "iconUrl": "/heroes/stone_spirit/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [80, 160, 320], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/stone_spirit/portrait.png", "isDefault": true }] };
const heaven_bomber = { "dragonestId": "e52b47ad780", "chessTitle": "Golby Dwarf", "rarity": "Common", "description": "Heaven Bomber — Golby Dwarf", "lore": "Stay tuned", "iconUrl": "/heroes/heaven_bomber/icon.png", "portraitUrl": "/heroes/heaven_bomber/portrait.png", "imageUrl": "/heroes/heaven_bomber/icon.png", "skill": { "name": "Tracing Missile", "type": "Active", "desc": "Launches 3 rockets to strike random enemy chess pieces, each missile deals 150 magical damage to a random enemy unit", "descByStar": ["Launches 3 rockets to strike random enemy chess pieces, each missile deals 150 magical damage to a random enemy unit", "Launches 3 rockets to strike random enemy chess pieces, each missile deals 250 magical damage to a random enemy unit", "Launches 3 rockets to strike random enemy chess pieces, each missile deals 450 magical damage to a random enemy unit"], "iconUrl": "/heroes/heaven_bomber/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [45, 90, 180], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/heaven_bomber/portrait.png", "isDefault": true }, { "id": "ultra-2049", "name": "Ultra 2049", "imageUrl": "/heroes/heaven_bomber/skins/ultra-2049.png", "isDefault": false }] };
const soul_breaker = { "dragonestId": "e52b47ad7a7", "chessTitle": "Golby Sword", "rarity": "Common", "description": "Soul Breaker — Golby Sword", "lore": "Stay tuned", "iconUrl": "/heroes/soul_breaker/icon.png", "portraitUrl": "/heroes/soul_breaker/portrait.png", "imageUrl": "/heroes/soul_breaker/icon.png", "skill": { "name": "Paralysis Shuriken", "type": "Active", "desc": "Hurls a shuriken at a random enemy unit, dealing 300 magical damages and stunning for 0.1 seconds.", "descByStar": ["Hurls a shuriken at a random enemy unit, dealing 300 magical damages and stunning for 0.1 seconds.", "Hurls a shuriken at a random enemy unit, dealing 500 magical damages and stunning for 0.1 seconds.", "Hurls a shuriken at a random enemy unit, dealing 700 magical damages and stunning for 0.1  seconds."], "iconUrl": "/heroes/soul_breaker/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [60, 120, 240], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/soul_breaker/portrait.png", "isDefault": true }, { "id": "sword-2049", "name": "Sword 2049", "imageUrl": "/heroes/soul_breaker/skins/sword-2049.png", "isDefault": false }, { "id": "sword-2077", "name": "Sword 2077", "imageUrl": "/heroes/soul_breaker/skins/sword-2077.png", "isDefault": false }] };
const god_of_war = { "dragonestId": "e52b47aec6b", "chessTitle": "Ares", "rarity": "Rare", "description": "God of War — Ares", "lore": "Stay tuned", "iconUrl": "/heroes/god_of_war/icon.png", "portraitUrl": "/heroes/god_of_war/portrait.png", "imageUrl": "/heroes/god_of_war/icon.png", "skill": { "name": "Shield Crash", "type": "Active", "desc": "Reduces Physical Damage by 30% upon receiving attack from the front, and by 15% from the side. Meanwhile, deals 300 Physical Damage to enemies within 3 grids ahead every 8 seconds.Also knocks back enemies within range for 1 grid.", "descByStar": ["Reduces Physical Damage by 30% upon receiving attack from the front, and by 15% from the side. Meanwhile, deals 300 Physical Damage to enemies within 3 grids ahead every 8 seconds.Also knocks back enemies within range for 1 grid.", "Reduces Physical Damage by 45% upon receiving attack from the front, and by 22% from the side. Meanwhile, deals 400 Physical Damage to enemies within 3 grids ahead every 8 seconds. Also knocks back enemies within range for 1 grid.", "Reduces Physical Damage by 60% upon receiving attack from the front, and by 30% from the side. Meanwhile, deals 500 Physical Damage to enemies within 3 grids ahead every 8 seconds. Also knocks back enemies within range for 1 grid."], "iconUrl": "/heroes/god_of_war/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [0, 0, 0], "armor": 6, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/god_of_war/portrait.png", "isDefault": true }, { "id": "ares-paradise", "name": "Ares Paradise", "imageUrl": "/heroes/god_of_war/skins/ares-paradise.png", "isDefault": false }, { "id": "ares-order", "name": "Ares Order", "imageUrl": "/heroes/god_of_war/skins/ares-order.png", "isDefault": false }] };
const winter_chiropteran = { "dragonestId": "e52b47b0144", "chessTitle": "Frosgon", "rarity": "Common", "description": "Winter Chiropteran — Frosgon", "lore": "Stay tuned", "iconUrl": "/heroes/winter_chiropteran/icon.png", "portraitUrl": "/heroes/winter_chiropteran/portrait.png", "imageUrl": "/heroes/winter_chiropteran/icon.png", "skill": { "name": "Cool Healing", "type": "Active", "desc": "Freezes an ally with HP that is lower than 50%, protecting them from losing HP and recovers their HP by 20+ 10%*HP for 2 seconds", "descByStar": ["Freezes an ally with HP that is lower than 50%, protecting them from losing HP and recovers their HP by 20+ 10%*HP for 2 seconds", "Freezes an ally with HP that is lower than 50%, protecting them from losing HP and recovers their HP by 20+ 10%*HP for 3 seconds", "Freezes an ally with HP that is lower than 50%, protecting them from losing HP and recovers their HP by 20+ 10%*HP for 4 seconds"], "iconUrl": "/heroes/winter_chiropteran/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [47.5, 95, 190], "armor": 0, "mr": 10, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/winter_chiropteran/portrait.png", "isDefault": true }, { "id": "winter-chiropteran-red", "name": "Winter Chiropteran [Red]", "imageUrl": "/heroes/winter_chiropteran/skins/winter-chiropteran-red.png", "isDefault": false }] };
const soul_devourer = { "dragonestId": "174432540cf", "chessTitle": "Murmur", "rarity": "Rare", "description": "Soul Devourer — Murmur", "lore": "In retrospect, it was he who summoned a great number of spirits in the graveyard and wanted to conduct thorough research on them.\nHowever, it was unfortunate that something went wrong and his soul was caught by the magic circle.\nDrifting in the vast sea of souls, no other soul except him was able to stay sober and sane.\nHe once tried to rouse them from chaos and then dug into their memories, but all these were in vain. An everlasting fierce howl echoed to his ears and time became pointless.\nOn the brink of collapse, the initial issue popped into his mind - where's the root, where's the destiny?\nHe made up his mind eventually by deciding to shake off the chains and being free.\nA whirlpool appeared in the sea of souls. At the eye of the whirlpool was him, who was absorbing the energy of souls.\nHis body had become a statue after 42 years passed, but today after absorbing the whole energy of the sea, he was finally reborn.\nRebirth and the powerful strength of souls within his body made him unstable and emotional. He started forgetting everything including his original intention and was unable to use the power.\nIt’s time to embark on the journey to find himself!", "iconUrl": "/heroes/soul_devourer/icon.png", "portraitUrl": "/heroes/soul_devourer/portrait.png", "imageUrl": "/heroes/soul_devourer/icon.png", "skill": { "name": "Turning Tables", "type": "Active", "desc": "Drains 15 mana from an enemy piece every second for 4 seconds. Then, transfers all his mana to 1 random allied piece, reducing their CD time by 2 second if their ability is on cooldown.", "descByStar": ["Drains 15 mana from an enemy piece every second for 4 seconds. Then, transfers all his mana to 1 random allied piece, reducing their CD time by 2 second if their ability is on cooldown.", "Drains 25 mana from an enemy piece every second for 3 seconds. Then, transfers all his mana to 2 random allied pieces, reducing their CD time by 4 second if their ability is on cooldown.", "Drains 45 mana from an enemy piece every second for 2 seconds. Then, transfers all his mana to 3 random allied piece, reducing their CD time by 6 second if their ability is on cooldown."], "iconUrl": "/heroes/soul_devourer/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [50, 100, 200], "armor": 5, "mr": 0, "atkSpeed": 1.7, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/soul_devourer/portrait.png", "isDefault": true }, { "id": "soul-devourer-green", "name": "Soul Devourer[Green]", "imageUrl": "/heroes/soul_devourer/skins/soul-devourer-green.png", "isDefault": false }] };
const goddess_of_light = { "dragonestId": "e714b66f227", "chessTitle": "Dawnstar", "description": "Goddess of Light — Dawnstar", "lore": "Stay tuned!", "iconUrl": "/heroes/goddess_of_light/icon.png", "portraitUrl": "/heroes/goddess_of_light/portrait.png", "imageUrl": "/heroes/goddess_of_light/icon.png", "skill": { "name": "Spiritbind", "type": "Active", "desc": "Imprisons 1 enemy pieces for 5 seconds, disarms them and reduces their Magic Resistance by 20%, but the pieces imprisoned will be immune to Physical Damage.", "descByStar": ["Imprisons 1 enemy pieces for 5 seconds, disarms them and reduces their Magic Resistance by 20%, but the pieces imprisoned will be immune to Physical Damage.", "Imprisons 2 enemies pieces for 5 seconds, disarms them and reduces their Magic Resistance by 30%, but the pieces imprisoned will be immune to Physical Damage.", "Imprisons 4 enemies pieces for 5 seconds, disarms them and reduces their Magic Resistance by 50%, but the pieces imprisoned will be immune to Physical Damage."], "iconUrl": "/heroes/goddess_of_light/skill.png" }, "stats": { "hp": [400, 800, 1600], "atk": [52.5, 105, 210], "armor": 0, "mr": 10, "atkSpeed": 1.3, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/goddess_of_light/portrait.png", "isDefault": true }, { "id": "one-year-dawnstar", "name": "One Year Dawnstar", "imageUrl": "/heroes/goddess_of_light/skins/one-year-dawnstar.png", "isDefault": false }] };
const light_blade = { "dragonestId": "16eaba5e1a3", "chessTitle": "Yn", "description": "Light Blade — Yn", "lore": "Stay tuned", "iconUrl": "/heroes/light_blade/icon.png", "portraitUrl": "/heroes/light_blade/portrait.png", "imageUrl": "/heroes/light_blade/icon.png", "skill": { "name": "Moon Glaives", "type": "Active", "desc": "Attacks bounce between enemy pieces for at most 3 times, reducing 30% damages for every time it bounces", "descByStar": ["Attacks bounce between enemy pieces for at most 3 times, reducing 30% damages for every time it bounces", "Attacks bounce between enemy pieces for at most 6 times, reducing 30% damages for every time it bounces", "Attacks bounce between enemy pieces for at most 9 times, reducing 30% damages for every time it bounces"], "iconUrl": "/heroes/light_blade/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/light_blade/portrait.png", "isDefault": true }] };
const wisper_seer = { "dragonestId": "16eaba5e1af", "chessTitle": "Bn", "description": "Wisper Seer — Bn", "lore": "Stay tuned", "iconUrl": "/heroes/wisper_seer/icon.png", "portraitUrl": "/heroes/wisper_seer/portrait.png", "imageUrl": "/heroes/wisper_seer/icon.png", "skill": { "name": "Nature's Call", "type": "Active", "desc": "Summons 1 Treant to random grids on the edge of the chessboard to assist in battle.", "descByStar": ["Summons 1 Treant to random grids on the edge of the chessboard to assist in battle.", "Summons 2 strong Treants to random grids on the edge of the chessboard to assist in battle.", "Summons 2 powerful Treants to random grids on the edge of the chessboard to assist in battle."], "iconUrl": "/heroes/wisper_seer/skill.png" }, "stats": { "hp": [500, 1e3, 1900], "atk": [47.5, 95, 190], "armor": 2, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/wisper_seer/portrait.png", "isDefault": true }, { "id": "snowland-gentleman", "name": "Snowland Gentleman", "imageUrl": "/heroes/wisper_seer/skins/snowland-gentleman.png", "isDefault": false }] };
const venom = { "dragonestId": "e52b47aca4f", "chessTitle": "Posoragon", "rarity": "Rare", "description": "Venom — Posoragon", "lore": "Stay tuned", "iconUrl": "/heroes/venom/icon.png", "portraitUrl": "/heroes/venom/portrait.png", "imageUrl": "/heroes/venom/icon.png", "skill": { "name": "Viper Strike", "type": "Active", "desc": "Slows the targeted enemy unit's 40% attack speed and deals 150 magical damages per second in 5 seconds", "descByStar": ["Slows the targeted enemy unit's 40% attack speed and deals 150 magical damages per second in 5 seconds", "Slows the targeted enemy unit's 60% attack speed and deals 250 magical damages per second in 5seconds", "Slows the targeted enemy unit's 80% attack speed and deals 350 magical damages per second in 5 seconds"], "iconUrl": "/heroes/venom/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [55, 110, 220], "armor": 5, "mr": 20, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/venom/portrait.png", "isDefault": true }, { "id": "venom-red", "name": "Venom [Red]", "imageUrl": "/heroes/venom/skins/venom-red.png", "isDefault": false }] };
const dwarf_sniper = { "dragonestId": "e52b47aca9f", "chessTitle": "Musket Kar Bronskin", "description": "Dwarf Sniper — Musket Kar Bronskin", "lore": "Stay tuned", "iconUrl": "/heroes/dwarf_sniper/icon.png", "portraitUrl": "/heroes/dwarf_sniper/portrait.png", "imageUrl": "/heroes/dwarf_sniper/icon.png", "skill": { "name": "Headshot", "type": "Active", "desc": "Locks onto an target piece and, after 0.5 seconds of aiming, fire a shot that deals 400 magical damages to target.", "descByStar": ["Locks onto an target piece and, after 0.5 seconds of aiming, fire a shot that deals 400 magical damages to target.", "Locks onto an target piece and, after 0.5 seconds of aiming, fire a shot that deals 600 magical damages to target.", "Locks onto an target piece and, after 0.5 seconds of aiming, fire a shot that deals 800 magical damages to target."], "iconUrl": "/heroes/dwarf_sniper/skill.png" }, "stats": { "hp": [450, 900, 1800], "atk": [70, 140, 280], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/dwarf_sniper/portrait.png", "isDefault": true }, { "id": "one-year-musket", "name": "One Year Musket", "imageUrl": "/heroes/dwarf_sniper/skins/one-year-musket.png", "isDefault": false }, { "id": "red-beard-musket", "name": "Red Beard Musket", "imageUrl": "/heroes/dwarf_sniper/skins/red-beard-musket.png", "isDefault": false }] };
const desperate_doctor = { "dragonestId": "e52b47ad291", "chessTitle": "Voo'du", "description": "Desperate Doctor — Voo'du", "lore": "Stay tuned", "iconUrl": "/heroes/desperate_doctor/icon.png", "portraitUrl": "/heroes/desperate_doctor/portrait.png", "imageUrl": "/heroes/desperate_doctor/icon.png", "skill": { "name": "Ricocheting Cask", "type": "Active", "desc": "Launches a cask of paralyzing powder that ricochets between enemy chess pieces up to 4 times, dealing 60 damages and stunning those it hits for 1 seconds", "descByStar": ["Launches a cask of paralyzing powder that ricochets between enemy chess pieces up to 4 times, dealing 60 damages and stunning those it hits for 1 seconds", "Launches a cask of paralyzing powder that ricochets between enemy chess pieces up to 6 times, dealing 80 damages and stunning those it hits for 1 seconds", "Launches a cask of paralyzing powder that ricochets between enemy chess pieces up to 8 times, dealing 100 damages and stunning those it hits for 1 second"], "iconUrl": "/heroes/desperate_doctor/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [45, 90, 180], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/desperate_doctor/portrait.png", "isDefault": true }, { "id": "merchant-voo-du", "name": "Merchant Voo’du", "imageUrl": "/heroes/desperate_doctor/skins/merchant-voo-du.png", "isDefault": false }] };
const abyssal_guard = { "dragonestId": "e52b47ad2e9", "chessTitle": "Triton", "description": "Abyssal Guard — Triton", "lore": "Stay tuned", "iconUrl": "/heroes/abyssal_guard/icon.png", "portraitUrl": "/heroes/abyssal_guard/portrait.png", "imageUrl": "/heroes/abyssal_guard/icon.png", "skill": { "name": "Corrosion", "type": "Active", "desc": "Randomly reduces 15 armor to an enemy unit's for 20 seconds", "descByStar": ["Randomly reduces 15 armor to an enemy unit's for 20 seconds", "Randomly reduces 30 armor to an enemy unit's for 20 seconds", "Randomly reduces 45 armor to an enemy unit's for 20 seconds"], "iconUrl": "/heroes/abyssal_guard/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [85, 170, 340], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/abyssal_guard/portrait.png", "isDefault": true }, { "id": "abyssal-guard-blue", "name": "Abyssal Guard [Blue]", "imageUrl": "/heroes/abyssal_guard/skins/abyssal-guard-blue.png", "isDefault": false }, { "id": "one-year-triton", "name": "One Year Triton", "imageUrl": "/heroes/abyssal_guard/skins/one-year-triton.png", "isDefault": false }, { "id": "kraken-triton", "name": "Kraken Triton", "imageUrl": "/heroes/abyssal_guard/skins/kraken-triton.png", "isDefault": false }] };
const abyssalcrawler = { "dragonestId": "e52b47ad42b", "chessTitle": "Nana", "description": "Abyssalcrawler — Nana", "lore": "Stay tuned", "iconUrl": "/heroes/abyssalcrawler/icon.png", "portraitUrl": "/heroes/abyssalcrawler/portrait.png", "imageUrl": "/heroes/abyssalcrawler/icon.png", "skill": { "name": "Spiral Crawler", "type": "Active", "desc": "Every Base attack will steal 3% ATK Speed from the enemy. Can stack up to 20 times.", "descByStar": ["Every Base attack will steal 3% ATK Speed from the enemy. Can stack up to 20 times.", "Every Base attack will steal 5% ATK Speed from the enemy. Can stack up to 20 times.", "Every Base attack will steal 7% ATK Speed from the enemy. Can stack up to 20 times."], "iconUrl": "/heroes/abyssalcrawler/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/abyssalcrawler/portrait.png", "isDefault": true }, { "id": "abyssalcrawler-blue", "name": "Abyssalcrawler [Blue]", "imageUrl": "/heroes/abyssalcrawler/skins/abyssalcrawler-blue.png", "isDefault": false }, { "id": "kraken-nana", "name": "Kraken Nana", "imageUrl": "/heroes/abyssalcrawler/skins/kraken-nana.png", "isDefault": false }, { "id": "one-year-nana", "name": "One Year Nana", "imageUrl": "/heroes/abyssalcrawler/skins/one-year-nana.png", "isDefault": false }] };
const skull_hunter = { "dragonestId": "e52b47ad548", "chessTitle": "Eagles Skullcrusher", "description": "Skull Hunter — Eagles Skullcrusher", "lore": "Stay tuned", "iconUrl": "/heroes/skull_hunter/icon.png", "portraitUrl": "/heroes/skull_hunter/portrait.png", "imageUrl": "/heroes/skull_hunter/icon.png", "skill": { "name": "Porcupette", "type": "Active", "desc": "Summons a Porcupette, who deals physical damage with base attacks", "descByStar": ["Summons a Porcupette, who deals physical damage with base attacks", "Summons a Porcupette, who deals magic damage with base attacks", "Summons a Porcupette, who deals pure damage with base attacks and forces the enemies within 1 grid to attack itself for 5 seconds. CD: 30 seconds."], "iconUrl": "/heroes/skull_hunter/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [65, 130, 260], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/skull_hunter/portrait.png", "isDefault": true }] };
const swordman = { "dragonestId": "e52b47ad571", "chessTitle": "Gale Thornblade", "description": "Swordman — Gale Thornblade", "lore": "Stay tuned", "iconUrl": "/heroes/swordman/icon.png", "portraitUrl": "/heroes/swordman/portrait.png", "imageUrl": "/heroes/swordman/icon.png", "skill": { "name": "Blade Fury", "type": "Active", "desc": "Deals 75 magical damages per second to enemy units within 1 grids in 5 seconds", "descByStar": ["Deals 75 magical damages per second to enemy units within 1 grids in 5 seconds", "Deals 150 magical damages per second to enemy units within 1 grids in 5 seconds", "Deals 225 magical damages per second to enemy units within 1 grids in 5 seconds"], "iconUrl": "/heroes/swordman/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [67.5, 135, 270], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/swordman/portrait.png", "isDefault": true }, { "id": "angler", "name": "Angler", "imageUrl": "/heroes/swordman/skins/angler.png", "isDefault": false }] };
const hell_knight = { "dragonestId": "e52b47ad708", "chessTitle": "Beelzebub", "description": "Hell Knight — Beelzebub", "lore": "Stay tuned", "iconUrl": "/heroes/hell_knight/icon.png", "portraitUrl": "/heroes/hell_knight/portrait.png", "imageUrl": "/heroes/hell_knight/icon.png", "skill": { "name": "Helling Bolt", "type": "Active", "desc": "Deals 50 to 200 damagess and stuns a random enemy piece for 1 to 2 seconds", "descByStar": ["Deals 50 to 200 damagess and stuns a random enemy piece for 1 to 2 seconds", "Deals 100 to 300 damagess and stuns a random enemy piece for 1 to 3 seconds", "Deals 150 to 400 damages and stuns a random enemy piece for 1 to 4 seconds"], "iconUrl": "/heroes/hell_knight/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [75, 150, 300], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/hell_knight/portrait.png", "isDefault": true }, { "id": "beelzebub-purgatory", "name": "Beelzebub Purgatory", "imageUrl": "/heroes/hell_knight/skins/beelzebub-purgatory.png", "isDefault": false }, { "id": "beelzebub-chaos", "name": "Beelzebub Chaos", "imageUrl": "/heroes/hell_knight/skins/beelzebub-chaos.png", "isDefault": false }] };
const phantom_queen = { "dragonestId": "e52b47ad758", "chessTitle": "Asmodeus", "description": "Phantom Queen — Asmodeus", "lore": "Stay tuned", "iconUrl": "/heroes/phantom_queen/icon.png", "portraitUrl": "/heroes/phantom_queen/portrait.png", "imageUrl": "/heroes/phantom_queen/icon.png", "skill": { "name": "Scream of Devil", "type": "Active", "desc": "Deals 200 magical damages to nearby enemy units within 3 grids", "descByStar": ["Deals 200 magical damages to nearby enemy units within 3 grids", "Deals 300 magical damages to nearby enemy units within 3 grids", "Deals 400 magical damages to nearby enemy units within 3 grids"], "iconUrl": "/heroes/phantom_queen/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [57.5, 115, 230], "armor": 0, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/phantom_queen/portrait.png", "isDefault": true }] };
const water_spirit = { "dragonestId": "e52b47ad7cf", "chessTitle": "Wasser", "description": "Water Spirit — Wasser", "lore": "Stay tuned", "iconUrl": "/heroes/water_spirit/icon.png", "portraitUrl": "/heroes/water_spirit/portrait.png", "imageUrl": "/heroes/water_spirit/icon.png", "skill": { "name": "Wave Slash", "type": "Active", "desc": "Charges to the farthest enemy piece, dealing 200 magical damages to enemies in his path.", "descByStar": ["Charges to the farthest enemy piece, dealing 200 magical damages to enemies in his path.", "Charges to the farthest enemy piece, dealing 300 magical damages to enemies in his path.", "Charges to the farthest enemy piece, dealing 400 magical damages to enemies in his path."], "iconUrl": "/heroes/water_spirit/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [57.5, 115, 230], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/water_spirit/portrait.png", "isDefault": true }, { "id": "water-spirit-orange", "name": "Water Spirit [Orange]", "imageUrl": "/heroes/water_spirit/skins/water-spirit-orange.png", "isDefault": false }] };
const ripper = { "dragonestId": "e52b47ad81f", "chessTitle": "Golby Wood", "description": "Ripper — Golby Wood", "lore": "Stay tuned", "iconUrl": "/heroes/ripper/icon.png", "portraitUrl": "/heroes/ripper/portrait.png", "imageUrl": "/heroes/ripper/icon.png", "skill": { "name": "Reaping Death", "type": "Active", "desc": "Deals 150 pure damages to enemy units within 2 grids", "descByStar": ["Deals 150 pure damages to enemy units within 2 grids", "Deals 200 pure damages to enemy units within 2 grids", "Deals 250 pure damages to enemy units within 2 grids"], "iconUrl": "/heroes/ripper/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [57.5, 115, 230], "armor": 6, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/ripper/portrait.png", "isDefault": true }, { "id": "ripper-2049", "name": "Ripper 2049", "imageUrl": "/heroes/ripper/skins/ripper-2049.png", "isDefault": false }] };
const shining_archer = { "dragonestId": "e52b47afcfe", "chessTitle": "Waner", "description": "Shining Archer — Waner", "lore": "Stay tuned", "iconUrl": "/heroes/shining_archer/icon.png", "portraitUrl": "/heroes/shining_archer/portrait.png", "imageUrl": "/heroes/shining_archer/icon.png", "skill": { "name": "Shooting Star", "type": "Active", "desc": "Deals 50 - 500 Magical Damage to the farthest piece, and stuns it for 1 - 5 seconds. The longer the distance, the greater the damage and the longer the stun duration.", "descByStar": ["Deals 50 - 500 Magical Damage to the farthest piece, and stuns it for 1 - 5 seconds. The longer the distance, the greater the damage and the longer the stun duration.", "Deals 75 - 750 Magical Damage to the farthest piece, and stuns it for 1.5 - 7.5 seconds. The longer the distance, the greater the damage and the longer the stun duration.", "Deals 100 - 1000 Magical Damage to the farthest piece, and stuns it for 2 - 10 seconds. The longer the distance, the greater the damage and the longer the stun duration."], "iconUrl": "/heroes/shining_archer/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [60, 120, 240], "armor": 0, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/shining_archer/portrait.png", "isDefault": true }, { "id": "shining-watergun", "name": "Shining Watergun", "imageUrl": "/heroes/shining_archer/skins/shining-watergun.png", "isDefault": false }] };
const penitent_bishop = { "dragonestId": "fff990c4266", "chessTitle": "Penitent Bishop·Mammon", "rarity": "Rare", "description": "Penitent Bishop·Mammon — Penitent Bishop·Mammon", "iconUrl": "/heroes/penitent_bishop/icon.png", "portraitUrl": "/heroes/penitent_bishop/portrait.png", "imageUrl": "/heroes/penitent_bishop/icon.png", "skill": { "name": "11", "type": "Active", "desc": "1", "iconUrl": "/heroes/penitent_bishop/skill.png" }, "stats": { "armor": 1, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/penitent_bishop/portrait.png", "isDefault": true }] };
const eclipse_of_darkness = { "dragonestId": "f7a6c42ce05", "chessTitle": "Eclipse of Darkness", "rarity": "Rare", "description": "Eclipse of Darkness — Eclipse of Darkness", "iconUrl": "/heroes/eclipse_of_darkness/icon.png", "portraitUrl": "/heroes/eclipse_of_darkness/portrait.png", "imageUrl": "/heroes/eclipse_of_darkness/icon.png", "skill": { "name": "Blood Surge", "type": "Active", "desc": "Eclipse of Darkness allows the specified ally piece to absorb max HP from nearby enemies, dealing pure damage to heal the target.", "descByStar": ["Eclipse of Darkness allows the specified ally piece to absorb max HP from nearby enemies, dealing pure damage to heal the target.", "Eclipse of Darkness allows the specified ally piece to absorb max HP from nearby enemies, dealing pure damage to heal the target.", "Eclipse of Darkness allows the specified ally piece to absorb max HP from nearby enemies, dealing pure damage to heal the target."], "iconUrl": "/heroes/eclipse_of_darkness/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [60, 120, 240], "armor": 5, "atkSpeed": 1.5, "range": 160 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/eclipse_of_darkness/portrait.png", "isDefault": true }] };
const qin_xuan = { "dragonestId": "186c50163ff", "chessTitle": "Plume Warrior", "rarity": "Rare", "description": "Qin Xuan — Plume Warrior", "iconUrl": "/heroes/qin_xuan/icon.png", "portraitUrl": "/heroes/qin_xuan/portrait.png", "imageUrl": "/heroes/qin_xuan/icon.png", "skill": { "name": "Fist of Gale", "type": "Active", "desc": "Plume Warrior wraps her fists with a gale for 10 seconds. She will take a short rest and attack again in 2 seconds after the gale effect disappears or she deals the last blow.\\nGale: Reach the upper limit of the ATK Speed within 2 seconds and release the Fist of Gale that can punch up to 3 times, and the last blow will deal 60 magical damage to enemy pieces within 2 grids around the target, and reduce their ATK Speed by 30% for 2 seconds.", "descByStar": ["Plume Warrior wraps her fists with a gale for 10 seconds. She will take a short rest and attack again in 2 seconds after the gale effect disappears or she deals the last blow.\\nGale: Reach the upper limit of the ATK Speed within 2 seconds and release the Fist of Gale that can punch up to 3 times, and the last blow will deal 60 magical damage to enemy pieces within 2 grids around the target, and reduce their ATK Speed by 30% for 2 seconds.", "Plume Warrior wraps her fists with a gale for 10 seconds. She will take a short rest and attack again in 2 seconds after the gale effect disappears or she deals the last blow.\\nGale: Reach the upper limit of the ATK Speed within 2 seconds and release the Fist of Gale that can punch up to 4 times, and the last blow will deal 120 magical damage to enemy pieces within 2 grids around the target, and reduce their ATK Speed by 40% for 2 seconds.", "Plume Warrior wraps her fists with a gale for 10 seconds. She will take a short rest and attack again in 2 seconds after the gale effect disappears or she deals the last blow.\\nGale: Reach the upper limit of the ATK Speed within 2 seconds and release the Fist of Gale that can punch up to 5 times, and the last blow will deal 240 magical damage to enemy pieces within 3 grids around the target, and reduce their ATK Speed by 50% for 2 seconds."], "iconUrl": "/heroes/qin_xuan/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1.3, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/qin_xuan/portrait.png", "isDefault": true }] };
const bobo = { "dragonestId": "f105de1774a", "chessTitle": "Otter Hunter", "rarity": "Rare", "description": "Bobo — Otter Hunter", "iconUrl": "/heroes/bobo/icon.png", "portraitUrl": "/heroes/bobo/portrait.png", "imageUrl": "/heroes/bobo/icon.png", "skill": { "name": "Delicious Shell", "type": "Active", "desc": "Passive: After the battle begins, any ally has a 50% chance to gain the Delicious Shell state for 5 seconds when they are born. Active: Gives random 2 allies Delicious Shell to eat (This effect will give priority to allies that have not eaten Delicious Shells.), lasting 5 seconds. Delicious Shell: When attacking, the enemy unit will get stackable Vulnerability effect (Increases damage received by 1%), and when the Vulnerability accumulates to 10 stacks, the target's recovery effect is additionally reduced by 50%.", "descByStar": ["Passive: After the battle begins, any ally has a 50% chance to gain the Delicious Shell state for 5 seconds when they are born. Active: Gives random 2 allies Delicious Shell to eat (This effect will give priority to allies that have not eaten Delicious Shells.), lasting 5 seconds. Delicious Shell: When attacking, the enemy unit will get stackable Vulnerability effect (Increases damage received by 1%), and when the Vulnerability accumulates to 10 stacks, the target's recovery effect is additionally reduced by 50%.", "Passive: After the battle begins, any ally has a 60% chance to gain the Delicious Shell state for 5 seconds when they are born. Active: Gives random 3 allies Delicious Shell to eat (This effect will give priority to allies that have not eaten Delicious Shells.), lasting 5 seconds. Delicious Shell: When attacking, the enemy unit will get stackable Vulnerability effect (Increases damage received by 1%), and when the Vulnerability accumulates to 10 stacks, the target's recovery effect is additionally reduced by 50%.", "Passive: After the battle begins, any ally has a 80% chance to gain the Delicious Shell state for 5 seconds when they are born. Active: Gives random 4 allies Delicious Shell to eat (This effect will give priority to allies that have not eaten Delicious Shells.), lasting 5 seconds. Delicious Shell: When attacking, the enemy unit will get stackable Vulnerability effect (Increases damage received by 1%), and when the Vulnerability accumulates to 10 stacks, the target's recovery effect is additionally reduced by 50%."], "iconUrl": "/heroes/bobo/skill.jpg" }, "stats": { "hp": [600, 1200, 2400], "atk": [60, 120, 240], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/bobo/portrait.png", "isDefault": true }] };
const gem_artisan = { "dragonestId": "17acc21aa79", "chessTitle": "Mana", "rarity": "Rare", "description": "Gem Artisan — Mana", "iconUrl": "/heroes/gem_artisan/icon.png", "portraitUrl": "/heroes/gem_artisan/portrait.png", "imageUrl": "/heroes/gem_artisan/icon.png", "skill": { "name": "Gemstone Wave", "type": "Active", "desc": "Uses gemstone to teleport Gem Artisan (including itself and all pieces of the same name) to somewhere near a random enemy unit, dealing 200 pure damage to nearby enemies within 1 grid for every Gem Artisan that reaches the area.", "descByStar": ["Uses gemstone to teleport Gem Artisan (including itself and all pieces of the same name) to somewhere near a random enemy unit, dealing 200 pure damage to nearby enemies within 1 grid for every Gem Artisan that reaches the area.", "Uses gemstone to teleport Gem Artisan (including itself and all pieces of the same name) to somewhere near a random enemy unit, dealing 250 pure damage to nearby enemies within 1 grid for every Gem Artisan that reaches the area.", "Uses gemstone to teleport Gem Artisan (including itself and all pieces of the same name) to somewhere near a random enemy unit, dealing 300 pure damage to nearby enemies within 1 grid for every Gem Artisan that reaches the area."], "iconUrl": "/heroes/gem_artisan/skill.png" }, "stats": { "hp": [800, 1600, 2400], "atk": [55, 110, 220], "armor": 6, "mr": 20, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/gem_artisan/portrait.png", "isDefault": true }] };
const ghost_kid = { "dragonestId": "1727d59a49c", "chessTitle": "Anna Wes", "rarity": "Rare", "description": "Ghost Kid — Anna Wes", "lore": `Paul had been Sigma City's patrol officer for five years, and he had seen many creepy things at night. He had seen freak stranger wearing capes and creeping around the rooftops, and the merchant who sold exotic bats, that accidentally got killed by his cargo. However, it was the first time Paul had seen a child wandering alone in the alley at midnight. It seemed that anything could happen in this dangerous part of town, it was crowded with extremists from various factions.
Paul was in a dark alley, barely lit by the streetlight in the corner. He could only recognize the child's approximate age and height from the outline. He guessed that the girl ran out of the house for some reason. She was scared, and her body was shaking. The girl also held a distorted, strangely shaped balloon. Paul was wondering whether he could find any clues by looking at this balloon.
"Are you lost, little girl?" Paul leaned down, trying not to scare her. The balloon in the girl's hand slowly floated towards him.
" Brother, shall we play together? The little girl looked cheerful, and didn't feel like she was in a dangerous place.
Paul was relieved, perhaps she was just lost. He started to blame her parents for being so careless, and didn’t realize that the creepy balloon was getting closer and closer to him.
"What's your father's name? Where do you live? I'll take you back." Paul saw the little girl's appearance. She had silver hair, her deep blue eyes expressing a child's unique innocence, but her skin was pale and cold like the moonlight.
Paul recognized her father's name from the little girl's response, a name that had frequently appeared on the headlines of newspapers recently. However, the person with this name had already turned into ashes, the whole family was killed in a fire. According to his colleagues who investigated the case, the deceased never had a daughter.
Before Paul could respond, the balloon in the little girl's hand was already in front of him. It turned out to be a living creature - a big head with a large and distorted mouth. It peered at him with its one, horrifying eye.
Paul wanted to scream for help, but an inexplicable fear blocked his throat, he couldn't shout aloud! In his panic, he recalled a robbery that occurred a few blocks away not long ago. The victim claimed that he had been knocked unconscious due to a head injury. When he woke up, all of his belongings were missing. The strange thing was that the victim lost all of his happy memories afterward. The other police officers had a good laugh about this case. At this moment, Paul felt the big head gnawing at his body, its maw enveloping and restricting him. Try as he might, he could not free himself from its grasp. Before Paul lost consciousness, he felt that something was being seized from his body...
"Don't eat too much." The little girl said, which was obviously not meant for the poor security officer who was already knocked unconscious. The big head ignored her, succumbing to its monstrous glutton and greed, its appetite being satiated by taking all the happy memories away from Paul.`, "iconUrl": "/heroes/ghost_kid/icon.png", "portraitUrl": "/heroes/ghost_kid/portrait.png", "imageUrl": "/heroes/ghost_kid/icon.png", "skill": { "name": "Chew Chew", "type": "Active", "desc": "Anna throws the Big Head to the farthest enemy, dragging the target back to her and dealing 200 Physical Damage. If the target is dragged to be within 1 grid around Anna, deals a total of 150 Magical Damage over 3 times, and stuns the target for 4.5 seconds.", "descByStar": ["Anna throws the Big Head to the farthest enemy, dragging the target back to her and dealing 200 Physical Damage. If the target is dragged to be within 1 grid around Anna, deals a total of 150 Magical Damage over 3 times, and stuns the target for 4.5 seconds.", "Anna throws the Big Head to the farthest enemy, dragging the target back to her and dealing 300 Physical Damage. If the target is dragged to be within 1 grid around Anna, deals a total of 300 Magical Damage over 3 times, and stuns the target for 4.5 seconds.", "Anna throws the Big Head to the farthest enemy, dragging the target back to her and dealing 500 Physical Damage. If the target is dragged to be within 1 grid around Anna, deals a total of 200 Magical Damage over 3 times, and stuns the target for 4.5 seconds."], "iconUrl": "/heroes/ghost_kid/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [90, 180, 360], "armor": 5, "mr": 0, "atkSpeed": 1.5, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/ghost_kid/portrait.png", "isDefault": true }] };
const umbra = { "dragonestId": "e5991cf27f5", "chessTitle": "Digon", "rarity": "Rare", "description": "Umbra — Digon", "lore": "Stay tuned", "iconUrl": "/heroes/umbra/icon.png", "portraitUrl": "/heroes/umbra/portrait.png", "imageUrl": "/heroes/umbra/icon.png", "skill": { "name": "Familiar", "type": "Active", "desc": "Increases Umbra's current/max HP by 80% and summons 2 Familiars to battle. Familiars share HP with Umbra.", "descByStar": ["Increases Umbra's current/max HP by 80% and summons 2 Familiars to battle. Familiars share HP with Umbra.", "Increases Umbra's current/max HP by 80% and summons 2 strong Familiars to battle. Familiars share HP with Umbra.", "Increases Umbra's current/max HP by 80% and summons 2 stronger Familiars to battle. Familiars share HP with Umbra."], "iconUrl": "/heroes/umbra/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [50, 100, 200], "armor": 5, "mr": 10, "atkSpeed": 1.5, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/umbra/portrait.png", "isDefault": true }, { "id": "umbra-red", "name": "Umbra [Red]", "imageUrl": "/heroes/umbra/skins/umbra-red.png", "isDefault": false }] };
const berserker = { "dragonestId": "16eaba5e235", "chessTitle": "Arour'du", "rarity": "Rare", "description": "Berserker — Arour'du", "lore": "Stay tuned", "iconUrl": "/heroes/berserker/icon.png", "portraitUrl": "/heroes/berserker/portrait.png", "imageUrl": "/heroes/berserker/icon.png", "skill": { "name": "Wind Furyaxe", "type": "Active", "desc": "Passive: When attacking enemies within 1 grids, there is a 25% chance to trigger the effect: Deals 250 physical damage to enemy pieces within 1 grids of Berserker, and has a 30% chance to dodge base attacks of enemy pieces being damaged, lasting for 5 seconds. (CD: 4 seconds)\\nPassive: When attacking enemies in 1 grids away, there is a 25% chance to trigger the effect: Deals 250 physical damage to enemy pieces in a sector area of Berserker, and the ATK Speed of enemy pieces being damaged will be reduced by 30%, lasting for 5 seconds. (CD: 4 seconds)", "descByStar": ["Passive: When attacking enemies within 1 grids, there is a 25% chance to trigger the effect: Deals 250 physical damage to enemy pieces within 1 grids of Berserker, and has a 30% chance to dodge base attacks of enemy pieces being damaged, lasting for 5 seconds. (CD: 4 seconds)\\nPassive: When attacking enemies in 1 grids away, there is a 25% chance to trigger the effect: Deals 250 physical damage to enemy pieces in a sector area of Berserker, and the ATK Speed of enemy pieces being damaged will be reduced by 30%, lasting for 5 seconds. (CD: 4 seconds)", "Passive: When attacking enemies within 1 grids, there is a 25% chance to trigger the effect: Deals 450 physical damage to enemy pieces within 1 grids of Berserker, and has a 30% chance to dodge base attacks of enemy pieces being damaged, lasting for 5 seconds. (CD: 3 seconds)\\nPassive: When attacking enemies in 1 grids away, there is a 25% chance to trigger the effect: Deals 450 physical damage to enemy pieces in a sector area of Berserker, and the ATK Speed of enemy pieces being damaged will be reduced by 30%, lasting for 5 seconds. (CD: 3 seconds)", "Passive: When attacking enemies within 1 grids, there is a 25% chance to trigger the effect: Deals 700 physical damage to enemy pieces within 1 grids of Berserker, and has a 30% chance to dodge base attacks of enemy pieces being damaged, lasting for 5 seconds. (CD: 2 seconds)\\nPassive: When attacking enemies in 1 grids away, there is a 25% chance to trigger the effect: Deals 700 physical damage to enemy pieces in a sector area of Berserker, and the ATK Speed of enemy pieces being damaged will be reduced by 30%, lasting for 5 seconds. (CD: 2 seconds)"], "iconUrl": "/heroes/berserker/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [80, 160, 320], "armor": 5, "mr": 0, "atkSpeed": 1.1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/berserker/portrait.png", "isDefault": true }, { "id": "fighter-arour-du", "name": "Fighter Arour'du", "imageUrl": "/heroes/berserker/skins/fighter-arour-du.png", "isDefault": false }, { "id": "merchant-arour-du", "name": "Merchant Arour'du", "imageUrl": "/heroes/berserker/skins/merchant-arour-du.png", "isDefault": false }] };
const evil_knight = { "dragonestId": "e52b47ab96d", "chessTitle": "Lizard Knight", "rarity": "Rare", "description": "Evil Knight — Lizard Knight", "lore": "Stay tuned", "iconUrl": "/heroes/evil_knight/icon.png", "portraitUrl": "/heroes/evil_knight/portrait.png", "imageUrl": "/heroes/evil_knight/icon.png", "skill": { "name": "Shield of Skeleton", "type": "Active", "desc": "Creates a shield that absorbs 200 damages in 10 seconds  for an allied piece. When the shield is destroyed it will burst and deal damages equal to the amount  absorbed to an area of 3 radius around it.", "descByStar": ["Creates a shield that absorbs 200 damages in 10 seconds  for an allied piece. When the shield is destroyed it will burst and deal damages equal to the amount  absorbed to an area of 3 radius around it.", "Creates a shield that absorbs 300 damages in 10 seconds  for an allied piece. When the shield is destroyed it will burst and deal damages equal to the amount  absorbed to an area of 3 radius around it.", "Creates a shield that absorbs 600 damages in 10 seconds  for an allied piece. When the shield is destroyed it will burst and deal damages equal to the amount  absorbed to an area of 3 radius around it."], "iconUrl": "/heroes/evil_knight/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [50, 100, 200], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/evil_knight/portrait.png", "isDefault": true }, { "id": "evil-knight-blue", "name": "Evil Knight [Blue]", "imageUrl": "/heroes/evil_knight/skins/evil-knight-blue.png", "isDefault": false }] };
const warpwood_sage = { "dragonestId": "e52b47acb1b", "chessTitle": "Xu", "rarity": "Rare", "description": "Warpwood Sage — Xu", "lore": "Stay tuned", "iconUrl": "/heroes/warpwood_sage/icon.png", "portraitUrl": "/heroes/warpwood_sage/portrait.png", "imageUrl": "/heroes/warpwood_sage/icon.png", "skill": { "name": "Leech Seed", "type": "Active", "desc": "Deals 12.5 Magical damage to a random enemy piece within 3 grids every 0.25 seconds, and recovers his own HP based on damage dealt for 5 seconds.", "descByStar": ["Deals 12.5 Magical damage to a random enemy piece within 3 grids every 0.25 seconds, and recovers his own HP based on damage dealt for 5 seconds.", "Deals 18.75 Magical damage to a random enemy piece within 3 grids every 0.25 seconds, and recovers his own HP based on damage dealt for 5 seconds.", "Deals 25 Magical damage to a random enemy piece within 3 grids every 0.25 seconds, and recovers his own HP based on damage dealt for 5 seconds."], "iconUrl": "/heroes/warpwood_sage/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [75, 150, 300], "armor": 5, "mr": 0, "atkSpeed": 2, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/warpwood_sage/portrait.png", "isDefault": true }, { "id": "candy-sage", "name": "Candy Sage", "imageUrl": "/heroes/warpwood_sage/skins/candy-sage.png", "isDefault": false }] };
const wind_ranger = { "dragonestId": "e52b47ad179", "chessTitle": "Wu", "rarity": "Rare", "description": "Wind Ranger — Wu", "lore": "Stay tuned", "iconUrl": "/heroes/wind_ranger/icon.png", "portraitUrl": "/heroes/wind_ranger/portrait.png", "imageUrl": "/heroes/wind_ranger/icon.png", "skill": { "name": "Powershot", "type": "Active", "desc": "Charges the bow for up to 2 seconds, dealing at most 400 damages to enemy units in the path. For each enemy that powershot hits, its damages is reduced by 10%", "descByStar": ["Charges the bow for up to 2 seconds, dealing at most 400 damages to enemy units in the path. For each enemy that powershot hits, its damages is reduced by 10%", "Charges the bow for up to 2 seconds, dealing at most 600 damages to enemy units in the path. For each enemy that powershot hits, its damages is reduced by 10%", "Charges the bow for up to 2 seconds, dealing at most 800 damages to enemy units in the path. For each enemy that powershot hits, its damages is reduced by 10%"], "iconUrl": "/heroes/wind_ranger/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [60, 120, 240], "armor": 5, "mr": 0, "atkSpeed": 0.9, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/wind_ranger/portrait.png", "isDefault": true }, { "id": "heart-stealer", "name": "Heart Stealer", "imageUrl": "/heroes/wind_ranger/skins/heart-stealer.png", "isDefault": false }] };
const shadowcrawler = { "dragonestId": "e52b47ad1c8", "chessTitle": "Je", "rarity": "Rare", "description": "Shadowcrawler — Je", "lore": "Stay tuned", "iconUrl": "/heroes/shadowcrawler/icon.png", "portraitUrl": "/heroes/shadowcrawler/portrait.png", "imageUrl": "/heroes/shadowcrawler/icon.png", "skill": { "name": "Coup de Ombre", "type": "Active", "desc": "Has a 10% chance to deal 3 times damages on attack", "descByStar": ["Has a 10% chance to deal 3 times damages on attack", "Has a 10%chance to deal 4.5 times damages on attack", "Has a 10%chance to deal 6 times damages on attack"], "iconUrl": "/heroes/shadowcrawler/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [85, 170, 340], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/shadowcrawler/portrait.png", "isDefault": true }] };
const werewolf = { "dragonestId": "e52b47ad47d", "chessTitle": "Wolf Scrat", "rarity": "Rare", "description": "Werewolf — Wolf Scrat", "lore": "Stay tuned", "iconUrl": "/heroes/werewolf/icon.png", "portraitUrl": "/heroes/werewolf/portrait.png", "imageUrl": "/heroes/werewolf/icon.png", "skill": { "name": "Shapeshift", "type": "Active", "desc": "Transform into a wolf, granting him bonus 20 % maximum HP and summons 2 wolves to battle.", "descByStar": ["Transform into a wolf, granting him bonus 20 % maximum HP and summons 2 wolves to battle.", "Transform into a wolf, granting him bonus 35 % maximum HP and summons 2 wolves to battle.", "Transform into a wolf, granting him bonus 50% maximum HP and summons 2 wolves to battle."], "iconUrl": "/heroes/werewolf/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/werewolf/portrait.png", "isDefault": true }, { "id": "cowhand-wolf", "name": "Cowhand Wolf", "imageUrl": "/heroes/werewolf/skins/cowhand-wolf.png", "isDefault": false }] };
const argali_knight = { "dragonestId": "e52b47ad4a5", "chessTitle": "Aries·Osterloh", "rarity": "Rare", "description": "Argali Knight — Aries·Osterloh", "lore": "Stay tuned", "iconUrl": "/heroes/argali_knight/icon.png", "portraitUrl": "/heroes/argali_knight/portrait.png", "imageUrl": "/heroes/argali_knight/icon.png", "skill": { "name": "Purification", "type": "Active", "desc": "Deals 200 healing to a friendly chess and 250 pure damages to all nearby enemy within 2 grids,", "descByStar": ["Deals 200 healing to a friendly chess and 250 pure damages to all nearby enemy within 2 grids,", "Deals 400 healing to a friendly chess and 350 pure damages to all nearby enemy within 2 grids", "Deals 720 healing to a friendly chess and 450 pure damages to all nearby enemy within 2 grids"], "iconUrl": "/heroes/argali_knight/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [55, 110, 220], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/argali_knight/portrait.png", "isDefault": true }, { "id": "candy-knight", "name": "Candy Knight", "imageUrl": "/heroes/argali_knight/skins/candy-knight.png", "isDefault": false }] };
const flame_wizard = { "dragonestId": "e52b47ad4f7", "chessTitle": "Fire Bird", "rarity": "Rare", "description": "Flame Wizard — Fire Bird", "lore": "Stay tuned", "iconUrl": "/heroes/flame_wizard/icon.png", "portraitUrl": "/heroes/flame_wizard/portrait.png", "imageUrl": "/heroes/flame_wizard/icon.png", "skill": { "name": "Laguna Blade", "type": "Active", "desc": "Deals 350 magical damages to 1 random enemy piece. After the launch of skill, attack speed increase by 40%, lasts 30 seconds, can be stacked 2 times", "descByStar": ["Deals 350 magical damages to 1 random enemy piece. After the launch of skill, attack speed increase by 40%, lasts 30 seconds, can be stacked 2 times", "Deals 600 magical damages to 1 random enemy piece. After the launch of skill, attack speed increase by 60%, lasts 30 seconds,can be stacked 2 times", "Deals 900 magical damages to 1 random enemy piece. After the launch of skill, attack speed increase by 80%, lasts 30 seconds,can be stacked 2 times"], "iconUrl": "/heroes/flame_wizard/skill.png" }, "stats": { "hp": [500, 1e3, 2e3], "atk": [50, 100, 200], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/flame_wizard/portrait.png", "isDefault": true }, { "id": "aqua-wizard", "name": "Aqua Wizard", "imageUrl": "/heroes/flame_wizard/skins/aqua-wizard.png", "isDefault": false }] };
const poisonous_worm = { "dragonestId": "e52b47ad63b", "chessTitle": "Poisonous Worm", "rarity": "Rare", "description": "Poisonous Worm — Poisonous Worm", "lore": "Stay tuned", "iconUrl": "/heroes/poisonous_worm/icon.png", "portraitUrl": "/heroes/poisonous_worm/portrait.png", "imageUrl": "/heroes/poisonous_worm/icon.png", "skill": { "name": "Plague Ward", "type": "Active", "desc": "Summons an unmovable plague ward which slows 40% of target's attack speed in 5 seconds. Plague ward is immune to ability damage.", "descByStar": ["Summons an unmovable plague ward which slows 40% of target's attack speed in 5 seconds. Plague ward is immune to ability damage.", "Summons an unmovable strong plague ward which slows 40% of target's attack speed in 5 seconds. Plague ward is immune to ability damage.", "Summons two unmovable stronger plague wards which slows 40% of target's attack speed in 5 seconds. Plague ward is immune to ability damage."], "iconUrl": "/heroes/poisonous_worm/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [55, 110, 220], "armor": 0, "mr": 20, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/poisonous_worm/portrait.png", "isDefault": true }] };
const fallen_witcher = { "dragonestId": "e52b47ad690", "chessTitle": "Goar", "rarity": "Rare", "description": "Fallen Witcher — Goar", "lore": "Stay tuned", "iconUrl": "/heroes/fallen_witcher/icon.png", "portraitUrl": "/heroes/fallen_witcher/portrait.png", "imageUrl": "/heroes/fallen_witcher/icon.png", "skill": { "name": "Metamorphism", "type": "Active", "desc": "Transform to a piece with ranged attack and change HP with a random allied units, granting him bonus 50 % attack speed and 80 damages for 60 seconds. Upon transformation.", "descByStar": ["Transform to a piece with ranged attack and change HP with a random allied units, granting him bonus 50 % attack speed and 80 damages for 60 seconds. Upon transformation.", "Transform to a piece with ranged attack and and change HP with a random allied units, granting him bonus 70% attack speed and 100 damages for 60 seconds. Upon transformation.", "Transform to a piece with ranged attack andand change HP with a random allied units, granting him bonus 100 % attack speed and 160 damages for 60 seconds. Upon transformation."], "iconUrl": "/heroes/fallen_witcher/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [70, 140, 280], "armor": 5, "mr": 10, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/fallen_witcher/portrait.png", "isDefault": true }, { "id": "horus-goar", "name": "Horus Goar", "imageUrl": "/heroes/fallen_witcher/skins/horus-goar.png", "isDefault": false }] };
const shadow_devil = { "dragonestId": "e52b47ad6b9", "chessTitle": "Samael", "rarity": "Rare", "description": "Shadow Devil — Samael", "lore": "Stay tuned", "iconUrl": "/heroes/shadow_devil/icon.png", "portraitUrl": "/heroes/shadow_devil/portrait.png", "imageUrl": "/heroes/shadow_devil/icon.png", "skill": { "name": "Requiem of Shadow", "type": "Active", "desc": "After 1.7s delay, Shadow Devil releases 8 shockwaves around itself, each dealing 200 magical damage. For every piece in the lineup that activates a Demon Synergy, the number of shockwaves +1.", "descByStar": ["After 1.7s delay, Shadow Devil releases 8 shockwaves around itself, each dealing 200 magical damage. For every piece in the lineup that activates a Demon Synergy, the number of shockwaves +1.", "After 1.7s delay, Shadow Devil releases 9 shockwaves around itself, each dealing 250 magical damage. For every piece in the lineup that activates a Demon Synergy, the number of shockwaves +1.", "After 1.7s delay, Shadow Devil releases 10 shockwaves around itself, each dealing 300 magical damage. For every piece in the lineup that activates a Demon Synergy, the number of shockwaves +1."], "iconUrl": "/heroes/shadow_devil/skill.png" }, "stats": { "hp": [550, 1100, 2200], "atk": [80, 160, 320], "armor": 5, "mr": 0, "atkSpeed": 1.1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/shadow_devil/portrait.png", "isDefault": true }] };
const lord_of_sand = { "dragonestId": "e52b47ad6e0", "chessTitle": "Lord of Sand", "rarity": "Rare", "description": "Lord of Sand — Lord of Sand", "lore": "Stay tuned", "iconUrl": "/heroes/lord_of_sand/icon.png", "portraitUrl": "/heroes/lord_of_sand/portrait.png", "imageUrl": "/heroes/lord_of_sand/icon.png", "skill": { "name": "Burrow Dash", "type": "Active", "desc": "Burrows into the ground and tunnels to the farthest piece on the board, dealing 150 damages and stun enemy units in the path for 1.5 seconds", "descByStar": ["Burrows into the ground and tunnels to the farthest piece on the board, dealing 150 damages and stun enemy units in the path for 1.5 seconds", "Burrows into the ground and tunnels to the farthest piece on the board, dealing 250 damages and stun enemy units in the path for 1.5 seconds", "Burrows into the ground and tunnels to the farthest piece on the board, dealing 450 damages and stun enemy units in the path for 1.5 seconds"], "iconUrl": "/heroes/lord_of_sand/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [52.5, 105, 210], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/lord_of_sand/portrait.png", "isDefault": true }] };
const thunder_spirit = { "dragonestId": "e52b47ad7f7", "chessTitle": "Donner", "rarity": "Rare", "description": "Thunder Spirit — Donner", "lore": "Stay tuned", "iconUrl": "/heroes/thunder_spirit/icon.png", "portraitUrl": "/heroes/thunder_spirit/portrait.png", "imageUrl": "/heroes/thunder_spirit/icon.png", "skill": { "name": "Lightning Nova", "type": "Active", "desc": "Release a wave of plasma that grows in power as it expands, dealing 100 damages in max radius of 3 and 10 as minimum damages.", "descByStar": ["Release a wave of plasma that grows in power as it expands, dealing 100 damages in max radius of 3 and 10 as minimum damages.", "Release a wave of plasma that grows in power as it expands, dealing 175 damages in max radius of 3 and 10 as minimum damages.", "Release a wave of plasma that grows in power as it expands, dealing 250 damages in max radius of 3 and 10 as minimum damages."], "iconUrl": "/heroes/thunder_spirit/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [60, 120, 240], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/thunder_spirit/portrait.png", "isDefault": true }] };
const fortune_teller = { "dragonestId": "e52b47afdcb", "chessTitle": "Pri'du", "rarity": "Rare", "description": "Fortune Teller — Pri'du", "lore": "Stay tuned", "iconUrl": "/heroes/fortune_teller/icon.png", "portraitUrl": "/heroes/fortune_teller/portrait.png", "imageUrl": "/heroes/fortune_teller/icon.png", "skill": { "name": "Life Extension", "type": "Active", "desc": "Prevents 1 allied piece from being eliminated within 5 seconds", "descByStar": ["Prevents 1 allied piece from being eliminated within 5 seconds", "Prevents 2 allied piece from being eliminated within 5 seconds", "Prevents 3 allied piece from being eliminated within 5 seconds"], "iconUrl": "/heroes/fortune_teller/skill.jpg" }, "stats": { "hp": [550, 1100, 2200], "atk": [62.5, 125, 250], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/fortune_teller/portrait.png", "isDefault": true }, { "id": "merchant-pri-du", "name": "Merchant Pri'du", "imageUrl": "/heroes/fortune_teller/skins/merchant-pri-du.png", "isDefault": false }] };
const grand_herald = { "dragonestId": "e52b47b13a8", "chessTitle": "Hermes", "rarity": "Rare", "description": "Grand Herald — Hermes", "lore": "Stay tuned", "iconUrl": "/heroes/grand_herald/icon.png", "portraitUrl": "/heroes/grand_herald/portrait.png", "imageUrl": "/heroes/grand_herald/icon.png", "skill": { "name": "Take Control", "type": "Active", "desc": "Passive: Reduces Skill CD by 10%. Active: Clones one skill of the nearest centrosymmetric enemy when the battle starts", "descByStar": ["Passive: Reduces Skill CD by 10%. Active: Clones one skill of the nearest centrosymmetric enemy when the battle starts", "Passive: Reduces Skill CD by 20%. Active: Clones one skill of the nearest centrosymmetric enemy when the battle starts", "Passive: Reduces Skill CD by 30%. Active: Clones one skill of the nearest centrosymmetric enemy when the battle starts"], "iconUrl": "/heroes/grand_herald/skill.png" }, "stats": { "hp": [600, 1200, 2400], "atk": [55, 110, 220], "armor": 0, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/grand_herald/portrait.png", "isDefault": true }, { "id": "hermes-order", "name": "Hermes Order", "imageUrl": "/heroes/grand_herald/skins/hermes-order.png", "isDefault": false }] };
const cave_prodigy = { "dragonestId": "ed1d548b4ea", "chessTitle": "Shire Strikeboar", "rarity": "Epic", "description": "Cave Prodigy — Shire Strikeboar", "iconUrl": "/heroes/cave_prodigy/icon.png", "portraitUrl": "/heroes/cave_prodigy/portrait.png", "imageUrl": "/heroes/cave_prodigy/icon.png", "skill": { "name": "Hero's Back", "type": "Active", "desc": "Summons a unit of the highest cost that has been killed in this round, grants it with 100 initial mana. If it’s a chess piece or a summon, it will have the same star level as Cave Prodigy; if it’s a creep, then it will stay the same.", "descByStar": ["Summons a unit of the highest cost that has been killed in this round, grants it with 100 initial mana. If it’s a chess piece or a summon, it will have the same star level as Cave Prodigy; if it’s a creep, then it will stay the same.", "Summons a unit of the highest cost that has been killed in this round, grants it with 100 initial mana. If it’s a chess piece or a summon, it will have the same star level as Cave Prodigy; if it’s a creep, then it will stay the same.", "Summons a unit of the highest cost that has been killed in this round, grants it with 100 initial mana. If it’s a chess piece or a summon, it will have the same star level as Cave Prodigy; if it’s a creep, then it will stay the same."], "iconUrl": "/heroes/cave_prodigy/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [50, 100, 200], "armor": 6, "mr": 10, "atkSpeed": 1.4, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/cave_prodigy/portrait.png", "isDefault": true }] };
const thorn_predator = { "dragonestId": "e7beff4feee", "chessTitle": "Thorn Predator", "rarity": "Epic", "description": "Thorn Predator — Thorn Predator", "lore": "Hunger, fear, despair. When it comes to the terrifying thing that never stops hunting in the desert, the talkative adventurers in the bar will tacitly lower their voices or even keep silent.\nThorn Predator, a deadly threat hidden in the desert. His horror stems from his purity-pure predatory instincts and cruel actions.\nHe moved with his claw feet and ambushed all prey that entered its predator range with sharp spikes day and night.", "iconUrl": "/heroes/thorn_predator/icon.png", "portraitUrl": "/heroes/thorn_predator/portrait.png", "imageUrl": "/heroes/thorn_predator/icon.png", "skill": { "name": "Thorn Shell", "type": "Active", "desc": "The Predator activates a Thorn Shell which can reflect and disable the damage received (each attacker can only be applied once), and stun the attacker for 1 seconds. The Thorn Shell lasts for 4 seconds.", "descByStar": ["The Predator activates a Thorn Shell which can reflect and disable the damage received (each attacker can only be applied once), and stun the attacker for 1 seconds. The Thorn Shell lasts for 4 seconds.", "The Predator activates a Thorn Shell which can reflect and disable the damage received (each attacker can only be applied once), and stun the attacker for 1.5 seconds. The Thorn Shell lasts for 5 seconds.", "The Predator activates a Thorn Shell which can reflect and disable the damage received (each attacker can only be applied once), and stun the attacker for 2.5 seconds. The Thorn Shell lasts for 6 seconds."], "iconUrl": "/heroes/thorn_predator/skill.png" }, "stats": { "hp": [700, 1400, 2800], "atk": [67.5, 135, 270], "armor": 10, "mr": 0, "atkSpeed": 1.2, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/thorn_predator/portrait.png", "isDefault": true }] };
const spider_queen = { "dragonestId": "e7bef0c026b", "chessTitle": "Ungoliant Morales", "rarity": "Epic", "description": "Spider Queen — Ungoliant Morales", "lore": "Ungoliant Morales is a rare individual with perfect leader ability among the Insectoid. After her subversive reforms, the group not only was not annihilated by other groups but also ushered in unprecedented prosperity.\nWhile holding the absolute dominance at the top of the Insectoid in her hand, she also gave wisdom to the bottom outstanding people generously. \nBecause of this, her group was able to become the most powerful force in the Insectoid.", "iconUrl": "/heroes/spider_queen/icon.png", "portraitUrl": "/heroes/spider_queen/portrait.png", "imageUrl": "/heroes/spider_queen/icon.png", "skill": { "name": "Weave Web", "type": "Active", "desc": "Weave a web that lasts 4 seconds. The enemies on the web cannot move and 40% of their Base attack can be evaded. If the enemy dies during the effect, a small spider will be summoned.", "descByStar": ["Weave a web that lasts 4 seconds. The enemies on the web cannot move and 40% of their Base attack can be evaded. If the enemy dies during the effect, a small spider will be summoned.", "Weave a web that lasts 6 seconds. The enemies on the web cannot move and 60% of their Base attack can be evaded. If the enemy dies during the effect, a small spider will be summoned.", "Weave a web that lasts 10 seconds. The enemies on the web cannot move and 100% of their Base attack can be evaded. If the enemy dies during the effect, a small spider will be summoned."], "iconUrl": "/heroes/spider_queen/skill.png" }, "stats": { "hp": [900, 1800, 3600], "atk": [95, 190, 380], "armor": 5, "mr": 5, "atkSpeed": 1.2, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/spider_queen/portrait.png", "isDefault": true }, { "id": "spider-queen-green", "name": "Spider Queen [Green]", "imageUrl": "/heroes/spider_queen/skins/spider-queen-green.png", "isDefault": false }] };
const shining_assassin = { "dragonestId": "e52b47ad1f0", "chessTitle": "Shor", "rarity": "Epic", "description": "Shining Assassin — Shor", "lore": "Stay tuned", "iconUrl": "/heroes/shining_assassin/icon.png", "portraitUrl": "/heroes/shining_assassin/portrait.png", "imageUrl": "/heroes/shining_assassin/icon.png", "skill": { "name": "T.A. Field", "type": "Active", "desc": "Gain 5 times of avoidance effects and 40 bonus to damage, last for 6 seconds.", "descByStar": ["Gain 5 times of avoidance effects and 40 bonus to damage, last for 6 seconds.", "Gain 7 times of avoidance effects and 60 bonus to damage, last for 6 seconds.", "Gain 9 times of avoidance effects and 80 bonus to damage, last for 6 seconds."], "iconUrl": "/heroes/shining_assassin/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [100, 200, 400], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/shining_assassin/portrait.png", "isDefault": true }, { "id": "beach-assassin", "name": "Beach Assassin", "imageUrl": "/heroes/shining_assassin/skins/beach-assassin.png", "isDefault": false }] };
const razorclaw = { "dragonestId": "e52b47ad362", "chessTitle": "Mu Razorclaw", "rarity": "Epic", "description": "Razorclaw — Mu Razorclaw", "lore": "Stay tuned", "iconUrl": "/heroes/razorclaw/icon.png", "portraitUrl": "/heroes/razorclaw/portrait.png", "imageUrl": "/heroes/razorclaw/icon.png", "skill": { "name": "Summon Spirit Bear", "type": "Active", "desc": "Summon a spirit bear with its attack has a 20% chance to entangle an enemy unit for 3 seconds. Summoned (Spirit Bear) Magic Resistance 10", "descByStar": ["Summon a spirit bear with its attack has a 20% chance to entangle an enemy unit for 3 seconds. Summoned (Spirit Bear) Magic Resistance 10", "Summon a strong spirit bear with its attack has a 20%  chance to entangle an enemy unit for 3 seconds. Summoned (Spirit Bear) Magic Resistance 10", "Summon a stronger spirit bear with its attack has a 20% chance to entangle an enemy unit for 3 seconds. Summoned (Spirit Bear) Magic Resistance 10"], "iconUrl": "/heroes/razorclaw/skill.png" }, "stats": { "hp": [800, 1600, 3e3], "atk": [55, 110, 220], "armor": 0, "mr": 20, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/razorclaw/portrait.png", "isDefault": true }, { "id": "santa-claus", "name": "Santa Claus", "imageUrl": "/heroes/razorclaw/skins/santa-claus.png", "isDefault": false }] };
const dragon_knight = { "dragonestId": "e52b47ad38a", "chessTitle": "Ilagon Tusmore", "rarity": "Epic", "description": "Dragon Knight — Ilagon Tusmore", "lore": "Stay tuned", "iconUrl": "/heroes/dragon_knight/icon.png", "portraitUrl": "/heroes/dragon_knight/portrait.png", "imageUrl": "/heroes/dragon_knight/icon.png", "skill": { "name": "Resonance", "type": "Active", "desc": "Transforms into a powerful dragon form, granting additional 2 grids of attack range and 100 attack damages. Normal attack deals consitent magical damage.", "descByStar": ["Transforms into a powerful dragon form, granting additional 2 grids of attack range and 100 attack damages. Normal attack deals consitent magical damage.", "Transforms into a powerful dragon form, granting additional 2 grids of attack range and 125 attack damages. Normal attack deals consitent magical damage.", "Transforms into a powerful dragon form, granting additional 2 grids of attack range and 150 attack damages. Normal attack deals consitent magical damage."], "iconUrl": "/heroes/dragon_knight/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [65, 130, 260], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/dragon_knight/portrait.png", "isDefault": true }, { "id": "dragon-knight-red", "name": "Dragon Knight [Red]", "imageUrl": "/heroes/dragon_knight/skins/dragon-knight-red.png", "isDefault": false }] };
const siren = { "dragonestId": "e52b47ad3b4", "chessTitle": "Rusalka", "rarity": "Epic", "description": "Siren — Rusalka", "lore": "Stay tuned", "iconUrl": "/heroes/siren/icon.png", "portraitUrl": "/heroes/siren/portrait.png", "imageUrl": "/heroes/siren/icon.png", "skill": { "name": "Abyssal Gaze", "type": "Active", "desc": "During 3 seconds, any enemy units in 4 radius looking at Siren will have their attack speed slowed for 30%. If 2 seconds of total time is accumulated looking at Siren, that piece will turn to stone for 2 seconds.", "descByStar": ["During 3 seconds, any enemy units in 4 radius looking at Siren will have their attack speed slowed for 30%. If 2 seconds of total time is accumulated looking at Siren, that piece will turn to stone for 2 seconds.", "During 4 seconds, any enemy units in 6 radius looking at Siren will have their attack speed slowed for 30%. If 2 seconds of total time is accumulated looking at Siren, that piece will turn to stone for 2.5 seconds.", "During 5 seconds, any enemy units in 7  radius looking at Siren will have their attack speed slowed for 30%. If 2 seconds of total time is accumulated looking at Siren, that piece will turn to stone for 3 seconds."], "iconUrl": "/heroes/siren/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [60, 120, 240], "armor": 5, "mr": 10, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/siren/portrait.png", "isDefault": true }, { "id": "siren-blue", "name": "Siren [Blue]", "imageUrl": "/heroes/siren/skins/siren-blue.png", "isDefault": false }, { "id": "kraken-rusalka", "name": "Kraken Rusalka", "imageUrl": "/heroes/siren/skins/kraken-rusalka.png", "isDefault": false }, { "id": "one-year-rusalka", "name": "One Year Rusalka", "imageUrl": "/heroes/siren/skins/one-year-rusalka.png", "isDefault": false }] };
const storm_shaman = { "dragonestId": "e52b47ad3db", "chessTitle": "Oost Brutalthunder", "rarity": "Epic", "description": "Storm Shaman — Oost Brutalthunder", "lore": "Stay tuned", "iconUrl": "/heroes/storm_shaman/icon.png", "portraitUrl": "/heroes/storm_shaman/portrait.png", "imageUrl": "/heroes/storm_shaman/icon.png", "skill": { "name": "Static Storm", "type": "Active", "desc": "Creates a damaging static storm that also silence enemy units in the area for 2 seconds. Dealing as maximum as 150 magical damages per second.", "descByStar": ["Creates a damaging static storm that also silence enemy units in the area for 2 seconds. Dealing as maximum as 150 magical damages per second.", "Creates a damaging static storm that also silence enemy units in the area for 3 seconds. Dealing as maximum as 200 magical damages per second.", "Creates a damaging static storm that also silence enemy units in the area for 4 seconds. Dealing as maximum as 250 magical damages per second."], "iconUrl": "/heroes/storm_shaman/skill.png" }, "stats": { "hp": [800, 1600, 3200], "atk": [47.5, 95, 190], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/storm_shaman/portrait.png", "isDefault": true }] };
const venomancer = { "dragonestId": "e52b47ad404", "chessTitle": "Golby Moly", "rarity": "Epic", "description": "Venomancer — Golby Moly", "lore": "Stay tuned", "iconUrl": "/heroes/venomancer/icon.png", "portraitUrl": "/heroes/venomancer/portrait.png", "imageUrl": "/heroes/venomancer/icon.png", "skill": { "name": "Chemical Rage", "type": "Active", "desc": "Generates acid mist for 15 seconds that reduces the enemy Armor by 7 if affected by the mist. Meanwhile, enters a chemically induced rage that reduces basic attack cooldown to 0.7, and restores HP by 50 every second for 60 seconds.", "descByStar": ["Generates acid mist for 15 seconds that reduces the enemy Armor by 7 if affected by the mist. Meanwhile, enters a chemically induced rage that reduces basic attack cooldown to 0.7, and restores HP by 50 every second for 60 seconds.", "Generates acid mist for 15 seconds that reduces the enemy Armor by 7 if affected by the mist. Meanwhile, enters a chemically induced rage that reduces basic attack cooldown to 0.55, and restores HP by 75 every second for 60 seconds.", "Generates acid mist for 15 seconds that reduces the enemy Armor by 10 if affected by the mist. Meanwhile, enters a chemically induced rage that reduces basic attack cooldown to 0.4, and restores HP by 100 every second for 60 seconds."], "iconUrl": "/heroes/venomancer/skill.png" }, "stats": { "hp": [1e3, 2e3, 4e3], "atk": [65, 130, 260], "armor": 0, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/venomancer/portrait.png", "isDefault": true }, { "id": "moree-2049", "name": "Moree 2049", "imageUrl": "/heroes/venomancer/skins/moree-2049.png", "isDefault": false }] };
const pirate_captain = { "dragonestId": "e52b47ad4ce", "chessTitle": "Jack·D·Eric", "rarity": "Epic", "description": "Pirate Captain — Jack·D·Eric", "lore": "Stay tuned", "iconUrl": "/heroes/pirate_captain/icon.png", "portraitUrl": "/heroes/pirate_captain/portrait.png", "imageUrl": "/heroes/pirate_captain/icon.png", "skill": { "name": "Ghostly ship", "type": "Active", "desc": "Summon a ghostly ship smashes the target area, causing 1  seconds of stunning and 150 damages.", "descByStar": ["Summon a ghostly ship smashes the target area, causing 1  seconds of stunning and 150 damages.", "Summon a ghostly ship smashes the target area, causing 1.5  seconds of stunning and 250 damages.", "Summon a ghostly ship smashes the target area, causing 2 seconds of stunning and 350 damages."], "iconUrl": "/heroes/pirate_captain/skill.jpg" }, "stats": { "hp": [950, 1900, 3800], "atk": [82.5, 165, 330], "armor": 8, "mr": 0, "atkSpeed": 1, "range": 2 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/pirate_captain/portrait.png", "isDefault": true }, { "id": "red-beard-jack", "name": "Red Beard Jack", "imageUrl": "/heroes/pirate_captain/skins/red-beard-jack.png", "isDefault": false }, { "id": "one-year-jack", "name": "One Year Jack", "imageUrl": "/heroes/pirate_captain/skins/one-year-jack.png", "isDefault": false }, { "id": "li-xuan-yuan", "name": "Li Xuan Yuan", "imageUrl": "/heroes/pirate_captain/skins/li-xuan-yuan.png", "isDefault": false }] };
const tortola_elder = { "dragonestId": "e52b47ad51f", "chessTitle": "Turt Saruman", "rarity": "Epic", "description": "Tortola Elder — Turt Saruman", "lore": "Stay tuned", "iconUrl": "/heroes/tortola_elder/icon.png", "portraitUrl": "/heroes/tortola_elder/portrait.png", "imageUrl": "/heroes/tortola_elder/icon.png", "skill": { "name": "Kamehameha", "type": "Active", "desc": "Channels for at most 3 seconds then release a pulsing wave, dealing at most 300 magical damages to enemy units in its path.", "descByStar": ["Channels for at most 3 seconds then release a pulsing wave, dealing at most 300 magical damages to enemy units in its path.", "Channels for at most 3 seconds then release a pulsing wave, dealing at most 500 magical damages to enemy units in its path.", "Channels for at most 3 seconds then release a pulsing wave, dealing at most 800 magical damages to enemy units in its path."], "iconUrl": "/heroes/tortola_elder/skill.png" }, "stats": { "hp": [650, 1300, 2600], "atk": [42.5, 85, 170], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 5 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/tortola_elder/portrait.png", "isDefault": true }] };
const soul_reaper = { "dragonestId": "e52b47ad5c1", "chessTitle": "Scolle Warlock", "rarity": "Epic", "description": "Soul Reaper — Scolle Warlock", "lore": "Stay tuned", "iconUrl": "/heroes/soul_reaper/icon.png", "portraitUrl": "/heroes/soul_reaper/portrait.png", "imageUrl": "/heroes/soul_reaper/icon.png", "skill": { "name": "Heartstopper Pulse", "type": "Active", "desc": "Deal 100 magical damages to enemy units and 100 heal to allied units in 3 radius.", "descByStar": ["Deal 100 magical damages to enemy units and 100 heal to allied units in 3 radius.", "Deal 150 magical damages to enemy units and 150 heal to allied units in 3 radius.", "Deal 200 magical damages to enemy units and 200 heal to allied units in 3 radius."], "iconUrl": "/heroes/soul_reaper/skill.png" }, "stats": { "hp": [850, 1700, 3400], "atk": [55, 110, 220], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/soul_reaper/portrait.png", "isDefault": true }] };
const doom_arbiter = { "dragonestId": "e52b47ad665", "chessTitle": "Berial", "rarity": "Epic", "description": "Doom Arbiter — Berial", "lore": "Stay tuned", "iconUrl": "/heroes/doom_arbiter/icon.png", "portraitUrl": "/heroes/doom_arbiter/portrait.png", "imageUrl": "/heroes/doom_arbiter/icon.png", "skill": { "name": "Doom Curse", "type": "Active", "desc": "Silence an enemy piece, dealing 60 pure damages in 10 seconds", "descByStar": ["Silence an enemy piece, dealing 60 pure damages in 10 seconds", "Silence an enemy piece, dealing 90 pure damages in 15 seconds", "Silence an enemy piece, dealing 120 pure damages in 20 seconds"], "iconUrl": "/heroes/doom_arbiter/skill.png" }, "stats": { "hp": [950, 1900, 3800], "atk": [115, 230, 460], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/doom_arbiter/portrait.png", "isDefault": true }, { "id": "berial-chaos", "name": "Berial Chaos", "imageUrl": "/heroes/doom_arbiter/skins/berial-chaos.png", "isDefault": false }] };
const grimtouch = { "dragonestId": "e52b47b13cf", "chessTitle": "Washaak", "rarity": "Epic", "description": "Grimtouch — Washaak", "lore": "Stay tuned", "iconUrl": "/heroes/grimtouch/icon.png", "portraitUrl": "/heroes/grimtouch/portrait.png", "imageUrl": "/heroes/grimtouch/icon.png", "skill": { "name": "Ink Splash", "type": "Active", "desc": "Releases a forward ink wave, deals 100 Magical Damage to enemies along the path, each piece hit increases damage by 30, accompanied with 1x Ink Touch effect. Ink Touch: Target skill attack on any Ink Touched pieces would be imposed on all other directional Ink Touched pieces", "descByStar": ["Releases a forward ink wave, deals 100 Magical Damage to enemies along the path, each piece hit increases damage by 30, accompanied with 1x Ink Touch effect. Ink Touch: Target skill attack on any Ink Touched pieces would be imposed on all other directional Ink Touched pieces", "Releases a forward ink wave, deals 150 Magical Damage to enemies along the path, each piece hit increases damage by 45, accompanied with 2x Ink Touch effect. Ink Touch: Target skill attack on any Ink Touched pieces would be imposed on all other directional Ink Touched pieces", "Releases a forward ink wave, deals 200 Magical Damage to enemies along the path, each piece hit increases damage by 60, accompanied with 4x Ink Touch effect. Ink Touch: Target skill attack on any Ink Touched pieces would be imposed on all other directional Ink Touched pieces"], "iconUrl": "/heroes/grimtouch/skill.png" }, "stats": { "hp": [750, 1500, 3e3], "atk": [80, 160, 320], "armor": 5, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/grimtouch/portrait.png", "isDefault": true }, { "id": "washaak-chaos", "name": "Washaak Chaos", "imageUrl": "/heroes/grimtouch/skins/washaak-chaos.png", "isDefault": false }] };
const sacred_lancer = { "dragonestId": "e8432f6fa43", "chessTitle": "Skar'du", "rarity": "Legendary", "description": "Sacred Lancer — Skar'du", "lore": "Skar'du was originally a weak person, the sickness is tormenting her body but unable to defeat her will. After receiving treatment from Desperate Doctor, she turned into a powerful warrior. She built her prestige in the army by that ancestral lance. That red short lance that belongs to her is a symbol of victory.", "iconUrl": "/heroes/sacred_lancer/icon.png", "portraitUrl": "/heroes/sacred_lancer/portrait.png", "imageUrl": "/heroes/sacred_lancer/icon.png", "skill": { "name": "Cursed Lance", "type": "Active", "desc": "Feeds her Lance with blood, sacrificing 15 HP at each base attack, and multiple attacks will stack additional 20 Magic damage per second to the target, lasts 8 seconds; for each loss of 10% HP, increases 10% ATK speed, 10% Magic resistance and 0.5% HP regeneration per second.", "descByStar": ["Feeds her Lance with blood, sacrificing 15 HP at each base attack, and multiple attacks will stack additional 20 Magic damage per second to the target, lasts 8 seconds; for each loss of 10% HP, increases 10% ATK speed, 10% Magic resistance and 0.5% HP regeneration per second.", "Feeds her Lance with blood, sacrificing 15 HP at each base attack, and multiple attacks will stack additional 30 Magic damage per second to the target, lasts 8 seconds; for each loss of 10% HP, increases 15% ATK speed, 10% Magic resistance and 0.5% HP regeneration per second.", "Feeds her Lance with blood, sacrificing 15 HP at each base attack, and multiple attacks will stack additional 50 Magic damage per second to the target, lasts 8 seconds; for each loss of 10% HP, increases 25% ATK speed, 10% Magic resistance and 0.5% HP regeneration per second."], "iconUrl": "/heroes/sacred_lancer/skill.png" }, "stats": { "hp": [1050, 2100, 4200], "atk": [90, 180, 360], "armor": 10, "mr": 10, "atkSpeed": 1.1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/sacred_lancer/portrait.png", "isDefault": true }, { "id": "sacred-lancer-yellow", "name": "Sacred Lancer [Yellow]", "imageUrl": "/heroes/sacred_lancer/skins/sacred-lancer-yellow.png", "isDefault": false }] };
const the_scryer = { "dragonestId": "e69444fe2ce", "chessTitle": "Ro", "rarity": "Legendary", "description": "The Scryer — Ro", "lore": "Stay tuned!", "iconUrl": "/heroes/the_scryer/icon.png", "portraitUrl": "/heroes/the_scryer/portrait.png", "imageUrl": "/heroes/the_scryer/icon.png", "skill": { "name": "Raven Arcane", "type": "Active", "desc": "Active: Casts an ability based on the highest activated tier Class/Race Synergy of the enemy's lineup (with at least 3 chess pieces). Passive: Regenerates 10 Mana per second. When the first enemy's Mana is full, Silence it for 3 seconds. Mage/Shaman/Divinity: Electromagnetic Pulse, Warrior/Cave Clan/Goblin: Darkfeathered Servants, Mech/Warlock/Marine: Blood Surge, Hunter/Assassin/Glacier: Sonic Attack, Knight/Human/Egersis: Bolt of Lightning, Beast/Feathered/Demon: Earth's Fury, Druid/Spirit/Dragon: Whirlwind Attack", "descByStar": ["Active: Casts an ability based on the highest activated tier Class/Race Synergy of the enemy's lineup (with at least 3 chess pieces). Passive: Regenerates 10 Mana per second. When the first enemy's Mana is full, Silence it for 3 seconds. Mage/Shaman/Divinity: Electromagnetic Pulse, Warrior/Cave Clan/Goblin: Darkfeathered Servants, Mech/Warlock/Marine: Blood Surge, Hunter/Assassin/Glacier: Sonic Attack, Knight/Human/Egersis: Bolt of Lightning, Beast/Feathered/Demon: Earth's Fury, Druid/Spirit/Dragon: Whirlwind Attack", "Active: Casts an ability based on the highest activated tier Class/Race Synergy of the enemy's lineup (with at least 3 chess pieces). Passive: Regenerates 10 Mana per second. When the first enemy's Mana is full, Silence it for 3 seconds. Mage/Shaman/Divinity: Electromagnetic Pulse, Warrior/Cave Clan/Goblin: Darkfeathered Servants, Mech/Warlock/Marine: Blood Surge, Hunter/Assassin/Glacier: Sonic Attack, Knight/Human/Egersis: Bolt of Lightning, Beast/Feathered/Demon: Earth's Fury, Druid/Spirit/Dragon: Whirlwind Attack", "Active: Casts an ability based on the highest activated tier Class/Race Synergy of the enemy's lineup (with at least 3 chess pieces). Passive: Regenerates 10 Mana per second. When the first enemy's Mana is full, Silence it for 3 seconds. Mage/Shaman/Divinity: Electromagnetic Pulse, Warrior/Cave Clan/Goblin: Darkfeathered Servants, Mech/Warlock/Marine: Blood Surge, Hunter/Assassin/Glacier: Sonic Attack, Knight/Human/Egersis: Bolt of Lightning, Beast/Feathered/Demon: Earth's Fury, Druid/Spirit/Dragon: Whirlwind Attack"], "iconUrl": "/heroes/the_scryer/skill.png" }, "stats": { "hp": [1e3, 2e3, 4e3], "atk": [75, 150, 300], "armor": 5, "mr": 0, "atkSpeed": 1.1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/the_scryer/portrait.png", "isDefault": true }, { "id": "the-scryer-red", "name": "The Scryer [Red]", "imageUrl": "/heroes/the_scryer/skins/the-scryer-red.png", "isDefault": false }] };
const frostblaze_dragon = { "dragonestId": "e5991b4bd56", "chessTitle": "Bayrison", "rarity": "Legendary", "description": "Frostblaze Dragon — Bayrison", "lore": "Stay tuned", "iconUrl": "/heroes/frostblaze_dragon/icon.png", "portraitUrl": "/heroes/frostblaze_dragon/portrait.png", "imageUrl": "/heroes/frostblaze_dragon/icon.png", "skill": { "name": "Icebound Wall", "type": "Active", "desc": "Builds an Icebound wall on your right, dealing 200 magical damage to enemy passing through the wall and reducing their attack speed by 30% for 3 seconds. All pieces won't target enemies on the other side of the wall.", "descByStar": ["Builds an Icebound wall on your right, dealing 200 magical damage to enemy passing through the wall and reducing their attack speed by 30% for 3 seconds. All pieces won't target enemies on the other side of the wall.", "Builds an Icebound wall on your right, dealing 300 magical damage to enemy passing through the wall and reducing their attack speed by 30% for 3 seconds. All pieces won't target enemies on the other side of the wall.", "Builds an Icebound wall on your right, dealing 400 magical damage to enemy passing through the wall and reducing their attack speed by 30% for 3 seconds. All pieces won't target enemies on the other side of the wall."], "iconUrl": "/heroes/frostblaze_dragon/skill.png" }, "stats": { "hp": [900, 1800, 3600], "atk": [60, 120, 240], "armor": 0, "mr": 20, "atkSpeed": 1.1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/frostblaze_dragon/portrait.png", "isDefault": true }, { "id": "frostblaze-dragon-red", "name": "Frostblaze Dragon [Red]", "imageUrl": "/heroes/frostblaze_dragon/skins/frostblaze-dragon-red.png", "isDefault": false }] };
const strange_egg = { "dragonestId": "e52b47abc41", "chessTitle": "Circular", "rarity": "Legendary", "description": "Strange Egg — Circular", "lore": "0", "iconUrl": "/heroes/strange_egg/icon.png", "portraitUrl": "/heroes/strange_egg/portrait.png", "imageUrl": "/heroes/strange_egg/icon.png", "skill": { "name": "Ever Changing", "type": "Active", "desc": "If you need 1 piece to rank up your piece, drag the Strange Egg to the target piece, and it'll be whatever you want it to be.", "iconUrl": "/heroes/strange_egg/skill.png" }, "stats": { "armor": 0, "mr": 0, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/strange_egg/portrait.png", "isDefault": true }] };
const helicopter = { "dragonestId": "e52b47acac7", "chessTitle": "Black Hawk Titanium", "rarity": "Legendary", "description": "Helicopter — Black Hawk Titanium", "lore": "Stay tuned", "iconUrl": "/heroes/helicopter/icon.png", "portraitUrl": "/heroes/helicopter/portrait.png", "imageUrl": "/heroes/helicopter/icon.png", "skill": { "name": "Call Down", "type": "Active", "desc": "Call down 2 aerial missiles strike enemy units in 4 radius. Each of them deals 200 magical damages", "descByStar": ["Call down 2 aerial missiles strike enemy units in 4 radius. Each of them deals 200 magical damages", "Call down 2 aerial missiles strike enemy units in 4  radius. Each of them deals 300 magical damages", "Call down 2 aerial missiles strike enemy units in 4 radius. Each of them deals 400 magical damages"], "iconUrl": "/heroes/helicopter/skill.png" }, "stats": { "hp": [900, 1800, 3600], "atk": [77.5, 155, 310], "armor": 10, "mr": 0, "atkSpeed": 0.9, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/helicopter/portrait.png", "isDefault": true }, { "id": "one-year-black", "name": "One Year Black", "imageUrl": "/heroes/helicopter/skins/one-year-black.png", "isDefault": false }] };
const devastator = { "dragonestId": "e52b47ad269", "chessTitle": "Golby Boom", "rarity": "Legendary", "description": "Devastator — Golby Boom", "lore": "Stay tuned", "iconUrl": "/heroes/devastator/icon.png", "portraitUrl": "/heroes/devastator/portrait.png", "imageUrl": "/heroes/devastator/icon.png", "skill": { "name": "Delayed Action Bomb", "type": "Active", "desc": "Plant an explosive that will detonate after 3 seconds and deal 500 physical damages to enemy units in 4 radius.", "descByStar": ["Plant an explosive that will detonate after 3 seconds and deal 500 physical damages to enemy units in 4 radius.", "Plant an explosive that will detonate after 3 seconds and deal 800 physical damages to enemy units in 4 radius.", "Plant an explosive that will detonate after 3 seconds and deal 1100 physical damages to enemy units in 4 radius."], "iconUrl": "/heroes/devastator/skill.png" }, "stats": { "hp": [1e3, 2e3, 4e3], "atk": [50, 100, 200], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 4 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/devastator/portrait.png", "isDefault": true }, { "id": "blast-2049", "name": "Blast 2049", "imageUrl": "/heroes/devastator/skins/blast-2049.png", "isDefault": false }] };
const dark_spirit = { "dragonestId": "e52b47ad2c1", "chessTitle": "Dunkel", "rarity": "Legendary", "description": "Dark Spirit — Dunkel", "lore": "Stay tuned", "iconUrl": "/heroes/dark_spirit/icon.png", "portraitUrl": "/heroes/dark_spirit/portrait.png", "imageUrl": "/heroes/dark_spirit/icon.png", "skill": { "name": "Black Hole", "type": "Active", "desc": "Deals pure damage equals to 4% of the max HP per second for enemy pieces within 3 grids. It lasts for 8 seconds.", "descByStar": ["Deals pure damage equals to 4% of the max HP per second for enemy pieces within 3 grids. It lasts for 8 seconds.", "Deals pure damage equals to 6% of the max HP per second for enemy pieces within 3 grids. It lasts for 8 seconds.", "Deals pure damage equals to 8% of the max HP per second for enemy pieces within 3 grids. It lasts for 8 seconds."], "iconUrl": "/heroes/dark_spirit/skill.png" }, "stats": { "hp": [1e3, 2e3, 4e3], "atk": [50, 100, 200], "armor": 5, "mr": 40, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/dark_spirit/portrait.png", "isDefault": true }] };
const tsunami_stalker = { "dragonestId": "e52b47ad311", "chessTitle": "Nyarlat", "rarity": "Legendary", "description": "Tsunami Stalker — Nyarlat", "lore": "Stay tuned", "iconUrl": "/heroes/tsunami_stalker/icon.png", "portraitUrl": "/heroes/tsunami_stalker/portrait.png", "imageUrl": "/heroes/tsunami_stalker/icon.png", "skill": { "name": "Ravaging Tentacles", "type": "Active", "desc": "Slam the ground, causing the tentacles to erupt in all directions and in at most 3 radius, dealing 100 magical damages and stunning enemy units for 2 seconds.", "descByStar": ["Slam the ground, causing the tentacles to erupt in all directions and in at most 3 radius, dealing 100 magical damages and stunning enemy units for 2 seconds.", "Slam the ground, causing the tentacles to erupt in all directions and in at most 5 radius, dealing 200 magical damages and stunning enemy units for 2 seconds.", "Slam the ground, causing the tentacles to erupt in all directions and in at most 6 radius, dealing 300 magical damages and stunning enemy units for 2 seconds."], "iconUrl": "/heroes/tsunami_stalker/skill.png" }, "stats": { "hp": [950, 1900, 3800], "atk": [50, 100, 200], "armor": 5, "mr": 0, "atkSpeed": 2, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/tsunami_stalker/portrait.png", "isDefault": true }, { "id": "tsunami-stalker-blue", "name": "Tsunami Stalker [Blue]", "imageUrl": "/heroes/tsunami_stalker/skins/tsunami-stalker-blue.png", "isDefault": false }, { "id": "one-year-nyarlat", "name": "One Year Nyarlat", "imageUrl": "/heroes/tsunami_stalker/skins/one-year-nyarlat.png", "isDefault": false }, { "id": "kraken-nyarlat", "name": "Kraken Nyarlat", "imageUrl": "/heroes/tsunami_stalker/skins/kraken-nyarlat.png", "isDefault": false }] };
const god_of_thunder = { "dragonestId": "e52b47aec44", "chessTitle": "Zeus", "rarity": "Legendary", "description": "God of Thunder — Zeus", "lore": "Stay tuned", "iconUrl": "/heroes/god_of_thunder/icon.png", "portraitUrl": "/heroes/god_of_thunder/portrait.png", "imageUrl": "/heroes/god_of_thunder/icon.png", "skill": { "name": "Zeus' Punishment", "type": "Active", "desc": "Summons thunder to punish at least 1 enemy piece, and has a 50% chance of dealing 15% of the target piece's remaining HP +250 Magical damage equals to it.", "descByStar": ["Summons thunder to punish at least 1 enemy piece, and has a 50% chance of dealing 15% of the target piece's remaining HP +250 Magical damage equals to it.", "Summons thunder to punish at least 1 enemy piece, and has a 50% chance of dealing 25% of the target piece's remaining HP +350 Magical damage equals to it.", "Summons thunder to punish at least 1 enemy piece, and has a 50% chance of dealing 35% of the target piece's remaining HP +450 Magical damage equals to it."], "iconUrl": "/heroes/god_of_thunder/skill.png" }, "stats": { "hp": [950, 1900, 3800], "atk": [60, 120, 240], "armor": 0, "mr": 40, "atkSpeed": 1, "range": 3 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/god_of_thunder/portrait.png", "isDefault": true }, { "id": "zeus-order", "name": "Zeus Order", "imageUrl": "/heroes/god_of_thunder/skins/zeus-order.png", "isDefault": false }] };
const rogue_guard = { "dragonestId": "e52b47afeed", "chessTitle": "Lucifer", "rarity": "Legendary", "description": "Rogue Guard — Lucifer", "lore": "Stay tuned", "iconUrl": "/heroes/rogue_guard/icon.png", "portraitUrl": "/heroes/rogue_guard/portrait.png", "imageUrl": "/heroes/rogue_guard/icon.png", "skill": { "name": "Crazy Dance", "type": "Active", "desc": "Passive: Deals 50% splash physical damage to enemies within 2.5 grids. Active: All ally Demon pieces' attack increases by 150 for 60 seconds. Also increases its own ATK which equals to number of allied pieces with Demon synergy*35.", "descByStar": ["Passive: Deals 50% splash physical damage to enemies within 2.5 grids. Active: All ally Demon pieces' attack increases by 150 for 60 seconds. Also increases its own ATK which equals to number of allied pieces with Demon synergy*35.", "Passive: Deals 50% splash physical damage to enemies within 2.5 grids. Active: All ally Demon pieces' attack increases by 200 for 60 seconds. Also increases its own ATK which equals to number of allied pieces with Demon synergy*45.", "Passive: Deals 50% splash physical damage to enemies within 2.5 grids. Active: All ally Demon pieces' attack increases by 250 for 60 seconds. Also increases its own ATK which equals to number of allied pieces with Demon synergy*60."], "iconUrl": "/heroes/rogue_guard/skill.jpg" }, "stats": { "hp": [1200, 2400, 4800], "atk": [125, 250, 500], "armor": 10, "mr": 0, "atkSpeed": 1, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/rogue_guard/portrait.png", "isDefault": true }] };
const khan = { "dragonestId": "edde7225351", "chessTitle": "Uriyang Modu", "rarity": "Legendary", "description": "Khan — Uriyang Modu", "iconUrl": "/heroes/khan/icon.png", "portraitUrl": "/heroes/khan/portrait.png", "imageUrl": "/heroes/khan/icon.png", "skill": { "name": "Earth Cracking", "type": "Active", "desc": "Slash a crack ahead with the axe, pulling enemy units within range toward the crack after 3 seconds and stunning them for 2 seconds while dealing damage equals to their maximum HP 10%+100 (50% is magical damage, 50% is physical damage).", "descByStar": ["Slash a crack ahead with the axe, pulling enemy units within range toward the crack after 3 seconds and stunning them for 2 seconds while dealing damage equals to their maximum HP 10%+100 (50% is magical damage, 50% is physical damage).", "Slash a crack ahead with the axe, pulling enemy units within range toward the crack after 3 seconds and stunning them for 2.5 seconds while dealing damage equals to their maximum HP 15%+150 (50% is magical damage, 50% is physical damage).", "Slash a crack ahead with the axe, pulling enemy units within range toward the crack after 3 seconds and stunning them for 3 seconds while dealing damage equals to their maximum HP 20%+200 (50% is magical damage, 50% is physical damage)."], "iconUrl": "/heroes/khan/skill.png" }, "stats": { "hp": [1e3, 2e3, 4e3], "atk": [115, 230, 460], "armor": 10, "mr": 20, "atkSpeed": 1.3, "range": 1 }, "skins": [{ "id": "default", "name": "Default", "imageUrl": "/heroes/khan/portrait.png", "isDefault": true }] };
const dragonestEnrichments = {
  hawk,
  unknown_horror,
  goddess_of_war,
  mist_phantom_king,
  resentful_murk,
  unicorn,
  ogre_mage,
  sky_breaker,
  redaxe_chief,
  tusk_champion,
  taboo_witcher,
  defector,
  frost_knight,
  the_source,
  egersis_ranger,
  stone_spirit,
  heaven_bomber,
  soul_breaker,
  god_of_war,
  winter_chiropteran,
  soul_devourer,
  goddess_of_light,
  light_blade,
  wisper_seer,
  venom,
  dwarf_sniper,
  desperate_doctor,
  abyssal_guard,
  abyssalcrawler,
  skull_hunter,
  swordman,
  hell_knight,
  phantom_queen,
  water_spirit,
  ripper,
  shining_archer,
  penitent_bishop,
  eclipse_of_darkness,
  qin_xuan,
  bobo,
  gem_artisan,
  ghost_kid,
  umbra,
  berserker,
  evil_knight,
  warpwood_sage,
  wind_ranger,
  shadowcrawler,
  werewolf,
  argali_knight,
  flame_wizard,
  poisonous_worm,
  fallen_witcher,
  shadow_devil,
  lord_of_sand,
  thunder_spirit,
  fortune_teller,
  grand_herald,
  cave_prodigy,
  thorn_predator,
  spider_queen,
  shining_assassin,
  razorclaw,
  dragon_knight,
  siren,
  storm_shaman,
  venomancer,
  pirate_captain,
  tortola_elder,
  soul_reaper,
  doom_arbiter,
  grimtouch,
  sacred_lancer,
  the_scryer,
  frostblaze_dragon,
  strange_egg,
  helicopter,
  devastator,
  dark_spirit,
  tsunami_stalker,
  god_of_thunder,
  rogue_guard,
  khan
};
const HEROES_BASE = [
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
  { id: "khan", name: "Khan", cost: 5, race: ["Divinity", "Horn"], class: ["Druid"] }
];
const HERO_MANUAL_ENRICHMENTS = {
  devastator: {
    description: "Carry Mech 5 vàng — sát thương diện rộng mạnh khi kích hoạt đủ Goblin.",
    skill: {
      name: "Annihilation Wave",
      type: "Chủ động",
      desc: "Phóng sóng năng lượng gây sát thương phép lên tất cả kẻ địch trong phạm vi."
    },
    stats: { hp: [900, 1620, 3240], atk: [70, 126, 252], armor: 35, mr: 25 },
    tacticalNotes: [
      "Cần ít nhất 4 Goblin trước khi roll tìm 2 sao.",
      "Ưu tiên item tấn công và hút máu để duy trì sau khi cast."
    ],
    recommendedItemIds: ["devil_blade", "divine_sword", "shadow_edge"]
  },
  god_of_thunder: {
    description: "Mage carry Divinity — burst phép và giảm cooldown toàn đội.",
    skill: {
      name: "Thunder Wrath",
      type: "Chủ động",
      desc: "Triệu hồi sấm sét lên khu vực mục tiêu, gây sát thương phép lớn."
    },
    stats: { hp: [850, 1530, 3060], atk: [65, 117, 234], armor: 25, mr: 40 },
    tacticalNotes: [
      "Giữ Divinity thuần hoặc 2 Divinity để tận dụng giảm cooldown.",
      "Crystal Sword và Magicka Crystal tăng tốc cast đáng kể."
    ],
    recommendedItemIds: ["crystal_sword", "magicka_crystal", "mjollnir"]
  },
  dark_spirit: {
    description: "Warlock 5 vàng — sát thương theo % máu, counter frontline dày.",
    skill: {
      name: "Soul Rend",
      type: "Chủ động",
      desc: "Hút linh hồn kẻ địch, gây sát thương chuẩn dựa trên máu tối đa."
    },
    stats: { hp: [800, 1440, 2880], atk: [60, 108, 216], armor: 20, mr: 35 },
    tacticalNotes: [
      "Đặt góc an toàn — cần thời gian cast.",
      "Kết hợp Spirits synergy để tăng sát thương skill."
    ],
    recommendedItemIds: ["crystal_sword", "magicka_crystal", "devil_blade"]
  },
  dragon_knight: {
    description: "Knight carry lai Human/Dragon — frontline vừa tank vừa damage.",
    skill: {
      name: "Dragon Breath",
      type: "Chủ động",
      desc: "Phun lửa theo hình nón, gây sát thương phép và làm chậm."
    },
    stats: { hp: [950, 1710, 3420], atk: [62, 112, 224], armor: 45, mr: 30 },
    tacticalNotes: [
      "Linh hoạt build tank hoặc carry tùy item.",
      "Phù hợp đội hình Human Knight hoặc Dragon."
    ],
    recommendedItemIds: ["cattlehide_armor", "devil_blade", "divine_sword"]
  },
  doom_arbiter: {
    description: "Demon Warrior 4 vàng — sát thương chuẩn khi là Demon duy nhất.",
    skill: {
      name: "Doom Strike",
      type: "Chủ động",
      desc: "Tấn công mục tiêu gây sát thương lớn và cường hóa đòn đánh tiếp theo."
    },
    stats: { hp: [880, 1584, 3168], atk: [68, 122, 244], armor: 40, mr: 20 },
    tacticalNotes: [
      "Cân nhắc Fallen Witcher để giữ Demon synergy.",
      "Item hút máu giúp sustain sau khi lao vào backline."
    ],
    recommendedItemIds: ["divine_sword", "devil_blade", "claw_wand"]
  },
  shadowcrawler: {
    description: "Assassin Feathered 3 vàng — nhảy backline, burst carry địch.",
    skill: {
      name: "Shadow Step",
      type: "Chủ động",
      desc: "Nhảy tới kẻ địch có máu thấp nhất, gây sát thương vật lý lớn."
    },
    stats: { hp: [650, 1170, 2340], atk: [72, 130, 260], armor: 25, mr: 15 },
    tacticalNotes: [
      "Đặt góc để nhảy đúng carry địch.",
      "Crystal Sword và Devil Blade tối ưu burst."
    ],
    recommendedItemIds: ["crystal_sword", "devil_blade", "broken_sword"]
  },
  flame_wizard: {
    description: "Mage Human 2 vàng — AOE phép cho đội hình Mage.",
    skill: {
      name: "Flame Burst",
      type: "Chủ động",
      desc: "Gây sát thương phép lên khu vực và thiêu đốt theo thời gian."
    },
    stats: { hp: [620, 1116, 2232], atk: [58, 104, 208], armor: 18, mr: 30 },
    tacticalNotes: [
      "Giữ 6 Mage nếu có thể để tăng sát thương phép.",
      "Magicka Crystal ưu tiên để cast liên tục."
    ],
    recommendedItemIds: ["magicka_crystal", "crystal_sword", "shadow_edge"]
  },
  helicopter: {
    description: "Mech Dwarf 5 vàng — sát thương vật lý từ xa, core đội Dwarf Mech.",
    skill: {
      name: "Rocket Barrage",
      type: "Chủ động",
      desc: "Bắn loạt tên lửa lên khu vực, gây sát thương vật lý diện rộng."
    },
    stats: { hp: [820, 1476, 2952], atk: [75, 135, 270], armor: 30, mr: 20 },
    tacticalNotes: [
      "Đặt backline an toàn — range xa nhưng dễ bị Assassin dive.",
      "Mjollnir hoặc Devil Blade cho damage scale."
    ],
    recommendedItemIds: ["mjollnir", "devil_blade", "crystal_sword"]
  },
  tsunami_stalker: {
    description: "Hunter Marine 5 vàng — sustained DPS và counter Assassin.",
    skill: {
      name: "Tsunami Shot",
      type: "Chủ động",
      desc: "Bắn sóng nước xuyên thấu, gây sát thương và làm chậm."
    },
    stats: { hp: [780, 1404, 2808], atk: [78, 140, 280], armor: 22, mr: 25 },
    tacticalNotes: [
      "Kết hợp 6 Hunter để tăng tốc đánh toàn đội.",
      "Item attack speed và crit tối ưu output."
    ],
    recommendedItemIds: ["mjollnir", "devil_blade", "crystal_sword"]
  },
  god_of_war: {
    description: "Warrior Divinity 3 vàng — frontline trung tầm cho đội hình Divinity.",
    skill: {
      name: "War Cry",
      type: "Chủ động",
      desc: "Tăng giáp và gây sát thương vật lý lên kẻ địch gần."
    },
    stats: { hp: [720, 1296, 2592], atk: [52, 94, 188], armor: 35, mr: 15 },
    tacticalNotes: [
      "Giữ 2 Divinity để tận dụng giảm cooldown.",
      "Claw Wand hoặc regen item giúp trụ lane."
    ],
    recommendedItemIds: ["claw_wand", "ring_of_regen", "broken_sword"]
  },
  werewolf: {
    description: "Warrior lai Human/Beast — carry Warrior phổ biến trong comp 9 Warrior.",
    skill: { name: "Feral Rage", type: "Chủ động", desc: "Biến hình và tăng sát thương vật lý đáng kể." },
    tacticalNotes: ["Core carry comp 9 Warrior.", "Devil Blade hoặc Divine Sword cho late game."],
    recommendedItemIds: ["devil_blade", "divine_sword", "satanic_mask"]
  },
  berserker: {
    description: "Glacier Warrior 3 vàng — frontline damage cho comp Warrior.",
    skill: { name: "Berserk", type: "Chủ động", desc: "Tăng tốc đánh và sát thương khi máu thấp." },
    tacticalNotes: ["Lấp slot Warrior mid game.", "Kết hợp Glacier synergy nếu có."],
    recommendedItemIds: ["devil_blade", "claw_wand", "ring_of_regen"]
  },
  dwarf_sniper: {
    description: "Hunter Dwarf 2 vàng — carry Hunter range, core comp 6 Hunter.",
    skill: { name: "Piercing Shot", type: "Chủ động", desc: "Bắn xuyên thấu gây sát thương lên nhiều mục tiêu." },
    tacticalNotes: ["Carry chính comp Hunter.", "Maelstrom/Mjollnir tối ưu DPS."],
    recommendedItemIds: ["mjollnir", "ghost_shard", "crystal_sword"]
  },
  wind_ranger: {
    description: "Hunter Feathered 3 vàng — DPS range cho comp Hunter.",
    skill: { name: "Gale Arrow", type: "Chủ động", desc: "Bắn mũi tên gió gây sát thương diện rộng." },
    recommendedItemIds: ["ghost_shard", "crystal_sword", "mjollnir"]
  },
  egersis_ranger: {
    description: "Hunter Egersis 1 vàng — filler Hunter rẻ cho comp 6 Hunter 2 Egersis.",
    skill: { name: "Soul Arrow", type: "Chủ động", desc: "Bắn mũi tên gây sát thương vật lý." },
    recommendedItemIds: ["broken_sword", "ghost_shard"]
  },
  soul_reaper: {
    description: "Warlock Egersis 4 vàng — backline Warlock cho comp Hunter/Egersis.",
    skill: { name: "Soul Harvest", type: "Chủ động", desc: "Hút máu và gây sát thương phép lên mục tiêu." },
    recommendedItemIds: ["crystal_sword", "magicka_crystal"]
  },
  abyssalcrawler: {
    description: "Assassin Marine 2 vàng — Assassin mid game cho comp 6 Assassin.",
    skill: { name: "Abyssal Strike", type: "Chủ động", desc: "Lao tới backline gây sát thương burst." },
    recommendedItemIds: ["crystal_sword", "shadow_edge", "devil_blade"]
  },
  venom: {
    description: "Assassin Dragon 3 vàng — burst Assassin cho comp 6 Assassin.",
    skill: { name: "Venom Strike", type: "Chủ động", desc: "Gây sát thương lớn và poison mục tiêu." },
    recommendedItemIds: ["crystal_sword", "devil_blade", "shadow_edge"]
  },
  shining_assassin: {
    description: "Assassin Feathered 4 vàng — carry Assassin late game.",
    skill: { name: "Shining Blade", type: "Chủ động", desc: "Nhảy và gây sát thương chí mạng lên backline." },
    recommendedItemIds: ["crystal_sword", "devil_blade", "divine_sword"]
  },
  razorclaw: {
    description: "Druid Beast 4 vàng — frontline Druid cho comp Assassin.",
    skill: { name: "Razor Claw", type: "Chủ động", desc: "Quét móng vuốt gây sát thương vật lý diện rộng." },
    recommendedItemIds: ["claw_wand", "devil_blade"]
  },
  thunder_spirit: {
    description: "Mage Spirits 3 vàng — Mage core cho comp 9 Mage.",
    skill: { name: "Thunder Bolt", type: "Chủ động", desc: "Gọi sét gây sát thương phép lên khu vực." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword", "mjollnir"]
  },
  tortola_elder: {
    description: "Mage Human 4 vàng — Mage AOE cho comp 9 Mage.",
    skill: { name: "Arcane Surge", type: "Chủ động", desc: "Gây sát thương phép lên toàn bộ kẻ địch trong phạm vi." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword"]
  },
  grimtouch: {
    description: "Wizard Demon 4 vàng — Wizard burst cho comp Mage/Wizard.",
    skill: { name: "Grim Touch", type: "Chủ động", desc: "Gây sát thương phép và làm suy yếu kẻ địch." },
    recommendedItemIds: ["magicka_crystal", "crystal_sword"]
  }
};
function buildHeroEnrichments() {
  const imported = dragonestEnrichments;
  const result = {};
  for (const hero of HEROES_BASE) {
    const fromDragonest = imported[hero.id] ?? {};
    const manual = HERO_MANUAL_ENRICHMENTS[hero.id] ?? {};
    result[hero.id] = {
      ...manual,
      ...fromDragonest,
      description: manual.description ?? fromDragonest.description,
      tacticalNotes: manual.tacticalNotes ?? fromDragonest.tacticalNotes,
      recommendedItemIds: manual.recommendedItemIds ?? fromDragonest.recommendedItemIds
    };
  }
  return result;
}
const HERO_ENRICHMENTS = buildHeroEnrichments();
const HEROES = HEROES_BASE.map((hero) => ({
  ...hero,
  ...HERO_ENRICHMENTS[hero.id] ?? {}
}));
const HERO_ID_ALIASES = {
  falling_witcher: "fallen_witcher",
  lightblade_knight: "light_blade",
  shadow_crawler: "shadowcrawler"
};
const RACE_NAME_ALIASES = {
  "Cave Clan": "Cave",
  Spirit: "Spirits"
};
const CLASS_NAME_ALIASES = {};
const ITEMS = [
  {
    id: "broken_sword",
    name: "Broken Sword",
    tier: 1,
    category: "attack",
    stats: "+20 Sát thương vật lý",
    description: "Trang bị tấn công cơ bản cho carry vật lý giai đoạn đầu trận.",
    effect: "Tăng sát thương vật lý thuần, phù hợp làm đồ khởi đầu trước khi chuyển sang item tier cao.",
    tacticalNotes: [
      "Ưu tiên cho carry vật lý 1–2 vàng khi chưa có nguồn sát thương ổn định.",
      "Thay thế sớm khi có Shadow Edge hoặc Crystal Sword để tối ưu slot.",
      "Không giữ quá lâu trên tank — slot trang bị carry quý hơn."
    ],
    recommendedHeroIds: ["soul_breaker", "swordman", "dwarf_sniper"],
    tags: ["Early game", "Physical"]
  },
  {
    id: "wooden_club",
    name: "Wooden Club",
    tier: 1,
    category: "attack",
    stats: "+5 Sát thương vật lý",
    description: "Item tier thấp nhất, bổ sung chút sát thương cho tướng frontline hoặc carry tạm.",
    tacticalNotes: [
      "Chỉ dùng khi thiếu item tốt hơn ở round đầu.",
      "Phù hợp gắn tạm cho Warrior cần thêm damage nhẹ."
    ],
    recommendedHeroIds: ["tusk_champion", "swordman", "redaxe_chief"],
    tags: ["Early game"]
  },
  {
    id: "ring_of_regen",
    name: "Ring of Regeneration",
    tier: 1,
    category: "defense",
    stats: "+10 Hồi máu/s",
    description: "Hồi máu theo thời gian, giúp frontline trụ lâu hơn trong giao tranh kéo dài.",
    effect: "Regen liên tục — hiệu quả khi tướng có máu cao và bị focus nhiều đòn.",
    tacticalNotes: [
      "Gắn cho tank hoặc carry có khả năng sống sót để tận dụng regen.",
      "Kết hợp tốt với đội hình Warrior/Knight cần giữ tuyến trước."
    ],
    recommendedHeroIds: ["tusk_champion", "abyssal_guard", "evil_knight"],
    tags: ["Tank", "Sustain"]
  },
  {
    id: "cattlehide_armor",
    name: "Cattlehide Armor",
    tier: 1,
    category: "defense",
    stats: "+5 Giáp",
    description: "Giáp cơ bản cho tuyến trước, giảm sát thương vật lý nhận vào.",
    tacticalNotes: [
      "Ưu tiên cho frontline round đầu khi chưa có Claw Wand hoặc Satanic Mask.",
      "Hiệu quả hơn trên tướng có nhiều slot trang bị phòng thủ."
    ],
    recommendedHeroIds: ["tusk_champion", "evil_knight", "abyssal_guard"],
    tags: ["Tank", "Early game"]
  },
  {
    id: "magicka_crystal",
    name: "Magicka Crystal",
    tier: 1,
    category: "magic",
    stats: "+100 Năng lượng",
    description: "Tăng năng lượng tối đa, giúp Mage cast skill nhanh hơn.",
    effect: "Năng lượng thêm giúp tướng phép ra chiêu sớm hơn một nhịp trong combat.",
    tacticalNotes: [
      "Bắt buộc consider cho Mage carry cần ult sớm (Thunder Spirit, God of Thunder).",
      "Giữ trên support Mage nếu carry đã đủ item damage."
    ],
    recommendedHeroIds: ["god_of_thunder", "thunder_spirit", "the_source"],
    tags: ["Mage", "Early game"]
  },
  {
    id: "rune_hammer",
    name: "Rune Hammer",
    tier: 2,
    category: "attack",
    stats: "+15 Sát thương, +10% Hút máu",
    description: "Kết hợp damage và lifesteal — lựa chọn cân bằng cho carry vật lý mid game.",
    effect: "Hút máu giúp carry tự hồi máu khi gây sát thương liên tục.",
    tacticalNotes: [
      "Tốt cho Hunter và Warrior carry cần sustain trong combat dài.",
      "Bước đệm hợp lý trước Devil Blade hoặc Satanic Mask."
    ],
    recommendedHeroIds: ["redaxe_chief", "god_of_war", "dwarf_sniper"],
    tags: ["Physical", "Lifesteal"]
  },
  {
    id: "ghost_shard",
    name: "Ghost Shard",
    tier: 2,
    category: "attack",
    stats: "+15% Tốc độ đánh",
    description: "Tăng tốc độ đánh — tăng DPS và tần suất proc hiệu ứng đòn đánh.",
    tacticalNotes: [
      "Ưu tiên cho Hunter và Assassin phụ thuộc auto-attack.",
      "Kết hợp mạnh với item crit hoặc on-hit như Maelstrom."
    ],
    recommendedHeroIds: ["shining_archer", "wind_ranger", "shadowcrawler"],
    tags: ["Attack speed", "Carry"]
  },
  {
    id: "claw_wand",
    name: "Claw Wand",
    tier: 2,
    category: "defense",
    stats: "+10 Giáp, Kháng phép",
    description: "Hybrid phòng thủ vật lý và phép — lý tưởng cho frontline đa nhiệm.",
    effect: "Kháng phép giảm sát thương từ Mage và skill burst.",
    tacticalNotes: [
      "Gắn cho tank trong meta Mage/Assassin nhiều.",
      "Bước trung gian trước Satanic Mask nếu cần survivability."
    ],
    recommendedHeroIds: ["evil_knight", "abyssal_guard", "tusk_champion"],
    tags: ["Tank", "Anti-magic"]
  },
  {
    id: "shadow_edge",
    name: "Shadow Edge",
    tier: 3,
    category: "attack",
    stats: "+40 Sát thương vật lý, +10% Tốc đánh",
    description: "Core item carry vật lý mid–late game với damage và attack speed cân bằng.",
    tacticalNotes: [
      "Item chủ lực cho Assassin và Hunter carry.",
      "Ưu tiên nâng cấp lên Devil Blade hoặc Divine Sword khi có cơ hội.",
      "Không chia cho nhiều tướng — tập trung một carry chính."
    ],
    recommendedHeroIds: ["shadowcrawler", "shining_assassin", "soul_breaker"],
    tags: ["Carry", "Core"]
  },
  {
    id: "mali_wand",
    name: "Maelstrom",
    tier: 3,
    category: "magic",
    stats: "+20 Sát thương. Đánh lan sấm sét.",
    description: "On-hit lightning chain — mạnh khi đội có nhiều đòn đánh hoặc attack speed cao.",
    effect: "Đòn đánh lan sấm sét tới kẻ địch xung quanh, tăng DPS diện rộng.",
    tacticalNotes: [
      "Tuyệt vời trên Hunter 6 hoặc carry có attack speed cao.",
      "Nâng cấp tự nhiên lên Mjollnir cho late game.",
      "Ít hiệu quả trên Mage thuần skill."
    ],
    recommendedHeroIds: ["dwarf_sniper", "shining_archer", "wind_ranger"],
    tags: ["On-hit", "AoE"]
  },
  {
    id: "crystal_sword",
    name: "Crystal Sword",
    tier: 3,
    category: "attack",
    stats: "+30 Sát thương, +15% Chí mạng",
    description: "Burst damage cao với crit — carry Assassin/Hunter spike damage.",
    tacticalNotes: [
      "Core cho Assassin cần one-shot backline.",
      "Kết hợp positioning tốt để crit vào mục tiêu ưu tiên."
    ],
    recommendedHeroIds: ["shadowcrawler", "shining_assassin", "razorclaw"],
    tags: ["Crit", "Burst"]
  },
  {
    id: "devil_blade",
    name: "Devil Blade",
    tier: 4,
    category: "attack",
    stats: "+50% Hút máu, +30 Sát thương",
    description: "Item carry tier cao với lifesteal mạnh — sustain và damage đồng thời.",
    effect: "Hút máu 50% giúp carry sống sót qua burst và combat kéo dài.",
    tacticalNotes: [
      "Ưu tiên cho carry chính Warrior/Hunter khi đã có economy ổn.",
      "Thay thế Rune Hammer và Broken Sword trên cùng một carry.",
      "Cân nhắc Divine Sword nếu đối thủ stack né tránh cao."
    ],
    recommendedHeroIds: ["god_of_war", "redaxe_chief", "werewolf"],
    tags: ["Core", "Lifesteal", "Late game"]
  },
  {
    id: "satanic_mask",
    name: "Satanic Mask",
    tier: 4,
    category: "defense",
    stats: "+400 Máu, +20% Hút máu",
    description: "Tank item mạnh — máu cao kèm lifesteal cho frontline bất tử.",
    effect: "Pool máu lớn + hút máu biến tank thành nguồn sustain cho cả đội.",
    tacticalNotes: [
      "Gắn cho Warrior/Knight frontline chính trong comp 9 Warrior.",
      "Giữ carry slot damage riêng — đừng lấy Satanic Mask thay item DPS."
    ],
    recommendedHeroIds: ["god_of_war", "tusk_champion", "doom_arbiter"],
    tags: ["Tank", "Late game"]
  },
  {
    id: "divine_sword",
    name: "Divine Sword",
    tier: 5,
    category: "attack",
    stats: "+40 Sát thương, True Strike",
    description: "Item carry đỉnh cao — damage cao và True Strike bỏ qua né tránh.",
    effect: "True Strike — mọi đòn đánh trúng mục tiêu, không thể miss.",
    tacticalNotes: [
      "Bắt buộc consider khi đối thủ chơi Feathered hoặc comp né tránh cao.",
      "Chỉ gắn một carry chính — đừng phân tán item tier 5.",
      "Kết hợp positioning để carry True Strike focus backline."
    ],
    recommendedHeroIds: ["god_of_war", "redaxe_chief", "shining_assassin"],
    tags: ["Core", "True Strike", "Late game"]
  },
  {
    id: "mjollnir",
    name: "Mjollnir",
    tier: 5,
    category: "magic",
    stats: "+40 Sát thương, +40% Tốc đánh. Sấm sét lan.",
    description: "Phiên bản nâng cấp Maelstrom — chain lightning mạnh với attack speed cao.",
    effect: "Sấm sét lan khi đánh — DPS AoE cực mạnh trên carry attack speed.",
    tacticalNotes: [
      "Best-in-slot cho Hunter carry trong comp 6 Hunter.",
      "Nâng cấp từ Maelstrom khi carry đã có slot ổn định.",
      "Cần bảo vệ carry — item vô dụng nếu carry chết sớm."
    ],
    recommendedHeroIds: ["dwarf_sniper", "shining_archer", "tsunami_stalker"],
    tags: ["Core", "AoE", "Late game"]
  },
  {
    id: "reincarnation_orb",
    name: "Reincarnation Orb",
    tier: 6,
    category: "utility",
    stats: "Hồi sinh 1 lần với 400 máu",
    description: "Item hiếm nhất — hồi sinh một lần, cứu carry hoặc tank khỏi burst fatal.",
    effect: "Hồi sinh với 400 HP khi bị hạ gục — chỉ kích hoạt một lần mỗi trận combat.",
    tacticalNotes: [
      "Ưu tiên carry hoặc tank quan trọng nhất — không gắn support phụ.",
      "Giá trị cao nhất khi đối thủ có burst Assassin/Mage.",
      "Positioning vẫn quan trọng — 400 HP có thể chết lại ngay nếu bị focus."
    ],
    recommendedHeroIds: ["god_of_war", "god_of_thunder", "the_source"],
    tags: ["Revive", "Legendary", "Late game"]
  }
];
const COMPS = [
  {
    id: "comp_1",
    name: "9 Warrior",
    author: "PlayerOne",
    tier: "S",
    winRate: "24.3%",
    likes: "8.9K",
    desc: "Đội hình 9 Warrior với khả năng chống chịu cực mạnh và sát thương ổn định. Ưu tiên lên cấp 9 sớm và tìm kiếm các tướng 4-5 vàng.",
    heroes: [
      "redaxe_chief",
      "tusk_champion",
      "swordman",
      "abyssal_guard",
      "pirate_captain",
      "doom_arbiter",
      "god_of_war",
      "werewolf",
      "berserker"
    ],
    board: {
      2: "tusk_champion",
      3: "swordman",
      4: "abyssal_guard",
      10: "redaxe_chief",
      11: "god_of_war",
      12: "werewolf",
      19: "berserker",
      20: "pirate_captain",
      27: "doom_arbiter"
    },
    synergies: [
      { name: "9 Warrior", desc: "Tất cả đồng minh +20 giáp", active: true },
      { name: "2 Beast", desc: "Tất cả đồng minh +10% sát thương vật lý", active: true },
      { name: "2 Human", desc: "Tất cả Human 20% câm lặng", active: true }
    ],
    date: "20/05/2024"
  },
  {
    id: "comp_2",
    name: "6 Hunter 2 Egersis",
    author: "JustWin",
    tier: "A",
    winRate: "21.6%",
    likes: "7.4K",
    desc: "Đội hình Hunter bắn tỉa mạnh về late game, kẹp Egersis trừ giáp để tối ưu hóa sát thương vật lý.",
    heroes: [
      "dwarf_sniper",
      "shining_archer",
      "wind_ranger",
      "siren",
      "tsunami_stalker",
      "egersis_ranger",
      "evil_knight",
      "soul_reaper"
    ],
    board: {
      3: "evil_knight",
      11: "soul_reaper",
      18: "siren",
      19: "tsunami_stalker",
      24: "dwarf_sniper",
      25: "shining_archer",
      26: "wind_ranger",
      27: "egersis_ranger"
    },
    synergies: [
      { name: "6 Hunter", desc: "Tất cả Hunter +80 sát thương và +65% tỉ lệ chính xác", active: true },
      { name: "2 Egersis", desc: "Tất cả kẻ địch trừ 4 giáp", active: true }
    ],
    date: "19/05/2024"
  },
  {
    id: "comp_3",
    name: "6 Assassin",
    author: "ImBaDude",
    tier: "A",
    winRate: "19.8%",
    likes: "6.2K",
    desc: "Dồn sát thương tuyến sau cục mạnh. Cần lên 3 sao các tướng quan trọng như Shadowcrawler, Water Spirit.",
    heroes: [
      "soul_breaker",
      "water_spirit",
      "abyssalcrawler",
      "shadowcrawler",
      "venom",
      "shining_assassin",
      "warpwood_sage",
      "razorclaw"
    ],
    board: {
      2: "warpwood_sage",
      4: "venom",
      10: "water_spirit",
      12: "soul_breaker",
      24: "shadowcrawler",
      25: "abyssalcrawler",
      26: "shining_assassin",
      27: "razorclaw"
    },
    synergies: [
      { name: "6 Assassin", desc: "Tất cả Assassin 30% cơ hội gây x4 sát thương", active: true },
      { name: "3 Feathered", desc: "Tất cả Feathered 20% né tránh", active: true }
    ],
    date: "18/05/2024"
  },
  {
    id: "comp_4",
    name: "9 Mage",
    author: "Lucifer",
    tier: "B",
    winRate: "18.7%",
    likes: "5.7K",
    desc: "Sát thương phép diện rộng hủy diệt bàn cờ trong tíc tắc. Rất khó build nhưng đạt đỉnh thì vô đối.",
    heroes: [
      "winter_chiropteran",
      "the_source",
      "flame_wizard",
      "thunder_spirit",
      "tortola_elder",
      "god_of_thunder",
      "grand_herald",
      "grimtouch",
      "pirate_captain"
    ],
    board: {
      2: "pirate_captain",
      3: "tortola_elder",
      4: "grand_herald",
      10: "grimtouch",
      11: "thunder_spirit",
      24: "winter_chiropteran",
      25: "the_source",
      26: "flame_wizard",
      27: "god_of_thunder"
    },
    synergies: [
      { name: "9 Mage", desc: "Tất cả kẻ địch -145% kháng phép", active: true },
      { name: "3 Human", desc: "Tất cả Human 40% câm lặng", active: true }
    ],
    date: "17/05/2024"
  }
];
const SAMPLE_CONTENT_1 = `## Tổng quan mùa S20

Mùa giải S20 mang đến nhiều thay đổi về kinh tế và meta. Bài viết tóm tắt lộ trình leo rank hiệu quả cho người mới và kỳ cựu.

### Giai đoạn early game

- Ưu tiên **2–3 synergy** ổn định trước khi roll.
- Giữ ít nhất **10 gold** interest mỗi round khi có thể.
- Quan sát lobby: nếu nhiều người chơi cùng hệ, hãy pivot sớm.

### Giai đoạn mid game

| Mốc level | Hành động |
|-----------|-----------|
| Level 6 | Hoàn thiện frontline |
| Level 7 | Roll nhẹ tìm carry 2 sao |
| Level 8 | Chốt carry 3 sao hoặc 4-cost |

> **Mẹo:** Đừng roll all-in trước khi biết đối thủ đang build gì.

### Late game

Khi vào top 4, positioning quyết định 50% trận. Hãy dùng công cụ **Tìm đội hình** trên site để so khớp counter.

---

Chúc các bạn leo rank vui vẻ!`;
const SAMPLE_CONTENT_2 = `## Top meta hiện tại

Dưới đây là các đội hình có tỷ lệ thắng cao trên server VN tuần này.

1. **9 Warrior** — frontline cực dày, counter Mage.
2. **6 Hunter + 2 Ranger** — burst physical mạnh.
3. **4 Marine + 3 Mage** — khống chế + sustain.

### Cách counter

- Warrior: dùng **% HP damage** hoặc Assassin dive backline.
- Hunter: giảm heal, burst nhanh trước khi họ scale.

\`\`\`text
Lưu ý: meta thay đổi sau mỗi patch — theo dõi trang Tin tức.
\`\`\``;
const SAMPLE_CONTENT_3 = `## Patch 20.5 — Điểm nổi bật

### Thay đổi tướng

- **Marine Lord**: giảm armor bonus 15% → 12%.
- **Feathered**: tăng dodge cap.

### Thay đổi trang bị

- *Kiếm Quỷ*: +40 → +45 physical damage.

### Kết luận

Meta sẽ nghiêng về physical carry trong 1–2 tuần. Cập nhật đội hình yêu thích trên trang **Đội hình** của bạn.`;
const DEFAULT_POSTS = [
  {
    id: "1",
    title: "Hướng dẫn leo rank hiệu quả mùa S20",
    author: "Admin",
    category: "Hướng dẫn",
    views: "12K",
    status: "Xuất bản",
    date: "20/05/2024",
    image: "bg-brand-red",
    excerpt: "Lộ trình leo rank từ Bronze đến King: kinh tế, pivot và positioning cho mùa S20.",
    content: SAMPLE_CONTENT_1
  },
  {
    id: "2",
    title: "Top 10 đội hình mạnh nhất meta hiện tại",
    author: "PlayerOne",
    category: "Chiến thuật",
    views: "8.5K",
    status: "Xuất bản",
    date: "19/05/2024",
    image: "bg-blue-600",
    excerpt: "Danh sách đội hình tier S–A và cách counter phổ biến trên server VN.",
    content: SAMPLE_CONTENT_2
  },
  {
    id: "3",
    title: "Phân tích chi tiết bản cập nhật 20.5",
    author: "Admin",
    category: "Tin tức",
    views: "5.2K",
    status: "Xuất bản",
    date: "18/05/2024",
    image: "bg-indigo-600",
    excerpt: "Tóm tắt thay đổi tướng, trang bị và dự đoán meta sau patch 20.5.",
    content: SAMPLE_CONTENT_3
  },
  {
    id: "4",
    title: "Mẹo quản lý kinh tế hiệu quả",
    author: "JustWin",
    category: "Mẹo chơi",
    views: "4K",
    status: "Bản nháp",
    date: "18/05/2024",
    image: "bg-green-600",
    excerpt: "Interest, streak và thời điểm roll để tối ưu gold mỗi trận.",
    content: "## Kinh tế cơ bản\n\nGiữ streak win/loss và interest 50 gold khi có thể."
  },
  {
    id: "5",
    title: "Giới thiệu tướng mới: xxx",
    author: "Admin",
    category: "Tin tức",
    views: "20",
    status: "Chờ duyệt",
    date: "17/05/2024",
    image: "bg-yellow-600",
    excerpt: "Preview tướng mới sắp ra mắt — skill và synergy dự kiến.",
    content: "Nội dung đang được biên tập."
  }
];
const DEFAULT_BANNERS = [
  {
    id: "1",
    title: "Autochess Meta",
    subtitle: "Nơi cập nhật chiến thuật & meta mạnh nhất",
    description: "Khám phá, chia sẻ và bình chọn những đội hình mạnh nhất từ cộng đồng.",
    image: "https://yt3.ggpht.com/iTJyyUiZv3dQgzitw5Qh1ZQe4Kx5IZGvJEQY1N4_UIGrxCdg2v_oib5R7zMIBnn6VMVlo2AQSRUWMA=s1600-rw-nd-v1",
    primaryButtonText: "KHÁM PHÁ ĐỘI HÌNH",
    primaryButtonLink: "/doi-hinh",
    secondaryButtonText: "TẠO ĐỘI HÌNH",
    secondaryButtonLink: "/cong-cu",
    status: "Hiện"
  },
  {
    id: "2",
    title: "Tuyển cộng tác viên",
    subtitle: "Cộng đồng cùng xây dựng meta",
    description: "Không phải tuyển dụng nhân viên, chúng tôi tìm kiếm những game thủ kỳ cựu cùng tham gia cập nhật và phát triển dữ liệu chung.",
    image: "https://yt3.ggpht.com/zLnhIYLvs1vxHVia2r2t42Qt54HY3VRDELgvU7v0bnznPmHzAuLVs9ejhm5xKlk1ID6H4f2_xAAqYD4=s1600-rw-nd-v1",
    primaryButtonText: "ĐĂNG KÝ NGAY",
    primaryButtonLink: "#",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    status: "Hiện"
  }
];
const DEFAULT_RELICS = [
  {
    id: "1",
    name: "Nhẫn Băng",
    effect: "Tăng 20% giáp cho đồng minh xung quanh",
    rating: "S",
    tier: 1,
    type: "Phòng thủ",
    status: "Hiện"
  },
  {
    id: "2",
    name: "Kiếm Quỷ",
    effect: "Tăng 50 sát thương vật lý",
    rating: "A",
    tier: 2,
    type: "Tấn công",
    status: "Hiện"
  },
  {
    id: "3",
    name: "Gậy Thần",
    effect: "Tăng 30% sát thương kỹ năng",
    rating: "S",
    tier: 1,
    type: "Phép thuật",
    status: "Hiện"
  }
];
const DEFAULT_COMMENTS = [
  {
    id: "1",
    threadId: "1",
    author: "GamerPro99",
    avatar: "GP",
    target: "Đội hình Sát Thủ",
    content: "Đội hình này cực lỗi sát thương luôn, vừa lật kèo top 8 lên top 1!",
    date: "20/05/2024",
    status: "Chờ duyệt"
  },
  {
    id: "2",
    threadId: "1",
    author: "MetaMaster",
    avatar: "MM",
    target: "9 Warrior",
    content: "Thử đội hình 6 Mage + 2 Warlock, burst magic xuyên giáp khá tốt.",
    date: "20/05/2024",
    status: "Đã duyệt"
  },
  {
    id: "3",
    threadId: "1",
    author: "Top4King",
    avatar: "TK",
    target: "9 Warrior",
    content: "9 Warrior late game khó bị one-shot nếu có đủ CC. Chú ý item giảm hồi chiêu.",
    date: "19/05/2024",
    status: "Đã duyệt"
  },
  {
    id: "4",
    threadId: "2",
    author: "LeoRankDem",
    avatar: "RD",
    target: "Gậy Thần (Relic)",
    content: "Mới test thử, kích pháp có vẻ mượt mà dồn dmg bá đạo thật sự.",
    date: "19/05/2024",
    status: "Đã duyệt"
  },
  {
    id: "5",
    threadId: "3",
    author: "NoobPlayer01",
    avatar: "NP",
    target: "Đội hình Hoang Dã",
    content: "Sao mốc kích 4 hoang dã đánh chậm thế nhỉ, có ai bị lỗi giống vậy ko?",
    date: "18/05/2024",
    status: "Đã duyệt"
  },
  {
    id: "6",
    threadId: "1",
    author: "toxic_user_anti",
    avatar: "TU",
    target: "Kiếm Quỷ",
    content: "Vật phẩm rác rưởi, cân bằng quá tệ, khuyên ae đừng xài phí thời gian.",
    date: "18/05/2024",
    status: "Báo cáo"
  },
  {
    id: "7",
    threadId: "1",
    parentId: "2",
    author: "WarriorFan",
    avatar: "WF",
    target: "9 Warrior",
    content: "6 Mage + 2 Warlock mình thử rồi, khá ổn nếu có đủ CC.",
    date: "20/05/2024",
    status: "Đã duyệt"
  }
];
const DEFAULT_COMMUNITY_POSTS = [
  {
    id: "1",
    author: "AutoChessGod",
    avatar: "bg-brand-gold",
    title: "Tại sao 9 Warrior đang bá đạo ở patch này?",
    content: "Mọi người cho mình hỏi với lượng giáp khổng lồ từ 9 Warrior, có đội hình nào thuần phép hoặc sát thương chuẩn có thể xuyên qua được không?",
    time: "2 giờ trước",
    likes: 142,
    comments: 34,
    tags: ["Thảo luận", "Meta"]
  },
  {
    id: "2",
    author: "NewbieTFT",
    avatar: "bg-brand-green",
    title: "Cần hướng dẫn cách xếp bài late game",
    content: "Mình thường xuyên lọt top 4 nhưng toàn thua ở round quyết định vì xếp bài sai. Cụ thể là cách đặt position cho Assassin và chống Assassin như thế nào?",
    time: "5 giờ trước",
    likes: 56,
    comments: 12,
    tags: ["Người mới", "Hướng dẫn"]
  },
  {
    id: "3",
    author: "MageSlayer",
    avatar: "bg-tier-b",
    title: "Trải nghiệm thử giáo án 6 Marine - Quá khủng!",
    content: "Hôm nay mình test 6 Marine kẹp với 3 Hunter. Bọn Mage bên kia tung skill như muỗi đốt inox. Khuyên anh em rank dưới nên thử.",
    time: "1 ngày trước",
    likes: 230,
    comments: 89,
    tags: ["Đội hình dị", "Review"]
  }
];
const DEFAULT_TEAM_MEMBERS = [
  {
    id: "1",
    name: "Admin",
    role: "Sáng lập & Quản trị",
    avatar: "bg-brand-gold",
    bio: "Xây dựng Auto Chess Mobile VN — nơi cập nhật meta, đội hình và công cụ cho kỳ thủ Việt.",
    socialUrl: "https://facebook.com",
    order: 1,
    status: "Hiện"
  },
  {
    id: "2",
    name: "MetaMaster",
    role: "Biên tập Meta",
    avatar: "bg-tier-b",
    bio: "Theo dõi patch notes, phân tích tier list và duy trì dữ liệu đội hình meta hàng tuần.",
    order: 2,
    status: "Hiện"
  },
  {
    id: "3",
    name: "PlayerOne",
    role: "Cộng tác viên",
    avatar: "bg-brand-green",
    bio: "Đóng góp giáo án leo rank và hướng dẫn người mới từ trải nghiệm thực chiến server VN.",
    order: 3,
    status: "Hiện"
  }
];
const DEFAULT_COMMUNITY_CHANNELS = [
  {
    id: "1",
    platform: "youtube",
    name: "Yequen",
    url: "https://youtube.com",
    highlight: "Cao thủ",
    description: "Kênh cao thủ leo rank — học positioning, kinh tế và pivot meta từ góc nhìn top server VN.",
    order: 1,
    status: "Hiện"
  },
  {
    id: "2",
    platform: "youtube",
    name: "AutoChess VN Guide",
    url: "https://youtube.com",
    highlight: "Hướng dẫn",
    description: "Series hướng dẫn từng bước cho người mới, giải thích synergy và item build cơ bản.",
    order: 2,
    status: "Hiện"
  },
  {
    id: "3",
    platform: "tiktok",
    name: "TFT Tips VN",
    url: "https://tiktok.com",
    highlight: "Tips nhanh",
    description: "Clip ngắn meta mới, mẹo xếp bài và counter đội hình phổ biến — xem trong 1 phút.",
    order: 1,
    status: "Hiện"
  },
  {
    id: "4",
    platform: "facebook",
    name: "Auto Chess Mobile VN",
    url: "https://facebook.com",
    highlight: "Cộng đồng chính",
    description: "Group thảo luận meta, hỏi đáp nhanh và cập nhật sự kiện từ cộng đồng game thủ.",
    order: 1,
    status: "Hiện"
  },
  {
    id: "5",
    platform: "discord",
    name: "Auto Chess VN Discord",
    url: "https://discord.com",
    highlight: "Chat trực tiếp",
    description: "Kênh chat real-time, chia sẻ comp và nhận feedback từ cao thủ trong cộng đồng.",
    order: 1,
    status: "Hiện"
  }
];
const DEFAULT_EVENTS = [
  {
    id: "1",
    title: "Auto Chess Championship 2026 - Mùa S20",
    prize: "50,000,000 VND",
    date: "25/06/2026",
    participants: "128 Kì thủ",
    status: "Cho đăng ký"
  },
  {
    id: "2",
    title: "Thách đấu Siêu Cup Sát Thủ Bóng Đêm",
    prize: "15,000,000 VND",
    date: "18/06/2026",
    participants: "64 Kì thủ",
    status: "Sắp diễn ra"
  },
  {
    id: "3",
    title: "Giao hữu Clan War - Hoang Dã Đại Chiến",
    prize: "Qua tặng Code Trân Bảo",
    date: "12/06/2026",
    participants: "16 Clan",
    status: "Kết thúc"
  }
];
const DEFAULT_MEDIA = [
  {
    id: "1",
    name: "banner_championship_s20.png",
    category: "Banners",
    size: "1.2 MB",
    url: "https://yt3.ggpht.com/iTJyyUiZv3dQgzitw5Qh1ZQe4Kx5IZGvJEQY1N4_UIGrxCdg2v_oib5R7zMIBnn6VMVlo2AQSRUWMA=s1600-rw-nd-v1",
    alt: "Banner Championship S20",
    uploadedAt: "15/05/2024"
  },
  {
    id: "2",
    name: "banner_recruitment_collaborator.png",
    category: "Banners",
    size: "840 KB",
    url: "https://yt3.ggpht.com/zLnhIYLvs1vxHVia2r2t42Qt54HY3VRDELgvU7v0bnznPmHzAuLVs9ejhm5xKlk1ID6H4f2_xAAqYD4=s1600-rw-nd-v1",
    alt: "Banner tuyển CTV",
    uploadedAt: "14/05/2024"
  },
  {
    id: "3",
    name: "icon_kiem_quy.png",
    category: "Trang bị",
    size: "45 KB",
    url: "https://img.icons8.com/color/96/sword.png",
    alt: "Icon Kiếm Quỷ",
    uploadedAt: "12/05/2024"
  },
  {
    id: "4",
    name: "icon_nhan_bang.png",
    category: "Trang bị",
    size: "38 KB",
    url: "https://img.icons8.com/color/96/diamond-ring.png",
    alt: "Icon Nhẫn Băng",
    uploadedAt: "12/05/2024"
  },
  {
    id: "5",
    name: "sprite_sat_thu.png",
    category: "Tướng",
    size: "125 KB",
    url: "https://img.icons8.com/color/96/ninja.png",
    alt: "Sprite Sát Thủ",
    uploadedAt: "10/05/2024"
  }
];
const DEFAULT_PLAYERS = [
  { id: "1", rank: 1, name: "T_Rex_Auto", server: "VN-1", mmr: 3450, tier: "Queen", winRate: "32.4%", matches: 154 },
  { id: "2", rank: 2, name: "Shin_Z", server: "VN-1", mmr: 3390, tier: "Queen", winRate: "30.1%", matches: 142 },
  { id: "3", rank: 3, name: "Kenji_VN", server: "VN-2", mmr: 3280, tier: "Queen", winRate: "28.5%", matches: 168 },
  { id: "4", rank: 4, name: "AutoQueen99", server: "VN-1", mmr: 3120, tier: "King", winRate: "26.4%", matches: 120 },
  { id: "5", rank: 5, name: "Bao_Bao", server: "VN-3", mmr: 3050, tier: "King", winRate: "25.8%", matches: 110 }
];
const DATA_VERSION = 4;
function loadJson(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch {
  }
  return fallback;
}
function saveJson(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
  }
}
function routeKindToTraitKind(routeKind) {
  if (routeKind === "toc") return "race";
  if (routeKind === "he") return "class";
  return null;
}
function traitKindToRouteKind(kind) {
  return kind === "race" ? "toc" : "he";
}
function getTraitDetailPath(kind, id) {
  return `/toc-he/${traitKindToRouteKind(kind)}/${id}`;
}
function getTraitsListPath(tab) {
  if (!tab || tab === "all") return "/toc-he";
  return `/toc-he?tab=${tab}`;
}
function raceToTraitItem(race) {
  return {
    kind: "race",
    id: race.id,
    name: race.name,
    icon: race.icon,
    iconUrl: race.iconUrl,
    description: race.description,
    milestones: race.milestones ?? []
  };
}
function classToTraitItem(cls) {
  return {
    kind: "class",
    id: cls.id,
    name: cls.name,
    icon: cls.icon,
    iconUrl: cls.iconUrl,
    description: cls.description,
    milestones: cls.milestones ?? []
  };
}
function buildTraitItems(races, classes) {
  return [...races.map(raceToTraitItem), ...classes.map(classToTraitItem)];
}
function getTraitHeroes(trait, heroes) {
  if (trait.kind === "race") {
    return heroes.filter((h) => h.race.includes(trait.name));
  }
  return heroes.filter((h) => h.class.includes(trait.name));
}
function getTraitRelatedComps(trait, heroes, comps, limit = 4) {
  const traitHeroes = getTraitHeroes(trait, heroes);
  const traitHeroIds = new Set(traitHeroes.map((h) => h.id));
  return comps.filter((c) => c.heroes.some((hId) => traitHeroIds.has(hId))).slice(0, limit);
}
function countActiveTraits(heroIds, heroes) {
  const uniqueIds = Array.from(new Set(heroIds));
  const counts = {};
  uniqueIds.forEach((id) => {
    const hero = heroes.find((h) => h.id === id);
    if (!hero) return;
    hero.race.forEach((r) => {
      counts[r] = (counts[r] || 0) + 1;
    });
    hero.class.forEach((c) => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  return Object.entries(counts).filter(([, count]) => count > 0).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}
function filterTraits(traits, options) {
  const { search = "", tab = "all", sort = "name", heroes = [] } = options;
  const query = search.trim().toLowerCase();
  let result = traits.filter((trait) => {
    if (tab !== "all" && trait.kind !== tab) return false;
    if (!query) return true;
    return trait.name.toLowerCase().includes(query) || trait.description.toLowerCase().includes(query);
  });
  result = [...result].sort((a, b) => {
    if (sort === "heroCount") {
      const countA = getTraitHeroes(a, heroes).length;
      const countB = getTraitHeroes(b, heroes).length;
      if (countB !== countA) return countB - countA;
    }
    return a.name.localeCompare(b.name);
  });
  return result;
}
const MAGIC_CLASSES = ["Mage", "Warlock", "Shaman", "Witcher", "Priest", "Wizard"];
const TANK_CLASSES = ["Warrior", "Knight"];
function defaultHpForCost(cost) {
  const base = 500 + cost * 120;
  return [base, Math.round(base * 1.8), Math.round(base * 3.6)];
}
function defaultAtkForCost(cost) {
  const base = 40 + cost * 8;
  return [base, Math.round(base * 1.8), Math.round(base * 3.6)];
}
function normalizeRaceNames(races) {
  return races.map((r) => RACE_NAME_ALIASES[r] ?? r);
}
function normalizeClassNames(classes) {
  return classes.map((c) => CLASS_NAME_ALIASES[c] ?? c);
}
function resolveHeroId(id) {
  return HERO_ID_ALIASES[id] ?? id;
}
function migrateStoredHero(hero) {
  const canonicalId = resolveHeroId(hero.id);
  return {
    ...hero,
    id: canonicalId,
    race: normalizeRaceNames(hero.race ?? []),
    class: normalizeClassNames(hero.class ?? [])
  };
}
function isStarTuple(value) {
  return Array.isArray(value) && value.length === 3;
}
function preferStarTuple(stored, seed) {
  if (isStarTuple(stored)) return stored;
  if (isStarTuple(seed)) return seed;
  return stored ?? seed;
}
function preferHpAtkTuple(stored, seed) {
  const value = preferStarTuple(stored, seed);
  return Array.isArray(value) ? value : void 0;
}
function mergeHeroStats(stored, seed) {
  if (!seed && !stored) return void 0;
  if (!seed) return stored;
  if (!stored) return seed;
  return {
    hp: preferHpAtkTuple(stored.hp, seed.hp),
    atk: preferHpAtkTuple(stored.atk, seed.atk),
    armor: stored.armor ?? seed.armor,
    mr: stored.mr ?? seed.mr,
    atkSpeed: stored.atkSpeed ?? seed.atkSpeed,
    range: stored.range ?? seed.range
  };
}
function getHeroIconUrl(hero) {
  return hero.iconUrl ?? hero.imageUrl ?? hero.portraitUrl ?? hero.image;
}
function isHeroNew(hero) {
  return hero.isNew === true;
}
function statAtStar(value, star, fallback) {
  if (value == null) return fallback;
  if (Array.isArray(value)) return value[star - 1] ?? fallback;
  return value;
}
function resolveHeroSkill(hero, star = 1) {
  var _a, _b, _c, _d;
  if (((_a = hero.skill) == null ? void 0 : _a.desc) || ((_b = hero.skill) == null ? void 0 : _b.descByStar)) {
    const desc = ((_c = hero.skill.descByStar) == null ? void 0 : _c[star - 1]) ?? hero.skill.desc ?? ((_d = hero.skill.descByStar) == null ? void 0 : _d[0]) ?? "";
    return {
      name: hero.skill.name || "Kỹ năng đặc biệt",
      type: hero.skill.type || "Chủ động",
      desc,
      iconUrl: hero.skill.iconUrl,
      descByStar: hero.skill.descByStar
    };
  }
  const primaryClass = hero.class[0] ?? "Warrior";
  const isMagic = MAGIC_CLASSES.includes(primaryClass);
  return {
    name: isMagic ? "Phép thuật chiến trường" : "Đòn tấn công đặc biệt",
    type: "Chủ động",
    desc: isMagic ? `${hero.name} gây sát thương phép lên khu vực mục tiêu và tạo lợi thế cho đội hình.` : `${hero.name} gây sát thương lên mục tiêu và tạo lợi thế chiến thuật trên bàn cờ.`
  };
}
function resolveHeroStats(hero, star = 1) {
  var _a, _b, _c, _d, _e, _f;
  const defaultHp = defaultHpForCost(hero.cost);
  const defaultAtk = defaultAtkForCost(hero.cost);
  const hpTuple = ((_a = hero.stats) == null ? void 0 : _a.hp) ?? defaultHp;
  const atkTuple = ((_b = hero.stats) == null ? void 0 : _b.atk) ?? defaultAtk;
  const primaryClass = hero.class[0] ?? "Warrior";
  const isTank = TANK_CLASSES.includes(primaryClass);
  const defaultArmor = isTank ? 25 + hero.cost * 5 : 15 + hero.cost * 3;
  const defaultMr = MAGIC_CLASSES.includes(primaryClass) ? 15 + hero.cost * 5 : 10 + hero.cost * 2;
  const defaultAtkSpeed = primaryClass === "Hunter" ? 1 : 1.3;
  const defaultRange = primaryClass === "Hunter" || primaryClass === "Mage" ? 4 : 1;
  return {
    hp: statAtStar(hpTuple, star, defaultHp[star - 1]),
    atk: statAtStar(atkTuple, star, defaultAtk[star - 1]),
    armor: statAtStar((_c = hero.stats) == null ? void 0 : _c.armor, star, defaultArmor),
    mr: statAtStar((_d = hero.stats) == null ? void 0 : _d.mr, star, defaultMr),
    atkSpeed: statAtStar((_e = hero.stats) == null ? void 0 : _e.atkSpeed, star, defaultAtkSpeed),
    range: statAtStar((_f = hero.stats) == null ? void 0 : _f.range, star, defaultRange)
  };
}
function getHeroSkins(hero) {
  var _a;
  if ((_a = hero.skins) == null ? void 0 : _a.length) return hero.skins;
  const portrait = hero.portraitUrl ?? hero.imageUrl ?? hero.image;
  if (portrait) {
    return [{ id: "default", name: "Default", imageUrl: portrait, isDefault: true }];
  }
  return [];
}
function getRelatedHeroes(hero, heroes, options = { by: "race", limit: 8 }) {
  const limit = options.limit ?? 8;
  const filtered = heroes.filter((h) => {
    if (h.id === hero.id) return false;
    if (options.by === "cost") return h.cost === hero.cost;
    if (options.by === "race") {
      const race = options.value ?? hero.race[0];
      if (!race) return false;
      const normalized = RACE_NAME_ALIASES[race] ?? race;
      return h.race.some((r) => (RACE_NAME_ALIASES[r] ?? r) === normalized);
    }
    const cls = options.value ?? hero.class[0];
    if (!cls) return false;
    return h.class.includes(cls);
  });
  return filtered.slice(0, limit);
}
function getRaceTraitPath(raceName, races) {
  const race = races.find((r) => r.name === raceName);
  return race ? getTraitDetailPath("race", race.id) : null;
}
function getClassTraitPath(className, classes) {
  const cls = classes.find((c) => c.name === className);
  return cls ? getTraitDetailPath("class", cls.id) : null;
}
function getRecommendedItems(hero, items, limit = 5) {
  var _a;
  if ((_a = hero.recommendedItemIds) == null ? void 0 : _a.length) {
    const mapped = hero.recommendedItemIds.map((id) => items.find((i) => i.id === id)).filter((i) => Boolean(i));
    if (mapped.length > 0) return mapped.slice(0, limit);
  }
  return items.filter((item) => {
    var _a2;
    return (_a2 = item.recommendedHeroIds) == null ? void 0 : _a2.includes(hero.id);
  }).sort((a, b) => b.tier - a.tier).slice(0, limit);
}
function getCompsForHero(hero, comps, limit = 4) {
  return comps.filter((comp) => comp.heroes.includes(hero.id)).slice(0, limit);
}
function formatHeroTraitsLabel(hero, options) {
  const parts = [...hero.race, ...hero.class].filter(Boolean);
  if (parts.length === 0) return (options == null ? void 0 : options.emptyLabel) ?? "—";
  return parts.join((options == null ? void 0 : options.separator) ?? " · ");
}
function filterHeroes(heroes, params) {
  var _a;
  const q = (_a = params.q) == null ? void 0 : _a.trim().toLowerCase();
  const raceFilter = params.race ? RACE_NAME_ALIASES[params.race] ?? params.race : null;
  return heroes.filter((hero) => {
    if (params.cost != null && hero.cost !== params.cost) return false;
    if (raceFilter && !hero.race.some((r) => (RACE_NAME_ALIASES[r] ?? r) === raceFilter)) return false;
    if (params.class && !hero.class.includes(params.class)) return false;
    if (params.isNew === true && !isHeroNew(hero)) return false;
    if (q && !hero.name.toLowerCase().includes(q)) return false;
    return true;
  });
}
function mergeOneHeroWithSeed(stored, fromSeed) {
  if (!fromSeed) return stored;
  return {
    ...fromSeed,
    ...stored,
    race: stored.race ? normalizeRaceNames(stored.race) : fromSeed.race,
    class: stored.class ? normalizeClassNames(stored.class) : fromSeed.class,
    skill: stored.skill ?? fromSeed.skill,
    stats: mergeHeroStats(stored.stats, fromSeed.stats),
    description: stored.description ?? fromSeed.description,
    tacticalNotes: stored.tacticalNotes ?? fromSeed.tacticalNotes,
    recommendedItemIds: stored.recommendedItemIds ?? fromSeed.recommendedItemIds,
    iconUrl: stored.iconUrl ?? fromSeed.iconUrl,
    imageUrl: stored.imageUrl ?? fromSeed.imageUrl ?? stored.image ?? fromSeed.image,
    portraitUrl: stored.portraitUrl ?? fromSeed.portraitUrl,
    dragonestId: stored.dragonestId ?? fromSeed.dragonestId,
    rarity: stored.rarity ?? fromSeed.rarity,
    lore: stored.lore ?? fromSeed.lore,
    skins: stored.skins ?? fromSeed.skins,
    chessTitle: stored.chessTitle ?? fromSeed.chessTitle,
    isNew: stored.isNew ?? fromSeed.isNew
  };
}
function mergeHeroesWithSeed(stored, seed) {
  const seedById = new Map(seed.map((h) => [h.id, h]));
  const migratedStored = stored.map(migrateStoredHero);
  const storedIds = new Set(migratedStored.map((h) => h.id));
  const merged = migratedStored.map((hero) => mergeOneHeroWithSeed(hero, seedById.get(hero.id)));
  for (const seedHero of seed) {
    if (!storedIds.has(seedHero.id)) {
      merged.push(seedHero);
    }
  }
  return merged;
}
const TRAIT_VISUALS = {
  // Races
  ancestor: {
    Icon: Landmark,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/25 via-brand-gold/5 to-transparent"
  },
  beast: {
    Icon: PawPrint,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/25 via-tier-a/5 to-transparent"
  },
  cave_clan: {
    Icon: Mountain,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/10 via-white/5 to-transparent"
  },
  civet: {
    Icon: Cat,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/20 via-tier-a/5 to-transparent"
  },
  demon: {
    Icon: Flame,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/30 via-brand-red/5 to-transparent"
  },
  divinity: {
    Icon: Sparkles,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/35 via-brand-gold/10 to-transparent"
  },
  dragon: {
    Icon: Crown,
    accentClass: "text-tier-s",
    glowClass: "from-tier-s/25 via-tier-s/5 to-transparent"
  },
  dwarf: {
    Icon: Pickaxe,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent"
  },
  egersis: {
    Icon: Skull,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/12 via-white/4 to-transparent"
  },
  feathered: {
    Icon: Wind,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent"
  },
  glacier: {
    Icon: Snowflake,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/5 to-transparent"
  },
  goblin: {
    Icon: Users,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/20 via-brand-green/5 to-transparent"
  },
  greater: {
    Icon: Maximize2,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/20 via-brand-gold/5 to-transparent"
  },
  horn: {
    Icon: CircleDot,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/25 via-tier-a/5 to-transparent"
  },
  human: {
    Icon: Users,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/15 via-white/5 to-transparent"
  },
  insectoid: {
    Icon: Bug,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent"
  },
  kira: {
    Icon: Heart,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/25 via-brand-red/5 to-transparent"
  },
  marine: {
    Icon: Waves,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/8 to-transparent"
  },
  night_demon: {
    Icon: Moon,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/20 via-brand-red/5 to-transparent"
  },
  pandaman: {
    Icon: PawPrint,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/12 via-white/4 to-transparent"
  },
  spirit: {
    Icon: Ghost,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent"
  },
  watcher: {
    Icon: Eye,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/25 via-brand-gold/5 to-transparent"
  },
  // Classes
  assassin: {
    Icon: Swords,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/30 via-brand-red/5 to-transparent"
  },
  druid: {
    Icon: Leaf,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/30 via-brand-green/5 to-transparent"
  },
  hunter: {
    Icon: Crosshair,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/25 via-tier-b/5 to-transparent"
  },
  knight: {
    Icon: Shield,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/30 via-brand-gold/8 to-transparent"
  },
  mage: {
    Icon: WandSparkles,
    accentClass: "text-tier-b",
    glowClass: "from-tier-b/30 via-tier-b/8 to-transparent"
  },
  mech: {
    Icon: Cog,
    accentClass: "text-brand-text-sub",
    glowClass: "from-white/12 via-white/4 to-transparent"
  },
  priest: {
    Icon: Heart,
    accentClass: "text-brand-green",
    glowClass: "from-brand-green/25 via-brand-green/5 to-transparent"
  },
  shaman: {
    Icon: Zap,
    accentClass: "text-brand-gold",
    glowClass: "from-brand-gold/35 via-brand-gold/10 to-transparent"
  },
  warlock: {
    Icon: Flame,
    accentClass: "text-tier-s",
    glowClass: "from-tier-s/25 via-tier-s/5 to-transparent"
  },
  warrior: {
    Icon: Sword,
    accentClass: "text-brand-text-main",
    glowClass: "from-white/15 via-white/5 to-transparent"
  },
  witcher: {
    Icon: Eye,
    accentClass: "text-brand-red",
    glowClass: "from-brand-red/20 via-brand-red/5 to-transparent"
  },
  wizard: {
    Icon: Sparkles,
    accentClass: "text-tier-a",
    glowClass: "from-tier-a/30 via-tier-a/8 to-transparent"
  }
};
const DEFAULT_VISUAL = {
  Icon: Sparkles,
  accentClass: "text-brand-gold",
  glowClass: "from-brand-gold/20 via-brand-gold/5 to-transparent"
};
function getTraitVisual(id) {
  if (!id) return DEFAULT_VISUAL;
  return TRAIT_VISUALS[id] ?? DEFAULT_VISUAL;
}
function mergeTraitsWithSeed(stored, seed) {
  const seedById = new Map(seed.map((item) => [item.id, item]));
  const storedById = new Map(stored.map((item) => [item.id, item]));
  const allIds = /* @__PURE__ */ new Set([...seed.map((s) => s.id), ...stored.map((s) => s.id)]);
  return [...allIds].map((id) => {
    var _a;
    const fromSeed = seedById.get(id);
    const fromStored = storedById.get(id);
    if (!fromStored) return fromSeed;
    if (!fromSeed) return fromStored;
    return {
      ...fromSeed,
      ...fromStored,
      iconUrl: fromStored.iconUrl ?? fromSeed.iconUrl,
      skillName: fromStored.skillName ?? fromSeed.skillName,
      milestones: ((_a = fromStored.milestones) == null ? void 0 : _a.length) && fromStored.milestones.some((m) => m.effect) ? fromStored.milestones : fromSeed.milestones,
      description: fromStored.description || fromSeed.description,
      icon: fromStored.icon || fromSeed.icon
    };
  });
}
function mergeByIdWithSeed(stored, seed) {
  if (stored.length === 0) return seed;
  const byId = new Map(stored.map((item) => [item.id, item]));
  for (const item of seed) {
    if (!byId.has(item.id)) byId.set(item.id, item);
  }
  return seed.map((item) => byId.get(item.id) ?? item);
}
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
  adminUsers: "autochess_admin_users",
  adminRoles: "autochess_admin_roles"
};
function useHydratedPersistedState(key, fallback) {
  const [state, setState] = React.useState(fallback);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setState(loadJson(key, fallback));
    setHydrated(true);
  }, [key, fallback]);
  React.useEffect(() => {
    if (hydrated) saveJson(key, state);
  }, [key, state, hydrated]);
  return [state, setState];
}
function usePersistedEntity(key, fallback) {
  return useHydratedPersistedState(key, fallback);
}
function usePersistedMergedList(key, seed) {
  const mergedSeed = React.useMemo(() => mergeByIdWithSeed(seed, seed), [seed]);
  const [state, setState] = React.useState(mergedSeed);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    const storedVersion = loadJson(STORAGE_KEYS.dataVersion, 0);
    const stored = loadJson(key, seed);
    const merged = mergeByIdWithSeed(stored, seed);
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION);
      saveJson(key, merged);
    }
    setState(merged);
    setHydrated(true);
  }, [key, seed]);
  React.useEffect(() => {
    if (hydrated) saveJson(key, state);
  }, [key, state, hydrated]);
  return [state, setState];
}
function usePersistedHeroes() {
  const [state, setState] = React.useState(HEROES);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    const storedVersion = loadJson(STORAGE_KEYS.dataVersion, 0);
    const stored = loadJson(STORAGE_KEYS.heroes, HEROES);
    const merged = mergeHeroesWithSeed(stored, HEROES);
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION);
      saveJson(STORAGE_KEYS.heroes, merged);
    }
    setState(merged);
    setHydrated(true);
  }, []);
  React.useEffect(() => {
    if (hydrated) saveJson(STORAGE_KEYS.heroes, state);
  }, [state, hydrated]);
  return [state, setState];
}
function usePersistedTraits(key, seed) {
  const [state, setState] = React.useState(seed);
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    const storedVersion = loadJson(STORAGE_KEYS.dataVersion, 0);
    const stored = loadJson(key, seed);
    const merged = mergeTraitsWithSeed(stored, seed);
    if (storedVersion < DATA_VERSION) {
      saveJson(STORAGE_KEYS.dataVersion, DATA_VERSION);
      saveJson(key, merged);
    }
    setState(merged);
    setHydrated(true);
  }, [key, seed]);
  React.useEffect(() => {
    if (hydrated) saveJson(key, state);
  }, [key, state, hydrated]);
  return [state, setState];
}
function useCmsPersistedState() {
  const [posts, setPosts] = usePersistedEntity(STORAGE_KEYS.posts, DEFAULT_POSTS);
  const [banners, setBanners] = usePersistedMergedList(STORAGE_KEYS.banners, DEFAULT_BANNERS);
  const [relics, setRelics] = usePersistedEntity(STORAGE_KEYS.relics, DEFAULT_RELICS);
  const [comments, setComments] = usePersistedEntity(STORAGE_KEYS.comments, DEFAULT_COMMENTS);
  const [communityPosts, setCommunityPosts] = usePersistedEntity(
    STORAGE_KEYS.communityPosts,
    DEFAULT_COMMUNITY_POSTS
  );
  const [teamMembers, setTeamMembers] = usePersistedEntity(
    STORAGE_KEYS.teamMembers,
    DEFAULT_TEAM_MEMBERS
  );
  const [communityChannels, setCommunityChannels] = usePersistedEntity(
    STORAGE_KEYS.communityChannels,
    DEFAULT_COMMUNITY_CHANNELS
  );
  const [events, setEvents] = usePersistedEntity(STORAGE_KEYS.events, DEFAULT_EVENTS);
  const [media, setMedia] = usePersistedEntity(STORAGE_KEYS.media, DEFAULT_MEDIA);
  const [players, setPlayers] = usePersistedEntity(
    STORAGE_KEYS.players,
    DEFAULT_PLAYERS
  );
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
    setPlayers
  };
}
function useGamePersistedState() {
  const [heroes, setHeroes] = usePersistedHeroes();
  const [items, setItems] = usePersistedMergedList(STORAGE_KEYS.items, ITEMS);
  const [comps, setComps] = usePersistedMergedList(STORAGE_KEYS.comps, COMPS);
  const [races, setRaces] = usePersistedTraits(STORAGE_KEYS.races, RACES);
  const [classes, setClasses] = usePersistedTraits(
    STORAGE_KEYS.classes,
    CLASSES
  );
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
    setClasses
  };
}
function createCrudSetters(setState, guards = {}) {
  const add = (item) => {
    if (guards.beforeAdd && !guards.beforeAdd(item)) return false;
    setState((prev) => [...prev, item]);
    return true;
  };
  const update = (id, patch) => {
    let accepted = true;
    setState(
      (prev) => prev.map((entity) => {
        if (entity.id !== id) return entity;
        if (guards.beforeUpdate && !guards.beforeUpdate(entity, patch)) {
          accepted = false;
          return entity;
        }
        return { ...entity, ...patch };
      })
    );
    return accepted;
  };
  const deleteEntity = (id) => {
    setState((prev) => prev.filter((entity) => entity.id !== id));
  };
  return { add, update, delete: deleteEntity };
}
function nextNumericId(items) {
  if (items.length === 0) return "1";
  const max = Math.max(...items.map((item) => Number(item.id) || 0));
  return String(max + 1);
}
function parseLines(value) {
  return value.split("\n").map((line) => line.trim()).filter(Boolean);
}
function slugifyEntityId(name, existingIds, options = {}) {
  const { separator = "-", fallbackPrefix = "entity" } = options;
  const pattern = separator === "-" ? /[^a-z0-9-]+/g : /[^a-z0-9]+/g;
  const base = name.trim().toLowerCase().replace(/\s+/g, separator).replace(pattern, "").replace(new RegExp(`^${separator}|${separator}$`, "g"), "") || `${fallbackPrefix}_${Date.now()}`;
  let id = base;
  let n = 1;
  while (existingIds.includes(id)) {
    id = `${base}${separator}${n++}`;
  }
  return id;
}
function slugifyHeroId(name, existingIds) {
  return slugifyEntityId(name, existingIds, { separator: "-", fallbackPrefix: "hero" });
}
function slugifyItemId(name, existingIds) {
  return slugifyEntityId(name, existingIds, { separator: "_", fallbackPrefix: "item" });
}
function nextNumericIdNumber(items) {
  return Number(nextNumericId(items));
}
const HERO_RARITIES = ["Common", "Rare", "Epic", "Legendary"];
const SKILL_TYPE_OPTIONS = ["Chủ động", "Bị động", "Kích hoạt"];
const HERO_RESET_FIELDS = {
  basic: ["description", "chessTitle", "rarity", "isNew", "race", "class"],
  statsSkill: ["stats", "skill"],
  images: ["iconUrl", "portraitUrl", "imageUrl", "image", "skins"],
  content: ["lore", "tacticalNotes", "recommendedItemIds"]
};
function createDefaultHeroDraft(partial) {
  return {
    id: "",
    name: "",
    cost: 1,
    race: [],
    class: [],
    skill: {
      name: "Kỹ năng đặc biệt",
      desc: "Gây sát thương lên đối thủ.",
      type: "Chủ động"
    },
    stats: {
      hp: [700, 1260, 2520],
      atk: [55, 99, 198],
      armor: 30,
      mr: 20
    },
    image: "",
    isNew: false,
    ...partial
  };
}
function parseStarTuple(value) {
  const parts = value.split(",").map((p) => Number(p.trim()));
  if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
    return [parts[0], parts[1], parts[2]];
  }
  return void 0;
}
function formatStarTuple(value) {
  if (!value) return "";
  return value.join(", ");
}
function parseOptionalNumber(value) {
  const trimmed = value.trim();
  if (!trimmed) return void 0;
  const n = Number(trimmed);
  return Number.isNaN(n) ? void 0 : n;
}
function stripHeroOverrides(hero, fields) {
  const next = { ...hero };
  for (const field of fields) {
    delete next[field];
  }
  return next;
}
function createEmptySkin(index) {
  return {
    id: `skin_${index}`,
    name: `Skin ${index}`,
    imageUrl: "",
    isDefault: index === 0
  };
}
function normalizeHeroDraft(hero) {
  var _a, _b, _c;
  return {
    ...hero,
    race: hero.race ?? [],
    class: hero.class ?? [],
    tacticalNotes: (_a = hero.tacticalNotes) == null ? void 0 : _a.filter(Boolean),
    recommendedItemIds: (_b = hero.recommendedItemIds) == null ? void 0 : _b.filter(Boolean),
    skins: (_c = hero.skins) == null ? void 0 : _c.filter((s) => s.name.trim() || s.imageUrl.trim())
  };
}
function ensureHeroStats(stats) {
  return {
    hp: (stats == null ? void 0 : stats.hp) ?? [700, 1260, 2520],
    atk: (stats == null ? void 0 : stats.atk) ?? [55, 99, 198],
    armor: (stats == null ? void 0 : stats.armor) ?? 30,
    mr: (stats == null ? void 0 : stats.mr) ?? 20,
    atkSpeed: stats == null ? void 0 : stats.atkSpeed,
    range: stats == null ? void 0 : stats.range
  };
}
function resetHeroFieldsFromSeed(hero, seed, section) {
  const stripped = stripHeroOverrides(hero, HERO_RESET_FIELDS[section]);
  return mergeOneHeroWithSeed(stripped, seed);
}
function isPersistableImageUrl(value) {
  if (!(value == null ? void 0 : value.trim())) return false;
  const url = value.trim();
  const lower = url.toLowerCase();
  if (lower.startsWith("data:") || lower.startsWith("blob:")) return false;
  return lower.startsWith("http://") || lower.startsWith("https://") || url.startsWith("/");
}
function isPostImageUrl(value) {
  return isPersistableImageUrl(value);
}
function isPersistableAvatarValue(value) {
  if (!(value == null ? void 0 : value.trim())) return false;
  const v = value.trim();
  if (v.startsWith("bg-")) return true;
  return isPersistableImageUrl(v);
}
function sanitizeCommunityImageUrls(images) {
  if (!(images == null ? void 0 : images.length)) return images;
  const filtered = images.filter((img) => isPersistableImageUrl(img.url));
  return filtered.length ? filtered : void 0;
}
function useDataCrudActions(game, cms) {
  const {
    setHeroes,
    setItems,
    setComps,
    setRaces,
    setClasses
  } = game;
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
    setPlayers
  } = cms;
  const heroCrud = React.useMemo(() => createCrudSetters(setHeroes), [setHeroes]);
  const itemCrud = React.useMemo(() => createCrudSetters(setItems), [setItems]);
  const compCrud = React.useMemo(() => createCrudSetters(setComps), [setComps]);
  const raceCrud = React.useMemo(() => createCrudSetters(setRaces), [setRaces]);
  const classCrud = React.useMemo(() => createCrudSetters(setClasses), [setClasses]);
  const postCrud = React.useMemo(
    () => createCrudSetters(setPosts, {
      beforeAdd: (post) => {
        var _a;
        const cover = (_a = post.coverImageUrl) == null ? void 0 : _a.trim();
        return !(cover && !isPersistableImageUrl(cover));
      },
      beforeUpdate: (_current, patch) => {
        var _a;
        const cover = (_a = patch.coverImageUrl) == null ? void 0 : _a.trim();
        return !(cover && !isPersistableImageUrl(cover));
      }
    }),
    [setPosts]
  );
  const bannerCrud = React.useMemo(() => createCrudSetters(setBanners), [setBanners]);
  const relicCrud = React.useMemo(() => createCrudSetters(setRelics), [setRelics]);
  const commentCrud = React.useMemo(() => createCrudSetters(setComments), [setComments]);
  const teamMemberCrud = React.useMemo(
    () => createCrudSetters(setTeamMembers),
    [setTeamMembers]
  );
  const channelCrud = React.useMemo(
    () => createCrudSetters(setCommunityChannels),
    [setCommunityChannels]
  );
  const eventCrud = React.useMemo(() => createCrudSetters(setEvents), [setEvents]);
  const mediaCrud = React.useMemo(
    () => createCrudSetters(setMedia, {
      beforeAdd: (asset) => isPersistableImageUrl(asset.url),
      beforeUpdate: (_current, patch) => {
        var _a;
        const url = (_a = patch.url) == null ? void 0 : _a.trim();
        return !(url && !isPersistableImageUrl(url));
      }
    }),
    [setMedia]
  );
  const addHero = React.useCallback((hero) => heroCrud.add(hero), [heroCrud]);
  const addItem = React.useCallback((item) => itemCrud.add(item), [itemCrud]);
  const addComp = React.useCallback((comp) => compCrud.add(comp), [compCrud]);
  const addRace = React.useCallback((race) => raceCrud.add(race), [raceCrud]);
  const addClass = React.useCallback((cls) => classCrud.add(cls), [classCrud]);
  const addPost = React.useCallback((post) => postCrud.add(post), [postCrud]);
  const addBanner = React.useCallback((banner) => bannerCrud.add(banner), [bannerCrud]);
  const addRelic = React.useCallback((relic) => relicCrud.add(relic), [relicCrud]);
  const addComment = React.useCallback((comment) => commentCrud.add(comment), [commentCrud]);
  const addCommunityPost = React.useCallback(
    (post) => {
      setCommunityPosts((prev) => [
        ...prev,
        { ...post, images: sanitizeCommunityImageUrls(post.images) }
      ]);
    },
    [setCommunityPosts]
  );
  const addTeamMember = React.useCallback(
    (member) => teamMemberCrud.add(member),
    [teamMemberCrud]
  );
  const addCommunityChannel = React.useCallback(
    (channel) => channelCrud.add(channel),
    [channelCrud]
  );
  const addEvent = React.useCallback((event) => eventCrud.add(event), [eventCrud]);
  const addMedia = React.useCallback(
    (asset) => {
      if (!isPersistableImageUrl(asset.url)) return;
      setMedia((prev) => [asset, ...prev]);
    },
    [setMedia]
  );
  const addPlayer = React.useCallback(
    (player) => {
      setPlayers((prev) => {
        const next = [...prev, player].sort((a, b) => b.mmr - a.mmr);
        return next.map((p, idx) => ({ ...p, rank: idx + 1 }));
      });
    },
    [setPlayers]
  );
  const updateHero = React.useCallback(
    (id, patch) => heroCrud.update(id, patch),
    [heroCrud]
  );
  const replaceHero = React.useCallback(
    (hero) => {
      setHeroes((prev) => {
        const idx = prev.findIndex((h) => h.id === hero.id);
        if (idx === -1) return [...prev, hero];
        const next = [...prev];
        next[idx] = hero;
        return next;
      });
    },
    [setHeroes]
  );
  const resetHeroFields = React.useCallback(
    (id, section) => {
      setHeroes(
        (prev) => prev.map((h) => {
          if (h.id !== id) return h;
          const seed = HEROES.find((s) => s.id === id);
          return resetHeroFieldsFromSeed(h, seed, section);
        })
      );
    },
    [setHeroes]
  );
  const updateItem = React.useCallback(
    (id, patch) => itemCrud.update(id, patch),
    [itemCrud]
  );
  const updateComp = React.useCallback(
    (id, patch) => compCrud.update(id, patch),
    [compCrud]
  );
  const updateRace = React.useCallback(
    (id, patch) => raceCrud.update(id, patch),
    [raceCrud]
  );
  const updateClass = React.useCallback(
    (id, patch) => classCrud.update(id, patch),
    [classCrud]
  );
  const updatePost = React.useCallback(
    (id, patch) => postCrud.update(id, patch),
    [postCrud]
  );
  const updateBanner = React.useCallback(
    (id, patch) => bannerCrud.update(id, patch),
    [bannerCrud]
  );
  const updateRelic = React.useCallback(
    (id, patch) => relicCrud.update(id, patch),
    [relicCrud]
  );
  const updateComment = React.useCallback(
    (id, patch) => commentCrud.update(id, patch),
    [commentCrud]
  );
  const updateCommunityPost = React.useCallback(
    (id, patch) => {
      setCommunityPosts(
        (prev) => prev.map((p) => {
          if (p.id !== id) return p;
          const images = patch.images !== void 0 ? sanitizeCommunityImageUrls(patch.images) : patch.images;
          return { ...p, ...patch, ...patch.images !== void 0 ? { images } : {} };
        })
      );
    },
    [setCommunityPosts]
  );
  const updateTeamMember = React.useCallback(
    (id, patch) => teamMemberCrud.update(id, patch),
    [teamMemberCrud]
  );
  const updateCommunityChannel = React.useCallback(
    (id, patch) => channelCrud.update(id, patch),
    [channelCrud]
  );
  const updateEvent = React.useCallback(
    (id, patch) => eventCrud.update(id, patch),
    [eventCrud]
  );
  const updateMedia = React.useCallback(
    (id, patch) => mediaCrud.update(id, patch),
    [mediaCrud]
  );
  const updatePlayer = React.useCallback(
    (id, patch) => {
      setPlayers((prev) => {
        const next = prev.map((p) => p.id === id ? { ...p, ...patch } : p).sort((a, b) => b.mmr - a.mmr);
        return next.map((p, idx) => ({ ...p, rank: idx + 1 }));
      });
    },
    [setPlayers]
  );
  const deleteHero = React.useCallback((id) => heroCrud.delete(id), [heroCrud]);
  const deleteItem = React.useCallback((id) => itemCrud.delete(id), [itemCrud]);
  const deleteComp = React.useCallback((id) => compCrud.delete(id), [compCrud]);
  const deleteRace = React.useCallback((id) => raceCrud.delete(id), [raceCrud]);
  const deleteClass = React.useCallback((id) => classCrud.delete(id), [classCrud]);
  const deletePost = React.useCallback((id) => postCrud.delete(id), [postCrud]);
  const deleteBanner = React.useCallback((id) => bannerCrud.delete(id), [bannerCrud]);
  const deleteRelic = React.useCallback((id) => relicCrud.delete(id), [relicCrud]);
  const deleteComment = React.useCallback((id) => commentCrud.delete(id), [commentCrud]);
  const deleteCommunityPost = React.useCallback(
    (id) => setCommunityPosts((prev) => prev.filter((p) => p.id !== id)),
    [setCommunityPosts]
  );
  const deleteTeamMember = React.useCallback(
    (id) => teamMemberCrud.delete(id),
    [teamMemberCrud]
  );
  const deleteCommunityChannel = React.useCallback(
    (id) => channelCrud.delete(id),
    [channelCrud]
  );
  const deleteEvent = React.useCallback((id) => eventCrud.delete(id), [eventCrud]);
  const deleteMedia = React.useCallback((id) => mediaCrud.delete(id), [mediaCrud]);
  const deletePlayer = React.useCallback(
    (id) => {
      setPlayers((prev) => {
        const filtered = prev.filter((p) => p.id !== id);
        return filtered.map((p, idx) => ({ ...p, rank: idx + 1 }));
      });
    },
    [setPlayers]
  );
  const rerankPlayers = React.useCallback(() => {
    setPlayers((prev) => {
      const sorted = [...prev].sort((a, b) => b.mmr - a.mmr);
      return sorted.map((p, idx) => ({ ...p, rank: idx + 1 }));
    });
  }, [setPlayers]);
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
    rerankPlayers
  };
}
const NEWS_TIME_RANGES = ["7d", "30d", "90d"];
function estimateReadingMinutes(text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
function parseTimeRange(value) {
  if (!value) return null;
  return NEWS_TIME_RANGES.includes(value) ? value : null;
}
function getPublishedPosts(posts) {
  return posts.filter((post) => post.status === "Xuất bản");
}
function parseViews(views) {
  const normalized = views.trim().toUpperCase();
  if (normalized.endsWith("K")) {
    return parseFloat(normalized.replace("K", "")) * 1e3;
  }
  return parseFloat(normalized.replace(/[^\d.]/g, "")) || 0;
}
function parsePostDate(date) {
  const parts = date.split("/").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null;
  const [day, month, year] = parts;
  return new Date(year, month - 1, day);
}
function isWithinTimeRange(date, range) {
  const parsed = parsePostDate(date);
  if (!parsed) return true;
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const cutoff = /* @__PURE__ */ new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return parsed >= cutoff;
}
function filterNewsPosts(posts, options) {
  var _a;
  const q = (_a = options.q) == null ? void 0 : _a.trim().toLowerCase();
  return getPublishedPosts(posts).filter((post) => {
    if (options.category && post.category !== options.category) return false;
    if (options.author && post.author !== options.author) return false;
    if (options.time && !isWithinTimeRange(post.date, options.time)) return false;
    if (!q) return true;
    return post.title.toLowerCase().includes(q) || (post.excerpt ?? "").toLowerCase().includes(q) || post.author.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
  });
}
function getCategoryCounts(posts) {
  const counts = /* @__PURE__ */ new Map();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return Array.from(counts.entries()).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
}
function getPopularPosts(posts, limit = 5) {
  return [...posts].sort((a, b) => parseViews(b.views) - parseViews(a.views)).slice(0, limit);
}
function getPostAuthors(posts) {
  return Array.from(new Set(posts.map((post) => post.author))).sort(
    (a, b) => a.localeCompare(b)
  );
}
function splitFeaturedPosts(posts) {
  if (posts.length === 0) {
    return { featured: null, secondary: [], rest: [] };
  }
  const [featured, ...remaining] = posts;
  return {
    featured,
    secondary: remaining.slice(0, 2),
    rest: remaining.slice(2)
  };
}
const noop = () => {
};
const DataContext = React.createContext({
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
  rerankPlayers: noop
});
const DataProvider = ({ children }) => {
  const game = useGamePersistedState();
  const cms = useCmsPersistedState();
  const actions = useDataCrudActions(game, cms);
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
      ...actions
    }),
    [game, cms, actions]
  );
  return /* @__PURE__ */ jsx(DataContext.Provider, { value, children });
};
const useAppStore = () => React.useContext(DataContext);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, size = "default", children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex w-full items-center justify-between gap-2 border border-brand-border bg-brand-card font-medium text-white shadow-inner transition-all",
      "focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold/30 focus:border-brand-gold/30",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[placeholder]:text-brand-text-sub/60",
      "[&>span]:line-clamp-1",
      size === "default" && "h-11 rounded-xl px-4 text-[14px]",
      size === "sm" && "h-9 rounded-lg px-2 text-[11px]",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: cn("shrink-0 text-brand-text-sub transition-transform duration-200", size === "sm" ? "h-3 w-3" : "h-4 w-4") }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  SelectPrimitive.Content,
  {
    ref,
    position,
    className: cn(
      "relative z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-brand-border bg-brand-card text-brand-text-main shadow-2xl shadow-black/40",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "custom-scrollbar p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      }
    )
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-text-sub", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-[13px] font-medium text-brand-text-sub outline-none transition-colors",
      "focus:bg-white/5 focus:text-white",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "data-[state=checked]:bg-brand-gold/5 data-[state=checked]:text-brand-gold",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-4 w-4 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-brand-gold", strokeWidth: 2.5 }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-brand-border", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const SELECT_EMPTY_VALUE = "__empty__";
const Card = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border border-brand-border bg-brand-card text-brand-text-main shadow-2xl shadow-black/40", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6 sm:p-8", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h3", { ref, className: cn("text-[18px] font-bold leading-none tracking-tight text-white", className), ...props })
);
CardTitle.displayName = "CardTitle";
const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 sm:p-8 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const buttonVariants = ({
  variant = "default",
  size = "default",
  className
}) => cn(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-[14px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    "bg-gold-gradient hover-gold-gradient text-black hover:shadow-[0_0_20px_rgba(245,180,60,0.3)] shadow-sm": variant === "default",
    "border border-white/10 bg-transparent hover:bg-white/5 text-white": variant === "outline",
    "hover:bg-white/5 text-brand-text-sub hover:text-white": variant === "ghost",
    "bg-white/5 text-white hover:bg-white/10": variant === "secondary",
    "bg-brand-red text-white hover:bg-red-600": variant === "danger",
    "h-11 px-6": size === "default",
    "h-9 rounded-lg px-4 text-[12px]": size === "sm",
    "h-14 rounded-xl px-10 text-[16px]": size === "lg",
    "h-11 w-11": size === "icon"
  },
  className
);
const Button = React.forwardRef(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const resolvedVariant = variant;
    const resolvedSize = size;
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        className: buttonVariants({ variant: resolvedVariant, size: resolvedSize, className }),
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-11 w-full rounded-xl border border-white/10 bg-brand-card px-4 py-2 text-[14px] font-medium shadow-inner transition-all placeholder:text-brand-text-sub/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-gold/30 disabled:cursor-not-allowed disabled:opacity-50 focus:border-brand-gold/30 text-white",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Badge = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "inline-flex items-center justify-center rounded-md border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap",
          {
            "bg-white/5 text-white border-white/10": variant === "default",
            "bg-brand-card-2 text-brand-text-sub border-transparent": variant === "secondary",
            "bg-green-500/10 text-brand-green border-green-500/20": variant === "success",
            "bg-brand-red/10 text-brand-red border-brand-red/20": variant === "danger",
            "bg-brand-gold/10 text-brand-gold border-brand-gold/20": variant === "warning",
            "bg-brand-red text-white border-brand-red": variant === "danger-solid",
            "bg-gold-gradient text-black border-transparent": variant === "warning-solid" || variant === "yellow-solid",
            "bg-transparent border-white/20 text-white/60": variant === "outline",
            "bg-tier-s/15 text-tier-s border-tier-s/30": variant === "tier-s",
            "bg-tier-a/15 text-tier-a border-tier-a/30": variant === "tier-a",
            "bg-tier-b/15 text-tier-b border-tier-b/30": variant === "tier-b",
            "bg-tier-c/15 text-tier-c border-tier-c/30": variant === "tier-c"
          },
          className
        ),
        ...props
      }
    );
  }
);
Badge.displayName = "Badge";
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-2rem)] max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-brand-border bg-brand-card p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-xl",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-6 top-6 rounded-lg opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/5 data-[state=open]:text-muted-foreground bg-white/5 p-1.5 text-white", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn(
      "text-[20px] font-bold leading-none tracking-tight text-white",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-[14px] text-brand-text-sub font-normal mt-1", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "shrink-0 bg-white/5",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      ),
      ...props
    }
  )
);
Separator.displayName = "Separator";
function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
  actionHref,
  className
}) {
  const { t } = useTranslation("common");
  const resolvedActionLabel = actionLabel ?? t("viewAll");
  const actionContent = resolvedActionLabel ? onAction ? /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      onClick: onAction,
      className: "inline-flex items-center gap-0.5 text-brand-gold font-semibold text-[13px] hover:text-brand-gold-deep transition-colors",
      children: [
        resolvedActionLabel,
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5", strokeWidth: 2.5 })
      ]
    }
  ) : actionHref ? /* @__PURE__ */ jsxs(
    Link,
    {
      to: actionHref,
      className: "inline-flex items-center gap-0.5 text-brand-gold font-semibold text-[13px] hover:text-brand-gold-deep transition-colors",
      children: [
        resolvedActionLabel,
        /* @__PURE__ */ jsx(ChevronRight, { className: "w-3.5 h-3.5", strokeWidth: 2.5 })
      ]
    }
  ) : null : null;
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-end justify-between gap-4", className), children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h2", { className: "text-[22px] sm:text-[24px] font-bold tracking-tight text-white", children: title }),
      subtitle && /* @__PURE__ */ jsx("p", { className: "text-brand-text-sub text-[13px] mt-1 font-normal", children: subtitle })
    ] }),
    actionContent
  ] });
}
const SITE_NAME = "Auto Chess Mobile VN";
const SITE_TAGLINE = "Cẩm nang Meta & Đội hình";
const SITE_DESCRIPTION = "Cẩm nang chiến thuật Auto Chess Mobile VN — dữ liệu meta, đội hình và công cụ cho kỳ thủ Việt Nam.";
const SITE_URL = "https://autochessmobile.vn";
function pageTitle(page) {
  if (!page) return `${SITE_NAME} | ${SITE_TAGLINE}`;
  return `${page} | ${SITE_NAME}`;
}
const STATIC_PUBLIC_ROUTES = [
  { loc: "/", changefreq: "daily", priority: "1.0" },
  { loc: "/doi-hinh", changefreq: "daily", priority: "0.9" },
  { loc: "/toc-he", changefreq: "weekly", priority: "0.8" },
  { loc: "/tuong", changefreq: "weekly", priority: "0.9" },
  { loc: "/trang-bi", changefreq: "weekly", priority: "0.8" },
  { loc: "/di-vat", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/tao-doi-hinh", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/tim-doi-hinh", changefreq: "weekly", priority: "0.7" },
  { loc: "/cong-cu/ban-advisor", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-cu/so-sanh-tuong", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-cu/so-sanh-doi-hinh", changefreq: "weekly", priority: "0.6" },
  { loc: "/tin-tuc", changefreq: "daily", priority: "0.8" },
  { loc: "/thao-luan", changefreq: "daily", priority: "0.7" },
  { loc: "/bang-xep-hang", changefreq: "weekly", priority: "0.6" },
  { loc: "/cong-dong", changefreq: "weekly", priority: "0.5" }
];
function buildSitemapEntries() {
  const entries = [...STATIC_PUBLIC_ROUTES];
  for (const comp of COMPS) {
    entries.push({
      loc: `/doi-hinh/${comp.id}`,
      changefreq: "weekly",
      priority: "0.8"
    });
  }
  for (const hero of HEROES) {
    entries.push({
      loc: `/tuong/${hero.id}`,
      changefreq: "monthly",
      priority: "0.7"
    });
  }
  for (const item of ITEMS) {
    entries.push({
      loc: `/trang-bi/${item.id}`,
      changefreq: "monthly",
      priority: "0.6"
    });
  }
  for (const relic of DEFAULT_RELICS) {
    entries.push({
      loc: `/di-vat/${relic.id}`,
      changefreq: "monthly",
      priority: "0.6"
    });
  }
  for (const race of RACES) {
    entries.push({
      loc: `/toc-he/toc/${race.id}`,
      changefreq: "monthly",
      priority: "0.6"
    });
  }
  for (const cls of CLASSES) {
    entries.push({
      loc: `/toc-he/he/${cls.id}`,
      changefreq: "monthly",
      priority: "0.6"
    });
  }
  for (const post of DEFAULT_POSTS.filter((p) => p.status === "Xuất bản")) {
    entries.push({
      loc: `/tin-tuc/${post.id}`,
      changefreq: "weekly",
      priority: "0.7"
    });
  }
  return entries;
}
function renderSitemapXml(entries) {
  const urls = entries.map((entry) => {
    const loc = `${SITE_URL}${entry.loc}`;
    const changefreq = entry.changefreq ? `
    <changefreq>${entry.changefreq}</changefreq>` : "";
    const priority = entry.priority ? `
    <priority>${entry.priority}</priority>` : "";
    return `  <url>
    <loc>${loc}</loc>${changefreq}${priority}
  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
function getSitemapUrlCount() {
  return buildSitemapEntries().length;
}
const BOARD_ROWS = 4;
const BOARD_COLS = 8;
const BOARD_SIZE = BOARD_ROWS * BOARD_COLS;
const FRONT_CLASSES = /* @__PURE__ */ new Set(["Warrior", "Knight", "Mech"]);
const BACK_CLASSES = /* @__PURE__ */ new Set(["Hunter", "Mage", "Assassin", "Warlock"]);
const ROW_CAPACITIES = [3, 3, 2, BOARD_COLS];
const BOARD_ROW_LABELS = [
  "Tuyến trước",
  "Giữa",
  "Giữa sau",
  "Tuyến sau"
];
function getRowPriority(hero) {
  const primaryClass = hero.class[0];
  if (FRONT_CLASSES.has(primaryClass)) return 0;
  if (BACK_CLASSES.has(primaryClass)) return 2;
  return 1;
}
function placeInRow(board, row, heroIds) {
  const startCol = Math.floor((BOARD_COLS - heroIds.length) / 2);
  heroIds.forEach((heroId, i) => {
    const index = row * BOARD_COLS + startCol + i;
    if (index >= 0 && index < BOARD_SIZE) {
      board[index] = heroId;
    }
  });
}
function buildCompBoard(heroIds, heroes) {
  const board = Array(BOARD_SIZE).fill(null);
  const heroMap = new Map(heroes.map((h) => [h.id, h]));
  const sorted = [...heroIds].sort((a, b) => {
    const heroA = heroMap.get(a);
    const heroB = heroMap.get(b);
    const priorityA = heroA ? getRowPriority(heroA) : 1;
    const priorityB = heroB ? getRowPriority(heroB) : 1;
    if (priorityA !== priorityB) return priorityA - priorityB;
    return ((heroB == null ? void 0 : heroB.cost) ?? 0) - ((heroA == null ? void 0 : heroA.cost) ?? 0);
  });
  const buckets = [[], [], []];
  for (const id of sorted) {
    const hero = heroMap.get(id);
    const bucket = hero ? getRowPriority(hero) : 1;
    buckets[bucket].push(id);
  }
  let row = 0;
  for (const bucket of buckets) {
    while (bucket.length > 0 && row < BOARD_ROWS) {
      const capacity = ROW_CAPACITIES[row] ?? BOARD_COLS;
      const slice = bucket.splice(0, capacity);
      placeInRow(board, row, slice);
      row += 1;
    }
  }
  return board;
}
function boardFromRecord(record, heroIds) {
  const board = Array(BOARD_SIZE).fill(null);
  const validIds = new Set(heroIds);
  for (const [indexStr, heroId] of Object.entries(record)) {
    const index = Number(indexStr);
    if (index >= 0 && index < BOARD_SIZE && validIds.has(heroId)) {
      board[index] = heroId;
    }
  }
  return board;
}
function resolveCompBoard(comp, heroes) {
  const boardRecord = "board" in comp ? comp.board : void 0;
  if (boardRecord && Object.keys(boardRecord).length > 0) {
    return boardFromRecord(boardRecord, comp.heroes);
  }
  return buildCompBoard(comp.heroes, heroes);
}
function getOrderedCompHeroes(comp, heroes) {
  const board = resolveCompBoard(comp, heroes);
  const ordered = [];
  const seen = /* @__PURE__ */ new Set();
  for (let i = 0; i < BOARD_SIZE; i++) {
    const heroId = board[i];
    if (heroId && !seen.has(heroId)) {
      seen.add(heroId);
      ordered.push(heroId);
    }
  }
  if (ordered.length > 0) {
    return ordered;
  }
  return [...comp.heroes];
}
const BOARD_PICKER_COLS = 2;
function emptyBoardSlots() {
  return Array.from({ length: BOARD_ROWS }, () => Array(BOARD_PICKER_COLS).fill(null));
}
function boardSlotsFromRecord(record, heroIds) {
  const slots = emptyBoardSlots();
  const validIds = new Set(heroIds);
  if (!record) return slots;
  for (const [indexStr, heroId] of Object.entries(record)) {
    const index = Number(indexStr);
    if (!validIds.has(heroId) || index < 0 || index >= BOARD_SIZE) continue;
    const row = Math.floor(index / BOARD_COLS);
    const col = index % BOARD_COLS;
    if (col >= BOARD_PICKER_COLS || row >= BOARD_ROWS) continue;
    slots[row][col] = heroId;
  }
  return slots;
}
function recordFromBoardSlots(slots) {
  var _a;
  const record = {};
  for (let row = 0; row < BOARD_ROWS; row++) {
    for (let col = 0; col < BOARD_PICKER_COLS; col++) {
      const heroId = (_a = slots[row]) == null ? void 0 : _a[col];
      if (heroId) {
        record[row * BOARD_COLS + col] = heroId;
      }
    }
  }
  return record;
}
function resolveSynergyEntry(name, count, milestones) {
  var _a;
  if (count <= 0) return null;
  const sorted = [...milestones].sort((a, b) => a.count - b.count);
  const reached = sorted.filter((m) => count >= m.count).pop();
  const threshold = ((_a = sorted[0]) == null ? void 0 : _a.count) ?? 2;
  return {
    name: `${count} ${name}`,
    desc: (reached == null ? void 0 : reached.effect) ?? `Kích hoạt ${name} x${count}`,
    active: count >= threshold
  };
}
function calcSynergiesFromHeroes(heroIds, heroes) {
  const counts = {};
  for (const heroId of heroIds) {
    const hero = heroes.find((h) => h.id === heroId);
    if (!hero) continue;
    hero.race.forEach((race) => {
      counts[race] = (counts[race] || 0) + 1;
    });
    hero.class.forEach((cls) => {
      counts[cls] = (counts[cls] || 0) + 1;
    });
  }
  const entries = [];
  for (const race of RACES) {
    const count = counts[race.name] ?? 0;
    const entry = resolveSynergyEntry(race.name, count, race.milestones);
    if (entry) entries.push(entry);
  }
  for (const cls of CLASSES) {
    const count = counts[cls.name] ?? 0;
    const entry = resolveSynergyEntry(cls.name, count, cls.milestones);
    if (entry) entries.push(entry);
  }
  return entries.sort((a, b) => Number(b.active) - Number(a.active));
}
function linesToArray(text) {
  return text.split("\n").map((s) => s.trim()).filter(Boolean);
}
function arrayToLines(arr) {
  return (arr == null ? void 0 : arr.join("\n")) ?? "";
}
function parseCounterLines(text, withTip = false) {
  return linesToArray(text).map((line) => {
    const parts = line.split("|").map((s) => s.trim());
    if (withTip) {
      return {
        name: parts[0] ?? "",
        reason: parts[1] ?? "",
        tip: parts[2] || void 0
      };
    }
    return { name: parts[0] ?? "", reason: parts[1] ?? "" };
  }).filter((c) => c.name);
}
function countersToLines(counters, withTip = false) {
  if (!(counters == null ? void 0 : counters.length)) return "";
  return counters.map(
    (c) => withTip && c.tip ? `${c.name} | ${c.reason} | ${c.tip}` : `${c.name} | ${c.reason}`
  ).join("\n");
}
function difficultyLabelKey(difficulty) {
  if (!difficulty || difficulty <= 2) return "difficultyEasy";
  if (difficulty === 3) return "difficultyMedium";
  return "difficultyHard";
}
function splitCoreFlexHeroIds(comp) {
  var _a;
  if (!((_a = comp.coreHeroIds) == null ? void 0 : _a.length)) {
    return { hasCoreSplit: false, coreIds: [], flexIds: [...comp.heroes] };
  }
  const coreSet = new Set(comp.coreHeroIds);
  const coreIds = comp.heroes.filter((id) => coreSet.has(id));
  const flexIds = comp.heroes.filter((id) => !coreSet.has(id));
  return { hasCoreSplit: true, coreIds, flexIds };
}
function emptyRoadmap() {
  return { early: "", mid: "", late: "" };
}
function roadmapHasContent(roadmap) {
  var _a, _b, _c;
  if (!roadmap) return false;
  return Boolean(((_a = roadmap.early) == null ? void 0 : _a.trim()) || ((_b = roadmap.mid) == null ? void 0 : _b.trim()) || ((_c = roadmap.late) == null ? void 0 : _c.trim()));
}
const OFFENSE_CLASSES = ["Assassin", "Hunter", "Mage", "Warlock", "Wizard"];
const DEFENSE_CLASSES = ["Warrior", "Knight", "Mech"];
const CONTROL_CLASSES = ["Shaman", "Warlock", "Witcher", "Priest"];
function parseWinRate(winRate) {
  return parseFloat(winRate.replace("%", "")) || 0;
}
function compHeroes(comp, heroes) {
  return comp.heroes.map((id) => heroes.find((h) => h.id === id)).filter((h) => Boolean(h));
}
function computeHeuristicRadarStats(comp, heroes) {
  const roster = compHeroes(comp, heroes);
  const n = roster.length || 1;
  const offense = roster.filter(
    (h) => h.class.some((c) => OFFENSE_CLASSES.includes(c))
  ).length;
  const defense = roster.filter(
    (h) => h.class.some((c) => DEFENSE_CLASSES.includes(c))
  ).length;
  const control = roster.filter(
    (h) => h.class.some((c) => CONTROL_CLASSES.includes(c))
  ).length;
  const avgCost = roster.reduce((s, h) => s + h.cost, 0) / n;
  const winRate = parseWinRate(comp.winRate);
  const difficulty = comp.difficulty ?? (comp.tier === "S" ? 85 : comp.tier === "A" ? 65 : 50);
  return {
    attack: Math.min(100, Math.round(offense * 11 + winRate * 0.35)),
    defense: Math.min(100, Math.round(defense * 11 + (comp.tier === "S" ? 12 : 0))),
    control: Math.min(100, Math.round(control * 14)),
    difficulty: Math.min(100, difficulty),
    economy: Math.min(100, Math.round(100 - avgCost * 9)),
    lateGame: Math.min(100, Math.round(winRate * (comp.tier === "S" ? 3.2 : 2.4)))
  };
}
function computeCompRadarStats(comp, heroes) {
  if (comp.radarStats) return comp.radarStats;
  return computeHeuristicRadarStats(comp, heroes);
}
function getCompDifficulty(comp) {
  return comp.difficulty ?? (comp.tier === "S" ? 8 : comp.tier === "A" ? 6 : 5);
}
function getCompTop4(comp) {
  const winRate = parseWinRate(comp.winRate);
  return comp.tier === "S" ? Math.min(95, Math.round(winRate * 3.2)) : Math.round(winRate * 2.8);
}
function getCompLateGame(comp) {
  const winRate = parseWinRate(comp.winRate);
  return comp.tier === "S" ? Math.min(98, Math.round(winRate * 3.5)) : Math.round(winRate * 2.6);
}
function heroStarCost(baseCost, stars) {
  const mult = stars === 3 ? 9 : stars === 2 ? 3 : 1;
  return baseCost * mult;
}
function getHeroComparisonStats(hero) {
  const stats = resolveHeroStats(hero, 2);
  return {
    hp: stats.hp,
    armor: stats.armor,
    mr: stats.mr,
    dps: Math.round(stats.atk * stats.atkSpeed),
    atkSpeed: stats.atkSpeed,
    range: stats.range
  };
}
const SIZE = {
  xs: {
    box: "w-5 h-5",
    icon: "w-3 h-3",
    rounded: "rounded-md",
    ring: "border",
    emoji: "text-xs"
  },
  sm: {
    box: "w-7 h-7",
    icon: "w-3.5 h-3.5",
    rounded: "rounded-lg",
    ring: "border",
    emoji: "text-sm"
  },
  md: {
    box: "w-12 h-12",
    icon: "w-6 h-6",
    rounded: "rounded-xl",
    ring: "border",
    emoji: "text-2xl"
  },
  lg: {
    box: "w-16 h-16",
    icon: "w-8 h-8",
    rounded: "rounded-xl",
    ring: "border-2",
    emoji: "text-3xl"
  },
  xl: {
    box: "w-24 h-24 md:w-32 md:h-32",
    icon: "w-10 h-10 md:w-14 md:h-14",
    rounded: "rounded-xl",
    ring: "border-2",
    emoji: "text-5xl md:text-6xl"
  },
  watermark: {
    box: "w-28 h-28 md:w-40 md:h-40",
    icon: "w-20 h-20 md:w-28 md:h-28",
    rounded: "rounded-xl",
    ring: "border-0",
    emoji: "text-7xl md:text-[200px]"
  }
};
function TraitIcon({
  id,
  iconUrl: _iconUrl,
  icon,
  name,
  size: sizeProp,
  className,
  watermark = false
}) {
  const size = sizeProp ?? (watermark ? "watermark" : "md");
  const spec = SIZE[size];
  const visual = getTraitVisual(id);
  const { Icon, accentClass, glowClass } = visual;
  const isWatermark = size === "watermark";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative flex items-center justify-center shrink-0 overflow-hidden",
        spec.box,
        spec.rounded,
        isWatermark && "opacity-100",
        className
      ),
      title: name,
      children: [
        !isWatermark && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-brand-card-2 via-brand-card to-brand-bg" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0 bg-gradient-to-br opacity-80",
                glowClass
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "absolute inset-0 rounded-[inherit] border-brand-gold/20",
                spec.ring,
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_4px_16px_rgba(0,0,0,0.35)]"
              )
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-[1px] rounded-[inherit] bg-brand-card/40" })
        ] }),
        /* @__PURE__ */ jsx(
          Icon,
          {
            className: cn(
              "relative z-10 stroke-[2px]",
              spec.icon,
              accentClass,
              isWatermark ? "opacity-[0.12] text-brand-gold" : "drop-shadow-[0_0_10px_rgba(245,180,60,0.35)]"
            ),
            "aria-hidden": true
          }
        )
      ]
    }
  );
}
const CLOUD_NAME = "";
const UPLOAD_PRESET = "";
function isCloudinaryConfigured() {
  return Boolean((CLOUD_NAME == null ? void 0 : CLOUD_NAME.trim()) && (UPLOAD_PRESET == null ? void 0 : UPLOAD_PRESET.trim()));
}
async function uploadImageToCloudinary(file) {
  var _a;
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary is not configured");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    throw new Error(((_a = data.error) == null ? void 0 : _a.message) ?? "Upload failed");
  }
  return data.secure_url;
}
function CloudinaryFileUpload({
  onUploaded,
  onError,
  disabled = false,
  multiple = false,
  accept = "image/*",
  className,
  label = "Tải ảnh",
  uploadingLabel = "Đang tải lên...",
  variant = "outline"
}) {
  const fileInputRef = React.useRef(null);
  const [uploading, setUploading] = React.useState(false);
  if (!isCloudinaryConfigured()) return null;
  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!(files == null ? void 0 : files.length)) return;
    setUploading(true);
    try {
      const urls = [];
      for (const file of Array.from(files)) {
        const url = await uploadImageToCloudinary(file);
        urls.push(url);
      }
      onUploaded(urls);
    } catch (err) {
      onError == null ? void 0 : onError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept,
        multiple,
        className: "hidden",
        onChange: handleFileChange
      }
    ),
    /* @__PURE__ */ jsxs(
      Button,
      {
        type: "button",
        variant,
        onClick: () => {
          var _a;
          return (_a = fileInputRef.current) == null ? void 0 : _a.click();
        },
        disabled: disabled || uploading,
        className: cn("h-11 rounded-xl border-brand-border shrink-0", className),
        children: [
          uploading ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsx(ImagePlus, { className: "w-4 h-4 mr-2" }),
          uploading ? uploadingLabel : label
        ]
      }
    )
  ] });
}
const CloudinaryFileUpload$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CloudinaryFileUpload
}, Symbol.toStringTag, { value: "Module" }));
function AdminPageHeader({
  title,
  description,
  icon: Icon,
  breadcrumb,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          breadcrumb && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub mb-1.5 font-medium", children: breadcrumb }),
          /* @__PURE__ */ jsxs("h1", { className: "admin-h1 mb-1.5 flex items-center gap-2", children: [
            Icon && /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-brand-gold shrink-0", "aria-hidden": true }),
            title
          ] }),
          description && /* @__PURE__ */ jsx("p", { className: "admin-body max-w-2xl", children: description })
        ] }),
        children && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-3 shrink-0", children })
      ]
    }
  );
}
function AdminSuccessBanner({ message }) {
  if (!message) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 bg-brand-green/10 border border-brand-border text-brand-green p-4 rounded-xl text-[13px] font-semibold", children: message });
}
function AdminDemoBadge({ label = "Dữ liệu demo" }) {
  return /* @__PURE__ */ jsx("span", { className: "inline-flex items-center rounded-md border border-brand-border bg-brand-card-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-text-sub", children: label });
}
function AdminEmptyState({
  title,
  description
}) {
  return /* @__PURE__ */ jsxs("div", { className: "py-16 text-center", children: [
    /* @__PURE__ */ jsx("p", { className: "admin-table-cell font-semibold mb-1", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "admin-body", children: description })
  ] });
}
function getPageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = [1];
  if (current > 3) {
    pages.push("ellipsis");
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push("ellipsis");
  }
  if (total > 1) {
    pages.push(total);
  }
  return pages;
}
function Pagination({ currentPage, totalPages, onPageChange, className }) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(currentPage, totalPages);
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-1.5 overflow-x-auto hide-scrollbar", className), children: [
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        disabled: currentPage === 1,
        onClick: () => onPageChange(currentPage - 1),
        className: "h-9 w-9 p-0 hover:bg-white/5 rounded-lg text-brand-text-sub disabled:opacity-40 disabled:cursor-not-allowed text-white shrink-0",
        children: /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" })
      }
    ),
    pages.map(
      (page, idx) => page === "ellipsis" ? /* @__PURE__ */ jsx(
        "span",
        {
          className: "h-9 w-9 flex items-center justify-center text-brand-text-sub text-xs shrink-0",
          children: "…"
        },
        `ellipsis-${idx}`
      ) : /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          onClick: () => onPageChange(page),
          className: cn(
            "h-9 w-9 p-0 rounded-lg text-xs font-bold transition-all shrink-0",
            page === currentPage ? "bg-brand-gold/15 border border-brand-gold/20 text-brand-gold font-bold" : "hover:bg-white/5 text-brand-text-sub hover:text-white"
          ),
          children: page
        },
        page
      )
    ),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        disabled: currentPage === totalPages,
        onClick: () => onPageChange(currentPage + 1),
        className: "h-9 w-9 p-0 hover:bg-white/5 rounded-lg text-brand-text-sub disabled:opacity-40 disabled:cursor-not-allowed text-white shrink-0",
        children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      }
    )
  ] });
}
function AdminTable({
  className,
  minWidth = "850px",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "table",
    {
      className: cn("w-full text-left border-collapse admin-table-cell", className),
      style: { minWidth },
      ...props,
      children
    }
  );
}
function AdminThead({ className, sticky = true, ...props }) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      className: cn(
        "admin-table-head border-b border-brand-border bg-brand-card-2/80 backdrop-blur-sm",
        sticky && "sticky top-0 z-10",
        className
      ),
      ...props
    }
  );
}
function AdminTh({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      className: cn("py-3.5 px-4 first:pl-6 last:pr-6 font-semibold whitespace-nowrap", className),
      ...props
    }
  );
}
function AdminTr({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn(
        "border-b border-brand-border last:border-0 hover:bg-brand-card-2/30 transition-colors",
        className
      ),
      ...props
    }
  );
}
function AdminTd({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      className: cn("py-3.5 px-4 first:pl-6 last:pr-6 align-middle", className),
      ...props
    }
  );
}
function AdminTableScroll({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("w-full overflow-auto custom-scrollbar flex-1 min-h-0", className),
      ...props,
      children
    }
  );
}
function AdminTableFooterText({
  start,
  end,
  total,
  label = "bản ghi"
}) {
  if (total === 0) {
    return /* @__PURE__ */ jsxs("p", { className: "admin-meta", children: [
      "Không có ",
      label
    ] });
  }
  return /* @__PURE__ */ jsxs("p", { className: "admin-meta", children: [
    "Hiển thị ",
    start,
    " đến ",
    end,
    " trên tổng số ",
    total,
    " ",
    label
  ] });
}
function AdminDataTable({
  toolbar,
  children,
  footer,
  currentPage,
  totalPages,
  onPageChange,
  emptyTitle,
  emptyDescription,
  isEmpty,
  fillHeight = false,
  className
}) {
  const showPagination = totalPages !== void 0 && currentPage !== void 0 && onPageChange !== void 0 && totalPages > 1;
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: cn(
        "flex flex-col bg-brand-card border-brand-border rounded-xl shadow-none overflow-hidden",
        fillHeight && "flex-1 min-h-0 h-full",
        className
      ),
      children: [
        toolbar && /* @__PURE__ */ jsx("div", { className: "shrink-0 border-b border-brand-border bg-brand-card-2/30", children: toolbar }),
        isEmpty && emptyTitle ? /* @__PURE__ */ jsx(AdminEmptyState, { title: emptyTitle, description: emptyDescription }) : fillHeight ? /* @__PURE__ */ jsx(AdminTableScroll, { children }) : /* @__PURE__ */ jsx("div", { className: "w-full overflow-auto custom-scrollbar", children }),
        (showPagination || footer) && /* @__PURE__ */ jsxs("div", { className: "shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-brand-border bg-brand-card-2/20", children: [
          footer,
          showPagination && /* @__PURE__ */ jsx(
            Pagination,
            {
              currentPage,
              totalPages,
              onPageChange,
              className: "ml-auto"
            }
          )
        ] })
      ]
    }
  );
}
function AdminToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  children,
  className,
  inline = false
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        inline ? "flex flex-row items-center gap-2 p-3 overflow-x-auto" : "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4",
        className
      ),
      children: [
        onSearchChange !== void 0 && /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "relative group shrink-0",
              inline ? "flex-1 min-w-[140px] max-w-xs" : "w-full sm:max-w-sm lg:flex-1"
            ),
            children: [
              /* @__PURE__ */ jsx(
                Search,
                {
                  className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-sub group-focus-within:text-brand-gold transition-colors pointer-events-none",
                  "aria-hidden": true
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  value: searchValue ?? "",
                  onChange: (e) => onSearchChange(e.target.value),
                  placeholder: searchPlaceholder,
                  className: "pl-10 h-10 text-[13px] bg-brand-card border-brand-border rounded-xl"
                }
              )
            ]
          }
        ),
        children && /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "flex items-center gap-2 shrink-0",
              inline ? "flex-nowrap" : "flex-wrap sm:gap-3 w-full sm:w-auto sm:ml-auto"
            ),
            children
          }
        )
      ]
    }
  );
}
function AdminStatCards({ stats, className }) {
  return /* @__PURE__ */ jsx("div", { className: cn("grid grid-cols-2 lg:grid-cols-4 gap-4", className), children: stats.map((stat) => /* @__PURE__ */ jsxs(
    Card,
    {
      className: "bg-brand-card border-brand-border rounded-xl p-4 sm:p-5",
      children: [
        /* @__PURE__ */ jsx("p", { className: "admin-eyebrow mb-2", children: stat.label }),
        /* @__PURE__ */ jsx("p", { className: "admin-stat-value", children: stat.value }),
        stat.sub && /* @__PURE__ */ jsx("p", { className: "admin-meta mt-1", children: stat.sub })
      ]
    },
    stat.label
  )) });
}
function AdminDeleteDialog({
  open,
  onOpenChange,
  title = "Xác nhận xóa",
  description,
  onConfirm,
  confirmLabel = "Xóa vĩnh viễn"
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "bg-brand-card border-brand-border rounded-xl max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxs(DialogTitle, { className: "admin-dialog-title flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(AlertTriangle, { className: "h-5 w-5 text-brand-red shrink-0" }),
        title
      ] }),
      /* @__PURE__ */ jsx(DialogDescription, { className: "admin-body leading-relaxed pt-1", children: description })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "gap-2 sm:gap-2 border-t border-brand-border pt-4", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          className: "rounded-xl",
          onClick: () => onOpenChange(false),
          children: "Hủy"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "danger",
          className: "rounded-xl",
          onClick: () => {
            onConfirm();
            onOpenChange(false);
          },
          children: confirmLabel
        }
      )
    ] })
  ] }) });
}
function traitFormFromRecord(record) {
  return {
    icon: record.icon,
    name: record.name,
    description: record.description,
    iconUrl: record.iconUrl
  };
}
function traitFromFormValue(value, id, milestones, defaultDesc = "Hiệu ứng kích hoạt đặc trưng.") {
  return {
    id,
    name: value.name.trim(),
    icon: value.icon.trim() || "🛡️",
    description: value.description.trim() || defaultDesc,
    ...value.iconUrl ? { iconUrl: value.iconUrl.trim() } : {},
    milestones
  };
}
function useAdminPagination(items, deps, pageSize = 10) {
  const [currentPage, setCurrentPage] = React.useState(1);
  React.useEffect(() => {
    setCurrentPage(1);
  }, deps);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  return {
    currentPage: safePage,
    setCurrentPage,
    pageSize,
    totalPages,
    startIndex,
    paginatedItems
  };
}
function useAdminCrudDialogs() {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const openAdd = React.useCallback(() => setIsAddOpen(true), []);
  const closeAdd = React.useCallback(() => setIsAddOpen(false), []);
  const openEdit = React.useCallback((item) => {
    setEditingItem(item);
    setIsEditOpen(true);
  }, []);
  const closeEdit = React.useCallback(() => {
    setEditingItem(null);
    setIsEditOpen(false);
  }, []);
  const openDelete = React.useCallback((item) => {
    setDeleteTarget(item);
    setIsDeleteOpen(true);
  }, []);
  const closeDelete = React.useCallback(() => {
    setDeleteTarget(null);
    setIsDeleteOpen(false);
  }, []);
  return {
    isAddOpen,
    setIsAddOpen,
    isEditOpen,
    setIsEditOpen,
    editingItem,
    setEditingItem,
    isDeleteOpen,
    setIsDeleteOpen,
    deleteTarget,
    setDeleteTarget,
    openAdd,
    closeAdd,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete
  };
}
function useAdminSuccessToast(durationMs = 3e3) {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const showSuccess = React.useCallback(
    (message) => {
      setSuccessMessage(message);
      window.setTimeout(() => setSuccessMessage(null), durationMs);
    },
    [durationMs]
  );
  const clearSuccess = React.useCallback(() => setSuccessMessage(null), []);
  return { successMessage, showSuccess, clearSuccess };
}
function useAdminListPage({
  items,
  pageSize = 10,
  searchTerm,
  match,
  resetDeps = []
}) {
  const dialogs = useAdminCrudDialogs();
  const { successMessage, showSuccess } = useAdminSuccessToast();
  const filteredItems = React.useMemo(
    () => items.filter((item) => match(item, searchTerm)),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- resetDeps supplied by caller for extra filters
    [items, searchTerm, match, ...resetDeps]
  );
  const pagination = useAdminPagination(filteredItems, [searchTerm, ...resetDeps], pageSize);
  return {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    ...pagination
  };
}
const AdminTraitForm$2 = React.lazy(
  () => Promise.resolve().then(() => AdminTraitForm$1).then((m) => ({ default: m.AdminTraitForm }))
);
function TraitFormFallback() {
  return /* @__PURE__ */ jsx("div", { className: "py-8 text-center admin-meta text-brand-text-sub", children: "Đang tải biểu mẫu tộc/hệ..." });
}
const PANEL_CONFIG = {
  race: {
    emptyMessage: "Không tìm thấy chủng tộc nào phù hợp.",
    idLabel: "TỘC",
    addButton: "Thêm Tộc mới",
    addTitle: "Khởi tạo Tộc hệ",
    addDesc: "Cài đặt biểu tượng và hiệu ứng mốc kích hoạt cho chủng tộc mới.",
    nameLabel: "Tên Tộc",
    namePlaceholder: "Ví dụ: Ác Ma",
    defaultIcon: "🛡️",
    defaultDesc: "Hiệu ứng kích hoạt đặc trưng.",
    defaultMilestones: [
      { count: 2, effect: "Tăng 10% chỉ số." },
      { count: 4, effect: "Tăng 25% chỉ số." }
    ],
    detailBadge: "SYNERGY CHỦNG TỘC",
    editTitle: "Sửa Tộc hệ",
    editDesc: "Cập nhật biểu tượng và mô tả thuộc tính của chủng tộc.",
    deleteTitle: "Xác nhận xóa chủng tộc",
    deleteConfirm: "Xóa tộc",
    paginationUnit: "chủng tộc hệ",
    searchPlaceholder: "Tìm kiếm danh mục tộc hệ..."
  },
  class: {
    emptyMessage: "Không tìm thấy hệ nào phù hợp.",
    idLabel: "HỆ",
    addButton: "Thêm Hệ mới",
    addTitle: "Khởi tạo Hệ tướng",
    addDesc: "Cài đặt biểu tượng và hiệu ứng mốc kích hoạt cho nghề nghiệp mới.",
    nameLabel: "Tên Hệ",
    namePlaceholder: "Ví dụ: Chiến Binh",
    defaultIcon: "⚔️",
    defaultDesc: "Hiệu ứng hỗ trợ chỉ số mốc kích hoạt.",
    defaultMilestones: [
      { count: 3, effect: "Kích hoạt hiệu ứng nhẹ." },
      { count: 6, effect: "Kích hoạt hiệu ứng tối đa." }
    ],
    detailBadge: "SYNERGY NGHỀ NGHIỆP",
    editTitle: "Sửa Hệ tướng",
    editDesc: "Cập nhật biểu tượng và mô tả thuộc tính của hệ.",
    deleteTitle: "Xác nhận xóa hệ tướng",
    deleteConfirm: "Xóa hệ",
    paginationUnit: "hệ tướng",
    searchPlaceholder: "Tìm kiếm danh mục hệ tướng..."
  }
};
function countHeroesForTrait(row, heroes, kind) {
  if (kind === "race") {
    return heroes.filter((h) => h.race.includes(row.name)).length;
  }
  return heroes.filter((h) => h.class.includes(row.name)).length;
}
function emptyTraitForm(defaultIcon) {
  return { icon: defaultIcon, name: "", description: "" };
}
function AdminTraitPanel({ kind }) {
  const config = PANEL_CONFIG[kind];
  const store = useAppStore();
  const items = kind === "race" ? store.races : store.classes;
  const addItem = kind === "race" ? store.addRace : store.addClass;
  const updateItem = kind === "race" ? store.updateRace : store.updateClass;
  const deleteItem = kind === "race" ? store.deleteRace : store.deleteClass;
  const { heroes } = store;
  const [searchTerm, setSearchTerm] = React.useState("");
  const [newTraitForm, setNewTraitForm] = React.useState(() => emptyTraitForm(config.defaultIcon));
  const [isDetailOpen, setIsDetailOpen] = React.useState(false);
  const [detailItem, setDetailItem] = React.useState(null);
  const matchTrait = React.useCallback(
    (item, q) => item.name.toLowerCase().includes(q.toLowerCase()),
    []
  );
  const {
    dialogs,
    successMessage,
    showSuccess,
    filteredItems,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex
  } = useAdminListPage({
    items,
    searchTerm,
    match: matchTrait,
    resetDeps: [kind]
  });
  const openAddDialog = () => {
    setNewTraitForm(emptyTraitForm(config.defaultIcon));
    dialogs.openAdd();
  };
  const handleCreate = () => {
    if (!newTraitForm.name.trim()) return;
    const id = newTraitForm.name.toLowerCase().replace(/\s+/g, "-");
    addItem(
      traitFromFormValue(newTraitForm, id, [...config.defaultMilestones], config.defaultDesc)
    );
    setNewTraitForm(emptyTraitForm(config.defaultIcon));
    showSuccess(`Đã thêm ${config.idLabel.toLowerCase()} "${newTraitForm.name.trim()}".`);
    dialogs.closeAdd();
  };
  const handleUpdate = () => {
    if (!dialogs.editingItem || !dialogs.editingItem.name.trim()) return;
    updateItem(dialogs.editingItem.id, dialogs.editingItem);
    showSuccess(`Đã cập nhật "${dialogs.editingItem.name}".`);
    dialogs.closeEdit();
  };
  const confirmDelete = () => {
    if (dialogs.deleteTarget) {
      deleteItem(dialogs.deleteTarget.id);
      showSuccess(`Đã xóa "${dialogs.deleteTarget.name}".`);
      dialogs.closeDelete();
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(AdminSuccessBanner, { message: successMessage ?? "" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-h-0 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-end shrink-0", children: /* @__PURE__ */ jsxs(
        Button,
        {
          size: "default",
          onClick: openAddDialog,
          className: "gap-2 bg-gold-gradient text-black font-bold admin-meta uppercase tracking-wider h-11 px-6 rounded-xl transition-all hover:scale-[1.02]",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "h-4.5 w-4.5 stroke-[3px]" }),
            " ",
            config.addButton
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        AdminDataTable,
        {
          fillHeight: true,
          toolbar: /* @__PURE__ */ jsx(
            AdminToolbar,
            {
              searchValue: searchTerm,
              onSearchChange: setSearchTerm,
              searchPlaceholder: config.searchPlaceholder
            }
          ),
          footer: /* @__PURE__ */ jsx(
            AdminTableFooterText,
            {
              start: filteredItems.length > 0 ? startIndex + 1 : 0,
              end: Math.min(startIndex + 10, filteredItems.length),
              total: filteredItems.length,
              label: config.paginationUnit
            }
          ),
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          isEmpty: paginatedItems.length === 0,
          emptyTitle: config.emptyMessage,
          children: /* @__PURE__ */ jsxs(AdminTable, { children: [
            /* @__PURE__ */ jsx(AdminThead, { children: /* @__PURE__ */ jsxs(AdminTr, { children: [
              /* @__PURE__ */ jsx(AdminTh, { className: "w-24 text-center", children: "BIỂU TƯỢNG" }),
              /* @__PURE__ */ jsx(AdminTh, { children: "Tên" }),
              /* @__PURE__ */ jsx(AdminTh, { children: "Mô tả" }),
              /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-36", children: "Tổng tướng" }),
              /* @__PURE__ */ jsx(AdminTh, { className: "text-center w-40", children: "Mốc kích hoạt" }),
              /* @__PURE__ */ jsx(AdminTh, { className: "text-right w-44", children: "Thao tác" })
            ] }) }),
            /* @__PURE__ */ jsx("tbody", { children: paginatedItems.map((row) => {
              var _a;
              const heroCount = countHeroesForTrait(row, heroes, kind);
              return /* @__PURE__ */ jsxs(AdminTr, { className: "group", children: [
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx("div", { className: "mx-auto", children: /* @__PURE__ */ jsx(
                  TraitIcon,
                  {
                    id: row.id,
                    iconUrl: row.iconUrl,
                    icon: row.icon,
                    name: row.name,
                    size: "md",
                    className: "group-hover:scale-110 transition-transform"
                  }
                ) }) }),
                /* @__PURE__ */ jsx(AdminTd, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-text-main admin-body group-hover:text-brand-gold transition-colors leading-snug tracking-tight", children: row.name }),
                  /* @__PURE__ */ jsxs("span", { className: "admin-meta text-brand-text-sub font-mono mt-0.5 tracking-wider uppercase", children: [
                    config.idLabel,
                    ": ",
                    row.id
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-brand-text-sub admin-body leading-relaxed max-w-[280px] truncate", children: row.description }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1 px-3 py-1 bg-brand-card-2 rounded-md text-brand-text-main font-bold admin-meta border border-brand-border font-mono", children: [
                  /* @__PURE__ */ jsx(Zap, { className: "h-3 w-3 text-brand-gold" }),
                  heroCount,
                  " nhân sĩ"
                ] }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-1.5", children: (_a = row.milestones) == null ? void 0 : _a.map((m, i) => /* @__PURE__ */ jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "h-7 w-7 p-0 flex items-center justify-center rounded-lg border-brand-gold/20 text-brand-gold font-bold admin-meta bg-brand-gold/5",
                    children: m.count
                  },
                  i
                )) }) }),
                /* @__PURE__ */ jsx(AdminTd, { className: "text-right", children: /* @__PURE__ */ jsx(
                  AdminRowActions,
                  {
                    onView: () => {
                      setDetailItem(row);
                      setIsDetailOpen(true);
                    },
                    onEdit: () => dialogs.openEdit({ ...row }),
                    onDelete: () => dialogs.openDelete(row)
                  }
                ) })
              ] }, row.id);
            }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isAddOpen,
        onOpenChange: dialogs.setIsAddOpen,
        title: config.addTitle,
        description: config.addDesc,
        size: "md",
        onSubmit: handleCreate,
        submitLabel: "Lưu dữ liệu",
        cancelLabel: "Hủy bỏ",
        children: /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(TraitFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminTraitForm$2,
          {
            value: newTraitForm,
            onChange: setNewTraitForm,
            nameLabel: config.nameLabel,
            namePlaceholder: config.namePlaceholder,
            defaultIcon: config.defaultIcon
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminFormDialog,
      {
        open: dialogs.isEditOpen,
        onOpenChange: (open) => {
          dialogs.setIsEditOpen(open);
          if (!open) dialogs.setEditingItem(null);
        },
        title: config.editTitle,
        description: config.editDesc,
        size: "md",
        onSubmit: handleUpdate,
        submitLabel: "Cập nhật dữ liệu",
        cancelLabel: "Hủy bỏ",
        children: dialogs.editingItem && /* @__PURE__ */ jsx(React.Suspense, { fallback: /* @__PURE__ */ jsx(TraitFormFallback, {}), children: /* @__PURE__ */ jsx(
          AdminTraitForm$2,
          {
            showIconUrl: true,
            value: traitFormFromRecord(dialogs.editingItem),
            onChange: (value) => dialogs.setEditingItem(
              traitFromFormValue(value, dialogs.editingItem.id, dialogs.editingItem.milestones)
            ),
            nameLabel: config.nameLabel,
            namePlaceholder: config.namePlaceholder,
            defaultIcon: config.defaultIcon
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDetailDialog,
      {
        open: isDetailOpen,
        onOpenChange: setIsDetailOpen,
        title: (detailItem == null ? void 0 : detailItem.name) ?? "Chi tiết",
        size: "md",
        footer: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => setIsDetailOpen(false),
            className: "w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest",
            children: "Đóng"
          }
        ),
        children: detailItem && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border", children: [
            /* @__PURE__ */ jsx(
              TraitIcon,
              {
                id: detailItem.id,
                iconUrl: detailItem.iconUrl,
                icon: detailItem.icon,
                name: detailItem.name,
                size: "lg"
              }
            ),
            /* @__PURE__ */ jsx(Badge, { variant: "warning-solid", children: config.detailBadge })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Mô tả" }),
            /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body", children: detailItem.description })
          ] }),
          detailItem.milestones && detailItem.milestones.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Mốc kích hoạt" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: detailItem.milestones.map((m, i) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-3 bg-brand-card border border-brand-border p-2.5 rounded-lg",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "h-6 w-6 font-mono font-bold text-xs text-brand-gold bg-brand-gold/10 border border-brand-gold/20 rounded-md flex items-center justify-center", children: m.count }),
                  /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub admin-body font-medium leading-none", children: m.effect })
                ]
              },
              i
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      AdminDeleteDialog,
      {
        open: dialogs.isDeleteOpen,
        onOpenChange: (open) => {
          dialogs.setIsDeleteOpen(open);
          if (!open) dialogs.setDeleteTarget(null);
        },
        title: config.deleteTitle,
        description: dialogs.deleteTarget ? `Bạn có chắc muốn xóa vĩnh viễn "${dialogs.deleteTarget.name}" khỏi cẩm nang trò chơi?` : "",
        onConfirm: confirmDelete,
        confirmLabel: config.deleteConfirm
      }
    )
  ] });
}
function AdminCommentDetailDrawer({
  comment,
  threadComments,
  open,
  onOpenChange,
  onApprove,
  onDelete
}) {
  if (!comment) return null;
  const publicPath = `/thao-luan/${comment.threadId}`;
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      className: cn(
        "fixed right-0 top-0 flex h-full w-full max-w-md translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none rounded-l-xl border-l border-brand-border p-0",
        "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
      ),
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "shrink-0 border-b border-brand-border px-6 py-5 text-left", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "admin-dialog-title", children: "Chi tiết bình luận" }),
          /* @__PURE__ */ jsxs("p", { className: "admin-meta pt-1", children: [
            "Thread #",
            comment.threadId,
            " · ",
            comment.target
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-h-0 space-y-4 overflow-y-auto custom-scrollbar px-6 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card-2/50 p-4 space-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsx("span", { className: "admin-table-cell font-semibold", children: comment.author }),
              /* @__PURE__ */ jsx("span", { className: "admin-meta", children: comment.date }),
              /* @__PURE__ */ jsx(
                Badge,
                {
                  variant: comment.status === "Báo cáo" ? "danger" : comment.status === "Chờ duyệt" ? "warning" : "success",
                  className: "rounded-md",
                  children: comment.status
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "admin-table-cell leading-relaxed", children: comment.content }),
            /* @__PURE__ */ jsxs(
              Link,
              {
                to: publicPath,
                className: "inline-flex items-center gap-1.5 admin-meta font-medium text-brand-gold hover:underline",
                children: [
                  "Xem trên trang cộng đồng",
                  /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5" })
                ]
              }
            )
          ] }),
          threadComments.length > 1 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs("p", { className: "admin-eyebrow", children: [
              "Cùng thread (",
              threadComments.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: threadComments.map((c) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "rounded-lg border border-brand-border p-3 admin-table-cell",
                  c.id === comment.id && "border-brand-gold/30 bg-brand-gold/5"
                ),
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-brand-text-main", children: c.author }),
                    /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "rounded-md", children: c.status })
                  ] }),
                  /* @__PURE__ */ jsx("p", { className: "admin-body line-clamp-2", children: c.content })
                ]
              },
              c.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 gap-2 border-t border-brand-border px-6 py-4", children: [
          comment.status !== "Đã duyệt" && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              className: "flex-1 bg-brand-green/10 text-brand-green border border-brand-green/10 rounded-xl",
              onClick: () => onApprove(comment.id, comment.author),
              children: [
                /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 mr-1.5" }),
                "Duyệt"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              className: "flex-1 bg-brand-red/10 text-brand-red border border-brand-red/10 rounded-xl",
              onClick: () => onDelete(comment.id, comment.author),
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
                "Xóa"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
function AdminInlineFilter({
  label,
  value,
  onValueChange,
  placeholder = "Tất cả",
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex items-center h-10 rounded-xl border border-brand-border bg-brand-card shrink-0 overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "px-2.5 admin-meta font-semibold text-brand-text-sub whitespace-nowrap border-r border-brand-border h-full flex items-center bg-brand-card-2",
            "aria-hidden": true,
            children: label
          }
        ),
        /* @__PURE__ */ jsxs(Select, { value, onValueChange, children: [
          /* @__PURE__ */ jsx(
            SelectTrigger,
            {
              className: "h-10 min-w-[72px] max-w-[132px] border-0 rounded-none bg-transparent shadow-none focus:ring-0 px-2.5 text-[13px]",
              "aria-label": label,
              children: /* @__PURE__ */ jsx(SelectValue, { placeholder })
            }
          ),
          /* @__PURE__ */ jsx(SelectContent, { children })
        ] })
      ]
    }
  );
}
const VARIANT_CONFIG = {
  view: {
    icon: Eye,
    buttonClass: "hover:bg-brand-gold/10 hover:border-brand-gold/25 hover:text-brand-gold"
  },
  edit: {
    icon: SquarePen,
    buttonClass: "hover:bg-brand-gold/10 hover:border-brand-gold/25 hover:text-brand-gold"
  },
  delete: {
    icon: Trash2,
    buttonClass: "hover:bg-brand-red/10 hover:border-brand-red/25 hover:text-brand-red"
  }
};
function AdminTableActionButton({
  variant,
  onClick,
  label,
  className
}) {
  const { icon: Icon, buttonClass } = VARIANT_CONFIG[variant];
  return /* @__PURE__ */ jsx(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "icon",
      className: cn(
        "h-8 w-8 rounded-lg border border-brand-border bg-brand-card-2/50 text-brand-text-sub shadow-sm transition-all duration-200",
        buttonClass,
        className
      ),
      onClick,
      "aria-label": label,
      title: label,
      children: /* @__PURE__ */ jsx(Icon, { className: "h-3.5 w-3.5", strokeWidth: 2 })
    }
  );
}
function AdminListShell({
  header,
  beforeList,
  children,
  className
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-col gap-6 h-[calc(100vh-7rem)] sm:h-[calc(100vh-6.5rem)] min-h-[480px]",
        className
      ),
      children: [
        header,
        beforeList,
        /* @__PURE__ */ jsx("div", { className: "flex flex-col flex-1 min-h-0", children })
      ]
    }
  );
}
function AdminField({
  label,
  htmlFor,
  hint,
  required,
  className,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("space-y-1.5", className), children: [
    /* @__PURE__ */ jsxs("label", { htmlFor, className: "admin-form-label block", children: [
      label,
      required && /* @__PURE__ */ jsx("span", { className: "text-brand-red ml-0.5", children: "*" })
    ] }),
    children,
    hint && /* @__PURE__ */ jsx("p", { className: "admin-meta", children: hint })
  ] });
}
function AdminFormGrid({ columns = 2, className, children }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "grid gap-4 py-1",
        columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1",
        className
      ),
      children
    }
  );
}
function AdminFormGridFull({ className, children }) {
  return /* @__PURE__ */ jsx("div", { className: cn("md:col-span-2", className), children });
}
const SIZE_CLASSES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl"
};
function AdminFormDialog({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  onSubmit,
  submitLabel = "Lưu",
  cancelLabel = "Hủy",
  isSubmitting = false,
  submitDisabled = false,
  footer,
  className
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      className: cn(
        "flex flex-col gap-0 p-0 max-h-[90vh] overflow-hidden bg-brand-card border-brand-border rounded-xl",
        SIZE_CLASSES[size],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "shrink-0 px-6 pt-6 pb-4 border-b border-brand-border text-left space-y-1", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "admin-dialog-title", children: title }),
          description && /* @__PURE__ */ jsx(DialogDescription, { className: "admin-body mt-1", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 py-4", children }),
        /* @__PURE__ */ jsx(DialogFooter, { className: "shrink-0 px-6 py-4 border-t border-brand-border bg-brand-card-2/20 gap-2 sm:gap-3 sm:space-x-0", children: footer ?? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              className: "rounded-xl",
              onClick: () => onOpenChange(false),
              disabled: isSubmitting,
              children: cancelLabel
            }
          ),
          onSubmit && /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              className: "rounded-xl bg-gold-gradient text-black font-semibold hover-gold-gradient",
              onClick: onSubmit,
              disabled: submitDisabled || isSubmitting,
              children: submitLabel
            }
          )
        ] }) })
      ]
    }
  ) });
}
function AdminDetailDialog({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  children,
  footer,
  className
}) {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(
    DialogContent,
    {
      className: cn(
        "flex flex-col gap-0 p-0 max-h-[90vh] overflow-hidden bg-brand-card border-brand-border rounded-xl",
        SIZE_CLASSES[size],
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(DialogHeader, { className: "shrink-0 px-6 pt-6 pb-4 border-b border-brand-border text-left space-y-1", children: [
          /* @__PURE__ */ jsx(DialogTitle, { className: "admin-dialog-title", children: title }),
          description && /* @__PURE__ */ jsx(DialogDescription, { className: "admin-body mt-1", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1 min-h-0 overflow-y-auto custom-scrollbar px-6 py-4", children }),
        footer && /* @__PURE__ */ jsx(DialogFooter, { className: "shrink-0 px-6 py-4 border-t border-brand-border bg-brand-card-2/20 gap-2 sm:gap-3 sm:space-x-0", children: footer })
      ]
    }
  ) });
}
function AdminItemDetailDialog({ item, open, onOpenChange }) {
  return /* @__PURE__ */ jsx(
    AdminDetailDialog,
    {
      open,
      onOpenChange,
      title: (item == null ? void 0 : item.name) ?? "Chi tiết trang bị",
      size: "md",
      footer: item ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: "w-full sm:flex-1 h-11 bg-gold-gradient text-black rounded-xl font-bold uppercase admin-meta",
            children: /* @__PURE__ */ jsx(Link, { to: `/trang-bi/${item.id}`, target: "_blank", rel: "noreferrer", children: "Xem trên web" })
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => onOpenChange(false),
            variant: "outline",
            className: "w-full sm:flex-1 h-11 border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest",
            children: "Đóng"
          }
        )
      ] }) : void 0,
      children: item && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-orange-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(245,180,60,0.1)]", children: /* @__PURE__ */ jsx(Package, { className: "h-8 w-8 text-brand-gold" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: item.tier >= 4 ? "danger-solid" : "warning", children: [
              "BẬC ",
              item.tier
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "success", children: "TRANG BỊ MÙA MỚI" })
          ] })
        ] }),
        item.description && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Mô tả" }),
          /* @__PURE__ */ jsx("div", { className: "p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed", children: item.description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Chỉ số tăng dồn" }),
          /* @__PURE__ */ jsx("div", { className: "p-3.5 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body", children: item.stats })
        ] }),
        item.effect && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Hiệu ứng đặc biệt" }),
          /* @__PURE__ */ jsx("div", { className: "p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border text-brand-text-sub", children: item.effect })
        ] }),
        item.tacticalNotes && item.tacticalNotes.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Chiến thuật" }),
          /* @__PURE__ */ jsx("ul", { className: "p-3.5 rounded-xl bg-brand-card-2/50 border border-brand-border space-y-1 text-brand-text-sub list-disc pl-5", children: item.tacticalNotes.map((note) => /* @__PURE__ */ jsx("li", { children: note }, note)) })
        ] })
      ] })
    }
  );
}
function AdminBannerDetailDialog({
  banner,
  open,
  onOpenChange
}) {
  return /* @__PURE__ */ jsx(
    AdminDetailDialog,
    {
      open,
      onOpenChange,
      title: (banner == null ? void 0 : banner.title) ?? "Chi tiết banner",
      size: "md",
      footer: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => onOpenChange(false),
          className: "w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest",
          children: "Đóng cửa sổ"
        }
      ),
      children: banner && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full h-36 rounded-xl overflow-hidden border border-brand-border relative", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: banner.image,
              alt: banner.title,
              className: "w-full h-full object-cover",
              referrerPolicy: "no-referrer"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsxs(Badge, { variant: banner.status === "Hiện" ? "success" : "secondary", children: [
            "TRẠNG THÁI: ",
            banner.status.toUpperCase()
          ] }),
          /* @__PURE__ */ jsx(Badge, { variant: "outline", children: "SỰ KIỆN CHỦ" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Mô tả đặc quyền sự kiện" }),
          /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body", children: banner.subtitle })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-brand-text-sub font-mono admin-meta bg-brand-card-2/50 p-3 border border-brand-border rounded-xl", children: [
          /* @__PURE__ */ jsx("span", { children: "HÀNH ĐỘNG CLICK:" }),
          /* @__PURE__ */ jsx("strong", { className: "text-brand-text-main", children: banner.primaryButtonText })
        ] })
      ] })
    }
  );
}
function AdminRelicDetailDialog({ relic, open, onOpenChange }) {
  return /* @__PURE__ */ jsx(
    AdminDetailDialog,
    {
      open,
      onOpenChange,
      title: (relic == null ? void 0 : relic.name) ?? "Chi tiết dị vật",
      size: "md",
      footer: /* @__PURE__ */ jsx(
        Button,
        {
          onClick: () => onOpenChange(false),
          className: "w-full h-11 bg-transparent border border-brand-border text-brand-text-main hover:bg-brand-card-2 rounded-xl font-bold uppercase admin-meta tracking-widest",
          children: "Đóng cửa sổ"
        }
      ),
      children: relic && /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center space-y-4 pb-4 border-b border-brand-border", children: [
          /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl bg-gradient-to-tr from-brand-gold/25 to-yellow-500/5 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-[0_0_20px_rgba(245,180,60,0.1)]", children: /* @__PURE__ */ jsx(Gem, { className: "h-8 w-8 text-brand-gold animate-pulse" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxs(Badge, { variant: relic.rating === "S" ? "warning-solid" : "default", children: [
              "PHẨM ",
              relic.rating,
              " PHONG ẤN"
            ] }),
            /* @__PURE__ */ jsx(Badge, { variant: "outline", children: relic.type.toUpperCase() })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Thuộc tính phong ấn & Hiệu ứng" }),
          /* @__PURE__ */ jsx("div", { className: "p-4 rounded-xl bg-brand-card-2 border border-brand-border text-brand-text-sub leading-relaxed font-normal whitespace-pre-line admin-body", children: relic.effect })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1 bg-brand-card-2/50 p-3.5 border border-brand-border rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center admin-meta text-brand-text-sub font-mono", children: [
          /* @__PURE__ */ jsx("span", { children: "ĐIỂM CHỈ SỐ:" }),
          /* @__PURE__ */ jsx("span", { className: "text-brand-gold font-bold", children: "5.0 / 5.0" })
        ] }) })
      ] })
    }
  );
}
function AdminMediaPicker({
  value,
  onChange,
  media,
  label = "Chọn từ thư viện",
  categoryFilter = "Tướng",
  placeholder = "https://... hoặc /heroes/..."
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [urlError, setUrlError] = React.useState(null);
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return media.filter((asset) => {
      const matchesCategory = !categoryFilter || categoryFilter === "Tất cả" || asset.category === categoryFilter || asset.category === "Khác";
      if (!matchesCategory) return false;
      if (!q) return true;
      return asset.name.toLowerCase().includes(q) || asset.url.toLowerCase().includes(q) || asset.alt.toLowerCase().includes(q);
    });
  }, [media, categoryFilter, query]);
  const handleUrlChange = (next) => {
    const lower = next.trim().toLowerCase();
    if (lower.startsWith("data:") || lower.startsWith("blob:")) {
      setUrlError("Không lưu URL base64 hoặc blob. Dùng Cloudinary hoặc URL HTTPS.");
      return;
    }
    setUrlError(null);
    onChange(next);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          value,
          onChange: (e) => handleUrlChange(e.target.value),
          placeholder,
          className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30 flex-1 min-w-[200px]"
        }
      ),
      /* @__PURE__ */ jsx(
        CloudinaryFileUpload,
        {
          onUploaded: (urls) => {
            if (urls[0]) {
              setUrlError(null);
              onChange(urls[0]);
            }
          },
          onError: (message) => setUrlError(message),
          label: "Tải ảnh",
          uploadingLabel: "Đang tải..."
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "h-11 rounded-xl border-brand-border shrink-0",
          onClick: () => setOpen(true),
          children: label
        }
      )
    ] }),
    urlError && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-red font-medium", children: urlError }),
    value && isPersistableImageUrl(value) && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-2 rounded-xl border border-brand-border bg-brand-card-2", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-lg overflow-hidden bg-brand-card border border-brand-border shrink-0", children: /* @__PURE__ */ jsx("img", { src: value, alt: "", className: "w-full h-full object-cover", loading: "lazy" }) }),
      /* @__PURE__ */ jsx("span", { className: "admin-meta text-brand-text-sub truncate", children: value })
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-lg bg-brand-card border-brand-border rounded-xl p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsx(DialogHeader, { className: "px-6 pt-6 pb-4 border-b border-brand-border text-left", children: /* @__PURE__ */ jsx(DialogTitle, { className: "admin-dialog-title", children: "Thư viện ảnh" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Tìm theo tên hoặc URL...",
            className: "bg-brand-card border-brand-border rounded-xl h-10"
          }
        ),
        filtered.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "py-8 text-center text-brand-text-sub admin-body", children: [
          /* @__PURE__ */ jsx(Image, { className: "h-8 w-8 mx-auto mb-2 opacity-40" }),
          "Không có ảnh phù hợp. Thêm tại trang Media hoặc nhập URL trực tiếp."
        ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: filtered.map((asset) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              onChange(asset.url);
              setUrlError(null);
              setOpen(false);
            },
            className: cn(
              "text-left rounded-xl border p-2 transition-colors hover:bg-brand-card-2",
              value === asset.url ? "border-brand-gold/40 bg-brand-gold/5" : "border-brand-border bg-brand-card"
            ),
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-square rounded-lg overflow-hidden bg-brand-card-2 mb-2", children: /* @__PURE__ */ jsx("img", { src: asset.url, alt: asset.alt, className: "w-full h-full object-cover", loading: "lazy" }) }),
              /* @__PURE__ */ jsx("p", { className: "admin-meta font-bold text-brand-text-main truncate", children: asset.name }),
              /* @__PURE__ */ jsx("p", { className: "admin-meta text-brand-text-sub truncate", children: asset.category })
            ]
          },
          asset.id
        )) })
      ] })
    ] }) })
  ] });
}
function AdminRowActions({
  onView,
  onEdit,
  onDelete,
  viewLabel = "Xem",
  editLabel = "Sửa",
  deleteLabel = "Xóa",
  className
}) {
  return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center justify-end gap-1.5", className), children: [
    onView && /* @__PURE__ */ jsx(AdminTableActionButton, { variant: "view", onClick: onView, label: viewLabel }),
    onEdit && /* @__PURE__ */ jsx(AdminTableActionButton, { variant: "edit", onClick: onEdit, label: editLabel }),
    onDelete && /* @__PURE__ */ jsx(AdminTableActionButton, { variant: "delete", onClick: onDelete, label: deleteLabel })
  ] });
}
function AdminStatusSelect({ value, onChange, id }) {
  return /* @__PURE__ */ jsxs(Select, { value, onValueChange: onChange, children: [
    /* @__PURE__ */ jsx(SelectTrigger, { id, className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Trạng thái" }) }),
    /* @__PURE__ */ jsxs(SelectContent, { children: [
      /* @__PURE__ */ jsx(SelectItem, { value: "Hiện", children: "Hiện" }),
      /* @__PURE__ */ jsx(SelectItem, { value: "Ẩn", children: "Ẩn" })
    ] })
  ] });
}
function HeroCheckboxPicker({
  heroes,
  selectedIds,
  onChange,
  className
}) {
  const toggle = (heroId) => {
    if (selectedIds.includes(heroId)) {
      onChange(selectedIds.filter((id) => id !== heroId));
      return;
    }
    onChange([...selectedIds, heroId]);
  };
  return /* @__PURE__ */ jsx("div", { className: cn("grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto", className), children: heroes.map((hero) => {
    const checked = selectedIds.includes(hero.id);
    return /* @__PURE__ */ jsxs(
      "label",
      {
        className: cn(
          "flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer text-sm transition-colors",
          checked ? "border-brand-gold/40 bg-brand-gold/10 text-brand-text-main" : "border-brand-border bg-brand-card text-brand-text-sub hover:bg-brand-card-2"
        ),
        children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked,
              onChange: () => toggle(hero.id),
              className: "accent-brand-gold"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "truncate", children: hero.name })
        ]
      },
      hero.id
    );
  }) });
}
function AdminUserForm({ value, onChange, showStatus = false }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Tên người dùng", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.name,
        onChange: (e) => patch({ name: e.target.value }),
        placeholder: "Ví dụ: PlayerZero",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Địa chỉ Email", children: /* @__PURE__ */ jsx(
      Input,
      {
        type: "email",
        value: value.email,
        onChange: (e) => patch({ email: e.target.value }),
        placeholder: "email@example.com",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Vai trò hệ thống", children: /* @__PURE__ */ jsxs(Select, { value: value.role, onValueChange: (role) => patch({ role }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "Thành viên", children: "Thành viên (Player)" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Moderator", children: "Moderator (Điều hành viên)" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Admin", children: "Admin (Nhà quản trị)" })
      ] })
    ] }) }),
    showStatus && /* @__PURE__ */ jsx(AdminField, { label: "Trạng thái tài khoản", children: /* @__PURE__ */ jsxs(Select, { value: value.status, onValueChange: (status) => patch({ status }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "Hoạt động", children: "Hoạt động" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Bị khóa", children: "Bị khóa" })
      ] })
    ] }) })
  ] });
}
const EMPTY_USER_FORM = {
  name: "",
  email: "",
  role: "Thành viên",
  status: "Hoạt động"
};
function userFormFromRecord(user) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status
  };
}
const AdminUserForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminUserForm,
  EMPTY_USER_FORM,
  userFormFromRecord
}, Symbol.toStringTag, { value: "Module" }));
const ITEM_CATEGORIES = ["attack", "defense", "magic", "utility"];
function AdminItemForm({ value, onChange, heroes }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Tên trang bị", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.name,
        onChange: (e) => patch({ name: e.target.value }),
        placeholder: "Ví dụ: Búa Lôi Đình",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Cấp bậc (Tier)", children: /* @__PURE__ */ jsx(
      Input,
      {
        type: "number",
        value: value.tier,
        onChange: (e) => patch({ tier: Number(e.target.value) }),
        min: 1,
        max: 6,
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Loại trang bị", children: /* @__PURE__ */ jsxs(Select, { value: value.category, onValueChange: (v) => patch({ category: v }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsx(SelectContent, { children: ITEM_CATEGORIES.map((cat) => /* @__PURE__ */ jsx(SelectItem, { value: cat, children: cat }, cat)) })
    ] }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Tags (phân cách bằng dấu phẩy)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.tags,
        onChange: (e) => patch({ tags: e.target.value }),
        placeholder: "Carry, Late game",
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Chỉ số (tóm tắt)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.statsDesc,
        onChange: (e) => patch({ statsDesc: e.target.value }),
        className: "w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Mô tả ngắn", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.description,
        onChange: (e) => patch({ description: e.target.value }),
        className: "w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Hiệu ứng đặc biệt", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.effect,
        onChange: (e) => patch({ effect: e.target.value }),
        className: "w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Ghi chú chiến thuật (mỗi dòng một ý)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.tacticalNotes,
        onChange: (e) => patch({ tacticalNotes: e.target.value }),
        className: "w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main"
      }
    ) }) }),
    /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Tướng khuyên dùng", children: /* @__PURE__ */ jsx(
      HeroCheckboxPicker,
      {
        heroes,
        selectedIds: value.recommendedHeroIds,
        onChange: (recommendedHeroIds) => patch({ recommendedHeroIds })
      }
    ) }) })
  ] });
}
const EMPTY_ITEM_FORM = {
  name: "",
  tier: 1,
  category: "attack",
  tags: "",
  statsDesc: "",
  description: "",
  effect: "",
  tacticalNotes: "",
  recommendedHeroIds: []
};
function itemFormFromItem(item, heroes) {
  return {
    name: item.name,
    tier: item.tier,
    category: item.category ?? "attack",
    tags: (item.tags ?? []).join(", "),
    statsDesc: item.stats ?? "",
    description: item.description ?? "",
    effect: item.effect ?? "",
    tacticalNotes: (item.tacticalNotes ?? []).join("\n"),
    recommendedHeroIds: item.recommendedHeroIds ?? []
  };
}
function itemFromFormValue(value, id) {
  const tags = value.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  const tacticalNotes = value.tacticalNotes.split("\n").map((line) => line.trim()).filter(Boolean);
  return {
    id,
    name: value.name.trim(),
    tier: value.tier,
    category: value.category,
    stats: value.statsDesc.trim() || "Tăng chỉ số cơ bản.",
    ...value.description.trim() ? { description: value.description.trim() } : {},
    ...value.effect.trim() ? { effect: value.effect.trim() } : {},
    ...tacticalNotes.length ? { tacticalNotes } : {},
    ...value.recommendedHeroIds.length ? { recommendedHeroIds: value.recommendedHeroIds } : {},
    ...tags.length ? { tags } : {}
  };
}
const AdminItemForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminItemForm,
  EMPTY_ITEM_FORM,
  itemFormFromItem,
  itemFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
const MAX_HEROES = 10;
const DEFAULT_RADAR_STATS = {
  attack: 50,
  defense: 50,
  control: 50,
  difficulty: 50,
  economy: 50,
  lateGame: 50
};
const EMPTY_COMP_FORM = {
  name: "",
  tier: "S",
  difficulty: 3,
  desc: "",
  heroes: [],
  boardSlots: emptyBoardSlots(),
  radarStats: DEFAULT_RADAR_STATS,
  mainCoreId: "",
  coreHeroIds: [],
  strengthsText: "",
  weaknessesText: "",
  tipsText: "",
  roadmap: emptyRoadmap(),
  strongAgainstText: "",
  weakAgainstText: ""
};
function compFormFromComp(comp) {
  const heroIds = [...comp.heroes ?? []];
  return {
    name: comp.name,
    tier: comp.tier,
    difficulty: comp.difficulty ?? 3,
    desc: comp.desc,
    heroes: heroIds,
    boardSlots: boardSlotsFromRecord(comp.board, heroIds),
    radarStats: comp.radarStats ?? DEFAULT_RADAR_STATS,
    mainCoreId: comp.mainCoreId ?? "",
    coreHeroIds: comp.coreHeroIds ?? [],
    strengthsText: arrayToLines(comp.strengths),
    weaknessesText: arrayToLines(comp.weaknesses),
    tipsText: arrayToLines(comp.tips),
    roadmap: comp.roadmap ?? emptyRoadmap(),
    strongAgainstText: countersToLines(comp.strongAgainst, false),
    weakAgainstText: countersToLines(comp.weakAgainst, true)
  };
}
function compFromFormValue(value, id, heroes, existing) {
  const board = recordFromBoardSlots(value.boardSlots);
  const synergies = calcSynergiesFromHeroes(value.heroes, heroes);
  return {
    id,
    name: value.name.trim(),
    tier: value.tier,
    winRate: (existing == null ? void 0 : existing.winRate) ?? "0%",
    desc: value.desc.trim() || "Mô tả chiến thuật đội hình.",
    author: (existing == null ? void 0 : existing.author) ?? "Admin",
    likes: (existing == null ? void 0 : existing.likes) ?? "0",
    heroes: value.heroes,
    board,
    synergies,
    date: (existing == null ? void 0 : existing.date) ?? (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
    difficulty: value.difficulty,
    radarStats: value.radarStats,
    mainCoreId: value.mainCoreId || void 0,
    coreHeroIds: value.coreHeroIds.length ? value.coreHeroIds : void 0,
    strengths: (() => {
      const v = linesToArray(value.strengthsText);
      return v.length ? v : void 0;
    })(),
    weaknesses: (() => {
      const v = linesToArray(value.weaknessesText);
      return v.length ? v : void 0;
    })(),
    tips: (() => {
      const v = linesToArray(value.tipsText);
      return v.length ? v : void 0;
    })(),
    roadmap: roadmapHasContent(value.roadmap) ? value.roadmap : void 0,
    strongAgainst: (() => {
      const v = parseCounterLines(value.strongAgainstText, false);
      return v.length ? v : void 0;
    })(),
    weakAgainst: (() => {
      const v = parseCounterLines(value.weakAgainstText, true);
      return v.length ? v : void 0;
    })()
  };
}
const RADAR_STAT_FIELDS = [
  { key: "attack", label: "Tấn Công" },
  { key: "defense", label: "Phòng Thủ" },
  { key: "control", label: "Khống chế" },
  { key: "difficulty", label: "Độ Khó" },
  { key: "economy", label: "Kinh Tế" },
  { key: "lateGame", label: "Late Game" }
];
function clampRadarValue(value) {
  return Math.min(100, Math.max(0, Math.round(value)));
}
function toggleHeroId(list, heroId) {
  if (list.includes(heroId)) return list.filter((id) => id !== heroId);
  if (list.length >= MAX_HEROES) return list;
  return [...list, heroId];
}
function pruneBoardSlots(slots, allowed) {
  return slots.map((row) => row.map((id) => id && allowed.has(id) ? id : null));
}
function draftCompFromForm(value, heroes) {
  return {
    id: "draft",
    name: value.name || "Draft",
    author: "Admin",
    tier: value.tier,
    winRate: "0%",
    likes: "0",
    desc: value.desc,
    heroes: value.heroes,
    board: recordFromBoardSlots(value.boardSlots),
    synergies: calcSynergiesFromHeroes(value.heroes, heroes),
    date: (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN"),
    difficulty: value.difficulty
  };
}
function AdminCompForm({ value, onChange, heroes, autoRadar = false }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  const synergies = calcSynergiesFromHeroes(value.heroes, heroes);
  const handleHeroesChange = (next) => {
    const allowed = new Set(next);
    let updated = {
      ...value,
      heroes: next,
      boardSlots: pruneBoardSlots(value.boardSlots, allowed),
      coreHeroIds: value.coreHeroIds.filter((id) => next.includes(id)),
      mainCoreId: next.includes(value.mainCoreId) ? value.mainCoreId : ""
    };
    if (autoRadar && next.length > 0) {
      updated = {
        ...updated,
        radarStats: computeCompRadarStats(draftCompFromForm(updated, heroes), heroes)
      };
    }
    onChange(updated);
  };
  return /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Tên đội hình", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.name,
          onChange: (e) => patch({ name: e.target.value }),
          placeholder: "Ví dụ: Exodia 5 Vàng",
          className: "bg-brand-card-2 border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Độ ưu tiên (Tier)", children: /* @__PURE__ */ jsxs(Select, { value: value.tier, onValueChange: (tier) => patch({ tier }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-brand-card-2", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "S", children: "S Tier (Cực mạnh)" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "A", children: "A Tier (Mạnh)" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "B", children: "B Tier (Ổn định)" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "C", children: "C Tier (Tình huống)" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Độ khó vận hành (1-5)", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "number",
          min: 1,
          max: 5,
          value: value.difficulty,
          onChange: (e) => patch({ difficulty: Number(e.target.value) }),
          placeholder: "1-5 sao",
          className: "bg-brand-card-2 border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Mô tả lối chơi", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: value.desc,
          onChange: (e) => patch({ desc: e.target.value }),
          className: "w-full h-[120px] bg-brand-card-2 border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50",
          placeholder: "Hướng dẫn cách lên cấp và Slowroll..."
        }
      ) }),
      /* @__PURE__ */ jsx(HeroChipPicker, { heroes, selected: value.heroes, onChange: handleHeroesChange }),
      value.heroes.length > 0 && /* @__PURE__ */ jsx(
        CoreHeroFields,
        {
          heroes,
          selectedHeroIds: value.heroes,
          mainCoreId: value.mainCoreId,
          coreHeroIds: value.coreHeroIds,
          onMainCoreChange: (mainCoreId) => {
            const coreHeroIds = mainCoreId && !value.coreHeroIds.includes(mainCoreId) ? [...value.coreHeroIds, mainCoreId] : value.coreHeroIds;
            patch({ mainCoreId, coreHeroIds });
          },
          onCoreHeroIdsChange: (coreHeroIds) => patch({
            coreHeroIds,
            mainCoreId: value.mainCoreId && coreHeroIds.includes(value.mainCoreId) ? value.mainCoreId : ""
          })
        }
      ),
      /* @__PURE__ */ jsx(
        BoardSlotPicker,
        {
          heroes,
          selectedHeroIds: value.heroes,
          slots: value.boardSlots,
          onChange: (boardSlots) => patch({ boardSlots })
        }
      ),
      /* @__PURE__ */ jsx(AdminField, { label: "Tộc/hệ tự tính", children: /* @__PURE__ */ jsx(SynergyPreview, { synergies }) }),
      /* @__PURE__ */ jsx(
        RadarStatsFields,
        {
          value: value.radarStats,
          onChange: (radarStats) => patch({ radarStats })
        }
      ),
      /* @__PURE__ */ jsx(
        CompGuideFields,
        {
          strengths: value.strengthsText,
          weaknesses: value.weaknessesText,
          tips: value.tipsText,
          roadmap: value.roadmap,
          strongAgainstText: value.strongAgainstText,
          weakAgainstText: value.weakAgainstText,
          onStrengthsChange: (strengthsText) => patch({ strengthsText }),
          onWeaknessesChange: (weaknessesText) => patch({ weaknessesText }),
          onTipsChange: (tipsText) => patch({ tipsText }),
          onRoadmapChange: (roadmap) => patch({ roadmap }),
          onStrongAgainstChange: (strongAgainstText) => patch({ strongAgainstText }),
          onWeakAgainstChange: (weakAgainstText) => patch({ weakAgainstText })
        }
      )
    ] })
  ] });
}
function RadarStatsFields({
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-[12px] font-semibold text-brand-text-sub", children: "Chỉ số phân tích (0–100)" }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3", children: RADAR_STAT_FIELDS.map(({ key, label }) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(AdminField, { label, children: /* @__PURE__ */ jsx(
      Input,
      {
        type: "number",
        min: 0,
        max: 100,
        value: value[key],
        onChange: (e) => onChange({ ...value, [key]: clampRadarValue(Number(e.target.value)) }),
        className: "bg-brand-card-2 border-brand-border rounded-xl h-11"
      }
    ) }) }, key)) })
  ] });
}
function HeroChipPicker({
  heroes,
  selected,
  onChange
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("label", { className: "text-[12px] font-semibold text-brand-text-sub", children: "Tướng chủ lực (tối đa 10)" }),
      /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-brand-text-sub font-mono", children: [
        selected.length,
        "/",
        MAX_HEROES
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 max-h-[140px] overflow-y-auto custom-scrollbar p-1", children: heroes.map((hero) => {
      const active = selected.includes(hero.id);
      return /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange(toggleHeroId(selected, hero.id)),
          className: cn(
            "px-3 py-1.5 rounded-md text-[11px] font-semibold border transition-all",
            active ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:border-brand-gold/30 hover:text-brand-text-main"
          ),
          children: hero.name
        },
        hero.id
      );
    }) })
  ] });
}
function BoardSlotPicker({
  heroes,
  selectedHeroIds,
  slots,
  onChange
}) {
  const heroMap = new Map(heroes.map((h) => [h.id, h.name]));
  const pickable = selectedHeroIds.map((id) => ({ id, name: heroMap.get(id) ?? id })).filter((h) => h.name);
  const updateSlot = (row, col, heroId) => {
    const next = slots.map((r) => [...r]);
    next[row][col] = heroId || null;
    onChange(next);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("label", { className: "text-[12px] font-semibold text-brand-text-sub", children: "Sắp xếp bàn cờ (4×2)" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2 rounded-xl border border-brand-border bg-brand-card-2/50 p-3", children: Array.from({ length: BOARD_ROWS }, (_, row) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: "w-20 shrink-0 text-[10px] font-semibold text-brand-text-sub", children: BOARD_ROW_LABELS[row] }),
      /* @__PURE__ */ jsx("div", { className: "grid flex-1 grid-cols-2 gap-2", children: [0, 1].map((col) => {
        var _a;
        return /* @__PURE__ */ jsxs(
          Select,
          {
            value: ((_a = slots[row]) == null ? void 0 : _a[col]) ? slots[row][col] : SELECT_EMPTY_VALUE,
            onValueChange: (v) => updateSlot(row, col, v === SELECT_EMPTY_VALUE ? "" : v),
            children: [
              /* @__PURE__ */ jsx(SelectTrigger, { size: "sm", className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: SELECT_EMPTY_VALUE, children: "— Trống —" }),
                pickable.map((hero) => /* @__PURE__ */ jsx(SelectItem, { value: hero.id, children: hero.name }, hero.id))
              ] })
            ]
          },
          col
        );
      }) })
    ] }, row)) })
  ] });
}
function toggleCoreHeroId(list, heroId) {
  if (list.includes(heroId)) return list.filter((id) => id !== heroId);
  return [...list, heroId];
}
function CoreHeroFields({
  heroes,
  selectedHeroIds,
  mainCoreId,
  coreHeroIds,
  onMainCoreChange,
  onCoreHeroIdsChange
}) {
  const roster = heroes.filter((h) => selectedHeroIds.includes(h.id));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Core chính", children: /* @__PURE__ */ jsxs(
      Select,
      {
        value: mainCoreId || SELECT_EMPTY_VALUE,
        onValueChange: (v) => onMainCoreChange(v === SELECT_EMPTY_VALUE ? "" : v),
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "bg-brand-card-2", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn core chính" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: SELECT_EMPTY_VALUE, children: "— Chưa chọn —" }),
            roster.map((hero) => /* @__PURE__ */ jsx(SelectItem, { value: hero.id, children: hero.name }, hero.id))
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsx("label", { className: "text-[12px] font-semibold text-brand-text-sub", children: "Core phụ (trong danh sách tướng đã chọn)" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 max-h-[100px] overflow-y-auto custom-scrollbar p-1", children: roster.map((hero) => {
        const active = coreHeroIds.includes(hero.id);
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => onCoreHeroIdsChange(toggleCoreHeroId(coreHeroIds, hero.id)),
            className: cn(
              "px-3 py-1.5 rounded-md text-[11px] font-semibold border transition-all",
              active ? "bg-gold-gradient text-black border-transparent" : "bg-brand-card-2 text-brand-text-sub border-brand-border hover:border-brand-gold/30"
            ),
            children: hero.name
          },
          hero.id
        );
      }) })
    ] })
  ] });
}
function CompGuideFields({
  strengths,
  weaknesses,
  tips,
  roadmap,
  strongAgainstText,
  weakAgainstText,
  onStrengthsChange,
  onWeaknessesChange,
  onTipsChange,
  onRoadmapChange,
  onStrongAgainstChange,
  onWeakAgainstChange
}) {
  const textareaClass = "w-full min-h-[80px] bg-brand-card-2 border border-brand-border rounded-xl p-3 text-[13px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50";
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Điểm mạnh (mỗi dòng 1 mục)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: strengths,
        onChange: (e) => onStrengthsChange(e.target.value),
        className: textareaClass,
        placeholder: "Sát thương late game mạnh\nKhống chế diện rộng"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Điểm yếu (mỗi dòng 1 mục)", children: /* @__PURE__ */ jsx("textarea", { value: weaknesses, onChange: (e) => onWeaknessesChange(e.target.value), className: textareaClass }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Lộ trình — Đầu game (1–10)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: roadmap.early ?? "",
        onChange: (e) => onRoadmapChange({ ...roadmap, early: e.target.value }),
        className: "bg-brand-card-2 border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Lộ trình — Giữa game (11–20)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: roadmap.mid ?? "",
        onChange: (e) => onRoadmapChange({ ...roadmap, mid: e.target.value }),
        className: "bg-brand-card-2 border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Lộ trình — Cuối game (21+)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: roadmap.late ?? "",
        onChange: (e) => onRoadmapChange({ ...roadmap, late: e.target.value }),
        className: "bg-brand-card-2 border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Có lợi trước (Tên | Lý do — mỗi dòng)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: strongAgainstText,
        onChange: (e) => onStrongAgainstChange(e.target.value),
        className: textareaClass,
        placeholder: "Warrior-Beast | Thiếu kháng phép"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Bất lợi trước (Tên | Lý do | Cách xử lý)", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: weakAgainstText,
        onChange: (e) => onWeakAgainstChange(e.target.value),
        className: textareaClass,
        placeholder: "Void Assassin | Nhảy vào carry | Đặt carry góc"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Tips nâng cao (mỗi dòng 1 tip)", children: /* @__PURE__ */ jsx("textarea", { value: tips, onChange: (e) => onTipsChange(e.target.value), className: textareaClass }) })
  ] });
}
function SynergyPreview({ synergies }) {
  if (synergies.length === 0) {
    return /* @__PURE__ */ jsx("p", { className: "text-[11px] text-brand-text-sub", children: "Chọn tướng để tự tính tộc/hệ." });
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 max-h-[72px] overflow-y-auto custom-scrollbar", children: synergies.slice(0, 8).map((syn) => /* @__PURE__ */ jsx(
    Badge,
    {
      variant: "secondary",
      className: cn(
        "text-[10px] font-semibold rounded-md",
        syn.active ? "bg-brand-green/10 text-brand-green border-brand-green/20" : "bg-brand-card-2 text-brand-text-sub border-brand-border"
      ),
      children: syn.name
    },
    syn.name
  )) });
}
const AdminCompForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminCompForm,
  DEFAULT_RADAR_STATS,
  EMPTY_COMP_FORM,
  compFormFromComp,
  compFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
function AdminBannerForm({ value, onChange }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { columns: 1, children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Tiêu đề Banner", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.title,
        onChange: (e) => patch({ title: e.target.value }),
        placeholder: "Ví dụ: Đại Tiệc Thượng Cổ",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Mô tả phụ thu hút", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.subtitle,
        onChange: (e) => patch({ subtitle: e.target.value }),
        placeholder: "Sở hữu mảnh tướng dũng mãnh và hòm dị vật hoàn toàn miễn phí...",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Tên nút hành động", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.primaryButtonText,
          onChange: (e) => patch({ primaryButtonText: e.target.value }),
          placeholder: "Ví dụ: Tham Chiến",
          className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Trạng thái phát hành", children: /* @__PURE__ */ jsx(AdminStatusSelect, { value: value.status, onChange: (status) => patch({ status }) }) })
    ] })
  ] });
}
const EMPTY_BANNER_FORM = {
  title: "",
  subtitle: "",
  primaryButtonText: "Khám phá",
  status: "Hiện"
};
const DEFAULT_BANNER_IMAGE = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800";
function bannerFormFromBanner(banner) {
  return {
    title: banner.title,
    subtitle: banner.subtitle,
    primaryButtonText: banner.primaryButtonText,
    status: banner.status
  };
}
function bannerFromFormValue(value, id, existing) {
  return {
    id,
    title: value.title.trim(),
    subtitle: value.subtitle.trim() || "Nhận cập nhật mới nhất từ mùa giải mới.",
    description: value.subtitle.trim() || "Banner quảng bá nội dung trên trang chủ.",
    primaryButtonText: value.primaryButtonText.trim() || "Xem ngay",
    primaryButtonLink: (existing == null ? void 0 : existing.primaryButtonLink) ?? "#",
    secondaryButtonText: (existing == null ? void 0 : existing.secondaryButtonText) ?? "",
    secondaryButtonLink: (existing == null ? void 0 : existing.secondaryButtonLink) ?? "",
    status: value.status,
    image: (existing == null ? void 0 : existing.image) ?? DEFAULT_BANNER_IMAGE
  };
}
const AdminBannerForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminBannerForm,
  EMPTY_BANNER_FORM,
  bannerFormFromBanner,
  bannerFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
function AdminRelicForm({ value, onChange }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Tên dị vật", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.name,
        onChange: (e) => patch({ name: e.target.value }),
        placeholder: "Ví dụ: Tà Thần Kiếm",
        className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Độ hiếm phẩm chất (Rating)", children: /* @__PURE__ */ jsxs(Select, { value: value.rating, onValueChange: (rating) => patch({ rating }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "S", children: "Phẩm S (Huyền thoại)" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "A", children: "Phẩm A (Quý hiếm)" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "B", children: "Phẩm B (Kho báu)" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "C", children: "Phẩm C (Phổ thông)" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Phân loại định hướng", children: /* @__PURE__ */ jsxs(Select, { value: value.type, onValueChange: (type) => patch({ type }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxs(SelectContent, { children: [
        /* @__PURE__ */ jsx(SelectItem, { value: "Tấn công", children: "Tấn công vũ lực" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Phòng thủ", children: "Phòng thủ kiên cố" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Đa dụng", children: "Đa dụng cơ động" }),
        /* @__PURE__ */ jsx(SelectItem, { value: "Phép thuật", children: "Phép thuật huyền bí" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Mô tả chi tiết hiệu ứng cổ vật", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.effect,
        onChange: (e) => patch({ effect: e.target.value }),
        className: "w-full h-[155px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50 transition-all",
        placeholder: "Hào quang tăng sát thương diện rộng và hồi máu cho chiến hữu xung quanh..."
      }
    ) })
  ] });
}
const EMPTY_RELIC_FORM = {
  name: "",
  rating: "S",
  type: "Tấn công",
  effect: ""
};
const AdminRelicForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminRelicForm,
  EMPTY_RELIC_FORM
}, Symbol.toStringTag, { value: "Module" }));
const TIER_OPTIONS = [
  { value: "Queen", label: "Bậc Queen (Nữ Hoàng)" },
  { value: "King", label: "Bậc King (Vua)" },
  { value: "Rook", label: "Bậc Rook (Xe)" },
  { value: "Bishop", label: "Bậc Bishop (Tượng)" }
];
function AdminPlayerForm({
  value,
  onChange,
  namePlaceholder = "Ví dụ: T_Rex_Auto"
}) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Mã Tên (IGN)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.name,
        onChange: (e) => patch({ name: e.target.value }),
        placeholder: namePlaceholder,
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Điểm số MMR", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.mmr,
        onChange: (e) => patch({ mmr: e.target.value }),
        placeholder: "Ví dụ: 3200",
        type: "number",
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Phân hạng", children: /* @__PURE__ */ jsxs(Select, { value: value.tier, onValueChange: (tier) => patch({ tier }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsx(SelectContent, { children: TIER_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
    ] }) })
  ] });
}
const EMPTY_PLAYER_FORM = {
  name: "",
  mmr: "",
  tier: "Queen"
};
function playerFormFromPlayer(player) {
  return {
    name: player.name,
    mmr: String(player.mmr),
    tier: player.tier
  };
}
function playerPatchFromFormValue(value) {
  return {
    name: value.name.trim(),
    mmr: parseInt(value.mmr, 10) || 1200,
    tier: value.tier
  };
}
function playerFromFormValue(value, id, rank) {
  const patch = playerPatchFromFormValue(value);
  return {
    id,
    rank,
    name: patch.name,
    server: "VN-1",
    mmr: patch.mmr,
    tier: patch.tier,
    winRate: "25.0%",
    matches: 10
  };
}
const AdminPlayerForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminPlayerForm,
  EMPTY_PLAYER_FORM,
  playerFormFromPlayer,
  playerFromFormValue,
  playerPatchFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
const PARTICIPANT_OPTIONS = ["16 Kì thủ", "32 Kì thủ", "64 Kì thủ", "128 Kì thủ"];
function AdminEventForm({ value, onChange, showStatus = false }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Tên giải đấu / Sự kiện", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.title,
        onChange: (e) => patch({ title: e.target.value }),
        placeholder: "Ví dụ: Đại chiến Vương Giả S20",
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Giải thưởng", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.prize,
          onChange: (e) => patch({ prize: e.target.value }),
          placeholder: "20,000,000 VND",
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Khởi tranh", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.date,
          onChange: (e) => patch({ date: e.target.value }),
          placeholder: "25/06/2026",
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Quy mô kì thủ", children: /* @__PURE__ */ jsxs(Select, { value: value.participants, onValueChange: (participants) => patch({ participants }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: PARTICIPANT_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option, children: option }, option)) })
      ] }) }),
      showStatus && /* @__PURE__ */ jsx(AdminField, { label: "Trạng thái", children: /* @__PURE__ */ jsxs(Select, { value: value.status, onValueChange: (status) => patch({ status }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "Cho đăng ký", children: "Cho đăng ký" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Sắp diễn ra", children: "Sắp diễn ra" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Kết thúc", children: "Kết thúc" })
        ] })
      ] }) })
    ] })
  ] });
}
const EMPTY_EVENT_FORM = {
  title: "",
  prize: "",
  date: "",
  participants: "64 Kì thủ",
  status: "Sắp diễn ra"
};
function eventFormFromEvent(event) {
  return {
    title: event.title,
    prize: event.prize,
    date: event.date,
    participants: event.participants,
    status: event.status
  };
}
function eventFromFormValue(value, id) {
  return {
    id,
    title: value.title.trim(),
    prize: value.prize.trim() || "Quà lưu niệm",
    date: value.date.trim() || "Chưa ấn định",
    participants: value.participants,
    status: value.status
  };
}
const AdminEventForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminEventForm,
  EMPTY_EVENT_FORM,
  eventFormFromEvent,
  eventFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
const MEDIA_CATEGORY_OPTIONS = [
  { value: "Tướng", label: "Tướng (Sprite)" },
  { value: "Trang bị", label: "Trang bị (Combat Item)" },
  { value: "Banners", label: "Ảnh Banners chính" },
  { value: "Khác", label: "Ảnh khác/Avatar" }
];
function AdminMediaForm({
  value,
  onChange,
  mode,
  urlError,
  onUrlError
}) {
  const patch = (partial) => onChange({ ...value, ...partial });
  const handleUrlChange = (next) => {
    const lower = next.trim().toLowerCase();
    if (lower.startsWith("data:") || lower.startsWith("blob:")) {
      onUrlError == null ? void 0 : onUrlError("Không lưu URL base64 hoặc blob.");
      return;
    }
    onUrlError == null ? void 0 : onUrlError(null);
    patch({ url: next });
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    mode === "create" ? /* @__PURE__ */ jsx(AdminField, { label: "Tên định danh tệp", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.title,
        onChange: (e) => patch({ title: e.target.value }),
        placeholder: "Ví dụ: sprite_queen_crown",
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }) : /* @__PURE__ */ jsx(AdminField, { label: "Tên tệp", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.name,
        onChange: (e) => patch({ name: e.target.value }),
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Văn bản thay thế (Alt)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.alt,
        onChange: (e) => patch({ alt: e.target.value }),
        placeholder: "Mô tả ngắn cho SEO",
        className: "bg-brand-card border-brand-border rounded-xl h-11"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Đường dẫn tệp CDN/Ảnh (URL)", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            value: value.url,
            onChange: (e) => handleUrlChange(e.target.value),
            placeholder: "https://...",
            className: "flex-1 min-w-[200px] bg-brand-card border-brand-border rounded-xl h-11"
          }
        ),
        /* @__PURE__ */ jsx(
          CloudinaryFileUpload,
          {
            onUploaded: (urls) => {
              if (urls[0]) {
                onUrlError == null ? void 0 : onUrlError(null);
                patch({ url: urls[0] });
              }
            },
            onError: (message) => onUrlError == null ? void 0 : onUrlError(message),
            label: "Tải file",
            uploadingLabel: "Đang tải..."
          }
        )
      ] }),
      urlError && /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-red font-medium", children: urlError })
    ] }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Phân nhóm Media", children: /* @__PURE__ */ jsxs(Select, { value: value.category, onValueChange: (category) => patch({ category }), children: [
      /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsx(SelectContent, { children: MEDIA_CATEGORY_OPTIONS.map((option) => /* @__PURE__ */ jsx(SelectItem, { value: option.value, children: option.label }, option.value)) })
    ] }) })
  ] });
}
const EMPTY_MEDIA_FORM = {
  title: "",
  name: "",
  alt: "",
  url: "",
  category: "Trang bị"
};
function mediaFormFromAsset(asset) {
  return {
    title: asset.name,
    name: asset.name,
    alt: asset.alt,
    url: asset.url,
    category: asset.category
  };
}
function mediaFromFormValue(value, id, mode, existing) {
  const displayName = mode === "create" ? value.title.trim() : value.name.trim();
  const name = mode === "create" ? displayName.toLowerCase().replace(/\s+/g, "_") + (value.url.endsWith(".png") ? "" : ".png") : value.name.trim();
  return {
    id,
    name,
    alt: value.alt.trim() || displayName,
    category: value.category,
    size: (existing == null ? void 0 : existing.size) ?? "120 KB",
    url: value.url.trim(),
    uploadedAt: (existing == null ? void 0 : existing.uploadedAt) ?? (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN")
  };
}
const AdminMediaForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminMediaForm,
  EMPTY_MEDIA_FORM,
  mediaFormFromAsset,
  mediaFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
const PAGE_META_DEFS = [
  { path: "/", name: "Trang chủ" },
  { path: "/doi-hinh", name: "Đội hình" },
  { path: "/tuong", name: "Tướng bóng tối" },
  { path: "/trang-bi", name: "Thư viện trang bị" }
];
const DEFAULT_PAGE_ROWS = [
  { path: "/", name: "Trang chủ", title: pageTitle(), desc: SITE_DESCRIPTION },
  {
    path: "/doi-hinh",
    name: "Đội hình",
    title: "Đội hình Auto Chess mạnh nhất | Meta đấu trường",
    desc: "Danh sách bento grid các đội hình khuyên dùng được xếp hạng S, A, B từ tuyển thủ chuyên nghiệp."
  },
  {
    path: "/tuong",
    name: "Tướng bóng tối",
    title: "Cơ sở dữ liệu tướng Auto Chess | Chỉ số & Kỹ năng",
    desc: "Tra cứu bộ chỉ số chi tiết của từng tướng bao gồm máu, sát thương, tầm đánh và mô tả chi tiết kỹ năng kích hoạt."
  },
  {
    path: "/trang-bi",
    name: "Thư viện trang bị",
    title: "Thư viện trang bị Auto Chess Mobile | Hiệu ứng & Meta",
    desc: "Tra cứu trang bị theo bậc, hiệu ứng đặc biệt, tướng khuyên dùng và gợi ý chiến thuật cho carry."
  }
];
function pagesMetaToRows(pagesMeta) {
  return PAGE_META_DEFS.map((def) => {
    const fallback = DEFAULT_PAGE_ROWS.find((row) => row.path === def.path);
    const stored = pagesMeta[def.path];
    return {
      ...def,
      title: (stored == null ? void 0 : stored.title) ?? (fallback == null ? void 0 : fallback.title) ?? pageTitle(def.name),
      desc: (stored == null ? void 0 : stored.description) ?? (fallback == null ? void 0 : fallback.desc) ?? SITE_DESCRIPTION
    };
  });
}
function rowsToPagesMeta(rows) {
  return Object.fromEntries(rows.map((row) => [row.path, { title: row.title, description: row.desc }]));
}
function buildDefaultSeoDraft(settings) {
  return {
    gaId: settings.gaId || "G-EBP92XXXXX",
    robots: settings.robotsTxt || `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml`,
    schemaJson: settings.jsonLd || `{
  "@context": "https://schema.org",
  "@type": "Game",
  "name": "${SITE_NAME}",
  "genre": "Strategy game"
}`,
    keywords: settings.keywords,
    pagesMeta: pagesMetaToRows(settings.pagesMeta)
  };
}
function AdminSeoForm({ value, onChange }) {
  const [newKeyword, setNewKeyword] = React.useState("");
  const patch = (partial) => onChange({ ...value, ...partial });
  const handleAddKeyword = () => {
    if (!newKeyword.trim() || value.keywords.includes(newKeyword.trim())) return;
    patch({ keywords: [...value.keywords, newKeyword.trim()] });
    setNewKeyword("");
  };
  const handleUpdatePageMeta = (index, field, fieldValue) => {
    patch({
      pagesMeta: value.pagesMeta.map(
        (row, i) => i === index ? { ...row, [field]: fieldValue } : row
      )
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8", children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title uppercase mb-6 border-b border-brand-border pb-4", children: "Cấu hình Thẻ Meta từng trang con" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          value.pagesMeta.map((page, idx) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "space-y-3 bg-brand-card-2/30 p-4 rounded-xl border border-brand-border",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "admin-table-cell font-bold text-brand-gold", children: page.name }),
                  /* @__PURE__ */ jsx("span", { className: "admin-meta font-mono", children: page.path })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Tiêu đề (Meta Title)" }),
                    /* @__PURE__ */ jsx(
                      Input,
                      {
                        value: page.title,
                        onChange: (e) => handleUpdatePageMeta(idx, "title", e.target.value),
                        className: "bg-brand-card border-brand-border rounded-xl text-[13px]"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Mô tả (Meta Description)" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        value: page.desc,
                        onChange: (e) => handleUpdatePageMeta(idx, "desc", e.target.value),
                        className: "w-full text-[13px] font-medium text-brand-text-main bg-brand-card border border-brand-border rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 h-16 resize-none"
                      }
                    )
                  ] })
                ] })
              ]
            },
            page.path
          )),
          /* @__PURE__ */ jsxs("p", { className: "admin-meta leading-relaxed pt-2 border-t border-brand-border", children: [
            "Meta tại đây lưu trong trình duyệt (localStorage) và chỉ áp dụng phía client — crawler và share preview Facebook/Zalo nhận meta từ SSR (",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "buildPageMeta" }),
            " ",
            "trong route). Để thay đổi meta production, cập nhật",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "STATIC_ROUTE_META" }),
            " hoặc loader tương ứng."
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "admin-meta leading-relaxed pt-2", children: [
            "Trang chi tiết động (",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "/tuong/:id" }),
            ",",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "/thao-luan/:id" }),
            ",",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "/trang-bi/:id" }),
            ",",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-mono text-brand-gold/80", children: "/toc-he/toc|he/:id" }),
            ") tự đặt title và mô tả theo dữ liệu từng mục khi render server-side."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6", children: [
          /* @__PURE__ */ jsxs("h4", { className: "admin-card-title uppercase mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "robots.txt" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Writable" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: value.robots,
              onChange: (e) => patch({ robots: e.target.value }),
              className: "w-full h-[180px] bg-brand-card border border-brand-border rounded-xl p-4 text-[12px] font-mono text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6", children: [
          /* @__PURE__ */ jsxs("h4", { className: "admin-card-title uppercase mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { children: "JSON-LD Structured Data" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: "Schema.org" })
          ] }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: value.schemaJson,
              onChange: (e) => patch({ schemaJson: e.target.value }),
              className: "w-full h-[180px] bg-brand-card border border-brand-border rounded-xl p-4 text-[12px] font-mono text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title uppercase mb-2", children: "Thẻ Từ Khóa (Keywords)" }),
        /* @__PURE__ */ jsx("p", { className: "admin-meta", children: "Từ khóa giúp tăng khả năng tìm kiếm chính xác bài viết và bảng số liệu trên các công cụ tìm kiếm." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              value: newKeyword,
              onChange: (e) => setNewKeyword(e.target.value),
              placeholder: "Thêm keyword...",
              className: "h-10 text-[13px]",
              onKeyDown: (e) => e.key === "Enter" && handleAddKeyword()
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleAddKeyword,
              className: "h-10 px-4 bg-brand-gold text-black shrink-0 font-bold text-[12px] rounded-xl shadow-none uppercase",
              children: "Thêm"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 pt-2", children: value.keywords.map((kw) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "inline-flex items-center gap-1 bg-brand-card-2 border border-brand-border text-brand-text-main pl-2.5 pr-1 py-1 rounded-lg text-[11px] font-bold tracking-wide",
            children: [
              /* @__PURE__ */ jsx("span", { children: kw }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => patch({ keywords: value.keywords.filter((k) => k !== kw) }),
                  className: "p-0.5 rounded hover:bg-brand-card text-brand-text-sub hover:text-brand-text-main transition-all",
                  children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
                }
              )
            ]
          },
          kw
        )) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "admin-card-title uppercase mb-2", children: "Analytics & Trackers" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Google Analytics ID" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.gaId,
                onChange: (e) => patch({ gaId: e.target.value }),
                placeholder: "G-XXXXXXXXXX",
                className: "h-10 text-[13px]"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 pt-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Bing Webmaster ID" }),
            /* @__PURE__ */ jsx(Input, { placeholder: "Không hoạt động", disabled: true, className: "h-10 text-[13px] opacity-40" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 space-y-4", children: [
        /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase mb-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Server, { className: "h-4 w-4 text-brand-gold" }),
          " Trạng thái SEO"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 max-w-full", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between admin-meta", children: [
            /* @__PURE__ */ jsx("span", { children: "Canonical:" }),
            /* @__PURE__ */ jsx("span", { className: "text-brand-green font-bold", children: "SSR tự động theo route" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between admin-meta", children: [
            /* @__PURE__ */ jsx("span", { children: "robots.txt:" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `${SITE_URL}/robots.txt`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-brand-gold font-bold hover:underline",
                children: [
                  SITE_URL,
                  "/robots.txt"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between admin-meta", children: [
            /* @__PURE__ */ jsx("span", { children: "Sitemap.xml:" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `${SITE_URL}/sitemap.xml`,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-brand-gold font-bold hover:underline",
                children: [
                  getSitemapUrlCount(),
                  " URL"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between admin-meta", children: [
            /* @__PURE__ */ jsx("span", { children: "Google Analytics:" }),
            /* @__PURE__ */ jsx("span", { className: "text-brand-text-sub font-medium", children: "Chưa có VITE_GA_ID" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "admin-meta leading-relaxed pt-2 border-t border-brand-border", children: "Meta title/description từng trang con ở trên vẫn lưu localStorage cho client overlay. SSR dùng cấu hình route meta mặc định; cập nhật seed/route meta để thay đổi SEO server-side." })
        ] })
      ] })
    ] })
  ] });
}
const AdminSeoForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminSeoForm,
  buildDefaultSeoDraft,
  pagesMetaToRows,
  rowsToPagesMeta
}, Symbol.toStringTag, { value: "Module" }));
function AdminTeamForm({ value, onChange }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { columns: 1, children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Họ tên", children: /* @__PURE__ */ jsx(Input, { value: value.name, onChange: (e) => patch({ name: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Vai trò", children: /* @__PURE__ */ jsx(Input, { value: value.role, onChange: (e) => patch({ role: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Avatar class (Tailwind)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.avatar,
        onChange: (e) => patch({ avatar: e.target.value }),
        placeholder: "bg-brand-gold"
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Giới thiệu", children: /* @__PURE__ */ jsx(Input, { value: value.bio, onChange: (e) => patch({ bio: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Link mạng xã hội", children: /* @__PURE__ */ jsx(Input, { value: value.socialUrl, onChange: (e) => patch({ socialUrl: e.target.value }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Thứ tự", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "number",
          value: value.order,
          onChange: (e) => patch({ order: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Trạng thái", children: /* @__PURE__ */ jsxs(Select, { value: value.status, onValueChange: (status) => patch({ status }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsx(SelectItem, { value: "Hiện", children: "Hiện" }),
          /* @__PURE__ */ jsx(SelectItem, { value: "Ẩn", children: "Ẩn" })
        ] })
      ] }) })
    ] })
  ] });
}
const EMPTY_TEAM_FORM = {
  name: "",
  role: "",
  avatar: "bg-brand-gold",
  bio: "",
  socialUrl: "",
  order: "1",
  status: "Hiện"
};
function teamFormFromMember(member) {
  return {
    name: member.name,
    role: member.role,
    avatar: member.avatar,
    bio: member.bio,
    socialUrl: member.socialUrl ?? "",
    order: String(member.order),
    status: member.status
  };
}
function teamFromFormValue(value, id) {
  return {
    id,
    name: value.name.trim(),
    role: value.role.trim(),
    avatar: value.avatar.trim() || "bg-brand-gold",
    bio: value.bio.trim(),
    socialUrl: value.socialUrl.trim(),
    order: Number(value.order) || 0,
    status: value.status
  };
}
function teamPatchFromFormValue(value) {
  const member = teamFromFormValue(value, "");
  const { id: _id, ...patch } = member;
  return patch;
}
const AdminTeamForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminTeamForm,
  EMPTY_TEAM_FORM,
  teamFormFromMember,
  teamFromFormValue,
  teamPatchFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
const CHANNEL_PLATFORMS = [
  "youtube",
  "tiktok",
  "facebook",
  "discord",
  "other"
];
function AdminChannelForm({ value, onChange }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { columns: 1, children: [
    /* @__PURE__ */ jsx(AdminField, { label: "Nền tảng", children: /* @__PURE__ */ jsxs(
      Select,
      {
        value: value.platform,
        onValueChange: (platform) => patch({ platform }),
        children: [
          /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsx(SelectContent, { children: CHANNEL_PLATFORMS.map((p) => /* @__PURE__ */ jsx(SelectItem, { value: p, children: p }, p)) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Tên kênh / group", children: /* @__PURE__ */ jsx(Input, { value: value.name, onChange: (e) => patch({ name: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "URL", children: /* @__PURE__ */ jsx(Input, { value: value.url, onChange: (e) => patch({ url: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Highlight (vd: Cao thủ)", children: /* @__PURE__ */ jsx(Input, { value: value.highlight, onChange: (e) => patch({ highlight: e.target.value }) }) }),
    /* @__PURE__ */ jsx(AdminField, { label: "Mô tả giá trị", children: /* @__PURE__ */ jsx(Input, { value: value.description, onChange: (e) => patch({ description: e.target.value }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Thứ tự", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "number",
          value: value.order,
          onChange: (e) => patch({ order: e.target.value })
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Trạng thái", children: /* @__PURE__ */ jsxs(
        Select,
        {
          value: value.status,
          onValueChange: (status) => patch({ status }),
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "Hiện", children: "Hiện" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "Ẩn", children: "Ẩn" })
            ] })
          ]
        }
      ) })
    ] })
  ] });
}
const EMPTY_CHANNEL_FORM = {
  platform: "youtube",
  name: "",
  url: "",
  description: "",
  highlight: "",
  order: "1",
  status: "Hiện"
};
function channelFormFromRecord(channel) {
  return {
    platform: channel.platform,
    name: channel.name,
    url: channel.url,
    description: channel.description,
    highlight: channel.highlight ?? "",
    order: String(channel.order),
    status: channel.status
  };
}
function channelFromFormValue(value, id) {
  return {
    id,
    platform: value.platform,
    name: value.name.trim(),
    url: value.url.trim(),
    description: value.description.trim(),
    highlight: value.highlight.trim(),
    order: Number(value.order) || 0,
    status: value.status
  };
}
function channelPatchFromFormValue(value) {
  const channel = channelFromFormValue(value, "");
  const { id: _id, ...patch } = channel;
  return patch;
}
const AdminChannelForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminChannelForm,
  CHANNEL_PLATFORMS,
  EMPTY_CHANNEL_FORM,
  channelFormFromRecord,
  channelFromFormValue,
  channelPatchFromFormValue
}, Symbol.toStringTag, { value: "Module" }));
function AdminTraitForm({
  value,
  onChange,
  nameLabel,
  namePlaceholder,
  defaultIcon,
  showIconUrl = false
}) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs(AdminFormGrid, { columns: 1, children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsx(AdminField, { label: "Biểu tượng", className: "col-span-1", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.icon,
          onChange: (e) => patch({ icon: e.target.value }),
          placeholder: defaultIcon,
          className: "text-center text-xl bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: nameLabel, className: "col-span-3", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.name,
          onChange: (e) => patch({ name: e.target.value }),
          placeholder: namePlaceholder,
          className: "bg-brand-card border-brand-border rounded-xl h-11 focus-visible:ring-1 focus-visible:ring-brand-gold/30"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(AdminField, { label: showIconUrl ? "Mô tả" : "Hiệu ứng kích hoạt", children: /* @__PURE__ */ jsx(
      "textarea",
      {
        value: value.description,
        onChange: (e) => patch({ description: e.target.value }),
        className: "w-full h-24 bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 placeholder-brand-text-sub/50 transition-all",
        placeholder: "Mô tả hiệu ứng mốc kích hoạt..."
      }
    ) }),
    showIconUrl && /* @__PURE__ */ jsx(AdminField, { label: "Logo URL (iconUrl)", children: /* @__PURE__ */ jsx(
      Input,
      {
        value: value.iconUrl ?? "",
        onChange: (e) => patch({ iconUrl: e.target.value || void 0 }),
        placeholder: "/traits/example.png",
        className: "bg-brand-card border-brand-border rounded-xl h-11 font-mono text-sm"
      }
    ) })
  ] });
}
const AdminTraitForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminTraitForm
}, Symbol.toStringTag, { value: "Module" }));
const TAB_LABELS = {
  basic: "Cơ bản",
  statsSkill: "Chỉ số & Kỹ năng",
  images: "Hình ảnh",
  content: "Nội dung"
};
function toggleInList(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}
function toggleInListWithMax(list, id, max) {
  if (list.includes(id)) return list.filter((x) => x !== id);
  if (list.length >= max) return list;
  return [...list, id];
}
const MAX_TRAITS_PER_KIND = 2;
function SectionResetButton({
  section,
  seedHero,
  onResetSection
}) {
  if (!seedHero || !onResetSection) return null;
  return /* @__PURE__ */ jsxs(
    Button,
    {
      type: "button",
      variant: "ghost",
      size: "sm",
      className: "h-8 rounded-lg text-brand-text-sub hover:text-brand-gold admin-meta gap-1.5",
      onClick: () => onResetSection(section),
      children: [
        /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" }),
        "Khôi phục từ seed"
      ]
    }
  );
}
function AdminHeroForm({
  value,
  onChange,
  mode,
  races,
  classes,
  items,
  media,
  seedHero,
  onResetSection
}) {
  var _a, _b, _c, _d;
  const [activeTab, setActiveTab] = React.useState("basic");
  const stats = ensureHeroStats(value.stats);
  const skill = value.skill ?? { name: "Kỹ năng đặc biệt", desc: "", type: "Chủ động" };
  const descByStar = skill.descByStar ?? ["", "", ""];
  const patch = (partial) => onChange({ ...value, ...partial });
  const patchSkill = (partial) => onChange({ ...value, skill: { ...skill, ...partial } });
  const patchStats = (partial) => onChange({ ...value, stats: { ...stats, ...partial } });
  const iconPreview = getHeroIconUrl(value);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-brand-border", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto hide-scrollbar -mx-1 px-1", children: /* @__PURE__ */ jsx("div", { className: "flex bg-brand-card border border-brand-border p-1 rounded-xl w-fit min-w-0", children: Object.keys(TAB_LABELS).map((tab) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab),
          className: cn(
            "px-3 sm:px-4 py-2 rounded-lg admin-meta font-bold uppercase tracking-wider transition-all shrink-0",
            activeTab === tab ? "bg-gold-gradient text-black" : "text-brand-text-sub hover:text-brand-text-main"
          ),
          children: TAB_LABELS[tab]
        },
        tab
      )) }) }),
      mode === "edit" && value.id && /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "sm", className: "h-9 rounded-xl border-brand-border admin-meta", children: /* @__PURE__ */ jsxs(Link, { to: `/tuong/${value.id}`, target: "_blank", rel: "noreferrer", children: [
        /* @__PURE__ */ jsx(ExternalLink, { className: "h-3.5 w-3.5 mr-1.5" }),
        "Xem trên web"
      ] }) })
    ] }),
    activeTab === "basic" && /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Thông tin cơ bản" }),
        /* @__PURE__ */ jsx(SectionResetButton, { section: "basic", seedHero, onResetSection })
      ] }),
      /* @__PURE__ */ jsx(AdminField, { label: "Tên tướng", required: true, children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.name,
          onChange: (e) => patch({ name: e.target.value }),
          placeholder: "Ví dụ: Tsunami",
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Giá vàng ($)", children: /* @__PURE__ */ jsx(
        Input,
        {
          type: "number",
          min: 1,
          max: 5,
          value: value.cost,
          onChange: (e) => patch({ cost: Number(e.target.value) }),
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Độ hiếm", children: /* @__PURE__ */ jsxs(
        Select,
        {
          value: value.rarity ?? "none",
          onValueChange: (v) => patch({ rarity: v === "none" ? void 0 : v }),
          children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Chọn độ hiếm" }) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "— Không đặt —" }),
              HERO_RARITIES.map((r) => /* @__PURE__ */ jsx(SelectItem, { value: r, children: r }, r))
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Danh hiệu (chessTitle)", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: value.chessTitle ?? "",
          onChange: (e) => patch({ chessTitle: e.target.value || void 0 }),
          placeholder: "Ví dụ: Grandmaster",
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(
        AdminField,
        {
          label: `Chủng tộc (Tộc) — ${value.race.length}/${MAX_TRAITS_PER_KIND}`,
          hint: "Tối đa 2 tộc. Để trống = Tộc chưa xác định",
          children: /* @__PURE__ */ jsx("div", { className: "max-h-32 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2", children: races.map((race) => {
            const checked = value.race.includes(race.name);
            const atMax = value.race.length >= MAX_TRAITS_PER_KIND && !checked;
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: cn(
                  "flex items-center gap-2 admin-meta text-brand-text-sub",
                  atMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked,
                      disabled: atMax,
                      onChange: () => patch({ race: toggleInListWithMax(value.race, race.name, MAX_TRAITS_PER_KIND) }),
                      className: "rounded border-brand-border accent-brand-gold"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: race.name })
                ]
              },
              race.id
            );
          }) })
        }
      ) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(
        AdminField,
        {
          label: `Hệ (Class) — ${value.class.length}/${MAX_TRAITS_PER_KIND}`,
          hint: "Tối đa 2 hệ. Để trống = Hệ chưa xác định",
          children: /* @__PURE__ */ jsx("div", { className: "max-h-32 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2", children: classes.map((cls) => {
            const checked = value.class.includes(cls.name);
            const atMax = value.class.length >= MAX_TRAITS_PER_KIND && !checked;
            return /* @__PURE__ */ jsxs(
              "label",
              {
                className: cn(
                  "flex items-center gap-2 admin-meta text-brand-text-sub",
                  atMax ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked,
                      disabled: atMax,
                      onChange: () => patch({ class: toggleInListWithMax(value.class, cls.name, MAX_TRAITS_PER_KIND) }),
                      className: "rounded border-brand-border accent-brand-gold"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: cls.name })
                ]
              },
              cls.id
            );
          }) })
        }
      ) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Mô tả ngắn", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: value.description ?? "",
          onChange: (e) => patch({ description: e.target.value || void 0 }),
          className: "w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30",
          placeholder: "Mô tả hiển thị trên trang chi tiết..."
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Đánh dấu tướng mới", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-3 h-11 px-4 rounded-xl border border-brand-border bg-brand-card cursor-pointer hover:bg-brand-card-2 transition-colors", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: Boolean(value.isNew),
            onChange: (e) => patch({ isNew: e.target.checked }),
            className: "h-4 w-4 rounded border-brand-border accent-brand-gold"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "admin-body text-brand-text-main", children: 'Hiển thị badge "Mới" trên web' })
      ] }) }) })
    ] }),
    activeTab === "statsSkill" && /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Chỉ số & kỹ năng" }),
        /* @__PURE__ */ jsx(SectionResetButton, { section: "statsSkill", seedHero, onResetSection })
      ] }),
      /* @__PURE__ */ jsx(AdminField, { label: "HP (1★, 2★, 3★)", hint: "Định dạng: 700, 1260, 2520", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: formatStarTuple(stats.hp),
          onChange: (e) => {
            const tuple = parseStarTuple(e.target.value);
            if (tuple) patchStats({ hp: tuple });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11 font-mono"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "ATK (1★, 2★, 3★)", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: formatStarTuple(stats.atk),
          onChange: (e) => {
            const tuple = parseStarTuple(e.target.value);
            if (tuple) patchStats({ atk: tuple });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11 font-mono"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Giáp (armor)", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: String(typeof stats.armor === "number" ? stats.armor : ((_a = stats.armor) == null ? void 0 : _a[0]) ?? ""),
          onChange: (e) => {
            const n = parseOptionalNumber(e.target.value);
            if (n !== void 0) patchStats({ armor: n });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Kháng phép (MR)", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: String(typeof stats.mr === "number" ? stats.mr : ((_b = stats.mr) == null ? void 0 : _b[0]) ?? ""),
          onChange: (e) => {
            const n = parseOptionalNumber(e.target.value);
            if (n !== void 0) patchStats({ mr: n });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Tốc độ đánh", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: String(
            typeof stats.atkSpeed === "number" ? stats.atkSpeed : ((_c = stats.atkSpeed) == null ? void 0 : _c[0]) ?? ""
          ),
          onChange: (e) => {
            const n = parseOptionalNumber(e.target.value);
            patchStats({ atkSpeed: n });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Tầm đánh", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: String(typeof stats.range === "number" ? stats.range : ((_d = stats.range) == null ? void 0 : _d[0]) ?? ""),
          onChange: (e) => {
            const n = parseOptionalNumber(e.target.value);
            patchStats({ range: n });
          },
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Tên kỹ năng", children: /* @__PURE__ */ jsx(
        Input,
        {
          value: skill.name,
          onChange: (e) => patchSkill({ name: e.target.value }),
          className: "bg-brand-card border-brand-border rounded-xl h-11"
        }
      ) }),
      /* @__PURE__ */ jsx(AdminField, { label: "Loại kỹ năng", children: /* @__PURE__ */ jsxs(Select, { value: skill.type ?? "Chủ động", onValueChange: (v) => patchSkill({ type: v }), children: [
        /* @__PURE__ */ jsx(SelectTrigger, { className: "h-11 rounded-xl bg-brand-card border-brand-border", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsx(SelectContent, { children: SKILL_TYPE_OPTIONS.map((t) => /* @__PURE__ */ jsx(SelectItem, { value: t, children: t }, t)) })
      ] }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Icon kỹ năng (URL)", children: /* @__PURE__ */ jsx(
        AdminMediaPicker,
        {
          value: skill.iconUrl ?? "",
          onChange: (url) => patchSkill({ iconUrl: url || void 0 }),
          media,
          categoryFilter: "Tướng"
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Mô tả kỹ năng (mặc định)", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: skill.desc,
          onChange: (e) => patchSkill({ desc: e.target.value }),
          className: "w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
        }
      ) }) }),
      [1, 2, 3].map((star) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: `Mô tả kỹ năng ${star}★`, children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: descByStar[star - 1] ?? "",
          onChange: (e) => {
            const next = [...descByStar];
            next[star - 1] = e.target.value;
            patchSkill({
              descByStar: next.some(Boolean) ? next : void 0
            });
          },
          className: "w-full h-[72px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30",
          placeholder: star === 1 ? "Để trống nếu dùng mô tả mặc định" : ""
        }
      ) }) }) }, star))
    ] }),
    activeTab === "images" && /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Hình ảnh & skin" }),
        /* @__PURE__ */ jsx(SectionResetButton, { section: "images", seedHero, onResetSection })
      ] }),
      iconPreview && /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-3 rounded-xl border border-brand-border bg-brand-card-2", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-xl overflow-hidden border border-brand-border bg-brand-card shrink-0", children: /* @__PURE__ */ jsx("img", { src: iconPreview, alt: "", className: "w-full h-full object-cover", loading: "lazy" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "admin-meta font-bold text-brand-text-main", children: "Preview icon" }),
          /* @__PURE__ */ jsx("p", { className: "admin-meta text-brand-text-sub truncate max-w-md", children: iconPreview })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Icon vuông (iconUrl)", children: /* @__PURE__ */ jsx(
        AdminMediaPicker,
        {
          value: value.iconUrl ?? "",
          onChange: (url) => patch({ iconUrl: url || void 0, imageUrl: url || value.imageUrl }),
          media
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Portrait (portraitUrl)", children: /* @__PURE__ */ jsx(
        AdminMediaPicker,
        {
          value: value.portraitUrl ?? "",
          onChange: (url) => patch({ portraitUrl: url || void 0 }),
          media
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Ảnh fallback (imageUrl)", children: /* @__PURE__ */ jsx(
        AdminMediaPicker,
        {
          value: value.imageUrl ?? "",
          onChange: (url) => patch({ imageUrl: url || void 0 }),
          media
        }
      ) }) }),
      /* @__PURE__ */ jsxs(AdminFormGridFull, { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Skins" }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              className: "h-8 rounded-lg border-brand-border admin-meta",
              onClick: () => {
                const skins = value.skins ?? [];
                patch({ skins: [...skins, createEmptySkin(skins.length + 1)] });
              },
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5 mr-1" }),
                "Thêm skin"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3 mt-2", children: [
          (value.skins ?? []).map((skin, index) => /* @__PURE__ */ jsx(React.Fragment, { children: /* @__PURE__ */ jsx(
            SkinRow,
            {
              skin,
              media,
              radioGroupName: `skin-default-${value.id || "new"}`,
              onChange: (next) => {
                const skins = [...value.skins ?? []];
                skins[index] = next;
                patch({ skins });
              },
              onRemove: () => {
                patch({ skins: (value.skins ?? []).filter((_, i) => i !== index) });
              },
              onSetDefault: () => {
                const skins = (value.skins ?? []).map((s, i) => ({
                  ...s,
                  isDefault: i === index
                }));
                patch({ skins });
              }
            }
          ) }, skin.id)),
          (value.skins ?? []).length === 0 && /* @__PURE__ */ jsx("p", { className: "admin-meta text-brand-text-sub py-2", children: "Chưa có skin — dùng portraitUrl mặc định." })
        ] })
      ] })
    ] }),
    activeTab === "content" && /* @__PURE__ */ jsxs(AdminFormGrid, { children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "admin-form-label", children: "Lore, chiến thuật & trang bị" }),
        /* @__PURE__ */ jsx(SectionResetButton, { section: "content", seedHero, onResetSection })
      ] }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Lore / Cốt truyện", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: value.lore ?? "",
          onChange: (e) => patch({ lore: e.target.value || void 0 }),
          className: "w-full h-[120px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Gợi ý chiến thuật (mỗi dòng một ý)", children: /* @__PURE__ */ jsx(
        "textarea",
        {
          value: (value.tacticalNotes ?? []).join("\n"),
          onChange: (e) => patch({ tacticalNotes: parseLines(e.target.value) }),
          className: "w-full h-[88px] bg-brand-card border border-brand-border rounded-xl p-3 admin-body text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
        }
      ) }) }),
      /* @__PURE__ */ jsx(AdminFormGridFull, { children: /* @__PURE__ */ jsx(AdminField, { label: "Trang bị gợi ý", children: /* @__PURE__ */ jsx("div", { className: "max-h-40 overflow-y-auto rounded-xl border border-brand-border p-3 grid grid-cols-2 sm:grid-cols-3 gap-2", children: items.map((item) => /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 admin-meta text-brand-text-sub cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            checked: (value.recommendedItemIds ?? []).includes(item.id),
            onChange: () => patch({
              recommendedItemIds: toggleInList(value.recommendedItemIds ?? [], item.id)
            }),
            className: "rounded border-brand-border accent-brand-gold"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "truncate", children: item.name })
      ] }, item.id)) }) }) })
    ] })
  ] });
}
function SkinRow({
  skin,
  media,
  radioGroupName,
  onChange,
  onRemove,
  onSetDefault
}) {
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-brand-border bg-brand-card p-3 space-y-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          value: skin.name,
          onChange: (e) => onChange({ ...skin, name: e.target.value }),
          placeholder: "Tên skin",
          className: "h-9 rounded-lg bg-brand-card-2 border-brand-border flex-1"
        }
      ),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-1.5 admin-meta text-brand-text-sub shrink-0 cursor-pointer", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name: radioGroupName,
            checked: Boolean(skin.isDefault),
            onChange: onSetDefault,
            className: "accent-brand-gold"
          }
        ),
        "Mặc định"
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "h-9 w-9 text-brand-red shrink-0",
          onClick: onRemove,
          children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      AdminMediaPicker,
      {
        value: skin.imageUrl,
        onChange: (url) => onChange({ ...skin, imageUrl: url }),
        media,
        label: "Chọn ảnh"
      }
    )
  ] });
}
const AdminHeroForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminHeroForm
}, Symbol.toStringTag, { value: "Module" }));
function AdminSettingsForm({ value, onChange }) {
  const patch = (partial) => onChange({ ...value, ...partial });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4", children: [
        /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4 text-brand-gold" }),
        " Cấu hình Website chung"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Tên Website" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: value.siteName,
              onChange: (e) => patch({ siteName: e.target.value }),
              placeholder: "Ví dụ: Auto Chess Mobile VN"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Mô tả tóm tắt ứng dụng" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: value.siteDesc,
              onChange: (e) => patch({ siteDesc: e.target.value }),
              className: "w-full h-24 bg-brand-card border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 font-medium",
              placeholder: "Website meta và database game..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Phiên bản Patch Meta hiện tại" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.patchVersion,
                onChange: (e) => patch({ patchVersion: e.target.value }),
                placeholder: "Patch S20.5"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Trạng thái hệ thống" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: String(value.maintenance),
                onValueChange: (v) => patch({ maintenance: v === "true" }),
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "false", children: "Hoạt động bình thường (Online)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "true", children: "Chế độ bảo trì (Maintenance)" })
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4", children: [
        /* @__PURE__ */ jsx(Bell, { className: "h-4 w-4 text-brand-gold" }),
        " Báo cáo & Thông báo chung"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Nội dung thông báo (Chạy ngang Panel chính)" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: value.notifText,
              onChange: (e) => patch({ notifText: e.target.value }),
              placeholder: "Thông báo nhanh hiển thị cho người chơi..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Liên kết Mạng Discord" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.discordUrl,
                onChange: (e) => patch({ discordUrl: e.target.value }),
                placeholder: "https://discord.gg/..."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Liên kết Facebook Group" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.facebookUrl,
                onChange: (e) => patch({ facebookUrl: e.target.value }),
                placeholder: "https://facebook.com/..."
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "bg-brand-card border-brand-border rounded-xl shadow-none p-6 sm:p-8", children: [
      /* @__PURE__ */ jsxs("h3", { className: "admin-card-title uppercase mb-6 flex items-center gap-2 border-b border-brand-border pb-4", children: [
        /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4 text-brand-gold" }),
        " Ủng hộ & Đối tác"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Hiển thị phần ủng hộ trên trang chủ" }),
          /* @__PURE__ */ jsxs(
            Select,
            {
              value: String(value.donateEnabled),
              onValueChange: (v) => patch({ donateEnabled: v === "true" }),
              children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsx(SelectItem, { value: "true", children: "Bật" }),
                  /* @__PURE__ */ jsx(SelectItem, { value: "false", children: "Tắt" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Tên ngân hàng" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.donateBankName,
                onChange: (e) => patch({ donateBankName: e.target.value }),
                placeholder: "VietinBank"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Mã ngân hàng (VietQR)" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.donateBankCode,
                onChange: (e) => patch({ donateBankCode: e.target.value }),
                placeholder: "ICB hoặc 970415"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[12px] text-brand-text-sub", children: "Mã Napas dùng cho ảnh VietQR compact (ví dụ ICB, VCB) hoặc BIN 6 số." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Số tài khoản" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.donateAccountNo,
                onChange: (e) => patch({ donateAccountNo: e.target.value }),
                placeholder: "109878642716"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Chủ tài khoản" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                value: value.donateAccountName,
                onChange: (e) => patch({ donateAccountName: e.target.value }),
                placeholder: "LE MINH CONG"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Câu kêu gọi ủng hộ" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              value: value.donateMessage,
              onChange: (e) => patch({ donateMessage: e.target.value }),
              className: "w-full h-24 bg-brand-card border border-brand-border rounded-xl p-4 text-[14px] text-brand-text-main focus:outline-none focus:ring-1 focus:ring-brand-gold/30 font-medium",
              placeholder: "Nội dung kêu gọi donate hiển thị trên trang chủ..."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsx("label", { className: "admin-form-label uppercase tracking-wider", children: "Danh sách đối tác / nhà tài trợ" }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                className: "gap-1.5 h-9 text-[12px]",
                onClick: () => patch({ partners: [...value.partners, { name: "", logoUrl: "", url: "" }] }),
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }),
                  "Thêm đối tác"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-3", children: value.partners.map((partner, index) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 p-4 rounded-xl border border-brand-border bg-brand-card-2/50",
              children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: partner.name,
                    onChange: (e) => patch({
                      partners: value.partners.map(
                        (p, i) => i === index ? { ...p, name: e.target.value } : p
                      )
                    }),
                    placeholder: "Tên đối tác"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: partner.logoUrl ?? "",
                    onChange: (e) => patch({
                      partners: value.partners.map(
                        (p, i) => i === index ? { ...p, logoUrl: e.target.value } : p
                      )
                    }),
                    placeholder: "URL logo (tuỳ chọn)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    value: partner.url ?? "",
                    onChange: (e) => patch({
                      partners: value.partners.map(
                        (p, i) => i === index ? { ...p, url: e.target.value } : p
                      )
                    }),
                    placeholder: "Link website (tuỳ chọn)"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    className: "h-10 text-brand-red hover:text-brand-red hover:bg-brand-red/10",
                    onClick: () => patch({ partners: value.partners.filter((_, i) => i !== index) }),
                    "aria-label": `Xóa đối tác ${partner.name || index + 1}`,
                    children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            index
          )) })
        ] })
      ] })
    ] })
  ] });
}
const AdminSettingsForm$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AdminSettingsForm
}, Symbol.toStringTag, { value: "Module" }));
export {
  getTraitDetailPath as $,
  AdminDemoBadge as A,
  Button as B,
  Card as C,
  Dialog as D,
  SelectTrigger as E,
  SelectValue as F,
  SelectContent as G,
  SelectItem as H,
  Input as I,
  difficultyLabelKey as J,
  DEFAULT_COMMUNITY_POSTS as K,
  DEFAULT_POSTS as L,
  DEFAULT_RELICS as M,
  ITEMS as N,
  HEROES as O,
  COMPS as P,
  BOARD_ROWS as Q,
  RACES as R,
  STORAGE_KEYS as S,
  BOARD_ROW_LABELS as T,
  BOARD_COLS as U,
  resolveCompBoard as V,
  getCompTop4 as W,
  splitCoreFlexHeroIds as X,
  getRecommendedItems as Y,
  roadmapHasContent as Z,
  getTraitHeroes as _,
  DialogContent as a,
  recordFromBoardSlots as a$,
  TraitIcon as a0,
  buildTraitItems as a1,
  filterTraits as a2,
  getTraitRelatedComps as a3,
  raceToTraitItem as a4,
  classToTraitItem as a5,
  getTraitsListPath as a6,
  routeKindToTraitKind as a7,
  filterHeroes as a8,
  isHeroNew as a9,
  AdminTr as aA,
  AdminTh as aB,
  AdminTd as aC,
  AdminTableActionButton as aD,
  AdminToolbar as aE,
  AdminTableFooterText as aF,
  AdminFormDialog as aG,
  AdminDeleteDialog as aH,
  AdminSuccessBanner as aI,
  userFormFromRecord as aJ,
  nextNumericIdNumber as aK,
  EMPTY_ITEM_FORM as aL,
  AdminRowActions as aM,
  itemFromFormValue as aN,
  itemFormFromItem as aO,
  AdminItemDetailDialog as aP,
  slugifyItemId as aQ,
  createDefaultHeroDraft as aR,
  slugifyHeroId as aS,
  normalizeHeroDraft as aT,
  resetHeroFieldsFromSeed as aU,
  AdminInlineFilter as aV,
  EMPTY_COMP_FORM as aW,
  compFormFromComp as aX,
  nextNumericId as aY,
  compFromFormValue as aZ,
  calcSynergiesFromHeroes as a_,
  getHeroSkins as aa,
  getRaceTraitPath as ab,
  getClassTraitPath as ac,
  getRelatedHeroes as ad,
  RACE_NAME_ALIASES as ae,
  resolveHeroSkill as af,
  resolveHeroStats as ag,
  getCompsForHero as ah,
  parseTimeRange as ai,
  getPublishedPosts as aj,
  filterNewsPosts as ak,
  getCategoryCounts as al,
  getPopularPosts as am,
  getPostAuthors as an,
  NEWS_TIME_RANGES as ao,
  splitFeaturedPosts as ap,
  CloudinaryFileUpload as aq,
  isPersistableImageUrl as ar,
  isPersistableAvatarValue as as,
  AdminPageHeader as at,
  EMPTY_USER_FORM as au,
  useAdminListPage as av,
  AdminListShell as aw,
  AdminDataTable as ax,
  AdminTable as ay,
  AdminThead as az,
  DialogHeader as b,
  AdminTraitPanel as b0,
  AdminDetailDialog as b1,
  AdminStatCards as b2,
  EMPTY_BANNER_FORM as b3,
  bannerFormFromBanner as b4,
  AdminBannerDetailDialog as b5,
  bannerFromFormValue as b6,
  EMPTY_RELIC_FORM as b7,
  AdminRelicDetailDialog as b8,
  useAdminSuccessToast as b9,
  heroStarCost as bA,
  countActiveTraits as bB,
  BOARD_SIZE as bC,
  buildCompBoard as bD,
  parseWinRate as bE,
  getCompLateGame as bF,
  getCompDifficulty as bG,
  getHeroComparisonStats as bH,
  formatHeroTraitsLabel as bI,
  CloudinaryFileUpload$1 as bJ,
  AdminUserForm$1 as bK,
  AdminItemForm$1 as bL,
  AdminCompForm$1 as bM,
  AdminBannerForm$1 as bN,
  AdminRelicForm$1 as bO,
  AdminPlayerForm$1 as bP,
  AdminEventForm$1 as bQ,
  AdminMediaForm$1 as bR,
  AdminSeoForm$1 as bS,
  AdminTeamForm$1 as bT,
  AdminChannelForm$1 as bU,
  AdminHeroForm$1 as bV,
  AdminSettingsForm$1 as bW,
  useAdminCrudDialogs as ba,
  AdminField as bb,
  AdminCommentDetailDrawer as bc,
  EMPTY_PLAYER_FORM as bd,
  AdminTableScroll as be,
  playerPatchFromFormValue as bf,
  playerFormFromPlayer as bg,
  playerFromFormValue as bh,
  EMPTY_EVENT_FORM as bi,
  eventFromFormValue as bj,
  eventFormFromEvent as bk,
  EMPTY_MEDIA_FORM as bl,
  mediaFromFormValue as bm,
  mediaFormFromAsset as bn,
  buildDefaultSeoDraft as bo,
  rowsToPagesMeta as bp,
  EMPTY_TEAM_FORM as bq,
  teamFormFromMember as br,
  teamFromFormValue as bs,
  teamPatchFromFormValue as bt,
  EMPTY_CHANNEL_FORM as bu,
  CHANNEL_PLATFORMS as bv,
  channelFormFromRecord as bw,
  channelFromFormValue as bx,
  channelPatchFromFormValue as by,
  computeCompRadarStats as bz,
  cn as c,
  DialogTitle as d,
  DialogDescription as e,
  DialogFooter as f,
  SITE_URL as g,
  SITE_NAME as h,
  SITE_DESCRIPTION as i,
  DataProvider as j,
  buildSitemapEntries as k,
  loadJson as l,
  Separator as m,
  getHeroIconUrl as n,
  Badge as o,
  pageTitle as p,
  getOrderedCompHeroes as q,
  renderSitemapXml as r,
  saveJson as s,
  estimateReadingMinutes as t,
  usePersistedEntity as u,
  isPostImageUrl as v,
  useAppStore as w,
  CLASSES as x,
  SectionHeader as y,
  Select as z
};
