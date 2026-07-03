import Link from "next/link";
import Image from "next/image";

const All_Destination_Detail = ({
  initialValues,
  recommendedTours = [],
  recommendedToursLoading = false,
}) => {



  return (
    <section className="destination-detail py-14 md:mb-10">
      {initialValues &&
        initialValues.map((data, index) => {
          const travelInfo = data.flights?.[0]?.details || [];
          const topPlaces = data.activitie?.[0];
          const topPlaceCards = data.top_places || [];
          const routes = data.routes || [];
          const tours = recommendedTours;

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
  Essential planning notes for travelers considering{" "}
  {data.title} as part of a Central Asia journey.
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
                    {data.routes_title || "Recommended Routes"}
                  </h3>
                  <p className="max-w-[760px] mx-auto text-dark-800">
                    {data.routes_description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {routes.map((route, routeIndex) => {
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
              {/* Recommended Tours */}
              <div className="mb-12 md:mb-16">
                <div className="text-center mb-7 md:mb-10">
                  <h3 className="text-2xl md:text-3xl mb-3">
                    {data.recommended_tours_title || "Recommended Tours"}
                  </h3>

                  <p className="max-w-[760px] mx-auto text-dark-800">
                    {data.recommended_tours_description}
                  </p>
                </div>

                {recommendedToursLoading ? (
                  <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-8 text-center">
                    <p className="mb-0 text-dark-800">
                      Loading recommended tours...
                    </p>
                  </div>
                ) : tours.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {tours.map((product_data, productIndex) => {
                      const travelStyle =
                        product_data.travel_style ||
                        product_data.date ||
                        "Private";

                      const duration =
                        product_data.duration ||
                        (product_data.day
                          ? `${product_data.day} Days`
                          : "");

                      return (
                        <div
                          className="group relative bg-white shadow-box-1 rounded-xl overflow-hidden h-full flex flex-col"
                          key={
                            product_data.id ||
                            product_data.slug ||
                            productIndex
                          }
                        >
                          <div className="flex-1 flex flex-col">
                            <div className="w-full overflow-hidden rounded-t-xl before:pt-[65%] before:block relative group-hover:opacity-75">
                              <Link
                                href={product_data.slug}
                                className="absolute top-0 left-0 h-full w-full"
                              >
                                <Image
                                  src={
                                    product_data.image ||
                                    "/assets/images/tour-product-detail-img.jpg"
                                  }
                                  alt={
                                    product_data.alt ||
                                    product_data.title ||
                                    "Recommended tour"
                                  }
                                  fill
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

                              <div className="px-5 py-5 flex flex-wrap items-center justify-between gap-3 mt-auto">
                                <div className="flex items-center gap-2 text-sm">
                                  <Image
                                    src="/assets/images/calendar-icon.svg"
                                    alt=""
                                    width={16}
                                    height={16}
                                  />

                                  <span>{travelStyle}</span>
                                </div>

                                {duration && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <Image
                                      src="/assets/images/clock-icon.svg"
                                      alt=""
                                      width={18}
                                      height={18}
                                    />

                                    <span>{duration}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between bg-primary-800 mt-auto">
                            <div className="flex items-center gap-2 py-2 px-3 rounded-b-xl">
                              {product_data.price ? (
                                <>
                                  <span className="text-sm font-semibold text-dark-800">
                                    From
                                  </span>

                                  <span className="text-xl md:text-2xl font-bold text-dark-900 block">
                                    <sup>$</sup>
                                    {Number(
                                      product_data.price
                                    ).toLocaleString()}
                                  </span>
                                </>
                              ) : (
                                <span className="text-base font-bold text-dark-900">
                                  Price on request
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
                ) : (
                  <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-8 text-center">
                    <p className="mb-4 text-dark-800">
                      No published {data.title} tours are available yet.
                    </p>

                    <Link href="/contact" className="btn btn-primary">
                      Plan a {data.title} Tour
                    </Link>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-6 md:p-10 text-center">
                <h3 className="text-2xl md:text-3xl mb-3">
                  {data.cta_title || "Not sure how to plan your trip?"}
                </h3>

                <p className="max-w-[760px] mx-auto text-dark-800 mb-6">
                  {data.cta_description}
                </p>

                <Link
                  href={data.cta_button_slug || "/contact"}
                  className="btn btn-primary mx-auto"
                >
                  {data.cta_button_label || "Plan My Trip"}
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