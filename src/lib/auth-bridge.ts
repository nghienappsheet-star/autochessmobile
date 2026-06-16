import type { PublicUserRole, User } from "@/contexts/AuthContext"
import type { AdminUserRecord } from "@/components/admin/AdminUserForm"
import { DEFAULT_ADMIN_USERS } from "@/lib/admin-store"
import { loadJson, saveJson } from "@/lib/storage"
import { STORAGE_KEYS } from "@/lib/storage-keys"

export const ADMIN_USERS_SYNC_EVENT = "admin-users-sync"

const VALID_ROLES: AdminUserRecord["role"][] = ["Quản trị viên", "Moderator", "Thành viên"]

/**
 * Local-only auth bridge — maps public session user ↔ admin user records.
 * No Supabase/network; wire Supabase later via AuthContext + admin-store sync.
 */
export type AuthBridgeConfig = {
  /** When enabled, public login upserts a matching row in admin user list (localStorage). */
  syncPublicLoginToAdminList: boolean
}

export const DEFAULT_AUTH_BRIDGE_CONFIG: AuthBridgeConfig = {
  syncPublicLoginToAdminList: true,
}

/** Deterministic UUID-shaped id from email — stable across sessions (Supabase-ready). */
export function stableUuidFromEmail(email: string): string {
  const normalized = email.trim().toLowerCase()
  const bytes = new TextEncoder().encode(normalized)
  let hash = 0x811c9dc5
  for (const byte of bytes) {
    hash ^= byte
    hash = Math.imul(hash, 0x01000193)
  }
  const h2 = Math.imul(hash, 2654435761) >>> 0
  const h3 = Math.imul(hash, 1597334677) >>> 0
  const h4 = Math.imul(hash, 2246822519) >>> 0
  const variant = (8 + (hash % 4)).toString(16)
  const part1 = (hash >>> 0).toString(16).padStart(8, "0")
  const part2 = (h2 & 0xffff).toString(16).padStart(4, "0")
  const part3 = (0x4000 | (h3 & 0x0fff)).toString(16).padStart(4, "0")
  const part4 = `${variant}${(h4 & 0x0fff).toString(16).padStart(3, "0")}`
  const part5 = h3.toString(16).padStart(8, "0") + h4.toString(16).padStart(4, "0")
  return `${part1}-${part2}-${part3}-${part4}-${part5}`.slice(0, 36)
}

export function parseAdminUserId(raw: string): number {
  const parsed = Number.parseInt(raw, 10)
  if (Number.isFinite(parsed) && parsed > 0) return parsed
  let hash = 0
  for (let i = 0; i < raw.length; i++) {
    hash = (hash * 31 + raw.charCodeAt(i)) | 0
  }
  const positive = Math.abs(hash)
  return positive > 0 ? positive : 1
}

export function resolvePublicUserRole(user: User): AdminUserRecord["role"] {
  if (user.role && VALID_ROLES.includes(user.role)) return user.role
  const metaRole = user.metadata?.role
  if (typeof metaRole === "string" && VALID_ROLES.includes(metaRole)) {
    return metaRole
  }
  return "Thành viên"
}

export function ensureStableUserId(user: Pick<User, "id" | "email">): string {
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)) {
    return user.id
  }
  return stableUuidFromEmail(user.email)
}

export function publicUserToAdminRecord(
  user: User,
  role?: AdminUserRecord["role"]
): AdminUserRecord {
  const stableId = ensureStableUserId(user)
  const resolvedRole = role ?? resolvePublicUserRole(user)
  return {
    id: parseAdminUserId(stableId),
    name: user.name,
    email: user.email,
    role: resolvedRole,
    status: "Hoạt động",
    date: user.joinedAt
      ? new Date(user.joinedAt).toLocaleDateString("vi-VN")
      : new Date().toLocaleDateString("vi-VN"),
  }
}

export function adminRecordToPublicUser(record: AdminUserRecord): User {
  return {
    id: String(record.id),
    name: record.name,
    email: record.email,
    avatar: "",
    role: VALID_ROLES.includes(record.role as PublicUserRole)
      ? (record.role as PublicUserRole)
      : "Thành viên",
  }
}

/** Merge public user into admin list without duplicates (by email). */
export function upsertAdminUserFromPublic(
  users: AdminUserRecord[],
  publicUser: User,
  role?: AdminUserRecord["role"]
): AdminUserRecord[] {
  const next = publicUserToAdminRecord(publicUser, role)
  const index = users.findIndex((u) => u.email.toLowerCase() === next.email.toLowerCase())
  if (index === -1) return [...users, next]
  return users.map((u, i) => (i === index ? { ...u, ...next, id: u.id } : u))
}

/** Persist public login into admin user list (localStorage only). */
export function syncPublicLoginToAdminUsers(publicUser: User): AdminUserRecord[] | null {
  if (!DEFAULT_AUTH_BRIDGE_CONFIG.syncPublicLoginToAdminList) return null
  const sessionUser = {
    ...publicUser,
    id: ensureStableUserId(publicUser),
  }
  const current = loadJson<AdminUserRecord[]>(STORAGE_KEYS.adminUsers, DEFAULT_ADMIN_USERS)
  const next = upsertAdminUserFromPublic(current, sessionUser)
  saveJson(STORAGE_KEYS.adminUsers, next)
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(ADMIN_USERS_SYNC_EVENT))
  }
  return next
}
