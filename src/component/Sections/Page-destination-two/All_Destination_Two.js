import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const All_Destination_Two = ({ initialValues }) => {
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 md:gap-y-6">
                {data.product &&
                  data.product.map((product_data, index) => {
                    return (
                      <div className="relative group" key={index}>
                        <div className="relative overflow-hidden rounded-2xl before:pt-[115%] before:block after:w-full after:transition-all after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900 after:opacity-20 group-hover:after:opacity-40">
                          <Link href={product_data.slug} className="">
                            <Image
                              src={product_data.image}
                              alt={product_data.alt}
                              width={379}
                              height={360}
                              className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                            />
                          </Link>
                        </div>
                        <div className="py-4 flex items-center justify-between">
                          <h3 className="text-[24px] xl:leading-normal mb-0 flex items-center gap-2">
                            <i className="fa-solid fa-location-dot text-primary-900"></i>
                            <Link
                              href={product_data.slug}
                              className="hover:text-primary-900">
                              {product_data.title}
                            </Link>
                          </h3>
                          <span className="text-lg text-gray-800">
                            {product_data.count}+ Trips
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="mt-5 md:mt-16 mb-10 text-center">
                <Link
                  href={data.btn_slug}
                  className="btn btn-primary mx-auto flex items-center min-w-[190px]">
                  {data.btn_label}
                  <span className="ml-1.5">
                    <svg
                      className="mx-auto d-block"
                      width="22"
                      height="22"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
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

export default All_Destination_Two;
