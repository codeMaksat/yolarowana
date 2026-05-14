import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Image_Sector from "./image_sector";
import Overview_Sector from "./overview_sector";
import Facilities_Sector from "./facilities_sector";
import Available_Rooms_Sector from "./available_rooms_sector";
import Reviews_Sector from "./reviews_sector";

const All_Hotels_Detail = ({ initialValues }) => {
  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = (event) => {
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
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="border-b border-gray-300 mb-8">
                <h2 className="mb-2">{data.title}</h2>
                <div className="flex justify-between flex-wrap items-center mb-6">
                  <p className="flex flex-wrap gap-3 mb-0">
                    <span className="flex items-start">
                      <Image
                        src={data.location_icon}
                        alt={data.location_alt}
                        width={32}
                        height={29}
                        className=""
                      />{" "}
                      {data.label}{" "}
                    </span>
                    <Link
                      href={data.location_slug}
                      className="text-primary-900 underline hover:no-underline flex items-center before:block before:w-1 before:h-1 before:bg-dark-800 before:rounded-full before:mr-3"
                    >
                      {data.location_label}
                    </Link>
                  </p>
                  <div className="text-dark-900 text-25 font-bold pt-3">
                    ${data.price}
                  </div>
                </div>
              </div>

              <Image_Sector image_data={data.images} />

              <Overview_Sector overview_data={data.overview} />

              <Facilities_Sector facilities_data={data.facilities} />

              <Available_Rooms_Sector
                available_rooms_data={data.available_rooms}
              />

              <Reviews_Sector reviews_data={data.reviews} />

              <div className="guest-reviews border-t border-primary-800 pt-3">
                <h2 className="border-b border-primary-800 pb-4 mb-8 text-xl font-bold">
                  {data.reviews_label}
                </h2>

                <form
                  className="form"
                  id="account_details_form"
                  onSubmit={save_account_details}
                >
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
                      <button className="btn btn-primary">
                        {data.reviews_btn_label}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Hotels_Detail;
