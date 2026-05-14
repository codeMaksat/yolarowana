import React, { useState } from "react";
import Link from "next/link";

// Define the Map_Sector component
const Map_Sector = ({ map_data }) => {
  return (
    map_data &&
    map_data.map((data, index) => {
      return (
        <div id="map" className="mb-10" key={index}>
          <h4 className=" text-xl md:text-25">{data.title}</h4>
          <div className="google-map rounded-2xl overflow-hidden">
            <iframe
              src={data.url}
              width="100%"
              height="300"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      );
    })
  );
};

export default Map_Sector;
