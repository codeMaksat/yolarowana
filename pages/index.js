import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  Full_Video,
  Hero,
  Latest_Blog_News,
  Perfect_Travel_Planner,
  Popular_Tours,
  Start_About,
  Start_Testimonial,
  Top_Destinations,
  Travel_Confidence,
  Why_Choose_Us,
} from "@/component/Sections/Page-one";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Index() {
  const { data: hero_data } = useFetchData("json/data/hero.json");

  const { data: top_destinations_data } = useFetchData(
    "json/data/top_destinations.json"
  );

  const { data: start_about_data } = useFetchData("json/data/start_about.json");

  const { data: popular_tours_data } = useFetchData(
    "json/data/popular_tours.json"
  );

  const { data: full_video_data } = useFetchData("json/data/full_video.json");

  const { data: perfect_travel_planner_data } = useFetchData(
    "json/data/perfect_travel_planner.json"
  );

  const { data: why_choose_us_data } = useFetchData(
    "json/data/why_choose_us.json"
  );

  const { data: start_testimonial_data } = useFetchData(
    "json/data/start_testimonial.json"
  );

  const { data: latest_blog_news_data } = useFetchData(
    "json/data/latest_blog_news.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.home_meta} comman_meta={seo_data} />
      <Hero initialValues={hero_data} />
      <Top_Destinations initialValues={top_destinations_data} />
      <Travel_Confidence />
      <Popular_Tours initialValues={popular_tours_data} />
      <Start_About initialValues={start_about_data} />
      <Perfect_Travel_Planner initialValues={perfect_travel_planner_data} />
      <Full_Video initialValues={full_video_data} />
      {/* <Why_Choose_Us initialValues={why_choose_us_data} /> */}
      <Start_Testimonial initialValues={start_testimonial_data} />
      <Latest_Blog_News initialValues={latest_blog_news_data} />
      {/* <Footer /> */}
    </>
  );
}
