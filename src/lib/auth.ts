import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/env";

export async function getCurrentUser() {
  if (!hasSupabaseEnv()) {
    return null;
  }
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function isDevUnlocked(): Promise<boolean> {
  if (process.env.NODE_ENV !== "development") return false;
  const cookieStore = await cookies();
  return cookieStore.get("dev_unlocked")?.value === "1";
}

export async function userHasAccess(userId: string) {
  if (await isDevUnlocked()) return true;
  if (!hasSupabaseEnv()) return false;

  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("profiles")
    .select("has_access")
    .eq("id", userId)
    .maybeSingle();

  return Boolean(data?.has_access);
}
