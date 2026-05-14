import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

const Customer_Reviews = ({ initialValues }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="customer-reviews-section py-10 bg-contain bg-center bg-no-repeat"
          key={index}
          style={{
            backgroundImage: 'url("/assets/images/customer-reviews-bg.png")',
          }}
        >
          <div className="container">
            <div className="text-center mb-8 md:mb-14">
              <h2>{data.title}</h2>
              <p className="max-w-[590px] mx-auto">{data.label} </p>
            </div>

            <div className="testimonial-full-slider max-w-[750px] mx-auto mt-8 md:mt-0 md:pl-6 lg:pl-12">
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {data.review &&
                  data.review.map((review_data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="swiper-slide">
                          <div className="text-center">
                            <div className="w-[115px] h-[115px] overflow-hidden rounded-full relative mx-auto mb-5">
                              <img
                                src={review_data.image}
                                alt={review_data.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="mt-5">
                              <h5 className="text-lg mb-0 block font-bold">
                                {review_data.title}
                              </h5>
                              <span className="text-dark-800 text-md">
                                {review_data.country}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 mb-4 text-md text-yellow-900">
                              {generateStarIcons(review_data.rating)}
                            </div>
                            <p className="text-dark-900 text-lg mb-4">
                              {review_data.comment}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                <div className="slider-arrow text-2xl flex items-center text-primary-900 justify-center max-w-fit mx-auto gap-1">
                  <div className="swiper-button-prev !static !m-0 after:hidden">
                    <i className="fa-light fa-arrow-left text-primary-900"></i>
                  </div>
                  <div className="swiper-pagination !static !m-0 !flex !justify-center !items-center !gap-0"></div>
                  <div className="swiper-button-next !static !m-0 after:hidden">
                    <i className="fa-light fa-arrow-right text-primary-900"></i>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Customer_Reviews;
