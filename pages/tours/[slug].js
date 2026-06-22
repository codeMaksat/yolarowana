import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail } from "@/component/Sections/Page-tour-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";

export default function DynamicTourPage() {
    const router = useRouter();
    const { slug, preview } = router.query;

    const [tourData, setTourData] = useState([]);
    const [heroData, setHeroData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tourError, setTourError] = useState("");

    const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

    useEffect(() => {
        if (!slug) return;

        const fetchTour = async () => {
            setLoading(true);
            setTourError("");

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            let query = supabase
                .from("tours")
                .select("*")
                .eq("slug", slug);

            if (preview !== "true") {
                query = query.eq("status", "published");
            }

            const { data, error } = await query.single();

            if (error) {
                console.error("Error fetching tour:", error);
                setTourError("Tour not found or not published.");
                setTourData([]);
                setHeroData([]);
                setLoading(false);
                return;
            }

            const formattedHeroData = [
                {
                    title: data?.title || "Tour",
                    image:
                        data?.hero_image || "/assets/images/tour-product-detail-img.jpg",
                    alt: data?.hero_alt || data?.title || "Tour",
                    home_label: "Home",
                    home_slug: "/",
                },
            ];

            const formattedTourData = [
                {
                    title: data?.title || "Tour",
                    meta_title: data?.meta_title || "",
                    meta_description: data?.meta_description || "",
                    meta_image: data?.meta_image || "",
                    icon: data?.icon || "fa-solid fa-location-dot",
                    icon_label: data?.icon_label || data?.route || "",
                    image:
                        data?.hero_image || "/assets/images/tour-product-detail-img.jpg",
                    alt: data?.hero_alt || data?.title || "Tour",

                    detail: [
                        {
                            title: data?.title || "Tour",
                            rating: 5,
                            review: 24,
                            service: [
                                {
                                    image: "/assets/images/clock-icon.svg",
                                    alt: "clock-icon",
                                    width: 20,
                                    title: "Duration:",
                                    label: data?.duration || "-",
                                },
                                {
                                    image: "/assets/images/group-user-icon.svg",
                                    alt: "group-user-icon",
                                    width: 22,
                                    title: "Travel style:",
                                    label: data?.travel_style || "-",
                                },
                                {
                                    image: "/assets/images/train-icon.svg",
                                    alt: "train-icon",
                                    width: 24,
                                    title: "Route:",
                                    label: data?.route || "-",
                                },
                                {
                                    image: "/assets/images/cross_duotone-icon.svg",
                                    alt: "cross-duotone-icon",
                                    width: 24,
                                    title: "Support:",
                                    label: data?.support_label || "-",
                                },
                            ],
                            overview: Array.isArray(data?.overview) ? data.overview : [],
                            included: Array.isArray(data?.included) ? data.included : [],
                            not_included: Array.isArray(data?.not_included)
                                ? data.not_included
                                : [],
                        },
                    ],

                    photo: Array.isArray(data?.photos) ? data.photos : [],
                    itinerary: Array.isArray(data?.itinerary) ? data.itinerary : [],
                    map: Array.isArray(data?.map) ? data.map : [],
                    faq: Array.isArray(data?.faq) ? data.faq : [],

                    side_bar: [
                        {
                            title: "Plan This Tour",
                            tour_name: data?.title || "Tour Inquiry",
                            brochure_pdf: data?.brochure_pdf || "",
                            total_title: "Estimated From",
                            price_tiers: Array.isArray(data?.price_tiers)
                                ? data.price_tiers
                                : [],
                            price_note: data?.price_note || "",
                            product: Array.isArray(data?.related_tours)
                                ? data.related_tours
                                : [],
                        },
                    ],

                    reviews: Array.isArray(data?.reviews) ? data.reviews : [],
                },
            ];

            setHeroData(formattedHeroData);
            setTourData(formattedTourData);
            setLoading(false);
        };

        fetchTour();
    }, [slug, preview]);

    useEffect(() => {
    if (loading || tourError || !tourData.length) return;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "auto",
        });

        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    requestAnimationFrame(scrollToTop);

    const timerOne = setTimeout(scrollToTop, 100);
    const timerTwo = setTimeout(scrollToTop, 500);

    return () => {
        clearTimeout(timerOne);
        clearTimeout(timerTwo);
    };
}, [loading, tourError, tourData.length, slug]);

    if (loading) {
        return (
            <div className="py-20 text-center">
                <p>Loading tour...</p>
            </div>
        );
    }

    if (tourError || !tourData.length) {
        return (
            <div className="py-20 text-center">
                <h2>Tour not found</h2>
                <p>{tourError || "This tour is not available at the moment."}</p>
            </div>
        );
    }

    return (
        <>
            {seo_data && tourData?.[0] && (
                <Head_Meta
                    meta_data={{
                        title:
                            tourData[0]?.meta_title ||
                            tourData[0]?.title ||
                            seo_data?.tour_five_stans_meta?.title ||
                            "Tour",
                        description:
                            tourData[0]?.meta_description ||
                            seo_data?.tour_five_stans_meta?.description ||
                            "",
                        image:
                            tourData[0]?.meta_image ||
                            tourData[0]?.image ||
                            seo_data?.tour_five_stans_meta?.image ||
                            "",
                    }}
                    comman_meta={seo_data}
                />
            )}

            <Comman_Hero initialValues={heroData} />
            <All_Tour_Detail initialValues={tourData} />
        </>
    );
}