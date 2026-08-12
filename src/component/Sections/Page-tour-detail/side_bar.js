import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";
import { trackEvent } from "@/utils/analytics";

const Side_Bar = ({ sideBar_data }) => {
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [
    selectedPriceTier,
    setSelectedPriceTier,
  ] = useState(null);

  const [
    selectedTravelers,
    setSelectedTravelers,
  ] = useState("");

  const [isShareOpen, setIsShareOpen] =
    useState(false);

  const [shareData, setShareData] = useState({
    title: "",
    text: "",
    url: "",
  });

  const [copyMessage, setCopyMessage] =
    useState("");

  const inputClass =
    "w-full rounded-full border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const selectClass =
    "w-full appearance-none rounded-full border border-[#E2CFAF] bg-white pl-4 pr-10 py-3 text-sm text-dark-900 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all";

  const textareaClass =
    "w-full rounded-2xl border border-[#E2CFAF] bg-white px-4 py-3 text-sm text-dark-900 placeholder:text-dark-800/70 outline-none focus:border-primary-900 focus:ring-2 focus:ring-primary-900/10 transition-all resize-none";

  /*
   * =========================================================
   * SHARE FUNCTIONS
   * =========================================================
   */

  const getCurrentShareUrl = () => {
    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || ""
    ).replace(/\/$/, "");

    if (typeof window === "undefined") {
      return siteUrl || "";
    }

    const cleanCurrentPath =
      `${window.location.pathname}${window.location.search}`;

    if (
      siteUrl &&
      (window.location.hostname === "localhost" ||
        window.location.hostname ===
        "127.0.0.1")
    ) {
      return `${siteUrl}${cleanCurrentPath}`;
    }

    return window.location.href.split("#")[0];
  };

  const getTourShareData = (
    formDataConfig
  ) => {
    const tourTitle =
      formDataConfig?.tour_name &&
        formDataConfig.tour_name.trim() !== ""
        ? formDataConfig.tour_name
        : formDataConfig?.title ||
        "Belet Travel Tour";

    const url = getCurrentShareUrl();

    return {
      title: tourTitle,
      text: `Check this Belet Travel tour: ${tourTitle}`,
      url,
    };
  };

  const handleShareTour = async (
    formDataConfig
  ) => {
    trackEvent(
      "share_tour_click",
      {
        tour_name:
          formDataConfig?.tour_name ||
          formDataConfig?.title ||
          "Tour",
      }
    );
    const nextShareData =
      getTourShareData(formDataConfig);

    setShareData(nextShareData);
    setCopyMessage("");

    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      typeof window !== "undefined" &&
      window.innerWidth < 768
    ) {
      try {
        await navigator.share(nextShareData);
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    setIsShareOpen((prev) => !prev);
  };

  const copyTextToClipboard = async (
    text
  ) => {
    if (
      typeof navigator !== "undefined" &&
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(
        text
      );

      return;
    }

    const textarea =
      document.createElement("textarea");

    textarea.value = text;

    textarea.setAttribute(
      "readonly",
      ""
    );

    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";

    document.body.appendChild(textarea);

    textarea.select();

    document.execCommand("copy");

    document.body.removeChild(textarea);
  };

  const handleCopyShareLink = async () => {
    const url =
      shareData.url ||
      getCurrentShareUrl();

    try {
      await copyTextToClipboard(url);

      setCopyMessage("Link copied");
    } catch (error) {
      console.error(
        "Copy link error:",
        error
      );

      setCopyMessage("Copy failed");
    }
  };

  /*
   * =========================================================
   * FORM VALIDATION
   * =========================================================
   */

  const validateInquiry = (inquiry) => {
    const error = {};

    if (
      !inquiry.name ||
      inquiry.name.trim() === ""
    ) {
      error.name =
        "Name is required*";
    }

    if (
      !inquiry.email ||
      inquiry.email.trim() === ""
    ) {
      error.email =
        "Email is required*";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        inquiry.email
      )
    ) {
      error.email =
        "Invalid email address";
    }

    /*
     * Message is intentionally optional.
     */

    return error;
  };

  /*
   * =========================================================
   * SUBMIT INQUIRY
   * =========================================================
   */

  const handleSubmit = async (
    event,
    formDataConfig
  ) => {
    event.preventDefault();

    const formElement =
      event.currentTarget;

    const formData =
      new FormData(formElement);

    const finalTourName =
      formDataConfig?.tour_name &&
        formDataConfig.tour_name.trim() !== ""
        ? formDataConfig.tour_name
        : formDataConfig?.title ||
        "Tour Detail Inquiry";

    const defaultPriceTierIndex =
      formDataConfig?.price_tiers?.findIndex(
        (tier) => tier.default
      ) ?? 0;

    const activePriceTierIndex =
      selectedPriceTier !== null
        ? selectedPriceTier
        : defaultPriceTierIndex >= 0
          ? defaultPriceTierIndex
          : 0;

    const selectedTier =
      formDataConfig?.price_tiers?.[
      activePriceTierIndex
      ];

    const estimatedPriceText =
      selectedTier
        ? selectedTier.price
          ? `${selectedTier.travelers}: $${selectedTier.price.toLocaleString()} per person`
          : `${selectedTier.travelers}: Price on request`
        : "Price not selected";

    const inquiry = {
      name:
        formData.get("name") || "",

      email:
        formData.get("email") || "",

      phone:
        formData.get("phone") || "",

      travelDates:
        formData.get(
          "travel_dates"
        ) || "",

      travelers:
        formData.get(
          "travelers"
        ) || "",

      message: (
        formData.get("message") || ""
      ).trim(),

      tourName: finalTourName,
    };

    const validationErrors =
      validateInquiry(inquiry);

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);

      setSuccessMessage("");

      return;
    }

    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const additionalMessage =
      inquiry.message ||
      "No additional message.";

    const { error } = await supabase
      .from("inquiries")
      .insert([
        {
          name: inquiry.name,

          email: inquiry.email,

          phone:
            inquiry.phone || null,

          travel_dates:
            inquiry.travelDates ||
            null,

          countries:
            "Not specified",

          travel_style: null,

          travelers:
            inquiry.travelers ||
            null,

          message: `Tour inquiry: ${inquiry.tourName}

Estimated price: ${estimatedPriceText}

${additionalMessage}`,

          source: "tour_detail",

          status: "new",
        },
      ]);

    if (error) {
      console.error(
        "Supabase insert error:",
        error
      );

      alert(
        "Something went wrong while saving your inquiry. Please try again."
      );

      setIsSubmitting(false);

      return;
    }

    trackEvent("generate_lead", {
      lead_source: "tour_detail",

      items: [
        {
          item_name:
            inquiry.tourName,
        },
      ],
    });

    formElement.reset();

    setSelectedPriceTier(null);
    setSelectedTravelers("");

    setSuccessMessage(
      "Thank you! Your trip request has been sent. Our team will contact you soon with details."
    );

    setIsSubmitting(false);
  };

  /*
   * =========================================================
   * RENDER
   * =========================================================
   */

  return (
    sideBar_data &&
    sideBar_data.map(
      (form_data, index) => {
        const defaultPriceTierIndex =
          form_data.price_tiers?.findIndex(
            (tier) => tier.default
          ) ?? 0;

        const activePriceTierIndex =
          selectedPriceTier !== null
            ? selectedPriceTier
            : defaultPriceTierIndex >= 0
              ? defaultPriceTierIndex
              : 0;

        const activeTier =
          form_data.price_tiers?.[
          activePriceTierIndex
          ];

        return (
          <div
            className="right-sidebar lg:max-w-[300px] w-full shrink-0"
            key={index}
          >

            {/* =================================================
                MAIN SIDEBAR CARD
            ================================================= */}

            <div className="mb-7 bg-[#FAF7F2] border border-[#E2CFAF] py-6 px-5 rounded-2xl shadow-sm">

              {/* ===============================================
                  PRICE
              =============================================== */}

              {form_data.price_tiers &&
                form_data.price_tiers
                  .length > 0 && (
                  <div className="mb-6 rounded-2xl bg-white border border-[#E2CFAF] px-4 py-4">

                    <div className="text-sm text-dark-800 mb-1">
                      {form_data.total_title ||
                        "Estimated From"}
                    </div>

                    {activeTier?.price ? (
                      <div className="text-3xl font-bold text-dark-900 leading-tight">

                        $
                        {activeTier.price.toLocaleString()}

                        <span className="text-base font-semibold text-dark-800">
                          {" "}
                          / person
                        </span>

                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-dark-900 leading-tight">
                        Price on Request
                      </div>
                    )}

                    {/* PRICE TIERS */}
                    <div className="mt-4 space-y-2">

                      {form_data.price_tiers.map(
                        (
                          tier,
                          tierIndex
                        ) => (
                          <button
                            type="button"
                            key={tierIndex}
                            onClick={() =>
                              setSelectedPriceTier(
                                tierIndex
                              )
                            }
                            className={`w-full flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all ${activePriceTierIndex ===
                              tierIndex
                              ? "border-primary-900 bg-primary-900 text-white"
                              : "border-[#E2CFAF] bg-[#FAF7F2] text-dark-900 hover:border-primary-900"
                              }`}
                          >

                            <span>
                              {
                                tier.travelers
                              }
                            </span>

                            <span className="font-semibold">
                              {tier.price
                                ? `$${tier.price.toLocaleString()}`
                                : "On request"}
                            </span>

                          </button>
                        )
                      )}

                    </div>

                    <p className="mb-0 mt-3 text-sm leading-6 text-dark-800">
                      {form_data.price_note ||
                        "Final price may vary by group size, hotel level, season, and route arrangements."}
                    </p>

                  </div>
                )}

              {/* ===============================================
                  INQUIRY FORM
              =============================================== */}

              <div
                id="tour-inquiry"
                className="scroll-mt-[140px]"
              >

                <h5 className="text-xl mb-2 font-bold text-dark-900">
                  Request This Tour
                </h5>

                <p className="text-sm leading-6 text-dark-800 mb-5">
                  Share your dates and group
                  size. We&apos;ll confirm
                  availability, route details
                  and the final price.
                </p>

                <form
                  className="space-y-3"
                  onSubmit={(event) =>
                    handleSubmit(
                      event,
                      form_data
                    )
                  }
                >

                  {/* NAME */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className={
                        inputClass
                      }
                    />

                    {errors.name && (
                      <span className="text-red-800 text-sm">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      className={
                        inputClass
                      }
                    />

                    {errors.email && (
                      <span className="text-red-800 text-sm">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* PHONE */}
                  <input
                    type="text"
                    name="phone"
                    placeholder="WhatsApp / phone number"
                    className={
                      inputClass
                    }
                  />

                  {/* TRAVEL DATES */}
                  <input
                    type="text"
                    name="travel_dates"
                    placeholder="Preferred travel dates"
                    className={
                      inputClass
                    }
                  />

                  {/* TRAVELERS */}
                  <div className="relative">

                    <select
                      name="travelers"
                      className={
                        selectClass
                      }
                      value={
                        form_data.price_tiers &&
                          form_data.price_tiers
                            .length > 0
                          ? activeTier?.travelers ||
                          ""
                          : selectedTravelers
                      }
                      onChange={(
                        event
                      ) => {
                        if (
                          form_data.price_tiers &&
                          form_data
                            .price_tiers
                            .length > 0
                        ) {
                          const tierIndex =
                            form_data.price_tiers.findIndex(
                              (tier) =>
                                tier.travelers ===
                                event.target
                                  .value
                            );

                          if (
                            tierIndex >= 0
                          ) {
                            setSelectedPriceTier(
                              tierIndex
                            );
                          }
                        } else {
                          setSelectedTravelers(
                            event.target
                              .value
                          );
                        }
                      }}
                    >

                      <option value="">
                        Number of travelers
                      </option>

                      {form_data.price_tiers &&
                        form_data.price_tiers
                          .length > 0 ? (
                        form_data.price_tiers.map(
                          (
                            tier,
                            tierIndex
                          ) => (
                            <option
                              value={
                                tier.travelers
                              }
                              key={
                                tierIndex
                              }
                            >
                              {
                                tier.travelers
                              }
                            </option>
                          )
                        )
                      ) : (
                        <>
                          <option value="1 traveler">
                            1 traveler
                          </option>

                          <option value="2 travelers">
                            2 travelers
                          </option>

                          <option value="3–5 travelers">
                            3–5 travelers
                          </option>

                          <option value="6–10 travelers">
                            6–10 travelers
                          </option>

                          <option value="10+ travelers">
                            10+ travelers
                          </option>
                        </>
                      )}

                    </select>

                    <i className="fa-regular fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-dark-800 text-sm"></i>

                  </div>

                  {/* OPTIONAL MESSAGE */}
                  <div>
                    <textarea
                      className={
                        textareaClass
                      }
                      name="message"
                      placeholder="Questions or special requests (optional)"
                      rows="4"
                    ></textarea>
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    disabled={
                      isSubmitting
                    }
                    className="btn btn-primary flex items-center justify-center gap-2 max-w-full rounded-full w-full py-3 mt-2 font-semibold"
                  >

                    {isSubmitting
                      ? "Sending..."
                      : "Send Trip Request"}

                    {!isSubmitting && (
                      <i className="fa-regular fa-paper-plane ml-1"></i>
                    )}

                  </button>

                  {/* SMALL REASSURANCE */}
                  <p className="text-[11px] leading-5 text-center text-dark-800/70 mb-0">
                    No payment is required
                    to send a trip request.
                  </p>

                  {/* SUCCESS */}
                  {successMessage && (
                    <div className="mt-4 bg-white border border-[#E2CFAF] rounded-2xl px-4 py-3 text-center">

                      <p className="text-primary-900 font-semibold mb-0 text-sm">
                        {
                          successMessage
                        }
                      </p>

                    </div>
                  )}

                </form>

              </div>

              {/* ===============================================
                  SECONDARY ACTIONS
              =============================================== */}

              <div className="mt-6 pt-5 border-t border-[#E2CFAF]">

                {/* BROCHURE */}
                {form_data.brochure_pdf && (
                  <a
                    href={
                      form_data.brochure_pdf
                    }
                    download
                    onClick={() =>
                      trackEvent(
                        "brochure_download",
                        {
                          tour_name:
                            form_data.tour_name ||
                            "Tour",
                        }
                      )
                    }
                    className="btn btn-light flex items-center justify-center gap-2 max-w-full rounded-full w-full py-3 mb-3 border border-primary-900 font-semibold"
                  >
                    Download Brochure

                    <i className="fa-regular fa-file-pdf ml-1"></i>
                  </a>
                )}

                {/* SHARE TOUR */}
                <div className="relative mb-4">

                  <button
                    type="button"
                    onClick={() =>
                      handleShareTour(
                        form_data
                      )
                    }
                    className="btn btn-light flex items-center justify-center gap-2 max-w-full rounded-full w-full py-3 border border-primary-900 font-semibold"
                  >
                    Share Tour

                    <i className="fa-regular fa-share-nodes ml-1"></i>
                  </button>

                  {isShareOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-10 rounded-2xl border border-[#E2CFAF] bg-white p-3 shadow-card-1">

                      <p className="mb-2 text-sm font-semibold text-dark-900">
                        Share this tour
                      </p>

                      <div className="grid grid-cols-2 gap-2">

                        {/* WHATSAPP */}
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `${shareData.text} ${shareData.url}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#E2CFAF] px-3 py-2 text-sm text-dark-800 hover:border-primary-900 hover:text-primary-900"
                        >
                          <i className="fa-brands fa-whatsapp mr-2"></i>
                          WhatsApp
                        </a>

                        {/* FACEBOOK */}
                        <a
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            shareData.url
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#E2CFAF] px-3 py-2 text-sm text-dark-800 hover:border-primary-900 hover:text-primary-900"
                        >
                          <i className="fa-brands fa-facebook mr-2"></i>
                          Facebook
                        </a>

                        {/* TELEGRAM */}
                        <a
                          href={`https://t.me/share/url?url=${encodeURIComponent(
                            shareData.url
                          )}&text=${encodeURIComponent(
                            shareData.text
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-[#E2CFAF] px-3 py-2 text-sm text-dark-800 hover:border-primary-900 hover:text-primary-900"
                        >
                          <i className="fa-brands fa-telegram mr-2"></i>
                          Telegram
                        </a>

                        {/* COPY LINK */}
                        <button
                          type="button"
                          onClick={
                            handleCopyShareLink
                          }
                          className="rounded-xl border border-[#E2CFAF] px-3 py-2 text-left text-sm text-dark-800 hover:border-primary-900 hover:text-primary-900"
                        >
                          <i className="fa-regular fa-link mr-2"></i>
                          Copy Link
                        </button>

                      </div>

                      {copyMessage && (
                        <p className="mb-0 mt-2 text-center text-xs font-semibold text-primary-900">
                          {
                            copyMessage
                          }
                        </p>
                      )}

                    </div>
                  )}

                </div>

                {/* TRAVEL MATES */}
                <div className="rounded-2xl bg-white border border-[#E2CFAF] px-4 py-4">

                  <div className="flex items-start gap-3">

                    <div className="w-10 h-10 rounded-full bg-[#E8F3EC] flex items-center justify-center text-primary-900 shrink-0">
                      <i className="fa-regular fa-users"></i>
                    </div>

                    <div>

                      <h5 className="text-md mb-2 font-bold text-dark-900">
                        Traveling solo?
                      </h5>

                      <p className="text-sm leading-6 text-dark-800 mb-3">
                        Look for other
                        travelers interested
                        in joining this route.
                      </p>

                      <Link
                        href="/travel-mates"
                        className="inline-flex items-center text-sm font-semibold text-primary-900"
                      >
                        Find Travel Mates

                        <i className="fa-regular fa-arrow-right ml-2"></i>
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        );
      }
    )
  );
};

export default Side_Bar;