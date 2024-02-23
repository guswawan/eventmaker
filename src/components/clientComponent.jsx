"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export default function ClientComponent() {
  const HandleLogout = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    //ilangin user dari local storage
    localStorage.removeItem("user");
    //hapus cookies
    Cookies.remove("token");
    //balik ke login page
    router.push("/");

    //ngambil user dari local storage
    useEffect(() => {
      const userFromLs = localStorage.getItem("user");
      //dibalikin ke parse, suapaya user yang tipe datanya string berubah ke object
      const parsedUserData = JSON.parse(userFromLs);
      setUser(parsedUserData);
    }, []);
  }

  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    return (
      <section>
        <div className="navbar bg-base-100">
          <div className="flex items-center gap-2 p-4 w-full">
            <button className="btn btn-ghost rounded-full">
              <h1 className="font-bold text-xl">🗓️ </h1>
              <span className="text-base text-black font-semibold">
                /eventmaker.
              </span>
            </button>
          </div>
          <div className="flex-none gap-2">
            {/* muncul ketika user sudah login */}
            <div className="form-control">
              <button className="btn btn-ghost rounded-full">My Events</button>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <svg
                    viewBox="0 0 36 36"
                    fill="none"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                  >
                    <mask
                      id=":rkk:"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="36"
                      height="36"
                    >
                      <rect
                        width="36"
                        height="36"
                        fill="#FFFFFF"
                        rx="72"
                      ></rect>
                    </mask>
                    <g mask="url(#:rkk:)">
                      <rect width="36" height="36" fill="#ffb238"></rect>
                      <rect
                        x="0"
                        y="0"
                        width="36"
                        height="36"
                        transform="translate(3 5) rotate(221 18 18) scale(1.2)"
                        fill="#49007e"
                        rx="36"
                      ></rect>
                      <g transform="translate(-5 3) rotate(-1 18 18)">
                        <path
                          d="M13,21 a1,0.75 0 0,0 10,0"
                          fill="#FFFFFF"
                        ></path>
                        <rect
                          x="13"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#FFFFFF"
                        ></rect>
                        <rect
                          x="21"
                          y="14"
                          width="1.5"
                          height="2"
                          rx="1"
                          stroke="none"
                          fill="#FFFFFF"
                        ></rect>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={HandleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-4">
          <div>
            <div>Dashboard</div>
            {/* <div>Welcome Back, {user?.name}</div> */}
          </div>
        </div>
      </section>
    );
  } else {
    redirect("/login");
  }
}

// export default  function useLogout() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);

//   const handleLogout = () => {
//     // Remove user from local storage
//     localStorage.removeItem("user");
//     // Remove token cookie
//     Cookies.remove("token");
//     // Redirect to login page
//     router.push("/");
//   };

//   // Load user from local storage on component mount
//   useEffect(() => {
//     const userFromLs = localStorage.getItem("user");
//     const parsedUserData = JSON.parse(userFromLs);
//     setUser(parsedUserData);
//   }, []);

//   return handleLogout;
// }
