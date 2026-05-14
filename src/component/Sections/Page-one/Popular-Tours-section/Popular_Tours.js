import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

// Import Swiper styles
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const Popular_Tours = ({ initialValues }) => {

  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };

  return (
    <section className="customers-purchased-section py-10 md:py-20 lg:py-28 overflow-hidden">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="mb-8 md:mb-14 flex items-end justify-between">
                <div className="max-w-[600px]">
                  <h2>{data.title}</h2>
                  <p className="m-0">{data.label}</p>
                </div>
                <div className="slider-arrow">
                  <div className="swiper-button-prev z-1 arrow"></div>
                  <div className="swiper-button-next z-1 arrow static m-0"></div>
                </div>
              </div>

              <div className="mt-6 popular-tours-slider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  navigation={{
                    nextEl: ".slider-arrow .swiper-button-next",
                    prevEl: ".slider-arrow .swiper-button-prev",
                  }}
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
                  modules={[Navigation]}
                  className="mySwiper !overflow-visible"
                >
                  {data.product &&
                    data.product.map((product_data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="group relative">
                            <div className=" w-full overflow-hidden rounded-2xl before:pt-[115%] before:block relative group-hover:opacity-75">
                              <Link
                                href={product_data.slug}
                                className="absolute top-0 left-0 h-full w-full"
                              >
                                <Image
                                  src={product_data.image}
                                  alt={product_data.alt}
                                  width={363}
                                  height={417}
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
                                    (1 )
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-[12px] font-semibold text-primary-900 line-through block">
                                    ${product_data.old_price}
                                  </span>
                                  <span className="text-md font-bold text-dark-900 block">
                                    ${product_data.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Popular_Tours;
