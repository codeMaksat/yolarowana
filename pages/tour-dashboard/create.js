import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function CreateTourPage() {
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [saving, setSaving] = useState(false);

  const [tour, setTour] = useState({
    title: "",
    slug: "",
    duration: "",
    travel_style: "",
    route: "",
    status: "draft",
  });

  const inputClass =
    "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const selectClass =
    "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/yola-admin");
        return;
      }

      setCheckingAuth(false);
    };

    checkUser();
  }, [router]);

  const createSlug = value => {
    return value
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setTour(prevTour => {
      const updatedTour = {
        ...prevTour,
        [name]: value,
      };

      if (name === "title") {
        updatedTour.slug = createSlug(value);
      }

      return updatedTour;
    });
  };

  const handleSave = async event => {
    event.preventDefault();

    if (!tour.title.trim()) {
      alert("Tour title is required.");
      return;
    }

    if (!tour.slug.trim()) {
      alert("Slug is required.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("tours")
      .insert([
        {
          title: tour.title,
          slug: tour.slug,
          duration: tour.duration,
          travel_style: tour.travel_style,
          route: tour.route,

          hero_image: "/assets/images/tour-product-detail-img.jpg",
          hero_alt: tour.title,

          icon: "fa-solid fa-location-dot",
          icon_label: tour.route || tour.title,
          support_label: "Route planning & local guidance",

          price_note:
            "Price is estimated per person and may vary by group size, hotel level, season and route arrangements.",

          meta_title: tour.title,
          meta_description: "",
          meta_image: "/assets/images/tour-product-detail-img.jpg",

          services: [
            {
              image: "/assets/images/clock-icon.svg",
              alt: "clock-icon",
              width: 20,
              title: "Duration:",
              label: tour.duration || "Custom",
            },
            {
              image: "/assets/images/group-user-icon.svg",
              alt: "group-user-icon",
              width: 22,
              title: "Travel style:",
              label: tour.travel_style || "Private / Small group",
            },
            {
              image: "/assets/images/train-icon.svg",
              alt: "route-icon",
              width: 24,
              title: "Route:",
              label: tour.route || "Custom route",
            },
            {
              image: "/assets/images/cross_duotone-icon.svg",
              alt: "support-icon",
              width: 24,
              title: "Support:",
              label: "Route planning & local guidance",
            },
          ],

          overview: [
            {
              title: "Overview",
              labels: [
                {
                  label:
                    "Add the main tour overview here. This text can be edited from the tour dashboard.",
                },
              ],
            },
          ],

          itinerary: [
            {
              title: "Itinerary",
              details: [
                {
                  day: 1,
                  title: "Day 1",
                  content: "Add day description here.",
                },
              ],
            },
          ],

          included: [
            {
              title: "What's Included",
              details: [
                {
                  label: "Add included service here",
                },
              ],
            },
          ],

          not_included: [
            {
              title: "What's Not Included",
              details: [
                {
                  label: "Add excluded service here",
                },
              ],
            },
          ],

          faq: [
            {
              title: "FAQ",
              question: [
                {
                  question: "Can this tour be customized?",
                  answer:
                    "Yes. The route can be adjusted based on travel dates, hotel level and preferred pace.",
                },
              ],
            },
          ],

          photos: [
            {
              title: "Photos",
              images: [
                {
                  image: "/assets/images/tour-product-detail-img.jpg",
                  alt: tour.title,
                },
              ],
            },
          ],

          price_tiers: [
            {
              travelers: "1 traveler",
              price: null,
              default: true,
            },
          ],

          related_tours: [],

          reviews: [],

          status: tour.status,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating tour:", error);

      if (error.message?.includes("duplicate key")) {
        alert("This slug already exists. Please use a different slug.");
      } else {
        alert("Could not create tour. Please try again.");
      }

      setSaving(false);
      return;
    }

    setSaving(false);

    router.push(`/tour-dashboard/edit/${data.slug}`);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/yola-admin");
  };

  if (checkingAuth) {
    return (
      <div className="py-20 text-center">
        <p>Loading create tour page...</p>
      </div>
    );
  }

  return (
    <>
      <Head_Meta meta_data={seo_data?.contact_meta} comman_meta={seo_data} />

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="md:flex">
            <div className="md:max-w-[220px] w-full shrink-0 py-6 md:py-10 px-4 md:px-5 bg-white">
              <ul className="dashboard-list">
                <li>
                  <Link href="/booking-dashboard">
                    <span>
                      <img src="/assets/images/dashboard.svg" alt="dashboard" />
                    </span>
                    Inquiries
                  </Link>
                </li>

                <li className="active">
                  <Link href="/tour-dashboard">
                    <span>
                      <img src="/assets/images/hiking-icon-1.svg" alt="tours" />
                    </span>
                    Tours
                  </Link>
                </li>

                <li>
                  <Link href="/">
                    <span>
                      <img src="/assets/images/logout.svg" alt="home" />
                    </span>
                    Back to website
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3"
                  >
                    <span>
                      <img src="/assets/images/logout.svg" alt="logout" />
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-220px)]">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-25 mb-2">Create New Tour</h2>
                  <p className="mb-0">
                    Create a draft tour first, then edit the full content.
                  </p>
                </div>

                <Link
                  href="/tour-dashboard"
                  className="btn btn-primary rounded-full px-6"
                >
                  Back to Tours
                </Link>
              </div>

              <form
                onSubmit={handleSave}
                className="shadow-box-3 rounded-xl py-6 px-5 bg-white"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Tour title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={tour.title}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Uzbekistan Silk Road Classic"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={tour.slug}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="uzbekistan-silk-road-classic"
                    />
                    <p className="mt-2 mb-0 text-xs text-dark-800">
                      Public URL will be /tours/{tour.slug || "your-tour-slug"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={tour.duration}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="8 Days"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Travel style
                    </label>
                    <input
                      type="text"
                      name="travel_style"
                      value={tour.travel_style}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Private / Small group"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Route
                    </label>
                    <input
                      type="text"
                      name="route"
                      value={tour.route}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Tashkent – Samarkand – Bukhara – Khiva"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                      Status
                    </label>
                    <select
                      name="status"
                      value={tour.status}
                      onChange={handleChange}
                      className={selectClass}
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="btn btn-primary rounded-full px-8"
                  >
                    {saving ? "Creating..." : "Create Tour"}
                  </button>

                  <Link
                    href="/tour-dashboard"
                    className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-8 py-3 text-sm font-semibold text-dark-900 hover:border-primary-900"
                  >
                    Cancel
                  </Link>
                </div>
              </form>

              <div className="mt-6 bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl px-5 py-4">
                <p className="mb-0 text-sm text-dark-800">
                  New tours are created with starter content. After creation,
                  you will be redirected to the full edit page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}