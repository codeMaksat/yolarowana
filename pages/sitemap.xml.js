import { supabase as serverSupabase } from "../lib/supabaseClient";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://belettravel.com"
).replace(/\/+$/, "");

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatLastmod(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString();
}

function generateUrlEntry({
  loc,
  lastmod = "",
}) {
  const safeLastmod =
    formatLastmod(lastmod);

  return `
  <url>
    <loc>${escapeXml(loc)}</loc>${
      safeLastmod
        ? `\n    <lastmod>${safeLastmod}</lastmod>`
        : ""
    }
  </url>`;
}

function generateSiteMap(
  staticPages = [],
  tours = []
) {
  const staticUrls = staticPages
    .map((page) =>
      generateUrlEntry({
        loc: `${SITE_URL}${page.path}`,
      })
    )
    .join("");

  const tourUrls = tours
    .filter((tour) => tour?.slug)
    .map((tour) =>
      generateUrlEntry({
        loc: `${SITE_URL}/tours/${tour.slug}`,
        lastmod:
          tour.updated_at ||
          tour.created_at,
      })
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${tourUrls}
</urlset>`;
}

export async function getServerSideProps({
  res,
}) {
  const staticPages = [
    {
      path: "/",
    },

    {
      path: "/tour",
    },

    /* DESTINATIONS */

    {
      path: "/destination-central-asia",
    },

    {
      path: "/destination-turkmenistan",
    },

    {
      path: "/destination-uzbekistan",
    },

    {
      path: "/destination-kazakhstan",
    },

    {
      path: "/destination-kyrgyzstan",
    },

    {
      path: "/destination-tajikistan",
    },

    /* BLOG */

    {
      path: "/blog",
    },

    {
      path: "/best-places-to-visit-turkmenistan",
    },

    {
      path: "/best-time-to-visit-central-asia",
    },

    {
      path: "/central-asia-visa-guide",
    },

    {
      path: "/darvaza-gas-crater-guide",
    },

    {
      path: "/how-to-plan-five-stans-tour",
    },

    {
      path: "/is-central-asia-safe",
    },

    {
      path: "/kazakhstan-travel-guide",
    },

    {
      path: "/kyrgyzstan-travel-guide",
    },

    {
      path: "/silk-road-travel-guide",
    },

    {
      path: "/tajikistan-travel-guide",
    },

    {
      path: "/turkmenistan-itinerary",
    },

    {
      path: "/turkmenistan-visa-guide",
    },

    {
      path: "/uzbekistan-silk-road-guide",
    },

    {
      path: "/uzbekistan-to-turkmenistan-border-guide",
    },

    /* COMPANY */

    {
      path: "/travel-mates",
    },

    {
      path: "/about",
    },

    {
      path: "/contact",
    },

    /* POLICIES */

    {
      path: "/payment-cancellation-policy",
    },

    {
      path: "/privacy-policy",
    },

    {
      path: "/terms-and-conditions",
    },
  ];

  const {
    data: tours,
    error,
  } = await serverSupabase
    .from("tours")
    .select(
      "slug, created_at, updated_at"
    )
    .eq("status", "published")
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    console.error(
      "Sitemap Supabase error:",
      error.message
    );
  }

  const sitemap =
    generateSiteMap(
      staticPages,
      tours || []
    );

  res.setHeader(
    "Content-Type",
    "text/xml"
  );

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=86400"
  );

  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {
  return null;
}