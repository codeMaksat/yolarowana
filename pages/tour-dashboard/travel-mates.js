import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const requestStatuses = [
  "pending",
  "open",
  "almost_confirmed",
  "departure_confirmed",
  "closed",
  "rejected",
];

const interestStatuses = [
  "new",
  "reviewed",
  "forwarded",
  "connected",
  "rejected",
];

export default function TravelMateDashboard() {
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");
  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [interests, setInterests] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeView, setActiveView] = useState("requests");

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/yola-admin");
  };

  const fetchTravelMates = async () => {
    setLoading(true);

    const [requestsResult, interestsResult] = await Promise.all([
      supabase
        .from("travel_mate_requests")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("travel_mate_interests")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    if (requestsResult.error) {
      console.error("Error fetching travel mate requests:", requestsResult.error);
      alert("Could not load travel mate requests. Run the admin policies SQL in Supabase.");
    } else {
      setRequests(requestsResult.data || []);
    }

    if (interestsResult.error) {
      console.error("Error fetching travel mate interests:", interestsResult.error);
      alert("Could not load travel mate interests. Run the admin policies SQL in Supabase.");
    } else {
      setInterests(interestsResult.data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!checkingAuth) fetchTravelMates();
  }, [checkingAuth]);

  const requestById = useMemo(() => {
    return requests.reduce((acc, request) => {
      acc[request.id] = request;
      return acc;
    }, {});
  }, [requests]);

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(item => item.status === "pending").length;
  const publishedRequests = requests.filter(item => item.is_published).length;
  const openRequests = requests.filter(item => item.status === "open").length;
  const totalInterests = interests.length;
  const newInterests = interests.filter(item => item.status === "new").length;

  const formatDate = dateString => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateOnly = dateString => {
    if (!dateString) return "-";

    return new Date(`${dateString}T00:00:00`).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const getStatusClass = status => {
    if (status === "pending" || status === "new") return "bg-[#FEF2D3] text-[#B98500]";
    if (status === "open" || status === "connected") return "bg-[#E8F3EC] text-primary-900";
    if (status === "almost_confirmed" || status === "reviewed") return "bg-[#E9F2FF] text-[#1B63A5]";
    if (status === "departure_confirmed" || status === "forwarded") return "bg-primary-800 text-primary-900";
    if (status === "closed") return "bg-gray-200 text-dark-800";
    if (status === "rejected") return "bg-red-100 text-red-700";
    return "bg-[#FEF2D3] text-[#B98500]";
  };

  const statusLabel = status => (status || "pending").replaceAll("_", " ");

  const formatMoney = value => {
    if (value === null || value === undefined || value === "") return "-";

    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) return "-";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(numberValue);
  };

  const parsePriceInput = value => {
    if (value === null) return null;

    const trimmedValue = String(value).trim();

    if (!trimmedValue) return null;

    const cleanedValue = trimmedValue.replace(/[^0-9.]/g, "");
    const numberValue = Number(cleanedValue);

    return Number.isNaN(numberValue) ? null : numberValue;
  };

  const updateRequest = async (id, updates) => {
    setUpdatingId(id);

    const { data, error } = await supabase
      .from("travel_mate_requests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating request:", error);
      alert("Could not update request. Check Supabase admin policies.");
      setUpdatingId(null);
      return;
    }

    setRequests(prev => prev.map(item => (item.id === id ? data : item)));
    setUpdatingId(null);
  };

  const updateInterest = async (id, updates) => {
    setUpdatingId(id);

    const { data, error } = await supabase
      .from("travel_mate_interests")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating interest:", error);
      alert("Could not update interest. Check Supabase admin policies.");
      setUpdatingId(null);
      return;
    }

    setInterests(prev => prev.map(item => (item.id === id ? data : item)));
    setUpdatingId(null);
  };

  const deleteRequest = async id => {
    const confirmDelete = window.confirm(
      "Delete this travel mate request? Related interest messages will also be deleted."
    );

    if (!confirmDelete) return;

    setUpdatingId(id);

    const { data, error } = await supabase
      .from("travel_mate_requests")
      .delete()
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      console.error("Error deleting request:", error);
      alert("Could not delete request. Check Supabase delete policy.");
      setUpdatingId(null);
      return;
    }

    setRequests(prev => prev.filter(item => item.id !== id));
    setInterests(prev => prev.filter(item => item.request_id !== id));
    setUpdatingId(null);
  };

  const deleteInterest = async id => {
    const confirmDelete = window.confirm("Delete this interest message?");

    if (!confirmDelete) return;

    setUpdatingId(id);

    const { data, error } = await supabase
      .from("travel_mate_interests")
      .delete()
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      console.error("Error deleting interest:", error);
      alert("Could not delete interest. Check Supabase delete policy.");
      setUpdatingId(null);
      return;
    }

    setInterests(prev => prev.filter(item => item.id !== id));
    setUpdatingId(null);
  };

  const editPublicMessage = request => {
    const newMessage = window.prompt("Edit public message:", request.public_message || "");
    if (newMessage === null) return;

    const trimmed = newMessage.trim();
    if (!trimmed) {
      alert("Public message cannot be empty.");
      return;
    }

    updateRequest(request.id, { public_message: trimmed });
  };

  const editRequestNotes = request => {
    const newNotes = window.prompt("Admin notes:", request.admin_notes || "");
    if (newNotes === null) return;

    updateRequest(request.id, { admin_notes: newNotes.trim() || null });
  };



  const editRouteDetails = request => {
    const startPlace = window.prompt(
      "Tour starting place:",
      request.tour_start_place || ""
    );

    if (startPlace === null) return;

    const endPlace = window.prompt(
      "Tour ending place:",
      request.tour_end_place || ""
    );

    if (endPlace === null) return;

    const duration = window.prompt(
      "Tour duration, for example 7 days / 6 nights:",
      request.tour_duration || ""
    );

    if (duration === null) return;

    updateRequest(request.id, {
      tour_start_place: startPlace.trim() || null,
      tour_end_place: endPlace.trim() || null,
      tour_duration: duration.trim() || null,
    });
  };

  const editPriceOptions = request => {
    const currentGroupPrice = window.prompt(
      "Current group price per person in USD. Leave blank to hide this line:",
      request.current_group_price || ""
    );

    if (currentGroupPrice === null) return;

    const priceIf2People = window.prompt(
      "Price per person if 2 travelers join. Leave blank to hide this line:",
      request.price_if_2_people || ""
    );

    if (priceIf2People === null) return;

    const priceIf34People = window.prompt(
      "Price per person if 3–4 travelers join. Leave blank to hide this line:",
      request.price_if_3_4_people || ""
    );

    if (priceIf34People === null) return;

    const priceIf56People = window.prompt(
      "Price per person if 5–6 travelers join. Leave blank to hide this line:",
      request.price_if_5_6_people || ""
    );

    if (priceIf56People === null) return;

    const priceNote = window.prompt(
      "Public price note:",
      request.price_note ||
        "Final price will be confirmed by Belet Travel after dates, hotels, route and group size are checked."
    );

    if (priceNote === null) return;

    const showPublicly = window.confirm(
      "Show these estimated price options on the public travel mate card?"
    );

    updateRequest(request.id, {
      current_group_price: parsePriceInput(currentGroupPrice),
      price_if_2_people: parsePriceInput(priceIf2People),
      price_if_3_4_people: parsePriceInput(priceIf34People),
      price_if_5_6_people: parsePriceInput(priceIf56People),
      price_note: priceNote.trim() || null,
      show_price_publicly: showPublicly,
    });
  };

  const editInterestNotes = interest => {
    const newNotes = window.prompt("Admin notes:", interest.admin_notes || "");
    if (newNotes === null) return;

    updateInterest(interest.id, { admin_notes: newNotes.trim() || null });
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
      {seo_data && <Head_Meta meta_data={seo_data.contact_meta} comman_meta={seo_data} />}

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="md:flex">
            <div className="md:max-w-[220px] w-full shrink-0 py-6 md:py-10 px-4 md:px-5 bg-white">
              <ul className="dashboard-list">
                <li>
                  <Link href="/booking-dashboard">
                    <span><img src="/assets/images/dashboard.svg" alt="dashboard" /></span>
                    Inquiries
                  </Link>
                </li>

                <li>
                  <Link href="/tour-dashboard">
                    <span><img src="/assets/images/hiking-icon-1.svg" alt="tours" /></span>
                    Tours
                  </Link>
                </li>

                <li className="active">
                  <Link href="/tour-dashboard/travel-mates">
                    <span><img src="/assets/images/group-user-icon.svg" alt="travel mates" /></span>
                    Travel Mates
                  </Link>
                </li>

                <li>
                  <Link href="/travel-mates">
                    <span><img src="/assets/images/data-blob.svg" alt="public page" /></span>
                    Public page
                  </Link>
                </li>

                <li>
                  <Link href="/">
                    <span><img src="/assets/images/logout.svg" alt="home" /></span>
                    Back to website
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3"
                  >
                    <span><img src="/assets/images/logout.svg" alt="logout" /></span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-220px)]">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-25 mb-2">Travel Mate Dashboard</h2>
                  <p className="mb-0">Review requests, publish cards, and manage interested travelers.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/travel-mates/request" className="btn btn-secondary rounded-full px-6">
                    New request form
                  </Link>

                  <button type="button" onClick={fetchTravelMates} className="btn btn-primary rounded-full px-6">
                    Refresh
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">Total requests</span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">{totalRequests}</h3>
                  <p className="mb-5 text-sm">All travel mate cards</p>
                  <img src="/assets/images/booking-icon.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">Pending</span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">{pendingRequests}</h3>
                  <p className="mb-5 text-sm">Need approval</p>
                  <img src="/assets/images/salary-icon.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">Published</span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">{publishedRequests}</h3>
                  <p className="mb-5 text-sm">{openRequests} open cards</p>
                  <img src="/assets/images/data-blob.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">New interest</span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">{newInterests}</h3>
                  <p className="mb-5 text-sm">{totalInterests} total messages</p>
                  <img src="/assets/images/hiking-icon-1.svg" alt="icon" />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveView("requests")}
                  className={`rounded-full px-6 py-3 font-semibold ${
                    activeView === "requests"
                      ? "btn btn-primary"
                      : "bg-white border border-[#E2CFAF] text-dark-900"
                  }`}
                >
                  Requests
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView("interests")}
                  className={`rounded-full px-6 py-3 font-semibold ${
                    activeView === "interests"
                      ? "btn btn-primary"
                      : "bg-white border border-[#E2CFAF] text-dark-900"
                  }`}
                >
                  Interested Travelers
                </button>
              </div>

              {activeView === "requests" && (
                <div className="shadow-box-3 w-full mt-6 md:mt-8 rounded-xl py-6 px-5 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
                    <h3 className="text-xl mb-0">Travel Mate Requests</h3>
                    {loading && <span className="text-sm text-dark-800">Loading...</span>}
                  </div>

                  {!loading && requests.length === 0 && <p>No travel mate requests yet.</p>}

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {requests.map(request => {
                      const relatedInterests = interests.filter(item => item.request_id === request.id);

                      return (
                        <div key={request.id} className="rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <span className={`${getStatusClass(request.status)} py-1 px-3 rounded-full text-15 capitalize`}>
                              {statusLabel(request.status)}
                            </span>

                            <span className={`py-1 px-3 rounded-full text-15 ${
                              request.is_published
                                ? "bg-[#E8F3EC] text-primary-900"
                                : "bg-gray-200 text-dark-800"
                            }`}>
                              {request.is_published ? "Published" : "Hidden"}
                            </span>
                          </div>

                          <h4 className="text-xl mb-2">{request.tour_title}</h4>
                          <p className="text-sm mb-3 text-dark-800">
                            {request.first_name || "-"}{request.country ? ` from ${request.country}` : ""} · {formatDate(request.created_at)}
                          </p>

                          <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
                            <div><strong>Email:</strong> {request.email ? <a href={`mailto:${request.email}`}>{request.email}</a> : "-"}</div>
                            <div><strong>WhatsApp:</strong> {request.whatsapp || "-"}</div>
                            <div><strong>Destination:</strong> {request.destination || "-"}</div>
                            <div><strong>Start place:</strong> {request.tour_start_place || "-"}</div>
                            <div><strong>End place:</strong> {request.tour_end_place || "-"}</div>
                            <div><strong>Duration:</strong> {request.tour_duration || "-"}</div>
                            <div><strong>Dates:</strong> {formatDateOnly(request.travel_start_date)}{request.travel_end_date ? ` – ${formatDateOnly(request.travel_end_date)}` : ""}</div>
                            <div><strong>Travelers:</strong> {request.travelers_count || "-"}</div>
                            <div><strong>Looking for:</strong> {request.looking_for_count || "-"}</div>
                            <div><strong>Price visible:</strong> {request.show_price_publicly ? "Yes" : "No"}</div>
                            <div><strong>Current estimate:</strong> {formatMoney(request.current_group_price)}</div>
                          </div>

                          <div className="rounded-xl bg-white border border-[#E2CFAF] p-4 mb-4">
                            <strong className="block mb-2">Public message</strong>
                            <p className="mb-0 leading-normal">{request.public_message || "-"}</p>
                          </div>

                          <div className="rounded-xl bg-white border border-[#E2CFAF] p-4 mb-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                              <strong>Estimated price options</strong>
                              <span className={`py-1 px-3 rounded-full text-15 ${
                                request.show_price_publicly
                                  ? "bg-[#E8F3EC] text-primary-900"
                                  : "bg-gray-200 text-dark-800"
                              }`}>
                                {request.show_price_publicly ? "Shown publicly" : "Hidden publicly"}
                              </span>
                            </div>

                            <div className="grid md:grid-cols-2 gap-2 text-sm">
                              <div><strong>Current group:</strong> {formatMoney(request.current_group_price)}</div>
                              <div><strong>2 travelers:</strong> {formatMoney(request.price_if_2_people)}</div>
                              <div><strong>3–4 travelers:</strong> {formatMoney(request.price_if_3_4_people)}</div>
                              <div><strong>5–6 travelers:</strong> {formatMoney(request.price_if_5_6_people)}</div>
                            </div>

                            <p className="text-sm text-dark-800 mb-0 mt-3">
                              {request.price_note || "No public price note yet."}
                            </p>
                          </div>

                          {request.admin_notes && (
                            <p className="text-sm mb-4"><strong>Admin notes:</strong> {request.admin_notes}</p>
                          )}

                          <div className="flex flex-wrap gap-2 mb-4">
                            <select
                              value={request.status || "pending"}
                              disabled={updatingId === request.id}
                              onChange={event => updateRequest(request.id, { status: event.target.value })}
                              className="rounded-full border border-[#E2CFAF] bg-white px-4 py-2 text-sm text-dark-900 outline-none focus:border-primary-900 capitalize"
                            >
                              {requestStatuses.map(status => (
                                <option key={status} value={status}>{statusLabel(status)}</option>
                              ))}
                            </select>

                            <button
                              type="button"
                              disabled={updatingId === request.id}
                              onClick={() => updateRequest(request.id, { is_published: !request.is_published })}
                              className="rounded-full border border-[#E2CFAF] bg-white px-4 py-2 text-sm font-medium text-dark-900 disabled:opacity-50"
                            >
                              {request.is_published ? "Unpublish" : "Publish"}
                            </button>

                            <button
                              type="button"
                              disabled={updatingId === request.id}
                              onClick={() => updateRequest(request.id, { status: "open", is_published: true })}
                              className="rounded-full bg-primary-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                            >
                              Approve + Publish
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={() => editPublicMessage(request)} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                              Edit message
                            </button>
                            <button type="button" onClick={() => editRouteDetails(request)} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                              Edit route
                            </button>
                            <button type="button" onClick={() => editPriceOptions(request)} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                              Edit prices
                            </button>
                            <button type="button" onClick={() => editRequestNotes(request)} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                              Notes
                            </button>
                            {request.tour_slug && (
                              <Link href={`/tours/${request.tour_slug}`} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                                View tour
                              </Link>
                            )}
                            <button type="button" onClick={() => setActiveView("interests")} className="rounded-full bg-[#E9F2FF] px-4 py-2 text-sm font-medium text-[#1B63A5]">
                              {relatedInterests.length} interest{relatedInterests.length === 1 ? "" : "s"}
                            </button>
                            <button type="button" disabled={updatingId === request.id} onClick={() => deleteRequest(request.id)} className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-50">
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeView === "interests" && (
                <div className="shadow-box-3 w-full mt-6 md:mt-8 rounded-xl py-6 px-5 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
                    <h3 className="text-xl mb-0">Interested Travelers</h3>
                    {loading && <span className="text-sm text-dark-800">Loading...</span>}
                  </div>

                  {!loading && interests.length === 0 && <p>No interest messages yet.</p>}

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {interests.map(interest => {
                      const request = requestById[interest.request_id];

                      return (
                        <div key={interest.id} className="rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-5">
                          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <span className={`${getStatusClass(interest.status)} py-1 px-3 rounded-full text-15 capitalize`}>
                              {statusLabel(interest.status || "new")}
                            </span>
                            <span className="text-sm text-dark-800">{formatDate(interest.created_at)}</span>
                          </div>

                          <h4 className="text-xl mb-2">{interest.name}</h4>

                          <div className="grid md:grid-cols-2 gap-3 text-sm mb-4">
                            <div><strong>Email:</strong> {interest.email ? <a href={`mailto:${interest.email}`}>{interest.email}</a> : "-"}</div>
                            <div><strong>WhatsApp:</strong> {interest.whatsapp || "-"}</div>
                            <div><strong>Allow connection:</strong> {interest.allow_connection ? "Yes" : "No"}</div>
                            <div><strong>Original traveler:</strong> {request ? request.first_name : "Request not found"}</div>
                          </div>

                          <div className="rounded-xl bg-white border border-[#E2CFAF] p-4 mb-4">
                            <strong className="block mb-2">For request</strong>
                            <p className="mb-2">{request ? request.tour_title : "Request not found"}</p>
                            {request && (
                              <p className="text-sm mb-0 text-dark-800">
                                {request.email ? <a href={`mailto:${request.email}`}>{request.email}</a> : "-"}
                                {request.whatsapp ? ` · ${request.whatsapp}` : ""}
                              </p>
                            )}
                          </div>

                          <div className="rounded-xl bg-white border border-[#E2CFAF] p-4 mb-4">
                            <strong className="block mb-2">Message</strong>
                            <p className="mb-0 leading-normal">{interest.message || "-"}</p>
                          </div>

                          {interest.admin_notes && (
                            <p className="text-sm mb-4"><strong>Admin notes:</strong> {interest.admin_notes}</p>
                          )}

                          <div className="flex flex-wrap gap-2">
                            <select
                              value={interest.status || "new"}
                              disabled={updatingId === interest.id}
                              onChange={event => updateInterest(interest.id, { status: event.target.value })}
                              className="rounded-full border border-[#E2CFAF] bg-white px-4 py-2 text-sm text-dark-900 outline-none focus:border-primary-900 capitalize"
                            >
                              {interestStatuses.map(status => (
                                <option key={status} value={status}>{statusLabel(status)}</option>
                              ))}
                            </select>

                            <button type="button" onClick={() => editInterestNotes(interest)} className="rounded-full bg-white border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900">
                              Notes
                            </button>

                            <button type="button" disabled={updatingId === interest.id} onClick={() => deleteInterest(interest.id)} className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 disabled:opacity-50">
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl px-5 py-4">
                <p className="mb-0 text-sm text-dark-800">
                  Keep this page private. Public visitors can only see published travel mate cards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
