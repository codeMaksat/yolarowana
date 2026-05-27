import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Blog_Guide } from "@/component/Sections/Page-blog-guide";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function SilkRoadTravelGuide() {
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const { data: guide_data } = useFetchData(
    "json/data/blog_silk_road_travel_guide.json"
  );

  return (
    <>
      <Head_Meta
        meta_data={seo_data.blog_silk_road_travel_guide_meta}
        comman_meta={seo_data}
      />

      {guide_data &&
        guide_data.map((data, index) => {
          return (
            <React.Fragment key={index}>
              <Comman_Hero initialValues={data.hero} />
              <All_Blog_Guide initialValues={[data]} />
            </React.Fragment>
          );
        })}
    </>
  );
}