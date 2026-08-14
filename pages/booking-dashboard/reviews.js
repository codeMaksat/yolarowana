import { Head_Meta, useFetchData } from "@/component/comman";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import AdminSidebar from "@/component/AdminSidebar";

export default function ReviewRequestsDashboard() {
  const { data: seo_data } = useFetchData(
    "/json/data/site_meta_link.json"
  );

  const router = useRouter();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [sendingId, setSendingId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const [reviewRequests, setReviewRequests] = useState([]);

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    tour_name: "",
    tour_end_date: "",
  });

  // --------------------------------
  // AUTH CHECK
  // --------------------------------
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

  // --------------------------------
  // LOGOUT
  // --------------------------------
  // --------------------------------
  // GET SUPABASE ACCESS TOKEN
  // --------------------------------
  const getAccessToken = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.access_token) {
      router.push("/belet-admin");
      return null;
    }

    return session.access_token;
  };

  // --------------------------------
  // LOAD REVIEW REQUESTS
  // --------------------------------
  const fetchReviewRequests = async () => {
    setLoading(true);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return;
      }

      const response = await fetch("/api/reviews", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not load review requests"
        );
      }

      setReviewRequests(result.requests || []);
    } catch (error) {
      console.error(
        "Review request fetch error:",
        error
      );

      alert(
        error.message ||
          "Could not load review requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checkingAuth) {
      fetchReviewRequests();
    }
  }, [checkingAuth]);

  // --------------------------------
  // FORM INPUTS
  // --------------------------------
  const handleInputChange = event => {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // --------------------------------
  // CREATE REVIEW REQUEST
  // --------------------------------
  const handleCreateRequest = async event => {
    event.preventDefault();

    if (
      !form.client_name ||
      !form.client_email ||
      !form.tour_end_date
    ) {
      alert(
        "Client name, email and tour end date are required."
      );
      return;
    }

    setSaving(true);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return;
      }

      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Could not create review request"
        );
      }

      setReviewRequests(prev => [
        result.request,
        ...prev,
      ]);

      setForm({
        client_name: "",
        client_email: "",
        tour_name: "",
        tour_end_date: "",
      });

      alert(
        "Review request scheduled successfully."
      );
    } catch (error) {
      console.error(
        "Create review request error:",
        error
      );

      alert(
        error.message ||
          "Could not create review request."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // SEND NOW
  // --------------------------------
  const handleSendNow = async request => {
    const confirmed = window.confirm(
      `Send the review email to ${request.client_name} now?`
    );

    if (!confirmed) return;

    setSendingId(request.id);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return;
      }

      const response = await fetch(
        "/api/reviews/send",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id: request.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Could not send review email"
        );
      }

      if (result.request) {
        setReviewRequests(prev =>
          prev.map(item =>
            item.id === request.id
              ? result.request
              : item
          )
        );
      } else {
        await fetchReviewRequests();
      }

      alert(
        `Review email sent successfully to ${request.client_name}.`
      );
    } catch (error) {
      console.error(
        "Send review email error:",
        error
      );

      alert(
        error.message ||
          "Could not send review email."
      );

      await fetchReviewRequests();
    } finally {
      setSendingId(null);
    }
  };

  // --------------------------------
  // UPDATE STATUS
  // CANCEL / MARK REVIEWED
  // --------------------------------
  const handleUpdateStatus = async (
    request,
    newStatus
  ) => {
    let confirmationMessage = "";

    if (newStatus === "cancelled") {
      confirmationMessage =
        `Cancel the review request for ${request.client_name}?`;
    }

    if (newStatus === "reviewed") {
      confirmationMessage =
        `Mark ${request.client_name} as reviewed?`;
    }

    if (
      confirmationMessage &&
      !window.confirm(confirmationMessage)
    ) {
      return;
    }

    setUpdatingStatusId(request.id);

    try {
      const accessToken = await getAccessToken();

      if (!accessToken) {
        return;
      }

      const response = await fetch(
        "/api/reviews/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            id: request.id,
            status: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Could not update review request"
        );
      }

      setReviewRequests(prev =>
        prev.map(item =>
          item.id === request.id
            ? result.request
            : item
        )
      );

      if (newStatus === "cancelled") {
        alert("Review request cancelled.");
      }

      if (newStatus === "reviewed") {
        alert(
          "Customer marked as reviewed. No reminder will be sent."
        );
      }
    } catch (error) {
      console.error(
        "Review status update error:",
        error
      );

      alert(
        error.message ||
          "Could not update review request."
      );

      await fetchReviewRequests();
    } finally {
      setUpdatingStatusId(null);
    }
  };

  // --------------------------------
  // DATE FORMAT
  // --------------------------------
  const formatDate = dateString => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleString(
      "en-US",
      {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const formatDateOnly = dateString => {
    if (!dateString) return "-";

    const date = new Date(
      `${dateString}T00:00:00`
    );

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // --------------------------------
  // STATUS STYLE
  // --------------------------------
  const getStatusClass = status => {
    if (status === "scheduled") {
      return "bg-[#FEF2D3] text-[#B98500]";
    }

    if (status === "sent") {
      return "bg-[#E9F2FF] text-[#1B63A5]";
    }

    if (status === "reminder_sent") {
      return "bg-[#EAE7FF] text-[#5945A8]";
    }

    if (status === "reviewed") {
      return "bg-[#E8F7EC] text-[#217A3C]";
    }

    if (status === "failed") {
      return "bg-red-100 text-red-700";
    }

    if (status === "cancelled") {
      return "bg-gray-200 text-dark-800";
    }

    return "bg-gray-100 text-dark-800";
  };

  // --------------------------------
  // STATISTICS
  // --------------------------------
  const totalRequests = reviewRequests.length;

  const scheduledRequests =
    reviewRequests.filter(
      item => item.status === "scheduled"
    ).length;

  const sentRequests =
    reviewRequests.filter(
      item =>
        item.status === "sent" ||
        item.status === "reminder_sent"
    ).length;

  const reviewedRequests =
    reviewRequests.filter(
      item => item.status === "reviewed"
    ).length;

  // --------------------------------
  // AUTH LOADING
  // --------------------------------
  if (checkingAuth) {
    return (
      <div className="py-20 text-center">
        <p>Checking access...</p>
      </div>
    );
  }

  return (
    <>
      <Head_Meta
        meta_data={seo_data.contact_meta}
        comman_meta={seo_data}
      />

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="md:flex">

            {/* SIDEBAR */}
                        <AdminSidebar />

            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-220px)]">

              {/* HEADER */}
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">

                <div>
                  <h2 className="text-xl md:text-25 mb-2">
                    Review Requests
                  </h2>

                  <p className="mb-0">
                    Schedule and manage automatic
                    customer review emails.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchReviewRequests}
                  disabled={loading}
                  className="btn btn-primary rounded-full px-6 disabled:opacity-50"
                >
                  {loading
                    ? "Loading..."
                    : "Refresh"}
                </button>

              </div>

              {/* STATISTICS */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">

                <div className="shadow-box-3 rounded-xl py-6 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Total requests
                  </span>

                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {totalRequests}
                  </h3>

                  <p className="mb-0 text-sm">
                    All review requests
                  </p>
                </div>

                <div className="shadow-box-3 rounded-xl py-6 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Scheduled
                  </span>

                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {scheduledRequests}
                  </h3>

                  <p className="mb-0 text-sm">
                    Waiting to be sent
                  </p>
                </div>

                <div className="shadow-box-3 rounded-xl py-6 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Sent
                  </span>

                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {sentRequests}
                  </h3>

                  <p className="mb-0 text-sm">
                    Email already sent
                  </p>
                </div>

                <div className="shadow-box-3 rounded-xl py-6 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Reviewed
                  </span>

                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {reviewedRequests}
                  </h3>

                  <p className="mb-0 text-sm">
                    Completed reviews
                  </p>
                </div>

              </div>

              {/* ADD REVIEW REQUEST */}
              <div className="shadow-box-3 rounded-xl py-6 px-5 bg-white mt-6 md:mt-10">

                <div className="mb-6">

                  <h3 className="text-xl mb-2">
                    Add Review Request
                  </h3>

                  <p className="mb-0 text-sm text-dark-800">
                    The review email will automatically
                    be scheduled for the day after the
                    tour finishes.
                  </p>

                </div>

                <form onSubmit={handleCreateRequest}>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Client name *
                      </label>

                      <input
                        type="text"
                        name="client_name"
                        value={form.client_name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full rounded-xl border border-[#E2CFAF] bg-white px-4 py-3 outline-none focus:border-primary-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Client email *
                      </label>

                      <input
                        type="email"
                        name="client_email"
                        value={form.client_email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-[#E2CFAF] bg-white px-4 py-3 outline-none focus:border-primary-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tour name
                      </label>

                      <input
                        type="text"
                        name="tour_name"
                        value={form.tour_name}
                        onChange={handleInputChange}
                        placeholder="Turkmenistan Highlights Tour"
                        className="w-full rounded-xl border border-[#E2CFAF] bg-white px-4 py-3 outline-none focus:border-primary-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Tour end date *
                      </label>

                      <input
                        type="date"
                        name="tour_end_date"
                        value={form.tour_end_date}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-[#E2CFAF] bg-white px-4 py-3 outline-none focus:border-primary-900"
                      />
                    </div>

                  </div>

                  <div className="mt-6">

                    <button
                      type="submit"
                      disabled={saving}
                      className="btn btn-primary rounded-full px-7 disabled:opacity-50"
                    >
                      {saving
                        ? "Scheduling..."
                        : "Schedule Review Request"}
                    </button>

                  </div>

                </form>

              </div>

              {/* TABLE */}
              <div className="shadow-box-3 w-full mt-6 md:mt-10 rounded-xl py-6 px-5 bg-white">

                <div className="flex flex-wrap items-center justify-between gap-4 mb-7">

                  <h3 className="text-xl mb-0">
                    Review Requests
                  </h3>

                  {loading && (
                    <span className="text-sm text-dark-800">
                      Loading...
                    </span>
                  )}

                </div>

                <div className="w-full overflow-x-auto">

                  <table className="table-list table-auto whitespace-nowrap min-w-[1750px]">

                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Tour</th>
                        <th>Tour end</th>
                        <th>Review send date</th>
                        <th>Reminder date</th>
                        <th>Platform</th>
                        <th>Status</th>
                        <th>Sent</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>

                      {!loading &&
                        reviewRequests.length === 0 && (
                          <tr>
                            <td colSpan="11">
                              No review requests yet.
                            </td>
                          </tr>
                        )}

                      {reviewRequests.map(request => {

                        const isSending =
                          sendingId === request.id;

                        const isUpdating =
                          updatingStatusId === request.id;

                        return (
                          <tr key={request.id}>

                            <td className="font-semibold">
                              {request.client_name}
                            </td>

                            <td>
                              <a
                                href={`mailto:${request.client_email}`}
                              >
                                {request.client_email}
                              </a>
                            </td>

                            <td className="max-w-[260px] whitespace-normal">
                              {request.tour_name || "-"}
                            </td>

                            <td>
                              {formatDateOnly(
                                request.tour_end_date
                              )}
                            </td>

                            <td>
                              {formatDate(
                                request.scheduled_at
                              )}
                            </td>

                            <td>
                              {formatDate(
                                request.reminder_scheduled_at
                              )}
                            </td>

                            <td className="capitalize">
                              {request.platform}
                            </td>

                            <td>
                              <span
                                className={`${getStatusClass(
                                  request.status
                                )} py-1 px-3 rounded-full text-15 block text-center capitalize`}
                              >
                                {String(
                                  request.status
                                ).replaceAll(
                                  "_",
                                  " "
                                )}
                              </span>
                            </td>

                            <td>
                              {formatDate(
                                request.sent_at
                              )}
                            </td>

                            <td>
                              {formatDate(
                                request.created_at
                              )}
                            </td>

                            {/* ACTIONS */}
                            <td>
                              <div className="flex items-center gap-2">

                                {/* SCHEDULED */}
                                {request.status ===
                                  "scheduled" && (
                                  <>
                                    <button
                                      type="button"
                                      disabled={
                                        isSending ||
                                        isUpdating
                                      }
                                      onClick={() =>
                                        handleSendNow(
                                          request
                                        )
                                      }
                                      className="rounded-full bg-primary-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                                    >
                                      {isSending
                                        ? "Sending..."
                                        : "Send Now"}
                                    </button>

                                    <button
                                      type="button"
                                      disabled={
                                        isSending ||
                                        isUpdating
                                      }
                                      onClick={() =>
                                        handleUpdateStatus(
                                          request,
                                          "cancelled"
                                        )
                                      }
                                      className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-dark-900 hover:bg-gray-300 disabled:opacity-50"
                                    >
                                      {isUpdating
                                        ? "Updating..."
                                        : "Cancel"}
                                    </button>
                                  </>
                                )}

                                {/* FAILED */}
                                {request.status ===
                                  "failed" && (
                                  <>
                                    <button
                                      type="button"
                                      disabled={
                                        isSending ||
                                        isUpdating
                                      }
                                      onClick={() =>
                                        handleSendNow(
                                          request
                                        )
                                      }
                                      className="rounded-full bg-primary-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                                    >
                                      {isSending
                                        ? "Sending..."
                                        : "Try Again"}
                                    </button>

                                    <button
                                      type="button"
                                      disabled={
                                        isSending ||
                                        isUpdating
                                      }
                                      onClick={() =>
                                        handleUpdateStatus(
                                          request,
                                          "cancelled"
                                        )
                                      }
                                      className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-dark-900 disabled:opacity-50"
                                    >
                                      Cancel
                                    </button>
                                  </>
                                )}

                                {/* SENT */}
                                {request.status ===
                                  "sent" && (
                                  <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleUpdateStatus(
                                        request,
                                        "reviewed"
                                      )
                                    }
                                    className="rounded-full bg-[#E8F7EC] px-4 py-2 text-sm font-medium text-[#217A3C] disabled:opacity-50"
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Mark Reviewed"}
                                  </button>
                                )}

                                {/* REMINDER SENT */}
                                {request.status ===
                                  "reminder_sent" && (
                                  <button
                                    type="button"
                                    disabled={isUpdating}
                                    onClick={() =>
                                      handleUpdateStatus(
                                        request,
                                        "reviewed"
                                      )
                                    }
                                    className="rounded-full bg-[#E8F7EC] px-4 py-2 text-sm font-medium text-[#217A3C] disabled:opacity-50"
                                  >
                                    {isUpdating
                                      ? "Updating..."
                                      : "Mark Reviewed"}
                                  </button>
                                )}

                                {/* COMPLETED STATES */}
                                {request.status ===
                                  "reviewed" && (
                                  <span className="text-sm font-medium text-[#217A3C]">
                                    Completed
                                  </span>
                                )}

                                {request.status ===
                                  "cancelled" && (
                                  <span className="text-sm text-dark-800">
                                    No email will be sent
                                  </span>
                                )}

                              </div>
                            </td>

                          </tr>
                        );
                      })}

                    </tbody>

                  </table>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}