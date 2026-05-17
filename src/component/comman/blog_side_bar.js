import Link from "next/link";

const Blog_Side_Bar = ({ Data, orders }) => {
  const popularGuides = [
    {
      title: "How to Plan a Central Asia Trip",
      slug: "/blog-detail-1",
      label: "Route planning",
    },
    {
      title: "Best Time to Visit Central Asia",
      slug: "/blog-detail-1",
      label: "Travel seasons",
    },
    {
      title: "Turkmenistan Travel Guide",
      slug: "/blog-detail-1",
      label: "Destination guide",
    },
    {
      title: "Central Asia Visa & Border Tips",
      slug: "/blog-detail-1",
      label: "Practical advice",
    },
  ];

  const destinations = [
    {
      title: "Turkmenistan",
      slug: "/destination-detail",
    },
    {
      title: "Uzbekistan",
      slug: "/destination-detail",
    },
    {
      title: "Kazakhstan",
      slug: "/destination-detail",
    },
    {
      title: "Kyrgyzstan",
      slug: "/destination-detail",
    },
    {
      title: "Tajikistan",
      slug: "/destination-detail",
    },
  ];

  const topics = [
    "Itinerary Planning",
    "Visa & Border Tips",
    "Best Time to Travel",
    "Silk Road Cities",
    "Desert Routes",
    "Mountain Journeys",
  ];

  return (
    <div
      className="w-full lg:max-w-[340px] shrink-0 lg:px-5"
      style={{ order: orders }}
    >
      {/* CTA Box */}
      <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 mb-8 shadow-sm">
        <span className="text-primary-900 text-sm font-bold uppercase tracking-[0.08em] block mb-2">
          Need help planning?
        </span>

        <h2 className="text-xl font-bold mb-3">
          Build your Central Asia route with us
        </h2>

        <p className="text-dark-800 text-md leading-normal mb-5">
          Tell us your dates, countries, travel style and group size. We will
          help you shape a practical Silk Road journey.
        </p>

        <Link
          href="/contact"
          className="btn btn-primary max-w-full w-full text-sm font-semibold rounded-full"
        >
          Plan My Trip
          <i className="fa-regular fa-arrow-right ml-2"></i>
        </Link>
      </div>

      {/* Popular Guides */}
      <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-5">Popular Guides</h2>

        <div className="space-y-4">
          {popularGuides.map((guide, index) => {
            return (
              <Link
                href={guide.slug}
                className="block group border-b border-[#E2CFAF] last:border-b-0 pb-4 last:pb-0"
                key={index}
              >
                <span className="text-primary-900 text-xs font-semibold uppercase tracking-[0.08em] block mb-1">
                  {guide.label}
                </span>

                <h3 className="text-md font-bold mb-0 leading-normal group-hover:text-primary-900 transition-all">
                  {guide.title}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Destinations */}
      <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-5">Destinations</h2>

        <ul className="space-y-3">
          {destinations.map((destination, index) => {
            return (
              <li key={index}>
                <Link
                  href={destination.slug}
                  className="flex items-center justify-between text-dark-800 hover:text-primary-900 transition-all"
                >
                  <span>{destination.title}</span>
                  <i className="fa-regular fa-arrow-right text-sm"></i>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Travel Topics */}
      <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5 mb-8 shadow-sm">
        <h2 className="text-xl font-bold mb-5">Travel Topics</h2>

        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => {
            return (
              <span
                key={index}
                className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-full px-3 py-1.5 text-sm text-dark-800"
              >
                {topic}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blog_Side_Bar;