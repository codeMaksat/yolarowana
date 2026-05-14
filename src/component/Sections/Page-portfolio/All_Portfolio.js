import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
const loadIsotope = () => require("isotope-layout");
const Isotope = typeof window !== "undefined" ? loadIsotope() : null;

const All_Portfolio = ({ initialValues }) => {
  // Ref of isotope container
  const containerRef = useRef();

  // Ref to store the isotope object
  const isotopeRef = useRef(null);

  const [filterKey, setFilterKey] = React.useState("*");

  /*  ============= Skeletone_loader ============   */

  useEffect(() => {
    setTimeout(() => {
      // Check if Isotope is available and the containerRef exists
      if (Isotope && containerRef.current) {
        isotopeRef.current = new Isotope(containerRef.current, {
          itemSelector: ".filter-item",
          layoutMode: "fitRows",
          columnWidth: ".grid-sizer",
          gutter: ".gutter-sizer",
        });
      }
    }, 2000);
  }, []);

  const handleFilterKeyChange = (e, key) => {
    e.preventDefault();
    setFilterKey(key);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && isotopeRef.current) {
      if (filterKey === "*") {
        isotopeRef.current.arrange({ filter: "*" });
      } else {
        isotopeRef.current.arrange({ filter: `.${filterKey}` });
      }
    }
  }, [filterKey]);

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <ul
                className="portfolio-list flex items-center justify-between md:justify-center bg-primary-800 rounded-md p-1.5 md:gap-4 mb-10"
                id="filters"
              >
                {data.menu &&
                  data.menu.map((menu_data, index) => {
                    return (
                      <li
                        className={
                          filterKey === menu_data.slug ? "current" : ""
                        }
                        key={index}
                      >
                        <Link
                          href="#"
                          className="block py-2 px-4 md:px-7 rounded-md text-dark-900 hover:bg-primary-900 hover:text-white"
                          onClick={(e) =>
                            handleFilterKeyChange(e, menu_data.slug)
                          }
                        >
                          {menu_data.label}
                        </Link>
                      </li>
                    );
                  })}
              </ul>

              <div
                ref={containerRef}
                id="container"
                className="filter-container flex -mx-4"
              >
                {data.product &&
                  data.product.map((product_data, index) => {
                    return (
                      <div
                        className={`relative group filter-item px-4 mb-4 w-full md:w-1/2 lg:w-1/3 ${product_data.category}`}
                        key={index}
                      >
                        <div className="relative overflow-hidden rounded-2xl after:w-full after:transition-all after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900 after:opacity-20 group-hover:after:opacity-40">
                          <Link href={product_data.slug} className="">
                            <img
                              src={product_data.image}
                              alt={product_data.alt}
                              className="transition-all group-hover:scale-105 w-full object-cover duration-300"
                            />
                          </Link>
                        </div>
                        <div className="py-4">
                          <h3 className="text-2xl leading-normal mb-0 flex items-center gap-2">
                            <Link
                              href={product_data.slug}
                              className="hover:text-primary-900"
                            >
                              {product_data.title}
                            </Link>
                          </h3>
                          <span className="text-md text-gray-800">
                            {product_data.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-16 mb-10 text-center">
                <Link
                  href={data.btn_slug}
                  className="btn btn-primary mx-auto flex items-center min-w-[190px]"
                >
                  {data.btn_label}
                  <span className="ml-1.5">
                    <svg
                      className="mx-auto d-block"
                      width="22"
                      height="22"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="loader_68">
                        <g className="loader_circle_1" id="loader_68_3">
                          <g id="Group 125">
                            <circle
                              id="Ellipse 304"
                              cx="30"
                              cy="30"
                              r="26"
                              fill="transparent"
                            />
                            <path
                              id="Intersect"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4 30H8C8 17.8497 17.8497 8 30 8C42.1503 8 52 17.8497 52 30H56C56 15.6406 44.3594 4 30 4C15.6406 4 4 15.6406 4 30Z"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                        <g className="loader_circle_2" id="loader_68_2">
                          <g id="Group 122">
                            <circle
                              id="Ellipse 302"
                              cx="30"
                              cy="30"
                              r="28"
                              fill="transparent"
                            />
                            <path
                              id="Intersect_2"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.2009 10.201L15.8578 15.8579C19.4771 12.2386 24.4771 10 29.9999 10C41.0456 10 49.9999 18.9543 49.9999 30H57.9999C57.9999 14.536 45.4639 2 29.9999 2C22.2679 2 15.2679 5.13401 10.2009 10.201Z"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                        <g className="loader_circle_3" id="loader_68_1">
                          <circle
                            id="Ellipse 301"
                            cx="30"
                            cy="30"
                            r="30"
                            fill="transparent"
                          />
                          <path
                            id="Intersect_3"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M60 30H48C48 20.0589 39.9411 12 30 12V0C46.5685 0 60 13.4315 60 30Z"
                            fill="currentColor"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Portfolio;
