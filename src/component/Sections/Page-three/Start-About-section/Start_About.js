import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Start_About = ({ initialValues }) => {

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="about-section py-10 md:mb-10" key={index}>
          <div className="container">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-2/4 px-4 lg:pr-14">
                <div className="overflow-hidden relative rounded-5xl before:block before:pt-full">
                  <img
                    src={data.image}
                    alt={data.alt}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <Link
                    href={data.video_url}
                    className="text-white w-12 h-12 md:w-20 md:h-20 -ml-6 -mt-6 md:-ml-10 md:-mt-10 absolute inset-y-1/2 transition-all duration-300 inset-x-1/2 border-2 border-white rounded-2xl flex items-center justify-center hover:text-primary-900 hover:bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="38"
                      viewBox="0 0 30 38"
                      className="w-5 md:w-auto "
                      fill="none"
                    >
                      <path
                        d="M26.7625 16.9852L8.08143 4.80185C7.82941 4.64955 7.55219 4.58189 7.27501 4.60502C6.99782 4.62815 6.72947 4.74134 6.49439 4.93429C6.2593 5.12724 6.06495 5.39381 5.92902 5.70975C5.79309 6.02569 5.71991 6.38096 5.71612 6.74321V31.0994C5.71377 31.4712 5.785 31.8376 5.92292 32.163C6.06085 32.4885 6.26081 32.762 6.50348 32.9572C6.74615 33.1524 7.02331 33.2627 7.30819 33.2773C7.59307 33.2919 7.87602 33.2104 8.1297 33.0407L26.7625 20.8574C27.0385 20.6767 27.2706 20.3994 27.4328 20.0566C27.5949 19.7138 27.6808 19.3189 27.6808 18.916C27.6808 18.5132 27.5949 18.1183 27.4328 17.7755C27.2706 17.4327 27.0385 17.1554 26.7625 16.9747V16.9852Z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="w-full md:w-2/4 px-4 mt-10 md:mt-0">
                <h2 className="max-w-md">{data.title}</h2>
                {data.paragraphs &&
                  data.paragraphs.map((paragraph, index) => {
                    return <p key={index}>{paragraph}</p>;
                  })}
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-5 text-md xl:text-lg text-dark-900 font-bold mb-5 md:mb-10">
                  {data.contactLinks &&
                    data.contactLinks.map((link, index) => {
                      return (
                        <Link
                          key={index}
                          href={link.href}
                          className="flex items-center gap-2 xl:gap-4 hover:text-primary-900"
                        >
                          <span className="bg-primary-900 w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                            <i className={`fa-solid ${link.icon}`}></i>
                          </span>
                          <div>
                            <span className="text-dark-800 leading-normal block text-md font-semibold">
                              {link.text}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                </div>
                <Link
                  href={data.readMoreLink}
                  className="btn btn-outline-primary"
                >
                  Read more
                </Link>
              </div>

              {/* <div className="w-full md:w-2/4 px-4 mt-10 md:mt-0">
                <h2 className="max-w-md">It's time to travel again</h2>
                <p>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum
                  dolor sit amet, consectetur adipisicing elit.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Leo Link diam sollicitudin tempor id eu.
                </p>

                <div className="flex flex-wrap lg:flex-nowrap items-center gap-5 text-md xl:text-lg text-dark-900 font-bold mb-5 md:mb-10">
                  <Link
                    href="tel:+12345455454"
                    className="flex items-center gap-2 xl:gap-4 hover:text-primary-900"
                  >
                    <span className="bg-primary-900 w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                      <i className="fa-solid fa-phone"></i>
                    </span>
                    <div>
                      <span className="text-dark-800 leading-normal block text-md font-semibold">
                        Call
                      </span>
                      +1 23 456 456 2346
                    </div>
                  </Link>
                  <Link
                    href="mailto:journeya@gmail.com"
                    className="flex items-center gap-2 xl:gap-4 hover:text-primary-900"
                  >
                    <span className="bg-primary-900 w-[46px] h-[46px] rounded-full flex items-center justify-center text-white text-lg shrink-0">
                      <i className="fa-solid fa-envelope"></i>
                    </span>
                    <div>
                      <span className="text-dark-800 leading-normal block text-md font-semibold">
                        Mail
                      </span>
                      journeya@gmail.com
                    </div>
                  </Link>
                </div>
                <Link href="about" className="btn btn-outline-primary">
                  Read more
                </Link>
              </div> */}
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Start_About;
