import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function TourDashboard() {
    const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const router = useRouter();

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

    const duplicateTour = async tour => {
        const confirmDuplicate = window.confirm(
            `Duplicate "${tour.title}" as a new draft tour?`
        );

        if (!confirmDuplicate) return;

        const baseSlug = `${tour.slug}-copy`;

        const { data: existingTours, error: slugError } = await supabase
            .from("tours")
            .select("slug")
            .like("slug", `${baseSlug}%`);

        if (slugError) {
            console.error("Error checking duplicate slug:", slugError);
            alert("Could not check duplicate slug. Please try again.");
            return;
        }

        let newSlug = baseSlug;

        if (existingTours && existingTours.some(item => item.slug === newSlug)) {
            let counter = 2;

            while (existingTours.some(item => item.slug === `${baseSlug}-${counter}`)) {
                counter += 1;
            }

            newSlug = `${baseSlug}-${counter}`;
        }

        const {
            id,
            created_at,
            updated_at,
            ...tourWithoutSystemFields
        } = tour;

        const duplicatedTour = {
            ...tourWithoutSystemFields,
            title: `${tour.title} Copy`,
            slug: newSlug,
            status: "draft",
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from("tours")
            .insert([duplicatedTour])
            .select()
            .single();

        if (error) {
            console.error("Error duplicating tour:", error);
            alert(error.message || "Could not duplicate tour. Please try again.");
            return;
        }

        router.push(`/tour-dashboard/edit/${data.slug}`);
    };

    const archiveTour = async tour => {
        const confirmArchive = window.confirm(
            `Archive "${tour.title}"? This will hide it from the public website.`
        );

        if (!confirmArchive) return;

        const { error } = await supabase
            .from("tours")
            .update({
                status: "archived",
                updated_at: new Date().toISOString(),
            })
            .eq("id", tour.id);

        if (error) {
            console.error("Error archiving tour:", error);
            alert(error.message || "Could not archive tour. Please try again.");
            return;
        }

        setTours(prevTours =>
            prevTours.map(item =>
                item.id === tour.id
                    ? {
                        ...item,
                        status: "archived",
                    }
                    : item
            )
        );
    };

    const restoreTour = async tour => {
        const confirmRestore = window.confirm(
            `Restore "${tour.title}" as a draft tour?`
        );

        if (!confirmRestore) return;

        const { error } = await supabase
            .from("tours")
            .update({
                status: "draft",
                updated_at: new Date().toISOString(),
            })
            .eq("id", tour.id);

        if (error) {
            console.error("Error restoring tour:", error);
            alert(error.message || "Could not restore tour. Please try again.");
            return;
        }

        setTours(prevTours =>
            prevTours.map(item =>
                item.id === tour.id
                    ? {
                        ...item,
                        status: "draft",
                    }
                    : item
            )
        );
    };

    const filteredTours = tours
        .filter(tour => {
            const matchesStatus =
                statusFilter === "all" || tour.status === statusFilter;

            const searchValue = searchTerm.toLowerCase().trim();

            const matchesSearch =
                searchValue === "" ||
                tour.title?.toLowerCase().includes(searchValue) ||
                tour.slug?.toLowerCase().includes(searchValue) ||
                tour.route?.toLowerCase().includes(searchValue) ||
                tour.duration?.toLowerCase().includes(searchValue);

            return matchesStatus && matchesSearch;
        })
        .sort((a, b) => {
            if (sortOption === "newest") {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            }

            if (sortOption === "oldest") {
                return new Date(a.created_at || 0) - new Date(b.created_at || 0);
            }

            if (sortOption === "title-az") {
                return (a.title || "").localeCompare(b.title || "");
            }

            if (sortOption === "title-za") {
                return (b.title || "").localeCompare(a.title || "");
            }

            if (sortOption === "published-first") {
                const order = {
                    published: 1,
                    draft: 2,
                    archived: 3,
                };

                return (order[a.status] || 4) - (order[b.status] || 4);
            }

            if (sortOption === "draft-first") {
                const order = {
                    draft: 1,
                    published: 2,
                    archived: 3,
                };

                return (order[a.status] || 4) - (order[b.status] || 4);
            }

            return 0;
        });

    const fetchTours = async () => {
        setLoading(true);

        const { data, error } = await supabase
            .from("tours")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching tours:", error);
            setLoading(false);
            return;
        }

        setTours(data || []);
        setLoading(false);
    };

    useEffect(() => {
        if (!checkingAuth) {
            fetchTours();
        }
    }, [checkingAuth]);

    const updateTourStatus = async (id, newStatus) => {
        setUpdatingId(id);

        const { data, error } = await supabase
            .from("tours")
            .update({
                status: newStatus,
                updated_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Error updating tour status:", error);
            alert("Could not update tour status. Please try again.");
            setUpdatingId(null);
            return;
        }

        setTours(prevTours =>
            prevTours.map(tour =>
                tour.id === id ? { ...tour, status: data.status } : tour
            )
        );

        setUpdatingId(null);
    };

    const getStatusClass = status => {
        if (status === "published") {
            return "bg-primary-800 text-primary-900";
        }

        if (status === "draft") {
            return "bg-[#FEF2D3] text-[#B98500]";
        }

        return "bg-gray-200 text-dark-800";
    };

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

                                <li className="active">
                                    <Link href="/tour-dashboard">
                                        <span>
                                            <img src="/assets/images/hiking-icon-1.svg" alt="tours" />
                                        </span>
                                        Tours
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
                                    <h2 className="text-xl md:text-25 mb-2">Tour Dashboard</h2>
                                    <p className="mb-0">
                                        View and manage tours stored in Supabase.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        type="button"
                                        onClick={fetchTours}
                                        className="btn btn-primary rounded-full px-6"
                                    >
                                        Refresh
                                    </button>

                                    <Link
                                        href="/tour-dashboard/create"
                                        className="btn btn-primary rounded-full px-6"
                                    >
                                        Create New Tour
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                                    <span className="text-dark-900 text-sm block mb-1 font-medium">
                                        Total tours
                                    </span>
                                    <h3 className="text-xl md:text-25 mb-1 font-bold">
                                        {tours.length}
                                    </h3>
                                    <p className="mb-5 text-sm">All database tours</p>
                                    <img src="/assets/images/booking-icon.svg" alt="icon" />
                                </div>

                                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                                    <span className="text-dark-900 text-sm block mb-1 font-medium">
                                        Published
                                    </span>
                                    <h3 className="text-xl md:text-25 mb-1 font-bold">
                                        {tours.filter(tour => tour.status === "published").length}
                                    </h3>
                                    <p className="mb-5 text-sm">Visible on website</p>
                                    <img src="/assets/images/hiking-icon-1.svg" alt="icon" />
                                </div>

                                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                                    <span className="text-dark-900 text-sm block mb-1 font-medium">
                                        Drafts
                                    </span>
                                    <h3 className="text-xl md:text-25 mb-1 font-bold">
                                        {tours.filter(tour => tour.status === "draft").length}
                                    </h3>
                                    <p className="mb-5 text-sm">Hidden from website</p>
                                    <img src="/assets/images/data-blob.svg" alt="icon" />
                                </div>

                                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                                    <span className="text-dark-900 text-sm block mb-1 font-medium">
                                        Archived
                                    </span>
                                    <h3 className="text-xl md:text-25 mb-1 font-bold">
                                        {tours.filter(tour => tour.status === "archived").length}
                                    </h3>
                                    <p className="mb-5 text-sm">Hidden and stored</p>
                                    <img src="/assets/images/salary-icon.svg" alt="icon" />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                {[
                                    { label: "All", value: "all" },
                                    { label: "Published", value: "published" },
                                    { label: "Draft", value: "draft" },
                                    { label: "Archived", value: "archived" },
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        type="button"
                                        onClick={() => setStatusFilter(filter.value)}
                                        className={`rounded-full px-5 py-2 text-sm font-semibold border transition-all ${statusFilter === filter.value
                                            ? "bg-primary-900 text-white border-primary-900"
                                            : "bg-white text-dark-900 border-[#E2CFAF] hover:border-primary-900"
                                            }`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6 grid md:grid-cols-[1fr_260px] gap-4">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={event => setSearchTerm(event.target.value)}
                                    className="w-full rounded-full border border-[#E2CFAF] bg-white px-5 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all"
                                    placeholder="Search by tour title, slug, route, or duration..."
                                />

                                <select
                                    value={sortOption}
                                    onChange={event => setSortOption(event.target.value)}
                                    className="w-full rounded-full border border-[#E2CFAF] bg-white px-5 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all"
                                >
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                    <option value="title-az">Title A–Z</option>
                                    <option value="title-za">Title Z–A</option>
                                    <option value="published-first">Published first</option>
                                    <option value="draft-first">Draft first</option>
                                </select>
                            </div>
                            <div className="mt-4 rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] px-5 py-4">
                                <p className="mb-0 text-sm text-dark-800">
                                    <strong>Published</strong> tours are visible to customers.{" "}
                                    <strong>Draft</strong> and <strong>archived</strong> tours are hidden from the public website.
                                    Use <strong>Preview</strong> to check any tour before publishing.
                                </p>
                            </div>

                            <div className="shadow-box-3 w-full mt-6 md:mt-6 rounded-xl py-6 px-5 bg-white">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
                                    <h3 className="text-xl mb-0">Tours</h3>

                                    {loading && (
                                        <span className="text-sm text-dark-800">Loading...</span>
                                    )}
                                </div>

                                <div className="w-full overflow-x-auto">
                                    <table className="table-list table-auto whitespace-nowrap min-w-[1350px]">
                                        <thead>
                                            <tr>
                                                <th>Created</th>
                                                <th>Last Updated</th>
                                                <th>Tour</th>
                                                <th>Slug</th>
                                                <th>Duration</th>
                                                <th>Route</th>
                                                <th>Status</th>
                                                <th>Update status</th>
                                                <th>View</th>
                                                <th>Preview</th>
                                                <th>Edit</th>
                                                <th>Duplicate</th>
                                                <th>Archive / Restore</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {!loading && filteredTours.length === 0 && (
                                                <tr>
                                                    <td colSpan="13">
                                                        {searchTerm.trim()
                                                            ? "No tours match your search."
                                                            : statusFilter === "all"
                                                                ? "No tours yet."
                                                                : `No ${statusFilter} tours found.`}
                                                    </td>
                                                </tr>
                                            )}

                                            {filteredTours.map(tour => {
                                                return (
                                                    <tr key={tour.id}>
                                                        <td>{formatDate(tour.created_at)}</td>

                                                        <td>{formatDate(tour.updated_at)}</td>

                                                        <td className="max-w-[260px] whitespace-normal font-semibold text-dark-900">
                                                            {tour.title || "-"}
                                                        </td>

                                                        <td className="max-w-[260px] whitespace-normal">
                                                            {tour.slug || "-"}
                                                        </td>

                                                        <td>{tour.duration || "-"}</td>

                                                        <td className="max-w-[340px] whitespace-normal">
                                                            {tour.route || "-"}
                                                        </td>

                                                        <td>
                                                            <span
                                                                className={`${getStatusClass(
                                                                    tour.status || "draft"
                                                                )} py-1 px-3 rounded-full text-15 block text-center capitalize`}
                                                            >
                                                                {tour.status || "draft"}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            <select
                                                                value={tour.status || "draft"}
                                                                disabled={updatingId === tour.id}
                                                                onChange={event =>
                                                                    updateTourStatus(tour.id, event.target.value)
                                                                }
                                                                className="min-w-[140px] rounded-full border border-[#E2CFAF] bg-white px-4 py-2 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 capitalize"
                                                            >
                                                                <option value="draft">Draft</option>
                                                                <option value="published">Published</option>
                                                                <option value="archived">Archived</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            {tour.slug && tour.status === "published" ? (
                                                                <Link
                                                                    href={`/tours/${tour.slug}`}
                                                                    className="rounded-full bg-primary-800 px-4 py-2 text-sm font-medium text-primary-900 hover:bg-primary-900 hover:text-white"
                                                                    target="_blank"
                                                                >
                                                                    View
                                                                </Link>
                                                            ) : (
                                                                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                                                                    Not public
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            {tour.slug ? (
                                                                <Link
                                                                    href={`/tours/${tour.slug}?preview=true`}
                                                                    className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900 hover:border-primary-900"
                                                                    target="_blank"
                                                                >
                                                                    Preview
                                                                </Link>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </td>
                                                        <td>
                                                            {tour.slug ? (
                                                                <Link
                                                                    href={`/tour-dashboard/edit/${tour.slug}`}
                                                                    className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900 hover:border-primary-900"
                                                                >
                                                                    Edit
                                                                </Link>
                                                            ) : (
                                                                "-"
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                onClick={() => duplicateTour(tour)}
                                                                className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2 text-sm font-medium text-dark-900 hover:border-primary-900"
                                                            >
                                                                Duplicate
                                                            </button>
                                                        </td>
                                                        <td>
                                                            {tour.status !== "archived" ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => archiveTour(tour)}
                                                                    className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                                                                >
                                                                    Archive
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => restoreTour(tour)}
                                                                    className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-200"
                                                                >
                                                                    Restore
                                                                </button>
                                                            )}
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
                                    This page reads tours from Supabase. Next step: add edit and
                                    create tour forms.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}