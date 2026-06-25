import { supabase } from "./supabaseClient";

export async function getPublishedTours() {
  const { data, error } = await supabase
    .from("tours")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading published tours:", error.message);
    return [];
  }

  return data || [];
}