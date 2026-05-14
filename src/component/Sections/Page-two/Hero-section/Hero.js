import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Hero = ({ initialValues }) => {
  const [keyword, setKeyword] = useState("");
  const [destination, setDestination] = useState("Where to?");
  const [duration, setDuration] = useState("Check in - Check out");

  const option = [
    { value: "Where to?" },
    { value: "Destination 1" },
    { value: "Destination 2" },
  ];
  const option2 = [
    { value: "Check in - Check out" },
    { value: "1 day" },
    { value: "1 day" },
  ];
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="hero-section min-h-[770px] bg-primary-800 relative grid content-center pt-0 md:pt-24 pb-5 md:py-20 lg:py-28"
          key={index}
        >
          <div className="md:absolute top-0 right-0 w-full md:w-1/2 h-full">
            <img
              src={data.image}
              alt={data.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hero-content-slider relative z-1 py-5 md:py-0">
            <div className="container">
              <div className="max-w-sm lg:max-w-md xl:max-w-xl">
                <h1 className="mb-5 md:mb-7 text-3xl sm:text-4xl xl:text-65 leading-tight">
                  {data.title}{" "}
                  <span className="text-primary-900">{data.label}</span>{" "}
                  {data.label2}
                </h1>
                <p className="mb-6 text-dark-800 text-md lg:text-2xl">
                  {data.description}
                </p>
                <Link href={data.btn_slug} className="btn btn-primary mx-0">
                  {data.btn_label} <i className="fa-regular fa-arrow-right ml-3"></i>
                </Link>
              </div>
              <div className="booking-form booking-2 bg-white rounded-xl shadow-box mt-12 p-4 text-left w-full max-w-[880px] md:flex gap-5 items-center">
                <div className="w-full text-dark-900 font-semibold text-lg">
                  <input
                    type="text"
                    placeholder="Type your keyword here...."
                    name=""
                    className="form-control"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="w-full text-dark-900 font-semibold text-lg">
                  <select
                    className="form-control bg-transparent"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    option={option.value}
                  >
                    {option.map((opt, index) => (
                      <option key={index} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full text-dark-900 font-semibold text-lg">
                  <select
                    className="form-control bg-transparent"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    {option2.map((opt, index) => (
                      <option key={index} value={opt.value}>
                        {opt.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="fl">
                  <button
                    type="button"
                    className="bg-primary-900 rounded-[3px] w-full md:w-[85px] h-[50px] flex items-center justify-center text-white text-xl md:text-[30px] hover:bg-dark-900"
                  >
                    <i className="fa-regular fa-magnifying-glass"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Hero;
