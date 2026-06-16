#!/usr/bin/env node
/**
 * Import hero data + assets from ac.dragonest.com (EN character library).
 * Parses embedded __NUXT__ payload from the list page.
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PUBLIC_HEROES = path.join(ROOT, "public/heroes")
const OUT_JSON = path.join(ROOT, "src/data/heroes-dragonest.json")
const OUT_ENRICHMENTS = path.join(ROOT, "src/data/heroes-dragonest-enrichments.json")

const LIST_URL = "https://ac.dragonest.com/en/charactor"
const RATE_MS = 500

const DRAGONEST_NAME_ALIASES = {
  "Penitent Bishop·Mammon": "Penitent Bishop",
  "Watcher ": "Watcher",
}

/** @type {{ id: string; name: string }[]} */
let heroesBase = []

async function loadHeroesBase() {
  const heroesTs = await fs.readFile(path.join(ROOT, "src/data/heroes.ts"), "utf8")
  const matches = [...heroesTs.matchAll(/\{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)]
  heroesBase = matches.map((m) => ({ id: m[1], name: m[2] }))
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function parseNuxt(html) {
  const m = html.match(/window\.__NUXT__=([^<]+)/)
  if (!m) throw new Error("Could not find __NUXT__ payload")
  return new Function(`return ${m[1].replace(/;$/, "")}`)()
}

function normalizeName(name) {
  const aliased = DRAGONEST_NAME_ALIASES[name] ?? name
  return aliased.trim()
}

function nameToHeroId(name) {
  const trimmed = normalizeName(name)
  const byName = heroesBase.find((h) => h.name.toLowerCase() === trimmed.toLowerCase())
  if (byName) return byName.id
  const norm = trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "")
  const byId = heroesBase.find((h) => h.id === norm)
  return byId?.id ?? null
}

function parseNum(raw) {
  if (raw == null || raw === "") return undefined
  const cleaned = String(raw).replace(/%/g, "").trim()
  if (cleaned.includes("-")) {
    const [a, b] = cleaned.split("-").map(Number)
    if (Number.isFinite(a) && Number.isFinite(b)) return Math.round((a + b) / 2)
  }
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : undefined
}

function toHttps(url) {
  if (!url) return ""
  return url.startsWith("//") ? `https:${url}` : url
}

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

async function downloadImage(url, destPath) {
  if (!url) return false
  const full = toHttps(url)
  try {
    const res = await fetch(full, { headers: { "User-Agent": "Mozilla/5.0" } })
    if (!res.ok) return false
    const buf = Buffer.from(await res.arrayBuffer())
    await fs.mkdir(path.dirname(destPath), { recursive: true })
    await fs.writeFile(destPath, buf)
    return true
  } catch {
    return false
  }
}

function extFromUrl(url) {
  const m = url.match(/\.(png|webp|jpg|jpeg|gif)(\?|$)/i)
  return m ? m[1].toLowerCase() : "png"
}

function asArray(value) {
  if (Array.isArray(value)) return value
  if (value == null || value === "") return []
  return [value]
}

function buildEnrichment(entry, skinEntries, heroId) {
  const f = entry.fields_data
  const hp = [parseNum(f.lifeValue), parseNum(f.twoStarLifeValue), parseNum(f.threeStarLifeValue)].filter(
    (n) => n != null
  )
  const atk = [parseNum(f.attackPower), parseNum(f.twoStarAttackPower), parseNum(f.threeStarAttackPower)].filter(
    (n) => n != null
  )
  const armor = parseNum(f.armor)
  const mr = parseNum(f.magicResistance)
  const atkSpeed = parseNum(f.attackSpeed)
  const range = parseNum(f.attackDistance)

  const descByStar = [f.onestarChessSkill, f.twostarChessSkill, f.threestarChessSkill].filter(Boolean)
  const skillDesc = descByStar[0] ?? ""

  const rarityRaw = asArray(f.cardQuality)[0]
  const rarity =
    rarityRaw === "Common" || rarityRaw === "Rare" || rarityRaw === "Epic" || rarityRaw === "Legendary"
      ? rarityRaw
      : undefined

  const raceNames = asArray(f.category).map((r) => normalizeName(String(r)))
  const classNames = asArray(f.cardType).map((c) => String(c).trim())

  const skinNames = f.chessSkin ?? []
  const relatedSkins = skinEntries.filter((s) => s.fields_data?.relatedChess?.includes(f.name))

  return {
    heroId,
    dragonestId: entry.resource_code,
    name: f.name.trim(),
    chessTitle: f.chessTitle || undefined,
    rarity,
    cost: parseNum(f.cardExpend),
    race: raceNames,
    class: classNames,
    lore: f.storyBackground?.trim() || undefined,
    skill: {
      name: f.skillName || "Skill",
      type: "Active",
      desc: skillDesc,
      descByStar: descByStar.length === 3 ? descByStar : undefined,
    },
    stats: {
      hp: hp.length === 3 ? hp : undefined,
      atk: atk.length === 3 ? atk : undefined,
      armor,
      mr,
      atkSpeed,
      range,
    },
    portraitSource: f.cardImg || f.icon,
    iconSource: f.icon,
    skillIconSource: f.chessSkillIcon,
    skinSources: [
      { id: "default", name: "Default", url: f.cardImg || f.icon, isDefault: true },
      ...skinNames.map((skinName) => {
        const found = relatedSkins.find((s) => s.fields_data.name === skinName)
        return {
          id: slugify(skinName),
          name: skinName,
          url: found?.fields_data?.img ?? "",
          isDefault: false,
        }
      }),
    ].filter((s) => s.url),
    raw: f,
  }
}

async function main() {
  await loadHeroesBase()
  console.log(`Loaded ${heroesBase.length} heroes from HEROES_BASE`)

  const res = await fetch(LIST_URL, { headers: { "User-Agent": "Mozilla/5.0" } })
  if (!res.ok) throw new Error(`Failed to fetch list: ${res.status}`)
  const html = await res.text()
  const data = parseNuxt(html)
  const charactorData = data.data[0].prop.charactorData
  const list = charactorData.chessInformation.list
  const skinList = charactorData.chessSkin?.list ?? []

  const audit = { importedAt: new Date().toISOString(), matched: [], unmatched: [] }
  const enrichments = {}

  for (const entry of list) {
    const heroId = nameToHeroId(entry.fields_data.name)
    if (!heroId) {
      audit.unmatched.push({ name: entry.fields_data.name, dragonestId: entry.resource_code })
      continue
    }

    const built = buildEnrichment(entry, skinList, heroId)
    audit.matched.push({ heroId, name: built.name, dragonestId: built.dragonestId })

    const heroDir = path.join(PUBLIC_HEROES, heroId)
    const portraitExt = extFromUrl(built.portraitSource)
    const portraitRel = `/heroes/${heroId}/portrait.${portraitExt}`
    const portraitAbs = path.join(ROOT, "public", portraitRel)

    await downloadImage(built.portraitSource, portraitAbs)
    await sleep(RATE_MS)

    const iconExt = extFromUrl(built.iconSource || built.portraitSource)
    const iconRel = `/heroes/${heroId}/icon.${iconExt}`
    const iconAbs = path.join(ROOT, "public", iconRel)
    const iconDownloaded = await downloadImage(built.iconSource || built.portraitSource, iconAbs)
    if (iconDownloaded) await sleep(RATE_MS)

    let skillIconRel
    if (built.skillIconSource) {
      const skillExt = extFromUrl(built.skillIconSource)
      skillIconRel = `/heroes/${heroId}/skill.${skillExt}`
      await downloadImage(built.skillIconSource, path.join(ROOT, "public", skillIconRel))
      await sleep(RATE_MS)
    }

    const skins = []
    for (const skin of built.skinSources) {
      const skinExt = extFromUrl(skin.url)
      const skinRel =
        skin.id === "default" ? portraitRel : `/heroes/${heroId}/skins/${skin.id}.${skinExt}`
      const skinAbs = path.join(ROOT, "public", skinRel.replace(/^\//, ""))
      if (skin.id !== "default") {
        await downloadImage(skin.url, skinAbs)
        await sleep(RATE_MS)
      }
      skins.push({
        id: skin.id,
        name: skin.name,
        imageUrl: skinRel,
        isDefault: skin.isDefault,
      })
    }

    enrichments[heroId] = {
      dragonestId: built.dragonestId,
      chessTitle: built.chessTitle,
      rarity: built.rarity,
      description: built.chessTitle ? `${built.name} — ${built.chessTitle}` : undefined,
      lore: built.lore,
      iconUrl: iconDownloaded ? iconRel : portraitRel,
      portraitUrl: portraitRel,
      imageUrl: iconDownloaded ? iconRel : portraitRel,
      skill: {
        ...built.skill,
        iconUrl: skillIconRel,
      },
      stats: built.stats,
      skins: skins.length > 0 ? skins : undefined,
    }
  }

  await fs.mkdir(path.dirname(OUT_JSON), { recursive: true })
  await fs.writeFile(OUT_JSON, JSON.stringify({ audit, enrichments }, null, 2))
  await fs.writeFile(OUT_ENRICHMENTS, JSON.stringify(enrichments, null, 2))

  console.log(`Matched: ${audit.matched.length}/${list.length}`)
  if (audit.unmatched.length) {
    console.log("Unmatched:", audit.unmatched.map((u) => u.name).join(", "))
  }
  console.log(`Wrote ${OUT_ENRICHMENTS}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
