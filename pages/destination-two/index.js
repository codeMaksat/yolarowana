import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Destination_Two } from "@/component/Sections/Page-destination-two";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Destination_two() {
  const { data: hero_about_data } = useFetchData(
    "json/data/hero_two_destination.json"
  );

  const { data: destination_two_product_data } = useFetchData(
    "json/data/destination_two_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.destination_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_about_data} />
      <All_Destination_Two initialValues={destination_two_product_data} />
    </>
  );
}
