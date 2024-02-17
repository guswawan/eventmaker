import React from 'react';

export default function page() {
  return (
    <section className="grid lg:grid-cols-2 grid-cols-1 bg-blue-300">
      <div className="bg-[#5621B6] h-screen flex flex-col items-center justify-center hidden lg:block">
        <div className="flex items-center gap-2 p-4 w-full">
          <h1 className="font-bold text-xl">🗓️ </h1>
          <span className="text-base text-white font-semibold">
            /eventmaker
          </span>
        </div>
        <div className="h-[90vh] flex flex-col items-center justify-center">
          <h1 className="font-bold text-4xl text-white leading-loose">
            Log in to enjoy all the benefits!
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
            <h1 className="font-bold text-3xl">Sign in</h1>
            <p className="text-gray-400">
              Welcome back! Please enter your details.
            </p>
          </div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">What is your email?</span>
            </div>
            <input
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
              type="password"
              placeholder="********"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button className="btn btn-primary w-full max-w-xs bg-[#5621B6] border border-[#5621B6] mt-2">
            Sign in
          </button>
        </div>
      </div>
    </section>
  );
}
