import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define the Available_Rooms_Sector component
const Available_Rooms_Sector = ({ available_rooms_data }) => {
  return (
    available_rooms_data &&
    available_rooms_data.map((data, index) => {
      return (
        <div className="mb-7 md:mb-10" key={index}>
          <h4 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-8">
            {data.title}
          </h4>
          {data.details &&
            data.details.map((details_data, index) => {
              return (
                <div
                  className="bg-primary-700 before border-primary-800 sm:p-5 rounded-xl mb-6"
                  key={index}>
                  <h3 className="text-lg mb-3 p-4 sm:p-0">
                    {details_data.title}
                  </h3>

                  <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap xl:whitespace-normal xl:flex-nowrap   w-full">
                    {details_data.room_type &&
                      details_data.room_type.map((room_type_data, index) => {
                        return (
                          <div
                            className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                            key={index}>
                            <h4 className="bg-primary-900 px-4 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px] sm:rounded-l-md">
                              {room_type_data.title}
                            </h4>
                            <div className="py-5 px-3">
                              <ul className="text-dark-800 text-sm space-y-4">
                                {room_type_data.sub_detail &&
                                  room_type_data.sub_detail.map(
                                    (sub_detail_data, index) => {
                                      return (
                                        <li
                                          className="flex items-center gap-3"
                                          key={index}>
                                          <Image
                                            src={sub_detail_data.image}
                                            alt={sub_detail_data.alt}
                                            width={23}
                                            height={23}
                                          />
                                          {sub_detail_data.label}
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    {details_data.benefit &&
                      details_data.benefit.map((benefit_data, index) => {
                        return (
                          <div
                            className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                            key={index}>
                            <h4 className="bg-primary-900 px-4 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px]">
                              {benefit_data.title}
                            </h4>
                            <div className="py-5 px-3">
                              <ul className="ul-included text-dark-800 text-sm space-y-4 max-w-[165px]">
                                {benefit_data.sub_detail &&
                                  benefit_data.sub_detail.map(
                                    (sub_detail_data, index) => {
                                      return (
                                        <li
                                          className="flex items-center gap-3"
                                          key={index}>
                                          {sub_detail_data.label}
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    {details_data.sleep &&
                      details_data.sleep.map((sleep_data, index) => {
                        return (
                          <div
                            className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                            key={index}>
                            <h4 className="bg-primary-900 px-6 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px]">
                              {sleep_data.title}
                            </h4>
                            <div className="py-5 px-6">
                              <Image
                                src={sleep_data.image}
                                alt="icon"
                                width={33}
                                height={14}
                              />
                            </div>
                          </div>
                        );
                      })}
                    {details_data.pricing &&
                      details_data.pricing.map((pricing_data, index) => {
                        return (
                          <div
                            className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                            key={index}>
                            <h4 className="bg-primary-900 px-4 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px]">
                              {pricing_data.title}
                            </h4>
                            <div className="py-5 px-3">
                              <div className="text-lg font-bold text-dark-900">
                                ${pricing_data.price}{" "}
                              </div>
                              <p className="text-12 mb-0">
                                {pricing_data.label}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    {details_data.room_select &&
                      details_data.room_select.map(
                        (room_select_data, index) => {
                          return (
                            <div
                              className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                              key={index}>
                              <h4 className="bg-primary-900 px-4 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px]">
                                {room_select_data.title}
                              </h4>
                              <div className="py-5 px-3">
                                <select className="select-box select-box-style-2 rounded-md">
                                  {room_select_data.selecter &&
                                    room_select_data.selecter.map(
                                      (selecter_data, index) => {
                                        return (
                                          <option key={index}>
                                            {selecter_data.label}
                                          </option>
                                        );
                                      }
                                    )}
                                </select>
                              </div>
                            </div>
                          );
                        }
                      )}
                    {details_data.totel &&
                      details_data.totel.map((totel_data, index) => {
                        return (
                          <div
                            className="w-full sm:w-2/4 md:w-2/6 xl:w-full"
                            key={index}>
                            <h4 className="bg-primary-900 px-4 py-2 text-white leading-normal mb-0 text-md font-bold min-h-[40px] sm:rounded-r-md">
                              {totel_data.title}
                            </h4>
                            <div className="py-5 px-3">
                              <p className="text-dark-900 text-md font-medium mb-4">
                                {totel_data.room_label} for ${totel_data.price}
                              </p>
                              <Link
                                href="/booking-cart"
                                className="btn btn-primary text-md whitespace-nowrap">
                                {totel_data.btn_label}
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
      );
    })
  );
};

export default Available_Rooms_Sector;
