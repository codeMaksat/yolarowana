import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Top_Destinations = ({ initialValues }) => {

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="top-destinations-section-three" key={index}>
          <div className="container">
            <div className="text-center mb-8 md:mb-14">
              <h2>{data.title}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-7">
              {data.product &&
                data.product.map((product_data, index) => {
                  let classes = "";
                  if (index === 0 || index === 5) {
                    classes =
                      "category-box col-span-2 before:block before:pt-[60%] overflow-hidden group rounded-1xl relative after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[150px] after:bg-gradient-to-t after:from-black after:to-black/0";
                  } else {
                    classes =
                      "category-box before:block before:pt-[120%] overflow-hidden group rounded-1xl relative after:block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[150px] after:bg-gradient-to-t after:from-black after:to-black/0";
                  }
                  return (
                    <div className={classes} key={index}>
                      <img
                        src={product_data.image}
                        alt={product_data.alt}
                        className="transition-all group-hover:scale-105 absolute top-0 left-0"
                      />
                      <div className="categories-detail text-left relative z-1">
                        <Link
                          href={product_data.slug}
                          className="text-left block"
                        >
                          <h4>{product_data.title}</h4>
                          <div className="tours-btn m-0">
                            {product_data.tour} Tours
                          </div>
                        </Link>
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

export default Top_Destinations;
