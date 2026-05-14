import Image from "next/image";
import Link from "next/link";

const All_Team_Detail = ({ initialValues }) => {
  const renderListItems = (data) => {
    return data.map((item, index) => <li key={index}>{item}</li>);
  };

  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="sm:flex items-center gap-5 md:gap-12 mb-8 md:mb-14">
                <div className="overflow-hidden mx-auto sm:mx-0 w-[200px] h-[200px] md:w-[298px] md:h-[298px] rounded-full">
                  <Image
                    src={data.image}
                    alt={data.alt}
                    width={298}
                    height={298}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="mb-2">{data.name}</h2>
                  <p className="mb-4">{data.position}</p>
                  <ul className="flex items-center justify-start space-x-4 text-md text-primary-900">
                    <li>
                      <Link
                        href={data.facebook_link}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white"
                      >
                        <i className="fa-brands fa-facebook"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={data.twitter_link}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={data.instagram_link}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={data.youtube_link}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white"
                      >
                        <i className="fa-brands fa-youtube"></i>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={data.skype_link}
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white"
                      >
                        <i className="fa-brands fa-skype"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap md:-mx-7">
                <div className="w-full md:w-1/2 md:px-7">
                  <h4 className="text-xl md:text-25">Biography</h4>
                  <p className="leading-1xl">{data.mainContent}</p>
                  <ul className="mb-8 list-style-2">
                    {renderListItems(data.listItems)}
                  </ul>
                  <p className="leading-1xl">{data.additionalContent}</p>
                </div>

                <div className="w-full md:w-1/2 md:px-7">
                  <div className="mb-8 md:mb-12">
                    <h4 className="text-xl md:text-25">{data.skill_label}</h4>

                    {data.progress &&
                      data.progress.map((progress_data, index) => {
                        return (
                          <div className="relative min-w-full mt-6" key={index}>
                            <div className="flex items-center justify-between mb-1.5">
                              <h5 className="text-lg mb-0 font-semibold leading-normal">
                                {progress_data.category}
                              </h5>
                              <span className="text-lg mb-0 font-normal text-dark-800 leading-normal">
                                {progress_data.percentage}%
                              </span>
                            </div>
                            <div className="h-1 bg-primary-800">
                              <div
                                className="absolute h-1 bg-primary-900 w-0 left-0"
                                style={{
                                  width: `${progress_data.percentage}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className="mb-8 md:mb-12">
                    <h4 className="text-xl md:text-25">
                      {data.chronology_label}
                    </h4>
                    {data.experience &&
                      data.experience.map((experience_data, index) => {
                        return (
                          <div className="relative min-w-full mt-6" key={index}>
                            <h5 className="text-lg mb-0 font-bold leading-normal">
                              {experience_data.period}
                            </h5>
                            <p>{`${experience_data.title} of ${experience_data.company}`}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default All_Team_Detail;
