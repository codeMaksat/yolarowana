import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour } from "@/component/Sections/Page-tour";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_tour_data } = useFetchData("json/data/hero_tour.json");

  const { data: tour_product_data } = useFetchData(
    "json/data/tour_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_data} />
      <All_Tour initialValues={tour_product_data} />
    </>
  );
}
