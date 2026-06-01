import { useFetchData } from "@/component/comman";
import Link from "next/link";

export default function TravelConfidence() {
  const { data } = useFetchData("/json/data/travel_confidence.json");

  if (!data) return null;

  return (
    <section className="py-16 lg:py-24 bg-[#FAF7F2]">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.cards.map((card, cardIndex) => {
                  return (
                    <div
                      key={cardIndex}
                      className="bg-white rounded-2xl p-6 shadow-box-3 h-full transition-all hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 rounded-full bg-primary-900/10 flex items-center justify-center mb-5">
                        <i
                          className={`${card.icon} text-primary-900 text-xl`}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-dark-900 mb-3">
                        {card.title}
                      </h3>

                      <p className="text-dark-800 mb-0 leading-relaxed">
                        {card.description}
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