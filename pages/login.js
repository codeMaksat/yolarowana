import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login() {
  const router = useRouter();

  const dummy_email = "admin123@gmail.com";
  const dummy_password = "admin@123";

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = (event) => {
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
    } else if (email !== dummy_email) {
      error.email = "email not found !";
    }

    if (!password || password.trim() === "") {
      error.password = "Password is required*";
    } else if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    } else if (password !== dummy_password) {
      error.password = "Wrong Password";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});
      let data = {
        email: email,
        password: password,
      };
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      router.push("/");
    }
  };
  // Fetch Seo data
  const { data: seo_data } = useFetchData("/json/data/site_meta_link.json"); // Fetch Seo data using the custom hook

  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta meta_data={seo_data.login_meta} comman_meta={seo_data} />
      <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-200 mb-14 md:mb-20">
        <div className="container">
          <div className="max-w-[590px] mx-auto px-3 sm:px-6 md:px-8 pb-7 md:pb-9 bg-primary-400 rounded-4xl">
            <div className="shadow-form-box px-4 sm:px-6 md:px-8 py-7 md:py-9 bg-white rounded-4xl -mt-7 md:-mt-9 inline-block w-full">
              <h1 className="text-xl mb-2">Welcome back</h1>
              <p className="text-dark-800 md:mb-10">
                Dont have an account yet?{" "}
                <Link
                  href="register"
                  className="text-primary-900 underline hover:text-black hover:no-underline"
                >
                  Sign up for free
                </Link>
              </p>

              {/* <h5>email : admin123@gmail.com &lt;br /&gt; pass : admin@123</h5> */}
              <h5>
                email : admin123@gmail.com <br />
                pass : admin@123
              </h5>

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
                      href="forgot-password"
                      className="text-primary-900 underline hover:text-black hover:no-underline"
                    >
                      Forgot your password?
                    </Link>
                  </p>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
