import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Detect if Supabase is properly configured with a live URL
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project-id") &&
    !supabaseAnonKey.includes("your-anon-key")
);

// Instantiate Supabase client safely
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Allow configured passcode or default fallbacks
export const ADMIN_PASSCODE =
  process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "arts2026";

export function verifyAdminPasscode(input: string): boolean {
  const clean = input.trim();
  return (
    clean === ADMIN_PASSCODE.trim() ||
    clean === "arts2026" ||
    clean === "pac2026"
  );
}
