import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Top_Destinations = ({ initialValues }) => {

  const DestinationList = ({ destinations }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {destinations &&
        destinations.map((destination, index) => {
          let classes = "";
          let classes2 = "";
          if (index === 4 || index === 5) {
            classes = "md:col-span-2";
            classes2 =
              "relative overflow-hidden before:pt-[95%] md:before:pt-[47%] before:block after:w-full after:transition-all after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900 after:opacity-20 group-hover:after:opacity-40";
          } else {
            classes = "";
            classes2 =
              "relative overflow-hidden before:pt-[95%] before:block after:w-full after:transition-all after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900 after:opacity-20 group-hover:after:opacity-40";
          }
          return (
            <div key={index} className={`relative group ${classes}`}>
              <div className={classes2}>
                <img
                  src={destination.image}
                  alt={destination.alt}
                  className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                />
              </div>
              <div className="absolute top-0 left-0 w-full p-5 xl:p-8 text-white">
                <div className="">
                  <h3 className="text-xl xl:text-3xl xl:leading-normal text-white mb-2">
                    {destination.title}
                  </h3>
                  <div className="opacity-0 mt-10 transition-all group-hover:mt-0 group-hover:opacity-100 duration-500">
                    <span className="bg-white/80 rounded-md px-2 text-md text-dark-900 mb-3 block max-w-fit">
                      {`${destination.tourCount} Tours`}
                    </span>
                    <p className="text-md leading-normal mb-3">
                      {destination.description}
                    </p>
                    <Link
                      href={destination.slug}
                      className="flex items-center border-b border-white max-w-fit transition-all hover:border-0"
                    >
                      Read more{" "}
                      <i className="fa-regular fa-arrow-right ml-2 transition-all"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="" key={index}>
          <div className="container">
            <div className="text-center mb-8 md:mb-14">
              <h2>{data.title}</h2>
              <p className="max-w-[590px] mx-auto">{data.label} </p>
            </div>
          </div>

          <DestinationList destinations={data.product} />
        </section>
      );
    })
  );
};

export default Top_Destinations;
