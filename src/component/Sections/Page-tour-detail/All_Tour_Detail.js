import Link from "next/link";
import Itinerary_Sector from "./itinerary_sector";
import Faq_Sector from "./faq_sector";
import Map_Sector from "./map_sector";
import Photos_Sector from "./photos_sector";
import Side_Bar from "./side_bar";
import Detail_Sector from "./detail_sector";

const All_Tour_Detail = ({ initialValues }) => {
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div>
                <h2 className="mb-5">{data.title}</h2>

                <div className="text-md md:text-lg leading-normal mb-6 flex items-center gap-2">
                  <i className={`${data.icon} text-primary-900`}></i>
                  {data.icon_label}
                </div>

                <div className="mb-8 overflow-hidden rounded-2xl">
                  <img
                    src={data.image}
                    alt={data.alt}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="lg:flex">
                  <div className="w-full lg:w-[calc(100%-300px)] lg:pr-12">
                    <ul className="flex overflow-x-auto md:space-x-5 mb-8 pb-3 md:pb-1 scroll-menu sticky top-[62px] md:top-[82px] lg:top-[82px] z-10 py-2 bg-white">
                      <li>
                        <Link
                          href="#detail"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full font-semibold block bg-primary-900 text-white"
                        >
                          Detail
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#photos"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Photos
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#itinerary"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Itinerary
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#map"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          Map
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="#faq"
                          className="px-7 py-2 text-md leading-normal md:text-lg rounded-full text-dark-800 font-semibold block hover:bg-primary-900 hover:text-white"
                        >
                          FAQ
                        </Link>
                      </li>
                    </ul>

                    <div className="tabs-content">
                      <Detail_Sector detail_data={data.detail} />

                      <Photos_Sector photo_data={data.photo} />

                      <Itinerary_Sector itinerary_data={data.itinerary} />

                      <Map_Sector map_data={data.map} />

                      <Faq_Sector faq_data={data.faq} />
                    </div>
                  </div>

                  <Side_Bar sideBar_data={data.side_bar} />
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Tour_Detail;