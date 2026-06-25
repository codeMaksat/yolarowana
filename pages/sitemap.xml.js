import { supabase as serverSupabase } from "../lib/supabaseClient";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yolarowana.vercel.app";

function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateSiteMap(staticPages = [], tours = []) {
  const staticUrls = staticPages
    .map((page) => {
      return `
  <url>
    <loc>${escapeXml(`${SITE_URL}${page.path}`)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    })
    .join("");

  const tourUrls = tours
    .map((tour) => {
      const lastmod =
        tour.updated_at || tour.created_at || new Date().toISOString();

      return `
  <url>
    <loc>${escapeXml(`${SITE_URL}/tours/${tour.slug}`)}</loc>
    <lastmod>${new Date(lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${staticUrls}
${tourUrls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const now = new Date().toISOString();

  const staticPages = [
    {
      path: "/",
      lastmod: now,
      changefreq: "weekly",
      priority: "1.00",
    },
    {
      path: "/tour",
      lastmod: now,
      changefreq: "weekly",
      priority: "0.95",
    },
    {
      path: "/destination-central-asia",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.85",
    },
    {
      path: "/destination-turkmenistan",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-uzbekistan",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-kazakhstan",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-kyrgyzstan",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/destination-tajikistan",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.80",
    },
    {
      path: "/travel-guide",
      lastmod: now,
      changefreq: "weekly",
      priority: "0.75",
    },
    {
      path: "/turkmenistan-itinerary",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/darvaza-gas-crater-guide",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/best-time-to-visit-central-asia",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/uzbekistan-silk-road-guide",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.70",
    },
    {
      path: "/about",
      lastmod: now,
      changefreq: "monthly",
      priority: "0.60",
    },
    {
      path: "/contact",
      lastmod: now,
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