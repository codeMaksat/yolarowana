import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour } from "@/component/Sections/Page-tour";
import { Head_Meta, useFetchData } from "@/component/comman";
import { supabase } from "@/utils/supabaseClient";
import { getPublishedTours } from "../../lib/getPublishedTours";
import React, { useEffect, useState } from "react";

function getStartingPrice(priceTiers = []) {
  if (!Array.isArray(priceTiers) || priceTiers.length === 0) return "";

  const defaultTier = priceTiers.find(
    (tier) => tier.default === true && tier.price
  );

  const firstTierWithPrice = priceTiers.find((tier) => tier.price);

  return defaultTier?.price || firstTierWithPrice?.price || "";
}

function getDays(duration = "") {
  const match = String(duration).match(/\d+/);
  return match ? Number(match[0]) : "";
}

function getCardImage(tour) {
  const firstGalleryImage = tour?.photos?.[0]?.images?.[0]?.image || "";

  return (
    tour.card_image ||
    firstGalleryImage ||
    tour.hero_image ||
    tour.meta_image ||
    "/assets/images/blog-img1.jpg"
  );
}

function makeShortDescription(tour) {
  if (tour.short_des) return tour.short_des;

  if (tour.support_label) return tour.support_label;

  if (tour.route) {
    const routePlaces = tour.route
      .split("–")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5)
      .join(", ");

    return routePlaces ? `${routePlaces}.` : "";
  }

  const firstOverviewLabel =
    tour.overview?.[0]?.labels?.[0]?.label || tour.meta_description || "";

  if (firstOverviewLabel.length > 120) {
    return `${firstOverviewLabel.slice(0, 117)}...`;
  }

  return firstOverviewLabel;
}

function formatToursForOldCards(tours = []) {
  return tours.map((tour, index) => {
    const image = getCardImage(tour);
    const price = getStartingPrice(tour.price_tiers);
    const day = getDays(tour.duration);
    const tourUrl = `/tours/${tour.slug}`;

    return {
      ...tour,

      id: tour.id || index + 1,
      slug: tourUrl,
      title: tour.title || "",
      short_des: makeShortDescription(tour),
      description: tour.description || "",
      image,
      alt: tour.hero_alt || tour.title || "",
      date: tour.travel_style || "Private",
      day,
      rating: tour.rating || "4.9",
      price,
      old_price: tour.old_price || 0,

      img: image,
      photo: image,
      thumbnail: image,
      card_image: image,
      banner_image: image,
      tour_image: image,
      product_image: image,

      url: tourUrl,
      link: tourUrl,
      path: tourUrl,
      href: tourUrl,
      btn_url: tourUrl,

      days: day,
      tour_days: day,

      tour_price: price,
      starting_price: price,
      start_price: price,

      location: tour.icon_label || tour.route || "",
      country: tour.icon_label || "",
      route: tour.route || "",
      destination: tour.icon_label || "",
      travel_style: tour.travel_style || "",
      support_label: tour.support_label || "",
    };
  });
}

export default function Tour({ initialTours = [] }) {
  const { data: hero_tour_data } = useFetchData("json/data/hero_tour.json");
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const [tours, setTours] = useState(initialTours || []);
  const [loadingTours, setLoadingTours] = useState(
    !initialTours || initialTours.length === 0
  );

  useEffect(() => {
    console.log("CLIENT: browser fallback running");
    if (initialTours && initialTours.length > 0) {
      return;
    }

    const fetchPublishedToursClientSide = async () => {
      setLoadingTours(true);

      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Client-side tour fallback error:", error);
        setTours([]);
        setLoadingTours(false);
        return;
      }

      setTours(data || []);
      setLoadingTours(false);
    };

    fetchPublishedToursClientSide();
  }, [initialTours]);

  const formattedTours = formatToursForOldCards(tours || []);

  return (
    <>
      <Head_Meta meta_data={seo_data?.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_data} />

      {loadingTours ? (
        <div className="py-20 text-center">
          <p>Loading tours...</p>
        </div>
      ) : (
        <All_Tour initialValues={[{ product: formattedTours }]} />
      )}
    </>
  );
}

export async function getStaticProps() {
  console.log("SERVER: loading tours for SEO");
  const tours = await getPublishedTours();

  return {
    props: {
      initialTours: tours || [],
    },
    revalidate: 60,
  };
}