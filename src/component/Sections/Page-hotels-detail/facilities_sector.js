import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Facilities_Sector component
const Facilities_Sector = ({ facilities_data }) => {
  return (
    facilities_data &&
    facilities_data.map((data, index) => {
      return (
        <div className="mb-7 md:mb-14 max-w-[900px]" key={index}>
          <h4 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-8">
            {data.title}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-dark-800">
            {data.details &&
              data.details.map((details_data, index) => {
                return (
                  <li className="flex items-center gap-3" key={index}>
                    <Image
                      src={details_data.image}
                      alt={details_data.alt}
                      width={23}
                      height={23}
                    />
                    {details_data.label}
                  </li>
                );
              })}
          </ul>
        </div>
      );
    })
  );
};

export default Facilities_Sector;
