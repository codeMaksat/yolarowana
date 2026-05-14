import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const Why_Choose = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="bg-primary-800" key={index}>
          <div className="container">
            <div className="text-center mb-8 md:mb-14">
              <h2>{data.title}</h2>
              <p className="max-w-[590px] mx-auto">{data.label} </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {data.product &&
                data.product.map((product_data, index) => {
                  return (
                    <div
                      className="rounded-tr-[25px] rounded-bl-[25px] shadow-card-2 bg-white p-5"
                      key={index}
                    >
                      <div className="w-[70px] h-[70px] rounded-full border-[5px] border-[#645cbb42] bg-primary-800 flex items-center justify-center mb-3">
                        <img
                          src={product_data.image}
                          alt={product_data.alt}
                          className=""
                        />
                      </div>
                      <h3 className="text-md md:text-lg mb-2">
                        {product_data.title}
                      </h3>
                      <p className="text-md mb-0">{product_data.label}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Why_Choose;
