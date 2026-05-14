import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
import Related_Products from "@/component/comman/related_products";
import { All_Standard_Blog } from "@/component/Sections/Page-standard-blog";

export default function Destination() {
  const { data: hero_hotels_detail_data } = useFetchData(
    "json/data/hero_standard_blog.json"
  );

  const { data: blog_standard_product_data } = useFetchData(
    "json/data/blog_standard_product.json"
  );

  const { data: side_bar_data } = useFetchData("json/data/side_bar.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.blog_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_hotels_detail_data} />
      <All_Standard_Blog
        initialValues={blog_standard_product_data}
        side_bar_data={side_bar_data}
        orders={2}
      />
    </>
  );
}
