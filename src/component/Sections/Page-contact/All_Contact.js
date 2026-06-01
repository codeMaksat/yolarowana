import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const All_Contact = ({ initialValues }) => {
  const [address_save_errors, setaddress_save_errors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const whatsappNumber = "99363229627";
  const emailAddress = "info@yolarowana.com";

  const inputClass =
    "w-full rounded-full bg-white border border-[#E2CFAF] px-5 py-3 text-[15px] text-dark-900 placeholder:text-dark-800/60 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const selectClass =
    "w-full appearance-none rounded-full bg-white border border-[#E2CFAF] pl-5 pr-12 py-3 text-[15px] text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const textareaClass =
    "w-full rounded-2xl bg-white border border-[#E2CFAF] px-5 py-4 text-[15px] text-dark-900 placeholder:text-dark-800/60 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all min-h-[130px] resize-none";

  const getInquiryData = () => {
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    return {
      name: formData.get("Fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelDates: formData.get("travel_dates"),
      countries: formData.get("countries"),
      travelStyle: formData.get("travel_style"),
      travelers: formData.get("travelers"),
      messages: formData.get("messages"),
    };
  };

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

    if (!inquiry.countries || inquiry.countries.trim() === "") {
      error.countries = "Please tell us which countries you are interested in*";
    }

    if (!inquiry.messages || inquiry.messages.trim() === "") {
      error.messages = "Message is required*";
    }

    return error;
  };

  const createMessage = inquiry => {
    return `
Hello Yola Rowana, I would like to plan a Central Asia trip.

Name: ${inquiry.name}
Email: ${inquiry.email}
WhatsApp / Phone: ${inquiry.phone || "Not provided"}
Preferred travel dates: ${inquiry.travelDates || "Not provided"}
Countries interested in: ${inquiry.countries}
Travel style: ${inquiry.travelStyle || "Not selected"}
Number of travelers: ${inquiry.travelers || "Not selected"}

Message:
${inquiry.messages}
    `.trim();
  };

  const saveInquiryToSupabase = async inquiry => {
    const { error } = await supabase.from("inquiries").insert([
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || null,
        travel_dates: inquiry.travelDates || null,
        countries: inquiry.countries,
        travel_style: inquiry.travelStyle || null,
        travelers: inquiry.travelers || null,
        message: inquiry.messages,
        source: "contact_page",
        status: "new",
      },
    ]);

    return error;
  };

  const handleInquiry = async (event, method) => {
    event.preventDefault();

    const inquiry = getInquiryData();
    const error = validateInquiry(inquiry);

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
      setSuccessMessage("");
      return;
    }

    setaddress_save_errors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const supabaseError = await saveInquiryToSupabase(inquiry);

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      alert("Something went wrong while saving your inquiry. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(
      "Thank you! Your inquiry has been sent. Our consultant will contact you soon."
    );

    const formElement = document.querySelector("#account_details_form");
    if (formElement) {
      formElement.reset();
    }


    const inquiryMessage = createMessage(inquiry);

    if (method === "whatsapp") {
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        inquiryMessage
      )}`;

      setTimeout(() => {
        window.location.href = whatsappUrl;
      }, 800);

      return;
    }

    setIsSubmitting(false);
  };

  return (
    <section>
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-left mb-5 md:mb-8">
                <h2>{data.title}</h2>
                <p className="max-w-[760px] text-dark-800">
                  Tell us where you want to go, when you plan to travel, and
                  what kind of experience you want. We will help you build a
                  practical Central Asia route with local support.
                </p>
              </div>

              {data.location &&
                data.location.map((location_data, index) => {
                  return (
                    <div
                      className="flex flex-wrap rounded-xl overflow-hidden shadow-card-1"
                      key={index}
                    >
                      <div className="w-full md:w-2/5">
                        <div
                          className="grid relative h-full text-left content-center text-white bg-cover bg-no-repeat bg-center p-10 px-7 xl:px-14 xl:p-14 before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-dark-900/50"
                          style={{
                            backgroundImage: `url('${location_data.bg_image}')`,
                          }}
                        >
                          <div className="relative">
                            <h2 className="mb-5 text-white after:block after:w-[112px] after:bg-white after:h-[3px] after:mt-2 after:mx-0">
                              {location_data.title}
                            </h2>

                            <p>
                              {location_data.street}
                              <br />
                              {location_data.city}
                              {location_data.state
                                ? `, ${location_data.state}`
                                : ""}
                              <br />
                              {location_data.country} {location_data.pin_code}
                            </p>

                            <p className="mb-0">
                              {location_data.tel_title}:{" "}
                              <Link href={location_data.tel_slug}>
                                {location_data.tel_label}
                              </Link>
                              <br />
                              {location_data.mail_title}:{" "}
                              <Link href={location_data.mail_slug}>
                                {location_data.mail_label}
                              </Link>
                            </p>

                            <p className="mt-5 mb-0 text-sm text-white/90">
                              We usually reply within 24 hours.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="w-full md:w-3/5">
                        <iframe
                          src={location_data.location_url}
                          width="100%"
                          height="100%"
                          className="h-[300px] md:h-[482px]"
                          style={{ border: "0" }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  );
                })}

              <div className="mt-10 md:mt-16 mx-auto max-w-[820px] bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 md:p-8 shadow-sm">
                <div className="text-center mb-8 md:mb-10">
                  <h2>{data.inqure_title}</h2>
                  <p className="max-w-[590px] mx-auto">{data.inqure_label}</p>
                </div>

                <form
                  className="form"
                  id="account_details_form"
                  onSubmit={event => handleInquiry(event, "consultant")}
                >
                  <div className="flex flex-wrap md:-mx-2">
                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <input
                        type="text"
                        name="Fullname"
                        placeholder="Full name"
                        className={inputClass}
                      />
                      {address_save_errors.name && (
                        <span className="error text-red-800">
                          {address_save_errors.name}
                        </span>
                      )}
                    </div>

                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className={inputClass}
                      />
                      {address_save_errors.email && (
                        <span className="error text-red-800">
                          {address_save_errors.email}
                        </span>
                      )}
                    </div>

                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <input
                        type="text"
                        name="phone"
                        placeholder="WhatsApp / phone number"
                        className={inputClass}
                      />
                    </div>

                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <input
                        type="text"
                        name="travel_dates"
                        placeholder="Preferred travel dates"
                        className={inputClass}
                      />
                    </div>

                    <div className="md:px-2 w-full mb-3 md:mb-5">
                      <input
                        type="text"
                        name="countries"
                        placeholder="Countries interested in: Turkmenistan, Uzbekistan, Kazakhstan..."
                        className={inputClass}
                      />
                      {address_save_errors.countries && (
                        <span className="error text-red-800">
                          {address_save_errors.countries}
                        </span>
                      )}
                    </div>

                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <div className="relative">
                        <select name="travel_style" className={selectClass}>
                          <option>Travel style</option>
                          <option>Private tour</option>
                          <option>Small group tour</option>
                          <option>Family trip</option>
                          <option>Tailor-made Silk Road journey</option>
                        </select>

                        <i className="fa-regular fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-dark-800 text-sm"></i>
                      </div>
                    </div>

                    <div className="md:px-2 w-full md:w-1/2 mb-3 md:mb-5">
                      <div className="relative">
                        <select name="travelers" className={selectClass}>
                          <option>Number of travelers</option>
                          <option>1 traveler</option>
                          <option>2 travelers</option>
                          <option>3–5 travelers</option>
                          <option>6–10 travelers</option>
                          <option>10+ travelers</option>
                        </select>

                        <i className="fa-regular fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-dark-800 text-sm"></i>
                      </div>
                    </div>

                    <div className="md:px-2 w-full mb-3 md:mb-5">
                      <textarea
                        className={textareaClass}
                        placeholder="Tell us what kind of Central Asia trip you are looking for"
                        name="messages"
                      />
                      {address_save_errors.messages && (
                        <span className="error text-red-800">
                          {address_save_errors.messages}
                        </span>
                      )}
                    </div>

                    <div className="md:px-2 w-full">
                      <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <button
                          className="btn btn-primary rounded-full px-8"
                          type="button"
                          disabled={isSubmitting}
                          onClick={event => handleInquiry(event, "whatsapp")}
                        >
                          {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                          <i className="fa-brands fa-whatsapp ml-2"></i>
                        </button>

                        <button
                          className="btn btn-light rounded-full px-8 border border-primary-900"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send to Consultant"}
                          <i className="fa-regular fa-paper-plane ml-2"></i>
                        </button>
                      </div>

                      {successMessage && (
                        <div className="mt-5 bg-white border border-[#E2CFAF] rounded-2xl px-5 py-4 text-center">
                          <p className="text-primary-900 font-semibold mb-0">
                            {successMessage}
                          </p>
                        </div>
                      )}

                      <p className="text-center text-sm text-dark-800 mt-4 mb-0">
                        Prefer direct email? Write to{" "}
                        <Link
                          href={`mailto:${emailAddress}`}
                          className="text-primary-900 font-semibold"
                        >
                          {emailAddress}
                        </Link>
                      </p>
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

export default All_Contact;