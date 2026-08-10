import { Resend } from "resend";
import {
  requireAdmin,
  supabaseAdmin,
} from "@/utils/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);

const escapeHtml = value => {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  // 1. Verify logged-in admin
  const auth = await requireAdmin(req);

  if (!auth.ok) {
    return res.status(auth.status).json({
      error: auth.error,
    });
  }

  // 2. Get review request ID
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Review request ID is required",
    });
  }

  // 3. Load scheduled review request
  const { data: reviewRequest, error: fetchError } =
    await supabaseAdmin
      .from("review_requests")
      .select("*")
      .eq("id", id)
      .single();

  if (fetchError || !reviewRequest) {
    return res.status(404).json({
      error: "Review request not found",
    });
  }

  if (reviewRequest.status === "cancelled") {
    return res.status(400).json({
      error: "This review request has been cancelled",
    });
  }

  if (reviewRequest.status === "reviewed") {
    return res.status(400).json({
      error: "This customer is already marked as reviewed",
    });
  }

  try {
    // 4. Send email through Resend
    const { data, error } = await resend.emails.send({
      from: "Belet Travel <info@belettravel.com>",
      to: [reviewRequest.client_email],
      replyTo: "info@belettravel.com",

      subject: "How was your trip with Belet Travel?",

      html: `
        <div style="
          max-width:620px;
          margin:0 auto;
          padding:30px 20px;
          font-family:Arial,Helvetica,sans-serif;
          color:#202220;
          line-height:1.7;
        ">

          <div style="
            margin-bottom:30px;
            font-size:22px;
            font-weight:700;
            color:#071b1a;
          ">
            Belet Travel
          </div>

          <p>
            Dear ${escapeHtml(reviewRequest.client_name)},
          </p>

          <p>
            Thank you for traveling with Belet Travel.
            ${
              reviewRequest.tour_name
                ? `We hope you enjoyed your journey on the
                   ${escapeHtml(reviewRequest.tour_name)}.`
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
              href="${escapeHtml(reviewRequest.review_url)}"
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

        </div>
      `,
    });

    // 5. If Resend fails
    if (error) {
      await supabaseAdmin
        .from("review_requests")
        .update({
          status: "failed",
          last_error:
            error.message || "Could not send email",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      return res.status(400).json({
        error:
          error.message || "Could not send review email",
      });
    }

    // 6. Mark request as sent
    const now = new Date().toISOString();

    const { data: updatedRequest, error: updateError } =
      await supabaseAdmin
        .from("review_requests")
        .update({
          status: "sent",
          sent_at: now,
          resend_email_id: data?.id || null,
          last_error: null,
          updated_at: now,
        })
        .eq("id", id)
        .select()
        .single();

    if (updateError) {
      console.error(
        "Could not update review request:",
        updateError
      );
    }

    return res.status(200).json({
      success: true,
      emailId: data?.id,
      request: updatedRequest,
    });

  } catch (error) {
    console.error("Review email error:", error);

    await supabaseAdmin
      .from("review_requests")
      .update({
        status: "failed",
        last_error:
          error.message || "Unknown sending error",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    return res.status(500).json({
      error: "Could not send review email",
    });
  }
}