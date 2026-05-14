import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail_Three } from "@/component/Sections/Page-tour-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function Destination() {
  const { data: hero_tour_detail_data } = useFetchData(
    "json/data/hero_tour_detail.json"
  );

  const { data: tour_detail_three_product_data } = useFetchData(
    "json/data/tour_detail_three_product.json"
  );

  const { data: side_bar_data } = useFetchData("json/data/side_bar_three.json");
  const { data: reviews_data } = useFetchData("json/data/reviews.json");
  const { data: related_product_data } = useFetchData(
    "json/data/related_product2.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_detail_data} />
      <All_Tour_Detail_Three
        initialValues={tour_detail_three_product_data}
        side_bar_data={side_bar_data}
        reviews_data={reviews_data}
        related_product_data={related_product_data}
      />
    </>
  );
}
