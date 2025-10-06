import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { ProfileDraft } from "./profile-schema";
import { SECTION_QUESTIONS, type ProfileSectionKey } from "@/data/questions";

let client: SupabaseClient | null = null;

function ensureClient() {
  if (!client) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!url || !key) {
      console.warn(
        "[Supabase] Missing configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
      );
      return null;
    }

    client = createClient(url, key, {
      auth: {
        persistSession: false,
      },
    });
  }
  return client;
}

export function getSupabaseClient() {
  return ensureClient();
}

export async function saveProfileDraft(draft: ProfileDraft) {
  const supabase = ensureClient();
  if (!supabase) {
    console.warn("[Supabase] Unable to save draft without configuration.");
    return { error: "missing-credentials" as const };
  }

  const payload = {
    owner_id: draft.ownerId,
    answers: draft.answers,
    skipped: draft.skipped,
    is_published: draft.isPublished,
  };

  const { error } = await supabase
    .from("profiles")
    .upsert(payload, { onConflict: "owner_id" });

  if (error) {
    console.error("[Supabase] Failed to save profile draft", error);
    return { error };
  }

  return { data: payload };
}

export async function fetchProfileBySlug(slug: string) {
  const supabase = ensureClient();
  if (!supabase) {
    console.warn("[Supabase] Missing credentials. Returning fallback data.");
    return {
      data: {
        slug,
        answers: buildEmptyPayload(),
      },
    };
  }

  const { data, error } = await supabase
    .from("public_profiles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[Supabase] Failed to fetch profile", error);
    return { error };
  }
  return { data };
}

export async function publishProfile(ownerId: string) {
  const supabase = ensureClient();
  if (!supabase) {
    return { error: "missing-credentials" as const };
  }

  const { error } = await supabase.rpc("publish_profile", {
    owner_id: ownerId,
  });

  if (error) {
    console.error("[Supabase] Failed to publish profile", error);
    return { error };
  }

  return { success: true };
}

function buildEmptyPayload() {
  return Object.fromEntries(
    Object.entries(SECTION_QUESTIONS).map(([section, questions]) => [
      section,
      Object.fromEntries(
        questions.map((question) => [question.id, question.type === "chips" ? [] : ""]),
      ),
    ]),
  ) as Record<ProfileSectionKey, Record<string, string | string[]>>;
}
