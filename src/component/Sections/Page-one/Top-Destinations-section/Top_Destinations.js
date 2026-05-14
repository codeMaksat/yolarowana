import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Top_Destinations = ({ initialValues }) => {
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-8 md:mb-14">
                <h2>{data.title}</h2>
                <p className="max-w-[590px] mx-auto">{data.label}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
                {data.product &&
                  data.product.map((product_data, index) => {
                    return (
                      <div
                        className="category-box overflow-hidden group rounded-1xl relative"
                        key={index}
                      >
                        <Image
                          src={product_data.image}
                          alt={product_data.alt}
                          width={361}
                          height={252}
                          className="transition-all group-hover:scale-105"
                        />
                        <div className="categories-detail">
                          <Link href={product_data.slug}>
                            <h4>{product_data.title}</h4>
                            <div className="tours-btn">
                              {product_data.count} Tours
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-12">
                <Link href="destination" className="btn btn-primary mx-auto">
                  Explore all <i className="fa-regular fa-arrow-right ml-3"></i>
                </Link>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Top_Destinations;
