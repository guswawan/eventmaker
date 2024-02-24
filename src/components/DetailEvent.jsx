"use client";

import React from "react";
import Link from "next/link";
import { getDetailEvent } from "@/lib/fetching";
import { useRouter } from "next/navigation";
import { TopBar } from "./TopBar";

export const DetailEvent = ({ event }) => {
  console.log("EVE", event);
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
    // <section>
    <div className="flex flex-col w-full p-20 gap-4">
      <div
        className="flex items-center gap-1 text-xl cursor-pointer p-2 rounded-lg max-w-[230px]"
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
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110">
            <span>Join event - Now!</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
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
    // </section>
  );
};
