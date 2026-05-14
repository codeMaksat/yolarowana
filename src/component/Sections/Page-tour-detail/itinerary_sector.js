import React, { useState } from "react";
import Link from "next/link";

// Define the Itinerary_Sector component
const Itinerary_Sector = ({ itinerary_data }) => {
  const [selected, setSelected] = useState(1);

  return (
    itinerary_data &&
    itinerary_data.map((data, index) => {
      return (
        <div id="itinerary" className="mb-10" key={index}>
          <h4 className="text-xl md:text-2xl">{data.title}</h4>
          <div className="accordion">
            {data.details &&
              data.details.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`accordion-list border border-primary-800 rounded-1xl bg-gray-400 mb-5 ${
                      selected === item.day ? "active" : ""
                    }`}
                  >
                    <h5
                      className={`py-4 px-6 m-0 cursor-pointer text-lg border-b font-normal ${
                        selected === item.day
                          ? "active border-primary-800"
                          : "border-transparent"
                      }`}
                      onClick={() =>
                        selected !== item.day
                          ? setSelected(item.day)
                          : setSelected(null)
                      }
                    >
                      <strong>Day {item.day}</strong> {item.title}
                    </h5>
                    <div
                      className="pb-0 px-5 overflow-hidden transition-all max-h-0 duration-700"
                      style={{
                        maxHeight: selected === item.day ? "152px" : "0",
                      }}
                    >
                      <p className="pt-3 leading-1xl">{item.content}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    })
  );
};

export default Itinerary_Sector;
