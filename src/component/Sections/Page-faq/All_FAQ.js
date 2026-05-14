import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const All_FAQ = ({ initialValues }) => {
  const [selected, setSelected] = useState(1);
  return (
    <section className="">
      <div className="container">
        <div className="md:flex md:-mx-3 lg:-mx-5">
          <div className="w-full md:max-w-[300px] lg:max-w-[340px] shrink-0 md:px-3 lg:px-5">
            <h2>Find Answer</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="w-full md:px-3 lg:px-5">
            {initialValues &&
              initialValues.map((category, index) => {
                return (
                  <div className="mb-10" key={index}>
                    <h3 className="text-2xl md:text-25 mb-5 md:mb-7 leading-normal font-bold">
                      {category.title}
                    </h3>

                    {category.questions &&
                      category.questions.map((question, qIndex) => {
                        return (
                          <div className="faqs-list mb-5" key={qIndex}>
                            <h3
                              className={`faqs-title cursor-pointer border border-primary-800 flex items-center m-0 bg-gray-400 rounded-[4px] py-3 px-3 text-dark-900 text-md leading-normal md:text-lg font-semibold ${
                                selected === question.id ? "active" : ""
                              }`}
                              onClick={() =>
                                selected !== question.id
                                  ? setSelected(question.id)
                                  : setSelected(null)
                              }
                            >
                              <i className="fa-sharp fa-solid fa-circle-question mr-3 shrink-0 text-primary-900"></i>{" "}
                              {question.question}
                            </h3>
                            <div
                              className="faqs-content overflow-hidden transition-all max-h-0 duration-700 pl-10"
                              style={{
                                maxHeight:
                                  selected === question.id ? "66px" : "0",
                              }}
                            >
                              <p className="text-md mt-3.5 m-0">
                                {question.answer}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default All_FAQ;
