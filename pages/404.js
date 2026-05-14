import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Error_404 } from "@/component/Sections/Page-404";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_404_data } = useFetchData("json/data/hero_404.json");

  const { data: error_404_detail_data } = useFetchData(
    "json/data/error_404_detail.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.error_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_404_data} />
      <All_Error_404 initialValues={error_404_detail_data} />
    </>
  );
}
