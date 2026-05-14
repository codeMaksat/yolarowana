import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { All_Hotels } from "@/component/Sections/Page-hotels";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

// Rename the function to start with an uppercase letter
export default function Hotels() {
  const { data: heroHotelsData } = useFetchData("json/data/hero_hotels.json");

  const { data: hotelProductData } = useFetchData(
    "json/data/hotels_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.hotel_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={heroHotelsData} />
      <All_Hotels initialValues={hotelProductData} />
    </>
  );
}
