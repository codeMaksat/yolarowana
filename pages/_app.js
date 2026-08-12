import "../styles/globals.css";

import Footer from "@/Layout/Footer";
import Footer2 from "@/Layout/Footer2";
import Footer3 from "@/Layout/Footer3";

import Header from "@/Layout/Header";
import Header2 from "@/Layout/Header2";
import Header3 from "@/Layout/Header3";

import StickyWhatsApp from "@/component/StickyWhatsApp";

import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";

import { Red_Hat_Display } from "next/font/google";

import { useEffect, useState } from "react";

import { CartProvider } from "react-use-cart";

import "swiper/css";

import headerData from "../public/json/data/header.json";
import footerData from "../public/json/data/footer.json";
import footer2Data from "../public/json/data/footer2.json";


/*
 * =========================================================
 * GOOGLE ANALYTICS
 * =========================================================
 */

const GA_MEASUREMENT_ID = "G-8CVX20ZB1M";

const ANALYTICS_CONSENT_KEY =
  "belet_analytics_consent";


/*
 * =========================================================
 * FONT
 * =========================================================
 */

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-red-hat-display",
});


/*
 * =========================================================
 * SMALL ROUTE LOADER
 * =========================================================
 */

const SmallRouteLoader = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[99998] flex h-14 w-14 items-center justify-center rounded-xl bg-[#071B1A] text-[#D8B46A] shadow-xl border border-[#D8B46A]/30">
      <svg
        width="30"
        height="30"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="route_loader_68">
          <g className="loader_circle_1">
            <g>
              <circle
                cx="30"
                cy="30"
                r="26"
                fill="transparent"
              />

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 30H8C8 17.8497 17.8497 8 30 8C42.1503 8 52 17.8497 52 30H56C56 15.6406 44.3594 4 30 4C15.6406 4 4 15.6406 4 30Z"
                fill="currentColor"
              />
            </g>
          </g>

          <g className="loader_circle_2">
            <g>
              <circle
                cx="30"
                cy="30"
                r="28"
                fill="transparent"
              />

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2009 10.201L15.8578 15.8579C19.4771 12.2386 24.4771 10 29.9999 10C41.0456 10 49.9999 18.9543 49.9999 30H57.9999C57.9999 14.536 45.4639 2 29.9999 2C22.2679 2 15.2679 5.13401 10.2009 10.201Z"
                fill="currentColor"
              />
            </g>
          </g>

          <g className="loader_circle_3">
            <circle
              cx="30"
              cy="30"
              r="30"
              fill="transparent"
            />

            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M60 30H48C48 20.0589 39.9411 12 30 12V0C46.5685 0 60 13.4315 60 30Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};


/*
 * =========================================================
 * COOKIE / ANALYTICS CONSENT
 * =========================================================
 */

const AnalyticsConsentBanner = ({
  onAccept,
  onDecline,
}) => {
  return (
    <div className="fixed left-3 right-3 bottom-3 md:left-6 md:right-auto md:bottom-6 z-[99999] md:max-w-[440px]">

      <div className="rounded-2xl border border-[#E2CFAF] bg-white shadow-2xl p-5 md:p-6">

        <div className="flex items-start gap-4">

          {/* ICON */}
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#FAF7F2] border border-[#E2CFAF] flex items-center justify-center text-primary-900">
            <i className="fa-regular fa-chart-line"></i>
          </div>

          {/* CONTENT */}
          <div className="min-w-0">

            <h4 className="text-lg font-bold text-dark-900 mb-2">
              Help us improve Belet Travel
            </h4>

            <p className="text-sm leading-6 text-dark-800 mb-3">
              We use optional Google Analytics to
              understand how visitors use our website
              and improve our tours and booking
              experience.
            </p>

            <p className="text-xs leading-5 text-dark-800/70 mb-4">
              Analytics will only load if you accept.
              You can learn more in our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-primary-900 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-2">

              <button
                type="button"
                onClick={onAccept}
                className="btn btn-primary rounded-full px-5 py-2.5 text-sm font-semibold"
              >
                Accept analytics
              </button>

              <button
                type="button"
                onClick={onDecline}
                className="rounded-full border border-[#E2CFAF] bg-white px-5 py-2.5 text-sm font-semibold text-dark-900 hover:border-primary-900 transition-all"
              >
                Decline
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};


/*
 * =========================================================
 * APP
 * =========================================================
 */

export default function App({
  Component,
  pageProps,
}) {
  const router = useRouter();

  const [
    routeLoading,
    setRouteLoading,
  ] = useState(false);

  const [
    analyticsConsent,
    setAnalyticsConsent,
  ] = useState("loading");


  /*
   * =========================================================
   * LOAD SAVED ANALYTICS CONSENT
   * =========================================================
   */

  useEffect(() => {
    try {
      const savedConsent =
        localStorage.getItem(
          ANALYTICS_CONSENT_KEY
        );

      if (
        savedConsent === "accepted" ||
        savedConsent === "declined"
      ) {
        setAnalyticsConsent(
          savedConsent
        );
      } else {
        setAnalyticsConsent(
          "unset"
        );
      }
    } catch (error) {
      console.error(
        "Analytics consent read error:",
        error
      );

      setAnalyticsConsent(
        "unset"
      );
    }
  }, []);


  /*
   * =========================================================
   * ACCEPT ANALYTICS
   * =========================================================
   */

  const acceptAnalytics = () => {
    try {
      localStorage.setItem(
        ANALYTICS_CONSENT_KEY,
        "accepted"
      );
    } catch (error) {
      console.error(
        "Analytics consent save error:",
        error
      );
    }

    setAnalyticsConsent(
      "accepted"
    );
  };


  /*
   * =========================================================
   * DECLINE ANALYTICS
   * =========================================================
   */

  const declineAnalytics = () => {
    try {
      localStorage.setItem(
        ANALYTICS_CONSENT_KEY,
        "declined"
      );
    } catch (error) {
      console.error(
        "Analytics consent save error:",
        error
      );
    }

    setAnalyticsConsent(
      "declined"
    );
  };


  /*
   * =========================================================
   * FONT AWESOME
   * =========================================================
   */

  useEffect(() => {
    const existingStylesheet =
      document.querySelector(
        'link[data-fontawesome-stylesheet="true"]'
      );

    if (existingStylesheet) {
      return;
    }

    const stylesheet =
      document.createElement(
        "link"
      );

    stylesheet.rel =
      "stylesheet";

    stylesheet.href =
      "/assets/css/all-fontawesome.min.css";

    stylesheet.dataset.fontawesomeStylesheet =
      "true";

    document.head.appendChild(
      stylesheet
    );
  }, []);


  /*
   * =========================================================
   * ROUTE LOADER
   * =========================================================
   */

  useEffect(() => {
    let finishTimer;

    const handleRouteChangeStart = (
      url
    ) => {
      if (url !== router.asPath) {
        clearTimeout(
          finishTimer
        );

        setRouteLoading(
          true
        );
      }
    };

    const handleRouteChangeComplete =
      () => {
        clearTimeout(
          finishTimer
        );

        finishTimer =
          setTimeout(() => {
            setRouteLoading(
              false
            );
          }, 250);
      };

    const handleRouteChangeError =
      () => {
        clearTimeout(
          finishTimer
        );

        finishTimer =
          setTimeout(() => {
            setRouteLoading(
              false
            );
          }, 250);
      };

    router.events.on(
      "routeChangeStart",
      handleRouteChangeStart
    );

    router.events.on(
      "routeChangeComplete",
      handleRouteChangeComplete
    );

    router.events.on(
      "routeChangeError",
      handleRouteChangeError
    );

    return () => {
      clearTimeout(
        finishTimer
      );

      router.events.off(
        "routeChangeStart",
        handleRouteChangeStart
      );

      router.events.off(
        "routeChangeComplete",
        handleRouteChangeComplete
      );

      router.events.off(
        "routeChangeError",
        handleRouteChangeError
      );
    };
  }, [router]);


  /*
   * =========================================================
   * FOOTER
   * =========================================================
   */

  const currentFooterData =
    router.asPath === "/home-2"
      ? footer2Data
      : footerData;


  /*
   * =========================================================
   * EXCLUDED AUTH PAGES
   * =========================================================
   */

  const excludeRoutes = [
    "/forget-password",
    "/login",
    "/register",
  ];

  const isExcludedPage =
    excludeRoutes.includes(
      router.asPath
    );


  /*
   * =========================================================
   * HEADER / FOOTER SELECTOR
   * =========================================================
   */

  const selectHeaderAndFooter = (
    url
  ) => {
    if (
      url.includes(`/home-3`)
    ) {
      return {
        header: Header3,
        footer: Footer3,
      };
    } else if (
      url.includes(`/home-2`)
    ) {
      return {
        header: Header2,
        footer: Footer2,
      };
    } else {
      return {
        header: Header,
        footer: Footer,
      };
    }
  };

  const {
    header: HeaderComponent,
    footer: FooterComponent,
  } =
    selectHeaderAndFooter(
      router.asPath
    );


  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    <>
      {/* ===============================================
          GOOGLE ANALYTICS
          ONLY LOAD AFTER ACCEPTANCE
      =============================================== */}

      {analyticsConsent ===
        "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />

          <Script
            id="belet-google-analytics"
            strategy="afterInteractive"
          >
            {`
              window.dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments);
              }

              window.gtag = gtag;

              gtag('js', new Date());

              gtag(
                'config',
                '${GA_MEASUREMENT_ID}'
              );
            `}
          </Script>
        </>
      )}

      <div
        className={`${redHatDisplay.className} ${redHatDisplay.variable} text-md md:text-lg antialiased text-dark-800 leading-xl`}
      >
        <CartProvider>

          {!isExcludedPage && (
            <HeaderComponent
              initialValues={
                headerData
              }
            />
          )}

          <Component
            {...pageProps}
          />

          <StickyWhatsApp />

          {!isExcludedPage && (
            <FooterComponent
              initialValues={
                currentFooterData
              }
            />
          )}

          {routeLoading && (
            <SmallRouteLoader />
          )}

        </CartProvider>
      </div>

      {/* ===============================================
          CONSENT BANNER
      =============================================== */}

      {analyticsConsent ===
        "unset" && (
        <AnalyticsConsentBanner
          onAccept={
            acceptAnalytics
          }
          onDecline={
            declineAnalytics
          }
        />
      )}

    </>
  );
}