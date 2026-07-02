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
    card_description: "",
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
    is_featured: false,
    home_order: 999,
    tour_order: 999,
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
];

function normalizeOrderNumber(value) {
    if (value === "" || value === null || value === undefined) return 999;

    const numberValue = Number(value);

    return Number.isFinite(numberValue) ? numberValue : 999;
}

function normalizeTour(data = {}) {
    return {
        title: data.title || "",
        slug: data.slug || "",
        hero_image: data.hero_image || "",
        card_image: data.card_image || "",
        card_description: data.card_description || "",
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
        is_featured: data.is_featured === true,
        home_order: data.home_order ?? 999,
        tour_order: data.tour_order ?? 999,
        status: data.status || "draft",
    };
}

function buildJsonText(tourData) {
    const jsonText = {};

    jsonFieldConfig.forEach((field) => {
        jsonText[field.key] = JSON.stringify(
            Array.isArray(tourData[field.key]) ? tourData[field.key] : [],
            null,
            2
        );
    });

    return jsonText;
}

function getStartingPrice(priceTiers = []) {
    if (!Array.isArray(priceTiers) || priceTiers.length === 0) return "";

    const defaultTier = priceTiers.find(
        (tier) => tier.default === true && tier.price
    );

    const firstTierWithPrice = priceTiers.find((tier) => tier.price);

    return defaultTier?.price || firstTierWithPrice?.price || "";
}

function getRelatedTourImage(tour) {
    const firstGalleryImage = tour?.photos?.[0]?.images?.[0]?.image || "";

    return (
        tour.card_image ||
        firstGalleryImage ||
        tour.hero_image ||
        tour.meta_image ||
        "/assets/images/blog-img1.jpg"
    );
}

function getSlugFromRelatedValue(value = "") {
    return String(value)
        .replace(/^https?:\/\/[^/]+/i, "")
        .replace(/^\/tours\//, "")
        .replace(/^tours\//, "")
        .replace(/^\//, "")
        .trim();
}

function buildRelatedTourCard(selectedTour) {
    const image = getRelatedTourImage(selectedTour);

    return {
        alt: selectedTour.hero_alt || selectedTour.title || "",
        slug: `/tours/${selectedTour.slug}`,
        image,
        price: getStartingPrice(selectedTour.price_tiers),
        title: selectedTour.title || "",
        btn_label: "View Tour",
    };
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
    const [allTours, setAllTours] = useState([]);
    const [selectedRelatedSlug, setSelectedRelatedSlug] = useState("");

    const importFileInputRef = useRef(null);
    const imageImportFileInputRef = useRef(null);

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
        if (checkingAuth) return;

        const fetchAllTours = async () => {
            const { data, error } = await supabase
                .from("tours")
                .select(
                    "title, slug, hero_image, card_image, hero_alt, meta_image, price_tiers, photos, status, tour_order, created_at"
                )
                .eq("status", "published")
                .order("tour_order", { ascending: true })
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error loading tours for related dropdown:", error);
                setAllTours([]);
                return;
            }

            setAllTours(data || []);
        };

        fetchAllTours();
    }, [checkingAuth]);

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

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        let finalValue = value;

        if (type === "checkbox") {
            finalValue = checked;
        }

        if (name === "home_order" || name === "tour_order") {
            finalValue = value === "" ? "" : Number(value);
        }

        setTour((prevTour) => ({
            ...prevTour,
            [name]: finalValue,
        }));
    };

    const handleJsonChange = (key, value) => {
        setJsonText((prev) => ({
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
        setTour((prevTour) => {
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

    const handleDefaultPriceTier = (tierIndex) => {
        setTour((prevTour) => {
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
        setTour((prevTour) => ({
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

    const removePriceTier = (tierIndex) => {
        const confirmRemove = window.confirm("Remove this price tier?");

        if (!confirmRemove) return;

        setTour((prevTour) => ({
            ...prevTour,
            price_tiers: prevTour.price_tiers.filter(
                (_, index) => index !== tierIndex
            ),
        }));
    };

    const availableRelatedTours = allTours.filter((item) => {
        if (!item?.slug) return false;
        if (item.slug === tour.slug) return false;

        const alreadySelected = tour.related_tours.some(
            (relatedTour) => getSlugFromRelatedValue(relatedTour.slug) === item.slug
        );

        return !alreadySelected;
    });

    const handleAddRelatedTour = () => {
        if (!selectedRelatedSlug) {
            alert("Please select a tour first.");
            return;
        }

        const selectedTour = allTours.find(
            (item) => item.slug === selectedRelatedSlug
        );

        if (!selectedTour) {
            alert("Selected tour was not found.");
            return;
        }

        if (selectedTour.slug === tour.slug) {
            alert("You cannot add the current tour as a related tour.");
            return;
        }

        const alreadySelected = tour.related_tours.some(
            (relatedTour) =>
                getSlugFromRelatedValue(relatedTour.slug) === selectedTour.slug
        );

        if (alreadySelected) {
            alert("This tour is already added.");
            return;
        }

        const newRelatedTour = buildRelatedTourCard(selectedTour);

        setTour((prevTour) => ({
            ...prevTour,
            related_tours: [...prevTour.related_tours, newRelatedTour],
        }));

        setSelectedRelatedSlug("");
    };

    const handleRemoveRelatedTour = (relatedIndex) => {
        setTour((prevTour) => ({
            ...prevTour,
            related_tours: prevTour.related_tours.filter(
                (_, index) => index !== relatedIndex
            ),
        }));
    };

    const handleMoveRelatedTour = (relatedIndex, direction) => {
        setTour((prevTour) => {
            const updatedRelatedTours = [...prevTour.related_tours];
            const targetIndex = relatedIndex + direction;

            if (
                targetIndex < 0 ||
                targetIndex >= updatedRelatedTours.length
            ) {
                return prevTour;
            }

            const currentItem = updatedRelatedTours[relatedIndex];
            updatedRelatedTours[relatedIndex] = updatedRelatedTours[targetIndex];
            updatedRelatedTours[targetIndex] = currentItem;

            return {
                ...prevTour,
                related_tours: updatedRelatedTours,
            };
        });
    };

    const exportTourJson = () => {
        const parsedJsonFields = parseJsonFields();

        if (!parsedJsonFields) return;

        const exportData = {
            title: tour.title,
            slug: tour.slug,
            hero_image: tour.hero_image,
            card_image: tour.card_image,
            card_description: tour.card_description,
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
            related_tours: tour.related_tours,
            is_featured: tour.is_featured,
            home_order: normalizeOrderNumber(tour.home_order),
            tour_order: normalizeOrderNumber(tour.tour_order),
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

    const importTourJson = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (loadEvent) => {
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

    const importImageFieldsFile = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (loadEvent) => {
            try {
                const importedData = JSON.parse(loadEvent.target.result);

                if (
                    !importedData ||
                    typeof importedData !== "object" ||
                    Array.isArray(importedData)
                ) {
                    alert("Image JSON must be an object.");
                    event.target.value = "";
                    return;
                }

                const hasImageFields =
                    typeof importedData.hero_image === "string" ||
                    typeof importedData.card_image === "string" ||
                    typeof importedData.meta_image === "string" ||
                    Array.isArray(importedData.photos);

                if (!hasImageFields) {
                    alert(
                        "This JSON does not contain hero_image, card_image, meta_image or photos."
                    );
                    event.target.value = "";
                    return;
                }

                const nextHeroImage =
                    typeof importedData.hero_image === "string"
                        ? importedData.hero_image
                        : tour.hero_image;

                const nextCardImage =
                    typeof importedData.card_image === "string"
                        ? importedData.card_image
                        : tour.card_image;

                const nextMetaImage =
                    typeof importedData.meta_image === "string"
                        ? importedData.meta_image
                        : nextHeroImage || tour.meta_image;

                const nextPhotos = Array.isArray(importedData.photos)
                    ? importedData.photos
                    : null;

                setTour((prevTour) => ({
                    ...prevTour,
                    hero_image: nextHeroImage,
                    card_image: nextCardImage,
                    meta_image: nextMetaImage,
                    photos: nextPhotos || prevTour.photos,
                }));

                if (nextPhotos) {
                    setJsonText((prevJsonText) => ({
                        ...prevJsonText,
                        photos: JSON.stringify(nextPhotos, null, 2),
                    }));
                }

                alert(
                    "Image JSON file imported. Please review hero image, card image, meta image and photos, then click Save Tour."
                );
            } catch (error) {
                console.error("Image JSON file import error:", error);
                alert("Invalid image JSON file. Please check the file.");
            }

            event.target.value = "";
        };

        reader.readAsText(file);
    };

    const handleSave = async (event) => {
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
                card_description: tour.card_description,
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
                related_tours: tour.related_tours,
                is_featured: tour.is_featured === true,
                home_order: normalizeOrderNumber(tour.home_order),
                tour_order: normalizeOrderNumber(tour.tour_order),
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
                                        Update the tour content, homepage visibility, page order, related tours and SEO.
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

                                    <div className="md:col-span-2 rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-5">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <h3 className="text-xl mb-1">Import Image JSON</h3>
                                                <p className="mb-0 text-sm text-dark-800">
                                                    Choose the generated image JSON file. It will fill Hero image, Card image, Meta image and Photos only.
                                                </p>
                                                <p className="mt-2 mb-0 text-xs text-dark-800">
                                                    After importing, review the fields and click Save Tour.
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => imageImportFileInputRef.current?.click()}
                                                className="btn btn-primary rounded-full px-6"
                                            >
                                                Choose Image JSON File
                                            </button>

                                            <input
                                                ref={imageImportFileInputRef}
                                                type="file"
                                                accept="application/json,.json"
                                                onChange={importImageFieldsFile}
                                                className="hidden"
                                            />
                                        </div>
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
                                            Used on homepage and /tour cards. Recommended ratio: 4:3.
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                            Card description
                                        </label>
                                        <textarea
                                            name="card_description"
                                            value={tour.card_description}
                                            onChange={handleChange}
                                            className={textareaClass}
                                            rows="3"
                                            placeholder="Short marketing text for homepage and /tour cards."
                                        />
                                        <p className="mt-2 mb-0 text-xs text-dark-800">
                                            Used on homepage and /tour listing cards. Keep this attractive, short and experience-focused.
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
                                                                    onChange={(event) =>
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
                                                                    onChange={(event) =>
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
                                                                    className={`rounded-full px-5 py-3 text-sm font-semibold border transition-all ${tier.default
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

                                    <div className="md:col-span-2">
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <div>
                                                <h3 className="text-xl mb-1">Related Tours</h3>
                                                <p className="mb-0 text-sm text-dark-800">
                                                    Choose sidebar suggested tours from the dropdown. The title, price, image and link are filled automatically.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="rounded-2xl border border-[#E2CFAF] bg-[#FAF7F2] p-5">
                                            <div className="grid md:grid-cols-[1fr_auto] gap-4 items-end">
                                                <div>
                                                    <label className="text-sm font-semibold text-dark-900 mb-2 block">
                                                        Select related tour
                                                    </label>
                                                    <select
                                                        value={selectedRelatedSlug}
                                                        onChange={(event) =>
                                                            setSelectedRelatedSlug(event.target.value)
                                                        }
                                                        className={selectClass}
                                                    >
                                                        <option value="">Choose a tour</option>
                                                        {availableRelatedTours.map((item) => (
                                                            <option key={item.slug} value={item.slug}>
                                                                {item.title}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={handleAddRelatedTour}
                                                    className="btn btn-primary rounded-full px-6"
                                                >
                                                    Add Related Tour
                                                </button>
                                            </div>

                                            <div className="mt-5 space-y-3">
                                                {tour.related_tours && tour.related_tours.length > 0 ? (
                                                    tour.related_tours.map((relatedTour, relatedIndex) => (
                                                        <div
                                                            key={`${relatedTour.slug}-${relatedIndex}`}
                                                            className="rounded-2xl bg-white border border-[#E2CFAF] p-4"
                                                        >
                                                            <div className="grid md:grid-cols-[80px_1fr_auto] gap-4 items-center">
                                                                <div className="h-[60px] w-[80px] rounded-xl overflow-hidden bg-[#FAF7F2]">
                                                                    <img
                                                                        src={
                                                                            relatedTour.image ||
                                                                            "/assets/images/blog-img1.jpg"
                                                                        }
                                                                        alt={
                                                                            relatedTour.alt ||
                                                                            relatedTour.title ||
                                                                            "Related tour"
                                                                        }
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <h4 className="mb-1 text-base">
                                                                        {relatedTour.title}
                                                                    </h4>
                                                                    <p className="mb-0 text-sm text-dark-800">
                                                                        {relatedTour.slug}
                                                                    </p>
                                                                    <p className="mb-0 text-sm text-dark-800">
                                                                        Price:{" "}
                                                                        {relatedTour.price
                                                                            ? `$${relatedTour.price}`
                                                                            : "On request"}
                                                                    </p>
                                                                </div>

                                                                <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleMoveRelatedTour(
                                                                                relatedIndex,
                                                                                -1
                                                                            )
                                                                        }
                                                                        disabled={relatedIndex === 0}
                                                                        className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2 text-sm font-semibold text-dark-900 disabled:opacity-40"
                                                                    >
                                                                        Up
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleMoveRelatedTour(
                                                                                relatedIndex,
                                                                                1
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            relatedIndex ===
                                                                            tour.related_tours.length - 1
                                                                        }
                                                                        className="rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2 text-sm font-semibold text-dark-900 disabled:opacity-40"
                                                                    >
                                                                        Down
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleRemoveRelatedTour(
                                                                                relatedIndex
                                                                            )
                                                                        }
                                                                        className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200"
                                                                    >
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="mb-0 text-sm text-dark-800">
                                                        No related tours selected yet.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {jsonFieldConfig.map((field) => (
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
                                                onChange={(event) =>
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
                                    Homepage tours are controlled by Featured tour and Homepage order. The /tour page is controlled by /tour page order. Sidebar suggestions are controlled by Related Tours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}