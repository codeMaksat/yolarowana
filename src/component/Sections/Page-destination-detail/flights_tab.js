import React, { useState } from "react";
import Link from "next/link";

// Define the Flights_Tab component
const Flights_Tab = ({ flights_data }) => {
  return (
    <div className="mb-10">
      {flights_data &&
        flights_data.map((data, index) => {
          return (
            <div
              className="flex flex-wrap md:flex-nowrap border border-primary-800 bg-primary-800/20 rounded-xl"
              key={index}
            >
              <div className="w-full py-6 px-6 grid items-center justify-center md:max-w-[118px] shrink-0 border-b md:border-b border-primary-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <g clipPath="url(#clip0_86_744)">
                    <path
                      d="M46.9093 1.09096C47.9093 2.27277 48.0456 3.95459 47.3183 6.13641C46.5911 8.31823 45.3638 10.2728 43.6365 12L38.1479 17.4887L43.6024 41.216C43.7161 41.6478 43.5797 42.0228 43.1933 42.341L38.8297 45.6137C38.6706 45.75 38.4547 45.8182 38.182 45.8182C38.0911 45.8182 38.0115 45.8069 37.9433 45.7841C37.6024 45.716 37.3638 45.5341 37.2274 45.2387L27.7161 27.9205L18.8865 36.75L20.6933 43.3637C20.807 43.75 20.7161 44.1023 20.4206 44.4205L17.1479 47.6932C16.9433 47.8978 16.682 48 16.3638 48H16.2956C15.9547 47.9546 15.682 47.8069 15.4774 47.5569L9.03426 38.966L0.443351 32.5228C0.193351 32.3637 0.045624 32.1023 0.000169486 31.7387C-0.0225578 31.4432 0.0797149 31.1591 0.306988 30.8864L3.57971 27.5796C3.78426 27.375 4.04562 27.2728 4.36381 27.2728C4.50017 27.2728 4.59108 27.2841 4.63653 27.3069L11.2502 29.1137L20.0797 20.2841L2.76153 10.7728C2.44335 10.591 2.25017 10.3182 2.18199 9.95459C2.13653 9.59096 2.23881 9.28414 2.48881 9.03414L6.85244 4.6705C7.17062 4.37505 7.51153 4.28414 7.87517 4.39777L30.5456 9.81823L36.0002 4.36368C37.7274 2.63641 39.682 1.40914 41.8638 0.681864C44.0456 -0.0454084 45.7274 0.0909552 46.9093 1.09096Z"
                      fill="#645CBB"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_86_744">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              {data.details &&
                data.details.map((details_data, index) => {
                  let classnames = "";
                  if (index === 0 || index === 2) {
                    classnames = "md:border-l border-primary-800";
                  } else if (index === 1 || index === 3) {
                    classnames = "border-l border-primary-800";
                  } else if (index === 4) {
                    classnames =
                      "border-r md:border-r-0 md:border-l border-primary-800";
                  }
                  return (
                    <div
                      className={`w-1/2 md:w-full py-3 md:py-6 px-3 md:px-6 grid items-center ${classnames}`}
                      key={index}
                    >
                      <div>
                        <h3 className="text-md md:text-lg mb-0 leading-normal mb-2">
                          {details_data.title}
                        </h3>
                        <span className="block text-dark-800 text-md md:text-lg">
                          {details_data.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Flights_Tab;