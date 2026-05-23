import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Photos_Sector = ({ photo_data }) => {
  return (
    photo_data &&
    photo_data.map((data, index) => {
      return (
        <div id="photos" className="mb-0 w-full scroll-mt-[150px]" key={index}>
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
              className="mySwiper w-full rounded-2xl !overflow-hidden"
            >
              {data.images &&
                data.images.map((images_data, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="rounded-2xl overflow-hidden relative h-[220px] sm:h-[260px] md:h-[340px] lg:h-[420px]">
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