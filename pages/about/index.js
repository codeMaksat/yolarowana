import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  Icon_Grid,
  Get_About_Us,
  Most_Liked_Tours,
  Our_Team,
} from "@/component/Sections/Page-about";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Index() {
  const { data: hero_about_data } = useFetchData("json/data/hero_about.json");

  const { data: icon_grid_about_data } = useFetchData(
    "json/data/icon_grid_about.json"
  );

  const { data: get_about_us_about_data } = useFetchData(
    "json/data/get_about_us_about.json"
  );

  const { data: most_liked_tours_about_data } = useFetchData(
    "json/data/most_liked_tours_about.json"
  );

  const { data: our_team_about_data } = useFetchData(
    "json/data/our_team_about.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.about_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_about_data} />
      <Icon_Grid initialValues={icon_grid_about_data} />
      <Get_About_Us initialValues={get_about_us_about_data} />
      <Most_Liked_Tours initialValues={most_liked_tours_about_data} />
      {/* <Our_Team initialValues={our_team_about_data} /> */}
    </>
  );
}
