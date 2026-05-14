import Image from "next/image";
import Link from "next/link";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import Member_View from "./member_view";

const All_Team = ({ initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [single_cart_data, setsingle_cart_data] = useState({});

  const open_model = (e, data) => {
    setsingle_cart_data(data);
    onOpen();
    e.preventDefault();
  };

  const close_model = (e) => {
    onClose();
    e.preventDefault();
    setsingle_cart_data({});
  };

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {data.product &&
                  data.product.map((product_data, index) => {
                    return (
                      <div className="relative group" key={index}>
                        <div className="relative overflow-hidden before:pt-[110%] rounded-xl before:block after:w-full after:transition-all after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900 after:opacity-20 group-hover:after:opacity-40">
                          <Image
                            src={product_data.image}
                            alt={product_data.alt}
                            width={361}
                            height={397}
                            className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                          />
                        </div>

                        <div className="absolute bottom-0 left-0 p-5 w-full rounded-b-xl bg-dark-900/50 flex items-center justify-between">
                          <div>
                            <h3 className="text-white text-2xl leading-normal mb-0">
                              <Link href={product_data.slug}>
                                {product_data.name}
                              </Link>
                            </h3>
                            <span className="block text-white text-md font-medium">
                              {product_data.position}
                            </span>
                          </div>
                          <div className="bg-primary-900 w-11 h-11 text-white hover:text-primary-900 hover:bg-white z-1 rounded-full">
                            <Link
                              className="team-popup-link d-none flex items-center justify-center h-full w-full"
                              href="#team-popup"
                              onClick={(e) => open_model(e, product_data)}
                            >
                              {" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 23 23"
                                fill="none"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M20.125 3.59382C20.125 3.4032 20.0493 3.22038 19.9145 3.08559C19.7797 2.95079 19.5969 2.87507 19.4062 2.87507H10.7812C10.5906 2.87507 10.4078 2.95079 10.273 3.08559C10.1382 3.22038 10.0625 3.4032 10.0625 3.59382C10.0625 3.78444 10.1382 3.96726 10.273 4.10205C10.4078 4.23685 10.5906 4.31257 10.7812 4.31257H17.6712L3.08487 18.8974C3.01804 18.9643 2.96503 19.0436 2.92887 19.1309C2.8927 19.2182 2.87408 19.3118 2.87408 19.4063C2.87408 19.5008 2.8927 19.5944 2.92887 19.6817C2.96503 19.769 3.01804 19.8484 3.08487 19.9152C3.15169 19.982 3.23103 20.035 3.31834 20.0712C3.40565 20.1074 3.49924 20.126 3.59374 20.126C3.68825 20.126 3.78183 20.1074 3.86914 20.0712C3.95646 20.035 4.03579 19.982 4.10262 19.9152L18.6875 5.32888V12.2188C18.6875 12.4094 18.7632 12.5923 18.898 12.7271C19.0328 12.8618 19.2156 12.9376 19.4062 12.9376C19.5969 12.9376 19.7797 12.8618 19.9145 12.7271C20.0493 12.5923 20.125 12.4094 20.125 12.2188V3.59382Z"
                                  fill="currentColor"
                                  stroke="currentColor"
                                />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-16 mb-10 text-center">
                <Link
                  href={data.btn_slug}
                  className="btn btn-primary mx-auto flex items-center min-w-[190px]"
                >
                  {data.btn_label}
                  <span className="ml-1.5">
                    <svg
                      className="mx-auto d-block"
                      width="22"
                      height="22"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="loader_68">
                        <g className="loader_circle_1" id="loader_68_3">
                          <g id="Group 125">
                            <circle
                              id="Ellipse 304"
                              cx="30"
                              cy="30"
                              r="26"
                              fill="transparent"
                            />
                            <path
                              id="Intersect"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4 30H8C8 17.8497 17.8497 8 30 8C42.1503 8 52 17.8497 52 30H56C56 15.6406 44.3594 4 30 4C15.6406 4 4 15.6406 4 30Z"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                        <g className="loader_circle_2" id="loader_68_2">
                          <g id="Group 122">
                            <circle
                              id="Ellipse 302"
                              cx="30"
                              cy="30"
                              r="28"
                              fill="transparent"
                            />
                            <path
                              id="Intersect_2"
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.2009 10.201L15.8578 15.8579C19.4771 12.2386 24.4771 10 29.9999 10C41.0456 10 49.9999 18.9543 49.9999 30H57.9999C57.9999 14.536 45.4639 2 29.9999 2C22.2679 2 15.2679 5.13401 10.2009 10.201Z"
                              fill="currentColor"
                            />
                          </g>
                        </g>
                        <g className="loader_circle_3" id="loader_68_1">
                          <circle
                            id="Ellipse 301"
                            cx="30"
                            cy="30"
                            r="30"
                            fill="transparent"
                          />
                          <path
                            id="Intersect_3"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M60 30H48C48 20.0589 39.9411 12 30 12V0C46.5685 0 60 13.4315 60 30Z"
                            fill="currentColor"
                          />
                        </g>
                      </g>
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          );
        })}

      <Modal
        classNames="bg-gray-900"
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalContent className="bg-white rounded-1xl relative wc-hide-close-btn overflow-hidden p-6">
          <button
            className="mfp-close xl:text-3xl xl:leading-5 absolute appearance-none select-none top-1 right-1 p-2 text-foreground-500 rounded-full hover:bg-default-100 active:bg-default-200 tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2"
            title="Close (Esc)"
            onClick={(e) => close_model(e)}
            type="button"
          >
            ×
          </button>

          <Member_View data={single_cart_data} />
        </ModalContent>
      </Modal>
    </section>
  );
};

export default All_Team;
