import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Blog_Detail } from "@/component/Sections/Page-blog-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";
import Related_Products from "@/component/comman/related_products";

export default function Destination() {
  const { data: hero_hotels_detail_data } = useFetchData(
    "json/data/hero_blog_detail.json"
  );

  const { data: hotels_detail_product_data } = useFetchData(
    "json/data/blog_detail_product.json"
  );

  const { data: side_bar_data } = useFetchData("json/data/side_bar.json");
  const { data: reviews_data } = useFetchData("json/data/reviews.json");
  const { data: related_product_data } = useFetchData(
    "json/data/related_product.json"
  );


  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.blog_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_hotels_detail_data} />
      <All_Blog_Detail
        initialValues={hotels_detail_product_data}
        side_bar_data={side_bar_data}
        orders={2}
      />
      <Related_Products
        reviews_data={reviews_data}
        products={related_product_data}
      />
    </>
  );
}
