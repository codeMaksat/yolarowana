import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Grid } from "@/component/Sections/Page-tour-grid";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function Destination() {
  const { data: hero_tour_data } = useFetchData("json/data/hero_tour.json");

  const { data: tour_grid_product_data } = useFetchData(
    "json/data/tour_grid_product.json"
  );

  const { data: side_bar_data } = useFetchData("json/data/side_bar.json");


  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_data} />
      <All_Tour_Grid
        initialValues={tour_grid_product_data}
        side_bar_data={side_bar_data}
      />
    </>
  );
}
