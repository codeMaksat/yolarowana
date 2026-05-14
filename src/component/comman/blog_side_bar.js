import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Image from "next/image";

// Define a reusable function for fetching data
const Blog_Side_Bar = ({ Data, orders }) => {
  const [No_of_Persons, setNo_of_Persons] = useState("");
  const [range, setRange] = useState([0, 900]); //[minPrice, maxPrice]
  const [minPrice, setminPrice] = useState("0");
  const [maxPrice, setmaxPrice] = useState("900");
  const [Date_from, setDate_from] = useState("");
  const [location, setLocation] = useState("Location?");
  const [booking, setBooking] = useState("Booking types");

  const option = [
    { value: "Location?" },
    { value: "Location 1" },
    { value: "Location 2" },
  ];
  const option2 = [
    { value: "Booking types" },
    { value: "1 day" },
    { value: "1 day" },
  ];

  function handleChanges(event, newValue) {
    setRange(newValue);
  }

  return (
    Data &&
    Data.map((data, index) => {
      return (
        <div
          className="w-full lg:max-w-[340px] shrink-0 lg:px-5"
          key={index}
          style={{ order: orders }}>
          {data.search &&
            data.search.map((search_data, index) => {
              return (
                <div
                  className="search-location bg-gray-200 border border-primary-800 rounded-1xl py-3.5 px-5 mb-9"
                  key={index}>
                  <h2 className="text-lg font-bold mb-4">
                    {search_data.title}
                  </h2>
                  <form>
                    <div className="mb-3 relative">
                      <span className="absolute top-4 left-3">
                        <Image
                          src="/assets/images/location.svg"
                          alt="location"
                          width={18}
                          height={18}
                        />
                      </span>
                      <select
                        className="form-control"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        option={option.value}>
                        {option.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 relative">
                      <span className="absolute top-4 left-3">
                        <Image
                          src="/assets/images/ticket.svg"
                          alt="location"
                          width={16}
                          height={16}
                        />
                      </span>
                      <select
                        className="form-control"
                        value={booking}
                        onChange={e => setBooking(e.target.value)}>
                        {option2.map((opt, index) => (
                          <option key={index} value={opt.value}>
                            {opt.value}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3 relative">
                      <span className="absolute top-4 left-3">
                        <Image
                          src="/assets/images/calendar-icon2.svg"
                          alt="calendar"
                          width={13}
                          height={13}
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="Date from"
                        name=""
                        className="form-control"
                        value={Date_from}
                        onChange={e => setDate_from(e.target.value)}
                      />
                    </div>
                    <div className="mb-3 relative">
                      <span className="absolute top-4 left-3">
                        <Image
                          src="/assets/images/person-circle-outline.svg"
                          alt="location"
                          width={17}
                          height={17}
                        />
                      </span>
                      <input
                        type="text"
                        placeholder="No of Persons"
                        name=""
                        className="form-control"
                        value={No_of_Persons}
                        onChange={e => setNo_of_Persons(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn btn-primary max-w-full w-full text-sm font-semibold">
                        {search_data.btn_label}
                      </button>
                    </div>
                  </form>
                </div>
              );
            })}
          {data.category &&
            data.category.map((category_data, index) => {
              return (
                <div className="mb-9" key={index}>
                  <h2 className="text-lg font-bold mb-6">
                    {category_data.title}
                  </h2>
                  <ul className="space-y-2 category-checkbox">
                    {category_data.sub_category &&
                      category_data.sub_category.map(
                        (sub_category_data, index) => {
                          return (
                            <li key={index}>
                              <div className="flex items-center justify-between text-dark-800 text-md">
                                <label className="checkcontainer leading-normal">
                                  {sub_category_data.label}
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                                <span>{sub_category_data.value}</span>
                              </div>
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
              );
            })}
          {data.other &&
            data.other.map((other_data, index) => {
              return (
                <div className="mb-9" key={index}>
                  <h2 className="text-lg font-bold mb-6">{other_data.title}</h2>
                  <ul className="space-y-2 category-checkbox">
                    {other_data.sub_other &&
                      other_data.sub_other.map((sub_other_data, index) => {
                        return (
                          <li key={index}>
                            <div className="flex items-center justify-between text-dark-800 text-md">
                              <label className="checkcontainer leading-normal">
                                {sub_other_data.label}
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                              </label>
                              <span>{sub_other_data.value}</span>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
          {data.duration &&
            data.duration.map((duration_data, index) => {
              return (
                <div className="mb-9" key={index}>
                  <h2 className="text-lg font-bold mb-6">
                    {duration_data.title}
                  </h2>
                  <ul className="space-y-2 category-checkbox">
                    {duration_data.sub_duration &&
                      duration_data.sub_duration.map(
                        (sub_duration_data, index) => {
                          return (
                            <li key={index}>
                              <div className="flex items-center justify-between text-dark-800 text-md">
                                <label className="checkcontainer leading-normal">
                                  {sub_duration_data.label}
                                  <input type="checkbox" />
                                  <span className="checkmark"></span>
                                </label>
                                <span>{sub_duration_data.value}</span>
                              </div>
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
              );
            })}
          {data.price &&
            data.price.map((price_data, index) => {
              let price = [];
              if (price_data.minPrice && price_data.maxPrice) {
                price.push(price_data.minPrice);
                price.push(price_data.maxPrice);
                setRange(price);
              }
              return (
                <div className="mb-9" key={index}>
                  <h2 className="text-lg font-bold mb-6">{price_data.title}</h2>
                  <p className="text-md mb-3">{`$${price_data.minPrice} - $${price_data.maxPrice}`}</p>
                  <div className="flex items-center justify-center">
                    <div className="py-1 relative min-w-full ">
                      <Slider value={range} onChange={handleChanges} className="!text-primary-900 color_value" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      );
    })
  );
};

export default Blog_Side_Bar;
