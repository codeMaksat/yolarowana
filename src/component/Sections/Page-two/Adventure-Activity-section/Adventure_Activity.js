import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Adventure_Activity = ({ initialValues }) => {
  const TourCategoryList = ({ categories }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="relative">
          <div className="border border-gray-300 p-5 rounded-xl mb-2 text-center">
            <div className="w-full h-[71px] mb-3">
              <img
                src={category.icon}
                alt={`${category.title}-icon`}
                className="mx-auto"
              />
            </div>
            <h4 className="text-xl mb-2">{category.title}</h4>
            <p className="m-0">{category.subtitle}</p>
          </div>
          <div className="divide-y divide-primary-800">
            {category.tours.map((tour, tourIndex) => (
              <div key={tourIndex} className="flex items-center py-4 gap-3">
                <div className="shrink-0 w-[90px] rounded-xl relative overflow-hidden before:pt-full before:block">
                  <img
                    src={tour.image}
                    alt={`adventure-activity-img${tourIndex + 1}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className="text-md mb-1">{tour.name}</h5>
                  <div className="text-md font-normal">
                    From{" "}
                    <span className="text-primary-900 font-semibold">
                      {tour.price}
                    </span>{" "}
                    {tour.oldPrice && (
                      <span className="text-dark-800 line-through font-semibold">
                        {tour.oldPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-8 md:mb-14">
                <h2>{data.title}</h2>
                <p className="max-w-[590px] mx-auto">{data.label} </p>
              </div>

              <TourCategoryList categories={data.product} />
            </div>
          );
        })}
    </section>
  );
};

export default Adventure_Activity;
