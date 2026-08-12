import Link from "next/link";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function PrivacyPolicy() {
  const { data: seo_data } = useFetchData(
    "/json/data/site_meta_link.json"
  );

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
              Your Information
            </span>

            <h1 className="mb-5">
              Privacy Policy
            </h1>

            <p className="max-w-[700px] mx-auto mb-3 text-dark-800">
              How Belet Travel collects, uses and handles
              personal information when you visit our website,
              contact us or arrange a journey with our team.
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

            <PolicySection number="01" title="Who We Are">
              <p>
                Belet Travel is the trading name used by{" "}
                <strong>
                  &apos;Belet syyahat&apos; hususy karhanasy
                </strong>
                , a company registered in Turkmenistan.
              </p>

              <div className="rounded-2xl bg-[#FAF7F2] border border-[#E2CFAF] p-5 mt-5">
                <p className="mb-2">
                  <strong>Company registration number:</strong>{" "}
                  202605681
                </p>

                <p className="mb-2">
                  <strong>Office:</strong>{" "}
                  60, 10 yyl Abadancylyk ave,
                  Ashgabat, Turkmenistan
                </p>

                <p className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:info@belettravel.com"
                    className="text-primary-900 font-semibold"
                  >
                    info@belettravel.com
                  </a>
                </p>

                <p className="mb-0">
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+99363229627"
                    className="text-primary-900 font-semibold"
                  >
                    +993 63 229627
                  </a>
                </p>
              </div>
            </PolicySection>

            <PolicySection
              number="02"
              title="Information We Collect"
            >
              <p>
                We may collect information that you provide
                directly to us when you:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a trip request or contact form</li>

                <li>
                  Communicate with us by email, WhatsApp,
                  telephone or social media
                </li>

                <li>
                  Request a quotation or itinerary
                </li>

                <li>
                  Make or confirm a booking
                </li>

                <li>
                  Provide traveler information required to
                  arrange travel services
                </li>

                <li>
                  Submit feedback or a review
                </li>
              </ul>

              <p className="mt-5">
                This information may include your name, email
                address, telephone or WhatsApp number,
                nationality, travel dates, destinations,
                number of travelers, travel preferences and
                other information you choose to provide.
              </p>

              <p>
                For confirmed bookings, we may also need
                information necessary to arrange travel
                services, such as passport details, dates of
                birth, flight information or documentation
                required for visa support, accommodation,
                transportation or other booked services.
              </p>

              <p className="mb-0">
                Please do not send sensitive personal
                information unless it is genuinely necessary
                for arranging your journey.
              </p>
            </PolicySection>

            <PolicySection
              number="03"
              title="Information Collected Automatically"
            >
              <p>
                When you use our website, limited technical
                information may be collected automatically
                through our website and hosting
                infrastructure.
              </p>

              <p className="mb-0">
                This may include information such as IP
                address, browser type, device type, pages
                visited, referral information and technical
                logs used for website security, performance
                and troubleshooting.
              </p>
            </PolicySection>

            <PolicySection
              number="04"
              title="How We Use Your Information"
            >
              <p>
                We may use personal information to:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Respond to enquiries and trip requests
                </li>

                <li>
                  Design itineraries and prepare quotations
                </li>

                <li>
                  Communicate about proposed or confirmed
                  journeys
                </li>

                <li>
                  Process and manage bookings
                </li>

                <li>
                  Arrange accommodation, guides,
                  transportation, flights, visa support and
                  other travel services
                </li>

                <li>
                  Provide assistance before, during and
                  after a journey
                </li>

                <li>
                  Process payments and maintain transaction
                  records
                </li>

                <li>
                  Send operational communications relating
                  to a booking
                </li>

                <li>
                  Request genuine post-trip feedback or
                  reviews
                </li>

                <li>
                  Maintain and improve our website and
                  services
                </li>

                <li>
                  Prevent fraud, abuse and security incidents
                </li>

                <li>
                  Meet applicable legal, accounting or
                  regulatory requirements
                </li>
              </ul>

              <p className="mt-5 mb-0">
                Belet Travel does not sell travelers&apos;
                personal information to advertisers.
              </p>
            </PolicySection>

            <PolicySection
              number="05"
              title="Why We Process Information"
            >
              <p>
                Depending on the circumstances and applicable
                law, we may process personal information
                because:
              </p>

              <ul className="list-disc pl-6 space-y-2">
                <li>
                  It is necessary to respond to a request or
                  prepare a proposed booking
                </li>

                <li>
                  It is necessary to provide services that
                  you have booked
                </li>

                <li>
                  We have a legitimate business need to
                  operate, secure and improve our services
                </li>

                <li>
                  You have provided consent where consent is
                  appropriate
                </li>

                <li>
                  Processing is required to comply with an
                  applicable legal obligation
                </li>
              </ul>

              <p className="mt-5 mb-0">
                Where processing depends on consent, you may
                contact us if you wish to withdraw that
                consent, subject to applicable law.
              </p>
            </PolicySection>

            <PolicySection
              number="06"
              title="Sharing Information With Travel Partners"
            >
              <p>
                Travel arrangements may require us to provide
                relevant traveler information to third
                parties involved in delivering your
                requested services.
              </p>

              <p>
                Depending on the itinerary, these may include
                hotels, local guides, transport companies,
                airlines, visa-related service providers,
                partner tour operators and other travel
                suppliers.
              </p>

              <p className="mb-0">
                We aim to share only information reasonably
                necessary to arrange or provide the relevant
                service.
              </p>
            </PolicySection>

            <PolicySection
              number="07"
              title="Website & Technology Providers"
            >
              <p>
                We may use specialist technology and service
                providers to operate our website, database,
                communications and booking processes.
              </p>

              <p className="mb-0">
                Those providers may process limited
                information where necessary to provide their
                services to Belet Travel.
              </p>
            </PolicySection>

            <PolicySection
              number="08"
              title="Payments"
            >
              <p>
                Belet Travel may accept payments by bank
                transfer, card or another agreed payment
                method.
              </p>

              <p>
                Banks and payment providers may process
                payment information according to their own
                privacy and security practices.
              </p>

              <p className="mb-0">
                Where a third-party payment provider
                processes a card transaction, Belet Travel
                does not intend to store your full card
                number or security code on its website
                unless this is specifically explained at
                the relevant payment stage.
              </p>
            </PolicySection>

            <PolicySection
              number="09"
              title="External Platforms"
            >
              <p>
                Our website may contain links to services
                such as WhatsApp, Google, Tripadvisor,
                Instagram, Facebook, TikTok, YouTube and X.
              </p>

              <p className="mb-0">
                When you use an external platform, that
                platform may process information under its
                own privacy policy and terms. Belet Travel
                does not control the privacy practices of
                third-party websites or platforms.
              </p>
            </PolicySection>

            <PolicySection
              number="10"
              title="Reviews & Traveler Photos"
            >
              <p>
                We may invite travelers to provide feedback
                following a journey. Travelers are not
                required to leave positive reviews.
              </p>

              <p>
                Where traveler feedback or photographs are
                displayed on our website or promotional
                materials, we aim to use them with
                appropriate permission.
              </p>

              <p className="mb-0">
                If you previously gave permission to display
                a photograph or testimonial and would like
                us to review or remove it, please contact us.
              </p>
            </PolicySection>

            <PolicySection
              number="11"
              title="How Long We Keep Information"
            >
              <p>
                We keep personal information only for as
                long as reasonably necessary for the purpose
                for which it was collected.
              </p>

              <p>
                This may include providing travel services,
                maintaining booking and accounting records,
                responding to follow-up enquiries, resolving
                disputes and meeting applicable legal or
                contractual requirements.
              </p>

              <p className="mb-0">
                When information is no longer reasonably
                required, we may delete, anonymize or
                securely archive it as appropriate.
              </p>
            </PolicySection>

            <PolicySection
              number="12"
              title="Data Security"
            >
              <p>
                We use reasonable administrative and
                technical measures intended to protect
                personal information against unauthorized
                access, loss, misuse, alteration or
                disclosure.
              </p>

              <p className="mb-0">
                No internet transmission or electronic
                storage method can be guaranteed to be
                completely secure. Please contact us if you
                believe information provided to Belet Travel
                may have been compromised.
              </p>
            </PolicySection>

            <PolicySection
              number="13"
              title="Your Privacy Choices & Rights"
            >
              <p>
                Depending on where you live and the law
                applicable to your information, you may have
                rights concerning personal information held
                about you.
              </p>

              <p>
                These may include requesting access,
                requesting correction, requesting deletion
                in certain circumstances, objecting to or
                restricting certain processing, or
                withdrawing consent where processing depends
                on consent.
              </p>

              <p>
                Such rights may be subject to applicable
                legal requirements and exceptions.
              </p>

              <p className="mb-0">
                Privacy requests can be sent to{" "}
                <a
                  href="mailto:info@belettravel.com"
                  className="text-primary-900 font-semibold"
                >
                  info@belettravel.com
                </a>
                .
              </p>
            </PolicySection>

            <PolicySection
              number="14"
              title="International Travelers"
            >
              <p>
                Belet Travel operates from Turkmenistan and
                serves international travelers.
              </p>

              <p>
                Information may therefore need to be
                processed in or shared between Turkmenistan
                and other countries involved in arranging a
                journey.
              </p>

              <p className="mb-0">
                Privacy and data protection requirements can
                differ between countries. Where additional
                requirements apply to a particular traveler,
                we aim to handle relevant requests in
                accordance with applicable requirements.
              </p>
            </PolicySection>

            <PolicySection
              number="15"
              title="Children"
            >
              <p>
                Our website is not intended to independently
                collect booking information from children.
              </p>

              <p className="mb-0">
                Where information about a child is required
                for a family booking, visa, flight,
                accommodation or another travel service, it
                should normally be supplied by a parent,
                guardian or responsible adult.
              </p>
            </PolicySection>

            <PolicySection
              number="16"
              title="Cookies"
            >
              <p>
                Our website may use cookies or similar
                technologies necessary for functionality,
                security and performance.
              </p>

              <p>
                If optional analytics or marketing
                technologies are introduced, we may provide
                additional information or consent controls
                where required.
              </p>

              <p className="mb-0">
                You can also control certain cookies through
                your browser settings.
              </p>
            </PolicySection>

            <PolicySection
              number="17"
              title="Changes to This Policy"
            >
              <p className="mb-0">
                We may update this Privacy Policy if our
                services, website, technology providers or
                applicable requirements change. The current
                version will be published on this page with
                its latest update date.
              </p>
            </PolicySection>

            <PolicySection
              number="18"
              title="Contact Us"
            >
              <p>
                If you have questions about this Privacy
                Policy or how Belet Travel handles personal
                information, contact our team.
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