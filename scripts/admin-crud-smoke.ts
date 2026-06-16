/**
 * Smoke tests for admin helpers — run via `npm run test:admin-crud`
 */
import { createCrudSetters } from "../src/lib/entity-store.ts"
import {
  adminRecordToPublicUser,
  DEFAULT_AUTH_BRIDGE_CONFIG,
  ensureStableUserId,
  publicUserToAdminRecord,
  stableUuidFromEmail,
  upsertAdminUserFromPublic,
} from "../src/lib/auth-bridge.ts"

type TestEntity = { id: string; name: string }

function testCrudSetters() {
  let items: TestEntity[] = []
  const setItems = (updater: TestEntity[] | ((prev: TestEntity[]) => TestEntity[])) => {
    items = typeof updater === "function" ? updater(items) : updater
  }

  const crud = createCrudSetters<TestEntity>(setItems)

  const added = crud.add({ id: "1", name: "Alpha" })
  if (!added || items.length !== 1) throw new Error("add failed")

  const updated = crud.update("1", { name: "Beta" })
  if (!updated || items[0]?.name !== "Beta") throw new Error("update failed")

  crud.add({ id: "2", name: "Gamma" })
  crud.delete("1")
  if (items.length !== 1 || items[0]?.id !== "2") throw new Error("delete failed")
}

function testAuthBridge() {
  const email = "player@example.com"
  const stableId = stableUuidFromEmail(email)
  if (stableId !== stableUuidFromEmail(email)) {
    throw new Error("stableUuidFromEmail should be deterministic")
  }
  if (!/^[0-9a-f-]{36}$/i.test(stableId)) {
    throw new Error("stableUuidFromEmail should look like UUID")
  }

  const publicUser = {
    id: "legacy-id",
    name: "PlayerOne",
    email,
    avatar: "",
    joinedAt: "2024-05-20T00:00:00.000Z",
    role: "Moderator" as const,
  }

  const normalizedId = ensureStableUserId(publicUser)
  if (normalizedId !== stableId) {
    throw new Error("ensureStableUserId should derive from email when id is not UUID")
  }

  const record = publicUserToAdminRecord({ ...publicUser, id: normalizedId })
  if (record.email !== publicUser.email || record.role !== "Moderator") {
    throw new Error("publicUserToAdminRecord failed")
  }
  if (record.id !== publicUserToAdminRecord({ ...publicUser, id: normalizedId }).id) {
    throw new Error("parseAdminUserId should be stable for UUID ids")
  }

  const roundtrip = adminRecordToPublicUser(record)
  if (roundtrip.name !== publicUser.name || roundtrip.email !== publicUser.email) {
    throw new Error("adminRecordToPublicUser failed")
  }

  const merged = upsertAdminUserFromPublic([], { ...publicUser, id: normalizedId })
  if (merged.length !== 1) throw new Error("upsertAdminUserFromPublic insert failed")

  const deduped = upsertAdminUserFromPublic(merged, { ...publicUser, id: normalizedId, name: "Renamed" })
  if (deduped.length !== 1 || deduped[0]?.name !== "Renamed") {
    throw new Error("upsertAdminUserFromPublic update failed")
  }

  if (!DEFAULT_AUTH_BRIDGE_CONFIG.syncPublicLoginToAdminList) {
    throw new Error("auth bridge sync should be enabled for local login → admin list")
  }
}

import { mergeByIdWithSeed } from "../src/lib/seed-merge.ts"
import { traitFromFormValue, EMPTY_TRAIT_FORM } from "../src/components/admin/AdminTraitForm.helpers.ts"

function testTraitFromFormValue() {
  const record = traitFromFormValue(
    { ...EMPTY_TRAIT_FORM, name: "Ác Ma", icon: "👹", description: "Test desc" },
    "ac-ma",
    [
      { count: 2, effect: "Buff" },
      { count: 4, effect: "Super buff" },
    ]
  )
  if (record.id !== "ac-ma" || record.name !== "Ác Ma" || record.milestones.length !== 2) {
    throw new Error("traitFromFormValue failed")
  }
  const withDefault = traitFromFormValue(EMPTY_TRAIT_FORM, "x", [])
  if (!withDefault.description) throw new Error("traitFromFormValue defaultDesc failed")
}

function testSeedMerge() {
  type Row = { id: string; name: string; tier?: string }
  const stored: Row[] = [{ id: "a", name: "Custom A", tier: "S" }]
  const seed: Row[] = [
    { id: "a", name: "Seed A", tier: "B" },
    { id: "b", name: "Seed B" },
  ]
  const merged = mergeByIdWithSeed(stored, seed)
  if (merged.length !== 2) throw new Error("seed merge length failed")
  const a = merged.find((r) => r.id === "a")
  if (!a || a.name !== "Custom A" || a.tier !== "S") throw new Error("seed merge preserve failed")
  if (!merged.find((r) => r.id === "b")) throw new Error("seed merge append failed")
}

function runSmokeTests() {
  testCrudSetters()
  testAuthBridge()
  testSeedMerge()
  testTraitFromFormValue()
  console.log("✓ admin CRUD smoke tests passed")
}

runSmokeTests()
