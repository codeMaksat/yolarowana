import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Blog_Side_Bar } from "@/component/comman";

const All_Standard_Blog = ({ side_bar_data, initialValues, orders }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  let Side_Bar = <></>;

  if (orders !== 0) {
    Side_Bar = (
      <div
        className="w-full lg:max-w-[340px] shrink-0 lg:px-5"
        style={{ order: orders }}
      >
        <Blog_Side_Bar Data={side_bar_data} />
      </div>
    );
  }

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-8 md:mb-12">
                <h2>{data.title}</h2>
              </div>

              <div className="lg:flex lg:-mx-5">
                {Side_Bar}

                <div className="w-full md:px-3 lg:px-5 md:order-1">
                  {data.product &&
                    data.product
                      .slice(startIndex, endIndex)
                      .map((product_data, index) => {
                        return (
                          <div className="relative group mb-8" key={index}>
                            <div className="relative w-full overflow-hidden before:pt-[40%] before:block rounded-t-xl">
                              <Image
                                src={product_data.image}
                                alt={product_data.alt}
                                width={798}
                                height={319}
                                className="transition-all group-hover:scale-105 absolute top-0 left-0 w-full h-full object-cover duration-300"
                              />
                            </div>
                            <div className="py-4 lg:py-6 px-6 lg:px-9 bg-gray-400 rounded-b-xl">
                              <div className="flex flex-wrap gap-x-4 md:gap-x-8 text-15 text-dark-800 mb-4">
                                <div className="flex items-center gap-2">
                                  {" "}
                                  <Image
                                    src="/assets/images/clock-icon.svg"
                                    alt="clock-icon"
                                    width={18}
                                    height={18}
                                  />{" "}
                                  {product_data.date}
                                </div>
                                <div className="flex items-center gap-2">
                                  {" "}
                                  <Image
                                    src="/assets/images/comment-o.svg"
                                    alt="comment-icon"
                                    width={19}
                                    height={18}
                                  />{" "}
                                  {product_data.comment} Comments
                                </div>
                                <div className="flex items-center gap-2">
                                  {" "}
                                  <Image
                                    src="/assets/images/user_outline.svg"
                                    alt="user_outline-icon"
                                    width={19}
                                    height={18}
                                  />{" "}
                                  By {product_data.user_name}
                                </div>
                              </div>
                              <h3 className="text-xl md:text-25 xl:leading-normal mb-2 hover:text-primary-900">
                                <Link href={product_data.slug}>
                                  {product_data.title}
                                </Link>
                              </h3>
                              <p className="text-md leading-normal mb-4 text-dark-800">
                                {product_data.short_des}
                              </p>
                              <Link
                                href={product_data.slug}
                                className="btn btn-primary btn-lg"
                              >
                                Read more
                              </Link>
                            </div>
                          </div>
                        );
                      })}

                  <div className="mt-8 md:mt-14">
                    <nav
                      className="isolate flex justify-start gap-2 text-md font-bold"
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
                        pageRangeDisplayed={2}
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

export default All_Standard_Blog;
