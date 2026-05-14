import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Reviews_Sector from "./reviews_sector";
import Side_Bar_Three from "./side_bar_three";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { Add_To_Cart_Model } from "@/component/comman";

const All_Tour_Detail_Three = ({
  initialValues,
  side_bar_data,
  reviews_data,
  related_product_data,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [single_cart_data, setsingle_cart_data] = useState({});

  const open_model = (e, data) => {
    setsingle_cart_data(data);
    onOpen();
    e.preventDefault();
  };

  const close_model = e => {
    onClose();
    e.preventDefault();
    setsingle_cart_data({});
  };
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
      let data = {
        name: name,
        email: email,
        messages: messages,
      };
      console.log(data);
    }
  };

  const InformationSection = ({ informationData }) => {
    return (
      <div className="border border-primary-800 bg-[#FBFAFF] rounded-2xl overflow-hidden text-md text-gray-800 md:text-lg tracking-[0.36px]">
        {informationData.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap border-b border-primary-800">
            <div className="w-full md:w-1/3 px-5 md:px-7 py-4 bg-[#F3EFFA] text-black font-semibold">
              {item.title}
            </div>
            <div className="w-full md:w-2/3 px-5 md:px-7 py-4">
              {Array.isArray(item.content) ? (
                <ul
                  className={`ul-list ${
                    index === 4 ? "ul-included" : "list-excluded"
                  }`}>
                  {item.content.map((li, liIndex) => (
                    <li key={liIndex}>{li}</li>
                  ))}
                </ul>
              ) : (
                item.content
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const InfoGrid = ({ infoData }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 xl:gap-8 mb-9">
        {infoData.map((item, index) => (
          <div
            key={index}
            className="border border-primary-800 bg-[#FBFAFF] text-center py-6 px-1 rounded-xl">
            <div className="border border-primary-900 rounded-full block mx-auto mb-2 w-[50px] h-[50px] flex items-center justify-center">
              <img src={item.icon} alt={item.title} width={item.iconWidth} />
            </div>
            <span className="text-md text-gray-800 block">{item.title}</span>
            <h3 className="text-md font-semibold m-0 leading-normal">
              {item.content}
            </h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="">
      <div className="container">
        <div className="">
          {initialValues &&
            initialValues.map((data, index) => {
              return (
                <div className="lg:flex mb-10 md:mb-16" key={index}>
                  <div className="w-full lg:w-[calc(100%-300px)] xl:w-[calc(100%-395px)] lg:pr-10 mb-8 lg:mb-0">
                    <h2 className="mb-5">{data.title}</h2>

                    <InfoGrid infoData={data.info} />

                    <div className="mb-10 overflow-hidden rounded-2xl">
                      <img src={data.image} alt={data.alt} />
                    </div>

                    {data.description &&
                      data.description.map((description_data, index) => {
                        return (
                          <div className="mb-7 md:mb-10" key={index}>
                            <h4 className="text-xl md:text-3xl mb-7">
                              {description_data.title}
                            </h4>
                            {description_data.details.map(
                              (paragraph, index) => (
                                <p key={index} className="leading-1xl">
                                  {paragraph}
                                </p>
                              )
                            )}
                          </div>
                        );
                      })}

                    <InformationSection informationData={data.information} />
                  </div>

                  <Side_Bar_Three
                    sideBarThree_data={side_bar_data}
                    price={data.price}
                  />
                </div>
              );
            })}

          {related_product_data &&
            related_product_data.map((products_data, index) => {
              return (
                <div className="mb-14" key={index}>
                  <h2 className="mb-5 md:mb-8">{products_data.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {products_data.product &&
                      products_data.product.map((singel_data, index) => {
                        return (
                          <div
                            className="group relative bg-white shadow-box-1 rounded-xl"
                            key={index}>
                            <div className="">
                              <div className=" w-full overflow-hidden rounded-t-xl before:pt-[65%] before:block relative group-hover:opacity-75">
                                <Link
                                  href={singel_data.slug}
                                  className="absolute top-0 left-0 h-full w-full">
                                  <img
                                    src={singel_data.image}
                                    alt={singel_data.alt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </Link>
                              </div>
                              <div className="mt-5">
                                <h3 className="text-1xl text-dark-700 leading-2xl mb-2 group-hover:text-primary-900 text-center">
                                  <Link href={singel_data.slug}>
                                    {singel_data.title}
                                  </Link>
                                </h3>
                                <p className="text-center mb-0 text-md">
                                  {singel_data.description}
                                </p>
                                <div className="px-5 py-5 flex justify-between">
                                  <div className="flex items-center gap-2 text-sm">
                                    <img
                                      src="/assets/images/calendar-icon.svg"
                                      alt="calendar-icon"
                                    />
                                    {singel_data.date}
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <img
                                      src="/assets/images/clock-icon.svg"
                                      alt="calendar-icon"
                                    />
                                    {singel_data.day} Days
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <img
                                      src="/assets/images/star-icon.svg"
                                      alt="calendar-icon"
                                    />
                                    {singel_data.rating}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-between bg-primary-800">
                              <div className="text-right flex items-right justify-right gap-3  py-2 px-3 rounded-b-xl">
                                <span className="text-xl md:text-2xl pl-5 font-bold text-dark-900 block">
                                  <sup>$</sup>
                                  {singel_data.price}
                                </span>
                                <span className="text-sm font-semibold text-primary-900 line-through block">
                                  <sup>$</sup>
                                  {singel_data.old_price}
                                </span>
                              </div>
                              <div className="flex items-end justify-end">
                                <button
                                  className="btn btn-primary rounded-[3px] w-full h-full px-3 py-2"
                                  onClick={e => open_model(e, singel_data)}>
                                  Add to{" "}
                                  <img
                                    src="/assets/images/Cart.svg"
                                    alt="material-symbols_card-travel"
                                    width={22}
                                    height={22}
                                    className="ml-1"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}

          {/* review */}
          <Reviews_Sector reviews_data={reviews_data} />

          <div className="guest-reviews border-t border-primary-800 pt-3">
            <h2 className="border-b border-primary-800 pb-4 mb-8 text-xl font-bold">
              Leave a Reply
            </h2>

            <form
              className="form"
              id="account_details_form"
              onSubmit={save_account_details}>
              <div className="flex flex-wrap md:-mx-3 lg:-mx-5">
                <div className="md:px-3 lg:px-5 w-full md:w-1/2 mb-5">
                  <input
                    type="text"
                    name="name"
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
      <Modal
        classNames="bg-gray-900"
        isOpen={isOpen}
        onClose={onClose}
        size="3xl">
        <ModalContent className="pt-0 pb-0">
          <div className="bg-white rounded-1xl relative overflow-hidden">
            <div className="bg-primary-800 border-b border-[#C6BCDA] py-2 px-5 flex items-center justify-between">
              <h2 className="text-xl font-bold m-0">Add to cart</h2>
              <button
                className="mfp-close xl:text-3xl xl:leading-5"
                title="Close (Esc)"
                onClick={e => close_model(e)}
                type="button">
                ×
              </button>
            </div>

            <Add_To_Cart_Model Data={single_cart_data} />
          </div>
          {/* </div> */}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default All_Tour_Detail_Three;
