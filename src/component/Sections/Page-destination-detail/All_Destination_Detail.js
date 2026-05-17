import Link from "next/link";
import Image from "next/image";

const All_Destination_Detail = ({ initialValues }) => {
  const routeIdeas = [
    {
      title: "Short Route",
      label: "Ashgabat + Darvaza",
      duration: "2–3 Days",
      description:
        "Best for travelers who want a quick introduction to Turkmenistan with the capital city and the famous Darvaza Gas Crater.",
    },
    {
      title: "Classic Route",
      label: "Ashgabat – Darvaza – Ancient Merv",
      duration: "5 Days",
      description:
        "A balanced route combining modern Ashgabat, desert landscapes, and one of the most important Silk Road sites in Central Asia.",
    },
    {
      title: "Complete Route",
      label: "Ashgabat – Darvaza – Merv – Yangykala",
      duration: "7 Days",
      description:
        "A deeper journey through Turkmenistan, adding dramatic canyon landscapes and a stronger sense of the country’s natural beauty.",
    },
    {
      title: "Cross-Border Route",
      label: "Turkmenistan + Uzbekistan",
      duration: "10–12 Days",
      description:
        "A strong Silk Road combination connecting Turkmenistan’s desert routes with Uzbekistan’s historic cities.",
    },
  ];

  const topPlaceCards = [
    {
      title: "Ashgabat",
      label:
        "Turkmenistan’s capital, known for marble architecture, monuments, museums and wide modern avenues.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Ashgabat Turkmenistan",
    },
    {
      title: "Darvaza Gas Crater",
      label:
        "The famous desert fire crater, best experienced at sunset and after dark under the open sky.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Darvaza Gas Crater Turkmenistan",
    },
    {
      title: "Ancient Merv",
      label:
        "A UNESCO-listed Silk Road site with ancient city walls, mausoleums and deep historical layers.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Ancient Merv Turkmenistan",
    },
    {
      title: "Yangykala Canyon",
      label:
        "A dramatic canyon landscape with colorful cliffs, remote viewpoints and strong photography appeal.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Yangykala Canyon Turkmenistan",
    },
    {
      title: "Nisa",
      label:
        "An ancient Parthian site near Ashgabat, ideal for travelers interested in archaeology and early empires.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Nisa Turkmenistan",
    },
    {
      title: "Karakum Desert",
      label:
        "The vast desert heart of Turkmenistan, connecting road journeys, villages and remote landscapes.",
      image: "/assets/images/top-destinations-img-1.jpg",
      alt: "Karakum Desert Turkmenistan",
    },
  ];

  return (
    <section className="destination-detail py-14 md:mb-10">
      {initialValues &&
        initialValues.map((data, index) => {
          const travelInfo = data.flights?.[0]?.details || [];
          const topPlaces = data.activitie?.[0];
          const tours = data.tour?.[0]?.product || [];

          return (
            <div className="container" key={index}>
              {/* Intro */}
              <div className="max-w-[980px] mx-auto text-center mb-10 md:mb-14">
                <h2 className="text-3xl xl:text-4xl xl:leading-normal mb-5 flex items-center justify-center gap-2">
                  <i className={`${data.icon} text-primary-900`}></i>
                  {data.title}
                </h2>

                <p className="text-md md:text-lg leading-1xl text-dark-800">
                  {data.description}
                </p>

                <p className="text-md md:text-lg leading-1xl text-dark-800">
                  {data.description1}
                </p>
              </div>

              {/* Quick Travel Facts */}
              <div className="mb-12 md:mb-16">
                <div className="text-center mb-7 md:mb-10">
                  <h3 className="text-2xl md:text-3xl mb-3">
                    Quick Travel Facts
                  </h3>
                  <p className="max-w-[720px] mx-auto text-dark-800">
                    Essential planning notes for travelers considering
                    Turkmenistan as part of a Central Asia journey.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {travelInfo.map((item, itemIndex) => {
                    return (
                      <div
                        className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 shadow-sm"
                        key={itemIndex}
                      >
                        <div className="w-11 h-11 rounded-full border border-primary-900 flex items-center justify-center text-primary-900 mb-4">
                          <i className="fa-regular fa-compass text-xl"></i>
                        </div>

                        <h4 className="text-lg font-bold mb-2">
                          {item.title}
                        </h4>

                        <p className="mb-0 text-dark-800 leading-normal">
                          {item.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why Visit */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
                <div>
                  <h3 className="text-2xl md:text-3xl mb-4">
                    {data.title1}
                  </h3>

                  <p className="leading-1xl text-dark-800">
                    {data.description2}
                  </p>

                  <p className="leading-1xl text-dark-800">
                    {data.description3}
                  </p>
                </div>

                <div className="bg-primary-800/50 border border-[#E2CFAF] rounded-2xl p-6 md:p-8">
                  <h4 className="text-xl md:text-2xl mb-4">
                    Good to know
                  </h4>

                  <p className="leading-1xl text-dark-800">
                    {data.description4}
                  </p>

                  <p className="leading-1xl text-dark-800 mb-0">
                    {data.description5}
                  </p>
                </div>
              </div>

              {/* Top Places */}
              {topPlaces && (
                <div className="mb-12 md:mb-16">
                  <div className="text-center mb-7 md:mb-10">
                    <h3 className="text-2xl md:text-3xl mb-3">
                      {topPlaces.title}
                    </h3>

                    <p className="max-w-[850px] mx-auto text-dark-800">
                      {topPlaces.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
                    {topPlaceCards.map((place, placeIndex) => {
                      return (
                        <div
                          className="group bg-white border border-[#E2CFAF] rounded-2xl overflow-hidden shadow-sm hover:shadow-card-1 transition-all h-full"
                          key={placeIndex}
                        >
                          <div className="relative overflow-hidden before:block before:pt-[62%]">
                            <Image
                              src={place.image}
                              alt={place.alt}
                              width={420}
                              height={260}
                              className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"></div>

                            <h4 className="absolute bottom-4 left-4 right-4 text-white text-xl font-bold mb-0 drop-shadow-md">
                              {place.title}
                            </h4>
                          </div>

                          <div className="p-5">
                            <p className="text-dark-800 leading-normal mb-0">
                              {place.label}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 md:p-6">
                    <p className="text-md md:text-lg leading-1xl text-dark-800 mb-0">
                      {topPlaces.short_des}
                    </p>
                  </div>
                </div>
              )}

              {/* Recommended Routes */}
              <div className="mb-12 md:mb-16">
                <div className="text-center mb-7 md:mb-10">
                  <h3 className="text-2xl md:text-3xl mb-3">
                    Recommended Routes
                  </h3>
                  <p className="max-w-[760px] mx-auto text-dark-800">
                    Choose a route based on your time, travel style, and whether
                    you want to continue into Uzbekistan or wider Central Asia.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {routeIdeas.map((route, routeIndex) => {
                    return (
                      <div
                        className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 md:p-6 shadow-sm"
                        key={routeIndex}
                      >
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <h4 className="text-xl font-bold mb-0">
                            {route.title}
                          </h4>

                          <span className="bg-primary-900 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap">
                            {route.duration}
                          </span>
                        </div>

                        <h5 className="text-lg text-primary-900 mb-3">
                          {route.label}
                        </h5>

                        <p className="text-dark-800 mb-0 leading-normal">
                          {route.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Tours */}
              <div className="mb-12 md:mb-16">
                <div className="text-center mb-7 md:mb-10">
                  <h3 className="text-2xl md:text-3xl mb-3">
                    Recommended Turkmenistan Tours
                  </h3>
                  <p className="max-w-[760px] mx-auto text-dark-800">
                    Start with one of these routes, or ask us to customize the
                    trip around your dates and border connections.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {tours.map((product_data, productIndex) => {
                    return (
                      <div
                        className="group relative bg-white shadow-box-1 rounded-xl overflow-hidden h-full flex flex-col"
                        key={productIndex}
                      >
                        <div className="flex-1 flex flex-col">
                          <div className="w-full overflow-hidden rounded-t-xl before:pt-[65%] before:block relative group-hover:opacity-75">
                            <Link
                              href={product_data.slug}
                              className="absolute top-0 left-0 h-full w-full"
                            >
                              <Image
                                src={product_data.image}
                                alt={product_data.alt}
                                width={358}
                                height={233}
                                className="h-full w-full object-cover object-center"
                              />
                            </Link>
                          </div>

                          <div className="mt-5 flex-1 flex flex-col">
                            <h3 className="text-1xl text-dark-700 leading-2xl mb-2 group-hover:text-primary-900 text-center px-4 min-h-[64px] flex items-center justify-center">
                              <Link href={product_data.slug}>
                                {product_data.title}
                              </Link>
                            </h3>

                            <p className="text-center mb-0 text-md px-4 min-h-[72px]">
                              {product_data.short_des}
                            </p>

                            <div className="px-5 py-5 flex justify-between mt-auto">
                              <div className="flex items-center gap-2 text-sm">
                                <Image
                                  src="/assets/images/calendar-icon.svg"
                                  alt="tour type icon"
                                  width={16}
                                  height={16}
                                />
                                {product_data.date}
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <Image
                                  src="/assets/images/clock-icon.svg"
                                  alt="duration icon"
                                  width={18}
                                  height={18}
                                />
                                {product_data.day} Days
                              </div>

                              <div className="flex items-center gap-2 text-sm">
                                <Image
                                  src="/assets/images/star-icon.svg"
                                  alt="rating icon"
                                  width={16}
                                  height={16}
                                />
                                {product_data.rating}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between bg-primary-800 mt-auto">
                          <div className="flex items-center gap-2 py-2 px-3 rounded-b-xl">
                            <span className="text-sm font-semibold text-dark-800">
                              From
                            </span>

                            <span className="text-xl md:text-2xl font-bold text-dark-900 block">
                              <sup>$</sup>
                              {product_data.price}
                            </span>

                            {product_data.old_price > 0 && (
                              <span className="text-sm font-semibold text-primary-900 line-through block">
                                <sup>$</sup>
                                {product_data.old_price}
                              </span>
                            )}
                          </div>

                          <div className="flex items-end justify-end">
                            <Link
                              href={product_data.slug}
                              className="btn btn-primary rounded-[3px] w-full h-full px-3 py-2"
                            >
                              View Tour
                              <i className="fa-regular fa-arrow-right ml-2"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-6 md:p-10 text-center">
                <h3 className="text-2xl md:text-3xl mb-3">
                  Not sure how to plan Turkmenistan?
                </h3>

                <p className="max-w-[760px] mx-auto text-dark-800 mb-6">
                  Tell us your dates, travel style, and whether you want to
                  combine Turkmenistan with Uzbekistan or a wider Central Asia
                  route. We will help you build a practical itinerary.
                </p>

                <Link href="/contact" className="btn btn-primary mx-auto">
                  Plan My Trip
                  <i className="fa-regular fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Destination_Detail;