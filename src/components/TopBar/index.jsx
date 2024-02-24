"use client";

import { logout } from "@/lib/auth";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const TopBar = () => {
  const router = useRouter();
  const token = Cookies.get("token");
  function handleLogout() {
    logout();
    router.push("/");
    router.refresh();
  }
  return (
    <div className="navbar bg-base-100 sticky z-50 px-12">
      <div className="flex items-center gap-2 p-4 w-full">
        <Link href={"/"}>
          <button className="btn btn-ghost rounded-full">
            <h1 className="font-bold text-xl">🗓️ </h1>
            <span className="text-base text-black font-semibold">
              /eventmaker.
            </span>
          </button>
        </Link>
      </div>
      <div className="flex-none gap-2">
        {token ? (
          <div className="flex">
            <div className="form-control">
              <Link href={"/dashboard"}>
                <button className="btn btn-ghost rounded-full">
                  Dashboard
                </button>
              </Link>
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
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Link href={"/login"}>
              <button className="group relative h-12 overflow-hidden overflow-x-hidden rounded-badge bg-neutral-950 px-8 py-2 text-neutral-50">
                <span className="relative z-10">Sign In</span>
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  <span className="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#5621B6] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
