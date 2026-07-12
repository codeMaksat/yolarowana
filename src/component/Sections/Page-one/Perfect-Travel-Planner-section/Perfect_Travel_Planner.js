import Image from "next/image";
import Link from "next/link";

const visaSupportItems = [
  {
    title: "Letter of Invitation Support",
    description:
      "Tour-based LOI support for travelers booking a Turkmenistan trip with Yola Rowana.",
    icon: "fa-regular fa-file-signature",
  },
  {
    title: "Route & Travel Details",
    description:
      "We help organize travel dates, route details and local arrangements for the application process.",
    icon: "fa-regular fa-route",
  },
  {
    title: "Cross-Border Planning",
    description:
      "Useful for Turkmenistan routes combined with Uzbekistan or a wider Central Asia journey.",
    icon: "fa-regular fa-globe",
  },
];

const Perfect_Travel_Planner = ({ initialValues }) => {
  const firstData = Array.isArray(initialValues) ? initialValues[0] : null;

const sectionImage =
  "/assets/images/turkmenistan-visa.jpg";

  const sectionImageAlt =
    firstData?.mid_contain?.[0]?.alt ||
    "Turkmenistan visa support with Yola Rowana";

  return (
    <section className="perfect-travel-section py-10 md:py-16 lg:py-20 relative bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14 items-stretch">
          <div className="relative max-w-[520px] mx-auto lg:mx-0 w-full h-full">
            <div className="relative overflow-hidden rounded-[32px] shadow-card-1 h-full min-h-[520px] bg-[#FAF7F2]">
              <Image
                src={sectionImage}
                alt={sectionImageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/75 via-dark-900/15 to-transparent"></div>

              <div className="absolute left-6 right-6 bottom-6 text-white">
                <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm font-semibold mb-4">
                  Turkmenistan Travel Support
                </span>

                <h3 className="text-2xl md:text-3xl text-white mb-2">
                  Local help before your trip begins
                </h3>

                <p className="mb-0 text-white/90 leading-normal">
                  Practical route planning and LOI support for travelers
                  visiting Turkmenistan.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 right-5 md:right-8 bg-primary-900 text-white rounded-2xl p-4 shadow-card-1 max-w-[230px]">
              <div className="flex items-center gap-3 mb-1">
                <i className="fa-regular fa-passport text-xl"></i>
                <h4 className="text-white text-lg mb-0">LOI Support</h4>
              </div>

              <p className="text-white/90 text-sm leading-normal mb-0">
                For travelers booking a Turkmenistan tour.
              </p>
            </div>
          </div>

          <div className="pt-8 lg:pt-0">
            <span className="inline-block text-primary-900 uppercase tracking-[0.2em] text-xs font-semibold mb-3">
              Visa & Travel Planning
            </span>

            <h2 className="mb-5">
              Turkmenistan Visa Support & Letter of Invitation
            </h2>

            <p className="text-dark-800 text-lg leading-relaxed mb-5">
              Planning to visit Turkmenistan? Yola Rowana helps travelers
              booking a Turkmenistan tour with Letter of Invitation support for
              the tourist visa process.
            </p>

            <p className="text-dark-800 leading-relaxed mb-6">
              We assist with route details, travel dates and local arrangements
              for trips to Ashgabat, Darvaza, Ancient Merv, Yangykala Canyon and
              cross-border routes with Uzbekistan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
              {visaSupportItems.map((item, index) => {
                return (
                  <div
                    className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-4"
                    key={index}
                  >
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E2CFAF] flex items-center justify-center text-primary-900 mb-3">
                      <i className={`${item.icon} text-base`}></i>
                    </div>

                    <h3 className="text-base mb-2">{item.title}</h3>

                    <p className="text-dark-800 text-sm leading-normal mb-0">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/contact" className="btn btn-primary mx-0">
                Ask About Visa Support
                <i className="fa-regular fa-arrow-right ml-3"></i>
              </Link>

              <Link
                href="/destination-turkmenistan"
                className="btn btn-light mx-0 border border-primary-900 rounded-full"
              >
                View Turkmenistan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Perfect_Travel_Planner;
