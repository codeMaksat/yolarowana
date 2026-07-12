import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const defaultContactCards = [
  {
    title: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    label: "+993 63 229627",
    slug: "https://wa.me/99363229627",
    description: "Fastest way to contact us for route advice and quick questions.",
  },
  {
    title: "Email",
    icon: "fa-regular fa-envelope",
    label: "info@yolarowana.com",
    slug: "mailto:info@yolarowana.com",
    description: "Best for detailed itineraries, group requests and travel dates.",
  },
  {
    title: "Custom Trip Request",
    icon: "fa-regular fa-route",
    label: "Send request",
    slug: "#account_details_form",
    description: "Tell us your countries, dates and travel style. We will suggest the next steps.",
  },
];

const defaultPlanningSteps = [
  {
    title: "We review your route",
    description: "We check your dates, countries of interest and realistic travel pace.",
  },
  {
    title: "We suggest the best connections",
    description: "We help with border crossings, flight logic and overland route planning.",
  },
  {
    title: "We prepare a practical plan",
    description: "You receive route advice, itinerary direction and the next quotation steps.",
  },
  {
    title: "We adjust around your style",
    description: "Private, small group, family, comfort or adventure routes can be customized.",
  },
];

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

    if (!formElement) {
      return {};
    }

    const formData = new FormData(formElement);

    const cleanSelectValue = value => {
      if (!value) return "";
      if (value === "Travel style") return "";
      if (value === "Number of travelers") return "";
      return value;
    };

    return {
      name: formData.get("Fullname"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelDates: formData.get("travel_dates"),
      countries: formData.get("countries"),
      travelStyle: cleanSelectValue(formData.get("travel_style")),
      travelers: cleanSelectValue(formData.get("travelers")),
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
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inquiry.email)
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
      "Thank you! Your inquiry has been received. Our consultant will contact you soon."
    );

    const formElement = document.querySelector("#account_details_form");
    if (formElement) {
      formElement.reset();
    }

    if (method === "whatsapp") {
      const inquiryMessage = createMessage(inquiry);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        inquiryMessage
      )}`;

      setIsSubmitting(false);
      window.location.href = whatsappUrl;
      return;
    }

    setIsSubmitting(false);
  };

  return (
    <section className="py-12 md:py-16">
      {initialValues &&
        initialValues.map((data, index) => {
          const contactCards = data.contact_cards || defaultContactCards;
          const planningSteps = data.planning_steps || defaultPlanningSteps;
          const officeDetails = data.office_details || [];

          return (
            <div className="container" key={index}>
              <div className="text-left mb-6 md:mb-9">
                <span className="inline-block text-primary-900 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
                  Contact Yola Rowana
                </span>

                <h2 className="mb-4">{data.title}</h2>

                <p className="max-w-[780px] text-dark-800 mb-0">
                  {data.description ||
                    "Tell us where you want to go, when you plan to travel, and what kind of experience you want. We will help you build a practical Central Asia route with local support."}
                </p>
              </div>

              {data.location &&
                data.location.map((location_data, index) => {
                  return (
                    <div
                      className="flex flex-wrap rounded-xl overflow-hidden shadow-card-1 bg-white"
                      key={index}
                    >
                      <div className="w-full md:w-2/5">
                        <div
                          className="grid relative h-full min-h-[420px] text-left content-center text-white bg-cover bg-no-repeat bg-center p-10 px-7 xl:px-14 xl:p-14 before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-dark-900/55"
                          style={{
                            backgroundImage: `url('${location_data.bg_image}')`,
                          }}
                        >
                          <div className="relative">
                            <h2 className="mb-5 text-white after:block after:w-[112px] after:bg-white after:h-[3px] after:mt-2 after:mx-0">
                              {location_data.title}
                            </h2>

                            <p className="text-lg leading-normal">
                              {location_data.street}
                              <br />
                              {location_data.city}
                              {location_data.state
                                ? `, ${location_data.state}`
                                : ""}
                              {location_data.country ? (
                                <>
                                  <br />
                                  {location_data.country} {location_data.pin_code}
                                </>
                              ) : null}
                            </p>

                            <p className="mb-0 text-lg leading-normal">
                              {location_data.tel_title}:{" "}
                              <Link
                                href={location_data.tel_slug}
                                className="hover:text-primary-800"
                              >
                                {location_data.tel_label}
                              </Link>
                              <br />
                              {location_data.mail_title}:{" "}
                              <Link
                                href={location_data.mail_slug}
                                className="hover:text-primary-800"
                              >
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
                          title="Yola Rowana location map - Paytagt Shopping Center, Ashgabat"
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8 md:mt-10">
                {contactCards.map((card, cardIndex) => {
                  return (
                    <Link
                      href={card.slug}
                      key={cardIndex}
                      target={card.slug?.startsWith("http") ? "_blank" : undefined}
                      className="group bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 shadow-sm hover:shadow-card-1 transition-all"
                    >
                      <div className="w-11 h-11 rounded-full bg-white border border-[#E2CFAF] flex items-center justify-center text-primary-900 mb-4 group-hover:bg-primary-900 group-hover:text-white transition-all">
                        <i className={card.icon}></i>
                      </div>

                      <h3 className="text-xl mb-2">{card.title}</h3>

                      <p className="text-dark-800 leading-normal mb-3">
                        {card.description}
                      </p>

                      <span className="text-primary-900 font-semibold">
                        {card.label}
                        <i className="fa-regular fa-arrow-right ml-2"></i>
                      </span>
                    </Link>
                  );
                })}
              </div>

              <div className="mt-10 md:mt-16 mx-auto max-w-[820px] bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 md:p-8 shadow-sm">
                <div className="text-center mb-8 md:mb-10">
                  <span className="inline-block text-primary-900 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
                    Trip Request
                  </span>

                  <h2>{data.inqure_title}</h2>

                  <p className="max-w-[610px] mx-auto">{data.inqure_label}</p>
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

                      <p className="text-center text-xs text-dark-800/80 mt-3 mb-0">
                        We only use your details to reply to your travel request. No spam.
                      </p>
                    </div>
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6 md:gap-8 mt-10 md:mt-16 mb-4">
                <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5 md:p-7 shadow-sm">
                  <span className="inline-block text-primary-900 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
                    After You Contact Us
                  </span>

                  <h2 className="mb-5">What happens next?</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {planningSteps.map((step, stepIndex) => {
                      return (
                        <div
                          className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-4"
                          key={stepIndex}
                        >
                          <span className="text-primary-900 font-bold text-lg">
                            {String(stepIndex + 1).padStart(2, "0")}
                          </span>

                          <h3 className="text-lg mb-2">{step.title}</h3>

                          <p className="text-dark-800 leading-normal mb-0">
                            {step.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 md:p-7 shadow-sm">
                  <span className="inline-block text-primary-900 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
                    Local Support
                  </span>

                  <h2 className="mb-4">Yola Rowana Office</h2>

                  <p className="text-dark-800 leading-normal">
                    Paytagt Shopping Center
                    <br />
                    Ashgabat, Turkmenistan
                    <br />
                    Central Asia travel planning, private tours and local support.
                  </p>

                  <div className="space-y-3 mt-5">
                    {officeDetails.map((item, itemIndex) => {
                      return (
                        <div className="flex gap-3" key={itemIndex}>
                          <i className={`${item.icon} text-primary-900 mt-1`}></i>
                          <div>
                            <h3 className="text-base mb-1">{item.title}</h3>
                            <p className="text-dark-800 text-sm leading-normal mb-0">
                              {item.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Contact;