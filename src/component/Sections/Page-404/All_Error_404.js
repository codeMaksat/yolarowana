import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const All_Error_404 = ({ initialValues }) => {
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="flex items-center flex-wrap -mx-3">
                <div className="w-full md:w-3/5 px-3 text-center">
                  <Image
                    src={data.image}
                    alt={data.alt}
                    width={653}
                    height={653}
                    className="mx-auto -mt-14 lg:-my-14"
                  />
                </div>
                <div className="w-full md:w-2/5 px-3">
                  <div className="text-center md:text-left">
                    <h2 className="text-5xl lg:text-[150px] mb-5 lg:leading-[150px]">
                      {data.title}
                    </h2>
                    <h3 className="text-xl md:text-25 mb-4">{data.label}</h3>
                    <p className="mb-8">{data.description}</p>
                    <Link
                      href={data.btn_slug}
                      className="btn btn-primary mx-auto md:mx-0">
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

export default All_Error_404;
