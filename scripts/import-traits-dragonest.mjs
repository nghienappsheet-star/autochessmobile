#!/usr/bin/env node
/**
 * Import race/class (tộc/hệ) data + logos from ac.dragonest.com (EN character library).
 * Parses embedded __NUXT__ payload from the list page.
 */
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const PUBLIC_TRAITS = path.join(ROOT, "public/traits")
const RACES_TS = path.join(ROOT, "src/data/races.ts")
const CLASSES_TS = path.join(ROOT, "src/data/classes.ts")

const LIST_URL = "https://ac.dragonest.com/en/charactor"
const RATE_MS = 300

/** Official name → existing seed id (preserves URL slugs) */
const RACE_NAME_TO_ID = {
  Ancestor: "ancestor",
  "Night Demon": "night_demon",
  Pandaman: "pandaman",
  Civet: "civet",
  Human: "human",
  Feathered: "feathered",
  Demon: "demon",
  Goblin: "goblin",
  Beast: "beast",
  Cave: "cave_clan",
  Marine: "marine",
  Egersis: "egersis",
  Glacier: "glacier",
  Greater: "greater",
  Horn: "horn",
  Insectoid: "insectoid",
  Dwarf: "dwarf",
  Spirits: "spirit",
  Kira: "kira",
  Dragon: "dragon",
  Divinity: "divinity",
  Watcher: "watcher",
}

const CLASS_NAME_TO_ID = {
  Knight: "knight",
  Warlock: "warlock",
  Mage: "mage",
  Warrior: "warrior",
  Hunter: "hunter",
  Assassin: "assassin",
  Shaman: "shaman",
  Druid: "druid",
  Witcher: "witcher",
  Mech: "mech",
  Priest: "priest",
  Wizard: "wizard",
}

const HEADER_SKIP =
  /^Active when you have certain number pieces of this (race|class) on board/i

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function parseNuxt(html) {
  const m = html.match(/window\.__NUXT__=([\s\S]*?)<\/script>/)
  if (!m) throw new Error("Could not find __NUXT__ payload")
  return new Function(`return ${m[1].replace(/;\s*$/, "")}`)()
}

function toHttps(url) {
  if (!url) return ""
  return url.startsWith("//") ? `https:${url}` : url
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

/** Parse existing seed file to preserve emoji + VN description by id */
async function loadExistingSeed(filePath) {
  const content = await fs.readFile(filePath, "utf8")
  /** @type {Map<string, { icon: string, description: string, milestones: { count: number }[] }>} */
  const map = new Map()
  const blocks = content.matchAll(
    /\{\s*id:\s*"([^"]+)"[\s\S]*?icon:\s*"([^"]*)"[\s\S]*?description:\s*"((?:\\.|[^"\\])*)"[\s\S]*?milestones:\s*\[([\s\S]*?)\]\s*,?\s*\}/g
  )
  for (const m of blocks) {
    const id = m[1]
    const icon = m[2]
    const description = m[3].replace(/\\"/g, '"').replace(/\\n/g, "\n")
    const milestoneBlock = m[4]
    const counts = [...milestoneBlock.matchAll(/count:\s*(\d+)/g)].map((c) => ({
      count: Number(c[1]),
    }))
    map.set(id, { icon, description, milestones: counts })
  }
  return map
}

function escapeString(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")
}

/**
 * Parse official effect text into milestone tiers.
 * @param {string} text
 * @param {string} [traitName]
 * @param {{ count: number }[]} [fallbackCounts]
 */
function parseMilestones(text, traitName, fallbackCounts = []) {
  if (!text?.trim()) {
    return fallbackCounts.map((m) => ({ count: m.count, effect: "" }))
  }

  const lines = text
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean)

  /** @type {{ count: number, effect: string }[]} */
  const milestones = []
  const namePrefix = traitName
    ? new RegExp(`^${traitName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "i")
    : null

  const milestoneStart = /^[\[(]?(\d+)[\])]?\s*[:：]\s*(.+)/

  for (const line of lines) {
    if (HEADER_SKIP.test(line)) continue
    if (/^Deploying pieces of the same class/i.test(line)) continue

    let working = line
    if (namePrefix) working = working.replace(namePrefix, "")

    const match = working.match(milestoneStart)
    if (match) {
      milestones.push({ count: Number(match[1]), effect: match[2].trim() })
      continue
    }

    if (milestones.length > 0) {
      milestones[milestones.length - 1].effect += ` ${line}`
    }
  }

  if (milestones.length === 0) {
    const cleaned = lines.filter((l) => !HEADER_SKIP.test(l)).join(" ")
    const count = fallbackCounts[0]?.count ?? 1
    return [{ count, effect: cleaned }]
  }

  return milestones.map((m) => ({
    count: m.count,
    effect: m.effect.trim(),
  }))
}

function formatMilestones(milestones) {
  if (milestones.length === 0) return "[]"
  const items = milestones.map(
    (m) => `      { count: ${m.count}, effect: "${escapeString(m.effect)}" }`
  )
  return `[\n${items.join(",\n")},\n    ]`
}

function formatTraitObject(item, { includeSkillName }) {
  const lines = [
    "  {",
    `    id: "${item.id}",`,
    `    name: "${escapeString(item.name)}",`,
    `    icon: "${escapeString(item.icon)}",`,
    `    iconUrl: "${item.iconUrl}",`,
  ]
  if (includeSkillName && item.skillName) {
    lines.push(`    skillName: "${escapeString(item.skillName)}",`)
  }
  lines.push(
    `    description: "${escapeString(item.description)}",`,
    `    milestones: ${formatMilestones(item.milestones)},`,
    "  }"
  )
  return lines.join("\n")
}

async function main() {
  const existingRaces = await loadExistingSeed(RACES_TS)
  const existingClasses = await loadExistingSeed(CLASSES_TS)

  console.log(`Loaded ${existingRaces.size} existing races, ${existingClasses.size} existing classes`)

  const res = await fetch(LIST_URL, { headers: { "User-Agent": "Mozilla/5.0" } })
  if (!res.ok) throw new Error(`Failed to fetch list: ${res.status}`)
  const html = await res.text()
  const data = parseNuxt(html)
  const charactorData = data.data[0].prop.charactorData
  const raceList = charactorData.race.list
  const careerList = charactorData.Career.list

  /** @type {object[]} */
  const races = []
  /** @type {object[]} */
  const classes = []
  const audit = { importedAt: new Date().toISOString(), races: [], classes: [], unmatched: [] }

  for (const entry of raceList) {
    const f = entry.fields_data
    const name = f.name.trim()
    const id = RACE_NAME_TO_ID[name]
    if (!id) {
      audit.unmatched.push({ kind: "race", name })
      continue
    }

    const existing = existingRaces.get(id)
    const ext = extFromUrl(f.ethnicIcon)
    const iconRel = `/traits/${id}.${ext}`
    const iconAbs = path.join(PUBLIC_TRAITS, `${id}.${ext}`)
    const downloaded = await downloadImage(f.ethnicIcon, iconAbs)
    if (downloaded) await sleep(RATE_MS)

    const milestones = parseMilestones(
      f.racialSkills,
      name,
      existing?.milestones ?? [{ count: 2 }]
    )

    races.push({
      id,
      name,
      icon: existing?.icon ?? "❓",
      iconUrl: downloaded ? iconRel : existing ? undefined : iconRel,
      skillName: f.skillName?.trim() || name,
      description: existing?.description ?? "",
      milestones,
    })
    audit.races.push({ id, name, iconDownloaded: downloaded })
  }

  for (const entry of careerList) {
    const f = entry.fields_data
    const name = f.name.trim()
    const id = CLASS_NAME_TO_ID[name]
    if (!id) {
      audit.unmatched.push({ kind: "class", name })
      continue
    }

    const existing = existingClasses.get(id)
    const ext = extFromUrl(f.careerIcon)
    const iconRel = `/traits/${id}.${ext}`
    const iconAbs = path.join(PUBLIC_TRAITS, `${id}.${ext}`)
    const downloaded = await downloadImage(f.careerIcon, iconAbs)
    if (downloaded) await sleep(RATE_MS)

    const milestones = parseMilestones(
      f.careerEffect,
      name,
      existing?.milestones ?? [{ count: 2 }]
    )

    classes.push({
      id,
      name,
      icon: existing?.icon ?? "❓",
      iconUrl: downloaded ? iconRel : existing ? undefined : iconRel,
      description: existing?.description ?? "",
      milestones,
    })
    audit.classes.push({ id, name, iconDownloaded: downloaded })
  }

  // Preserve seed order from existing files
  const raceOrder = [...existingRaces.keys()]
  const classOrder = [...existingClasses.keys()]
  races.sort((a, b) => raceOrder.indexOf(a.id) - raceOrder.indexOf(b.id))
  classes.sort((a, b) => classOrder.indexOf(a.id) - classOrder.indexOf(b.id))

  const racesContent = `/** Race (tộc) definitions — synced from ac.dragonest.com/en/charactor */
export const RACES = [
${races.map((r) => formatTraitObject(r, { includeSkillName: true })).join(",\n")},
]
`

  const classesContent = `/** Class (hệ) definitions — synced from ac.dragonest.com/en/charactor */
export const CLASSES = [
${classes.map((c) => formatTraitObject(c, { includeSkillName: false })).join(",\n")},
]
`

  await fs.writeFile(RACES_TS, racesContent)
  await fs.writeFile(CLASSES_TS, classesContent)

  console.log(`Races: ${audit.races.length}/${raceList.length}`)
  console.log(`Classes: ${audit.classes.length}/${careerList.length}`)
  if (audit.unmatched.length) {
    console.log("Unmatched:", audit.unmatched)
  }
  console.log(`Wrote ${RACES_TS}`)
  console.log(`Wrote ${CLASSES_TS}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
