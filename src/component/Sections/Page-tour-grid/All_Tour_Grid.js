import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Blog_Side_Bar } from "@/component/comman";

const All_Tour_Grid = ({ initialValues, side_bar_data }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="md:flex md:-mx-3 lg:-mx-5">
                <Blog_Side_Bar Data={side_bar_data} orders={2} />

                <div className="w-full md:pr-5 lg:pr-10 md:px-5 md:order-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {data.product &&
                      data.product.map((product_data, index) => {
                        return (
                          <div className="group relative" key={index}>
                            <div className=" w-full overflow-hidden rounded-2xl before:pt-[115%] before:block relative group-hover:opacity-75">
                              <Link
                                href={product_data.slug}
                                className="absolute top-0 left-0 h-full w-full"
                              >
                                <img
                                  src={product_data.image}
                                  alt={product_data.alt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </Link>
                            </div>
                            <div className="mt-5">
                              <h3 className="text-1xl text-dark-700 leading-2xl mb-5 group-hover:text-primary-900">
                                <Link href={product_data.slug}>
                                  {product_data.title}
                                </Link>
                              </h3>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <p className="text-md font-medium text-black mb-2 leading-md">
                                    {product_data.day} Days {product_data.night}{" "}
                                    Nights
                                  </p>
                                  <p className="text-[12px] flex items-center gap-2 text-dark-800 m-0 leading-md">
                                    <span className="flex items-center gap-1 text-[#FFC738]">
                                      {generateStarIcons(product_data.rating)}
                                    </span>
                                    ({product_data.review} Review)
                                  </p>
                                </div>
                                <div className="text-right">
                                  {product_data.old_price && (
                                    <span className="text-[12px] font-semibold text-primary-900 line-through block">
                                      ${product_data.old_price}
                                    </span>
                                  )}
                                  <span className="text-md font-bold text-dark-900 block">
                                    ${product_data.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="mt-16 mb-10">
                    <Link
                      href={data.btn_slug}
                      className="btn btn-primary flex items-center min-w-[190px]"
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
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_Grid;
