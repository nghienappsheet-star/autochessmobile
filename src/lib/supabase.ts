import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

function readSupabaseEnv(): { url: string; anonKey: string } | null {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim()
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()
  if (!url || !anonKey) return null
  return { url, anonKey }
}

/** True when both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set. */
export function isSupabaseConfigured(): boolean {
  return readSupabaseEnv() !== null
}

/**
 * Lazy singleton Supabase client for the browser.
 * Throws if env vars are missing — guard with isSupabaseConfigured() first.
 */
export function getSupabase(): SupabaseClient {
  if (client) return client

  const env = readSupabaseEnv()
  if (!env) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env"
    )
  }

  client = createClient(env.url, env.anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        "x-client-info": "autochessmobile-web",
      },
    },
  })

  return client
}
