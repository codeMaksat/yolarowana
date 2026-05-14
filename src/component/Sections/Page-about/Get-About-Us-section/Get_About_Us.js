import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Get_About_Us = ({ initialValues }) => {
  return (
    <section className="py-12 about-section2">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full md:w-1/2 px-4">
                  <Image
                    src={data.image}
                    alt={data.alt}
                    width={553}
                    height={537}
                  />
                </div>
                <div className="w-full md:w-1/2 px-4">
                  <h4 className="text-md uppercase font-bold text-primary-900 mb-2">
                    {data.top_title}
                  </h4>
                  <h2>{data.main_label}</h2>
                  <p>{data.short_des}</p>

                  <ul className="ul-list border-b border-primary-800 mb-8">
                    {data.review &&
                      data.review.map((review_data, index) => {
                        return (
                          <li key={index}>
                            <h6 className="text-lg mb-0 text-black">
                              {review_data.title}
                            </h6>
                            <p className="text-md">{review_data.label}</p>
                          </li>
                        );
                      })}
                  </ul>
                  <div className="">
                    <Link href={data.btn_slug} className="btn btn-primary">
                      {data.btn_label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Get_About_Us;
