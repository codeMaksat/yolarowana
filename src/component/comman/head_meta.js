import Head from "next/head";
import { useRouter } from "next/router";

const Head_Meta = ({ meta_data = {}, comman_meta = {} }) => {
  const router = useRouter();

  const cleanPath = (router.asPath || "/").split("?")[0].split("#")[0];

  const noIndexPaths = [
    "/yola-admin",
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

  const siteUrl = comman_meta.http_url || "https://belettravel.com";
  const canonicalUrl = `${siteUrl}${cleanPath === "/" ? "/" : cleanPath}`;

  return (
    <Head>
      <title>{meta_data.title}</title>

      <link rel="icon" type="image/gif" href={comman_meta.favicon} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#F3E6DA" />
      <meta name="robots" content={robotsContent} />

      <meta
        name="description"
        property="description"
        content={meta_data.description}
      />

      <meta
        name="og-description"
        property="og:description"
        content={meta_data.description}
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:locale" content={meta_data.locale} />
      <meta property="og:image" content={meta_data.image} />
      <meta property="og:image:alt" content={meta_data.image_alt} />
      <meta property="og:type" content={comman_meta.site_type} />
      <meta property="og:title" content={meta_data.og_title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={comman_meta.site_name} />
      <meta property="og:image:width" content={comman_meta.image_width} />
      <meta property="og:image:height" content={comman_meta.image_height} />

      <meta property="twitter:card" content={meta_data.twitter_card} />
      <meta property="twitter:image" content={meta_data.twitter_image} />
      <meta property="twitter:title" content={meta_data.twitter_title} />
      <meta
        property="twitter:description"
        content={meta_data.twitter_description}
      />

      {meta_data.twitter_site && (
        <meta property="twitter:site" content={meta_data.twitter_site} />
      )}

      {meta_data.twitter_creator && (
        <meta property="twitter:creator" content={meta_data.twitter_creator} />
      )}
    </Head>
  );
};

export default Head_Meta;