import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_FAQ } from "@/component/Sections/Page-faq";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Faq() {
  const { data: hero_faq_data } = useFetchData("json/data/hero_faq.json");

  const { data: faq_product_data } = useFetchData(
    "json/data/faq_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.faq_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_faq_data} />
      <All_FAQ initialValues={faq_product_data} />
    </>
  );
}
