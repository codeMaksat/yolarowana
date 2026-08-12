import React from "react";

const Detail_Sector = ({ detail_data }) => {
  const generateStarIcons = (rating) => {
    const stars = [];

    const numericRating = Number(rating) || 0;

    for (let i = 1; i <= 5; i++) {
      const starClass =
        i <= numericRating
          ? "fa-solid fa-star"
          : "fa-regular fa-star";

      stars.push(
        <i
          key={i}
          className={starClass}
        ></i>
      );
    }

    return stars;
  };

  return (
    detail_data &&
    detail_data.map((data, index) => {
      const rating = Number(data.rating);
      const reviewCount = Number(data.review);

      const hasRealReviews =
        Number.isFinite(rating) &&
        rating > 0 &&
        Number.isFinite(reviewCount) &&
        reviewCount > 0;

      return (
        <React.Fragment key={index}>
          {/* TITLE / REVIEW */}
          <div
            id="detail"
            className="flex flex-wrap items-center justify-between gap-3 mb-6 scroll-mt-[160px]"
          >
            <h3 className="text-1xl lg:text-25 mb-0 leading-normal">
              {data.title}
            </h3>

            {/* ONLY SHOW WHEN REAL REVIEW DATA EXISTS */}
            {hasRealReviews && (
              <div className="text-[12px] text-dark-800 flex items-center gap-3 m-0 leading-md">
                <div className="flex items-center justify-end gap-2">
                  <span className="flex items-center gap-1 text-[#FFC738]">
                    {generateStarIcons(rating)}
                  </span>
                </div>

                <span className="w-full block text-right">
                  ({reviewCount}{" "}
                  {reviewCount === 1
                    ? "Review"
                    : "Reviews"}
                  )
                </span>
              </div>
            )}
          </div>

          {/* TOUR DETAILS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 border-b border-primary-800 pb-5 mb-7">
            {data.service &&
              data.service.map(
                (service_data, index) => {
                  return (
                    <div
                      className="flex gap-2 items-start"
                      key={index}
                    >
                      <img
                        src={service_data.image}
                        alt={service_data.alt}
                        width={service_data.width}
                        className="relative top-1"
                      />

                      <p className="m-0 text-md text-dark-900">
                        {service_data.title}{" "}

                        <span className="block">
                          {service_data.label}
                        </span>
                      </p>
                    </div>
                  );
                }
              )}
          </div>

          {/* OVERVIEW */}
          {data.overview &&
            data.overview.map(
              (overview_data, index) => {
                return (
                  <div
                    className="border-b border-primary-800 pb-5 mb-7"
                    key={index}
                  >
                    <h4 className="text-xl">
                      {overview_data.title}
                    </h4>

                    {overview_data.labels &&
                      overview_data.labels.map(
                        (labels_data, index) => {
                          return (
                            <p
                              className="leading-1xl"
                              key={index}
                            >
                              {labels_data.label}
                            </p>
                          );
                        }
                      )}
                  </div>
                );
              }
            )}
        </React.Fragment>
      );
    })
  );
};

export default Detail_Sector;