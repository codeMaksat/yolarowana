import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Icon_Grid = ({ initialValues }) => {
  return (
    <section className="">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initialValues &&
            initialValues.map((data, index) => {
              return (
                <div
                  key={index}
                  className={`bg-white pt-8 pb-6 px-3 text-center shadow-card-1 rounded-xl h-full ${
                    index % 2 !== 0 ? "relative md:top-12" : ""
                  }`}
                >
                  <img
                    src={data.icon}
                    alt={`destinations-icon${index + 1}`}
                    className="mx-auto mb-6"
                  />
                  <h2 className="text-[25px] md:text-4xl mb-2">{data.value}</h2>
                  <p className="text-primary-900 mb-0">{data.label}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Icon_Grid;
