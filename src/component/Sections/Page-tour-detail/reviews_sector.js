import React, { useState } from "react";
import Link from "next/link";

// Define the Reviews_Sector component
const Reviews_Sector = ({ reviews_data }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };

  return (
    reviews_data &&
    reviews_data.map((data, index) => {
      return (
        <div
          className="guest-reviews border-t border-primary-800 pt-3 mb-10"
          key={index}
        >
          <h2 className="border-b border-primary-800 pb-4 mb-2 text-xl font-bold">
            {data.title}
          </h2>

          <div className="md:flex gap-10">
            <div className="">
              {data.review &&
                data.review.map((review_data, index) => {
                  return (
                    <div
                      className="py-5 border-b border-primary-800"
                      key={index}
                    >
                      <div className="flex flex-wrap items-center justify-between mb-6">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 overflow-hidden rounded-full">
                            <img
                              src={review_data.image}
                              alt={review_data.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="text-lg mb-0 font-semibold leading-normal">
                              {review_data.user_name}
                            </h5>
                            <span className="block text-dark-800 text-15">
                              {review_data.date}
                            </span>
                          </div>
                        </div>

                        <div className="text-lg text-dark-800 flex items-center gap-3 my-1 leading-md">
                          <div className="flex items-center justify-end gap-2">
                            <span className="flex items-center gap-1 text-[#FFC738]">
                              {generateStarIcons(review_data.rating)}
                            </span>
                          </div>
                          <span className="w-full block text-right">
                            ({review_data.review})
                          </span>
                        </div>
                      </div>
                      <div>
                        <p>{review_data.label}</p>
                      </div>
                      <div className="flex items-center gap-8 text-dark-800 text-lg">
                        <Link
                          href="#"
                          className="flex items-center gap-3 text-primary-900"
                        >
                          <i className="fa-solid fa-thumbs-up"></i> Helpful
                        </Link>
                        <Link
                          href="#"
                          className="flex items-center gap-3 hover:text-primary-900"
                        >
                          <i className="fa-solid fa-thumbs-down"></i> Not
                          Helpful
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>

            {data.exceptional &&
              data.exceptional.map((exceptional_data, index) => {
                return (
                  <div
                    className="md:max-w-[310px] shrink-0 w-full pt-5"
                    key={index}
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-primary-900 rounded-md flex items-center justify-center text-white font-bold text-lg">
                        {exceptional_data.review}
                      </div>
                      <div>
                        <h5 className="text-lg mb-0 font-bold leading-normal">
                          {exceptional_data.title}
                        </h5>
                        <span className="block text-dark-800 text-15">
                          {exceptional_data.total_review} reviews
                        </span>
                      </div>
                    </div>
                    {exceptional_data.details &&
                      exceptional_data.details.map((details_data, index) => {
                        return (
                          <div className="relative min-w-full mt-8" key={index}>
                            <div className="flex items-center justify-between mb-1.5">
                              <h5 className="text-lg mb-0 font-bold leading-normal">
                                {details_data.title}
                              </h5>
                              <span className="text-lg mb-0 font-normal text-dark-800 leading-normal">
                                {details_data.value}
                              </span>
                            </div>
                            <div className="h-1 bg-primary-800">
                              <div
                                className="absolute h-1 bg-primary-900 w-0 left-0"
                                style={details_data.rating}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      );
    })
  );
};

export default Reviews_Sector;
