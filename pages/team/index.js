import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Team } from "@/component/Sections/Page-team";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_team_data } = useFetchData("json/data/hero_team.json");

  const { data: team_product_data } = useFetchData(
    "json/data/team_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.team_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_team_data} />
      <All_Team initialValues={team_product_data} />
    </>
  );
}
