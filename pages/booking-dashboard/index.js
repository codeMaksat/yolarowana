import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Dashboard() {
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const statusOptions = ["new", "contacted", "confirmed", "closed"];

  const fetchInquiries = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching inquiries:", error);
      setLoading(false);
      return;
    }

    setInquiries(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateInquiryStatus = async (id, newStatus) => {
    setUpdatingId(id);

    const { data, error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating inquiry status:", error);
      alert("Could not update status. Please try again.");
      setUpdatingId(null);
      return;
    }

    setInquiries(prevInquiries =>
      prevInquiries.map(inquiry =>
        inquiry.id === id ? { ...inquiry, status: data.status } : inquiry
      )
    );

    setUpdatingId(null);
  };

  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(item => item.status === "new").length;
  const contactedInquiries = inquiries.filter(
    item => item.status === "contacted"
  ).length;
  const confirmedInquiries = inquiries.filter(
    item => item.status === "confirmed"
  ).length;

  const contactPageInquiries = inquiries.filter(
    item => item.source === "contact_page"
  ).length;

  const tourDetailInquiries = inquiries.filter(
    item => item.source === "tour_detail"
  ).length;

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

  const getStatusClass = status => {
    if (status === "new") {
      return "bg-[#FEF2D3] text-[#B98500]";
    }

    if (status === "contacted") {
      return "bg-[#E9F2FF] text-[#1B63A5]";
    }

    if (status === "confirmed") {
      return "bg-primary-800 text-primary-900";
    }

    if (status === "closed") {
      return "bg-gray-200 text-dark-800";
    }

    return "bg-[#FEF2D3] text-[#B98500]";
  };

  const getRowClass = status => {
    if (status === "new") {
      return "bg-[#FFF9E8]";
    }

    if (status === "contacted") {
      return "bg-[#F0F7FF]";
    }

    if (status === "confirmed") {
      return "bg-[#F1FBF4]";
    }

    if (status === "closed") {
      return "bg-[#F5F5F5] text-dark-800/70";
    }

    return "bg-white";
  };

  return (
    <>
      <Head_Meta meta_data={seo_data.contact_meta} comman_meta={seo_data} />

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-0">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="md:flex">
            <div className="md:max-w-[220px] w-full shrink-0 py-6 md:py-10 px-4 md:px-5 bg-white">
              <ul className="dashboard-list">
                <li className="active">
                  <Link href="/booking-dashboard">
                    <span>
                      <img src="/assets/images/dashboard.svg" alt="dashboard" />
                    </span>
                    Dashboard
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
              </ul>
            </div>

            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-220px)]">
              <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl md:text-25 mb-2">
                    Inquiry Dashboard
                  </h2>
                  <p className="mb-0">
                    View and manage contact form and tour inquiry requests.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchInquiries}
                  className="btn btn-primary rounded-full px-6"
                >
                  Refresh
                </button>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Total inquiries
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {totalInquiries}
                  </h3>
                  <p className="mb-5 text-sm">All submitted requests</p>
                  <img src="/assets/images/booking-icon.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    New
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {newInquiries}
                  </h3>
                  <p className="mb-5 text-sm">Waiting for consultant</p>
                  <img src="/assets/images/salary-icon.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Contacted
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {contactedInquiries}
                  </h3>
                  <p className="mb-5 text-sm">Already followed up</p>
                  <img src="/assets/images/data-blob.svg" alt="icon" />
                </div>

                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Confirmed
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {confirmedInquiries}
                  </h3>
                  <p className="mb-5 text-sm">Strong leads / confirmed</p>
                  <img src="/assets/images/hiking-icon-1.svg" alt="icon" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                <div className="shadow-box-3 rounded-xl py-5 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Contact page inquiries
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {contactPageInquiries}
                  </h3>
                </div>

                <div className="shadow-box-3 rounded-xl py-5 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Tour detail inquiries
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">
                    {tourDetailInquiries}
                  </h3>
                </div>
              </div>

              <div className="shadow-box-3 w-full mt-6 md:mt-10 rounded-xl py-6 px-5 bg-white">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
                  <h3 className="text-xl mb-0">Recent Inquiries</h3>

                  {loading && (
                    <span className="text-sm text-dark-800">Loading...</span>
                  )}
                </div>

                <div className="w-full overflow-x-auto">
                  <table className="table-list table-auto whitespace-nowrap min-w-[1500px]">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Countries</th>
                        <th>Travel dates</th>
                        <th>Travel style</th>
                        <th>Travelers</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Update status</th>
                        <th>Message</th>
                      </tr>
                    </thead>

                    <tbody>
                      {!loading && inquiries.length === 0 && (
                        <tr>
                          <td colSpan="12">No inquiries yet.</td>
                        </tr>
                      )}

                      {inquiries.map(inquiry => {
                        return (
                          <tr
                            key={inquiry.id}
                            className={`${getRowClass(
                              inquiry.status || "new"
                            )} transition-all`}
                          >
                            <td>{formatDate(inquiry.created_at)}</td>

                            <td>{inquiry.name || "-"}</td>

                            <td>
                              {inquiry.email ? (
                                <a href={`mailto:${inquiry.email}`}>
                                  {inquiry.email}
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>

                            <td>
                              {inquiry.phone ? (
                                <a href={`tel:${inquiry.phone}`}>
                                  {inquiry.phone}
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>

                            <td>{inquiry.countries || "-"}</td>
                            <td>{inquiry.travel_dates || "-"}</td>
                            <td>{inquiry.travel_style || "-"}</td>
                            <td>{inquiry.travelers || "-"}</td>
                            <td>{inquiry.source || "-"}</td>

                            <td>
                              <span
                                className={`${getStatusClass(
                                  inquiry.status || "new"
                                )} py-1 px-3 rounded-full text-15 block text-center capitalize`}
                              >
                                {inquiry.status || "new"}
                              </span>
                            </td>

                            <td>
                              <select
                                value={inquiry.status || "new"}
                                disabled={updatingId === inquiry.id}
                                onChange={event =>
                                  updateInquiryStatus(inquiry.id, event.target.value)
                                }
                                className="min-w-[140px] rounded-full border border-[#E2CFAF] bg-white px-4 py-2 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 capitalize"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>

                            <td className="max-w-[420px] whitespace-normal leading-normal">
                              {inquiry.message || "-"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl px-5 py-4">
                <p className="mb-0 text-sm text-dark-800">
                  Note: this dashboard is currently public if the page is live.
                  Before launch, protect it with login or remove the link from
                  the website.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}