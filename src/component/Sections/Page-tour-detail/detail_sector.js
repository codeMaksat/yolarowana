import React, { useState } from "react";
import Link from "next/link";

// Define the Detail_Sector component
const Detail_Sector = ({ detail_data }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };
  return (
    detail_data &&
    detail_data.map((data, index) => {
      return (
        <React.Fragment key={index}>
          <div
            id="detail"
            className="flex flex-wrap items-center justify-between mb-8"
            key={index}
          >
            <h3 className="text-1xl lg:text-25 mb-0 leading-normal">
              {data.title}
            </h3>
            <div className="text-[12px] text-dark-800 flex items-center gap-3 m-0 leading-md">
              <div className="flex items-center justify-end gap-2">
                <span className="flex items-center gap-1 text-[#FFC738]">
                  {generateStarIcons(data.rating)}
                </span>
              </div>
              <span className="w-full block text-right">
                ({data.review} Review)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-b border-primary-800 pb-5 mb-7">
            {data.service &&
              data.service.map((service_data, index) => {
                return (
                  <div className="flex gap-2 items-start" key={index}>
                    <img
                      src={service_data.image}
                      alt={service_data.alt}
                      width={service_data.width}
                      className="relative top-1"
                    />
                    <p className="m-0 text-md text-dark-900">
                      {service_data.title}{" "}
                      <span className="block">{service_data.label}</span>
                    </p>
                  </div>
                );
              })}
          </div>

          {data.overview &&
            data.overview.map((overview_data, index) => {
              return (
                <div
                  className="border-b border-primary-800 pb-5 mb-7"
                  key={index}
                >
                  <h4 className=" text-xl">{overview_data.title}</h4>
                  {overview_data.labels &&
                    overview_data.labels.map((labels_data, index) => {
                      return (
                        <p className="leading-1xl" key={index}>
                          {labels_data.label}
                        </p>
                      );
                    })}
                </div>
              );
            })}

          {data.included &&
            data.included.map((included_data, index) => {
              return (
                <div className="mb-10" key={index}>
                  <h4 className=" text-xl">{included_data.title}</h4>
                  <ul className="leading-[38px] list">
                    {included_data.details &&
                      included_data.details.map((details_data, index) => {
                        return <li key={index}>{details_data.label}</li>;
                      })}
                  </ul>
                </div>
              );
            })}
        </React.Fragment>
      );
    })
  );
};

export default Detail_Sector;
