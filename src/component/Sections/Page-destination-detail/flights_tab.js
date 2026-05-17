import React from "react";

const Flights_Tab = ({ flights_data }) => {
  return (
    <div className="mb-10">
      {flights_data &&
        flights_data.map((data, index) => {
          return (
            <div
              className="flex flex-wrap md:flex-nowrap border border-[#E2CFAF] bg-[#FAF7F2] rounded-xl overflow-hidden"
              key={index}
            >
              <div className="w-full py-6 px-6 grid items-center justify-center md:max-w-[118px] shrink-0 border-b md:border-b-0 md:border-r border-[#E2CFAF]">
                <div className="w-14 h-14 rounded-full border border-primary-900 flex items-center justify-center text-primary-900">
                  <i className="fa-regular fa-compass text-3xl"></i>
                </div>
              </div>

              {data.details &&
                data.details.map((details_data, index) => {
                  return (
                    <div
                      className="w-1/2 md:w-full py-4 md:py-6 px-4 md:px-6 grid items-center border-b md:border-b-0 md:border-r last:border-r-0 border-[#E2CFAF]"
                      key={index}
                    >
                      <div>
                        <h3 className="text-md md:text-lg mb-2 leading-normal font-bold">
                          {details_data.title}
                        </h3>
                        <span className="block text-dark-800 text-md md:text-lg leading-normal">
                          {details_data.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Flights_Tab;