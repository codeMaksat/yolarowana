import { supabase } from "./supabaseClient";

export async function getPublishedTours() {
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  const { data: allTours, error: allError } = await supabase
    .from("tours")
    .select("title, slug, status")
    .limit(20);

  console.log("ALL TOURS ERROR:", allError);
  console.log("ALL TOURS DATA:", allTours);

  const { data: publishedTours, error: publishedError } = await supabase
    .from("tours")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  console.log("PUBLISHED TOURS ERROR:", publishedError);
  console.log("PUBLISHED TOURS DATA:", publishedTours);

  if (publishedError) {
    console.error("Error loading published tours:", publishedError.message);
    return [];
  }

  return publishedTours || [];
}