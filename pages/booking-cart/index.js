import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React from "react";
import { useCart } from "react-use-cart";

export default function Contact() {
  const { data: hero_about_data } = useFetchData("json/data/hero_contact.json");

  const { items, removeItem, isEmpty, cartTotal } = useCart();

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  const delete_item_from_cart = (e, data) => {
    e.preventDefault();
    removeItem(data.id);
  };

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.contact_meta} comman_meta={seo_data} />

      <div className="bg-gray-200 mb-10 md:mb-14 py-10 md:py-11">
        <div className="container">
          <h1 className="text-center text-25 md:text-[40px] mb-8 md:mb-14 font-bold leading-normal">
            Payment Page
          </h1>

          <ul className="payment-list-link">
            <li className="active">
              <Link href="booking-cart" className="">
                <span>01</span>Your Cart
              </Link>
            </li>
            <li>
              <Link href="booking-contact" className="">
                <span>02</span>Contact Details
              </Link>
            </li>
            <li>
              <Link href="booking-payment" className="">
                <span>03</span>Payment
              </Link>
            </li>
            <li>
              <Link href="complete-or-thank-you" className="">
                <span>04</span>Complete
              </Link>
            </li>
          </ul>

          <div className="flex flex-wrap">
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-10 xl:pr-24">
              <div className="w-full overflow-x-auto border-b border-[#EAE4F6]">
                <table className="table-auto cart-table w-full whitespace-nowrap text-dark-900 text-left">
                  <thead>
                    <tr>
                      <th className="text-lg font-bold text-dark-900 px-4 py-4 border-b border-[#EAE4F6]">
                        Product
                      </th>
                      <th className="text-lg font-bold text-center text-dark-900 px-4 py-4 border-b border-[#EAE4F6]">
                        Persons
                      </th>
                      <th className="text-lg font-bold text-center text-dark-900 px-4 py-4 border-b border-[#EAE4F6]">
                        Price
                      </th>
                      <th className="text-lg font-bold text-center text-dark-900 px-4 py-4 border-b border-[#EAE4F6]">
                        Total
                      </th>
                      <th className="text-lg font-bold text-dark-900 px-4 py-4 border-b border-[#EAE4F6]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {isEmpty ? <p>Your cart is empty</p> : ""}
                    {items &&
                      items.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="py-9 px-4 text-md">
                              <div className="flex items-center justify-between w-full">
                                <strong className="block sm:hidden">
                                  Product
                                </strong>
                                <p className="whitespace-normal text-lg w-[200px] m-0 text-right sm:text-left">
                                  {item.title}
                                </p>
                              </div>
                            </td>
                            <td className="py-9 px-4 text-md text-center">
                              <div className="flex items-center justify-between w-full">
                                <strong className="block sm:hidden">
                                  Product
                                </strong>
                                <span>
                                  {item.persons && item.persons.length}
                                </span>
                              </div>
                            </td>
                            <td className="py-9 px-4 text-md text-center">
                              <div className="flex items-center justify-between w-full">
                                <strong className="block sm:hidden">
                                  Product
                                </strong>
                                <span>${item.one_price}</span>
                              </div>
                            </td>
                            <td className="py-9 px-4 text-md text-center">
                              <div className="flex items-center justify-between w-full">
                                <strong className="block sm:hidden">
                                  Product
                                </strong>
                                <strong>${item.price}</strong>
                              </div>
                            </td>
                            <td className="py-9 px-4 text-md text-right">
                              <Link
                                href="/booking-cart"
                                onClick={e => {
                                  delete_item_from_cart(e, item);
                                }}
                                className="text-primary-900 inline-block hover:text-black">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="none">
                                  <path
                                    d="M7.5 6.25003H22.5M11.25 6.25003C13.2211 3.95035 16.7789 3.95035 18.75 6.25003M11.25 25H18.75C20.1307 25 21.25 23.8808 21.25 22.5V11.25C21.25 10.5597 20.6904 10 20 10H10C9.30965 10 8.75 10.5597 8.75 11.25V22.5C8.75 23.8808 9.86929 25 11.25 25Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="border border-[#EAE4F6] bg-[#F8F4FF] p-5 rounded-1xl mb-5">
                <h3 className="text-md font-bold text-dark-900 pb-4 mb-0 leading-normal">
                  Cart Total
                </h3>
                <div className="border-y border-primary-800 text-dark-900">
                  <div className="flex items-center justify-between text-md py-4 text-dark-900">
                    <strong className="font-medium">Subtotal</strong>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-md py-4 text-dark-900 font-bold">
                  <strong className="font-bold">Total</strong>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="mb-1">
                  <Link
                    href="booking-contact"
                    className="btn btn-primary flex items-center justify-center w-full max-w-full gap-2 font-semibold">
                    Next step{" "}
                    <img
                      src="assets/images/arrow-right.svg"
                      alt="arrow-right"
                    />
                  </Link>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="booking-detail"
                  className="underline text-dark-700 text-md hover:text-primary-900 hover:no-underline">
                  Continue to exploring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
