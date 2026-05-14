import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  Hero,
  Trending_Attractions,
  Start_About,
  Choose_Tour_Types,
  Top_Destinations,
  Popular_Tours,
  Why_Choose,
  Customer_Reviews,
  Icon_Grid,
  Latest_Blog_News,
  Member_Yet,
} from "@/component/Sections/Page-three";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_three_data } = useFetchData("json/data/hero_three.json");

  const { data: trending_attractions_three_data } = useFetchData(
    "json/data/trending_attractions_three.json"
  );

  const { data: about_three_data } = useFetchData("json/data/about_three.json");

  const { data: choose_tour_types_three_data } = useFetchData(
    "json/data/choose_tour_types_three.json"
  );

  const { data: popular_tours_three_data } = useFetchData(
    "json/data/popular_tours_three.json"
  );

  const { data: top_destinations_three_data } = useFetchData(
    "json/data/top_destinations_three.json"
  );

  const { data: why_choose_two_data } = useFetchData(
    "json/data/why_choose_two.json"
  );

  const { data: customer_reviews_three_data } = useFetchData(
    "json/data/customer_reviews_three.json"
  );

  const { data: latest_blog_news_three_data } = useFetchData(
    "json/data/latest_blog_news_three.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.home_meta} comman_meta={seo_data} />
      <Hero initialValues={hero_three_data} />
      <Trending_Attractions initialValues={trending_attractions_three_data} />
      <Start_About initialValues={about_three_data} />
      <Choose_Tour_Types initialValues={choose_tour_types_three_data} />
      <Popular_Tours initialValues={popular_tours_three_data} />
      <Top_Destinations initialValues={top_destinations_three_data} />
      <Why_Choose initialValues={why_choose_two_data} />
      <Customer_Reviews initialValues={customer_reviews_three_data} />
      <Latest_Blog_News initialValues={latest_blog_news_three_data} />
    </>
  );
}
