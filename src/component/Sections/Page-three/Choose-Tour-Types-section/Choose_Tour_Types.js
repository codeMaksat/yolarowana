import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Choose_Tour_Types = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="py-12" key={index}>
          <div className="container">
            <div className="md:flex items-end justify-between mb-8 md:mb-14">
              <div className="mb-5 md:mb-0">
                <h2>{data.title}</h2>
                <p className="md:max-w-[600px] m-0">{data.label} </p>
              </div>
              <div>
                <Link
                  href={data.btn_slug}
                  className="btn btn-primary min-w-[154px]"
                >
                  View all
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-14">
              {data.details &&
                data.details.map((tour, index) => {
                  return (
                    <div key={index} className="text-center md:text-left">
                      <div className="shrink-0 bg-primary-800 mx-auto mx-0 rounded-lg w-[120px] h-[120px] flex items-center justify-center mb-4">
                        <Image src={tour.image} alt={tour.alt} className="" width={74} height={74} />
                      </div>
                      <div className="">
                        <h5 className="text-lg mb-1 font-semibold">
                          {tour.name}
                        </h5>
                        <p className="text-md mb-0">{`${tour.tours} Tours From $${tour.price}`}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Choose_Tour_Types;
