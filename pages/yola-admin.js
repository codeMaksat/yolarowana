import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Login() {
  const router = useRouter();

  const [address_save_errors, setaddress_save_errors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const save_account_details = async event => {
    event.preventDefault();

    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let email = formData.get("email");
    let password = formData.get("password");

    const error = {};

    if (!email || email.trim() === "") {
      error.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!password || password.trim() === "") {
      error.password = "Password is required*";
    } else if (password.length < 6) {
      error.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
      return;
    }

    setaddress_save_errors({});
    setIsSubmitting(true);

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setaddress_save_errors({
        general: "Login failed. Please check your email and password.",
      });
      setIsSubmitting(false);
      return;
    }

    router.push("/booking-dashboard");
  };

  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  return (
    <>
      <Head_Meta meta_data={seo_data.login_meta} comman_meta={seo_data} />

      <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-200 mb-14 md:mb-20">
        <div className="container">
          <div className="max-w-[590px] mx-auto px-3 sm:px-6 md:px-8 pb-7 md:pb-9 bg-primary-400 rounded-4xl">
            <div className="shadow-form-box px-4 sm:px-6 md:px-8 py-7 md:py-9 bg-white rounded-4xl -mt-7 md:-mt-9 inline-block w-full">
              <h1 className="text-xl mb-2">Admin login</h1>

              <p className="text-dark-800 md:mb-10">
                Sign in to manage Yola Rowana inquiries.
              </p>

              {address_save_errors.general && (
                <div className="mb-5 bg-[#FFF3F3] border border-red-200 rounded-2xl px-4 py-3">
                  <p className="text-red-800 mb-0">
                    {address_save_errors.general}
                  </p>
                </div>
              )}

              <form
                className="form"
                id="account_details_form"
                onSubmit={save_account_details}
              >
                <div className="mb-3 sm:mb-5">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-control"
                    name="email"
                  />
                  {address_save_errors.email && (
                    <span className="error text-red-800">
                      {address_save_errors.email}
                    </span>
                  )}
                </div>

                <div className="mb-3 sm:mb-5">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    name="password"
                  />
                  {address_save_errors.password && (
                    <span className="error text-red-800">
                      {address_save_errors.password}
                    </span>
                  )}
                </div>

                <div className="mb-3 sm:mb-5">
                  <p className="text-dark-800">
                    <Link
                      href="/forgot-password"
                      className="text-primary-900 underline hover:text-black hover:no-underline"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                <p className="text-sm text-dark-800 mt-5 mb-0">
                  Admin access only. Public registration is disabled.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}