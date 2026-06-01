import { useFetchData } from "@/component/comman";
import Link from "next/link";

export default function HowItWorks() {
  const { data } = useFetchData("/json/data/how_it_works.json");

  if (!data) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        {data.map((section, index) => {
          return (
            <div key={index}>
              <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
                <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
                  {section.subtitle}
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-45 font-bold text-dark-900 mb-4">
                  {section.title}
                </h2>

                <p className="text-base md:text-lg text-dark-800 mb-0">
                  {section.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
                {section.steps.map((step, stepIndex) => {
                  return (
                    <div
                      key={stepIndex}
                      className="relative bg-[#FAF7F2] rounded-2xl p-6 h-full shadow-box-3"
                    >
                      <span className="block text-4xl font-bold text-primary-900/25 mb-4">
                        {step.number}
                      </span>

                      <h3 className="text-xl font-bold text-dark-900 mb-3">
                        {step.title}
                      </h3>

                      <p className="text-dark-800 mb-0 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {section.button && (
                <div className="text-center mt-10">
                  <Link
                    href={section.button.slug}
                    className="btn btn-primary rounded-full px-7"
                  >
                    {section.button.label}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}