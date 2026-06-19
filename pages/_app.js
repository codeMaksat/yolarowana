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

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Fetch header data using a custom hook
  const { data: header_data } = useFetchData("/json/data/header.json");

  // Define a state variable to handle loading state
  const [loading, setLoading] = useState(true);

  // Use useEffect to set loading to false after a delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [router.asPath]);

  // Redirect to login if email and password are empty on localhost
  // useEffect(() => {
  //   const email = localStorage.getItem("email");
  //   const password = localStorage.getItem("password");
  //   if (email === null || password === null) {
  //     router.push("/login");
  //   }
  // }, [router]); // Add 'router' to the dependency array

  // Fetch footer data conditionally
  let footer_url = "";
  if (router.asPath === "/home-2") {
    footer_url = "json/data/footer2.json";
  } else {
    footer_url = "/json/data/footer.json";
  }

  const { data: footer_data } = useFetchData(footer_url);

  // Determine if the page is still loading
  const isLoading = loading || !header_data || !footer_data;

  // Check if the current route is "/forget-password" or "/login" or "/register"
  const excludeRoutes = ["/forget-password", "/login", "/register"];
  const isExcludedPage = excludeRoutes.includes(router.asPath);

  // Define a loading screen component
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

  // If the Component is not defined, redirect to the custom 404 page
  if (!Component) {
    router.push("/404");
    return null;
  }

  // Function to select the appropriate header and footer based on the URL
  const selectHeaderAndFooter = url => {
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

  // Destructure the selected header and footer components
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
        <HeaderComponent initialValues={header_data} />
        <Component {...pageProps} />
        <StickyWhatsApp />
        <FooterComponent initialValues={footer_data} />
      </CartProvider>
    </>
  );
}
