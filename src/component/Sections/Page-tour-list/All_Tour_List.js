import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Blog_Side_Bar } from "@/component/comman";

const All_Tour_List = ({ initialValues, side_bar_data }) => {
  const generateStarIcons = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= rating ? "fa-solid fa-star" : "fa-regular fa-star";
      stars.push(<i key={i} className={starClass}></i>);
    }
    return stars;
  };

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (selectedPage) => {
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
              <div className="md:flex md:-mx-3 lg:-mx-5">
                <Blog_Side_Bar Data={side_bar_data} />

                <div className="w-full md:px-3 lg:px-5">
                  {data.product &&
                    data.product
                      .slice(startIndex, endIndex)
                      .map((product_data, index) => {
                        return (
                          <div
                            className="flex flex-wrap lg:items-center mb-8"
                            key={index}
                          >
                            <div className="w-full sm:w-1/3">
                              <div className="overflow-hidden relative group rounded-xl before:block before:pt-full">
                                <Link
                                  href={product_data.slug}
                                  className="absolute top-0 left-0 h-full w-full block"
                                >
                                  <img
                                    src={product_data.image}
                                    alt={product_data.alt}
                                    className="transition-all group-hover:scale-105 w-full h-full object-cover duration-300"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="w-full sm:w-2/3 pt-5 sm:pt-0 sm:pl-5 xl:pl-9">
                              <div className="flex items-center justify-between border-b border-primary-400 pb-3 mb-4">
                                <div className="flex items-center gap-3 text-dark-900 font-medium">
                                  <img
                                    src="/assets/images/calendar-icon2.svg"
                                    alt="calendar-icon2"
                                  />
                                  {product_data.day} Days
                                </div>
                                <div className="text-[12px] text-dark-800 m-0 leading-md">
                                  <div className="flex items-center justify-end gap-2">
                                    <span className="flex items-center gap-1 text-[#FFC738]">
                                      {generateStarIcons(product_data.rating)}
                                    </span>
                                  </div>
                                  <span className="w-full block text-right">
                                    ({product_data.review} Review)
                                  </span>
                                </div>
                              </div>
                              <h2 className="text-xl md:text-25 xl:leading-normal mb-2 hover:text-primary-900">
                                <Link href={product_data.slug}>
                                  {product_data.title}
                                </Link>
                              </h2>
                              <div className="lg:flex justify-between">
                                <div className="w-full">
                                  <p className="text-sm leading-normal mb-2 flex items-center gap-2">
                                    <i className="fa-solid fa-location-dot text-primary-900"></i>{" "}
                                    <Link
                                      href={product_data.slug}
                                      className="hover:text-primary-800"
                                    >
                                      {product_data.city},{" "}
                                      {product_data.country}
                                    </Link>
                                  </p>
                                  <p className="text-sm mb-2 w-3/4">
                                    {product_data.label}
                                  </p>
                                  <Link
                                    href={product_data.slug}
                                    className="link"
                                  >
                                    Free cancellation
                                  </Link>
                                </div>
                                <div className="shrink-0">
                                  <div className="lg:text-right">
                                    <span className="text-12 leading-normal text-dark-800">
                                      From
                                    </span>
                                    <div className="text-dark-900 leading-normal text-lg font-bold mb-3 lg:mb-7">
                                      ${product_data.price}
                                    </div>
                                  </div>
                                  <Link
                                    href={product_data.slug}
                                    className="btn btn-primary btn-sm mx-0"
                                  >
                                    View detail{" "}
                                    <i className="fa-regular fa-arrow-up-right ml-2"></i>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                  <div className="mt-12 pt-6 md:pt-10 border-t border-primary-400">
                    <nav
                      className="isolate flex gap-2 text-md font-bold"
                      aria-label="Pagination"
                    >
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        pageLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                        activeLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center bg-primary-900 text-white hover:bg-primary-900 hover:text-white"
                        containerClassName="isolate flex justify-end gap-2 text-md font-bold"
                        previousLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                        nextLinkClassName="w-10 h-10 border border-primary-900 rounded-full flex items-center justify-center text-dark-900 hover:bg-primary-900 hover:text-white"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={Math.ceil(
                          data.product.length / itemsPerPage
                        )}
                        previousClassName=""
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                      />
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_List;
