import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the Side_Bar_Three component
const Side_Bar_Three = ({ sideBarThree_data, price }) => {
  const option1 = [{ value: 1 }, { value: 2 }, { value: 3 }];
  const option2 = [{ value: 1 }, { value: 2 }, { value: 3 }];

  return (
    sideBarThree_data &&
    sideBarThree_data.map((data, index) => {
      return (
        <div
          className="right-sidebar lg:max-w-[300px] xl:max-w-[395px] w-full shrink-0"
          key={index}
        >
          <div className="search-location bg-gray-200 border border-primary-800 rounded-1xl p-5 xl:p-7 mb-9">
            <div className="flex flex-wrap items-center justify-between border-b border-primary-800 pb-6 mb-7">
              <h2 className="text-lg md:text-2xl font-bold mb-0">
                {data.title}
              </h2>
              <span className="text-gray-800 text-md">${price} per person</span>
            </div>
            <form>
              <div className="mb-3 relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="form-control"
                  name=""
                />
              </div>
              <div className="mb-3 relative">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="form-control"
                  name=""
                />
              </div>
              <div className="mb-3 relative">
                <input
                  type="email"
                  placeholder="Phone number"
                  className="form-control"
                  name=""
                />
              </div>

              <div className="mb-3 relative">
                <select className="select-box">
                  <option>Ticket type</option>
                  <option>Location</option>
                  <option>Location</option>
                </select>
              </div>
              <div className="flex gap-2">
                <div className="mb-3 relative w-full">
                  <select className="select-box">
                    <option>Adult</option>
                    <option>Location</option>
                    <option>Location</option>
                  </select>
                </div>
                <div className="mb-3 relative w-full">
                  <select className="select-box">
                    <option>Child</option>
                    <option>Location</option>
                    <option>Location</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 relative">
                <select className="select-box">
                  <option>mm/dd/yyyy</option>
                  <option>Location</option>
                  <option>Location</option>
                </select>
              </div>
              <div className="mb-3 relative">
                <textarea
                  className="form-control"
                  placeholder="Message"
                ></textarea>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-primary max-w-full w-full font-semibold"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-200 border border-primary-800 rounded-1xl p-5 xl:p-7 mb-9">
            <div className="flex flex-wrap items-center justify-between border-b border-primary-800 pb-6 mb-7">
              <h2 className="text-lg md:text-2xl font-bold mb-0">
                {data.title}
              </h2>
            </div>

            <div className="space-y-5">
              {data.product &&
                data.product.map((product_data, index) => {
                  return (
                    <div className="flex items-center gap-5" key={index}>
                      <div className="shrink-0 w-[80px] h-[80px] sm:w-[100px] sm:h-[86px] rounded-xl overflow-hidden">
                        <img src={product_data.image} alt={product_data.alt} />
                      </div>
                      <div>
                        <h3 className="text-md font-bold mb-1 hover:text-primary-900 leading-normal">
                          <Link href={product_data.slug}>
                            {product_data.title}
                          </Link>
                        </h3>
                        <div className="text-md mb-0 leading-normal">
                          From{" "}
                          <span className="text-primary-900 font-semibold">
                            {product_data.price}$
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Side_Bar_Three;
