import "../styles/globals.css";
import Footer from "@/Layout/Footer";
import Footer2 from "@/Layout/Footer2";
import Footer3 from "@/Layout/Footer3";
import Header from "@/Layout/Header";
import Header2 from "@/Layout/Header2";
import Header3 from "@/Layout/Header3";
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
      <div className="preloader">
        <div className="preloader-inner">
          <svg
            width="151"
            height="78"
            viewBox="0 0 151 78"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              className="shape-1"
              d="M126.848 45.0643L84.4305 44.9714C79.0702 44.9596 71.876 37.6957 67.1163 32.8892C63.6991 29.432 62.2521 28.0267 61.0827 28.0242L54.594 28.01C54.4286 28.0093 54.2653 28.0489 54.1183 28.1251C53.9712 28.2014 53.8446 28.3122 53.7495 28.448C53.6544 28.5837 53.5936 28.7404 53.5723 28.9046C53.551 29.0687 53.5698 29.2354 53.6271 29.3903L59.7764 46.1295C58.7677 46.6187 57.0361 47.4601 55.4383 48.3821C55.3003 48.4613 55.1826 48.5715 55.0944 48.704C55.0062 48.8364 54.95 48.9874 54.9302 49.1451C54.9105 49.3028 54.9277 49.4627 54.9805 49.6122C55.0334 49.7618 55.1204 49.8968 55.2347 50.0066C56.3106 51.0339 57.441 52.0025 58.621 52.9084L54.435 52.8992L54.4219 54.9467L61.5428 54.9623C67.4469 58.6735 74.3053 60.5936 81.2916 60.4912L94.5573 60.5203L94.5704 58.4728L81.3047 58.4437C75.8708 58.52 70.4989 57.3306 65.6142 54.9695L68.364 54.9756L68.3771 52.9281L62.0554 52.9142C60.5097 51.8795 59.0443 50.7297 57.6718 49.4747C59.6143 48.4322 61.4506 47.5976 61.4802 47.5862C61.7166 47.4795 61.9041 47.2871 62.0047 47.0481C62.1054 46.809 62.1117 46.541 62.0223 46.2982L56.0565 30.0607L60.9796 30.0715C62.6921 31.3208 64.2639 32.7521 65.6674 34.3406C70.9609 39.6888 78.2152 47.0118 84.4206 47.0254L126.838 47.1183C130.943 46.9968 135.001 47.9708 138.596 49.9401L131.789 49.9252L131.776 51.9727L140.961 51.9928C141.337 52.4592 141.556 53.0328 141.587 53.6322C141.572 56.0286 138.28 58.5685 132.199 58.5552L115.363 58.5183L115.35 60.5658L132.186 60.6026C139.671 60.619 143.61 57.1109 143.634 53.6367C143.664 49.011 135.977 45.0842 126.848 45.0643Z"
              fill="white"
            />
            <path
              className="shape-2"
              d="M111.652 55.0952C107.142 55.1245 102.648 55.6618 98.2532 56.697C98.0338 56.7522 97.8384 56.8785 97.6977 57.0561C97.5569 57.2338 97.4787 57.4527 97.4751 57.6789L97.4507 61.4296C97.451 61.6542 97.5248 61.8722 97.661 62.0501C97.7971 62.2281 97.9881 62.3562 98.2045 62.4147C102.585 63.4915 107.079 64.0478 111.594 64.0719C111.866 64.0725 112.127 63.9651 112.32 63.7733C112.513 63.5816 112.623 63.3212 112.625 63.0495L112.67 56.1153C112.671 55.8437 112.565 55.5832 112.374 55.3907C112.183 55.1983 111.924 55.0897 111.653 55.0887M110.584 62.0092C106.853 61.9047 103.142 61.4397 99.504 60.6207L99.5178 58.4897C103.169 57.6988 106.884 57.2466 110.615 57.1389L110.584 62.0092Z"
              fill="white"
            />
            <path
              d="M117.76 56.3648L119.806 56.3699C119.815 54.8951 119.237 53.4792 118.2 52.4337C117.162 51.3883 115.75 50.7989 114.274 50.7952L81.1719 50.7125L81.1594 52.7569L114.27 52.8396C115.202 52.8445 116.092 53.2183 116.746 53.8791C117.401 54.5399 117.765 55.4337 117.76 56.3648Z"
              fill="white"
            />
            <path
              className="shape-3"
              d="M98.4664 67.3585L77.5625 67.3037L77.5503 69.347L98.4542 69.4018L98.4664 67.3585Z"
              fill="white"
            />
            <path
              className="shape-4"
              d="M73.4714 67.2821L65.8516 67.2647L65.8387 69.3109L73.4585 69.3283L73.4714 67.2821Z"
              fill="white"
            />
            <path
              className="shape-5"
              d="M50.0569 67.2821L22.6875 67.2196L22.6746 69.2659L50.044 69.3283L50.0569 67.2821Z"
              fill="white"
            />
            <path
              className="shape-6"
              d="M46.7138 28.5018L33.1016 28.4708L33.0887 30.517L46.7009 30.5481L46.7138 28.5018Z"
              fill="white"
            />
            <path
              className="shape-7"
              d="M24.3711 28.5244L0.882812 28.4708L0.869925 30.517L24.3582 30.5706L24.3711 28.5244Z"
              fill="white"
            />
            <path
              className="shape-8"
              d="M124.735 12.0753C124.377 10.242 122.795 8.84733 120.855 8.84733C120.208 8.84733 119.634 8.99488 119.131 9.28796C118.268 7.67297 116.617 6.64616 114.748 6.64616C111.945 6.64616 109.718 8.92009 109.718 11.7822C109.718 11.855 109.718 12.0025 109.718 12.0753C108.426 12.6615 107.563 13.9086 107.563 15.4488C107.563 17.5024 109.144 19.1174 111.155 19.1174L123.369 19.1174C125.381 19.1174 126.962 17.5044 126.962 15.4488C126.962 13.9086 126.028 12.5887 124.735 12.0753ZM123.369 18.3837L111.155 18.3837C109.574 18.3837 108.281 17.0638 108.281 15.4488C108.281 14.0541 109.215 12.8818 110.508 12.5867C110.437 12.2936 110.437 12.0733 110.437 11.7802C110.437 9.35871 112.377 7.37786 114.748 7.37786C116.617 7.37786 118.197 8.62499 118.844 10.3127C119.418 9.87211 120.137 9.57903 120.855 9.57903C122.579 9.57903 123.945 10.8989 124.088 12.5867C125.309 12.8818 126.244 14.0561 126.244 15.4488C126.244 17.0638 124.951 18.3837 123.369 18.3837Z"
              fill="white"
              stroke="white"
              strokeWidth="0.4"
            />
            <path
              className="shape-9"
              d="M147.802 70.1243C147.608 69.1313 146.751 68.3759 145.7 68.3759C145.35 68.3759 145.039 68.4558 144.766 68.6145C144.299 67.7398 143.405 67.1836 142.392 67.1836C140.874 67.1836 139.668 68.4153 139.668 69.9656C139.668 70.005 139.668 70.0849 139.668 70.1243C138.968 70.4419 138.5 71.1174 138.5 71.9517C138.5 73.064 139.357 73.9388 140.446 73.9388L147.062 73.9388C148.151 73.9388 149.008 73.0651 149.008 71.9517C149.008 71.1174 148.502 70.4024 147.802 70.1243ZM147.062 73.5414L140.446 73.5414C139.589 73.5414 138.889 72.8264 138.889 71.9517C138.889 71.1962 139.395 70.5612 140.096 70.4013C140.057 70.2426 140.057 70.1233 140.057 69.9645C140.057 68.6529 141.108 67.5799 142.392 67.5799C143.405 67.5799 144.26 68.2554 144.611 69.1696C144.922 68.931 145.311 68.7722 145.7 68.7722C146.634 68.7722 147.374 69.4871 147.451 70.4013C148.113 70.5612 148.619 71.1973 148.619 71.9517C148.619 72.8264 147.919 73.5414 147.062 73.5414Z"
              fill="white"
              stroke="white"
              strokeWidth="0.4"
            />
          </svg>
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
        <FooterComponent initialValues={footer_data} />
      </CartProvider>
    </>
  );
}
