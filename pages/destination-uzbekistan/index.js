import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Destination_Detail } from "@/component/Sections/Page-destination-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function Destination() {
  const { data: hero_destination_detail_data } = useFetchData(
    "json/data/hero_destination_uzbekistan.json"
  );

  const { data: destination_detail_product_data } = useFetchData(
    "json/data/destination_uzbekistan_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta
        meta_data={seo_data.destination_uzbekistan_meta}
        comman_meta={seo_data}
      />
      <Comman_Hero initialValues={hero_destination_detail_data} />
      <All_Destination_Detail initialValues={destination_detail_product_data} />
    </>
  );
}
