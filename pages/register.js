import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = event => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let first_name = formData.get("first_name");
    let last_name = formData.get("last_name");
    let email = formData.get("email");
    let password = formData.get("password");
    let password_confirm = formData.get("password_confirm");

    const error = {};

    if (!first_name || first_name.trim() === "") {
      error.first_name = "First Name is required*";
    }

    if (!last_name || last_name.trim() === "") {
      error.last_name = "Last Name is required*";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!password || password.trim() === "") {
      error.password = "Password is required*";
    } else if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    }

    if (!password_confirm || password_confirm.trim() === "") {
      error.password_confirm = "Confirm Password is required*";
    } else if (password !== password_confirm) {
      error.password_confirm = "Passwords do not match*";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});
      let data = {
        name: first_name + " " + last_name,
        email: email,
        password: password,
      };
      router.push("/");
      console.log(data);
    }
  };

  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-24 bg-gray-200 mb-14 md:mb-20">
      <div className="container">
        <div className="max-w-[590px] mx-auto px-3 sm:px-6 md:px-8 pb-7 md:pb-9 bg-primary-400 rounded-4xl">
          <div className="shadow-form-box px-4 sm:px-6 md:px-8 py-7 md:py-9 bg-white rounded-4xl -mt-7 md:-mt-9 inline-block w-full">
            <h1 className="text-xl mb-2">Sign up or create an account</h1>
            <p className="text-dark-800 md:mb-10">
              Already have an account?{" "}
              <Link
                href="login"
                className="text-primary-900 underline hover:text-black hover:no-underline">
                Log in
              </Link>
            </p>

            <form
              className="form"
              id="account_details_form"
              onSubmit={save_account_details}>
              <div className="mb-3 sm:mb-5">
                <input
                  type="text"
                  placeholder="First name"
                  className="form-control"
                  name="first_name"
                />
                {address_save_errors.first_name && (
                  <span className="error text-red-800">
                    {address_save_errors.first_name}
                  </span>
                )}
              </div>
              <div className="mb-3 sm:mb-5">
                <input
                  type="text"
                  placeholder="Last name"
                  className="form-control"
                  name="last_name"
                />
                {address_save_errors.last_name && (
                  <span className="error text-red-800">
                    {address_save_errors.last_name}
                  </span>
                )}
              </div>
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
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="form-control"
                  name="password_confirm"
                />
                {address_save_errors.password_confirm && (
                  <span className="error text-red-800">
                    {address_save_errors.password_confirm}
                  </span>
                )}
              </div>
              <div className="mb-3 sm:mb-5">
                <label className="checkcontainer">
                  By signing up, I agree to GoTrip Terms of Use and Privacy
                  Policy.
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div>
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
