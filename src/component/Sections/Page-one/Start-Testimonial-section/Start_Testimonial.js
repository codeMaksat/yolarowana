import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

const Start_Testimonial = ({ initialValues }) => {
  const generateStarIcons = rating => {
    const stars = [];
    const maxRating = 5;

    for (let i = 0; i < maxRating; i++) {
      const starClass = i < rating ? "text-yellow-900" : "text-gray-300";

      stars.push(
        <svg
          key={i}
          className={`w-3 h-3 ${starClass}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="testimonial-section py-10 md:py-16 relative overflow-hidden bg-[#FAF7F2] z-0"
          key={index}
        >
          {/* Central Asia map background */}
          <div className="pointer-events-none absolute inset-0 opacity-80 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,180,106,0.18),transparent_62%)]"></div>

            <svg
              className="absolute left-0 top-0 h-full w-full"
              viewBox="0 0 1200 430"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Kazakhstan */}
              <path
                d="M185 115
                L255 92
                L360 88
                L430 112
                L500 98
                L568 112
                L615 155
                L585 192
                L520 198
                L472 182
                L422 198
                L370 185
                L330 205
                L278 188
                L225 192
                L185 165
                Z"
                fill="#D8B46A"
                opacity="0.10"
                stroke="#D8B46A"
                strokeOpacity="0.26"
                strokeWidth="2"
              />

              {/* Uzbekistan */}
              <path
                d="M360 205
                L412 196
                L468 206
                L508 196
                L540 216
                L530 246
                L474 256
                L422 248
                L376 258
                L342 240
                Z"
                fill="#D8B46A"
                opacity="0.10"
                stroke="#D8B46A"
                strokeOpacity="0.26"
                strokeWidth="2"
              />

              {/* Turkmenistan */}
              <path
                d="M228 208
                L284 198
                L336 210
                L350 245
                L322 282
                L262 292
                L214 268
                L198 230
                Z"
                fill="#D8B46A"
                opacity="0.10"
                stroke="#D8B46A"
                strokeOpacity="0.26"
                strokeWidth="2"
              />

              {/* Kyrgyzstan */}
              <path
                d="M538 214
                L584 205
                L644 212
                L682 228
                L665 248
                L610 253
                L560 244
                L530 228
                Z"
                fill="#D8B46A"
                opacity="0.10"
                stroke="#D8B46A"
                strokeOpacity="0.26"
                strokeWidth="2"
              />

              {/* Tajikistan */}
              <path
                d="M565 248
                L610 253
                L642 275
                L628 312
                L590 320
                L555 295
                L548 270
                Z"
                fill="#D8B46A"
                opacity="0.10"
                stroke="#D8B46A"
                strokeOpacity="0.26"
                strokeWidth="2"
              />

              {/* Silk Road style route line */}
              <path
                d="M245 245
                C300 225 340 220 385 222
                C430 224 468 216 500 212
                C540 206 578 216 612 225
                C640 233 668 236 695 232"
                stroke="#D8B46A"
                strokeWidth="2.2"
                strokeDasharray="10 10"
                opacity="0.45"
              />

              {/* Route points */}
              <circle cx="245" cy="245" r="7" fill="#D8B46A" opacity="0.88" />
              <circle cx="385" cy="222" r="7" fill="#D8B46A" opacity="0.88" />
              <circle cx="500" cy="212" r="7" fill="#D8B46A" opacity="0.88" />
              <circle cx="612" cy="225" r="7" fill="#D8B46A" opacity="0.88" />
              <circle cx="695" cy="232" r="7" fill="#D8B46A" opacity="0.88" />

              <circle cx="245" cy="245" r="17" stroke="#D8B46A" opacity="0.20" />
              <circle cx="385" cy="222" r="17" stroke="#D8B46A" opacity="0.20" />
              <circle cx="500" cy="212" r="17" stroke="#D8B46A" opacity="0.20" />
              <circle cx="612" cy="225" r="17" stroke="#D8B46A" opacity="0.20" />
              <circle cx="695" cy="232" r="17" stroke="#D8B46A" opacity="0.20" />

              {/* Country labels */}
              <text
                x="360"
                y="140"
                fill="#B88A2B"
                opacity="0.35"
                fontSize="14"
                fontWeight="600"
                textAnchor="middle"
              >
                Kazakhstan
              </text>

              <text
                x="442"
                y="230"
                fill="#B88A2B"
                opacity="0.35"
                fontSize="13"
                fontWeight="600"
                textAnchor="middle"
              >
                Uzbekistan
              </text>

              <text
                x="270"
                y="248"
                fill="#B88A2B"
                opacity="0.35"
                fontSize="13"
                fontWeight="600"
                textAnchor="middle"
              >
                Turkmenistan
              </text>

              <text
                x="610"
                y="228"
                fill="#B88A2B"
                opacity="0.35"
                fontSize="13"
                fontWeight="600"
                textAnchor="middle"
              >
                Kyrgyzstan
              </text>

              <text
                x="595"
                y="295"
                fill="#B88A2B"
                opacity="0.35"
                fontSize="13"
                fontWeight="600"
                textAnchor="middle"
              >
                Tajikistan
              </text>
            </svg>

            <div className="absolute -left-20 top-8 h-72 w-72 rounded-full border border-[#D8B46A]/15"></div>
            <div className="absolute -right-24 bottom-4 h-80 w-80 rounded-full border border-[#D8B46A]/15"></div>
          </div>

          <div className="container relative z-10">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-2/5">
                <div className="md:max-w-[406px]">
                  <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
                    Guest Stories
                  </span>

                  <h2>{data.title}</h2>
                  <p>{data.label}</p>
                </div>
              </div>

              <div className="testimonial-slider w-full md:w-3/5 lg:pl-14">
                <div className="slider-arrow">
                  <div className="swiper-button-prev z-1 arrow"></div>
                  <div className="swiper-button-next z-1 arrow static m-0"></div>
                </div>

                <Swiper
                  className="mySwiper !py-5 !px-3"
                  slidesPerView={1}
                  spaceBetween={20}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                  }}
                  navigation={{
                    nextEl: ".slider-arrow .swiper-button-next",
                    prevEl: ".slider-arrow .swiper-button-prev",
                  }}
                  pagination={{
                    el: ".testimonial-full-slider .swiper-pagination",
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {data.review &&
                    data.review.map((review_data, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className="shadow-card-3 p-5 bg-white rounded-4xl border border-[#D8B46A]/10">
                            <div className="flex items-center space-x-1 text-yellow-900 mb-5">
                              {generateStarIcons(review_data.rating)}
                            </div>

                            <p className="text-dark-900 text-md mb-10">
                              {review_data.comment}
                            </p>

                            <div className="flex border-t border-gray-100 pt-3">
                              <figcaption className="flex justify-center items-center space-x-3">
                                <div
                                  className="w-10 h-10 rounded-full bg-[#E8F3EC] border border-[#D8B46A]/30 flex items-center justify-center text-primary-900 shrink-0"
                                  aria-hidden="true"
                                >
                                  <i className="fa-regular fa-user text-lg"></i>
                                </div>

                                <div className="space-y-0.5 font-medium dark:text-white text-left">
                                  <div className="text-dark-900 text-sm font-bold leading-normal">
                                    {review_data.user_name}
                                  </div>

                                  <div className="text-10 font-light text-dark-800 leading-normal dark:text-gray-400">
                                    {review_data.country}
                                  </div>
                                </div>
                              </figcaption>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Start_Testimonial;