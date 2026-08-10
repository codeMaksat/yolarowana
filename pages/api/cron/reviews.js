import { Resend } from "resend";
import { supabaseAdmin } from "@/utils/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = value => {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

const buildInitialEmail = request => {
  return `
    <div
      style="
        max-width:620px;
        margin:0 auto;
        padding:30px 20px;
        font-family:Arial,Helvetica,sans-serif;
        color:#202220;
        line-height:1.7;
      "
    >
      <div
        style="
          margin-bottom:30px;
          font-size:22px;
          font-weight:700;
          color:#071b1a;
        "
      >
        Belet Travel
      </div>

      <p>
        Dear ${escapeHtml(request.client_name)},
      </p>

      <p>
        Thank you for traveling with Belet Travel.
        ${
          request.tour_name
            ? `We hope you enjoyed your journey on the
               ${escapeHtml(request.tour_name)}.`
            : "We hope you enjoyed your journey with us."
        }
      </p>

      <p>
        If you have a moment, we would really appreciate
        your honest feedback about your experience.
        Your review helps future travelers feel more
        confident when planning their journey to
        Turkmenistan and Central Asia.
      </p>

      <div style="margin:32px 0;">
        <a
          href="${escapeHtml(request.review_url)}"
          style="
            display:inline-block;
            padding:14px 26px;
            border-radius:999px;
            background:#071b1a;
            color:#ffffff;
            text-decoration:none;
            font-weight:700;
          "
        >
          Leave a Google Review
        </a>
      </div>

      <p>
        Thank you again for choosing Belet Travel.
      </p>

      <p style="margin-top:28px;">
        Best regards,<br />
        <strong>Belet Travel</strong><br />
        Turkmenistan & Central Asia
      </p>

      <hr
        style="
          margin:35px 0 20px;
          border:0;
          border-top:1px solid #e2cfaf;
        "
      />

      <p style="font-size:12px;color:#777;">
        You received this email because you recently
        traveled with Belet Travel.
      </p>
    </div>
  `;
};

const buildReminderEmail = request => {
  return `
    <div
      style="
        max-width:620px;
        margin:0 auto;
        padding:30px 20px;
        font-family:Arial,Helvetica,sans-serif;
        color:#202220;
        line-height:1.7;
      "
    >
      <div
        style="
          margin-bottom:30px;
          font-size:22px;
          font-weight:700;
          color:#071b1a;
        "
      >
        Belet Travel
      </div>

      <p>
        Dear ${escapeHtml(request.client_name)},
      </p>

      <p>
        Just a quick follow-up after your recent journey
        with Belet Travel.
      </p>

      <p>
        If you haven't had a chance yet, we would be
        grateful if you could share your experience on
        Google. Your feedback helps future travelers when
        planning their trip to Turkmenistan and Central Asia.
      </p>

      <div style="margin:32px 0;">
        <a
          href="${escapeHtml(request.review_url)}"
          style="
            display:inline-block;
            padding:14px 26px;
            border-radius:999px;
            background:#071b1a;
            color:#ffffff;
            text-decoration:none;
            font-weight:700;
          "
        >
          Share Your Feedback
        </a>
      </div>

      <p>
        Thank you again for traveling with us.
      </p>

      <p style="margin-top:28px;">
        Best regards,<br />
        <strong>Belet Travel</strong><br />
        Turkmenistan & Central Asia
      </p>

      <hr
        style="
          margin:35px 0 20px;
          border:0;
          border-top:1px solid #e2cfaf;
        "
      />

      <p style="font-size:12px;color:#777;">
        This is the only reminder we send about your review.
      </p>
    </div>
  `;
};

export default async function handler(req, res) {
  // --------------------------------
  // 1. VERIFY VERCEL CRON
  // --------------------------------
  const authHeader = req.headers.authorization;

  if (
    !process.env.CRON_SECRET ||
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const now = new Date().toISOString();

  let initialSent = 0;
  let remindersSent = 0;
  let failed = 0;

  const errors = [];

  // ==========================================
  // PART A — INITIAL REVIEW REQUESTS
  // ==========================================

  const {
    data: scheduledRequests,
    error: scheduledFetchError,
  } = await supabaseAdmin
    .from("review_requests")
    .select("*")
    .eq("status", "scheduled")
    .eq("automatic_review_request", true)
    .lte("scheduled_at", now)
    .order("scheduled_at", {
      ascending: true,
    })
    .limit(50);

  if (scheduledFetchError) {
    console.error(
      "Could not load scheduled review requests:",
      scheduledFetchError
    );

    return res.status(500).json({
      error: "Could not load scheduled review requests",
    });
  }

  for (const request of scheduledRequests || []) {
    try {
      const { data, error } =
        await resend.emails.send(
          {
            from:
              "Belet Travel <info@belettravel.com>",

            to: [
              request.client_email,
            ],

            replyTo:
              "info@belettravel.com",

            subject:
              "How was your trip with Belet Travel?",

            html:
              buildInitialEmail(request),
          },
          {
            idempotencyKey:
              `review-initial/${request.id}`,
          }
        );

      if (error) {
        failed += 1;

        errors.push({
          id: request.id,
          email: request.client_email,
          type: "initial",
          error:
            error.message ||
            "Resend sending error",
        });

        await supabaseAdmin
          .from("review_requests")
          .update({
            status: "failed",
            last_error:
              error.message ||
              "Could not send email",
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", request.id);

        continue;
      }

      const sentAt =
        new Date().toISOString();

      const reminderAt =
        new Date(
          new Date(sentAt).getTime() +
            6 * 24 * 60 * 60 * 1000
        ).toISOString();

      await supabaseAdmin
        .from("review_requests")
        .update({
          status: "sent",
          sent_at: sentAt,
          reminder_scheduled_at:
            reminderAt,
          resend_email_id:
            data?.id || null,
          last_error: null,
          updated_at: sentAt,
        })
        .eq("id", request.id);

      initialSent += 1;
    } catch (error) {
      failed += 1;

      errors.push({
        id: request.id,
        email: request.client_email,
        type: "initial",
        error:
          error.message ||
          "Unknown sending error",
      });

      await supabaseAdmin
        .from("review_requests")
        .update({
          status: "failed",
          last_error:
            error.message ||
            "Unknown sending error",
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", request.id);
    }
  }

  // ==========================================
  // PART B — REMINDERS
  // ==========================================

  const reminderNow =
    new Date().toISOString();

  const {
    data: reminderRequests,
    error: reminderFetchError,
  } = await supabaseAdmin
    .from("review_requests")
    .select("*")
    .eq("status", "sent")
    .eq("automatic_review_request", true)
    .not(
      "reminder_scheduled_at",
      "is",
      null
    )
    .lte(
      "reminder_scheduled_at",
      reminderNow
    )
    .order(
      "reminder_scheduled_at",
      {
        ascending: true,
      }
    )
    .limit(50);

  if (reminderFetchError) {
    console.error(
      "Could not load review reminders:",
      reminderFetchError
    );

    return res.status(500).json({
      error:
        "Initial requests processed, but reminders could not be loaded",
      initialSent,
      failed,
    });
  }

  for (const request of reminderRequests || []) {
    try {
      const { data, error } =
        await resend.emails.send(
          {
            from:
              "Belet Travel <info@belettravel.com>",

            to: [
              request.client_email,
            ],

            replyTo:
              "info@belettravel.com",

            subject:
              "A quick follow-up from Belet Travel",

            html:
              buildReminderEmail(request),
          },
          {
            idempotencyKey:
              `review-reminder/${request.id}`,
          }
        );

      if (error) {
        failed += 1;

        errors.push({
          id: request.id,
          email: request.client_email,
          type: "reminder",
          error:
            error.message ||
            "Reminder sending error",
        });

        await supabaseAdmin
          .from("review_requests")
          .update({
            last_error:
              error.message ||
              "Could not send reminder",
            updated_at:
              new Date().toISOString(),
          })
          .eq("id", request.id);

        continue;
      }

      const reminderSentAt =
        new Date().toISOString();

      await supabaseAdmin
        .from("review_requests")
        .update({
          status: "reminder_sent",
          reminder_sent_at:
            reminderSentAt,
          last_error: null,
          updated_at:
            reminderSentAt,
        })
        .eq("id", request.id);

      remindersSent += 1;
    } catch (error) {
      failed += 1;

      errors.push({
        id: request.id,
        email: request.client_email,
        type: "reminder",
        error:
          error.message ||
          "Unknown reminder error",
      });

      await supabaseAdmin
        .from("review_requests")
        .update({
          last_error:
            error.message ||
            "Unknown reminder error",
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", request.id);
    }
  }

  return res.status(200).json({
    success: true,
    checkedAt: now,
    initialSent,
    remindersSent,
    failed,
    errors,
  });
}