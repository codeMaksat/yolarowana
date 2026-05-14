import Image from "next/image";
import Link from "next/link";

const Member_View = ({ data }) => {
  return (
    <>
      <div className="sm:flex items-center gap-5 mb-5">
        <div className="overflow-hidden mx-auto sm:mx-0 w-[155px] h-[155px] rounded-full">
          <Image
            src={data.image}
            alt={data.alt}
            width={155}
            height={155}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="mb-1 text-2xl leading-normal">{data.name}</h2>
          <p className="mb-2 text-md text-dark-800">{data.position}</p>
          <ul className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-primary-900">
            <li>
              <Link
                href={data.facebook_link}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </li>
            <li>
              <Link
                href={data.twitter_link}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white">
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link
                href={data.instagram_link}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link
                href={data.youtube_link}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </li>
            <li>
              <Link
                href={data.skype_link}
                className="w-6 h-6 rounded-full flex items-center justify-center transition-all bg-primary-800 text-primary-900 hover:bg-primary-900 hover:text-white">
                <i className="fa-brands fa-skype"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="">
        <div className="w-full border-b border-primary-800 pb-2 mb-8">
          <p className="leading-1xl text-dark-800">{data.description}</p>
        </div>
        <div className="w-full">
          <div className="mb-3">
            <h4 className="text-xl md:text-2xl leading-normal">
              {data.skill_label}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.progress &&
                data.progress.map((progress_data, index) => {
                  return (
                    <div className="relative min-w-full" key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-lg mb-0 font-semibold leading-normal">
                          {progress_data.category}
                        </h5>
                        <span className="text-lg mb-0 font-normal text-primary-900 leading-normal">
                          {progress_data.percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-2xl bg-primary-800">
                        <div
                          className="absolute h-2 rounded-2xl bg-primary-900 w-0 left-0"
                          style={{
                            width: `${progress_data.percentage}%`,
                          }}></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Member_View;
