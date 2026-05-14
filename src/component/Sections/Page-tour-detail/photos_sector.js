import React, { useState } from "react";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";

// Define the Photos_Sector component
const Photos_Sector = ({ photo_data }) => {
  return (
    photo_data &&
    photo_data.map((data, index) => {
      return (
        <div id="photos" className="mb-10 w-full" key={index}>
          <h4 className=" text-xl md:text-25">{data.title}</h4>
          <div className="photos-gallery-slider">
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[Navigation]}
              className="mySwiper w-full rounded-1xl !overflow-hidden"
            >
              {data.images &&
                data.images.map((images_data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="rounded-1xl overflow-hidden relative before:pt-[70%] md:before:pt-[45%] before:block">
                        <img
                          src={images_data.image}
                          alt={images_data.alt}
                          className="w-full h-full object-cover absolute top-0 left-0"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              <div className="slider-all">
                <div className="swiper-button-prev arrow"></div>
                <div className="swiper-button-next arrow"></div>
              </div>
            </Swiper>
          </div>
        </div>
      );
    })
  );
};

export default Photos_Sector;
