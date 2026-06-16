#!/usr/bin/env node
/**
 * Checks vi/en i18n key parity across all namespaces.
 * Usage: node scripts/i18n-check.mjs
 */
import { readFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, "..")
const LOCALES_DIR = join(ROOT, "src/locales")

const NAMESPACES = [
  "common",
  "nav",
  "auth",
  "footer",
  "home",
  "pages",
  "tools",
  "community",
  "news",
]

function flattenKeys(obj, prefix = "") {
  const keys = []
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

function loadNamespace(locale, ns) {
  const filePath = join(LOCALES_DIR, locale, `${ns}.json`)
  const raw = readFileSync(filePath, "utf-8")
  return JSON.parse(raw)
}

let hasErrors = false

for (const ns of NAMESPACES) {
  const viKeys = new Set(flattenKeys(loadNamespace("vi", ns)))
  const enKeys = new Set(flattenKeys(loadNamespace("en", ns)))

  const missingInEn = [...viKeys].filter((k) => !enKeys.has(k)).sort()
  const missingInVi = [...enKeys].filter((k) => !viKeys.has(k)).sort()

  if (missingInEn.length === 0 && missingInVi.length === 0) {
    console.log(`✓ ${ns}: ${viKeys.size} keys in sync`)
    continue
  }

  hasErrors = true
  console.error(`✗ ${ns}: key mismatch`)

  if (missingInEn.length > 0) {
    console.error(`  Missing in en/${ns}.json (${missingInEn.length}):`)
    missingInEn.forEach((k) => console.error(`    - ${k}`))
  }
  if (missingInVi.length > 0) {
    console.error(`  Missing in vi/${ns}.json (${missingInVi.length}):`)
    missingInVi.forEach((k) => console.error(`    - ${k}`))
  }
}

if (hasErrors) {
  console.error("\ni18n check failed. Add missing keys to both locales.")
  process.exit(1)
}

console.log("\nAll namespaces in sync.")
