import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Side_Bar from "./side_bar";
import Activitie_Tab from "./activitie_tab";
import Flights_Tab from "./flights_tab";
import Hotel_Tab from "./hotel_tab";
import Tour_Tab from "./tour_tab";

const All_Destination_Detail = ({ initialValues }) => {
  const [active_grid, setActiveGrid] = useState(1);

  // Function to handle the change in the active state
  const handleGridChange = (value) => {
    setActiveGrid(value);
  };

  return (
    <section className="destination-detail py-14 md:mb-10">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="">
                <h2 className="text-3xl xl:text-4xl xl:leading-normal mb-7 flex items-center gap-2">
                  <i className={`${data.icon} text-primary-900`}></i>{" "}
                  {data.title}
                </h2>
                <p>{data.description} </p>
                <p>{data.description1}</p>

                <h3 className="text-lg md:text-3xl md:mt-10">{data.title1}</h3>
                <p>{data.description2}</p>
                <p>{data.description3}</p>

                <div className="md:mt-10">
                  <Side_Bar
                    active={active_grid}
                    onGridChange={handleGridChange}
                  />
                  {active_grid === 0 && (
                    <Activitie_Tab activitie_data={data.activitie} />
                  )}{" "}
                  {active_grid === 1 && (
                    <Flights_Tab flights_data={data.flights} />
                  )}
                  {active_grid === 2 && <Hotel_Tab hotel_data={data.hotel} />}
                  {active_grid === 3 && <Tour_Tab tour_data={data.tour} />}
                </div>

                <p>{data.description4}</p>
                <p>{data.description5}</p>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Destination_Detail;
