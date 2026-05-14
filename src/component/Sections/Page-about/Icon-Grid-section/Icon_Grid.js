import Image from "next/image";

const Icon_Grid = ({ initialValues }) => {
  return (
    <section className="">
      {initialValues &&
        initialValues.map((data, index) => {
          return (
            <div className="container" key={index}>
              <div className="text-center mb-8 md:mb-14">
                <h2>{data.title}</h2>
                <p className="max-w-[590px] mx-auto">{data.label}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.product &&
                  data.product.map((product_data, index) => {
                    let pading = 0;
                    if (index === 0) {
                      pading = 3;
                    }
                    return (
                      <div
                        className="bg-white pt-8 pb-6 px-3 text-center shadow-card-1 rounded-xl h-full"
                        key={index}>
                        <Image
                          src={product_data.image}
                          alt={product_data.alt}
                          width={product_data.width}
                          height={product_data.height}
                          className={`mx-auto mb-6 mt-${pading}`}
                        />
                        <h2 className="text-[25px] md:text-4xl mb-2">
                          {product_data.value}
                        </h2>
                        <p className="text-primary-900 mb-0">
                          {product_data.label}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default Icon_Grid;
