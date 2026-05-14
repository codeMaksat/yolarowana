import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Icon_Box = ({ initialValues }) => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-20">
          {initialValues &&
            initialValues.map((data, index) => {
              return (
                <div className="flex gap-3 lg:gap-6" key={index}>
                  <div className="shrink-0">
                    <img src={data.image} alt={data.alt} className="" />
                  </div>
                  <div className="">
                    <h5 className="text-lg mb-2">{data.title}</h5>
                    <p className="text-md mb-0">{data.label}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Icon_Box;
