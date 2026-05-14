import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React from "react";
import { useCart } from "react-use-cart";

export default function Contact() {
  const { data: hero_about_data } = useFetchData("json/data/hero_contact.json");

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  const { items, isEmpty, cartTotal } = useCart();

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
            <li className="active">
              <Link href="booking-contact" className="">
                <span>02</span>Contact Details
              </Link>
            </li>
            <li className="active">
              <Link href="booking-payment" className="">
                <span>03</span>Payment
              </Link>
            </li>
            <li className="active">
              <Link href="complete-or-thank-you" className="">
                <span>04</span>Complete
              </Link>
            </li>
          </ul>

          <div className="flex flex-wrap">
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <div className="shadow-box-4 w-full rounded-xl py-5 md:py-9 px-5 md:px-6 bg-white text-center">
                <h2 className="text-lg mb-5 pb-4 border-b border-primary-800">
                  Booking Completed!
                </h2>
                <p className="text-1xl">Thank you!</p>
                <p className="max-w-[465px] mx-auto">
                  Your booking detail has been sent to your email.You can check
                  the payment status from your dashboard.
                </p>
                <Link
                  href="booking-dashboard"
                  className="btn btn-primary mx-auto font-semibold">
                  Go to my dashboard
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <div className="mb-2">
                {items &&
                  items.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <h3 className="text-xl mb-5 md:text-25">
                          {item.title}
                        </h3>
                        <p className="mb-4">Travel Date : {item.date} </p>
                        <p className="mb-5">
                          Traveller : {item.persons && item.persons.length}
                        </p>

                        <div className="text-dark-900 border-y border-primary-800 mb-6">
                          <div className="flex items-center justify-between text-lg py-5 lg:py-6 text-dark-800">
                            <strong className="font-semibold">
                              Total Price
                            </strong>
                            <strong className="font-bold text-primary-900">
                              ${item.price && item.price.toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
