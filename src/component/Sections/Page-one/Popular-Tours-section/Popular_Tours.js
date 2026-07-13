import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const Popular_Tours = ({ initialValues }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    const numericRating = Number(rating) || 0;

    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= Math.round(numericRating)
          ? "fa-solid fa-star"
          : "fa-regular fa-star";

      stars.push(<i key={i} className={starClass}></i>);
    }

    return stars;
  };

  const formatDuration = (product) => {
    if (product?.day && product?.night) {
      return `${product.day} Days ${product.night} Nights`;
    }

    if (product?.day) {
      return `${product.day} Days`;
    }

    if (product?.duration) {
      return product.duration;
    }

    return "Custom";
  };

  const formatPrice = (price) => {
    if (price === null || price === undefined || price === "") {
      return "On request";
    }

    return `$${price}`;
  };

  return (
    <section className="customers-purchased-section py-10 md:py-20 lg:py-10 overflow-hidden">
      {Array.isArray(initialValues) &&
        initialValues.map((data, index) => {
          const products = Array.isArray(data?.product) ? data.product : [];

          if (!products.length) return null;

          return (
            <div className="container" key={index}>
              <div className="mb-8 md:mb-14 flex items-end justify-between gap-5">
                <div className="max-w-[600px]">
                  {data?.title && <h2>{data.title}</h2>}
                  {data?.label && <p className="m-0">{data.label}</p>}
                </div>

                <div className="slider-arrow">
                  <div className="swiper-button-prev z-1 arrow"></div>
                  <div className="swiper-button-next z-1 arrow static m-0"></div>
                </div>
              </div>

              <div className="mt-6 popular-tours-slider">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  navigation={{
                    nextEl: ".slider-arrow .swiper-button-next",
                    prevEl: ".slider-arrow .swiper-button-prev",
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                    1199: {
                      slidesPerView: 3,
                      spaceBetween: 25,
                    },
                  }}
                  modules={[Navigation]}
                  className="mySwiper !overflow-visible"
                >
                  {products.map((product_data, productIndex) => {
                    const productUrl = product_data?.slug || "#";
                    const productImage =
                      product_data?.image ||
                      product_data?.card_image ||
                      product_data?.hero_image ||
                      "/assets/images/blog-img1.jpg";

                    return (
                      <SwiperSlide key={product_data?.id || productIndex}>
                        <div className="group relative h-full">
                          <div className="relative w-full overflow-hidden rounded-2xl aspect-[4/3] bg-[#FAF7F2] group-hover:opacity-75 transition-opacity">
                            <Link
                              href={productUrl}
                              className="absolute top-0 left-0 h-full w-full"
                            >
                              <Image
                                src={productImage}
                                alt={product_data?.alt || product_data?.title || "Tour"}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="h-full w-full object-cover object-center"
                              />
                            </Link>
                          </div>

                          <div className="mt-5">
                            <h3 className="text-1xl text-dark-700 leading-2xl mb-3 group-hover:text-primary-900">
                              <Link href={productUrl}>
                                {product_data?.title}
                              </Link>
                            </h3>

                            {product_data?.short_des && (
                              <p
                                className="text-sm text-dark-800 mb-4 leading-relaxed"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                }}
                              >
                                {product_data.short_des}
                              </p>
                            )}

                            <div className="mt-4 flex justify-between gap-4">
                              <div>
                                <p className="text-md font-medium text-black mb-2 leading-md">
                                  {formatDuration(product_data)}
                                </p>

                                <p className="text-[12px] flex items-center gap-2 text-dark-800 m-0 leading-md">
                                  <span className="flex items-center gap-1 text-[#FFC738]">
                                    {generateStarIcons(product_data?.rating || 4.9)}
                                  </span>
                                  <span>(1)</span>
                                </p>
                              </div>

                              <div className="text-right shrink-0">
                                {Number(product_data?.old_price) > 0 && (
                                  <span className="text-[12px] font-semibold text-primary-900 line-through block">
                                    ${product_data.old_price}
                                  </span>
                                )}

                                <span className="text-md font-bold text-dark-900 block">
                                  {formatPrice(product_data?.price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Popular_Tours;