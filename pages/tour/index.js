import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour } from "@/component/Sections/Page-tour";
import { Head_Meta, useFetchData } from "@/component/comman";
import { getPublishedTours } from "../../lib/getPublishedTours";
import React from "react";

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
  return match ? match[0] : "";
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

function formatToursForOldCards(tours = []) {
  return tours.map((tour) => {
    const image = getCardImage(tour);
    const price = getStartingPrice(tour.price_tiers);
    const days = getDays(tour.duration);
    const tourUrl = `/tours/${tour.slug}`;

    return {
      ...tour,

      // Image fields for old card component
      image,
      img: image,
      photo: image,
      thumbnail: image,
      card_image: image,
      banner_image: image,
      tour_image: image,
      product_image: image,

      // Link fields for old card component
      slug: tour.slug,
      url: tourUrl,
      link: tourUrl,
      path: tourUrl,
      href: tourUrl,
      btn_url: tourUrl,

      // Title fields
      title: tour.title,
      name: tour.title,

      // Duration fields
      days,
      day: days,
      duration: tour.duration,
      tour_days: days,

      // Price fields
      price,
      tour_price: price,
      starting_price: price,
      start_price: price,

      // Location / route fields
      location: tour.icon_label || tour.route || "",
      country: tour.icon_label || "",
      route: tour.route || "",
      destination: tour.icon_label || "",

      // Extra fields
      travel_style: tour.travel_style || "",
      support_label: tour.support_label || "",
    };
  });
}

export default function Tour({ tours }) {
  const { data: hero_tour_data } = useFetchData("json/data/hero_tour.json");

  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const formattedTours = formatToursForOldCards(tours || []);

  return (
    <>
      <Head_Meta meta_data={seo_data.tour_meta} comman_meta={seo_data} />
      <Comman_Hero initialValues={hero_tour_data} />

      <All_Tour initialValues={[{ product: formattedTours }]} />
    </>
  );
}

export async function getStaticProps() {
  const tours = await getPublishedTours();

  return {
    props: {
      tours: tours || [],
    },
    revalidate: 60,
  };
}