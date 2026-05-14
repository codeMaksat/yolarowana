import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Start_About = ({ initialValues }) => {
  return (
    <section className="about-section">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-2/4 px-4">
                  <div className="relative border-[6px] border-white shadow-box-1 rounded-md max-w-[330px] overflow-hidden before:pt-[73%] before:block">
                    <Image
                      src={data.first_image}
                      alt={data.first_alt}
                      width={318}
                      height={232}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative border-[6px] mx-auto mr-5 md:mr-14 -mt-32 -mb-14 rotate-12 border-white shadow-box-1 rounded-md max-w-[330px] overflow-hidden before:pt-[73%] before:block">
                    <Image
                      src={data.second_image}
                      alt={data.second_alt}
                      width={318}
                      height={232}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative border-[6px] border-white shadow-box-1 ml-5 md:ml-0 -rotate-[8deg] rounded-md max-w-[330px] overflow-hidden before:pt-[73%] before:block">
                    <Image
                      src={data.third_image}
                      alt={data.third_alt}
                      width={318}
                      height={232}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/4 px-4 mt-10 md:mt-0">
                  <h2>{data.title}</h2>
                  <p>{data.label} </p>

                  <ul className="ul-list mb-9">
                    {data.points &&
                      data.points.map((points_data, index) => {
                        return <li key={index}>{points_data.label}</li>;
                      })}
                  </ul>

                  <div className="bg-white rounded-xl py-4 px-4 xl:px-5 shadow-box-1 justify-between flex flex-wrap lg:flex-nowrap items-center gap-5 text-md xl:text-lg text-dark-900">
                    {data.contect &&
                      data.contect.map((contect_data, index) => {
                        return (
                          <Link
                            key={index}
                            href={contect_data.slug}
                            className="flex items-center gap-2 xl:gap-4 hover:text-primary-900">
                            <span className="bg-primary-900 w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                              <i className={contect_data.icon}></i>
                            </span>
                            {contect_data.label}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Start_About;
