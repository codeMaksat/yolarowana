import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const Customer_Reviews = ({ initialValues }) => {
  return (
    <section className="customer-reviews-section bg-primary-800 py-10">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div>
                  <div className="overflow-hidden relative rounded-5xl before:block before:pt-full">
                    <img
                      src={data.image}
                      alt={data.alt}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <Link
                      href={data.video_slug}
                      target="_blank"
                      className="text-white w-12 h-12 md:w-20 md:h-20 -ml-6 -mt-6 md:-ml-10 md:-mt-10 absolute inset-y-1/2 transition-all duration-300 inset-x-1/2 border-2 border-white rounded-2xl flex items-center justify-center hover:text-primary-900 hover:bg-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="38"
                        viewBox="0 0 30 38"
                        className="w-5 md:w-auto "
                        fill="none">
                        <path
                          d="M26.7625 16.9852L8.08143 4.80185C7.82941 4.64955 7.55219 4.58189 7.27501 4.60502C6.99782 4.62815 6.72947 4.74134 6.49439 4.93429C6.2593 5.12724 6.06495 5.39381 5.92902 5.70975C5.79309 6.02569 5.71991 6.38096 5.71612 6.74321V31.0994C5.71377 31.4712 5.785 31.8376 5.92292 32.163C6.06085 32.4885 6.26081 32.762 6.50348 32.9572C6.74615 33.1524 7.02331 33.2627 7.30819 33.2773C7.59307 33.2919 7.87602 33.2104 8.1297 33.0407L26.7625 20.8574C27.0385 20.6767 27.2706 20.3994 27.4328 20.0566C27.5949 19.7138 27.6808 19.3189 27.6808 18.916C27.6808 18.5132 27.5949 18.1183 27.4328 17.7755C27.2706 17.4327 27.0385 17.1554 26.7625 16.9747V16.9852Z"
                          fill="currentColor"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="customer-reviews-slider mt-8 md:mt-0 md:pl-6 lg:pl-12">
                  <h2 className="text-30 sm:text-3xl mb-6 md:mb-10">
                    {data.title}
                  </h2>

                  <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper">
                    {data.testimonial &&
                      data.testimonial.map((testimonial_data, index) => (
                        <SwiperSlide key={index}>
                          <p className="text-dark-900 text-xl mb-4">
                            {testimonial_data.text}
                          </p>
                          <div className="w-[70px] h-[70px] overflow-hidden rounded-full relative">
                            <img
                              src={testimonial_data.image}
                              alt={testimonial_data.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-5">
                            <h5 className="text-md mb-0 block font-bold">{`- ${testimonial_data.author}`}</h5>
                            <span className="text-dark-800 text-15">
                              {testimonial_data.company}
                            </span>
                          </div>
                        </SwiperSlide>
                      ))}
                    <div className="swiper-pagination static mt-5 text-left "></div>
                  </Swiper>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Customer_Reviews;
