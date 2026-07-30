import "../styles/globals.css";
import Footer from "@/Layout/Footer";
import Footer2 from "@/Layout/Footer2";
import Footer3 from "@/Layout/Footer3";
import Header from "@/Layout/Header";
import Header2 from "@/Layout/Header2";
import Header3 from "@/Layout/Header3";
import StickyWhatsApp from "@/component/StickyWhatsApp";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../public/assets/css/all-fontawesome.min.css";
import { CartProvider } from "react-use-cart";
import "swiper/css";
import headerData from "../public/json/data/header.json";
import footerData from "../public/json/data/footer.json";
import footer2Data from "../public/json/data/footer2.json";

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
              <circle cx="30" cy="30" r="26" fill="transparent" />
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
              <circle cx="30" cy="30" r="28" fill="transparent" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2009 10.201L15.8578 15.8579C19.4771 12.2386 24.4771 10 29.9999 10C41.0456 10 49.9999 18.9543 49.9999 30H57.9999C57.9999 14.536 45.4639 2 29.9999 2C22.2679 2 15.2679 5.13401 10.2009 10.201Z"
                fill="currentColor"
              />
            </g>
          </g>

          <g className="loader_circle_3">
            <circle cx="30" cy="30" r="30" fill="transparent" />
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

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    let finishTimer;

    const handleRouteChangeStart = (url) => {
      if (url !== router.asPath) {
        clearTimeout(finishTimer);
        setRouteLoading(true);
      }
    };

    const handleRouteChangeComplete = () => {
      clearTimeout(finishTimer);

      finishTimer = setTimeout(() => {
        setRouteLoading(false);
      }, 250);
    };

    const handleRouteChangeError = () => {
      clearTimeout(finishTimer);

      finishTimer = setTimeout(() => {
        setRouteLoading(false);
      }, 250);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      clearTimeout(finishTimer);
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  const currentFooterData =
    router.asPath === "/home-2" ? footer2Data : footerData;

  const excludeRoutes = ["/forget-password", "/login", "/register"];
  const isExcludedPage = excludeRoutes.includes(router.asPath);

  const selectHeaderAndFooter = (url) => {
    if (url.includes(`/home-3`)) {
      return { header: Header3, footer: Footer3 };
    } else if (url.includes(`/home-2`)) {
      return { header: Header2, footer: Footer2 };
    } else if (url.includes(`/`)) {
      return { header: Header, footer: Footer };
    } else {
      return { header: Header, footer: Footer };
    }
  };

  const { header: HeaderComponent, footer: FooterComponent } =
    selectHeaderAndFooter(router.asPath);

  return (
    <>
      <CartProvider>
        {!isExcludedPage && (
          <HeaderComponent initialValues={headerData} />
        )}

        <Component {...pageProps} />

        <StickyWhatsApp />

        {!isExcludedPage && (
          <FooterComponent initialValues={currentFooterData} />
        )}

        {routeLoading && <SmallRouteLoader />}
      </CartProvider>
    </>
  );
}