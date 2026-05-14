import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Sitemap } from "@/component/Sections/Page-sitemap";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Contact() {
  const { data: hero_sitemap_data } = useFetchData(
    "json/data/hero_sitemap.json"
  );

  const { data: gallery_product_data } = useFetchData(
    "json/data/gallery_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.sitemap_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_sitemap_data} />
      <All_Sitemap initialValues={gallery_product_data} />
    </>
  );
}
