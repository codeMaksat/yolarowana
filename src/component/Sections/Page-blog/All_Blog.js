import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { Blog_Side_Bar } from "@/component/comman";

const All_Blog = ({ initialValues, side_bar_data }) => {
  const itemsPerPage = 8;
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
              <div className="text-center mb-8 md:mb-12">
                <h2>{data.title}</h2>
              </div>

              <div className="lg:flex lg:-mx-5">
                <Blog_Side_Bar Data={side_bar_data} />
                <div className="w-full lg:px-5">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {data.product &&
                      data.product
                        .slice(startIndex, endIndex)
                        .map((product_data, index) => {
                          return (
                            <div className="relative group" key={index}>
                              <Link
                                href={product_data.slug}
                                className="absolute top-0 right-0 w-full h-full z-2"></Link>
                              <div className="absolute top-4 right-4 bg-primary-900 w-11 h-11 flex items-center justify-center z-1 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="23"
                                  height="23"
                                  viewBox="0 0 23 23"
                                  fill="none">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M20.125 3.59382C20.125 3.4032 20.0493 3.22038 19.9145 3.08559C19.7797 2.95079 19.5969 2.87507 19.4062 2.87507H10.7812C10.5906 2.87507 10.4078 2.95079 10.273 3.08559C10.1382 3.22038 10.0625 3.4032 10.0625 3.59382C10.0625 3.78444 10.1382 3.96726 10.273 4.10205C10.4078 4.23685 10.5906 4.31257 10.7812 4.31257H17.6712L3.08487 18.8974C3.01804 18.9643 2.96503 19.0436 2.92887 19.1309C2.8927 19.2182 2.87408 19.3118 2.87408 19.4063C2.87408 19.5008 2.8927 19.5944 2.92887 19.6817C2.96503 19.769 3.01804 19.8484 3.08487 19.9152C3.15169 19.982 3.23103 20.035 3.31834 20.0712C3.40565 20.1074 3.49924 20.126 3.59374 20.126C3.68825 20.126 3.78183 20.1074 3.86914 20.0712C3.95646 20.035 4.03579 19.982 4.10262 19.9152L18.6875 5.32888V12.2188C18.6875 12.4094 18.7632 12.5923 18.898 12.7271C19.0328 12.8618 19.2156 12.9376 19.4062 12.9376C19.5969 12.9376 19.7797 12.8618 19.9145 12.7271C20.0493 12.5923 20.125 12.4094 20.125 12.2188V3.59382Z"
                                    fill="white"
                                    stroke="white"
                                  />
                                </svg>
                              </div>
                              <div className="relative overflow-hidden h-full before:top-[110%] before:block after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-dark-900/30">
                                <Image
                                  src={product_data.image}
                                  alt={product_data.alt}
                                  width={399}
                                  height={467}
                                  className="transition-all group-hover:scale-105 w-full h-full object-cover duration-300"
                                />
                              </div>
                              <div className="absolute bottom-0 left-0 w-full p-5 text-white">
                                <div className="max-w-[380px]">
                                  <span className="bg-white/80 rounded-md px-2 text-12 text-dark-900 mb-3 block max-w-fit">
                                    {product_data.date}
                                  </span>
                                  <h3 className="text-xl xl:text-[25px] xl:leading-normal text-white mb-2">
                                    {product_data.title}
                                  </h3>
                                  <p className="text-md leading-normal mb-0">
                                    {product_data.short_des.length
                                      ? `${product_data.short_des.substring(
                                          0,
                                          90
                                        )}...`
                                      : product_data.short_des}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <nav aria-label="Pagination">
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

export default All_Blog;
