import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Member_Yet = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="latest-blog-section py-10  relative" key={index}>
          <div className="container">
            <div className="md:flex items-center justify-between">
              <div className="md:max-w-[500px] mb-5 md:mb-0">
                <h4 className="mb-3 text-30 md:text-3xl">{data.title}</h4>
                <p className="m-0">{data.label}</p>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-5 shrink-0">
                <Link
                  href="/login"
                  className="btn btn-outline-primary w-full max-w-full md:max-w-fit md:w-auto"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary w-full max-w-full md:max-w-fit md:w-auto"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Member_Yet;
