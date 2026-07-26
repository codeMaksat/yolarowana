import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const statusLabels = {
  open: "Open",
  almost_confirmed: "Almost Confirmed",
  departure_confirmed: "Departure Confirmed",
};

const statusClasses = {
  open: "bg-[#E8F3EC] text-primary-900 border-[#B9D4C2]",
  almost_confirmed: "bg-[#FFF7E6] text-[#9A6A00] border-[#E2CFAF]",
  departure_confirmed: "bg-[#FAF7F2] text-dark-900 border-[#E2CFAF]",
};

const formatDateRange = (startDate, endDate) => {
  if (!startDate && !endDate) return "Flexible dates";

  const options = { day: "numeric", month: "short", year: "numeric" };

  const start = startDate
    ? new Date(`${startDate}T00:00:00`).toLocaleDateString("en-GB", options)
    : "";

  const end = endDate
    ? new Date(`${endDate}T00:00:00`).toLocaleDateString("en-GB", options)
    : "";

  if (start && end) return `${start} – ${end}`;
  return start || end;
};


const formatMoney = value => {
  if (value === null || value === undefined || value === "") return "";

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(numberValue);
};

const hasPublicPrice = request => {
  return (
    request.show_price_publicly &&
    (
      request.current_group_price ||
      request.price_if_2_people ||
      request.price_if_3_4_people ||
      request.price_if_5_6_people
    )
  );
};

const PriceEstimateBlock = ({ request }) => {
  if (!hasPublicPrice(request)) {
    return (
      <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] p-4 mb-5">
        <div className="flex gap-2 text-sm text-dark-800 leading-6">
          <i className="fa-regular fa-circle-info text-primary-900 mt-1"></i>
          <span>
            Estimated per-person price may reduce when more travelers join.
            Final price will be confirmed by Belet Travel after dates, hotels,
            route and group size are checked.
          </span>
        </div>
      </div>
    );
  }

  const priceRows = [
    {
      label: "Current group estimate",
      value: request.current_group_price,
    },
    {
      label: "With 2 travelers",
      value: request.price_if_2_people,
    },
    {
      label: "With 3–4 travelers",
      value: request.price_if_3_4_people,
    },
    {
      label: "With 5–6 travelers",
      value: request.price_if_5_6_people,
    },
  ].filter(item => item.value !== null && item.value !== undefined && item.value !== "");

  return (
    <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] p-4 mb-5">
      <div className="flex items-center gap-2 mb-3 text-dark-900 font-bold">
        <i className="fa-regular fa-tags text-primary-900"></i>
        Estimated price options
      </div>

      <div className="space-y-2">
        {priceRows.map(item => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-3 rounded-xl bg-white border border-[#E2CFAF] px-3 py-2 text-sm"
          >
            <span className="text-dark-800">{item.label}</span>
            <strong className="text-dark-900 whitespace-nowrap">
              {formatMoney(item.value)} / person
            </strong>
          </div>
        ))}
      </div>

      <p className="text-xs leading-5 text-dark-800 mb-0 mt-3">
        {request.price_note ||
          "Final price will be confirmed by Belet Travel after dates, hotels, route and group size are checked."}
      </p>
    </div>
  );
};

const TravelMateCard = ({ request, onInterest }) => {
  return (
    <article className="h-full rounded-3xl bg-white border border-[#E2CFAF] shadow-sm overflow-hidden">
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
              statusClasses[request.status] || statusClasses.open
            }`}
          >
            {statusLabels[request.status] || "Open"}
          </span>

          {request.destination && (
            <span className="inline-flex items-center rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-3 py-1 text-xs font-semibold text-dark-800">
              {request.destination}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl mb-3 leading-tight">
          {request.tour_title}
        </h3>

        <div className="space-y-2 text-sm text-dark-800 mb-5">
          <div className="flex gap-2">
            <i className="fa-regular fa-calendar-days text-primary-900 mt-1"></i>
            <span>{formatDateRange(request.travel_start_date, request.travel_end_date)}</span>
          </div>

          {(request.tour_start_place || request.tour_end_place) && (
            <div className="flex gap-2">
              <i className="fa-regular fa-route text-primary-900 mt-1"></i>
              <span>
                {request.tour_start_place || "Start not specified"}
                {" → "}
                {request.tour_end_place || "End not specified"}
              </span>
            </div>
          )}

          {request.tour_duration && (
            <div className="flex gap-2">
              <i className="fa-regular fa-clock text-primary-900 mt-1"></i>
              <span>{request.tour_duration}</span>
            </div>
          )}


          <div className="flex gap-2">
            <i className="fa-regular fa-user text-primary-900 mt-1"></i>
            <span>
              {request.first_name}
              {request.country ? ` from ${request.country}` : ""} ·{" "}
              {request.travelers_count || 1} traveler
              {(request.travelers_count || 1) > 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex gap-2">
            <i className="fa-regular fa-users text-primary-900 mt-1"></i>
            <span>
              Looking for {request.looking_for_count || 1} travel mate
              {(request.looking_for_count || 1) > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        <PriceEstimateBlock request={request} />

        <p className="text-dark-900 leading-7 mb-6">
          “{request.public_message}”
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onInterest(request)}
            className="btn btn-primary rounded-full px-5 py-3 font-semibold"
          >
            I’m Interested
            <i className="fa-regular fa-paper-plane ml-2"></i>
          </button>

          {request.tour_slug && (
            <Link
              href={`/tours/${request.tour_slug}`}
              className="btn btn-secondary rounded-full px-5 py-3 font-semibold"
            >
              View Tour
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default function TravelMatesPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [interestForm, setInterestForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    message: "",
    allow_connection: false,
  });
  const [interestErrors, setInterestErrors] = useState({});
  const [interestSuccess, setInterestSuccess] = useState("");
  const [isSubmittingInterest, setIsSubmittingInterest] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("travel_mate_requests")
        .select(
          "id,status,first_name,country,tour_slug,tour_title,destination,tour_start_place,tour_end_place,tour_duration,travel_start_date,travel_end_date,travelers_count,looking_for_count,public_message,current_group_price,price_if_2_people,price_if_3_4_people,price_if_5_6_people,price_note,show_price_publicly,created_at"
        )
        .eq("is_published", true)
        .in("status", ["open", "almost_confirmed", "departure_confirmed"])
        .order("travel_start_date", { ascending: true, nullsFirst: false })
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Travel mate request fetch error:", error);
        setRequests([]);
      } else {
        setRequests(data || []);
      }

      setLoading(false);
    };

    fetchRequests();
  }, []);

  const destinations = useMemo(() => {
    const uniqueDestinations = Array.from(
      new Set(requests.map((item) => item.destination).filter(Boolean))
    );

    return ["All", ...uniqueDestinations];
  }, [requests]);

  const filteredRequests = useMemo(() => {
    if (selectedDestination === "All") return requests;
    return requests.filter((request) => request.destination === selectedDestination);
  }, [requests, selectedDestination]);

  const openInterestModal = (request) => {
    setSelectedRequest(request);
    setInterestForm({
      name: "",
      email: "",
      whatsapp: "",
      message: "",
      allow_connection: false,
    });
    setInterestErrors({});
    setInterestSuccess("");
  };

  const closeInterestModal = () => {
    setSelectedRequest(null);
    setInterestErrors({});
    setInterestSuccess("");
  };

  const handleInterestChange = (event) => {
    const { name, value, type, checked } = event.target;

    setInterestForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateInterest = () => {
    const errors = {};

    if (!interestForm.name.trim()) errors.name = "Name is required.";

    if (!interestForm.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(interestForm.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!interestForm.message.trim()) errors.message = "Message is required.";

    if (!interestForm.allow_connection) {
      errors.allow_connection =
        "Please confirm that we may contact you about this request.";
    }

    return errors;
  };

  const submitInterest = async (event) => {
    event.preventDefault();
    if (!selectedRequest) return;

    const errors = validateInterest();

    if (Object.keys(errors).length > 0) {
      setInterestErrors(errors);
      setInterestSuccess("");
      return;
    }

    setIsSubmittingInterest(true);
    setInterestErrors({});
    setInterestSuccess("");

    const { error } = await supabase.from("travel_mate_interests").insert([
      {
        request_id: selectedRequest.id,
        name: interestForm.name.trim(),
        email: interestForm.email.trim(),
        whatsapp: interestForm.whatsapp.trim() || null,
        message: interestForm.message.trim(),
        allow_connection: interestForm.allow_connection,
        status: "new",
      },
    ]);

    if (error) {
      console.error("Travel mate interest insert error:", error);
      setInterestErrors({ form: "Something went wrong. Please try again." });
      setIsSubmittingInterest(false);
      return;
    }

    setInterestSuccess(
      "Thank you. Your message has been sent to Belet Travel. We will review it and contact you before connecting travelers."
    );

    setInterestForm({
      name: "",
      email: "",
      whatsapp: "",
      message: "",
      allow_connection: false,
    });

    setIsSubmittingInterest(false);
  };

  return (
    <>
      <Head>
        <title>Find Travel Mates for Central Asia Tours | Belet Travel</title>
        <meta
          name="description"
          content="Find travel mates for Central Asia tours. Browse moderated travel mate requests or submit interest in joining a traveler on a planned route."
        />
      </Head>

      <section className="py-12 md:py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container">
          <div className="max-w-4xl">
            <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
              Travel Mate Board
            </span>

            <h1 className="mb-5">Find Travel Mates for Central Asia Tours</h1>

            <p className="text-lg leading-8 text-dark-800 mb-7">
              Looking to share a private tour, reduce travel costs, or join
              other travelers on a Central Asia route? Browse approved travel
              mate requests or submit your own request for review.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/travel-mates/request"
                className="btn btn-primary rounded-full px-6 py-3 font-semibold"
              >
                Post a Travel Mate Request
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </Link>

              <a
                href="mailto:info@belettravel.com"
                className="btn btn-secondary rounded-full px-6 py-3 font-semibold"
              >
                Ask Belet Travel
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 lg:py-16 bg-white">
        <div className="container">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="mb-2">Open Travel Mate Requests</h2>
              <p className="text-dark-800 mb-0">
                Messages are moderated. Traveler contact details are never shown publicly.
              </p>
            </div>
          </div>

          {destinations.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {destinations.map((destination) => (
                <button
                  type="button"
                  key={destination}
                  onClick={() => setSelectedDestination(destination)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    selectedDestination === destination
                      ? "border-primary-900 bg-primary-900 text-white"
                      : "border-[#E2CFAF] bg-[#FAF7F2] text-dark-900 hover:border-primary-900"
                  }`}
                >
                  {destination}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="rounded-3xl border border-[#E2CFAF] bg-[#FAF7F2] p-8 text-center">
              <p className="mb-0 text-dark-800">Loading travel mate requests...</p>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <TravelMateCard
                  key={request.id}
                  request={request}
                  onInterest={openInterestModal}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#E2CFAF] bg-[#FAF7F2] p-8 text-center">
              <h3 className="mb-3">No open requests yet</h3>
              <p className="text-dark-800 mb-5">
                Be the first traveler to post a travel mate request for a Central Asia route.
              </p>
              <Link
                href="/travel-mates/request"
                className="btn btn-primary rounded-full px-6 py-3 font-semibold"
              >
                Post a Request
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[#FAF7F2]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-3xl bg-white border border-[#E2CFAF] p-6">
              <div className="w-11 h-11 rounded-full bg-[#E8F3EC] flex items-center justify-center text-primary-900 mb-4">
                <i className="fa-regular fa-shield-check"></i>
              </div>
              <h3 className="text-xl mb-2">Moderated Requests</h3>
              <p className="text-dark-800 mb-0">
                Every request is reviewed before it appears on the website.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E2CFAF] p-6">
              <div className="w-11 h-11 rounded-full bg-[#E8F3EC] flex items-center justify-center text-primary-900 mb-4">
                <i className="fa-regular fa-user-lock"></i>
              </div>
              <h3 className="text-xl mb-2">Private Contact Details</h3>
              <p className="text-dark-800 mb-0">
                Emails and WhatsApp numbers are not displayed publicly.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-[#E2CFAF] p-6">
              <div className="w-11 h-11 rounded-full bg-[#E8F3EC] flex items-center justify-center text-primary-900 mb-4">
                <i className="fa-regular fa-route"></i>
              </div>
              <h3 className="text-xl mb-2">Tour Coordination</h3>
              <p className="text-dark-800 mb-0">
                Once travelers agree, Belet Travel helps combine them into one tour plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedRequest && (
        <div className="fixed inset-0 z-[9999] bg-black/50 px-4 py-8 overflow-y-auto">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-5 md:p-7 relative">
            <button
              type="button"
              onClick={closeInterestModal}
              className="absolute right-5 top-5 w-9 h-9 rounded-full border border-[#E2CFAF] flex items-center justify-center text-dark-900 hover:bg-[#FAF7F2]"
              aria-label="Close"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>

            <div className="pr-10">
              <span className="inline-block mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
                Send Interest
              </span>
              <h3 className="mb-2">Interested in this tour?</h3>
              <p className="text-dark-800 leading-7 mb-5">
                Your message will be reviewed by Belet Travel before any traveler is connected.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] p-4 mb-5">
              <div className="font-bold text-dark-900">{selectedRequest.tour_title}</div>
              <div className="text-sm text-dark-800">
                {formatDateRange(selectedRequest.travel_start_date, selectedRequest.travel_end_date)}
              </div>
              {(selectedRequest.tour_start_place || selectedRequest.tour_end_place) && (
                <div className="text-sm text-dark-800">
                  {selectedRequest.tour_start_place || "Start not specified"}
                  {" → "}
                  {selectedRequest.tour_end_place || "End not specified"}
                </div>
              )}
              {selectedRequest.tour_duration && (
                <div className="text-sm text-dark-800">
                  Duration: {selectedRequest.tour_duration}
                </div>
              )}
            </div>

            <form className="space-y-3" onSubmit={submitInterest}>
              {interestErrors.form && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-800 text-sm">
                  {interestErrors.form}
                </div>
              )}

              {interestSuccess && (
                <div className="rounded-2xl border border-[#B9D4C2] bg-[#E8F3EC] px-4 py-3 text-primary-900 text-sm font-semibold">
                  {interestSuccess}
                </div>
              )}

              <div>
                <input
                  type="text"
                  name="name"
                  value={interestForm.name}
                  onChange={handleInterestChange}
                  placeholder="Your name"
                  className="w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900"
                />
                {interestErrors.name && (
                  <span className="text-red-800 text-sm">{interestErrors.name}</span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={interestForm.email}
                  onChange={handleInterestChange}
                  placeholder="Email address"
                  className="w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900"
                />
                {interestErrors.email && (
                  <span className="text-red-800 text-sm">{interestErrors.email}</span>
                )}
              </div>

              <input
                type="text"
                name="whatsapp"
                value={interestForm.whatsapp}
                onChange={handleInterestChange}
                placeholder="WhatsApp / phone number"
                className="w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900"
              />

              <div>
                <textarea
                  name="message"
                  value={interestForm.message}
                  onChange={handleInterestChange}
                  rows="4"
                  placeholder="Ask a question or tell us why you would like to join"
                  className="w-full rounded-2xl border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 resize-none"
                ></textarea>
                {interestErrors.message && (
                  <span className="text-red-800 text-sm">{interestErrors.message}</span>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm text-dark-800 leading-6">
                <input
                  type="checkbox"
                  name="allow_connection"
                  checked={interestForm.allow_connection}
                  onChange={handleInterestChange}
                  className="mt-1"
                />
                <span>
                  I agree that Belet Travel may contact me about this request and
                  may connect me with the traveler after both sides agree.
                </span>
              </label>

              {interestErrors.allow_connection && (
                <span className="text-red-800 text-sm block">
                  {interestErrors.allow_connection}
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmittingInterest}
                className="btn btn-primary w-full rounded-full py-3 font-semibold"
              >
                {isSubmittingInterest ? "Sending..." : "Send Message"}
                <i className="fa-regular fa-paper-plane ml-2"></i>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
