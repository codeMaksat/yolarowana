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
                <li className="active">
                  <Link href="booking-dashboard" className="">
                    <span>
                      <img src="assets/images/dashboard.svg" alt="dashboard" />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li className="">
                  <Link href="booking-history" className="">
                    <span>
                      <img src="assets/images/data-blob.svg" alt="data-blob" />
                    </span>
                    Booking history
                  </Link>
                </li>
                <li className="">
                  <Link href="login" className="">
                    <span>
                      <img src="assets/images/logout.svg" alt="logout" />
                    </span>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-8 mb-0 md:py-8 md:pb-14 md:px-5 xl:px-8 w-full md:w-[calc(100%-258px)]">
              <div className="mb-7">
                <h2 className="text-xl md:text-25 mb-2">Dashboard</h2>
                <p className="">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Pending
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">$12,800</h3>
                  <p className="mb-5 text-sm">Total pending</p>
                  <img src="assets/images/salary-icon.svg" alt="icon" />
                </div>
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Paid
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">$22,900</h3>
                  <p className="mb-5 text-sm">Total paid</p>
                  <img src="assets/images/piggy-bank-icon.svg" alt="icon" />
                </div>
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Tours
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">25</h3>
                  <p className="mb-5 text-sm">Total Tours</p>
                  <img src="assets/images/hiking-icon-1.svg" alt="icon" />
                </div>
                <div className="shadow-box-3 rounded-xl py-8 px-5 bg-white">
                  <span className="text-dark-900 text-sm block mb-1 font-medium">
                    Services
                  </span>
                  <h3 className="text-xl md:text-25 mb-1 font-bold">34</h3>
                  <p className="mb-5 text-sm">Total bookable services</p>
                  <img src="assets/images/booking-icon.svg" alt="icon" />
                </div>
              </div>

              <div className="shadow-box-3 w-full mt-6 md:mt-10 rounded-xl py-6 px-5 bg-white">
                <h3 className="text-xl mb-7">Recent Bookings</h3>

                <div className="w-full overflow-x-auto">
                  <table className="table-list table-auto whitespace-nowrap">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Order Date</th>
                        <th>Execution Time</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Remain</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Hotel</td>
                        <td>The May Fair Hotel</td>
                        <td>04/04/2022</td>
                        <td>
                          Check in :<br /> 05/14/2022
                          <br /> Check out :<br /> 05/29/2022
                        </td>
                        <td>$100</td>
                        <td>$0</td>
                        <td>$100</td>
                        <td>
                          <span className="bg-[#FEF2D3] text-[#EFB41E] py-1 px-3 rounded-full text-15 block text-center">
                            Pending
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Hotel</td>
                        <td>The Green Hotel</td>
                        <td>03/02/2022</td>
                        <td>
                          Check in :<br /> 03/02/2022
                          <br /> Check out :<br /> 06/02/2022
                        </td>
                        <td>$100</td>
                        <td>$100</td>
                        <td>$0</td>
                        <td>
                          <span className="bg-primary-800 text-primary-900 py-1 px-3 rounded-full text-15 block text-center">
                            Confirm
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
