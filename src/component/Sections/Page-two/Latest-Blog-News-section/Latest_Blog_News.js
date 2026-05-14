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
          key={index}
        >
          <div className="container">
            <div className="md:flex items-end justify-between mb-8 md:mb-14">
              <div className="mb-5 md:mb-0">
                <h2>{data.title}</h2>
                <p className="md:max-w-[500px] m-0">{data.label} </p>
              </div>
              <div>
                <Link href={data.btn_slug} className="btn btn-primary">
                  {data.btn_label}
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {data.product &&
                data.product.map((product_data, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <div className="relative w-full overflow-hidden before:pt-[75%] before:block rounded-xl">
                        <Link href={product_data.slug}>
                          <img
                            src={product_data.image}
                            alt={product_data.alt}
                            className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                          />
                        </Link>
                      </div>
                      <div className="py-5">
                        <div className="max-w-[380px]">
                          <h3 className="text-xl xl:leading-normal mb-2 hover:text-primary-900">
                            <Link href={product_data.slug}>
                              {product_data.title}
                            </Link>
                          </h3>
                          <span className="bg-white/80 rounded-md text-sm text-dark-800 mb-2 block max-w-fit">
                            {product_data.date}
                          </span>
                          <p className="text-md leading-normal mb-0 text-dark-800">
                            {product_data.summary}
                          </p>
                        </div>
                      </div>
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

export default Latest_Blog_News;
