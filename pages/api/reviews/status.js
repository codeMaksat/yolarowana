import {
  requireAdmin,
  supabaseAdmin,
} from "@/utils/supabaseServer";

const allowedStatuses = [
  "scheduled",
  "reviewed",
  "cancelled",
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return res.status(auth.status).json({
      error: auth.error,
    });
  }

  const { id, status } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Review request ID is required",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
    });
  }

  const { data: existing, error: fetchError } =
    await supabaseAdmin
      .from("review_requests")
      .select("*")
      .eq("id", id)
      .single();

  if (fetchError || !existing) {
    return res.status(404).json({
      error: "Review request not found",
    });
  }

  const now = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("review_requests")
    .update({
      status,
      updated_at: now,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Review status update error:", error);

    return res.status(500).json({
      error: "Could not update review request",
    });
  }

  return res.status(200).json({
    success: true,
    request: data,
  });
}