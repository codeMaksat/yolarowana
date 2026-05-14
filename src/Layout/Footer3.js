import Link from "next/link";
import React, { useState } from "react";

export default function Footer3({ initialValues }) {
  const [address_save_errors, setaddress_save_errors] = useState({});
  const save_account_details = (event) => {
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
      <footer className="footer-part relative bg-primary-800">
        <div className="container relative z-1">
          <div className="flex flex-wrap -mx-3 py-14 text-dark-800">
            <div className="w-full lg:w-2/5 px-3">
              <div className="lg:max-w-[390px] mb-6 lg:mb-0">
                <h6 className="text-md md:text-lg mb-2">
                  Get updates and more
                </h6>
                <p className="text-md">
                  Subscribe to the free newsletter and get 20% discount on your
                  next booking
                </p>
                <form className="flex items-center justify-center bg-white shadow-input rounded-md hover:border-primary-900">
                  <input
                    type="text"
                    placeholder="Your email address"
                    name=""
                    className="text-dark-900 text-md md:text-lg w-full py-3 bg-transparent px-3 outline-none"
                  />
                  <button
                    type="button"
                    className="btn btn-primary w-full max-w-[135px] py-3 rounded-md text-md shrink-0"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div className="w-full lg:w-2/5 px-3">
              <div className="">
                <h4 className="text-md md:text-lg mb-2">Quick Links</h4>
                <ul className="space-y-3 text-md text-dark-800">
                  <li>
                    <a
                      href="tour"
                      className="text-dark-800 hover:text-primary-900"
                    >
                      Tour
                    </a>
                  </li>
                  <li>
                    <a
                      href="destination"
                      className="text-dark-800 hover:text-primary-900"
                    >
                      Destinations
                    </a>
                  </li>
                  <li>
                    <a
                      href="blog-grid"
                      className="text-dark-800 hover:text-primary-900"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="contact"
                      className="text-dark-800 hover:text-primary-900"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-1/5 px-3">
              <div className="">
                <h4 className="text-md md:text-lg mb-2">Connect with us</h4>
                <p className="pl-7 relative text-15 mb-3">
                  <span className="absolute top-2 left-0">
                    <img src="/assets/images/pin.svg" alt="call-sharp" />
                  </span>
                  28 W New York St, Aurora Indiana-60506
                </p>
                <p className="pl-7 relative text-15 mb-4">
                  <span className="absolute top-2 left-0">
                    <img src="/assets/images/call-sharp.svg" alt="call-sharp" />
                  </span>
                  <a
                    href="tel:(630) 844-0400"
                    className="hover:text-primary-900"
                  >
                    (630) 844-0400
                  </a>
                </p>

                <ul className="flex items-center justify-start space-x-2 text-sm text-white">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-900 hover:bg-primary-700 hover:text-primary-900"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/"
                      target="_blank"
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-900 hover:bg-primary-700 hover:text-primary-900"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-900 hover:bg-primary-700 hover:text-primary-900"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://in.pinterest.com/"
                      target="_blank"
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-900 hover:bg-primary-700 hover:text-primary-900"
                    >
                      <i className="fa-brands fa-pinterest-p"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-900 hover:bg-primary-700 hover:text-primary-900"
                    >
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12 bg-dark-900 ">
          <div className="container relative z-1 text-center lg:text-left lg:flex items-center justify-between">
            <p className="text-white text-md lg:mb-0">
              Copyright 2023{" "}
              <a
                href="index-1"
                className="text-white underline hover:text-primary-900"
              >
                Journeya
              </a>
              . All Rights Reserved.
              <br /> Design by{" "}
              <a
                href="#"
                className="text-white hover:text-primary-900 underline ml-1"
              >
                Webbytemplate
              </a>
              .
            </p>

            <ul className="flex items-center justify-center flex-wrap lg:justify-end text-md md:text-lg text-white gap-3 sm:gap-6">
              <li>
                <a href="#" className="hover:text-primary-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="about" className="hover:text-primary-900">
                  About us
                </a>
              </li>
              <li>
                <a href="contact" className="hover:text-primary-900">
                  Contact us
                </a>
              </li>
              <li>
                <a href="faq" className="hover:text-primary-900">
                  Faq
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-900">
                  Team&Condition
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
