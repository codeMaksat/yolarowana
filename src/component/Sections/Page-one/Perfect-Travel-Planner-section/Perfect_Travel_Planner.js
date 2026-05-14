import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Perfect_Travel_Planner = ({ initialValues }) => {
  return (
    <section className="perfect-travel-section py-10 md:py-20 lg:py-28 relative">
      <div className="container">
        {initialValues &&
          initialValues.map((data, index) => {
            return (
              <div
                className="grid grid-cols-1 md:grid-cols-3 items-center gap-5"
                key={index}
              >
                {data.left_contain &&
                  data.left_contain.map((left_contain_data, index) => {
                    return (
                      <div className="text-center md:text-left" key={index}>
                        <h2>{left_contain_data.title}</h2>
                        <p>{left_contain_data.label}</p>
                        <div className="flex justify-center md:justify-start items-center mb-5">
                          {left_contain_data.customer_img &&
                            left_contain_data.customer_img
                              .slice(0, 4)
                              .map((customer_img_data, index) => (
                                <Image
                                  key={index}
                                  className="object-cover w-10 h-10 -mx-1 border-2 border-white rounded-full dark:border-gray-700 shrink-0 hover:z-1"
                                  src={customer_img_data.image}
                                  alt={customer_img_data.alt}
                                  width={36}
                                  height={36}
                                />
                              ))}
                          {left_contain_data.customer_img &&
                            left_contain_data.customer_img.length > 4 && (
                              <p className="flex items-center justify-center w-10 h-10 -mx-1 mb-0 text-md font-bold text-white bg-primary-900 border-2 border-white rounded-full">
                                +{left_contain_data.customer_img.length - 4}
                              </p>
                            )}
                        </div>
                        <p className="text-sm mb-0">
                          <span className="text-primary-900">
                            +{left_contain_data.count}
                          </span>{" "}
                          {left_contain_data.count_label}
                        </p>
                      </div>
                    );
                  })}
                {data.mid_contain &&
                  data.mid_contain.map((mid_contain_data, index) => {
                    return (
                      <div className="relative" key={index}>
                        <div className="overflow-hidden relative rounded-full mx-auto md:mx-0 max-w-[310px] before:pt-[140%]  before:block">
                          <Image
                            src={mid_contain_data.image}
                            alt={mid_contain_data.alt}
                            width={310}
                            height={434}
                            className="w-full h-full object-cover absolute top-0 left-0"
                          />
                        </div>
                        <div className="absolute bottom-0 -left-0 md:-left-8 w-[123px] h-[123px] rounded-full bg-primary-900 flex items-center justify-center text-white">
                          <svg
                            viewBox="0 0 100 100"
                            fill="currentColor"
                            width="102"
                            height="102"
                          >
                            <defs>
                              <path
                                id="circle"
                                d="M 50, 50
                                  m -37, 0
                                  a 37,37 0 1,1 74,0
                                  a 37,37 0 1,1 -74,0"
                              />
                            </defs>
                            <text fontSize="14">
                              <textPath
                                xlinkHref="#circle"
                                className="text-white"
                              >
                                {mid_contain_data.round_label}
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      </div>
                    );
                  })}
                {data.right_contain &&
                  data.right_contain.map((right_contain_data, index) => {
                    return (
                      <div className="text-center md:text-left" key={index}>
                        <h5 className="text-xl mb-5 font-bold">
                          {right_contain_data.title}
                        </h5>
                        <p className="mb-8">{right_contain_data.label}</p>
                        <div className="grid grid-cols-3 gap-2 lg:gap-5">
                          {right_contain_data.review &&
                            right_contain_data.review.map(
                              (review_data, index) => {
                                return (
                                  <div key={index}>
                                    <h4 className="text-primary-900 mb-0">
                                      {review_data.value}
                                    </h4>
                                    <p className="text-sm md:leading-xl font-medium">
                                      {review_data.label}
                                    </p>
                                  </div>
                                );
                              }
                            )}
                        </div>
                        <Link
                          href={right_contain_data.btn_slug}
                          className="btn btn-primary mx-auto md:mx-0"
                        >
                          {right_contain_data.btn_label}{" "}
                          <i
                            className={`${right_contain_data.btn_icon} ml-3`}
                          ></i>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Perfect_Travel_Planner;
