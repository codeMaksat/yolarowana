import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Start_About = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="py-12 about-section2" key={index}>
          <div className="container">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full md:w-1/2 px-4">
                <img src={data.image} alt={data.alt} />
              </div>
              <div className="w-full md:w-1/2 px-4">
                <h4 className="text-md uppercase font-bold text-primary-900 mb-2">
                  {data.title}
                </h4>
                <h2>{data.label}</h2>
                <p>{data.description}</p>

                <ul className="ul-list border-b border-primary-800 mb-8">
                  {data.items &&
                    data.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <h6 className="text-lg mb-0 text-black">
                          {item.title}
                        </h6>
                        <p className="text-md">{item.description}</p>
                      </li>
                    ))}
                </ul>

                <div className="">
                  <Link href={data.btn_slug} className="btn btn-primary">
                    {data.btn_label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Start_About;
