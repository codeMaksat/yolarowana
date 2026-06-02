import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header({ initialValues }) {
  const router = useRouter();

  const [OpenMenu, setOpenMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const active_class_slug = slug => {
    const path = router.asPath.split("#")[0];

    if (path === slug) {
      return "active";
    }

    if (path.startsWith("/destination-") && slug === "/destination") {
      return "active";
    }

    if (path.startsWith("/tour-") && slug === "/tour") {
      return "active";
    }

    if (
      (path.startsWith("/blog-detail") || path === "/standard-blog") &&
      slug === "/blog"
    ) {
      return "active";
    }

    return "";
  };

  const handleOpenMenu = e => {
    e.preventDefault();
    setOpenMenu(prevClass => !prevClass);
  };

  const closeMobileMenu = () => {
    setOpenMenu(false);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = index => {
    setOpenMobileDropdown(prevIndex => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClasses = isScrolled ? "sticky-header" : "";

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <React.Fragment key={index}>
          <header
            className={`header relative z-20 ${headerClasses}${
              OpenMenu ? " header-open" : ""
            }`}
          >
            <div
              className="overlay lg:hidden"
              aria-expanded={OpenMenu ? "true" : "false"}
              onClick={closeMobileMenu}
            ></div>

            {data.top_bar &&
              data.top_bar.map((top_bar_data, index) => {
                return (
                  <div
                    className={`bg-primary-800 text-dark-900 text-sm font-medium overflow-hidden transition-all duration-300 ${
                      isScrolled
                        ? "max-h-0 py-0 opacity-0"
                        : "max-h-[40px] py-2 opacity-100"
                    }`}
                    key={index}
                  >
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
                                        className="hover:text-primary-900"
                                      >
                                        <i
                                          className={top_bar_media_data.icon}
                                        ></i>
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
                            className="flex items-center gap-4 hover:text-primary-900"
                          >
                            <i className={top_bar_data.call_icon}></i>
                            <span className="hidden md:block">
                              {top_bar_data.call_label}
                            </span>
                          </Link>
                        </div>
                      </div>

                      <div></div>
                    </div>
                  </div>
                );
              })}

            <div
              className={`main-navigation ${
                isScrolled ? "py-3 lg:py-1" : "py-3 lg:py-2"
              }`}
            >
              {data.mid_bar &&
                data.mid_bar.map((mid_bar_data, index) => {
                  return (
                    <div
                      className="container flex items-center justify-between"
                      key={index}
                    >
                      {mid_bar_data.logo &&
                        mid_bar_data.logo.map((mid_bar_logo_data, index) => {
                          return (
                            <div className="logo" key={index}>
                              <Link
                                href={mid_bar_logo_data.slug}
                                className="block transition-all"
                                onClick={closeMobileMenu}
                              >
                                <img
                                  src={mid_bar_logo_data.img}
                                  alt={mid_bar_logo_data.alt}
                                  className={`transition-all ${
                                    isScrolled
                                      ? "w-[170px] lg:w-[115px]"
                                      : "w-[190px] lg:w-[140px]"
                                  }`}
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
                            onClick={handleOpenMenu}
                            aria-expanded={OpenMenu ? "true" : "false"}
                          >
                            <img
                              src="/assets/images/close-dark.svg"
                              alt="menu-close-icon"
                            />
                          </button>

                          <ul className="lg:flex items-center lg:gap-2 xl:gap-4 text-sm lg:text-md text-dark-900 font-semibold">
                            {data.mega_menu &&
                              data.mega_menu.map((mega_menu_data, index) => {
                                const promo = mega_menu_data.promo;
                                const hasMegaMenu = !!mega_menu_data.menu;
                                const hasSubMenu = !!mega_menu_data.sub_menu;
                                const hasChildren = hasMegaMenu || hasSubMenu;
                                const isMobileDropdownOpen =
                                  openMobileDropdown === index;

                                if (!hasChildren) {
                                  return (
                                    <li
                                      key={index}
                                      className={active_class_slug(
                                        mega_menu_data.slug
                                      )}
                                    >
                                      <Link
                                        href={mega_menu_data.slug}
                                        className="block py-3 lg:py-2 lg:px-2 xl:px-3 hover:text-primary-900"
                                        onClick={closeMobileMenu}
                                      >
                                        {mega_menu_data.label}
                                      </Link>
                                    </li>
                                  );
                                }

                                if (hasMegaMenu) {
                                  return (
                                    <li
                                      className={`menu-item-has-children group ${active_class_slug(
                                        mega_menu_data.slug
                                      )}`}
                                      key={index}
                                    >
                                      <div className="flex items-center justify-between gap-3">
                                        <Link
                                          href={mega_menu_data.slug}
                                          className="flex items-center gap-1.5 py-3 lg:py-2 lg:px-2 xl:px-3 hover:text-primary-900 w-full lg:w-auto"
                                          onClick={e => {
                                            if (window.innerWidth < 1024) {
                                              e.preventDefault();
                                              toggleMobileDropdown(index);
                                            }
                                          }}
                                        >
                                          {mega_menu_data.label}
                                          <i className="fa-regular fa-chevron-down text-xs hidden lg:inline-block"></i>
                                        </Link>

                                      </div>

                                      <div
                                        className={`mega-menu bg-white w-full pt-3 ${
                                          isMobileDropdownOpen
                                            ? "block"
                                            : "hidden"
                                        } lg:hidden lg:group-hover:block lg:absolute lg:left-0 ${
                                          isScrolled
                                            ? "lg:top-[65px]"
                                            : "lg:top-[106px]"
                                        }`}
                                      >
                                        <div className="container lg:px-4 px-0">
                                          <div className="lg:flex lg:border-t lg:border-primary-800 lg:py-8 py-3">
                                            <div className="w-full grid lg:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-5">
                                              {mega_menu_data.menu &&
                                                mega_menu_data.menu.map(
                                                  (menu_data, index) => {
                                                    return (
                                                      <div key={index}>
                                                        <h4 className="text-lg font-bold mb-3">
                                                          {menu_data.title}
                                                        </h4>

                                                        <ul className="text-lg text-dark-800 space-y-3">
                                                          {menu_data.sub_menu &&
                                                            menu_data.sub_menu.map(
                                                              (
                                                                sub_menu_data,
                                                                index
                                                              ) => {
                                                                return (
                                                                  <li
                                                                    key={index}
                                                                    className={active_class_slug(
                                                                      sub_menu_data.slug
                                                                    )}
                                                                  >
                                                                    <Link
                                                                      href={
                                                                        sub_menu_data.slug
                                                                      }
                                                                      onClick={
                                                                        closeMobileMenu
                                                                      }
                                                                    >
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
                                                    <h4 className="mb-3 text-2xl leading-[30px] lg:text-[28px] text-white">
                                                      {promo.title}
                                                    </h4>

                                                    <p className="text-dark-900 text-md mb-5 text-white">
                                                      {promo.text}
                                                    </p>

                                                    <Link
                                                      href={promo.link}
                                                      className="btn btn-light btn-md shadow-btn mx-0"
                                                      onClick={closeMobileMenu}
                                                    >
                                                      View tours
                                                      <i className="fa-regular fa-arrow-right ml-3"></i>
                                                    </Link>
                                                  </div>
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                }

                                if (hasSubMenu) {
                                  return (
                                    <li
                                      className={`menu-item-has-children relative group ${active_class_slug(
                                        mega_menu_data.slug
                                      )}`}
                                      key={index}
                                    >
                                      <div className="flex items-center justify-between gap-3">
                                        <Link
                                          href={mega_menu_data.slug}
                                          className="flex items-center gap-1.5 py-3 lg:py-2 lg:px-2 xl:px-3 hover:text-primary-900 w-full lg:w-auto"
                                          onClick={e => {
                                            if (window.innerWidth < 1024) {
                                              e.preventDefault();
                                              toggleMobileDropdown(index);
                                            }
                                          }}
                                        >
                                          {mega_menu_data.label}
                                          <i className="fa-regular fa-chevron-down text-xs hidden lg:inline-block"></i>
                                        </Link>

                                      </div>

                                      <ul
                                        className={`sub-menu-list text-lg text-dark-800 lg:absolute lg:top-[calc(100%+7px)] lg:left-0 lg:border lg:border-gray-100 lg:w-[240px] lg:bg-white lg:p-5 lg:rounded-xl lg:shadow-box lg:transition-all lg:translate-y-4 lg:invisible lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100 lg:group-hover:translate-y-0 ${
                                          isMobileDropdownOpen
                                            ? "block mt-2 pl-4 pb-3 space-y-3"
                                            : "hidden lg:block"
                                        }`}
                                      >
                                        {mega_menu_data.sub_menu &&
                                          mega_menu_data.sub_menu.map(
                                            (sub_menu_data, index) => {
                                              return (
                                                <li
                                                  key={index}
                                                  className={active_class_slug(
                                                    sub_menu_data.slug
                                                  )}
                                                >
                                                  <Link
                                                    href={sub_menu_data.slug}
                                                    onClick={closeMobileMenu}
                                                  >
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

                                return null;
                              })}
                          </ul>
                        </div>

                        <div className="flex items-center gap-5">
                          <div className="block lg:hidden">
                            <button
                              type="button"
                              onClick={handleOpenMenu}
                              aria-expanded={OpenMenu ? "true" : "false"}
                            >
                              <img
                                src="/assets/images/menu-toggle-icon.svg"
                                alt="menu-toggle-icon"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </header>
        </React.Fragment>
      );
    })
  );
}