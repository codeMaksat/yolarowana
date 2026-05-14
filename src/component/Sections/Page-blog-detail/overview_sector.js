import React, { useState } from "react";
import Link from "next/link";

// Define the Overview_Sector component
const Overview_Sector = ({ overview_data }) => {
  return (
    overview_data &&
    overview_data.map((data, index) => {
      return (
        <div className="mb-7 md:mb-10" key={index}>
          <h4 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-8">
            {data.title}
          </h4>
          {data.details &&
            data.details.map((details_data, index) => {
              return (
                <p className="leading-1xl" key={index}>
                  {details_data.label}
                </p>
              );
            })}
        </div>
      );
    })
  );
};

export default Overview_Sector;
