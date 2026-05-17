import React from "react";
import Link from "next/link";

const Side_Bar = ({ sideBar_data }) => {
  const inputClass =
    "w-full rounded-full border border-primary-800 bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const selectClass =
    "w-full rounded-full border border-primary-800 bg-white px-4 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const textareaClass =
    "w-full rounded-2xl border border-primary-800 bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-none";

  return (
    sideBar_data &&
    sideBar_data.map((form_data, index) => {
      return (
        <div
          className="right-sidebar lg:max-w-[300px] w-full shrink-0"
          key={index}
        >
          <div className="mb-7 bg-[#FAF7F2] border border-primary-800 py-6 px-5 rounded-2xl shadow-sm">
            <h5 className="text-xl mb-2 font-bold text-dark-900">
              {form_data.title}
            </h5>

            <p className="text-sm leading-6 text-dark-800 mb-5">
              Tell us your travel dates, group size, and route ideas. We will
              help you plan the best Central Asia journey.
            </p>

            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className={inputClass}
              />

              <input
                type="email"
                placeholder="Email address"
                className={inputClass}
              />

              <input
                type="text"
                placeholder="WhatsApp / phone number"
                className={inputClass}
              />

              <input
                type="text"
                placeholder="Preferred travel dates"
                className={inputClass}
              />

              <select className={selectClass}>
                <option>Number of travelers</option>
                <option>1 traveler</option>
                <option>2 travelers</option>
                <option>3–5 travelers</option>
                <option>6–10 travelers</option>
                <option>10+ travelers</option>
              </select>

              <select className={selectClass}>
                <option>Travel style</option>
                <option>Private tour</option>
                <option>Small group tour</option>
                <option>Family trip</option>
                <option>Custom Silk Road journey</option>
              </select>

              <textarea
                className={textareaClass}
                placeholder="Tell us what kind of trip you are looking for"
                rows="4"
              ></textarea>

              <Link
                href="/contact"
                className="btn btn-primary flex items-center justify-center gap-2 max-w-full rounded-full w-full py-3 mt-2 font-semibold"
              >
                Send Inquiry
                <i className="fa-regular fa-arrow-right ml-1"></i>
              </Link>
            </form>
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

                    <div className="p-6 absolute top-0 left-0 text-white w-full h-full bg-black/30 grid content-center">
                      <h5 className="text-white text-xl font-bold mb-1 block">
                        {product_data.title}
                      </h5>

                      <div className="text-lg text-white font-semibold mb-1.5">
                        From ${product_data.price}
                      </div>

                      <Link
                        href={product_data.slug}
                        className="btn btn-primary btn-sm mx-0"
                      >
                        {product_data.btn_label}
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