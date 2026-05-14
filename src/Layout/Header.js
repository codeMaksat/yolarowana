import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const data = [{}];

export default function Header({ initialValues }) {

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
      router.asPath === "/tour-detail#detail" ||
      router.asPath === "/tour-detail#photos" ||
      router.asPath === "/tour-detail#itinerary" ||
      router.asPath === "/tour-detail#map" ||
      router.asPath === "/tour-detail#faq" ||
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
    setOpenSearch(prevClass => !prevClass);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  const handelOpenMenu = e => {
    e.preventDefault();
    setOpenMenu(prevClass => !prevClass);
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
            className={`header relative z-20 ${headerClasses}${OpenMenu ? " header-open" : ""
              }`}>
            <div className="overlay lg:hidden" aria-expanded="false"></div>
            {data.top_bar &&
              data.top_bar.map((top_bar_data, index) => {
                return (
                  <div
                    className="bg-primary-800 text-dark-900 text-sm font-medium py-2"
                    key={index}>
                    <div className="container flex justify-between items-center">
                      <div className="flex items-center gap-5 md:gap-12">
                        <div className="flex items-center gap-5 md:gap-4">
                          <label className="hidden sm:block">
                            {top_bar_data.title}
                          </label>
                          <ul className="flex items-center gap-4">
                            {top_bar_data.media &&
                              top_bar_data.media.map(
                                (top_bar_media_data, index) => {
                                  return (
                                    <li key={index}>
                                      <Link
                                        href={top_bar_media_data.slug}
                                        className="hover:text-primary-900">
                                        <i
                                          className={
                                            top_bar_media_data.icon
                                          }></i>
                                      </Link>
                                    </li>
                                  );
                                }
                              )}
                          </ul>
                        </div>
                        <div className="flex items-center">
                          <Link
                            href={top_bar_data.call_slug}
                            className="flex items-center gap-4 hover:text-primary-900">
                            <i className={top_bar_data.call_icon}></i>{" "}
                            <span className="hidden md:block">
                              {top_bar_data.call_label}
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div>
                        <ul className="flex items-center">
                          <li>
                            <Link
                              href="/login"
                              onClick={() => {
                                logout();
                              }}
                              className="hover:text-primary-900 font-semibold">
                              LOGIN
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="main-navigation py-3">
              {data.mid_bar &&
                data.mid_bar.map((mid_bar_data, index) => {
                  return (
                    <div
                      className="container flex items-center justify-between"
                      key={index}>
                      {mid_bar_data.logo &&
                        mid_bar_data.logo.map((mid_bar_logo_data, index) => {
                          return (
                            <div className="logo" key={index}>
                              <Link
                                href={mid_bar_logo_data.slug}
                                className="max-w-[150px] sm:max-w-auto block">
                                <img
                                  src={mid_bar_logo_data.img}
                                  alt={mid_bar_logo_data.alt}
                                />
                              </Link>
                            </div>
                          );
                        })}

                      <div className="flex items-center justify-end gap-5 lg:gap-10">
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

                          <ul className="lg:flex items-center lg:gap-1 text-sm lg:text-md text-dark-900 font-semibold">
                            {data.mega_menu &&
                              data.mega_menu.map((mega_menu_data, index) => {
                                const promo = mega_menu_data.promo;
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
                                      <div className="mega-menu hidden lg:absolute lg:top-[110px] lg:left-0 bg-white w-full pt-3">
                                        <div className="container">
                                          <div className="lg:flex lg:border-t lg:border-primary-800 lg:py-8">
                                            <div className="w-full grid lg:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
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
                                            {promo && (
                                              <div className="w-full hidden lg:block max-w-[300px] xl:max-w-[400px] shrink-0">
                                                <div className="py-10 px-5 lg:px-8 relative rounded-5xl overflow-hidden">

                                                  <div className="absolute top-0 left-0 w-full h-full">
                                                    <img
                                                      src={promo.image}
                                                      alt={promo.title}
                                                      className="block w-full h-full object-cover"
                                                    />
                                                  </div>

                                                  <div className="relative max-w-[200px]">
                                                    <h4 className="mb-3 text-2xl leading-[30px] lg:text-[28px]">
                                                      {promo.title}
                                                    </h4>

                                                    <p className="text-dark-900 text-md mb-5">
                                                      {promo.text}
                                                    </p>

                                                    <Link
                                                      href={promo.link}
                                                      className="btn btn-light btn-md shadow-btn mx-0">
                                                      View deals
                                                      <i className="fa-regular fa-arrow-right ml-3"></i>
                                                    </Link>
                                                  </div>

                                                </div>
                                              </div>
                                            )}
                                            {/* <div className="w-full hidden lg:block max-w-[300px] xl:max-w-[400px] shrink-0">
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
                                            </div> */}
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
                                // return mega_menu_data.menu ? (
                                //   <li
                                //     className={`menu-item-has-children ${acitive_class_slug(
                                //       mega_menu_data.slug
                                //     )}`}
                                //     // className="menu-item-has-children"
                                //     key={index}>
                                //     <Link
                                //       href="#"
                                //       className="hover:text-primary-900">
                                //       {mega_menu_data.label}
                                //     </Link>
                                //     <div className="mega-menu hidden lg:absolute lg:top-[98px] lg:left-0 bg-white w-full pt-3">
                                //       <div className="container">
                                //         <div className="lg:flex lg:border-t lg:border-primary-800 lg:py-8">
                                //           <div className="w-full lg:w-2/3 md:grid md:grid-cols-3">
                                //             {mega_menu_data.menu &&
                                //               mega_menu_data.menu.map(
                                //                 (menu_data, index) => {
                                //                   return (
                                //                     <div key={index}>
                                //                       <h4 className="text-lg font-bold mb-3">
                                //                         {menu_data.title}
                                //                       </h4>
                                //                       <ul className="text-lg text-dark-800">
                                //                         {menu_data.sub_menu &&
                                //                           menu_data.sub_menu.map(
                                //                             (
                                //                               sub_menu_data,
                                //                               index
                                //                             ) => {
                                //                               return (
                                //                                 <li key={index}>
                                //                                   <Link
                                //                                     href={
                                //                                       sub_menu_data.slug
                                //                                     }>
                                //                                     {
                                //                                       sub_menu_data.label
                                //                                     }
                                //                                   </Link>
                                //                                 </li>
                                //                               );
                                //                             }
                                //                           )}
                                //                       </ul>
                                //                     </div>
                                //                   );
                                //                 }
                                //               )}
                                //           </div>
                                //           <div className="w-full hidden lg:block max-w-[300px] xl:max-w-[400px] shrink-0">
                                //             <div className="py-10 px-5 lg:px-8 relative rounded-5xl overflow-hidden">
                                //               <div className="absolute top-0 left-0 w-full h-full">
                                //                 <img
                                //                   src="/assets/images/summer-escaps-img.png"
                                //                   alt="weekly-flash-deels-img"
                                //                   className="block w-full h-full object-cover"
                                //                 />
                                //               </div>
                                //               <div className="relative max-w-[200px]">
                                //                 <h4 className="mb-3 text-2xl leading-[30px] lg:text-[28px]">
                                //                   Summer escaps
                                //                 </h4>
                                //                 <p className="text-dark-900 text-md mb-5">
                                //                   Plan your next trip with us.
                                //                 </p>
                                //                 <Link
                                //                   href="destination"
                                //                   className="btn btn-light btn-md shadow-btn mx-0">
                                //                   View deals{" "}
                                //                   <i className="fa-regular fa-arrow-right ml-3"></i>
                                //                 </Link>
                                //               </div>
                                //             </div>
                                //           </div>
                                //         </div>
                                //       </div>
                                //     </div>
                                //   </li>
                                // ) : (
                                //   //active
                                //   <li
                                //     key={index}
                                //     className={acitive_class_slug(
                                //       mega_menu_data.slug
                                //     )}>
                                //     <Link
                                //       href={mega_menu_data.slug}
                                //       className="hover:text-primary-900">
                                //       {mega_menu_data.label}
                                //     </Link>
                                //   </li>
                                // );
                              })}
                          </ul>
                        </div>

                        <div className="flex items-center gap-5">
                          <div className="block lg:hidden">
                            <button
                              type="button"
                              onClick={e => {
                                handelOpenMenu(e);
                              }}
                              aria-expanded={OpenMenu ? "true" : "false"}>
                              <img
                                src="/assets/images/menu-toggle-icon.svg"
                                alt="menu-toggle-icon"
                              />
                            </button>
                          </div>
                          <div className="search-icon">
                            <Link
                              onClick={e => {
                                handelOpenSearch(e);
                              }}
                              href="/"
                              className={`bg-primary-900 rounded-full w-[40px] h-[40px] flex items-center justify-center text-white text-sm hover:bg-dark-900 ${OpenSearch ? "active" : ""
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
            className={`search-popup transition-all fixed -top-full left-0 w-full h-full bg-black/80 z-50 flex items-center ${OpenSearch ? "open" : ""
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
