import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/utils/analytics";
import Itinerary_Sector from "./itinerary_sector";
import Faq_Sector from "./faq_sector";
import Map_Sector from "./map_sector";
import Photos_Sector from "./photos_sector";
import Side_Bar from "./side_bar";
import Detail_Sector from "./detail_sector";
import Booking_Confidence from "./booking_confidence";

const Included_Excluded_Sector = ({ detail_data }) => {
  return (
    detail_data &&
    detail_data.map((data, index) => {
      return (
        <div
          id="included"
          className="mb-10 scroll-mt-[160px]"
          key={index}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {data.included &&
              data.included.map((included_data, index) => {
                return (
                  <div
                    className="border border-primary-800 rounded-2xl p-5 bg-white"
                    key={index}
                  >
                    <h4 className="text-xl mb-4">
                      {included_data.title}
                    </h4>
                    <ul className="leading-[32px] list">
                      {included_data.details &&
                        included_data.details.map((details_data, index) => {
                          return <li key={index}>{details_data.label}</li>;
                        })}
                    </ul>
                  </div>
                );
              })}

            {data.not_included &&
              data.not_included.map((not_included_data, index) => {
                return (
                  <div
                    className="border border-primary-800 rounded-2xl p-5 bg-white"
                    key={index}
                  >
                    <h4 className="text-xl mb-4">
                      {not_included_data.title}
                    </h4>
                    <ul className="leading-[32px] list">
                      {not_included_data.details &&
                        not_included_data.details.map((details_data, index) => {
                          return <li key={index}>{details_data.label}</li>;
                        })}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      );
    })
  );
};

const Related_Tours_Sector = ({ tours }) => {
  if (!tours || tours.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
        <div>
          <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-900">
            Continue Exploring
          </span>
          <h3 className="text-2xl md:text-3xl mb-2">
            You May Also Like
          </h3>
          <p className="text-dark-800 mb-0 max-w-[650px]">
            Explore more journeys across Turkmenistan and Central Asia planned by our local team.
          </p>
        </div>

        <Link
          href="/tour"
          className="inline-flex items-center text-sm font-semibold text-primary-900 shrink-0"
        >
          View All Tours
          <i className="fa-regular fa-arrow-right ml-2"></i>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tours.slice(0, 3).map((tour, index) => (
          <article
            key={tour.slug || tour.title || index}
            className="group overflow-hidden rounded-2xl border border-[#E2CFAF] bg-white"
          >
            <Link
              href={tour.slug}
              className="relative block h-[230px] overflow-hidden"
            >
              <img
                src={tour.image}
                alt={tour.alt || tour.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent"></div>

              {tour.price && (
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-dark-900">
                    From ${Number(tour.price).toLocaleString()}
                  </span>
                </div>
              )}
            </Link>

            <div className="p-5">
              <h4 className="text-lg md:text-xl mb-3">
                <Link
                  href={tour.slug}
                  className="text-dark-900 hover:text-primary-900 transition-colors"
                >
                  {tour.title}
                </Link>
              </h4>

              <Link
                href={tour.slug}
                className="inline-flex items-center text-sm font-semibold text-primary-900"
              >
                {tour.btn_label || "View Tour"}
                <i className="fa-regular fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

const All_Tour_Detail = ({ initialValues }) => {
  const [activeSection, setActiveSection] = useState("detail");
  const [isInquiryVisible, setIsInquiryVisible] = useState(false);
  const menuRef = useRef(null);
  const trackedTourRef = useRef("");

  const currentTour =
    initialValues?.[0] || null;

  const menuItems = [
    { id: "detail", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "included", label: "Included" },
    { id: "map", label: "Map" },
    { id: "booking", label: "Booking" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "detail";

      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (section) {
          const sectionTop = section.offsetTop - 180;
          if (window.scrollY >= sectionTop) currentSection = item.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    const activeMenuItem = menuRef.current.querySelector(
      `[data-menu-id="${activeSection}"]`
    );

    if (activeMenuItem) {
      activeMenuItem.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeSection]);

  useEffect(() => {
    const inquiry = document.getElementById("tour-inquiry");
    if (!inquiry) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInquiryVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(inquiry);
    return () => observer.disconnect();
  }, [initialValues]);

  useEffect(() => {
    if (!currentTour?.title) {
      return;
    }

    if (
      trackedTourRef.current ===
      currentTour.title
    ) {
      return;
    }

    trackEvent("tour_view", {
      tour_name: currentTour.title,
      tour_route:
        currentTour.icon_label || "",
    });

    trackedTourRef.current =
      currentTour.title;
  }, [
    currentTour?.title,
    currentTour?.icon_label,
  ]);

  const scrollToInquiry = (
    ctaLocation = "unknown"
  ) => {
    trackEvent(
      "check_availability_click",
      {
        tour_name:
          currentTour?.title || "",
        cta_location:
          ctaLocation,
      }
    );

    const inquiry =
      document.getElementById(
        "tour-inquiry"
      );

    if (!inquiry) return;

    inquiry.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const getMenuClass = (id) => {
    const baseClass =
      "px-7 py-2 text-md leading-normal md:text-lg rounded-full font-semibold block transition-all duration-200 whitespace-nowrap";
    const activeClass = "bg-primary-900 text-white";
    const inactiveClass =
      "text-dark-800 hover:bg-primary-900 hover:text-white";

    return `${baseClass} ${activeSection === id ? activeClass : inactiveClass
      }`;
  };

  return (
    <section className="py-8 md:py-12 lg:py-14 pb-24 lg:pb-14">
      {initialValues &&
        initialValues.map((data, index) => {
          const priceTiers = data.side_bar?.[0]?.price_tiers || [];
          const relatedTours = data.side_bar?.[0]?.product || [];

          const availablePrices = priceTiers
            .map((tier) => Number(tier.price))
            .filter(
              (price) => Number.isFinite(price) && price > 0
            );

          const lowestPrice =
            availablePrices.length > 0
              ? Math.min(...availablePrices)
              : null;

          return (
            <div className="container" key={index}>
              <h2 className="mb-3 md:mb-4">{data.title}</h2>

              <div className="text-md md:text-lg leading-normal mb-5 flex items-center gap-2">
                <i className={`${data.icon} text-primary-900`}></i>
                {data.icon_label}
              </div>

              <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 text-sm md:text-md text-dark-800">
                  <span className="inline-flex items-center rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2">
                    Real itinerary
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2">
                    Customizable dates
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#FAF7F2] border border-[#E2CFAF] px-4 py-2">
                    Price confirmed after inquiry
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    scrollToInquiry("top")
                  }
                  className="hidden md:inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary-900 text-white px-6 py-3 text-sm font-semibold hover:opacity-90 transition-all"
                >
                  Check Availability
                  <i className="fa-regular fa-arrow-right"></i>
                </button>
              </div>

              <div
                id="photos"
                className="mb-6 md:mb-7 overflow-hidden rounded-2xl"
              >
                <Photos_Sector photo_data={data.photo} />
              </div>

              <div className="lg:flex">
                <div className="w-full lg:w-[calc(100%-300px)] lg:pr-12">
                  <ul
                    ref={menuRef}
                    className="flex overflow-x-auto gap-2 md:gap-4 mb-6 pb-3 md:pb-1 scroll-menu sticky top-[60px] lg:top-[83px] z-2 py-1.5 bg-white"
                  >
                    {menuItems.map((item) => (
                      <li key={item.id} className="shrink-0">
                        <Link
                          href={`#${item.id}`}
                          data-menu-id={item.id}
                          className={getMenuClass(item.id)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="tabs-content">
                    <Detail_Sector detail_data={data.detail} />
                    <Itinerary_Sector itinerary_data={data.itinerary} />
                    <Included_Excluded_Sector detail_data={data.detail} />
                    <Map_Sector map_data={data.map} />
                    <Booking_Confidence />
                    <Faq_Sector faq_data={data.faq} />
                  </div>
                </div>

                <Side_Bar sideBar_data={data.side_bar} />
              </div>

              <Related_Tours_Sector tours={relatedTours} />

              {!isInquiryVisible && (
                <div className="lg:hidden fixed left-3 right-3 bottom-3 z-[45]">
                  <div className="rounded-2xl bg-[#071B1A] shadow-xl border border-white/10 px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        {lowestPrice ? (
                          <>
                            <span className="block text-[10px] uppercase tracking-[0.12em] text-white/60">
                              From
                            </span>
                            <span className="block text-lg leading-tight font-bold text-white">
                              ${lowestPrice.toLocaleString()}
                              <span className="text-[11px] font-normal text-white/65">
                                {" "}
                                / person
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="block text-[10px] uppercase tracking-[0.12em] text-white/60">
                              Interested?
                            </span>
                            <span className="block text-sm font-semibold text-white">
                              Plan this tour
                            </span>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          scrollToInquiry("mobile_sticky")
                        }
                        className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary-900 text-white px-5 py-3 text-sm font-semibold"
                      >
                        Check Availability
                        <i className="fa-regular fa-arrow-right text-xs"></i>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_Detail;