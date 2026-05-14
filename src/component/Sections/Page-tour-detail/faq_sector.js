import React, { useState } from "react";
import Link from "next/link";

// Define the Faq_Sector component
const Faq_Sector = ({ faq_data }) => {
  const [selected, setSelected] = useState(0);

  return (
    faq_data &&
    faq_data.map((data, index) => {
      return (
        <div id="faq" className="mb-10" key={index}>
          <h4 className="text-xl md:text-2xl">{data.title}</h4>
          <div className="accordion faqs-list">
            {data.question &&
              data.question.map((question_data,innerIndex) => {
                return (
                  <div
                    key={innerIndex}
                    className={`accordion-list mb-3 ${
                      selected === innerIndex ? "active" : ""
                    }`}
                  >
                    <h5
                      className={`py-3 pl-8 mb-0 relative ${
                        selected === innerIndex ? "active" : ""
                      } cursor-pointer`}
                      onClick={() =>
                        selected !== innerIndex
                          ? setSelected(innerIndex)
                          : setSelected(null)
                      }
                    >
                      {question_data.question}
                    </h5>
                    <div
                      className="pl-8 overflow-hidden transition-all max-h-0 duration-700"
                      style={{
                        maxHeight: selected === innerIndex ? "152px" : "0",
                      }}
                    >
                      <p className="leading-1xl mb-0">{question_data.answer}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    })
  );
};

export default Faq_Sector;
