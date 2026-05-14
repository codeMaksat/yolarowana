import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Portfolio } from "@/component/Sections/Page-portfolio";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Contact() {
  const { data: hero_portfolio_data } = useFetchData(
    "json/data/hero_portfolio.json"
  );

  const { data: portfolio_product_data } = useFetchData(
    "json/data/portfolio_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.portfolio_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_portfolio_data} />
      <All_Portfolio initialValues={portfolio_product_data} />
    </>
  );
}
