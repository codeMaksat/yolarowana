import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Adventure_Activity = ({ initialValues }) => {

  return (
    <section className="relative">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container relative z-1" key={index}>
              <div className="mb-8 md:mb-14 max-w-[500px]">
                <h2 className="">{data.title}</h2>
                <p className="">{data.label} </p>
              </div>
              <div className="trending-attractions-slider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={20}
                  loop={true}
                  pagination={{
                    el: ".swiper-pagination",
                    type: "progressbar",
                  }}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1199: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                  }}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper"
                >
                  {data.product &&
                    data.product.map((product_data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="text-center max-w-[250px] mx-auto">
                            <div className="overflow-hidden relative group rounded-[200px] before:block before:pt-[132%]">
                              <Link
                                href={product_data.slug}
                                className="absolute top-0 left-0 h-full w-full block"
                              >
                                <img
                                  src={product_data.image}
                                  alt={product_data.alt}
                                  className="transition-all group-hover:scale-105 w-full h-full object-cover duration-300"
                                />
                              </Link>
                            </div>
                            <div className="w-[84px] h-[84px] shadow-box-3 -mt-10 relative mb-4 rounded-full bg-white flex items-center justify-center mx-auto">
                              <img
                                src={product_data.icon}
                                alt={product_data.icon_alt}
                              />
                            </div>
                            <h3 className="text-xl mb-2">
                              {product_data.title}
                            </h3>
                            <p className="text-md mb-0">
                              {product_data.tour} Tours - For{" "}
                              <span className="text-primary-900">
                                {product_data.price}$
                              </span>
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  <div className="swiper-pagination !static !mt-10 bg-primary-800"></div>
                </Swiper>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Adventure_Activity;
