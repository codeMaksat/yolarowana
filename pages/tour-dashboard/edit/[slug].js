import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

const defaultTour = {
    title: "",
    slug: "",
    hero_image: "",
    card_image: "",
    hero_alt: "",
    icon: "fa-solid fa-location-dot",
    icon_label: "",
    duration: "",
    travel_style: "",
    route: "",
    support_label: "",
    price_note: "",
    meta_title: "",
    meta_description: "",
    meta_image: "",
    brochure_pdf: "",
    price_tiers: [],
    overview: [],
    itinerary: [],
    included: [],
    not_included: [],
    faq: [],
    photos: [],
    map: [],
    related_tours: [],
    status: "draft",
};

const jsonFieldConfig = [
    {
        key: "overview",
        title: "Overview",
        help: "Edit the overview JSON. Keep the same structure so the public tour page displays correctly.",
        minHeight: "320px",
    },
    {
        key: "itinerary",
        title: "Itinerary",
        help: "Edit the itinerary JSON. Keep the same structure so each day displays correctly on the public tour page.",
        minHeight: "520px",
    },
    {
        key: "included",
        title: "What's Included",
        help: "Edit the included services JSON. Keep the same structure so the public tour page displays correctly.",
        minHeight: "360px",
    },
    {
        key: "not_included",
        title: "What's Not Included",
        help: "Edit the excluded services JSON. Keep the same structure so the public tour page displays correctly.",
        minHeight: "360px",
    },
    {
        key: "faq",
        title: "FAQ",
        help: "Edit the FAQ JSON. Keep the same question and answer structure.",
        minHeight: "420px",
    },
    {
        key: "photos",
        title: "Photos",
        help: "Edit the gallery photos JSON. Each image should include image path and alt text.",
        minHeight: "360px",
    },
    {
        key: "map",
        title: "Map",
        help: "Edit the Google Maps embed JSON. Use an embed URL that starts with https://www.google.com/maps/embed.",
        minHeight: "260px",
    },
    {
        key: "related_tours",
        title: "Related Tours",
        help: "Edit the recommended tour cards shown in the sidebar. Use /tours/your-tour-slug for new Supabase tour pages.",
        minHeight: "360px",
    },
];

function normalizeTour(data = {}) {
    return {
        title: data.title || "",
        slug: data.slug || "",
        hero_image: data.hero_image || "",
        card_image: data.card_image || "",
        hero_alt: data.hero_alt || "",
        icon: data.icon || "fa-solid fa-location-dot",
        icon_label: data.icon_label || "",
        duration: data.duration || "",
        travel_style: data.travel_style || "",
        route: data.route || "",
        support_label: data.support_label || "",
        price_note: data.price_note || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        meta_image: data.meta_image || "",
        brochure_pdf: data.brochure_pdf || "",
        price_tiers: Array.isArray(data.price_tiers) ? data.price_tiers : [],
        overview: Array.isArray(data.overview) ? data.overview : [],
        itinerary: Array.isArray(data.itinerary) ? data.itinerary : [],
        included: Array.isArray(data.included) ? data.included : [],
        not_included: Array.isArray(data.not_included) ? data.not_included : [],
        faq: Array.isArray(data.faq) ? data.faq : [],
        photos: Array.isArray(data.photos) ? data.photos : [],
        map: Array.isArray(data.map) ? data.map : [],
        related_tours: Array.isArray(data.related_tours)
            ? data.related_tours
            : [],
        status: data.status || "draft",
    };
}

function buildJsonText(tourData) {
    const jsonText = {};

    jsonFieldConfig.forEach(field => {
        jsonText[field.key] = JSON.stringify(
            Array.isArray(tourData[field.key]) ? tourData[field.key] : [],
            null,
            2
        );
    });

    return jsonText;
}

export default function EditTourPage() {
    const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

    const router = useRouter();
    const { slug } = router.query;

    const [checkingAuth, setCheckingAuth] = useState(true);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [tour, setTour] = useState(defaultTour);
    const [jsonText, setJsonText] = useState(buildJsonText(defaultTour));

    const importFileInputRef = useRef(null);

    const inputClass =
        "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

    const textareaClass =
        "w-full rounded-2xl border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-none";

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

    useEffect(() => {
        if (!slug || checkingAuth) return;

        const fetchTour = async () => {
            setLoading(true);

            const { data, error } = await supabase
                .from("tours")
                .select("*")
                .eq("slug", slug)
                .single();

            if (error) {
                console.error("Error fetching tour:", error);
                alert("Could not load tour.");
                setLoading(false);
                return;
            }

            const normalizedTour = normalizeTour(data);

            setTour(normalizedTour);
            setJsonText(buildJsonText(normalizedTour));
            setLoading(false);
        };

        fetchTour();
    }, [slug, checkingAuth]);

    const handleChange = event => {
        const { name, value } = event.target;

        setTour(prevTour => ({
            ...prevTour,
            [name]: value,
        }));
    };

    const handleJsonChange = (key, value) => {
        setJsonText(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const parseJsonFields = () => {
        const parsed = {};

        for (const field of jsonFieldConfig) {
            try {
                const value = JSON.parse(jsonText[field.key] || "[]");

                if (!Array.isArray(value)) {
                    alert(`${field.title} JSON must be an array.`);
                    return null;
                }

                parsed[field.key] = value;
            } catch (error) {
                alert(`${field.title} JSON is not valid. Please check commas and brackets.`);
                return null;
            }
        }

        return parsed;
    };

    const handlePriceTierChange = (tierIndex, field, value) => {
        setTour(prevTour => {
            const updatedPriceTiers = [...prevTour.price_tiers];

            updatedPriceTiers[tierIndex] = {
                ...updatedPriceTiers[tierIndex],
                [field]:
                    field === "price"
                        ? value === ""
                            ? null
                            : Number(value)
                        : value,
            };

            return {
                ...prevTour,
                price_tiers: updatedPriceTiers,
            };
        });
    };

    const handleDefaultPriceTier = tierIndex => {
        setTour(prevTour => {
            const updatedPriceTiers = prevTour.price_tiers.map((tier, index) => ({
                ...tier,
                default: index === tierIndex,
            }));

            return {
                ...prevTour,
                price_tiers: updatedPriceTiers,
            };
        });
    };

    const addPriceTier = () => {
        setTour(prevTour => ({
            ...prevTour,
            price_tiers: [
                ...prevTour.price_tiers,
                {
                    travelers: "",
                    price: null,
                    default: false,
                },
            ],
        }));
    };

    const removePriceTier = tierIndex => {
        const confirmRemove = window.confirm("Remove this price tier?");

        if (!confirmRemove) return;

        setTour(prevTour => ({
            ...prevTour,
            price_tiers: prevTour.price_tiers.filter(
                (_, index) => index !== tierIndex
            ),
        }));
    };

    const exportTourJson = () => {
        const parsedJsonFields = parseJsonFields();

        if (!parsedJsonFields) return;

        const exportData = {
            title: tour.title,
            slug: tour.slug,
            hero_image: tour.hero_image,
            card_image: tour.card_image,
            hero_alt: tour.hero_alt,
            icon: tour.icon,
            icon_label: tour.icon_label,
            duration: tour.duration,
            travel_style: tour.travel_style,
            route: tour.route,
            support_label: tour.support_label,
            price_note: tour.price_note,
            meta_title: tour.meta_title,
            meta_description: tour.meta_description,
            meta_image: tour.meta_image,
            brochure_pdf: tour.brochure_pdf,
            price_tiers: tour.price_tiers,
            overview: parsedJsonFields.overview,
            itinerary: parsedJsonFields.itinerary,
            included: parsedJsonFields.included,
            not_included: parsedJsonFields.not_included,
            faq: parsedJsonFields.faq,
            photos: parsedJsonFields.photos,
            map: parsedJsonFields.map,
            related_tours: parsedJsonFields.related_tours,
            status: tour.status,
            exported_at: new Date().toISOString(),
        };

        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const fileName = `${tour.slug || "tour-export"}.json`;

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    const importTourJson = event => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = loadEvent => {
            try {
                const importedData = JSON.parse(loadEvent.target.result);

                const confirmImport = window.confirm(
                    "Import this JSON into the current tour editor? This will replace the visible fields, but it will not save to Supabase until you click Save Tour."
                );

                if (!confirmImport) {
                    event.target.value = "";
                    return;
                }

                const normalizedImportedTour = normalizeTour({
                    ...importedData,
                    status: tour.status || importedData.status || "draft",
                });

                setTour(normalizedImportedTour);
                setJsonText(buildJsonText(normalizedImportedTour));

                alert("JSON imported into editor. Please review, then click Save Tour.");
            } catch (error) {
                console.error("Import JSON error:", error);
                alert("Invalid JSON file. Please upload a valid tour export file.");
            }

            event.target.value = "";
        };

        reader.readAsText(file);
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

        const parsedJsonFields = parseJsonFields();

        if (!parsedJsonFields) return;

        setSaving(true);

        const { error } = await supabase
            .from("tours")
            .update({
                title: tour.title,
                slug: tour.slug,
                hero_image: tour.hero_image,
                card_image: tour.card_image,
                hero_alt: tour.hero_alt,
                icon: tour.icon,
                icon_label: tour.icon_label,
                duration: tour.duration,
                travel_style: tour.travel_style,
                route: tour.route,
                support_label: tour.support_label,
                price_note: tour.price_note,
                meta_title: tour.meta_title,
                meta_description: tour.meta_description,
                meta_image: tour.meta_image,
                brochure_pdf: tour.brochure_pdf,
                price_tiers: tour.price_tiers,
                overview: parsedJsonFields.overview,
                itinerary: parsedJsonFields.itinerary,
                included: parsedJsonFields.included,
                not_included: parsedJsonFields.not_included,
                faq: parsedJsonFields.faq,
                photos: parsedJsonFields.photos,
                map: parsedJsonFields.map,
                related_tours: parsedJsonFields.related_tours,
                status: tour.status,
                updated_at: new Date().toISOString(),
            })
            .eq("slug", slug);

        if (error) {
            console.error("Error saving tour:", error);
            alert(error.message || "Could not save tour. Please try again.");
            setSaving(false);
            return;
        }

        setSaving(false);
        alert("Tour saved successfully.");

        if (tour.slug !== slug) {
            router.push(`/tour-dashboard/edit/${tour.slug}`);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/yola-admin");
    };

    if (checkingAuth || loading) {
        return (
            <div className="py-20 text-center">
                <p>Loading tour editor...</p>
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
                                    <h2 className="text-xl md:text-25 mb-2">Edit Tour</h2>
                                    <p className="mb-0">
                                        Update the main content, images, price tiers and JSON sections for this Supabase tour.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/tour-dashboard"
                                        className="btn btn-primary rounded-full px-6"
                                    >
                                        Back to Tours
                                    </Link>

                                    <Link
                                        href={
                                            tour.status === "published"
                                                ? `/tours/${tour.slug}`
                                                : `/tours/${tour.slug}?preview=true`
                                        }
                                        target="_blank"
                                        className="btn btn-primary rounded-full px-6"
                                    >
                                        {tour.status === "published" ? "View Tour" : "Preview Tour"}
                                    </Link>

                                    <a
                                        href={`/api/tours/${slug}/pdf`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-6 py-3 text-sm font-semibold text-dark-900 hover:border-primary-900"
                                    >
                                        Generate PDF
                                    </a>

                                    <button
                                        type="button"
                                        onClick={exportTourJson}
                                        className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-6 py-3 text-sm font-semibold text-dark-900 hover:border-primary-900"
                                    >
                                        Export JSON
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => importFileInputRef.current?.click()}
                                        className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-6 py-3 text-sm font-semibold text-dark-900 hover:border-primary-900"
                                    >
                                        Import JSON
                                    </button>

                                    <input
                                        ref={importFileInputRef}
                                        type="file"
                                        accept="application/json,.json"
                                        onChange={importTourJson}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            <form
                                onSubmit={handleSave}
                                className="shadow-box-3 rounded-xl py-6 px-5 bg-white"
                            >
                                <div className="grid md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Tour title
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={tour.title}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            name="slug"
                                            value={tour.slug}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
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
                                            placeholder="14 Days"
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
                                            <option value="archived">Archived</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Hero image
                                        </label>
                                        <input
                                            type="text"
                                            name="hero_image"
                                            value={tour.hero_image}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="/assets/images/inner-banner-example.jpg"
                                        />
                                        <p className="mt-2 mb-0 text-xs text-dark-800">
                                            Wide image for the tour detail page hero/banner.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Card image
                                        </label>
                                        <input
                                            type="text"
                                            name="card_image"
                                            value={tour.card_image}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="/assets/images/cards/tour-name-card.jpg"
                                        />
                                        <p className="mt-2 mb-0 text-xs text-dark-800">
                                            Used on /tour listing cards. Recommended ratio: 4:3, for example 800x600 or 1200x900.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Hero alt
                                        </label>
                                        <input
                                            type="text"
                                            name="hero_alt"
                                            value={tour.hero_alt}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Icon class
                                        </label>
                                        <input
                                            type="text"
                                            name="icon"
                                            value={tour.icon}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="fa-solid fa-location-dot"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Countries / icon label
                                        </label>
                                        <input
                                            type="text"
                                            name="icon_label"
                                            value={tour.icon_label}
                                            onChange={handleChange}
                                            className={inputClass}
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
                                            placeholder="Small group / Private"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Support label
                                        </label>
                                        <input
                                            type="text"
                                            name="support_label"
                                            value={tour.support_label}
                                            onChange={handleChange}
                                            className={inputClass}
                                            placeholder="Visa, border & route planning"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Route
                                        </label>
                                        <textarea
                                            name="route"
                                            value={tour.route}
                                            onChange={handleChange}
                                            className={textareaClass}
                                            rows="3"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Price note
                                        </label>
                                        <textarea
                                            name="price_note"
                                            value={tour.price_note}
                                            onChange={handleChange}
                                            className={textareaClass}
                                            rows="3"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <div>
                                                <h3 className="text-xl mb-1">SEO Settings</h3>
                                                <p className="mb-0 text-sm text-dark-800">
                                                    These fields control the browser title, Google description and social sharing image for this tour page.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-5">
                                            <div className="md:col-span-2">
                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                    Meta title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="meta_title"
                                                    value={tour.meta_title}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="Five Stans Central Asia Tour | Yola Rowana"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                    Meta description
                                                </label>
                                                <textarea
                                                    name="meta_description"
                                                    value={tour.meta_description}
                                                    onChange={handleChange}
                                                    className={textareaClass}
                                                    rows="3"
                                                    placeholder="Travel across Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan and Turkmenistan on a complete Central Asia itinerary."
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                    Meta image
                                                </label>
                                                <input
                                                    type="text"
                                                    name="meta_image"
                                                    value={tour.meta_image}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="/assets/images/tour-product-detail-img.jpg"
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                    Brochure PDF
                                                </label>
                                                <input
                                                    type="text"
                                                    name="brochure_pdf"
                                                    value={tour.brochure_pdf}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                    placeholder="/assets/pdf/five-stans-central-asia-tour.pdf"
                                                />
                                                <p className="mt-2 mb-0 text-xs text-dark-800">
                                                    Upload the PDF into public/assets/pdf/ and enter the path here.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <div>
                                                <h3 className="text-xl mb-1">Price Tiers</h3>
                                                <p className="mb-0 text-sm text-dark-800">
                                                    Add per-person prices by number of travelers. Leave price empty for “On request”.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={addPriceTier}
                                                className="btn btn-primary rounded-full px-6"
                                            >
                                                Add Price Tier
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            {tour.price_tiers && tour.price_tiers.length > 0 ? (
                                                tour.price_tiers.map((tier, tierIndex) => (
                                                    <div
                                                        key={tierIndex}
                                                        className="rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-4"
                                                    >
                                                        <div className="grid md:grid-cols-[1fr_1fr_auto_auto] gap-4 items-end">
                                                            <div>
                                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                                    Travelers
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={tier.travelers || ""}
                                                                    onChange={event =>
                                                                        handlePriceTierChange(
                                                                            tierIndex,
                                                                            "travelers",
                                                                            event.target.value
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                    placeholder="2 travelers"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                                    Price per person
                                                                </label>
                                                                <input
                                                                    type="number"
                                                                    value={tier.price ?? ""}
                                                                    onChange={event =>
                                                                        handlePriceTierChange(
                                                                            tierIndex,
                                                                            "price",
                                                                            event.target.value
                                                                        )
                                                                    }
                                                                    className={inputClass}
                                                                    placeholder="2450"
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                                    Default
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleDefaultPriceTier(tierIndex)
                                                                    }
                                                                    className={`rounded-full px-5 py-3 text-sm font-semibold border transition-all ${
                                                                        tier.default
                                                                            ? "bg-primary-900 text-white border-primary-900"
                                                                            : "bg-white text-dark-900 border-[#E2CFAF] hover:border-primary-900"
                                                                    }`}
                                                                >
                                                                    {tier.default ? "Default" : "Set Default"}
                                                                </button>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                                    Action
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        removePriceTier(tierIndex)
                                                                    }
                                                                    className="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-200"
                                                                >
                                                                    Remove
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-5">
                                                    <p className="mb-0 text-sm text-dark-800">
                                                        No price tiers yet. Click “Add Price Tier” to create one.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {jsonFieldConfig.map(field => (
                                        <div className="md:col-span-2" key={field.key}>
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                                <div>
                                                    <h3 className="text-xl mb-1">{field.title}</h3>
                                                    <p className="mb-0 text-sm text-dark-800">
                                                        {field.help}
                                                    </p>
                                                </div>
                                            </div>

                                            <textarea
                                                value={jsonText[field.key]}
                                                onChange={event =>
                                                    handleJsonChange(field.key, event.target.value)
                                                }
                                                className="w-full rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] px-4 py-4 font-mono text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-y"
                                                style={{ minHeight: field.minHeight }}
                                                spellCheck="false"
                                            />

                                            <p className="mt-2 mb-0 text-xs text-dark-800">
                                                Tip: keep the main square brackets [ ]. Save only valid JSON.
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 flex flex-wrap gap-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="btn btn-primary rounded-full px-8"
                                    >
                                        {saving ? "Saving..." : "Save Tour"}
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
                                    This editor updates Supabase tour fields, including card image, hero image, SEO, PDF, prices and JSON content sections.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}