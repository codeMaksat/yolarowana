import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";

const Side_Bar = ({ sideBar_data }) => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputClass =
    "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const selectClass =
    "w-full appearance-none rounded-full border border-[#E2CFAF] bg-white pl-4 pr-10 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const textareaClass =
    "w-full rounded-2xl border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-none";

  const validateInquiry = inquiry => {
    const error = {};

    if (!inquiry.name || inquiry.name.trim() === "") {
      error.name = "Name is required*";
    }

    if (!inquiry.email || inquiry.email.trim() === "") {
      error.email = "Email is required*";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inquiry.email)
    ) {
      error.email = "Invalid email address";
    }

    if (!inquiry.message || inquiry.message.trim() === "") {
      error.message = "Message is required*";
    }

    return error;
  };

  const handleSubmit = async (event, formTitle, tourName) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const finalTourName =
      tourName && tourName.trim() !== "" ? tourName : formTitle || "Tour Detail Inquiry";

    const inquiry = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelDates: formData.get("travel_dates"),
      travelers: formData.get("travelers"),
      travelStyle: formData.get("travel_style"),
      message: formData.get("message"),
      tourName: finalTourName,
    };

    const validationErrors = validateInquiry(inquiry);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccessMessage("");
      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const { error } = await supabase.from("inquiries").insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || null,
        travel_dates: inquiry.travelDates || null,
        countries: "Not specified",
        travel_style: inquiry.travelStyle || null,
        travelers: inquiry.travelers || null,
        message: `Tour inquiry: ${inquiry.tourName}\n\n${inquiry.message}`,
        source: "tour_detail",
        status: "new",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      alert("Something went wrong while saving your inquiry. Please try again.");
      setIsSubmitting(false);
      return;
    }

    formElement.reset();

    setSuccessMessage(
      "Thank you! Your inquiry has been sent. Our consultant will contact you soon."
    );

    setIsSubmitting(false);
  };

  return (
    sideBar_data &&
    sideBar_data.map((form_data, index) => {
      return (
        <div
          className="right-sidebar lg:max-w-[300px] w-full shrink-0"
          key={index}
        >
          <div className="mb-7 bg-[#FAF7F2] border border-[#E2CFAF] py-6 px-5 rounded-2xl shadow-sm">
            <h5 className="text-xl mb-2 font-bold text-dark-900">
              {form_data.title}
            </h5>

            <p className="text-sm leading-6 text-dark-800 mb-5">
              Tell us your travel dates, group size, and route ideas. We will
              help you plan the best Central Asia journey.
            </p>

            <form
              className="space-y-3"
              onSubmit={event =>
                handleSubmit(event, form_data.title, form_data.tour_name)
              }
            >
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className={inputClass}
                />
                {errors.name && (
                  <span className="text-red-800 text-sm">{errors.name}</span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  className={inputClass}
                />
                {errors.email && (
                  <span className="text-red-800 text-sm">{errors.email}</span>
                )}
              </div>

              <input
                type="text"
                name="phone"
                placeholder="WhatsApp / phone number"
                className={inputClass}
              />

              <input
                type="text"
                name="travel_dates"
                placeholder="Preferred travel dates"
                className={inputClass}
              />

              <div className="relative">
                <select name="travelers" className={selectClass}>
                  <option>Number of travelers</option>
                  <option>1 traveler</option>
                  <option>2 travelers</option>
                  <option>3–5 travelers</option>
                  <option>6–10 travelers</option>
                  <option>10+ travelers</option>
                </select>

                <i className="fa-regular fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-800 text-sm"></i>
              </div>

              <div className="relative">
                <select name="travel_style" className={selectClass}>
                  <option>Travel style</option>
                  <option>Private tour</option>
                  <option>Small group tour</option>
                  <option>Family trip</option>
                  <option>Custom Silk Road journey</option>
                </select>

                <i className="fa-regular fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-800 text-sm"></i>
              </div>

              <div>
                <textarea
                  className={textareaClass}
                  name="message"
                  placeholder="Tell us what kind of trip you are looking for"
                  rows="4"
                ></textarea>

                {errors.message && (
                  <span className="text-red-800 text-sm">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary flex items-center justify-center gap-2 max-w-full rounded-full w-full py-3 mt-2 font-semibold"
              >
                {isSubmitting ? "Sending..." : "Send to Consultant"}
                <i className="fa-regular fa-paper-plane ml-1"></i>
              </button>

              {successMessage && (
                <div className="mt-4 bg-white border border-[#E2CFAF] rounded-2xl px-4 py-3 text-center">
                  <p className="text-primary-900 font-semibold mb-0 text-sm">
                    {successMessage}
                  </p>
                </div>
              )}
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