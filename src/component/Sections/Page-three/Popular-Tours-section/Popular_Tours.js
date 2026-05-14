import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Popular_Tours = ({ initialValues }) => {

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="py-0 md:py-12 popular-tours-slider" key={index}>
          <div className="container">
            <div className="md:flex items-end justify-between mb-8 md:mb-14">
              <div className="mb-5 md:mb-0">
                <h2>{data.title}</h2>
                <p className="md:max-w-[600px] m-0">{data.label} </p>
              </div>
              <div>
                <div className="slider-arrow text-2xl hidden md:flex items-center text-primary-900 gap-1">
                  <div className="swiper-button-prev !static !m-0 after:hidden">
                    <i className="fa-light fa-arrow-left text-primary-900"></i>
                  </div>
                  <div className="swiper-pagination !pagination-dotte !static !m-0 !flex !justify-center !items-center !gap-0"></div>
                  <div className="swiper-button-next !static !m-0 after:hidden">
                    <i className="fa-light fa-arrow-right text-primary-900"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="popular-tours-grid">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                }}
                // pagination={{
                // el: ".swiper-pagination1",
                //   clickable: true,
                // }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1199: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                  },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
              >
                {data.product &&
                  data.product.map((product_data, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <div className="relative group">
                          <div className="relative w-full overflow-hidden before:pt-[75%] before:block rounded-xl">
                            <Link href={product_data.slug}>
                              <img
                                src={product_data.image}
                                alt={product_data.alt}
                                className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                              />
                            </Link>
                          </div>
                          <div className="pb-5 -mt-6 relative">
                            <div className="shadow-box p-3 bg-white mb-5 rounded-md flex items-center justify-between w-[90%] mx-auto">
                              <div className="flex items-center gap-2 text-dark-900 text-md font-medium">
                                <i className="fa-regular fa-calendar text-lg"></i>{" "}
                                {product_data.day} Days
                              </div>
                              <div className="text-primary-900 text-md font-bold">
                                ${product_data.price}
                              </div>
                            </div>
                            <div className="text-center">
                              <h3 className="text-xl xl:leading-normal mb-2 hover:text-primary-900">
                                <Link href={product_data.slug}>
                                  {product_data.title}
                                </Link>
                              </h3>
                              <p className="text-md leading-normal mb-2 flex items-center justify-center text-dark-800">
                                <i className="fa-solid fa-location-dot mr-2"></i>{" "}
                                {product_data.city}, {product_data.country}
                              </p>
                              <p className="text-md leading-normal mb-0 text-dark-800">
                                {product_data.label}
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Popular_Tours;
