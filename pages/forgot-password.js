import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React from "react";

export default function Index() {
  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta
        meta_data={seo_data.forgot_password_meta}
        comman_meta={seo_data}
      />
      <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-200 mb-14 md:mb-20">
        <div className="container">
          <div className="max-w-[590px] mx-auto px-3 sm:px-6 md:px-8 pb-7 md:pb-9 bg-primary-400 rounded-4xl">
            <div className="shadow-form-box px-4 sm:px-6 md:px-8 py-7 md:py-9 bg-white rounded-4xl -mt-7 md:-mt-9 inline-block w-full">
              <h1 className="text-xl mb-2">Forgot password</h1>
              <p className="text-dark-800 md:mb-2">
                Lost your password? Please enter your username or email address.
                You will receive a link to create a new password via email.
              </p>

              <form className="form">
                <div className="mb-3 sm:mb-5">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-control"
                    name=""
                  />
                </div>
                <div className="flex flex-wrap items-center	justify-between gap-3">
                  <button type="button" className="btn btn-primary">
                    Reset password
                  </button>
                  <p className="text-dark-800 m-0">
                    Back to{" "}
                    <Link
                      href="/login"
                      className="text-primary-900 underline hover:text-black hover:no-underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
