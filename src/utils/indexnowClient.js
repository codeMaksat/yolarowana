import { supabase } from "@/utils/supabaseClient";

export const submitIndexNow = async urls => {
  const urlList = Array.isArray(urls) ? urls : [urls];

  const cleanUrls = [...new Set(
    urlList
      .filter(Boolean)
      .map(value => String(value).trim())
      .filter(Boolean)
  )];

  if (!cleanUrls.length) {
    return {
      success: false,
      skipped: true,
      reason: "No URLs supplied.",
    };
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.access_token) {
    throw new Error("Admin session expired. Please log in again.");
  }

  const response = await fetch("/api/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
    },
    body: JSON.stringify({
      urls: cleanUrls,
    }),
  });

  let result = {};

  try {
    result = await response.json();
  } catch {
    result = {};
  }

  if (!response.ok) {
    throw new Error(
      result?.error ||
        `IndexNow submission failed with status ${response.status}.`
    );
  }

  return result;
};
