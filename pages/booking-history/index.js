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
                  <Link href="booking-dashboard" className="">
                    <span>
                      <img src="assets/images/dashboard.svg" alt="dashboard" />
                    </span>
                    Dashboard
                  </Link>
                </li>
                <li className="active">
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
                <h2 className="text-xl md:text-25 mb-2">Booking History</h2>
                <p className="">Lorem ipsum dolor sit amet, consectetur.</p>
              </div>

              <div className="shadow-box-3 w-full mt-6 md:mt-10 rounded-xl py-6 px-5 md:px-8 bg-white">
                <ul className="tabs mb-4 pb-2 inline-flex overflow-x-auto text-dark-900 text-lg font-semibold space-x-7 w-full whitespace-nowrap">
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-primary-900 text-primary-900 block">
                      All Booking
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Completed
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Processing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Confirmed
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Cancelled
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Paid
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="pb-2 border-b-2 border-transparent hover:border-primary-900 hover:text-primary-900 block">
                      Unpaid
                    </Link>
                  </li>
                </ul>
                <div className="w-full overflow-x-auto">
                  <table className="table-list table-history table-auto whitespace-nowrap">
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
                          <span className="bg-yellow-500 text-yellow-600 py-1 px-3 rounded-full text-15 block text-center">
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
                          <span className="bg-red-500 text-red-600 py-1 px-3 rounded-full text-15 block text-center">
                            Rejected
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <nav
                  className="isolate flex items-center justify-center flex-wrap text-center mt-4 space-x-2 text-md text-dark-900 font-bold"
                  aria-label="Pagination">
                  <Link
                    href="#"
                    aria-current="page"
                    className="border border-primary-900 w-10 h-10 rounded-full flex items-center justify-center bg-primary-900 text-white">
                    1
                  </Link>
                  <Link
                    href="#"
                    aria-current="page"
                    className="border border-primary-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-900 hover:text-white">
                    2
                  </Link>
                  <Link
                    href="#"
                    aria-current="page"
                    className="border border-primary-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-900 hover:text-white">
                    3
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
