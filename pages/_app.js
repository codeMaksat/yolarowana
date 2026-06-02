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
  const { data: header_data } = useFetchData("json/data/header.json");

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
    footer_url = "json/data/footer.json";
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
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0F2F2B]">
        <div className="text-center px-6">
          <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-[#D8B46A]/40">
            <div className="absolute inset-2 rounded-full border border-[#D8B46A]/20 animate-ping"></div>

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#D8B46A] text-[#0F2F2B] shadow-lg">
              <i className="fa-solid fa-route text-2xl"></i>
            </div>
          </div>

          <h2 className="mb-2 text-2xl font-bold tracking-wide text-white">
            Yola Rowana
          </h2>

          <p className="mb-5 text-sm uppercase tracking-[0.25em] text-[#D8B46A]">
            Central Asia Travel
          </p>

          <div className="mx-auto flex w-40 items-center justify-between">
            <span className="h-2 w-2 rounded-full bg-[#D8B46A] animate-pulse"></span>
            <span className="h-[1px] flex-1 bg-[#D8B46A]/40 mx-2"></span>
            <span className="h-2 w-2 rounded-full bg-[#D8B46A] animate-pulse"></span>
            <span className="h-[1px] flex-1 bg-[#D8B46A]/40 mx-2"></span>
            <span className="h-2 w-2 rounded-full bg-[#D8B46A] animate-pulse"></span>
          </div>

          <p className="mt-5 text-sm text-white/70">
            Preparing your Silk Road journey...
          </p>
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
