import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Most_Liked_Tours = ({ initialValues }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };
  return (
    <section>
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="px-5 md:px-12 py-5 md:py-9 bg-primary-400 rounded-2xl xl:-mx-12">
                <div className="text-left mb-8 md:mb-14">
                  <h2>{data.title}</h2>
                  <p className="max-w-[590px]">{data.label}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {data.product &&
                    data.product.map((product_data, index) => {
                      return (
                        <div className="group relative" key={index}>
                          <div className=" w-full overflow-hidden rounded-2xl before:pt-[115%] before:block relative group-hover:opacity-75">
                            <Link
                              href={product_data.slug}
                              className="absolute top-0 left-0 h-full w-full"
                            >
                              <Image
                                src={product_data.image}
                                alt={product_data.alt}
                                width={358}
                                height={412}
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
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Most_Liked_Tours;
