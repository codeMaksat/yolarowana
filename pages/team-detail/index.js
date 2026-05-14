import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Team_Detail } from "@/component/Sections/Page-team-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_team_data } = useFetchData(
    "json/data/hero_team_detail.json"
  );

  const { data: team_detail_data } = useFetchData("json/data/team_detail.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.team_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_team_data} />
      <All_Team_Detail initialValues={team_detail_data} />
    </>
  );
}
