import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Blog_Guide } from "@/component/Sections/Page-blog-guide";
import { Head_Meta } from "@/component/comman";
import React from "react";
import siteMetaData from "../../public/json/data/site_meta_link.json";
import guideData from "../../public/json/data/blog_best_time_central_asia.json";

const siteUrl = String(
  siteMetaData.http_url || "https://belettravel.com"
).replace(/\/$/, "");

const articlePath = "/best-time-to-visit-central-asia";
const articleUrl = `${siteUrl}${articlePath}`;
const articleMeta = siteMetaData.blog_best_time_central_asia_meta || {};

const firstGuide = Array.isArray(guideData) ? guideData[0] : guideData;

function getHeroImage(data) {
  const hero = data?.hero;

  if (Array.isArray(hero)) {
    return hero[0]?.image || hero[0]?.img || "";
  }

  return hero?.image || hero?.img || "";
}

function makeAbsoluteUrl(value) {
  if (!value) {
    return `${siteUrl}/assets/images/belet-travel-og-image.jpg`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

function getValidIsoDate(value) {
  if (!value) return undefined;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? undefined
    : date.toISOString();
}

const articleTitle =
  firstGuide?.title ||
  firstGuide?.hero?.[0]?.title ||
  firstGuide?.hero?.title ||
  articleMeta.title ||
  "Best Time to Visit Central Asia";

const articleDescription =
  articleMeta.description ||
  firstGuide?.description ||
  "Best Time to Visit Central Asia by Belet Travel.";

const articleImage = makeAbsoluteUrl(
  articleMeta.image ||
    firstGuide?.image ||
    firstGuide?.banner_image ||
    getHeroImage(firstGuide)
);

const datePublished = getValidIsoDate(
  firstGuide?.date_published ||
    firstGuide?.published_at ||
    firstGuide?.published_date ||
    firstGuide?.date
);

const dateModified = getValidIsoDate(
  firstGuide?.date_modified ||
    firstGuide?.updated_at ||
    firstGuide?.modified_date ||
    datePublished
);

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Travel Guide",
      item: `${siteUrl}/blog`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: articleTitle,
      item: articleUrl,
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: articleTitle,
  description: articleDescription,
  image: [articleImage],
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": articleUrl,
  },
  author: {
    "@type": "Organization",
    name: "Belet Travel",
    url: `${siteUrl}/`,
  },
  publisher: {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Belet Travel",
  },
  ...(datePublished ? { datePublished } : {}),
  ...(dateModified ? { dateModified } : {}),
};

export default function BestTimeToVisitCentralAsia() {
  const guides = Array.isArray(guideData) ? guideData : [guideData];

  return (
    <>
      <Head_Meta
        meta_data={articleMeta}
        comman_meta={siteMetaData}
        structuredData={[breadcrumbSchema, articleSchema]}
      />

      {guides.filter(Boolean).map((data, index) => (
        <React.Fragment key={data?.id || index}>
          <Comman_Hero initialValues={data.hero} />
          <All_Blog_Guide initialValues={[data]} />
        </React.Fragment>
      ))}
    </>
  );
}