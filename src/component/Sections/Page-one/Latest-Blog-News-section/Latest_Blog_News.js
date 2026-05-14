import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Latest_Blog_News = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="latest-blog-section py-10 md:py-16 relative"
          key={index}>
          <div className="container">
            <div className="md:max-w-[450px] mb-8 md:mb-14">
              <h2>{data.title}</h2>
              <p className="m-0">{data.label}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {data.product &&
              data.product.map((product_data, index) => {
                return (
                  <div className="relative group" key={index}>
                    <Link
                      href={product_data.slug}
                      className="absolute top-0 right-0 w-full h-full z-2"></Link>
                    <div className="absolute top-4 right-4 bg-primary-900 w-11 h-11 flex items-center justify-center z-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M20.125 3.59382C20.125 3.4032 20.0493 3.22038 19.9145 3.08559C19.7797 2.95079 19.5969 2.87507 19.4062 2.87507H10.7812C10.5906 2.87507 10.4078 2.95079 10.273 3.08559C10.1382 3.22038 10.0625 3.4032 10.0625 3.59382C10.0625 3.78444 10.1382 3.96726 10.273 4.10205C10.4078 4.23685 10.5906 4.31257 10.7812 4.31257H17.6712L3.08487 18.8974C3.01804 18.9643 2.96503 19.0436 2.92887 19.1309C2.8927 19.2182 2.87408 19.3118 2.87408 19.4063C2.87408 19.5008 2.8927 19.5944 2.92887 19.6817C2.96503 19.769 3.01804 19.8484 3.08487 19.9152C3.15169 19.982 3.23103 20.035 3.31834 20.0712C3.40565 20.1074 3.49924 20.126 3.59374 20.126C3.68825 20.126 3.78183 20.1074 3.86914 20.0712C3.95646 20.035 4.03579 19.982 4.10262 19.9152L18.6875 5.32888V12.2188C18.6875 12.4094 18.7632 12.5923 18.898 12.7271C19.0328 12.8618 19.2156 12.9376 19.4062 12.9376C19.5969 12.9376 19.7797 12.8618 19.9145 12.7271C20.0493 12.5923 20.125 12.4094 20.125 12.2188V3.59382Z"
                          fill="white"
                          stroke="white"
                        />
                      </svg>
                    </div>
                    <div className="relative overflow-hidden before:top-[110%] before:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900/30">
                      <Image
                        src={product_data.image}
                        alt={product_data.alt}
                        width={459}
                        height={537}
                        className="transition-all group-hover:scale-105 w-full h-full object-cover duration-300"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                      <div className="max-w-[380px]">
                        <span className="bg-white/80 rounded-md px-2 text-12 text-dark-900 mb-3 block max-w-fit">
                          {product_data.date}
                        </span>
                        <h3 className="text-xl xl:text-[25px] xl:leading-normal text-white mb-2">
                          {product_data.title}
                        </h3>
                        <p className="text-md leading-normal mb-0">
                          {product_data.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      );
    })
  );
};

export default Latest_Blog_News;
