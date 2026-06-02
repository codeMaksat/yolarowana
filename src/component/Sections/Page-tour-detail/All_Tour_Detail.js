import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Itinerary_Sector from "./itinerary_sector";
import Faq_Sector from "./faq_sector";
import Map_Sector from "./map_sector";
import Photos_Sector from "./photos_sector";
import Side_Bar from "./side_bar";
import Detail_Sector from "./detail_sector";

const Included_Excluded_Sector = ({ detail_data }) => {
  return (
    detail_data &&
    detail_data.map((data, index) => {
      return (
        <div id="included" className="mb-10 scroll-mt-[160px]" key={index}>
          <div className="grid md:grid-cols-2 gap-6">
            {data.included &&
              data.included.map((included_data, index) => {
                return (
                  <div
                    className="border border-primary-800 rounded-2xl p-5 bg-white"
                    key={index}
                  >
                    <h4 className="text-xl mb-4">{included_data.title}</h4>

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
                    <h4 className="text-xl mb-4">{not_included_data.title}</h4>

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

const All_Tour_Detail = ({ initialValues }) => {
  const [activeSection, setActiveSection] = useState("detail");
  const menuRef = useRef(null);

  const menuItems = [
    { id: "detail", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "included", label: "Included" },
    { id: "map", label: "Map" },
    { id: "faq", label: "FAQ" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "detail";

      menuItems.forEach((item) => {
        const section = document.getElementById(item.id);

        if (section) {
          const sectionTop = section.offsetTop - 180;

          if (window.scrollY >= sectionTop) {
            currentSection = item.id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

  const getMenuClass = (id) => {
    const baseClass =
      "px-7 py-2 text-md leading-normal md:text-lg rounded-full font-semibold block transition-all duration-200 whitespace-nowrap";

    const activeClass = "bg-primary-900 text-white";

    const inactiveClass =
      "text-dark-800 hover:bg-primary-900 hover:text-white";

    return `${baseClass} ${
      activeSection === id ? activeClass : inactiveClass
    }`;
  };

  return (
    <section className="py-8 md:py-12 lg:py-14">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <h2 className="mb-3 md:mb-4">{data.title}</h2>

              <div className="text-md md:text-lg leading-normal mb-5 flex items-center gap-2">
                <i className={`${data.icon} text-primary-900`}></i>
                {data.icon_label}
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
                    {menuItems.map((item) => {
                      return (
                        <li key={item.id} className="shrink-0">
                          <Link
                            href={`#${item.id}`}
                            data-menu-id={item.id}
                            className={getMenuClass(item.id)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="tabs-content">
                    <Detail_Sector detail_data={data.detail} />

                    <Itinerary_Sector itinerary_data={data.itinerary} />

                    <Included_Excluded_Sector detail_data={data.detail} />

                    <Map_Sector map_data={data.map} />

                    <Faq_Sector faq_data={data.faq} />
                  </div>
                </div>

                <Side_Bar sideBar_data={data.side_bar} />
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_Detail;