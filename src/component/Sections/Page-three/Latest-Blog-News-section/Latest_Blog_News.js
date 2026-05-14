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
                  View all
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-10">
              {data.single_item &&
                data.single_item.map((single_item_data, index) => {
                  return (
                    <div
                      className="relative group lg:row-span-3 md:col-span-2 lg:col-span-3"
                      key={index}
                    >
                      <div className="relative w-full overflow-hidden before:pt-[56%] before:block rounded-2xl">
                        <Link href={single_item_data.slug}>
                          <img
                            src="/assets/images/blog-detail-img-large.jpg"
                            alt="blog-img1"
                            className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                          />
                        </Link>
                      </div>
                      <div className="py-5">
                        <div className="">
                          <div className="flex gap-5 mb-3">
                            <span className="text-md text-dark-800 flex items-center gap-2">
                              <i className="fa-regular fa-calendar text-primary-900"></i>{" "}
                              {single_item_data.date}
                            </span>
                            <span className="text-md text-dark-800 flex items-center gap-2">
                              <i className="fa-sharp fa-light fa-pen-to-square text-primary-900"></i>{" "}
                              By {single_item_data.author}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-25 xl:leading-normal mb-2 hover:text-primary-900">
                            <Link href={single_item_data.slug}>
                              {single_item_data.title}
                            </Link>
                          </h3>
                          <p className="text-md leading-normal text-dark-800">
                            {single_item_data.label}
                          </p>
                          <Link
                            href={single_item_data.slug}
                            className="btn btn-primary"
                          >
                            Read more
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              {data.product &&
                data.product.map((product_data, index) => {
                  let classes = "";
                  if (index !== 2) {
                    classes = "border-b border-primary-800 lg:pb-10 mb-0";
                  } else {
                    classes = "";
                  }
                  return (
                    <div
                      className={`relative lg:flex items-center gap-5 group lg:col-span-2 ${classes}`}
                      key={index}
                    >
                      <div className="relative w-full lg:max-w-[210px] overflow-hidden before:pt-[72%] before:block rounded-2xl">
                        <Link href={product_data.slug}>
                          <img
                            src={product_data.image}
                            alt={product_data.alt}
                            className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                          />
                        </Link>
                      </div>
                      <div className="py-5">
                        <div className="">
                          <div className="flex gap-5 mb-3">
                            <span className="text-sm text-dark-800 flex items-center gap-2">
                              <i className="fa-regular fa-calendar text-primary-900"></i>{" "}
                              {product_data.date}
                            </span>
                            <span className="text-sm text-dark-800 flex items-center gap-2">
                              <i className="fa-sharp fa-light fa-pen-to-square text-primary-900"></i>{" "}
                              By {product_data.author}
                            </span>
                          </div>
                          <h3 className="text-xl xl:leading-normal mb-2 hover:text-primary-900">
                            <Link href={product_data.slug}>
                              Pack wisely before traveling
                            </Link>
                          </h3>
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
