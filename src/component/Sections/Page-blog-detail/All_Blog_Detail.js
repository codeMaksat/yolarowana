import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Blog_Side_Bar } from "@/component/comman";

const All_Blog_Detail = ({ side_bar_data, initialValues, orders }) => {
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

  let Side_Bar = <></>;

  if (orders !== 0) {
    Side_Bar = (
      <div
        className="w-full lg:max-w-[340px] shrink-0 lg:px-5"
        style={{ order: orders }}>
        <Blog_Side_Bar Data={side_bar_data} />
      </div>
    );
  }

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-8 md:mb-12">
                <h2>{data.title}</h2>
              </div>

              <div className="lg:flex lg:-mx-5">
                {Side_Bar}
                {/* <div
                  className="w-full lg:max-w-[340px] shrink-0 lg:px-5"
                  style={{ order: order }}
                >
                  <Blog_Side_Bar Data={side_bar_data} />
                </div> */}

                <div className="w-full lg:pr-10 lg:px-5">
                  <div className="blog-detail">
                    <div className="relative w-full overflow-hidden before:pt-[40%] before:block rounded-xl">
                      <Image
                        src={data.image}
                        alt={data.alt}
                        width={778}
                        height={311}
                        className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                      />
                    </div>
                    <div className="pt-4">
                      <div className="flex flex-wrap gap-x-4 md:gap-x-8 text-15 text-dark-800 mb-4">
                        {data.service &&
                          data.service.map((service_data, index) => {
                            return (
                              <div
                                className="flex items-center gap-2"
                                key={index}>
                                <Image
                                  src={service_data.image}
                                  alt={service_data.alt}
                                  width={18}
                                  height={18}
                                />{" "}
                                {service_data.label}
                              </div>
                            );
                          })}
                      </div>
                      {data.description &&
                        data.description.map((description_data, index) => {
                          return <p key={index}>{description_data.label}</p>;
                        })}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                        {data.mid_image &&
                          data.mid_image.map((mid_image_data, index) => {
                            return (
                              <div
                                className="relative w-full overflow-hidden before:pt-[46%] before:block rounded-md"
                                key={index}>
                                <Image
                                  src={mid_image_data.image}
                                  alt={mid_image_data.alt}
                                  width={379}
                                  height={174}
                                  className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                              </div>
                            );
                          })}
                      </div>

                      <ul>
                        {data.notice &&
                          data.notice.map((notice_data, index) => {
                            return (
                              <li
                                className="text-dark-800 md:text-lg text-md leading-xl antialiased"
                                key={index}>
                                {notice_data.label}
                              </li>
                            );
                          })}
                      </ul>

                      <blockquote className="border-l-4 border-primary-900 pl-5 py-4 flex items-center gap-4 mb-10">
                        <Image
                          src={data.comments_img}
                          alt="blog-img1"
                          width={53}
                          height={53}
                        />
                        <h6 className="text-xl font-medium text-black m-0">
                          {data.comments}
                        </h6>
                      </blockquote>

                      {data.last_description &&
                        data.last_description.map(
                          (last_description_data, index) => {
                            return (
                              <p key={index}>{last_description_data.label}</p>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Blog_Detail;
