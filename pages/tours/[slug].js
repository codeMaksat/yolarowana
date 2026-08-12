import Head from "next/head";
import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail } from "@/component/Sections/Page-tour-detail";
import { Head_Meta } from "@/component/comman";
import React, { useEffect, useMemo, useState } from "react";
import siteMetaData from "../../public/json/data/site_meta_link.json";
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
            route: data?.route || "",
            duration: data?.duration || "",
            icon: data?.icon || "fa-solid fa-location-dot",
            icon_label: data?.icon_label || data?.route || "",
            image: data?.hero_image || "/assets/images/tour-product-detail-img.jpg",
            alt: data?.hero_alt || data?.title || "Tour",

            detail: [
                {
                    title: data?.title || "Tour",
                    rating: data?.rating ?? null,
                    review: data?.review_count ?? null,
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
    const tourTitle = tour?.title || "Central Asia Tour";

    const fallbackDescription = tour?.route
        ? `Explore ${tourTitle} with Belet Travel. Follow the route ${tour.route}${tour?.duration ? ` over ${tour.duration}` : ""
        } on a locally planned Central Asia journey.`
        : `Explore ${tourTitle} with Belet Travel on a locally planned Central Asia journey.`;

    return {
        title:
            tour?.meta_title ||
            `${tourTitle} | Belet Travel`,
        og_title:
            tour?.meta_title ||
            `${tourTitle} | Belet Travel`,
        description:
            tour?.meta_description ||
            fallbackDescription,
        image:
            tour?.meta_image ||
            tour?.image ||
            seoData?.home_meta?.image ||
            "",
        image_alt:
            tour?.alt ||
            `${tourTitle} with Belet Travel`,
        twitter_title:
            tour?.meta_title ||
            `${tourTitle} | Belet Travel`,
        twitter_description:
            tour?.meta_description ||
            fallbackDescription,
        twitter_image:
            tour?.meta_image ||
            tour?.image ||
            seoData?.home_meta?.image ||
            "",
        twitter_card: "summary_large_image",
    };
}

function buildTourBreadcrumbSchema(tour, slug, siteUrl) {
    if (!tour?.title || !slug) return null;

    const cleanSiteUrl = String(siteUrl || "https://belettravel.com").replace(
        /\/$/,
        ""
    );

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${cleanSiteUrl}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Tours",
                item: `${cleanSiteUrl}/tour`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: tour.title,
                item: `${cleanSiteUrl}/tours/${slug}`,
            },
        ],
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

    useEffect(() => {

        if (initialTour) {
            console.log(
                "CLIENT TOUR DETAIL: server/static tour already loaded:",
                initialTour.title
            );
        } else {

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

    const seoMeta = buildSeoMeta(tourData, siteMetaData);

    const currentTour = tourData?.[0];
    const currentSlug = initialTour?.slug || slug || "";
    const breadcrumbSchema = buildTourBreadcrumbSchema(
        currentTour,
        currentSlug,
        siteMetaData.http_url
    );

    if (loading) {
        return (
            <>
                <Head>
                    {preview === "true" && (
                        <meta name="robots" content="noindex, nofollow" />
                    )}
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
            <Head_Meta
                meta_data={seoMeta}
                comman_meta={siteMetaData}
                structuredData={
                    breadcrumbSchema ? [breadcrumbSchema] : []
                }
            />

            <Comman_Hero initialValues={heroData} />
            <All_Tour_Detail initialValues={tourData} />
        </>
    );
}

export async function getStaticPaths() {
    try {

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


        return {
            props: {
                initialTour: data,
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error("getStaticProps tour fetch failed:", error);

        return {
            props: {
                initialTour: null,
            },
            revalidate: 60,
        };
    }
}