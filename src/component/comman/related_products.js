import React, { useState, useEffect } from "react";
import Reviews_Sector from "./reviews_sector";
import Link from "next/link";
import Image from "next/image";

// Define Link reusable function for fetching data
const Related_Products = ({ products, reviews_data }) => {
  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = event => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let name = formData.get("Fullname");
    let email = formData.get("email");
    let messages = formData.get("messages");

    const error = {};

    if (!name || name.trim() === "") {
      error.name = "Name is required*";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!messages || messages.trim() === "") {
      error.messages = "Messages is required*";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});
    }

    let data = {
      name: name,
      email: email,
      messages: messages,
    };
    console.log(data);
  };

  return (
    <section className="py-12 related-post-section relative before:absolute before:top-0 before:left-0 before:w-full before:h-[40%]">
      <div className="container relative">
        {products &&
          products.map((products_data, index) => {
            return (
              <div className="mb-14" key={index}>
                <h2 className="mb-5 md:mb-8">{products_data.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                  {products_data.product &&
                    products_data.product.map((singel_data, index) => {
                      return (
                        <div className="relative group" key={index}>
                          <div className="relative w-full overflow-hidden before:pt-[75%] before:block rounded-xl">
                            <div className="absolute top-3 right-3 z-1">
                              <Link
                                href={singel_data.slug}
                                className="btn btn-primary btn-md text-sm min-w-0">
                                {singel_data.btn_label}
                              </Link>
                            </div>
                            <Link href={singel_data.slug}>
                              <Image
                                src={singel_data.image}
                                alt={singel_data.alt}
                                width={778}
                                height={311}
                                className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                              />
                            </Link>
                          </div>
                          <div className="py-5">
                            <div className="max-w-[380px]">
                              <h3 className="text-xl xl:leading-normal mb-2 hover:text-primary-900">
                                <Link href={singel_data.slug}>
                                  {singel_data.title}
                                </Link>
                              </h3>
                              <span className="bg-white/80 rounded-md text-sm text-dark-800 mb-2 block max-w-fit">
                                {singel_data.date}
                              </span>
                              <p className="text-md leading-normal mb-0 text-dark-800">
                                {singel_data.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}

        <Reviews_Sector reviews_data={reviews_data} />

        <div className="guest-reviews border-t border-primary-800 pt-3">
          <h2 className="border-b border-primary-800 pb-4 mb-8 text-xl font-bold">
            Leave Link Reply
          </h2>

          <form
            className="form"
            id="account_details_form"
            onSubmit={save_account_details}>
            <div className="flex flex-wrap md:-mx-3 lg:-mx-5">
              <div className="md:px-3 lg:px-5 w-full md:w-1/2 mb-5">
                <input
                  type="text"
                  name="Fullname"
                  placeholder="Full name"
                  className="form-control"
                />
                {address_save_errors.name && (
                  <span className="error text-red-800">
                    {address_save_errors.name}
                  </span>
                )}
              </div>
              <div className="md:px-3 lg:px-5 w-full md:w-1/2 mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className="form-control"
                />
                {address_save_errors.email && (
                  <span className="error text-red-800">
                    {address_save_errors.email}
                  </span>
                )}
              </div>
              <div className="md:px-3 lg:px-5 w-full mb-5">
                <textarea
                  className="form-control"
                  name="messages"
                  placeholder="Write your comment"
                />
                {address_save_errors.messages && (
                  <span className="error text-red-800">
                    {address_save_errors.messages}
                  </span>
                )}
              </div>
              <div className="md:px-3 lg:px-5 w-full mb-5">
                <button className="btn btn-primary">Post Comment</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Related_Products;
