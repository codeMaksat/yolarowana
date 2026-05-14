import React, { useEffect, useState } from "react";
import Link from "next/link";

// Define the Side_Bar component
const Side_Bar = ({ sideBar_data }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityAdult, setQuantityAdult] = useState(1);
  const [selectedTime, setSelectedTime] = useState("10:00");

  // Function to scroll to the specified ID
  const scrollToId = id => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // useEffect to handle scrolling when the URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        scrollToId(hash.substring(1));
      }
    };

    // Attach the event listener
    window.addEventListener("hashchange", handleHashChange);

    // Detach the event listener on component unmount
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const option1 = [{ value: 1 }, { value: 2 }, { value: 3 }];
  const option2 = [{ value: 1 }, { value: 2 }, { value: 3 }];

  return (
    sideBar_data &&
    sideBar_data.map((form_data, index) => {
      const total =
        quantity * form_data.ticket1_price +
        quantityAdult * form_data.ticket2_price;
      return (
        <div
          className="right-sidebar lg:max-w-[300px] w-full shrink-0"
          key={index}>
          <div className="mb-7 bg-gray-200 border border-primary-800 py-5 px-5 rounded-1xl">
            <h5 className="text-lg mb-4 font-bold">{form_data.title}</h5>
            <div className="mb-3 bg-white shadow-select-box py-1.5 pl-5 pr-3 flex items-center justify-between rounded-full">
              <label className="text-sm text-dark-800">
                {form_data.from_title}:
              </label>
              <input
                type="text"
                placeholder="12/3/22"
                name=""
                className="form-control text-sm font-semibold border border-primary-800 w-[85px;] rounded-full py-1 px-4"
              />
            </div>
            <div className="mb-3 bg-white shadow-select-box py-1.5 px-5 flex items-center justify-between rounded-full">
              <label className="text-sm text-dark-800">
                {" "}
                {form_data.time_title}:
              </label>
              <div className="flex items-center">
                <label className="checkcontainer text-black pl-7">
                  {form_data.time1}
                  <input
                    type="radio"
                    checked={selectedTime === form_data.time1}
                    onChange={() => setSelectedTime(form_data.time1)}
                    id={`time-${form_data.time1}`} // Add unique ID for accessibility
                  />
                  <span className="radiobtn"></span>
                </label>
                <label className="checkcontainer text-black pl-7">
                  {form_data.time2}
                  <input
                    type="radio"
                    checked={selectedTime === form_data.time2}
                    onChange={() => setSelectedTime(form_data.time2)}
                  />
                  <span className="radiobtn"></span>
                </label>
              </div>
            </div>

            <div className="mb-6 bg-white shadow-select-box py-4 px-5 rounded-4xl">
              <label className="text-sm text-dark-800">
                {form_data.ticket_title}:
              </label>
              <div className="flex justify-between mt-3">
                <p className="m-0 text-sm text-black font-semibold">
                  {form_data.ticket1}
                  <br /> ${form_data.ticket1_price}
                </p>
                <select
                  className="p-2"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}>
                  {option1.map((opt, index) => (
                    <option key={index} value={opt.value}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between mt-3">
                <p className="m-0 text-sm text-black font-semibold">
                  {form_data.ticket2}
                  <br /> ${form_data.ticket2_price}
                </p>
                <select
                  className="p-2"
                  value={quantityAdult}
                  onChange={e => setQuantityAdult(e.target.value)}>
                  {option2.map((opt, index) => (
                    <option key={index} value={opt.value}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <h6 className="m-0 text-sm text-black font-semibold">
                {form_data.total_title}:
              </h6>
              <h6 className="text-primary-900 text-sm font-bold m-0">
                ${total.toFixed(2)}
              </h6>
            </div>
            <div>
              <Link
                href="/booking-cart"
                className="btn btn-primary flex items-center gap-2 h-full max-w-full rounded-[3px] w-full py-2">
                Add to{" "}
                <img
                  src="/assets/images/Cart.svg"
                  alt="material-symbols_card-travel"
                  width={22}
                  height={22}
                  className="ml-1"
                />
              </Link>
            </div>
          </div>

          {form_data.product &&
            form_data.product.map((product_data, index) => {
              return (
                <div className="mb-5 relative" key={index}>
                  <div className="relative rounded-xl overflow-hidden h-[180px]">
                    <img
                      src={product_data.image}
                      alt={product_data.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="p-6 absolute top-0 left-0 text-white w-full h-full bg-black/20 grid content-center">
                      <h5 className="text-white text-xl font-bold mb-1 block">
                        {product_data.title}
                      </h5>
                      <div className="text-lg text-white font-semibold mb-1.5">
                        ${product_data.price}
                      </div>
                      <Link
                        href={product_data.slug}
                        className="btn btn-primary btn-sm mx-0">
                        {product_data.btn_label}{" "}
                        <i className="fa-regular fa-arrow-right ml-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      );
    })
  );
};

export default Side_Bar;
