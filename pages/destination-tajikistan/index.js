import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Destination_Detail } from "@/component/Sections/Page-destination-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import { supabase } from "@/utils/supabaseClient";
import { supabase as serverSupabase } from "../../lib/supabaseClient";
import React, { useEffect, useState } from "react";

const DESTINATION_NAME = "Tajikistan";
const RECOMMENDED_TOUR_LIMIT = 3;

function getStartingPrice(priceTiers = []) {
  if (!Array.isArray(priceTiers) || priceTiers.length === 0) {
    return null;
  }

  const defaultTier = priceTiers.find(
    (tier) =>
      tier?.default === true &&
      Number(tier?.price) > 0
  );

  const firstTierWithPrice = priceTiers.find(
    (tier) => Number(tier?.price) > 0
  );

  const price =
    defaultTier?.price ??
    firstTierWithPrice?.price;

  return Number(price) > 0 ? Number(price) : null;
}

function getTourCardImage(tour) {
  const firstGalleryImage =
    tour?.photos?.[0]?.images?.[0]?.image || "";

  return (
    tour?.card_image ||
    firstGalleryImage ||
    tour?.hero_image ||
    tour?.meta_image ||
    "/assets/images/tour-product-detail-img.jpg"
  );
}

function formatRecommendedTour(tour) {
  return {
    id: tour.id || tour.slug,
    slug: `/tours/${tour.slug}`,
    title: tour.title || "",
    short_des:
      tour.card_description ||
      tour.meta_description ||
      "Discover Tajikistan with Yola Rowana.",
    image: getTourCardImage(tour),
    alt:
      tour.hero_alt ||
      tour.title ||
      "Tajikistan tour",
    travel_style:
      tour.travel_style || "Private",
    duration: tour.duration || "",
    price: getStartingPrice(tour.price_tiers),
  };
}

async function fetchTajikistanTours(client) {
  const { data, error } = await client
    .from("tours")
    .select(`
      id,
      title,
      slug,
      hero_image,
      card_image,
      card_description,
      hero_alt,
      meta_image,
      meta_description,
      travel_style,
      duration,
      icon_label,
      price_tiers,
      photos,
      tour_order,
      created_at
    `)
    .eq("status", "published")
    .ilike("icon_label", `%${DESTINATION_NAME}%`)
    .order("tour_order", {
      ascending: true,
    })
    .order("created_at", {
      ascending: false,
    })
    .limit(RECOMMENDED_TOUR_LIMIT);

  if (error) {
    throw error;
  }

  return (data || []).map(formatRecommendedTour);
}

export default function Destination({
  initialRecommendedTours = [],
}) {
  const [recommendedTours, setRecommendedTours] =
    useState(initialRecommendedTours);

  const [
    recommendedToursLoading,
    setRecommendedToursLoading,
  ] = useState(
    initialRecommendedTours.length === 0
  );

  const { data: heroDestinationData } = useFetchData(
    "/json/data/hero_destination_tajikistan.json"
  );

  const { data: destinationDetailData } = useFetchData(
    "/json/data/destination_tajikistan_product.json"
  );

  const { data: seoData } = useFetchData(
    "/json/data/site_meta_link.json"
  );

  useEffect(() => {
    if (initialRecommendedTours.length > 0) {
      setRecommendedToursLoading(false);
      return;
    }

    let isMounted = true;

    const loadRecommendedTours = async () => {
      try {
        const tours =
          await fetchTajikistanTours(supabase);

        if (isMounted) {
          setRecommendedTours(tours);
        }
      } catch (error) {
        console.error(
          "Client Tajikistan recommended tours error:",
          error
        );
      } finally {
        if (isMounted) {
          setRecommendedToursLoading(false);
        }
      }
    };

    loadRecommendedTours();

    return () => {
      isMounted = false;
    };
  }, [initialRecommendedTours]);

  return (
    <>
      <Head_Meta
        meta_data={
          seoData?.destination_tajikistan_meta
        }
        comman_meta={seoData}
      />

      <Comman_Hero
        initialValues={heroDestinationData}
      />

      <All_Destination_Detail
        initialValues={destinationDetailData}
        recommendedTours={recommendedTours}
        recommendedToursLoading={
          recommendedToursLoading
        }
      />
    </>
  );
}

export async function getStaticProps() {
  let recommendedTours = [];

  try {
    recommendedTours =
      await fetchTajikistanTours(serverSupabase);
  } catch (error) {
    console.error(
      "Server Tajikistan recommended tours error:",
      error
    );
  }

  return {
    props: {
      initialRecommendedTours:
        recommendedTours,
    },
    revalidate: 3600,
  };
}