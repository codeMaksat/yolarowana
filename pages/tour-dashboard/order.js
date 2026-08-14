import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const DEFAULT_ORDER = 999;

const getNumber = (value, fallback = DEFAULT_ORDER) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const sortByTourOrder = (items = []) =>
  [...items].sort((a, b) => {
    const orderDiff = getNumber(a.tour_order) - getNumber(b.tour_order);
    if (orderDiff !== 0) return orderDiff;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

const sortByHomeOrder = (items = []) =>
  [...items].sort((a, b) => {
    const orderDiff = getNumber(a.home_order) - getNumber(b.home_order);
    if (orderDiff !== 0) return orderDiff;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

const moveItem = (items, fromIndex, toIndex) => {
  if (
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length ||
    fromIndex === toIndex
  ) {
    return items;
  }

  const next = [...items];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
};

const moveById = (items, draggedId, targetId) => {
  const fromIndex = items.findIndex(item => item.id === draggedId);
  const toIndex = items.findIndex(item => item.id === targetId);
  return moveItem(items, fromIndex, toIndex);
};

const getStatusClass = status => {
  if (status === "published") return "bg-[#E8F7EE] text-[#247A48]";
  if (status === "draft") return "bg-[#FFF3D6] text-[#9B6C00]";
  return "bg-gray-100 text-dark-800";
};

export default function TourOrderPage() {
  const router = useRouter();
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tours, setTours] = useState([]);
  const [featuredTours, setFeaturedTours] = useState([]);
  const [draggedTourId, setDraggedTourId] = useState(null);
  const [draggedFeaturedId, setDraggedFeaturedId] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/belet-admin");
        return;
      }

      setCheckingAuth(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/belet-admin");
  };

  const fetchTours = async () => {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("tours")
      .select(
        "id,title,slug,status,card_image,hero_image,is_featured,home_order,tour_order,created_at"
      );

    if (error) {
      console.error("Error fetching tours:", error);
      setMessage("Could not load tours.");
      setLoading(false);
      return;
    }

    setTours(sortByTourOrder(data || []));
    setFeaturedTours(
      sortByHomeOrder((data || []).filter(item => item.is_featured))
    );
    setDirty(false);
    setLoading(false);
  };

  useEffect(() => {
    if (!checkingAuth) fetchTours();
  }, [checkingAuth]);

  const featuredIds = useMemo(
    () => new Set(featuredTours.map(item => item.id)),
    [featuredTours]
  );

  const toggleFeatured = tour => {
    const isFeatured = featuredIds.has(tour.id);

    if (isFeatured) {
      setFeaturedTours(prev => prev.filter(item => item.id !== tour.id));
    } else {
      setFeaturedTours(prev => [...prev, { ...tour, is_featured: true }]);
    }

    setTours(prev =>
      prev.map(item =>
        item.id === tour.id ? { ...item, is_featured: !isFeatured } : item
      )
    );

    setDirty(true);
    setMessage("");
  };

  const moveTour = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= tours.length) return;
    setTours(prev => moveItem(prev, index, targetIndex));
    setDirty(true);
    setMessage("");
  };

  const moveFeatured = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= featuredTours.length) return;
    setFeaturedTours(prev => moveItem(prev, index, targetIndex));
    setDirty(true);
    setMessage("");
  };

  const handleTourDrop = targetId => {
    if (!draggedTourId || draggedTourId === targetId) return;
    setTours(prev => moveById(prev, draggedTourId, targetId));
    setDraggedTourId(null);
    setDirty(true);
    setMessage("");
  };

  const handleFeaturedDrop = targetId => {
    if (!draggedFeaturedId || draggedFeaturedId === targetId) return;
    setFeaturedTours(prev => moveById(prev, draggedFeaturedId, targetId));
    setDraggedFeaturedId(null);
    setDirty(true);
    setMessage("");
  };

  const saveChanges = async () => {
    if (saving) return;

    setSaving(true);
    setMessage("");

    const tourOrderMap = new Map(
      tours.map((tour, index) => [tour.id, index + 1])
    );

    const homeOrderMap = new Map(
      featuredTours.map((tour, index) => [tour.id, index + 1])
    );

    const results = await Promise.all(
      tours.map(tour =>
        supabase
          .from("tours")
          .update({
            tour_order: tourOrderMap.get(tour.id),
            is_featured: homeOrderMap.has(tour.id),
            home_order: homeOrderMap.get(tour.id) ?? DEFAULT_ORDER,
          })
          .eq("id", tour.id)
      )
    );

    const firstError = results.find(result => result.error)?.error;

    if (firstError) {
      console.error("Could not save tour order:", firstError);
      setMessage(`Could not save changes: ${firstError.message || "Unknown error"}`);
      setSaving(false);
      return;
    }

    setTours(prev =>
      prev.map((tour, index) => ({
        ...tour,
        tour_order: index + 1,
        is_featured: homeOrderMap.has(tour.id),
        home_order: homeOrderMap.get(tour.id) ?? DEFAULT_ORDER,
      }))
    );

    setFeaturedTours(prev =>
      prev.map((tour, index) => ({
        ...tour,
        is_featured: true,
        home_order: index + 1,
      }))
    );

    setDirty(false);
    setMessage("Tour display order saved successfully.");
    setSaving(false);
  };

  if (checkingAuth) {
    return (
      <div className="py-20 text-center">
        <p>Checking access...</p>
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

                <li>
                  <Link href="/tour-dashboard">
                    <span>
                      <img src="/assets/images/hiking-icon-1.svg" alt="tours" />
                    </span>
                    Tours
                  </Link>
                </li>

                <li className="active">
                  <Link href="/tour-dashboard/order">
                    <span>
                      <img src="/assets/images/data-blob.svg" alt="tour order" />
                    </span>
                    Tour Order
                  </Link>
                </li>

                <li>
                  <Link href="/tour-dashboard/travel-mates">
                    <span>
                      <img src="/assets/images/group-user-icon.svg" alt="travel mates" />
                    </span>
                    Travel Mates
                  </Link>
                </li>

                <li>
                  <Link href="/contact">
                    <span>
                      <img src="/assets/images/data-blob.svg" alt="contact" />
                    </span>
                    Contact page
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
                  <h1 className="text-xl md:text-25 mb-2">Tour Display Order</h1>
                  <p className="mb-0 max-w-[850px]">
                    Drag tours into the order you want. The system automatically
                    saves unique tour and homepage order numbers.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={fetchTours}
                    disabled={loading || saving}
                    className="rounded-full border border-[#E2CFAF] bg-white px-5 py-2.5 text-sm font-medium text-dark-900 disabled:opacity-50"
                  >
                    Refresh
                  </button>

                  <button
                    type="button"
                    onClick={saveChanges}
                    disabled={!dirty || saving || loading}
                    className="btn btn-primary rounded-full px-6 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Order"}
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className={`mb-6 rounded-xl border px-5 py-4 text-sm ${
                    message.startsWith("Could not")
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-green-200 bg-green-50 text-green-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {dirty && !message && (
                <div className="mb-6 rounded-xl border border-[#E2CFAF] bg-[#FFF9EC] px-5 py-4 text-sm text-dark-800">
                  You have unsaved ordering changes.
                </div>
              )}

              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6">
                <section className="shadow-box-3 rounded-xl bg-white p-5 md:p-6">
                  <div className="mb-5">
                    <h2 className="text-xl mb-1">Tours Page Order</h2>
                    <p className="mb-0 text-sm text-dark-800">
                      Controls the order on the main Tours page.
                    </p>
                  </div>

                  {loading ? (
                    <div className="py-12 text-center">Loading tours...</div>
                  ) : (
                    <div className="space-y-3">
                      {tours.map((tour, index) => {
                        const isFeatured = featuredIds.has(tour.id);

                        return (
                          <div
                            key={tour.id}
                            draggable
                            onDragStart={() => setDraggedTourId(tour.id)}
                            onDragOver={event => event.preventDefault()}
                            onDrop={() => handleTourDrop(tour.id)}
                            onDragEnd={() => setDraggedTourId(null)}
                            className={`rounded-xl border bg-white p-3 md:p-4 transition ${
                              draggedTourId === tour.id
                                ? "border-primary-900 opacity-50"
                                : "border-[#E7DDD0]"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="shrink-0 cursor-grab select-none rounded-lg bg-[#F4EEE5] px-3 py-2 text-lg font-bold text-dark-800">
                                ☰
                              </div>

                              <div className="w-10 shrink-0 text-center">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#071B1A] text-sm font-bold text-white">
                                  {index + 1}
                                </span>
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-dark-900">
                                  {tour.title || "Untitled tour"}
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                                  <span className={`${getStatusClass(tour.status)} rounded-full px-2.5 py-1 capitalize`}>
                                    {tour.status || "unknown"}
                                  </span>
                                  <span className="text-dark-800/70">
                                    /tours/{tour.slug}
                                  </span>
                                </div>
                              </div>

                              <div className="shrink-0">
                                <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-dark-900">
                                  <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={() => toggleFeatured(tour)}
                                    className="h-4 w-4"
                                  />
                                  Featured
                                </label>
                              </div>

                              <div className="flex shrink-0 gap-1">
                                <button
                                  type="button"
                                  onClick={() => moveTour(index, -1)}
                                  disabled={index === 0}
                                  className="rounded-lg border border-[#E2CFAF] px-2.5 py-1.5 text-sm disabled:opacity-30"
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  onClick={() => moveTour(index, 1)}
                                  disabled={index === tours.length - 1}
                                  className="rounded-lg border border-[#E2CFAF] px-2.5 py-1.5 text-sm disabled:opacity-30"
                                >
                                  ↓
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </section>

                <section className="shadow-box-3 rounded-xl bg-white p-5 md:p-6">
                  <div className="mb-5">
                    <h2 className="text-xl mb-1">Homepage Featured Tours</h2>
                    <p className="mb-0 text-sm text-dark-800">
                      Only tours marked Featured appear here.
                    </p>
                  </div>

                  {!loading && featuredTours.length === 0 && (
                    <div className="rounded-xl border border-dashed border-[#E2CFAF] bg-[#FAF7F2] px-5 py-10 text-center text-sm text-dark-800">
                      No featured tours selected.
                    </div>
                  )}

                  <div className="space-y-3">
                    {featuredTours.map((tour, index) => (
                      <div
                        key={tour.id}
                        draggable
                        onDragStart={() => setDraggedFeaturedId(tour.id)}
                        onDragOver={event => event.preventDefault()}
                        onDrop={() => handleFeaturedDrop(tour.id)}
                        onDragEnd={() => setDraggedFeaturedId(null)}
                        className={`rounded-xl border bg-white p-3 md:p-4 transition ${
                          draggedFeaturedId === tour.id
                            ? "border-primary-900 opacity-50"
                            : "border-[#E7DDD0]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="shrink-0 cursor-grab select-none rounded-lg bg-[#F4EEE5] px-3 py-2 text-lg font-bold text-dark-800">
                            ☰
                          </div>

                          <div className="w-10 shrink-0 text-center">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-900 text-sm font-bold text-white">
                              {index + 1}
                            </span>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-dark-900">
                              {tour.title || "Untitled tour"}
                            </div>
                            <span className={`${getStatusClass(tour.status)} mt-1 inline-block rounded-full px-2.5 py-1 text-xs capitalize`}>
                              {tour.status || "unknown"}
                            </span>
                          </div>

                          <div className="flex shrink-0 gap-1">
                            <button
                              type="button"
                              onClick={() => moveFeatured(index, -1)}
                              disabled={index === 0}
                              className="rounded-lg border border-[#E2CFAF] px-2.5 py-1.5 text-sm disabled:opacity-30"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveFeatured(index, 1)}
                              disabled={index === featuredTours.length - 1}
                              className="rounded-lg border border-[#E2CFAF] px-2.5 py-1.5 text-sm disabled:opacity-30"
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl bg-[#FAF7F2] px-4 py-3 text-xs leading-5 text-dark-800">
                    Saving sets homepage positions to 1, 2, 3... for featured
                    tours. Non-featured tours are set to home_order 999.
                  </div>
                </section>
              </div>

              <div className="mt-6 rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] px-5 py-4">
                <p className="mb-0 text-sm text-dark-800">
                  This page changes only <strong>tour_order</strong>,{" "}
                  <strong>is_featured</strong> and{" "}
                  <strong>home_order</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
