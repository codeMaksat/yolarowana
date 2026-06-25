import Head from "next/head";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail } from "@/component/Sections/Page-tour-detail";
import { Head_Meta, useFetchData } from "@/component/comman";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/utils/supabaseClient";
import { supabase as serverSupabase } from "../../lib/supabaseClient";

function formatTourForPage(data) {
    if (!data) {
        return {
            heroData: [],
            tourData: [],
        };
    }

    const formattedHeroData = [
        {
            title: data?.title || "Tour",
            image: data?.hero_image || "/assets/images/tour-product-detail-img.jpg",
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
            image: data?.hero_image || "/assets/images/tour-product-detail-img.jpg",
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

    return {
        heroData: formattedHeroData,
        tourData: formattedTourData,
    };
}

function buildSeoMeta(tourData, seoData) {
    const tour = tourData?.[0];

    return {
        title:
            tour?.meta_title ||
            tour?.title ||
            seoData?.tour_five_stans_meta?.title ||
            "Tour",
        description:
            tour?.meta_description ||
            seoData?.tour_five_stans_meta?.description ||
            "",
        image:
            tour?.meta_image ||
            tour?.image ||
            seoData?.tour_five_stans_meta?.image ||
            "",
    };
}

export default function DynamicTourPage({ initialTour = null }) {
    const router = useRouter();
    const { slug, preview } = router.query;

    const initialFormattedData = useMemo(
        () => formatTourForPage(initialTour),
        [initialTour]
    );

    const [tourData, setTourData] = useState(initialFormattedData.tourData);
    const [heroData, setHeroData] = useState(initialFormattedData.heroData);
    const [loading, setLoading] = useState(!initialTour);
    const [tourError, setTourError] = useState("");

    const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

    useEffect(() => {
        console.log("CLIENT TOUR DETAIL: initialTour exists:", Boolean(initialTour));

        if (initialTour) {
            console.log(
                "CLIENT TOUR DETAIL: server/static tour already loaded:",
                initialTour.title
            );
        } else {
            console.log("CLIENT TOUR DETAIL: no initialTour, browser fallback may run");
        }
    }, [initialTour]);

    useEffect(() => {
        if (!router.isReady || !slug) return;

        const shouldUseStaticData =
            initialTour &&
            initialTour.slug === slug &&
            preview !== "true";

        if (shouldUseStaticData) {
            console.log(
                "CLIENT TOUR DETAIL: fallback skipped, using server/static data:",
                initialTour.title
            );

            setTourData(initialFormattedData.tourData);
            setHeroData(initialFormattedData.heroData);
            setLoading(false);
            setTourError("");
            return;
        }

        console.log("CLIENT TOUR DETAIL: browser fallback running for:", slug);

        const fetchTourClientSide = async () => {
            setLoading(true);
            setTourError("");

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto",
            });

            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            let query = supabase.from("tours").select("*").eq("slug", slug);

            if (preview !== "true") {
                query = query.eq("status", "published");
            }

            const { data, error } = await query.single();

            if (error) {
                console.error("Client-side tour fallback error:", error);
                setTourError("Tour not found or not published.");
                setTourData([]);
                setHeroData([]);
                setLoading(false);
                return;
            }

            console.log("CLIENT TOUR DETAIL: fallback loaded tour:", data?.title);

            const formattedData = formatTourForPage(data);

            setHeroData(formattedData.heroData);
            setTourData(formattedData.tourData);
            setLoading(false);
        };

        fetchTourClientSide();
    }, [router.isReady, slug, preview, initialTour, initialFormattedData]);

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

    const seoMeta = buildSeoMeta(tourData, seo_data);

    if (loading) {
        return (
            <>
                <Head>
                    <title>{seoMeta.title}</title>
                    <meta name="description" content={seoMeta.description} />
                </Head>

                <div className="py-20 text-center">
                    <p>Loading tour...</p>
                </div>
            </>
        );
    }

    if (tourError || !tourData.length) {
        return (
            <>
                <Head>
                    <title>Tour not found</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>

                <div className="py-20 text-center">
                    <h2>Tour not found</h2>
                    <p>{tourError || "This tour is not available at the moment."}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{seoMeta.title}</title>
                <meta name="description" content={seoMeta.description} />

                <meta property="og:title" content={seoMeta.title} />
                <meta property="og:description" content={seoMeta.description} />
                {seoMeta.image && (
                    <meta property="og:image" content={seoMeta.image} />
                )}

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoMeta.title} />
                <meta name="twitter:description" content={seoMeta.description} />
                {seoMeta.image && (
                    <meta name="twitter:image" content={seoMeta.image} />
                )}
            </Head>

            {seo_data && (
                <Head_Meta
                    meta_data={seoMeta}
                    comman_meta={seo_data}
                />
            )}

            <Comman_Hero initialValues={heroData} />
            <All_Tour_Detail initialValues={tourData} />
        </>
    );
}

export async function getStaticPaths() {
    try {
        console.log("SERVER TOUR DETAIL: loading published tour paths");

        const { data, error } = await serverSupabase
            .from("tours")
            .select("slug")
            .eq("status", "published");

        if (error) {
            console.error("Error loading tour paths:", error.message);

            return {
                paths: [],
                fallback: "blocking",
            };
        }

        console.log(
            "SERVER TOUR DETAIL: published paths count:",
            Array.isArray(data) ? data.length : 0
        );

        return {
            paths: (data || []).map((tour) => ({
                params: {
                    slug: tour.slug,
                },
            })),
            fallback: "blocking",
        };
    } catch (error) {
        console.error("getStaticPaths failed:", error);

        return {
            paths: [],
            fallback: "blocking",
        };
    }
}

export async function getStaticProps({ params }) {
    const slug = params?.slug || "";

    console.log("SERVER TOUR DETAIL: loading tour for SEO:", slug);

    if (!slug) {
        return {
            props: {
                initialTour: null,
            },
            revalidate: 10,
        };
    }

    try {
        const { data, error } = await serverSupabase
            .from("tours")
            .select("*")
            .eq("slug", slug)
            .eq("status", "published")
            .single();

        if (error || !data) {
            console.error(
                "SERVER TOUR DETAIL: fetch failed or not published:",
                error?.message
            );

            return {
                props: {
                    initialTour: null,
                },
                revalidate: 10,
            };
        }

        console.log("SERVER TOUR DETAIL: loaded tour for SEO:", data.title);

        return {
            props: {
                initialTour: data,
            },
            revalidate: 60,
        };
    } catch (error) {
        console.error("getStaticProps tour fetch failed:", error);

        return {
            props: {
                initialTour: null,
            },
            revalidate: 10,
        };
    }
}