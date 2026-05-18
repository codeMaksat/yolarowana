import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function ResetPassword() {
  const router = useRouter();

  const [address_save_errors, setaddress_save_errors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePassword = async event => {
    event.preventDefault();

    const formElement = document.querySelector("#reset_password_form");
    const formData = new FormData(formElement);

    const password = formData.get("password");
    const passwordConfirm = formData.get("password_confirm");

    const error = {};

    if (!password || password.trim() === "") {
      error.password = "Password is required*";
    } else if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    }

    if (!passwordConfirm || passwordConfirm.trim() === "") {
      error.password_confirm = "Confirm password is required*";
    } else if (password !== passwordConfirm) {
      error.password_confirm = "Passwords do not match*";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
      setSuccessMessage("");
      return;
    }

    setaddress_save_errors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setaddress_save_errors({
        general:
          "Could not update password. Please open the reset link from your email again.",
      });
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage("Your password has been updated successfully.");
    formElement.reset();

    setTimeout(() => {
      router.push("/yola-admin");
    }, 1200);

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
              <h1 className="text-xl mb-2">Create new password</h1>

              <p className="text-dark-800 md:mb-6">
                Enter a new password for your Yola Rowana admin account.
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

              <form
                className="form"
                id="reset_password_form"
                onSubmit={handleUpdatePassword}
              >
                <div className="mb-3 sm:mb-5">
                  <input
                    type="password"
                    placeholder="New password"
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
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="form-control"
                    name="password_confirm"
                  />
                  {address_save_errors.password_confirm && (
                    <span className="error text-red-800">
                      {address_save_errors.password_confirm}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Updating..." : "Update password"}
                  </button>

                  <p className="text-dark-800 m-0">
                    Back to{" "}
                    <Link
                      href="/yola-admin"
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