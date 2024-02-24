"use client";

import Link from "next/link";
import React from "react";

export const Register = () => {
  async function handleSubmitRegister(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    const res = await fetch("https://eventmakers-api.fly.dev/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
  }

  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 bg-blue-300">
      <div className="bg-[#5621B6] h-screen flex flex-col items-center justify-center hidden lg:block">
        <Link href={"/"}>
          <div className="flex items-center gap-2 p-4 w-full">
            <h1 className="font-bold text-xl">🗓️ </h1>
            <span className="text-base text-white font-semibold">
              /eventmaker.
            </span>
          </div>
        </Link>
        <div className="h-[90vh] flex flex-col items-center justify-center">
          <h1 className="font-bold text-4xl text-white leading-loose">
            Register to enjoy all the benefits!
          </h1>
          <p className="text-xl text-gray-200 leading-loose">
            All you have to do is just enter your email.
          </p>
          <div className="py-12 flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
            <p className="text-gray-200 pt-1">Ravel</p>
            <p className="text-sm text-gray-400 leading-loose">
              CEO, Ravel Entertainment
            </p>
            <p className="text-base text-gray-200 pt-2">⭐️ ⭐️ ⭐️ ⭐️ ⭐️</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-screen">
        <div className="flex flex-col items-center justify-center h-screen gap-3">
          <div className="w-full max-w-xs mb-4">
            <h1 className="font-bold text-4xl pb-2">🗓️</h1>
            <h1 className="font-bold text-3xl">Create Account</h1>
            <p className="text-gray-400">Welcome! Please enter your details.</p>
          </div>
          <form
            onSubmit={handleSubmitRegister}
            action=""
            className="form-control w-full max-w-xs"
          >
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is your name?</span>
              </div>
              <input
                name="name"
                type="text"
                placeholder="Maria Eve"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">What is your email?</span>
              </div>
              <input
                name="email"
                type="text"
                placeholder="mailevent@devscale.id"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="********"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button className="btn btn-primary w-full max-w-xs bg-[#5621B6] border border-[#5621B6] mt-2">
              Register
            </button>
          </form>
          <p className="text-xs">
            {`Already have an account?`}
            <Link href={"/login"} className="text-[#5621B6]">
              {" "}
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
