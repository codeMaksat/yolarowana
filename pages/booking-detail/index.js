import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React from "react";

export default function Contact() {
  const { data: hero_about_data } = useFetchData("json/data/hero_contact.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.contact_meta} comman_meta={seo_data} />

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-0">
        <div className="container">
          <div className="md:flex">
            <div className="md:max-w-[258px] w-full shrink-0 py-6 md:py-10 px-4 md:px-5 bg-white">
              <ul className="dashboard-list">
                <li>
                  <a href="booking-dashboard" className="">
                    <span>
                      <img src="assets/images/dashboard.svg" alt="dashboard" />
                    </span>
                    Dashboard
                  </a>
                </li>
                <li className="active">
                  <a href="booking-history" className="">
                    <span>
                      <img src="assets/images/data-blob.svg" alt="data-blob" />
                    </span>
                    Booking history
                  </a>
                </li>
                <li className="">
                  <a href="login" className="">
                    <span>
                      <img src="assets/images/logout.svg" alt="logout" />
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-258px)]">
              <div className="mb-7">
                <h2 className="text-xl md:text-25 mb-2">Booking Detail</h2>
                <p className="">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <h3 className="text-xl mb-8 font-semibold">Order Summary</h3>
                  <div>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Order Number :</strong>{" "}
                      #194
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Booking Date :</strong>{" "}
                      March 23, 2023
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Tour :</strong> Africa –
                      Amazing African Safari
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Travel Date :</strong>{" "}
                      February 1, 2030
                    </p>
                  </div>
                </div>
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <h3 className="text-xl mb-8 font-semibold">Billing Detail</h3>
                  <div>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">First Name :</strong>{" "}
                      demo
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Last Name :</strong>{" "}
                      demo
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Email :</strong>{" "}
                      armiamipara@gmail.com
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Phone :</strong>{" "}
                      9999999998
                    </p>
                    <p className="text-md mb-0">
                      <strong className="font-semibold">Country :</strong>{" "}
                      United States of America (USA)
                    </p>
                  </div>
                </div>
              </div>

              <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white mt-6">
                <h3 className="text-xl mb-8 font-semibold">Traveller info</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="flex gap-2 text-md">
                    <h6 className="font-semibold mb-0 text-dark-800">
                      Traveller 1 :
                    </h6>
                    <p className="m-0">
                      Mr demo demo
                      <br />
                      Age 18+ 20
                      <br />
                      Phone 9999999970
                    </p>
                  </div>
                  <div className="flex gap-2 text-md">
                    <h6 className="font-semibold mb-0 text-dark-800">
                      Traveller 2:
                    </h6>
                    <p className="m-0">
                      Mr demo demo
                      <br />
                      Age 18+ 20
                      <br />
                      Phone 9999999970
                    </p>
                  </div>
                </div>
              </div>
              <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white mt-6">
                <h3 className="text-xl mb-8 font-semibold border-b border-gray-100 pb-4 mb-5">
                  Pricing
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="flex gap-2 text-md">
                    <p className="m-0">
                      <strong>Traveller Base Price</strong> 1 x $100
                    </p>
                  </div>
                  <div className="leading-[30px]">
                    <p className="text-right mb-4">$100.00</p>
                    <div className="border-y border-gray-100 py-3 mb-4">
                      <div className="flex items-center justify-between text-md">
                        <strong className="font-semibold">
                          Sub Total Price
                        </strong>
                        <span>$120.00</span>
                      </div>
                      <div className="flex items-center justify-between text-md">
                        <strong className="font-semibold">Tax Rate</strong>
                        <span>9%</span>
                      </div>
                      <div className="flex items-center justify-between text-md">
                        <strong className="font-semibold">Tax Due</strong>
                        <span>$20.00</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-md">
                      <strong className="font-semibold">Total</strong>
                      <span className="font-semibold">$130.66</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
