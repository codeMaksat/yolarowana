import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [address_save_errors, setaddress_save_errors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async event => {
    event.preventDefault();

    const error = {};

    if (!email || email.trim() === "") {
      error.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
      setSuccessMessage("");
      return;
    }

    setaddress_save_errors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );

    if (resetError) {
      setaddress_save_errors({
        general: "Could not send reset email. Please try again.",
      });
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(
      "Password reset link sent. Please check your email inbox."
    );
    setEmail("");
    setIsSubmitting(false);
  };

  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json");

  return (
    <>
      <Head_Meta
        meta_data={seo_data.forgot_password_meta}
        comman_meta={seo_data}
      />

      <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-200 mb-14 md:mb-20">
        <div className="container">
          <div className="max-w-[590px] mx-auto px-3 sm:px-6 md:px-8 pb-7 md:pb-9 bg-primary-400 rounded-4xl">
            <div className="shadow-form-box px-4 sm:px-6 md:px-8 py-7 md:py-9 bg-white rounded-4xl -mt-7 md:-mt-9 inline-block w-full">
              <h1 className="text-xl mb-2">Forgot password</h1>

              <p className="text-dark-800 md:mb-6">
                Enter your admin email address. We will send you a link to
                create a new password.
              </p>

              {address_save_errors.general && (
                <div className="mb-5 bg-[#FFF3F3] border border-red-200 rounded-2xl px-4 py-3">
                  <p className="text-red-800 mb-0">
                    {address_save_errors.general}
                  </p>
                </div>
              )}

              {successMessage && (
                <div className="mb-5 bg-[#FAF7F2] border border-[#E2CFAF] rounded-2xl px-4 py-3">
                  <p className="text-primary-900 font-semibold mb-0">
                    {successMessage}
                  </p>
                </div>
              )}

              <form className="form" onSubmit={handleResetPassword}>
                <div className="mb-3 sm:mb-5">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                  />

                  {address_save_errors.email && (
                    <span className="error text-red-800">
                      {address_save_errors.email}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send reset link"}
                  </button>

                  <p className="text-dark-800 m-0">
                    Back to{" "}
                    <Link
                      href="/belet-admin"
                      className="text-primary-900 underline hover:text-black hover:no-underline"
                    >
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