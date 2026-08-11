import Link from "next/link";

const Booking_Confidence = () => {
  const steps = [
    {
      number: "01",
      title: "Send Your Trip Request",
      text: "Tell us your preferred dates, number of travelers and any special interests. There is no obligation to book.",
    },
    {
      number: "02",
      title: "We Confirm the Details",
      text: "Our local team checks the itinerary, availability, services and final price, and answers any questions before you make a decision.",
    },
    {
      number: "03",
      title: "Receive Your Booking Confirmation",
      text: "Once the arrangements are agreed, we provide your booking confirmation and the applicable payment instructions in writing.",
    },
    {
      number: "04",
      title: "Travel With Local Support",
      text: "Before arrival and throughout your journey, our team coordinates the local arrangements and remains available when you need assistance.",
    },
  ];

  return (
    <div
      id="booking"
      className="mb-10 scroll-mt-[160px]"
    >
      {/* HEADING */}
      <div className="mb-7">
        <span className="inline-block mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9A6D2E]">
          Book with confidence
        </span>

        <h3 className="text-2xl md:text-3xl mb-3 text-dark-900">
          How booking with Belet Travel works
        </h3>

        <p className="max-w-[760px] text-dark-800 leading-7 mb-0">
          We keep the process clear and personal. You can
          discuss the itinerary, final price and arrangements
          with our team before confirming your journey.
        </p>
      </div>

      {/* BOOKING STEPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {steps.map((step, index) => {
          return (
            <article
              key={index}
              className="relative overflow-hidden rounded-2xl border border-[#E2CFAF] bg-white p-5 md:p-6"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#071B1A] text-white flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg md:text-xl mb-2 text-dark-900">
                    {step.title}
                  </h4>

                  <p className="text-sm md:text-md leading-6 text-dark-800 mb-0">
                    {step.text}
                  </p>
                </div>
              </div>

              <div className="absolute -right-7 -bottom-7 w-24 h-24 rounded-full border border-[#D8B46A]/20"></div>
            </article>
          );
        })}
      </div>

      {/* TRUST STRIP */}
      <div className="mt-6 rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] px-5 md:px-7 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <TrustItem
            icon="fa-regular fa-file-lines"
            title="Clear confirmation"
            text="Your agreed itinerary and booking details are provided in writing."
          />

          <TrustItem
            icon="fa-regular fa-tag"
            title="Price before payment"
            text="Final arrangements and applicable price are confirmed before payment."
          />

          <TrustItem
            icon="fa-regular fa-user-headset"
            title="Local support"
            text="Communicate directly with the Belet Travel team before and during your journey."
          />

          <TrustItem
            icon="fa-regular fa-envelope"
            title="Company contact"
            text="Booking communication is handled through our official company contact channels."
          />
        </div>
      </div>

      {/* PAYMENT POLICY BAR */}
      <div className="mt-6 rounded-2xl border border-[#E2CFAF] bg-white px-5 md:px-6 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 shrink-0 rounded-full bg-[#FAF7F2] border border-[#E2CFAF] flex items-center justify-center text-primary-900">
              <i className="fa-regular fa-credit-card"></i>
            </div>

            <div>
              <h4 className="text-base md:text-lg font-semibold text-dark-900 mb-1">
                Payment & cancellation terms
              </h4>

              <p className="text-sm text-dark-800 mb-0">
                10% deposit · Balance due 15 days before departure ·
                Clear cancellation conditions
              </p>
            </div>
          </div>

          <Link
            href="/payment-cancellation-policy"
            className="inline-flex items-center shrink-0 text-sm font-semibold text-primary-900 hover:opacity-70 transition-opacity"
          >
            View full policy
            <i className="fa-regular fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>

      {/* CONTACT CTA */}
      <div className="mt-4 rounded-2xl bg-[#071B1A] px-6 md:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h4 className="text-white text-xl mb-1">
              Have a question before booking?
            </h4>

            <p className="text-white/75 text-sm mb-0 max-w-[620px]">
              Ask us about the itinerary, availability,
              payment process or travel arrangements.
            </p>
          </div>

          <Link
            href="/contact"
            className="btn btn-primary shrink-0 rounded-full px-7"
          >
            Contact Belet Travel
            <i className="fa-regular fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

const TrustItem = ({ icon, title, text }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-[#E2CFAF] flex items-center justify-center text-primary-900">
        <i className={`${icon} text-sm`}></i>
      </div>

      <div>
        <div className="text-sm font-bold text-dark-900 mb-1">
          {title}
        </div>

        <p className="text-xs leading-5 text-dark-800 mb-0">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Booking_Confidence;