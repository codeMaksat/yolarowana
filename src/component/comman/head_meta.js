import Head from "next/head";
import { useRouter } from "next/router";

const Head_Meta = ({
  meta_data = {},
  comman_meta = {},
  structuredData = [],
}) => {
  const router = useRouter();

  const cleanPath = (router.asPath || "/").split("?")[0].split("#")[0];

  const noIndexPaths = [
    "/belet-admin",
    "/tour-dashboard",
    "/booking-dashboard",
    "/travel-mates/request",
  ];

  const shouldNoIndex =
    noIndexPaths.some(path => cleanPath.startsWith(path)) ||
    (router.asPath || "").includes("preview=true");

  const robotsContent = shouldNoIndex
    ? "noindex, nofollow, max-snippet:-1, max-video-preview:-1, max-image-preview:large"
    : "index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large";

  const siteUrl = (comman_meta.http_url || "https://belettravel.com").replace(
    /\/$/,
    ""
  );

  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "/" : cleanPath}`;

  const title =
    meta_data.title ||
    "Belet Travel | Central Asia Tours by Local Experts";

  const description =
    meta_data.description ||
    "Explore Turkmenistan and Central Asia with locally designed private and group tours by Belet Travel.";

  const ogTitle = meta_data.og_title || title;

  const makeAbsoluteUrl = value => {
    if (!value) {
      return `${siteUrl}/assets/images/belet-travel-og-image.jpg`;
    }

    if (/^https?:\/\//i.test(value)) {
      return value;
    }

    return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
  };

  const image = makeAbsoluteUrl(meta_data.image);

  const imageAlt =
    meta_data.image_alt || "Belet Travel Central Asia Tours";

  const twitterCard =
    meta_data.twitter_card || "summary_large_image";

  const twitterImage = makeAbsoluteUrl(
    meta_data.twitter_image || meta_data.image
  );

  const twitterTitle =
    meta_data.twitter_title || title;

  const twitterDescription =
    meta_data.twitter_description || description;

  const locale =
    meta_data.locale || "en_US";

  const siteType =
    comman_meta.site_type || "website";

  const siteName =
    comman_meta.site_name || "Belet Travel";

  const imageWidth =
    comman_meta.image_width || "1200";

  const imageHeight =
    comman_meta.image_height || "630";

  const favicon =
    comman_meta.favicon || "/favicon.ico";

  const serializeJsonLd = value =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  const organizationId = `${siteUrl}/#organization`;
  const websiteId = `${siteUrl}/#website`;

  const homepageSchemas =
    !shouldNoIndex && cleanPath === "/"
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": organizationId,
            name: siteName,
            url: `${siteUrl}/`,
            image,
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": websiteId,
            url: `${siteUrl}/`,
            name: siteName,
            publisher: {
              "@id": organizationId,
            },
          },
        ]
      : [];

  const extraSchemas = Array.isArray(structuredData)
    ? structuredData.filter(Boolean)
    : structuredData
      ? [structuredData]
      : [];

  const schemas = shouldNoIndex
    ? []
    : [...homepageSchemas, ...extraSchemas];

  return (
    <>
      <Head>
      <title>{title}</title>

      <link rel="icon" href={favicon} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#F3E6DA" />
      <meta name="robots" content={robotsContent} />
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content={locale} />
      <meta property="og:type" content={siteType} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={imageWidth} />
      <meta property="og:image:height" content={imageHeight} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={twitterTitle} />
      <meta
        name="twitter:description"
        content={twitterDescription}
      />
      <meta name="twitter:image" content={twitterImage} />

      {meta_data.twitter_site && (
        <meta name="twitter:site" content={meta_data.twitter_site} />
      )}

      {meta_data.twitter_creator && (
        <meta
          name="twitter:creator"
          content={meta_data.twitter_creator}
        />
      )}

      </Head>

      {schemas.map((schema, index) => (
        <script
          key={`${schema["@type"] || "schema"}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(schema),
          }}
        />
      ))}
    </>
  );
};

export default Head_Meta;