import Image from "next/image";

const Company_Credentials = ({ initialValues }) => {
  if (!initialValues) return null;

  return (
    <>
      {initialValues.map((data, index) => (
        <section
          key={index}
          className="py-12 md:py-20 bg-white"
        >
          <div className="container">

            {/* HEADING */}
            <div className="max-w-[760px] mx-auto text-center mb-10 md:mb-14">
              <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
                Company Information
              </span>

              <h2 className="mb-4">
                {data.title}
              </h2>

              <p className="text-dark-800 mb-0">
                {data.label}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-7">

              {/* COMPANY DETAILS */}
              <div className="rounded-3xl bg-[#FAF7F2] border border-[#E2CFAF] p-6 md:p-8">

                <div className="mb-7">
                  <span className="text-xs uppercase tracking-[0.15em] text-[#9A6D2E] font-semibold">
                    Registered Company
                  </span>

                  <h3 className="text-2xl mt-2 mb-2">
                    Belet Travel
                  </h3>

                  <p className="text-sm text-dark-800 mb-0">
                    Officially registered and licensed tour operator
                    based in Ashgabat, Turkmenistan.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7">

                  <InfoItem
                    label="Legal company name"
                    value={data.legal_name}
                  />

                  <InfoItem
                    label="Registration number"
                    value={data.registration_number}
                  />

                  <InfoItem
                    label="Tourism licence"
                    value={data.licence_number}
                  />

                  <InfoItem
                    label="Issuing authority"
                    value={data.issuing_authority}
                  />

                  <InfoItem
                    label="Established"
                    value={data.established}
                  />

                  <InfoItem
                    label="Office"
                    value={data.address}
                  />

                </div>

                {/* PHONE */}
                <div className="mt-2 pt-6 border-t border-[#E2CFAF] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div>
                    <span className="block text-xs uppercase tracking-[0.12em] text-dark-800/60 mb-1">
                      Official contact
                    </span>

                    <a
                      href={`tel:${data.phone}`}
                      className="text-lg font-semibold text-dark-900 hover:text-primary-900"
                    >
                      {data.phone_display}
                    </a>
                  </div>

                  <div className="inline-flex items-center gap-2 text-sm text-[#217A3C] font-medium">
                    <span className="w-8 h-8 rounded-full bg-[#E8F7EC] flex items-center justify-center">
                      <i className="fa-regular fa-check"></i>
                    </span>

                    Local registered business
                  </div>

                </div>

              </div>

              {/* DOCUMENTS */}
              <div className="rounded-3xl bg-[#071B1A] p-6 md:p-8 text-white">

                <span className="text-xs uppercase tracking-[0.15em] text-[#D8B46A] font-semibold">
                  Company Documents
                </span>

                <h3 className="text-white text-2xl mt-2 mb-3">
                  Registration & licence
                </h3>

                <p className="text-white/70 text-sm leading-6 mb-7">
                  Official registration and tourism licence
                  documents help travelers and partners verify
                  the company behind their booking.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">

                  {data.documents.map((document, docIndex) => (
                    <DocumentCard
                      key={docIndex}
                      document={document}
                    />
                  ))}

                </div>

                <p className="text-xs text-white/50 mt-6 mb-0">
                  Full company documentation can also be
                  provided to travelers and business partners
                  upon request.
                </p>

              </div>

            </div>

          </div>
        </section>
      ))}
    </>
  );
};

const InfoItem = ({ label, value }) => {
  return (
    <div className="py-4 border-t border-[#E2CFAF]">
      <span className="block text-xs uppercase tracking-[0.10em] text-dark-800/60 mb-1">
        {label}
      </span>

      <span className="block text-sm md:text-base font-semibold text-dark-900">
        {value}
      </span>
    </div>
  );
};

const DocumentCard = ({ document }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/5">

      {/* DOCUMENT PREVIEW */}
      <div className="relative h-[180px] bg-white/10 flex items-center justify-center">

        {document.image ? (
          <Image
            src={document.image}
            alt={document.alt}
            fill
            className="object-cover object-top"
            sizes="300px"
          />
        ) : (
          <div className="text-center px-5">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center text-[#D8B46A]">
              <i className="fa-regular fa-file-certificate text-xl"></i>
            </div>

            <span className="text-xs text-white/50">
              Document preview
            </span>
          </div>
        )}

      </div>

      {/* DOCUMENT INFO */}
      <div className="p-4">
        <div className="text-sm font-semibold text-white mb-1">
          {document.title}
        </div>

        <div className="text-xs text-white/55">
          {document.description}
        </div>
      </div>

    </div>
  );
};

export default Company_Credentials;