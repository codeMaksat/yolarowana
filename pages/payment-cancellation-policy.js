import Link from "next/link";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function PaymentCancellationPolicy() {
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

      <section className="bg-[#FAF7F2] py-12 md:py-20">
        <div className="container">
          <div className="max-w-[850px] mx-auto text-center">
            <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
              Booking Information
            </span>

            <h1 className="mb-5">
              Payment, Cancellation & Refund Policy
            </h1>

            <p className="max-w-[700px] mx-auto mb-0 text-dark-800">
              Clear information about deposits, payments,
              cancellations, refunds and booking changes
              when traveling with Belet Travel.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container">
          <div className="max-w-[900px] mx-auto">

            <PolicySection number="01" title="Booking Confirmation">
              <p>
                A booking with Belet Travel is considered
                confirmed once the itinerary, services and
                total tour price have been agreed and the
                required deposit has been received.
              </p>

              <p>
                Belet Travel will provide the confirmed
                booking details and applicable payment
                instructions in writing.
              </p>
            </PolicySection>

            <PolicySection number="02" title="Deposit & Final Payment">
              <p>
                A <strong>10% deposit of the total tour price</strong>{" "}
                is required to confirm the booking.
              </p>

              <p>
                The remaining balance must be paid{" "}
                <strong>
                  no later than 15 days before the tour
                  start date
                </strong>
                .
              </p>

              <p>
                All tour prices and payments are calculated
                in <strong>USD</strong> unless otherwise
                agreed in writing.
              </p>
            </PolicySection>

            <PolicySection number="03" title="Accepted Payment Methods">
              <p>Belet Travel accepts payment by:</p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Bank transfer</li>
                <li>Card payment</li>
                <li>
                  Cash on arrival, where agreed in advance
                </li>
              </ul>

              <p className="mt-4">
                Applicable payment instructions will be
                provided directly by Belet Travel.
              </p>
            </PolicySection>

            <PolicySection number="04" title="Cancellation by the Traveler">
              <p>
                If a traveler needs to cancel a confirmed
                booking, the cancellation request should be
                submitted to Belet Travel in writing.
              </p>

              <p>
                Cancellation charges are calculated as a
                percentage of the{" "}
                <strong>total tour price</strong>.
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

              <p className="mt-5 mb-0 text-sm text-dark-800">
                The applicable cancellation date is the
                date on which Belet Travel receives the
                written cancellation request.
              </p>
            </PolicySection>

            <PolicySection number="05" title="Non-Refundable Services">
              <p>
                Certain travel services may need to be
                purchased or confirmed in advance and may
                become non-refundable.
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Turkmenistan Letter of Invitation (LOI)
                  and visa-related fees
                </li>
                <li>Domestic flight tickets</li>
                <li>Hotel reservations</li>
              </ul>

              <p className="mt-4">
                Once such services have been confirmed or
                purchased and have become non-refundable,
                the corresponding costs cannot be refunded.
              </p>
            </PolicySection>

            <PolicySection number="06" title="Refund Processing">
              <p>
                Where a refund is due under the applicable
                cancellation conditions, Belet Travel will
                process the refund within{" "}
                <strong>7 days</strong>.
              </p>

              <p>
                The time required for the refunded amount to
                appear in the traveler&apos;s account may
                also depend on the bank, card provider or
                payment method used.
              </p>
            </PolicySection>

            <PolicySection number="07" title="Changes to Travel Dates">
              <p>
                Travelers who wish to change their
                confirmed tour dates should contact Belet
                Travel as early as possible.
              </p>

              <p>
                If Belet Travel is informed{" "}
                <strong>
                  at least 7 days before the original tour
                  start date
                </strong>
                , the booking may be moved to new dates
                without a Belet Travel change penalty.
              </p>

              <p>
                Any already-purchased services that cannot
                be changed or refunded—such as LOI/visa
                services, domestic flights or certain hotel
                reservations—may still result in additional
                costs.
              </p>

              <p>
                Changes requested fewer than 7 days before
                departure will be reviewed individually and
                may be subject to the applicable
                cancellation conditions.
              </p>
            </PolicySection>

            <PolicySection number="08" title="Contact">
              <p>
                Questions regarding bookings, payments,
                cancellations or changes can be sent
                directly to our team.
              </p>

              <div className="rounded-2xl bg-[#071B1A] text-white p-6 md:p-8 mt-5">
                <h3 className="text-white text-xl mb-3">
                  Belet Travel
                </h3>

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
                  Website: belettravel.com
                </p>

                <Link
                  href="/contact"
                  className="btn btn-primary rounded-full"
                >
                  Contact Belet Travel
                </Link>
              </div>
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