import { supabase as serverSupabase } from "../lib/supabaseClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://belettravel.com";

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

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString();
}

function generateUrlEntry({
  loc,
  lastmod = "",
  changefreq = "",
  priority = "",
}) {
  const safeLastmod = formatLastmod(lastmod);

  return `
  <url>
    <loc>${escapeXml(loc)}</loc>${
      safeLastmod ? `\n    <lastmod>${safeLastmod}</lastmod>` : ""
    }${
      changefreq
        ? `\n    <changefreq>${escapeXml(changefreq)}</changefreq>`
        : ""
    }${
      priority
        ? `\n    <priority>${escapeXml(priority)}</priority>`
        : ""
    }
  </url>`;
}

function generateSiteMap(staticPages = [], tours = []) {
  const staticUrls = staticPages
    .map((page) =>
      generateUrlEntry({
        loc: `${SITE_URL}${page.path}`,
        changefreq: page.changefreq,
        priority: page.priority,
      })
    )
    .join("");

  const tourUrls = tours
    .filter((tour) => tour?.slug)
    .map((tour) =>
      generateUrlEntry({
        loc: `${SITE_URL}/tours/${tour.slug}`,
        lastmod: tour.updated_at || tour.created_at,
        changefreq: "weekly",
        priority: "0.85",
      })
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${tourUrls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const staticPages = [
    {
      path: "/",
      changefreq: "weekly",
      priority: "1.00",
    },
    {
      path: "/tour",
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      path: "/destination-central-asia",
      changefreq: "monthly",
      priority: "0.85",
    },
    {
      path: "/destination-turkmenistan",
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-uzbekistan",
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-kazakhstan",
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-kyrgyzstan",
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-tajikistan",
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/travel-guide",
      changefreq: "weekly",
      priority: "0.75",
    },
    {
      path: "/turkmenistan-itinerary",
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/darvaza-gas-crater-guide",
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/best-time-to-visit-central-asia",
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/uzbekistan-silk-road-guide",
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/travel-mates",
      changefreq: "weekly",
      priority: "0.70",
    },
    {
      path: "/about",
      changefreq: "monthly",
      priority: "0.60",
    },
    {
      path: "/contact",
      changefreq: "monthly",
      priority: "0.60",
    },
  ];

  const { data: tours, error } = await serverSupabase
    .from("tours")
    .select("slug, created_at, updated_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Sitemap Supabase error:", error.message);
  }

  const sitemap = generateSiteMap(staticPages, tours || []);

  res.setHeader("Content-Type", "text/xml");
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