import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Blog_Guide } from "@/component/Sections/Page-blog-guide";
import { Head_Meta, useFetchData } from "@/component/comman";
import React from "react";

export default function HowToPlanFiveStansTour() {
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const { data: guide_data } = useFetchData(
    "json/data/blog_how_to_plan_five_stans_tour.json"
  );

  return (
    <>
      <Head_Meta
        meta_data={seo_data.blog_how_to_plan_five_stans_tour_meta}
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