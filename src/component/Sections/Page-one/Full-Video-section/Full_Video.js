import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Full_Video = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="full-video-section py-0 overflow-hidden relative lg:-mt-14"
          key={index}
        >
          <div className="bg-gradient-to-t z-1 from-white/0 to-white absolute top-0 left-0 w-full h-20"></div>
          <div className="video-img absolute top-0 left-0 w-full h-full lg:static">
            <Image
              src={data.image}
              alt={data.alt}
              width={1835}
              height={578}
              className="block w-full h-full object-cover"
            />
          </div>
          <div className="relative z-2 lg:absolute lg:bottom-14 left-0 w-full py-10 lg:py-0">
            <div className="container">
              <div className="text-center mx-auto max-w-md">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/70 p-2 mx-auto mb-5 lg:mb-7">
                  <Link
                    href={data.slug}
                    target="_blank"
                    className="flex items-center justify-center w-full h-full bg-white rounded-full"
                  >
                    <svg
                      className="w-[20px] md:w-[32px]"
                      width="32"
                      height="37"
                      viewBox="0 0 32 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.83139 36.6497C3.22532 36.6485 2.62998 36.4897 2.10393 36.1887C0.91939 35.5174 0.182999 34.2144 0.182999 32.7999V4.17343C0.182999 2.75494 0.91939 1.45589 2.10393 0.784645C2.64251 0.47512 3.25434 0.315947 3.87547 0.323761C4.49661 0.331575 5.10424 0.50609 5.63486 0.829066L30.1006 15.474C30.6105 15.7937 31.0308 16.2377 31.3222 16.7643C31.6136 17.2909 31.7664 17.8829 31.7664 18.4847C31.7664 19.0865 31.6136 19.6785 31.3222 20.2051C31.0308 20.7317 30.6105 21.1757 30.1006 21.4954L5.63091 36.1443C5.08789 36.4726 4.46593 36.6472 3.83139 36.6497Z"
                        fill="#190D1F"
                      />
                    </svg>
                  </Link>
                </div>
                <h2 className="m-0 text-white lg:text-[55px] font-bold lg:leading-[72px]">
                  {data.title}
                </h2>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Full_Video;
