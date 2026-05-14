import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  Adventure_Activity,
  Customer_Reviews,
  Hero,
  Icon_Box,
  Icon_Grid,
  Latest_Blog_News,
  Member_Yet,
  Popular_Tours,
  Special_Offers,
  Start_About,
  Top_Destinations,
} from "@/component/Sections/Page-two";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Tour() {
  const { data: hero_two_data } = useFetchData("json/data/hero_two.json");

  const { data: icon_box_two_data } = useFetchData(
    "json/data/icon_box_two.json"
  );

  const { data: about_two_data } = useFetchData("json/data/about_two.json");

  const { data: special_offers_two_data } = useFetchData(
    "json/data/special_offers_two.json"
  );

  const { data: adventure_activity_two_data } = useFetchData(
    "json/data/adventure_activity_two.json"
  );

  const { data: top_destinations_two_data } = useFetchData(
    "json/data/top_destinations_two.json"
  );

  const { data: icon_grid_two_data } = useFetchData(
    "json/data/icon_grid_two.json"
  );

  const { data: popular_tours_two_data } = useFetchData(
    "json/data/popular_tours_two.json"
  );

  const { data: customer_reviews_two_data } = useFetchData(
    "json/data/customer_reviews_two.json"
  );

  const { data: latest_blog_news_two_data } = useFetchData(
    "json/data/latest_blog_news_two.json"
  );

  const { data: member_yet_two_data } = useFetchData(
    "json/data/member_yet_two.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.home_meta} comman_meta={seo_data} />
      <Hero initialValues={hero_two_data} />
      <Icon_Box initialValues={icon_box_two_data} />
      <Start_About initialValues={about_two_data} />
      <Special_Offers initialValues={special_offers_two_data} />
      <Adventure_Activity initialValues={adventure_activity_two_data} />
      <Top_Destinations initialValues={top_destinations_two_data} />
      <Icon_Grid initialValues={icon_grid_two_data} />
      <Popular_Tours initialValues={popular_tours_two_data} />
      <Customer_Reviews initialValues={customer_reviews_two_data} />
      <Latest_Blog_News initialValues={latest_blog_news_two_data} />
      <Member_Yet initialValues={member_yet_two_data} />
    </>
  );
}
