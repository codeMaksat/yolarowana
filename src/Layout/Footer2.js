import Link from "next/link";
import React, { useState } from "react";

export default function Footer2({ initialValues }) {
  const [address_save_errors, setaddress_save_errors] = useState({});
  const save_account_details = event => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let email = formData.get("email");

    const error = {};

    if (!email || email.trim() === "") {
      error.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});
    let data = {
      email: email,
    };
    console.log(data);
    }

  };

  const footerData = {
    customerCarePhone: "+1 43 678 6363",
    supportEmail: "journea@gmail.com",
    companyDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
    socialMediaLinks: [
      { icon: "facebook", url: "https://www.facebook.com/" },
      { icon: "twitter", url: "https://twitter.com/" },
      { icon: "youtube", url: "https://www.youtube.com/" },
      { icon: "instagram", url: "https://www.instagram.com/" },
    ],
    footerLinks: [
      {
        title: "Company",
        links: [
          { text: "About Us", url: "about" },
          { text: "Tour", url: "tour" },
          { text: "Destinations", url: "destination" },
          { text: "Blog", url: "blog-grid" },
          { text: "Contact Us", url: "contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { text: "Tours", url: "tour" },
          { text: "Hotels", url: "hotels" },
          { text: "Offer Tours", url: "tour-grid" },
        ],
      },
      {
        title: "Support",
        links: [
          { text: "Privacy policy", url: "#" },
          { text: "Terms & Conditions", url: "#" },
          { text: "Rules & Regulations", url: "#" },
        ],
      },
    ],
    copyrightText: "Copyright 2023",
    companyName: "Journeya",
    designerName: "Webbytemplate",
  };

  return (
    <>
      <footer className="footer-part relative bg-primary-900">
        {initialValues &&
          initialValues.map((data, index) => {
            return (
              <div className="container relative z-1" key={index}>
                <div className="flex flex-wrap -mx-4 pt-10 text-white">
                  {/* Left Section */}
                  <div className="w-full lg:w-1/2 px-3">
                    {/* Logo and Contact Information */}
                    <div className="mb-10 lg:mb-6 lg:texl-left lg:max-w-[400px]">
                      <div className="mb-3 lg:mb-6">
                        <Link href="index-1" className="inline-block">
                          <img
                            src="/assets/images/logo-white.svg"
                            alt="logo-dark"
                          />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="text-white">
                          <span className="text-md block">
                            Toll Free Customer Care
                          </span>
                          <Link
                            href={`tel:${footerData.customerCarePhone}`}
                            className="text-lg font-bold hover:text-black">
                            {footerData.customerCarePhone}
                          </Link>
                        </div>
                        <div className="text-white">
                          <span className="text-md block">
                            Need live support?
                          </span>
                          <Link
                            href={`mailto:${footerData.supportEmail}`}
                            className="text-lg font-bold hover:text-black">
                            {footerData.supportEmail}
                          </Link>
                        </div>
                      </div>

                      <p className="mb-6 font-normal text-md">
                        {footerData.companyDescription}
                      </p>

                      {/* Social Media Links */}
                      <h6 className="text-sm text-white font-semibold mb-2">
                        Follow us on social media
                      </h6>
                      <ul className="flex items-center justify-start space-x-5 text-md text-primary-900">
                        {footerData.socialMediaLinks.map((link, index) => (
                          <li key={index}>
                            <Link
                              href={link.url}
                              target="_blank"
                              className="transition-all text-white hover:text-black">
                              <i className={`fa-brands fa-${link.icon}`}></i>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Section */}
                  <div className="w-full lg:w-1/2 px-3">
                    {/* Newsletter Subscription */}
                    <div className="mb-7 lg:max-w-[590px] mx-auto">
                      <h6 className="text-md text-white">Get Updates & More</h6>
                      <form className="flex items-center justify-center bg-white shadow-input rounded-md p-1.5 border border-white hover:border-primary-900">
                        <input
                          type="text"
                          placeholder="Your email address"
                          name=""
                          className="text-dark-900 text-md md:text-lg w-full py-2 bg-transparent px-3 outline-none"
                        />
                        <button
                          type="button"
                          className="btn btn-primary w-full max-w-[135px] py-2 rounded-md text-md shrink-0">
                          Subscribe
                        </button>
                      </form>
                    </div>

                    {/* Footer Navigation Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                      {footerData.footerLinks.map((section, index) => (
                        <div key={index} className="mb-8">
                          <h4 className="footer-title text-white text-md mb-2">
                            {section.title}
                          </h4>
                          <ul className="space-y-1.5 text-md text-white">
                            {section.links.map((link, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={link.url}
                                  className="text-white hover:text-dark-900">
                                  {link.text}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Copyright Section */}
                <div className="border-t border-white/10 py-4 ">
                  <p className="text-white text-md mb-0 text-center md:flex items-center justify-center">
                    {footerData.copyrightText}{" "}
                    <Link
                      href="#"
                      className="text-white underline hover:text-black">
                      {footerData.companyName}
                    </Link>
                    . All Rights Reserved.{" "}
                    <span className="w-1.5 h-1.5 rounded-full bg-white mx-2 shrink-0 inline-block"></span>{" "}
                    Design by{" "}
                    <Link
                      href="#"
                      className="text-white hover:text-black underline ml-1">
                      {footerData.designerName}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            );
          })}
      </footer>

      {/* {initialValues &&
        initialValues.map((data, index) => {
          return (
            <footer className="footer-part relative bg-primary-900" key={index}>
              <div className="container relative z-1">
                <div className="flex flex-wrap -mx-4 pt-10 text-white">
                  <div className="w-full lg:w-1/2 px-3">
                    {data.mid_data &&
                      data.mid_data.map((mid_data_data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="mb-10 lg:mb-6 text-left lg:max-w-[260px]">
                              {mid_data_data.logo &&
                                mid_data_data.logo.map((logo_data, index) => {
                                  return (
                                    <div className="mb-3 lg:mb-6" key={index}>
                                      <Link
                                        href={logo_data.slug}
                                        className="inline-block"
                                      >
                                        <img
                                          src={logo_data.img}
                                          alt={logo_data.alt}
                                        />
                                      </Link>
                                    </div>
                                  );
                                })}

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                <div className="text-white">
                                  <span className="text-md block">
                                    Toll Free Customer Care
                                  </span>
                                  <Link
                                    href="tel:+1436786363"
                                    className="text-lg font-bold hover:text-black"
                                  >
                                    +1 43 678 6363
                                  </Link>
                                </div>
                                <div className="text-white">
                                  <span className="text-md block">
                                    Need live support?
                                  </span>
                                  <Link
                                    href="mailto:journea@gmail.com"
                                    className="text-lg font-bold hover:text-black"
                                  >
                                    journea@gmail.com
                                  </Link>
                                </div>
                              </div>
                              <p className="mb-6 font-normal text-md">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod{" "}
                              </p>

                              <h6 className="text-sm text-white font-semibold mb-2">
                                Follow us on social media
                              </h6>
                              <ul className="flex items-center justify-start space-x-5 text-md text-primary-900">
                                <li>
                                  <Link
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    className="transition-all text-white hover:text-black"
                                  >
                                    <i className="fa-brands fa-facebook"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="https://twitter.com/"
                                    target="_blank"
                                    className="transition-all text-white hover:text-black"
                                  >
                                    <i className="fa-brands fa-twitter"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="https://www.youtube.com/"
                                    target="_blank"
                                    className="transition-all text-white hover:text-black"
                                  >
                                    <i className="fa-brands fa-youtube"></i>
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    className="transition-all text-white hover:text-black"
                                  >
                                    <i className="fa-brands fa-instagram"></i>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div className="w-full lg:w-1/2 px-3">
                    <div className="mb-7 lg:max-w-[590px] mx-auto">
                      <h6 className="text-md text-white">Get Updates & More</h6>
                      <form className="flex items-center justify-center bg-white shadow-input rounded-md p-1.5 border border-white hover:border-primary-900">
                        <input
                          type="text"
                          placeholder="Your email address"
                          name=""
                          className="text-dark-900 text-md md:text-lg w-full py-2 bg-transparent px-3 outline-none"
                        />
                        <button
                          type="button"
                          className="btn btn-primary w-full max-w-[135px] py-2 rounded-md text-md shrink-0"
                        >
                          Subscribe
                        </button>
                      </form>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3">
                      <div className="mb-8">
                        <h4 className="footer-title text-white text-md mb-2">
                          Company
                        </h4>
                        <ul className="space-y-3 text-15 text-white">
                          <li>
                            <Link
                              href="about"
                              className="text-white hover:text-dark-900 "
                            >
                              About Us
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="tour"
                              className="text-white hover:text-dark-900"
                            >
                              Tour
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="destination"
                              className="text-white hover:text-dark-900"
                            >
                              Destinations
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="blog-grid"
                              className="text-white hover:text-dark-900"
                            >
                              Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="contact"
                              className="text-white hover:text-dark-900"
                            >
                              Contact Us
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mb-8">
                        <h4 className="footer-title text-white text-md mb-2">
                          Services
                        </h4>
                        <ul className="space-y-1.5 text-md text-white">
                          <li>
                            <Link
                              href="tour"
                              className="hover:text-black "
                            >
                              Tours
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="hotels"
                              className="hover:text-black"
                            >
                              Hotels
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="tour-grid"
                              className="hover:text-black"
                            >
                              Offer Tours
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="mb-8">
                        <h4 className="footer-title text-white text-md mb-2">
                          Support
                        </h4>
                        <ul className="space-y-1.5 text-md text-white">
                          <li>
                            <Link href="#" className="hover:text-black ">
                              Privacy policy
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="hover:text-black">
                              Terms & Conditions
                            </Link>
                          </li>
                          <li>
                            <Link href="#" className="hover:text-black">
                              Rules & Regulations
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/10 py-4 ">
                  <p className="text-white text-md mb-0 text-center md:flex items-center justify-center">
                    Copyright 2023{" "}
                    <Link
                      href="#"
                      className="text-white underline hover:text-black"
                    >
                      {" "}
                      Journeya
                    </Link>
                    . All Rights Reserved.{" "}
                    <span className="w-1.5 h-1.5 rounded-full bg-white mx-2 shrink-0 inline-block"></span>{" "}
                    Design by{" "}
                    <Link
                      href="#"
                      className="text-white hover:text-black underline ml-1"
                    >
                      Webbytemplate
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </footer>
          );
        })} */}
    </>
  );
}
