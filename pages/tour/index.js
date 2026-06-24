import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour } from "@/component/Sections/Page-tour";
import { Head_Meta, useFetchData } from "@/component/comman";
import { getPublishedTours } from "../../lib/getPublishedTours";
import React from "react";

export default function Tour({ tours }) {
  const { data: hero_tour_data } = useFetchData("json/data/hero_tour.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  return (
    <>
      <Head_Meta meta_data={seo_data.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_data} />

      <div style={{ padding: "30px", background: "#fff", color: "#000" }}>
        Loaded tours: {tours?.length || 0}
      </div>

      <All_Tour initialValues={tours} />
    </>
  );
}

export async function getStaticProps() {
  const tours = await getPublishedTours();

  return {
    props: {
      tours,
    },
    revalidate: 60,
  };
}