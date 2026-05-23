import React, { useState } from "react";

const Itinerary_Sector = ({ itinerary_data }) => {
  const [selected, setSelected] = useState(1);

  return (
    itinerary_data &&
    itinerary_data.map((data, index) => {
      return (
        <div id="itinerary" className="mb-10 scroll-mt-[150px]" key={index}>
          <h4 className="text-xl md:text-2xl mb-5">{data.title}</h4>

          <div className="accordion">
            {data.details &&
              data.details.map((item, index) => {
                const isOpen = selected === item.day;

                return (
                  <div
                    key={index}
                    className={`accordion-list border border-primary-800 rounded-2xl bg-gray-400 mb-5 overflow-hidden ${isOpen ? "active" : ""
                      }`}
                  >
                    <h5
                      className={`py-4 px-5 md:px-6 m-0 cursor-pointer text-lg border-b font-normal flex items-center justify-between gap-4 ${isOpen
                          ? "active border-primary-800"
                          : "border-transparent"
                        }`}
                      onClick={() =>
                        selected !== item.day
                          ? setSelected(item.day)
                          : setSelected(null)
                      }
                    >
                      <span>
                        <strong>Day {item.day}</strong> {item.title}
                      </span>

                      <i
                        className={`fa-regular ${isOpen ? "fa-chevron-up" : "fa-chevron-down"
                          } text-sm shrink-0`}
                      ></i>
                    </h5>

                    <div
                      className="px-5 md:px-6 overflow-hidden transition-all duration-700"
                      style={{
                        maxHeight: isOpen ? "720px" : "0",
                      }}
                    >
                      <div className="py-4">
                        <p className="leading-1xl mb-4">{item.content}</p>

                        {item.image && (
                          <div className="mt-4 max-w-[460px] w-full rounded-2xl overflow-hidden h-[180px] sm:h-[220px] md:h-[240px]">
                            <img
                              src={item.image}
                              alt={item.alt || item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
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