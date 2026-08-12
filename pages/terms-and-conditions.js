import Link from "next/link";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function TermsAndConditions() {
  const { data: seo_data } = useFetchData(
    "/json/data/site_meta_link.json"
  );

  const cancellationRows = [
    {
      period: "31 days or more before the tour",
      charge: "0%",
    },
    {
      period: "30–14 days before the tour",
      charge: "25%",
    },
    {
      period: "13–7 days before the tour",
      charge: "50%",
    },
    {
      period: "6 days or fewer before the tour",
      charge: "100%",
    },
  ];

  return (
    <>
      {seo_data && (
        <Head_Meta
          meta_data={seo_data.about_meta}
          comman_meta={seo_data}
        />
      )}

      {/* HERO */}
      <section className="bg-[#FAF7F2] py-12 md:py-20">
        <div className="container">
          <div className="max-w-[850px] mx-auto text-center">
            <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
              Booking Information
            </span>

            <h1 className="mb-5">
              Terms & Conditions
            </h1>

            <p className="max-w-[700px] mx-auto mb-3 text-dark-800">
              Important information about bookings,
              payments, travel arrangements, itinerary
              changes and traveler responsibilities when
              traveling with Belet Travel.
            </p>

            <p className="text-sm text-dark-800/70 mb-0">
              Last updated: 12 August 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-[900px] mx-auto">

            <PolicySection
              number="01"
              title="About Belet Travel"
            >
              <p>
                Belet Travel is the trading name used by{" "}
                <strong>
                  &apos;Belet syyahat&apos; hususy karhanasy
                </strong>
                , registered in Turkmenistan.
              </p>

              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] p-5 mt-5">
                <p className="mb-2">
                  <strong>
                    Company registration number:
                  </strong>{" "}
                  202605681
                </p>

                <p className="mb-2">
                  <strong>Office:</strong>{" "}
                  60, 10 yyl Abadancylyk ave,
                  Ashgabat, Turkmenistan
                </p>

                <p className="mb-0">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@belettravel.com"
                    className="text-primary-900 font-semibold"
                  >
                    info@belettravel.com
                  </a>
                </p>
              </div>
            </PolicySection>

            <PolicySection
              number="02"
              title="Trip Requests & Quotations"
            >
              <p>
                Submitting an enquiry or trip request does
                not by itself create a confirmed booking.
              </p>

              <p>
                Before confirmation, Belet Travel may provide
                an itinerary, quotation, availability
                information and other proposed arrangements.
              </p>

              <p className="mb-0">
                A quotation is based on the services, dates,
                number of travelers and other conditions
                stated in that quotation. Prices or
                availability may change before confirmation
                if third-party services change their rates
                or availability.
              </p>
            </PolicySection>

            <PolicySection
              number="03"
              title="Booking Confirmation"
            >
              <p>
                A booking becomes confirmed when the required
                deposit or other agreed payment has been
                received and Belet Travel confirms the
                booking in writing.
              </p>

              <p className="mb-0">
                Travelers should review confirmed names,
                dates, itinerary and services and notify us
                promptly if anything appears incorrect.
              </p>
            </PolicySection>

            <PolicySection
              number="04"
              title="Prices & Currency"
            >
              <p>
                Unless otherwise stated in a quotation, tour
                prices are quoted in{" "}
                <strong>US dollars (USD)</strong>.
              </p>

              <p>
                The price and included services applicable
                to a booking will be stated in the relevant
                quotation, itinerary or booking
                confirmation.
              </p>

              <p className="mb-0">
                Services not expressly stated as included
                should not be assumed to be included.
              </p>
            </PolicySection>

            <PolicySection
              number="05"
              title="Deposit & Final Payment"
            >
              <p>
                Unless different terms are agreed in writing,
                a{" "}
                <strong>
                  10% deposit of the total tour price
                </strong>{" "}
                is required to confirm a booking.
              </p>

              <p>
                The remaining balance is due{" "}
                <strong>
                  15 days before the tour start date
                </strong>
                .
              </p>

              <p>
                For bookings made within 15 days of
                departure, the full amount may be required
                when the booking is confirmed.
              </p>

              <p className="mb-0">
                Failure to make an agreed payment by the
                required date may result in cancellation of
                the booking.
              </p>
            </PolicySection>

            <PolicySection
              number="06"
              title="Payment Methods"
            >
              <p>
                Depending on the booking, payment may be
                accepted by:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Bank transfer</li>
                <li>Card payment</li>
                <li>
                  Cash on arrival where specifically agreed
                  in advance
                </li>
              </ul>

              <p className="mt-5 mb-0">
                Bank, transfer or card-processing charges
                imposed by a financial institution or
                payment provider may be payable by the
                traveler unless otherwise agreed.
              </p>
            </PolicySection>

            <PolicySection
              number="07"
              title="Cancellation by the Traveler"
            >
              <p>
                Cancellation requests should be made in
                writing.
              </p>

              <p>
                Unless different cancellation conditions
                have been specifically agreed for a service
                or booking, the following charges apply to
                the <strong>total tour price</strong>.
              </p>

              <div className="overflow-hidden rounded-2xl border border-[#E2CFAF] mt-6">
                <table className="w-full">
                  <thead className="bg-[#FAF7F2]">
                    <tr>
                      <th className="text-left px-5 py-4 text-sm">
                        Cancellation time
                      </th>

                      <th className="text-right px-5 py-4 text-sm">
                        Charge
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {cancellationRows.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-[#E2CFAF]"
                      >
                        <td className="px-5 py-4">
                          {row.period}
                        </td>

                        <td className="px-5 py-4 text-right font-bold text-primary-900">
                          {row.charge}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-5">
                The relevant cancellation date is the date
                on which Belet Travel receives the written
                cancellation request.
              </p>

              <p className="mb-0">
                For more detailed information, please see
                our{" "}
                <Link
                  href="/payment-cancellation-policy"
                  className="font-semibold text-primary-900"
                >
                  Payment & Cancellation Policy
                </Link>
                .
              </p>
            </PolicySection>

            <PolicySection
              number="08"
              title="Non-Refundable Services"
            >
              <p>
                Certain third-party services may become
                non-refundable after they have been reserved
                or purchased.
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Letter of Invitation and visa-related
                  services
                </li>

                <li>Domestic flight tickets</li>

                <li>Hotel reservations</li>

                <li>
                  Other services specifically identified as
                  non-refundable
                </li>
              </ul>

              <p className="mt-5 mb-0">
                Where possible, known non-refundable costs
                will be explained when arrangements are
                confirmed.
              </p>
            </PolicySection>

            <PolicySection
              number="09"
              title="Changing Travel Dates"
            >
              <p>
                Travelers may request to move a confirmed
                booking to different travel dates.
              </p>

              <p>
                Where Belet Travel receives the request at
                least{" "}
                <strong>
                  7 days before the scheduled tour start
                </strong>
                , Belet Travel will not normally charge its
                own date-change penalty.
              </p>

              <p>
                Additional costs or non-refundable amounts
                imposed by hotels, airlines or other
                suppliers may still apply.
              </p>

              <p className="mb-0">
                Changes remain subject to availability.
                Requests received fewer than 7 days before
                departure will be reviewed individually.
              </p>
            </PolicySection>

            <PolicySection
              number="10"
              title="Refunds"
            >
              <p>
                Where a refund is due, Belet Travel aims to
                process it within{" "}
                <strong>7 days</strong> after the refundable
                amount has been confirmed.
              </p>

              <p className="mb-0">
                The time required for funds to appear in a
                traveler&apos;s account may depend on banks,
                card networks or payment providers.
              </p>
            </PolicySection>

            <PolicySection
              number="11"
              title="Passports, Visas & Entry Requirements"
            >
              <p>
                Travelers are responsible for ensuring they
                hold the passports, visas, permits and other
                travel documents required for their journey,
                except where Belet Travel has specifically
                agreed to arrange a particular service.
              </p>

              <p>
                Where Belet Travel assists with visa support
                or a Letter of Invitation, approval remains
                subject to the relevant authorities.
              </p>

              <p className="mb-0">
                Travelers should provide accurate
                information and requested documents within
                the required timeframes.
              </p>
            </PolicySection>

            <PolicySection
              number="12"
              title="Traveler Information"
            >
              <p>
                Travelers are responsible for providing
                correct names, passport details, dates of
                birth, contact information and other
                information required for their booking.
              </p>

              <p className="mb-0">
                Costs arising from incorrect information
                provided by a traveler may be payable by the
                traveler.
              </p>
            </PolicySection>

            <PolicySection
              number="13"
              title="Flights & Transportation"
            >
              <p>
                Flights, trains and other transportation may
                be operated by independent carriers and
                their schedules may change.
              </p>

              <p className="mb-0">
                Where a schedule change affects arrangements
                booked through Belet Travel, we will provide
                reasonable assistance in adjusting the
                affected itinerary where possible.
              </p>
            </PolicySection>

            <PolicySection
              number="14"
              title="Hotels & Accommodation"
            >
              <p>
                Accommodation may be provided by independent
                hotels, guesthouses, camps, homestays or
                other suppliers.
              </p>

              <p>
                If a confirmed property becomes unavailable,
                Belet Travel may propose reasonably
                comparable alternative accommodation where
                possible.
              </p>

              <p className="mb-0">
                Accommodation standards, classifications and
                facilities can vary between countries and
                destinations.
              </p>
            </PolicySection>

            <PolicySection
              number="15"
              title="Itinerary Changes"
            >
              <p>
                Travel in Central Asia may occasionally be
                affected by weather, road conditions, border
                procedures, transportation schedules, local
                restrictions or other operational
                circumstances.
              </p>

              <p className="mb-0">
                Belet Travel may make reasonable changes to
                timing, sequence, transportation,
                accommodation or activities where necessary,
                while seeking to preserve the overall
                character of the booked journey where
                reasonably possible.
              </p>
            </PolicySection>

            <PolicySection
              number="16"
              title="Third-Party Suppliers"
            >
              <p>
                Some services are provided by independent
                suppliers such as hotels, airlines, guides,
                drivers, transport companies and partner
                operators.
              </p>

              <p>
                These suppliers may operate under their own
                terms and rules.
              </p>

              <p className="mb-0">
                Nothing in these Terms is intended to exclude
                responsibility that cannot lawfully be
                excluded.
              </p>
            </PolicySection>

            <PolicySection
              number="17"
              title="Traveler Conduct"
            >
              <p>
                Travelers are expected to respect local laws,
                communities, guides, drivers, accommodation
                staff and other travelers.
              </p>

              <p className="mb-0">
                A traveler may be asked to stop participating
                in an activity or journey if serious
                misconduct creates a safety risk, violates
                applicable law or significantly disrupts the
                trip.
              </p>
            </PolicySection>

            <PolicySection
              number="18"
              title="Health & Mobility"
            >
              <p>
                Travelers should consider whether their
                chosen itinerary and activities are suitable
                for their health, mobility and physical
                condition.
              </p>

              <p className="mb-0">
                Please tell Belet Travel before booking about
                mobility requirements or other needs that may
                materially affect travel arrangements so
                that we can advise what reasonable
                adjustments may be possible.
              </p>
            </PolicySection>

            <PolicySection
              number="19"
              title="Travel Insurance"
            >
              <p>
                We strongly recommend that travelers obtain
                travel insurance appropriate for their
                itinerary and circumstances.
              </p>

              <p className="mb-0">
                Depending on the chosen policy, insurance may
                provide protection for medical emergencies,
                cancellation, travel disruption, baggage and
                other unexpected events. Travelers are
                responsible for reviewing their insurance
                coverage.
              </p>
            </PolicySection>

            <PolicySection
              number="20"
              title="Events Beyond Our Control"
            >
              <p>
                Events outside Belet Travel&apos;s reasonable
                control may affect a journey.
              </p>

              <p>
                These can include severe weather, natural
                disasters, governmental action, border
                closures, security incidents, epidemics,
                strikes, flight cancellations and major
                transportation disruption.
              </p>

              <p className="mb-0">
                Where such circumstances occur, we will make
                reasonable efforts to assist travelers and
                arrange practical alternatives where
                possible.
              </p>
            </PolicySection>

            <PolicySection
              number="21"
              title="Unused Services"
            >
              <p className="mb-0">
                If a traveler voluntarily chooses not to use
                an included hotel, transfer, meal, excursion
                or other service after a trip has started, a
                refund is not normally available unless the
                relevant supplier provides one.
              </p>
            </PolicySection>

            <PolicySection
              number="22"
              title="Problems & Complaints"
            >
              <p>
                If a problem occurs during a journey, please
                contact Belet Travel as soon as reasonably
                possible so that our team has an opportunity
                to assist while the trip is taking place.
              </p>

              <p className="mb-0">
                After travel, booking-related complaints may
                be sent to{" "}
                <a
                  href="mailto:info@belettravel.com"
                  className="font-semibold text-primary-900"
                >
                  info@belettravel.com
                </a>
                .
              </p>
            </PolicySection>

            <PolicySection
              number="23"
              title="Website Information"
            >
              <p>
                Website itineraries, photographs, maps,
                prices and descriptions are provided for
                general travel and booking information.
              </p>

              <p className="mb-0">
                Where there is a difference between general
                website information and the documents issued
                for a confirmed booking, the confirmed
                booking documents will apply to that
                journey.
              </p>
            </PolicySection>

            <PolicySection
              number="24"
              title="Privacy"
            >
              <p>
                Personal information provided in connection
                with an enquiry or booking is handled in
                accordance with our Privacy Policy.
              </p>

              <Link
                href="/privacy-policy"
                className="inline-flex items-center font-semibold text-primary-900"
              >
                Read our Privacy Policy
                <i className="fa-regular fa-arrow-right ml-2"></i>
              </Link>
            </PolicySection>

            <PolicySection
              number="25"
              title="Applicable Terms"
            >
              <p>
                These Terms & Conditions are intended to
                govern bookings made directly with Belet
                Travel, subject to applicable law and any
                specific written terms agreed for a
                particular booking.
              </p>

              <p className="mb-0">
                Nothing in these Terms is intended to remove
                mandatory rights or protections that apply
                and cannot lawfully be excluded by agreement.
              </p>
            </PolicySection>

            <PolicySection
              number="26"
              title="Changes to These Terms"
            >
              <p className="mb-0">
                Belet Travel may update these Terms &
                Conditions from time to time. The current
                version will be published on this page
                together with its latest update date.
              </p>
            </PolicySection>

            <PolicySection
              number="27"
              title="Contact"
            >
              <p>
                Questions about these Terms & Conditions or
                a booking can be sent directly to our team.
              </p>

              <ContactCard />
            </PolicySection>

          </div>
        </div>
      </section>
    </>
  );
}

const PolicySection = ({
  number,
  title,
  children,
}) => {
  return (
    <article className="mb-8 md:mb-10 rounded-3xl border border-[#E2CFAF] bg-white p-6 md:p-8">
      <div className="flex items-start gap-4 mb-5">
        <span className="w-11 h-11 shrink-0 rounded-full bg-[#071B1A] text-white flex items-center justify-center text-xs font-bold">
          {number}
        </span>

        <h2 className="text-xl md:text-2xl mb-0">
          {title}
        </h2>
      </div>

      <div className="text-dark-800 leading-7">
        {children}
      </div>
    </article>
  );
};

const ContactCard = () => {
  return (
    <div className="rounded-2xl bg-[#071B1A] text-white p-6 md:p-8 mt-5">
      <h3 className="text-white text-xl mb-3">
        Belet Travel
      </h3>

      <p className="text-white/80 mb-2">
        &apos;Belet syyahat&apos; hususy karhanasy
      </p>

      <p className="text-white/80 mb-2">
        60, 10 yyl Abadancylyk ave,
        Ashgabat, Turkmenistan
      </p>

      <p className="text-white/80 mb-2">
        Email:{" "}
        <a
          href="mailto:info@belettravel.com"
          className="text-white font-semibold"
        >
          info@belettravel.com
        </a>
      </p>

      <p className="text-white/80 mb-5">
        Phone:{" "}
        <a
          href="tel:+99363229627"
          className="text-white font-semibold"
        >
          +993 63 229627
        </a>
      </p>

      <Link
        href="/contact"
        className="btn btn-primary rounded-full"
      >
        Contact Belet Travel
      </Link>
    </div>
  );
};