import { All_Blog } from "@/component/Sections/Page-blog";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { Head_Meta } from "@/component/comman";
import React from "react";
import heroBlogData from "../../public/json/data/hero_blog.json";
import blogProductData from "../../public/json/data/blog_product.json";
import sideBarData from "../../public/json/data/side_bar.json";
import siteMetaData from "../../public/json/data/site_meta_link.json";

const siteUrl = String(
  siteMetaData.http_url || "https://belettravel.com"
).replace(/\/$/, "");

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
  ],
};

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name:
    siteMetaData.blog_meta?.title ||
    "Central Asia Travel Guide | Belet Travel",
  description:
    siteMetaData.blog_meta?.description ||
    "Travel guides, practical advice and destination insights for Central Asia.",
  url: `${siteUrl}/blog`,
  isPartOf: {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
  },
  publisher: {
    "@id": `${siteUrl}/#travelagency`,
  },
};

export default function Blog() {
  return (
    <>
      <Head_Meta
        meta_data={siteMetaData.blog_meta}
        comman_meta={siteMetaData}
        structuredData={[breadcrumbSchema, collectionPageSchema]}
      />

      <Comman_Hero initialValues={heroBlogData} />

      <All_Blog
        initialValues={blogProductData}
        side_bar_data={sideBarData}
      />
    </>
  );
}