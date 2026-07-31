import Image from "next/image";
import Link from "next/link";

const Top_Destinations = ({ initialValues = [] }) => {
  if (!Array.isArray(initialValues) || initialValues.length === 0) {
    return null;
  }

  return (
    <section>
      {initialValues.map((data, sectionIndex) => (
        <div className="container" key={data.id || data.title || sectionIndex}>
          <div className="mb-8 text-center md:mb-14">
            <h2>{data.title}</h2>
            <p className="mx-auto max-w-[590px]">{data.label}</p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-7">
            {Array.isArray(data.product) &&
              data.product.map((product) => (
                <div
                  className="category-box group relative overflow-hidden rounded-1xl"
                  key={product.id || product.slug}
                >
                  <Image
                    src={product.image}
                    alt={product.alt || product.title}
                    width={361}
                    height={252}
                    sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 767px) calc(50vw - 30px), (max-width: 1279px) calc(33vw - 32px), 361px"
                    quality={70}
                    loading="lazy"
                    className="h-auto w-full transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="categories-detail z-[2]">
                    <Link href={product.slug}>
                      <div className="tours-btn">{product.title}</div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-12">
            <Link
              href="/destination-central-asia"
              className="btn btn-primary mx-auto"
            >
              Explore all
              <i className="fa-regular fa-arrow-right ml-3"></i>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Top_Destinations;