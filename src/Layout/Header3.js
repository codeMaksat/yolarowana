import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [{}];

export default function Header2({ initialValues }) {
  const router = useRouter();

  const [OpenSearch, setOpenSearch] = useState(false);
  const [OpenMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const acitive_class_slug = slug => {
    if (router.asPath === slug) {
      return router.asPath === slug ? "active" : "";
    } else if (
      router.asPath === "/faq" ||
      router.asPath === "/gallery" ||
      router.asPath === "/gallery-masonry" ||
      router.asPath === "/forgot-password" ||
      router.asPath === "/portfolio" ||
      router.asPath === "/testimonial" ||
      router.asPath === "/sitemap" ||
      router.asPath === "/team" ||
      router.asPath === "/team-detail" ||
      router.asPath === "/login" ||
      router.asPath === "/sign-in" ||
      router.asPath === "/404"
    ) {
      return slug === "/page" ? "active" : "";
    } else if (
      router.asPath === "/destination-two" ||
      router.asPath === "/destination-detail"
    ) {
      return slug === "/destination" ? "active" : "";
    } else if (router.asPath === "/home-2" || router.asPath === "/home-3") {
      return slug === "/" ? "active" : "";
    } else if (router.asPath === "/hotels-detail") {
      return slug === "/hotels" ? "active" : "";
    } else if (
      router.asPath === "/tour-detail" ||
      router.asPath === "/tour-detail-2" ||
      router.asPath === "/tour-detail-3" ||
      router.asPath === "/tour-list" ||
      router.asPath === "/tour-grid"
    ) {
      return slug === "/tour" ? "active" : "";
    } else if (
      router.asPath === "/blog-detail-1" ||
      router.asPath === "/blog-detail-2" ||
      router.asPath === "/blog-detail-3" ||
      router.asPath === "/standard-blog"
    ) {
      return slug === "/blog" ? "active" : "";
    }
  };

  const handelOpenSearch = e => {
    e.preventDefault();
    setOpenSearch(prevClassNclassName => !prevClassNclassName);
  };

  const handelOpenMenu = e => {
    e.preventDefault();
    setOpenMenu(prevClassNclassName => !prevClassNclassName);
  };

  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after initial render

  const headerClasses = isScrolled ? "sticky-header" : "";

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <React.Fragment key={index}>
          <header
            className={`header header-style3 fixed top-0 left-0 w-full z-20 text-white ${headerClasses}`}>
            <div className="overlay lg:hidden"></div>
            <div className="main-navigation py-3 lg:py-0">
              {data.mid_bar &&
                data.mid_bar.map((mid_bar_data, index) => {
                  return (
                    <div
                      className="container flex items-center justify-between"
                      key={index}>
                      <div className="flex items-center">
                        {mid_bar_data.logo &&
                          mid_bar_data.logo.map((mid_bar_logo_data, index) => {
                            return (
                              <div className="logo mr-7" key={index}>
                                <Link
                                  href={mid_bar_logo_data.slug}
                                  className="max-w-[150px] sm:max-w-auto block">
                                  <img
                                    src={mid_bar_logo_data.img_dark}
                                    alt={mid_bar_logo_data.alt}
                                  />
                                </Link>
                              </div>
                            );
                          })}
                      </div>

                      <div className="flex">
                        <div className="main-menu lg:block">
                          <button
                            type="button"
                            className="absolute top-0 right-0 lg:hidden p-1"
                            onClick={e => {
                              handelOpenMenu(e);
                            }}
                            aria-expanded={OpenMenu ? "true" : "false"}>
                            <img
                              src="/assets/images/close-dark.svg"
                              alt="menu-close-icon"
                            />
                          </button>

                          <ul className="lg:flex items-center lg:gap-1 text-sm lg:text-md text-dark-900 lg:text-white font-semibold">
                            {data.mega_menu &&
                              data.mega_menu.map((mega_menu_data, index) => {
                                let html_code = (
                                  <li
                                    key={index}
                                    className={acitive_class_slug(
                                      mega_menu_data.slug
                                    )}>
                                    <Link
                                      href={mega_menu_data.slug}
                                      className="hover:text-primary-900">
                                      {mega_menu_data.label}
                                    </Link>
                                  </li>
                                );
                                if (mega_menu_data.menu) {
                                  html_code = (
                                    <li
                                      className={`menu-item-has-children ${acitive_class_slug(
                                        mega_menu_data.slug
                                      )}`}
                                      // className="menu-item-has-children"
                                      key={index}>
                                      <Link
                                        href="#"
                                        className="hover:text-primary-900">
                                        {mega_menu_data.label}
                                      </Link>
                                      <div className="mega-menu hidden lg:absolute lg:top-[78px] lg:left-0 bg-white w-full pt-3">
                                        <div className="container">
                                          <div className="lg:flex lg:py-8">
                                            <div className="w-full lg:w-2/3 lg:grid lg:grid-cols-3">
                                              {mega_menu_data.menu &&
                                                mega_menu_data.menu.map(
                                                  (menu_data, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <h4 className="text-lg font-bold mb-3">
                                                          {menu_data.title}
                                                        </h4>
                                                        <ul className="text-lg text-dark-800">
                                                          {menu_data.sub_menu &&
                                                            menu_data.sub_menu.map(
                                                              (
                                                                sub_menu_data,
                                                                index
                                                              ) => {
                                                                return (
                                                                  <li
                                                                    key={index}>
                                                                    <Link
                                                                      href={
                                                                        sub_menu_data.slug
                                                                      }>
                                                                      {
                                                                        sub_menu_data.label
                                                                      }
                                                                    </Link>
                                                                  </li>
                                                                );
                                                              }
                                                            )}
                                                        </ul>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </div>
                                            <div className="w-full hidden lg:block max-w-[300px] xl:max-w-[400px] shrink-0">
                                              <div className="py-10 px-5 lg:px-8 relative rounded-5xl overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-full">
                                                  <img
                                                    src="/assets/images/summer-escaps-img.png"
                                                    alt="weekly-flash-deels-img"
                                                    className="block w-full h-full object-cover"
                                                  />
                                                </div>
                                                <div className="relative max-w-[200px]">
                                                  <h4 className="mb-3 text-2xl leading-[30px] lg:text-[28px]">
                                                    Summer escaps
                                                  </h4>
                                                  <p className="text-dark-900 text-md mb-5">
                                                    Plan your next trip with us.
                                                  </p>
                                                  <Link
                                                    href="destination"
                                                    className="btn btn-light btn-md shadow-btn mx-0">
                                                    View deals{" "}
                                                    <i className="fa-regular fa-arrow-right ml-3"></i>
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                } else if (mega_menu_data.sub_menu) {
                                  html_code = (
                                    <li
                                      className={`menu-item-has-children relative group ${acitive_class_slug(
                                        mega_menu_data.slug
                                      )}`}
                                      key={index}>
                                      <Link
                                        href={mega_menu_data.slug}
                                        className="hover:text-primary-900">
                                        {mega_menu_data.label}
                                      </Link>
                                      <ul className="sub-menu-list hidden lg:block text-lg text-dark-800 lg:absolute lg:top-[calc(100%+7px)] lg:left-0 lg:border lg:border-gray-100 lg:w-[200px] lg:bg-white lg:p-5 lg:rounded-xl lg:shadow-box lg:transition-all lg:translate-y-4 lg:invisible lg:opacity-0 lg:group-hover:visible group-hover:opacity-100 group-hover:translate-y-0">
                                        {mega_menu_data.sub_menu &&
                                          mega_menu_data.sub_menu.map(
                                            (sub_menu_data, index) => {
                                              return (
                                                <li
                                                  key={index}
                                                  className={acitive_class_slug(
                                                    sub_menu_data.slug
                                                  )}>
                                                  <Link
                                                    href={sub_menu_data.slug}>
                                                    {sub_menu_data.label}
                                                  </Link>
                                                </li>
                                              );
                                            }
                                          )}
                                      </ul>
                                    </li>
                                  );
                                }
                                return html_code;
                              })}
                          </ul>
                        </div>

                        <div className="flex items-center justify-end">
                          <div className="block lg:hidden leading-[0]">
                            <button type="button">
                              <img
                                src="/assets/images/tabler-menu-icon.svg"
                                alt="menu-toggle-icon"
                              />
                            </button>
                          </div>
                          <div className="user-icon ml-4 pl-3 md:pl-5 border-l border-white">
                            <Link
                              href="register"
                              className="text-white hover:text-primary-900">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="22"
                                viewBox="0 0 20 22"
                                fill="none">
                                <path
                                  d="M15.638 9.625C16.046 9.73958 16.4345 9.89509 16.8034 10.0915C17.1723 10.2879 17.5586 10.5867 17.9622 10.9877C18.3659 11.3888 18.7109 11.8614 18.9974 12.4057C19.2839 12.95 19.5226 13.6538 19.7135 14.5173C19.9045 15.3808 20 16.3486 20 17.4208C20 18.6812 19.566 19.7595 18.6979 20.6557C17.8299 21.5519 16.7839 22 15.5599 22H4.4401C3.21615 22 2.17014 21.5519 1.30208 20.6557C0.434028 19.7595 0 18.6812 0 17.4208C0 16.3486 0.0954861 15.3808 0.286458 14.5173C0.477431 13.6538 0.716146 12.95 1.0026 12.4057C1.28906 11.8614 1.63411 11.3888 2.03776 10.9877C2.44141 10.5867 2.82769 10.2879 3.19661 10.0915C3.56554 9.89509 3.95399 9.73958 4.36198 9.625C3.67622 8.60193 3.33333 7.48884 3.33333 6.28571C3.33333 5.43452 3.50911 4.62221 3.86068 3.84877C4.21224 3.07533 4.6875 2.40625 5.28646 1.84152C5.88542 1.27679 6.59505 0.828683 7.41536 0.49721C8.23568 0.165737 9.09722 0 10 0C10.9028 0 11.7643 0.165737 12.5846 0.49721C13.4049 0.828683 14.1146 1.27679 14.7135 1.84152C15.3125 2.40625 15.7878 3.07533 16.1393 3.84877C16.4909 4.62221 16.6667 5.43452 16.6667 6.28571C16.6667 7.48884 16.3238 8.60193 15.638 9.625ZM10 1.57143C8.61979 1.57143 7.44141 2.03181 6.46484 2.95257C5.48828 3.87333 5 4.98438 5 6.28571C5 7.58705 5.48828 8.6981 6.46484 9.61886C7.44141 10.5396 8.61979 11 10 11C11.3802 11 12.5586 10.5396 13.5352 9.61886C14.5117 8.6981 15 7.58705 15 6.28571C15 4.98438 14.5117 3.87333 13.5352 2.95257C12.5586 2.03181 11.3802 1.57143 10 1.57143ZM15.5599 20.4286C16.3238 20.4286 16.977 20.136 17.5195 19.5508C18.0621 18.9656 18.3333 18.2556 18.3333 17.4208C18.3333 15.4647 17.9926 13.9219 17.3112 12.7924C16.6298 11.6629 15.651 11.0696 14.375 11.0123C13.1163 12.0517 11.658 12.5714 10 12.5714C8.34201 12.5714 6.88368 12.0517 5.625 11.0123C4.34896 11.0696 3.37023 11.6629 2.6888 12.7924C2.00738 13.9219 1.66667 15.4647 1.66667 17.4208C1.66667 18.2556 1.93793 18.9656 2.48047 19.5508C3.023 20.136 3.67622 20.4286 4.4401 20.4286H15.5599Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </Link>
                          </div>

                          <div className="search-icon">
                            <Link
                              onClick={e => {
                                handelOpenSearch(e);
                              }}
                              href="/"
                              className={`ml-4 pl-3 md:pl-5 border-l border-white flex items-center justify-center text-white text-sm hover:text-primary-900 ${
                                OpenSearch ? "active" : ""
                              }`}
                              aria-expanded={OpenSearch ? "true" : "false"}>
                              <i className="fa-regular fa-magnifying-glass"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </header>

          <div
            className={`search-popup transition-all fixed -top-full left-0 w-full h-full bg-black/80 z-50 flex items-center ${
              OpenSearch ? "open" : ""
            }`}>
            <Link
              href="/"
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              onClick={e => {
                handelOpenSearch(e);
              }}>
              <img src="/assets/images/close.svg" alt="close" />
            </Link>
            <div className="container text-center">
              <form>
                <div className="border-b border-white relative pr-[80px]">
                  <input
                    type="text"
                    placeholder="Search here"
                    name=""
                    className="bg-transparent px-0 py-3 md:py-5 text-white text-left w-full text-md md:text-25"
                  />
                  <button className="bg-primary-900 absolute top-0 right-0 w-12 h-10 md:w-[75px] md:h-[60px] rounded-sm text-white">
                    <i className="fa-regular fa-magnifying-glass"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </React.Fragment>
      );
    })
  );
}
