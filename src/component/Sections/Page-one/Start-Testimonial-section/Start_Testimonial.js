import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Start_Testimonial = ({ initialValues }) => {
  const generateStarIcons = rating => {
    const stars = [];
    const maxRating = 5;

    for (let i = 0; i < maxRating; i++) {
      const starClass = i < rating ? "text-yellow-900" : "text-gray-300";

      stars.push(
        <svg
          key={i}
          className={`w-3 h-3 ${starClass}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20">
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="testimonial-section py-10 md:py-16 relative"
          key={index}>
          <div className="container">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-2/5">
                <div className="md:max-w-[406px]">
                  <h2>{data.title}</h2>
                  <p>{data.label}</p>
                </div>
              </div>
              <div className="testimonial-slider w-full md:w-3/5 lg:pl-14">
                <div className="slider-arrow">
                  <div className="swiper-button-prev z-1 arrow"></div>
                  <div className="swiper-button-next z-1 arrow static m-0"></div>
                </div>
                <Swiper
                  className="mySwiper !py-5 !px-3"
                  slidesPerView={2}
                  spaceBetween={30}
                  navigation={{
                    nextEl: ".slider-arrow .swiper-button-next",
                    prevEl: ".slider-arrow .swiper-button-prev",
                  }}
                  pagination={{
                    el: ".testimonial-full-slider .swiper-pagination",
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}>
                  {data.review &&
                    data.review.map((review_data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="shadow-card-3 p-5 bg-white rounded-4xl">
                            <div className="flex items-center space-x-1 text-yellow-900 mb-5">
                              {generateStarIcons(review_data.rating)}
                            </div>
                            <p className="text-dark-900 text-md mb-10">
                              {review_data.comment}
                            </p>

                            <div className="flex border-t border-gray-100 pt-3">
                              <figcaption className="flex justify-center items-center space-x-3">
                                <Image
                                  className="w-10 h-10 rounded-full shrink-0"
                                  src={review_data.image}
                                  alt={review_data.alt}
                                  width={40}
                                  height={40}
                                />
                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                  <div className="text-dark-900 text-sm font-bold leading-normal">
                                    {review_data.user_name}
                                  </div>
                                  <div className="text-10 font-light text-dark-800 leading-normal dark:text-gray-400">
                                    {review_data.country}
                                  </div>
                                </div>
                              </figcaption>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
          {data.bg_image &&
            data.bg_image.map((bg_image_data, index) => {
              return (
                <div
                  className={`absolute bottom-0 ${
                    index === 0 ? "left" : "right"
                  }-0`}
                  key={index}>
                  <Image src={bg_image_data.image} alt={bg_image_data.alt} width={551} height={388} />
                </div>
              );
            })}
        </section>
      );
    })
  );
};

export default Start_Testimonial;
