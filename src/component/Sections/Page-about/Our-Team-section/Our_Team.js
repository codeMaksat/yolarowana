import Image from "next/image";

const Our_Team = ({ initialValues }) => {
  if (!initialValues) return null;

  const getMembers = (details = [], type) =>
    details.filter(member => member.type === type);

  return (
    <>
      {initialValues.map((data, index) => {
        const founder = getMembers(data.details, "founder")[0];

        const operations = getMembers(
          data.details,
          "operations"
        );

        const guides = getMembers(
          data.details,
          "guide"
        );

        const transportation = getMembers(
          data.details,
          "transportation"
        )[0];

        return (
          <section
            key={index}
            className="py-12 md:py-20 bg-[#FAF7F2]"
          >
            <div className="container">

              {/* HEADING */}
              <div className="max-w-[760px] mx-auto text-center mb-10 md:mb-16">
                <span className="inline-block mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-900">
                  The People Behind Belet Travel
                </span>

                <h2 className="mb-5">
                  {data.title}
                </h2>

                <p className="text-dark-800 mb-0">
                  {data.label}
                </p>
              </div>

              {/* FOUNDER */}
              {founder && (
                <div className="max-w-[1050px] mx-auto mb-14 md:mb-20">
                  <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] bg-white rounded-3xl overflow-hidden shadow-box-3 border border-[#D8B46A]/15">

                    <div className="relative min-h-[420px] md:min-h-[470px]">
                      <Image
                        src={founder.image}
                        alt={
                          founder.alt ||
                          founder.user_name
                        }
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 340px"
                      />
                    </div>

                    <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-center">

                      <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9A6D2E] mb-3">
                        Founder
                      </span>

                      <h3 className="text-2xl md:text-3xl mb-1 text-dark-900">
                        {founder.user_name}
                      </h3>

                      <p className="font-semibold text-primary-900 mb-5">
                        {founder.position}
                      </p>

                      {founder.bio && (
                        <p className="text-dark-800 leading-relaxed mb-5">
                          {founder.bio}
                        </p>
                      )}

                      {founder.languages && (
                        <div className="pt-4 border-t border-[#E8DFD0]">
                          <span className="block text-xs uppercase tracking-[0.12em] text-dark-800/60 mb-1">
                            Languages
                          </span>

                          <span className="text-sm text-dark-900">
                            {founder.languages}
                          </span>
                        </div>
                      )}

                    </div>
                  </div>
                </div>
              )}

              {/* OPERATIONS */}
              {operations.length > 0 && (
                <div className="mb-14 md:mb-20">

                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9A6D2E]">
                      Tour Planning & Operations
                    </span>

                    <h3 className="text-2xl mt-2 mb-0">
                      Your contacts before and during the journey
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-[900px] mx-auto">
                    {operations.map((member, memberIndex) => (
                      <TeamCard
                        member={member}
                        key={memberIndex}
                      />
                    ))}
                  </div>

                </div>
              )}

              {/* GUIDES */}
              {guides.length > 0 && (
                <div className="mb-14 md:mb-20">

                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9A6D2E]">
                      Local Guides
                    </span>

                    <h3 className="text-2xl mt-2 mb-0">
                      Local knowledge that brings each place to life
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {guides.map((member, memberIndex) => (
                      <TeamCard
                        member={member}
                        key={memberIndex}
                      />
                    ))}
                  </div>

                </div>
              )}

              {/* TRANSPORT */}
              {transportation && (
                <div className="max-w-[650px] mx-auto">

                  <div className="text-center mb-8">
                    <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#9A6D2E]">
                      Transportation & Logistics
                    </span>
                  </div>

                  <TeamCard
                    member={transportation}
                    horizontal
                  />

                </div>
              )}

              {/* TRUST NOTE */}
              <div className="max-w-[820px] mx-auto text-center mt-14 md:mt-20 pt-8 border-t border-[#D8B46A]/25">

                <p className="text-sm text-dark-800 mb-0">
                  Our core team works closely with a trusted
                  network of local drivers, guides and travel
                  partners throughout Central Asia, allowing us
                  to stay personally involved in every journey.
                </p>

              </div>

            </div>
          </section>
        );
      })}
    </>
  );
};

const TeamCard = ({ member, horizontal = false }) => {
  return (
    <article
      className={`bg-white rounded-2xl overflow-hidden border border-[#D8B46A]/15 shadow-box-3 ${
        horizontal
          ? "sm:grid sm:grid-cols-[220px_1fr]"
          : ""
      }`}
    >

      {/* PHOTO */}
      <div
        className={`relative ${
          horizontal
            ? "min-h-[290px]"
            : "h-[340px]"
        }`}
      >
        <Image
          src={member.image}
          alt={
            member.alt ||
            `${member.user_name} - ${member.position}`
          }
          fill
          className="object-cover object-center"
          sizes={
            horizontal
              ? "(max-width: 640px) 100vw, 220px"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>

      {/* INFORMATION */}
      <div className="p-5 md:p-6">

        <h3 className="text-xl mb-1 text-dark-900">
          {member.user_name}
        </h3>

        <span className="block text-sm font-semibold text-primary-900 mb-4">
          {member.position}
        </span>

        {member.bio && (
          <p className="text-sm text-dark-800 leading-relaxed mb-4">
            {member.bio}
          </p>
        )}

        {member.languages && (
          <div className="pt-3 border-t border-[#E8DFD0]">
            <span className="text-xs text-dark-800/60">
              Languages:
            </span>

            <span className="text-xs text-dark-900 ml-1">
              {member.languages}
            </span>
          </div>
        )}

      </div>
    </article>
  );
};

export default Our_Team;