import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const inputClass =
  "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

const selectClass =
  "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

const textareaClass =
  "w-full rounded-2xl border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-none";

export default function TravelMateRequestPage() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    country: "",
    email: "",
    whatsapp: "",
    tour_option: "",
    tour_slug: "",
    tour_title: "",
    destination: "",
    tour_start_place: "",
    tour_end_place: "",
    tour_duration: "",
    travel_start_date: "",
    travel_end_date: "",
    travelers_count: "1",
    looking_for_count: "1",
    public_message: "",
    consent_to_publish: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      const { data, error } = await supabase
        .from("tours")
        .select("title,slug,icon_label,duration,route,status")
        .eq("status", "published")
        .order("tour_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Tours fetch error:", error);
        setTours([]);
        return;
      }

      setTours(data || []);
    };

    fetchTours();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTourChange = (event) => {
    const selectedSlug = event.target.value;
    const selectedTour = tours.find((tour) => tour.slug === selectedSlug);

    if (!selectedSlug) {
      setForm((prev) => ({
        ...prev,
        tour_option: "",
        tour_slug: "",
        tour_title: "",
        destination: "",
        tour_start_place: "",
        tour_end_place: "",
        tour_duration: "",
      }));
      return;
    }

    if (selectedSlug === "custom") {
      setForm((prev) => ({
        ...prev,
        tour_option: "custom",
        tour_slug: "",
        tour_title: "",
        destination: "",
        tour_start_place: "",
        tour_end_place: "",
        tour_duration: "",
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      tour_option: selectedSlug,
      tour_slug: selectedTour?.slug || "",
      tour_title: selectedTour?.title || "",
      destination: selectedTour?.icon_label || "",
      tour_start_place: "",
      tour_end_place: "",
      tour_duration: selectedTour?.duration || "",
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!form.first_name.trim()) validationErrors.first_name = "First name is required.";

    if (!form.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    const isCustomTour = form.tour_option === "custom" || (!form.tour_slug && form.tour_title.trim() !== "");

    if (!form.tour_title.trim()) validationErrors.tour_title = "Tour name or route is required.";
    if (isCustomTour && !form.tour_start_place.trim()) validationErrors.tour_start_place = "Starting place is required for custom tours.";
    if (isCustomTour && !form.tour_end_place.trim()) validationErrors.tour_end_place = "Ending place is required for custom tours.";
    if (isCustomTour && !form.tour_duration.trim()) validationErrors.tour_duration = "Duration is required for custom tours.";
    if (!form.travel_start_date) validationErrors.travel_start_date = "Start date is required.";
    if (!form.public_message.trim()) validationErrors.public_message = "Public message is required.";

    if (!form.consent_to_publish) {
      validationErrors.consent_to_publish =
        "Please confirm that we may publish your public request.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.from("travel_mate_requests").insert([
      {
        status: "pending",
        is_published: false,
        first_name: form.first_name.trim(),
        country: form.country.trim() || null,
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim() || null,
        tour_slug: form.tour_slug || null,
        tour_title: form.tour_title.trim(),
        destination: form.destination.trim() || null,
        tour_start_place: form.tour_start_place.trim() || null,
        tour_end_place: form.tour_end_place.trim() || null,
        tour_duration: form.tour_duration.trim() || null,
        travel_start_date: form.travel_start_date || null,
        travel_end_date: form.travel_end_date || null,
        travelers_count: Number(form.travelers_count) || 1,
        looking_for_count: Number(form.looking_for_count) || 1,
        public_message: form.public_message.trim(),
        consent_to_publish: form.consent_to_publish,
      },
    ]);

    if (error) {
      console.error("Travel mate request insert error:", error);
      setErrors({ form: "Something went wrong while submitting your request. Please try again." });
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(
      "Thank you. Your travel mate request has been sent for review. It will appear on the website after Belet Travel approves it."
    );

    setForm({
      first_name: "",
      country: "",
      email: "",
      whatsapp: "",
      tour_option: "",
      tour_slug: "",
      tour_title: "",
      destination: "",
      tour_start_place: "",
      tour_end_place: "",
      tour_duration: "",
      travel_start_date: "",
      travel_end_date: "",
      travelers_count: "1",
      looking_for_count: "1",
      public_message: "",
      consent_to_publish: false,
    });

    setIsSubmitting(false);
  };

  const isCustomTour = form.tour_option === "custom" || (!form.tour_slug && form.tour_title.trim() !== "");

  return (
    <>
      <Head>
        <title>Post a Travel Mate Request | Belet Travel</title>
        <meta
          name="description"
          content="Submit a moderated travel mate request for a Central Asia tour with Belet Travel."
        />
      </Head>

      <section className="py-12 md:py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="max-w-3xl">
            <Link
              href="/travel-mates"
              className="inline-flex items-center gap-2 text-primary-900 font-semibold mb-5"
            >
              <i className="fa-regular fa-arrow-left"></i>
              Back to Travel Mate Board
            </Link>

            <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
              Request Review
            </span>

            <h1 className="mb-5">Post a Travel Mate Request</h1>

            <p className="text-lg leading-8 text-dark-800 mb-0">
              Share your planned tour, travel dates and a short message. We will
              review your request before publishing it. Your email and WhatsApp
              will not appear publicly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 lg:py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl bg-[#FAF7F2] border border-[#E2CFAF] p-5 md:p-7"
            >
              {errors.form && (
                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
                  {errors.form}
                </div>
              )}

              {successMessage && (
                <div className="mb-5 rounded-2xl border border-[#B9D4C2] bg-[#E8F3EC] px-4 py-3 text-primary-900 text-sm font-semibold">
                  {successMessage}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="John"
                  />
                  {errors.first_name && <span className="text-red-800 text-sm">{errors.first_name}</span>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="New Zealand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="name@email.com"
                  />
                  {errors.email && <span className="text-red-800 text-sm">{errors.email}</span>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    WhatsApp / phone
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="+..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Select existing tour
                  </label>
                  <select
                    value={form.tour_option}
                    onChange={handleTourChange}
                    className={selectClass}
                  >
                    <option value="">Choose a tour</option>
                    <option value="custom">Custom route / not sure yet</option>
                    {tours.map((tour) => (
                      <option key={tour.slug} value={tour.slug}>
                        {tour.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Tour name or route *
                  </label>
                  <input
                    type="text"
                    name="tour_title"
                    value={form.tour_title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Turkmenistan Highlights Tour"
                  />
                  {errors.tour_title && <span className="text-red-800 text-sm">{errors.tour_title}</span>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Destination / countries
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Turkmenistan"
                  />
                </div>

                {isCustomTour && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-dark-900 mb-2">
                        Tour starting place *
                      </label>
                      <input
                        type="text"
                        name="tour_start_place"
                        value={form.tour_start_place}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Ashgabat"
                      />
                      {errors.tour_start_place && (
                        <span className="text-red-800 text-sm">
                          {errors.tour_start_place}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-900 mb-2">
                        Tour ending place *
                      </label>
                      <input
                        type="text"
                        name="tour_end_place"
                        value={form.tour_end_place}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Khiva / Ashgabat / Dushanbe"
                      />
                      {errors.tour_end_place && (
                        <span className="text-red-800 text-sm">
                          {errors.tour_end_place}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-dark-900 mb-2">
                        Tour duration *
                      </label>
                      <input
                        type="text"
                        name="tour_duration"
                        value={form.tour_duration}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="7 days / 6 nights"
                      />
                      {errors.tour_duration && (
                        <span className="text-red-800 text-sm">
                          {errors.tour_duration}
                        </span>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Current travelers
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="travelers_count"
                    value={form.travelers_count}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Start date *
                  </label>
                  <input
                    type="date"
                    name="travel_start_date"
                    value={form.travel_start_date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.travel_start_date && <span className="text-red-800 text-sm">{errors.travel_start_date}</span>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    End date
                  </label>
                  <input
                    type="date"
                    name="travel_end_date"
                    value={form.travel_end_date}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Looking for how many people?
                  </label>
                  <input
                    type="number"
                    min="1"
                    name="looking_for_count"
                    value={form.looking_for_count}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-dark-900 mb-2">
                    Public message *
                  </label>
                  <textarea
                    name="public_message"
                    value={form.public_message}
                    onChange={handleChange}
                    rows="5"
                    className={textareaClass}
                    placeholder="I am planning to travel this route and would like to find 1–2 travelers to share the tour."
                  ></textarea>
                  {errors.public_message && <span className="text-red-800 text-sm">{errors.public_message}</span>}
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-dark-800 leading-6 mt-5">
                <input
                  type="checkbox"
                  name="consent_to_publish"
                  checked={form.consent_to_publish}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span>
                  I agree that Belet Travel may publish my first name, country,
                  route, dates and public message. My email and WhatsApp will not
                  be displayed publicly.
                </span>
              </label>

              {errors.consent_to_publish && (
                <span className="text-red-800 text-sm block mt-1">{errors.consent_to_publish}</span>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary rounded-full px-6 py-3 font-semibold mt-6"
              >
                {isSubmitting ? "Submitting..." : "Submit for Review"}
                <i className="fa-regular fa-paper-plane ml-2"></i>
              </button>
            </form>

            <aside className="rounded-3xl bg-[#FAF7F2] border border-[#E2CFAF] p-5 md:p-6 sticky top-[100px]">
              <h3 className="text-xl mb-4">How it works</h3>

              <div className="space-y-4">
                <div>
                  <div className="font-bold text-dark-900">1. Submit request</div>
                  <p className="text-sm text-dark-800 mb-0">
                    You share your tour idea and travel mate request.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-dark-900">2. We review it</div>
                  <p className="text-sm text-dark-800 mb-0">
                    We check wording, dates and private information before publishing.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-dark-900">3. Travelers send interest</div>
                  <p className="text-sm text-dark-800 mb-0">
                    Interested travelers send a message through Belet Travel.
                  </p>
                </div>

                <div>
                  <div className="font-bold text-dark-900">4. We connect you</div>
                  <p className="text-sm text-dark-800 mb-0">
                    After both sides agree, we introduce travelers and combine the tour.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
