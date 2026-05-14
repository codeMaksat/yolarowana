import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Testimonial } from "@/component/Sections/Page-testimonial";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Contact() {
  const { data: hero_testimonial_data } = useFetchData(
    "json/data/hero_testimonial.json"
  );

  const { data: testimonial_product_data } = useFetchData(
    "json/data/testimonial_product.json"
  );

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.testimonial_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_testimonial_data} />
      <All_Testimonial initialValues={testimonial_product_data} />
    </>
  );
}
