import "../styles/globals.css";
import Footer from "@/Layout/Footer";
import Footer2 from "@/Layout/Footer2";
import Footer3 from "@/Layout/Footer3";
import Header from "@/Layout/Header";
import Header2 from "@/Layout/Header2";
import Header3 from "@/Layout/Header3";
import StickyWhatsApp from "@/component/StickyWhatsApp";
import { useFetchData } from "@/component/comman";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../public/assets/css/all-fontawesome.min.css";
import Head from "next/head";
import { CartProvider } from "react-use-cart";
import "swiper/css";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#071B1A] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,180,106,0.16),transparent_55%)]"></div>

      <div className="relative text-center px-6">
        <div className="relative mx-auto mb-8 h-56 w-72">
          <div className="absolute inset-0 rounded-[45%] border border-[#D8B46A]/20"></div>
          <div className="absolute inset-6 rounded-[45%] border border-[#D8B46A]/10"></div>

          <div className="absolute left-[32px] top-[70px]">
            <span className="absolute h-5 w-5 rounded-full bg-[#D8B46A]/30 animate-ping"></span>
            <span className="relative block h-5 w-5 rounded-full bg-[#D8B46A] shadow-[0_0_18px_rgba(216,180,106,0.9)]"></span>
          </div>

          <div className="absolute left-[92px] top-[118px]">
            <span className="absolute h-5 w-5 rounded-full bg-[#D8B46A]/30 animate-ping [animation-delay:150ms]"></span>
            <span className="relative block h-5 w-5 rounded-full bg-[#D8B46A] shadow-[0_0_18px_rgba(216,180,106,0.9)]"></span>
          </div>

          <div className="absolute left-[148px] top-[92px]">
            <span className="absolute h-5 w-5 rounded-full bg-[#D8B46A]/30 animate-ping [animation-delay:300ms]"></span>
            <span className="relative block h-5 w-5 rounded-full bg-[#D8B46A] shadow-[0_0_18px_rgba(216,180,106,0.9)]"></span>
          </div>

          <div className="absolute left-[198px] top-[130px]">
            <span className="absolute h-5 w-5 rounded-full bg-[#D8B46A]/30 animate-ping [animation-delay:450ms]"></span>
            <span className="relative block h-5 w-5 rounded-full bg-[#D8B46A] shadow-[0_0_18px_rgba(216,180,106,0.9)]"></span>
          </div>

          <div className="absolute left-[225px] top-[70px]">
            <span className="absolute h-5 w-5 rounded-full bg-[#D8B46A]/30 animate-ping [animation-delay:600ms]"></span>
            <span className="relative block h-5 w-5 rounded-full bg-[#D8B46A] shadow-[0_0_18px_rgba(216,180,106,0.9)]"></span>
          </div>

          <svg
            className="absolute left-[42px] top-[82px] h-24 w-52"
            viewBox="0 0 220 100"
            fill="none"
          >
            <path
              d="M0 0 C45 60 75 70 115 20 C145 -15 165 88 210 8"
              stroke="#D8B46A"
              strokeWidth="2"
              strokeDasharray="6 7"
              opacity="0.55"
            />
          </svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold tracking-wide text-white">
          Yola Rowana
        </h2>

        <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#D8B46A]">
          Central Asia Tours
        </p>

        <div className="mx-auto mb-5 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-[loadingLine_1.4s_ease-in-out_infinite] rounded-full bg-[#D8B46A]"></div>
        </div>

        <p className="text-sm text-white/70">
          Connecting the heart of Central Asia...
        </p>

        <style jsx>{`
          @keyframes loadingLine {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(80%);
            }
            100% {
              transform: translateX(220%);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

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

  const { data: header_data } = useFetchData("/json/data/header.json");

  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  let footer_url = "";

  if (router.asPath === "/home-2") {
    footer_url = "json/data/footer2.json";
  } else {
    footer_url = "/json/data/footer.json";
  }

  const { data: footer_data } = useFetchData(footer_url);

  const isLoading = loading || !header_data || !footer_data;

  const excludeRoutes = ["/forget-password", "/login", "/register"];
  const isExcludedPage = excludeRoutes.includes(router.asPath);

  if (!Component) {
    router.push("/404");
    return null;
  }

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

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <CartProvider>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        {!isExcludedPage && <HeaderComponent initialValues={header_data} />}

        <Component {...pageProps} />

        <StickyWhatsApp />

        {!isExcludedPage && <FooterComponent initialValues={footer_data} />}

        {routeLoading && <SmallRouteLoader />}
      </CartProvider>
    </>
  );
}