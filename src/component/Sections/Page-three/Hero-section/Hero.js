import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { EffectFade, Navigation, Pagination } from "swiper/modules";

const Hero = ({ initialValues }) => {
  const [keyword, setKeyword] = useState("");
  const [destination, setDestination] = useState("Where to?");
  const [duration, setDuration] = useState("Check in - Check out");

  const option = [
    { value: "Where to?" },
    { value: "Destination 1" },
    { value: "Destination 2" },
  ];
  const option2 = [
    { value: "Check in - Check out" },
    { value: "1 day" },
    { value: "1 day" },
  ];

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="hero-section hero-slider-section bg-white md:bg-primary-800 pb-10 md:pb-0 mb-10 relative py-0"
          key={index}>
          <Swiper
            effect={"fade"}
            pagination={{
              el: ".swiper-pagination",
              type: "fraction",
              clickable: true,
            }}
            navigation={{
              nextEl: ".hero-arrow .swiper-button-next",
              prevEl: ".hero-arrow .swiper-button-prev",
            }}
            modules={[EffectFade, Navigation, Pagination]}
            className="mySwiper w-full h-full">
            {data.product &&
              data.product.map((product_data, index) => {
                return (
                  <SwiperSlide
                    className="md:min-h-[calc(100vh-40px)] px-0 sm:px-24 pt-24 pb-96 sm:py-20 lg:py-28 grid content-end"
                    key={index}>
                    <div className="absolute top-0 right-0 w-full h-full before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black/40">
                      <img
                        src={product_data.image}
                        alt={product_data.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="container relative z-1">
                      <div className="flex justify-between mb-7 sm:mb-24">
                        <div className="max-w-sm lg:max-w-md xl:max-w-xl overflow-hidden">
                          <h6 className="text-lg font-semibold md:text-xl text-white">
                            {product_data.title}
                          </h6>
                          <h1 className="mb-5 md:mb-7 text-white text-3xl sm:text-4xl xl:text-65 leading-tight">
                            {product_data.label}
                            <br /> {product_data.label2}
                          </h1>
                        </div>
                        <div className="w-[100px] h-[100px] md:w-[230px] md:h-[230px] rounded-full flex items-center justify-center bg-primary-900/20">
                          <div className="w-[75px] h-[75px] md:w-[135px] md:h-[135px] rounded-full flex items-center justify-center bg-primary-900/20">
                            <Link
                              href={product_data.youtube_link}
                              className="popup-youtube bg-primary-900 text-white w-[55px] h-[55px] md:w-[70px] md:h-[70px] rounded-full flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="49"
                                height="48"
                                viewBox="0 0 49 48"
                                fill="none"
                                className="w-[30px] h-[30px] md:w-[48px] md:h-[48px]">
                                <path
                                  d="M12.7935 9.81575V38.1843C12.7935 38.7827 13.4012 39.1567 13.8874 38.8575L36.3747 24.6732C36.8515 24.374 36.8515 23.6353 36.3747 23.3361L13.8874 9.15188C13.4012 8.84333 12.7935 9.21734 12.7935 9.81575Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="hidden sm:flex justify-between">
                        {product_data.tour &&
                          product_data.tour.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className="text-white mb-3 sm:mb-0">
                                <span className="mb-2 block text-sm md:text-lg">
                                  {item.label}
                                </span>
                                <h2 className="text-white text-xl md:text-3xl mb-2 leading-normal">
                                  {item.label === "Price" && (
                                    <sup className="text-lg">$</sup>
                                  )}
                                  {item.value}
                                </h2>
                                <p className="m-0">{item.description}</p>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}

            <div className="hero-arrow max-w-[90px] w-full text-center absolute bottom-56 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 3xl:left-10 w-fit z-1">
              <div className="swiper-button-prev !static after:hidden !text-white !mx-auto !mb-2 !md:mb-6 !border !border-white !flex !items-center !justify-center !w-[42px] !h-[42px] !rounded-full !m-0">
                <i className="fa-solid fa-chevron-up"></i>
              </div>
              <div className="swiper-pagination !static !text-white !font-medium !text-lg !w-full"></div>
              <div className="swiper-button-next !static after:hidden !text-white !mx-auto !mt-3 !md:mt-6 !border !border-white !flex !items-center !justify-center !w-[42px] !h-[42px] !rounded-full !m-0">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </Swiper>

          <div className="block absolute right-5 md:right-14 top-1/2 space-y-1 md:space-y-3 z-1 transform -translate-y-2/4 text-center">
            {data.social_media &&
              data.social_media.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    target="_blank"
                    className="text-white block hover:text-primary-900 text-xl">
                    <i
                      className={`fa-brands fa-${item.platform.toLowerCase()}`}></i>
                  </Link>
                );
              })}
          </div>

          <div className="z-1 absolute -bottom-10 left-0 w-full">
            <div className="container">
              <div className="booking-form bg-white shadow-card rounded-xl px-5 py-5 text-left w-full  md:flex gap-5 items-end">
                <div className="w-full text-dark-800 font-normal text-lg">
                  <input
                    type="text"
                    placeholder="Type your keyword here...."
                    name=""
                    className="form-control"
                    value={keyword}
                    onChange={e => setKeyword(e.target.value)}
                  />
                </div>
                <div className="w-full text-dark-800 font-normal text-lg">
                  <select
                    className="form-control w-full py-4 border-b border-primary-800 outline-none shadow-none"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    option={option.value}>
                    {option.map((opt, index) => (
                      <option key={index} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full text-dark-800 font-normal text-lg">
                  <select
                    className="form-control w-full py-4 border-b border-primary-800 outline-none shadow-none"
                    value={duration}
                    onChange={e => setDuration(e.target.value)}>
                    {option2.map((opt, index) => (
                      <option key={index} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="fl">
                  <button
                    type="button"
                    className="bg-primary-900 btn gap-2 w-full max-w-full mt-5 md:mt-0 px-5 rounded-md flex items-center justify-center text-white text-xl hover:bg-dark-900">
                    <i className="fa-regular fa-magnifying-glass"></i> Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Hero;
