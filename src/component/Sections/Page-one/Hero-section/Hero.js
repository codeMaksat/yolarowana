import Image from "next/image";

const Hero = ({ initialValues }) => {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section
          className="hero-section min-h-[calc(100vh-116px)] relative grid content-end pt-24 pb-5 md:py-20 lg:py-28"
          key={index}
        >
          <div className="absolute top-0 left-0 w-full h-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-[#190D1F] before:opacity-[0.22]">
            <Image
              src={data.image}
              alt={data.alt}
              width={1835}
              height={549}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="hero-content-slider relative z-1">
            <div className="container text-center">
              <h1 className="text-white">{data.title}</h1>

              <p className="mb-6 md:mb-9 text-white text-md md:text-2xl md:leading-2xl">
                {data.label}
              </p>
            </div>
          </div>
        </section>
      );
    })
  );
};

export default Hero;