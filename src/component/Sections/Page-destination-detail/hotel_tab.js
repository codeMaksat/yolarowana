import Image from "next/image";
import Link from "next/link";

const Hotel_Tab = ({ hotel_data }) => {
  return (
    <div className="mb-10">
      {hotel_data &&
        hotel_data.map((data, index) => {
          return (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              key={index}
            >
              {data.product &&
                data.product.map((product_data, index) => {
                  return (
                    <div
                      className="group relative bg-white border border-[#E2CFAF] rounded-2xl overflow-hidden shadow-sm h-full flex flex-col"
                      key={index}
                    >
                      <div className="w-full overflow-hidden before:pt-[65%] before:block relative group-hover:opacity-90">
                        <Image
                          src={product_data.image}
                          alt={product_data.alt}
                          width={358}
                          height={233}
                          className="h-full w-full object-cover object-center absolute top-0 left-0 transition-all duration-300 group-hover:scale-105"
                        />
                      </div>

                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-xl text-dark-700 leading-normal mb-3 group-hover:text-primary-900">
                          {product_data.title}
                        </h3>

                        <p className="text-md mb-5 leading-normal text-dark-800">
                          {product_data.short_des}
                        </p>

                        <Link
                          href="/contact"
                          className="mt-auto text-primary-900 font-semibold inline-flex items-center max-w-fit border-b border-primary-900 hover:border-transparent"
                        >
                          Ask about timing
                          <i className="fa-regular fa-arrow-right ml-2"></i>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};

export default Hotel_Tab;