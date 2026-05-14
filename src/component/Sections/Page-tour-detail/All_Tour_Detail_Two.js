import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Itinerary_Sector from "./itinerary_sector";
import Faq_Sector from "./faq_sector";
import Map_Sector from "./map_sector";
import Photos_Sector from "./photos_sector";
import Reviews_Sector from "./reviews_sector";
import Side_Bar from "./side_bar";
import Detail_Sector from "./detail_sector";
import { Blog_Side_Bar } from "@/component/comman";

const All_Tour_Detail_Two = ({ initialValues, side_bar_data }) => {
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
    let data = {
      name: name,
      email: email,
      messages: messages,
    };
    console.log(data);
    }

  };

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="">
                <h2 className="mb-5">{data.title}</h2>
                <div className="text-md md:text-lg leading-normal mb-6 flex items-center gap-2">
                  <i className={`${data.icon} text-primary-900`}></i>{" "}
                  {data.icon_label}
                </div>

                <div className="mb-8">
                  <img src={data.image} alt={data.alt} />
                </div>

                <div className="lg:flex">
                  <div className="w-full lg:w-[calc(100%-300px)] lg:pr-12">
                    <ul className="flex overflow-x-auto md:space-x-5 mb-8 pb-3 md:pb-1 scroll-menu sticky top-[97px] lg:top-[112px] z-2 py-1 bg-white">
                      <li>
                        <Link
                          href="#detail"
                          // onclick="window.location.hash='target';"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full font-semibold block bg-primary-900 text-white"
                        >
                          Detail
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#photos"
                          // onClick={() => scrollToId("photos")}
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Photos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#itinerary"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Itinerary
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#map"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Map
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#faq"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>

                    <div className="tabs-content">
                      <Detail_Sector detail_data={data.detail} />

                      <Photos_Sector photo_data={data.photo} />

                      <Itinerary_Sector itinerary_data={data.itinerary} />

                      <Map_Sector map_data={data.map} />

                      <Faq_Sector faq_data={data.faq} />
                    </div>
                  </div>

                  {/* <Side_Bar sideBar_data={data.side_bar} /> */}
                  <Blog_Side_Bar Data={side_bar_data} />
                </div>

                <Reviews_Sector reviews_data={data.reviews} />

                <div className="guest-reviews border-t border-primary-800 pt-3">
                  <h2 className="border-b border-primary-800 pb-4 mb-8 text-xl font-bold">
                    Leave a Reply
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
                        <button className="btn btn-primary" type="submit">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_Detail_Two;
