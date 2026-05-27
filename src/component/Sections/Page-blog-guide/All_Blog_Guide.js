import Link from "next/link";
import React from "react";

const All_Blog_Guide = ({ initialValues }) => {
  return (
    <section className="py-7 md:py-10">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-6 md:mb-8">
                {data.title && <h2 className="mb-3">{data.title}</h2>}

                {data.intro && (
                  <p className="max-w-[760px] mx-auto mb-0 text-dark-800">
                    {data.intro}
                  </p>
                )}
              </div>

              <div className="flex flex-col lg:flex-row lg:-mx-5">
                {/* Main content - left */}
                <main className="w-full lg:pr-10 lg:px-5 order-1">
                  <article className="blog-detail">
                    {data.main_image && (
                      <div className="relative w-full overflow-hidden before:pt-[38%] before:block rounded-xl">
                        <img
                          src={data.main_image}
                          alt={data.main_image_alt || data.title}
                          className="transition-all absolute top-0 left-0 w-full h-full object-cover duration-300"
                        />
                      </div>
                    )}

                    <div className="pt-4">
                      {data.meta && data.meta.length > 0 && (
                        <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 text-15 text-dark-800 mb-4">
                          {data.meta.map((metaItem, index) => {
                            return (
                              <div
                                className="flex items-center gap-2"
                                key={index}
                              >
                                {metaItem.icon && (
                                  <i className={metaItem.icon}></i>
                                )}
                                {metaItem.label}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {data.overview && (
                        <section
                          id={data.overview.id}
                          className="scroll-mt-[120px] mb-6 md:mb-8"
                        >
                          {data.overview.title && (
                            <h3 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-5">
                              {data.overview.title}
                            </h3>
                          )}

                          {data.overview.paragraphs &&
                            data.overview.paragraphs.map(
                              (paragraph, index) => {
                                return (
                                  <p
                                    className={`leading-1xl ${
                                      index ===
                                      data.overview.paragraphs.length - 1
                                        ? "mb-0"
                                        : "mb-4"
                                    }`}
                                    key={index}
                                  >
                                    {paragraph}
                                  </p>
                                );
                              }
                            )}
                        </section>
                      )}

                      {data.mid_images && data.mid_images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-6 md:mb-8">
                          {data.mid_images.map((image, index) => {
                            return (
                              <div
                                className="relative w-full overflow-hidden before:pt-[46%] before:block rounded-md"
                                key={index}
                              >
                                <img
                                  src={image.image}
                                  alt={image.alt || data.title}
                                  className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {data.quote && (
                        <blockquote className="border-l-4 border-primary-900 pl-5 py-3 flex items-center gap-4 mb-6 md:mb-8">
                          <h6 className="text-lg md:text-xl font-medium text-black m-0">
                            {data.quote}
                          </h6>
                        </blockquote>
                      )}

                      {data.comparison && (
                        <section
                          id={data.comparison.id}
                          className="scroll-mt-[120px] mb-6 md:mb-8"
                        >
                          {data.comparison.title && (
                            <h3 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-5">
                              {data.comparison.title}
                            </h3>
                          )}

                          <div className="overflow-x-auto rounded-2xl border border-[#E2CFAF]">
                            <table className="w-full min-w-[760px] bg-white">
                              <thead className="bg-[#FAF7F2]">
                                <tr>
                                  <th className="text-left p-4">Days</th>
                                  <th className="text-left p-4">Route</th>
                                  <th className="text-left p-4">Best For</th>
                                  <th className="text-left p-4">Highlight</th>
                                </tr>
                              </thead>

                              <tbody>
                                {data.comparison.items &&
                                  data.comparison.items.map((item, index) => {
                                    return (
                                      <tr
                                        key={index}
                                        className="border-t border-[#E2CFAF]"
                                      >
                                        <td className="p-4 font-bold">
                                          {item.days}
                                        </td>

                                        <td className="p-4">
                                          <div className="font-semibold">
                                            {item.title}
                                          </div>

                                          <div className="text-sm text-dark-800">
                                            {item.route}
                                          </div>
                                        </td>

                                        <td className="p-4">
                                          {item.best_for}
                                        </td>

                                        <td className="p-4">
                                          {item.highlight}
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </section>
                      )}

                      {data.guide_sections &&
                        data.guide_sections.map(section => {
                          return (
                            <section
                              id={section.id}
                              className="scroll-mt-[120px] mb-6 md:mb-8"
                              key={section.id}
                            >
                              {section.title && (
                                <h3 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-5">
                                  {section.title}
                                </h3>
                              )}

                              {section.image && (
                                <div className="relative w-full overflow-hidden before:pt-[38%] before:block rounded-xl mb-4 md:mb-5">
                                  <img
                                    src={section.image}
                                    alt={section.alt || section.title}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                  />
                                </div>
                              )}

                              {section.paragraphs &&
                                section.paragraphs.map((paragraph, index) => {
                                  return (
                                    <p
                                      className="leading-1xl mb-4"
                                      key={index}
                                    >
                                      {paragraph}
                                    </p>
                                  );
                                })}

                              {section.days && (
                                <div className="space-y-3">
                                  {section.days.map((day, index) => {
                                    return (
                                      <div
                                        key={index}
                                        className="border border-[#E2CFAF] rounded-2xl p-4 bg-white"
                                      >
                                        {day.day && (
                                          <div className="text-primary-900 font-bold mb-1">
                                            {day.day}
                                          </div>
                                        )}

                                        {day.title && (
                                          <h4 className="text-xl mb-2">
                                            {day.title}
                                          </h4>
                                        )}

                                        {day.text && (
                                          <p className="mb-0 leading-1xl">
                                            {day.text}
                                          </p>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </section>
                          );
                        })}

                      {data.tips && (
                        <section
                          id={data.tips.id}
                          className="scroll-mt-[120px] mb-6 md:mb-8"
                        >
                          {data.tips.title && (
                            <h3 className="text-xl md:text-25 md:text-3xl mb-3 md:mb-5">
                              {data.tips.title}
                            </h3>
                          )}

                          <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                            {data.tips.items &&
                              data.tips.items.map((tip, index) => {
                                return (
                                  <div
                                    className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-4 md:p-5"
                                    key={index}
                                  >
                                    {tip.title && (
                                      <h4 className="text-xl mb-3">
                                        {tip.title}
                                      </h4>
                                    )}

                                    {tip.text && (
                                      <p className="mb-0 leading-1xl">
                                        {tip.text}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                          </div>
                        </section>
                      )}

                      {data.cta && (
                        <section className="rounded-3xl bg-dark-900 text-white p-5 md:p-8">
                          <div className="md:flex items-center justify-between gap-8">
                            <div>
                              {data.cta.title && (
                                <h3 className="text-white text-2xl md:text-3xl mb-3">
                                  {data.cta.title}
                                </h3>
                              )}

                              {data.cta.text && (
                                <p className="text-white/80 mb-0 max-w-[680px]">
                                  {data.cta.text}
                                </p>
                              )}
                            </div>

                            {data.cta.slug && (
                              <Link
                                href={data.cta.slug}
                                className="btn btn-primary rounded-full mt-5 md:mt-0 shrink-0"
                              >
                                {data.cta.button || "Start Planning"}
                              </Link>
                            )}
                          </div>
                        </section>
                      )}
                    </div>
                  </article>
                </main>

                {/* Sidebar - right */}
                <aside className="w-full lg:max-w-[340px] shrink-0 lg:px-5 order-2 mt-8 lg:mt-0">
                  <div className="sticky top-[120px]">
                    {data.content_preview &&
                      data.content_preview.length > 0 && (
                        <div className="bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl p-5 mb-5">
                          <h3 className="text-xl mb-4">Content Preview</h3>

                          <ul className="space-y-3 text-dark-800">
                            {data.content_preview.map((item, index) => {
                              return (
                                <li key={index}>
                                  <a
                                    href={item.slug}
                                    className="hover:text-primary-900"
                                  >
                                    {item.label}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                    {data.sidebar && (
                      <>
                        <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5 mb-5">
                          {data.sidebar.help_title && (
                            <h3 className="text-xl mb-3">
                              {data.sidebar.help_title}
                            </h3>
                          )}

                          {data.sidebar.help_text && (
                            <p className="text-sm leading-6 mb-4">
                              {data.sidebar.help_text}
                            </p>
                          )}

                          {data.sidebar.help_slug && (
                            <Link
                              href={data.sidebar.help_slug}
                              className="btn btn-primary btn-sm rounded-full w-full"
                            >
                              {data.sidebar.help_button || "Ask Consultant"}
                            </Link>
                          )}
                        </div>

                        {data.sidebar.recommended_tours &&
                          data.sidebar.recommended_tours.length > 0 && (
                            <div className="bg-white border border-[#E2CFAF] rounded-2xl p-5">
                              <h3 className="text-xl mb-4">
                                {data.sidebar.recommended_title ||
                                  "Recommended Tours"}
                              </h3>

                              <div className="space-y-4">
                                {data.sidebar.recommended_tours.map(
                                  (tour, index) => {
                                    return (
                                      <Link
                                        href={tour.slug}
                                        className="block hover:text-primary-900"
                                        key={index}
                                      >
                                        <div className="font-semibold">
                                          {tour.title}
                                        </div>

                                        <div className="text-sm text-dark-800">
                                          {tour.label}
                                        </div>
                                      </Link>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Blog_Guide;