import { createClient } from "@supabase/supabase-js";

const SITE_HOST = "belettravel.com";
const SITE_ORIGIN = "https://belettravel.com";

const supabaseAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

const normalizeUrls = input => {
  const values = Array.isArray(input) ? input : [input];

  return [...new Set(
    values
      .filter(Boolean)
      .map(value => String(value).trim())
      .filter(Boolean)
      .map(value => {
        if (value.startsWith("/")) {
          return `${SITE_ORIGIN}${value}`;
        }

        return value;
      })
  )];
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Protect this endpoint with the same Supabase login used by the admin panel.
    const authorization = req.headers.authorization || "";
    const accessToken = authorization.startsWith("Bearer ")
      ? authorization.slice(7)
      : "";

    if (!accessToken) {
      return res.status(401).json({
        error: "Admin authentication required.",
      });
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAuth.auth.getUser(accessToken);

    if (userError || !user) {
      return res.status(401).json({
        error: "Invalid or expired admin session.",
      });
    }

    const key = process.env.INDEXNOW_KEY;

    if (!key) {
      return res.status(500).json({
        error: "INDEXNOW_KEY is not configured in Vercel.",
      });
    }

    const urls = normalizeUrls(req.body?.urls || req.body?.url);

    if (!urls.length) {
      return res.status(400).json({
        error: "At least one URL is required.",
      });
    }

    if (urls.length > 10000) {
      return res.status(400).json({
        error: "Too many URLs in one request.",
      });
    }

    for (const urlValue of urls) {
      let parsed;

      try {
        parsed = new URL(urlValue);
      } catch {
        return res.status(400).json({
          error: `Invalid URL: ${urlValue}`,
        });
      }

      if (
        parsed.protocol !== "https:" ||
        parsed.hostname !== SITE_HOST
      ) {
        return res.status(400).json({
          error: `Only ${SITE_ORIGIN} URLs can be submitted.`,
        });
      }
    }

    const keyLocation = `${SITE_ORIGIN}/${key}.txt`;

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key,
        keyLocation,
        urlList: urls,
      }),
    });

    // IndexNow commonly returns an empty body.
    const responseText = await response.text();

    if (!response.ok) {
      console.error("IndexNow submission failed:", {
        status: response.status,
        responseText,
      });

      return res.status(response.status).json({
        error: "IndexNow submission failed.",
        status: response.status,
        details: responseText || null,
      });
    }

    return res.status(200).json({
      success: true,
      submitted: urls,
      indexNowStatus: response.status,
    });
  } catch (error) {
    console.error("IndexNow API error:", error);

    return res.status(500).json({
      error: "Unexpected IndexNow submission error.",
    });
  }
}
