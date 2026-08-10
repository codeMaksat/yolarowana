import {
  requireAdmin,
  supabaseAdmin,
} from "@/utils/supabaseServer";

const GOOGLE_REVIEW_URL =
  "https://g.page/r/CTiQoM5O8GDmEBM/review";

const getScheduledDate = tourEndDate => {
  /*
    Tour finishes on, for example:
    2026-09-17

    Review request:
    2026-09-18 at 10:00 Ashgabat time (+05:00)
  */

  const endDate = new Date(
    `${tourEndDate}T00:00:00+05:00`
  );

  return new Date(
    endDate.getTime() + 34 * 60 * 60 * 1000
  ).toISOString();
};

export default async function handler(req, res) {
  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return res.status(auth.status).json({
      error: auth.error,
    });
  }

  // --------------------------------
  // GET — list review requests
  // --------------------------------

  if (req.method === "GET") {
    const { data, error } = await supabaseAdmin
      .from("review_requests")
      .select("*")
      .order("scheduled_at", {
        ascending: false,
      });

    if (error) {
      console.error(
        "Review request fetch error:",
        error
      );

      return res.status(500).json({
        error: "Could not load review requests",
      });
    }

    return res.status(200).json({
      requests: data || [],
    });
  }

  // --------------------------------
  // POST — create review request
  // --------------------------------

  if (req.method === "POST") {
    const {
      client_name,
      client_email,
      tour_name,
      tour_end_date,
    } = req.body;

    if (
      !client_name ||
      !client_email ||
      !tour_end_date
    ) {
      return res.status(400).json({
        error:
          "Client name, email and tour end date are required",
      });
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(client_email)) {
      return res.status(400).json({
        error: "Please enter a valid email address",
      });
    }

    const scheduledAt =
      getScheduledDate(tour_end_date);

    const reminderScheduledAt = new Date(
      new Date(scheduledAt).getTime() +
        6 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data, error } = await supabaseAdmin
      .from("review_requests")
      .insert({
        client_name: client_name.trim(),
        client_email: client_email
          .trim()
          .toLowerCase(),

        tour_name: tour_name?.trim() || null,

        tour_end_date,

        platform: "google",

        review_url: GOOGLE_REVIEW_URL,

        scheduled_at: scheduledAt,

        reminder_scheduled_at:
          reminderScheduledAt,

        status: "scheduled",

        automatic_review_request: true,
      })
      .select()
      .single();

    if (error) {
      console.error(
        "Review request create error:",
        error
      );

      return res.status(500).json({
        error: "Could not create review request",
      });
    }

    return res.status(201).json({
      success: true,
      request: data,
    });
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}