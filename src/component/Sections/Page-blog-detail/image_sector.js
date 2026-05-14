import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Image_Sector component
const Image_Sector = ({ image_data }) => {
  return (
    <div className="mb-6 md:mb-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
      {image_data &&
        image_data.map((data, index) => {
          let classnames = "";
          if (index === 0) {
            classnames = "col-span-2 md:col-span-2 md:row-span-2";
          } else {
            classnames = "";
          }
          return (
            <div
              className={`rounded-1xl overflow-hidden before:block before:pt-[66%] relative ${classnames}`}
              key={index}>
              <Image
                src={data.image}
                alt={data.alt}
                width={270}
                height={178}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          );
        })}
    </div>
  );
};

export default Image_Sector;
