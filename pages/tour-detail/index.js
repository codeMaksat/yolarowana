import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail } from "@/component/Sections/Page-tour-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function DynamicTourPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [tourData, setTourData] = useState([]);
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  useEffect(() => {
    if (!slug) return;

    const fetchTour = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) {
        console.error("Error fetching tour:", error);
        setTourData([]);
        setHeroData([]);
        setLoading(false);
        return;
      }

      const formattedHeroData = [
        {
          title: data.title,
          image: data.hero_image,
          alt: data.hero_alt || data.title,
          home_label: "Home",
          home_slug: "/",
        },
      ];

      const formattedTourData = [
        {
          title: data.title,
          icon: data.icon,
          icon_label: data.icon_label,
          image: data.hero_image,
          alt: data.hero_alt || data.title,

          detail: [
            {
              title: data.title,
              rating: 5,
              review: 24,
              service: data.services || [],
              overview: data.overview || [],
              included: data.included || [],
              not_included: data.not_included || [],
            },
          ],

          photo: data.photos || [],
          itinerary: data.itinerary || [],
          map: data.map || [],
          faq: data.faq || [],

          side_bar: [
            {
              title: "Plan This Tour",
              tour_name: data.title,
              total_title: "Estimated From",
              price_tiers: data.price_tiers || [],
              price_note: data.price_note,
              product: data.related_tours || [],
            },
          ],

          reviews: data.reviews || [],
        },
      ];

      setHeroData(formattedHeroData);
      setTourData(formattedTourData);
      setLoading(false);
    };

    fetchTour();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p>Loading tour...</p>
      </div>
    );
  }

  if (!tourData.length) {
    return (
      <div className="py-20 text-center">
        <h2>Tour not found</h2>
        <p>This tour is not available at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <Head_Meta
        meta_data={seo_data?.tour_five_stans_meta}
        comman_meta={seo_data}
      />

      <Comman_Hero initialValues={heroData} />
      <All_Tour_Detail initialValues={tourData} />
    </>
  );
}