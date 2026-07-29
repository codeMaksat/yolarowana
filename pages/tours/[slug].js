import { Comman_Hero } from "@/component/Sections/Page-commen";
import { All_Tour_Detail } from "@/component/Sections/Page-tour-detail";
import { Head_Meta } from "@/component/comman";
import React, { useEffect, useMemo } from "react";
import siteMetaData from "../../public/json/data/site_meta_link.json";

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
    const tourTitle = tour?.title || "Central Asia Tour";

    const fallbackDescription = tour?.route
        ? `Explore ${tourTitle} with Belet Travel. Follow the route ${tour.route}${
              tour?.duration ? ` over ${tour.duration}` : ""
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

export default function DynamicTourPage({ initialTour }) {
    const { heroData, tourData } = useMemo(
        () => formatTourForPage(initialTour),
        [initialTour]
    );

    useEffect(() => {
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
    }, [initialTour?.slug]);

    const seoMeta = buildSeoMeta(tourData, siteMetaData);

    return (
        <>
            <Head_Meta
                meta_data={seoMeta}
                comman_meta={siteMetaData}
            />

            <Comman_Hero initialValues={heroData} />
            <All_Tour_Detail initialValues={tourData} />
        </>
    );
}

export async function getServerSideProps({ params, query }) {
    const slug = String(params?.slug || "").trim();
    const isPreview = query?.preview === "true";

    if (!slug) {
        return {
            notFound: true,
        };
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error("TOUR SSR: Missing Supabase environment variables.", {
            hasUrl: Boolean(supabaseUrl),
            hasAnonKey: Boolean(supabaseAnonKey),
        });

        throw new Error("Missing Supabase environment variables.");
    }

    const filters = [
        `slug=eq.${encodeURIComponent(slug)}`,
        "select=*",
        "limit=1",
    ];

    if (!isPreview) {
        filters.push("status=eq.published");
    }

    const endpoint = `${supabaseUrl}/rest/v1/tours?${filters.join("&")}`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                apikey: supabaseAnonKey,
                Authorization: `Bearer ${supabaseAnonKey}`,
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            const errorText = await response.text();

            console.error("TOUR SSR: Supabase REST request failed.", {
                status: response.status,
                body: errorText,
            });

            throw new Error(
                `Supabase REST request failed with status ${response.status}.`
            );
        }

        const data = await response.json();
        const tour = Array.isArray(data) ? data[0] : null;

        if (!tour) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                initialTour: tour,
            },
        };
    } catch (error) {
        console.error("TOUR SSR: Tour request failed.", error);

        throw error;
    }
}