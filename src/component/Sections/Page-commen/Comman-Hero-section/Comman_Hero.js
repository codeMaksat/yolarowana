import Image from "next/image";
import Link from "next/link";

const Comman_Hero = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="hero-section min-h-[170px] sm:min-h-[200px] md:min-h-[300px] lg:min-h-[340px] relative grid content-center py-8 sm:py-10 md:py-16 lg:py-24"
          key={index}
        >
          <div className="absolute top-0 left-0 w-full h-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-dark-900/50">
            <Image
              src={data.image}
              alt={data.alt}
              width={1835}
              height={340}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hero-content-slider relative z-1">
            <div className="container text-center">
              <h1 className="text-white text-26 sm:text-30 md:text-4xl leading-snug mb-1 md:mb-0">
                {data.title}
              </h1>

              <nav className="w-full rounded-md">
                <ol className="list-reset flex justify-center text-white text-sm md:text-lg font-normal">
                  <li>
                    <Link
                      href={data.home_slug}
                      className="text-gray-300 hover:text-white"
                    >
                      {data.home_label}
                    </Link>
                  </li>
                  <li>
                    <span className="mx-2 text-gray-300">/</span>
                  </li>
                  <li>{data.title}</li>
                </ol>
              </nav>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Comman_Hero;