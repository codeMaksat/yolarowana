import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  Full_Video,
  Hero,
  Latest_Blog_News,
  Perfect_Travel_Planner,
  Popular_Tours,
  Start_About,
  Start_Testimonial,
  Top_Destinations,
  Travel_Confidence,
  How_It_Works,
  Why_Choose_Us,
} from "@/component/Sections/Page-one";
import { Head_Meta, useFetchData } from "@/component/comman";
import { supabase } from "@/utils/supabaseClient";
import { supabase as serverSupabase } from "../lib/supabaseClient";
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
  if (tour.card_description) return tour.card_description;

  if (tour.short_des) return tour.short_des;

  if (tour.meta_description) {
    return tour.meta_description.length > 135
      ? `${tour.meta_description.slice(0, 132)}...`
      : tour.meta_description;
  }

  const firstOverviewLabel = tour.overview?.[0]?.labels?.[0]?.label || "";

  if (firstOverviewLabel) {
    return firstOverviewLabel.length > 135
      ? `${firstOverviewLabel.slice(0, 132)}...`
      : firstOverviewLabel;
  }

  if (tour.route) {
    const routePlaces = tour.route
      .split("–")
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 4)
      .join(", ");

    return routePlaces
      ? `Explore ${routePlaces} on a private Central Asia journey.`
      : "";
  }

  return "";
}

function formatToursForHomepage(tours = []) {
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

export default function Index({ initialTours = [] }) {
  const { data: hero_data } = useFetchData("json/data/hero.json");

  const { data: top_destinations_data } = useFetchData(
    "json/data/top_destinations.json"
  );

  const { data: start_about_data } = useFetchData("json/data/start_about.json");

  const { data: popular_tours_data } = useFetchData(
    "json/data/popular_tours.json"
  );

  const { data: full_video_data } = useFetchData("json/data/full_video.json");

  const { data: perfect_travel_planner_data } = useFetchData(
    "json/data/perfect_travel_planner.json"
  );

  const { data: why_choose_us_data } = useFetchData(
    "json/data/why_choose_us.json"
  );

  const { data: start_testimonial_data } = useFetchData(
    "json/data/start_testimonial.json"
  );

  const { data: latest_blog_news_data } = useFetchData(
    "json/data/latest_blog_news.json"
  );

  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const [tours, setTours] = useState(initialTours || []);
  const [loadingTours, setLoadingTours] = useState(
    !Array.isArray(initialTours) || initialTours.length === 0
  );

  useEffect(() => {
    const initialCount = Array.isArray(initialTours) ? initialTours.length : 0;

    if (initialCount > 0) {
      setTours(initialTours);
      setLoadingTours(false);
      return;
    }

    const fetchFeaturedToursClientSide = async () => {
      setLoadingTours(true);

      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .eq("status", "published")
        .eq("is_featured", true)
        .order("home_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Client-side homepage featured tours fallback error:", error);
        setTours([]);
        setLoadingTours(false);
        return;
      }

      setTours(data || []);
      setLoadingTours(false);
    };

    fetchFeaturedToursClientSide();
  }, [initialTours]);

  const formattedTours = formatToursForHomepage(tours || []);

  const homepageTourSection =
    Array.isArray(popular_tours_data) && popular_tours_data.length > 0
      ? {
          ...popular_tours_data[0],
          product: formattedTours,
        }
      : {
          title: "Popular Tours",
          label: "Handpicked journeys across Central Asia.",
          product: formattedTours,
        };

  return (
    <>
      <Head_Meta meta_data={seo_data?.home_meta} comman_meta={seo_data} />

      <Hero initialValues={hero_data} />
      <Top_Destinations initialValues={top_destinations_data} />
      <Travel_Confidence />

      {!loadingTours && formattedTours.length > 0 && (
        <Popular_Tours initialValues={[homepageTourSection]} />
      )}

      <How_It_Works />
      <Start_About initialValues={start_about_data} />
      <Perfect_Travel_Planner initialValues={perfect_travel_planner_data} />
      <Full_Video initialValues={full_video_data} />
      {/* <Why_Choose_Us initialValues={why_choose_us_data} /> */}
      <Start_Testimonial initialValues={start_testimonial_data} />
      <Latest_Blog_News initialValues={latest_blog_news_data} />
      {/* <Footer /> */}
    </>
  );
}

export async function getServerSideProps() {
  const { data, error } = await serverSupabase
    .from("tours")
    .select("*")
    .eq("status", "published")
    .eq("is_featured", true)
    .order("home_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(6);

  if (error) {
    console.error("Server-side homepage featured tours error:", error.message);
  }

  return {
    props: {
      initialTours: data || [],
    },
  };
}