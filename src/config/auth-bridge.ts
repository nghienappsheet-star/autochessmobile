/**
 * Auth bridge toggles — local only until Supabase is connected.
 * Set syncPublicLoginToAdminList to true when wiring AuthContext → admin-store.
 */
export {
  DEFAULT_AUTH_BRIDGE_CONFIG,
  ADMIN_USERS_SYNC_EVENT,
  type AuthBridgeConfig,
  stableUuidFromEmail,
  ensureStableUserId,
  resolvePublicUserRole,
  publicUserToAdminRecord,
  adminRecordToPublicUser,
  upsertAdminUserFromPublic,
  syncPublicLoginToAdminUsers,
} from "@/lib/auth-bridge"
