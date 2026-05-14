import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Add_To_Cart_Model } from "@/component/comman";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";

// Define the Hotel_Tab component
const Hotel_Tab = ({ hotel_data }) => {
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

  const generateStarIcons = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };
  return (
    <div className="mb-10">
      {hotel_data &&
        hotel_data.map((data, index) => {
          return (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              key={index}>
              {data.product &&
                data.product.map((product_data, index) => {
                  return (
                    <div className="group relative" key={index}>
                      <div className=" w-full overflow-hidden rounded-2xl before:pt-[65%] before:block relative group-hover:opacity-75">
                        <Link
                          href={product_data.slug}
                          className="absolute top-0 left-0 h-full w-full">
                          <Image
                            src={product_data.image}
                            alt={product_data.alt}
                            width={358}
                            height={233}
                            className="h-full w-full object-cover object-center"
                          />
                        </Link>
                      </div>
                      <div className="mt-5">
                        <div class="flex items-start justify-between">
                          <h3 className="text-1xl text-dark-700 leading-2xl mb-2 group-hover:text-primary-900">
                            <Link
                              href={product_data.slug}
                              className="hotel-popup-link">
                              {product_data.title}
                            </Link>
                          </h3>
                          <button
                            class="btn btn-primary rounded-[3px] w-full h-full px-3 py-2"
                            onClick={e => open_model(e, product_data)}>
                            Add to{" "}
                            <img
                              src="/assets/images/Cart.svg"
                              alt="material-symbols_card-travel"
                              width="22"
                              height="22"
                              class="ml-1"
                            />
                          </button>
                        </div>
                        <p className="text-md mb-2 leading-md">
                          {product_data.short_des}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[12px] flex items-center gap-2 text-dark-800 m-0 leading-md">
                              <span className="flex items-center gap-1 text-[#FFC738]">
                                {generateStarIcons(product_data.rating)}
                              </span>
                              ({product_data.review} Review)
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-md font-bold text-dark-900 block">
                              ${product_data.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}

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
    </div>
  );
};

export default Hotel_Tab;
