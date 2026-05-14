import React, { useState } from "react";
import Link from "next/link";

// Define the Activitie_Tab component
const Activitie_Tab = ({ activitie_data }) => {
  return (
    activitie_data &&
    activitie_data.map((data, index) => {
      return (
        <div className="mb-10" key={index}>
          <h3 className="text-lg md:text-3xl md:mt-10">{data.title}</h3>
          <p>{data.description}</p>

          <p>{data.short_des}</p>
        </div>
      );
    })
  );
};

export default Activitie_Tab;
