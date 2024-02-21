"use client";

import React from "react";
import Link from "next/link";
import { getDetailEvent } from "@/lib/fetching";
import { useRouter } from "next/navigation";

export const DetailEvent = ({ event }) => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  const renderDate = (date) => {
    const eventDate = new Date(date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[eventDate.getDay()];
    const monthName = months[eventDate.getMonth()];
    const dayNumber = eventDate.getDate();
    const year = eventDate.getFullYear();
    return (
      <div>
        {dayName}
        <br />
        <b>
          {monthName} {dayNumber}, {year}
        </b>
      </div>
    );
  };

  return (
    <section>
      {/* TOPBAR */}
      <div className="navbar bg-base-100 drop-shadow-lg sticky top-0 z-50 px-12">
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
          {/* START muncul ketika user sudah login */}
          {/* <div className="form-control">
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
                  <rect width="36" height="36" fill="#FFFFFF" rx="72"></rect>
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
                    <path d="M13,21 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path>
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
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
          {/* END */}

          <button class="group relative h-12 overflow-hidden overflow-x-hidden rounded-badge bg-neutral-950 px-8 py-2 text-neutral-50">
            <Link href={"/login"}>
              <span class="relative z-10">Sign In</span>
              <span class="absolute inset-0 overflow-hidden rounded-md">
                <span class="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-[#5621B6] transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span>
              </span>
            </Link>
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col w-full p-20 gap-4">
        <div
          className="flex items-center gap-1 text-xl cursor-pointer p-2 rounded-lg"
          onClick={handleClick}
          aria-label="Back to all events"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              stroke="#555555"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="1.5"
              d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
            ></path>
          </svg>
          <p>Back to all events</p>
        </div>
        <div className="flex flex-col w-full lg:flex-row p-4">
          <div className="grid flex-grow object-cover card bg-white rounded-box place-items-center w-1/3">
            <img
              src={event?.image}
              alt="Thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.pexels.com/photos/3866658/pexels-photo-3866658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
              }}
            />
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="w-1/3 justify-between flex flex-col">
            <div>
              <div className="badge badge-primary">
                {new Date(event?.dateTime).getFullYear()}
              </div>
              <p className="font-bold text-2xl">{event?.title}</p>
            </div>
            <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110">
              <span>Join event - Now!</span>
              <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div class="relative h-full w-8 bg-white/20"></div>
              </div>
            </button>
          </div>
        </div>
        <div className="w-full justify-around px-5">
          <div className="divider"></div>
          <div className="flex w-full">
            <div className="w-4/12 font-semibold text-xl">Date details</div>
            <div className="w-8/12">{renderDate(event?.dateTime)}</div>
          </div>
          <div className="divider"></div>
          <div className="flex w-full">
            <div className="w-4/12 font-semibold text-xl">About this event</div>
            <div className="w-8/12">{event?.description}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
