import Image from "next/image";

const Hero = ({ initialValues = [] }) => {
  if (!Array.isArray(initialValues) || initialValues.length === 0) {
    return null;
  }

  return initialValues.map((data, index) => {
    const isPrimaryHero = index === 0;

    return (
      <section
        className="hero-section relative grid min-h-[calc(100svh-116px)] content-end pt-24 pb-5 md:py-20 lg:py-28"
        key={data.id || data.image || index}
      >
        <div className="absolute inset-0 before:absolute before:inset-0 before:z-[1] before:bg-[#190D1F] before:opacity-[0.22]">
          <Image
            src={data.image}
            alt={data.alt || data.title || "Belet Travel"}
            fill
            priority={isPrimaryHero}
            fetchPriority={isPrimaryHero ? "high" : "auto"}
            sizes="100vw"
            quality={75}
            className="object-cover"
          />
        </div>

        <div className="hero-content-slider relative z-[2]">
          <div className="container text-center">
            <h1 className="text-white">{data.title}</h1>

            <p className="mb-6 text-md text-white md:mb-9 md:text-2xl md:leading-2xl">
              {data.label}
            </p>

            {data.trust_label && (
              <div className="mt-5 inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-medium text-white backdrop-blur-sm">
                {data.trust_label}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  });
};

export default Hero;