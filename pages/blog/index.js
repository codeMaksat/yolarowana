import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { All_Blog } from "@/component/Sections/Page-blog";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
export default function Blog() {
  const { data: hero_blog_data } = useFetchData("json/data/hero_blog.json");

  const { data: blog_product_data } = useFetchData(
    "json/data/blog_product.json"
  );

  const { data: side_bar_data } = useFetchData("json/data/side_bar.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.blog_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_blog_data} />
      <All_Blog
        initialValues={blog_product_data}
        side_bar_data={side_bar_data}
      />
    </>
  );
}
