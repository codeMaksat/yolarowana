import { Head_Meta, useFetchData } from "@/component/comman";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

export default function Contact() {
  const router = useRouter();

  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  const { items, isEmpty, cartTotal } = useCart();

  const [Payment_Form_save_errors, setPayment_Form_save_errors] = useState({});

  const PaymentForm = e => {
    e.preventDefault();

    const formElement = document.querySelector("#payment-form");
    const formData = new FormData(formElement);

    let check_agree = formData.get("check_agree");
    let pay_mode = formData.get("pay_mode");

    const error = {};

    if (!check_agree || check_agree.trim() === "") {
      error.check_agree = "Terms of Service ,Privacy Statement is required*";
    }

    if (!pay_mode || pay_mode.trim() === "") {
      error.pay_mode = "Payment Method is required*";
    }

    if (Object.keys(error).length > 0) {
      setPayment_Form_save_errors(error);
    } else {
      setPayment_Form_save_errors({});
      let data = {
        name: check_agree,
        pay_mode: pay_mode,
      };
      console.log(data);
      router.push("/complete-or-thank-you");
    }
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
            <li>
              <Link href="complete-or-thank-you" className="">
                <span>04</span>Complete
              </Link>
            </li>
          </ul>

          <div className="flex flex-wrap">
            <div className="w-full md:w-2/3 mb-8 md:mb-0 md:pr-8">
              {items &&
                items.map((item, index) => {
                  return (
                    <div
                      className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-3"
                      key={index}>
                      <div className="shadow-box-4 w-full rounded-xl py-5 md:py-7 px-5 md:px-6 bg-white">
                        <h2 className="text-lg mb-4 pb-4 border-b border-primary-800">
                          Order Summary
                        </h2>
                        <p className="mb-0 text-md">
                          <strong>Order Number :</strong> #19{index + 1}
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Booking Date :</strong> {item.date}
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Tour :</strong> {item.title}
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Travel Date :</strong> {item.date}
                        </p>
                      </div>
                      <div className="shadow-box-4 w-full rounded-xl py-5 md:py-7 px-5 md:px-6 bg-white">
                        <h2 className="text-lg mb-4 pb-4 border-b border-primary-800">
                          Billing Detail
                        </h2>
                        <p className="mb-0 text-md">
                          <strong>First Name :</strong> demo
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Last Name :</strong> demo
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Email :</strong> armiamipara@gmail.com
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Phone :</strong> 9999999998
                        </p>
                        <p className="mb-0 text-md">
                          <strong>Country :</strong> United States of America
                          (USA)
                        </p>
                      </div>
                    </div>
                  );
                })}
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

                <form id="payment-form" onSubmit={PaymentForm}>
                  <h3 className="text-xl mb-5 pb-4 border-b border-primary-800">
                    Payment Method
                  </h3>
                  <div className="mb-5">
                    <Image
                      src="/assets/images/payments-icon-img.png"
                      alt="payments-icon-img"
                      width={272}
                      height={20}
                    />
                  </div>
                  <div className="w-full mb-3 md:mb-7">
                    <label className="checkcontainer">
                      * I agree with{" "}
                      <Link
                        href="#"
                        className="text-primary-900 underline hover:no-underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="text-primary-900 underline hover:no-underline">
                        Privacy Statement
                      </Link>
                      .
                      <div>
                        <input type="checkbox" name="check_agree" />
                        <span className="checkmark bg-white"></span>
                        {Payment_Form_save_errors && (
                          <span className="error text-red-800 ">
                            {Payment_Form_save_errors.check_agree}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="mb-7">
                    <select
                      className="select-box border border-primary-800 shadow-none"
                      name="pay_mode">
                      <option>Paypal</option>
                      <option>Strapi</option>
                      <option>Razorpay</option>
                    </select>
                    {Payment_Form_save_errors && (
                      <span className="error text-red-800 ">
                        {Payment_Form_save_errors.pay_mode}
                      </span>
                    )}
                  </div>
                  <div className="text-center space-y-3 sm:space-y-5">
                    <button
                      type="submit"
                      href="complete-or-thank-you"
                      className="btn btn-primary flex items-center justify-center w-full max-w-full gap-2 font-semibold">
                      Pay now{" "}
                      <img
                        src="assets/images/arrow-right.svg"
                        alt="arrow-right"
                      />
                    </button>
                    <button
                      href="complete-or-thank-you"
                      className="btn btn-primary bg-black flex items-center justify-center w-full max-w-full gap-2 font-semibold">
                      Book and pay later
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
