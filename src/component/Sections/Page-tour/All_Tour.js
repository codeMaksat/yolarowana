import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const All_Tour = ({ initialValues }) => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = selectedPage => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {data.product &&
                  data.product
                    .slice(startIndex, endIndex)
                    .map((product_data, index) => {
                      return (
                        <div
                          className="group relative bg-white shadow-box-1 rounded-xl overflow-hidden h-full flex flex-col"
                          key={index}
                        >
                          <div className="flex-1 flex flex-col">
                            <div className="w-full overflow-hidden rounded-t-xl before:pt-[65%] before:block relative group-hover:opacity-75">
                              <Link
                                href={product_data.slug}
                                className="tour-popup-link absolute top-0 left-0 h-full w-full"
                              >
                                <img
                                  src={product_data.image}
                                  alt={product_data.alt}
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

                              <p className="text-center mb-0 text-md px-4 min-h-[84px]">
                                {product_data.short_des}
                              </p>

                              <div className="px-5 py-5 flex justify-between mt-auto">
                                <div className="flex items-center gap-2 text-sm">
                                  <img
                                    src="/assets/images/calendar-icon.svg"
                                    alt="tour type icon"
                                  />
                                  {product_data.date}
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                  <img
                                    src="/assets/images/clock-icon.svg"
                                    alt="duration icon"
                                  />
                                  {product_data.day} Days
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                  <img
                                    src="/assets/images/star-icon.svg"
                                    alt="rating icon"
                                  />
                                  {product_data.rating}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between bg-primary-800 mt-auto">
                            <div className="text-right flex items-center gap-2 py-2 px-3 rounded-b-xl">
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

              <div className="mt-12">
                <nav aria-label="Pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    pageLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                    activeLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center bg-primary-900 text-white hover:bg-primary-900 hover:text-white"
                    containerClassName="isolate flex justify-center gap-2 text-md font-bold"
                    previousLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                    nextLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(data.product.length / itemsPerPage)}
                    previousClassName=""
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                  />
                </nav>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour;