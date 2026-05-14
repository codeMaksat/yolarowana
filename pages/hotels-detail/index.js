import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Hotels_Detail } from "@/component/Sections/Page-hotels-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function Destination() {
  const { data: hero_hotels_detail_data } = useFetchData(
    "json/data/hero_hotels_detail.json"
  );

  const { data: hotels_detail_product_data } = useFetchData(
    "json/data/hotels_detail_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.hotel_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_hotels_detail_data} />
      <All_Hotels_Detail initialValues={hotels_detail_product_data} />
    </>
  );
}
