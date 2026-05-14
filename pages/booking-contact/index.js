import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useCart } from "react-use-cart";

export default function Contact() {
  const router = useRouter();
  const { data: hero_about_data } = useFetchData("json/data/hero_contact.json");

  const { items, isEmpty, cartTotal } = useCart();

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  if (isEmpty) {
    router.push("/booking-cart");
  }
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
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <div className="shadow-box-3 w-full rounded-xl py-5 md:py-8 px-5 md:px-7 bg-white">
                <h2 className="text-xl md:text-25 mb-6">Contact Details</h2>
                <form className="form contact-details-form">
                  <div className="flex flex-wrap md:-mx-2">
                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-4">
                      <input
                        type="text"
                        name=""
                        placeholder="First name"
                        className="form-control"
                      />
                    </div>
                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-4">
                      <input
                        type="text"
                        name=""
                        placeholder="Last name"
                        className="form-control"
                      />
                    </div>
                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-4">
                      <input
                        type="email"
                        name=""
                        placeholder="Email address"
                        className="form-control"
                      />
                    </div>
                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-4">
                      <input
                        type="text"
                        name=""
                        placeholder="Phone"
                        className="form-control"
                      />
                    </div>
                    <div className="md:px-2 w-full mb-3 md:mb-4">
                      <textarea
                        className="form-control"
                        placeholder="Full Address"></textarea>
                    </div>
                    <div className="md:px-2 w-full mb-3 md:mb-10">
                      <label className="checkcontainer">
                        Billing Detail same as contact detail
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <h2 className="md:px-2 w-full text-xl md:text-25 mb-4">
                      Notes
                    </h2>
                    <div className="md:px-2 w-full">
                      <textarea
                        className="form-control"
                        placeholder="Additional notes"></textarea>
                    </div>
                  </div>
                </form>
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
                        <p className="mb-4">Travel Date : {item.date}</p>
                        <p className="m-0">
                          Traveller : {item.persons && item.persons.length}
                        </p>

                        <div className="text-dark-900">
                          <div className="flex items-center justify-between text-lg py-5 lg:py-6 text-dark-800">
                            <strong className="font-semibold">Price</strong>
                            <strong className="font-bold text-primary-900">
                              ${item.price && item.price.toFixed(2)}
                            </strong>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}

                <div className="border-y border-primary-800 lg:flex items-center justify-between text-lg py-5 lg:py-8 text-dark-800 font-bold">
                  <strong className="font-semibold shrink-0 mb-3 block lg:mb-0 lg:mr-3">
                    Coupon Code :
                  </strong>
                  <form className="flex relative">
                    <input
                      type="text"
                      name=""
                      className="w-full border border-primary-800 rounded-md py-2 pl-5 pr-28"
                    />
                    <button className="btn-primary ml-3 top-1 right-1 rounded-md py-2 px-3 h-[calc(100%-10px)]5">
                      Apply
                    </button>
                  </form>
                </div>
                <div className="flex items-center justify-between text-lg py-6 lg:py-6 text-dark-800">
                  <strong className="font-semibold">Total Price</strong>
                  <strong className="font-bold text-primary-900">
                    ${cartTotal.toFixed(2)}
                  </strong>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="booking-payment"
                  className="btn btn-primary flex items-center justify-center w-full max-w-full gap-2 font-semibold">
                  Next step{" "}
                  <img src="assets/images/arrow-right.svg" alt="arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
